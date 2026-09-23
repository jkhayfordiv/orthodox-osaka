import { TrilingualText } from '../lib/types';

export interface PrayerItem {
  id: string;
  category: 'morning' | 'evening' | 'communion' | 'meals' | 'patronal' | 'occasional';
  communionPhase?: 'preparation' | 'thanksgiving';
  patronGroup?: 'pokrov' | 'st-nicholas';
  sequenceNumber?: number;
  title: TrilingualText;
  subtitle?: TrilingualText;
  text: TrilingualText;
}

export const PRAYERS_DATA: PrayerItem[] = [
  // ==========================================
  // 1. 朝の祈り (Morning Prayers / Утренние молитвы)
  // ==========================================
  {
    id: 'morning-initial-prayers',
    category: 'morning',
    sequenceNumber: 1,
    title: {
      ja: '開始の祈祷（初めの祈祷・天の王・三聖讃・主の祈り）',
      en: 'Introductory Prayers (Trisagion through The Lord’s Prayer)',
      ru: 'Начальные молитвы (Трисвятое по Отче наш)',
    },
    subtitle: {
      ja: '目覚めの礼拝・聖神の恵み・主の祈り',
      en: 'First Prayer upon Rising, Invocation of the Holy Spirit & The Lord’s Prayer',
      ru: 'Молитвы утренние по пробуждении от сна',
    },
    text: {
      ja: `父と子と聖神の御名によりて。アミン。
光栄は爾に帰す、我らの神よ、光栄は爾に帰す。

【天の王（聖神への祈祷）】
天の王、慰め主、真理の神よ、何れの処にも在り、満たざる所なき者よ、
万善の宝蔵にして生命を施す主よ、来たりて我らの中に居り、
我らを総ての穢れより潔め、憐れみ深き主よ、我が霊を救い給え。

【三聖讃】
聖なる神、聖なる勇力、聖なる不滅なる主、我等を憐れめよ。（三度）
光栄は父と子と聖神に帰す、今もいつも世々に至るまで、アミン。

【至聖三位への祈祷】
至聖なる三位、我らを憐れめよ。主よ、我らの罪を潔め給え。主宰よ、我らの不法を赦し給え。聖なる主よ、訪い憐れみて、爾の名の為に我らの病を癒し給え。
主憐れめよ。（三度）
光栄は父と子と聖神に帰す、今もいつも世々に至るまで、アミン。

【主の祈り】
天におらるる我らの父よ、願わくは爾の名は聖とせられ、爾の国は来たり、爾の旨は天に行わるるが如く地にも行われん。
我が日用の糧を今日我らに与え給え。
我らに負い目ある者を我らが赦すが如く、我らの負い目を赦し給え。
我らを誘惑に導かず、なお我らを凶悪より救い給え。
蓋し国と権能と光栄は、爾父と子と聖神に世々に帰す。アミン。`,
      en: `In the Name of the Father, and of the Son, and of the Holy Spirit. Amen.
Glory to Thee, our God, glory to Thee!

[O Heavenly King — Prayer to the Holy Spirit]
O Heavenly King, the Comforter, the Spirit of Truth, Who art everywhere and fillest all things; Treasury of Blessings, and Giver of Life: come and abide in us, and cleanse us from every impurity, and save our souls, O Good One!

[The Trisagion]
Holy God, Holy Mighty, Holy Immortal, have mercy on us. (Thrice)
Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages. Amen.

[O Most Holy Trinity]
O Most Holy Trinity, have mercy on us. Lord, cleanse us from our sins. Master, pardon our transgressions. Holy One, visit and heal our infirmities for Thy Name's sake.
Lord, have mercy. (Thrice)
Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages. Amen.

[The Lord's Prayer]
Our Father, Who art in heaven, hallowed be Thy name. Thy kingdom come, Thy will be done on earth as it is in heaven.
Give us this day our daily bread, and forgive us our debts, as we forgive our debtors;
and lead us not into temptation, but deliver us from evil.
For Thine is the kingdom and the power and the glory, of the Father, and of the Son, and of the Holy Spirit, now and ever and unto ages of ages. Amen.`,
      ru: `Во имя Отца и Сына и Святаго Духа. Аминь.
Слава Тебе, Боже наш, слава Тебе!

[Царю Небесный — Молитва Святому Духу]
Царю Небесный, Утешителю, Душе истины, Иже везде сый и вся исполняяй, Сокровище благих и жизни Подателю, прииди и вселися в ны, и очисти ны от всякия скверны, и спаси, Блаже, души наша.

[Трисвятое]
Святый Боже, Святый Крепкий, Святый Безсмертный, помилуй нас. (Трижды)
Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков. Аминь.

[Пресвятая Троице]
Пресвятая Троице, помилуй нас; Господи, очисти грехи наша; Владыко, прости беззакония наша; Святый, посети и исцели немощи наша, имене Твоего ради.
Господи, помилуй. (Трижды)
Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков. Аминь.

[Отче наш]
Отче наш, Иже еси на небесех! Да святится имя Твое, да приидет Царствие Твое, да будет воля Твоя, яко на небеси и на земли.
Хлеб наш насущный даждь нам днесь; и остави нам долги наша, якоже и мы оставляем должником нашим;
и не введи нас во искушение, но избави нас от лукаваго.
Яко Твое есть Царство и сила и слава Отца и Сына и Святаго Духа ныне и присно и во веки веков. Аминь.`,
    },
  },
  {
    id: 'morning-troparia',
    category: 'morning',
    sequenceNumber: 2,
    title: {
      ja: '朝の痛悔讃詞・聖三位への感謝',
      en: 'Morning Troparia of Contrition & Prayer to the Holy Trinity',
      ru: 'Тропари утренние и молитва ко Пресвятей Троице',
    },
    subtitle: {
      ja: '主憐れめよ（十二度）・三度の伏拝',
      en: 'Troparia of Awakening, Lord have mercy (12x) & Prostrations',
      ru: 'Господи, помилуй (12 раз) и поклонение',
    },
    text: {
      ja: `眠りより起きて爾に伏し拝み、善徳者よ、天使の歌を爾に叫び歌う、「聖なるかな、聖なるかな、聖なるかな、神よ、生神女に因りて我らを憐れめよ。」

光栄は父と子と聖神に帰す。
主よ、爾我を寝床と眠りより起こし給えり、我が心と思いとを照らし、我が唇を開きて、爾聖三位を讃歌せしめ給え、「聖なるかな、聖なるかな、聖なるかな、神よ、生神女に因りて我らを憐れめよ。」

今もいつも世々に至るまで、アミン。
審判者は俄かに来たり、各人の所行は明らかにせらるべし、是の故に我等畏れを以て夜半に叫ぶ、「聖なるかな、聖なるかな、聖なるかな、神よ、生神女に因りて我らを憐れめよ。」

主憐れめよ。（十二度）

【起床後の聖三位への感謝祈祷】
眠りより起きて、聖三位よ、我爾に感謝す、爾の大いなる慈愛と寛容とによりて、怠惰にして罪人たる我を怒らず、我が罪悪のために我を滅ぼさず、常に人に示す慈悲をもって、我の絶望に伏せるを起こし、夙（つと）に起きて爾の権能を讃美せしめ給えばなり。
今、我が心の目と思いを照らし、我が耳と口を開きて爾の言葉を学ばしめ、爾の戒めを悟りて爾の旨を行わしめ、心の告白をもって爾を讃美し、至聖なる御名、父と子と聖神を崇めしめ給え。今もいつも世々に至るまで。アミン。

来たりて我等の王なる神に伏し拝まん。
来たりて我等の王ハリストス神に伏し拝まん。
来たりて我等の王ハリストス神自らに伏し拝み、これに倒れ伏さん。（伏拝三度）`,
      en: `Having arisen from sleep, we fall down before Thee, O Blessed One, and we sing to Thee, O Mighty One, the angelic hymn: Holy, Holy, Holy art Thou, O God; through the Theotokos have mercy on us!

Glory to the Father, and to the Son, and to the Holy Spirit.
From bed and sleep Thou hast raised me, O Lord; enlighten my mind and heart, and open my lips that I may praise Thee, O Holy Trinity: Holy, Holy, Holy art Thou, O God; through the Theotokos have mercy on us!

Now and ever and unto ages of ages. Amen.
Suddenly the Judge shall come, and the deeds of each shall be revealed; but with fear we cry in the middle of the night: Holy, Holy, Holy art Thou, O God; through the Theotokos have mercy on us!

Lord, have mercy. (12 times)

[Prayer to the Most Holy Trinity upon Rising]
Having arisen from sleep, I thank Thee, O Holy Trinity, for in the abundance of Thy goodness and forbearance Thou wast not angered with me, slothful and sinful as I am, neither hast Thou destroyed me in my transgressions; but in Thy customary love toward mankind Thou hast raised me up as I lay in despair, that I might offer morning praise and glorify Thy majesty.
And now enlighten the eyes of my understanding, open my ears and my lips to receive Thy words and learn Thy commandments, and to do Thy will and sing to Thee in confession of heart, praising Thy most honorable Name: of the Father, and of the Son, and of the Holy Spirit, now and ever, and unto ages of ages. Amen.

Come, let us worship God our King!
Come, let us worship and fall down before Christ, our King and our God!
Come, let us worship and fall down before Christ Himself, our King and our God! (With three prostrations)`,
      ru: `Воставше от сна, припадаем Ти, Блаже, и ангельскую песнь вопием Ти, Сильне: Свят, Свят, Свят еси, Боже, Богородицею помилуй нас.

Слава Отцу и Сыну и Святому Духу.
От одра и сна воздвигл мя еси, Господи, ум мой просвети и сердце, и устне мои отверзи, во еже пети Тя, Святая Троице: Свят, Свят, Свят еси, Боже, Богородицею помилуй нас.

И ныне и присно и во веки веков. Аминь.
Внезапно Судия приидет, и коегождо деяния обнажатся, но страхом зовем в полунощи: Свят, Свят, Свят еси, Боже, Богородицею помилуй нас.

Господи, помилуй. (12 раз)

[Молитва ко Пресвятей Троице по пробуждении]
От сна востав, благодарю Тя, Святая Троице, яко многия ради Твоея благости и долготерпения не прогневался еси на мя, лениваго и грешнаго, ниже погубил мя еси со беззаконьми моими; но человеколюбствовал еси обычно и в нечаянии лежащаго воздвигл мя еси, во еже утреневати и славословити державу Твою.
И ныне просвети мои очи мысленныя, отверзи моя уста поучатися словесем Твоим, и разумети заповеди Твоя, и творити волю Твою, и пети Тя во исповедании сердечнем, и воспевати всесвятое имя Твое, Отца и Сына и Святаго Духа, ныне и присно и во веки веков. Аминь.

Приидите, поклонимся Цареви нашему Богу.
Приидите, поклонимся и припадем Христу, Цареви нашему Богу.
Приидите, поклонимся и припадем Самому Христу, Цареви и Богу нашему. (С тремя поклонами)`,
    },
  },
  {
    id: 'morning-psalm-50',
    category: 'morning',
    sequenceNumber: 3,
    title: {
      ja: '詩篇第50篇（痛悔の詩）',
      en: 'Psalm 50 (Have Mercy on Me, O God)',
      ru: 'Псалом 50 (Помилуй мя, Боже)',
    },
    subtitle: {
      ja: 'ダビドの痛悔と霊的浄化の祈り',
      en: 'The Great Psalm of Repentance',
      ru: 'Покаянный псалом царя Давида',
    },
    text: {
      ja: `神よ、爾の大いなる憐れみに因りて我を憐れみ、爾の慈悲の多きに因りて我が不法を消し給え。
我が不法を悉く我より洗い去り、我が罪より我を潔め給え。
蓋し我は我が不法を知る、我が罪は常に我が前にあり。
我爾に、唯だ爾に罪を犯し、爾の目の前に悪を行えり。是れ爾の宣告において正しく、爾の審判において清からん為なり。
見よ、我は不法の中に孕まれ、我が母は罪の中に我を孕めり。
見よ、爾は心の真実を愛す、秘奥なる知恵を我に悟らしめ給えり。
イソプを以て我に沃（そそ）ぎ給え、然せば我潔くならん。我を洗え、然せば我雪よりも白くならん。
我に歓喜と楽しみとを聞かせ給え、然せば爾の砕きし骨は悦ばん。
爾の顔（かんばせ）を我が諸の罪より背け、我が諸の不法を消し給え。
神よ、潔き心を我の内に造り、正しき霊を我が胸の内に改め給え。
我を爾の御前より斥（しりぞ）くる勿れ、爾の聖神を我より取り去る勿れ。
爾の救いの歓喜を我に返し、主宰の霊を以て我を堅からしめ給え。
我は不法なる者に爾の道を教えん、然せば不敬の者は爾に帰向せん。
神よ、我が救いの神よ、血の罪より我を救い給え、然せば我が舌は爾の義を讃美せん。
主よ、我が唇を開き給え、然せば我が口は爾の讃美を揚げん。
蓋し爾は祭を欲せず、欲せば則ち我献ぜん、燔祭をも爾喜ばず。
神への祭は砕けし霊なり、砕けかつ低まりたる心は、神よ、爾軽んじ給わず。
主よ、爾の恵みによりてシオンに仁恵を施し、エルサリムの垣を築き給え。
その時爾は義の祭、献物と燔祭とを悦び給わん、その時人々は爾の祭壇の上に牡牛を献ぜん。`,
      en: `Have mercy on me, O God, according to Thy great mercy; and according to the multitude of Thy compassions blot out my transgression.
Wash me thoroughly from mine iniquity, and cleanse me from my sin.
For I know mine iniquity, and my sin is ever before me.
Against Thee only have I sinned and done this evil before Thee, that Thou mightest be justified in Thy words, and prevail when Thou art judged.
For behold, I was conceived in iniquities, and in sins did my mother bear me.
For behold, Thou hast loved truth; the hidden and secret things of Thy wisdom hast Thou made manifest unto me.
Thou shalt sprinkle me with hyssop, and I shall be made clean; Thou shalt wash me, and I shall be made whiter than snow.
Thou shalt make me to hear joy and gladness; the bones that be humbled, they shall rejoice.
Turn Thy face away from my sins, and blot out all mine iniquities.
Create in me a clean heart, O God, and renew a right spirit within me.
Cast me not away from Thy presence, and take not Thy Holy Spirit from me.
Restore unto me the joy of Thy salvation, and with Thy governing Spirit establish me.
I shall teach transgressors Thy ways, and the ungodly shall turn back unto Thee.
Deliver me from bloodguiltiness, O God, Thou God of my salvation; my tongue shall rejoice in Thy righteousness.
O Lord, Thou shalt open my lips, and my mouth shall declare Thy praise.
For if Thou hadst desired sacrifice, I had given it; with whole-burnt offerings Thou shalt not be pleased.
A sacrifice unto God is a broken spirit; a heart that is broken and humbled God will not despise.
Do good, O Lord, in Thy good pleasure unto Zion, and let the walls of Jerusalem be builded.
Then shalt Thou be pleased with a sacrifice of righteousness, with oblation and whole-burnt offerings.
Then shall they offer bullocks upon Thine altar.`,
      ru: `Помилуй мя, Боже, по велицей милости Твоей, и по множеству щедрот Твоих очисти беззаконие мое.
Наипаче омый мя от беззакония моего, и от греха моего очисти мя;
яко беззаконие мое аз знаю, и грех мой предо мною есть выну.
Тебе единому согреших и лукавое пред Тобою сотворих; яко да оправдишися во словесех Твоих, и победиши внегда судити Ти.
Се бо, в беззакониих зачат есмь, и во гресех роди мя мати моя.
Се бо, истину возлюбил еси; безвестная и тайная премудрости Твоея явил ми еси.
Окропиши мя иссопом, и очищуся; омыеши мя, и паче снега убелюся.
Слуху моему даси радость и веселие; возрадуются кости смиренныя.
Отврати лице Твое от грех моих и вся беззакония моя очисти.
Сердце чисто созижди во мне, Боже, и дух прав обнови во утробе моей.
Не отвержи мене от лица Твоего и Духа Твоего Святаго не отними от мене.
Воздаждь ми радость спасения Твоего и Духом Владычним утверди мя.
Научу беззаконныя путем Твоим, и нечестивии к Тебе обратятся.
Избави мя от кровей, Боже, Боже спасения моего; возрадуется язык мой правде Твоей.
Господи, устне мои отверзеши, и уста моя возвестят хвалу Твою.
Яко аще бы восхотел еси жертвы, дал бых убо: всесожжения не благоволиши.
Жертва Богу дух сокрушен; сердце сокрушенно и смиренно Бог не уничижит.
Ублажи, Господи, благоволением Твоим Сиона, и да созиждутся стены Иерусалимския.
Тогда благоволиши жертву правды, возношение и всесожегаемая; тогда возложат на олтарь Твой тельцы.`,
    },
  },
  {
    id: 'morning-creed',
    category: 'morning',
    sequenceNumber: 4,
    title: {
      ja: '信経（ニケア・コンスタンティノープル信条）',
      en: 'The Symbol of Faith (The Nicene Creed)',
      ru: 'Символ веры (Верую)',
    },
    subtitle: {
      ja: '正教会の信仰の告白',
      en: 'Confession of Orthodox Christian Faith',
      ru: 'Исповедание Православной веры',
    },
    text: {
      ja: `我、唯一の神・父・全能者、天と地、見ゆると見えざる万物の創造主を信ず。

又、唯一の主イイスス・ハリストス、神の独生の子、万世の前に父より生まれ、光よりの光、真の神よりの真の神、生まれし者にて造られしに非ず、父と一体にして、万物彼によりて造られたるを信ず。

彼我ら人類の為、又我らの救いの為に天より降り、聖神及び童女マリヤより身を取りて人となり、
我らの為にポンティイ・ピラトの時に十字架に釘うたれ、苦しみを受け、葬られ、
聖書にかなうて三日目に復活し、
天に昇り、父の右に坐し、
光栄を顕して生ける者と死せし者を審判する為に再び来たり、その国終りなかるべしを信ず。

又、聖神、主、生命を施す者、父より出で、父及び子と共に拝まれ讃美せられ、預言者を以てかつて語りしを信ず。

又、唯一の聖なる公なる使徒の教会を信ず。
我、罪の赦しを得る唯一の洗礼を言い表す。
我、死者の復活、
並びに来世の生命を望む。アミン。`,
      en: `I believe in one God, the Father Almighty, Maker of heaven and earth, and of all things visible and invisible.

And in one Lord Jesus Christ, the Son of God, the Only-begotten, begotten of the Father before all ages; Light of Light, true God of true God; begotten, not made; of one essence with the Father, by Whom all things were made;
Who for us men and for our salvation came down from heaven, and was incarnate of the Holy Spirit and the Virgin Mary, and became man;
and was crucified also for us under Pontius Pilate, and suffered and was buried;
and the third day He rose again, according to the Scriptures;
and ascended into heaven, and sitteth at the right hand of the Father;
and He shall come again, with glory, to judge the living and the dead; Whose kingdom shall have no end.

And in the Holy Spirit, the Lord, the Giver of Life, Who proceedeth from the Father; Who with the Father and the Son together is worshipped and glorified; Who spake by the Prophets.

In one, Holy, Catholic, and Apostolic Church.
I acknowledge one baptism for the remission of sins.
I look for the resurrection of the dead,
and the life of the world to come. Amen.`,
      ru: `Верую во единаго Бога Отца, Вседержителя, Творца небу и земли, видимым же всем и невидимым.

И во единаго Господа Иисуса Христа, Сына Божия, Единороднаго, Иже от Отца рожденнаго прежде всех век; Света от Света, Бога истинна от Бога истинна, рожденна, несотворенна, единосущна Отцу, Имже вся быша.
Нас ради человек и нашего ради спасения сшедшаго с небес и воплотившагося от Духа Свята и Марии Девы, и вочеловечшася.
Распятаго же за ны при Понтийстем Пилате, и страдавша, и погребенна.
И воскресшаго в третий день по Писанием.
И восшедшаго на небеса, и седяща одесную Отца.
И паки грядущаго со славою судити живым и мертвым, Егоже Царствию не будет конца.

И в Духа Святаго, Господа, Животворящаго, Иже от Отца исходящаго, Иже со Отцем и Сыном спокланяема и сславима, глаголавшаго пророки.

Во едину Святую, Соборную и Апостольскую Церковь.
Исповедую едино крещение во оставление грехов.
Чаю воскресения мертвых,
и жизни будущаго века. Аминь.`,
    },
  },
  {
    id: 'morning-macarius',
    category: 'morning',
    sequenceNumber: 5,
    title: {
      ja: '聖大マカリイの朝の祈祷',
      en: 'First Prayer of St. Macarius the Great',
      ru: 'Молитва 1-я, святаго Макария Великаго',
    },
    subtitle: {
      ja: '神よ、罪人なる我を潔め給え',
      en: 'O God, cleanse me a sinner',
      ru: 'Боже, очисти мя грешнаго',
    },
    text: {
      ja: `神よ、罪人なる我を潔め給え、我はいまだ爾の御前に良きことを行わざればなり。
我を悪しき者より救い給え、爾の旨の我に行われんことを。
以て我が不相応なる口を開きて、爾の聖なる御名、父と子と聖神を罪に定められずして讃美せしめ給え。今もいつも世々に至るまで。アミン。`,
      en: `O God, cleanse me a sinner, for I have never done anything good in Thy sight;
deliver me from the evil one, and may Thy will be done in me,
that without condemnation I may open my unworthy lips and praise Thy holy Name: of the Father, and of the Son, and of the Holy Spirit, now and ever, and unto ages of ages. Amen.`,
      ru: `Боже, очисти мя грешнаго, яко николиже сотворих благое пред Тобою;
но избави мя от лукаваго, и да будет во мне воля Твоя,
да неосужденно отверзу уста моя недостойная и восхвалю имя Твое святое, Отца и Сына и Святаго Духа, ныне и присно и во веки веков. Аминь.`,
    },
  },
  {
    id: 'morning-guardian-angel',
    category: 'morning',
    sequenceNumber: 6,
    title: {
      ja: '守護天使への朝の祈祷',
      en: 'Morning Prayer to the Holy Guardian Angel',
      ru: 'Молитва утренняя ко Ангелу Хранителю',
    },
    subtitle: {
      ja: '一日の歩みと霊の保護を求める祈り',
      en: 'Prayer for Guidance and Preservation through the Day',
      ru: 'О сохранении души и тела в течение дня',
    },
    text: {
      ja: `我が哀れなる霊と情欲に迷う生涯の守護者たる聖天使よ、罪人たる我を捨てず、我が無節制のために我を離るることなかれ。悪霊をしてこの朽ちる肉体の強さをもって我を支配せしむることなく、弱き我が手を取りて、我を救いの道に導き給え。

誠に神の聖天使、我が哀れなる魂と肉体の保護者よ、我が生涯の日々に爾を憂いせしめたる過失を赦し、過ぎ去りし夜の我が罪過を覆い、今日一日我を護り、敵のあらゆる誘惑より我を守り給え。以て我をして罪により神を怒らしめず、我がために主神に祈り、その畏れのうちに我を堅固ならしめ、その慈愛に値する僕となさしめ給え。アミン。`,
      en: `O holy Angel, who standest by my wretched soul and passionate life, do not abandon me a sinner, neither depart from me because of my intemperance. Give no place to the evil demon to overcome me with the oppression of this mortal body; strengthen my weak and infirm hand, and guide me in the way of salvation.

Yea, holy Angel of God, guardian and protector of my wretched soul and body, forgive me everything wherein I have offended thee all the days of my life, and if I have sinned in the past night: protect me in the present day, and preserve me from every temptation of the enemy, that I may not anger God by any sin; and pray to the Lord for me, that He may confirm me in His fear, and show me to be a worthy servant of His goodness. Amen.`,
      ru: `Святый Ангеле, предстояй окаянной моей души и страстной моей жизни, не остави мене грешнаго, ниже отступи от мене за невоздержание мое. Не даждь места лукавому демону обладати мною, насильством смертнаго сего телесе; укрепи бедствующую и худую мою руку и настави мя на путь спасения.

Ей, святый Ангеле Божий, хранителю и покровителю окаянныя моея души и тела, вся мне прости, еликими тя оскорбих во вся дни живота моего, и аще что согреших в прешедшую нощь сию, покрый мя в настоящий день, и сохрани мя от всякаго искушения противнаго, да ни в коем гресе прогневаю Бога, и молися за мя ко Господу, да утвердит мя в страсе Своем, и достойна покажет мя раба Своея благости. Аминь.`,
    },
  },
  {
    id: 'morning-theotokos-axion-estin',
    category: 'morning',
    sequenceNumber: 7,
    title: {
      ja: '生神女を讃美する祈り（常に福にして）',
      en: 'Hymn to the Most Holy Theotokos (It Is Truly Meet)',
      ru: 'Песнь Пресвятей Богородице (Достойно есть)',
    },
    subtitle: {
      ja: 'アクシオン・エスティン（実の生神女たる爾を我等崇め讃む）',
      en: 'Axion Estin — More honorable than the Cherubim',
      ru: 'Честнейшую Херувим и славнейшую без сравнения Серафим',
    },
    text: {
      ja: `常に福（さいわい）にして全く潔く、我が神の母なる生神女を福と称するは、真実に適（かな）えり。
契経（ヘルビム）より尊く、熾天使（セラフィム）に並びなく勝り、貞操（みさお）を壊（やぶ）らずして神なる言葉を生みし、実の生神女たる爾を我等崇め讃む。`,
      en: `It is truly meet to bless thee, O Theotokos, ever-blessed and most blameless, and the Mother of our God.
More honorable than the Cherubim, and more glorious beyond compare than the Seraphim, without defilement thou gavest birth to God the Word: true Theotokos, we magnify thee.`,
      ru: `Достойно есть яко воистину блажити Тя Богородицу, Присноблаженную и Пренепорочную и Матерь Бога нашего.
Честнейшую Херувим и славнейшую без сравнения Серафим, без истления Бога Слова рождшую, сущую Богородицу Тя величаем.`,
    },
  },
  {
    id: 'morning-living-departed',
    category: 'morning',
    sequenceNumber: 8,
    title: {
      ja: '生ける者と眠れる者のための日毎の記憶',
      en: 'Commemoration of the Living and the Departed',
      ru: 'Молитва о живых и усопших',
    },
    subtitle: {
      ja: '霊父・家族・親族・永眠者のための代祷',
      en: 'Intercessory Commemoration for Family and Faithful',
      ru: 'Поминовение сродников и всех православных христиан',
    },
    text: {
      ja: `慈愛深き主イイスス・ハリストスよ、我が霊父、父母、親族、正教の信徒ら、病気・艱難にある総ての人を顧み、憐れみ、その霊と肉体に恩寵を垂れ給え。
又、眠りにつける我が先祖、教会の恩人、総ての正教の信徒らを記憶し、願わくは彼らの自らと自らならずして犯せし罪を赦し、彼らに天国を賜い、永遠の安息を与え給え。`,
      en: `Remember, O Lord Jesus Christ, our spiritual father, our parents, relatives, all Orthodox Christians, those in sickness and sorrow; visit, strengthen, and preserve them by Thy grace.
Remember also all our fathers, brethren, and loved ones who have fallen asleep in the hope of resurrection to eternal life; forgive them every sin committed willingly or unwillingly, and make their memory eternal!`,
      ru: `Спаси, Господи, и помилуй отца моего духовнаго, родителей моих, сродников и всех православных христиан.
Упокой, Господи, души усопших раб Твоих: праотцев, отец и братий наших, зде лежащих и повсюду православных, и прости им вся согрешения вольная и невольная, и даруй им Царствие Небесное. Вечная память!`,
    },
  },

  // ==========================================
  // 2. 晩の祈り（就寝前の祈り / Prayers before Sleep / На сон грядущим）
  // ==========================================
  {
    id: 'evening-initial-prayers',
    category: 'evening',
    sequenceNumber: 1,
    title: {
      ja: '就寝前の開始の祈祷・痛悔讃詞',
      en: 'Introductory Prayers & Evening Troparia of Contrition',
      ru: 'Начальные молитвы и вечерние тропари',
    },
    subtitle: {
      ja: '天の王・三聖讃・主の祈り・「主よ我らを憐れめよ」・「主憐れめよ（十二度）」',
      en: 'Trisagion, Evening Penitential Troparia & Lord have mercy (12x)',
      ru: 'Трисвятое по Отче наш, тропари покаянные и Господи, помилуй (12 раз)',
    },
    text: {
      ja: `父と子と聖神の御名によりて。アミン。
光栄は爾に帰す、我らの神よ、光栄は爾に帰す。

【天の王】
天の王、慰め主、真理の神よ、何れの処にも在り、満たざる所なき者よ、
万善の宝蔵にして生命を施す主よ、来たりて我らの中に居り、
我らを総ての穢れより潔め、憐れみ深き主よ、我が霊を救い給え。

【三聖讃〜至聖三位〜主の祈り】
聖なる神、聖なる勇力、聖なる不滅なる主、我等を憐れめよ。（三度）
光栄は父と子と聖神に帰す、今もいつも世々に至るまで、アミン。
至聖なる三位、我らを憐れめよ。主よ、我らの罪を潔め給え。主宰よ、我らの不法を赦し給え。聖なる主よ、訪い憐れみて、爾の名の為に我らの病を癒し給え。
主憐れめよ。（三度）
光栄は父と子と聖神に帰す、今もいつも世々に至るまで、アミン。
天におらるる我らの父よ、願わくは爾の名は聖とせられ、爾の国は来たり、爾の旨は天に行わるるが如く地にも行われん。我が日用の糧を今日我らに与え給え。我らに負い目ある者を我らが赦すが如く、我らの負い目を赦し給え。我らを誘惑に導かず、なお我らを凶悪より救い給え。アミン。

【就寝前の痛悔讃詞】
主よ我らを憐れめよ、我らを憐れめよ。我ら罪人は弁解の余地なく、主宰たる爾にこの祈願を献ず、我らを憐れめよ。
光栄は父と子と聖神に帰す。
主よ、我らを憐れめよ、我らは爾に依り頼めばなり。我らを甚だしく怒らず、我らの不法を記憶する勿れ。今顧みて憐れみ深く我らを仇より救い給え。爾は我らの神にして、我らは爾の民なり、皆爾の手の業にして爾の名を呼び奉る。
今もいつも世々に至るまで、アミン。
慈愛の門を我らに開き給え、讃美せられたる生神女よ、爾を望む我らをして滅びざらしめ、爾によりて諸の患難より救われしめ給え、蓋し爾はハリストス教徒の救いなればなり。

主憐れめよ。（十二度）`,
      en: `In the Name of the Father, and of the Son, and of the Holy Spirit. Amen.
Glory to Thee, our God, glory to Thee!

[O Heavenly King]
O Heavenly King, the Comforter, the Spirit of Truth, Who art everywhere and fillest all things; Treasury of Blessings, and Giver of Life: come and abide in us, and cleanse us from every impurity, and save our souls, O Good One!

[Trisagion Prayers through The Lord’s Prayer]
Holy God, Holy Mighty, Holy Immortal, have mercy on us. (Thrice)
Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages. Amen.
O Most Holy Trinity, have mercy on us. Lord, cleanse us from our sins. Master, pardon our transgressions. Holy One, visit and heal our infirmities for Thy Name's sake.
Lord, have mercy. (Thrice)
Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages. Amen.
Our Father, Who art in heaven, hallowed be Thy name. Thy kingdom come, Thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our debts, as we forgive our debtors; and lead us not into temptation, but deliver us from evil. Amen.

[Evening Troparia of Contrition]
Have mercy on us, O Lord, have mercy on us; for laying aside all excuse we sinners offer to Thee, as to our Master, this supplication: have mercy on us!
Glory to the Father, and to the Son, and to the Holy Spirit.
O Lord, have mercy on us, for in Thee have we put our trust; be not exceedingly wroth with us, neither remember our transgressions, but look down upon us now in Thy compassion and deliver us from our enemies. For Thou art our God and we are Thy people, all the work of Thy hands, and we call upon Thy Name.
Now and ever and unto ages of ages. Amen.
Open unto us the door of thy compassion, O blessed Theotokos, that hoping in thee we may not perish, but by thee may be delivered from tribulations; for thou art the salvation of the Christian people.

Lord, have mercy. (12 times)`,
      ru: `Во имя Отца и Сына и Святаго Духа. Аминь.
Слава Тебе, Боже наш, слава Тебе!

[Царю Небесный]
Царю Небесный, Утешителю, Душе истины, Иже везде сый и вся исполняяй, Сокровище благих и жизни Подателю, прииди и вселися в ны, и очисти ны от всякия скверны, и спаси, Блаже, души наша.

[Трисвятое по Отче наш]
Святый Боже, Святый Крепкий, Святый Безсмертный, помилуй нас. (Трижды)
Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков. Аминь.
Пресвятая Троице, помилуй нас; Господи, очисти грехи наша; Владыко, прости беззакония наша; Святый, посети и исцели немощи наша, имене Твоего ради.
Господи, помилуй. (Трижды)
Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков. Аминь.
Отче наш, Иже еси на небесех! Да святится имя Твое, да приидет Царствие Твое, да будет воля Твоя, яко на небеси и на земли. Хлеб наш насущный даждь нам днесь; и остави нам долги наша, якоже и мы оставляем должником нашим; и не введи нас во искушение, но избави нас от лукаваго. Аминь.

[Тропари покаянные вечерние]
Помилуй нас, Господи, помилуй нас; всякаго бо ответа недоумеюще, сию Ти молитву яко Владыце грешнии приносим: помилуй нас.
Слава Отцу и Сыну и Святому Духу.
Господи, помилуй нас, на Тя бо уповахом; не прогневайся на ны зело, ниже помяни беззаконий наших, но призри и ныне яко благоутробен, и избави ны от враг наших; Ты бо еси Бог наш, и мы людие Твои, вси дела руку Твоею, и имя Твое призываем.
И ныне и присно и во веки веков. Аминь.
Милосердия двери отверзи нам, благословенная Богородице, надеющиися на Тя да не погибнем, но да избавимся Тобою от бед: Ты бо еси спасение рода христианскаго.

Господи, помилуй. (12 раз)`,
    },
  },
  {
    id: 'evening-macarius',
    category: 'evening',
    sequenceNumber: 2,
    title: {
      ja: '聖大マカリイの就寝前の祈祷（父なる神へ）',
      en: 'First Prayer of St. Macarius the Great to God the Father',
      ru: 'Молитва 1-я, святаго Макария Великаго, к Богу Отцу',
    },
    subtitle: {
      ja: '永遠の神、万物の王よ',
      en: 'O Eternal God and King of all creation',
      ru: 'Господи Боже вечный и Царю всякаго создания',
    },
    text: {
      ja: `永遠の神、万物の王よ、今日この時に至るまで我を生かし給いし主よ、今日において我が言葉、行い、想念をもって犯したる罪を赦し給え。
主よ、我が哀れなる霊を肉と霊の総ての汚れより潔め給え。
善徳者よ、この夜を平穏に眠らしめ、我が床より起き出でて、生ある限りの日々に爾の聖なる名を喜ばしめ、我に迫る肉と霊の仇に打ち勝たしめ給え。
我を徒なる想念と悪しき欲望より救い給え。
蓋し国と権能と光栄は、爾父と子と聖神に世々に帰す。アミン。`,
      en: `O Eternal God and King of all creation, Who hast vouchsafed me to arrive even unto this hour: forgive me the sins which I have committed this day in deed, word, and thought.
Cleanse, O Lord, my humble soul from all defilement of flesh and spirit.
And grant me, O Lord, to pass the sleep of this night in peace, that rising from my bed I may please Thy most holy Name all the days of my life, and vanquish the foes, both corporeal and incorporeal, that contend against me.
Deliver me, O Lord, from vain thoughts and evil desires that defile me.
For Thine is the kingdom, and the power, and the glory: of the Father, and of the Son, and of the Holy Spirit, now and ever, and unto ages of ages. Amen.`,
      ru: `Боже вечный и Царю всякаго создания, сподобивый мя даже в час сей доспети, прости ми грехи, яже сотворих в сей день делом, словом и помышлением,
и очисти, Господи, смиренную мою душу от всякия скверны плоти и духа.
И даждь ми, Господи, в нощи сей сон прейти в мире, да востав от смиреннаго ми ложа, благоугожду пресвятому имени Твоему во вся дни живота моего, и поперу борющия мя враги плотския и безплотныя.
И избави мя, Господи, от помышлений суетных, оскверняющих мя, и похотей лукавых.
Яко Твое есть Царство, и сила и слава, Отца и Сына и Святаго Духа, ныне и присно и во веки веков. Аминь.`,
    },
  },
  {
    id: 'evening-forgiveness',
    category: 'evening',
    sequenceNumber: 3,
    title: {
      ja: '一日の罪の赦しを乞う祈祷（聖金口イオアン）',
      en: 'Evening Prayer for Forgiveness of Sins (St. John Chrysostom)',
      ru: 'Молитва на прощение грехов свт. Иоанна Златоуста',
    },
    subtitle: {
      ja: '言・行・思いによる罪の悔い改めと平和な眠り',
      en: 'Confession of Sins in Word, Deed, and Thought',
      ru: 'Еже согреших во дни сем словом, делом и помышлением',
    },
    text: {
      ja: `主、我が神よ、今日において我が言葉、行い、想念をもって犯したる総ての罪を、善徳にして人を愛する主よ、我に赦し給え。
安らかなる眠りと静けさを我に与え、一切の凶悪の煩いより我を守り給え。
蓋し爾は我が霊と肉体の守護者にして、我等は爾父と子と聖神に光栄を帰す、今もいつも世々に至るまで。アミン。`,
      en: `O Lord our God, whatever sins I have committed this day in word, deed, or thought, forgive me, for Thou art good and lovest mankind.
Grant me peaceful and undisturbed sleep; send Thy Guardian Angel to shelter and protect me from every evil.
For Thou art the Guardian of our souls and bodies, and to Thee we ascribe glory: to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages. Amen.`,
      ru: `Господи Боже наш, еже согреших во дни сем словом, делом и помышлением, яко Благ и Человеколюбец прости ми.
Мирен сон и безмятежен даруй ми. Ангела Твоего хранителя посли, покрывающа и соблюдающа мя от всякаго зла,
яко Ты еси хранитель душам и телесем нашим, и Тебе славу возсылаем, Отцу и Сыну и Святому Духу, ныне и присно и во веки веков. Аминь.`,
    },
  },
  {
    id: 'evening-guardian-angel',
    category: 'evening',
    sequenceNumber: 4,
    title: {
      ja: '守護天使への就寝前の祈祷',
      en: 'Prayer to the Holy Guardian Angel before Sleep',
      ru: 'Молитва Ангелу Хранителю на сон грядущим',
    },
    subtitle: {
      ja: '夜間の守護と過失の赦し',
      en: 'Protection during Sleep and Night Hours',
      ru: 'О прощении дневных грехов и защите во время сна',
    },
    text: {
      ja: `ハリストスの聖なる天使、我が哀れなる霊と肉体の敬虔なる守護者よ、
今日において爾を怒らせし我が総ての過失を赦し、敵の総ての悪巧みより我を救い給え。
我の為に我が主神に祈り、主の恩寵に値する僕となさしめ給え。アミン。`,
      en: `O Angel of Christ, holy guardian and protector of my soul and body,
forgive me everything wherein I have sinned this day, and deliver me from every deceit of the enemy.
Pray for me to the Lord God, that He may show me to be worthy of His goodness and grace. Amen.`,
      ru: `Ангеле Христов, хранителю мой святый и покровителю души и тела моего,
вся ми прости, елика согреших во днешний день, и от всякаго лукавствия противнаго ми врага избави мя.
Но моли за мя грешнаго и недостойнаго раба, яко да достойна мя покажеши благости и милости Святыя Троицы. Аминь.`,
    },
  },
  {
    id: 'evening-champion-leader',
    category: 'evening',
    sequenceNumber: 5,
    title: {
      ja: '生神女小讃詞（導きの勇士）',
      en: 'Kontakion of the Theotokos (The Champion Leader)',
      ru: 'Кондак Богородице (Взбранной Воеводе)',
    },
    subtitle: {
      ja: '勝利と感謝の歌（アカイストスの前駆）',
      en: 'Song of Victory and Thanksgiving to the Mother of God',
      ru: 'Благодарственная песнь Пресвятей Богородице',
    },
    text: {
      ja: `我ら爾の僕等は、患難より救われて、克勝の歌と感謝の歌とを、勇士の導き手なる生神女たる爾に献ず。
爾は抗し難き威力あるを以て、我等を諸の危難より免れしめ給え、
我等爾に叫ばん、「喜べよ、夫を知らざる婚婦（はなよめ）！」`,
      en: `To thee, the Champion Leader, we thy servants dedicate a song of victory and of thanksgiving as ones who have been delivered from afflictions, O Theotokos!
But since thou hast unassailable might, deliver us from every danger, that we may cry unto thee:
Rejoice, O Bride unwedded!`,
      ru: `Взбранной Воеводе победительная, яко избавльшеся от злых, благодарственная восписуем Ти раби Твои, Богородице,
но яко имущая державу непобедимую, от всяких нас бед свободи, да зовем Ти:
Радуйся, Невесто Неневестная!`,
    },
  },
  {
    id: 'evening-cross',
    category: 'evening',
    sequenceNumber: 6,
    title: {
      ja: '尊い十字架への祈祷',
      en: 'Prayer to the Precious and Life-Giving Cross',
      ru: 'Молитва Честному и Животворящему Кресту Господню',
    },
    subtitle: {
      ja: '神よ奮い起きて、その仇を散らし給え',
      en: 'Let God Arise, and Let His Enemies Be Scattered',
      ru: 'Да воскреснет Бог, и расточатся врази Его',
    },
    text: {
      ja: `神よ奮い起きて、その仇を散らし、主を憎む者をその御前より逃げ走らしめ給え。
煙の散るが如く彼らを散らし、火の前に蝋の溶くるが如く、悪霊どもを神を愛し十字架の印を結ぶ者の前より滅ぼし給え。
尊く生命を施す主の十字架よ、歓喜せよ。爾の力によりて悪霊は追い払わる。
尊い十字架と至聖なる生神女よ、我を助け給え。世々に至るまで。アミン。`,
      en: `Let God arise, and let His enemies be scattered; let those who hate Him flee before His face!
As smoke vanishes, so let them vanish; as wax melts before the fire, so let the demons perish from before the face of those who love God and sign themselves with the sign of the Cross.
Rejoice, O Most Precious and Life-Creating Cross of the Lord, which drivest away demons by the power of our Lord Jesus Christ!
O Precious and Life-Giving Cross of the Lord, help me with the Holy Virgin Theotokos and with all the Saints forever. Amen.`,
      ru: `Да воскреснет Бог, и расточатся врази Его, и да бежат от лица Его ненавидящии Его.
Яко исчезает дым, да исчезнут; яко тает воск от лица огня, тако да погибнут беси от лица любящих Бога и знаменующихся крестным знамением.
Радуйся, Пречестный и Животворящий Кресте Господень, прогоняяй бесы силою на тебе распятаго Господа нашего Иисуса Христа.
О, Пречестный и Животворящий Кресте Господень! Помогай ми со Святою Госпожею Девою Богородицею и со всеми святыми во веки. Аминь.`,
    },
  },
  {
    id: 'evening-into-thy-hands',
    category: 'evening',
    sequenceNumber: 7,
    title: {
      ja: '就寝時の委ね（主の御手に）',
      en: 'Committal upon Sleep (Into Thy Hands, O Lord)',
      ru: 'Предание себя в руце Божии (В руце Твои, Господи)',
    },
    subtitle: {
      ja: '眠りに入る直前の祈り',
      en: 'Final Prayer as Sleep Approaches',
      ru: 'Молитва перед отходом ко сну',
    },
    text: {
      ja: `主イイスス・ハリストス、我が神よ、爾の御手に我が霊を委ね奉る。
主よ、我を祝し、我を憐れみ、永遠の生命を我に賜え。アミン。`,
      en: `Into Thy hands, O Lord Jesus Christ, my God, I commend my spirit.
Bless me, have mercy upon me, and grant me life eternal. Amen.`,
      ru: `В руце Твои, Господи Иисусе Христе, Боже мой, предаю дух мой:
Ты же мя благослови, Ты мя помилуй и живот вечный даруй ми. Аминь.`,
    },
  },

  // ==========================================
  // 3. 領聖前の準備祈祷 (Pre-Communion Preparation / Ко Святому Причащению)
  // ==========================================
  {
    id: 'communion-troparia',
    category: 'communion',
    communionPhase: 'preparation',
    sequenceNumber: 1,
    title: {
      ja: '領聖準備の小讃詞・詩節',
      en: 'Verses & Troparia before Holy Communion',
      ru: 'Входные стихи пред Святым Причащением',
    },
    subtitle: {
      ja: '恐れつつ神の血を仰げ（神の身肉と血への畏敬）',
      en: 'Beholding the Deifying Blood and Sacred Mysteries',
      ru: 'Боготворящую Кровь ужаснися, человече, зря',
    },
    text: {
      ja: `【機密に近づく者の詩節】
恐れつつ神の血を仰げ、人よ。是れ不相応なる者を焼き尽くす炭火なればなり。
神の尊き身肉は我を神化し、我が霊を養い、人知を超えて我が心を潔む。

主の甘美なる愛をもて我を引き寄せ、神の情熱をもて我を変容せしめ給え。
無形の火をもて我が罪過を焼き払い、爾の喜びに満たし給え。
以て我が歓喜して、善徳者よ、爾の初めと終わりの顕現を讃揚せしめんことを。

爾の聖徒らの光栄のうちに、我はいかにして不相応に入らんや。
我あえて婚宴の部屋に入らんとせば、我が衣服は我を責む、是れ婚宴の服ならざればなり。
我は縛られて天使らに投げ出されん。
主よ、我が霊の汚れを潔め、唯一人を愛する主よ、我を救い給え。`,
      en: `[Verses upon Approaching the Holy Mysteries]
Tremble, O mortal, beholding the deifying Blood; for it is a coal that burneth the unworthy.
The divine Body both deifieth and nourisheth me; it deifieth the spirit and wondrously nourisheth the mind.

Thou hast sweetened me with longing for Thee, O Christ, and hast transformed me by Thy divine love.
Consume my sins with immaterial fire, and vouchsafe me to be filled with delight in Thee,
that leaping for joy I may magnify Thy two comings, O Good One!

Into the splendor of Thy saints, how can I who am unworthy enter?
For if I dare to enter into the bridal chamber, my raiment convicteth me, for it is not a wedding garment,
and bound I shall be cast out by the angels.
Cleanse, O Lord, the defilement of my soul, and save me, for Thou art the Lover of mankind.`,
      ru: `[Стихи пред причащением]
Боготворящую Кровь ужаснися, человече, зря: огнь бо есть, недостойныя паляй.
Божественное Тело и обожает мя и питает: обожает дух, ум же питает странно.

Усладил мя еси любовию, Христе, и изменил мя еси божественным Твоим рачением;
но попали огнем невещественным грехи моя, и насытитися Твоея пищи сподоби,
да ликуя величаю, Блаже, два пришествия Твоя.

Во светлостех святых Твоих како вниду недостойный?
Аще бо дерзну совнити в чертог, одежда мя обличает, яко несть брачна,
и связан извержен буду от Ангелов.
Очисти, Господи, скверну души моея, и спаси мя, яко Человеколюбец.`,
    },
  },
  {
    id: 'communion-basil',
    category: 'communion',
    communionPhase: 'preparation',
    sequenceNumber: 2,
    title: {
      ja: '聖大ワシリイの領聖祈祷',
      en: 'First Prayer of St. Basil the Great',
      ru: 'Молитва 1-я, святителя Василия Великаго',
    },
    subtitle: {
      ja: '生命と不朽の泉、万物の造り主なる主への悔悛',
      en: 'Master, Lord Jesus Christ, Source of Life and Immortality',
      ru: 'Владыко Господи Иисусе Христе, Источниче жизни и безсмертия',
    },
    text: {
      ja: `主宰主イイスス・ハリストス、我らの神よ、生命と不朽の泉よ、見ゆると見えざる万物の造り主よ、
常生の父の共栄なる子よ、過ぐる日の慈愛によりて、終わりの時に肉をまとい、
我ら恩を知らざる歪める者のために十字架に釘うたれ、爾自らの血をもって我が罪過に損なわれたる性を更新し給いし主よ。

不死の王よ、罪人なる我が悔い改めを受け容れ、爾の耳を傾けて我が言葉を聴き給え。
我は罪を犯せり、主よ、天と爾の御前において罪を犯し、爾の至高の光栄を仰ぎ望むに相応しからず。
我は爾の戒めを破り、爾の掟に従わざりき。

然れども主よ、爾は寛容にして大いなる慈悲深き主なり。我を我が不法のうちに滅ぼすことなく、我が立ち返りを待ち給えり。
人を愛する主宰よ、爾預言者を以て語り給いき、「我は悪人の死を喜ばず、悪人のその道より立ち返りて生くるを喜ぶ」と。
爾の造り物を滅ぼさんことを欲せず、総ての人の救われて真理の知識に至らんことを欲し給えり。

是の故に、天にも地にも相応しからざる我、罪に我が全身を委ね、肉の欲情に仕えし者なれども、
爾の測り知れざる慈愛と寛容に依り頼みて、爾に近づく。
善徳者よ、我を斥け給う勿れ。我が霊と肉体を潔め、爾の尊き潔白なる聖体と聖血を拝領せしめ、
以て罪の赦しと永遠の生命を得せしめ給え。アミン。`,
      en: `Master, Lord Jesus Christ our God, Source of life and immortality, Creator of all things visible and invisible,
Son of the co-eternal Father, Who through the abundance of Thy goodness didst in the last days put on flesh,
and was crucified and buried for us ungrateful and thankless ones, and by Thine own Blood didst renew our nature corrupted by sin:

Do Thou, O Immortal King, accept the repentance of me a sinner, and incline Thine ear unto me and hearken unto my words.
For I have sinned, O Lord, I have sinned against heaven and before Thee, and am not worthy to lift up mine eyes to the height of Thy glory;
for I have provoked Thy goodness by transgressing Thy commandments and not obeying Thine ordinances.

But Thou, O Lord, being longsuffering and plenteous in mercy, hast not given me over to perish in my transgressions,
but ever awaitest my return.
For Thou, O Lover of mankind, hast said through Thy prophet: "As I live, saith the Lord, I desire not the death of a sinner, but that he turn and live."
For Thou willest not, O Master, that the work of Thy hands should perish, but desirest that all men should be saved and come to the knowledge of the truth.

Wherefore, though I am unworthy both of heaven and of earth, yet trusting in Thine infinite mercy and goodness,
I draw near unto Thee.
Cast me not away from Thy presence, O Good One, but cleanse my soul and body, and grant me without condemnation
to partake of Thine immaculate and life-giving Mysteries, unto the remission of sins and unto life eternal. Amen.`,
      ru: `Владыко Господи Иисусе Христе, Боже наш, Источниче жизни и безсмертия, всея твари видимыя и невидимыя Содетелю,
безначальнаго Отца соприсносущный Сыне и собезначальный, премногия ради благости в последния дни в плоть обокийся,
и распныйся, и погребыйся за ны, неблагодарныя и злонравныя, и Твоею Кровию возобновивый растлевшее грехом естество наше:

Сам, Безсмертный Царю, приими и мое грешнаго покаяние, и приклони ухо Твое мне, и услыши глаголы моя.
Согреших бо, Господи, согреших на небо и пред Тобою, и несмь достоин воззрети на высоту славы Твоея:
прогневах бо Твою благость, Твоя заповеди преступив, и не послушав Твоих повелений.

Но Ты, Господи, незлобив сый, долготерпелив же и многомилостив, не предал еси мене погибнути со беззаконьми моими,
моего всячески ожидая обращения.
Ты бо рекл еси, Человеколюбче, пророком Твоим: яко хотением не хощу смерти грешника, но еже обратитися и живу быти ему.
Не хощеши бо, Владыко, создания Твоего руку погубити, но хощеши всем спастися, и в разум истины приити.

Темже и аз, аще и недостоин есмь небесе и земли, уповая на безмерное Твое благоутробие, дерзая прихожду к Тебе.
Не отрини мене от лица Твоего, Блаже, но сподоби мя неосужденно причаститися пречистых Твоих Таин,
во оставление грехов и в жизнь вечную. Аминь.`,
    },
  },
  {
    id: 'communion-chrysostom',
    category: 'communion',
    communionPhase: 'preparation',
    sequenceNumber: 3,
    title: {
      ja: '聖金口イオアンの領聖祈祷（主よ、我信ず）',
      en: 'Pre-Communion Prayer of St. John Chrysostom',
      ru: 'Молитва свт. Иоанна Златоуста перед Причащением',
    },
    subtitle: {
      ja: '聖杯に近づく直前の信仰の告白祈祷',
      en: 'Confession of Faith before the Chalice',
      ru: 'Верую, Господи, и исповедую',
    },
    text: {
      ja: `主よ、我信ず、また言い表す、爾は真に生ける神の子ハリストスにして、罪人を救わんが為に世に来たり給えり、罪人の中に我は首なり。
又信ず、是れ真に爾の尊き身肉にして、是れ真に爾の尊き血なり。
是の故に爾に祈る、我を憐れみ、我が自らと自らならずして、言葉により、行いにより、知ると知らざるとを問わず犯したる総ての罪を赦し給え。
我をして罪に定められずして、爾の尊き機密に与らしめ、以て罪の赦しと永遠の生命を得せしめ給え。

神の子よ、本日我を爾の神秘の晩餐の預かり人となし給え。
我は爾の仇に奥秘を語らず、イウダの如き接吻を爾に与えじ、
唯だ盗賊の如く爾に言い表さん、「主よ、爾の国において我を記憶し給え。」

主よ、爾の聖なる機密に与ることは、我が審判又は罪定めとなることなく、我が霊と肉体の癒やしとならんことを。アミン。`,
      en: `I believe, O Lord, and I confess that Thou art truly the Christ, the Son of the Living God, Who camest into the world to save sinners, of whom I am first.
I believe also that this is truly Thine own most pure Body, and that this is truly Thine own precious Blood.
Therefore I pray Thee: have mercy upon me and forgive my transgressions both voluntary and involuntary, of word and of deed, of knowledge and of ignorance.
And make me worthy to partake without condemnation of Thy most pure Mysteries, unto the remission of sins and unto life everlasting.

Of Thy Mystical Supper, O Son of God, accept me today as a communicant;
for I will not speak of Thy Mystery to Thine enemies, neither like Judas will I give Thee a kiss;
but like the thief will I confess Thee: "Remember me, O Lord, in Thy Kingdom."

May the communion of Thy holy Mysteries be neither to my judgment, nor to my condemnation, O Lord, but to the healing of soul and body. Amen.`,
      ru: `Верую, Господи, и исповедую, яко Ты еси воистину Христос, Сын Бога живаго, пришедый в мир грешныя спасти, от нихже первый есмь аз.
Еще верую, яко сие есть самое пречистое Тело Твое, и сия есть самая честная Кровь Твоя.
Молюся убо Тебе: помилуй мя, и прости ми прегрешения моя, вольная и невольная, яже словом, яже делом, яже ведением и неведением,
и сподоби мя неосужденно причаститися пречистых Твоих Таинств, во оставление грехов, и в жизнь вечную.

Вечери Твоея тайныя днесь, Сыне Божий, причастника мя приими;
не бо врагом Твоим тайну повем, ни лобзания Ти дам, яко Иуда,
но яко разбойник исповедаю Тя: помяни мя, Господи, во Царствии Твоем.

Да не в суд или во осуждение будет мне причащение святых Твоих Таин, Господи, но во исцеление души и тела. Аминь.`,
    },
  },
  {
    id: 'communion-damascus',
    category: 'communion',
    communionPhase: 'preparation',
    sequenceNumber: 4,
    title: {
      ja: 'ダマスコの聖イオアンの領聖祈祷',
      en: 'Prayer of St. John of Damascus',
      ru: 'Молитва преподобнаго Иоанна Дамаскина',
    },
    subtitle: {
      ja: '聖堂の門前に立ちて主の慈悲を乞う祈り',
      en: 'Standing before the Doors of Thy Sanctuary',
      ru: 'Пред враты храма Твоего предстою',
    },
    text: {
      ja: `主宰主イイスス・ハリストス、我らの神よ、唯一人を愛する主よ、
我は爾の聖堂の門前に立ちて、悪しき想念より離るること能わず。
されど、取税人を義とし、罪ある女の涙を納れ、盗賊に楽園の門を開き給いしハリストス神よ、
我を受け容れ、悔い改めて爾に近づく我を抱き給え。

我が汚れし唇と穢れたる手をもて、爾の尊き身肉を拝領せんとする我を退け給う勿れ。
主よ、爾の愛の神秘によりて我が不法を赦し、
我が霊を照らし、至聖なる御名、父と子と聖神を罪に定められずして讃美せしめ給え。アミン。`,
      en: `Master, Lord Jesus Christ our God, Who alone hast power to remit sins:
I stand before the doors of Thy sanctuary, and am not able to banish my evil thoughts.
But Thou, O Christ God, Who didst justify the publican, and hadst mercy on the sinful woman, and didst open the gates of Paradise to the thief:
receive me also as I come and touch Thee.

Turn not away from me as I touch Thy sacred Body with defiled lips and hands,
but according to Thine ineffable love pardon all my transgressions,
enlighten my soul, and make me worthy to glorify Thy most holy Name: of the Father, and of the Son, and of the Holy Spirit, now and ever, and unto ages of ages. Amen.`,
      ru: `Владыко Господи Иисусе Христе, Боже наш, един имеяй власть человеком грехи отпущати:
Пред враты храма Твоего предстою, и лютых помышлений не отступаю;
но Ты, Христе Боже, мытаря оправдивый, и грешницу помиловавый, и разбойнику райския двери отверзый,
отверзи ми утробы человеколюбия Твоего, и приими мя приходяща и прикасающася Тебе.

Не возгнушайся скверных устен моих и нечистых рук,
но яко Благ и Человеколюбец прости ми вся прегрешения моя,
просвети душу мою, и сподоби мя неосужденно славити всесвятое имя Твое, Отца и Сына и Святаго Духа, ныне и присно и во веки веков. Аминь.`,
    },
  },
  {
    id: 'communion-new-theologian',
    category: 'communion',
    communionPhase: 'preparation',
    sequenceNumber: 5,
    title: {
      ja: '新神学者聖シメオンの領聖祈祷',
      en: 'Prayer of St. Symeon the New Theologian',
      ru: 'Молитва преподобнаго Симеона Новаго Богослова',
    },
    subtitle: {
      ja: '汚れし心より注ぐ涙の悔い改め',
      en: 'From Defiled Lips and an Unclean Heart',
      ru: 'От скверных устен, от мерзкаго сердца',
    },
    text: {
      ja: `汚れし唇より、悪しき心より、潔からざる舌より、汚れたる魂より、
我が祈りを受け給え、我がハリストスよ。
我が言葉を斥けず、我が面を避けず、我が大胆さを咎め給う勿れ。
主よ、我をして願うところを大胆に語らしめ給え。

我が罪の数は海砂よりも多く、我が不法は重し。
然れども主よ、我が涙を看過し給う勿れ、爾は我が滴る涙をすべて知ろし召せばなり。
我が弱さを顧み、我が罪を赦し、神の機密に与る我を聖化し給え。
以て我が爾に結ばれ、爾我がうちに住まわんことを。アミン。`,
      en: `From lips defiled, from a heart unclean, from a tongue polluted, from a soul defiled:
receive my prayer, O my Christ!
Disdain not my words, nor my countenance, nor my shamelessness.
Grant me, O my Christ, with boldness to speak what I desire.

For my sins are more in number than the sands of the sea, and heavy is mine iniquity.
Yet, O Lord, despise not my tears, for Thou knowest every drop that falleth from mine eyes.
Look upon mine infirmity, forgive all my sins, and sanctify me as I partake of Thy divine Mysteries,
that I may abide in Thee, and Thou in me, unto ages of ages. Amen.`,
      ru: `От скверных устен, от мерзкаго сердца, от нечистаго языка, от души осквернены,
приими моление, Христе мой:
и не отрини мене, ниже словес моих, ниже образов, ниже безстудия.
Даждь ми дерзновенно глаголати, яже хощу, Христе мой.

Грехи бо моя превысиша песок морский, и тяжка беззакония моя.
Но, Господи, не презри слез моих, вся бо капли слезныя веси.
Призри на немощь мою, прости вся грехи моя, и освяти мя причащающася Божественных Твоих Таинств,
да пребываю в Тебе, и Ты во мне, во веки веков. Аминь.`,
    },
  },
  {
    id: 'communion-metaphrastes',
    category: 'communion',
    communionPhase: 'preparation',
    sequenceNumber: 6,
    title: {
      ja: 'シメオン・メタフラストの領聖祝文',
      en: 'Prayer of St. Symeon Metaphrastes',
      ru: 'Молитва св. Симеона Метафраста перед Причащением',
    },
    subtitle: {
      ja: 'キリストを心に迎え入れる祈祷',
      en: 'Prayer for Inhabitation of Christ in the Heart',
      ru: 'О вселении Христа в сердце',
    },
    text: {
      ja: `唯一潔白にして不朽なる主イイスス・ハリストスよ、
言い難き慈愛をもって我らの全き人性を取り、十字架の受難によりて我らを救い給いし主よ、
我が肉の欲情を殺し、我が霊の汚れを潔め、爾の生命を施す玄義によりて、我が心にハリストスを住まわしめ給え。アミン。`,
      en: `O Lord Jesus Christ, alone pure and incorruptible, Who in Thy wondrous love didst take our human flesh:
Cleanse my soul from every defilement, mortify the passions of my flesh,
and by Thy life-creating Mysteries make my heart a living temple of Thy Holy Spirit. Amen.`,
      ru: `Едине чистый и нетленный Господи Иисусе Христе, неизреченным Твоим человеколюбием плоть нашу восприявый:
Очисти душу мою от всякия скверны, умертви плотския страсти, и причащением животворящих Твоих Таин вселися в сердце мое. Аминь.`,
    },
  },

  // ==========================================
  // 4. 領聖後の感謝祝文 (Post-Communion Thanksgiving / Благодарственные молитвы)
  // ==========================================
  {
    id: 'post-communion-thanks',
    category: 'communion',
    communionPhase: 'thanksgiving',
    sequenceNumber: 1,
    title: {
      ja: '領聖後の感謝祈祷（光栄は爾に帰す）',
      en: 'First Prayer of Thanksgiving after Holy Communion',
      ru: 'Благодарственная молитва 1-я, анонимная',
    },
    subtitle: {
      ja: '天の聖なる機密に与りし恵みへの三度の感謝',
      en: 'Glory to Thee, O God (Thrice) for Partaking of the Holy Gifts',
      ru: 'Слава Тебе, Боже! (трижды) за причастие Святых Таин',
    },
    text: {
      ja: `光栄は爾に帰す、神よ、光栄は爾に帰す、神よ、光栄は爾に帰す、神よ。

主よ、罪人にして不相応なる我を退けず、爾の極めて清き天の機密に与ることを許し給いしことを感謝す。
願わくは此の領聖の我が霊と肉体の癒やしとなり、信仰の堅固、仁愛の全き成就、悪徳の絶滅、並びに爾の戒めの実行とならんことを。
願わくは我が生命の終わりに至るまで、罪に定められずして爾の尊き体を拝領せしめ給え。

聖なる主宰よ、爾の聖所の中に我を守り、日夜を問わず爾の義を学ぶことを得せしめ給え。
以て我がもはや己のために生きず、我らのために死して復活し給いし主宰、神なる爾のために生きんことを。アミン。`,
      en: `Glory to Thee, O God! Glory to Thee, O God! Glory to Thee, O God!

I thank Thee, O Lord my God, that Thou hast not rejected me, a sinner, but hast permitted me to partake of Thy holy and heavenly Mysteries.
Let these holy Gifts be for the healing of my soul and body, the strengthening of faith, the perfecting of love, the destruction of passions, and the keeping of Thy commandments.
Preserve me in Thy holiness all the days of my life, that I may live no longer for myself, but for Thee, our Master and Benefactor, Who didst die and rise again for us. Amen.`,
      ru: `Слава Тебе, Боже! Слава Тебе, Боже! Слава Тебе, Боже!

Благодарю Тя, Господи Боже мой, яко не отринул еси мене грешнаго, но сподобил мя еси причастника быти святынь Твоих.
Да будут ми Святыя сия во исцеление души же и тела, во отгнание всякаго сопротивнаго, в просвещение очес сердца моего, в мир душевных моих сил, в веру непостыдну, в любовь нелицемерну, в соблюдение заповедей Твоих.
Святый Владыко, соблюди мя во Твоей святыне, да всю жизнь мою славлю пресвятое имя Твое, и не ктому себе живу, но Тебе, нашему Владыце и Благодетелю. Аминь.`,
    },
  },
  {
    id: 'communion-thanks-basil',
    category: 'communion',
    communionPhase: 'thanksgiving',
    sequenceNumber: 2,
    title: {
      ja: '聖大ワシリイの領聖感謝祈祷',
      en: 'Second Prayer of Thanksgiving (St. Basil the Great)',
      ru: 'Молитва 2-я, святителя Василия Великаго',
    },
    subtitle: {
      ja: '庇護の翼の下に守られんことを乞う感謝の祈り',
      en: 'Master, Christ God, King of the Ages and Creator of All',
      ru: 'Владыко Христе Боже, Царю веков и Содетелю всех',
    },
    text: {
      ja: `万物の主宰、世々の王、万物の造り主なるハリストス神よ、
爾の我に賜いし総ての善きものと、爾の尊き潔白にして生命を施す機密に与ることを許し給いしことを感謝す。
善徳にして人を愛する主よ、爾に祈る、我を爾の庇護の翼の下に守り給え。

我が最後の息に至るまで、潔き良心をもって相応しく爾の機密に与り、
罪の赦しと永遠の生命を得せしめ給え。
蓋し爾は生命のパン、聖化の泉、万善の施主にして、
我らは父と子と聖神に光栄を帰す、今もいつも世々に至るまで。アミン。`,
      en: `Master, Christ God, King of the ages and Creator of all:
I thank Thee for all the good things Thou hast given me, and for the communion of Thy pure and life-giving Mysteries.
I pray Thee, therefore, O Good One and Lover of mankind: keep me under Thy shelter and under the shadow of Thy wings.

Grant me, even unto my last breath, with a pure conscience worthily to partake of Thy Holy Gifts,
unto the remission of sins and unto life eternal.
For Thou art the Bread of life, the Fountain of holiness, and the Giver of all good things,
and unto Thee do we send up glory: to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages. Amen.`,
      ru: `Владыко Христе Боже, Царю веков и Содетелю всех,
благодарю Тя о всех, яже ми еси подал благих, и о причащении пречистых и животворящих Твоих Таинств.
Молю убо Тя, Блаже и Человеколюбче: сохрани мя под кровом Твоим, и в сени крилу Твоею.

И даруй ми чистою совестию, даже до последняго издыхания моего, достойно причащатися святынь Твоих,
во оставление грехов, и в жизнь вечную.
Ты бо еси Хлеб животный, Источник святыни, Податель благих,
и Тебе славу возсылаем, со Отцем и Святым Духом, ныне и присно и во веки веков. Аминь.`,
    },
  },
  {
    id: 'communion-thanks-metaphrastes',
    category: 'communion',
    communionPhase: 'thanksgiving',
    sequenceNumber: 3,
    title: {
      ja: 'シメオン・メタフラストの感謝祈祷',
      en: 'Third Prayer of Thanksgiving (St. Symeon Metaphrastes)',
      ru: 'Молитва 3-я, святаго Симеона Метафраста',
    },
    subtitle: {
      ja: '悪しき情欲を焼き尽くし骨節と心を聖化する火',
      en: 'Thou Who Willingly Givest Thy Flesh to Me as Food',
      ru: 'Давый пищу мне плоть Твою волею',
    },
    text: {
      ja: `我が身肉を喜んで我に与え給いし主よ、火となりて相応しからざる者を焼き尽くす主よ、
願わくは我が身を焼き尽くすことなく、我が骨節に入りて我が全身を清め、
悪しき情欲の棘を焼き払い給え。

我が霊を潔め、我が思いを聖化し、我が足取りを堅固にし給え。
我をして総ての悪しき言葉と行いより免れしめ、
爾の光栄の住まいとならしめ給え。
以て我が爾の受難と復活を感謝し、世々に至るまで爾を讃美せんことを。アミン。`,
      en: `O Thou Who willingly givest Thy flesh to me as food,
Thou Who art a fire consuming the unworthy: consume me not, O my Creator!
Rather, penetrate into my members, into all my joints, into my heart and reins,
and burn up the thorns of all my sins.

Purify my soul, sanctify my mind, strengthen my steps.
Establish me in Thy fear, and show me to be the dwelling-place of Thy Holy Spirit alone.
That entering in peace, I may ever bless and glorify Thee, my Lord and Savior, unto ages of ages. Amen.`,
      ru: `Давый пищу мне плоть Твою волею,
огнь сый и опаляяй недостойныя, да не опалиши мене, Содетелю мой;
но пройди во уды моя, во вся составы, во утробу, в сердце.
Попали терние всех моих прегрешений.

Душу очисти, освяти помышления, составы утверди с костьми вкупе.
Страхом Твоим утверди мя, и скинию мя покажи Единаго Духа Святаго.
Да благословляю Тя, Владыку моего и Спасителя, во веки веков. Аминь.`,
    },
  },
  {
    id: 'communion-thanks-theotokos',
    category: 'communion',
    communionPhase: 'thanksgiving',
    sequenceNumber: 4,
    title: {
      ja: '至聖なる生神女への感謝祈祷',
      en: 'Fourth Prayer of Thanksgiving (To the Most Holy Theotokos)',
      ru: 'Молитва 4-я, ко Пресвятей Богородице',
    },
    subtitle: {
      ja: '暗き霊の光、真の生命のパンの母',
      en: 'Light of My Darkened Soul, Mother of the Bread of Life',
      ru: 'Свете помраченныя моея души, Богородице Дево',
    },
    text: {
      ja: `至聖なる女宰生神女よ、我が暗き霊の光、我が希望、我が保護、我が避難所、我が慰め、我が喜びよ。
生命の真のパンを生み給いし爾に感謝す。
我をして罪に定められずして、爾の子の尊き身肉と血を拝領せしめ給いし爾に感謝す。

慈愛深き母よ、我を憐れみ、我が心に痛悔と謙遜を与え、悪しき誘惑より我を守り給え。
我が最後の息に至るまで、聖体拝領の恵みを保たしめ、天の歓喜に至らしめ給え。
蓋し爾は福なり、世々に至るまで。アミン。`,
      en: `O Most Holy Lady Theotokos, light of my darkened soul, my hope, shelter, refuge, consolation, and joy!
I thank thee that thou hast vouchsafed me, who am unworthy, to be a communicant of the most pure Body and precious Blood of thy Son.
Thou who didst bear the true Light: enlighten the spiritual eyes of my heart.

Thou who didst conceive the Source of Immortality: enliven me who am dead in sins.
O merciful and compassionate Mother of the merciful God, have mercy on me,
and grant me repentance and contrition of heart, and humble thoughts.
Vouchsafe me, even unto my last breath, without condemnation to receive the sanctification of the most pure Mysteries,
for the healing of soul and body. For thou art blessed unto all ages. Amen.`,
      ru: `Пресвятая Владычице Богородице, свете помраченныя моея души, надеждо, покрове, прибежище, утешение, радование мое!
Благодарю тя, яко сподобила мя еси недостойнаго, причастника быти пречистаго Тела и честныя Крове Сына твоего.
Но рождшая истинный Свет, просвети моя умныя очи сердца.

Яже Источника безсмертия рождшая, оживотвори мя уязвленнаго грехом.
Яже милостиваго Бога милосердная Мати, помилуй мя,
и даждь ми умиление и сокрушение в сердце моем, и смирение в мыслех моих.
И сподоби мя до последняго издыхания неосужденно приимати пречистых Таин освящение,
во исцеление души же и тела. Яко благословена еси во веки веков. Аминь.`,
    },
  },
  {
    id: 'communion-thanks-simeon',
    category: 'communion',
    communionPhase: 'thanksgiving',
    sequenceNumber: 5,
    title: {
      ja: '神を受けしシメオンの祝歌（今爾の僕を去らしめ給う）',
      en: 'The Prayer of St. Simeon the God-Receiver (Nunc Dimittis)',
      ru: 'Песнь святаго Симеона Богоприимца (Ныне отпущаеши)',
    },
    subtitle: {
      ja: 'ルカによる福音書第2章29-32節・万民を照らす光',
      en: 'Luke 2:29-32 — Lord, Now Lettest Thou Thy Servant Depart in Peace',
      ru: 'Ныне отпущаеши раба Твоего, Владыко (Лк. 2:29–32)',
    },
    text: {
      ja: `主宰よ、今爾の僕を安らかに去らしめ給う、爾の言葉の如く。
蓋し我が目、爾の救いを見たり。
是れ爾が万民の御前に備え給いし者にして、
異邦人を照らす光、爾の民イスラエルの光栄なり。

【三聖讃〜至聖三位〜主の祈り】
聖なる神、聖なる勇力、聖なる不滅なる主、我等を憐れめよ。（三度）
光栄は父と子と聖神に帰す、今もいつも世々に至るまで、アミン。
天におらるる我らの父よ、願わくは爾の名は聖とせられ、爾の国は来たり、爾の旨は天に行わるるが如く地にも行われん...
（主の祈りを終え、聖堂の解散讃詞を唱う）`,
      en: `Lord, now lettest Thou Thy servant depart in peace, according to Thy word;
for mine eyes have seen Thy salvation,
which Thou hast prepared before the face of all people:
a light to lighten the Gentiles, and the glory of Thy people Israel.

[Trisagion Prayers through The Lord’s Prayer]
Holy God, Holy Mighty, Holy Immortal, have mercy on us. (Thrice)
Glory to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages. Amen.
Our Father, Who art in heaven, hallowed be Thy Name...`,
      ru: `Ныне отпущаеши раба Твоего, Владыко, по глаголу Твоему, с миром;
яко видеста очи мои спасение Твое,
еже еси уготовал пред лицем всех людей,
свет во откровение языков, и славу людей Твоих Израиля.

[Трисвятое по Отче наш]
Святый Боже, Святый Крепкий, Святый Безсмертный, помилуй нас. (Трижды)
Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков. Аминь.
Отче наш, Иже еси на небесех!..`,
    },
  },

  // ==========================================
  // 5. 食前・食後の祈り (Prayers at Meals / Трапезные молитвы)
  // ==========================================
  {
    id: 'meals-before',
    category: 'meals',
    sequenceNumber: 1,
    title: {
      ja: '食前の祈り（総ての人の目は爾を仰ぎ望む）',
      en: 'Prayer before Meals',
      ru: 'Молитва перед вкушением пищи',
    },
    subtitle: {
      ja: '日用の糧に対する祝福の祈り',
      en: 'Blessing of Daily Food and Drink',
      ru: 'Очи всех на Тя, Господи, уповают',
    },
    text: {
      ja: `総ての人の目は爾を仰ぎ望む、主よ、爾は時に従って彼らに糧を与え給う。
爾はその御手を開きて、生きとし生ける者をその恵みをもて満たし給う。
（主の祈り：「天におらるる我らの父よ...」を唱う）
ハリストス神よ、爾の僕の飲食を祝福し給え、蓋し爾は聖なり、世々に至るまで。アミン。`,
      en: `The eyes of all look unto Thee with hope, O Lord, and Thou givest them their food in due season.
Thou openest Thy hand, and fillest every living thing with Thy favor.
(Pray the Lord’s Prayer: Our Father...)
Christ our God, bless the food and drink of Thy servants, for Thou art holy, always, now and ever, and unto ages of ages. Amen.`,
      ru: `Очи всех на Тя, Господи, уповают, и Ты даеши им пищу во благовремении,
отверзаеши Ты щедрую руку Твою и исполняеши всякое животное благоволения.
(Отче наш...)
Христе Боже, благослови ястие и питие рабом Твоим, яко Свят еси всегда, ныне и присно и во веки веков. Аминь.`,
    },
  },
  {
    id: 'meals-after',
    category: 'meals',
    sequenceNumber: 2,
    title: {
      ja: '食後の祈り（感謝の祈祷）',
      en: 'Prayer after Meals',
      ru: 'Молитва после вкушения пищи',
    },
    subtitle: {
      ja: '地上の恵みと天の国を求める祈り',
      en: 'Thanksgiving for Nourishment and the Heavenly Kingdom',
      ru: 'Благодарение за насыщение земными благами',
    },
    text: {
      ja: `我らは爾に感謝す、ハリストス我が神よ、爾地上の良き糧をもて我らを飽かし給えばなり。
願わくは天の国より我らを除かず、爾の弟子等の真ん中に来たりて平安を与え給いし如く、我らの中に来たりて我らを救い給え。アミン。`,
      en: `We thank Thee, Christ our God, that Thou hast satisfied us with Thy earthly blessings;
deprive us not of Thy Heavenly Kingdom, but as Thou didst come among Thy disciples, O Savior, and gavest them peace: come unto us and save us! Amen.`,
      ru: `Благодарим Тя, Христе Боже наш, яко насытил еси нас земных Твоих благ;
не лиши нас и Небеснаго Твоего Царствия, но яко посреде учеников Твоих пришел еси, Спасе, мир даяй им, прииди к нам и спаси нас. Аминь.`,
    },
  },

  // ==========================================
  // 6. 時々の祈り・生神女への祈祷 (Occasional & Marian Prayers)
  // ==========================================
  {
    id: 'occasional-travel',
    category: 'occasional',
    sequenceNumber: 1,
    title: {
      ja: '旅立つ者のための祈願',
      en: 'Prayer before a Journey',
      ru: 'Молитва перед отправлением в путь',
    },
    subtitle: {
      ja: '道中の平安と守護',
      en: 'Supplication for Safe Travel',
      ru: 'О путешествующих',
    },
    text: {
      ja: `道と真理と生命なる主イイスス・ハリストスよ、
かつてルカとクレオパの道連れとなり給いし如く、今爾の僕なる我と共に歩み、あらゆる危険と凶悪より我が道程を守り給え。
我が往復の旅を平穏に成し遂げしめ、爾の光栄を讃美せしめ給え。アミン。`,
      en: `O Lord Jesus Christ our God, the Way, the Truth, and the Life,
Who didst accompany Luke and Cleopas to Emmaus: travel also with Thy servant, and preserve me from every danger and snare along the way.
Direct my path according to Thy will, and bring me back safely in peace to glorify Thy Holy Name. Amen.`,
      ru: `Господи Иисусе Христе Боже наш, истинный и живый Путю, спошествовати мнимому Твоему рабу Иосифу и Пречистей Деве Матери в Египет изволивый, и Луце и Клеопе во Еммаус спутешествовавый!
И ныне смиренно молим Тя, Владыко Пресвятый, и рабу Твоему сему Твоею благодатию спутешествуй. И всякаго злаго обстояния избави, мир и благомощие устрояя. Аминь.`,
    },
  },
  {
    id: 'occasional-bogoroditse-devo',
    category: 'occasional',
    sequenceNumber: 2,
    title: {
      ja: '生神童女マリヤへの挨拶（ボゴロージツェ・デイヴォ）',
      en: 'The Angelic Salutation (Bogoroditse Devo)',
      ru: 'Богородице Дево, радуйся',
    },
    subtitle: {
      ja: 'ルカ福音書に基づく晩課・徹夜祷の讃歌（ルカ 1:28, 42）',
      en: 'Hymn of the Resurrection All-Night Vigil (Luke 1:28, 42)',
      ru: 'Песнь воскресного всенощного бдения (Лк. 1:28, 42)',
    },
    text: {
      ja: `生神童女マリヤや、喜べ、恵まれたるマリヤ、主は爾と共に在り。
爾は女の中に讃美せられ、爾の胎の実も讃美せらる、
蓋し爾は我が霊の救い主を生み給えり。

【正教会の解説】
この祈祷は新約聖書（大天使ガウリイルの挨拶：ルカ1:28、および義人エリザヴェタの祝詞：ルカ1:42）に由来し、正教会では伝統的に土曜晩の徹夜祷（晩課の結び）や各種の奉事で歌われます。毎日の朝の祈祷規則では「常に福にして（アクシオン・エスティン）」が読まれますが、本書にも敬虔な祈願として収載しています。`,
      en: `Rejoice, O Virgin Theotokos, Mary, full of grace, the Lord is with thee!
Blessed art thou among women, and blessed is the Fruit of thy womb,
for thou hast borne the Savior of our souls.

[Liturgical Note]
This hymn is drawn directly from Holy Scripture (the Archangel Gabriel’s salutation in Luke 1:28 and St. Elizabeth’s blessing in Luke 1:42). In Eastern Orthodox tradition, it is chanted during the Saturday evening All-Night Vigil (Resurrectional Vespers). In the daily morning prayer rule, "It Is Truly Meet" (Axion Estin) is the standard Marian megalynarion, while Bogoroditse Devo is cherished across liturgical vigils and private devotion.`,
      ru: `Богородице Дево, радуйся, Благодатная Марие, Господь с Тобою;
благословена Ты в женах и благословен плод чрева Твоего,
яко Спаса родила еси душ наших.

[Литургическая справка]
Эта песнь основана на словах Архангела Гавриила (Лк. 1:28) и праведной Елисаветы (Лк. 1:42). В Православной Церкви она торжественно поется на всенощном бдении в конце вечерни. В ежедневном утреннем правиле песнью Богородице служит «Достойно есть», а «Богородице Дево» совершается за богослужениями и в благочестивых молитвословиях.`,
    },
  },

  // ==========================================
  // 7. 守護聖歌 (Patronal Hymns: Pokrov & St. Nicholas of Japan)
  // ==========================================
  {
    id: 'pokrov-troparion',
    category: 'patronal',
    patronGroup: 'pokrov',
    sequenceNumber: 1,
    title: {
      ja: '生神女庇護祭 祭日讃詞（トロパリ）',
      en: 'Troparion of the Holy Protection (Pokrov)',
      ru: 'Тропарь Покрова Пресвятой Богородицы',
    },
    subtitle: {
      ja: '第4調 — 大阪ハリストス正教会 守護の讃歌',
      en: 'Tone 4 — Patronal Hymn of Osaka Church',
      ru: 'Глас 4 — Тропарь престольного праздника в Осаке',
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
    patronGroup: 'pokrov',
    sequenceNumber: 2,
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
    id: 'st-nicholas-troparion',
    category: 'patronal',
    patronGroup: 'st-nicholas',
    sequenceNumber: 3,
    title: {
      ja: '日本の亜使徒大主教聖ニコライ 祭日讃詞（トロパリ）',
      en: 'Troparion of St. Nicholas of Japan, Equal-to-the-Apostles',
      ru: 'Тропарь святителю Николаю Японскому, равноапостольному',
    },
    subtitle: {
      ja: '第4調 — 日本の光照者・守護の聖人',
      en: 'Tone 4 — Enlightener of Japan & Equal-to-the-Apostles',
      ru: 'Глас 4 — Просветитель Японии',
    },
    text: {
      ja: `使徒と同等にして日本の光照者、
神の言の種蒔く者、ハリストスの選びたる牧者、我らの父ニコライ主教よ、
至聖三位に祈りて、その選べる群を守り、我らの霊の救われんことを祈り給え。`,
      en: `O holy Hierarch and Father Nicholas, equal to the Apostles and enlightener of Japan,
faithful servant of Christ and divinely-wise shepherd, chosen by lot from God:
as the sower of true faith in the land of Japan,
pray unto the All-Holy Trinity for thy flock and for the salvation of our souls.`,
      ru: `Апостолов единонравне и сопрестольне,
верный рабе Христов и богомудре пастырю,
жеребием избранный от Бога,
сеятелю благочестия в стране Японстей,
святителю отче Николае,
моли Пресвятую Троицу о всем твоем стаде и о спасении душ наших.`,
    },
  },
  {
    id: 'st-nicholas-kontakion',
    category: 'patronal',
    patronGroup: 'st-nicholas',
    sequenceNumber: 4,
    title: {
      ja: '日本の亜使徒大主教聖ニコライ 祭日小讃詞（コンダク）',
      en: 'Kontakion of St. Nicholas of Japan, Equal-to-the-Apostles',
      ru: 'Кондак святителю Николаю Японскому',
    },
    subtitle: {
      ja: '第4調',
      en: 'Tone 4',
      ru: 'Глас 4',
    },
    text: {
      ja: `流浪者として地の果てなる日本に至り、
日出づる国に福音の光を照らし、
神の言を宣べ伝えて多くの民をハリストスに導きたる亜使徒ニコライよ、
我らのため主イイススに祈り給え。`,
      en: `As a wanderer and stranger the land of Japan received thee,
where thou didst call the people from pagan darkness to the light of Christ;
wherefore as an Apostle we hymn thee, O holy Hierarch Father Nicholas:
pray unto the Lord to have mercy on our souls.`,
      ru: `Странника и пришельца прият тя страна Японская,
в нейже от тьмы языческия к свету Христову люди призвал еси,
сего ради яко апостолу воспеваем ти:
святителю Николае, отче наш,
молися Господеви помиловатися душам нашим.`,
    },
  },
  {
    id: 'st-nicholas-megalynarion',
    category: 'patronal',
    patronGroup: 'st-nicholas',
    sequenceNumber: 5,
    title: {
      ja: '日本の亜使徒大主教聖ニコライ 讃歌（大小讃美歌）',
      en: 'Magnification to St. Nicholas of Japan',
      ru: 'Величание святителю Николаю Японскому',
    },
    subtitle: {
      ja: '記憶祈祷・成聖祝文',
      en: 'Liturgical Magnification & Intercession',
      ru: 'Величание',
    },
    text: {
      ja: `我等爾を讃揚す、日本の光照者、亜使徒なる我が父主教ニコライよ、
また爾の聖なる記憶を尊ぶ、爾は我らの為に神なるハリストスに祈ればなり。

日本の亜使徒大主教聖ニコライよ、神に我らの為に祈り給え！`,
      en: `We magnify thee, O holy Hierarch Father Nicholas, Equal-to-the-Apostles and Enlightener of Japan,
and we honor thy holy memory, for thou dost pray for us to Christ our God.

Holy Equal-to-the-Apostles Archbishop Nicholas, pray unto God for us!`,
      ru: `Величаем тя, святителю отче Николае, равноапостольне просветителю Японии,
и чтим святую память твою, ты бо молиши за нас Христа Бога нашего.

Святителю отче Николае, моли Бога о нас!`,
    },
  },
];
