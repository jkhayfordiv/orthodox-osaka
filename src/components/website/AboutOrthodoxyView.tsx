'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ABOUT_ORTHODOXY_DATA } from '../../data/parishWebsiteData';
import { LIBRARY_DATA, LibraryItem, OrthodoxSubTopic } from '../../data/libraryCatalog';
import { ArticleReaderModal } from '../shared/ArticleReaderModal';
import {
  BookOpen,
  Heart,
  Music,
  Flame,
  Sparkles,
  Church,
  Compass,
  Clock,
  ChevronRight,
  Search,
  Layers,
  HelpCircle,
  Feather,
  Scroll,
  ChevronDown,
  ChevronUp
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
      ru: 'Апостольские истоки, Священное Писание и Предание, неповрежденная вера'
    },
    icon: Sparkles,
    badgeBg: 'bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 border-amber-200 dark:border-amber-800'
  },
  {
    id: 'liturgy_prayer',
    title: { ja: '奉神礼・聖体礼儀・大斎', en: 'Liturgy, Lent & The Jesus Prayer', ru: 'Богослужение, Пост и Молитва' },
    subtitle: {
      ja: '聖体礼儀の神秘、大斎の祈りと回心、カリストス主教によるイエスの祈り解説',
      en: 'The Divine Liturgy, Great Lent spirituality, and the Jesus Prayer by Bishop Kallistos',
      ru: 'Божественная Литургия, покаяние Великого Поста и Иисусова молитва'
    },
    icon: Flame,
    badgeBg: 'bg-rose-100 text-rose-900 dark:bg-rose-950/80 dark:text-rose-200 border-rose-200 dark:border-rose-800'
  },
  {
    id: 'inquiries_qa',
    title: { ja: '信徒・求道者のＱ＆Ａ', en: 'Parish Life & Inquirer Q&A', ru: 'Вопросы и ответы о вере' },
    subtitle: {
      ja: '中学生の32の質問、他宗教との結婚、永眠者への祈り、痛悔、生活習慣の疑問',
      en: 'Answers to 32 inquirer questions, interfaith marriage, praying for departed family, confession',
      ru: 'Ответы на 32 вопроса, брак с иноверными, молитва об усопших, исповедь'
    },
    icon: HelpCircle,
    badgeBg: 'bg-sky-100 text-sky-900 dark:bg-sky-950/80 dark:text-sky-200 border-sky-200 dark:border-sky-800'
  },
  {
    id: 'fathers_saints',
    title: { ja: '聖師父・長老・諸聖人伝', en: 'Holy Fathers, Elders & Saints', ru: 'Святые отцы, старцы и жития' },
    subtitle: {
      ja: 'アトスの聖パイシイ対話録、サンフランシスコの聖イオアン主日講話、諸聖人の生涯',
      en: 'Elder Paisios dialogues, St. John of San Francisco homilies, and lives of ancient & modern saints',
      ru: 'Беседы старца Паисия, поучения святителя Иоанна Шанхайского и жития святых'
    },
    icon: Feather,
    badgeBg: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800'
  },
  {
    id: 'theology_church',
    title: { ja: '正教神学・教会論・歴史', en: 'Orthodox Theology & Ecclesiology', ru: 'Богословие и экклезиология' },
    subtitle: {
      ja: 'メイエンドルフ神父の教会理解、ホミャーコフのソボールノスチ、普遍的救済論',
      en: 'Fr. John Meyendorff on the Church, Khomiakov on Sobornost, response to Sola Scriptura',
      ru: 'О. Иоанн Мейендорф о Церкви, соборность Хомякова, ответ протестантизму'
    },
    icon: Scroll,
    badgeBg: 'bg-purple-100 text-purple-900 dark:bg-purple-950/80 dark:text-purple-200 border-purple-200 dark:border-purple-800'
  },
  {
    id: 'church_life',
    title: { ja: '教会生活・祭服・慣習', en: 'Church Life, Vestments & Heritage', ru: 'Жизнь Церкви и облачения' },
    subtitle: {
      ja: '12の聖職祭服（ステハリ・オラリ等）、埋葬式、聖堂の建築とイコンの図解',
      en: 'Complete guide to sacred vestments, Orthodox funerals, church architecture illustrations',
      ru: 'Литургические облачения священства, чин погребения, храмовое благочестие'
    },
    icon: Church,
    badgeBg: 'bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 border-amber-200 dark:border-amber-800'
  }
];

export function AboutOrthodoxyView() {
  const { locale, setActiveTab } = useApp();
  const [selectedArticle, setSelectedArticle] = useState<LibraryItem | null>(null);
  const [libraryFilter, setLibraryFilter] = useState<'thematic' | 'featured' | 'inquiries_qa' | 'paisi' | 'sanfjohn' | 'all'>('thematic');
  const [articleSearch, setArticleSearch] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [visibleCount, setVisibleCount] = useState(12);

  // All articles written by Fr. George
  const georgeArticles = useMemo(() => {
    return LIBRARY_DATA.items.filter(item => item.section === 'george' && item.type === 'article');
  }, []);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filtered articles when not in thematic overview or when searching
  const filteredArticles = useMemo(() => {
    return georgeArticles.filter(item => {
      // 1. Search filter
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

      // 2. Tab filter
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
          'george_stalexy'
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

  const getFilterTitle = (filter: string) => {
    switch (filter) {
      case 'featured':
        return locale === 'ja' ? '精選おすすめ文献（10選）' : 'Featured Top Picks';
      case 'inquiries_qa':
        return locale === 'ja' ? '信徒・求道者のＱ＆Ａ質問箱' : 'Inquirer & Parish Q&A';
      case 'paisi':
        return locale === 'ja' ? 'アトスの聖パイシイ対話録' : 'St. Paisios Dialogues';
      case 'sanfjohn':
        return locale === 'ja' ? '上海とサンフランシスコの聖イオアン主日講話' : 'St. John of San Francisco Homilies';
      case 'all':
        return locale === 'ja' ? 'すべての文献一覧' : 'All Articles';
      default:
        return locale === 'ja' ? '文献一覧' : 'Articles';
    }
  };

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
            <span>{locale === 'ja' ? '読む' : locale === 'ru' ? 'Читать' : 'Read'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-20">
      {/* Header Banner */}
      <div className="relative bg-orthodox-navy text-white py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
          <img
            src="/church-photos/vespers-candlelight.jpg"
            alt="Candlelight in Orthodox Church"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-orthodox-navy via-orthodox-navy/95 to-orthodox-navy/85 z-0" />

        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orthodox-gold/20 border border-orthodox-gold/40 text-orthodox-gold-light text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>
              {locale === 'ja'
                ? 'キリスト教の源流をたずねて'
                : locale === 'ru'
                ? 'Древняя апостольская традиция'
                : 'The Ancient Christian Faith'}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
            {locale === 'ja'
              ? '正教会（オーソドックス）とは？'
              : locale === 'ru'
              ? 'Что такое Православная Церковь?'
              : 'What is the Orthodox Church?'}
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm lg:text-base max-w-3xl font-light leading-relaxed">
            {locale === 'ja'
              ? '使徒たちから連綿と継承された古代キリスト教の純粋な信仰、人間の声による無伴奏の聖歌、そして生神女と聖人たちと共に捧げる天国の祈り。'
              : locale === 'ru'
              ? 'Непрерывное апостольское преемство, чистая вера святых отцов, духовная красота хорового пения и созерцание Небесного Царства.'
              : 'The apostolic faith preserved unchanged for two thousand years, choral harmony, sacred iconography, and contemplative prayer.'}
          </p>
        </div>
      </div>

      {/* Main Content Area: Widescreen Container */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Core Pillars: 3-Grid on PC */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 flex items-center justify-center mb-3 shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
              {locale === 'ja' ? '正統の信仰（オーソドクシア）' : locale === 'ru' ? 'Правая вера' : 'Right Glory & Truth'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {locale === 'ja'
                ? '「オーソドックス」とはギリシャ語で「正しく神を讃美する」ことを意味します。後世の教理的変更を行わず、キリストと使徒たちの教えをそのまま今日まで守り伝えています。'
                : locale === 'ru'
                ? 'Слово «Православие» означает правильное славление Бога. Церковь сохранила неповрежденным учение Христа Спасителя и апостолов сквозь века.'
                : 'From the Greek "orthos" (right) and "doxa" (glory/belief). The Church has faithfully kept the faith of the Ecumenical Councils without novel alterations.'}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 flex items-center justify-center mb-3 shadow-xs">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
              {locale === 'ja' ? '無伴奏の聖歌（ア・カペラ）' : locale === 'ru' ? 'Хоровое пение а капелла' : 'A Cappella Sacred Music'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {locale === 'ja'
                ? 'オルガン等の楽器を用いず、神が創造されたもっとも尊い「人間の生きた声」の調和によって賛美歌を歌います。日本語の祈祷文の豊かなリズムが聖堂に響きます。'
                : locale === 'ru'
                ? 'Богослужебное пение совершается исключительно человеческими голосами без механических инструментов, отражая чистоту молитвы ангельских чинов.'
                : 'Orthodox services feature choral vocal harmony without musical instruments, uniting the congregation in prayer like the angels before God.'}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 flex items-center justify-center mb-3 shadow-xs">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
              {locale === 'ja' ? '五感で味わう天国の美' : locale === 'ru' ? 'Небо на земле' : 'Heaven on Earth'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {locale === 'ja'
                ? '蜜蝋の蝋燭、香の薫り、光り輝くイコン（聖像）に包まれ、聖体礼儀を通じて天上の国と地上とが一つに結ばれる神秘を体験します。'
                : locale === 'ru'
                ? 'Свет свечей, аромат ладана, сияние золота икон являют верующим образ Небесного Царства, сошедшего на землю в Божественной Литургии.'
                : 'Incense, candlelight, and holy icons engage the whole human person, creating an atmosphere where heaven touches earth during the Divine Liturgy.'}
            </p>
          </div>
        </div>

        {/* Curated Fr. George & Orthodox Library Section */}
        {/* Curated Fr. George & Orthodox Library Section */}
        <div className="space-y-8 pt-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orthodox-gold mb-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>
                  {locale === 'ja'
                    ? '司祭ゲオルギイ松島雄一 文献アーカイブ'
                    : locale === 'ru'
                    ? 'Труды прот. Георгия Мацусима'
                    : 'Writings of Fr. George Matsushima'}
                </span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                {locale === 'ja'
                  ? '正教要理・神学・信仰問答アーカイブ'
                  : locale === 'ru'
                  ? 'Основы Православия и наставления'
                  : 'Catechism, Theology & Pastoral Guidance'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {locale === 'ja'
                  ? '初学者向けの手引から、信徒の日常の疑問、聖師父の教えまでテーマ別に体系化して整理しています。'
                  : 'Structured systematically by theme from beginner introductions to pastoral Q&A and writings of the Holy Fathers.'}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="px-3.5 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-xs font-semibold">
                {georgeArticles.length} {locale === 'ja' ? '編の著作をテーマ別収録' : 'articles indexed'}
              </span>
            </div>
          </div>

          {/* Search & Mode Switcher Bar */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={articleSearch}
                  onChange={e => setArticleSearch(e.target.value)}
                  placeholder={locale === 'ja' ? '文献を検索（例: 祈り, パイシイ, 聖体礼儀, 大斎, 結婚, 聖アレクシイ）...' : 'Search articles (e.g. prayer, Paisios, liturgy, fasting, marriage)...'}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orthodox-gold shadow-2xs"
                />
                {articleSearch && (
                  <button
                    onClick={() => setArticleSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { id: 'thematic' as const, label: locale === 'ja' ? '体系別まとめ' : 'By Topic', icon: Layers },
                  { id: 'featured' as const, label: locale === 'ja' ? '精選おすすめ' : 'Top Picks', icon: Sparkles },
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
                        setVisibleCount(12);
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                        isActive
                          ? 'bg-orthodox-gold text-orthodox-navy shadow-xs font-bold'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
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

          {/* MODE 1: Thematic Grouped View (When libraryFilter === 'thematic' and no search query) */}
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
                    className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-7 shadow-xs space-y-5 backdrop-blur-xs"
                  >
                    {/* Thematic Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${group.badgeBg} shadow-2xs flex-shrink-0`}>
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
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors self-start sm:self-auto flex-shrink-0"
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

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {displayItems.map((item: LibraryItem) => renderArticleCard(item))}
                    </div>

                    {/* Footer expansion indicator if collapsed */}
                    {!isExpanded && groupItems.length > 3 && (
                      <div className="pt-2 text-center">
                        <button
                          onClick={() => toggleSection(group.id)}
                          className="inline-flex items-center gap-1.5 text-xs text-orthodox-gold font-semibold hover:underline"
                        >
                          <span>{locale === 'ja' ? `他 ${groupItems.length - 3} 編の論文・解説を表示` : `View ${groupItems.length - 3} more articles`}</span>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* MODE 2: Filtered or Search View (When a specific filter tab or search is active) */}
          {(libraryFilter !== 'thematic' || articleSearch.trim().length > 0) && (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>
                  {articleSearch.trim()
                    ? locale === 'ja'
                      ? `「${articleSearch}」の検索結果: ${filteredArticles.length}件`
                      : `Search results for "${articleSearch}": ${filteredArticles.length}`
                    : locale === 'ja'
                    ? `${getFilterTitle(libraryFilter)}: ${filteredArticles.length}編`
                    : `${getFilterTitle(libraryFilter)}: ${filteredArticles.length} articles`}
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
                    {locale === 'ja' ? '該当する文献が見つかりませんでした' : 'No articles found matching your criteria.'}
                  </p>
                  <button
                    onClick={() => {
                      setArticleSearch('');
                      setLibraryFilter('thematic');
                    }}
                    className="px-4 py-2 rounded-xl bg-orthodox-gold text-orthodox-navy font-bold text-xs"
                  >
                    {locale === 'ja' ? 'フィルターをリセット' : 'Reset filters'}
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
                        onClick={() => setVisibleCount(prev => prev + 12)}
                        className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs transition-all"
                      >
                        {locale === 'ja' ? `さらに読み込む（残り ${filteredArticles.length - visibleCount} 編）` : `Load More (${filteredArticles.length - visibleCount} remaining)`}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Detailed FAQ: 2-Column Grid on PC */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
              {locale === 'ja' ? 'よくあるご質問と教会の教え' : locale === 'ru' ? 'Вопросы о вере и жизни Церкви' : 'Questions & Church Teachings'}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ABOUT_ORTHODOXY_DATA.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white flex items-start gap-2.5">
                    <span className="text-orthodox-gold font-sans font-bold">Q.</span>
                    <span>{item.question[locale]}</span>
                  </h3>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-6 mt-3">
                    {item.answer[locale].map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Article Reader Modal */}
        <ArticleReaderModal
          item={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />

        {/* Widescreen Interactive Callout for Prayer Book */}
        <div className="p-8 sm:p-10 rounded-3xl bg-orthodox-navy text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-md">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orthodox-gold-light text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{locale === 'ja' ? '正教会祈祷書・聖書通読' : locale === 'ru' ? 'Богослужебные тексты' : 'Orthodox Prayer & Scripture'}</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
              {locale === 'ja' ? '日々の祈り・聖体礼儀の祈祷文を三言語で体験' : locale === 'ru' ? 'Молитвы и последование Литургии на трёх языках' : 'Experience Daily Prayers & the Liturgy in 3 Languages'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light">
              {locale === 'ja'
                ? '当サイト・アプリでは、朝の祈り、晩の祈り、聖体礼儀解説、ディプティフ（生神名簿）を日本語・英語・ロシア語でいつでも閲覧できます。'
                : locale === 'ru'
                ? 'В приложении доступны утреннее и вечернее правила, чин Божественной Литургии и помянник на японском, английском и русском языках.'
                : 'Access morning and evening prayers, the Divine Liturgy with rubric explanations, and commemorative diptychs in Japanese, English, and Russian.'}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('reader')}
            className="px-6 py-3 rounded-xl bg-orthodox-gold hover:bg-orthodox-gold-light text-orthodox-navy font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2.5 flex-shrink-0"
          >
            <BookOpen className="w-4 h-4" />
            <span>{locale === 'ja' ? '祈祷書・聖書を開く' : locale === 'ru' ? 'Открыть молитвослов' : 'Open Prayer Book'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
