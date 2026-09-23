import { SaintCommemoration } from '../lib/types';

// Map of Julian Month-Day (MM-DD) -> Array of Saints
export const DAILY_SAINTS_JULIAN: Record<string, SaintCommemoration[]> = {
  // Sept 10 Julian (Sept 23 Civil)
  '09-10': [
    {
      name: {
        ja: '殉教女メノドラ、メトロドラ、ニンフォドラ（310年）',
        en: 'Holy Martyrs Menodora, Metrodora, and Nymphodora (310)',
        ru: 'Святые мученицы девы Минодора, Митродора и Нимфодора (305–311)',
      },
      title: {
        ja: 'ヴィフィニヤの三姉妹殉教女',
        en: 'Three Virgin Sisters of Bithynia',
        ru: 'Сестры-девственницы из Вифинии',
      },
      bio: {
        ja: 'ヴィフィニヤ出身の肉親の三姉妹。荒野に隠遁し祈りと断食の日々を送るが、信仰の徳が知れ渡り総督に捕縛される。数々の拷問に屈せず、ハリストスへの固い信仰を証して殉教した。',
        en: 'Three Christian sisters who lived in seclusion devoted to prayer. Arrested under Galerius Maximian, they refused to sacrifice to idols and joyfully endured martyrdom for Jesus Christ.',
        ru: 'Родные сестры-христианки из Вифинии. За отказ принести жертву идолам и твердое исповедание веры во Христа претерпели жестокие мучения и приняли мученические венцы.',
      },
    },
    {
      name: {
        ja: 'ギリシャの聖パルヘリヤ皇后（453年）',
        en: 'Righteous Empress Pulcheria of Constantinople (453)',
        ru: 'Благоверная царица Греческая Пульхерия (453)',
      },
      title: {
        ja: '正統信仰の擁護者',
        en: 'Defender of the Orthodox Faith',
        ru: 'Защитница Православия',
      },
      bio: {
        ja: '東ローマ帝国皇后。第三全地公会（エフェソ公会）及び第四全地公会（カルキドン公会）を支持し、生神女への敬愛と正統教義を確立した賢明なる義人。',
        en: 'Sister of Emperor Theodosius II and wife of Emperor Marcian. A devout defender of Orthodoxy who convened the Fourth Ecumenical Council at Chalcedon confirming Christ’s divine and human natures.',
        ru: 'Сестра императора Феодосия Младшего и супруга императора Маркиана. Ревностная защитница Православия, содействовавшая созыву IV Вселенского Собора в Халкидоне.',
      },
    },
    {
      name: {
        ja: '七十使徒アペリイ、ルキイ、クリメント',
        en: 'Holy Apostles of the Seventy: Apelles, Lucius, and Clement',
        ru: 'Апостолы от 70-ти: Апеллий, Лукий и Климент',
      },
      bio: {
        ja: '聖使徒パウェルによって福音を宣べ伝え、諸教会の主教として信徒を導いた七十門徒。',
        en: 'Holy disciples of the Lord enumerated among the Seventy Apostles, mentioned in the Epistles of St. Paul.',
        ru: 'Святые апостолы из числа семидесяти учеников Христовых, упомянутые апостолом Павлом.',
      },
    },
    {
      name: {
        ja: 'カメンスクの奇跡者聖イオアサフ（1453年）',
        en: 'Venerable Joasaph of Kamensk, Vologda Wonderworker (1453)',
        ru: 'Преподобный Иоасаф Каменский, Вологодский чудотворец (1453)',
      },
    },
  ],

  // Sept 8 Julian (Sept 21 Civil) - Nativity of the Theotokos
  '09-08': [
    {
      name: {
        ja: 'いと聖なる我が女宰・生神女マリヤの御誕生',
        en: 'The Nativity of our Most Holy Lady Theotokos and Ever-Virgin Mary',
        ru: 'Рождество Пресвятой Владычицы нашей Богородицы и Приснодевы Марии',
      },
      isPatronSaint: true,
      bio: {
        ja: '義人イオアキムとアンナの祈りに神が応え給い、全人類の救いの器となるべき至聖生神女が誕生された大祭日。',
        en: 'The universal joy: the birth of the Mother of God from the barren and righteous Joachim and Anna.',
        ru: 'Рождество Твоей, Богородице Дево, радость возвести всей вселенней.',
      },
    },
  ],

  // Sept 9 Julian (Sept 22 Civil)
  '09-09': [
    {
      name: {
        ja: '生神の祖なる義人イオアキムとアンナ',
        en: 'Holy and Righteous Ancestors of God, Joachim and Anna',
        ru: 'Святые праведные Богоотцы Иоаким и Анна',
      },
      bio: {
        ja: '生神女マリヤの両親。生涯敬虔に神に仕え、晩年に至りて神の恩寵により子を与えられた聖なる夫婦。',
        en: 'The pious parents of the Virgin Mary, celebrated on the day following the Nativity of the Theotokos.',
        ru: 'Благочестивые родители Пресвятой Богородицы, образ верности и упования на Господа.',
      },
    },
  ],

  // Sept 11 Julian (Sept 24 Civil)
  '09-11': [
    {
      name: {
        ja: 'アレクサンドリヤの聖フェオドラ（491年）',
        en: 'Venerable Theodora of Alexandria (491)',
        ru: 'Преподобная Феодора Александрийская Младшая (491)',
      },
      bio: {
        ja: '深い痛悔と謙遜を以て修道院に身を隠し、試練と祈りの生涯を全うした聖女。',
        en: 'A holy penitent who lived in ascetical self-denial and prayer, achieving deep humility and holiness.',
        ru: 'Образ глубокого покаяния, подвизавшаяся в монастыре в непрестанном посте и молитве.',
      },
    },
  ],

  // Sept 14 Julian (Sept 27 Civil) - Exaltation of the Cross
  '09-14': [
    {
      name: {
        ja: '尊い生命を施す主の十字架の挙栄祭',
        en: 'The Universal Elevation of the Precious and Life-Giving Cross',
        ru: 'Всемирное Воздвижение Честнаго и Животворящаго Креста Господня',
      },
      isPatronSaint: true,
      bio: {
        ja: 'エルサレムにおいて聖エレナ皇后により発見された主の聖十字架が、大主教マカリオスにより高く掲げられた祝日。全日厳斎。',
        en: 'Commemorating the finding of the True Cross of Christ in Jerusalem by St. Helen in 326.',
        ru: 'Праздник в память обретения Честного Креста Господня в Иерусалиме святой царицей Еленой.',
      },
    },
  ],

  // Oct 1 Julian (Oct 14 Civil) - Pokrov (Osaka Temple Feast!)
  '10-01': [
    {
      name: {
        ja: 'いと聖なる生神女マリヤの御庇護（ポクロフ・大阪教会堂祭）',
        en: 'The Protection of the Most Holy Theotokos (Pokrov — Patronal Feast)',
        ru: 'Покров Пресвятой Владычицы нашей Богородицы (Престольный праздник)',
      },
      isPatronSaint: true,
      bio: {
        ja: '10世紀ヴラヘルネ聖堂において、聖アンドレイに生神女が現れ、その尊き外套で信徒をお覆いになり災厄から守られた奇跡の記念祭。大阪教会の聖堂名由来のお祝いです。',
        en: 'The Mother of God spread Her protective veil over the praying congregation in Constantinople.',
        ru: 'Явление Пресвятой Богородицы святому Андрею Юродивому во Влахернском храме Константинополя.',
      },
    },
  ],

  // Dec 6 Julian (Dec 19 Civil) - St. Nicholas
  '12-06': [
    {
      name: {
        ja: 'ミラ・リキヤの奇跡者大主教聖ニコライ大祭',
        en: 'St. Nicholas the Wonderworker, Archbishop of Myra in Lycia',
        ru: 'Святитель Николай, архиепископ Мир Ликийских, чудотворец',
      },
      isPatronSaint: true,
      bio: {
        ja: '全世界で敬愛される慈善と奇跡の聖人。第一全地公会で正統信仰を守り、貧しい人や航海者を助け給うた。',
        en: 'One of the most beloved saints in all Christendom, famed for boundless charity and miracles.',
        ru: 'Великий угодник Божий, скорый помощник и молитвенник во всех скорбях и напастях.',
      },
    },
  ],

  // Feb 3 Julian (Feb 16 Civil) - St. Nicholas of Japan
  '02-03': [
    {
      name: {
        ja: '日本の亜使徒大主教聖ニコライ（カサートキン）',
        en: 'St. Nicholas of Japan, Equal-to-the-Apostles (Kasatkin)',
        ru: 'Святитель Николай Японский, равноапостольный',
      },
      isPatronSaint: true,
      bio: {
        ja: '1861年に来日し、新約聖書・祈祷書を日本語に翻訳、東京ニコライ堂を建立した日本正教会の開教者。',
        en: 'Apostle of Japan who translated the Orthodox Holy Scriptures and liturgical texts into Japanese.',
        ru: 'Святой просветитель Японии, положивший основание Православной Церкви в стране Восходящего Солнца.',
      },
    },
  ],
};
