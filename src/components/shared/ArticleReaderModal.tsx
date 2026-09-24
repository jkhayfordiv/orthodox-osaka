'use client';

import React, { useEffect, useState } from 'react';
import { X, BookOpen, Clock, User, ExternalLink, Share2, Check, Globe, AlertTriangle, Sparkles } from 'lucide-react';
import { LibraryItem } from '../../data/libraryCatalog';
import { useApp } from '../../context/AppContext';

interface ArticleReaderModalProps {
  item: LibraryItem | null;
  onClose: () => void;
}

export function ArticleReaderModal({ item, onClose }: ArticleReaderModalProps) {
  const { locale } = useApp();
  const [originalContent, setOriginalContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Translation states: default is ALWAYS Japanese original, as requested
  const [activeLang, setActiveLang] = useState<'ja' | 'en' | 'ru'>('ja');
  const [translatedContent, setTranslatedContent] = useState<Record<string, string>>({});
  const [translating, setTranslating] = useState<boolean>(false);

  const [translatedTitles, setTranslatedTitles] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!item) {
      setOriginalContent('');
      setActiveLang('ja');
      setTranslatedContent({});
      setTranslatedTitles({});
      return;
    }

    setLoading(true);
    // As requested: ALWAYS show the authentic Japanese original first, regardless of site locale.
    setActiveLang('ja');

    const cleanMdPath = item.relativePath.replace(/\.[^/.]+$/, '.md');
    fetch(`/archive/${item.section}/${cleanMdPath}`)
      .then(async res => {
        if (res.ok) {
          const text = await res.text();
          return { content: text };
        }
        const apiRes = await fetch(`/api/library/article?section=${encodeURIComponent(item.section)}&path=${encodeURIComponent(item.relativePath)}`);
        return apiRes.json();
      })
      .then(data => {
        if (data.content) {
          let text = data.content;
          // Strip header metadata
          text = text.replace(/^# [^\n]+\n+/, '');
          text = text.replace(/^\*Original URL:[^\n]+\n+/, '');
          text = text.replace(/^---\n+/, '');
          // Remove dead internal index and navigation links
          text = text.replace(/\[\s*(?:TOP PAGE|TOP|index|目次|TOPPAGE)?\s*\]\([^\)]+\)/gi, '');
          text = text.replace(/\[\s*\]\([^\)]*\)/gi, '');
          text = text.replace(/\[(?:index\.html|top|toppage|page)\]/gi, '');
          // Clean up star separators and stray navigation markers
          text = text.replace(/^★\s*$/gm, '');
          // Clean up internal anchor links like [降誕](#koutan)
          text = text.replace(/\[([^\]]+)\]\(#[^\)]+\)/gi, '$1');
          text = text.replace(/\[([^\]]+)\]\([^\)]+\)/gi, '$1');
          // Clean repeated blank lines
          text = text.replace(/\n{3,}/g, '\n\n').trim();
          setOriginalContent(text);
        } else {
          setOriginalContent(item.snippet || '本文を読み込めませんでした。');
        }
      })
      .catch(() => {
        setOriginalContent(item.snippet || '本文を読み込めませんでした。');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [item]);

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
          articleId: articleId || item?.id
        })
      });
      const data = await res.json();
      if (data.translatedText) {
        setTranslatedContent(prev => ({
          ...prev,
          [targetLang]: data.translatedText
        }));
      }
      if (data.translatedTitle) {
        setTranslatedTitles(prev => ({
          ...prev,
          [targetLang]: data.translatedTitle
        }));
      }
    } catch (err) {
      console.error('Failed to translate article:', err);
    } finally {
      setTranslating(false);
    }
  };

  // Handle on-demand language toggle
  const handleSelectLanguage = (targetLang: 'ja' | 'en' | 'ru') => {
    setActiveLang(targetLang);
    if (targetLang !== 'ja' && !translatedContent[targetLang]) {
      fetchTranslation(originalContent, targetLang, item?.id);
    }
  };

  if (!item) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '/' + item.section + '/' + item.relativePath);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const displayContent = activeLang === 'ja'
    ? originalContent
    : (translatedContent[activeLang] || originalContent);

  // Format paragraphs nicely, parsing markdown bold without leaving raw **
  const renderFormattedParagraphs = (rawText: string) => {
    const paragraphs = rawText.split('\n\n');
    return paragraphs.map((p, idx) => {
      const trimmed = p.trim();
      if (!trimmed) return null;

      // Check if it's a section header (e.g. ## Title or **Title**)
      const isHeader = (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length < 60) || trimmed.startsWith('§');

      if (isHeader) {
        const cleanTitle = trimmed.replace(/\*\*/g, '').replace(/^§|§$/g, '').trim();
        return (
          <h4 key={idx} className="font-serif font-bold text-base sm:text-lg text-orthodox-navy dark:text-amber-300 pt-3 pb-1 border-b border-amber-900/10 dark:border-amber-400/15">
            {cleanTitle}
          </h4>
        );
      }

      // Replace bold markers **word** with styled span
      const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={idx} className="leading-relaxed">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-slate-900 dark:text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1 pr-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-medium">
                {item.categoryLabel[locale] || item.categoryLabel.ja}
              </span>
              {item.readTimeMinutes && (
                <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-2xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>約 {item.readTimeMinutes} 分</span>
                </span>
              )}
            </div>

            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                {activeLang === 'en'
                  ? (translatedTitles['en'] || item.titleEn || item.title)
                  : activeLang === 'ru'
                  ? (translatedTitles['ru'] || item.titleRu || item.title)
                  : item.title}
              </h2>
              {activeLang !== 'ja' && item.title && (
                <p className="text-xs text-orthodox-gold mt-1 font-serif italic" title="Canonical Japanese Title">
                  {item.title}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>{item.author}</span>
              </p>

              {/* Language Switcher Pill: Original Japanese + AI Translations */}
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
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="閉じる"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Translation Disclaimer Alert (Displayed when English or Russian is active) */}
        {activeLang !== 'ja' && (
          <div className="px-6 py-3 bg-amber-50 dark:bg-amber-950/60 border-b border-amber-200/80 dark:border-amber-800/60 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold">
                {activeLang === 'ru' ? 'Предупреждение об автоматическом переводе (ИИ)' : 'Notice on Automated AI Translation'}
              </span>
              <p className="opacity-90 leading-relaxed text-2xs">
                {activeLang === 'ru'
                  ? 'Этот текст переведен с помощью автоматического перевода для удобства чтения. Каноническим и точным является японский оригинал о. Георгия Мацусима. По богословским вопросам обращайтесь к священнику.'
                  : 'This translation was automatically generated by AI to assist international visitors. Because Orthodox theological nuance is delicate, the original Japanese text remains the authoritative version. Please consult church clergy for doctrinal inquiries.'}
              </p>
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-4 text-slate-700 dark:text-slate-200 leading-relaxed font-sans text-sm sm:text-base">
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
                {activeLang === 'ru' ? 'Выполняется перевод на русский язык...' : 'Translating Japanese text into English...'}
              </p>
            </div>
          ) : (
            <div className="prose dark:prose-invert max-w-none space-y-4">
              {renderFormattedParagraphs(displayContent)}
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
            href={`/${item.section}/${item.relativePath}`}
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
