'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
  X,
  BookOpen,
  Clock,
  User,
  ExternalLink,
  Share2,
  Check,
  Globe,
  AlertTriangle,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Hash,
} from 'lucide-react';
import { LibraryItem, LIBRARY_DATA } from '../../data/libraryCatalog';
import { useApp } from '../../context/AppContext';

interface ArticleReaderModalProps {
  item: LibraryItem | null;
  onClose: () => void;
}

export function ArticleReaderModal({ item, onClose }: ArticleReaderModalProps) {
  const { locale } = useApp();

  // Active reading item (supports internal link navigation)
  const [currentItem, setCurrentItem] = useState<LibraryItem | null>(item);
  const [historyStack, setHistoryStack] = useState<LibraryItem[]>([]);

  const [originalContent, setOriginalContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Translation states: default is ALWAYS Japanese original, as requested
  const [activeLang, setActiveLang] = useState<'ja' | 'en' | 'ru'>('ja');
  const [translatedContent, setTranslatedContent] = useState<Record<string, string>>({});
  const [translating, setTranslating] = useState<boolean>(false);
  const [translatedTitles, setTranslatedTitles] = useState<Record<string, string>>({});

  const contentScrollRef = useRef<HTMLDivElement>(null);

  // Reset when external item prop changes
  useEffect(() => {
    setCurrentItem(item);
    setHistoryStack([]);
  }, [item]);

  // Fetch article content whenever currentItem changes
  useEffect(() => {
    if (!currentItem) {
      setOriginalContent('');
      setActiveLang('ja');
      setTranslatedContent({});
      setTranslatedTitles({});
      return;
    }

    setLoading(true);
    setActiveLang('ja');
    setTranslatedContent({});
    setTranslatedTitles({});

    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTop = 0;
    }

    const cleanMdPath = currentItem.relativePath.replace(/\.[^/.]+$/, '.md');
    fetch(`/archive/${currentItem.section}/${cleanMdPath}`)
      .then(async (res) => {
        if (res.ok) {
          const text = await res.text();
          return { content: text };
        }
        const apiRes = await fetch(
          `/api/library/article?section=${encodeURIComponent(currentItem.section)}&path=${encodeURIComponent(
            currentItem.relativePath
          )}`
        );
        return apiRes.json();
      })
      .then((data) => {
        if (data.content) {
          let text = data.content;
          // Strip header metadata
          text = text.replace(/^# [^\n]+\n+/, '');
          text = text.replace(/^\*Original URL:[^\n]+\n+/, '');
          text = text.replace(/^---\n+/, '');
          // Remove dead internal top/index links (e.g. [](index.html), [TOP PAGE](index.html))
          text = text.replace(/\[\s*(?:TOP PAGE|TOP|index|目次|TOPPAGE)?\s*\]\(index\.html?\)/gi, '');
          text = text.replace(/\[\s*\]\([^\)]*\)/gi, '');
          text = text.replace(/\[(?:index\.html|top|toppage|page)\]/gi, '');
          // Clean up star separators
          text = text.replace(/^★\s*$/gm, '');
          // Clean repeated blank lines
          text = text.replace(/\n{3,}/g, '\n\n').trim();
          setOriginalContent(text);
        } else {
          setOriginalContent(currentItem.snippet || '本文を読み込めませんでした。');
        }
      })
      .catch(() => {
        setOriginalContent(currentItem.snippet || '本文を読み込めませんでした。');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentItem]);

  // Translation fetcher
  const fetchTranslation = async (text: string, targetLang: 'en' | 'ru', articleId?: string) => {
    if (translatedContent[targetLang]) return;
    setTranslating(true);
    try {
      const res = await fetch('/api/library/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          targetLang,
          articleId: articleId || currentItem?.id,
        }),
      });
      const data = await res.json();
      if (data.translatedText) {
        setTranslatedContent((prev) => ({
          ...prev,
          [targetLang]: data.translatedText,
        }));
      }
      if (data.translatedTitle) {
        setTranslatedTitles((prev) => ({
          ...prev,
          [targetLang]: data.translatedTitle,
        }));
      }
    } catch (err) {
      console.error('Failed to translate article:', err);
    } finally {
      setTranslating(false);
    }
  };

  const handleSelectLanguage = (targetLang: 'ja' | 'en' | 'ru') => {
    setActiveLang(targetLang);
    if (targetLang !== 'ja' && !translatedContent[targetLang]) {
      fetchTranslation(originalContent, targetLang, currentItem?.id);
    }
  };

  // In-app interactive link handler
  const handleLinkClick = (targetUrl: string) => {
    if (!currentItem) return;

    // 1. In-page anchor link (e.g. #koutan, #date)
    if (targetUrl.startsWith('#')) {
      const anchorId = targetUrl.slice(1);
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // 2. External URL
    if (targetUrl.startsWith('http://') || targetUrl.startsWith('https://') || targetUrl.startsWith('mailto:')) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    // 3. Relative archive link (e.g. questions.htm, paisi2.html, cross to.htm)
    const cleanTarget = decodeURIComponent(targetUrl.split('#')[0].replace(/^\.?\//, ''));
    if (!cleanTarget) return;

    // Match catalog item in the same section first, or any section
    const match =
      LIBRARY_DATA.items.find(
        (x) =>
          x.section === currentItem.section &&
          (x.relativePath === cleanTarget ||
            x.relativePath.endsWith(cleanTarget) ||
            x.relativePath.toLowerCase() === cleanTarget.toLowerCase() ||
            x.relativePath.toLowerCase().endsWith(cleanTarget.toLowerCase()))
      ) ||
      LIBRARY_DATA.items.find(
        (x) =>
          x.relativePath === cleanTarget ||
          x.relativePath.endsWith(cleanTarget) ||
          x.relativePath.toLowerCase() === cleanTarget.toLowerCase() ||
          x.relativePath.toLowerCase().endsWith(cleanTarget.toLowerCase())
      );

    if (match) {
      setHistoryStack((prev) => [...prev, currentItem]);
      setCurrentItem(match);
    } else {
      // Fallback: open raw archive file in new window if not mapped
      window.open(`/${currentItem.section}/${cleanTarget}`, '_blank', 'noopener,noreferrer');
    }
  };

  const handleGoBack = () => {
    if (historyStack.length === 0) return;
    const previous = historyStack[historyStack.length - 1];
    setHistoryStack((prev) => prev.slice(0, -1));
    setCurrentItem(previous);
  };

  // Detect multi-part series (e.g. St. Paisios dialogues, Children's Liturgy, Vestments)
  const seriesInfo = useMemo(() => {
    if (!currentItem) return null;
    const path = currentItem.relativePath.toLowerCase();
    let prefix = '';
    let seriesTitle = '';
    if (path.includes('paisi')) {
      prefix = 'paisi';
      seriesTitle = 'アトスの長老パイシイ対話録シリーズ';
    } else if (path.includes('ohanashi')) {
      prefix = 'ohanashi';
      seriesTitle = '子供たちのための「聖体礼儀のお話」連載';
    } else if (path.includes('vestment')) {
      prefix = 'vestment';
      seriesTitle = '正教会の祭服解説シリーズ';
    } else if (path.includes('sanf')) {
      prefix = 'sanf';
      seriesTitle = '上海の聖イオアン説教集「復活を讃美する」';
    }

    if (!prefix) return null;

    const siblings = LIBRARY_DATA.items
      .filter(
        (x) =>
          x.section === currentItem.section &&
          x.relativePath.toLowerCase().includes(prefix) &&
          x.type === 'article'
      )
      .sort((a, b) => a.relativePath.localeCompare(b.relativePath, undefined, { numeric: true }));

    if (siblings.length <= 1) return null;

    const currentIndex = siblings.findIndex((x) => x.id === currentItem.id);
    return {
      seriesTitle,
      siblings,
      currentIndex,
      prevItem: currentIndex > 0 ? siblings[currentIndex - 1] : null,
      nextItem: currentIndex >= 0 && currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null,
    };
  }, [currentItem]);

  if (!currentItem) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        window.location.origin + '/' + currentItem.section + '/' + currentItem.relativePath
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const displayContent =
    activeLang === 'ja' ? originalContent : translatedContent[activeLang] || originalContent;

  // Helper to parse inline markdown: bold **word** and links [text](url)
  const parseInlineMarkdown = (line: string, keyPrefix: string) => {
    // Regex matches markdown links: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const segments: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(line)) !== null) {
      const matchIndex = match.index;
      // Preceding text before the link
      if (matchIndex > lastIndex) {
        const textBefore = line.substring(lastIndex, matchIndex);
        segments.push(parseBoldText(textBefore, `${keyPrefix}-pre-${matchIndex}`));
      }

      const linkLabel = match[1];
      const linkUrl = match[2];
      const isAnchor = linkUrl.startsWith('#');
      const isExternal = linkUrl.startsWith('http://') || linkUrl.startsWith('https://') || linkUrl.startsWith('mailto:');

      segments.push(
        <button
          key={`${keyPrefix}-link-${matchIndex}`}
          type="button"
          onClick={() => handleLinkClick(linkUrl)}
          className="inline-flex items-center gap-1 text-orthodox-gold-dark dark:text-orthodox-gold font-bold hover:underline decoration-orthodox-gold hover:text-amber-800 dark:hover:text-amber-200 transition-colors cursor-pointer text-left mx-0.5"
          title={isAnchor ? `Jump to section: ${linkLabel}` : linkLabel}
        >
          <span>{linkLabel.replace(/\*\*/g, '')}</span>
          {isAnchor ? (
            <Hash className="w-3 h-3 text-orthodox-gold/60 inline-block" />
          ) : isExternal ? (
            <ExternalLink className="w-3 h-3 text-orthodox-gold/70 inline-block" />
          ) : (
            <BookOpen className="w-3 h-3 text-orthodox-gold/80 inline-block" />
          )}
        </button>
      );

      lastIndex = linkRegex.lastIndex;
    }

    // Remaining text after last link
    if (lastIndex < line.length) {
      const textAfter = line.substring(lastIndex);
      segments.push(parseBoldText(textAfter, `${keyPrefix}-post-${lastIndex}`));
    }

    return segments.length > 0 ? segments : parseBoldText(line, keyPrefix);
  };

  // Helper to parse **bold** inside text
  const parseBoldText = (text: string, keyPrefix: string) => {
    const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={`${keyPrefix}-b-${pIdx}`} className="font-bold text-slate-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={`${keyPrefix}-t-${pIdx}`}>{part}</span>;
    });
  };

  // Format paragraphs nicely, parsing headers, lists, links, and bold without leaving raw syntax
  const renderFormattedParagraphs = (rawText: string) => {
    const paragraphs = rawText.split('\n\n');

    return paragraphs.map((p, idx) => {
      const trimmed = p.trim();
      if (!trimmed) return null;

      // Section header: ## Title or **Title** (short) or § Title
      const isHeader =
        (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length < 70) ||
        trimmed.startsWith('§') ||
        trimmed.startsWith('◆') ||
        (trimmed.startsWith('## ') && trimmed.length < 80);

      if (isHeader) {
        const cleanTitle = trimmed
          .replace(/^##\s*/, '')
          .replace(/\*\*/g, '')
          .replace(/^§|§$/g, '')
          .trim();
        // Generate an anchor id if possible
        const anchorId = cleanTitle.replace(/[^a-zA-Z0-9_\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/g, '');

        return (
          <h4
            key={idx}
            id={anchorId}
            className="font-serif font-bold text-base sm:text-lg text-orthodox-navy dark:text-amber-300 pt-4 pb-1.5 border-b border-amber-900/15 dark:border-amber-400/20 scroll-mt-6"
          >
            {cleanTitle}
          </h4>
        );
      }

      // Check if paragraph contains multiple lines (e.g. list items, table rows, poems)
      const lines = trimmed.split('\n');
      if (lines.length > 1) {
        return (
          <div key={idx} className="space-y-1.5 py-1">
            {lines.map((line, lIdx) => {
              const trimmedLine = line.trim();
              if (!trimmedLine) return null;

              // Check if line is a bullet item or link item
              const isBullet = trimmedLine.startsWith('- ') || trimmedLine.startsWith('・') || trimmedLine.startsWith('第');

              return (
                <div key={lIdx} className={`leading-relaxed ${isBullet ? 'pl-2 border-l-2 border-orthodox-gold/30' : ''}`}>
                  {parseInlineMarkdown(trimmedLine, `p-${idx}-l-${lIdx}`)}
                </div>
              );
            })}
          </div>
        );
      }

      // Standard single paragraph
      return (
        <p key={idx} className="leading-relaxed">
          {parseInlineMarkdown(trimmed, `p-${idx}`)}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1 pr-2">
            {/* Top row: History Back Button + Category + Reading Time */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {historyStack.length > 0 && (
                <button
                  onClick={handleGoBack}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orthodox-gold/20 hover:bg-orthodox-gold/30 text-orthodox-gold-dark dark:text-orthodox-gold font-bold transition-colors cursor-pointer"
                  title="Previous article"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>戻る</span>
                </button>
              )}

              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-medium">
                {currentItem.categoryLabel[locale] || currentItem.categoryLabel.ja}
              </span>

              {currentItem.readTimeMinutes && (
                <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-2xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>約 {currentItem.readTimeMinutes} 分</span>
                </span>
              )}
            </div>

            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                {activeLang === 'en'
                  ? translatedTitles['en'] || currentItem.titleEn || currentItem.title
                  : activeLang === 'ru'
                  ? translatedTitles['ru'] || currentItem.titleRu || currentItem.title
                  : currentItem.title}
              </h2>
              {activeLang !== 'ja' && currentItem.title && (
                <p className="text-xs text-orthodox-gold mt-1 font-serif italic" title="Canonical Japanese Title">
                  {currentItem.title}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>{currentItem.author}</span>
              </p>

              {/* Language Switcher Pill */}
              <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-xs">
                <button
                  onClick={() => handleSelectLanguage('ja')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    activeLang === 'ja'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  日本語 (原文)
                </button>
                <button
                  onClick={() => handleSelectLanguage('en')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                    activeLang === 'en'
                      ? 'bg-orthodox-gold text-orthodox-navy shadow-2xs font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Globe className="w-3 h-3" />
                  <span>English (AI)</span>
                </button>
                <button
                  onClick={() => handleSelectLanguage('ru')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                    activeLang === 'ru'
                      ? 'bg-orthodox-gold text-orthodox-navy shadow-2xs font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Globe className="w-3 h-3" />
                  <span>Русский (ИИ)</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="リンクをコピー"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="閉じる"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Translation Disclaimer Alert */}
        {activeLang !== 'ja' && (
          <div className="px-6 py-3 bg-amber-50 dark:bg-amber-950/60 border-b border-amber-200/80 dark:border-amber-800/60 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold">
                {activeLang === 'ru'
                  ? 'Предупреждение об автоматическом переводе (ИИ)'
                  : 'Notice on Automated AI Translation'}
              </span>
              <p className="opacity-90 leading-relaxed text-2xs">
                {activeLang === 'ru'
                  ? 'Этот текст переведен с помощью автоматического перевода для удобства чтения. Каноническим и точным является японский оригинал о. Георгия Мацусима.'
                  : 'This translation was automatically generated by AI to assist international visitors. Because Orthodox theological nuance is delicate, the original Japanese text remains the authoritative version.'}
              </p>
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <div
          ref={contentScrollRef}
          className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-4 text-slate-700 dark:text-slate-200 leading-relaxed font-sans text-sm sm:text-base"
        >
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-8 h-8 mx-auto border-3 border-orthodox-gold border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-slate-500">文献を読み込み中...</p>
            </div>
          ) : translating ? (
            <div className="py-20 text-center space-y-3">
              <Sparkles className="w-7 h-7 mx-auto text-orthodox-gold animate-pulse" />
              <p className="text-sm font-semibold text-slate-800 dark:text-white">AIで翻訳中...</p>
              <p className="text-xs text-slate-500">
                {activeLang === 'ru'
                  ? 'Выполняется перевод на русский язык...'
                  : 'Translating Japanese text into English...'}
              </p>
            </div>
          ) : (
            <div className="prose dark:prose-invert max-w-none space-y-3">
              {renderFormattedParagraphs(displayContent)}

              {/* Series Previous / Next Navigation Banner */}
              {seriesInfo && (seriesInfo.prevItem || seriesInfo.nextItem) && (
                <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-orthodox-gold uppercase tracking-wider">
                    {seriesInfo.seriesTitle}
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch justify-between gap-3">
                    {seriesInfo.prevItem ? (
                      <button
                        onClick={() => handleLinkClick(seriesInfo.prevItem!.relativePath)}
                        className="flex-1 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-orthodox-gold transition-colors text-left group cursor-pointer"
                      >
                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                          <ChevronLeft className="w-3 h-3" />
                          <span>前の講話・章</span>
                        </div>
                        <div className="font-serif font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 group-hover:text-orthodox-gold transition-colors line-clamp-1 mt-0.5">
                          {seriesInfo.prevItem.title}
                        </div>
                      </button>
                    ) : (
                      <div className="flex-1" />
                    )}

                    {seriesInfo.nextItem && (
                      <button
                        onClick={() => handleLinkClick(seriesInfo.nextItem!.relativePath)}
                        className="flex-1 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-orthodox-gold transition-colors text-right group cursor-pointer"
                      >
                        <div className="text-[10px] text-slate-400 flex items-center justify-end gap-1">
                          <span>次の講話・章</span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                        <div className="font-serif font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 group-hover:text-orthodox-gold transition-colors line-clamp-1 mt-0.5">
                          {seriesInfo.nextItem.title}
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>西日本主教区・大阪ハリストス正教会文献アーカイブ</span>
            {activeLang !== 'ja' && (
              <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-2xs font-semibold">
                AI Beta
              </span>
            )}
          </div>
          <a
            href={`/${currentItem.section}/${currentItem.relativePath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-400 hover:underline font-medium"
          >
            <span>オリジナル原本を表示</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
