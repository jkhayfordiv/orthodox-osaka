'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { LIBRARY_DATA, LibraryItem } from '../../data/libraryCatalog';
import { ArticleReaderModal } from '../shared/ArticleReaderModal';
import { PortalNavHeader } from '../shared/PortalNavHeader';
import { PortalFooter } from '../shared/PortalFooter';
import {
  Music,
  BookOpen,
  Download,
  Search,
  Clock,
  ChevronRight,
  FileText,
  Volume2,
  Sparkles,
  Layers,
  Award,
  Radio,
  ExternalLink,
} from 'lucide-react';

export function MariaPortalView() {
  const { locale } = useApp();
  const [selectedArticle, setSelectedArticle] = useState<LibraryItem | null>(null);
  const [activeTab, setActiveTab] = useState<'scores' | 'articles' | 'octoechos' | 'liturgy' | 'lent'>('scores');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(24);

  // All items belonging to Matushka Maria or choral scores
  const mariaArticles = useMemo(() => {
    return LIBRARY_DATA.items.filter(
      item => item.section === 'maria' && item.type === 'article'
    );
  }, []);

  const choralScores = useMemo(() => {
    return LIBRARY_DATA.items.filter(
      item =>
        item.type === 'pdf' &&
        (item.section === 'maria' ||
          item.relativePath.includes('score_web_pdf') ||
          item.relativePath.includes('kiso_pdf') ||
          item.relativePath.includes('octoechos') ||
          item.relativePath.includes('Liturgy') ||
          item.relativePath.includes('Triodion'))
    );
  }, []);

  // Filtered scores based on active subtab & search
  const filteredScores = useMemo(() => {
    return choralScores.filter(score => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle =
          score.title.toLowerCase().includes(q) ||
          (score.titleEn && score.titleEn.toLowerCase().includes(q));
        const matchesPath = score.relativePath.toLowerCase().includes(q);
        if (!matchesTitle && !matchesPath) return false;
      }

      // Tab filter
      if (activeTab === 'octoechos') {
        return (
          score.relativePath.toLowerCase().includes('octoechos') ||
          score.title.includes('調') ||
          score.title.includes('八調')
        );
      }
      if (activeTab === 'liturgy') {
        return (
          score.relativePath.toLowerCase().includes('liturgy') ||
          score.title.includes('大式') ||
          score.title.includes('聖体礼儀') ||
          score.title.includes('Prokim') ||
          score.title.includes('Litany')
        );
      }
      if (activeTab === 'lent') {
        return (
          score.relativePath.toLowerCase().includes('triodion') ||
          score.relativePath.toLowerCase().includes('lenten') ||
          score.title.includes('三歌斎') ||
          score.title.includes('大斎') ||
          score.title.includes('ANDREI')
        );
      }
      return true;
    });
  }, [choralScores, searchQuery, activeTab]);

  // Featured Master Score
  const daishikiScore = useMemo(() => {
    return choralScores.find(i => i.relativePath.includes('Daishiki.pdf')) || null;
  }, [choralScores]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <PortalNavHeader currentPortal="maria" />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
          <img
            src="/church-photos/choir-loft.jpg"
            alt="Orthodox Sacred Choral Music"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to vespers if choir photo is not present
              e.currentTarget.src = '/church-photos/vespers-candlelight.jpg';
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-indigo-950/95 to-slate-950/85 z-0" />

        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-200 text-xs font-semibold">
            <Music className="w-3.5 h-3.5 text-indigo-300" />
            <span>
              {locale === 'ja'
                ? 'マリア松島純子 聖歌ポータル・正教会聖歌研究'
                : 'Matushka Maria Junko Matsushima Sacred Music Portal'}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {locale === 'ja'
              ? '日本正教会 聖歌楽譜・聖歌史アーカイブ'
              : 'Orthodox Sacred Music, Choral Scores & Musicology'}
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm lg:text-base max-w-3xl font-light leading-relaxed">
            {locale === 'ja'
              ? '人間の生きた声による神への祈り。大式聖体礼儀全曲譜、主日八調、大祭・三歌斎の合唱楽譜アーカイブと、日本正教会聖歌の歴史、ヨハン・フォン・ガードナーの教会聖歌論研究を網羅しています。'
              : 'A dedicated repository of Orthodox a cappella choral scores (Octoechos, Divine Liturgy, Triodion) and musicological research on Japanese Orthodox chant history.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-orthodox-gold text-orthodox-navy font-bold text-xs shadow-xs flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              <span>{choralScores.length} {locale === 'ja' ? '点の楽譜PDF' : 'Choral Score PDFs'}</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white/10 text-white text-xs border border-white/15 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-300" />
              <span>{mariaArticles.length} {locale === 'ja' ? '編の研究論文・講話' : 'Articles & Studies'}</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white/10 text-white text-xs border border-white/15">
              {locale === 'ja' ? '主日八調 完備' : 'Octoechos Tones 1-8'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full">
        {/* Navigation Tabs Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'scores' as const, label: locale === 'ja' ? '全楽譜一覧' : 'All Scores', icon: Music },
              { id: 'octoechos' as const, label: locale === 'ja' ? '主日八調' : 'Octoechos (8 Tones)', icon: Layers },
              { id: 'liturgy' as const, label: locale === 'ja' ? '聖体礼儀全曲' : 'Divine Liturgy', icon: Award },
              { id: 'lent' as const, label: locale === 'ja' ? '大斎・三歌斎' : 'Lent & Triodion', icon: FileText },
              { id: 'articles' as const, label: locale === 'ja' ? '聖歌論・研究論文' : 'Musicology Articles', icon: BookOpen },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setVisibleCount(24);
                  }}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-xs font-bold'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={
                locale === 'ja'
                  ? '調や曲名・論文を検索（例: 第1調, 大式, パスハ, ガードナー）...'
                  : 'Search scores & studies (e.g. Tone 1, Pascha, Gardner)...'
              }
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Master Score Banner (Shown on scores & liturgy tabs) */}
        {(activeTab === 'scores' || activeTab === 'liturgy') && !searchQuery.trim() && daishikiScore && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-900 dark:to-indigo-950/40 border-2 border-orthodox-gold/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-orthodox-gold text-orthodox-navy font-bold text-2xs uppercase tracking-wider">
                  Master Score
                </span>
                <span className="text-2xs text-slate-500 dark:text-slate-400">PDF譜面</span>
              </div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                {locale === 'ja'
                  ? '大式聖体礼儀 聖歌楽譜（全曲集）'
                  : 'Full Divine Liturgy Choral Score (Daishiki)'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                {locale === 'ja'
                  ? '聖金口イオアン聖体礼儀の全合唱パート譜（アンティフォン、三聖讃、ヘルヴィム讃歌、信仰経、アナフォラ、領聖歌など）を網羅した大式楽譜集です。'
                  : 'Complete choral score of the Divine Liturgy of St. John Chrysostom including all antiphons, Cherubic Hymn, Anaphora, and Communion verses.'}
              </p>
            </div>

            <a
              href={`/${daishikiScore.section}/${daishikiScore.relativePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-orthodox-gold hover:bg-orthodox-gold-light text-orthodox-navy font-bold text-xs sm:text-sm shadow-md transition-all flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>{locale === 'ja' ? '大式全曲譜を開く (PDF)' : 'Open Full Score'}</span>
            </a>
          </div>
        )}

        {/* 1. Octoechos 8-Tones Showcase (Shown in scores & octoechos tabs) */}
        {(activeTab === 'scores' || activeTab === 'octoechos') && !searchQuery.trim() && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                  {locale === 'ja' ? '主日八調 聖歌楽譜（第1調〜第8調）' : 'Sunday Octoechos (Tones 1–8)'}
                </h3>
              </div>
              <span className="text-2xs text-slate-400">PDF譜面</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(tone => {
                const score = choralScores.find(i =>
                  i.relativePath.toLowerCase().includes(`octoechos_sun_${tone}.pdf`)
                );
                return (
                  <div
                    key={tone}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">
                          #{tone}
                        </span>
                        <span className="text-2xs text-slate-400">
                          {score?.size ? `${Math.round(score.size / 1024)} KB` : 'PDF'}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-2">
                        {locale === 'ja' ? `第${tone}調 主日聖歌` : `Tone ${tone} Sunday`}
                      </h4>
                    </div>

                    {score && (
                      <a
                        href={`/${score.section}/${score.relativePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{locale === 'ja' ? '開く (PDF)' : 'Open PDF'}</span>
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. Research Articles Tab */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                {locale === 'ja' ? 'マリア松島純子 聖歌論・研究論文アーカイブ' : 'Musicological Studies & Articles'}
              </h3>
              <span className="text-2xs text-slate-400">
                {mariaArticles.length} {locale === 'ja' ? '編の論考' : 'papers'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {mariaArticles
                .filter(item => {
                  if (!searchQuery.trim()) return true;
                  const q = searchQuery.toLowerCase();
                  return (
                    item.title.toLowerCase().includes(q) ||
                    (item.titleEn && item.titleEn.toLowerCase().includes(q)) ||
                    item.snippet.toLowerCase().includes(q)
                  );
                })
                .map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedArticle(item)}
                    className="group cursor-pointer rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xs hover:shadow-md hover:border-indigo-400 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 text-2xs font-semibold">
                          {item.categoryLabel[locale] || item.categoryLabel.ja}
                        </span>
                        {item.readTimeMinutes && (
                          <span className="flex items-center gap-1 text-slate-400 text-2xs">
                            <Clock className="w-3 h-3" />
                            <span>約{item.readTimeMinutes}分</span>
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {item.title}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                        {item.snippet}
                      </p>
                    </div>

                    <div className="pt-3.5 mt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="text-2xs truncate">マリア松島純子</span>
                      <span className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform">
                        <span>{locale === 'ja' ? '読む' : 'Read'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 3. Scores List (Default / Filtered) */}
        {activeTab !== 'articles' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                {searchQuery.trim()
                  ? (locale === 'ja' ? `「${searchQuery}」の検索結果: ${filteredScores.length}件` : `Search results: ${filteredScores.length}`)
                  : activeTab === 'octoechos'
                  ? (locale === 'ja' ? '主日八調 関連楽譜' : 'Octoechos Choral Scores')
                  : activeTab === 'liturgy'
                  ? (locale === 'ja' ? '聖体礼儀 関連楽譜' : 'Divine Liturgy Scores')
                  : activeTab === 'lent'
                  ? (locale === 'ja' ? '大斎・受難週 関連楽譜' : 'Lenten Scores')
                  : (locale === 'ja' ? 'すべての合唱譜面アーカイブ' : 'All Choral Scores')}
              </h3>
              <span className="text-2xs text-slate-400">
                {filteredScores.length} {locale === 'ja' ? '件' : 'scores'}
              </span>
            </div>

            {filteredScores.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center text-slate-500 dark:text-slate-400 space-y-3">
                <Search className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                <p className="text-sm font-medium">
                  {locale === 'ja' ? '該当する楽譜が見つかりませんでした' : 'No scores found.'}
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                >
                  {locale === 'ja' ? '検索をリセット' : 'Reset search'}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                  {filteredScores.slice(0, visibleCount).map(score => (
                    <div
                      key={score.id}
                      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs flex flex-col justify-between hover:border-indigo-400 transition-all group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold text-2xs">
                            PDF
                          </span>
                          {score.size && (
                            <span className="text-2xs text-slate-400">
                              {Math.round(score.size / 1024)} KB
                            </span>
                          )}
                        </div>

                        <h4 className="font-serif font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {score.title}
                        </h4>
                      </div>

                      <div className="pt-2.5 mt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-2xs text-slate-400 truncate max-w-[120px]" title={score.relativePath}>
                          {score.relativePath.split('/').pop()}
                        </span>
                        <a
                          href={`/${score.section}/${score.relativePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          <span>{locale === 'ja' ? '開く' : 'Open'}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {visibleCount < filteredScores.length && (
                  <div className="text-center pt-4">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 24)}
                      className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs transition-all"
                    >
                      {locale === 'ja'
                        ? `さらに楽譜を表示（残り ${filteredScores.length - visibleCount} 件）`
                        : `Load More (${filteredScores.length - visibleCount} remaining)`}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      {/* Reader Modal */}
      <ArticleReaderModal
        item={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <PortalFooter />
    </div>
  );
}
