'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { PARISH_INFO } from '../../data/terminology';
import { BELL_RESTORATION_DATA } from '../../data/parishWebsiteData';
import { PARISH_ANNOUNCEMENTS } from '../../data/bulletin';
import { SERMONS_ARCHIVE } from '../../data/sermonsArchive';
import { getDayInfo } from '../../lib/calendarEngine';
import { PhotoGallerySection } from './PhotoGallerySection';
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Phone,
  Mail,
  Sparkles,
  Church,
  ChevronRight,
  FileText,
  Download,
  CalendarDays,
  Compass,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';

export function HomeWebsiteView() {
  const { locale, setActiveTab, parishSchedule } = useApp();
  const dayInfo = getDayInfo(new Date(), parishSchedule);

  // Latest sermon for active language
  const latestSermon =
    SERMONS_ARCHIVE.find((s) => s.language === locale) || SERMONS_ARCHIVE[0];

  // Upcoming services
  const todayStr = new Date().toISOString().split('T')[0];
  const upcomingServices = parishSchedule
    .filter((s) => s.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date));
  const nextService = upcomingServices[0] || parishSchedule[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-20">
      {/* ========================================================
          1. MODERN IMMERSIVE HERO WITH DAYLIGHT TEMPLE & REVERENT WELCOME
      ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orthodox-navy via-slate-900 to-orthodox-navy text-white pt-10 pb-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle background ambient blur */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orthodox-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 7 Columns: Editorial Welcome & Parish Identity */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Parish Badge & Jurisdiction */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-orthodox-gold-light">
                <Church className="w-4 h-4 text-orthodox-gold" />
                <span>
                  {locale === 'ja'
                    ? '日本ハリストス正教会 西日本主教区'
                    : locale === 'ru'
                    ? 'Японская Православная Церковь · Западная епархия'
                    : 'Autonomous Orthodox Church in Japan · Western Diocese'}
                </span>
              </div>

              {/* Grand Main Title */}
              <div className="space-y-2">
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                  {PARISH_INFO.name[locale]}
                </h1>
                <p className="font-serif text-base sm:text-xl text-amber-200/90 font-light italic">
                  {locale === 'ja'
                    ? '聖生神女庇護祭（ポクロフ）の聖堂 · 吹田市山手町'
                    : locale === 'ru'
                    ? 'Храм Покрова Пресвятой Богородицы в Осаке (Суита)'
                    : 'Holy Protection Temple in Suita, Osaka'}
                </p>
              </div>

              {/* Warm Hospitable Welcome Paragraph */}
              <p className="font-serif text-sm sm:text-base lg:text-lg text-slate-200 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {locale === 'ja'
                  ? '大阪ハリストス正教会は、初代教会より受け継がれた使徒的信仰、無伴奏の清らかな聖歌、そして生神女の庇護のもとに祈りを捧げる教会です。見学や祈りを求められるすべての方を温かく歓迎いたします。'
                  : locale === 'ru'
                  ? 'Православный приход в Осаке. Древняя неизменная христианская вера, чистота богослужения и молитвенный покров Пречистой Девы. Двери храма открыты для каждого.'
                  : 'Welcome to the Osaka Orthodox Church. Preserving the apostolic faith, pure choral worship, and the prayers of the saints under the Protection of the Mother of God. All visitors and inquirers are warmly welcome.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('visit-hours');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-orthodox-gold hover:bg-orthodox-gold-light text-orthodox-navy font-bold text-xs sm:text-sm transition-all shadow-md transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Clock className="w-4 h-4 text-orthodox-navy" />
                  <span>{locale === 'ja' ? '見学と礼拝時間' : locale === 'ru' ? 'Часы служб' : 'Visit & Service Hours'}</span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('bell-appeal');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-bold text-xs sm:text-sm backdrop-blur-xs border border-red-400/40 transition-all shadow-sm flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 text-red-200" />
                  <span>{locale === 'ja' ? '大鐘修復の支援' : locale === 'ru' ? 'Помощь колокольне' : 'Bell Restoration'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('sermons')}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-orthodox-gold-light" />
                  <span>{locale === 'ja' ? '主日説教集' : locale === 'ru' ? 'Проповеди' : 'Sunday Sermons'}</span>
                </button>
              </div>

              {/* Live Liturgical Status Chip */}
              <div className="pt-2 inline-flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-xs text-slate-300 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/10">
                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-orthodox-gold" />
                  <span>
                    {new Date().toLocaleDateString(locale === 'ja' ? 'ja-JP' : locale === 'ru' ? 'ru-RU' : 'en-US', {
                      month: 'short',
                      day: 'numeric',
                      weekday: 'short',
                    })}
                  </span>
                </div>
                {dayInfo.tone > 0 && (
                  <span className="font-bold text-orthodox-gold-light">
                    {locale === 'ja' ? `第${dayInfo.tone}調` : locale === 'ru' ? `Глас ${dayInfo.tone}` : `Tone ${dayInfo.tone}`}
                  </span>
                )}
                <div className="flex items-center gap-1">
                  <span>{dayInfo.fasting.icon}</span>
                  <span>{dayInfo.fasting.badgeText[locale]}</span>
                </div>
                {nextService && (
                  <span className="text-amber-200">
                    {locale === 'ja' ? '次: ' : locale === 'ru' ? 'Служба: ' : 'Next: '}
                    {nextService.title[locale]} ({nextService.date} {nextService.time})
                  </span>
                )}
              </div>
            </div>

            {/* Right 5 Columns: Daylight Temple Photograph in Modern Framed Canvas */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 dark:border-orthodox-gold/30 bg-slate-900 aspect-4/3 group">
                <img
                  src="/photos/osaka-church-daylight.jpg"
                  alt="Osaka Orthodox Church Daylight Exterior"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                  <div>
                    <div className="font-serif font-bold text-sm">
                      {locale === 'ja' ? '吹田の緑に包まれた聖堂全景' : locale === 'ru' ? 'Храм в окружении зелени' : 'Osaka Temple Sanctuary'}
                    </div>
                    <div className="text-[11px] text-slate-300">
                      {PARISH_INFO.access[locale]}
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('access')}
                    className="p-2 rounded-xl bg-orthodox-gold text-orthodox-navy hover:bg-white transition-colors"
                    title="Map & Access"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. MAIN CONTENT CANVAS (Widescreen 12-Column Grid)
      ======================================================== */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-12">
        {/* ========================================================
            FEATURE 1: BELL RESTORATION APPEAL (Modern Horizontal Editorial Card)
        ======================================================== */}
        <section
          id="bell-appeal"
          className="rounded-3xl border border-red-200 dark:border-red-900/50 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-lg relative overflow-hidden"
        >
          {/* Subtle watermark background icon */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-red-600/5 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 5 Columns: Dual Authentic Bell Photos */}
            <div className="lg:col-span-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-4/3 bg-slate-900">
                  <img
                    src="/photos/bell-timber-historic.jpg"
                    alt="Historic Russian Bell on Timbers"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-4/3 bg-slate-900">
                  <img
                    src="/photos/bell-belfry-tower.jpg"
                    alt="Belfry Tower and Hanging Bell"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-serif italic px-1">
                <span>
                  {locale === 'ja' ? '① 落下した歴史的大鐘' : locale === 'ru' ? '① Старинный колокол' : '① Fallen Russian Bell'}
                </span>
                <span>
                  {locale === 'ja' ? '② 鐘楼上部フレーム' : locale === 'ru' ? '② Звонница в ремонте' : '② Belfry Framework'}
                </span>
              </div>
            </div>

            {/* Right 7 Columns: Compelling Narrative & Donation Action */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                  {BELL_RESTORATION_DATA.subtitle[locale]}
                </span>
                <span className="px-3 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-[11px] font-bold">
                  {BELL_RESTORATION_DATA.status[locale]}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white leading-snug">
                {BELL_RESTORATION_DATA.title[locale]}
              </h2>

              <p className="font-serif text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {BELL_RESTORATION_DATA.descriptionParagraphs[locale][0]}{' '}
                {BELL_RESTORATION_DATA.descriptionParagraphs[locale][1]}
              </p>

              {/* Donation Info Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-900/50 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {locale === 'ja' ? '目標金額（工事総予算）' : locale === 'ru' ? 'Цель сбора' : 'Target Budget'}
                    </div>
                    <div className="text-xl sm:text-2xl font-serif font-bold text-orthodox-navy dark:text-amber-300">
                      ¥4,570,000
                    </div>
                  </div>

                  <a
                    href={BELL_RESTORATION_DATA.creditCardUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md transform hover:-translate-y-0.5 flex-shrink-0"
                  >
                    <Heart className="w-4 h-4 text-white" />
                    <span>
                      {locale === 'ja'
                        ? 'クレジットカードで寄付する'
                        : locale === 'ru'
                        ? 'Пожертвовать картой'
                        : 'Donate via Credit Card'}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-amber-200/60 dark:border-slate-700">
                  <div className="text-slate-700 dark:text-slate-300">
                    <span className="font-sans font-semibold block text-[11px] text-slate-500">
                      {BELL_RESTORATION_DATA.bankInfo.bankName[locale]}
                    </span>
                    {BELL_RESTORATION_DATA.bankInfo.branch[locale]}
                  </div>
                  <div className="text-slate-700 dark:text-slate-300">
                    <span className="font-sans font-semibold block text-[11px] text-slate-500">
                      {locale === 'ja' ? '郵便振替:' : locale === 'ru' ? 'Почтовый перевод:' : 'Postal Account:'}
                    </span>
                    {BELL_RESTORATION_DATA.bankInfo.postalAccount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            FEATURE 2: SIDE-BY-SIDE 2-COLUMN GRID
            (Left 6: Weekly Bulletin & Guide | Right 6: Latest Sermon with Gospel Icon)
        ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT 6 COLS: Weekly Parish Bulletin & Guide */}
          <div className="lg:col-span-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-orthodox-gold/20 text-orthodox-gold flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-orthodox-gold">
                    {locale === 'ja' ? '教会報・公式パンフレット' : locale === 'ru' ? 'Приходской вестник' : 'Weekly Parish Bulletin'}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">PDF</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {locale === 'ja'
                  ? '吹田聖堂の由来と今週の教会報'
                  : locale === 'ru'
                  ? 'Официальный буклет храма и расписание'
                  : 'Parish Guide & Weekly Bulletin'}
              </h3>

              <p className="font-serif text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {locale === 'ja'
                  ? '聖堂の由来、奉神礼の流れ、信徒の心得が記載された総合案内パンフレットです。今週の信徒の集いや行事予定もご確認いただけます。'
                  : locale === 'ru'
                  ? 'Официальный буклет прихода с описанием богослужений, историей храма и актуальным расписанием.'
                  : 'Comprehensive introductory booklet and weekly bulletin covering church history, liturgical service orders, and schedule.'}
              </p>

              {/* Preview Box */}
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-800/60 border border-amber-200/60 dark:border-slate-700 flex items-center gap-3.5">
                <div className="w-12 h-16 rounded-lg bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 shadow-xs flex items-center justify-center text-amber-800 dark:text-amber-200 flex-shrink-0">
                  <FileText className="w-7 h-7" />
                </div>
                <div className="min-w-0">
                  <div className="font-serif font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                    Osaka Orthodox Church Bulletin (English / Japanese)
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    PDF Document · 2.4 MB
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href="https://orthodox-jp.com/osaka/wp-content/uploads/2025/05/English.pdf"
                target="_blank"
                rel="noreferrer noopener"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orthodox-navy hover:bg-orthodox-navy/90 text-white font-bold text-xs sm:text-sm transition-colors shadow-sm flex-1"
              >
                <Download className="w-4 h-4 text-orthodox-gold" />
                <span>{locale === 'ja' ? '教会報PDFを閲覧・保存' : locale === 'ru' ? 'Скачать PDF' : 'Download Guide & Bulletin'}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <button
                onClick={() => setActiveTab('access')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-colors text-center"
              >
                {locale === 'ja' ? '参祷マナーを見る' : locale === 'ru' ? 'Правила храма' : 'Visitor Guide'}
              </button>
            </div>
          </div>

          {/* RIGHT 6 COLS: Latest Sunday Sermon with Gospel Icon */}
          <div className="lg:col-span-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-orthodox-gold/20 text-orthodox-gold flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-orthodox-gold">
                    {locale === 'ja' ? '最新の主日説教' : locale === 'ru' ? 'Слово пастыря' : 'Sunday Sermon & Gospel'}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">{latestSermon.date}</span>
              </div>

              {/* Flex row with Icon + Title */}
              <div className="flex items-start gap-4">
                {latestSermon.iconImage && (
                  <div className="w-24 sm:w-28 flex-shrink-0 rounded-2xl overflow-hidden shadow-md border border-amber-900/15 dark:border-amber-400/25 bg-amber-50 p-1">
                    <img
                      src={latestSermon.iconImage}
                      alt={latestSermon.iconAlt || latestSermon.title}
                      className="w-full h-auto object-cover rounded-xl"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="min-w-0 space-y-1.5 flex-1">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                    {latestSermon.title}
                  </h3>
                  <div className="text-[11px] font-serif italic text-orthodox-navy dark:text-amber-200">
                    {locale === 'ja'
                      ? '父と子と聖神の名によりて'
                      : locale === 'ru'
                      ? 'Во имя Отца и Сына и Святого Духа.'
                      : 'In the Name of the Father, and of the Son, and of the Holy Spirit.'}
                  </div>
                </div>
              </div>

              <p className="font-serif text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-4 leading-relaxed">
                {latestSermon.excerpt}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setActiveTab('sermons')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orthodox-navy hover:bg-orthodox-navy/90 text-white font-bold text-xs sm:text-sm transition-colors shadow-sm"
              >
                <BookOpen className="w-4 h-4 text-orthodox-gold" />
                <span>
                  {locale === 'ja'
                    ? '説教全文を読む（全495編）'
                    : locale === 'ru'
                    ? 'Читать полностью (Архив 495 бесед)'
                    : 'Read Full Sermon & Archive (495)'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-slate-400 font-serif italic hidden sm:inline">
                {PARISH_INFO.name[locale]}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            FEATURE 3: VISITING & SERVICE HOURS (Modern 3-Column Bento Cards)
        ======================================================== */}
        <section id="visit-hours" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-orthodox-gold uppercase tracking-wider font-serif">
                {locale === 'ja' ? '教会案内・見学' : locale === 'ru' ? 'Богослужения' : 'Visit & Worship'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                {locale === 'ja' ? '見学と礼拝の時間' : locale === 'ru' ? 'Часы открытых дверей и служб' : 'Visiting & Worship Hours'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-serif max-w-lg">
              {locale === 'ja'
                ? '聖堂はどなたでも自由にご見学いただけます。事前の予約は不要です。'
                : locale === 'ru'
                ? 'Храм открыт для всех желающих помолиться и познакомиться с Православием.'
                : 'The temple interior is freely open to all visitors. No prior reservation required.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Saturday Viewing */}
            <div className="p-6 rounded-3xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                  {locale === 'ja' ? '毎週土曜日' : locale === 'ru' ? 'Суббота' : 'Every Saturday'}
                </span>
                <Compass className="w-5 h-5 text-amber-700 dark:text-amber-300" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                {locale === 'ja' ? '聖堂見学開放' : locale === 'ru' ? 'Осмотр храма' : 'Open Temple Viewing'}
              </h3>
              <div className="text-amber-900 dark:text-amber-200 font-mono text-xl font-bold">15:00 〜 16:30</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-serif">
                {locale === 'ja'
                  ? '聖堂内部のイコノスタス（聖障）や山下りんの聖像、ロシアの伝統建築を自由にご鑑賞いただけます。'
                  : locale === 'ru'
                  ? 'Свободный осмотр икон, иконостаса письма Рин Ямаситы и архитектуры храма.'
                  : 'Freely view the gilded iconostasis, Rin Yamashita icons, and traditional Orthodox architecture.'}
              </p>
            </div>

            {/* Card 2: Saturday Vigil */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {locale === 'ja' ? '土曜日 夕暮れ' : locale === 'ru' ? 'Суббота вечер' : 'Saturday Evening'}
                </span>
                <Clock className="w-5 h-5 text-orthodox-gold" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                {locale === 'ja' ? '徹夜祷（晩祷）' : locale === 'ru' ? 'Всенощное бдение' : 'All-Night Vigil'}
              </h3>
              <div className="text-slate-800 dark:text-slate-200 font-mono text-xl font-bold">17:00 〜</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-serif">
                {locale === 'ja'
                  ? '夕陽の中で行われる祈りと詩編、無伴奏聖歌の響きに包まれる厳かな夕べの祈祷です。'
                  : locale === 'ru'
                  ? 'Торжественное вечернее богослужение с чтением псалмов и пением перед воскресным днем.'
                  : 'Solemn evening service with traditional psalms, incense, and choral prayers preparing for the Lord’s Day.'}
              </p>
            </div>

            {/* Card 3: Sunday Divine Liturgy */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orthodox-gold uppercase tracking-wider">
                  {locale === 'ja' ? '日曜日 朝' : locale === 'ru' ? 'Воскресенье утро' : 'Sunday Morning'}
                </span>
                <Church className="w-5 h-5 text-orthodox-gold" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                {locale === 'ja' ? '聖体礼儀（主日）' : locale === 'ru' ? 'Божественная Литургия' : 'Divine Liturgy'}
              </h3>
              <div className="text-orthodox-navy dark:text-orthodox-gold font-mono text-xl font-bold">10:00 〜</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-serif">
                {locale === 'ja'
                  ? '教会の中心となる主日の聖体礼儀。礼拝後には信徒の親睦の集い（愛餐）も行われます。'
                  : locale === 'ru'
                  ? 'Главное воскресное богослужение прихода. После службы проходит чаепитие (агапа).'
                  : 'The central Sunday service of Holy Communion, followed by the parish Agape fellowship meal.'}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            FEATURE 4: CURATED PHOTO GALLERY SHOWCASE
        ======================================================== */}
        <section className="space-y-6">
          <PhotoGallerySection />
        </section>

        {/* ========================================================
            FEATURE 5: LOCATION & CONTACT FOOTER CARD
        ======================================================== */}
        <section className="rounded-3xl bg-orthodox-navy text-white p-8 sm:p-12 shadow-xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3 text-center lg:text-left">
              <div className="text-xs font-bold uppercase tracking-widest text-orthodox-gold">
                {locale === 'ja' ? '交通アクセス・お問い合わせ' : locale === 'ru' ? 'Адрес и контакты' : 'Transit Access & Contact'}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                {PARISH_INFO.name[locale]}
              </h3>
              <p className="font-serif text-xs sm:text-sm text-slate-300 max-w-xl">
                {PARISH_INFO.address[locale]} · {PARISH_INFO.access[locale]}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href="https://goo.gl/maps/S6WgPs3SkyvZpbzB9"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orthodox-gold hover:bg-orthodox-gold-light text-orthodox-navy font-bold text-xs sm:text-sm transition-all shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>{locale === 'ja' ? 'Googleマップで道案内' : locale === 'ru' ? 'Карта Google' : 'Open in Google Maps'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2 justify-center">
                <a
                  href={`tel:${PARISH_INFO.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-orthodox-gold" />
                  <span>{PARISH_INFO.phone}</span>
                </a>

                <a
                  href={`mailto:${PARISH_INFO.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-orthodox-gold" />
                  <span className="truncate max-w-[140px]">{PARISH_INFO.email}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
