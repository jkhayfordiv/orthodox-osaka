export interface DioceseChurch {
  id: string;
  name: {
    ja: string;
    en: string;
    ru: string;
  };
  patronSaint: {
    ja: string;
    en: string;
    ru: string;
  };
  region: 'tokai' | 'kinki' | 'chugoku-shikoku' | 'kyushu' | 'assemblies';
  regionLabel: {
    ja: string;
    en: string;
    ru: string;
  };
  designation?: {
    ja: string;
    en: string;
    ru: string;
  };
  priest: {
    ja: string;
    en: string;
    ru: string;
  };
  postalCode: string;
  address: {
    ja: string;
    en: string;
    ru: string;
  };
  phone: string;
  fax?: string;
  email?: string;
  website?: string;
  youtube?: string;
  facebook?: string;
  mapUrl: string;
  access: {
    ja: string;
    en: string;
    ru: string;
  };
  history: {
    ja: string;
    en?: string;
  };
  photos: string[];
  isCathedral?: boolean;
}

export interface DioceseEvent {
  date: string;
  time: string;
  title: string;
  subtitle?: string;
  speaker?: string;
  venue: string;
  leafletImage?: string;
  youtubeUrl?: string;
  status?: string;
}

export interface DioceseData {
  title: {
    ja: string;
    en: string;
    ru: string;
  };
  subtitle: {
    ja: string;
    en: string;
    ru: string;
  };
  hierarch: {
    title: {
      ja: string;
      en: string;
      ru: string;
    };
    name: {
      ja: string;
      en: string;
      ru: string;
    };
    note?: {
      ja: string;
      en: string;
      ru: string;
    };
    photo: string;
  };
  emblem: string;
  cathedral: {
    name: {
      ja: string;
      en: string;
      ru: string;
    };
    address: {
      ja: string;
      en: string;
      ru: string;
    };
    postalCode: string;
    phone: string;
    email: string;
    photo: string;
  };
  chancery: {
    name: {
      ja: string;
      en: string;
      ru: string;
    };
    email: string;
    phone: string;
  };
  events: DioceseEvent[];
  lecture: {
    title: string;
    status: string;
    url: string;
  };
  churches: DioceseChurch[];
  assemblies: {
    id: string;
    name: {
      ja: string;
      en: string;
      ru: string;
    };
    schedule: {
      ja: string;
      en: string;
      ru: string;
    };
    contact: {
      ja: string;
      en: string;
      ru: string;
    };
    phone: string;
  }[];
}

export const WEST_JAPAN_DIOCESE: DioceseData = {
  title: {
    ja: '聖自治日本正教会 西日本主教教区',
    en: 'Autonomous Orthodox Church in Japan · Western Diocese',
    ru: 'Японская Православная Церковь · Западно-Японская Епархия',
  },
  subtitle: {
    ja: '近畿・東海・中国・四国・九州 各府県の正教会・聖堂・会堂のご案内',
    en: 'Parishes, Cathedrals, Churches & Missions across Western Japan',
    ru: 'Приходы, соборы и общины Православной Церкви в Западной Японии',
  },
  hierarch: {
    title: {
      ja: '東京の大主教・全日本の府主教',
      en: 'Archbishop of Tokyo and Metropolitan of All Japan',
      ru: 'Архиепископ Токийский, Митрополит всея Японии',
    },
    name: {
      ja: 'セラフィム座下',
      en: 'His Beatitude Metropolitan Seraphim',
      ru: 'Его Блаженство Митрополит Серафим',
    },
    note: {
      ja: '西日本主教教区 主教代行',
      en: 'Administrator of the Western Diocese',
      ru: 'Временный управляющий Западно-Японской епархией',
    },
    photo: '/images/westjapan/mtseraphim.jpg',
  },
  emblem: '/images/westjapan/image_15.jpg',
  cathedral: {
    name: {
      ja: '主教座教会 京都ハリストス正教会（生神女福音聖堂）',
      en: 'The Holy Annunciation Cathedral, Kyoto',
      ru: 'Кафедральный Собор Благовещения Пресвятой Богородицы, Киото',
    },
    address: {
      ja: '京都市中京区柳馬場通り二条上る六丁目283',
      en: '6-283, 2-Jo Agaru, Yanagino-banba, Nakagyo-ku, Kyoto',
      ru: 'Киото, Накагё-ку, Янагинобанба-дори Нидзё Агару 6-283',
    },
    postalCode: '604-0965',
    phone: '075-231-2453',
    email: 'OCJWDiocese@gmail.com',
    photo: '/images/westjapan/CATHEDRAL_KYOTO.jpg',
  },
  chancery: {
    name: {
      ja: '主教区宗務局',
      en: 'Diocesan Chancery',
      ru: 'Епархиальное управление',
    },
    email: 'OCJWDiocese@gmail.com',
    phone: '075-231-2453',
  },
  events: [
    {
      date: '2026年11月1日（日）',
      time: '13:30～',
      title: '「セルビア現代詩のひととき」',
      subtitle: '詩の朗読とお話',
      speaker: '詩人 山崎佳代子',
      venue: '京都ハリストス正教会 教区センター',
      leafletImage: '/images/westjapan/Event/2611Serbia_poem_leaflet03.jpg',
      youtubeUrl: 'https://youtube.com/live/u7-rfnacbK8?feature=share',
    },
  ],
  lecture: {
    title: '奉神礼基礎講座（連続講座）',
    status: '現在休講中',
    url: 'https://www.orthodox-jp.com/liturgy/Lecture_Liturgy/Hoshiinrei-Kiso-online.html',
  },
  churches: [
    // 1. Kyoto (Cathedral)
    {
      id: 'kyoto',
      name: {
        ja: '京都ハリストス正教会',
        en: 'The Holy Annunciation Cathedral in Kyoto',
        ru: 'Кафедральный Собор Благовещения Пресвятой Богородицы в Киото',
      },
      patronSaint: {
        ja: '生神女福音聖堂（主教座教会）',
        en: 'Cathedral of the Holy Annunciation',
        ru: 'Собор Благовещения Пресвятой Богородицы',
      },
      region: 'kinki',
      regionLabel: {
        ja: '近畿',
        en: 'Kinki (Kansai)',
        ru: 'Кинки (Кансай)',
      },
      designation: {
        ja: '国指定重要文化財 · 主教座聖堂',
        en: 'National Important Cultural Property · Cathedral',
        ru: 'Национальное культурное достояние Японии · Кафедральный собор',
      },
      priest: {
        ja: 'パウェル 及川 信 神父',
        en: 'Rev. Fr. Paul Oikawa',
        ru: 'Иерей Павел Оикава',
      },
      postalCode: '604-0965',
      address: {
        ja: '京都府京都市中京区柳馬場通二条上る六丁目283',
        en: '6-283, Yanaginobanba-dori Nijyo-agaru, Nakagyo-ku, Kyoto',
        ru: 'Префектура Киото, г. Киото, Накагё-ку, Янагинобанба-дори Нидзё Агару 6-283',
      },
      phone: '075-231-2453',
      email: 'kyoto-orthodox@s7.dion.ne.jp',
      website: 'https://kyoto-orthodox.or.jp/',
      mapUrl: 'https://maps.app.goo.gl/g5xaP2t51ui2mZuZA',
      access: {
        ja: '地下鉄烏丸線「丸太町」駅下車、徒歩10分。京都地方裁判所の南。',
        en: '10 min walk from Marutamachi Station (Karasuma Subway Line), south of Kyoto District Court.',
        ru: '10 минут пешком от станции метро Марутамати (линия Карасума), к югу от окружного суда Киото.',
      },
      history: {
        ja: '西日本主教教区の主教座聖堂（カテドラル）。京都府での正教伝道は、徳島に派遣されていた丹後地方間人（たいざ）出身のパワェル中小路伝教者が帰省中に間人や峰山で公開説教を行った明治13（1880）年にさかのぼる。京都市内では、同22（1889）年に市の中心部「押小路通高倉西入る」に講義所を設立。キリル笹葉政吉が専任伝教者として派遣され、大阪正教会管轄司祭イオアン小野荘五郎の臨時管轄下で伝道活動が開始された。\n\n翌23年から26（1893）年までは、ロシア人修道司祭セルギイ（・ストラゴロドスキイ。後のロシア総主教。日本では掌院セルギイ「北海道巡回記」著者としても著名）が20歳代半ばの3年間京都での牧会にあたっている。\n\n同27（1894）年に着任したシメオン三井道郎管轄時代、同30（1897）年に現在の境内地「柳馬場通二条上る」の京都能楽堂跡地を購入。同34年12月には京都府技師松室重光の設計監督になる現在の聖堂、生神女福音（受胎告知）聖堂が完成、同36（1903）年5月ニコライ主教の司祷により成聖された。当初は寮制の京都正教女学校も敷地内に併設され、東京からナデジタ高橋五子（いね）が舎監として派遣された。同39（1906）年にはアンドロニク（・ニコリスキイ。主教としての駐日期間は3ヶ月のみ）が、ニコライ主教の補佐として「京都の主教」に叙聖された。（アンドロニクは1918年に共産軍兵士に処刑され、2000年にロシア正教会より「神品致命者」として列聖。）\n\n明治41（1908）年に来日しニコライ主教没後日本正教会の首座主教となったセルギイ（・チホミロフ）も当初は「京都の主教」の肩書であった。アンドレイ目時金吾管轄時代を経て、昭和7（1932）年着任したヴィッサリオン高橋長七管轄時代は大戦末期に「建物疎開」の命令を受けて取り壊し寸前となったが、終戦により幸いにも取り壊しを免れた。\n\n昭和61（1986）年には京都市より有形文化財に指定、平成11（1999）年には床板修理・絨毯復原新調・内外塗装修理等を行い、現在は国指定重要文化財となっている。2000年5月にはロシア正教会アレクシイ2世総主教も当教会を訪れた。',
        en: 'The cathedral of the Western Diocese. Mission began in 1880, lectureship established in 1889. Future Russian Patriarch Sergius (Stragorodsky) served here in the 1890s. The present Holy Annunciation Cathedral was designed by prefectural architect Shigemitsu Matsumuro and consecrated by St. Nicholas in May 1903. Designated as a National Important Cultural Property.',
      },
      photos: [
        '/images/westjapan/CATHEDRAL_KYOTO.jpg',
        '/images/westjapan/church/kyotocath.jpg',
        '/images/westjapan/church/KyotoIconostasis1.jpg',
      ],
      isCathedral: true,
    },

    // 2. Osaka
    {
      id: 'osaka',
      name: {
        ja: '大阪ハリストス正教会',
        en: 'The Holy Protection Orthodox Church in Osaka',
        ru: 'Храм Покрова Пресвятой Богородицы в Осаке',
      },
      patronSaint: {
        ja: '生神女庇護聖堂',
        en: 'Holy Protection Temple (Pokrov)',
        ru: 'Храм Покрова Пресвятой Богородицы',
      },
      region: 'kinki',
      regionLabel: {
        ja: '近畿',
        en: 'Kinki (Kansai)',
        ru: 'Кинки (Кансай)',
      },
      designation: {
        ja: '伝統ビザンチン様式建築 · 吹田市',
        en: 'Byzantine Modern Temple in Suita, Osaka',
        ru: 'Византийский храм в Осаке (Суита)',
      },
      priest: {
        ja: 'ゲオルギイ 松島 雄一 神父',
        en: 'Rev. Fr. George Matsushima',
        ru: 'Протоиерей Георгий Мацусима',
      },
      postalCode: '564-0073',
      address: {
        ja: '大阪府吹田市山手町1丁目8-15',
        en: '1-8-15 Yamate-cho, Suita, Osaka',
        ru: 'Префектура Осака, г. Суита, Яматэ-тё 1-8-15',
      },
      phone: '06-6388-4512',
      email: 'info.orthodox.osaka@gmail.com',
      website: 'https://orthodox-jp.com/osaka/',
      youtube: 'https://www.youtube.com/@大阪ハリストス正教会',
      facebook: 'https://www.facebook.com/osaka.orthodox.church',
      mapUrl: 'https://maps.app.goo.gl/q1zzuj5thJbUvBsk9',
      access: {
        ja: '阪急千里線「豊津」駅下車、徒歩5分。JR京都線「吹田」駅から徒歩20分。',
        en: '5 min walk from Toyotsu Station (Hankyu Senri Line), 20 min walk from JR Suita Station.',
        ru: '5 минут пешком от станции Тоёцу (линия Ханкю Сэнри), 20 минут пешком от станции JR Суита.',
      },
      history: {
        ja: '1874（明治7）年に始まった大阪地方の伝道は、1878（明治11）年3月に実を結び、聴教者37名が領洗して講義所を開設、大阪正教会が誕生した。1910（明治43）年7月、大阪天満橋に木造ビザンチン式の聖堂が建立されて生神女庇護聖堂と命名された。この聖堂は日露戦争のロシア戦没者を記憶するため、ロシアの信徒の献品・献金により建立された。\n\n1945（昭和20）年6月、惜しくも戦災により灰塵に帰した。1962（昭和37）年4月、大阪府吹田市の現在地にビザンチン様式を取り入れた鉄筋コンクリート造の聖堂を再建。イコノスタスはモスクワの聖像画師グリヤノフが制作し、愛媛県松山正教会から東京を経て大阪教会に移設された由緒あるものである。\n\n大小6つの鐘楼の鐘は1910年にモスクワのコレスニコフ氏により献納され、戦時供出を免れた鐘が現在も祈りの時を告げている。堂内にはイリナ山下りんの「機密の晩餐」「生神女マリア」イコンが掲げられている。また聖ニコライと共に祈祷書・聖書を翻訳した漢学者パウエル中井木莵麿師は大阪教会の信徒であった。フィンランドで活躍したペトロス佐々木師による『就寝聖像』は2024年に修復され、今も大切に用いられている。',
        en: 'Mission started in 1874; Osaka parish founded in 1878. The pre-war Tenmabashi wooden church was lost in WWII and rebuilt in Suita in 1962. Features a historic iconostasis by Guryanov, Moscow bells from 1910, icons by Irina Yamashita Rin, and restored Dormition shroud by Petros Sasaki.',
      },
      photos: [
        '/images/westjapan/church/Osaka_church.jpg',
        '/images/westjapan/church/Osakaiconos07.jpg',
        '/images/westjapan/church/IMG_9491.jpg',
        '/images/westjapan/church/IMG_9478.jpg',
      ],
    },

    // 3. Kobe
    {
      id: 'kobe',
      name: {
        ja: '神戸ハリストス正教会',
        en: 'The Holy Dormition Church in Kobe',
        ru: 'Храм Успения Пресвятой Богородицы в Кобэ',
      },
      patronSaint: {
        ja: '生神女就寝聖堂',
        en: 'Holy Dormition Church',
        ru: 'Храм Успения Пресвятой Богородицы',
      },
      region: 'kinki',
      regionLabel: {
        ja: '近畿',
        en: 'Kinki (Kansai)',
        ru: 'Кинки (Кансай)',
      },
      priest: {
        ja: 'ワシリイ 杉村 太郎 神父',
        en: 'Rev. Fr. Basil Sugimura',
        ru: 'Иерей Василий Сугимура',
      },
      postalCode: '650-0003',
      address: {
        ja: '兵庫県神戸市中央区山本通1丁目4-11',
        en: '1-4-11 Yamamoto-dori, Chuo-ku, Kobe, Hyogo',
        ru: 'Префектура Хёго, г. Кобэ, Тюо-ку, Ямамото-дори 1-4-11',
      },
      phone: '078-221-4925',
      fax: '078-221-4925',
      email: 'kobe.orthodox.church@gmail.com',
      mapUrl: 'https://maps.app.goo.gl/z28vREtWLaZ8ZwmY9',
      access: {
        ja: '各線「三宮」駅または「新神戸」駅より徒歩約10〜15分（北野異人館街・山本通）。',
        en: '10-15 min walk from Sannomiya or Shin-Kobe Station (near Kitano Ijinkan area).',
        ru: '10-15 минут пешком от станции Санномия или Син-Кобэ (район Китано).',
      },
      history: {
        ja: '1873年ペトル笹川神父の伝道に始まる。1913年神戸市平野祇園町に会堂。1920年代トアロード及び籠池野崎通りに、ロシア革命による亡命ロシア人たちによって2階建教会が建てられた。1952年、現在地の山本通に「生神女就寝聖堂」が建立された。異人館が建ち並ぶ北野の歴史的な街並みの中に位置し、長年にわたり多国籍な信徒が祈りを共にしてきた。',
        en: 'Originated from preaching by Fr. Peter Sasagawa in 1873. A two-story church was built in the 1920s by Russian émigrés, and the present Holy Dormition Church was erected at Yamamoto-dori in 1952.',
      },
      photos: [
        '/images/westjapan/church/Kobe.JPG',
        '/images/westjapan/church/kobe-in.JPG',
      ],
    },

    // 4. Wakayama
    {
      id: 'wakayama',
      name: {
        ja: '和歌山ハリストス正教会',
        en: 'The Orthodox Church in Wakayama',
        ru: 'Православная Церковь в Вакаяме',
      },
      patronSaint: {
        ja: '和歌山会堂',
        en: 'Wakayama Chapel',
        ru: 'Молитвенный дом в Вакаяме',
      },
      region: 'kinki',
      regionLabel: {
        ja: '近畿',
        en: 'Kinki (Kansai)',
        ru: 'Кинки (Кансай)',
      },
      designation: {
        ja: '2025年9月 新設会堂',
        en: 'Opened September 2025',
        ru: 'Открыт в сентябре 2025 года',
      },
      priest: {
        ja: 'パウェル 及川 信 神父（京都教会管轄）',
        en: 'Rev. Fr. Paul Oikawa (administered from Kyoto)',
        ru: 'Иерей Павел Оикава (из Киото)',
      },
      postalCode: '649-6338',
      address: {
        ja: '和歌山県和歌山市府中1011-160',
        en: 'Fuchu 1011-160, Wakayama City, Wakayama',
        ru: 'Префектура Вакаяма, г. Вакаяма, Футю 1011-160',
      },
      phone: '075-231-2453',
      website: 'https://kyoto-orthodox.or.jp/wakayama/',
      mapUrl: 'https://maps.app.goo.gl/58kS96Be1XEsvhmSA',
      access: {
        ja: 'JR阪和線「紀伊」駅、または南海本線「和歌山市」駅方面よりアクセス。',
        en: 'Accessible from JR Kii Station or Nankai Wakayamashi Station.',
        ru: 'Проезд от станций Кии (линия JR Ханва) или Вакаямаси.',
      },
      history: {
        ja: '2025年9月に新しく和歌山市内に会堂を開設。京都ハリストス正教会の管轄司祭パウェル及川信神父のもと、紀州・和歌山地域における祈りの場として活動を開始した。',
        en: 'The new chapel was established in September 2025 under the care of Fr. Paul Oikawa from Kyoto Cathedral.',
      },
      photos: [
        '/images/westjapan/church/Wakayama01.jpg',
        '/images/westjapan/church/Wakayama02.jpg',
      ],
    },

    // 5. Nagoya
    {
      id: 'nagoya',
      name: {
        ja: '名古屋ハリストス正教会',
        en: 'The Holy Theophany Church in Nagoya',
        ru: 'Храм Богоявления Господня в Нагое',
      },
      patronSaint: {
        ja: '神現聖堂',
        en: 'Church of the Holy Theophany',
        ru: 'Храм Богоявления Господня',
      },
      region: 'tokai',
      regionLabel: {
        ja: '東海・中部',
        en: 'Tokai & Chubu',
        ru: 'Токай и Тюбу',
      },
      designation: {
        ja: 'ヴォールト屋根・タマネギ型クーポール建築',
        en: 'Byzantine-Russian Style with Onion Domes',
        ru: 'Храм с куполами-луковицами и сводчатой кровлей',
      },
      priest: {
        ja: 'グリゴリイ 伊藤 慶郎 神父',
        en: 'Rev. Fr. Gregory Ito',
        ru: 'Иерей Григорий Ито',
      },
      postalCode: '466-0063',
      address: {
        ja: '愛知県名古屋市昭和区山脇町1-3-3',
        en: '1-3-3 Yamawaki-cho, Showa-ku, Nagoya, Aichi',
        ru: 'Префектура Айти, г. Нагоя, Сёва-ку, Ямаваки-тё 1-3-3',
      },
      phone: '052-734-9000',
      fax: '052-734-9000',
      email: 'nagoya@orthodox-jp.com',
      website: 'https://orthodoxnagoya.com/',
      mapUrl: 'https://maps.app.goo.gl/qsLttiEQANwvhLpT7',
      access: {
        ja: 'JR中央線「鶴舞」駅から徒歩10分。名古屋市営地下鉄鶴舞線「荒畑」駅から徒歩5分。※近隣にコインパーキングあり。',
        en: '10 min walk from JR Tsurumai Station, 5 min walk from Subway Arahata Station (Tsurumai Line). Paid coin parking nearby.',
        ru: '10 минут пешком от станции JR Цурумаи, 5 минут пешком от станции метро Арахата. Рядом платная парковка.',
      },
      history: {
        ja: '【名古屋への伝道】1874（明治7）年、桶屋町（現在の伏見周辺）で「生神女福音教会」として集会を開始。明治30年頃富士塚町（現・富士中付近）に移転。日露戦争時には各所に多数のロシア人捕虜が収容され、日本家屋の教会が心の拠り所となった。大正12年に2階建ての立派な聖堂が建立されたが第二次大戦で焼失。1949年昭和区山花町に移転し、1972年再建。2006年に山脇町への移転新築を決定し、2010年1月に現在の美しい聖堂が完成した。\n\n【神現聖堂の名称】ヨルダン川で洗礼を受けられた神の子イイススに天が開け聖神がくだり、父なる神が「これはわたしの愛する子」と告げられ至聖三者（三位一体）の神が顕現された出来事に由来する。\n\n【建物の特徴】正面3連、側面4連のヴォールト屋根にタマネギ型のクーポール（ドーム）を載せた中世ロシアの聖堂建築様式。内部は木の板を丹念に貼り合わせ、ビザンティン様式の輪型シャンデリアとともに柔らかな祈りの空間を醸し出している。',
        en: 'Mission started in 1874. The pre-war church served Russian prisoners during the Russo-Japanese War. The present Church of the Holy Theophany was completed in 2010, designed in traditional medieval Russian vault-and-onion dome architecture with Byzantine chandeliers.',
      },
      photos: [
        '/images/westjapan/church/nagoyaDSCN3189hosei.jpg',
        '/images/westjapan/church/_DSC9817.jpg',
        '/images/westjapan/church/_MG_1356.jpg',
      ],
    },

    // 6. Toyohashi
    {
      id: 'toyohashi',
      name: {
        ja: '豊橋ハリストス正教会',
        en: 'St. Matthew the Evangelist Church in Toyohashi',
        ru: 'Храм св. апостола и евангелиста Матфея в Тоёхаси',
      },
      patronSaint: {
        ja: '聖使徒福音記者マトフェイ聖堂',
        en: 'St. Matthew the Evangelist Church',
        ru: 'Храм святого апостола Матфея',
      },
      region: 'tokai',
      regionLabel: {
        ja: '東海・中部',
        en: 'Tokai & Chubu',
        ru: 'Токай и Тюбу',
      },
      designation: {
        ja: '国指定重要文化財 · 河村伊蔵設計',
        en: 'National Important Cultural Property · Designed by Izo Kawamura',
        ru: 'Национальное культурное достояние · Архитектор Идзо Кавамура',
      },
      priest: {
        ja: 'ソロモン 川島 大 神父',
        en: 'Rev. Fr. Solomon Kawashima',
        ru: 'Иерей Соломон Кавасима',
      },
      postalCode: '440-0806',
      address: {
        ja: '愛知県豊橋市八町通3丁目15',
        en: '3-15 Haccho-dori, Toyohashi, Aichi',
        ru: 'Префектура Айти, г. Тоёхаси, Хаттё-дори 3-15',
      },
      phone: '0532-54-0434',
      website: 'https://sites.google.com/view/orthodox-ths',
      mapUrl: 'https://maps.app.goo.gl/gjH1jhdvyankydaq6',
      access: {
        ja: '豊橋鉄道市内線（市電）「市役所前」電停下車、徒歩3分。豊橋公園・吉田城址至近。',
        en: '3 min walk from Shiyakusho-mae tram stop (Toyohashi Tramline), near Toyohashi Park.',
        ru: '3 минуты пешком от трамвайной остановки Сиякусё-маэ (городской трамвай Тоёхаси).',
      },
      history: {
        ja: '1875（明治8）年開教。現聖堂は1913（大正2）年建立。聖職者であり名建築家であった河村伊蔵（ハリストス正教会司祭・モスクワ神学校卒）による設計。木造下見板張りの美しいロシア・ビザンチン様式建築で、2008年に国の重要文化財に指定された。内部には山下りんの聖像画や伝統的なイコノスタスが今も守られている。',
        en: 'Founded in 1875. The current wooden Russian-Byzantine church was built in 1913, designed by priest-architect Izo Kawamura. Designated as a National Important Cultural Property in 2008.',
      },
      photos: [
        '/images/westjapan/church/Toyohashi01.jpg',
        '/images/westjapan/church/Toyo002.jpg',
        '/images/westjapan/church/_DSC1354.church.jpg',
      ],
    },

    // 7. Handa
    {
      id: 'handa',
      name: {
        ja: '半田ハリストス正教会',
        en: 'St. John of Damascene Church in Handa',
        ru: 'Церковь св. Иоанна Дамаскина в Ханде',
      },
      patronSaint: {
        ja: '聖イオアン・ダマスキン聖堂',
        en: 'St. John of Damascus Church',
        ru: 'Церковь святого Иоанна Дамаскина',
      },
      region: 'tokai',
      regionLabel: {
        ja: '東海・中部',
        en: 'Tokai & Chubu',
        ru: 'Токай и Тюбу',
      },
      designation: {
        ja: '半田市指定文化財 · 知多宮大工建築',
        en: 'Handa Municipal Cultural Property',
        ru: 'Муниципальный памятник культуры города Ханда',
      },
      priest: {
        ja: 'グリゴリイ 伊藤 慶郎 神父（名古屋教会管轄）',
        en: 'Rev. Fr. Gregory Ito (administered from Nagoya)',
        ru: 'Иерей Григорий Ито (из Нагои)',
      },
      postalCode: '475-0061',
      address: {
        ja: '愛知県半田市乙川西ノ宮3丁目33',
        en: '3-33 Okkawa-nishinomiya, Handa, Aichi',
        ru: 'Префектура Айти, г. Ханда, Оккава Нисиномия 3-33',
      },
      phone: '052-734-9000',
      email: 'nagoya@orthodox-jp.com',
      mapUrl: 'https://maps.app.goo.gl/Tgruzu4t3D4pjJP76',
      access: {
        ja: 'JR武豊線「乙川（おっかわ）」駅から徒歩20分。乙川津島神社の東側。',
        en: '20 min walk from JR Okkawa Station (Taketoyo Line), east of Okkawa Tsushima Shrine.',
        ru: '20 минут пешком от станции JR Оккава (линия Такэтоё), к востоку от святилища Оккава Цусима.',
      },
      history: {
        ja: '知多半島のほぼ中央部に位置する、かつて綿織物で栄え醸造で名高い半田市にある。大正2（1913）年に建てられた会堂が今も堅牢な姿で立っている。明治16年に名古屋から伝教者が半島西南端に近い内海村にやって来て48名が洗礼を受けたことにはじまり、明治18年に半田に正教がもたらされた。\n\n第二次世界大戦後に乙川の教会と統合して現在の半田教会となった。会堂建築は当時の知多半島の宮大工が苦心して和洋の技術を結集させたもので、イコノスタスの聖像はロシア製（18〜19世紀作）。半田市指定文化財に指定されている。',
        en: 'Established in 1885; the present church was constructed in 1913 by master shrine carpenters of the Chita Peninsula. Preserves 18th-19th century Russian icons and is designated as a Municipal Cultural Property.',
      },
      photos: [
        '/images/westjapan/church/HandaIMG_2488.JPG',
        '/images/westjapan/church/handachur.JPG',
      ],
    },

    // 8. Tokushima
    {
      id: 'tokushima',
      name: {
        ja: '徳島ハリストス正教会',
        en: 'The Descent of Holy Spirit Church in Tokushima',
        ru: 'Храм Сошествия Святого Духа в Токусиме',
      },
      patronSaint: {
        ja: '聖神降臨聖堂',
        en: 'Descent of the Holy Spirit Church',
        ru: 'Храм Сошествия Святого Духа',
      },
      region: 'chugoku-shikoku',
      regionLabel: {
        ja: '中国・四国',
        en: 'Chugoku & Shikoku',
        ru: 'Тюгоку и Сикоку',
      },
      designation: {
        ja: '山下りん筆イコノスタス安置',
        en: 'Features Iconostasis painted by Irina Yamashita Rin',
        ru: 'Иконостас работы Ирины Ямаситы Рин',
      },
      priest: {
        ja: 'ナファナイル 小川 卓 神父',
        en: 'Rev. Fr. Nathanael Ogawa',
        ru: 'Иерей Нафанаил Огава',
      },
      postalCode: '770-8008',
      address: {
        ja: '徳島県徳島市西新浜町1-3-6',
        en: '1-3-6 Nishi-shinhama-cho, Tokushima City, Tokushima',
        ru: 'Префектура Токусима, г. Токусима, Ниси-Синхама-тё 1-3-6',
      },
      phone: '088-662-0078',
      mapUrl: 'https://maps.app.goo.gl/28H4wht9XNxvRrNb6',
      access: {
        ja: 'JR徳島駅より路線バス「新浜」行きに乗車、終点下車、徒歩5分。',
        en: 'Take bus bound for "Shinhama" from JR Tokushima Station, get off at terminal stop, 5 min walk.',
        ru: 'Автобусом до конечной остановки «Синхама» от станции JR Токусима, далее 5 минут пешком.',
      },
      history: {
        ja: '明治10年に中小路誠一郎が派遣されて伝道開始。徳島出身の小川一郎が明治11年1月23日大阪の高屋神父より受洗後、14年に副伝教者となって脇町を中心に活動した。宮井医師らも受洗して江原村で助け、脇町には大正初期までに徳島市を超える200名以上の信徒がいた。日露戦争時には丸亀の捕虜収容所に真木神父が出張した。\n\n大正5年から昭和20年まで梯神父が奉職したが、戦災により徳島以外の教会は焼失。昭和48年より小川神父が管轄司祭となり活動が活発化、昭和55（1980）年に現在の聖神降臨聖堂が建設された。堂内のイコノスタスは明治時代に浜松教会で使用された後、豊橋、名古屋教会を経て徳島に移されたもので、明治25年頃にイリナ山下りんによって描かれた貴重な聖像画群が奉掲されている。',
        en: 'Mission started in 1877. The present Descent of the Holy Spirit Church was built in 1980. The iconic iconostasis, formerly used in Hamamatsu, Toyohashi, and Nagoya, features magnificent icons painted around 1892 by Irina Yamashita Rin.',
      },
      photos: [
        '/images/westjapan/church/TokuP1030629.JPG',
        '/images/westjapan/church/tokuP1030694.JPG',
      ],
    },

    // 9. Yanaihara
    {
      id: 'yanaibara',
      name: {
        ja: '柳井原ハリストス正教会',
        en: 'The Orthodox Church in Yanaihara, Okayama',
        ru: 'Церковь в Янаихара (Окаяма)',
      },
      patronSaint: {
        ja: '柳井原会堂',
        en: 'Yanaihara Church',
        ru: 'Церковь Янаихара',
      },
      region: 'chugoku-shikoku',
      regionLabel: {
        ja: '中国・四国',
        en: 'Chugoku & Shikoku',
        ru: 'Тюгоку и Сикоку',
      },
      designation: {
        ja: '旧大阪会堂移築 · 山下りん聖像所蔵',
        en: 'Historic Former Osaka Chapel · Yamashita Rin Icons',
        ru: 'Перевезенный исторический молитвенный дом из Осаки',
      },
      priest: {
        ja: 'ナファナイル 小川 卓 神父（徳島教会管轄）',
        en: 'Rev. Fr. Nathanael Ogawa (administered from Tokushima)',
        ru: 'Иерей Нафанаил Огава (из Токусимы)',
      },
      postalCode: '710-0261',
      address: {
        ja: '岡山県倉敷市船穂町柳井原1883',
        en: '1883 Funaho-cho Yanaibara, Kurashiki, Okayama',
        ru: 'Префектура Окаяма, г. Курасики, Фунахо-тё Янаихара 1883',
      },
      phone: '088-662-0078',
      mapUrl: 'https://maps.app.goo.gl/gBjQUoTxxMDTDHCcA',
      access: {
        ja: 'JR山陽本線「西阿知」駅よりタクシーで7分。山陽新幹線高架を過ぎ、電話ボックスを左折、山手。',
        en: '7 min by taxi from JR Nishi-Achi Station. Pass under the Shinkansen elevated tracks, turn left at telephone booth towards the hills.',
        ru: '7 минут на такси от станции JR Ниси-Ати. Проехать под эстакадой синкансэна, налево у телефонной будки в сторону холмов.',
      },
      history: {
        ja: '明治22年に柳井原出身のコルニリイ浅野久吉が受洗したことから始まった。家族を洗礼に導いて柳井原会堂の基礎を築き、明治35年には石巻出身の渡邊伝教者を迎えて盛んになった。明治から大正にかけ岡山、津山、妹尾、加須山、連島、児島、柳井原など岡山県内各地で精力的な宣教が展開された。\n\n昭和38（1963）年、大阪教会の移転新築に伴い、大阪教会の旧会堂を譲り受けて移築した。聖堂内にはイリナ山下りんの聖像画が数点大切に受け継がれている。',
        en: 'Began in 1889 with the baptism of Korniliy Asano. In 1963, the former historic chapel of Osaka Orthodox Church was transferred and rebuilt here. Preserves several original icons by Yamashita Rin.',
      },
      photos: [
        '/images/westjapan/church/P10505471.jpg',
        '/images/westjapan/church/YanaP1050548.JPG',
      ],
    },

    // 10. Fukuoka
    {
      id: 'fukuoka',
      name: {
        ja: '福岡ハリストス正教会',
        en: 'The Orthodox Church in Fukuoka',
        ru: 'Церковь в Фукуоке',
      },
      patronSaint: {
        ja: '福岡会堂（九州の拠点教会）',
        en: 'Fukuoka Church (Kyushu Center)',
        ru: 'Церковь в Фукуоке (центр Кюсю)',
      },
      region: 'kyushu',
      regionLabel: {
        ja: '九州',
        en: 'Kyushu',
        ru: 'Кюсю',
      },
      priest: {
        ja: 'グリゴリイ 水野 宏 神父',
        en: 'Rev. Fr. Gregory Mizuno',
        ru: 'Иерей Григорий Мидзуно',
      },
      postalCode: '811-2232',
      address: {
        ja: '福岡県糟屋郡志免町別府西2-7-1',
        en: '2-7-1 Befunishi, Shime-machi, Kasuya-gun, Fukuoka',
        ru: 'Префектура Фукуока, Касуя-гун, Симэ-мати, Бэппуниси 2-7-1',
      },
      phone: '092-410-0540',
      email: 'orthodox.church.in.kyushu@gmail.com',
      website: 'https://www.ocj-kyushu.com/',
      mapUrl: 'https://maps.app.goo.gl/vdiy93mm2kkyXXer6',
      access: {
        ja: '福岡市営地下鉄空港線「福岡空港」駅下車、徒歩15分。',
        en: '15 min walk from Fukuoka Airport Station (Fukuoka Subway Kuko Line).',
        ru: '15 минут пешком от станции метро Аэропорт Фукуока (линия Куко).',
      },
      history: {
        ja: '九州地方の正教会活動を統括する拠点教会。管轄司祭の水野神父のもと、福岡をはじめ熊本・人吉・鹿児島・宮崎など九州全域の信徒の牧会と巡回礼拝を担当している。',
        en: 'Central parish for Orthodox pastoral care throughout Kyushu island, overseeing communities in Fukuoka, Kumamoto, Hitoyoshi, Kagoshima, and Miyazaki.',
      },
      photos: [
        '/images/westjapan/church/Fukuoka01.jpg',
        '/images/westjapan/church/Fukuoka02.jpg',
      ],
    },

    // 11. Kumamoto
    {
      id: 'kumamoto',
      name: {
        ja: '熊本伝道所',
        en: 'The Orthodox Church in Kumamoto',
        ru: 'Церковь в Кумамото',
      },
      patronSaint: {
        ja: '熊本会堂（福岡教会管轄）',
        en: 'Kumamoto Chapel',
        ru: 'Молитвенный дом в Кумамото',
      },
      region: 'kyushu',
      regionLabel: {
        ja: '九州',
        en: 'Kyushu',
        ru: 'Кюсю',
      },
      priest: {
        ja: 'グリゴリイ 水野 宏 神父（福岡教会管轄）',
        en: 'Rev. Fr. Gregory Mizuno (administered from Fukuoka)',
        ru: 'Иерей Григорий Мидзуно (из Фукуоки)',
      },
      postalCode: '862-0975',
      address: {
        ja: '熊本県熊本市中央区新屋敷1-18-16',
        en: '1-18-16 Shinyashiki, Chuo-ku, Kumamoto City, Kumamoto',
        ru: 'Префектура Кумамото, г. Кумамото, Тюо-ку, Синъясики 1-18-16',
      },
      phone: '092-410-0540',
      email: 'orthodox.church.in.kyushu@gmail.com',
      website: 'https://www.ocj-kyushu.com/',
      mapUrl: 'https://maps.app.goo.gl/DCg8Xh3z7i3rzuKw8',
      access: {
        ja: '熊本市電「九品寺交差点」電停より徒歩約10分。新屋敷エリア。',
        en: '10 min walk from Kuhonji-kosaten tram stop (Kumamoto City Tram), Shinyashiki area.',
        ru: '10 минут пешком от трамвайной остановки Кухондзи-косатэн в Кумамото.',
      },
      history: {
        ja: '歴史の古い教会であるが第二次世界大戦後に旧会堂を失った。信徒の熱心な祈りと尽力により1962年に現在の敷地を購入して念願の会堂を建設した。毎月一度、福岡教会より水野神父が巡回して主日聖体礼儀が行われている。',
        en: 'A historic parish that lost its sanctuary after WWII. In 1962, the community acquired the current site and built a chapel. Monthly Sunday Divine Liturgies are celebrated.',
      },
      photos: [
        '/images/westjapan/church/kumaP1010323.JPG',
        '/images/westjapan/church/KumaP1010324.JPG',
      ],
    },

    // 12. Hitoyoshi
    {
      id: 'hitoyoshi',
      name: {
        ja: '人吉ハリストス正教会',
        en: 'The Holy Protection Church in Hitoyoshi',
        ru: 'Храм Покрова Пресвятой Богородицы в Хитоёси',
      },
      patronSaint: {
        ja: '生神女庇護聖堂',
        en: 'Holy Protection Temple',
        ru: 'Храм Покрова Пресвятой Богородицы',
      },
      region: 'kyushu',
      regionLabel: {
        ja: '九州',
        en: 'Kyushu',
        ru: 'Кюсю',
      },
      designation: {
        ja: 'ロシア渡来の古イコン奉掲 · 400坪敷地',
        en: 'Historic Russian Icons · Picturesque Hillside Site',
        ru: 'Храм на живописном холме со старинными иконами из России',
      },
      priest: {
        ja: 'グリゴリイ 水野 宏 神父（福岡教会管轄）',
        en: 'Rev. Fr. Gregory Mizuno (administered from Fukuoka)',
        ru: 'Иерей Григорий Мидзуно (из Фукуоки)',
      },
      postalCode: '868-0022',
      address: {
        ja: '熊本県人吉市願成寺町287-1',
        en: '287-1 Ganjoji-machi, Hitoyoshi, Kumamoto',
        ru: 'Префектура Кумамото, г. Хитоёси, Гандзёдзи-мати 287-1',
      },
      phone: '092-410-0540',
      email: 'orthodox.church.in.kyushu@gmail.com',
      website: 'https://www.ocj-kyushu.com/',
      mapUrl: 'https://maps.app.goo.gl/qsNViFGYVeVEp9ix6',
      access: {
        ja: 'JR肥薩線「人吉」駅より車で約7分。目印は人吉市立東小学校および川上哲治生家跡。',
        en: '7 min by car from JR Hitoyoshi Station. Landmarks: Hitoyoshi Higashi Elementary School & Tetsuharu Kawakami birthplace.',
        ru: '7 минут на машине от станции JR Хитоёси, рядом со школой Хигаси.',
      },
      history: {
        ja: '1932（昭和7）年に現在地に移転した。小高い丘の上に建つ聖堂は約400坪の豊かな敷地にある。人吉生神女マリヤ庇護聖堂には、かつてロシアから運ばれた古いイコンが大切に奉掲されている。球磨川と山々に囲まれた人吉の歴史的景観に調和する聖堂である。',
        en: 'Relocated to its current hilltop site (approx. 1,300 sq. meters) in 1932. Preserves antique icons brought from Russia under the patronage of the Holy Protection.',
      },
      photos: [
        '/images/westjapan/church/hitoyoshi01.jpg',
        '/images/westjapan/church/hitoyoshi02.jpg',
      ],
    },

    // 13. Kagoshima
    {
      id: 'kagoshima',
      name: {
        ja: '鹿児島ハリストス正教会',
        en: 'St. Jacob Church in Kagoshima',
        ru: 'Храм св. апостола Иакова в Кагосиме',
      },
      patronSaint: {
        ja: '聖使徒イアコフ聖堂',
        en: 'St. Jacob the Apostle Church',
        ru: 'Храм святого апостола Иакова',
      },
      region: 'kyushu',
      regionLabel: {
        ja: '九州',
        en: 'Kyushu',
        ru: 'Кюсю',
      },
      priest: {
        ja: 'グリゴリイ 水野 宏 神父（福岡教会管轄）',
        en: 'Rev. Fr. Gregory Mizuno (administered from Fukuoka)',
        ru: 'Иерей Григорий Мидзуно (из Фукуоки)',
      },
      postalCode: '892-0848',
      address: {
        ja: '鹿児島県鹿児島市平之町12-39',
        en: '12-39 Hirano-cho, Kagoshima City, Kagoshima',
        ru: 'Префектура Кагосима, г. Кагосима, Хирано-тё 12-39',
      },
      phone: '0966-24-7680',
      email: 'orthodox.church.in.kyushu@gmail.com',
      website: 'https://www.ocj-kyushu.com/',
      mapUrl: 'https://maps.google.com/?q=鹿児島県鹿児島市平之町12-39',
      access: {
        ja: 'JR鹿児島中央駅（旧西鹿児島駅）より約2km、鹿児島市の繁華街「天文館」から徒歩15分。市電「高見馬場」または市バス26番新町バス停前。車は国道3号線平田橋を目指す。',
        en: '2 km from JR Kagoshima-Chuo Station, 15 min walk from Tenmonkan downtown. By car, aim for Hirata Bridge on Route 3.',
        ru: '2 км от станции JR Кагосима-Тюо, 15 минут пешком от торгового района Тэнмонкан. Автобус №26.',
      },
      history: {
        ja: '明治時代に2度にわたって焼失した聖堂は、その都度全信徒の献身によって再建された。第二次世界大戦末期にも戦災にあって再度焼失したが、当時の管轄司祭大木神父を中心に全信徒が奮起し現在の聖堂を建設。1957年にイリネイ大主教によって成聖式が行われた。\n\n桜島の降灰、地震、台風など自然の試練が多い薩摩の地で、正教の信仰は脈々と今も受け継がれている。立地条件にも恵まれ、鹿児島の中心市街地に位置する。',
        en: 'Rebuilt twice in the Meiji era and destroyed once more in WWII. Rebuilt through faithful perseverance under Fr. Oki and consecrated in 1957 by Archbishop Irenei. Stands steadfast amid Sakurajima volcanic ash and southern typhoons.',
      },
      photos: [
        '/images/westjapan/church/KagoP1010333.JPG',
        '/images/westjapan/church/KagoP10101831.jpg',
      ],
    },
  ],
  assemblies: [
    {
      id: 'hiroshima',
      name: {
        ja: '広島地区集会',
        en: 'Hiroshima Assembly',
        ru: 'Хиросимская община',
      },
      schedule: {
        ja: '年2回（4月29日頃および11月23日頃）、市内の会場を借りて聖体礼儀を行っています。',
        en: 'Divine Liturgy is celebrated twice a year (around April 29 and November 23) in Hiroshima City.',
        ru: 'Божественная Литургия совершается дважды в год (около 29 апреля и 23 ноября) в Хиросиме.',
      },
      contact: {
        ja: '大阪ハリストス正教会 松島神父まで',
        en: 'Contact Fr. George Matsushima (Osaka Orthodox Church)',
        ru: 'Справки у священника Георгия Мацусимы (храм в Осаке)',
      },
      phone: '06-6388-4512',
    },
    {
      id: 'miyazaki',
      name: {
        ja: '宮崎地区集会',
        en: 'Miyazaki Assembly',
        ru: 'Миядзаки община',
      },
      schedule: {
        ja: '宮崎地域における信徒の集会・巡回牧会。',
        en: 'Regional assembly and pastoral visits in Miyazaki.',
        ru: 'Пастырские визиты и богослужения в Миядзаки.',
      },
      contact: {
        ja: '福岡ハリストス正教会 水野神父まで',
        en: 'Contact Fr. Gregory Mizuno (Fukuoka Orthodox Church)',
        ru: 'Справки у священника Григория Мидзуно (храм в Фукуоке)',
      },
      phone: '092-410-0540',
    },
  ],
};
