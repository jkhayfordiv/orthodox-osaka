import { TrilingualText } from '../lib/types';

export interface LiturgySection {
  id: string;
  title: TrilingualText;
  celebrant: 'Priest' | 'Deacon' | 'Choir' | 'People';
  text: TrilingualText;
  rubric?: TrilingualText;
}

export const LITURGY_CHRYSOSTOM: LiturgySection[] = [
  {
    id: 'lit-opening',
    title: {
      ja: '開始の祝福',
      en: 'Opening Blessing',
      ru: 'Начальный возглас',
    },
    celebrant: 'Priest',
    rubric: {
      ja: '司祭は福音経をもって宝座の上に十字を描きて言う：',
      en: 'The Priest makes the sign of the Cross with the Gospel over the Altar and says:',
      ru: 'Священник, творя крест Евангелием над святым Престолом, возглашает:',
    },
    text: {
      ja: `司祭：父と子と聖神の国は讃美せらる、今もいつも世々に至るまで。
歌隊：アミン。`,
      en: `Priest: Blessed is the Kingdom of the Father, and of the Son, and of the Holy Spirit, now and ever, and unto ages of ages.
Choir: Amen.`,
      ru: `Иерей: Благословено Царство Отца и Сына и Святаго Духа, ныне и присно и во веки веков.
Хор: Аминь.`,
    },
  },
  {
    id: 'lit-great-litany',
    title: {
      ja: '大連祷（平和の連祷）',
      en: 'The Great Litany',
      ru: 'Великая ектения',
    },
    celebrant: 'Deacon',
    text: {
      ja: `輔祭：平穏にして主を祈らん。
歌隊：主、憐れめよ。（Господи, помилуй / Lord, have mercy）
輔祭：天よりの平安と、我が霊の救いの為に、主を祈らん。
歌隊：主、憐れめよ。
輔祭：全世界の平和、神の聖なる諸教会の堅固と、総ての人の一致の為に、主を祈らん。
歌隊：主、憐れめよ。
輔祭：この聖堂と、信と虔みと神の畏れを以てここに入る者の為に、主を祈らん。
歌隊：主、憐れめよ。`,
      en: `Deacon: In peace let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: For the peace from above and for the salvation of our souls, let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: For the peace of the whole world, for the stability of the holy churches of God, and for the unity of all, let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: For this holy house and for those who enter it with faith, reverence, and the fear of God, let us pray to the Lord.
Choir: Lord, have mercy.`,
      ru: `Диакон: Миром Господу помолимся.
Хор: Господи, помилуй.
Диакон: О свышнем мире и спасении душ наших, Господу помолимся.
Хор: Господи, помилуй.
Диакон: О мире всего мира, благостоянии святых Божиих церквей и соединении всех, Господу помолимся.
Хор: Господи, помилуй.
Диакон: О святем храме сем и с верою, благоговением и страхом Божиим входящих в онь, Господу помолимся.
Хор: Господи, помилуй.`,
    },
  },
  {
    id: 'lit-first-antiphon',
    title: {
      ja: '第1応誦（詩篇102篇）',
      en: 'The First Antiphon (Psalm 102)',
      ru: 'Первый антифон (Псалом 102)',
    },
    celebrant: 'Choir',
    text: {
      ja: `我が霊よ、主を讃め揚げよ、我が内にある総ての者よ、その聖なる名を讃め揚げよ。
主を讃め揚げよ、我が霊よ、その恩恵を忘るるなかれ。
主は爾の総ての罪を赦し、爾の総ての病を癒し給う。
憐れみと慈しみ深きかな主、忍耐長くして恵み豊かなり。
我が霊よ、主を讃め揚げよ、主は讃美せらる。`,
      en: `Bless the Lord, O my soul, and all that is within me, bless His holy Name.
Bless the Lord, O my soul, and forget not all His benefits.
Who forgives all your iniquities, Who heals all your diseases.
The Lord is compassionate and merciful, long-suffering and abundant in mercy.
Bless the Lord, O my soul, and blessed are You, O Lord.`,
      ru: `Благослови, душе моя, Господа, и вся внутренность моя имя святое Его.
Благослови, душе моя, Господа, и не забывай всех воздаяний Его.
Очищающаго вся беззакония твоя, исцеляющаго вся недуги твоя.
Щедр и милостив Господь, долготерпелив и многомилостив.
Благослови, душе моя, Господа, и благословен еси, Господи.`,
    },
  },
  {
    id: 'lit-small-entrance',
    title: {
      ja: '聖福音経 小進進堂',
      en: 'The Small Entrance with the Holy Gospel',
      ru: 'Малый вход с Евангелием',
    },
    celebrant: 'Priest',
    rubric: {
      ja: '司祭は聖福音経を高く捧げ、王門中央より会衆に向かい言う：',
      en: 'The Priest raises the Gospel high in the Royal Doors and proclaims:',
      ru: 'Священник возносит Евангелие в Царских вратах:',
    },
    text: {
      ja: `輔祭（又は司祭）：叡智、直ちにして起て！
歌隊：来たれ、伏してハリストスに拝せん。死より復活せし神の子よ、爾に「アリルイヤ」と歌う我等を救い給え！`,
      en: `Deacon (or Priest): Wisdom! Stand upright!
Choir: Come, let us worship and bow down before Christ! Save us, O Son of God, Who didst rise from the dead, who sing to Thee: Alleluia!`,
      ru: `Диакон (или Иерей): Премудрость, прости!
Хор: Приидите, поклонимся и припадем ко Христу! Спаси ны, Сыне Божий, воскресый из мертвых, поющия Ти: Аллилуиа!`,
    },
  },
  {
    id: 'lit-cherubic-hymn',
    title: {
      ja: 'ヘルヴィムの歌（大進進堂）',
      en: 'The Cherubic Hymn (Great Entrance)',
      ru: 'Херувимская песнь (Великий вход)',
    },
    celebrant: 'Choir',
    text: {
      ja: `我等ヘルヴィムを目に見えず象り、生命を施す三位に三聖の歌を歌いて、
今世の憂いを悉く退くべし。
天軍を目に見えず帯同せる万民の王を迎え奉らんが為なり。
アリルイヤ、アリルイヤ、アリルイヤ。`,
      en: `Let us who mystically represent the Cherubim,
and who sing the thrice-holy hymn to the life-creating Trinity,
now lay aside all earthly care.
That we may receive the King of All, who comes invisibly escorted by the angelic hosts.
Alleluia, Alleluia, Alleluia.`,
      ru: `Иже Херувимы тайно образующе,
и животворящей Троице трисвятую песнь припевающе,
всякое ныне житейское отложим попечение.
Яко да Царя всех подымем, ангельскими невидимо дориносима чинми.
Аллилуиа, Аллилуиа, Аллилуиа.`,
    },
  },
  {
    id: 'lit-anaphora',
    title: {
      ja: '聖変化の感謝祈祷（アナフォラ）',
      en: 'The Eucharistic Prayer (Anaphora)',
      ru: 'Анафора (Евхаристический канон)',
    },
    celebrant: 'Priest',
    text: {
      ja: `司祭：主イイスス・ハリストスの恩恵と、神父の愛と、聖神の交わりとは、爾等総ての人と共に在らん。
歌隊：かつ爾の霊と共に。
司祭：心を高く挙ぐべし。
歌隊：主に向かいて持ちて仰ぐ。
司祭：主に感謝すべし。
歌隊：父と子と聖神、同体の別れざる三位に伏し拝むは、礼に合いて正しきなり。`,
      en: `Priest: The grace of our Lord Jesus Christ, and the love of God the Father, and the communion of the Holy Spirit be with you all.
Choir: And with your spirit.
Priest: Let us lift up our hearts.
Choir: We lift them up unto the Lord.
Priest: Let us give thanks unto the Lord.
Choir: It is proper and right to worship the Father, and the Son, and the Holy Spirit: the Trinity, one in essence and undivided.`,
      ru: `Иерей: Благодать Господа нашего Иисуса Христа, и любы Бога и Отца, и причастие Святаго Духа буди со всеми вами.
Хор: И со духом твоим.
Иерей: Горе имеем сердца.
Хор: Имамы ко Господу.
Иерей: Благодарим Господа.
Хор: Достойно и праведно есть покланятися Отцу и Сыну и Святому Духу, Троице Единосущней и Нераздельней.`,
    },
  },
  {
    id: 'lit-epiclesis',
    title: {
      ja: '聖神降臨祈祷と聖変化',
      en: 'The Epiclesis (Consecration of Gifts)',
      ru: 'Призывание Святаго Духа и Освящение Даров',
    },
    celebrant: 'Priest',
    rubric: {
      ja: '司祭はパンと葡萄酒の上に聖十字を描きて聖神の降臨を祈る：',
      en: 'The Priest blesses the Holy Gifts and prays for the Holy Spirit to transform them:',
      ru: 'Священник благословляет хлеб и вино, молясь о наитии Святого Духа:',
    },
    text: {
      ja: `司祭：このパンを爾のハリストスの尊き体となし、この杯の中にあるものを爾のハリストスの尊き血となし、爾の聖神をもてこれを変じ給え。
輔祭：アミン、アミン、アミン。
歌隊：爾を讃美し、爾を祝し、爾に感謝し、我らの神よ、爾に祈る。`,
      en: `Priest: And make this bread the precious Body of Your Christ, and that which is in this cup the precious Blood of Your Christ, making the change by Your Holy Spirit.
Deacon: Amen, Amen, Amen.
Choir: We praise You, we bless You, we give thanks to You, O Lord, and we pray to You, our God.`,
      ru: `Иерей: И сотвори убо хлеб сей Честное Тело Христа Твоего. А еже в чаши сей, Честную Кровь Христа Твоего. Преложив Духом Твоим Святым.
Диакон: Аминь, аминь, аминь.
Хор: Тебе поем, Тебе благословим, Тебе благодарим, Господи, и молимтися, Боже наш.`,
    },
  },
  {
    id: 'lit-communion',
    title: {
      ja: '信徒の領聖（聖体拝領）',
      en: 'Holy Communion',
      ru: 'Причащение мирян',
    },
    celebrant: 'Priest',
    rubric: {
      ja: '司祭は聖杯を掲げて王門より出でて言う：',
      en: 'The Priest emerges from the Royal Doors holding the Chalice and proclaims:',
      ru: 'Священник исходит из Царских врат со святой Чашей:',
    },
    text: {
      ja: `司祭：神の畏れと、信と愛とを以て進み近づくべし！
歌隊：主の御名によりて来たる者は讃美せらる、神は主なり、我らに現れ給えり！
（会衆が領聖祝文を唱えて進み、主の聖体と聖血に与る）`,
      en: `Priest: With fear of God, with faith and love, draw near!
Choir: Blessed is He that comes in the name of the Lord! God is the Lord and has revealed Himself to us!
(The faithful pray the Communion Prayer and approach the Chalice)`,
      ru: `Иерей: Со страхом Божиим и верою приступите!
Хор: Благословен Грядый во имя Господне, Бог Господь и явися нам!
(Прихожане благоговейно подходят ко святому Причастию)`,
    },
  },
];
