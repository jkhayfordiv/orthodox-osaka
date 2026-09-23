import { TrilingualText } from '../lib/types';

export interface ParishPhotoItem {
  id: string;
  src: string;
  category: 'exterior' | 'interior' | 'services' | 'community' | 'bells';
  title: TrilingualText;
  caption: TrilingualText;
  featured?: boolean;
}

export const CURATED_PARISH_PHOTOS: ParishPhotoItem[] = [
  {
    id: 'photo-panorama',
    src: '/church-photos/osaka-church-panoramic.jpg',
    category: 'exterior',
    featured: true,
    title: {
      ja: '大阪ハリストス正教会 全景',
      en: 'Osaka Orthodox Church Panoramic View',
      ru: 'Панорама храма Покрова в Осаке',
    },
    caption: {
      ja: '吹田市山手町の緑に囲まれた聖堂と美しい鐘楼の佇まい。',
      en: 'The temple and belfry surrounded by green hills in Suita, Osaka.',
      ru: 'Храм и колокольня среди зелени в Суите, Осака.',
    },
  },
  {
    id: 'photo-sunset',
    src: '/church-photos/church-sunset-bright.jpg',
    category: 'exterior',
    featured: true,
    title: {
      ja: '夕暮れの聖堂と十字架',
      en: 'Golden Sunset over the Orthodox Cross',
      ru: 'Золотой закат над купольным крестом',
    },
    caption: {
      ja: '夕陽に黄金色に輝く聖堂屋根と八端十字架。',
      en: 'The Russian-style 8-point cross gleaming in the Osaka evening sky.',
      ru: 'Восьмиконечный крест в сиянии вечерней зари.',
    },
  },
  {
    id: 'photo-royal-doors',
    src: '/church-photos/royal-doors-iconostasis.jpg',
    category: 'interior',
    featured: true,
    title: {
      ja: '王門（天国への扉）とイコノスタス',
      en: 'The Royal Doors & Iconostasis',
      ru: 'Царские Врата и Иконостас',
    },
    caption: {
      ja: '至聖所と聖所を分かつ金色の王門。四福音記者と生神女受胎告知の聖画。',
      en: 'The gilded Royal Doors depicting the Annunciation and the Four Evangelists.',
      ru: 'Царские врата, украшенные иконами Благовещения и четырёх евангелистов.',
    },
  },
  {
    id: 'photo-altar-light',
    src: '/church-photos/church-altar-light.jpg',
    category: 'interior',
    featured: true,
    title: {
      ja: '聖所を満たす祈りの光',
      en: 'Sacred Light of the Altar',
      ru: 'Молитвенный свет в алтаре',
    },
    caption: {
      ja: '蝋燭の炎と自然光が調和する聖なる空間。',
      en: 'Soft candlelight and sunlight filling the nave and sanctuary.',
      ru: 'Теплый свет свечей и естественные лучи в храмовом пространстве.',
    },
  },
  {
    id: 'photo-vespers',
    src: '/church-photos/vespers-candlelight.jpg',
    category: 'services',
    featured: true,
    title: {
      ja: '土曜徹夜祷の祈り',
      en: 'Saturday All-Night Vigil',
      ru: 'Субботнее Всенощное бдение',
    },
    caption: {
      ja: '夕刻のほの暗い聖堂に響く無伴奏の聖歌と灯火の祈り。',
      en: 'Choral singing and prayer in the soft evening candlelight.',
      ru: 'Хоровое пение и благоговейная молитва при мерцании лампад.',
    },
  },
  {
    id: 'photo-pascha-procession',
    src: '/church-photos/20190427001.jpg',
    category: 'services',
    featured: true,
    title: {
      ja: '主の復活大祭（パスカ）十字行',
      en: 'Holy Pascha Midnight Procession',
      ru: 'Пасхальный крестный ход',
    },
    caption: {
      ja: '「ハリストス復活！実に復活！」の歓喜に包まれる深夜の十字行。',
      en: 'The midnight procession bearing banners and candles for Christ is Risen!',
      ru: 'Торжественный крестный ход в пасхальную полночь с хоругвями и свечами.',
    },
  },
  {
    id: 'photo-pascha-feast',
    src: '/church-photos/20190427051.jpg',
    category: 'services',
    featured: false,
    title: {
      ja: '復活祭の祝祷と信徒の参祷',
      en: 'Pascha Divine Liturgy',
      ru: 'Праздничная Пасхальная Литургия',
    },
    caption: {
      ja: '白と金の祭服に包まれた祭壇と祈りを共にする信徒たち。',
      en: 'The festive white and gold vestments worn for the Resurrection of Christ.',
      ru: 'Бело-золотые облачения и радостная молитва прихожан.',
    },
  },
  {
    id: 'photo-belfry-bells',
    src: '/church-photos/img-0686.jpg',
    category: 'bells',
    featured: true,
    title: {
      ja: '鐘楼と帝政ロシアの大鐘',
      en: 'The Belfry & Master Bells',
      ru: 'Колокольня и исторические колокола',
    },
    caption: {
      ja: '1世紀以上にわたり吹田の街に福音を響かせてきた伝統の鐘。現在修復工事中。',
      en: 'Historic master bell echoing the Gospel over Suita for over a century.',
      ru: 'Старинный колокол, благовествующий уже более ста лет.',
    },
  },
  {
    id: 'photo-community-garden',
    src: '/church-photos/img-0249.jpg',
    category: 'community',
    featured: false,
    title: {
      ja: '緑豊かな教会の庭園',
      en: 'Parish Courtyard & Gardens',
      ru: 'Церковный сад и двор',
    },
    caption: {
      ja: '四季折々の花々が咲き、礼拝後にはお茶や親睦会が開かれる庭園。',
      en: 'Peaceful seasonal flora where parishioners gather for tea after Liturgy.',
      ru: 'Уютный сад при храме, где прихожане собираются после службы.',
    },
  },
  {
    id: 'photo-parish-fellowship',
    src: '/church-photos/20190427165.jpg',
    category: 'community',
    featured: true,
    title: {
      ja: '信徒の親睦とアガペ祝宴',
      en: 'Agape Fellowship & Celebration',
      ru: 'Братская трапеза и общение',
    },
    caption: {
      ja: '多国籍の信徒が集い、心温まる笑顔で食卓を囲むひととき。',
      en: 'Parishioners from Japan and around the world sharing a fellowship meal.',
      ru: 'Многонациональная община храма за праздничной трапезой.',
    },
  },
  {
    id: 'photo-sanctuary-details',
    src: '/church-photos/dsc00464.jpg',
    category: 'interior',
    featured: false,
    title: {
      ja: '祭壇の装飾とイコン',
      en: 'Sacred Iconography & Ornaments',
      ru: 'Святые иконы и богослужебная утварь',
    },
    caption: {
      ja: '厳粛な祈りを支える伝統的な正教会の聖具と装飾。',
      en: 'Traditional Orthodox liturgical vessels and ornate holy icons.',
      ru: 'Богослужебная утварь и образа, украшающие храм.',
    },
  },
  {
    id: 'photo-candles-prayers',
    src: '/church-photos/dsc00590.jpg',
    category: 'services',
    featured: false,
    title: {
      ja: '献香と蝋燭の祈り',
      en: 'Incense & Candlelight Prayers',
      ru: 'Каждение и возжжение свечей',
    },
    caption: {
      ja: '主の前に捧げられる信徒たちの祈りの灯火。',
      en: 'The warm glow of beeswax candles offered in devotion before the icons.',
      ru: 'Живой свет восковых свечей, возносимый пред святыми иконами.',
    },
  },
];
