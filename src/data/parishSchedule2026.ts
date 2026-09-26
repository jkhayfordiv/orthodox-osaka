import { ParishService } from '../lib/types';

export const PARISH_SCHEDULE_2026: ParishService[] = [
  // --- August 2026 ---
  {
    id: 's-2026-08-01',
    date: '2026-08-01',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（五旬祭後第9の主日）',
      en: 'All-Night Vigil (9th Sunday after Pentecost)',
      ru: 'Всенощное бдение (Неделя 9-я по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-08-02',
    date: '2026-08-02',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第9の主日）',
      en: 'Divine Liturgy (9th Sunday after Pentecost)',
      ru: 'Божественная Литургия (Неделя 9-я по Пятидесятнице)',
    },
    dutyGroup: 'Rabboni',
    dutyPeople: ['Anastasia', 'Antonina'],
    notes: {
      ja: '聖堂掃除、執事会',
      en: 'Chapel cleaning, Board Meeting',
      ru: 'Уборка храма, заседание совета директоров',
    },
  },
  {
    id: 's-2026-08-08',
    date: '2026-08-08',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（五旬祭後第10の主日）',
      en: 'All-Night Vigil (10th Sunday after Pentecost)',
      ru: 'Всенощное бдение (Неделя 10-я по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-08-09',
    date: '2026-08-09',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第10の主日）',
      en: 'Divine Liturgy (10th Sunday after Pentecost)',
      ru: 'Божественная Литургия (Неделя 10-я по Пятидесятнице)',
    },
    dutyGroup: "Daria's Kitchen",
    dutyPeople: ['Alexandra S.', 'Anna', 'Natalia', 'Olya'],
    notes: {
      ja: '月例パニヒダ、婦人会総会',
      en: 'Memorial Service (Panikhida), Women’s Association Meeting',
      ru: 'Панихида, общее собрание женской ассоциации',
    },
  },
  {
    id: 's-2026-08-14',
    date: '2026-08-14',
    time: '11:00',
    serviceType: 'water_blessing',
    title: {
      ja: '十字架出行祭、小聖水式（就寝祭斎開始）',
      en: 'Procession of the Cross, Blessing of Water (Dormition Fast begins)',
      ru: 'Происхождение Честных Древ Креста, Малое водоосвящение (Начало Успенского поста)',
    },
  },
  {
    id: 's-2026-08-15',
    date: '2026-08-15',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（主の変容祭 繰上）',
      en: 'All-Night Vigil (Transfiguration of the Lord - Transferred)',
      ru: 'Всенощное бдение (Преображение Господне - перенесено)',
    },
    isTransferred: true,
  },
  {
    id: 's-2026-08-16',
    date: '2026-08-16',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（主の変容祭 兼行）',
      en: 'Divine Liturgy (Transfiguration of the Lord)',
      ru: 'Божественная Литургия (Преображение Господне)',
    },
    dutyGroup: 'Church Friends',
    notes: {
      ja: 'ぶどう・果物の成聖式',
      en: 'Blessing of grapes and first-fruits',
      ru: 'Освящение плодов и винограда',
    },
  },
  {
    id: 's-2026-08-22',
    date: '2026-08-22',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（五旬祭後第12の主日）',
      en: 'All-Night Vigil (12th Sunday after Pentecost)',
      ru: 'Всенощное бдение (Неделя 12-я по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-08-23',
    date: '2026-08-23',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第12の主日）',
      en: 'Divine Liturgy (12th Sunday after Pentecost)',
      ru: 'Божественная Литургия (Неделя 12-я по Пятидесятнице)',
    },
    dutyGroup: 'Choir',
  },
  {
    id: 's-2026-08-29',
    date: '2026-08-29',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '光の子会（プログラミング体験＆パン作り）',
      en: 'Hikari no Ko-kai (Children of the Light: Programming & Bread Baking)',
      ru: 'Хикари но Ко-кай (Занятие по программированию и выпечка хлеба)',
    },
  },
  {
    id: 's-2026-08-29-v',
    date: '2026-08-29',
    time: '17:00',
    serviceType: 'vespers',
    title: {
      ja: '晩課（五旬祭後第13の主日）',
      en: 'Vespers (13th Sunday after Pentecost)',
      ru: 'Вечерня (Неделя 13-я по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-08-30',
    date: '2026-08-30',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（生神女就寝祭 兼行）',
      en: 'Divine Liturgy (Dormition of our Lady)',
      ru: 'Божественная Литургия (Успение Пресвятой Богородицы)',
    },
    dutyGroup: 'Rabboni',
    isTransferred: true,
  },

  // --- September 2026 ---
  {
    id: 's-2026-09-05',
    date: '2026-09-05',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（五旬祭後第14の主日）',
      en: 'All-Night Vigil (14th Sunday after Pentecost)',
      ru: 'Всенощное бдение (Неделя 14-я по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-09-06',
    date: '2026-09-06',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第14の主日）',
      en: 'Divine Liturgy (14th Sunday after Pentecost)',
      ru: 'Божественная Литургия (Неделя 14-я по Пятидесятнице)',
    },
    dutyGroup: 'Rabboni',
    dutyPeople: ['Anastasia', 'Antonina', 'Elena'],
    notes: {
      ja: '聖堂掃除、執事会',
      en: 'Chapel cleaning, Board Meeting',
      ru: 'Уборка храма, заседание совета директоров',
    },
  },
  {
    id: 's-2026-09-12',
    date: '2026-09-12',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '伝道会、徹夜祷（五旬祭後第15の主日）',
      en: 'Parish Meeting & All-Night Vigil (15th Sunday after Pentecost)',
      ru: 'Собрание и Всенощное бдение (Неделя 15-я по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-09-13',
    date: '2026-09-13',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀、月例パニヒダ',
      en: 'Divine Liturgy, Memorial Service (Panikhida)',
      ru: 'Божественная Литургия, Панихида',
    },
    dutyGroup: "Daria's Kitchen",
    dutyPeople: ['Alexandra S.', 'Anna', 'Natalia'],
    notes: {
      ja: '光の子会（日曜学校）',
      en: 'Sunday School (Hikari no Ko)',
      ru: 'Воскресная школа (Хикари но Ко)',
    },
  },
  {
    id: 's-2026-09-19',
    date: '2026-09-19',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（五旬祭後第16の主日）',
      en: 'All-Night Vigil (16th Sunday after Pentecost)',
      ru: 'Всенощное бдение (Неделя 16-я по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-09-20',
    date: '2026-09-20',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（敬老会）',
      en: 'Divine Liturgy (Respect for the Aged Event)',
      ru: 'Божественная Литургия (День почитания старших)',
    },
    dutyGroup: 'Church Friends',
    notes: {
      ja: '教会のお年寄りに敬意を表してお祝い会を行います。若い方の協力をお願いします。',
      en: 'Event to honor the senior members of our parish with luncheon.',
      ru: 'Праздник почитания пожилых прихожан храма.',
    },
  },
  {
    id: 's-2026-09-26',
    date: '2026-09-26',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷 8調（十字架挙栄祭）',
      en: 'All-Night Vigil Tone 8 (Exaltation of the Cross)',
      ru: 'Всенощное бдение Глас 8 (Воздвижение Креста Господня)',
    },
  },
  {
    id: 's-2026-09-27',
    date: '2026-09-27',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（十字架挙栄祭・厳斎）',
      en: 'Divine Liturgy (The Exaltation of the Cross - Strict Fast)',
      ru: 'Божественная Литургия (Воздвижение Креста Господня - Строгий пост)',
    },
    dutyGroup: 'Choir',
  },

  // --- October 2026 (10月 大阪教会の予定) ---
  {
    id: 's-2026-10-03',
    date: '2026-10-03',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課7福音）',
      en: 'All Night Vigil (Matins Gospel 7)',
      ru: 'Всенощное бдение (Утреня: Евангелие 7)',
    },
  },
  {
    id: 's-2026-10-04',
    date: '2026-10-04',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '主日聖体礼儀',
      en: 'Divine Liturgy',
      ru: 'Божественная Литургия',
    },
  },
  {
    id: 's-2026-10-10-bible',
    date: '2026-10-10',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible class (Zoom)',
      ru: 'Библейская беседа (Zoom)',
    },
  },
  {
    id: 's-2026-10-10-workshop',
    date: '2026-10-10',
    time: '15:00',
    serviceType: 'special',
    title: {
      ja: '奉神礼（誦経、聖歌）研修会',
      en: 'Workshop on Liturgy (Reading & Chanting)',
      ru: 'Практикум по богослужению (чтение и пение)',
    },
  },
  {
    id: 's-2026-10-10-vespers',
    date: '2026-10-10',
    time: '17:00',
    serviceType: 'vespers',
    title: {
      ja: '晩課（堂祭前晩）',
      en: 'Vespers',
      ru: 'Вечерня',
    },
  },
  {
    id: 's-2026-10-11',
    date: '2026-10-11',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '主日祭日聖体礼儀（杉村神父と共同司式）・月例パニヒダ・堂祭BBQ',
      en: 'Divine Liturgy (Concelebrated with Fr. Sugimura), Monthly Memorial Panihida & Temple Feast BBQ',
      ru: 'Праздничная Божественная Литургия (сослужение с о. Сугимурой), Панихида, Престольный праздник и барбекю',
    },
    dutyGroup: 'All Parishioners',
    notes: {
      ja: '当教会の堂祭（生神女庇護祭）です。礼儀・パニヒダ後、庭でバーベキュー親睦会を開催します。',
      en: 'Temple Feast of Holy Protection. Following Divine Liturgy and Panihida, celebratory BBQ party in the garden.',
      ru: 'Престольный праздник Покрова Богородицы. После Литургии и панихиды праздничное барбекю в церковном саду.',
    },
  },
  {
    id: 's-2026-10-17',
    date: '2026-10-17',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課9福音）',
      en: 'All Night Vigil (Matins Gospel 9)',
      ru: 'Всенощное бдение (Утреня: Евангелие 9)',
    },
  },
  {
    id: 's-2026-10-18',
    date: '2026-10-18',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '主日聖体礼儀',
      en: 'Divine Liturgy',
      ru: 'Божественная Литургия',
    },
  },
  {
    id: 's-2026-10-24-bible',
    date: '2026-10-24',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible class (Zoom)',
      ru: 'Библейская беседа (Zoom)',
    },
  },
  {
    id: 's-2026-10-24-vigil',
    date: '2026-10-24',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課10福音）',
      en: 'All Night Vigil (Matins Gospel 10)',
      ru: 'Всенощное бдение (Утреня: Евангелие 10)',
    },
  },
  {
    id: 's-2026-10-25',
    date: '2026-10-25',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '主日聖体礼儀',
      en: 'Divine Liturgy',
      ru: 'Божественная Литургия',
    },
  },
  {
    id: 's-2026-10-31',
    date: '2026-10-31',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課11福音）',
      en: 'All Night Vigil (Matins Gospel 11)',
      ru: 'Всенощное бдение (Утреня: Евангелие 11)',
    },
  },

  // --- November 2026 (11月 大阪教会の予定) ---
  {
    id: 's-2026-11-01',
    date: '2026-11-01',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '主日聖体礼儀',
      en: 'Divine Liturgy',
      ru: 'Божественная Литургия',
    },
  },
  {
    id: 's-2026-11-07-bible',
    date: '2026-11-07',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible class (Zoom)',
      ru: 'Библейская беседа (Zoom)',
    },
  },
  {
    id: 's-2026-11-07-vigil',
    date: '2026-11-07',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課1福音）',
      en: 'All Night Vigil (Matins Gospel 1)',
      ru: 'Всенощное бдение (Утреня: Евангелие 1)',
    },
  },
  {
    id: 's-2026-11-08-liturgy',
    date: '2026-11-08',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '主日聖体礼儀・月例パニヒダ',
      en: 'Divine Liturgy, Monthly Memorial service (Panihida)',
      ru: 'Божественная Литургия, Месячная панихида',
    },
  },
  {
    id: 's-2026-11-08-cemetery',
    date: '2026-11-08',
    time: '16:00',
    serviceType: 'special',
    title: {
      ja: '露軍兵士墓地パニヒダ（泉大津）',
      en: 'Memorial service at Russian soldiers\' cemetery (Izumiotsu)',
      ru: 'Панихида на кладбище российских солдат в Идзумиоцу',
    },
    notes: {
      ja: '泉大津市のロシア兵墓地にて永眠者のためのパニヒダを捧げます。',
      en: 'Memorial service (Panikhida) at the Russian Soldiers\' Cemetery in Izumiotsu.',
      ru: 'Панихида по усопшим воинам на кладбище в Идзумиоцу.',
    },
  },
  {
    id: 's-2026-11-14',
    date: '2026-11-14',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課2福音）',
      en: 'All Night Vigil (Matins Gospel 2)',
      ru: 'Всенощное бдение (Утреня: Евангелие 2)',
    },
  },
  {
    id: 's-2026-11-15',
    date: '2026-11-15',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '主日聖体礼儀',
      en: 'Divine Liturgy',
      ru: 'Божественная Литургия',
    },
  },
  {
    id: 's-2026-11-21-bible',
    date: '2026-11-21',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible class (Zoom)',
      ru: 'Библейская беседа (Zoom)',
    },
  },
  {
    id: 's-2026-11-21-vigil',
    date: '2026-11-21',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課3福音）',
      en: 'All Night Vigil (Matins Gospel 3)',
      ru: 'Всенощное бдение (Утреня: Евангелие 3)',
    },
  },
  {
    id: 's-2026-11-22',
    date: '2026-11-22',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '主日聖体礼儀',
      en: 'Divine Liturgy',
      ru: 'Божественная Литургия',
    },
  },
  {
    id: 's-2026-11-23',
    date: '2026-11-23',
    time: '09:30',
    serviceType: 'special',
    title: {
      ja: '広島集会 聖体礼儀（杉村神父）',
      en: 'Liturgy in Hiroshima (Fr. Sugimura)',
      ru: 'Божественная Литургия общины в Хиросиме (о. Сугимура)',
    },
    notes: {
      ja: '広島集会への出張聖体礼儀です。',
      en: 'Divine Liturgy for the Hiroshima Orthodox Community.',
      ru: 'Выездная Божественная Литургия православной общины в Хиросиме.',
    },
  },
  {
    id: 's-2026-11-28-workshop',
    date: '2026-11-28',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '奉神礼（誦経、聖歌）研修会',
      en: 'Workshop on Liturgy (Reading & Chanting)',
      ru: 'Практикум по богослужению (чтение и пение)',
    },
  },
  {
    id: 's-2026-11-28-vigil',
    date: '2026-11-28',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課4福音）',
      en: 'All Night Vigil (Matins Gospel 4)',
      ru: 'Всенощное бдение (Утреня: Евангелие 4)',
    },
    notes: {
      ja: 'フィリップ（降誕祭）の斎 開始',
      en: 'Fasting for Christmas starts (Nativity Fast).',
      ru: 'Начинается Рождественский (Филиппов) пост.',
    },
  },
  {
    id: 's-2026-11-29',
    date: '2026-11-29',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '主日聖体礼儀',
      en: 'Divine Liturgy',
      ru: 'Божественная Литургия',
    },
  },

  // --- December 2026 (12月 大阪教会の予定) ---
  {
    id: 's-2026-12-02',
    date: '2026-12-02',
    time: '14:00',
    serviceType: 'special',
    title: {
      ja: 'LPで聴く名曲喫茶コンサート、チャイコフスキー「くるみ割り人形」',
      en: 'LP record concert "Nutcracker" (Tchaikovsky)',
      ru: 'Концерт с виниловых пластинок: П.И. Чайковский балет «Щелкунчик»',
    },
    notes: {
      ja: '大阪教会会館にてLPレコードでクラシック名曲を鑑賞するひとときです。',
      en: 'Classical music listening gathering playing Tchaikovsky on vinyl at parish hall.',
      ru: 'Музыкальная встреча в приходском зале: прослушивание «Щелкунчика» на виниле.',
    },
  },
  {
    id: 's-2026-12-03',
    date: '2026-12-03',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '生神女進堂祭 徹夜祷',
      en: 'Presentation of Theotokos: All Night Vigil',
      ru: 'Введение во храм Пресвятой Богородицы: Всенощное бдение',
    },
  },
  {
    id: 's-2026-12-04',
    date: '2026-12-04',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '生神女進堂祭 聖体礼儀',
      en: 'Presentation of Theotokos: Divine Liturgy',
      ru: 'Введение во храм Пресвятой Богородицы: Божественная Литургия',
    },
  },
  {
    id: 's-2026-12-05',
    date: '2026-12-05',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課5福音）',
      en: 'All Night Vigil (Matins Gospel 5)',
      ru: 'Всенощное бдение (Утреня: Евангелие 5)',
    },
  },
  {
    id: 's-2026-12-06',
    date: '2026-12-06',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '主日聖体礼儀',
      en: 'Divine Liturgy',
      ru: 'Божественная Литургия',
    },
  },
  {
    id: 's-2026-12-19',
    date: '2026-12-19',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '奇跡者聖ニコライ祭 聖体礼儀',
      en: 'St. Nicholas the Wonderworker Divine Liturgy',
      ru: 'Святителя Николая Чудотворца: Божественная Литургия',
    },
  },
  {
    id: 's-2026-12-25',
    date: '2026-12-25',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '新暦降誕祭 聖体礼儀',
      en: 'Nativity of Christ Divine Liturgy (New Calendar)',
      ru: 'Рождество Христово: Божественная Литургия (новоюлианский)',
    },
    notes: {
      ja: '大阪ハリストス正教会にて祝われる新暦主の降誕祭です。',
      en: 'Nativity of our Lord celebrated at Osaka Church according to civil December 25.',
      ru: 'Празднование Рождества Христова в нашем храме 25 декабря.',
    },
  },

  // --- January 2027 ---
  {
    id: 's-2027-01-01',
    date: '2027-01-01',
    time: '11:00',
    serviceType: 'special',
    title: {
      ja: '新年祈祷（モレーベン）',
      en: 'New Year Prayer Service (Moleben)',
      ru: 'Новогодний молебен на новолетие',
    },
  },
  {
    id: 's-2027-01-06',
    date: '2027-01-06',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '主の降誕祭 前晩徹夜祷（旧暦降誕祭）',
      en: 'Nativity of Christ All-Night Vigil (Old Calendar)',
      ru: 'Навечерие Рождества Христова: Всенощное бдение',
    },
  },
  {
    id: 's-2027-01-07',
    date: '2027-01-07',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '旧暦降誕祭 聖体礼儀（主の降誕大祭）',
      en: 'Nativity of Christ Divine Liturgy (Old Calendar Feast)',
      ru: 'Рождество Господа Бога и Спаса нашего Иисуса Христа: Литургия',
    },
    notes: {
      ja: '伝統のユリウス暦による降誕大祭です。ハリストス生まる！',
      en: 'Traditional Julian Calendar Nativity Feast. Christ is born! Glorify Him!',
      ru: 'Традиционное празднование Рождества по юлианскому календарю. Христос рождается, славите!',
    },
  },
  {
    id: 's-2027-01-17',
    date: '2027-01-17',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '神現祭 聖体礼儀、大聖水式',
      en: 'Theophany of the Lord Divine Liturgy & Great Blessing of Water',
      ru: 'Богоявление Господне: Литургия и Великое освящение воды',
    },
    notes: {
      ja: '水瓶をご持参ください。聖水を分かち合います。',
      en: 'Great Blessing of Waters. Holy water distributed to parishioners.',
      ru: 'Великое освящение воды. Раздача Крещенской святой воды (Великой Агиасмы).',
    },
  },

  // --- February 2027 (St. Nicholas of Japan) ---
  {
    id: 's-2027-02-16',
    date: '2027-02-16',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '日本の亜使徒聖ニコライ祭 聖体礼儀',
      en: 'St. Nicholas of Japan, Equal-to-the-Apostles Divine Liturgy',
      ru: 'Святого равноапостольного Николая Японского: Литургия',
    },
    notes: {
      ja: '日本正教会の創設者・大主教聖ニコライの記念祭です。',
      en: 'Patron saint of Japan and founder of the Japanese Orthodox Church.',
      ru: 'Память просветителя Японии, святителя Николая Японского.',
    },
  },

  // --- March 2027 (Great Lent begins) ---
  {
    id: 's-2027-03-14',
    date: '2027-03-14',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '乾酪主日 聖体礼儀、赦罪晩課',
      en: 'Cheesefare Sunday Liturgy & Forgiveness Vespers',
      ru: 'Прощёное воскресенье: Литургия и Чин прощения',
    },
    notes: {
      ja: '大斎に入るにあたり、互いに許しを乞い和解の礼拝を行います。',
      en: 'The Rite of Forgiveness entering Great Lent: asking forgiveness of each other.',
      ru: 'Вход в Великий Пост: взаимное испрашивание прощения перед началом святой Четыредесятницы.',
    },
  },

  // --- April & May 2027 (Holy Week & Pascha!) ---
  {
    id: 's-2027-04-29',
    date: '2027-04-29',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖大木曜日 聖大ワシリイ聖体礼儀、12福音早課',
      en: 'Holy Thursday: Liturgy of St. Basil & Matins of the 12 Passion Gospels',
      ru: 'Великий Четверток: Литургия св. Василия Великого и Утреня 12-ти Евангелий',
    },
  },
  {
    id: 's-2027-04-30',
    date: '2027-04-30',
    time: '14:00',
    serviceType: 'vespers',
    title: {
      ja: '聖大金曜日 晩課（聖骸布着座）、十字行早課',
      en: 'Holy Friday: Vespers (Epitaphios Procession) & Lamentations Matins',
      ru: 'Великий Пяток: Вечерня с выносом Плащаницы и Утреня с чином погребения',
    },
  },
  {
    id: 's-2027-05-01',
    date: '2027-05-01',
    time: '23:30',
    serviceType: 'special',
    title: {
      ja: '主の復活大祭 夜半課',
      en: 'Pascha: Midnight Office (Nocturns)',
      ru: 'Светлое Христово Воскресение: Пасхальная Полунощница',
    },
  },
  {
    id: 's-2027-05-02',
    date: '2027-05-02',
    time: '00:00',
    serviceType: 'liturgy',
    title: {
      ja: '復活大祭 早課、聖体礼儀（ハリストス復活！パスカ祝賀）',
      en: 'PASCHA: Paschal Matins & Divine Liturgy (Christ is Risen!)',
      ru: 'СВЕТЛОЕ ХРИСТОВО ВОСКРЕСЕНИЕ — ПАСХА: Утреня и Божественная Литургия (Христос Воскресе!)',
    },
    notes: {
      ja: 'ハリストス復活！実に復活！礼儀後、卵・クリーチの成聖とパスカ祝宴を行います。',
      en: 'Christ is Risen! Indeed He is Risen! Blessing of Easter baskets, eggs, and Kulich.',
      ru: 'Христос Воскресе! Воистину Воскресе! Освящение пасхальных куличей, яиц и праздничная трапеза.',
    },
  },
];
