'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { PARISH_INFO } from '../../data/terminology';
import { getDayInfo } from '../../lib/calendarEngine';
import { filterVisibleSermons } from '../../lib/sermonSchedule';
import { PhotoGallerySection } from './PhotoGallerySection';
import { ConcertTeaserSection } from './ConcertTeaserSection';
import { PortalsGridSection } from './PortalsGridSection';
import {
  Calendar,
  Clock,
  MapPin,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Phone,
  Mail,
  Church,
  ChevronRight,
  Compass,
  ArrowUpRight,
} from 'lucide-react';

export function HomeWebsiteView() {
  const router = useRouter();
  const { locale, calendarStyle, setActiveTab, parishSchedule, sermons, isSermonAdmin, setTargetSermonId } = useApp();

  // Compute live day info based on current user date in JST
  const now = new Date();
  const dayInfo = getDayInfo(now, parishSchedule, calendarStyle);

  // Available sermons respecting Saturday morning public release
  const availableSermons = React.useMemo(() => {
    return filterVisibleSermons(sermons, isSermonAdmin);
  }, [sermons, isSermonAdmin]);

  // Latest sermon for active language
  const latestSermon =
    availableSermons.find((s) => s.language === locale) || availableSermons[0] || sermons[0];

  // Upcoming services
  const todayStr = now.toISOString().split('T')[0];
  const upcomingServices = parishSchedule
    .filter((s) => s.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date));
  const nextService = upcomingServices[0] || parishSchedule[0];

  // Dynamic date string in local language
  const dynamicDateStr = now.toLocaleDateString(
    locale === 'ja' ? 'ja-JP' : locale === 'ru' ? 'ru-RU' : 'en-US',
    { month: 'numeric', day: 'numeric', weekday: 'short' }
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-slate-950 text-stone-900 dark:text-stone-100 pb-20">
      {/* ========================================================
          1. HERO SECTION (Refined Editorial Layout)
      ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orthodox-navy via-slate-900 to-orthodox-navy text-white pt-8 pb-14 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-amber-900/30">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 7 Columns: Editorial Welcome & Parish Identity */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Jurisdiction Kicker (No Pill) */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold tracking-wider text-orthodox-gold-light uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-orthodox-gold" />
                <span>
                  {locale === 'ja'
                    ? '日本ハリストス正教会 西日本主教教区'
                    : locale === 'ru'
                    ? 'Японская Православная Церковь · Западная епархия'
                    : 'Autonomous Orthodox Church in Japan · Western Diocese'}
                </span>
              </div>

              {/* Grand Main Title */}
              <div className="space-y-2">
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                  {locale === 'ja' ? (
                    <>
                      <span className="inline-block">大阪ハリストス正教会</span>{' '}
                      <span className="inline-block">生神女<wbr />庇護聖堂</span>
                    </>
                  ) : (
                    PARISH_INFO.name[locale]
                  )}
                </h1>
                <p className="font-serif text-base sm:text-xl text-amber-200/90 font-light italic">
                  {locale === 'ja' ? (
                    <>
                      <span className="inline-block">生神女<wbr />庇護祭（ポクロフ）の聖堂</span> ·{' '}
                      <span className="inline-block">吹田市<wbr />山手町</span>
                    </>
                  ) : locale === 'ru' ? (
                    'Храм Покрова Пресвятой Богородицы в Осаке (Суита)'
                  ) : (
                    'Holy Protection Temple in Suita, Osaka'
                  )}
                </p>
              </div>

              {/* Warm Hospitable Welcome Paragraph */}
              <p className="font-serif text-sm sm:text-base lg:text-lg text-stone-200 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {locale === 'ja'
                  ? '大阪ハリストス正教会は、初代教会より受け継がれた使徒的信仰、無伴奏の清らかな聖歌、そして生神女の庇護のもとに祈りを捧げる教会です。見学や祈りを求められるすべての方を温かく歓迎いたします。'
                  : locale === 'ru'
                  ? 'Православный приход в Осаке. Древняя неизменная христианская вера, чистота богослужения и молитвенный покров Пречистой Девы. Двери храма открыты для каждого.'
                  : 'Welcome to the Osaka Orthodox Church. Preserving the apostolic faith, pure choral worship, and the prayers of the saints under the Protection of the Mother of God. All visitors and inquirers are warmly welcome.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('visit-hours');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-md bg-orthodox-gold hover:bg-orthodox-gold-light text-orthodox-navy font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2"
                >
                  <Clock className="w-4 h-4 text-orthodox-navy" />
                  <span>{locale === 'ja' ? '聖堂見学・奉神礼のご案内' : locale === 'ru' ? 'Часы служб' : 'Visit & Service Hours'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('concert-event');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2"
                >
                  <span>{locale === 'ja' ? '近日中の特別演奏会' : locale === 'ru' ? 'Ближайший концерт' : 'Upcoming Concert'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('sermons'); router.push('/sermons'); }}
                  className="px-5 py-2.5 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-orthodox-gold-light" />
                  <span>{locale === 'ja' ? '主日説教集' : locale === 'ru' ? 'Проповеди' : 'Sunday Sermons'}</span>
                </button>
              </div>

              {/* Live Liturgical Status Bar (Dynamic, No Emojis, Links to /app) */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-xs text-stone-300 font-serif">
                <Link
                  href="/app"
                  className="inline-flex items-center gap-1.5 hover:text-orthodox-gold transition-colors font-medium text-white underline decoration-amber-400/50 underline-offset-4"
                  title={locale === 'ja' ? '本日の教会暦・日課を見る' : 'View Today’s Liturgical Lectionary'}
                >
                  <Calendar className="w-3.5 h-3.5 text-orthodox-gold" />
                  <span>{dynamicDateStr}</span>
                </Link>

                {dayInfo.tone > 0 && (
                  <Link
                    href="/app"
                    className="font-bold text-orthodox-gold-light hover:underline"
                    title={locale === 'ja' ? '主日八調（教会の週間旋法）' : `Tone ${dayInfo.tone}`}
                  >
                    {locale === 'ja' ? `第${dayInfo.tone}調` : locale === 'ru' ? `Глас ${dayInfo.tone}` : `Tone ${dayInfo.tone}`}
                  </Link>
                )}

                <div className="flex items-center gap-1.5 text-stone-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                  <span>{dayInfo.fasting.badgeText[locale]}</span>
                </div>

                {nextService && (
                  <span className="text-amber-200/90 text-2xs sm:text-xs">
                    {locale === 'ja' ? '次期奉事: ' : 'Next: '}
                    {nextService.title[locale]} ({nextService.date} {nextService.time})
                  </span>
                )}

                <Link
                  href="/app"
                  className="text-2xs text-orthodox-gold-light hover:underline font-sans ml-1"
                >
                  {locale === 'ja' ? '本日の教会暦・日課を見る →' : 'View daily lectionary →'}
                </Link>
              </div>
            </div>

            {/* Right 5 Columns: Daylight Temple Photograph (Clean Caption without Duplicate Directions) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-md overflow-hidden shadow-lg border border-white/20 bg-stone-900 aspect-4/3 group">
                <img
                  src="/photos/osaka-church-daylight.jpg"
                  alt="Osaka Orthodox Church Daylight Exterior"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-md bg-stone-950/70 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                  <div>
                    <div className="font-serif font-bold text-xs sm:text-sm">
                      {locale === 'ja' ? '吹田の緑に包まれた聖堂全景' : locale === 'ru' ? 'Храм в окружении зелени' : 'Osaka Temple Sanctuary'}
                    </div>
                    <div className="text-[11px] text-stone-300 font-serif">
                      {locale === 'ja' ? '生神女庇護聖堂（大阪府吹田市）' : 'Holy Protection Church in Suita, Osaka'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('access'); router.push('/visit'); }}
                    className="p-1.5 rounded-md bg-orthodox-gold text-orthodox-navy hover:bg-white transition-colors"
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
          PAGE BODY: NEW VERTICAL FLOW (2 -> 3 -> 4 -> 5 -> 6 -> 7)
      ======================================================== */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-14">
        {/* ========================================================
            2. SERVICE TIMES & VISITING HOURS (Directly below Hero)
        ======================================================== */}
        <section id="visit-hours" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
            <div className="border-l-2 border-amber-800/80 pl-3">
              <span className="text-2xs font-bold uppercase tracking-widest text-amber-900/80 dark:text-amber-300">
                {locale === 'ja' ? '教会案内・見学' : locale === 'ru' ? 'Богослужения' : 'Visit & Worship'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-white mt-0.5">
                {locale === 'ja' ? '聖堂見学・奉神礼のご案内' : locale === 'ru' ? 'Часы открытых дверей и служб' : 'Visiting & Worship Hours'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-serif max-w-lg">
              {locale === 'ja'
                ? '聖堂はどなたでも自由にご見学いただけます。事前の予約は不要です。'
                : locale === 'ru'
                ? 'Храм открыт для всех желающих помолиться и познакомиться с Православием.'
                : 'The temple interior is freely open to all visitors. No prior reservation required.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Saturday Viewing */}
            <div className="p-6 rounded-md bg-[#F3EFEA] dark:bg-amber-950/20 border border-stone-200 dark:border-stone-800 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                  {locale === 'ja' ? '毎週土曜日' : locale === 'ru' ? 'Суббота' : 'Every Saturday'}
                </span>
                <Compass className="w-5 h-5 text-amber-800 dark:text-amber-300" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                {locale === 'ja' ? '聖堂見学のご案内' : locale === 'ru' ? 'Осмотр храма' : 'Open Temple Viewing'}
              </h3>
              <div className="text-amber-900 dark:text-amber-200 font-mono text-xl font-bold">16:00 〜 17:00</div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-serif">
                {locale === 'ja'
                  ? '聖堂内部のイコノスタス（聖障）や山下りんの聖像、ロシアの伝統建築を自由にご鑑賞いただけます。'
                  : locale === 'ru'
                  ? 'Свободный осмотр икон, иконостаса письма Рин Ямаситы и архитектуры храма.'
                  : 'Freely view the gilded iconostasis, Rin Yamashita icons, and traditional Orthodox architecture.'}
              </p>
            </div>

            {/* Card 2: Saturday Vigil */}
            <div className="p-6 rounded-md bg-white dark:bg-slate-900 border border-stone-200 dark:border-stone-800 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  {locale === 'ja' ? '夕方' : locale === 'ru' ? 'Вечер' : 'Evening'}
                </span>
                <Clock className="w-5 h-5 text-amber-800 dark:text-amber-400" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                {locale === 'ja' ? '徹夜祷' : locale === 'ru' ? 'Всенощное бдение' : 'All-Night Vigil'}
              </h3>
              <div className="text-stone-900 dark:text-stone-100 font-mono text-xl font-bold">17:00 〜</div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-serif">
                {locale === 'ja'
                  ? '夕陽の中で行われる祈りと詩編、無伴奏聖歌の響きに包まれる厳かな夕べの祈祷です。'
                  : locale === 'ru'
                  ? 'Торжественное вечернее богослужение с чтением псалмов и пением перед воскресным днем.'
                  : 'Solemn evening service with traditional psalms, incense, and choral prayers preparing for the Lord’s Day.'}
              </p>
            </div>

            {/* Card 3: Sunday Divine Liturgy */}
            <div className="p-6 rounded-md bg-white dark:bg-slate-900 border border-stone-200 dark:border-stone-800 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                  {locale === 'ja' ? '日曜日 朝' : locale === 'ru' ? 'Воскресенье утро' : 'Sunday Morning'}
                </span>
                <Church className="w-5 h-5 text-amber-800 dark:text-amber-400" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                {locale === 'ja' ? '聖体礼儀（主日）' : locale === 'ru' ? 'Божественная Литургия' : 'Divine Liturgy'}
              </h3>
              <div className="text-orthodox-navy dark:text-amber-300 font-mono text-xl font-bold">10:00 〜</div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-serif">
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
            3. LATEST SUNDAY SERMON (Directly below Services)
        ======================================================== */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-l-2 border-amber-800/80 pl-3">
            <div>
              <span className="text-2xs font-bold uppercase tracking-widest text-amber-900/80 dark:text-amber-300">
                {locale === 'ja' ? '主日説教' : 'Sunday Homily'}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white">
                {locale === 'ja' ? '最新の主日説教' : locale === 'ru' ? 'Слово пастыря' : 'Latest Sunday Sermon'}
              </h2>
            </div>
          </div>

          <div className="rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-slate-900 p-6 sm:p-8 md:p-10 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-800 dark:text-amber-400" />
                <span className="text-xs font-serif font-semibold text-stone-700 dark:text-stone-300">
                  {locale === 'ja' ? '司祭ゲオルギイ松島雄一' : 'Fr. George Matsushima'}
                </span>
              </div>
              <span className="text-xs text-stone-400 font-mono font-medium">{latestSermon.date}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
              {latestSermon.iconImage && (
                <div className="md:col-span-4 lg:col-span-3 flex justify-center">
                  <div className="w-40 sm:w-48 md:w-full rounded-md overflow-hidden shadow-xs border border-stone-200 dark:border-stone-800 bg-stone-50 p-1">
                    <img
                      src={latestSermon.iconImage}
                      alt={latestSermon.iconAlt || latestSermon.title}
                      className="w-full h-auto object-cover rounded"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
              <div className={`${latestSermon.iconImage ? 'md:col-span-8 lg:col-span-9' : 'md:col-span-12'} space-y-3`}>
                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900 dark:text-white leading-snug">
                  {latestSermon.title}
                </h3>
                <div className="text-xs sm:text-sm font-serif italic text-amber-900 dark:text-amber-300">
                  {locale === 'ja'
                    ? '父と子と聖神の名によりて'
                    : locale === 'ru'
                    ? 'Во имя Отца и Сына и Святого Духа.'
                    : 'In the Name of the Father, and of the Son, and of the Holy Spirit.'}
                </div>
                <p className="font-serif text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-4">
                  {latestSermon.excerpt}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (latestSermon) {
                        setTargetSermonId(latestSermon.id);
                      }
                      setActiveTab('sermons');
                      router.push('/sermons');
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-orthodox-navy hover:bg-orthodox-navy/90 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
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

                  <span className="text-xs text-stone-400 font-serif italic hidden sm:inline">
                    {PARISH_INFO.name[locale]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            4. FEATURED EVENT TEASER (Compact Rachmaninoff Banner)
        ======================================================== */}
        <ConcertTeaserSection />

        {/* ========================================================
            5. PHOTO GALLERY (Clean Editorial Showcase)
        ======================================================== */}
        <PhotoGallerySection />

        {/* ========================================================
            6. EXPLORE DEEPER / PORTALS GRID (4-Column Minimal List)
        ======================================================== */}
        <PortalsGridSection />

        {/* ========================================================
            7. ACCESS & CONTACT CARD
        ======================================================== */}
        <section className="rounded-md bg-orthodox-navy text-white p-8 sm:p-12 shadow-md space-y-8 border border-orthodox-gold/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3 text-center lg:text-left">
              <div className="text-2xs font-bold uppercase tracking-widest text-orthodox-gold-light">
                {locale === 'ja' ? '交通アクセス・お問い合わせ' : locale === 'ru' ? 'Адрес и контакты' : 'Transit Access & Contact'}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                {PARISH_INFO.name[locale]}
              </h3>
              <p className="font-serif text-xs sm:text-sm text-stone-300 max-w-xl">
                {PARISH_INFO.address[locale]} · {PARISH_INFO.access[locale]}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href="https://goo.gl/maps/S6WgPs3SkyvZpbzB9"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-orthodox-gold hover:bg-orthodox-gold-light text-orthodox-navy font-bold text-xs sm:text-sm transition-all shadow-xs"
              >
                <MapPin className="w-4 h-4" />
                <span>{locale === 'ja' ? 'Googleマップで道案内' : locale === 'ru' ? 'Карта Google' : 'Open in Google Maps'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2 justify-center">
                <a
                  href={`tel:${PARISH_INFO.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-white/10 hover:bg-white/20 text-xs font-mono font-bold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-orthodox-gold" />
                  <span>{PARISH_INFO.phone}</span>
                </a>

                <a
                  href={`mailto:${PARISH_INFO.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-white/10 hover:bg-white/20 text-xs font-mono transition-colors"
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
