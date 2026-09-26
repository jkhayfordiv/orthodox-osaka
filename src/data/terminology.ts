import { TrilingualText } from '../lib/types';

export const PARISH_INFO = {
  name: {
    ja: '大阪ハリストス正教会 生神女庇護聖堂',
    en: 'The Holy Protection Church in Osaka',
    ru: 'Храм Покрова Пресвятой Богородицы в Осаке',
  },
  shortName: {
    ja: '大阪ハリストス正教会',
    en: 'Osaka Orthodox Church',
    ru: 'Православная Церковь в Осаке',
  },
  address: {
    ja: '〒564-0073 大阪府吹田市山手町1-8-15',
    en: '1-8-15 Yamate-cho, Suita-shi, Osaka 564-0073, Japan',
    ru: '1-8-15 Yamate-cho, Suita, Osaka 564-0073, Япония',
  },
  access: {
    ja: '阪急千里線「豊津駅」または「関大前駅」より徒歩約8分',
    en: 'Approx. 8 min walk from Toyotsu or Kandai-mae Station (Hankyu Senri Line)',
    ru: 'Около 8 минут пешком от станций Toyotsu или Kandai-mae (линия Hankyu Senri)',
  },
  phone: '06-6388-4512',
  email: 'osaka.orthodox.church@gmail.com',
  priestName: {
    ja: '司祷司祭',
    en: 'Parish Rector',
    ru: 'Настоятель храма',
  },
};

export const LITURGICAL_TERMS: Record<string, TrilingualText> = {
  // Services
  vigil: {
    ja: '徹夜祷',
    en: 'All-Night Vigil',
    ru: 'Всенощное бдение',
  },
  liturgy: {
    ja: '聖体礼儀',
    en: 'Divine Liturgy',
    ru: 'Божественная Литургия',
  },
  vespers: {
    ja: '晩課',
    en: 'Vespers',
    ru: 'Вечерня',
  },
  matins: {
    ja: '早課',
    en: 'Matins',
    ru: 'Утреня',
  },
  panikhida: {
    ja: 'パニヒダ（永眠者記憶の祈祷）',
    en: 'Memorial Service (Panikhida)',
    ru: 'Панихида',
  },
  waterBlessing: {
    ja: '聖水式',
    en: 'Blessing of Water',
    ru: 'Водоосвящение',
  },
  greatCompline: {
    ja: '晩堂大課',
    en: 'Great Compline',
    ru: 'Великое Повечерие',
  },
  presanctified: {
    ja: '先備聖体礼儀',
    en: 'Liturgy of the Presanctified Gifts',
    ru: 'Литургия Преждеосвященных Даров',
  },
  moleben: {
    ja: 'モレーベン（祈願祈祷）',
    en: 'Moleben (Prayer of Supplication)',
    ru: 'Молебен',
  },

  // Key theological terms (authentic Japanese Orthodox translation)
  jesusChrist: {
    ja: 'イイスス・ハリストス',
    en: 'Jesus Christ',
    ru: 'Иисус Христос',
  },
  holySpirit: {
    ja: '聖神（せいしん）',
    en: 'Holy Spirit',
    ru: 'Святой Дух',
  },
  theotokos: {
    ja: '生神女（しょうしんじょ）マリヤ',
    en: 'The Mother of God (Theotokos)',
    ru: 'Пресвятая Богородица',
  },
  communion: {
    ja: '領聖（りょうせい）',
    en: 'Holy Communion',
    ru: 'Святое Причастие',
  },
  gospel: {
    ja: '聖福音経',
    en: 'Holy Gospel',
    ru: 'Святое Евангелие',
  },
  epistle: {
    ja: '聖使徒経',
    en: 'The Epistle / Apostolos',
    ru: 'Апостол',
  },
  pericope: {
    ja: '端（たん）',
    en: 'Pericope',
    ru: 'Зачало',
  },
  tone: {
    ja: '調',
    en: 'Tone',
    ru: 'Глас',
  },
  oldCalendar: {
    ja: '旧暦（ユリウス暦）',
    en: 'Old Style (Julian Calendar)',
    ru: 'Старый стиль (Юлианский календарь)',
  },
};

export const TONE_NAMES: Record<number, TrilingualText> = {
  1: { ja: '第1調', en: 'Tone 1', ru: 'Глас 1' },
  2: { ja: '第2調', en: 'Tone 2', ru: 'Глас 2' },
  3: { ja: '第3調', en: 'Tone 3', ru: 'Глас 3' },
  4: { ja: '第4調', en: 'Tone 4', ru: 'Глас 4' },
  5: { ja: '第5調', en: 'Tone 5', ru: 'Глас 5' },
  6: { ja: '第6調', en: 'Tone 6', ru: 'Глас 6' },
  7: { ja: '第7調', en: 'Tone 7', ru: 'Глас 7' },
  8: { ja: '第8調', en: 'Tone 8', ru: 'Глас 8' },
};
