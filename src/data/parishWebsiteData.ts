import { TrilingualText, Locale } from '../lib/types';

export interface BellRestorationInfo {
  title: TrilingualText;
  subtitle: TrilingualText;
  status: TrilingualText;
  targetAmount: string;
  contractor: TrilingualText;
  period: TrilingualText;
  descriptionParagraphs: { [key in Locale]: string[] };
  bankInfo: {
    bankName: TrilingualText;
    branch: TrilingualText;
    accountNumber: string;
    postalAccount: string;
  };
  creditCardUrl: string;
}

export interface ParishHistorySection {
  title: TrilingualText;
  content: { [key in Locale]: string[] };
  quote?: {
    text: TrilingualText;
    author: TrilingualText;
  };
  image?: {
    src: string;
    caption: TrilingualText;
  };
}

export interface OrthodoxyFaqItem {
  question: TrilingualText;
  answer: { [key in Locale]: string[] };
}

export interface SermonItem {
  id: string;
  date: string;
  title: TrilingualText;
  gospelReading: TrilingualText;
  author: TrilingualText;
  excerpt: TrilingualText;
  fullText: { [key in Locale]: string[] };
}

// ----------------------------------------------------
// Bell Restoration Project Appeal
// ----------------------------------------------------
export const BELL_RESTORATION_DATA: BellRestorationInfo = {
  title: {
    ja: '大鐘・鐘楼修復工事のご案内とご支援のお願い',
    en: 'Church Bell & Belfry Restoration: An Appeal for Support',
    ru: 'Восстановление колокольни и большого колокола: Просьба о поддержке',
  },
  subtitle: {
    ja: '100年を超える祈りの響きを次世代へ',
    en: 'Preserving over a century of sacred chimes for future generations',
    ru: 'Сохраним вековой благовест для будущих поколений',
  },
  status: {
    ja: '工事実施中・募金受付中',
    en: 'Construction in progress · Donations welcomed',
    ru: 'Идут работы · Открыт сбор пожертвований',
  },
  targetAmount: '¥4,570,000',
  contractor: {
    ja: '中村建設株式会社',
    en: 'Nakamura Construction Co., Ltd.',
    ru: 'Строительная компания Накамура',
  },
  period: {
    ja: '5月中旬 〜 6月上旬（日曜日を除く）',
    en: 'Mid-May – Early June (Excluding Sundays)',
    ru: 'Середина мая — начало июня (кроме воскресений)',
  },
  descriptionParagraphs: {
    ja: [
      '当教会の鐘楼に掲げられている大鐘は、長年にわたり信徒の心を一つにし、吹田・大阪の街に福音の喜びを告げてまいりました。',
      '昨年11月、打鐘の瞬間に大鐘が落下し、鐘楼上部が大きく破損する事故が発生いたしました。幸いにも主の奇跡的なお恵みにより打鐘者の命は守られましたが、専門業者による精密調査の結果、安全確保と建物の保護のため、早急な全面改修が必要と判明いたしました。',
      '総工事費は約457万円を見込んでおります。先人たちが守り伝えてくれたこの聖なる宝・祈りの鐘の音を未来へと受け継ぐため、皆さまの温かい祈りと物心両面からのご支援を心よりお願い申し上げます。',
    ],
    en: [
      'For generations, the great bell in our belfry has united the hearts of our parishioners and proclaimed the joyous Gospel across Suita and Osaka.',
      'Last November, during the ringing of the bell, the main bell fell, causing significant structural damage to the belfry. We remain profoundly grateful to God that the bell-ringer escaped harm without injury. Following thorough inspections by engineering specialists, comprehensive restoration was deemed vital to ensure safety and preserve the temple.',
      'With total costs estimated at 4.57 million yen, we are proceeding with construction. We humbly appeal to your prayers and financial generosity to restore this sacred treasure dedicated by our forefathers.',
    ],
    ru: [
      'На протяжении многих поколений большой колокол нашей колокольни объединял сердца прихожан и возвещал радость Евангелия над Суитой и Осакой.',
      'В ноябре прошлого года в момент благовеста большой колокол сорвался, причинив серьезные повреждения колокольне. Милостью Божией звонарь чудом остался жив и невредим. Тщательная экспертиза показала необходимость срочной реставрации для безопасности храма.',
      'Общая стоимость работ составляет около 4,57 млн иен. Мы искренне просим ваших святых молитв и посильной финансовой помощи для возрождения этой святыни, завещанной нам предками.',
    ],
  },
  bankInfo: {
    bankName: {
      ja: '関西みらい銀行 豊津支店',
      en: 'Kansai Mirai Bank, Toyotsu Branch',
      ru: 'Банк Kansai Mirai, отделение Тоёцу',
    },
    branch: {
      ja: '普通 0427438（大阪ハリストス正教会）',
      en: 'Savings Acct: 0427438 (Osaka Orthodox Church)',
      ru: 'Счёт: 0427438 (Osaka Orthodox Church)',
    },
    accountNumber: '0427438',
    postalAccount: '00950-8-20750（宗教法人 大阪ハリストス正教会）',
  },
  creditCardUrl: 'https://app.line-reluseed.com/index_en.html?tenant=tenant_orthodox-osaka_en',
};

// ----------------------------------------------------
// History & Cultural Heritage
// ----------------------------------------------------
export const PARISH_HISTORY_DATA: ParishHistorySection[] = [
  {
    title: {
      ja: '日本の亜使徒 聖ニコライと大阪正教会',
      en: 'St. Nicholas of Japan & The Osaka Mission',
      ru: 'Святой Николай Японский и Осакский приход',
    },
    content: {
      ja: [
        '大阪における正教会の宣教は明治初期、ロシアから来日した日本の亜使徒大主教 聖ニコライ（カサートキン）の情熱的な宣教活動によって始まりました。',
        '聖ニコライは大阪を西日本宣教の重要な拠点と位置づけ、幾度もこの地を訪れて信徒たちを激励し、信仰の礎を築きました。戦禍による旧会堂の焼失など数々の苦難を乗り越え、吹田市山手町の現在地において今も変わらぬ正教の光を灯し続けています。',
      ],
      en: [
        'Orthodox missionary work in Osaka began in the early Meiji era under the apostolic guidance of St. Nicholas of Japan (Kasatkin).',
        'Recognizing Osaka as the spiritual heart of Western Japan, St. Nicholas visited repeatedly, strengthening the faith of the early believers. Despite enduring trials—including the destruction of the original cathedral during World War II—the parish was faithfully rebuilt here in Suita and continues to bear witness to the unchanged faith of the Apostles.',
      ],
      ru: [
        'Православная миссия в Осаке началась в эпоху Мэйдзи трудами святителя Николая Японского (Касаткина), просветителя Японии.',
        'Святитель придавал Осаке особое значение как духовному центру Западной Японии, многократно посещал общину и укреплял верующих. Пройдя сквозь испытания военных лет и гибель исторического храма, приход возродился в Суите и хранит живую апостольскую традицию.',
      ],
    },
  },
  {
    title: {
      ja: '中井木菟麻呂と懐徳堂（大阪大学文学部の前身）',
      en: 'Paul Tsugumaro Nakai & The Kaitokudo Heritage',
      ru: 'Павел Цугумаро Накаи и академия Кайтокудо',
    },
    content: {
      ja: [
        '大阪出身の正教徒・パウェル中井木菟麻呂（なかい つぐまろ）は、聖ニコライの右腕として正教会訳聖書および数々の祈祷書の漢文・和漢混淆文翻訳に生涯を捧げました。',
        '中井の生家は、大阪大学文学部の源流とされる大坂の町人学問所「懐徳堂」です。中井が遺した格調高く、詩篇のリズムに富む祈祷文の言葉遣いは、難解でありながら朗誦しやすく、今日でも日本正教会の奉神礼で歌い継がれています。',
      ],
      en: [
        'Paul Tsugumaro Nakai, an Osaka native, was St. Nicholas’s foremost translator, dedicating his life to translating the Holy Scriptures and liturgical prayer books into classical Japanese.',
        'Nakai hailed from the prestigious Kaitokudo merchant academy, the intellectual forebear of Osaka University’s Faculty of Letters. His translations, marked by profound classical scholarship and poetic rhythm, remain the sacred liturgical tongue chanted in Orthodox temples across Japan today.',
      ],
      ru: [
        'Уроженец Осаки Павел Цугумаро Накаи был ближайшим сподвижником святителя Николая и посвятил жизнь переводу Священного Писания и богослужебных книг.',
        'Накаи происходил из знаменитой осакской купеческой академии «Кайтокудо» — предшественницы филологического факультета Осакского университета. Его классический, возвышенный и ритмичный слог по сей день звучит во всех православных храмах Японии.',
      ],
    },
  },
  {
    title: {
      ja: '山下りん筆 生神女イコンとロシア製の大鐘',
      en: 'Icons of Rin Yamashita & The Historic Russian Bells',
      ru: 'Иконы кисти Ирины (Рин) Ямасита и исторические колокола',
    },
    content: {
      ja: [
        '聖堂には、ペテルブルクでロシア正教イコンの技法を修めた日本初の女性洋画家・山下りん（白林狂）による貴重な生神女イコンが大切に守られています。',
        'また、鐘楼には革命前のロシアで鋳造された大鐘を含む大小6口の鐘があり、主日や大祭のたびに厳かな祈りの音色を街に響かせています。',
      ],
      en: [
        'Our temple is home to exquisite sacred icons written by Rin Yamashita (baptized Irina), Japan’s first prominent female Western-style artist who studied iconology in St. Petersburg.',
        'The belfry also houses a set of six bells, including a historic master bell cast in pre-revolutionary Russia, which rings for Sunday services and the Great Feasts.',
      ],
      ru: [
        'В храме бережно хранятся чтимые иконы кисти Ирины (Рин) Ямаситы — первой японской художницы европейского стиля, обучавшейся иконописи в Санкт-Петербурге.',
        'На колокольне установлены шесть колоколов, среди которых старинный большой колокол дореволюционного литья, оглашающий окрестности праздничным звоном.',
      ],
    },
  },
];

// ----------------------------------------------------
// What is Orthodoxy? (Inquirer Guide)
// ----------------------------------------------------
export const ABOUT_ORTHODOXY_DATA: OrthodoxyFaqItem[] = [
  {
    question: {
      ja: '正教会（オーソドックス）とはどのような教会ですか？',
      en: 'What is the Orthodox Church?',
      ru: 'Что такое Православная Церковь?',
    },
    answer: {
      ja: [
        '正教会（ハリストス正教会）は、イエス・ハリストス（キリスト）と使徒たちから連綿と受け継がれてきた古代キリスト教の信仰と礼拝の形をそのまま保ち続けている教会です。',
        '教義の変更や革新を行わず、「正しく賛美する（オーソドクシア）」という名の通り、聖使徒と教父たちの精神を今に伝えています。東欧、ロシア、ギリシャ、中東をはじめ世界中に広がり、日本では1861年に聖ニコライによって宣教が始まりました。',
      ],
      en: [
        'The Orthodox Church is the original ancient Christian Church established by Jesus Christ and His Apostles, faithfully preserving undivided doctrine and apostolic worship for two thousand years.',
        'The term "Orthodoxy" comes from the Greek meaning "right belief" and "right glory." Spanning Greece, the Middle East, Eastern Europe, Japan, and the whole world, the Japanese Orthodox Church was founded in 1861 by St. Nicholas of Japan.',
      ],
      ru: [
        'Православная Церковь — это Единая, Святая, Соборная и Апостольская Церковь, основанная Господом Иисусом Христом и Его апостолами, неизменно хранящая апостольское предание уже два тысячелетия.',
        'Слово «Православие» означает «правильное славление Бога». В Японии православная миссия была основана святым равноапостольным Николаем Японским в 1861 году.',
      ],
    },
  },
  {
    question: {
      ja: '礼拝（奉神礼）では何を大切にしていますか？',
      en: 'What characterizes Orthodox worship?',
      ru: 'В чем особенности православного богослужения?',
    },
    answer: {
      ja: [
        '正教会の礼拝は「奉神礼（ほうしんれい）」と呼ばれ、楽器を使わず、人間の声による無伴奏合唱（ア・カペラ）で祈りが捧げられます。',
        '香の香り、揺らめく蝋燭の火、聖堂を満たすイコン（聖像）に囲まれ、五感のすべてを用いて神の国の美しさと臨在を体験します。もっとも中心的な礼拝は、ハリストスの体と血に与る「聖体礼儀（リトゥルギア）」です。',
      ],
      en: [
        'Orthodox services are celebrated with purely human vocal harmony (a cappella)—no mechanical instruments are used.',
        'Surrounded by fragrant incense, flickering candlelight, and sacred iconography, worship engages all five senses as a foretaste of the Heavenly Kingdom. The heart of our worship is the Divine Liturgy, where the faithful partake of the Holy Eucharist.',
      ],
      ru: [
        'Богослужения Православной Церкви совершаются только человеческими голосами (хоровое пение а капелла) без музыкальных инструментов.',
        'Благоухание ладана, живой свет свечей и сияние святых икон вовлекают все чувства человека в молитвенное созерцание Царствия Небесного. Вершина молитвенной жизни общины — Божественная Литургия.',
      ],
    },
  },
  {
    question: {
      ja: '初めて教会を訪れる方へ（見学や参祷について）',
      en: 'Information for First-Time Visitors',
      ru: 'Для тех, кто впервые посещает храм',
    },
    answer: {
      ja: [
        '当教会は、キリスト教に関心をお持ちの方や、静かに祈りを捧げたいすべての方を心から歓迎いたします。',
        '毎週土曜日の15:00〜16:30は聖堂見学時間として開放しております。また、土曜日17:00からの徹夜祷や、日曜日10:00からの聖体礼儀にもどなたでもご自由にご参祷いただけます。服装に特別な規則はありませんが、神聖な祈りの場にふさわしい落ち着いた服装をお勧めいたします。',
      ],
      en: [
        'Our church warmly welcomes everyone seeking to learn about Christianity, architecture, or to find peace in prayer.',
        'The temple is open for viewing every Saturday from 3:00 PM to 4:30 PM. Everyone is free to attend our Saturday 5:00 PM All-Night Vigil and Sunday 10:00 AM Divine Liturgy. Modest, respectful attire is appreciated in the sacred temple.',
      ],
      ru: [
        'Наш храм всегда открыт для всех, кто ищет духовного мира, интересуется православием или желает помолиться.',
        'Каждую субботу с 15:00 до 16:30 двери храма открыты для посетителей. Вы можете свободно присутствовать на всенощном бдении (суббота 17:00) и Божественной Литургии (воскресенье 10:00). Просим приходить в благопристойной одежде.',
      ],
    },
  },
];

// ----------------------------------------------------
// Recent Sermons & Reflections
// ----------------------------------------------------
export const RECENT_SERMONS: SermonItem[] = [
  {
    id: 'sermon-16th-sunday',
    date: '2026-09-20',
    title: {
      ja: '五旬祭後第16主日説教「タラントの譬え」',
      en: '16th Sunday Sermon: The Parable of the Talents',
      ru: 'Проповедь в Неделю 16-ю по Пятидесятнице: «Притча о талантах»',
    },
    gospelReading: {
      ja: 'マトフェイによる福音 25:14–30',
      en: 'Gospel According to Matthew 25:14–30',
      ru: 'От Матфея 25:14–30',
    },
    author: {
      ja: '大阪ハリストス正教会 司祷司祭',
      en: 'Rector, Osaka Orthodox Church',
      ru: 'Настоятель Осакского храма',
    },
    excerpt: {
      ja: '父と子と聖神の名によりて。今日の福音は「タラントの譬え」として知られています。神から賜った命と恵みを恐れによって埋もれさせるのではなく、愛と信頼をもって世に豊かに実らせてまいりましょう。',
      en: 'In the Name of the Father, and of the Son, and of the Holy Spirit. Today’s Gospel brings us the Parable of the Talents. We are called not to bury God’s precious gifts out of fear, but to multiply them in faithful love.',
      ru: 'Во имя Отца и Сына и Святого Духа. Сегодняшнее Евангелие напоминает нам притчу о талантах. Будем приумножать дары Господни с любовью и дерзновением, а не закапывать их в землю из страха.',
    },
    fullText: {
      ja: [
        '父と子と聖神の名によりて。',
        '今日の福音は「タラントの譬え」としてよく知られています。古代においてタラントとは莫大な価値をもつ通貨の単位でした。主人は僕たちそれぞれの能力に応じて預け、旅に出ました。五タラント預かった者、二タラント預かった者は商いをして倍に増やしましたが、一タラント預かった者は地の中に埋めてしまいました。',
        '神が私たち一人ひとりに与えてくださった時間、健康、信仰、愛する心は、すべて神の預かり物です。失敗を恐れて心を閉ざすのではなく、主への信頼のうちに一歩を踏み出し、隣人のためにその恵みを用いてゆきましょう。',
      ],
      en: [
        'In the Name of the Father, and of the Son, and of the Holy Spirit.',
        'Today’s Gospel presents the renowned Parable of the Talents. A talent represented an enormous measure of silver. The master entrusted his wealth to servants according to their abilities. Those given five and two talents labored with diligence and doubled them, while the one given a single talent hid it in the earth out of fear.',
        'God has entrusted each of us with unique blessings—our life, time, relationships, and faith. Let us not bury our gifts in anxiety, but step forward in trust, putting our love to work for the glory of Christ and the comfort of our neighbor.',
      ],
      ru: [
        'Во имя Отца и Сына и Святого Духа.',
        'Сегодня звучит притча о талантах. Господин вручил слугам великое достояние по их силам. Получившие пять и два таланта потрудились и удвоили имение, а третий раб из страха и недоверия закопал свой талант в землю.',
        'Каждому из нас Господь доверил сокровища: жизнь, веру, время и тепло души. Не будем поддаваться страху и лености, но употребим дарованные нам таланты на служение ближним и во славу Божию.',
      ],
    },
  },
];

// ----------------------------------------------------
// 2027 Winter Seminar: Rachmaninoff & Orthodox Bells Concert
// ----------------------------------------------------
export interface ConcertEventData {
  title: TrilingualText;
  subtitle: TrilingualText;
  themePoem: TrilingualText;
  artist: {
    name: TrilingualText;
    title: TrilingualText;
    awards: TrilingualText;
    profile: TrilingualText;
  };
  program: {
    title: TrilingualText;
    opus: string;
    key?: TrilingualText;
  }[];
  date: {
    fullDisplay: TrilingualText;
    isoDate: string;
    dayOfWeek: TrilingualText;
    time: TrilingualText;
    doorsOpen: TrilingualText;
  };
  venue: {
    name: TrilingualText;
    address: TrilingualText;
    access: TrilingualText;
  };
  admission: {
    price: string;
    seating: TrilingualText;
  };
  reservationInfo: {
    reservationStartDate: TrilingualText;
    announcementPeriod: TrilingualText;
    method: TrilingualText;
    paymentMethods: TrilingualText;
    email: string;
    tel: string;
  };
  pdfFlyerUrl: string;
  pdfFlyerUrls: {
    ja: string;
    en: string;
    ru: string;
  };
  pdfBackgroundUrl: string;
  flyerImages: {
    p1: string;
    p2: string;
  };
  flyerImagesByLocale: {
    ja: { p1: string; p2: string };
    en: { p1: string; p2: string };
    ru: { p1: string; p2: string };
  };
}

export const CONCERT_EVENT_DATA: ConcertEventData = {
  title: {
    ja: 'ピアノとトーク「ラフマニノフと正教会の鐘」',
    en: 'Piano & Talk: "Rachmaninoff and the Orthodox Bells"',
    ru: 'Фортепианный вечер и беседа «Рахманинов и колокольный звон Православной Церкви»',
  },
  subtitle: {
    ja: '西日本主教教区 2027年冬季セミナー',
    en: 'Western Japan Diocese 2027 Winter Seminar',
    ru: 'Зимний семинар Западно-Японской епархии 2027 г.',
  },
  themePoem: {
    ja: 'ラフマニノフは敬虔な正教徒であった。その作品には、永遠の神への希求、世界への慈しみと悲しみ、それゆえの苦悩、そして、喜びが溢れている。ラフマニノフを愛し、ともに正教を生きるピアニスト土田定克が愛といのちの喜びの詩を語り奏でる。',
    en: 'Sergei Rachmaninoff was a devout Orthodox Christian. In his music dwells an ardent longing for the eternal God, compassion and sorrow for the world, deep trials, and an overflowing joy. Pianist Sadakatsu Tsuchida, who shares this Orthodox life of faith, speaks and plays these poems of love and life.',
    ru: 'Сергей Рахманинов был благочестивым православным христианином. В его произведениях звучит стремление к Богу, сострадание к миру и ликующая пасхальная радость. Пианист Матофей Садакацу Цутида откроет слушателям поэзию любви и вечной жизни.',
  },
  artist: {
    name: {
      ja: 'マトフェイ 土田 定克（ピアニスト）',
      en: 'Matfei Sadakatsu Tsuchida (Pianist)',
      ru: 'Матофей Садакацу Цутида (Пианист)',
    },
    title: {
      ja: '尚絅学院大学教授 / 宮城学院女子大学音楽科非常勤講師 / 仙台ハリストス正教会聖歌指揮者',
      en: 'Professor at Shokei Gakuin University / Lecturer at Miyagi Gakuin Women\'s University / Choir Director at Sendai Orthodox Church',
      ru: 'Профессор университета Сёкэй Гакуин / Регент хора Сендайского православного прихода',
    },
    awards: {
      ja: '第3回ラフマニノフ国際ピアノコンクール第1位（2002年・ロシア）',
      en: '1st Prize, 3rd International Rachmaninoff Piano Competition (2002, Russia)',
      ru: '1-я премия III Международного конкурса пианистов им. Рахманинова (2002 г., Россия)',
    },
    profile: {
      ja: '1975年東京生まれ。桐朋学園大学ソリスト・ディプロマコースを経てロシアに留学し、モスクワ音楽院卒業、同大学院修了。小西由紀子、兼松雅子、坂田晴美、A.ムンドヤンツ、V.メルジャノフに師事。2002年第3回ラフマニノフ国際ピアノコンクール第1位。V.フェドセーエフ指揮モスクワ放送交響楽団、三ツ橋敬子指揮東京フィルハーモニー交響楽団等と協演。CD「ラフマニノフ 24のプレリュード」リリース。著書『ラフマニノフを弾け』、ロシア語版『Рахманинов глазами русского музыканта』。',
      en: 'Born in Tokyo in 1975. Studied at Toho Gakuen and graduated from the Moscow Conservatory. Studied under V. Merzhanov and A. Mndoyants. 1st prize at the 3rd International Rachmaninoff Piano Competition in 2002. Performed with the Moscow Tchaikovsky Symphony Orchestra under V. Fedoseyev, Tokyo Philharmonic, and orchestras worldwide. Author of "Playing Rachmaninoff" and multiple CD recordings.',
      ru: 'Родился в Токио в 1975 году. Окончил Московскую государственную консерваторию им. Чайковского и аспирантуру. Ученик проф. В. К. Мержанова и А. А. Мндоянца. Победитель III Международного конкурса пианистов им. Рахманинова (2002). Выступал с Большим симфоническим оркестром им. Чайковского под управлением В. Федосеева. Автор книги «Играйте Рахманинова».',
    },
  },
  program: [
    {
      title: {
        ja: '前奏曲「鐘」',
        en: 'Prelude "The Bells"',
        ru: 'Прелюдия «Колокола»',
      },
      opus: 'Op. 3, No. 2',
      key: { ja: '嬰ハ短調', en: 'C-sharp minor', ru: 'до-диез минор' },
    },
    {
      title: {
        ja: '6つの楽興の時',
        en: 'Six Moments Musicaux',
        ru: 'Шесть музыкальных моментов',
      },
      opus: 'Op. 16',
    },
    {
      title: {
        ja: 'ピアノソナタ第2番',
        en: 'Piano Sonata No. 2',
        ru: 'Соната для фортепиано № 2',
      },
      opus: 'Op. 36',
      key: { ja: '変ロ短調', en: 'B-flat minor', ru: 'си-бемоль минор' },
    },
    {
      title: {
        ja: '音の絵（練習曲）',
        en: 'Études-Tableaux',
        ru: 'Этюды-картины',
      },
      opus: 'Op. 39, No. 9',
      key: { ja: 'ニ長調', en: 'D major', ru: 'ре мажор' },
    },
  ],
  date: {
    fullDisplay: {
      ja: '2027年 2月23日（火・祝）',
      en: 'Tuesday, February 23, 2027 (National Holiday)',
      ru: 'Вторник, 23 февраля 2027 г. (Праздничный день)',
    },
    isoDate: '2027-02-23',
    dayOfWeek: { ja: '火・祝', en: 'Tue (Holiday)', ru: 'Вт (праздник)' },
    time: { ja: '14:00 開演', en: '2:00 PM Starts', ru: 'Начало в 14:00' },
    doorsOpen: { ja: '13:30 開場', en: '1:30 PM Doors Open', ru: 'Вход с 13:30' },
  },
  venue: {
    name: {
      ja: '大阪ハリストス正教会',
      en: 'Osaka Orthodox Church',
      ru: 'Храм Покрова Пресвятой Богородицы в Осаке',
    },
    address: {
      ja: '大阪府吹田市山手町1-8-15',
      en: '1-8-15 Yamate-cho, Suita-shi, Osaka',
      ru: '1-8-15 Яматэ-тё, Суита, Осака',
    },
    access: {
      ja: '阪急千里線「豊津駅」より徒歩5分 / JR京都線「吹田駅」より徒歩15分',
      en: '5 min walk from Hankyu Toyotsu Station / 15 min walk from JR Suita Station',
      ru: '5 минут пешком от ст. Тоёцу (линия Ханкю) / 15 минут от ст. Суита (JR)',
    },
  },
  admission: {
    price: '¥1,500',
    seating: {
      ja: '全席自由',
      en: 'General Admission (Limited to 100 seats)',
      ru: 'Свободная рассадка (Ограничение 100 мест)',
    },
  },
  reservationInfo: {
    reservationStartDate: {
      ja: '2026年 12月1日より予約受付開始',
      en: 'Reservations Open: December 1, 2026',
      ru: 'Начало бронирования: 1 декабря 2026 г.',
    },
    announcementPeriod: {
      ja: '詳細案内は11月上旬頃に当サイトにて公開いたします',
      en: 'Detailed program and reservation details will be published in early November',
      ru: 'Подробная информация о бронировании будет опубликована в начале ноября',
    },
    method: {
      ja: 'メールでのお申し込み受付',
      en: 'Reservations accepted via email',
      ru: 'Прием заявок по электронной почте',
    },
    paymentMethods: {
      ja: '郵便振替またはキャッシュレス決済（オンライン献金）',
      en: 'Postal transfer or cashless online donation',
      ru: 'Почтовый перевод или онлайн-пожертвование картой',
    },
    email: 'osaka.orthodox.church@gmail.com',
    tel: '06-6388-4512',
  },
  pdfFlyerUrl: '/events/rachmaninoff-concert-2027.pdf',
  pdfFlyerUrls: {
    ja: '/events/rachmaninoff-concert-2027.pdf',
    en: '/events/rachmaninoff-concert-2027-en.pdf',
    ru: '/events/rachmaninoff-concert-2027-ru.pdf',
  },
  pdfBackgroundUrl: '/events/rachmaninoff-concert-2027-background.pdf',
  flyerImages: {
    p1: '/events/rachmaninoff-flyer-p1.jpg',
    p2: '/events/rachmaninoff-flyer-p2.jpg',
  },
  flyerImagesByLocale: {
    ja: {
      p1: '/events/rachmaninoff-flyer-p1.jpg',
      p2: '/events/rachmaninoff-flyer-p2.jpg',
    },
    en: {
      p1: '/events/rachmaninoff-flyer-en-p1.jpg',
      p2: '/events/rachmaninoff-flyer-en-p2.jpg',
    },
    ru: {
      p1: '/events/rachmaninoff-flyer-ru-p1.jpg',
      p2: '/events/rachmaninoff-flyer-ru-p2.jpg',
    },
  },
};

// ----------------------------------------------------
// Bell Restoration Fund Progress
// ----------------------------------------------------
export const BELL_RESTORATION_PROGRESS = {
  raisedAmount: '¥3,500,000',
  targetAmount: '¥4,570,000',
  percent: 76,
  recentDonationNote: {
    ja: '皆さまの温かいご祈祷とご支援により、目標457万円に対し現在350万円のご寄付が集まりました（先月は米国からの信徒ご夫妻より15万円のご献金を賜りました）。心より御礼申し上げます。',
    en: 'Thanks to heartfelt prayers and generous gifts—including a ¥150,000 ($1,000) donation last month from an American couple—we have reached ¥3.5M toward our ¥4.57M goal. We offer our deepest gratitude to all benefactors.',
    ru: 'Благодаря святым молитвам и пожертвованиям собрано 3,5 млн иен из 4,57 млн необходимых (в прошлом месяце православная семья из США пожертвовала 150 000 иен). Искренне благодарим всех благотворителей.',
  },
};
