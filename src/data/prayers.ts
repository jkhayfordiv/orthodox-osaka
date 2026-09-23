import { TrilingualText } from '../lib/types';

export interface PrayerItem {
  id: string;
  category: 'patronal' | 'daily' | 'communion';
  title: TrilingualText;
  subtitle?: TrilingualText;
  text: TrilingualText;
}

export const PRAYERS_DATA: PrayerItem[] = [
  {
    id: 'pokrov-troparion',
    category: 'patronal',
    title: {
      ja: '生神女庇護祭 祭日讃詞（トロパリ）',
      en: 'Troparion of the Holy Protection (Pokrov)',
      ru: 'Тропарь Покрова Пресвятой Богородицы',
    },
    subtitle: {
      ja: '第4調 — 当教会の守護聖歌',
      en: 'Tone 4 — Patronal Hymn of Osaka Church',
      ru: 'Глас 4 — Тропарь престольного праздника',
    },
    text: {
      ja: `本日信徒等、神光を帯びて祝い、爾の神現の像に寄りて懇祷し、至潔なる生神女よ、爾の光栄なる庇護に頼りて祈る、
「主よ、憐れみ給う御母よ、爾の尊き庇護を以て我等を蔽い、あらゆる患難より我等を救い給え、
爾の御子、我等の神ハリストスに、我等の霊を救わんことを祈り給え。」`,
      en: `Today the faithful celebrate with splendor, illumined by your coming, O Mother of God,
and looking upon your venerable icon we say with deep contrition:
"Protect us with your holy veil, and deliver us from all evil,
imploring your Son, Christ our God, that He will save our souls."`,
      ru: `Днесь, благовернии людие, светло празднуем, осеняеми Твоим, Богомати, пришествием,
и к Твоему взирающе пречистому образу, умильно глаголем:
покрый нас честным Твоим Покровом и избави нас от всякаго зла,
молящи Сына Твоего, Христа Бога нашего, спасти души наша.`,
    },
  },
  {
    id: 'pokrov-kontakion',
    category: 'patronal',
    title: {
      ja: '生神女庇護祭 祭日小讃詞（コンダク）',
      en: 'Kontakion of the Holy Protection (Pokrov)',
      ru: 'Кондак Покрова Пресвятой Богородицы',
    },
    subtitle: {
      ja: '第3調',
      en: 'Tone 3',
      ru: 'Глас 3',
    },
    text: {
      ja: `童女は本日聖堂に立ち、諸聖人の隊と共に、目に見えず我等の為に神に祈る。
天使は司教等と共に礼拝し、使徒は預言者等と共に歓喜す。
蓋し生神女は、我等の為に永遠の神に祈り給えばなり。`,
      en: `Today the Virgin stands in the midst of the Church,
and with choirs of Saints she invisibly prays to God for us.
Angels and Bishops venerate, Apostles and Prophets rejoice together,
since for our sake the Theotokos prays to the pre-eternal God.`,
      ru: `Дева днесь предстоит в церкви и с лики святых невидимо за ны молится Богу,
Ангели со архиереи покланяются, апостоли же со пророки ликовствуют:
нас бо ради молит Богородица Превечнаго Бога.`,
    },
  },
  {
    id: 'trisagion',
    category: 'daily',
    title: {
      ja: '三聖の祝文（聖なる神）',
      en: 'The Trisagion Prayers',
      ru: 'Трисвятое',
    },
    subtitle: {
      ja: '全ての祈りの基本',
      en: 'Core Daily Prayer',
      ru: 'Молитва ко Пресвятой Троице',
    },
    text: {
      ja: `聖なる神、聖なる勇力、聖なる不滅なる主、我等を憐れめよ。（三度）
光栄は父と子と聖神に帰す、今もいつも世々に至るまで、アミン。
至聖なる三位、我等を憐れめよ。主よ、我等の罪を潔め給え。主宰よ、我等の不法を赦し給え。聖なる主よ、訪い憐れみて、爾の名の為に我等の病を癒し給え。主憐れめよ（三度）。
光栄は父と子と聖神に帰す、今もいつも世々に至るまで、アミン。`,
      en: `Holy God, Holy Mighty, Holy Immortal, have mercy on us. (3 times)
Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages. Amen.
O Most Holy Trinity, have mercy on us. Lord, cleanse us from our sins. Master, pardon our transgressions. Holy One, visit and heal our infirmities for Your Name's sake. Lord have mercy (3 times).
Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages. Amen.`,
      ru: `Святый Боже, Святый Крепкий, Святый Безсмертный, помилуй нас. (Трижды)
Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков. Аминь.
Пресвятая Троице, помилуй нас; Господи, очисти грехи наша; Владыко, прости беззакония наша; Святый, посети и исцели немощи наша, имене Твоего ради. Господи, помилуй (Трижды).
Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков. Аминь.`,
    },
  },
  {
    id: 'our-father',
    category: 'daily',
    title: {
      ja: '主の祈り（天におらるる我らの父）',
      en: "The Lord's Prayer (Our Father)",
      ru: 'Молитва Господня (Отче наш)',
    },
    text: {
      ja: `天におらるる我らの父よ、願わくは爾の名は聖とせられ、爾の国は来たり、爾の旨は天に行わるるが如く地にも行われん。
我が日用の糧を今日我らに与え給え。
我らに負い目ある者を我らが赦すが如く、我らの負い目を赦し給え。
我らを誘惑に導かず、なお我らを凶悪より救い給え。
蓋し国と権能と光栄は、爾父と子と聖神に世々に帰す。アミン。`,
      en: `Our Father, Who art in heaven, hallowed be Thy name. Thy kingdom come, Thy will be done, on earth as it is in heaven.
Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us;
and lead us not into temptation, but deliver us from evil.
For Thine is the kingdom and the power and the glory, of the Father and of the Son and of the Holy Spirit, now and ever and unto ages of ages. Amen.`,
      ru: `Отче наш, Иже еси на небесех! Да святится имя Твое, да приидет Царствие Твое, да будет воля Твоя, яко на небеси и на земли.
Хлеб наш насущный даждь нам днесь; и остави нам долги наша, якоже и мы оставляем должником нашим;
и не введи нас во искушение, но избави нас от лукаваго.
Яко Твое есть Царство и сила и слава Отца и Сына и Святаго Духа ныне и присно и во веки веков. Аминь.`,
    },
  },
  {
    id: 'jesus-prayer',
    category: 'daily',
    title: {
      ja: 'イイススの祈り',
      en: 'The Jesus Prayer',
      ru: 'Иисусова молитва',
    },
    subtitle: {
      ja: '心の絶えざる祈祷',
      en: 'Unceasing Prayer of the Heart',
      ru: 'Непрестанная сердечная молитва',
    },
    text: {
      ja: `主イイスス・ハリストス、神の子よ、罪人なる我を憐れみ給え。`,
      en: `Lord Jesus Christ, Son of God, have mercy on me, a sinner.`,
      ru: `Господи Иисусе Христе, Сыне Божий, помилуй мя, грешнаго.`,
    },
  },
  {
    id: 'creed',
    category: 'daily',
    title: {
      ja: '信経（信仰の告白）',
      en: 'The Symbol of Faith (Nicene Creed)',
      ru: 'Символ веры',
    },
    text: {
      ja: `我信ず、唯一の神・全能の父、天と地、見ゆる天地の総てを造りし主を。
又信ず、唯一の主イイスス・ハリストス、神の独生の子、世々に先だちて父より生まれ、光よりの光、真実の神よりの真実の神、生まれし者にて造られしに非ず、父と一体にして、万物彼に造られ、
我等名々の為、又我等の救いの為に天より降り、聖神及び童女マリヤより身を取りて人となり、
我等の為にポノティオ・ピラトの時に十字架に釘うたれ、苦しみを受け、葬られ、
聖書に相合いて第三日に復活し、天に昇り、父の右に座し、
光栄を顕して生ける者と死せし者を審判する為に還幸すべし、その国は終りなからん。
又信ず、聖神、主、生命を施す者、父より出で、父及び子と共に拝まれ讃美せられ、預言者を以て言わしめし主を。
又信ず、一なる聖なる公なる使徒の教会を。
我言い表す、唯一の洗礼、以て罪の赦しを得ることを。
我望む、死人の復活、並びに来世の生命を。アミン。`,
      en: `I believe in one God, Father Almighty, Maker of heaven and earth, and of all things visible and invisible.
And in one Lord Jesus Christ, the only-begotten Son of God, begotten of the Father before all ages; Light of Light, true God of true God, begotten, not made, of one essence with the Father, by Whom all things were made.
Who for us men and for our salvation came down from heaven, and was incarnate of the Holy Spirit and the Virgin Mary, and became man.
And was crucified also for us under Pontius Pilate, and suffered and was buried.
And the third day He rose again, according to the Scriptures.
And ascended into heaven, and sits at the right hand of the Father.
And He shall come again, with glory, to judge the living and the dead; Whose kingdom shall have no end.
And in the Holy Spirit, the Lord, the Giver of Life, Who proceeds from the Father, Who with the Father and the Son together is worshipped and glorified, Who spoke by the Prophets.
And in one, holy, catholic and apostolic Church.
I acknowledge one baptism for the remission of sins.
I look for the resurrection of the dead, and the life of the world to come. Amen.`,
      ru: `Верую во единаго Бога Отца, Вседержителя, Творца небу и земли, видимым же всем и невидимым.
И во единаго Господа Иисуса Христа, Сына Божия, Единороднаго, Иже от Отца рожденнаго прежде всех век; Света от Света, Бога истинна от Бога истинна, рожденна, несотворенна, единосущна Отцу, Имже вся быша.
Нас ради человек и нашего ради спасения сшедшаго с небес и воплотившагося от Духа Свята и Марии Девы, и вочеловечшася.
Распятаго же за ны при Понтийстем Пилате, и страдавша, и погребенна.
И воскресшаго в третий день по Писанием.
И возшедшаго на небеса, и седяща одесную Отца.
И паки грядущаго со славою судити живым и мертвым, Егоже Царствию не будет конца.
И в Духа Святаго, Господа, Животворящаго, Иже от Отца исходящаго, Иже со Отцем и Сыном спокланяема и сславима, глаголавшаго пророки.
Во едину Святую, Соборную и Апостольскую Церковь.
Исповедую едино крещение во оставление грехов.
Чаю воскресения мертвых, и жизни будущаго века. Аминь.`,
    },
  },
];
