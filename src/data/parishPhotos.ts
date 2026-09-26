import { TrilingualText } from '../lib/types';

export interface ParishPhotoItem {
  id: string;
  src: string;
  category: 'exterior' | 'interior' | 'services' | 'community';
  title: TrilingualText;
  caption: TrilingualText;
  featured?: boolean;
}

export const CURATED_PARISH_PHOTOS: ParishPhotoItem[] = [
  // --- 1. Exterior & Belfry (聖堂外観・鐘楼) ---
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
    id: 'photo-belfry-bells',
    src: '/photos/bell-belfry-tower.jpg',
    category: 'exterior',
    featured: true,
    title: {
      ja: '鐘楼と帝政ロシアの大鐘',
      en: 'The Belfry & Historic Russian Bell',
      ru: 'Колокольня и исторический русский колокол',
    },
    caption: {
      ja: '1世紀以上にわたり吹田の街に福音を響かせてきた伝統の鐘。現在修復工事中。',
      en: 'Historic master bell echoing the Gospel over Suita for over a century.',
      ru: 'Старинный колокол, благовествующий над Суитой уже более ста лет.',
    },
  },
  {
    id: 'photo-bell-timber',
    src: '/photos/bell-timber-historic.jpg',
    category: 'exterior',
    featured: false,
    title: {
      ja: '鐘楼の歴史的木組み構造',
      en: 'Historic Timber Structure of the Belfry',
      ru: 'Историческая деревянная конструкция колокольни',
    },
    caption: {
      ja: '伝統的な木造建築の技法で大鐘を支える堅牢な鐘楼内部の梁。',
      en: 'Traditional timber joinery supporting the heavy liturgical bells.',
      ru: 'Традиционные деревянные балки, несущие свод и колокола.',
    },
  },

  // --- 2. Interior & Icons (聖堂内部・聖像) ---
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
    id: 'photo-sanctuary-details',
    src: '/church-photos/20190427175.jpg',
    category: 'interior',
    featured: true,
    title: {
      ja: '祭壇の装飾と聖障のイコン',
      en: 'Sanctuary Iconostasis & Royal Doors',
      ru: 'Алтарь, иконостас и Царские Врата',
    },
    caption: {
      ja: '王門の前にて聖杯を掲げる松島ゲオルギイ神父と黄金の聖障。',
      en: 'Fr. George with the Holy Chalice at the Royal Doors before the iconostasis.',
      ru: 'Отец Георгий со святой чашей у Царских Врат перед иконостасом.',
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
      ja: '蝋燭の炎と自然光が調和する聖なる礼拝空間。',
      en: 'Soft candlelight and sunlight filling the nave and sanctuary.',
      ru: 'Теплый свет свечей и естественные лучи в храмовом пространстве.',
    },
  },
  {
    id: 'photo-temple-interior',
    src: '/photos/church-interior.jpg',
    category: 'interior',
    featured: false,
    title: {
      ja: '聖堂内部全景とシャンデリア',
      en: 'Temple Nave & Chandelier',
      ru: 'Интерьер храма и паникадило',
    },
    caption: {
      ja: '天井から吊り下げられたシャンデリアと、祈りの静けさに満ちた会堂。',
      en: 'The main nave adorned with traditional chandelier and iconography.',
      ru: 'Храмовое пространство с паникадилом и святыми образами.',
    },
  },

  // --- 3. Services & Pascha (奉神礼・復活大祭) ---
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
    id: 'photo-candles-prayers',
    src: '/church-photos/20190427051.jpg',
    category: 'services',
    featured: true,
    title: {
      ja: '献香と蝋燭の祈り',
      en: 'Incense & Paschal Blessing',
      ru: 'Каждение и пасхальное благословение',
    },
    caption: {
      ja: '白銀の祭服に身を包み、香炉と三本蝋燭を手に祈りを捧げる司祭。',
      en: 'Fr. George in festive vestments holding the censer and Paschal trikirion.',
      ru: 'Отец Георгий в праздничном облачении с кадилом и пасхальным трехсвечником.',
    },
  },
  {
    id: 'photo-eucharist',
    src: '/church-photos/20190427165.jpg',
    category: 'services',
    featured: true,
    title: {
      ja: '主日の聖体機密（領聖）',
      en: 'The Holy Eucharist (Communion)',
      ru: 'Таинство Святого Причащения',
    },
    caption: {
      ja: '信徒一人ひとりに主の尊体血が授けられる、礼拝の最も尊い機密。',
      en: 'Parishioners receiving the Holy Mysteries of Christ’s Body and Blood.',
      ru: 'Причащение Святых Христовых Таин на Божественной Литургии.',
    },
  },
  {
    id: 'photo-vespers',
    src: '/church-photos/vespers-candlelight.jpg',
    category: 'services',
    featured: false,
    title: {
      ja: '夕刻徹夜祷の祈り',
      en: 'Evening All-Night Vigil',
      ru: 'Субботнее Всенощное бдение',
    },
    caption: {
      ja: '夕刻のほの暗い聖堂に響く無伴奏の聖歌と灯火の祈り。',
      en: 'Choral singing and prayer in the soft evening candlelight.',
      ru: 'Хоровое пение и благоговейная молитва при мерцании лампад.',
    },
  },

  // --- 4. Community & Grounds (信徒の集い・境内) ---
  {
    id: 'photo-congregation',
    src: '/church-photos/20190427186.jpg',
    category: 'community',
    featured: true,
    title: {
      ja: '聖堂に集う信徒の交わり',
      en: 'Parishioners Gathered in Fellowship',
      ru: 'Приходская община в храме',
    },
    caption: {
      ja: '聖堂を満たす老若男女、多国籍の信徒たちが心を合わせて祈りを捧げます。',
      en: 'Our diverse international community uniting in faith and fellowship.',
      ru: 'Многонациональная община верующих, объединенная в молитве.',
    },
  },
  {
    id: 'photo-community-garden',
    src: '/church-photos/img_0249.jpg',
    category: 'community',
    featured: false,
    title: {
      ja: '緑豊かな教会の庭園',
      en: 'Parish Courtyard & Gardens',
      ru: 'Церковный сад и двор',
    },
    caption: {
      ja: '四季折々の草花が咲き、礼拝後にはお茶や親睦会が開かれる庭園。',
      en: 'Peaceful seasonal flora where parishioners gather for tea after Liturgy.',
      ru: 'Уютный сад при храме, где прихожане собираются после службы.',
    },
  },
  {
    id: 'photo-daylight',
    src: '/photos/osaka-church-daylight.jpg',
    category: 'community',
    featured: false,
    title: {
      ja: '四季折々の吹田の境内',
      en: 'Temple Grounds in Suita',
      ru: 'Приходская территория в Суите',
    },
    caption: {
      ja: '四季の移ろいとともに祈りの時を刻む吹田山手の境内。',
      en: 'The peaceful grounds of Osaka Orthodox Church in every season.',
      ru: 'Мирная атмосфера храмового двора в любое время года.',
    },
  },
];
