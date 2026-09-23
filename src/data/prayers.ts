import { TrilingualText } from '../lib/types';

export interface PrayerItem {
  id: string;
  category: 'morning' | 'evening' | 'communion' | 'meals' | 'patronal' | 'occasional';
  patronGroup?: 'pokrov' | 'st-nicholas';
  title: TrilingualText;
  subtitle?: TrilingualText;
  text: TrilingualText;
}

export const PRAYERS_DATA: PrayerItem[] = [
  // ==========================================
  // 1. 朝の祈り (Morning Prayers / Утренние молитвы)
  // ==========================================
  {
    id: 'morning-opening',
    category: 'morning',
    title: {
      ja: '起床の祈祷',
      en: 'Upon Awakening',
      ru: 'Молитва по пробуждении от сна',
    },
    subtitle: {
      ja: '目覚めたときの感謝',
      en: 'First Prayer upon Rising',
      ru: 'Начальная молитва',
    },
    text: {
      ja: `父と子と聖神の御名によりて。アミン。
光栄は爾に帰す、我らの神よ、光栄は爾に帰す。`,
      en: `In the Name of the Father, and of the Son, and of the Holy Spirit. Amen.
Glory to Thee, our God, glory to Thee!`,
      ru: `Во имя Отца и Сына и Святаго Духа. Аминь.
Слава Тебе, Боже наш, слава Тебе!`,
    },
  },
  {
    id: 'morning-heavenly-king',
    category: 'morning',
    title: {
      ja: '天の王（聖神への祈祷）',
      en: 'Prayer to the Holy Spirit (O Heavenly King)',
      ru: 'Царю Небесный (Молитва Святому Духу)',
    },
    subtitle: {
      ja: '聖神の恵みを求める祈り',
      en: 'Invocation of the Comforter',
      ru: 'Призывание Святаго Духа',
    },
    text: {
      ja: `天の王、慰め主、真理の神よ、何れの処にも在り、満たざる所なき者よ、
万善の宝蔵にして生命を施す主よ、来たりて我らの中に居り、
我らを総ての穢れより潔め、憐れみ深き主よ、我が霊を救い給え。`,
      en: `O Heavenly King, the Comforter, the Spirit of Truth, Who art everywhere and fillest all things;
Treasury of Blessings, and Giver of Life: come and abide in us,
and cleanse us from every impurity, and save our souls, O Good One!`,
      ru: `Царю Небесный, Утешителю, Душе истины, Иже везде сый и вся исполняяй,
Сокровище благих и жизни Подателю, прииди и вселися в ны,
и очисти ны от всякия скверны, и спаси, Блаже, души наша.`,
    },
  },
  {
    id: 'morning-trisagion-cycle',
    category: 'morning',
    title: {
      ja: '三聖讃〜至聖三位〜主の祈り',
      en: 'Trisagion Prayers through The Lord’s Prayer',
      ru: 'Трисвятое по Отче наш',
    },
    text: {
      ja: `聖なる神、聖なる勇力、聖なる不滅なる主、我等を憐れめよ。（三度）
光栄は父と子と聖神に帰す、今もいつも世々に至るまで、アミン。
至聖なる三位、我らを憐れめよ。主よ、我らの罪を潔め給え。主宰よ、我らの不法を赦し給え。聖なる主よ、訪い憐れみて、爾の名の為に我らの病を癒し給え。
主憐れめよ（三度）。
光栄は父と子と聖神に帰す、今もいつも世々に至るまで、アミン。

天におらるる我らの父よ、願わくは爾の名は聖とせられ、爾の国は来たり、爾の旨は天に行わるるが如く地にも行われん。
我が日用の糧を今日我らに与え給え。
我らに負い目ある者を我らが赦すが如く、我らの負い目を赦し給え。
我らを誘惑に導かず、なお我らを凶悪より救い給え。
蓋し国と権能と光栄は、爾父と子と聖神に世々に帰す。アミン。`,
      en: `Holy God, Holy Mighty, Holy Immortal, have mercy on us. (Thrice)
Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages. Amen.
O Most Holy Trinity, have mercy on us. Lord, cleanse us from our sins. Master, pardon our transgressions. Holy One, visit and heal our infirmities for Thy Name's sake.
Lord, have mercy. (Thrice)
Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages. Amen.

Our Father, Who art in heaven, hallowed be Thy name. Thy kingdom come, Thy will be done on earth as it is in heaven.
Give us this day our daily bread, and forgive us our debts, as we forgive our debtors;
and lead us not into temptation, but deliver us from evil.
For Thine is the kingdom and the power and the glory, of the Father, and of the Son, and of the Holy Spirit, now and ever and unto ages of ages. Amen.`,
      ru: `Святый Боже, Святый Крепкий, Святый Безсмертный, помилуй нас. (Трижды)
Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков. Аминь.
Пресвятая Троице, помилуй нас; Господи, очисти грехи наша; Владыко, прости беззакония наша; Святый, посети и исцели немощи наша, имене Твоего ради.
Господи, помилуй. (Трижды)
Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков. Аминь.

Отче наш, Иже еси на небесех! Да святится имя Твое, да приидет Царствие Твое, да будет воля Твоя, яко на небеси и на земли.
Хлеб наш насущный даждь нам днесь; и остави нам долги наша, якоже и мы оставляем должником нашим;
и не введи нас во искушение, но избави нас от лукаваго.
Яко Твое есть Царство и сила и слава Отца и Сына и Святаго Духа ныне и присно и во веки веков. Аминь.`,
    },
  },
  {
    id: 'morning-troparia',
    category: 'morning',
    title: {
      ja: '朝の痛悔讃詞（トロパリ）',
      en: 'Morning Troparia of Contrition',
      ru: 'Тропари утренние',
    },
    text: {
      ja: `眠りより起きて爾に伏し拝み、善徳者よ、天使の歌を爾に叫び歌う、「聖なるかな、聖なるかな、聖なるかな、神よ、生神女に因りて我らを憐れめよ。」
光栄は父と子と聖神に帰す。
主よ、爾我を寝床と眠りより起こし給えり、我が心と思いとを照らし、我が唇を開きて、爾聖三位を讃歌せしめ給え、「聖なるかな、聖なるかな、聖なるかな、神よ、生神女に因りて我らを憐れめよ。」
今もいつも世々に至るまで、アミン。
審判者は俄かに来たり、各人の所行は明らかにせらるべし、是の故に我等畏れを以て夜半に叫ぶ、「聖なるかな、聖なるかな、聖なるかな、神よ、生神女に因りて我らを憐れめよ。」`,
      en: `Having arisen from sleep, we fall down before Thee, O Blessed One, and we sing to Thee, O Mighty One, the angelic hymn: Holy, Holy, Holy art Thou, O God; through the Theotokos have mercy on us!
Glory to the Father, and to the Son, and to the Holy Spirit.
From bed and sleep Thou hast raised me, O Lord; enlighten my mind and heart, and open my lips that I may praise Thee, O Holy Trinity: Holy, Holy, Holy art Thou, O God; through the Theotokos have mercy on us!
Now and ever and unto ages of ages. Amen.
Suddenly the Judge shall come, and the deeds of each shall be revealed; but with fear we cry in the middle of the night: Holy, Holy, Holy art Thou, O God; through the Theotokos have mercy on us!`,
      ru: `Воставше от сна, припадаем Ти, Блаже, и ангельскую песнь вопием Ти, Сильне: Свят, Свят, Свят еси, Боже, Богородицею помилуй нас.
Слава Отцу и Сыну и Святому Духу.
От одра и сна воздвигл мя еси, Господи, ум мой просвети и сердце, и устне мои отверзи, во еже пети Тя, Святая Троице: Свят, Свят, Свят еси, Боже, Богородицею помилуй нас.
И ныне и присно и во веки веков. Аминь.
Внезапно Судия приидет, и коегождо деяния обнажатся, но страхом зовем в полунощи: Свят, Свят, Свят еси, Боже, Богородицею помилуй нас.`,
    },
  },
  {
    id: 'morning-theotokos',
    category: 'morning',
    title: {
      ja: '生神童女マリヤへの挨拶（アヴェ・マリア）',
      en: 'The Angelic Salutation (Bogoroditse Devo)',
      ru: 'Богородице Дево, радуйся',
    },
    text: {
      ja: `生神童女マリヤや、喜べ、恵まれたるマリヤ、主は爾と共に在り。
爾は女の中に讃美せられ、爾の胎の実も讃美せらる、
蓋し爾は我が霊の救い主を生み給えり。`,
      en: `Rejoice, O Virgin Theotokos, Mary, full of grace, the Lord is with thee!
Blessed art thou among women, and blessed is the Fruit of thy womb,
for thou hast borne the Savior of our souls.`,
      ru: `Богородице Дево, радуйся, Благодатная Марие, Господь с Тобою;
благословена Ты в женах и благословен плод чрева Твоего,
яко Спаса родила еси душ наших.`,
    },
  },
  {
    id: 'morning-living-departed',
    category: 'morning',
    title: {
      ja: '生ける者と眠れる者のための日毎の祈り',
      en: 'Commemoration of the Living and the Departed',
      ru: 'Молитва о живых и усопших',
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
  // 2. 晩の祈り（就寝前の祈り / Prayers before Sleep）
  // ==========================================
  {
    id: 'evening-forgiveness',
    category: 'evening',
    title: {
      ja: '一日の罪の赦しを乞う祈祷',
      en: 'Prayer for Forgiveness of Daily Sins',
      ru: 'Молитва на прощение грехов',
    },
    subtitle: {
      ja: '就寝前の痛悔',
      en: 'Evening Confession to God',
      ru: 'Молитва святого Иоанна Златоуста',
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
    title: {
      ja: '守護天使への祈祷',
      en: 'Prayer to the Holy Guardian Angel',
      ru: 'Молитва Ангелу Хранителю',
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
    id: 'evening-cross',
    category: 'evening',
    title: {
      ja: '尊い十字架への祈祷',
      en: 'Prayer to the Precious and Life-Giving Cross',
      ru: 'Молитва Честному Кресту',
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
    title: {
      ja: '就寝時の委ね（主の御手に）',
      en: 'Into Thy Hands, O Lord (At Sleep)',
      ru: 'В руце Твои, Господи',
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
  // 3. 領聖前の祈祷（聖体拝領準備 / Pre-Communion）
  // ==========================================
  {
    id: 'communion-chrysostom',
    category: 'communion',
    title: {
      ja: '聖金口イオアンの領聖祈祷（主よ、我信ず）',
      en: 'Pre-Communion Prayer of St. John Chrysostom',
      ru: 'Молитва свт. Иоанна Златоуста перед Причащением',
    },
    subtitle: {
      ja: '聖杯に近づく直前の告白祈祷',
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
    id: 'communion-metaphrastes',
    category: 'communion',
    title: {
      ja: 'シメオン・メタフラストの領聖祝文',
      en: 'Prayer of St. Symeon Metaphrastes',
      ru: 'Молитва св. Симеона Метафраста перед Причащением',
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
  // 4. 領聖後の感謝祝文 (Post-Communion Thanksgiving)
  // ==========================================
  {
    id: 'post-communion-thanks',
    category: 'communion',
    title: {
      ja: '領聖後の感謝祈祷',
      en: 'Thanksgiving after Holy Communion',
      ru: 'Благодарственные молитвы по Святом Причащении',
    },
    text: {
      ja: `光栄は爾に帰す、神よ、光栄は爾に帰す、神よ、光栄は爾に帰す、神よ。
主よ、罪人にして不相応なる我を退けず、爾の極めて清き天の機密に与ることを許し給いしことを感謝す。
願わくは此の領聖の我が霊と肉体の癒やしとなり、信仰の堅固、仁愛の全き成就、悪徳の絶滅、並びに爾の戒めの実行とならんことを。
願わくは我が生命の終わりに至るまで、罪に定められずして爾の尊き体を拝領せしめ給え。アミン。`,
      en: `Glory to Thee, O God! Glory to Thee, O God! Glory to Thee, O God!
I thank Thee, O Lord my God, that Thou hast not rejected me, a sinner, but hast permitted me to partake of Thy holy and heavenly Mysteries.
Let these holy Gifts be for the healing of my soul and body, the strengthening of faith, the perfecting of love, and the keeping of Thy commandments.
Preserve me in Thy holiness all the days of my life, that I may live no longer for myself, but for Thee, our Master and Benefactor. Amen.`,
      ru: `Слава Тебе, Боже! Слава Тебе, Боже! Слава Тебе, Боже!
Благодарю Тя, Господи Боже мой, яко не отринул еси мене грешнаго, но сподобил мя еси причастника быти святынь Твоих.
Да будут ми Святыя сия во исцеление души же и тела, в веру непостыдну, в любовь нелицемерну, в соблюдение заповедей Твоих.
Святый Владыко, соблюди мя во Твоей святыне, да всю жизнь мою славлю пресвятое имя Твое. Аминь.`,
    },
  },

  // ==========================================
  // 5. 食前・食後の祈り (Prayers at Meals / Трапезные молитвы)
  // ==========================================
  {
    id: 'meals-before',
    category: 'meals',
    title: {
      ja: '食前の祈り（総ての人の目は爾を仰ぎ望む）',
      en: 'Prayer before Meals',
      ru: 'Молитва перед вкушением пищи',
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
    title: {
      ja: '食後の祈り（感謝の祈祷）',
      en: 'Prayer after Meals',
      ru: 'Молитва после вкушения пищи',
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
  // 6. 旅立ちの祈り (Prayer before Traveling)
  // ==========================================
  {
    id: 'occasional-travel',
    category: 'occasional',
    title: {
      ja: '旅立つ者のための祈願',
      en: 'Prayer before a Journey',
      ru: 'Молитва перед отправлением в путь',
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

  // ==========================================
  // 7. 守護聖歌 (Patronal Hymns: Pokrov & St. Nicholas of Japan)
  // ==========================================
  {
    id: 'pokrov-troparion',
    category: 'patronal',
    patronGroup: 'pokrov',
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
