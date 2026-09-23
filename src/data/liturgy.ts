import { TrilingualText } from '../lib/types';

export interface LiturgySection {
  id: string;
  order: number;
  title: TrilingualText;
  celebrant: 'Priest' | 'Deacon' | 'Choir' | 'People' | 'All';
  rubric?: TrilingualText;
  text: TrilingualText;
}

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
      ja: '司祭は福音経をもって宝座の上に十字を描きて高声に言う：',
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
憐れみと慈しみ深きかな主、忍耐長くして恵み豊かなり。
我が霊よ、主を讃め揚げよ、主は讃美せらる。`,
      en: `Bless the Lord, O my soul, and all that is within me, bless His holy Name!
Bless the Lord, O my soul, and forget not all His benefits.
Who forgives all your iniquities, Who heals all your diseases.
The Lord is compassionate and merciful, long-suffering and abundant in mercy.
Bless the Lord, O my soul, and blessed art Thou, O Lord!`,
      ru: `Благослови, душе моя, Господа, и вся внутренность моя имя святое Его.
Благослови, душе моя, Господа, и не забывай всех воздаяний Его.
Очищающаго вся беззакония твоя, исцеляющаго вся недуги твоя.
Щедр и милостив Господь, долготерпелив и многомилостив.
Благослови, душе моя, Господа, и благословен еси, Господи.`,
    },
  },

  // 4. Second Antiphon & Only-Begotten Son
  {
    id: 'lit-04-second-antiphon',
    order: 4,
    title: {
      ja: '4. 第2応誦及び「独生の子」',
      en: '4. Second Antiphon & "Only-Begotten Son"',
      ru: '4. Второй антифон и песнь «Единородный Сыне»',
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

  // 5. Third Antiphon: The Beatitudes
  {
    id: 'lit-05-beatitudes',
    order: 5,
    title: {
      ja: '5. 第3応誦・真福九端（山上の垂訓）',
      en: '5. Third Antiphon: The Beatitudes',
      ru: '5. Третий антифон: Заповеди Блаженств',
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

  // 6. The Small Entrance with the Holy Gospel
  {
    id: 'lit-06-small-entrance',
    order: 6,
    title: {
      ja: '6. 聖福音経 小進進堂',
      en: '6. The Small Entrance with the Holy Gospel',
      ru: '6. Малый вход с Евангелием',
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

  // 7. The Trisagion Hymn
  {
    id: 'lit-07-trisagion',
    order: 7,
    title: {
      ja: '7. 三聖讃（聖なる神）',
      en: '7. The Trisagion Hymn',
      ru: '7. Трисвятое',
    },
    celebrant: 'Choir',
    text: {
      ja: `聖なる神、聖なる勇力、聖なる不滅なる主、我等を憐れめよ。（三度）
光栄は父と子と聖神に帰す、今もいつも世々に至るまで、アミン。
聖なる不滅なる主、我等を憐れめよ。
聖なる神、聖なる勇力、聖なる不滅なる主、我等を憐れめよ。`,
      en: `Holy God, Holy Mighty, Holy Immortal, have mercy on us! (Thrice)
Glory to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages. Amen.
Holy Immortal, have mercy on us!
Holy God, Holy Mighty, Holy Immortal, have mercy on us!`,
      ru: `Святый Боже, Святый Крепкий, Святый Безсмертный, помилуй нас. (Трижды)
Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков. Аминь.
Святый Безсмертный, помилуй нас.
Святый Боже, Святый Крепкий, Святый Безсмертный, помилуй нас.`,
    },
  },

  // 8. The Epistle & Gospel Readings
  {
    id: 'lit-08-readings',
    order: 8,
    title: {
      ja: '8. 使徒経・福音経の朗読',
      en: '8. The Epistle & Gospel Readings',
      ru: '8. Чтение Апостола и Евангелия',
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

  // 9. The Cherubic Hymn & Great Entrance
  {
    id: 'lit-09-cherubic-hymn',
    order: 9,
    title: {
      ja: '9. ヘルヴィムの歌・大進進堂',
      en: '9. The Cherubic Hymn & The Great Entrance',
      ru: '9. Херувимская песнь и Великий вход',
    },
    celebrant: 'Choir',
    rubric: {
      ja: '司祭はパンとぶどう酒の聖器物を高く掲げ、北門より聖堂内を巡り王門に入りて宝座に置く：',
      en: 'The Holy Gifts are carried in solemn procession through the church to the Altar Table:',
      ru: 'Перенесение Честных Даров с Жертвенника на Престол:',
    },
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

  // 10. The Kiss of Peace and Symbol of Faith (The Creed)
  {
    id: 'lit-10-creed',
    order: 10,
    title: {
      ja: '10. 和解の挨拶及び信経（信仰の告白）',
      en: '10. The Kiss of Peace & The Nicene Creed',
      ru: '10. Целование мира и Символ веры',
    },
    celebrant: 'All',
    text: {
      ja: `司祭：互いに愛し合いて、一致して言い表さん。
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
      en: `Priest: Let us love one another, that with one mind we may confess:
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
      ru: `Иерей: Возлюбим друг друга, да единомыслием исповемы:
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

  // 11. The Anaphora (Eucharistic Canon)
  {
    id: 'lit-11-anaphora',
    order: 11,
    title: {
      ja: '11. 聖変化の感謝祈祷（アナフォラ）',
      en: '11. The Eucharistic Canon (Anaphora)',
      ru: '11. Евхаристический канон (Анафора)',
    },
    celebrant: 'Priest',
    text: {
      ja: `司祭：主イイスス・ハリストスの恩恵と、神父の愛と、聖神の交わりとは、爾等総ての人と共に在らん。
歌隊：かつ爾の霊と共に。
司祭：心を高く挙ぐべし。
歌隊：主に向かいて持ちて仰ぐ。
司祭：主に感謝すべし。
歌隊：父と子と聖神、同体の別れざる三位に伏し拝むは、礼に合いて正しきなり。
司祭（高声）：勝鬨の歌を歌い、叫び、呼ばわり、言う：
歌隊：聖なるかな、聖なるかな、聖なるかな、万軍の主、天も地も爾の光栄に満てり。いと高き所にホサンナ、主の御名によりて来たる者は讃美せらる、いと高き所にホサンナ！`,
      en: `Priest: The grace of our Lord Jesus Christ, and the love of God the Father, and the communion of the Holy Spirit be with you all.
Choir: And with your spirit.
Priest: Let us lift up our hearts.
Choir: We lift them up unto the Lord.
Priest: Let us give thanks unto the Lord.
Choir: It is proper and right to worship the Father, and the Son, and the Holy Spirit: the Trinity, one in essence and undivided.
Priest: Singing the triumphal hymn, shouting, crying aloud, and saying:
Choir: Holy, Holy, Holy, Lord of Sabaoth! Heaven and earth are full of Thy glory! Hosanna in the highest! Blessed is He that comes in the name of the Lord! Hosanna in the highest!`,
      ru: `Иерей: Благодать Господа нашего Иисуса Христа, и любы Бога и Отца, и причастие Святаго Духа буди со всеми вами.
Хор: И со духом твоим.
Иерей: Горе имеем сердца.
Хор: Имамы ко Господу.
Иерей: Благодарим Господа.
Хор: Достойно и праведно есть покланятися Отцу и Сыну и Святому Духу, Троице Единосущней и Нераздельней.
Иерей: Победную песнь поюще, вопиюще, взывающе и глаголюще:
Хор: Свят, Свят, Свят Господь Саваоф, исполнь небо и земля славы Твоея; осанна в вышних, благословен Грядый во имя Господне, осанна в вышних.`,
    },
  },

  // 12. The Epiclesis (Consecration of the Gifts)
  {
    id: 'lit-12-epiclesis',
    order: 12,
    title: {
      ja: '12. 聖神降臨祈祷と聖変化（エピクレーシス）',
      en: '12. The Epiclesis (Consecration of Holy Gifts)',
      ru: '12. Освящение Честных Даров (Эпиклеза)',
    },
    celebrant: 'Priest',
    rubric: {
      ja: '司祭はひざまずき、パンと葡萄酒に聖十字を結びて聖神の降臨を祈る：',
      en: 'The Priest blesses the Holy Gifts praying for the descent of the Holy Spirit:',
      ru: 'Священник благословляет хлеб и чашу, молясь о наитии Святаго Духа:',
    },
    text: {
      ja: `司祭（密祷）：このパンを爾のハリストスの尊き体となし、この杯の中にあるものを爾のハリストスの尊き血となし、爾の聖神をもてこれを変じ給え。
輔祭：アミン、アミン、アミン。
歌隊：爾を讃美し、爾を祝し、爾に感謝し、我が神よ、爾に祈る。`,
      en: `Priest: And make this bread the precious Body of Thy Christ, and that which is in this cup the precious Blood of Thy Christ, making the change by Thy Holy Spirit!
Deacon: Amen, Amen, Amen.
Choir: We praise Thee, we bless Thee, we give thanks unto Thee, O Lord, and we pray unto Thee, our God!`,
      ru: `Иерей: И сотвори убо хлеб сей Честное Тело Христа Твоего. А еже в чаши сей, Честную Кровь Христа Твоего. Преложив Духом Твоим Святым.
Диакон: Аминь, аминь, аминь.
Хор: Тебе поем, Тебе благословим, Тебе благодарим, Господи, и молимтися, Боже наш.`,
    },
  },

  // 13. Megalynarion to the Mother of God (Axion Estin)
  {
    id: 'lit-13-axion-estin',
    order: 13,
    title: {
      ja: '13. 生神女への讃歌（常に福にして）',
      en: '13. Hymn to the Theotokos (It is Truly Meet / Axion Estin)',
      ru: '13. Достойно есть (Песнь Пресвятой Богородице)',
    },
    celebrant: 'Choir',
    text: {
      ja: `常に福にして全き潔白、我が神の母なる生神女を福となすは、真に礼に合えり。
ヘルヴィムより尊く、セラフィムに並びなく栄え、
貞潔を壊たずして神なる言を生みし、実の生神女たる爾を崇め讃む。`,
      en: `It is truly meet to bless thee, O Theotokos, ever-blessed and most pure, and the Mother of our God.
More honorable than the Cherubim, and more glorious beyond compare than the Seraphim,
without defilement thou gavest birth to God the Word: true Theotokos, we magnify thee!`,
      ru: `Достойно есть яко воистину блажити Тя Богородицу, Присноблаженную и Пренепорочную и Матерь Бога нашего.
Честнейшую Херувим и славнейшую без сравнения Серафим,
без истления Бога Слова рождшую, сущую Богородицу Тя величаем.`,
    },
  },

  // 14. The Lord's Prayer
  {
    id: 'lit-14-our-father',
    order: 14,
    title: {
      ja: '14. 主の祈り（天におらるる我らの父よ）',
      en: '14. The Lord’s Prayer',
      ru: '14. Молитва Господня (Отче наш)',
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
歌隊：アミン。`,
      en: `Priest: And make us worthy, O Master, that with boldness and without condemnation we may dare to call upon Thee, the heavenly God, as Father, and to say:
All the People:
Our Father, Who art in heaven, hallowed be Thy name. Thy kingdom come, Thy will be done, on earth as it is in heaven.
Give us this day our daily bread, and forgive us our debts, as we forgive our debtors;
and lead us not into temptation, but deliver us from evil.
Priest: For Thine is the kingdom and the power and the glory, of the Father, and of the Son, and of the Holy Spirit, now and ever, and unto ages of ages.
Choir: Amen.`,
      ru: `Иерей: И сподоби нас, Владыко, со дерзновением, неосужденно смети призывати Тебе Небеснаго Бога Отца, и глаголати:
Все молящиеся:
Отче наш, Иже еси на небесех! Да святится имя Твое, да приидет Царствие Твое, да будет воля Твоя, яко на небеси и на земли.
Хлеб наш насущный даждь нам днесь; и остави нам долги наша, якоже и мы оставляем должником нашим;
и не введи нас во искушение, но избави нас от лукаваго.
Иерей: Яко Твое есть Царство и сила и слава Отца и Сына и Святаго Духа ныне и присно и во веки веков.
Хор: Аминь.`,
    },
  },

  // 15. The Elevation and Holy Communion
  {
    id: 'lit-15-communion',
    order: 15,
    title: {
      ja: '15. 聖体挙揚及び信徒の領聖（聖体拝領）',
      en: '15. Holy Communion',
      ru: '15. Причащение Святых Таин',
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

  // 16. We Have Seen the True Light & Thanksgiving
  {
    id: 'lit-16-true-light',
    order: 16,
    title: {
      ja: '16. 「我等真の光を見たり」及び感謝の連祷',
      en: '16. "We Have Seen the True Light" & Thanksgiving',
      ru: '16. «Видехом Свет истинный» и благодарение',
    },
    celebrant: 'Choir',
    text: {
      ja: `歌隊：我ら真の光を見、天の霊を受け、真実の信仰を得て、同体の別れざる三位に伏し拝む、蓋し此の三位は我らを救い給えればなり。
司祭：神よ、爾の民を救い、爾の嗣業を祝福し給え。
司祭：直ちにして神聖にして無垢なるハリストスの機密を受けし我ら、主に相応しく感謝すべし。
歌隊：主、憐れめよ。`,
      en: `Choir: We have seen the True Light! We have received the Heavenly Spirit! We have found the True Faith, worshipping the undivided Trinity, Who has saved us!
Priest: O God, save Thy people, and bless Thine inheritance!
Deacon: Stand upright! Having partaken of the divine, holy, most pure, immortal, heavenly, and life-creating Mysteries of Christ, let us worthily give thanks unto the Lord!
Choir: Lord, have mercy.`,
      ru: `Хор: Видехом Свет истинный, прияхом Духа Небеснаго, обретохом веру истинную, Нераздельней Троице покланяемся: Та бо нас спасла есть.
Иерей: Спаси, Боже, люди Твоя, и благослови достояние Твое.
Диакон: Прости приимше Божественных, Святых, Пречистых, Безсмертных, Небесных и Животворящих, Страшных Христовых Таин, достойно благодарим Господа.
Хор: Господи, помилуй.`,
    },
  },

  // 17. The Dismissal and Veneration of the Cross
  {
    id: 'lit-17-dismissal',
    order: 17,
    title: {
      ja: '17. 閉祷・退堂祝福（十字架叩拝とアンティドル）',
      en: '17. The Dismissal & Antidoron',
      ru: '17. Отпуст и раздача антидора',
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
（司祭が掲げる十字架に進み寄りて接吻し、祝福のパンを受く）`,
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
