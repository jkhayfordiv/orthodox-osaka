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
  Compass,
  Play,
} from 'lucide-react';

export function AboutOrthodoxyView() {
  const { locale, setActiveTab } = useApp();
  const [activeVideoId, setActiveVideoId] = React.useState('BYsQ1FnrY2o');

  const chantVideos = [
    {
      id: 'BYsQ1FnrY2o',
      title: { ja: '「聖なる神」（トリサギオン・三聖頌）', en: 'Trisagion Hymn (Holy God)', ru: 'Трисвятое на японском' },
      desc: { ja: '日本正教会で歌い継がれる荘厳な四声無伴奏聖歌', en: 'Four-part a cappella singing in the Orthodox Church in Japan', ru: 'Торжественное четырехголосное пение а капелла' },
      badge: { ja: '聖体礼儀 聖歌', en: 'Liturgy Chant', ru: 'Литургия' },
    },
    {
      id: 'I1tIuh10S5U',
      title: { ja: '「ハリストス復活」（復活祭・パスハ讃詞）', en: 'Christ is Risen (Paschal Troparion)', ru: 'Христос Воскресе!' },
      desc: { ja: '「ハリストス死より復活し、死を以て死を滅ぼし…」歓喜の賛美歌', en: 'The joyous Paschal hymn proclaiming Christ’s victory over death', ru: 'Праздничный пасхальный тропарь на японском языке' },
      badge: { ja: '復活大祭 祝讃詞', en: 'Pascha', ru: 'Пасха' },
    },
    {
      id: 'waDRy9zzNOU',
      title: { ja: '大阪教会 鐘楼の響き「歓びの鐘」', en: 'Osaka Church Belfry Bells', ru: 'Колокольный звон в Осаке' },
      desc: { ja: '吹田の空に福音を告げる帝政ロシア大鐘の打鐘', en: 'The historic bells chiming over Suita from the belfry', ru: 'Праздничный благовест с колокольни в Суите' },
      badge: { ja: '大阪教会 鐘楼', en: 'Belfry Bells', ru: 'Колокола' },
    },
    {
      id: '8T1sQuKT4rE',
      title: { ja: '松島ゲオルギイ神父 説教アーカイブ', en: 'Fr. George Homily Archive', ru: 'Проповедь о. Георгия' },
      desc: { ja: '福音書の教えと正教の霊性を語る主日説教の映像', en: 'Sunday homily and reflection on Orthodox spirituality', ru: 'Слово священника о духовной жизни и Евангелии' },
      badge: { ja: '司祭説教', en: 'Homily', ru: 'Проповедь' },
    },
  ];

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
        ja: '聖堂入口にある蝋燭台で献灯し、ハリストスや生神女のイコンの前で静かに祈りを捧げることができます（蝋燭代はお志）。',
        en: 'You may light a beeswax candle at the candle stands before holy icons as a symbol of prayer and offering.',
        ru: 'При входе в храм можно возжечь свечу перед иконами Спасителя и Богородицы в знак горячей молитвы к Богу.',
      },
    },
    {
      title: { ja: '聖体拝領（領聖）について', en: 'Holy Communion', ru: 'О Причащении' },
      desc: {
        ja: '聖体拝領（領聖：パンと葡萄酒によるハリストスの尊体と尊血）は正教会で洗礼を受けた信徒のみが行いますが、礼拝の最後に司祭から祝福パン（アンティドル）が参祷者全員にお分かちされます。',
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
                ? '「オーソドックス」とはギリシャ語で「正しく神を讃美する」ことを意味します。後世の教理的変更を行わず、ハリストスと使徒たちの教えをそのまま今日まで守り伝えています。'
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
                ? 'オルガン等の楽器を用いず、神が創造されたもっとも尊い「人間の生きた声」の調和によって聖歌を歌います。日本語の祈祷文の豊かなリズムが聖堂に響きます。'
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

        {/* Sacred A Cappella Chant & Video Experience */}
        <div className="rounded-3xl border border-indigo-200/80 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50/70 via-white to-amber-50/40 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900 p-6 sm:p-8 lg:p-10 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-indigo-100 dark:border-indigo-900/40 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-300 text-xs font-semibold mb-2">
                <Music className="w-3.5 h-3.5" />
                <span>{locale === 'ja' ? '無伴奏聖歌の祈り' : 'Orthodox Sacred Singing'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-slate-900 dark:text-white">
                {locale === 'ja' ? '無伴奏の聖歌（ア・カペラ）を聴く' : 'Experience A Cappella Liturgical Chant'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {locale === 'ja'
                  ? 'オルガン等の楽器を用いず、人間の生きた声の調和によって神を讃美する日本正教会の伝統聖歌と、吹田の空に響く大鐘の音色を映像でお聴きいただけます。'
                  : 'Listen to authentic Japanese Orthodox four-part liturgical singing and the historic bells of Osaka Church.'}
              </p>
            </div>

            {/* Official YouTube Channel Link */}
            <a
              href="https://www.youtube.com/@%E5%A4%A7%E9%98%AA%E3%83%8F%E3%83%AA%E3%82%B9%E3%83%88%E3%82%B9%E6%AD%A3%E6%95%99%E4%BC%9A"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-all hover:scale-102 flex-shrink-0"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>{locale === 'ja' ? '公式YouTubeチャンネル' : 'Official YouTube Channel'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Embedded YouTube Player (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 bg-black aspect-video relative">
                <iframe
                  key={activeVideoId}
                  src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?rel=0`}
                  title="Osaka Orthodox Church Chant and Liturgy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            </div>

            {/* Video Playlist Selector (5 Cols) */}
            <div className="lg:col-span-5 space-y-2.5">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
                {locale === 'ja' ? '再生する動画・聖歌を選択' : 'Select Video or Chant'}
              </div>
              {chantVideos.map((vid) => {
                const isActive = vid.id === activeVideoId;
                return (
                  <button
                    key={vid.id}
                    onClick={() => setActiveVideoId(vid.id)}
                    className={`w-full p-3.5 rounded-2xl text-left transition-all border flex items-start gap-3 ${
                      isActive
                        ? 'bg-orthodox-navy text-white border-orthodox-gold shadow-md'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-orthodox-gold/60 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isActive
                          ? 'bg-orthodox-gold text-orthodox-navy font-bold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-serif font-bold text-xs sm:text-sm leading-snug">
                          {vid.title[locale]}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                            isActive
                              ? 'bg-orthodox-gold/20 text-orthodox-gold-light'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}
                        >
                          {vid.badge[locale]}
                        </span>
                      </div>
                      <p
                        className={`text-[11px] mt-1 line-clamp-1 ${
                          isActive ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {vid.desc[locale]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dedicated Research & Resource Portals */}
        <div className="space-y-6 pt-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orthodox-gold mb-1">
                <Scroll className="w-3.5 h-3.5" />
                <span>{locale === 'ja' ? '正教研究・文献ポータル・教区' : 'Dedicated Archives, Portals & Diocese'}</span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                {locale === 'ja' ? '専門アーカイブ・研究サイト・主教区のご案内' : 'Orthodox Portals & Diocese'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {locale === 'ja' ? '神学・聖歌研究・奉神礼文集・西日本主教教区の総合ポータル' : 'Portals curated by Fr. George, Matushka Maria, and the Western Diocese'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Fr. George Portal */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between hover:border-orthodox-gold transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 flex items-center justify-center font-serif font-bold">
                    <Feather className="w-5 h-5 text-orthodox-burgundy dark:text-orthodox-gold" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-2xs font-semibold">
                    150+ {locale === 'ja' ? '編の論文' : 'articles'}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white group-hover:text-orthodox-gold transition-colors">
                  {locale === 'ja' ? '司祭ゲオルギイ松島雄一 神学アーカイブ' : 'Fr. George Matsushima Library'}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {locale === 'ja'
                    ? '正教信仰の基礎、教会論、アトスの聖パイシイ対話録、上海の聖イオアン講話、信仰問答Q&A。'
                    : 'Systematic theological essays, patristic writings, Elder Paisios dialogues, and pastoral Q&A.'}
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
                  {locale === 'ja' ? 'マリア松島純子 聖歌ポータル' : 'Matushka Maria Sacred Music'}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {locale === 'ja'
                    ? '大式聖体礼儀全曲譜、主日八調合唱譜、大祭・三歌斎楽譜と聖歌の歴史論考。'
                    : 'Choral scores (Daishiki Liturgy, Sunday Octoechos, Lent PDFs) and studies on chant history.'}
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
                  {locale === 'ja' ? '日本正教会 奉神礼・祈祷文ポータル' : 'Orthodox Liturgy & Services'}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {locale === 'ja'
                    ? '聖金口イオアン聖体礼儀式文、晩課・早課・時課、諸機密祈祷文、220点以上の奉神礼小冊子PDF。'
                    : 'The Divine Liturgies, Daily Office, Sacramental orders, and over 220 liturgical service booklets.'}
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

            {/* 4. Western Japan Diocese Portal */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between hover:border-orthodox-gold transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 flex items-center justify-center font-serif font-bold">
                    <Compass className="w-5 h-5 text-amber-700 dark:text-amber-300" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-2xs font-semibold">
                    {locale === 'ja' ? '教区聖堂案内' : 'Parish Network'}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white group-hover:text-orthodox-gold transition-colors">
                  {locale === 'ja' ? '日本正教会 西日本主教教区 案内' : 'Western Japan Diocese Guide'}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {locale === 'ja'
                    ? '京都生神女福音大聖堂をはじめ、大阪・神戸・名古屋・広島・福岡など西日本各地の正教会聖堂案内。'
                    : 'Information on Orthodox parishes across Western Japan—Kyoto, Osaka, Kobe, Nagoya, Hiroshima, and Kyushu.'}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/westjapan"
                  className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-orthodox-gold/15 hover:bg-orthodox-gold text-orthodox-navy dark:text-orthodox-gold-light hover:dark:text-orthodox-navy font-bold text-xs transition-colors"
                >
                  <span>{locale === 'ja' ? '教区案内を開く' : 'Open Diocese Portal'}</span>
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
