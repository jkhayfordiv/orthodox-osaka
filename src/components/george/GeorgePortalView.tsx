'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { LIBRARY_DATA, LibraryItem, OrthodoxSubTopic } from '../../data/libraryCatalog';
import { ArticleReaderModal } from '../shared/ArticleReaderModal';
import { PortalNavHeader } from '../shared/PortalNavHeader';
import { PortalFooter } from '../shared/PortalFooter';
import {
  BookOpen,
  Sparkles,
  Flame,
  HelpCircle,
  Feather,
  Scroll,
  Church,
  Search,
  Clock,
  ChevronRight,
  Download,
  Layers,
  ChevronDown,
  ChevronUp,
  Tag,
  ArrowRight,
} from 'lucide-react';

interface ThematicGroup {
  id: OrthodoxSubTopic;
  title: { ja: string; en: string; ru: string };
  subtitle: { ja: string; en: string; ru: string };
  icon: any;
  badgeBg: string;
}

const THEMATIC_GROUPS: ThematicGroup[] = [
  {
    id: 'foundations',
    title: { ja: '正教会の信仰と基本', en: 'Foundations & Apostolic Faith', ru: 'Основы веры и Церковь' },
    subtitle: {
      ja: 'キリスト教の源流、聖書と聖伝、初代教会から受け継がれた信仰の根本',
      en: 'The apostolic origin, scripture and tradition, and the fundamental Christian faith',
      ru: 'Апостольские истоки, Священное Писание и Предание, неповрежденная вера',
    },
    icon: Sparkles,
    badgeBg: 'bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 border-amber-200 dark:border-amber-800',
  },
  {
    id: 'liturgy_prayer',
    title: { ja: '奉神礼・聖体礼儀・大斎', en: 'Liturgy, Lent & The Jesus Prayer', ru: 'Богослужение, Пост и Молитва' },
    subtitle: {
      ja: '聖体礼儀の神秘、大斎の祈りと回心、カリストス主教によるイエスの祈り解説',
      en: 'The Divine Liturgy, Great Lent spirituality, and the Jesus Prayer by Bishop Kallistos',
      ru: 'Божественная Литургия, покаяние Великого Поста и Иисусова молитва',
    },
    icon: Flame,
    badgeBg: 'bg-rose-100 text-rose-900 dark:bg-rose-950/80 dark:text-rose-200 border-rose-200 dark:border-rose-800',
  },
  {
    id: 'inquiries_qa',
    title: { ja: '信徒・求道者のＱ＆Ａ', en: 'Parish Life & Inquirer Q&A', ru: 'Вопросы и ответы о вере' },
    subtitle: {
      ja: '中学生の32の質問、他宗教との結婚、永眠者への祈り、痛悔、生活習慣の疑問',
      en: 'Answers to 32 inquirer questions, interfaith marriage, praying for departed family, confession',
      ru: 'Ответы на 32 вопроса, брак с иноверными, молитва об усопших, исповедь',
    },
    icon: HelpCircle,
    badgeBg: 'bg-sky-100 text-sky-900 dark:bg-sky-950/80 dark:text-sky-200 border-sky-200 dark:border-sky-800',
  },
  {
    id: 'fathers_saints',
    title: { ja: '聖師父・長老・諸聖人伝', en: 'Holy Fathers, Elders & Saints', ru: 'Святые отцы, старцы и жития' },
    subtitle: {
      ja: 'アトスの聖パイシイ対話録、サンフランシスコの聖イオアン主日講話、諸聖人の生涯',
      en: 'Elder Paisios dialogues, St. John of San Francisco homilies, and lives of ancient & modern saints',
      ru: 'Беседы старца Паисия, поучения святителя Иоанна Шанхайского и жития святых',
    },
    icon: Feather,
    badgeBg: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800',
  },
  {
    id: 'theology_church',
    title: { ja: '正教神学・教会論・歴史', en: 'Orthodox Theology & Ecclesiology', ru: 'Богословие и экклезиология' },
    subtitle: {
      ja: 'メイエンドルフ神父の教会理解、ホミャーコフのソボールノスチ、普遍的救済論',
      en: 'Fr. John Meyendorff on the Church, Khomiakov on Sobornost, response to Sola Scriptura',
      ru: 'О. Иоанн Мейендорф о Церкви, соборность Хомякова, ответ протестантизму',
    },
    icon: Scroll,
    badgeBg: 'bg-purple-100 text-purple-900 dark:bg-purple-950/80 dark:text-purple-200 border-purple-200 dark:border-purple-800',
  },
  {
    id: 'church_life',
    title: { ja: '教会生活・祭服・慣習', en: 'Church Life, Vestments & Heritage', ru: 'Жизнь Церкви и облачения' },
    subtitle: {
      ja: '12の聖職祭服（ステハリ・オラリ等）、埋葬式、聖堂の建築とイコンの図解',
      en: 'Complete guide to sacred vestments, Orthodox funerals, church architecture illustrations',
      ru: 'Литургические облачения священства, чин погребения, храмовое благочестие',
    },
    icon: Church,
    badgeBg: 'bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 border-amber-200 dark:border-amber-800',
  },
];

export function GeorgePortalView() {
  const { locale } = useApp();
  const [selectedArticle, setSelectedArticle] = useState<LibraryItem | null>(null);
  const [libraryFilter, setLibraryFilter] = useState<'thematic' | 'featured' | 'inquiries_qa' | 'paisi' | 'sanfjohn' | 'all'>('thematic');
  const [articleSearch, setArticleSearch] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [visibleCount, setVisibleCount] = useState(15);

  const georgeArticles = useMemo(() => {
    return LIBRARY_DATA.items.filter(item => item.section === 'george' && item.type === 'article');
  }, []);

  const georgePdfs = useMemo(() => {
    return LIBRARY_DATA.items.filter(item => item.section === 'george' && item.type === 'pdf');
  }, []);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredArticles = useMemo(() => {
    return georgeArticles.filter(item => {
      if (articleSearch.trim()) {
        const q = articleSearch.toLowerCase();
        const matchesTitle =
          item.title.toLowerCase().includes(q) ||
          (item.titleEn && item.titleEn.toLowerCase().includes(q)) ||
          (item.titleRu && item.titleRu.toLowerCase().includes(q));
        const matchesSnippet =
          item.snippet.toLowerCase().includes(q) ||
          (item.snippetEn && item.snippetEn.toLowerCase().includes(q));
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSnippet && !matchesTags) return false;
      }

      if (libraryFilter === 'featured') {
        const featuredIds = [
          'george_seikyoukaitoha',
          'george_questions',
          'george_gospel',
          'george_farthers',
          'george_liturgy',
          'george_whylent',
          'george_paisi',
          'george_conceptofchurch',
          'george_khomiakov',
          'george_stalexy',
        ];
        return featuredIds.includes(item.id);
      }
      if (libraryFilter === 'inquiries_qa') {
        return item.subTopic === 'inquiries_qa';
      }
      if (libraryFilter === 'paisi') {
        return item.relativePath.toLowerCase().includes('paisi') || item.title.includes('パイシイ');
      }
      if (libraryFilter === 'sanfjohn') {
        return item.relativePath.toLowerCase().includes('sanfjohn') || item.title.includes('サンフランシスコ');
      }
      return true;
    });
  }, [georgeArticles, articleSearch, libraryFilter]);

  const renderArticleCard = (item: LibraryItem) => {
    const cardTitle =
      locale === 'ru' && item.titleRu
        ? item.titleRu
        : locale !== 'ja' && item.titleEn
        ? item.titleEn
        : item.title;

    const cardSnippet =
      locale !== 'ja' && item.snippetEn ? item.snippetEn : item.snippet;

    return (
      <div
        key={item.id}
        onClick={() => setSelectedArticle(item)}
        className="group cursor-pointer rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-orthodox-gold/60 transition-all flex flex-col justify-between"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 font-medium text-2xs">
              {item.categoryLabel[locale] || item.categoryLabel.ja}
            </span>
            {item.readTimeMinutes && (
              <span className="flex items-center gap-1 text-slate-400 text-2xs">
                <Clock className="w-3 h-3" />
                <span>約{item.readTimeMinutes}分</span>
              </span>
            )}
          </div>

          <div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-orthodox-gold transition-colors line-clamp-2 leading-snug">
              {cardTitle}
            </h3>
            {locale !== 'ja' && item.title !== cardTitle && (
              <p className="text-2xs text-orthodox-gold/90 font-serif italic truncate mt-1" title={item.title}>
                {item.title}
              </p>
            )}
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
            {cardSnippet}
          </p>
        </div>

        <div className="pt-3.5 mt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="truncate pr-2 text-2xs">{item.author.split('(')[0]}</span>
          <span className="inline-flex items-center gap-1 text-orthodox-gold font-semibold group-hover:translate-x-1 transition-transform flex-shrink-0 text-xs">
            <span>{locale === 'ja' ? '全文を読む' : locale === 'ru' ? 'Читать' : 'Read Article'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <PortalNavHeader currentPortal="george" />

      {/* Hero Banner */}
      <div className="relative bg-orthodox-navy text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay">
          <img
            src="/church-photos/vespers-candlelight.jpg"
            alt="Theological Archive Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-orthodox-navy via-orthodox-navy/95 to-orthodox-navy/85 z-0" />

        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orthodox-gold/20 border border-orthodox-gold/40 text-orthodox-gold-light text-xs font-semibold">
            <Feather className="w-3.5 h-3.5" />
            <span>
              {locale === 'ja'
                ? '司祭ゲオルギイ松島雄一 著作・神学アーカイブ'
                : 'Archpriest George Matsushima Theological Archive'}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {locale === 'ja'
              ? '正教神学・教理・信仰問答ポータル'
              : 'Orthodox Theology, Catechism & Pastoral Guidance'}
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm lg:text-base max-w-3xl font-light leading-relaxed">
            {locale === 'ja'
              ? '初代教会と使徒たちから継承された純粋な信仰、聖師父の霊性、そして現代を生きる信徒・求道者の疑問に答える、司祭ゲオルギイ松島雄一による総合神学ライブラリです。'
              : 'A comprehensive theological portal presenting apostolic tradition, patristic spirituality, Elder Paisios dialogues, and pastoral answers to contemporary questions.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-orthodox-gold text-orthodox-navy font-bold text-xs shadow-xs">
              {georgeArticles.length} {locale === 'ja' ? '編の神学論文を収録' : 'theological essays indexed'}
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/10 text-white text-xs border border-white/15">
              {locale === 'ja' ? '6大テーマ別分類' : '6 Thematic Sections'}
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/10 text-white text-xs border border-white/15">
              {locale === 'ja' ? 'アトスの聖パイシイ対話録' : 'Elder Paisios Dialogues'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full">
        {/* Search & Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={articleSearch}
                onChange={e => setArticleSearch(e.target.value)}
                placeholder={
                  locale === 'ja'
                    ? '論文・テーマ・キーワードを検索（例: 祈り, パイシイ, 聖体礼儀, 大斎, 結婚, 救済）...'
                    : 'Search essays & themes (e.g. prayer, Paisios, liturgy, lent, marriage)...'
                }
                className="w-full pl-9 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orthodox-gold shadow-2xs"
              />
              {articleSearch && (
                <button
                  onClick={() => setArticleSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {[
                { id: 'thematic' as const, label: locale === 'ja' ? '体系別まとめ' : 'By Topic', icon: Layers },
                { id: 'featured' as const, label: locale === 'ja' ? '精選10選' : 'Top Picks', icon: Sparkles },
                { id: 'inquiries_qa' as const, label: locale === 'ja' ? 'Ｑ＆Ａ質問箱' : 'Q&A', icon: HelpCircle },
                { id: 'paisi' as const, label: locale === 'ja' ? '聖パイシイ対話' : 'St. Paisios', icon: Feather },
                { id: 'sanfjohn' as const, label: locale === 'ja' ? '聖イオアン説教' : 'St. John', icon: Scroll },
                { id: 'all' as const, label: locale === 'ja' ? '全件一覧' : 'All List', icon: Search },
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = libraryFilter === tab.id && !articleSearch;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setLibraryFilter(tab.id);
                      setArticleSearch('');
                      setVisibleCount(15);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-orthodox-gold text-orthodox-navy shadow-xs font-bold'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* View Mode 1: Thematic Accordion Showcase */}
        {libraryFilter === 'thematic' && !articleSearch.trim() && (
          <div className="space-y-10">
            {THEMATIC_GROUPS.map(group => {
              const GroupIcon = group.icon;
              const groupItems = georgeArticles.filter(i => i.subTopic === group.id);
              if (groupItems.length === 0) return null;

              const isExpanded = expandedSections[group.id] || false;
              const displayItems = isExpanded ? groupItems : groupItems.slice(0, 3);

              return (
                <div
                  key={group.id}
                  className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-6 sm:p-8 shadow-xs space-y-6 backdrop-blur-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${group.badgeBg} shadow-2xs flex-shrink-0`}>
                        <GroupIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                            {group.title[locale] || group.title.ja}
                          </h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-2xs font-semibold ${group.badgeBg}`}>
                            {groupItems.length} {locale === 'ja' ? '編' : 'articles'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {group.subtitle[locale] || group.subtitle.ja}
                        </p>
                      </div>
                    </div>

                    {groupItems.length > 3 && (
                      <button
                        onClick={() => toggleSection(group.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors self-start sm:self-auto flex-shrink-0"
                      >
                        <span>
                          {isExpanded
                            ? locale === 'ja'
                              ? '折りたたむ'
                              : 'Show less'
                            : locale === 'ja'
                            ? `全${groupItems.length}編を見る`
                            : `Show all ${groupItems.length}`}
                        </span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {displayItems.map((item: LibraryItem) => renderArticleCard(item))}
                  </div>

                  {!isExpanded && groupItems.length > 3 && (
                    <div className="pt-2 text-center">
                      <button
                        onClick={() => toggleSection(group.id)}
                        className="inline-flex items-center gap-1.5 text-xs text-orthodox-gold font-semibold hover:underline"
                      >
                        <span>
                          {locale === 'ja'
                            ? `他 ${groupItems.length - 3} 編の論文・解説を表示`
                            : `View ${groupItems.length - 3} more articles`}
                        </span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* View Mode 2: Search Results or Specific Tab Filter */}
        {(libraryFilter !== 'thematic' || articleSearch.trim().length > 0) && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>
                {articleSearch.trim()
                  ? locale === 'ja'
                    ? `「${articleSearch}」の検索結果: ${filteredArticles.length}件`
                    : `Search results for "${articleSearch}": ${filteredArticles.length}`
                  : locale === 'ja'
                  ? `表示件数: ${filteredArticles.length}編`
                  : `Showing: ${filteredArticles.length} articles`}
              </span>
              {libraryFilter !== 'thematic' && (
                <button
                  onClick={() => {
                    setLibraryFilter('thematic');
                    setArticleSearch('');
                  }}
                  className="text-orthodox-gold hover:underline font-medium"
                >
                  {locale === 'ja' ? '← 体系別まとめに戻る' : '← Back to Thematic Overview'}
                </button>
              )}
            </div>

            {filteredArticles.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center text-slate-500 dark:text-slate-400 space-y-3">
                <Search className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                <p className="text-sm font-medium">
                  {locale === 'ja' ? '該当する論文・文献が見つかりませんでした' : 'No articles found matching your criteria.'}
                </p>
                <button
                  onClick={() => {
                    setArticleSearch('');
                    setLibraryFilter('thematic');
                  }}
                  className="px-4 py-2 rounded-xl bg-orthodox-gold text-orthodox-navy font-bold text-xs"
                >
                  {locale === 'ja' ? '検索をリセット' : 'Reset search'}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredArticles.slice(0, visibleCount).map((item: LibraryItem) => renderArticleCard(item))}
                </div>

                {visibleCount < filteredArticles.length && (
                  <div className="text-center pt-4">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 15)}
                      className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs transition-all"
                    >
                      {locale === 'ja'
                        ? `さらに読み込む（残り ${filteredArticles.length - visibleCount} 編）`
                        : `Load More (${filteredArticles.length - visibleCount} remaining)`}
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
