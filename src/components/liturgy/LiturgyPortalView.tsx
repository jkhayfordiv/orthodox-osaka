'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { LITURGY_CHRYSOSTOM, LiturgyPart } from '../../data/liturgy';
import { PRAYERS_DATA } from '../../data/prayers';
import { LIBRARY_DATA, LibraryItem } from '../../data/libraryCatalog';
import { ArticleReaderModal } from '../shared/ArticleReaderModal';
import { PortalNavHeader } from '../shared/PortalNavHeader';
import { PortalFooter } from '../shared/PortalFooter';
import { Locale } from '../../lib/types';
import {
  Church,
  Scroll,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Download,
  Search,
  SplitSquareVertical,
  Type,
  Sun,
  Moon,
  Flame,
  Award,
  FileText,
  Clock,
  ChevronRight,
  Cross,
  Sparkles,
} from 'lucide-react';

export function LiturgyPortalView() {
  const { locale, fontSize, setFontSize } = useApp();
  const [activeTab, setActiveTab] = useState<'liturgy' | 'cycle' | 'sacraments' | 'guides' | 'booklets'>('liturgy');
  const [selectedArticle, setSelectedArticle] = useState<LibraryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [parallelLang, setParallelLang] = useState<Locale | 'none'>('none');
  const [expandedLiturgyPart, setExpandedLiturgyPart] = useState<string | null>(null);
  const [liturgyType, setLiturgyType] = useState<'chrysostom' | 'basil' | 'presanctified'>('chrysostom');
  const [visibleCount, setVisibleCount] = useState(24);

  const fontSizeClasses = {
    sm: 'text-xs sm:text-sm leading-relaxed',
    base: 'text-sm sm:text-base leading-relaxed',
    lg: 'text-base sm:text-lg leading-relaxed',
    xl: 'text-lg sm:text-xl leading-relaxed',
  }[fontSize] || 'text-sm sm:text-base leading-relaxed';

  // Articles & PDFs in liturgy section
  const liturgyArticles = useMemo(() => {
    return LIBRARY_DATA.items.filter(
      item => item.section === 'liturgy' && item.type === 'article'
    );
  }, []);

  const liturgyPdfs = useMemo(() => {
    return LIBRARY_DATA.items.filter(
      item => item.section === 'liturgy' && item.type === 'pdf'
    );
  }, []);

  // Filtered booklets (PDFs)
  const filteredPdfs = useMemo(() => {
    return liturgyPdfs.filter(pdf => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        pdf.title.toLowerCase().includes(q) ||
        pdf.relativePath.toLowerCase().includes(q) ||
        (pdf.titleEn && pdf.titleEn.toLowerCase().includes(q))
      );
    });
  }, [liturgyPdfs, searchQuery]);

  // Filtered guides (Articles)
  const filteredArticles = useMemo(() => {
    return liturgyArticles.filter(art => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        art.title.toLowerCase().includes(q) ||
        art.snippet.toLowerCase().includes(q) ||
        (art.titleEn && art.titleEn.toLowerCase().includes(q))
      );
    });
  }, [liturgyArticles, searchQuery]);

  // Daily cycle service orders
  const dailyCycleServices = [
    {
      id: 'vespers',
      icon: Moon,
      title: { ja: '晩課（ばんか）', en: 'Great Vespers', ru: 'Вечерня' },
      subtitle: { ja: '日没時の祈り・一日の始まりの礼拝', en: 'Evening service marking the beginning of the liturgical day', ru: 'Вечернее богослужение начала нового дня' },
      desc: {
        ja: '夕暮れ時に捧げる礼拝です。詩篇103編（天地創造の詩）、首詩篇「主よ我汝を呼ぶ」、聖光讃歌「静かなる光」、ポロキメンなどを歌い祈ります。',
        en: 'Celebrated at sunset. Includes Psalm 103 (Creation Psalm), "Lord I Have Cried", "O Gladsome Light" (Phos Hilaron), and the evening Prokimenon.',
        ru: 'Совершается на заходе солнца. Включает 103-й псалом, «Господи, воззвах», «Свете тихий» и вечерний прокимен.',
      },
    },
    {
      id: 'matins',
      icon: Sun,
      title: { ja: '早課（そうか）', en: 'Matins / Orthros', ru: 'Утреня' },
      subtitle: { ja: '払暁・朝の祈り・復活の光の礼拝', en: 'Morning office welcoming the spiritual dawn and Resurrection', ru: 'Утреннее богослужение, встреча Света Христова' },
      desc: {
        ja: '夜明けに捧げる豊かな礼拝です。六詩篇、神は主なり、カノン（讃頌）、大讃頌「いと高きには神に栄光」などを歌い、光としてのハリストスを迎えます。',
        en: 'Sung before sunrise or on the eve. Features the Six Psalms, "God is the Lord", the Canon odes, and the Great Doxology.',
        ru: 'Включает Шестопсалмие, «Бог Господь», канон и Великое Славословие.',
      },
    },
    {
      id: 'hours',
      icon: Clock,
      title: { ja: '各時課（一時・三時・六時・九時課）', en: 'The Little Hours (1st, 3rd, 6th, 9th)', ru: 'Часы (1-й, 3-й, 6-й, 9-й)' },
      subtitle: { ja: '一日の時刻を聖化する詩篇の祈祷', en: 'Sanctifying the hours of the day with sacred Psalms', ru: 'Освящение времени суток молитвой и псалмами' },
      desc: {
        ja: '一時課（朝）、三時課（聖神降臨）、六時課（十字架刑）、九時課（ハリストスの受難と死）の各時刻に合わせ、特定の詩篇3編と祈祷文を唱えます。',
        en: 'Commemorates Christ’s passion and Pentecost: 1st (Dawn), 3rd (Descent of Holy Spirit), 6th (Crucifixion), 9th (Christ’s death on the Cross).',
        ru: 'Воспоминание сошествия Святого Духа (3-й), Распятия (6-й) и смерти Спасителя на Кресте (9-й).',
      },
    },
    {
      id: 'compline',
      icon: Moon,
      title: { ja: '終課（しゅうか） / 大終課', en: 'Compline / Great Compline', ru: 'Повечерие / Великое повечерие' },
      subtitle: { ja: '就寝前の安息と悔い改めの祈り', en: 'After-supper prayers of repentance and peaceful rest', ru: 'Молитвы на сон грядущим и покаяние' },
      desc: {
        ja: '夕食後・就寝前に捧げられる礼拝です。大斎期間中には「神我等と共にす」を高らかに歌う感動的な大終課が捧げられます。',
        en: 'Service before sleep. During Great Lent, the moving Great Compline is served with "God is with us" (Isaiah).',
        ru: 'Молитвенное завершение дня. В Великий Пост совершается умилительное Великое повечерие с пением «С нами Бог».',
      },
    },
  ];

  // Sacraments and occasional services
  const sacramentServices = [
    {
      title: { ja: '機密（サクラメント）の奉神礼', en: 'Holy Mysteries (Sacraments)', ru: 'Святые Таинства' },
      items: [
        {
          name: { ja: '洗礼機密・傅膏機密', en: 'Holy Baptism & Chrismation', ru: 'Таинство Крещения и Миропомазания' },
          desc: { ja: '水に三度浸す古代の正統な洗礼と、聖神の賜物を受ける傅膏機密。', en: 'Triple immersion baptism and the gift of the Holy Spirit.', ru: 'Троекратное погружение в купель и печать дара Духа Святого.' },
        },
        {
          name: { ja: '痛悔機密（告白）', en: 'Holy Confession & Repentance', ru: 'Таインство Покаяния (Исповедь)' },
          desc: { ja: '福音経と十字架の前でハリストスに罪を告白し、赦宣を受ける機密。', en: 'Confession before Christ with the priest as witness, receiving absolution.', ru: 'Исповедь перед Крестом и Евангелием и разрешение грехов.' },
        },
        {
          name: { ja: '婚配機密（婚姻・戴冠）', en: 'Holy Matrimony (Crowning)', ru: 'Таинство Брака (Венчание)' },
          desc: { ja: '冠を戴き、愛と信仰によって二人が一つの体となる神聖な機密。', en: 'Crowning of the bride and groom into an eternal spiritual union.', ru: 'Венчание жениха и невесты во образ союза Христа и Церкви.' },
        },
        {
          name: { ja: '聖傅機密（病者の塗油）', en: 'Holy Unction', ru: 'Таинство Елеосвящения (Соборование)' },
          desc: { ja: '病気や苦しみにある者の心身の癒しと罪の赦しを祈る油の機密。', en: 'Anointing for healing of soul and body and forgiveness of sins.', ru: 'Помазание освященным елеем во исцеление души и тела.' },
        },
      ],
    },
    {
      title: { ja: '記念祈祷・祝福・諸祈祷', en: 'Memorials & Blessings', ru: 'Молебны и поминовения' },
      items: [
        {
          name: { ja: 'パニヒダ・埋葬式（永眠者記念）', en: 'Panikhida & Funeral Service', ru: 'Панихида и Чин погребения' },
          desc: { ja: '永眠した信徒の魂の永遠の安息と記憶を願う祈祷（コリワの祝福）。', en: 'Solemn memorial prayers for the repose and eternal memory of departed Christians.', ru: 'Заупокойное богослужение о упокоении душ усопших рабов Божиих.' },
        },
        {
          name: { ja: '水祈祷（小・大聖水式）', en: 'Blessing of Waters (Agiasmos)', ru: 'Водоосвящение (малое и великое)' },
          desc: { ja: '神現祭の大聖水式、および毎月・新築時に行う小聖水祈祷。', en: 'Great Blessing of Waters at Theophany and Lesser Blessing of Waters.', ru: 'Великое освящение вод в праздник Богоявления и малое водоосвящение.' },
        },
        {
          name: { ja: '家屋祝聖・感謝祈祷', en: 'House Blessings & Thanksgiving', ru: 'Освящение дома и благодарственный молебен' },
          desc: { ja: '新たな住まいへの神の祝福を願う祈祷、および日々の恵みに感謝する感謝式。', en: 'Sanctifying dwellings and offering heartfelt gratitude for divine blessings.', ru: 'Призывание благословения Божия на жилище и благодарение за милости.' },
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <PortalNavHeader currentPortal="liturgy" />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-red-950 via-orthodox-navy to-red-950 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
          <img
            src="/church-photos/vespers-candlelight.jpg"
            alt="Liturgical Service Order"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/95 via-slate-950/90 to-red-950/95 z-0" />

        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs font-semibold">
            <Scroll className="w-3.5 h-3.5 text-rose-300" />
            <span>
              {locale === 'ja'
                ? '日本正教会 奉神礼・祈祷書・式文ポータル'
                : 'Orthodox Liturgy, Service Books & Rubrics'}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {locale === 'ja'
              ? '正教奉神礼 式文・祈祷書アーカイブ'
              : 'Orthodox Divine Services & Liturgical Texts'}
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm lg:text-base max-w-3xl font-light leading-relaxed">
            {locale === 'ja'
              ? '天上の讃美を地上に映す聖体礼儀、晩課・早課の日課奉神礼、洗礼・戴冠・パニヒダの諸機密式文、および220点以上の奉神礼小冊子PDFを網羅した総合祈祷文ポータルです。'
              : 'A comprehensive liturgical repository featuring the Divine Liturgy of St. John Chrysostom, Daily Office, Sacramental orders, and over 220 service booklets.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-orthodox-gold text-orthodox-navy font-bold text-xs shadow-xs flex items-center gap-1.5">
              <Church className="w-3.5 h-3.5" />
              <span>{locale === 'ja' ? '聖金口イオアン聖体礼儀 完備' : 'Divine Liturgy of St. John Chrysostom'}</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white/10 text-white text-xs border border-white/15 flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-rose-300" />
              <span>{liturgyPdfs.length} {locale === 'ja' ? '冊の奉神礼PDF冊子' : 'Service Booklets'}</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white/10 text-white text-xs border border-white/15 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>{liturgyArticles.length} {locale === 'ja' ? '編の奉神礼講座' : 'Liturgical Lectures'}</span>
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
              { id: 'liturgy' as const, label: locale === 'ja' ? '聖体礼儀式文' : 'Divine Liturgy', icon: Church },
              { id: 'cycle' as const, label: locale === 'ja' ? '日課奉神礼（晩課・早課）' : 'Daily Office', icon: Sun },
              { id: 'sacraments' as const, label: locale === 'ja' ? '機密・諸祈祷・パニヒダ' : 'Mysteries & Memorials', icon: Sparkles },
              { id: 'guides' as const, label: locale === 'ja' ? '奉神礼講座・手引' : 'Liturgical Guides', icon: BookOpen },
              { id: 'booklets' as const, label: locale === 'ja' ? '奉神礼小冊子PDF' : 'PDF Booklets', icon: Download },
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
                      ? 'bg-rose-900 text-orthodox-gold-light shadow-xs font-bold border border-orthodox-gold/40'
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
                  ? '式文・祈祷・冊子を検索（例: 聖体礼儀, 晩課, パニヒダ, 聖水式）...'
                  : 'Search services & booklets (e.g. Liturgy, Vespers, Panikhida)...'
              }
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-2xs"
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

        {/* ========================================================
            TAB 1: Divine Liturgy Service Order (Text Reader)
            ======================================================== */}
        {activeTab === 'liturgy' && (
          <div className="space-y-6">
            {/* Liturgy Type Selector & Controls */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 font-bold text-2xs uppercase">
                    Divine Liturgy
                  </span>
                  <span className="text-2xs text-slate-400">三言語対応・式順解説</span>
                </div>
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                  {liturgyType === 'chrysostom'
                    ? (locale === 'ja' ? '聖金口イオアン聖体礼儀' : 'Divine Liturgy of St. John Chrysostom')
                    : liturgyType === 'basil'
                    ? (locale === 'ja' ? '聖大ワシリイ聖体礼儀' : 'Divine Liturgy of St. Basil the Great')
                    : (locale === 'ja' ? '先賦聖体礼儀（大斎水・金）' : 'Liturgy of the Presanctified Gifts')}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {liturgyType === 'chrysostom'
                    ? (locale === 'ja' ? '年間を通じて主日・祝日に執り行われる最も標準的な聖体礼儀の全祈祷式順です。' : 'The standard celebration of the Eucharist throughout the liturgical year.')
                    : liturgyType === 'basil'
                    ? (locale === 'ja' ? '大斎の主日、降誕祭・神現祭前夜、聖大木曜・聖大土曜等、年に10回のみ献じられる荘厳な聖体礼儀です。' : 'Served 10 times a year with extended Eucharistic Anaphora prayers.')
                    : (locale === 'ja' ? '大斎期間中の水曜・金曜に執り行われる、前主日に聖別された聖体をお分かちする聖体礼儀です。' : 'Served on Wednesdays and Fridays of Great Lent.')}
                </p>
              </div>

              {/* Liturgy Switching Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap flex-shrink-0">
                <button
                  onClick={() => setLiturgyType('chrysostom')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    liturgyType === 'chrysostom'
                      ? 'bg-rose-900 text-orthodox-gold shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {locale === 'ja' ? '金口イオアン' : 'Chrysostom'}
                </button>
                <button
                  onClick={() => setLiturgyType('basil')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    liturgyType === 'basil'
                      ? 'bg-rose-900 text-orthodox-gold shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {locale === 'ja' ? '大ワシリイ' : 'St. Basil'}
                </button>
                <button
                  onClick={() => setLiturgyType('presanctified')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    liturgyType === 'presanctified'
                      ? 'bg-rose-900 text-orthodox-gold shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {locale === 'ja' ? '先賦礼儀' : 'Presanctified'}
                </button>
              </div>
            </div>

            {/* Liturgy Reading Controls: Parallel Language & Font Size */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-2">
                <SplitSquareVertical className="w-4 h-4 text-orthodox-gold" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  {locale === 'ja' ? '並行対照表示:' : 'Parallel Language:'}
                </span>
                <div className="flex bg-slate-200/70 dark:bg-slate-800 rounded-lg p-0.5 text-xs">
                  {[
                    { id: 'none' as const, label: locale === 'ja' ? '単一言語' : 'Single' },
                    { id: 'ja' as const, label: '日本語' },
                    { id: 'en' as const, label: 'English' },
                    { id: 'ru' as const, label: 'Русский' },
                  ].map(lang => (
                    <button
                      key={lang.id}
                      onClick={() => setParallelLang(lang.id as any)}
                      className={`px-2 py-1 rounded-md transition-all font-medium ${
                        parallelLang === lang.id
                          ? 'bg-orthodox-gold text-orthodox-navy font-bold shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="flex items-center gap-1.5 bg-slate-200/70 dark:bg-slate-800 p-0.5 rounded-lg text-xs">
                <Type className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
                {(['sm', 'base', 'lg', 'xl'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`px-2 py-1 rounded-md font-medium transition-all ${
                      fontSize === size
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Liturgy Parts List */}
            <div className="space-y-3">
              {LITURGY_CHRYSOSTOM.map((part: LiturgyPart) => {
                const isExpanded = expandedLiturgyPart === part.id || expandedLiturgyPart === 'all';
                return (
                  <div
                    key={part.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setExpandedLiturgyPart(isExpanded ? null : part.id)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="space-y-1 pr-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-orthodox-gold bg-orthodox-gold/15 px-2 py-0.5 rounded">
                            {part.section || part.celebrant}
                          </span>
                        </div>
                        <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                          {part.title[locale]}
                        </h3>
                      </div>
                      <div className="text-slate-400">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-4 sm:p-6 pt-0 border-t border-slate-100 dark:border-slate-800 mt-2 space-y-4">
                        {part.rubric && (
                          <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-orthodox-gold text-xs italic text-slate-600 dark:text-slate-300">
                            {part.rubric[locale]}
                          </div>
                        )}

                        {parallelLang === 'none' || parallelLang === locale ? (
                          <p className={`font-serif whitespace-pre-line text-slate-800 dark:text-slate-200 leading-relaxed ${fontSizeClasses}`}>
                            {part.text[locale]}
                          </p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                            <div className="space-y-1 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 pb-3 md:pb-0 md:pr-4">
                              <span className="text-[10px] font-bold uppercase text-orthodox-gold tracking-wider">
                                {locale.toUpperCase()}
                              </span>
                              <p className={`font-serif whitespace-pre-line text-slate-800 dark:text-slate-200 ${fontSizeClasses}`}>
                                {part.text[locale]}
                              </p>
                            </div>
                            <div className="space-y-1 md:pl-2">
                              <span className="text-[10px] font-bold uppercase text-orthodox-gold tracking-wider">
                                {parallelLang.toUpperCase()}
                              </span>
                              <p className={`font-serif whitespace-pre-line text-slate-800 dark:text-slate-200 ${fontSizeClasses}`}>
                                {part.text[parallelLang]}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: Daily Cycle Services (Vespers, Matins, Hours)
            ======================================================== */}
        {activeTab === 'cycle' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                {locale === 'ja' ? '日課奉神礼（時の祈り・一日の奉事周期）' : 'Daily Liturgical Cycle (The Hours of Prayer)'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {locale === 'ja'
                  ? '教会暦の一日は夕刻の晩課より始まります。日没から夜明け、そして昼間に至る祈りの式順です。'
                  : 'In Orthodox tradition, the liturgical day begins at sunset with Vespers, continuing through Matins and the Hours.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dailyCycleServices.map(service => {
                const SIcon = service.icon;
                return (
                  <div
                    key={service.id}
                    className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 flex items-center justify-center shadow-xs">
                          <SIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                            {service.title[locale]}
                          </h4>
                          <span className="text-2xs text-orthodox-gold font-medium">
                            {service.subtitle[locale]}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {service.desc[locale]}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-2xs text-slate-400">時課祈祷書（チャソスロフ）</span>
                      <Link
                        href="/maria"
                        className="inline-flex items-center gap-1 text-orthodox-gold font-bold hover:underline"
                      >
                        <span>{locale === 'ja' ? '聖歌譜面を見る' : 'Choral Scores'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: Sacraments & Occasional Prayers (Memorials)
            ======================================================== */}
        {activeTab === 'sacraments' && (
          <div className="space-y-8">
            {sacramentServices.map((group, gIdx) => (
              <div key={gIdx} className="space-y-4">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                    {group.title[locale]}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2"
                    >
                      <h4 className="font-serif font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-600" />
                        <span>{item.name[locale]}</span>
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-4">
                        {item.desc[locale]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================
            TAB 4: Liturgical Lectures & Guides (Articles)
            ======================================================== */}
        {activeTab === 'guides' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                {locale === 'ja' ? '奉神礼基礎講座・式順解説アーカイブ' : 'Liturgical Lectures & Guidebook'}
              </h3>
              <span className="text-2xs text-slate-400">
                {filteredArticles.length} {locale === 'ja' ? '編の解説' : 'articles'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredArticles.slice(0, visibleCount).map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelectedArticle(item)}
                  className="group cursor-pointer rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xs hover:shadow-md hover:border-rose-400 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 text-2xs font-semibold">
                        {item.categoryLabel[locale] || item.categoryLabel.ja}
                      </span>
                      {item.readTimeMinutes && (
                        <span className="flex items-center gap-1 text-slate-400 text-2xs">
                          <Clock className="w-3 h-3" />
                          <span>約{item.readTimeMinutes}分</span>
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {item.snippet}
                    </p>
                  </div>

                  <div className="pt-3.5 mt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="text-2xs truncate">{item.author.split('(')[0]}</span>
                    <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold group-hover:translate-x-1 transition-transform">
                      <span>{locale === 'ja' ? '解説を読む' : 'Read Guide'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < filteredArticles.length && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setVisibleCount(prev => prev + 24)}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs transition-all"
                >
                  {locale === 'ja'
                    ? `さらに読み込む（残り ${filteredArticles.length - visibleCount} 編）`
                    : `Load More (${filteredArticles.length - visibleCount} remaining)`}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 5: Liturgical PDF Booklets Library (220+ PDFs)
            ======================================================== */}
        {activeTab === 'booklets' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                {locale === 'ja' ? '奉神礼小冊子・祈祷書PDF一覧' : 'Liturgical Service Booklets & PDFs'}
              </h3>
              <span className="text-2xs text-slate-400">
                {filteredPdfs.length} {locale === 'ja' ? '件のPDF冊子' : 'PDF booklets'}
              </span>
            </div>

            {filteredPdfs.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center text-slate-500 dark:text-slate-400 space-y-3">
                <Search className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                <p className="text-sm font-medium">
                  {locale === 'ja' ? '該当する小冊子が見つかりませんでした' : 'No booklets found.'}
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-xl bg-rose-900 text-white font-bold text-xs"
                >
                  {locale === 'ja' ? '検索をリセット' : 'Reset search'}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                  {filteredPdfs.slice(0, visibleCount).map(pdf => (
                    <div
                      key={pdf.id}
                      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs flex flex-col justify-between hover:border-rose-400 transition-all group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold text-2xs">
                            PDF
                          </span>
                          {pdf.size && (
                            <span className="text-2xs text-slate-400">
                              {Math.round(pdf.size / 1024)} KB
                            </span>
                          )}
                        </div>

                        <h4 className="font-serif font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                          {pdf.title}
                        </h4>
                      </div>

                      <div className="pt-2.5 mt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-2xs text-slate-400 truncate max-w-[120px]" title={pdf.relativePath}>
                          {pdf.relativePath.split('/').pop()}
                        </span>
                        <a
                          href={`/${pdf.section}/${pdf.relativePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-900 hover:text-white text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          <span>{locale === 'ja' ? '開く' : 'Open'}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {visibleCount < filteredPdfs.length && (
                  <div className="text-center pt-4">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 24)}
                      className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs transition-all"
                    >
                      {locale === 'ja'
                        ? `さらに小冊子を表示（残り ${filteredPdfs.length - visibleCount} 件）`
                        : `Load More (${filteredPdfs.length - visibleCount} remaining)`}
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
