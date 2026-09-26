'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { ABOUT_ORTHODOXY_DATA } from '../../data/parishWebsiteData';
import {
  BookOpen,
  Music,
  Flame,
  Sparkles,
  Church,
  ChevronRight,
  HelpCircle,
  Feather,
  Scroll,
  Info,
  ExternalLink,
} from 'lucide-react';

export function AboutOrthodoxyView() {
  const { locale, setActiveTab } = useApp();

  const visitorGuidelines = [
    {
      title: { ja: 'どなたでも参祷いただけます', en: 'All Are Welcome', ru: 'Добро пожаловать всем' },
      desc: {
        ja: '正教会の祈り（聖体礼儀や晩課）は、信徒でない方、初めて教会を訪れる方でも自由にご参加いただけます。事前連絡なしでお越しいただけます。',
        en: 'Orthodox services (Divine Liturgy, Vespers) are open to all visitors and inquirers. No advance reservation is required.',
        ru: 'Богослужения Православной Церкви открыты для всех желающих. Предварительная запись не требуется.',
      },
    },
    {
      title: { ja: '蝋燭の献灯と祈り', en: 'Lighting Candles', ru: 'Поставление свечей' },
      desc: {
        ja: '聖堂入口にある蝋燭台で献灯し、キリストや生神女のイコンの前で静かに祈りを捧げることができます（蝋燭代はお志）。',
        en: 'You may light a beeswax candle at the candle stands before holy icons as a symbol of prayer and offering.',
        ru: 'При входе в храм можно возжечь свечу перед иконами Спасителя и Богородицы в знак горячей молитвы к Богу.',
      },
    },
    {
      title: { ja: '聖体拝領（領聖）について', en: 'Holy Communion', ru: 'О Причащении' },
      desc: {
        ja: '聖体拝領（パンと葡萄酒によるキリストの体と血）は正教会で洗礼を受けた信徒のみが行いますが、礼拝の最後に司祭から祝福パン（アンティドル）が参祷者全員にお分かちされます。',
        en: 'Holy Communion is reserved for baptized Orthodox Christians. However, blessed bread (antidoron) is shared with all visitors at the conclusion of the Liturgy.',
        ru: 'Святое Причастие преподается крещеным православным христианам. В конце Литургии всем молящимся раздается благословенный антидор.',
      },
    },
    {
      title: { ja: '聖堂内での立ち居振る舞い', en: 'Church Etiquette', ru: 'Благочестие в храме' },
      desc: {
        ja: '正教会の礼拝は基本的に立って祈りますが、疲れたら壁際の椅子にお座りいただいて構いません。控えめで端正な服装でお越しください。',
        en: 'Orthodox worship is traditionally standing before God, but chairs/benches along the walls are freely available whenever needed. Modest attire is recommended.',
        ru: 'В православной традиции принято молиться стоя, однако при утомлении можно присесть на скамьи вдоль стен. Одежда предпочтительна скромная.',
      },
    },
  ];

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

        {/* Dedicated Research & Resource Portals */}
        <div className="space-y-6 pt-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orthodox-gold mb-1">
                <Scroll className="w-3.5 h-3.5" />
                <span>{locale === 'ja' ? '正教研究・文献ポータル' : 'Dedicated Archives & Portals'}</span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                {locale === 'ja' ? '専門アーカイブ・研究サイトのご案内' : 'Orthodox Portals & Archives'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {locale === 'ja' ? '司祭ゲオルギイ松島雄一、マリア松島純子による神学・聖歌研究の専門サイト' : 'Specialized websites curated by Fr. George & Matushka Maria'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Fr. George Portal */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between hover:border-orthodox-gold transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 flex items-center justify-center font-serif font-bold">
                    <Feather className="w-5 h-5 text-orthodox-burgundy dark:text-orthodox-gold" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-2xs font-semibold">
                    150+ {locale === 'ja' ? '編の神学論文' : 'articles'}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white group-hover:text-orthodox-gold transition-colors">
                  {locale === 'ja' ? '司祭ゲオルギイ松島雄一 神学・教理アーカイブ' : 'Fr. George Matsushima Theological Library'}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {locale === 'ja'
                    ? '正教信仰の基礎、教会論、アトスの聖パイシイ対話録、上海とサンフランシスコの聖イオアン主日講話、信徒のQ&A質問箱を網羅した神学ポータルです。'
                    : 'Systematic theological essays, patristic writings, Elder Paisios dialogues, and comprehensive pastoral Q&A.'}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/george"
                  className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-orthodox-gold/15 hover:bg-orthodox-gold text-orthodox-navy dark:text-orthodox-gold-light hover:dark:text-orthodox-navy font-bold text-xs transition-colors"
                >
                  <span>{locale === 'ja' ? '神学ポータルを開く' : 'Open Fr. George Portal'}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 2. Matushka Maria Portal */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between hover:border-orthodox-gold transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 flex items-center justify-center font-serif font-bold">
                    <Music className="w-5 h-5 text-indigo-700 dark:text-indigo-300" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-2xs font-semibold">
                    {locale === 'ja' ? '楽譜PDF & 聖歌史' : 'Scores & History'}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white group-hover:text-orthodox-gold transition-colors">
                  {locale === 'ja' ? 'マリア松島純子 聖歌ポータル' : 'Matushka Maria Sacred Music Portal'}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {locale === 'ja'
                    ? '大式聖体礼儀全曲譜、主日八調合唱譜、大祭・三歌斎の楽譜アーカイブと、日本正教会聖歌の歴史、ヨハン・フォン・ガードナーの教会聖歌論を収録しています。'
                    : 'Choral scores (Daishiki Liturgy, Sunday Octoechos, Lent PDFs) alongside studies on Japanese Orthodox chant history and J. von Gardner.'}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/maria"
                  className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-orthodox-gold/15 hover:bg-orthodox-gold text-orthodox-navy dark:text-orthodox-gold-light hover:dark:text-orthodox-navy font-bold text-xs transition-colors"
                >
                  <span>{locale === 'ja' ? '聖歌ポータルを開く' : 'Open Music Portal'}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 3. Liturgy Portal */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between hover:border-orthodox-gold transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 flex items-center justify-center font-serif font-bold">
                    <Church className="w-5 h-5 text-rose-700 dark:text-rose-300" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-2xs font-semibold">
                    {locale === 'ja' ? '奉神礼文 & 諸祈祷' : 'Liturgical Texts'}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white group-hover:text-orthodox-gold transition-colors">
                  {locale === 'ja' ? '日本正教会 奉神礼・祈祷文ポータル' : 'Orthodox Liturgy & Service Orders'}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {locale === 'ja'
                    ? '聖金口イオアン・聖大ワシリイ聖体礼儀式文、晩課・早課・時課の式順、諸機密祈祷文、220点以上の奉神礼小冊子PDFを整理したポータルです。'
                    : 'The Divine Liturgies of St. John Chrysostom and St. Basil, Daily Office, Sacramental orders, and over 220 liturgical service booklets.'}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/liturgy"
                  className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-orthodox-gold/15 hover:bg-orthodox-gold text-orthodox-navy dark:text-orthodox-gold-light hover:dark:text-orthodox-navy font-bold text-xs transition-colors"
                >
                  <span>{locale === 'ja' ? '奉神礼ポータルを開く' : 'Open Liturgy Portal'}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Visitor Guide: For First-Time Guests */}
        <div className="rounded-3xl border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orthodox-gold text-orthodox-navy flex items-center justify-center font-bold">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                {locale === 'ja' ? '初めて正教会聖堂を訪れる方へ' : 'Guide for First-Time Visitors'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {locale === 'ja' ? '安心して聖堂での礼拝にご参祷いただくための基本案内です。' : 'Basic etiquette and guidance for attending services.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {visitorGuidelines.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-orthodox-gold/20 text-orthodox-navy dark:text-orthodox-gold text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {item.title[locale]}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                  {item.desc[locale]}
                </p>
              </div>
            ))}
          </div>
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
