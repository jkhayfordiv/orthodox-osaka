import { ParishService } from '../lib/types';

/**
 * Official Osaka Orthodox Parish Liturgical Schedule (2026年度 予定表 2026/10/27改訂)
 * Covers June 2026 through May 2027.
 */
export const PARISH_SCHEDULE_2026: ParishService[] = [
  // ========================================================
  // --- June 2026 (6月) ---
  // ========================================================
  {
    id: 's-2026-06-06',
    date: '2026-06-06',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（衆聖人の主日前晩）',
      en: 'All-Night Vigil (Eve of All Saints Sunday)',
      ru: 'Всенощное бдение (Неделя всех святых)',
    },
  },
  {
    id: 's-2026-06-07',
    date: '2026-06-07',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '衆聖人生日 聖体礼儀・執事会',
      en: 'All Saints Sunday Divine Liturgy & Board Meeting',
      ru: 'Неделя всех святых: Божественная Литургия, совет',
    },
  },
  {
    id: 's-2026-06-08',
    date: '2026-06-08',
    time: '10:00',
    serviceType: 'special',
    title: {
      ja: '聖使徒の斎 開始（〜7月11日）',
      en: 'Apostles\' Fast begins (until July 11)',
      ru: 'Начало Петрова поста (до 11 июля)',
    },
  },
  {
    id: 's-2026-06-13',
    date: '2026-06-13',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会',
      en: 'Parish Bible Study Class',
      ru: 'Библейская беседа',
    },
  },
  {
    id: 's-2026-06-13-v',
    date: '2026-06-13',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（五旬祭後第2の主日）',
      en: 'All-Night Vigil (2nd Sunday after Pentecost)',
      ru: 'Всенощное бдение (2-я Неделя по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-06-14',
    date: '2026-06-14',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第2主日）・月例パニヒダ',
      en: 'Divine Liturgy (2nd Sunday after Pentecost) & Monthly Panikhida',
      ru: 'Божественная Литургия (2-я Неделя), месячная панихида',
    },
  },
  {
    id: 's-2026-06-19',
    date: '2026-06-19',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '西日本主教教区 司祭会議（大阪）',
      en: 'Western Diocese Clergy Meeting (Osaka)',
      ru: 'Пастырское совещание Западной епархии (Осака)',
    },
  },
  {
    id: 's-2026-06-20',
    date: '2026-06-20',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '西日本主教教区 理事会（大阪）',
      en: 'Western Diocese Council Meeting (Osaka)',
      ru: 'Заседание епархиального совета (Осака)',
    },
  },
  {
    id: 's-2026-06-21',
    date: '2026-06-21',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第3主日）・西日本主教教区公会（大阪）',
      en: 'Divine Liturgy (3rd Sunday) & Western Diocese General Assembly',
      ru: 'Божественная Литургия и Епархиальное собрание (Осака)',
    },
  },
  {
    id: 's-2026-06-27',
    date: '2026-06-27',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会',
      en: 'Parish Bible Study Class',
      ru: 'Библейская беседа',
    },
  },
  {
    id: 's-2026-06-27-v',
    date: '2026-06-27',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（五旬祭後第4の主日）',
      en: 'All-Night Vigil (4th Sunday after Pentecost)',
      ru: 'Всенощное бдение (4-я Неделя по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-06-28',
    date: '2026-06-28',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第4主日）・婦人会総会',
      en: 'Divine Liturgy (4th Sunday) & Women\'s Association Assembly',
      ru: 'Божественная Литургия и собрание сестричества',
    },
  },

  // ========================================================
  // --- July 2026 (7月) ---
  // ========================================================
  {
    id: 's-2026-07-04',
    date: '2026-07-04',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（五旬祭後第5の主日）',
      en: 'All-Night Vigil (5th Sunday after Pentecost)',
      ru: 'Всенощное бдение (5-я Неделя по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-07-05',
    date: '2026-07-05',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第5主日・洗礼式）・執事会',
      en: 'Divine Liturgy (5th Sunday / Holy Baptism) & Board Meeting',
      ru: 'Божественная Литургия (5-я Неделя / Таинство Крещения), совет',
    },
  },
  {
    id: 's-2026-07-07',
    date: '2026-07-07',
    time: '10:00',
    serviceType: 'special',
    title: {
      ja: '前駆授洗イオアン誕生祭',
      en: 'Nativity of St. John the Baptist',
      ru: 'Рождество Иоанна Предтечи',
    },
  },
  {
    id: 's-2026-07-10',
    date: '2026-07-10',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '日本正教会 総局会議（東京）',
      en: 'Orthodox Church in Japan Chancery Meeting (Tokyo)',
      ru: 'Заседание Синодального управления (Токио)',
    },
  },
  {
    id: 's-2026-07-11',
    date: '2026-07-11',
    time: '10:00',
    serviceType: 'special',
    title: {
      ja: '日本正教会 全国公会（東京・ニコライ堂）',
      en: 'All-Japan Orthodox Church Council (Tokyo)',
      ru: 'Всеяпонский Поместный Собор (Токио)',
    },
  },
  {
    id: 's-2026-07-12',
    date: '2026-07-12',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖使徒ペトル・パウェル祭 代式（全国公会・東京）',
      en: 'Ss. Peter and Paul (Reader Service / All-Japan Council in Tokyo)',
      ru: 'Святых апостолов Петра и Павла: Обедница / Собор в Токио',
    },
  },
  {
    id: 's-2026-07-18',
    date: '2026-07-18',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（五旬祭後第7の主日）',
      en: 'All-Night Vigil (7th Sunday after Pentecost)',
      ru: 'Всенощное бдение (7-я Неделя по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-07-19',
    date: '2026-07-19',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第7主日）',
      en: 'Divine Liturgy (7th Sunday after Pentecost)',
      ru: 'Божественная Литургия (7-я Неделя по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-07-25',
    date: '2026-07-25',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会',
      en: 'Parish Bible Study Class',
      ru: 'Библейская беседа',
    },
  },
  {
    id: 's-2026-07-25-v',
    date: '2026-07-25',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（五旬祭後第8の主日）',
      en: 'All-Night Vigil (8th Sunday after Pentecost)',
      ru: 'Всенощное бдение (8-я Неделя по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-07-26',
    date: '2026-07-26',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第8主日）・偲成会総会・月例パニヒダ',
      en: 'Divine Liturgy (8th Sunday), Shinsei General Meeting & Panikhida',
      ru: 'Божественная Литургия (8-я Неделя), собрание Синьсэй и панихида',
    },
  },

  // ========================================================
  // --- August 2026 (8月) ---
  // ========================================================
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
      ja: '聖体礼儀（五旬祭後第9の主日）・執事会',
      en: 'Divine Liturgy (9th Sunday after Pentecost) & Board Meeting',
      ru: 'Божественная Литургия (Неделя 9-я по Пятидесятнице), совет',
    },
    dutyGroup: 'Rabboni',
    dutyPeople: ['Anastasia', 'Antonina'],
  },
  {
    id: 's-2026-08-08',
    date: '2026-08-08',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会',
      en: 'Parish Bible Study Class',
      ru: 'Библейская беседа',
    },
  },
  {
    id: 's-2026-08-08-v',
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
      ja: '聖体礼儀（五旬祭後第10の主日）・月例パニヒダ',
      en: 'Divine Liturgy (10th Sunday after Pentecost) & Monthly Panikhida',
      ru: 'Божественная Литургия (Неделя 10-я по Пятидесятнице), панихида',
    },
    dutyGroup: "Daria's Kitchen",
    dutyPeople: ['Alexandra S.', 'Anna', 'Natalia', 'Olya'],
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
      ja: '聖体礼儀（主の変容祭 兼行・果物成聖式）',
      en: 'Divine Liturgy (Transfiguration of the Lord & Blessing of Fruit)',
      ru: 'Божественная Литургия (Преображение Господне, освящение плодов)',
    },
    dutyGroup: 'Church Friends',
    isTransferred: true,
  },
  {
    id: 's-2026-08-19',
    date: '2026-08-19',
    time: '10:00',
    serviceType: 'special',
    title: {
      ja: '主の変容祭（旧暦当日）',
      en: 'Transfiguration of the Lord (Julian Calendar Feast)',
      ru: 'Преображение Господа Бога и Спаса нашего Иисуса Христа',
    },
  },
  {
    id: 's-2026-08-22',
    date: '2026-08-22',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会',
      en: 'Parish Bible Study Class',
      ru: 'Библейская беседа',
    },
  },
  {
    id: 's-2026-08-22-v',
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
      ja: '聖体礼儀（五旬祭後第12の主日・杉村神父司祷）',
      en: 'Divine Liturgy (12th Sunday after Pentecost - Fr. Sugimura)',
      ru: 'Божественная Литургия (12-я Неделя - о. Сугимура)',
    },
    dutyGroup: 'Choir',
  },
  {
    id: 's-2026-08-28',
    date: '2026-08-28',
    time: '10:00',
    serviceType: 'special',
    title: {
      ja: '生神女就寝祭（旧暦当日）',
      en: 'Dormition of the Theotokos (Julian Calendar Feast)',
      ru: 'Успение Пресвятой Владычицы нашей Богородицы',
    },
  },
  {
    id: 's-2026-08-29',
    date: '2026-08-29',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '光の子会（日曜学校体験＆パン作り）',
      en: 'Hikari no Ko-kai (Sunday School Gathering & Bread Baking)',
      ru: 'Хикари но Ко-кай (Занятие воскресной школы и выпечка)',
    },
  },
  {
    id: 's-2026-08-29-v',
    date: '2026-08-29',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（五旬祭後第13の主日）',
      en: 'All-Night Vigil (13th Sunday after Pentecost)',
      ru: 'Всенощное бдение (13-я Неделя по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-08-30',
    date: '2026-08-30',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（生神女就寝祭 兼行）',
      en: 'Divine Liturgy (Dormition of the Theotokos - Transferred)',
      ru: 'Божественная Литургия (Успение Богородицы - перенесено)',
    },
    dutyGroup: 'Rabboni',
    isTransferred: true,
  },

  // ========================================================
  // --- September 2026 (9月) ---
  // ========================================================
  {
    id: 's-2026-09-05',
    date: '2026-09-05',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（五旬祭後第14の主日）',
      en: 'All-Night Vigil (14th Sunday after Pentecost)',
      ru: 'Всенощное бдение (14-я Неделя по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-09-06',
    date: '2026-09-06',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第14の主日）・執事会',
      en: 'Divine Liturgy (14th Sunday after Pentecost) & Board Meeting',
      ru: 'Божественная Литургия (14-я Неделя по Пятидесятнице), совет',
    },
    dutyGroup: 'Rabboni',
  },
  {
    id: 's-2026-09-11',
    date: '2026-09-11',
    time: '10:00',
    serviceType: 'special',
    title: {
      ja: '前駆イオアン斬首祭・神学校始業式',
      en: 'Beheading of St. John the Baptist & Seminary Opening',
      ru: 'Усекновение главы Иоанна Предтечи, начало учебного года в семинарии',
    },
  },
  {
    id: 's-2026-09-12',
    date: '2026-09-12',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '教区司祭会議（Zoom）・定例伝道会',
      en: 'Diocesan Clergy Zoom Meeting & Bible Study',
      ru: 'Епархиальное совещание (Zoom) и библейская беседа',
    },
  },
  {
    id: 's-2026-09-12-v',
    date: '2026-09-12',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（五旬祭後第15の主日）',
      en: 'All-Night Vigil (15th Sunday after Pentecost)',
      ru: 'Всенощное бдение (15-я Неделя по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-09-13',
    date: '2026-09-13',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第15主日・志村神父）・月例パニヒダ',
      en: 'Divine Liturgy (15th Sunday - Fr. Shimura) & Monthly Panikhida',
      ru: 'Божественная Литургия (15-я Неделя - о. Симура), панихида',
    },
    dutyGroup: "Daria's Kitchen",
  },
  {
    id: 's-2026-09-19',
    date: '2026-09-19',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（五旬祭後第16の主日）',
      en: 'All-Night Vigil (16th Sunday after Pentecost)',
      ru: 'Всенощное бдение (16-я Неделя по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-09-20',
    date: '2026-09-20',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（生神女誕生祭兼行・敬老会）',
      en: 'Divine Liturgy (Nativity of Theotokos transferred / Respect for the Aged)',
      ru: 'Божественная Литургия (Рождество Богородицы / День старших прихожан)',
    },
    dutyGroup: 'Church Friends',
    isTransferred: true,
  },
  {
    id: 's-2026-09-21',
    date: '2026-09-21',
    time: '10:00',
    serviceType: 'special',
    title: {
      ja: '生神女誕生祭（旧暦当日・敬老の日）',
      en: 'Nativity of the Most Holy Theotokos (Julian Calendar Feast)',
      ru: 'Рождество Пресвятой Владычицы нашей Богородицы',
    },
  },
  {
    id: 's-2026-09-26',
    date: '2026-09-26',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会',
      en: 'Parish Bible Study Class',
      ru: 'Библейская беседа',
    },
  },
  {
    id: 's-2026-09-26-v',
    date: '2026-09-26',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（十字架挙栄祭前晩）',
      en: 'All-Night Vigil (Exaltation of the Holy Cross)',
      ru: 'Всенощное бдение (Воздвижение Честного Креста)',
    },
  },
  {
    id: 's-2026-09-27',
    date: '2026-09-27',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '十字架挙栄祭 聖体礼儀（五旬祭後第17主日・厳斎）',
      en: 'Exaltation of the Holy Cross Divine Liturgy (Strict Fast)',
      ru: 'Воздвижение Креста Господня: Божественная Литургия (Строгий пост)',
    },
    dutyGroup: 'Choir',
  },

  // ========================================================
  // --- October 2026 (10月) ---
  // ========================================================
  {
    id: 's-2026-10-03',
    date: '2026-10-03',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課7福音）',
      en: 'All-Night Vigil (Matins Gospel 7)',
      ru: 'Всенощное бдение (Утреня: Евангелие 7)',
    },
  },
  {
    id: 's-2026-10-04',
    date: '2026-10-04',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第18主日）・執事会',
      en: 'Divine Liturgy (18th Sunday after Pentecost) & Board Meeting',
      ru: 'Божественная Литургия (18-я Неделя по Пятидесятнице), совет',
    },
  },
  {
    id: 's-2026-10-08',
    date: '2026-10-08',
    time: '10:00',
    serviceType: 'special',
    title: {
      ja: 'ラドネジの奇跡者聖セルギイ祭',
      en: 'Feast of St. Sergius of Radonezh',
      ru: 'Преставление преподобного Сергия, игумена Радонежского',
    },
  },
  {
    id: 's-2026-10-10-bible',
    date: '2026-10-10',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible Class (Zoom)',
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
      en: 'Vespers (Eve of Temple Feast)',
      ru: 'Вечерня (Навечерие Престольного праздника)',
    },
  },
  {
    id: 's-2026-10-11',
    date: '2026-10-11',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '主日祭日聖体礼儀（生神女庇護祭兼行・杉村神父共同司式）・月例パニヒダ・堂祭祝賀BBQ',
      en: 'Divine Liturgy (Temple Feast of Pokrov - Fr. Sugimura), Panikhida & Parish BBQ',
      ru: 'Праздничная Божественная Литургия (Покров Богородицы, о. Сугимура), панихида, барбекю',
    },
    dutyGroup: 'All Parishioners',
    isTransferred: true,
  },
  {
    id: 's-2026-10-14',
    date: '2026-10-14',
    time: '10:00',
    serviceType: 'special',
    title: {
      ja: '生神女庇護祭（旧暦当日）',
      en: 'Holy Protection of the Theotokos (Julian Calendar Feast)',
      ru: 'Покров Пресвятой Владычицы нашей Богородицы',
    },
  },
  {
    id: 's-2026-10-17',
    date: '2026-10-17',
    time: '13:30',
    serviceType: 'special',
    title: {
      ja: '弘済院訪問',
      en: 'Pastoral Visit to Kosain Senior Care Center',
      ru: 'Пастырское посещение пансионата Косаин',
    },
  },
  {
    id: 's-2026-10-17-v',
    date: '2026-10-17',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課9福音）',
      en: 'All-Night Vigil (Matins Gospel 9)',
      ru: 'Всенощное бдение (Утреня: Евангелие 9)',
    },
  },
  {
    id: 's-2026-10-18',
    date: '2026-10-18',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第20主日）',
      en: 'Divine Liturgy (20th Sunday after Pentecost)',
      ru: 'Божественная Литургия (20-я Неделя по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-10-24-bible',
    date: '2026-10-24',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible Class (Zoom)',
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
      en: 'All-Night Vigil (Matins Gospel 10)',
      ru: 'Всенощное бдение (Утреня: Евангелие 10)',
    },
  },
  {
    id: 's-2026-10-25',
    date: '2026-10-25',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第21主日）・聖歌隊総会',
      en: 'Divine Liturgy (21st Sunday after Pentecost) & Choir General Meeting',
      ru: 'Божественная Литургия (21-я Неделя) и собрание хора',
    },
  },
  {
    id: 's-2026-10-31',
    date: '2026-10-31',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課11福音）',
      en: 'All-Night Vigil (Matins Gospel 11)',
      ru: 'Всенощное бдение (Утреня: Евангелие 11)',
    },
  },

  // ========================================================
  // --- November 2026 (11月 2026/10/27改訂) ---
  // ========================================================
  {
    id: 's-2026-11-01',
    date: '2026-11-01',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第22主日）・執事会',
      en: 'Divine Liturgy (22nd Sunday after Pentecost) & Board Meeting',
      ru: 'Божественная Литургия (22-я Неделя по Пятидесятнице), совет',
    },
    notes: {
      ja: '京都ハリストス正教会教区センターにて詩人 山崎佳代子さんセルビア詩講演会（13:30〜）開催。',
      en: 'Serbian Poetry Lecture by Kayoko Yamazaki at Kyoto Diocesan Center (13:30).',
      ru: 'Лекция о сербской поэзии поэта Каёко Ямадзаки в епархиальном центре Киото (13:30).',
    },
  },
  {
    id: 's-2026-11-07-bible',
    date: '2026-11-07',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible Class (Zoom)',
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
      en: 'All-Night Vigil (Matins Gospel 1)',
      ru: 'Всенощное бдение (Утреня: Евангелие 1)',
    },
  },
  {
    id: 's-2026-11-08-liturgy',
    date: '2026-11-08',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '主日聖体礼儀（五旬祭後第23主日）・月例パニヒダ',
      en: 'Divine Liturgy (23rd Sunday after Pentecost) & Monthly Panikhida',
      ru: 'Божественная Литургия (23-я Неделя по Пятидесятнице), панихида',
    },
  },
  {
    id: 's-2026-11-08-cemetery',
    date: '2026-11-08',
    time: '16:00',
    serviceType: 'special',
    title: {
      ja: '露軍兵士墓地パニヒダ（泉大津）',
      en: 'Memorial Service at Russian Soldiers\' Cemetery (Izumiotsu)',
      ru: 'Панихида на кладбище российских солдат в Идзумиоцу',
    },
    notes: {
      ja: '泉大津市のロシア兵墓地にて永眠者のためのパニヒダ（追悼祈祷）を捧げます。',
      en: 'Memorial service (Panikhida) at the Russian Soldiers\' Cemetery in Izumiotsu.',
      ru: 'Панихида по усопшим воинам на кладбище в Идзумиоцу.',
    },
  },
  {
    id: 's-2026-11-10',
    date: '2026-11-10',
    time: '13:30',
    serviceType: 'special',
    title: {
      ja: '豊中ワークセンター集結・事務局部局会議',
      en: 'Toyonaka Work Center Gathering & Chancery Meeting',
      ru: 'Встреча в трудовом центре Тоёнака и совещание',
    },
  },
  {
    id: 's-2026-11-14',
    date: '2026-11-14',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課2福音）',
      en: 'All-Night Vigil (Matins Gospel 2)',
      ru: 'Всенощное бдение (Утреня: Евангелие 2)',
    },
  },
  {
    id: 's-2026-11-15',
    date: '2026-11-15',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '主日聖体礼儀（五旬祭後第24主日）',
      en: 'Divine Liturgy (24th Sunday after Pentecost)',
      ru: 'Божественная Литургия (24-я Неделя по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-11-21-feast',
    date: '2026-11-21',
    time: '10:00',
    serviceType: 'special',
    title: {
      ja: '天軍主ミハイル祭（聖天使首ミハイルおよび諸天軍の集会）',
      en: 'Synaxis of the Archangel Michael & All Bodiless Hosts',
      ru: 'Собор Архистратига Михаила и прочих Небесных Сил бесплотных',
    },
  },
  {
    id: 's-2026-11-21-bible',
    date: '2026-11-21',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible Class (Zoom)',
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
      en: 'All-Night Vigil (Matins Gospel 3)',
      ru: 'Всенощное бдение (Утреня: Евангелие 3)',
    },
  },
  {
    id: 's-2026-11-22',
    date: '2026-11-22',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '主日聖体礼儀（五旬祭後第25主日）',
      en: 'Divine Liturgy (25th Sunday after Pentecost)',
      ru: 'Божественная Литургия (25-я Неделя по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-11-23',
    date: '2026-11-23',
    time: '09:30',
    serviceType: 'special',
    title: {
      ja: '広島集会 聖体礼儀（副司祭 杉村神父）',
      en: 'Liturgy in Hiroshima (Associate Priest Fr. Sugimura)',
      ru: 'Божественная Литургия общины в Хиросиме (о. Сугимура)',
    },
    notes: {
      ja: '勤労感謝の日。広島集会への出張聖体礼儀です。',
      en: 'Labor Thanksgiving Day. Divine Liturgy for the Hiroshima Orthodox Community.',
      ru: 'Выездная Божественная Литургия общины в Хиросиме.',
    },
  },
  {
    id: 's-2026-11-27',
    date: '2026-11-27',
    time: '10:00',
    serviceType: 'special',
    title: {
      ja: '聖使徒フィリップ祭',
      en: 'Feast of the Holy Apostle Philip',
      ru: 'Память святого апостола Филиппа',
    },
  },
  {
    id: 's-2026-11-28-vigil',
    date: '2026-11-28',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課4福音・フィリップの斎開始）',
      en: 'All-Night Vigil (Matins Gospel 4 / Nativity Fast begins)',
      ru: 'Всенощное бдение (Утреня: Евангелие 4 / Начало Рождественского поста)',
    },
    notes: {
      ja: 'フィリップ（降誕祭）の斎 開始。降誕祭（クリスマス）に向けて40日間の節制に入ります。',
      en: 'Nativity Fast (Philip\'s Fast) begins today.',
      ru: 'Начинается Рождественский (Филиппов) пост.',
    },
  },
  {
    id: 's-2026-11-29',
    date: '2026-11-29',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第26主日・副司祭 杉村神父）・執事会',
      en: 'Divine Liturgy (26th Sunday - Fr. Sugimura) & Board Meeting',
      ru: 'Божественная Литургия (26-я Неделя - о. Сугимура), заседание совета',
    },
    notes: {
      ja: '副司祭司祷。礼儀後に12月分の執事会を開催します。',
      en: 'Liturgy celebrated by Associate Priest. Parish Board meeting for December follows.',
      ru: 'Служит клирик собора. Заседание приходского совета за декабрь.',
    },
  },

  // ========================================================
  // --- December 2026 (12月 2026/10/27改訂) ---
  // ========================================================
  {
    id: 's-2026-12-02',
    date: '2026-12-02',
    time: '14:00',
    serviceType: 'special',
    title: {
      ja: 'LPで聴く名曲喫茶コンサート、チャイコフスキー「くるみ割り人形」',
      en: 'LP Record Concert: Tchaikovsky "The Nutcracker"',
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
    serviceType: 'vespers',
    title: {
      ja: '生神女進堂祭 前晩祷',
      en: 'Entry of the Theotokos: Festive Vespers',
      ru: 'Введение во храм Пресвятой Богородицы: Праздничная вечерня',
    },
  },
  {
    id: 's-2026-12-04',
    date: '2026-12-04',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '生神女進堂祭 聖体礼儀',
      en: 'Entry of the Most Holy Theotokos: Divine Liturgy',
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
      en: 'All-Night Vigil (Matins Gospel 5)',
      ru: 'Всенощное бдение (Утреня: Евангелие 5)',
    },
  },
  {
    id: 's-2026-12-06',
    date: '2026-12-06',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '主日聖体礼儀（五旬祭後第27主日）',
      en: 'Divine Liturgy (27th Sunday after Pentecost)',
      ru: 'Божественная Литургия (27-я Неделя по Пятидесятнице)',
    },
  },
  {
    id: 's-2026-12-12-bible',
    date: '2026-12-12',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible Class (Zoom)',
      ru: 'Библейская беседа (Zoom)',
    },
  },
  {
    id: 's-2026-12-12-vigil',
    date: '2026-12-12',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課6福音）',
      en: 'All-Night Vigil (Matins Gospel 6)',
      ru: 'Всенощное бдение (Утреня: Евангелие 6)',
    },
  },
  {
    id: 's-2026-12-13',
    date: '2026-12-13',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第28主日）・月例パニヒダ',
      en: 'Divine Liturgy (28th Sunday after Pentecost) & Monthly Panikhida',
      ru: 'Божественная Литургия (28-я Неделя по Пятидесятнице), панихида',
    },
  },
  {
    id: 's-2026-12-19-nicholas',
    date: '2026-12-19',
    time: '10:00',
    serviceType: 'special',
    title: {
      ja: '奇跡者聖ニコライ祭 記念祈祷',
      en: 'St. Nicholas the Wonderworker Commemoration',
      ru: 'Память святителя Николая Чудотворца',
    },
  },
  {
    id: 's-2026-12-19-vigil',
    date: '2026-12-19',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '新暦主の降誕祭 前晩徹夜祷',
      en: 'Nativity of Christ All-Night Vigil (New Calendar)',
      ru: 'Всенощное бдение Рождества Христова (новоюлианский)',
    },
  },
  {
    id: 's-2026-12-20',
    date: '2026-12-20',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '新暦主の降誕祭 聖体礼儀（副司祭共同司式）',
      en: 'Nativity of our Lord Divine Liturgy (Concelebrated with Associate Priest)',
      ru: 'Рождество Христово: Божественная Литургия (сослужение с о. Сугимурой)',
    },
    notes: {
      ja: '大阪ハリストス正教会にて日曜日に祝われる新暦の主の降誕大祭です。ハリストス生まる！',
      en: 'Nativity of Christ celebrated on Sunday according to civil December. Christ is born!',
      ru: 'Празднование Рождества Христова в нашем храме в воскресный день. Христос рождается!',
    },
  },
  {
    id: 's-2026-12-26',
    date: '2026-12-26',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課7福音）',
      en: 'All-Night Vigil (Matins Gospel 7)',
      ru: 'Всенощное бдение (Утреня: Евангелие 7)',
    },
  },
  {
    id: 's-2026-12-27',
    date: '2026-12-27',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第30主日・聖使徒初致命者ステファン祭・洗礼式）',
      en: 'Divine Liturgy (30th Sunday / Protomartyr Stephen / Holy Baptism)',
      ru: 'Божественная Литургия (Неделя 30-я / Первомученика Стефана / Крещение)',
    },
  },

  // ========================================================
  // --- January 2027 (1月 2026/10/27改訂) ---
  // ========================================================
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
    id: 's-2027-01-02',
    date: '2027-01-02',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課8福音）',
      en: 'All-Night Vigil (Matins Gospel 8)',
      ru: 'Всенощное бдение (Утреня: Евангелие 8)',
    },
  },
  {
    id: 's-2027-01-03',
    date: '2027-01-03',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第31主日）',
      en: 'Divine Liturgy (31st Sunday after Pentecost)',
      ru: 'Божественная Литургия (31-я Неделя по Пятидесятнице)',
    },
    notes: {
      ja: '※本日より土曜日の大聖堂見学時間が15:00〜16:00に変更となります。',
      en: 'Notice: Cathedral visiting hours are updated to 15:00–16:00 on Saturdays.',
      ru: 'Время посещения собора по субботам изменено на 15:00–16:00.',
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
      ja: '旧暦主の降誕祭 聖体礼儀（主の降誕大祭）',
      en: 'Nativity of our Lord Divine Liturgy (Julian Calendar)',
      ru: 'Рождество Господа Бога и Спаса нашего Иисуса Христа: Литургия',
    },
    notes: {
      ja: '伝統のユリウス暦による降誕大祭です。ハリストス生まる！',
      en: 'Traditional Julian Calendar Nativity Feast. Christ is born! Glorify Him!',
      ru: 'Традиционное празднование Рождества по юлианскому календарю. Христос рождается, славите!',
    },
  },
  {
    id: 's-2027-01-09-bible',
    date: '2027-01-09',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible Class (Zoom)',
      ru: 'Библейская беседа (Zoom)',
    },
  },
  {
    id: 's-2027-01-09-vigil',
    date: '2027-01-09',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課9福音）',
      en: 'All-Night Vigil (Matins Gospel 9)',
      ru: 'Всенощное бдение (Утреня: Евангелие 9)',
    },
  },
  {
    id: 's-2027-01-10',
    date: '2027-01-10',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第32主日）・月例パニヒダ・執事会（副司祭共同司式）',
      en: 'Divine Liturgy (32nd Sunday), Monthly Panikhida, Board Meeting (Fr. Sugimura)',
      ru: 'Божественная Литургия (32-я Неделя), панихида, совет (сослужение с о. Сугимурой)',
    },
  },
  {
    id: 's-2027-01-11',
    date: '2027-01-11',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '西日本主教教区 理事会',
      en: 'Western Diocese Council Meeting',
      ru: 'Заседание епархиального совета',
    },
  },
  {
    id: 's-2027-01-14',
    date: '2027-01-14',
    time: '10:00',
    serviceType: 'special',
    title: {
      ja: '主の割礼祭・聖大ワシリイ祭（聖ワシリイ聖体礼儀）',
      en: 'Circumcision of Christ & Feast of St. Basil the Great (Liturgy of St. Basil)',
      ru: 'Обрезание Господне и память св. Василия Великого (Литургия Василия Великого)',
    },
  },
  {
    id: 's-2027-01-15',
    date: '2027-01-15',
    time: '10:00',
    serviceType: 'special',
    title: {
      ja: 'サロフの奇跡者聖セラフィム祭',
      en: 'Feast of St. Seraphim of Sarov the Wonderworker',
      ru: 'Память преподобного Серафима, Саровского чудотворца',
    },
  },
  {
    id: 's-2027-01-16',
    date: '2027-01-16',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '主の神現祭 前晩徹夜祷',
      en: 'Theophany of the Lord: All-Night Vigil',
      ru: 'Навечерие Богоявления: Всенощное бдение',
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
  {
    id: 's-2027-01-19',
    date: '2027-01-19',
    time: '10:00',
    serviceType: 'special',
    title: {
      ja: '主の神現祭（旧暦当日）',
      en: 'Theophany of the Lord (Julian Calendar Feast)',
      ru: 'Святое Богоявление. Крещение Господа Бога и Спаса нашего Иисуса Христа',
    },
  },
  {
    id: 's-2027-01-23-bible',
    date: '2027-01-23',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible Class (Zoom)',
      ru: 'Библейская беседа (Zoom)',
    },
  },
  {
    id: 's-2027-01-23-vigil',
    date: '2027-01-23',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課10福音）',
      en: 'All-Night Vigil (Matins Gospel 10)',
      ru: 'Всенощное бдение (Утреня: Евангелие 10)',
    },
  },
  {
    id: 's-2027-01-24',
    date: '2027-01-24',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第34主日）',
      en: 'Divine Liturgy (34th Sunday after Pentecost)',
      ru: 'Божественная Литургия (34-я Неделя по Пятидесятнице)',
    },
  },
  {
    id: 's-2027-01-30',
    date: '2027-01-30',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課11福音）',
      en: 'All-Night Vigil (Matins Gospel 11)',
      ru: 'Всенощное бдение (Утреня: Евангелие 11)',
    },
  },
  {
    id: 's-2027-01-31',
    date: '2027-01-31',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第35主日）',
      en: 'Divine Liturgy (35th Sunday after Pentecost)',
      ru: 'Божественная Литургия (35-я Неделя по Пятидесятнице)',
    },
  },

  // ========================================================
  // --- February 2027 (2月 2026/10/27改訂) ---
  // ========================================================
  {
    id: 's-2027-02-06',
    date: '2027-02-06',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課1福音）',
      en: 'All-Night Vigil (Matins Gospel 1)',
      ru: 'Всенощное бдение (Утреня: Евангелие 1)',
    },
  },
  {
    id: 's-2027-02-07',
    date: '2027-02-07',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖体礼儀（五旬祭後第36主日・副司祭 杉村神父）・執事会',
      en: 'Divine Liturgy (36th Sunday - Fr. Sugimura) & Board Meeting',
      ru: 'Божественная Литургия (36-я Неделя - о. Сугимура), совет',
    },
  },
  {
    id: 's-2027-02-13-bible',
    date: '2027-02-13',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible Class (Zoom)',
      ru: 'Библейская беседа (Zoom)',
    },
  },
  {
    id: 's-2027-02-13-vigil',
    date: '2027-02-13',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課2福音・主の迎接祭前晩）',
      en: 'All-Night Vigil (Matins Gospel 2 / Eve of Meeting of the Lord)',
      ru: 'Всенощное бдение (Утреня: Евангелие 2 / Навечерие Сретения)',
    },
  },
  {
    id: 's-2027-02-14',
    date: '2027-02-14',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: 'ザクヘイ主日 聖体礼儀（主の迎接祭兼行）・月例パニヒダ',
      en: 'Sunday of Zacchaeus Liturgy (Meeting of the Lord transferred) & Monthly Panikhida',
      ru: 'Неделя о Закхее: Литургия (со Сретением Господним) и панихида',
    },
    isTransferred: true,
  },
  {
    id: 's-2027-02-15',
    date: '2027-02-15',
    time: '10:00',
    serviceType: 'special',
    title: {
      ja: '主の迎接祭（旧暦当日）',
      en: 'Meeting of the Lord (Julian Calendar Feast)',
      ru: 'Сретение Господа Бога и Спаса нашего Иисуса Христа',
    },
  },
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
  {
    id: 's-2027-02-20-bible',
    date: '2027-02-20',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible Class (Zoom)',
      ru: 'Библейская беседа (Zoom)',
    },
  },
  {
    id: 's-2027-02-20-vigil',
    date: '2027-02-20',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課3福音）',
      en: 'All-Night Vigil (Matins Gospel 3)',
      ru: 'Всенощное бдение (Утреня: Евангелие 3)',
    },
  },
  {
    id: 's-2027-02-21',
    date: '2027-02-21',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '税吏とファリセイ主日 聖体礼儀（大斎準備週第1週）',
      en: 'Sunday of the Publican and the Pharisee Liturgy',
      ru: 'Неделя о мытаре и фарисее: Божественная Литургия',
    },
  },
  {
    id: 's-2027-02-23',
    date: '2027-02-23',
    time: '13:30',
    serviceType: 'special',
    title: {
      ja: '天皇誕生日 冬季セミナー（土田コンサート・大阪教会）',
      en: 'Emperor\'s Birthday Winter Seminar: Tsuchida Concert at Osaka Church',
      ru: 'Зимний семинар и фортепианный концерт Цутиды в храме Осаки',
    },
  },
  {
    id: 's-2027-02-27-bible',
    date: '2027-02-27',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible Class (Zoom)',
      ru: 'Библейская беседа (Zoom)',
    },
  },
  {
    id: 's-2027-02-27-vigil',
    date: '2027-02-27',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課4福音）',
      en: 'All-Night Vigil (Matins Gospel 4)',
      ru: 'Всенощное бдение (Утреня: Евангелие 4)',
    },
  },
  {
    id: 's-2027-02-28',
    date: '2027-02-28',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '放蕩主日 聖体礼儀（大斎準備週第2週）',
      en: 'Sunday of the Prodigal Son Liturgy',
      ru: 'Неделя о блудном сыне: Божественная Литургия',
    },
  },

  // ========================================================
  // --- March 2027 (3月 2026/10/27改訂) ---
  // ========================================================
  {
    id: 's-2027-03-06',
    date: '2027-03-06',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課5福音）',
      en: 'All-Night Vigil (Matins Gospel 5)',
      ru: 'Всенощное бдение (Утреня: Евангелие 5)',
    },
  },
  {
    id: 's-2027-03-07',
    date: '2027-03-07',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '肉断主日 聖体礼儀（副司祭 杉村神父）・執事会',
      en: 'Meatfare Sunday Liturgy (Fr. Sugimura) & Board Meeting',
      ru: 'Неделя мясопустная (о. Сугимура), заседание совета',
    },
    notes: {
      ja: '大斎準備期間第3週。肉類の食べ納めの主日です。',
      en: 'Meatfare Sunday: Last day for meat before Great Lent.',
      ru: 'Мясопустная неделя: последний день употребления мяса перед Великим Постом.',
    },
  },
  {
    id: 's-2027-03-13-bible',
    date: '2027-03-13',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible Class (Zoom)',
      ru: 'Библейская беседа (Zoom)',
    },
  },
  {
    id: 's-2027-03-13-vigil',
    date: '2027-03-13',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課6福音）',
      en: 'All-Night Vigil (Matins Gospel 6)',
      ru: 'Всенощное бдение (Утреня: Евангелие 6)',
    },
  },
  {
    id: 's-2027-03-14',
    date: '2027-03-14',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '乾酪主日 聖体礼儀・赦罪晩課・月例パニヒダ',
      en: 'Cheesefare Sunday Liturgy, Forgiveness Vespers & Monthly Panikhida',
      ru: 'Прощёное воскресенье: Литургия, Чин прощения, панихида',
    },
    notes: {
      ja: '大斎に入るにあたり、互いに許しを乞い和解の礼拝を行います。',
      en: 'Entering Great Lent: Rite of Mutual Forgiveness after Vespers.',
      ru: 'Вход в Великий Пост: чин взаимного испрашивания прощения.',
    },
  },
  {
    id: 's-2027-03-15',
    date: '2027-03-15',
    time: '09:00',
    serviceType: 'special',
    title: {
      ja: '大斎初週月曜 早課〜晩課（18:00 晩堂大課・聖カノン）',
      en: 'Clean Monday: Matins ~ Vespers (18:00 Great Compline & Canon)',
      ru: 'Чистый понедельник: Утреня ~ вечерня (18:00 Повечерие с каноном)',
    },
  },
  {
    id: 's-2027-03-16',
    date: '2027-03-16',
    time: '09:00',
    serviceType: 'special',
    title: {
      ja: '大斎初週火曜 早課〜晩課（18:00 晩堂大課・聖カノン）',
      en: 'Clean Tuesday: Matins ~ Vespers (18:00 Great Compline & Canon)',
      ru: 'Вторник 1-й седмицы: Утреня ~ вечерня (18:00 Повечерие с каноном)',
    },
  },
  {
    id: 's-2027-03-17',
    date: '2027-03-17',
    time: '09:00',
    serviceType: 'special',
    title: {
      ja: '大斎初週水曜 早課〜先盛聖体礼儀（18:00 晩堂大課・聖カノン）',
      en: 'Clean Wednesday: Matins ~ Presanctified Liturgy (18:00 Compline)',
      ru: 'Среда 1-й седмицы: Литургия Преждеосвященных Даров (18:00 Повечерие)',
    },
  },
  {
    id: 's-2027-03-18',
    date: '2027-03-18',
    time: '09:00',
    serviceType: 'special',
    title: {
      ja: '大斎初週木曜 早課〜晩課（18:00 晩堂大課・聖カノン）',
      en: 'Clean Thursday: Matins ~ Vespers (18:00 Great Compline & Canon)',
      ru: 'Четверг 1-й седмицы: Утреня ~ вечерня (18:00 Повечерие с каноном)',
    },
  },
  {
    id: 's-2027-03-19',
    date: '2027-03-19',
    time: '09:00',
    serviceType: 'special',
    title: {
      ja: '大斎初週金曜 早課〜先盛聖体礼儀',
      en: 'Clean Friday: Matins ~ Presanctified Liturgy',
      ru: 'Пятница 1-й седмицы: Литургия Преждеосвященных Даров',
    },
  },
  {
    id: 's-2027-03-20-bible',
    date: '2027-03-20',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible Class (Zoom)',
      ru: 'Библейская беседа (Zoom)',
    },
  },
  {
    id: 's-2027-03-20-vigil',
    date: '2027-03-20',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課7福音）',
      en: 'All-Night Vigil (Matins Gospel 7)',
      ru: 'Всенощное бдение (Утреня: Евангелие 7)',
    },
  },
  {
    id: 's-2027-03-21',
    date: '2027-03-21',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '正教勝利主日 聖体礼儀（大斎第1主日）',
      en: 'Sunday of Orthodoxy Divine Liturgy (1st Sunday of Great Lent)',
      ru: 'Торжество Православия: Литургия (1-я Неделя Великого Поста)',
    },
    notes: {
      ja: 'イコン崇敬の正統信仰の勝利を祝う主日です。',
      en: 'Triumph of Orthodoxy over iconoclasm.',
      ru: 'Празднование победы Церкви над иконоборчеством.',
    },
  },
  {
    id: 's-2027-03-23',
    date: '2027-03-23',
    time: '18:00',
    serviceType: 'special',
    title: {
      ja: '晩堂大課',
      en: 'Great Compline',
      ru: 'Великое повечерие',
    },
  },
  {
    id: 's-2027-03-24',
    date: '2027-03-24',
    time: '09:30',
    serviceType: 'special',
    title: {
      ja: '早課〜先盛聖体礼儀',
      en: 'Matins & Liturgy of the Presanctified Gifts',
      ru: 'Утреня и Литургия Преждеосвященных Даров',
    },
  },
  {
    id: 's-2027-03-27-bible',
    date: '2027-03-27',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible Class (Zoom)',
      ru: 'Библейская беседа (Zoom)',
    },
  },
  {
    id: 's-2027-03-27-vigil',
    date: '2027-03-27',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課8福音）',
      en: 'All-Night Vigil (Matins Gospel 8)',
      ru: 'Всенощное бдение (Утреня: Евангелие 8)',
    },
  },
  {
    id: 's-2027-03-28',
    date: '2027-03-28',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: 'グレゴリイ・パラマ主日 聖体礼儀（大斎第2主日）',
      en: 'Sunday of St. Gregory Palamas Liturgy (2nd Sunday of Great Lent)',
      ru: 'Святителя Григория Паламы: Литургия (2-я Неделя Великого Поста)',
    },
  },
  {
    id: 's-2027-03-30',
    date: '2027-03-30',
    time: '18:00',
    serviceType: 'special',
    title: {
      ja: '晩堂大課',
      en: 'Great Compline',
      ru: 'Великое повечерие',
    },
  },
  {
    id: 's-2027-03-31',
    date: '2027-03-31',
    time: '09:30',
    serviceType: 'special',
    title: {
      ja: '早課〜先盛聖体礼儀',
      en: 'Matins & Liturgy of the Presanctified Gifts',
      ru: 'Утреня и Литургия Преждеосвященных Даров',
    },
  },

  // ========================================================
  // --- April 2027 (4月 2026/10/27改訂) ---
  // ========================================================
  {
    id: 's-2027-04-03',
    date: '2027-04-03',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課9福音・十字架仰拝前晩）',
      en: 'All-Night Vigil (Matins Gospel 9 / Eve of Cross Veneration)',
      ru: 'Всенощное бдение с выносом Честного Креста (Утреня: Евангелие 9)',
    },
  },
  {
    id: 's-2027-04-04',
    date: '2027-04-04',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '十字架仰拝主日 聖体礼儀（大斎第3主日・副司祭 杉村神父）・執事会',
      en: 'Sunday of the Holy Cross Liturgy (Fr. Sugimura) & Board Meeting',
      ru: 'Крестопоклонная Неделя: Литургия (о. Сугимура), заседание совета',
    },
  },
  {
    id: 's-2027-04-06',
    date: '2027-04-06',
    time: '18:00',
    serviceType: 'special',
    title: {
      ja: '晩堂大課',
      en: 'Great Compline',
      ru: 'Великое повечерие',
    },
  },
  {
    id: 's-2027-04-07',
    date: '2027-04-07',
    time: '09:30',
    serviceType: 'liturgy',
    title: {
      ja: '生神女福音祭 早課〜聖体礼儀（受胎告知大祭）',
      en: 'Annunciation of the Theotokos: Matins & Divine Liturgy',
      ru: 'Благовещение Пресвятой Богородицы: Утреня и Божественная Литургия',
    },
    notes: {
      ja: '受胎告知の祝祭日です（大斎中の魚の許し）。',
      en: 'Feast of the Holy Annunciation (fish permitted during Great Lent).',
      ru: 'Благовещение Пресвятой Богородицы (разрешение на рыбу).',
    },
  },
  {
    id: 's-2027-04-10',
    date: '2027-04-10',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible Class (Zoom)',
      ru: 'Библейская беседа (Zoom)',
    },
  },
  {
    id: 's-2027-04-11',
    date: '2027-04-11',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '階梯者イオアン主日 聖体礼儀（大斎第4主日）・月例パニヒダ',
      en: 'Sunday of St. John Climacus Liturgy (4th Sunday of Great Lent) & Monthly Panikhida',
      ru: 'Преподобного Иоанна Лествичника: Литургия (4-я Неделя Великого Поста), панихида',
    },
  },
  {
    id: 's-2027-04-13',
    date: '2027-04-13',
    time: '18:00',
    serviceType: 'special',
    title: {
      ja: '晩堂大課',
      en: 'Great Compline',
      ru: 'Великое повечерие',
    },
  },
  {
    id: 's-2027-04-14',
    date: '2027-04-14',
    time: '09:30',
    serviceType: 'special',
    title: {
      ja: '早課〜先盛聖体礼儀',
      en: 'Matins & Liturgy of the Presanctified Gifts',
      ru: 'Утреня и Литургия Преждеосвященных Даров',
    },
  },
  {
    id: 's-2027-04-17',
    date: '2027-04-17',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課10福音）',
      en: 'All-Night Vigil (Matins Gospel 10)',
      ru: 'Всенощное бдение (Утреня: Евангелие 10)',
    },
  },
  {
    id: 's-2027-04-18',
    date: '2027-04-18',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: 'エジプトのマリア主日 聖体礼儀（大斎第5主日）',
      en: 'Sunday of St. Mary of Egypt Liturgy (5th Sunday of Great Lent)',
      ru: 'Преподобной Марии Египетской: Литургия (5-я Неделя Великого Поста)',
    },
  },
  {
    id: 's-2027-04-20',
    date: '2027-04-20',
    time: '18:00',
    serviceType: 'special',
    title: {
      ja: '晩堂大課',
      en: 'Great Compline',
      ru: 'Великое повечерие',
    },
  },
  {
    id: 's-2027-04-21',
    date: '2027-04-21',
    time: '09:30',
    serviceType: 'special',
    title: {
      ja: '早課〜先盛聖体礼儀',
      en: 'Matins & Liturgy of the Presanctified Gifts',
      ru: 'Утреня и Литургия Преждеосвященных Даров',
    },
  },
  {
    id: 's-2027-04-24-bible',
    date: '2027-04-24',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible Class (Zoom)',
      ru: 'Библейская беседа (Zoom)',
    },
  },
  {
    id: 's-2027-04-24-vigil',
    date: '2027-04-24',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（主のエルサレム入城前晩）',
      en: 'All-Night Vigil (Entry of the Lord into Jerusalem)',
      ru: 'Всенощное бдение праздника Входа Господня в Иерусалим',
    },
  },
  {
    id: 's-2027-04-25',
    date: '2027-04-25',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖枝主日 聖体礼儀（受難週開始）',
      en: 'Palm Sunday: Entry into Jerusalem & Passion Week Begins',
      ru: 'Вход Господень в Иерусалим (Вербное Воскресенье): Начало Страстной Седмицы',
    },
    notes: {
      ja: '棕櫚・柳の枝の成聖式。明日より聖受難週間に入ります。',
      en: 'Blessing of Palms & Pussy Willows. Holy Passion Week begins.',
      ru: 'Освящение ваий и верб. Вход в спасительную Страстную Седмицу.',
    },
  },
  {
    id: 's-2027-04-29',
    date: '2027-04-29',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '聖大木曜日 聖大ワシリイ聖体礼儀・12福音早課',
      en: 'Holy Thursday: Liturgy of St. Basil & 12 Passion Gospels Matins',
      ru: 'Великий Четверток: Литургия Василия Великого и Утреня 12-ти Евангелий',
    },
    notes: {
      ja: '昭和の日。主の晩餐（機密の制定）を記念する礼拝と十字架受難の12福音拝読です。',
      en: 'Commemoration of the Mystical Supper and reading of the 12 Passion Gospels.',
      ru: 'Воспоминание Тайной Вечери и чтение 12-ти Страстных Евангелий.',
    },
  },
  {
    id: 's-2027-04-30',
    date: '2027-04-30',
    time: '14:00',
    serviceType: 'vespers',
    title: {
      ja: '聖大金曜日 晩課（聖骸布着座）・十字行早課（聖骸布埋葬式）',
      en: 'Holy Friday: Vespers (Taking down the Epitaphios) & Lamentations Matins',
      ru: 'Великий Пяток: Вечерня с выносом Плащаницы и Чин погребения Плащаницы',
    },
    notes: {
      ja: 'ハリストスの十字架の死と埋葬を追悼する厳粛な礼拝です。',
      en: 'Solemn remembrance of the Crucifixion and Burial of Christ.',
      ru: 'Воспоминание Святых спасительных Страстей и погребения Господа нашего Иисуса Христа.',
    },
  },

  // ========================================================
  // --- May 2027 (5月 2026/10/27改訂) ---
  // ========================================================
  {
    id: 's-2027-05-01',
    date: '2027-05-01',
    time: '23:30',
    serviceType: 'special',
    title: {
      ja: '聖大土曜日 主の復活大祭 夜半課',
      en: 'Holy Saturday: Paschal Midnight Office (Nocturns)',
      ru: 'Великая Суббота: Пасхальная Полунощница',
    },
  },
  {
    id: 's-2027-05-02',
    date: '2027-05-02',
    time: '00:00',
    serviceType: 'liturgy',
    title: {
      ja: '主の復活大祭 早課〜聖体礼儀（パスカ！ハリストス復活！）',
      en: 'PASCHA: Paschal Matins & Divine Liturgy (Christ is Risen!)',
      ru: 'СВЕТЛОЕ ХРИСТОВО ВОСКРЕСЕНИЕ — ПАСХА: Пасхальная Утреня и Божественная Литургия',
    },
    notes: {
      ja: 'ハリストス復活！実に復活！礼儀後、卵・クリーチの成聖とパスカ祝宴を行います。（※広島集会の復活祭日程は未定）',
      en: 'Christ is Risen! Indeed He is Risen! Blessing of Easter baskets and festive Agape luncheon (Hiroshima Pascha TBD).',
      ru: 'Христос Воскресе! Воистину Воскресе! Освящение куличей, яиц и праздничная трапеза (община в Хиросиме — дата уточняется).',
    },
  },
  {
    id: 's-2027-05-08',
    date: '2027-05-08',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課1福音）',
      en: 'All-Night Vigil (Matins Gospel 1)',
      ru: 'Всенощное бдение (Утреня: Евангелие 1)',
    },
  },
  {
    id: 's-2027-05-09',
    date: '2027-05-09',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: 'フォマ主日 聖体礼儀・月例パニヒダ・執事会',
      en: 'Thomas Sunday Divine Liturgy, Monthly Panikhida & Board Meeting',
      ru: 'Антипасха (Фомина Неделя): Божественная Литургия, панихида, совет',
    },
  },
  {
    id: 's-2027-05-15',
    date: '2027-05-15',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課2福音）',
      en: 'All-Night Vigil (Matins Gospel 2)',
      ru: 'Всенощное бдение (Утреня: Евангелие 2)',
    },
  },
  {
    id: 's-2027-05-16',
    date: '2027-05-16',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '携香女主日 聖体礼儀・復活祭祝賀バーベキュー（BBQ）',
      en: 'Sunday of the Holy Myrrh-Bearing Women Liturgy & Paschal BBQ Party',
      ru: 'Неделя святых жен-мироносиц: Литургия и приходское праздничное барбекю',
    },
    notes: {
      ja: '教会庭園にてパスカ（復活大祭）を祝う恒例の親睦バーベキュー大会を開催します！',
      en: 'Annual celebratory Paschal barbecue luncheon in the church garden!',
      ru: 'Традиционное пасхальное праздничное барбекю в церковном саду!',
    },
  },
  {
    id: 's-2027-05-22-bible',
    date: '2027-05-22',
    time: '13:00',
    serviceType: 'special',
    title: {
      ja: '定例伝道会（Zoomオンライン聖書クラス）',
      en: 'Online Bible Class (Zoom)',
      ru: 'Библейская беседа (Zoom)',
    },
  },
  {
    id: 's-2027-05-22-vigil',
    date: '2027-05-22',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課3福音）',
      en: 'All-Night Vigil (Matins Gospel 3)',
      ru: 'Всенощное бдение (Утреня: Евангелие 3)',
    },
  },
  {
    id: 's-2027-05-23',
    date: '2027-05-23',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: '癱者主日 聖体礼儀（中五旬祭）',
      en: 'Sunday of the Paralytic Divine Liturgy (Mid-Pentecost)',
      ru: 'Неделя о расслабленном: Божественная Литургия (Преполовение)',
    },
  },
  {
    id: 's-2027-05-29',
    date: '2027-05-29',
    time: '17:00',
    serviceType: 'vigil',
    title: {
      ja: '徹夜祷（早課4福音）',
      en: 'All-Night Vigil (Matins Gospel 4)',
      ru: 'Всенощное бдение (Утреня: Еванゲリえ 4)',
    },
  },
  {
    id: 's-2027-05-30',
    date: '2027-05-30',
    time: '10:00',
    serviceType: 'liturgy',
    title: {
      ja: 'サマリア女主日 聖体礼儀',
      en: 'Sunday of the Samaritan Woman Divine Liturgy',
      ru: 'Неделя о самаряныне: Божественная Литургия',
    },
  },
];
