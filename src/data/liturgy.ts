import { TrilingualText } from '../lib/types';

export interface LiturgySection {
  id: string;
  order: number;
  title: TrilingualText;
  celebrant: 'Priest' | 'Deacon' | 'Choir' | 'People' | 'All';
  rubric?: TrilingualText;
  text: TrilingualText;
  section?: string;
}

export type LiturgyPart = LiturgySection;

export const LITURGY_CHRYSOSTOM: LiturgySection[] = [
  // 1. Opening Blessing
  {
    id: 'lit-01-opening',
    order: 1,
    title: {
      ja: '1. 開始の祝福',
      en: '1. Opening Blessing',
      ru: '1. Начальный возглас',
    },
    celebrant: 'Priest',
    rubric: {
      ja: '司祭は聖福音経をもって宝座の上に十字を描きて高声に言う：',
      en: 'The Priest makes the sign of the Cross with the Holy Gospel over the Altar Table and proclaims:',
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

  // 2. The Great Litany
  {
    id: 'lit-02-great-litany',
    order: 2,
    title: {
      ja: '2. 大連祷（平和の連祷）',
      en: '2. The Great Litany (Litany of Peace)',
      ru: '2. Великая (мирная) ектения',
    },
    celebrant: 'Deacon',
    rubric: {
      ja: '輔祭は聖障（イコノスタシス）前の中央ソレアに立ち、会衆と共に祈る：',
      en: 'The Deacon stands on the Soleas before the Royal Doors and leads the litany:',
      ru: 'Диакон исходит на амвон и возглашает ектению:',
    },
    text: {
      ja: `輔祭：平穏にして主を祈らん。
歌隊：主、憐れめよ。（Господи, помилуй / Lord, have mercy）
輔祭：天よりの平安と、我が霊の救いの為に、主を祈らん。
歌隊：主、憐れめよ。
輔祭：全世界の平和、神の聖なる諸教会の堅固と、総ての人の一致の為に、主を祈らん。
歌隊：主、憐れめよ。
輔祭：この聖堂と、信と虔みと神の畏れを以てここに入る者の為に、主を祈らん。
歌隊：主、憐れめよ。
輔祭：我が主教（教区主教の名）と、尊き司祭団、ハリストスにある輔祭団、教役者及び万民の為に、主を祈らん。
歌隊：主、憐れめよ。
輔祭：我が国の為、その執政者、万民の為に主を祈らん。
歌隊：主、憐れめよ。
輔祭：この都市（または村）、総ての都市、領土、並びに信仰をもてこれらに住まう者の為に、主を祈らん。
歌隊：主、憐れめよ。
輔祭：気候の順調、地上の産物の豊穣、並びに平穏なる季節の為に、主を祈らん。
歌隊：主、憐れめよ。
輔祭：水陸を旅する者、病める者、苦しむ者、囚われし者、並びにその救いの為に、主を祈らん。
歌隊：主、憐れめよ。
輔祭：一切の患難、忿怒、危難より救われん為に、主を祈らん。
歌隊：主、憐れめよ。
輔祭：神よ、爾の恩恵をもて我らを救い、憐れみ、助け、保ち給え。
歌隊：主、憐れめよ。
輔祭：至聖、至潔、至福、光栄ある我が女宰・生神女、何時も童女なるマリヤ、並びに諸聖人を記憶して、我ら己と互いと、我が総ての生命を、ハリストス神に献じ奉らん。
歌隊：爾に、主よ。（Тебе, Господи / To Thee, O Lord）
司祭（高声）：蓋し総ての光栄、敬礼、伏拝は、爾父と子と聖神に帰す、今もいつも世々に至るまで。
歌隊：アミン。`,
      en: `Deacon: In peace let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: For the peace from above and for the salvation of our souls, let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: For the peace of the whole world, for the stability of the holy churches of God, and for the unity of all, let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: For this holy house and for those who enter it with faith, reverence, and the fear of God, let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: For our Bishop, for the venerable priesthood, the diaconate in Christ, for all the clergy and the people, let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: For our country, its authorities, and for all who govern, let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: For this city, for every city and country, and for the faithful dwelling in them, let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: For seasonable weather, for abundance of the fruits of the earth, and for peaceful times, let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: For travelers by sea, land, and air, for the sick, the suffering, the captive, and for their salvation, let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: For our deliverance from all affliction, wrath, danger, and necessity, let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: Help us, save us, have mercy on us, and keep us, O God, by Thy grace.
Choir: Lord, have mercy.
Deacon: Commemorating our most holy, most pure, most blessed and glorious Lady, the Theotokos and Ever-Virgin Mary, with all the Saints, let us commend ourselves and one another, and all our life unto Christ our God.
Choir: To Thee, O Lord.
Priest: For unto Thee are due all glory, honor, and worship: to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages.
Choir: Amen.`,
      ru: `Диакон: Миром Господу помолимся.
Хор: Господи, помилуй.
Диакон: О свышнем мире и спасении душ наших, Господу помолимся.
Хор: Господи, помилуй.
Диакон: О мире всего мира, благостоянии святых Божиих церквей и соединении всех, Господу помолимся.
Хор: Господи, помилуй.
Диакон: О святем храме сем и с верою, благоговением и страхом Божиим входящих в онь, Господу помолимся.
Хор: Господи, помилуй.
Диакон: О архиерее нашем, честнем пресвитерстве, во Христе диаконстве, о всем причте и людех, Господу помолимся.
Хор: Господи, помилуй.
Диакон: О богохранимей стране нашей, властех и воинстве ея, Господу помолимся.
Хор: Господи, помилуй.
Диакон: О граде сем, всяком граде, стране и верою живущих в них, Господу помолимся.
Хор: Господи, помилуй.
Диакон: О благорастворении воздухов, о изобилии плодов земных и временех мирных, Господу помолимся.
Хор: Господи, помилуй.
Диакон: О плавающих, путешествующих, недугующих, страждущих, плененных и о спасении их, Господу помолимся.
Хор: Господи, помилуй.
Диакон: О избавитися нам от всякия скорби, гнева и нужды, Господу помолимся.
Хор: Господи, помилуй.
Диакон: Заступи, спаси, помилуй и сохрани нас, Боже, Твоею благодатию.
Хор: Господи, помилуй.
Диакон: Пресвятую, Пречистую, Преблагословенную, Славную Владычицу нашу Богородицу и Приснодеву Марию со всеми святыми помянувше, сами себе и друг друга, и весь живот наш Христу Богу предадим.
Хор: Тебе, Господи.
Иерей: Яко подобает Тебе всякая слава, честь и поклонение, Отцу и Сыну и Святому Духу, ныне и присно и во веки веков.
Хор: Аминь.`,
    },
  },

  // 3. First Antiphon (Psalm 102)
  {
    id: 'lit-03-first-antiphon',
    order: 3,
    title: {
      ja: '3. 第1応誦（詩篇102篇）',
      en: '3. The First Antiphon (Psalm 102)',
      ru: '3. Первый антифон (Псалом 102)',
    },
    celebrant: 'Choir',
    text: {
      ja: `我が霊よ、主を讃め揚げよ、我が内にある総ての者よ、その聖なる名を讃め揚げよ。
主を讃め揚げよ、我が霊よ、その恩恵を忘るるなかれ。
主は爾の総ての罪を赦し、爾の総ての病を癒し給う。
主は爾の生命を滅びより救い、慈愛と憐れみをもって爾に冠を戴かし給う。
憐れみと慈しみ深きかな主、忍耐長くして恵み豊かなり。
我が霊よ、主を讃め揚げよ、主は讃美せらる。`,
      en: `Bless the Lord, O my soul, and all that is within me, bless His holy Name!
Bless the Lord, O my soul, and forget not all His benefits.
Who forgives all your iniquities, Who heals all your diseases.
Who redeems your life from destruction, Who crowns you with lovingkindness and tender mercies.
The Lord is compassionate and merciful, long-suffering and plenteous in mercy.
Bless the Lord, O my soul, and blessed art Thou, O Lord!`,
      ru: `Благослови, душе моя, Господа, и вся внутренность моя имя святое Его.
Благослови, душе моя, Господа, и не забывай всех воздаяний Его.
Очищающаго вся беззакония твоя, исцеляющаго вся недуги твоя.
Избавляющаго от истления живот твой, венчающаго тя милостию и щедротами.
Щедр и милостив Господь, долготерпелив и многомилостив.
Благослови, душе моя, Господа, и благословен еси, Господи.`,
    },
  },

  // 4. The First Little Litany
  {
    id: 'lit-04-first-little-litany',
    order: 4,
    title: {
      ja: '4. 第1小連祷',
      en: '4. The First Little Litany',
      ru: '4. Малая ектения первая',
    },
    celebrant: 'Deacon',
    text: {
      ja: `輔祭：重ねて平穏にして主を祈らん。
歌隊：主、憐れめよ。
輔祭：神よ、爾の恩恵をもて我らを救い、憐れみ、助け、保ち給え。
歌隊：主、憐れめよ。
輔祭：至聖、至潔、至福、光栄ある我が女宰・生神女、何時も童女なるマリヤ、並びに諸聖人を記憶して、我ら己と互いと、我が総ての生命を、ハリストス神に献じ奉らん。
歌隊：爾に、主よ。
司祭（高声）：蓋し権能は爾のものにして、国と力と光栄は、爾父と子と聖神に帰す、今もいつも世々に至るまで。
歌隊：アミン。`,
      en: `Deacon: Again and again, in peace, let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: Help us, save us, have mercy on us, and keep us, O God, by Thy grace.
Choir: Lord, have mercy.
Deacon: Commemorating our most holy, most pure, most blessed and glorious Lady, the Theotokos and Ever-Virgin Mary, with all the Saints, let us commend ourselves and one another, and all our life unto Christ our God.
Choir: To Thee, O Lord.
Priest: For Thine is the dominion, and Thine is the kingdom, and the power, and the glory, of the Father, and of the Son, and of the Holy Spirit, now and ever, and unto ages of ages.
Choir: Amen.`,
      ru: `Диакон: Паки и паки миром Господу помолимся.
Хор: Господи, помилуй.
Диакон: Заступи, спаси, помилуй и сохрани нас, Боже, Твоею благодатию.
Хор: Господи, помилуй.
Диакон: Пресвятую, Пречистую, Преблагословенную, Славную Владычицу нашу Богородицу и Приснодеву Марию со всеми святыми помянувше, сами себе и друг друга, и весь живот наш Христу Богу предадим.
Хор: Тебе, Господи.
Иерей: Яко Твоя держава, и Твое есть Царство, и сила, и слава, Отца и Сына и Святаго Духа, ныне и присно и во веки веков.
Хор: Аминь.`,
    },
  },

  // 5. Second Antiphon & Only-Begotten Son
  {
    id: 'lit-05-second-antiphon',
    order: 5,
    title: {
      ja: '5. 第2応誦及び「独生の子」',
      en: '5. Second Antiphon & "Only-Begotten Son"',
      ru: '5. Второй антифон и песнь «Единородный Сыне»',
    },
    celebrant: 'Choir',
    text: {
      ja: `神の独生の子にして言なる主、不朽なる者よ、
我らの救いの為に、聖なる生神女、何時も童女なるマリヤより身を取り、
変ぜずして人となり、十字架に釘うたれ給いしハリストス神よ、
死をもて死を滅ぼし、至聖三位の一にして、父と聖神と共に崇め讃美せらるる主よ、我らを救い給え。`,
      en: `Only-begotten Son and immortal Word of God,
Who for our salvation didst will to be incarnate of the holy Theotokos and Ever-Virgin Mary,
Who without change didst become man and wast crucified, O Christ our God,
trampling down death by death, Who art one of the Holy Trinity, glorified with the Father and the Holy Spirit: save us!`,
      ru: `Единородный Сыне и Слове Божий, Безсмертен сый,
и изволивый спасения нашего ради воплотитися от Святыя Богородицы и Приснодевы Марии,
непреложно вочеловечивыйся, распныйся же, Христе Боже,
смертию смерть поправый, Един сый Святыя Троицы, спрославляемый Отцу и Святому Духу, спаси нас.`,
    },
  },

  // 6. The Second Little Litany
  {
    id: 'lit-06-second-little-litany',
    order: 6,
    title: {
      ja: '6. 第2小連祷',
      en: '6. The Second Little Litany',
      ru: '6. Малая ектения вторая',
    },
    celebrant: 'Deacon',
    text: {
      ja: `輔祭：重ねて平穏にして主を祈らん。
歌隊：主、憐れめよ。
輔祭：神よ、爾の恩恵をもて我らを救い、憐れみ、助け、保ち給え。
歌隊：主、憐れめよ。
輔祭：至聖、至潔、至福、光栄ある我が女宰・生神女、何時も童女なるマリヤ、並びに諸聖人を記憶して、我ら己と互いと、我が総ての生命を、ハリストス神に献じ奉らん。
歌隊：爾に、主よ。
司祭（高声）：蓋し爾は善にして人を愛する神なり、我らは爾に光栄を帰す、父と子と聖神に、今もいつも世々に至るまで。
歌隊：アミン。`,
      en: `Deacon: Again and again, in peace, let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: Help us, save us, have mercy on us, and keep us, O God, by Thy grace.
Choir: Lord, have mercy.
Deacon: Commemorating our most holy, most pure, most blessed and glorious Lady, the Theotokos and Ever-Virgin Mary, with all the Saints, let us commend ourselves and one another, and all our life unto Christ our God.
Choir: To Thee, O Lord.
Priest: For Thou art a good God and lovest mankind, and unto Thee do we send up glory: to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages.
Choir: Amen.`,
      ru: `Диакон: Паки и паки миром Господу помолимся.
Хор: Господи, помилуй.
Диакон: Заступи, спаси, помилуй и сохрани нас, Боже, Твоею благодатию.
Хор: Господи, помилуй.
Диакон: Пресвятую, Пречистую, Преблагословенную, Славную Владычицу нашу Богородицу и Приснодеву Марию со всеми святыми помянувше, сами себе и друг друга, и весь живот наш Христу Богу предадим.
Хор: Тебе, Господи.
Иерей: Яко Благ и Человеколюбец Бог еси, и Тебе славу возсылаем, Отцу и Сыну и Святому Духу, ныне и присно и во веки веков.
Хор: Аминь.`,
    },
  },

  // 7. Third Antiphon: The Beatitudes
  {
    id: 'lit-07-beatitudes',
    order: 7,
    title: {
      ja: '7. 第3応誦・真福九端（山上の垂訓）',
      en: '7. Third Antiphon: The Beatitudes',
      ru: '7. Третий антифон: Заповеди Блаженств',
    },
    celebrant: 'Choir',
    text: {
      ja: `爾の国において我らを記憶し給え、主よ、爾の国に来たる時に。
心の貧しき者は福なり、天国は彼らのものなればなり。
悲しむ者は福なり、彼らは慰めを得んとなればなり。
柔和なる者は福なり、彼らは地を嗣がんとなればなり。
義に飢え渇く者は福なり、彼らは飽くことを得んとなればなり。
憐れみある者は福なり、彼らは憐れみを得んとなればなり。
心の清き者は福なり、彼らは神を見んとなればなり。
和睦を致す者は福なり、彼らは神の子と名づけられんとなればなり。
義の為に窘めらるる者は福なり、天国は彼らのものなればなり。`,
      en: `In Thy Kingdom remember us, O Lord, when Thou comest into Thy Kingdom.
Blessed are the poor in spirit, for theirs is the Kingdom of Heaven.
Blessed are those who mourn, for they shall be comforted.
Blessed are the meek, for they shall inherit the earth.
Blessed are those who hunger and thirst after righteousness, for they shall be filled.
Blessed are the merciful, for they shall obtain mercy.
Blessed are the pure in heart, for they shall see God.
Blessed are the peacemakers, for they shall be called sons of God.
Blessed are those who are persecuted for righteousness’ sake, for theirs is the Kingdom of Heaven.`,
      ru: `Во Царствии Твоем помяни нас, Господи, егда приидеши во Царствии Твоем.
Блажени нищии духом, яко тех есть Царство Небесное.
Блажени плачущии, яко тии утешатся.
Блажени кротцыи, яко тии наследят землю.
Блажени алчущии и жаждущии правды, яко тии насытятся.
Блажени милостивии, яко тии помиловани будут.
Блажени чистии сердцем, яко тии Бога узрят.
Блажени миротворцы, яко тии сынове Божии нарекутся.
Блажени изгнани правды ради, яко тех есть Царство Небесное.`,
    },
  },

  // 8. The Small Entrance with the Holy Gospel
  {
    id: 'lit-08-small-entrance',
    order: 8,
    title: {
      ja: '8. 聖福音経 小進進堂',
      en: '8. The Small Entrance with the Holy Gospel',
      ru: '8. Малый вход с Евангелием',
    },
    celebrant: 'Priest',
    rubric: {
      ja: '司祭は聖福音経を高々と捧げ、王門中央より会衆に向かい発声す：',
      en: 'The Priest elevates the Holy Gospel in the Royal Doors and proclaims:',
      ru: 'Священник возносит Святое Евангелие в Царских вратах:',
    },
    text: {
      ja: `輔祭（又は司祭）：叡智、直ちにして起て！
歌隊：来たれ、伏してハリストスに拝せん。
死より復活せし神の子よ、爾に「アリルイヤ」と歌う我らを救い給え！
（続いて主日トロパリ・コンダクを歌う）`,
      en: `Deacon (or Priest): Wisdom! Stand upright!
Choir: Come, let us worship and fall down before Christ!
Save us, O Son of God, Who didst rise from the dead, who sing to Thee: Alleluia!
(Then follow the Troparia and Kontakia of the day)`,
      ru: `Диакон (или Иерей): Премудрость, прости!
Хор: Приидите, поклонимся и припадем ко Христу!
Спаси ны, Сыне Божий, воскресый из мертвых, поющия Ти: Аллилуиа!
(Затем поются дневные тропари и кондаки)`,
    },
  },

  // 9. Troparia & The Trisagion Hymn
  {
    id: 'lit-09-troparia-trisagion',
    order: 9,
    title: {
      ja: '9. 小讃詞・三聖讃（聖なる神）',
      en: '9. Troparia & The Trisagion Hymn',
      ru: '9. Тропари и Трисвятое',
    },
    celebrant: 'Choir',
    text: {
      ja: `司祭（高声）：蓋し爾は聖なり、我が神よ、我らは爾に光栄を帰す、父と子と聖神に、今もいつも、世々に至るまで。
歌隊：アミン。
聖なる神、聖なる勇力、聖なる不滅なる主、我等を憐れめよ。（三度）
光栄は父と子と聖神に帰す、今もいつも世々に至るまで、アミン。
聖なる不滅なる主、我等を憐れめよ。
聖なる神、聖なる勇力、聖なる不滅なる主、我等を憐れめよ。`,
      en: `Priest: For holy art Thou, O our God, and unto Thee do we send up glory: to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages.
Choir: Amen.
Holy God, Holy Mighty, Holy Immortal, have mercy on us! (Thrice)
Glory to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages. Amen.
Holy Immortal, have mercy on us!
Holy God, Holy Mighty, Holy Immortal, have mercy on us!`,
      ru: `Иерей: Яко свят еси, Боже наш, и Тебе славу возсылаем, Отцу и Сыну и Святому Духу, ныне и присно, и во веки веков.
Хор: Аминь.
Святый Боже, Святый Крепкий, Святый Безсмертный, помилуй нас. (Трижды)
Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков. Аминь.
Святый Безсмертный, помилуй нас.
Святый Боже, Святый Крепкий, Святый Безсмертный, помилуй нас.`,
    },
  },

  // 10. The Epistle & Gospel Readings
  {
    id: 'lit-10-readings',
    order: 10,
    title: {
      ja: '10. 使徒経・福音経の朗読',
      en: '10. The Epistle & Gospel Readings',
      ru: '10. Чтение Апостола и Евангелия',
    },
    celebrant: 'People',
    rubric: {
      ja: '誦経者が聖使徒経を会衆に向かい朗読し、続いて司祭が王門より聖福音経を朗読す：',
      en: 'The Reader chants the Epistle, followed by the chanting of the Holy Gospel from the Ambo:',
      ru: 'Чтец читает Апостол, затем священник провозглашает Святое Евангелие:',
    },
    text: {
      ja: `読経者：プロキメン...
（使徒経朗読）
歌隊：アリルイヤ、アリルイヤ、アリルイヤ。
司祭：叡智、直ちにして起て、聖福音経を聴け。平安は総ての人にあらん。
歌隊：かつ爾の霊と共に。
司祭：（福音記者名）に因る聖福音経の朗読。
歌隊：光栄は爾に帰す、主よ、光栄は爾に帰す！（Слава Тебе, Господи!）
（聖福音経が朗読される）
歌隊：光栄は爾に帰す、主よ、光栄は爾に帰す！`,
      en: `Reader: The Prokeimenon...
(The Epistle of the day is read)
Choir: Alleluia, Alleluia, Alleluia!
Priest: Wisdom! Stand upright! Let us hear the Holy Gospel. Peace be unto all.
Choir: And with your spirit.
Priest: The reading is from the Holy Gospel according to (Name).
Choir: Glory to Thee, O Lord, glory to Thee!
(The Holy Gospel is chanted)
Choir: Glory to Thee, O Lord, glory to Thee!`,
      ru: `Чтец: Прокимен...
(Чтение дневного Апостола)
Хор: Аллилуиа, Аллилуиа, Аллилуиа.
Иерей: Премудрость, прости, услышим Святаго Евангелия. Мир всем.
Хор: И духови твоему.
Иерей: От (имярек) Святаго Евангелия чтение.
Хор: Слава Тебе, Господи, слава Тебе!
(Читается дневное Евангелие)
Хор: Слава Тебе, Господи, слава Тебе!`,
    },
  },

  // 11. The Litany of Fervent Supplication (Augmented Litany)
  {
    id: 'lit-11-augmented-litany',
    order: 11,
    title: {
      ja: '11. 重連祷（緊祷・切なる祈りの連祷）',
      en: '11. The Litany of Fervent Supplication (Augmented Litany)',
      ru: '11. Сугубая ектения',
    },
    celebrant: 'Deacon',
    rubric: {
      ja: '福音経の朗読直後、輔祭はソレア中央にて全霊の祈りを唱え、会衆は「主憐れめよ」を三度ずつ歌う：',
      en: 'Directly after the Gospel, the Deacon intones the Augmented Litany, with threefold "Lord have mercy":',
      ru: 'По прочтении Евангелия диакон возглашает сугубую ектению:',
    },
    text: {
      ja: `輔祭：我ら全霊を尽くし、全思いを傾けて言わん。
歌隊：主、憐れめよ。
輔祭：全能なる主、我が父たちの神よ、祈り求めん、聴き憐れみ給え。
歌隊：主、憐れめよ。
輔祭：神よ、爾の大いなる慈悲に従いて我らを憐れみ給え、祈り求めん、聴き憐れみ給え。
歌隊：主、憐れめよ、主、憐れめよ、主、憐れめよ。（三度）
輔祭：又我が主教（教区主教の名）と、ハリストスにある我が全兄弟等の為に祈らん。
歌隊：主、憐れめよ。（三度）
輔祭：又我が国の為、その執政者、万民の為に祈らん。以て我ら静かに平安のうちに日を送り、敬虔と潔白を全うせんが為なり。
歌隊：主、憐れめよ。（三度）
輔祭：又この聖堂の建設者、諸恩人、並びに信仰のうちに眠りにつける我が先祖、父母、親族、正教の信徒らの永遠の安息と罪の赦しの為に祈らん。
歌隊：主、憐れめよ。（三度）
輔祭：又主の豊かなる慈悲を待ち望む信徒、並びに我らに代祷を求めし総ての人々の為に祈らん。
歌隊：主、憐れめよ。（三度）
司祭（高声）：蓋し爾は憐れみ深き、人を愛する神なり、我らは爾父と子と聖神に光栄を帰す、今もいつも世々に至るまで。
歌隊：アミン。`,
      en: `Deacon: Let us all say with all our soul and with all our mind, let us say:
Choir: Lord, have mercy.
Deacon: O Lord Almighty, God of our fathers, we pray Thee: hearken and have mercy!
Choir: Lord, have mercy.
Deacon: Have mercy on us, O God, according to Thy great mercy, we pray Thee: hearken and have mercy!
Choir: Lord, have mercy. Lord, have mercy. Lord, have mercy. (Thrice)
Deacon: Again we pray for our Bishop, and for all our brethren in Christ.
Choir: Lord, have mercy. (Thrice)
Deacon: Again we pray for our country, its authorities, and for all who govern, that we may lead a quiet and peaceable life in all godliness and honesty.
Choir: Lord, have mercy. (Thrice)
Deacon: Again we pray for the blessed and ever-memorable founders of this holy temple, and for all our fathers, mothers, brethren, and Orthodox Christians who have fallen asleep before us.
Choir: Lord, have mercy. (Thrice)
Deacon: Again we pray for mercy, life, peace, health, salvation, visitation, and forgiveness of sins for the servants of God, all Orthodox Christians dwelling in this city.
Choir: Lord, have mercy. (Thrice)
Priest: For Thou art a merciful God and lovest mankind, and unto Thee do we send up glory: to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages.
Choir: Amen.`,
      ru: `Диакон: Рцем вси от всея души, и от всего помышления нашего рцем.
Хор: Господи, помилуй.
Диакон: Господи Вседержителю, Боже отец наших, молимтися, услыши и помилуй.
Хор: Господи, помилуй.
Диакон: Помилуй нас, Боже, по велицей милости Твоей, молимтися, услыши и помилуй.
Хор: Господи, помилуй. (Трижды)
Диакон: Еще молимся о архиерее нашем, и о всей во Христе братии нашей.
Хор: Господи, помилуй. (Трижды)
Диакон: Еще молимся о богохранимей стране нашей, властех и воинстве ея, да тихое и безмолвное житие поживем во всяком благочестии и чистоте.
Хор: Господи, помилуй. (Трижды)
Диакон: Еще молимся о блаженных и приснопамятных создателех святаго храма сего, и о всех прежде почивших отцех и братиях наших, зде лежащих и повсюду православных.
Хор: Господи, помилуй. (Трижды)
Диакон: Еще молимся о милости, жизни, мире, здравии, спасении, посещении, прощении и оставлении грехов рабов Божиих, прихожан святаго храма сего.
Хор: Господи, помилуй. (Трижды)
Иерей: Яко Милостив и Человеколюбец Бог еси, и Тебе славу возсылаем, Отцу и Сыну и Святому Духу, ныне и присно и во веки веков.
Хор: Аминь.`,
    },
  },

  // 12. The Litany of the Catechumens
  {
    id: 'lit-12-catechumens',
    order: 12,
    title: {
      ja: '12. 学習者の連祷及び退堂（信徒の礼儀の開始）',
      en: '12. Litany of the Catechumens & Dismissal',
      ru: '12. Ектения об оглашенных',
    },
    celebrant: 'Deacon',
    rubric: {
      ja: '洗礼準備中にある者のための祈祷。この後、古来の式順に従い「信徒の礼儀」へ入る：',
      en: 'Prayer for those preparing for Holy Baptism, followed by dismissal of the catechumens:',
      ru: 'Молитва о готовящихся ко святому Крещению и переход к Литургии верных:',
    },
    text: {
      ja: `輔祭：学習者よ、主を祈れ。
歌隊：主、憐れめよ。
輔祭：信徒よ、学習者の為に祈らん、主彼らを憐れみ給わんことを。
歌隊：主、憐れめよ。
輔祭：彼らに真理の言（ことば）を教え給わんことを。
歌隊：主、憐れめよ。
輔祭：彼らに義の福音を啓き給わんことを。
歌隊：主、憐れめよ。
輔祭：彼らを聖なる公なる使徒の教会に合一し給わんことを。
歌隊：主、憐れめよ。
輔祭：神よ、爾の恩恵をもて彼らを救い、憐れみ、助け、保ち給え。
歌隊：主、憐れめよ。
輔祭：学習者よ、主に向かいて頭を垂れよ。
歌隊：爾に、主よ。
司祭（高声）：以て彼らも我らと共に、尊き光栄ある爾の至聖なる御名、父と子と聖神を讃美せん、今もいつも世々に至るまで。
歌隊：アミン。
輔祭：学習者たる者は悉く退け！ 学習者よ退け！ 学習者たる者は何人も止まる勿れ！ 信徒たる我ら、重ねて平穏にして主を祈らん。
歌隊：主、憐れめよ。`,
      en: `Deacon: Pray to the Lord, ye catechumens.
Choir: Lord, have mercy.
Deacon: Ye faithful, let us pray for the catechumens, that the Lord may have mercy on them.
Choir: Lord, have mercy.
Deacon: That He may teach them the Word of Truth.
Choir: Lord, have mercy.
Deacon: That He may reveal to them the Gospel of righteousness.
Choir: Lord, have mercy.
Deacon: That He may unite them to His Holy, Catholic, and Apostolic Church.
Choir: Lord, have mercy.
Deacon: Help them, save them, have mercy on them, and keep them, O God, by Thy grace.
Choir: Lord, have mercy.
Deacon: Bow your heads unto the Lord, ye catechumens.
Choir: To Thee, O Lord.
Priest: That they also with us may glorify Thy most honorable and majestic Name: of the Father, and of the Son, and of the Holy Spirit, now and ever, and unto ages of ages.
Choir: Amen.
Deacon: All that are catechumens, depart! Catechumens, depart! Let no catechumens remain! As many as are of the faithful, again and again in peace let us pray to the Lord.
Choir: Lord, have mercy.`,
      ru: `Диакон: Помолитеся, оглашеннии, Господеви.
Хор: Господи, помилуй.
Диакон: Вернии, о оглашенных помолимся, да Господь помилует их.
Хор: Господи, помилуй.
Диакон: Огласит их словом истины.
Хор: Господи, помилуй.
Диакон: Открыет им Евангелие правды.
Хор: Господи, помилуй.
Диакон: Соединит их Святей Своей, Соборней и Апостольстей Церкви.
Хор: Господи, помилуй.
Диакон: Заступи, спаси, помилуй и сохрани их, Боже, Твоею благодатию.
Хор: Господи, помилуй.
Диакон: Оглашеннии, главы ваша Господеви приклоните.
Хор: Тебе, Господи.
Иерей: Да и тии с нами славят пречестное и великолепое имя Твое, Отца и Сына и Святаго Духа, ныне и присно и во веки веков.
Хор: Аминь.
Диакон: Елицы оглашеннии, изыдите; оглашеннии, изыдите; елицы оглашеннии, изыдите. Да никто от оглашенных, елицы вернии, паки и паки миром Господу помолимся.
Хор: Господи, помилуй.`,
    },
  },

  // 13. The Two Litanies of the Faithful
  {
    id: 'lit-13-faithful-litanies',
    order: 13,
    title: {
      ja: '13. 信徒の連祷（大進進堂前の祈願）',
      en: '13. The Two Litanies of the Faithful',
      ru: '13. Две ектении верных',
    },
    celebrant: 'Deacon',
    text: {
      ja: `輔祭：神よ、爾の恩恵をもて我らを救い、憐れみ、助け、保ち給え。
歌隊：主、憐れめよ。
輔祭：叡智！
司祭（高声）：蓋し総ての光栄、敬礼、伏拝は、爾父と子と聖神に帰す、今もいつも世々に至るまで。
歌隊：アミン。
輔祭：重ねて平穏にして主を祈らん。
歌隊：主、憐れめよ。
輔祭：神よ、爾の恩恵をもて我らを救い、憐れみ、助け、保ち給え。
歌隊：主、憐れめよ。
輔祭：叡智！
司祭（高声）：以て我等常に爾の権能に守られて、爾父と子と聖神に光栄を帰せん、今もいつも世々に至るまで。
歌隊：アミン。`,
      en: `Deacon: Help us, save us, have mercy on us, and keep us, O God, by Thy grace.
Choir: Lord, have mercy.
Deacon: Wisdom!
Priest: For unto Thee are due all glory, honor, and worship: to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages.
Choir: Amen.
Deacon: Again and again in peace, let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: Help us, save us, have mercy on us, and keep us, O God, by Thy grace.
Choir: Lord, have mercy.
Deacon: Wisdom!
Priest: That guarded always by Thy might, we may ascribe glory unto Thee: to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages.
Choir: Amen.`,
      ru: `Диакон: Заступи, спаси, помилуй и сохрани нас, Боже, Твоею благодатию.
Хор: Господи, помилуй.
Диакон: Премудрость.
Иерей: Яко подобает Тебе всякая слава, честь и поклонение, Отцу и Сыну и Святому Духу, ныне и присно и во веки веков.
Хор: Аминь.
Диакон: Паки и паки миром Господу помолимся.
Хор: Господи, помилуй.
Диакон: Заступи, спаси, помилуй и сохрани нас, Боже, Твоею благодатию.
Хор: Господи, помилуй.
Диакон: Премудрость.
Иерей: Яко да под державою Твоею всегда храними, Тебе славу возсылаем, Отцу и Сыну и Святому Духу, ныне и присно и во веки веков.
Хор: Аминь.`,
    },
  },

  // 14. The Cherubic Hymn & Great Entrance
  {
    id: 'lit-14-cherubic-hymn',
    order: 14,
    title: {
      ja: '14. ヘルヴィムの歌・大進進堂',
      en: '14. The Cherubic Hymn & The Great Entrance',
      ru: '14. Херувимская песнь и Великий вход',
    },
    celebrant: 'Choir',
    rubric: {
      ja: '司祭はパンとぶどう酒の尊い聖器物を高く捧げ持ち、北門より聖堂内を行道して王門に入り、宝座に置く：',
      en: 'The Holy Gifts are carried in solemn procession through the nave to the Holy Table:',
      ru: 'Перенесение Честных Даров с Жертвенника на Престол через солею:',
    },
    text: {
      ja: `歌隊：我等ヘルヴィムを目に見えず象り、生命を施す三位に三聖の歌を歌いて、
今世の憂いを悉く退くべし。

（司祭・輔祭が聖堂内を行道し、主教・教区・信徒一同の救いを高らかに祈願す）
司祭：我らの主教（名）、我が国、執政者、並びに総ての正教の信徒らを、主神はその国において記憶し給え、常に今もいつも世々に至るまで。
歌隊：アミン。
天軍を目に見えず帯同せる万民の王を迎え奉らんが為なり。
アリルイヤ、アリルイヤ、アリルイヤ。`,
      en: `Choir: Let us who mystically represent the Cherubim,
and who sing the thrice-holy hymn to the life-creating Trinity,
now lay aside all earthly cares.

(The Great Entrance procession takes place through the church)
Priest: Our Bishop (Name), our country, its authorities, and all Orthodox Christians, may the Lord God remember in His Kingdom, always, now and ever, and unto ages of ages.
Choir: Amen.
That we may receive the King of All, who comes invisibly escorted by the angelic hosts.
Alleluia, Alleluia, Alleluia!`,
      ru: `Хор: Иже Херувимы тайно образующе,
и животворящей Троице трисвятую песнь припевающе,
всякое ныне житейское отложим попечение.

(Совершается Великий вход с Честными Дарами)
Иерей: Архиерея нашего (имярек), богохранимую страну нашу, и всех вас православных христиан да помянет Господь Бог во Царствии Своем, всегда, ныне и присно и во веки веков.
Хор: Аминь.
Яко да Царя всех подымем, ангельскими невидимо дориносима чинми.
Аллилуиа, Аллилуиа, Аллилуиа.`,
    },
  },

  // 15. The Litany of Supplication after the Great Entrance
  {
    id: 'lit-15-petitional-litany',
    order: 15,
    title: {
      ja: '15. 大進進堂後の懇祷（「主よ、与え給え」）',
      en: '15. The Litany of Supplication (Petitional Litany)',
      ru: '15. Просительная ектения по Великом входе',
    },
    celebrant: 'Deacon',
    rubric: {
      ja: '聖器物が宝座に据えられた後、輔祭は会衆と共に「主よ、与え給え」を唱和する懇祷を捧ぐ：',
      en: 'After the Gifts are placed upon the Holy Table, the Deacon intones the petitions, answered with "Grant this, O Lord":',
      ru: 'Диакон возглашает просительную ектению с припевом «Подай, Господи»:',
    },
    text: {
      ja: `輔祭：主への祈りを満たさん。
歌隊：主、憐れめよ。
輔祭：捧げられたる尊き賜物の為に、主を祈らん。
歌隊：主、憐れめよ。
輔祭：この聖堂と、信と虔みと神の畏れを以てここに入る者の為に、主を祈らん。
歌隊：主、憐れめよ。
輔祭：一切の患難、忿怒、危難より救われん為に、主を祈らん。
歌隊：主、憐れめよ。
輔祭：神よ、爾の恩恵をもて我らを救い、憐れみ、助け、保ち給え。
歌隊：主、憐れめよ。
輔祭：この日を全き、聖なる、平安なる、無罪なるものならしめんことを、主より求めん。
歌隊：主よ、与え給え。（Подай, Господи / Grant this, O Lord）
輔祭：平和の天使、忠実なる導き手、我が霊と肉体の守護者を、主より求めん。
歌隊：主よ、与え給え。
輔祭：我が罪過の赦しと免除を、主より求めん。
歌隊：主よ、与え給え。
輔祭：我が霊に善きことと、全世界の平和を、主より求めん。
歌隊：主よ、与え給え。
輔祭：我が余生を平安と痛悔のうちに全うせんことを、主より求めん。
歌隊：主よ、与え給え。
輔祭：我が生涯のハリストス教徒たる無痛の、恥ずかしからざる、平安なる終焉と、ハリストスの畏るべき審判廷における良き弁明を、主より求めん。
歌隊：主よ、与え給え。
輔祭：至聖、至潔、至福、光栄ある我が女宰・生神女、何時も童女なるマリヤ、並びに諸聖人を記憶して、我ら己と互いと、我が総ての生命を、ハリストス神に献じ奉らん。
歌隊：爾に、主よ。
司祭（高声）：蓋し独生の御子の仁愛によりて、爾は彼及び至聖、至善、生命を施す聖神と共に讃美せらる、今もいつも世々に至るまで。
歌隊：アミン。`,
      en: `Deacon: Let us complete our prayer unto the Lord.
Choir: Lord, have mercy.
Deacon: For the precious Gifts now offered, let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: For this holy house, and for those who enter it with faith, reverence, and the fear of God, let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: For our deliverance from all affliction, wrath, danger, and necessity, let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: Help us, save us, have mercy on us, and keep us, O God, by Thy grace.
Choir: Lord, have mercy.
Deacon: That the whole day may be perfect, holy, peaceful, and sinless, let us ask of the Lord.
Choir: Grant this, O Lord.
Deacon: An angel of peace, a faithful guide, a guardian of our souls and bodies, let us ask of the Lord.
Choir: Grant this, O Lord.
Deacon: Pardon and remission of our sins and transgressions, let us ask of the Lord.
Choir: Grant this, O Lord.
Deacon: All things that are good and profitable for our souls, and peace for the world, let us ask of the Lord.
Choir: Grant this, O Lord.
Deacon: That we may complete the remaining time of our life in peace and repentance, let us ask of the Lord.
Choir: Grant this, O Lord.
Deacon: A Christian ending to our life: painless, blameless, and peaceful; and a good defense before the dread judgment seat of Christ, let us ask.
Choir: Grant this, O Lord.
Deacon: Commemorating our most holy, most pure, most blessed and glorious Lady, the Theotokos and Ever-Virgin Mary, with all the Saints, let us commend ourselves and one another, and all our life unto Christ our God.
Choir: To Thee, O Lord.
Priest: Through the compassions of Thine Only-begotten Son, with Whom Thou art blessed, together with Thine all-holy, good, and life-creating Spirit, now and ever, and unto ages of ages.
Choir: Amen.`,
      ru: `Диакон: Исполним молитву нашу Господеви.
Хор: Господи, помилуй.
Диакон: О предложенных Честных Дарех, Господу помолимся.
Хор: Господи, помилуй.
Диакон: О святем храме сем, и с верою, благоговением и страхом Божиим входящих в онь, Господу помолимся.
Хор: Господи, помилуй.
Диакон: О избавитися нам от всякия скорби, гнева и нужды, Господу помолимся.
Хор: Господи, помилуй.
Диакон: Заступи, спаси, помилуй и сохрани нас, Боже, Твоею благодатию.
Хор: Господи, помилуй.
Диакон: Дне всего совершенна, свята, мирна и безгрешна, у Господа просим.
Хор: Подай, Господи.
Диакон: Ангела мирна, верна наставника, хранителя душ и телес наших, у Господа просим.
Хор: Подай, Господи.
Диакон: Прощения и оставления грехов и прегрешений наших, у Господа просим.
Хор: Подай, Господи.
Диакон: Добрых и полезных душам нашим, и мира мирови, у Господа просим.
Хор: Подай, Господи.
Диакон: Прочее время живота нашего в мире и покаянии скончати, у Господа просим.
Хор: Подай, Господи.
Диакон: Христианския кончины живота нашего, безболезнены, непостыдны, мирны, и добраго ответа на Страшнем Судищи Христове, просим.
Хор: Подай, Господи.
Диакон: Пресвятую, Пречистую, Преблагословенную, Славную Владычицу нашу Богородицу и Приснодеву Марию со всеми святыми помянувше, сами себе и друг друга, и весь живот наш Христу Богу предадим.
Хор: Тебе, Господи.
Иерей: Щедротами Единороднаго Сына Твоего, с Нимже благословен еси, со Пресвятым и Благим и Животворящим Твоим Духом, ныне и присно и во веки веков.
Хор: Аминь.`,
    },
  },

  // 16. The Kiss of Peace and The Creed
  {
    id: 'lit-16-creed',
    order: 16,
    title: {
      ja: '16. 和解の挨拶及び信経（信仰の告白）',
      en: '16. The Kiss of Peace & The Nicene Creed',
      ru: '16. Целование мира и Символ веры',
    },
    celebrant: 'All',
    text: {
      ja: `司祭：平安は総ての人にあらん。
歌隊：かつ爾の霊と共に。
輔祭：互いに愛し合いて、一致して言い表さん。
歌隊：父と子と聖神、同体の別れざる三位を。
司祭：門を、門を、叡智をもって注意せよ！
会衆（一同）：
我信ず、唯一の神・全能の父、天と地、見ゆる天地の総てを造りし主を。
又信ず、唯一の主イイスス・ハリストス、神の独生の子、世々に先だちて父より生まれ、光よりの光、真実の神よりの真実の神、生まれし者にて造られしに非ず、父と一体にして、万物彼に造られ、
我等名々の為、又我等の救いの為に天より降り、聖神及び童女マリヤより身を取りて人となり、
我等の為にポンティオ・ピラトの時に十字架に釘うたれ、苦しみを受け、葬られ、
聖書に相合いて第三日に復活し、天に昇り、父の右に座し、
光栄を顕して生ける者と死せし者を審判する為に還幸すべし、その国は終りなからん。
又信ず、聖神、主、生命を施す者、父より出で、父及び子と共に拝まれ讃美せられ、預言者を以て言わしめし主を。
又信ず、一なる聖なる公なる使徒の教会を。
我言い表す、唯一の洗礼、以て罪の赦しを得ることを。
我望む、死人の復活、並びに来世の生命を。アミン。`,
      en: `Priest: Peace be unto all.
Choir: And with your spirit.
Deacon: Let us love one another, that with one mind we may confess:
Choir: Father, Son, and Holy Spirit: the Trinity, one in essence and undivided!
Priest: The doors! The doors! In wisdom let us be attentive!
All the People:
I believe in one God, Father Almighty, Maker of heaven and earth, and of all things visible and invisible.
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
      ru: `Иерей: Мир всем.
Хор: И духови твоему.
Диакон: Возлюбим друг друга, да единомыслием исповемы:
Хор: Отца и Сына и Святаго Духа, Троицу Единосущную и Нераздельную.
Иерей: Двери, двери, премудростию вонмем!
Верую во единаго Бога Отца, Вседержителя, Творца небу и земли, видимым же всем и невидимым.
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

  // 17. The Eucharistic Canon (Anaphora)
  {
    id: 'lit-17-anaphora',
    order: 17,
    title: {
      ja: '17. 聖変化の感謝祈祷（アナフォラ）',
      en: '17. The Eucharistic Canon (Anaphora)',
      ru: '17. Евхаристический канон (Анафора)',
    },
    celebrant: 'Priest',
    text: {
      ja: `輔祭：慎み直ちにして起ち、畏れをもて起ち、注意して聖なる奉献を平和のうちに献ぐべし。
歌隊：平和の憐れみ、讃美の犠牲。
司祭：主イイスス・ハリストスの恩恵と、神父の愛と、聖神の交わりとは、爾等総ての人と共に在らん。
歌隊：かつ爾の霊と共に。
司祭：心を高く挙ぐべし。
歌隊：主に向かいて持ちて仰ぐ。
司祭：主に感謝すべし。
歌隊：父と子と聖神、同体の別れざる三位に伏し拝むは、礼に合いて正しきなり。
司祭（高声）：勝鬨の歌を歌い、叫び、呼ばわり、言う：
歌隊：聖なるかな、聖なるかな、聖なるかな、万軍の主、天も地も爾の光栄に満てり。いと高き所にホサンナ、主の御名によりて来たる者は讃美せらる、いと高き所にホサンナ！`,
      en: `Deacon: Let us stand upright! Let us stand with fear! Let us attend, that we may offer the Holy Oblation in peace!
Choir: A mercy of peace, a sacrifice of praise!
Priest: The grace of our Lord Jesus Christ, and the love of God the Father, and the communion of the Holy Spirit be with you all.
Choir: And with your spirit.
Priest: Let us lift up our hearts.
Choir: We lift them up unto the Lord.
Priest: Let us give thanks unto the Lord.
Choir: It is proper and right to worship the Father, and the Son, and the Holy Spirit: the Trinity, one in essence and undivided.
Priest: Singing the triumphal hymn, shouting, crying aloud, and saying:
Choir: Holy, Holy, Holy, Lord of Sabaoth! Heaven and earth are full of Thy glory! Hosanna in the highest! Blessed is He that comes in the name of the Lord! Hosanna in the highest!`,
      ru: `Диакон: Станем добре, станем со страхом, вонмем, святое возношение в мире приносити.
Хор: Милость мира, жертву хваления.
Иерей: Благодать Господа нашего Иисуса Христа, и любы Бога и Отца, и причастие Святаго Духа буди со всеми вами.
Хор: И со духом твоим.
Иерей: Горе имеем сердца.
Хор: Имамы ко Господу.
Иерей: Благодарим Господа.
Хор: Достойно и праведно есть покланятися Отцу и Сыну и Святому Духу, Троице Единосущней и Нераздельней.
Иерей: Победную песнь поюще, вопиюще, взывающе и глаголюще:
Хор: Свят, Свят, Свят Господь Саваоф, исполнь небо и земля славы Твоея; осанна в вышних, благословен Грядый во имя Господне, осанна в вышних.`,
    },
  },

  // 18. The Epiclesis (Consecration of Holy Gifts)
  {
    id: 'lit-18-epiclesis',
    order: 18,
    title: {
      ja: '18. 聖神降臨祈祷と聖変化（エピクレーシス）',
      en: '18. The Epiclesis (Consecration of Holy Gifts)',
      ru: '18. Освящение Честных Даров (Эпиклеза)',
    },
    celebrant: 'Priest',
    rubric: {
      ja: '司祭はひざまずき、パンと葡萄酒に聖十字を結びて聖神の降臨を祈る：',
      en: 'The Priest blesses the Holy Gifts, praying for the descent of the Holy Spirit:',
      ru: 'Священник благословляет хлеб и чашу, молясь о наитии Святаго Духа:',
    },
    text: {
      ja: `司祭（高声）：取りて食らえ、是れ我が身にして、爾等の為に割かれ、罪の赦しを得せしむるものなり。
歌隊：アミン。
司祭（高声）：皆これを飲め、是れ我が血にして新約のものなり、爾等及び多くの人の為に流され、罪の赦しを得せしむるものなり。
歌隊：アミン。
司祭：爾のものを爾のものよりして、総ての為に、総てにおいて爾に献ず。
歌隊：爾を讃美し、爾を祝し、爾に感謝し、我が神よ、爾に祈る。
司祭（密祷）：このパンを爾のハリストスの尊き体となし、この杯の中にあるものを爾のハリストスの尊き血となし、爾の聖神をもてこれを変じ給え。
輔祭：アミン、アミン、アミン。`,
      en: `Priest: Take, eat: this is My Body, which is broken for you unto the remission of sins.
Choir: Amen.
Priest: Drink of it, all of you: this is My Blood of the New Testament, which is shed for you and for many, unto the remission of sins.
Choir: Amen.
Priest: Thine own of Thine own we offer unto Thee, in behalf of all and for all!
Choir: We praise Thee, we bless Thee, we give thanks unto Thee, O Lord, and we pray unto Thee, our God!
Priest: And make this bread the precious Body of Thy Christ, and that which is in this cup the precious Blood of Thy Christ, making the change by Thy Holy Spirit!
Deacon: Amen, Amen, Amen.`,
      ru: `Иерей: Приимите, ядите, сие есть Тело Мое, еже за вы ломимое во оставление грехов.
Хор: Аминь.
Иерей: Пийте от нея вси, сия есть Кровь Моя Новаго Завета, яже за вы и за многия изливаемая во оставление грехов.
Хор: Аминь.
Иерей: Твоя от Твоих Тебе приносяще о всех и за вся.
Хор: Тебе поем, Тебе благословим, Тебе благодарим, Господи, и молимтися, Боже наш.
Иерей: И сотвори убо хлеб сей Честное Тело Христа Твоего. А еже в чаши сей, Честную Кровь Христа Твоего. Преложив Духом Твоим Святым.
Диакон: Аминь, аминь, аминь.`,
    },
  },

  // 19. Megalynarion to the Mother of God (Axion Estin)
  {
    id: 'lit-19-axion-estin',
    order: 19,
    title: {
      ja: '19. 生神女への讃歌（常に福にして）',
      en: '19. Hymn to the Theotokos (Axion Estin / It is Truly Meet)',
      ru: '19. Достойно есть (Песнь Пресвятой Богородице)',
    },
    celebrant: 'Choir',
    text: {
      ja: `司祭（高声）：別して至聖、至潔、至福、光栄ある我が女宰・生神女、何時も童女なるマリヤの前に。
歌隊：
常に福にして全き潔白、我が神の母なる生神女を福となすは、真に礼に合えり。
ヘルヴィムより尊く、セラフィムに並びなく栄え、
貞潔を壊たずして神なる言を生みし、実の生神女たる爾を崇め讃む。`,
      en: `Priest: Especially for our most holy, most pure, most blessed and glorious Lady, the Theotokos and Ever-Virgin Mary:
Choir:
It is truly meet to bless thee, O Theotokos, ever-blessed and most pure, and the Mother of our God.
More honorable than the Cherubim, and more glorious beyond compare than the Seraphim,
without defilement thou gavest birth to God the Word: true Theotokos, we magnify thee!`,
      ru: `Иерей: Изрядно о Пресвятей, Пречистей, Преблагословенней, Славней Владычице нашей Богородице и Приснодеве Марии.
Хор:
Достойно есть яко воистину блажити Тя Богородицу, Присноблаженную и Пренепорочную и Матерь Бога нашего.
Честнейшую Херувим и славнейшую без сравнения Серафим,
без истления Бога Слова рождшую, сущую Богородицу Тя величаем.`,
    },
  },

  // 20. Litany before the Lord's Prayer
  {
    id: 'lit-20-litany-before-our-father',
    order: 20,
    title: {
      ja: '20. 主の祈り前の懇祷（天の父を呼ぶ備え）',
      en: '20. Litany before The Lord’s Prayer',
      ru: '20. Ектения пред Отче наш',
    },
    celebrant: 'Deacon',
    text: {
      ja: `輔祭：総ての聖人を記憶して、重ねて平穏にして主を祈らん。
歌隊：主、憐れめよ。
輔祭：捧げられ成聖せられたる尊き賜物の為に、主を祈らん。
歌隊：主、憐れめよ。
輔祭：人を愛する我らの神、これをその天なる精神的なる香壇に、霊の馨しき薫りとして受け容れ、返礼として神の恩恵と聖神の賜物とを我らに下し給わんが為に、主を祈らん。
歌隊：主、憐れめよ。
輔祭：一切の患難、忿怒、危難より救われん為に、主を祈らん。
歌隊：主、憐れめよ。
輔祭：神よ、爾の恩恵をもて我らを救い、憐れみ、助け、保ち給え。
歌隊：主、憐れめよ。
輔祭：この日を全き、聖なる、平安なる、無罪なるものならしめんことを、主より求めん。
歌隊：主よ、与え給え。
輔祭：平和の天使、忠実なる導き手を、主より求めん。
歌隊：主よ、与え給え。
輔祭：我が罪過の赦しを、主より求めん。
歌隊：主よ、与え給え。
輔祭：信仰の一致と、聖神の交わりとを求めて、我ら己と互いと、我が総ての生命を、ハリストス神に献じ奉らん。
歌隊：爾に、主よ。`,
      en: `Deacon: Having remembered all the Saints, again and again in peace let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: For the precious Gifts offered and consecrated, let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: That our God, Who loveth mankind, receiving them upon His holy, heavenly, and noetic altar as a sweet spiritual fragrance, may send down upon us in return His divine grace and the gift of the Holy Spirit, let us pray.
Choir: Lord, have mercy.
Deacon: For our deliverance from all affliction, wrath, danger, and necessity, let us pray to the Lord.
Choir: Lord, have mercy.
Deacon: Help us, save us, have mercy on us, and keep us, O God, by Thy grace.
Choir: Lord, have mercy.
Deacon: That the whole day may be perfect, holy, peaceful, and sinless, let us ask of the Lord.
Choir: Grant this, O Lord.
Deacon: An angel of peace, a faithful guide, a guardian of our souls and bodies, let us ask of the Lord.
Choir: Grant this, O Lord.
Deacon: Having asked for the unity of the faith and the communion of the Holy Spirit, let us commend ourselves and one another, and all our life unto Christ our God.
Choir: To Thee, O Lord.`,
      ru: `Диакон: Вся святыя помянувше, паки и паки миром Господу помолимся.
Хор: Господи, помилуй.
Диакон: О принесенных и освященных Честных Дарех, Господу помолимся.
Хор: Господи, помилуй.
Диакон: Яко да Человеколюбец Бог наш, прием я во святый и пренебесный и мысленный Свой жертвенник, в воню благоухания духовнаго, возниспослет нам божественную благодать и дар Святаго Духа, помолимся.
Хор: Господи, помилуй.
Диакон: О избавитися нам от всякия скорби, гнева и нужды, Господу помолимся.
Хор: Господи, помилуй.
Диакон: Заступи, спаси, помилуй и сохрани нас, Боже, Твоею благодатию.
Хор: Господи, помилуй.
Диакон: Дне всего совершенна, свята, мирна и безгрешна, у Господа просим.
Хор: Подай, Господи.
Диакон: Соединение веры и причастие Святаго Духа испросивше, сами себе и друг друга, и весь живот наш Христу Богу предадим.
Хор: Тебе, Господи.`,
    },
  },

  // 21. The Lord's Prayer
  {
    id: 'lit-21-our-father',
    order: 21,
    title: {
      ja: '21. 主の祈り（天におらるる我らの父よ）',
      en: '21. The Lord’s Prayer',
      ru: '21. Молитва Господня (Отче наш)',
    },
    celebrant: 'All',
    text: {
      ja: `司祭：我等をして憚ることなく、咎められず、敢えて天の神、爾父を呼びて言わしめ給え：
会衆（一同）：
天におらるる我らの父よ、願わくは爾の名は聖とせられ、爾の国は来たり、爾の旨は天に行わるるが如く地にも行われん。
我が日用の糧を今日我らに与え給え。
我らに負い目ある者を我らが赦すが如く、我らの負い目を赦し給え。
我らを誘惑に導かず、なお我らを凶悪より救い給え。
司祭：蓋し国と権能と光栄は、爾父と子と聖神に世々に帰す。
歌隊：アミン。
司祭：平安は総ての人にあらん。
歌隊：かつ爾の霊と共に。
輔祭：主に向かいて頭を垂れよ。
歌隊：爾に、主よ。`,
      en: `Priest: And make us worthy, O Master, that with boldness and without condemnation we may dare to call upon Thee, the heavenly God, as Father, and to say:
All the People:
Our Father, Who art in heaven, hallowed be Thy name. Thy kingdom come, Thy will be done, on earth as it is in heaven.
Give us this day our daily bread, and forgive us our debts, as we forgive our debtors;
and lead us not into temptation, but deliver us from evil.
Priest: For Thine is the kingdom and the power and the glory, of the Father, and of the Son, and of the Holy Spirit, now and ever, and unto ages of ages.
Choir: Amen.
Priest: Peace be unto all.
Choir: And with your spirit.
Deacon: Bow your heads unto the Lord.
Choir: To Thee, O Lord.`,
      ru: `Иерей: И сподоби нас, Владыко, со дерзновением, неосужденно смети призывати Тебе Небеснаго Бога Отца, и глаголати:
Все молящиеся:
Отче наш, Иже еси на небесех! Да святится имя Твое, да приидет Царствие Твое, да будет воля Твоя, яко на небеси и на земли.
Хлеб наш насущный даждь нам днесь; и остави нам долги наша, якоже и мы оставляем должником нашим;
и не введи нас во искушение, но избави нас от лукаваго.
Иерей: Яко Твое есть Царство и сила и слава Отца и Сына и Святаго Духа ныне и присно и во веки веков.
Хор: Аминь.
Иерей: Мир всем.
Хор: И духови твоему.
Диакон: Главы ваша Господеви приклоните.
Хор: Тебе, Господи.`,
    },
  },

  // 22. The Elevation and Holy Communion
  {
    id: 'lit-22-communion',
    order: 22,
    title: {
      ja: '22. 聖体挙揚及び信徒の領聖（聖体拝領）',
      en: '22. Holy Communion',
      ru: '22. Причащение Святых Таин',
    },
    celebrant: 'Priest',
    rubric: {
      ja: '司祭は尊い身肉を高く掲げて言う。続いて聖杯を掲げて王門より出で、信徒が敬虔に進み出る：',
      en: 'The Priest elevates the Lamb, then emerges with the Holy Chalice from the Royal Doors:',
      ru: 'Священник возносит Святый Агнец, затем исходит с Чашей к прихожанам:',
    },
    text: {
      ja: `司祭：聖なる者は聖なる者に！
歌隊：唯一聖、唯一主イイスス・ハリストス、神父の光栄に在り。アミン。
（聖歌隊が領聖頌を歌い、信徒が領聖祈祷文「主よ、我信ず、また言い表す...」を唱えて近づく）
司祭：神の畏れと、信と愛とを以て進み近づくべし！
歌隊：主の御名によりて来たる者は讃美せらる、神は主なり、我らに現れ給えり！
（信徒が聖杯より主の聖体と尊き聖血を拝領する）`,
      en: `Priest: Holy things for the holy!
Choir: One is Holy, One is Lord, Jesus Christ, to the glory of God the Father. Amen.
(The Communion Hymn is chanted. The faithful recite the Pre-Communion prayer and approach)
Priest: With fear of God, with faith and love, draw near!
Choir: Blessed is He that comes in the name of the Lord! God is the Lord and has revealed Himself unto us!
(The faithful partake of the Holy Body and Blood of Christ from the Chalice)`,
      ru: `Иерей: Святая святым!
Хор: Един Свят, Един Господь, Иисус Христос, в славу Бога Отца. Аминь.
(Поется причастен. Прихожане читают молитву «Верую, Господи, и исповедую...» и подходят к Чаше)
Иерей: Со страхом Божиим и верою приступите!
Хор: Благословен Грядый во имя Господне, Бог Господь и явися нам!
(Причащение священнослужителей и мирян Святых Христовых Таин)`,
    },
  },

  // 23. We Have Seen the True Light & Thanksgiving Litany
  {
    id: 'lit-23-true-light-thanksgiving',
    order: 23,
    title: {
      ja: '23. 「我等真の光を見たり」及び領聖後の感謝連祷',
      en: '23. "We Have Seen the True Light" & Thanksgiving Litany',
      ru: '23. «Видехом Свет истинный» и благодарственная ектения',
    },
    celebrant: 'Choir',
    text: {
      ja: `歌隊：我ら真の光を見、天の霊を受け、真実の信仰を得て、同体の別れざる三位に伏し拝む、蓋し此の三位は我らを救い給えればなり。
司祭：神よ、爾の民を救い、爾の嗣業を祝福し給え。
歌隊：主の御名は今より世々に至るまで讃美せらるべし。（三度）
輔祭：直ちにして神聖にして無垢なる、不朽、天、生命を施す畏るべきハリストスの機密を受けし我ら、主に相応しく感謝すべし。
歌隊：主、憐れめよ。
輔祭：神よ、爾の恩恵をもて我らを救い、憐れみ、助け、保ち給え。
歌隊：主、憐れめよ。
輔祭：この日を全き、聖なる、平安なる、無罪なるものならしめんことを求めて、我ら己と互いと、我が総ての生命を、ハリストス神に献じ奉らん。
歌隊：爾に、主よ。
司祭（高声）：蓋し爾は我らを聖ならしむる主なり、我らは爾父と子と聖神に光栄を帰す、今もいつも世々に至るまで。
歌隊：アミン。`,
      en: `Choir: We have seen the True Light! We have received the Heavenly Spirit! We have found the True Faith, worshipping the undivided Trinity, Who has saved us!
Priest: O God, save Thy people, and bless Thine inheritance!
Choir: Blessed be the name of the Lord from this time forth and forevermore! (Thrice)
Deacon: Stand upright! Having partaken of the divine, holy, most pure, immortal, heavenly, life-creating and awesome Mysteries of Christ, let us worthily give thanks unto the Lord!
Choir: Lord, have mercy.
Deacon: Help us, save us, have mercy on us, and keep us, O God, by Thy grace.
Choir: Lord, have mercy.
Deacon: Having asked that the whole day may be perfect, holy, peaceful, and sinless, let us commend ourselves and one another, and all our life unto Christ our God.
Choir: To Thee, O Lord.
Priest: For Thou art our sanctification, and unto Thee do we send up glory: to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages.
Choir: Amen.`,
      ru: `Хор: Видехом Свет истинный, прияхом Духа Небеснаго, обретохом веру истинную, Нераздельней Троице покланяемся: Та бо нас спасла есть.
Иерей: Спаси, Боже, люди Твоя, и благослови достояние Твое.
Хор: Буди имя Господне благословено отныне и до века. (Трижды)
Диакон: Прости приимше Божественных, Святых, Пречистых, Безсмертных, Небесных и Животворящих, Страшных Христовых Таин, достойно благодарим Господа.
Хор: Господи, помилуй.
Диакон: Заступи, спаси, помилуй и сохрани нас, Боже, Твоею благодатию.
Хор: Господи, помилуй.
Диакон: День весь совершен, свят, мирен и безгрешен испросивше, сами себе и друг друга, и весь живот наш Христу Богу предадим.
Хор: Тебе, Господи.
Иерей: Яко Ты еси освящение наше, и Тебе славу возсылаем, Отцу и Сыну и Святому Духу, ныне и присно и во веки веков.
Хор: Аминь.`,
    },
  },

  // 24. The Prayer Behind the Ambo
  {
    id: 'lit-24-ambo-prayer',
    order: 24,
    title: {
      ja: '24. アンボの後の祈祷（聖堂中央での祝福）',
      en: '24. The Prayer Behind the Ambo',
      ru: '24. Заамвонная молитва',
    },
    celebrant: 'Priest',
    rubric: {
      ja: '司祭は王門より出でて会衆の前に立ち、全教会のための総括の祝福祈祷を捧ぐ：',
      en: 'The Priest comes out through the Royal Doors and stands among the people to pray:',
      ru: 'Священник исходит за амвон посреди храма и читает молитву:',
    },
    text: {
      ja: `司祭：平穏にして出でん。
歌隊：主の御名によりて。
輔祭：主を祈らん。
歌隊：主、憐れめよ。
司祭：主よ、爾を祝福する者を祝福し、爾に依り頼む者を聖ならしめ給う主よ、爾の民を救い、爾の嗣業を祝福し給え。
爾の教会の充実を守り、爾の家の美を愛する者を聖ならしめ給え。
彼らに爾の神の力をもって返礼し、爾に望みを置く我らを捨て給う勿れ。
全世界に、爾の諸教会に、司祭団に、執政者に、万民に平和を賜え。
蓋し総ての善き賜物、総ての全き賜物は天より出で、光の父なる爾より降ればなり。
我らは爾父と子と聖神に光栄と感謝と伏拝とを帰す、今もいつも世々に至るまで。
歌隊：アミン。主の御名は今より世々に至るまで讃美せらるべし。（三度）`,
      en: `Priest: Let us depart in peace.
Choir: In the Name of the Lord.
Deacon: Let us pray to the Lord.
Choir: Lord, have mercy.
Priest: O Lord, Who blessest those who bless Thee, and sanctifiest those who put their trust in Thee: save Thy people and bless Thine inheritance!
Preserve the fullness of Thy Church; sanctify those who love the beauty of Thy house;
glorify them in return by Thy divine power, and forsake us not who put our hope in Thee.
Grant peace to Thy world, to Thy churches, to the priests, to the rulers of our country, and to all Thy people.
For every good gift and every perfect gift is from above, coming down from Thee, the Father of lights.
And unto Thee do we send up glory, thanksgiving, and worship: to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages.
Choir: Amen. Blessed be the Name of the Lord, from this time forth and forevermore! (Thrice)`,
      ru: `Иерей: С миром изыдем.
Хор: О имени Господни.
Диакон: Господу помолимся.
Хор: Господи, помилуй.
Иерей: Господи, благословляяй благословящия Тя и освящаяй на Тя уповающия, спаси люди Твоя и благослови достояние Твое,
исполнение Церкве Твоея сохрани, освяти любящия благолепие дому Твоего:
Ты тех возпрослави божественною Твоею силою, и не остави нас, уповающих на Тя.
Мир мирови Твоему даруй, церквам Твоим, священником, властем и всем людем Твоим.
Яко всякое даяние благо, и всяк дар совершен свыше есть, сходяй от Тебе, Отца светов,
и Тебе славу, и благодарение, и поклонение возсылаем, Отцу и Сыну и Святому Духу, ныне и присно и во веки веков.
Хор: Аминь. Буди имя Господне благословено отныне и до века. (Трижды)`,
    },
  },

  // 25. The Dismissal and Veneration of the Cross
  {
    id: 'lit-25-dismissal',
    order: 25,
    title: {
      ja: '25. 閉祷・十字架叩拝とアンティドル（退堂祝福）',
      en: '25. The Dismissal & Antidoron',
      ru: '25. Отпуст и целование Креста',
    },
    celebrant: 'Priest',
    rubric: {
      ja: '司祭は手持ちの十字架を掲げて信徒を祝福し、信徒は進み出て十字架に接吻しアンティドル（祝福パン）を受く：',
      en: 'The Priest gives the final dismissal, and the faithful venerate the Cross and receive blessed bread (antidoron):',
      ru: 'Священник преподает благословение и дает крест для целования верующим:',
    },
    text: {
      ja: `司祭：死より復活せしハリストス、真の我が神は、その至潔なる母、聖使徒神学者イオアン、聖金口イオアン、並びに諸聖人の祈祷に因りて、我らを憐れみ救い給わん、善徳にして人を愛する主たればなり。
歌隊：アミン。
司祭：聖神父らの祈りに因りて、主イイスス・ハリストス、我らの神よ、我らを憐れめよ。
歌隊：アミン。
（信徒は司祭の掲げる十字架に進み寄りて接吻し、祝福のパン「アンティドル」を受く）`,
      en: `Priest: May He Who rose from the dead, Christ our true God, through the intercessions of His most pure Mother, of the holy, glorious, and all-laudable Apostles, of our father among the saints, John Chrysostom, and of all the saints: have mercy on us and save us, for He is good and loveth mankind!
Choir: Amen.
Priest: Through the prayers of our holy fathers, Lord Jesus Christ our God, have mercy on us!
Choir: Amen.
(The faithful come forward to venerate the Holy Cross and receive the blessed bread / antidoron)`,
      ru: `Иерей: Воскресый из мертвых Христос, истинный Бог наш, молитвами Пречистыя Своея Матере, святых славных и всехвальных апостол, иже во святых отца нашего Иоанна, архиепископа Константинопольскаго, Златоустаго, и всех святых, помилует и спасет нас, яко Благ и Человеколюбец.
Хор: Аминь.
Иерей: Молитвами святых отец наших, Господи Иисусе Христе Боже наш, помилуй нас.
Хор: Аминь.
(Верующие благоговейно подходят ко Кресту и получают благословенный антидор)`,
    },
  },
];
