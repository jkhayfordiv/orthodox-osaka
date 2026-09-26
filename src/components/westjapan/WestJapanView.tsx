'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { PortalNavHeader } from '../shared/PortalNavHeader';
import {
  WEST_JAPAN_DIOCESE,
  DioceseChurch,
  DioceseEvent,
} from '../../data/westJapanData';
import { Locale } from '../../lib/types';
import {
  Church,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Search,
  Filter,
  Calendar,
  Clock,
  Sparkles,
  ChevronRight,
  X,
  Compass,
  BookOpen,
  ArrowRight,
  Shield,
  Video,
  Award,
  Share2,
  Navigation,
  Info,
} from 'lucide-react';

export function WestJapanView() {
  const { locale } = useApp();
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChurch, setSelectedChurch] = useState<DioceseChurch | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [selectedEventLeaflet, setSelectedEventLeaflet] = useState<string | null>(null);

  const diocese = WEST_JAPAN_DIOCESE;

  const regions = [
    { id: 'all', label: { ja: 'すべての教会', en: 'All Parishes', ru: 'Все приходы' }, count: diocese.churches.length },
    { id: 'kinki', label: { ja: '近畿（京都・大阪・神戸・和歌山）', en: 'Kinki (Kyoto, Osaka, Kobe, Wakayama)', ru: 'Кинки (Киото, Осака, Кобэ, Вакаяма)' }, count: diocese.churches.filter(c => c.region === 'kinki').length },
    { id: 'tokai', label: { ja: '東海・中部（名古屋・豊橋・半田）', en: 'Tokai & Chubu (Nagoya, Toyohashi, Handa)', ru: 'Токай и Тюбу (Нагоя, Тоёхаси, Ханда)' }, count: diocese.churches.filter(c => c.region === 'tokai').length },
    { id: 'chugoku-shikoku', label: { ja: '中国・四国（徳島・柳井原）', en: 'Chugoku & Shikoku (Tokushima, Yanaihara)', ru: 'Тюгоку и Сикоку (Токусима, Янаихара)' }, count: diocese.churches.filter(c => c.region === 'chugoku-shikoku').length },
    { id: 'kyushu', label: { ja: '九州（福岡・熊本・人吉・鹿児島）', en: 'Kyushu (Fukuoka, Kumamoto, Hitoyoshi, Kagoshima)', ru: 'Кюсю (Фукуока, Кумамото, Хитоёси, Кагосима)' }, count: diocese.churches.filter(c => c.region === 'kyushu').length },
    { id: 'assemblies', label: { ja: '地区集会（広島・宮崎）', en: 'Assemblies (Hiroshima, Miyazaki)', ru: 'Общины (Хиросима, Миядзаки)' }, count: diocese.assemblies.length },
  ];

  // Filtered churches
  const filteredChurches = useMemo(() => {
    return diocese.churches.filter((church) => {
      // Region filter
      if (selectedRegion !== 'all' && church.region !== selectedRegion) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchName =
          church.name.ja.toLowerCase().includes(q) ||
          church.name.en.toLowerCase().includes(q) ||
          church.name.ru.toLowerCase().includes(q);
        const matchSaint =
          church.patronSaint.ja.toLowerCase().includes(q) ||
          church.patronSaint.en.toLowerCase().includes(q);
        const matchAddress =
          church.address.ja.toLowerCase().includes(q) ||
          church.address.en.toLowerCase().includes(q);
        const matchPriest =
          church.priest.ja.toLowerCase().includes(q) ||
          church.priest.en.toLowerCase().includes(q);
        const matchHistory = church.history.ja.toLowerCase().includes(q);

        return matchName || matchSaint || matchAddress || matchPriest || matchHistory;
      }
      return true;
    });
  }, [diocese.churches, selectedRegion, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-20 font-sans">
      <PortalNavHeader currentPortal="westjapan" />

      {/* ========================================================
          2. GRAND HERO: DIOCESE IDENTITY, METROPOLITAN & CATHEDRAL
      ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orthodox-navy via-slate-900 to-orthodox-navy text-white pt-10 pb-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orthodox-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 7 Columns: Editorial Welcome & Jurisdiction Title */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-orthodox-gold-light">
                <Church className="w-4 h-4 text-orthodox-gold" />
                <span>
                  {locale === 'ja'
                    ? '聖自治日本正教会 · 東海・近畿・中国・四国・九州'
                    : locale === 'ru'
                    ? 'Автономная Православная Церковь в Японии · Западная епархия'
                    : 'The Autonomous Orthodox Church in Japan · Western Diocese'}
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                  {locale === 'ja' ? (
                    <>
                      <span className="inline-block">聖自治日本正教会</span>{' '}
                      <span className="inline-block">西日本<wbr />主教教区</span>
                    </>
                  ) : (
                    diocese.title[locale]
                  )}
                </h1>
                <p className="font-serif text-base sm:text-xl text-amber-200/90 font-light italic">
                  {locale === 'ja' ? (
                    <>
                      <span className="inline-block">近畿・東海・中国・四国・九州</span>{' '}
                      <span className="inline-block">各府県の正教会・聖堂・会堂のご案内</span>
                    </>
                  ) : (
                    diocese.subtitle[locale]
                  )}
                </p>
              </div>

              <p className="font-serif text-sm sm:text-base lg:text-lg text-slate-200 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {locale === 'ja'
                  ? '西日本主教教区は、京都の主教座聖堂をはじめ、大阪、神戸、名古屋、豊橋、半田、和歌山、徳島、柳井原、福岡、熊本、人吉、鹿児島、および広島・宮崎の地区集会からなる日本正教会の教区です。使徒時代より連綿と受け継がれた信仰と奉神礼の祈りを捧げています。'
                  : locale === 'ru'
                  ? 'Западно-Японская епархия объединяет собор в Киото, приходы в Осаке, Кобэ, Нагое, Тоёхаси, Ханде, Вакаяме, Токусиме, Янаихаре, Фукуоке, Кумамото, Хитоёси, Кагосиме и общины в Хиросиме и Миядзаки.'
                  : 'The Western Diocese comprises parishes across Western Japan, centered around the Holy Annunciation Cathedral in Kyoto, together with historic temples in Osaka, Kobe, Nagoya, Toyohashi, Handa, Wakayama, Tokushima, Yanaihara, Fukuoka, Kumamoto, Hitoyoshi, and Kagoshima.'}
              </p>

              {/* Quick Jump Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('churches-directory');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-orthodox-gold hover:bg-orthodox-gold-light text-orthodox-navy font-bold text-xs sm:text-sm transition-all shadow-md transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Church className="w-4 h-4 text-orthodox-navy" />
                  <span>{locale === 'ja' ? '各地の教会一覧を見る' : locale === 'ru' ? 'Список приходов' : 'Browse Parishes'}</span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('events-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-orthodox-gold-light" />
                  <span>{locale === 'ja' ? 'お知らせ・行事' : locale === 'ru' ? 'События и лекции' : 'Events & News'}</span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('chancery-contact');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-orthodox-gold-light" />
                  <span>{locale === 'ja' ? '教区宗務局へ問合せ' : locale === 'ru' ? 'Епархия' : 'Diocese Office'}</span>
                </button>
              </div>

              {/* Diocese Quick Stats Bar */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-orthodox-gold">13</div>
                  <div className="text-[11px] text-slate-300 font-medium">
                    {locale === 'ja' ? '聖堂・会堂' : locale === 'ru' ? 'Храмов' : 'Churches'}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-orthodox-gold">2</div>
                  <div className="text-[11px] text-slate-300 font-medium">
                    {locale === 'ja' ? '地区集会' : locale === 'ru' ? 'Общины' : 'Assemblies'}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-orthodox-gold">8</div>
                  <div className="text-[11px] text-slate-300 font-medium">
                    {locale === 'ja' ? '府県に展開' : locale === 'ru' ? 'Префектур' : 'Prefectures'}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-orthodox-gold">1873〜</div>
                  <div className="text-[11px] text-slate-300 font-medium">
                    {locale === 'ja' ? '伝道の歴史' : locale === 'ru' ? 'История' : 'History'}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Metropolitan Card & Kyoto Cathedral Card */}
            <div className="lg:col-span-5 space-y-4">
              {/* Metropolitan Seraphim Card */}
              <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-orthodox-gold/30 shadow-2xl p-4 sm:p-5 flex items-center gap-4">
                <img
                  src={diocese.hierarch.photo}
                  alt={diocese.hierarch.name[locale]}
                  className="w-24 h-32 sm:w-28 sm:h-36 rounded-xl object-cover border border-orthodox-gold/60 shadow-md flex-shrink-0"
                />
                <div className="space-y-1.5">
                  <div className="text-[11px] uppercase tracking-wider text-orthodox-gold font-bold">
                    {diocese.hierarch.title[locale]}
                  </div>
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug">
                    {diocese.hierarch.name[locale]}
                  </h2>
                  {diocese.hierarch.note && (
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-orthodox-gold/20 text-orthodox-gold-light text-2xs font-medium border border-orthodox-gold/40">
                      {diocese.hierarch.note[locale]}
                    </div>
                  )}
                  <p className="text-2xs text-slate-300 pt-1">
                    {locale === 'ja'
                      ? '聖自治日本正教会 首座主教'
                      : locale === 'ru'
                      ? 'Предстоятель Японской Православной Церкви'
                      : 'Primate of the Autonomous Orthodox Church of Japan'}
                  </p>
                </div>
              </div>

              {/* Cathedral Highlight Card */}
              <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/15 shadow-xl p-4 sm:p-5">
                <div className="flex items-start gap-4">
                  <img
                    src={diocese.cathedral.photo}
                    alt={diocese.cathedral.name[locale]}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-white/20 shadow-md flex-shrink-0"
                  />
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-2xs font-semibold border border-amber-500/30">
                      <Award className="w-3 h-3 text-orthodox-gold" />
                      <span>国指定重要文化財</span>
                    </div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-white truncate">
                      {diocese.cathedral.name[locale]}
                    </h3>
                    <p className="text-2xs text-slate-300 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-orthodox-gold flex-shrink-0" />
                      <span>{diocese.cathedral.address[locale]}</span>
                    </p>
                    <div className="flex items-center gap-3 pt-1 text-2xs">
                      <a
                        href={`tel:${diocese.cathedral.phone}`}
                        className="text-orthodox-gold-light hover:underline font-mono"
                      >
                        {diocese.cathedral.phone}
                      </a>
                      <button
                        onClick={() => {
                          const kyoto = diocese.churches.find((c) => c.id === 'kyoto');
                          if (kyoto) {
                            setSelectedChurch(kyoto);
                            setActivePhotoIdx(0);
                          }
                        }}
                        className="text-white hover:text-orthodox-gold font-bold underline decoration-orthodox-gold"
                      >
                        {locale === 'ja' ? '詳細を見る →' : 'Details →'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. DIOCESAN ANNOUNCEMENT & LECTURE SERIES
      ======================================================== */}
      <section id="events-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-[1440px] mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orthodox-burgundy dark:text-orthodox-gold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{locale === 'ja' ? '主教区 行事・講座案内' : 'Diocese Events & Lectures'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {locale === 'ja' ? '行事・特別公開・講座' : 'Announcements & Lectures'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {locale === 'ja'
              ? '西日本主教教区および教区センターで開催される行事と連続講座のご案内です。'
              : 'Events and liturgical lectures hosted across the Western Diocese.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Featured Event with Leaflet Image */}
          {diocese.events.map((evt, idx) => (
            <div
              key={idx}
              className="md:col-span-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orthodox-burgundy/10 dark:bg-orthodox-burgundy/30 text-orthodox-burgundy dark:text-red-300 font-bold text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{evt.date} {evt.time}</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-orthodox-gold" />
                    <span>{evt.venue}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  {/* Leaflet Thumbnail */}
                  {evt.leafletImage && (
                    <div
                      className="sm:col-span-4 cursor-pointer group relative rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 aspect-[3/4]"
                      onClick={() => setSelectedEventLeaflet(evt.leafletImage || null)}
                    >
                      <img
                        src={evt.leafletImage}
                        alt={evt.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-orthodox-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                        <span>拡大して見る 🔍</span>
                      </div>
                    </div>
                  )}

                  <div className="sm:col-span-8 space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                        {evt.title}
                      </h3>
                      {evt.subtitle && (
                        <p className="text-sm font-semibold text-orthodox-gold-dark dark:text-orthodox-gold-light">
                          {evt.subtitle}
                        </p>
                      )}
                    </div>

                    {evt.speaker && (
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                        <div className="text-slate-500 dark:text-slate-400 font-medium">ご登壇・講師</div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {evt.speaker}
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {locale === 'ja'
                        ? '京都ハリストス正教会教区センターにて開催される特別企画。詩の朗読と深い文化的なお話をお届けします。'
                        : 'A special cultural event hosted at the Kyoto Orthodox Diocesan Center.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 dark:border-slate-800 mt-4">
                {evt.youtubeUrl && (
                  <a
                    href={evt.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>YouTube 配信 ↗</span>
                  </a>
                )}
                {evt.leafletImage && (
                  <button
                    onClick={() => setSelectedEventLeaflet(evt.leafletImage || null)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors"
                  >
                    <span>チラシを拡大表示</span>
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Right Column: Lecture Series Card */}
          <div className="md:col-span-4 rounded-2xl bg-gradient-to-br from-orthodox-navy to-slate-900 text-white border border-orthodox-gold/30 shadow-sm p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-orthodox-gold-light font-bold text-2xs border border-white/15">
                <BookOpen className="w-3 h-3 text-orthodox-gold" />
                <span>教区連続講座</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                  {diocese.lecture.title}
                </h3>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-200 border border-red-500/30 text-xs font-semibold">
                  {diocese.lecture.status}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {locale === 'ja'
                  ? '正教会の奉神礼（礼拝と機密）の意義と歴史を体系的に学ぶ連続講座です。詳細および過去の講義資料は公式ページをご覧ください。'
                  : 'Systematic lecture series on the theology and history of Orthodox divine services.'}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10">
              <a
                href={diocese.lecture.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 rounded-xl bg-orthodox-gold hover:bg-orthodox-gold-light text-orthodox-navy font-bold text-xs transition-all shadow-sm"
              >
                <span>奉神礼講座 公式ページ ↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. INTERACTIVE PARISH DIRECTORY: SEARCH, FILTER, CARDS
      ======================================================== */}
      <section id="churches-directory" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-[1440px] mx-auto space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orthodox-gold-dark dark:text-orthodox-gold">
            <Church className="w-4 h-4 text-orthodox-gold" />
            <span>西日本主教教区内教会のご案内</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            {locale === 'ja' ? '各地の教会・聖堂・会堂' : 'Churches & Parishes of the Diocese'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {locale === 'ja'
              ? '東海・近畿・中国・四国・九州に建つ、すべてのハリストス正教会です。'
              : 'Directory of all Orthodox temples and communities across Western Japan.'}
          </p>
        </div>

        {/* Search Bar & Region Tabs */}
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                locale === 'ja'
                  ? '教会名、都市名、司祭名、文化財・山下りんで検索…'
                  : 'Search by church name, city, priest, or iconographer...'
              }
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orthodox-gold shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Region Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedRegion === reg.id
                    ? 'bg-orthodox-navy dark:bg-orthodox-gold text-white dark:text-orthodox-navy shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{reg.label[locale]}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    selectedRegion === reg.id
                      ? 'bg-white/20 text-white dark:bg-orthodox-navy/20 dark:text-orthodox-navy'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {reg.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Churches Grid */}
        {selectedRegion !== 'assemblies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChurches.map((church) => (
              <div
                key={church.id}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Thumbnail */}
                  <div
                    className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer"
                    onClick={() => {
                      setSelectedChurch(church);
                      setActivePhotoIdx(0);
                    }}
                  >
                    <img
                      src={church.photos[0] || '/brand/church-seal-round.png'}
                      alt={church.name[locale]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent pointer-events-none" />

                    {/* Designation or Cathedral Badge */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {church.isCathedral && (
                        <span className="px-2.5 py-1 rounded-lg bg-orthodox-gold text-orthodox-navy text-2xs font-extrabold shadow-sm">
                          主教座聖堂
                        </span>
                      )}
                      {church.designation && (
                        <span className="px-2.5 py-1 rounded-lg bg-orthodox-navy/90 text-orthodox-gold-light text-2xs font-semibold backdrop-blur-sm border border-orthodox-gold/40 shadow-sm">
                          {church.designation[locale]}
                        </span>
                      )}
                    </div>

                    {/* Region Pill & Photo Count */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 text-2xs text-white">
                      <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm font-semibold">
                        {church.photos.length} 枚の写真
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 text-white">
                      <div className="text-2xs uppercase tracking-wider text-orthodox-gold-light font-bold">
                        {church.regionLabel[locale]}
                      </div>
                    </div>
                  </div>

                  {/* Church Content */}
                  <div className="p-5 space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                        {church.name[locale]}
                      </h3>
                      <p className="text-xs font-semibold text-orthodox-gold-dark dark:text-orthodox-gold-light">
                        {church.patronSaint[locale]}
                      </p>
                    </div>

                    {/* Priest in charge */}
                    <div className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                      <Church className="w-3.5 h-3.5 text-orthodox-gold flex-shrink-0" />
                      <span>{church.priest[locale]}</span>
                    </div>

                    {/* Address & Access Brief */}
                    <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{church.address[locale]}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <Navigation className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{church.access[locale]}</span>
                      </div>
                    </div>

                    {/* Short excerpt of history */}
                    <p className="text-2xs text-slate-600 dark:text-slate-300 line-clamp-2 pt-1 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                      {church.history.ja}
                    </p>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/80 mt-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={church.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs transition-colors"
                      title="Google Maps"
                    >
                      <MapPin className="w-4 h-4 text-red-500" />
                    </a>

                    <a
                      href={`tel:${church.phone}`}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs transition-colors font-mono"
                      title={church.phone}
                    >
                      <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </a>

                    {church.email && (
                      <a
                        href={`mailto:${church.email}`}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs transition-colors"
                        title={church.email}
                      >
                        <Mail className="w-4 h-4 text-blue-500" />
                      </a>
                    )}

                    {church.website && (
                      <a
                        href={church.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs transition-colors"
                        title="公式ウェブサイト"
                      >
                        <ExternalLink className="w-4 h-4 text-orthodox-gold" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedChurch(church);
                      setActivePhotoIdx(0);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-orthodox-navy dark:bg-orthodox-gold hover:opacity-90 text-white dark:text-orthodox-navy text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                  >
                    <span>詳しく見る</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* District Assemblies Section (Hiroshima & Miyazaki) */}
        {(selectedRegion === 'all' || selectedRegion === 'assemblies') && (
          <div className="pt-6 space-y-4">
            <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Compass className="w-5 h-5 text-orthodox-gold" />
                <span>地区集会・伝道所（広島・宮崎）</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
                定期的な巡回礼拝や信徒の祈りの集いが開かれています。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {diocese.assemblies.map((assembly) => (
                <div
                  key={assembly.id}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-2xs">
                      <span>地区集会</span>
                    </div>
                    <h4 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                      {assembly.name[locale]}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {assembly.schedule[locale]}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="text-slate-500 dark:text-slate-400">
                      {assembly.contact[locale]}
                    </div>
                    <a
                      href={`tel:${assembly.phone}`}
                      className="font-mono text-orthodox-gold font-bold flex items-center gap-1 hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{assembly.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ========================================================
          5. DIOCESAN CHANCERY (教区宗務局) & CONTACT
      ======================================================== */}
      <section id="chancery-contact" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-[1440px] mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-orthodox-navy to-slate-900 text-white border border-orthodox-gold/40 shadow-xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-orthodox-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orthodox-gold-light text-xs font-semibold border border-white/15">
              <Mail className="w-4 h-4 text-orthodox-gold" />
              <span>西日本主教教区 宗務局</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight text-white">
              {locale === 'ja'
                ? 'お問い合わせ・主教区宗務局'
                : 'Inquiries & Diocesan Chancery'}
            </h2>

            <p className="font-serif text-sm sm:text-base text-slate-200 font-light leading-relaxed">
              {locale === 'ja'
                ? '西日本主教教区へのご質問、見学、礼拝参加、各地の教会に関するお問い合わせは、教区宗務局（京都ハリストス正教会内）までお気軽にご連絡ください。'
                : 'For all inquiries regarding the Western Diocese, parish visits, services, and official diocesan matters, please contact the Diocesan Chancery.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
                <div className="text-2xs uppercase tracking-wider text-orthodox-gold font-bold">
                  {locale === 'ja' ? '所在地（京都主教座教会内）' : 'Office Location'}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white">
                  {diocese.cathedral.address[locale]}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
                <div className="text-2xs uppercase tracking-wider text-orthodox-gold font-bold">
                  {locale === 'ja' ? '電話番号' : 'Phone'}
                </div>
                <a
                  href={`tel:${diocese.chancery.phone}`}
                  className="text-xs sm:text-sm font-bold text-white hover:text-orthodox-gold-light font-mono"
                >
                  {diocese.chancery.phone}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`mailto:${diocese.chancery.email}`}
                className="px-6 py-3.5 rounded-xl bg-orthodox-gold hover:bg-orthodox-gold-light text-orthodox-navy font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-orthodox-navy" />
                <span>メールで問い合わせる ({diocese.chancery.email})</span>
              </a>

              <a
                href={`tel:${diocese.chancery.phone}`}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-orthodox-gold-light" />
                <span>電話をかける ({diocese.chancery.phone})</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. PARISH DETAIL MODAL (HIGH RESOLUTION PHOTOS + HISTORY)
      ======================================================== */}
      {selectedChurch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-y-auto flex flex-col">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-2xs uppercase tracking-wider text-orthodox-gold-dark dark:text-orthodox-gold font-bold">
                  {selectedChurch.regionLabel[locale]}
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {selectedChurch.name[locale]}
                </h3>
              </div>
              <button
                onClick={() => setSelectedChurch(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Photo Gallery Carousel */}
              {selectedChurch.photos.length > 0 && (
                <div className="space-y-3">
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950 shadow-md">
                    <img
                      src={selectedChurch.photos[activePhotoIdx]}
                      alt={selectedChurch.name[locale]}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-2xs text-white font-medium">
                      {activePhotoIdx + 1} / {selectedChurch.photos.length}
                    </div>
                  </div>

                  {/* Thumbnail Row */}
                  {selectedChurch.photos.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {selectedChurch.photos.map((p, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActivePhotoIdx(idx)}
                          className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                            activePhotoIdx === idx
                              ? 'border-orthodox-gold shadow-sm scale-105'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={p} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Church Key Info Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="text-slate-400 font-medium">聖堂名（守護聖人）</div>
                  <div className="font-serif font-bold text-sm text-slate-900 dark:text-white">
                    {selectedChurch.patronSaint[locale]}
                  </div>
                  {selectedChurch.designation && (
                    <div className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-orthodox-burgundy/10 text-orthodox-burgundy dark:text-red-300 font-semibold text-2xs">
                      {selectedChurch.designation[locale]}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="text-slate-400 font-medium">管轄司祭</div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {selectedChurch.priest[locale]}
                  </div>
                  <div className="text-slate-500 font-mono text-2xs pt-1">
                    TEL: {selectedChurch.phone}
                  </div>
                </div>
              </div>

              {/* Full Historical Narrative */}
              <div className="space-y-2">
                <h4 className="font-serif text-base font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-orthodox-gold" />
                  <span>教会の歴史・概要</span>
                </h4>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-serif">
                  {selectedChurch.history.ja}
                </div>
              </div>

              {/* Access & Transit */}
              <div className="space-y-2">
                <h4 className="font-serif text-base font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-orthodox-gold" />
                  <span>所在地・交通アクセス</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                  〒{selectedChurch.postalCode} {selectedChurch.address[locale]}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {selectedChurch.access[locale]}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={selectedChurch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Google マップで開く ↗</span>
                </a>

                <a
                  href={`tel:${selectedChurch.phone}`}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 font-mono shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>{selectedChurch.phone}</span>
                </a>

                {selectedChurch.email && (
                  <a
                    href={`mailto:${selectedChurch.email}`}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>メールを送る</span>
                  </a>
                )}

                {selectedChurch.website && (
                  <a
                    href={selectedChurch.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-orthodox-gold hover:bg-orthodox-gold-light text-orthodox-navy font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>公式ウェブサイト ↗</span>
                  </a>
                )}

                {selectedChurch.youtube && (
                  <a
                    href={selectedChurch.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-red-800 hover:bg-red-900 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Video className="w-4 h-4" />
                    <span>YouTube ↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          7. LEAFLET ZOOM MODAL
      ======================================================== */}
      {selectedEventLeaflet && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedEventLeaflet(null)}
        >
          <div className="relative max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl">
            <button
              onClick={() => setSelectedEventLeaflet(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedEventLeaflet}
              alt="Event Leaflet"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* ========================================================
          8. MODERN DIOCESAN FOOTER
      ======================================================== */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-12 px-4 sm:px-6 lg:px-8 text-xs mt-12">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-serif font-bold text-base">
                <Church className="w-5 h-5 text-orthodox-gold flex-shrink-0" />
                <span>{diocese.title[locale]}</span>
              </div>
              <p className="text-2xs text-slate-500 font-serif">
                {locale === 'ja'
                  ? '聖自治日本正教会 西日本主教教区 主教座教会：京都ハリストス正教会'
                  : 'Autonomous Orthodox Church in Japan · Western Diocese'}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                〒604-0965 {diocese.cathedral.address[locale]} · Tel. {diocese.cathedral.phone}
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-2xs">
                {locale === 'ja' ? '主な教会・拠点' : 'Diocese Centers'}
              </div>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button
                    onClick={() => {
                      const kyoto = diocese.churches.find((c) => c.id === 'kyoto');
                      if (kyoto) {
                        setSelectedChurch(kyoto);
                        setActivePhotoIdx(0);
                      }
                    }}
                    className="hover:text-orthodox-gold transition-colors"
                  >
                    京都主教座聖堂（国指定重要文化財）
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const osaka = diocese.churches.find((c) => c.id === 'osaka');
                      if (osaka) {
                        setSelectedChurch(osaka);
                        setActivePhotoIdx(0);
                      }
                    }}
                    className="hover:text-orthodox-gold transition-colors"
                  >
                    大阪ハリストス正教会（生神女庇護聖堂）
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const nagoya = diocese.churches.find((c) => c.id === 'nagoya');
                      if (nagoya) {
                        setSelectedChurch(nagoya);
                        setActivePhotoIdx(0);
                      }
                    }}
                    className="hover:text-orthodox-gold transition-colors"
                  >
                    名古屋ハリストス正教会（神現聖堂）
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const fukuoka = diocese.churches.find((c) => c.id === 'fukuoka');
                      if (fukuoka) {
                        setSelectedChurch(fukuoka);
                        setActivePhotoIdx(0);
                      }
                    }}
                    className="hover:text-orthodox-gold transition-colors"
                  >
                    福岡ハリストス正教会（九州巡回拠点）
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-2xs">
                {locale === 'ja' ? 'リンク・関連教会' : 'Affiliated Sites'}
              </div>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <Link href="/" className="hover:text-orthodox-gold transition-colors font-bold text-orthodox-gold">
                    大阪ハリストス正教会 公式サイト・信徒アプリ ↗
                  </Link>
                </li>
                <li>
                  <a
                    href="https://kyoto-orthodox.or.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orthodox-gold transition-colors"
                  >
                    京都ハリストス正教会 公式サイト ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://orthodoxnagoya.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orthodox-gold transition-colors"
                  >
                    名古屋ハリストス正教会 公式サイト ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ocj-kyushu.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orthodox-gold transition-colors"
                  >
                    九州の教会（福岡・熊本・人吉・鹿児島） ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-2xs text-slate-500">
            <span>© 2026 聖自治日本正教会 西日本主教教区 (Western Diocese of the Orthodox Church in Japan). All rights reserved.</span>
            <div className="flex items-center gap-3">
              <Link href="/" className="hover:underline text-orthodox-gold font-semibold">
                大阪正教会トップへ
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
