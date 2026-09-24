import { TrilingualText } from '../lib/types';

export interface ScriptureVerse {
  verse: number;
  text: TrilingualText;
}

export interface FullScripturePassage {
  display: string;
  source: 'Epistle' | 'Gospel' | 'OldTestament';
  book: TrilingualText;
  pericopeTan?: number;
  verses: ScriptureVerse[];
}

export const SCRIPTURE_DATABASE: Record<string, FullScripturePassage> = {
  // Wednesday of 17th week after Pentecost (Old Calendar Sept 10)
  'Ephesians 3.8-21': {
    display: 'Ephesians 3:8–21',
    source: 'Epistle',
    book: {
      ja: '聖使徒パウェルのエフェソ人に致す書（エフェソ書）',
      en: 'The Epistle of St. Paul to the Ephesians',
      ru: 'Послание святого апостола Павла к Ефесянам',
    },
    pericopeTan: 223,
    verses: [
      {
        verse: 8,
        text: {
          ja: '諸聖人の中、極めて小なる我に、此の恩賜を与えて、ハリストスの測るべからざる富を異邦人に宣べ伝えしめ、',
          en: 'Unto me, who am less than the least of all saints, is this grace given, that I should preach among the Gentiles the unsearchable riches of Christ;',
          ru: 'Мне, наименьшему из всех святых, дана благодать сия — благовествовать язычникам неисследимое богатство Христово',
        },
      },
      {
        verse: 9,
        text: {
          ja: '万世より万物を造り給いし神に隠れたる奥秘の経綸の如何なるを、万民に明らかにし、',
          en: 'And to make all men see what is the fellowship of the mystery, which from the beginning of the world hath been hid in God, who created all things by Jesus Christ:',
          ru: 'и открыть всем, в чем состоит домостроительство тайны, сокрывавшейся от вечности в Боге, создавшем все Иисусом Христом,',
        },
      },
      {
        verse: 10,
        text: {
          ja: '今、教会に依りて天上にある首領及び権能に、神の種々の智恵を知らしめんとせり。',
          en: 'To the intent that now unto the principalities and powers in heavenly places might be known by the church the manifold wisdom of God,',
          ru: 'дабы ныне соделалась известною через Церковь начальствам и властям на небесах многоразличная премудрость Божия,',
        },
      },
      {
        verse: 11,
        text: {
          ja: '是れ我等の主イイスス・ハリストスに就きて定め給いし、永遠の旨に遵うなり。',
          en: 'According to the eternal purpose which He purposed in Christ Jesus our Lord:',
          ru: 'по предвечному определению, которое Он исполнил во Христе Иисусе, Господе нашем,',
        },
      },
      {
        verse: 12,
        text: {
          ja: '我等彼を信ずるに因りて、憚りなく、確信を以て、神に近づくことを得。',
          en: 'In whom we have boldness and access with confidence by the faith of Him.',
          ru: 'в Котором мы имеем дерзновение и надежный доступ через веру в Него.',
        },
      },
      {
        verse: 13,
        text: {
          ja: '是の故に爾等に願う、爾等の為に我が受くる患難に因りて撓むなかれ、是れ爾等の光栄なればなり。',
          en: 'Wherefore I desire that ye faint not at my tribulations for you, which is your glory.',
          ru: 'Посему прошу вас не унывать при моих ради вас скорбях, которые суть ваша слава.',
        },
      },
      {
        verse: 14,
        text: {
          ja: '是の故に、我膝を我が主イイスス・ハリストスの父の前に屈す。',
          en: 'For this cause I bow my knees unto the Father of our Lord Jesus Christ,',
          ru: 'Для сего преклоняю колени мои пред Отцем Господа нашего Иисуса Христа,',
        },
      },
      {
        verse: 15,
        text: {
          ja: '天上と地上にあるあらゆる家系は、彼に由りて名を命ぜらる。',
          en: 'Of whom the whole family in heaven and earth is named,',
          ru: 'от Которого именуется всякое отечество на небесах и на земле,',
        },
      },
      {
        verse: 16,
        text: {
          ja: '願わくは彼の光栄の富に遵いて、その聖神に依り、大いなる力をもって、爾等の内なる人を堅固にし、',
          en: 'That He would grant you, according to the riches of His glory, to be strengthened with might by His Spirit in the inner man;',
          ru: 'да даст вам, по богатству славы Своей, крепко утвердиться Духом Его во внутреннем человеке,',
        },
      },
      {
        verse: 17,
        text: {
          ja: '信仰に依りてハリストスを爾等の心に居らしめ、爾等をして仁愛に根ざし、基を立て、',
          en: 'That Christ may dwell in your hearts by faith; that ye, being rooted and grounded in love,',
          ru: 'верою вселиться Христу в сердца ваши, чтобы вы, укорененные и утвержденные в любви,',
        },
      },
      {
        verse: 18,
        text: {
          ja: '諸聖人と共にその広さ、長さ、深さ、高さを悟り、',
          en: 'May be able to comprehend with all saints what is the breadth, and length, and depth, and height;',
          ru: 'могли постигнуть со всеми святыми, что широта и долгота, и глубина и высота,',
        },
      },
      {
        verse: 19,
        text: {
          ja: '人の知識を過ぐるハリストスの愛を知り、以て神の総ての満つるに満たされんことを。',
          en: 'And to know the love of Christ, which passeth knowledge, that ye might be filled with all the fulness of God.',
          ru: 'и уразуметь превосходящую разумение любовь Христову, дабы вам исполниться всею полнотою Божиею.',
        },
      },
      {
        verse: 20,
        text: {
          ja: '我等の中に働く権能に遵いて、我等の祈求し、思い量る総てに遙かに増して為し得る者に、',
          en: 'Now unto Him that is able to do exceeding abundantly above all that we ask or think, according to the power that worketh in us,',
          ru: 'А Тому, Кто действующею в нас силою может сделать несравненно больше всего, чего мы просим, или о чем помышляем,',
        },
      },
      {
        verse: 21,
        text: {
          ja: '教会において、イイスス・ハリストスにおいて、光栄世々に終りなからんことを、アミン。',
          en: 'Unto Him be glory in the church by Christ Jesus throughout all ages, world without end. Amen.',
          ru: 'Тому слава в Церкви во Христе Иисусе во все роды, от века до века. Аминь.',
        },
      },
    ],
  },

  // Wednesday of 17th week after Pentecost Gospel
  'Mark 11.22-26': {
    display: 'Mark 11:22–26',
    source: 'Gospel',
    book: {
      ja: 'マルコに因る聖福音',
      en: 'The Holy Gospel According to St. Mark',
      ru: 'Святое Евангелие от Марка',
    },
    pericopeTan: 51,
    verses: [
      {
        verse: 22,
        text: {
          ja: 'イイスス答えて彼等に言い給わく、「神を信ぜよ。',
          en: 'And Jesus answering saith unto them, Have faith in God.',
          ru: 'Иисус, отвечая, говорит им: имейте веру Божию,',
        },
      },
      {
        verse: 23,
        text: {
          ja: '誠に爾等に告ぐ、誰にても此の山に向かいて、『移りて海に入れ』と言い、その心に疑わずして、言える所の如く成らんことを信ぜば、言える所の如く成らん。',
          en: 'For verily I say unto you, That whosoever shall say unto this mountain, Be thou removed, and be thou cast into the sea; and shall not doubt in his heart, but shall believe that those things which he saith shall come to pass; he shall have whatsoever he saith.',
          ru: 'ибо истинно говорю вам, если кто скажет горе сей: поднимись и ввергнись в море, и не усомнится в сердце своем, но поверит, что сбудется по словам его, — будет ему, что ни скажет.',
        },
      },
      {
        verse: 24,
        text: {
          ja: '是の故に爾等に告ぐ、総て爾等祈りて求むる所は、之を得たりと信ぜよ、然らば爾等に成らん。',
          en: 'Therefore I say unto you, What things soever ye desire, when ye pray, believe that ye receive them, and ye shall have them.',
          ru: 'Потому говорю вам: всё, чего ни будете просить в молитве, верьте, что получите, — и будет вам.',
        },
      },
      {
        verse: 25,
        text: {
          ja: '爾等立ちて祈る時、若し人に怨むことあらば赦せ、然らば天におわす爾等の父も、爾等の罪を赦し給わん。',
          en: 'And when ye stand praying, forgive, if ye have ought against any: that your Father also which is in heaven may forgive you your trespasses.',
          ru: 'И когда стоите на молитве, прощайте, если что имеете на кого, дабы и Отец ваш Небесный простил вам согрешения ваши.',
        },
      },
      {
        verse: 26,
        text: {
          ja: '然れども若し爾等赦さずば、天におわす爾等の父も亦、爾等の罪を赦し給わじ。」',
          en: 'But if ye do not forgive, neither will your Father which is in heaven forgive your trespasses.',
          ru: 'Если же не прощаете, то и Отец ваш Небесный не простит вам согрешений ваших.',
        },
      },
    ],
  },

  // TODAY: Thursday of 17th week after Pentecost (Old Calendar Sept 11) - Epistle
  'Ephesians 4.14-19': {
    display: 'Ephesians 4:14–19',
    source: 'Epistle',
    book: {
      ja: '聖使徒パウェルのエフェソ人に致す書（エフェソ書）',
      en: 'The Epistle of St. Paul to the Ephesians',
      ru: 'Послание святого апостола Павла к Ефесянам',
    },
    pericopeTan: 225,
    verses: [
      {
        verse: 14,
        text: {
          ja: '然れば我等復嬰児の如く、人の幻惑と詐欺の術とに由りて教の諸風に漂わされ動かさるることなし。',
          en: 'That we henceforth be no more children, tossed to and fro, and carried about with every wind of doctrine, by the sleight of men, and cunning craftiness, whereby they lie in wait to deceive;',
          ru: 'дабы мы не были более младенцами, колеблющимися и увлекающимися всяким ветром учения, по лукавству человеков, по хитрому искусству обольщения,',
        },
      },
      {
        verse: 15,
        text: {
          ja: '唯愛に由りて真理を行いて、諸事彼に及ぶべし、彼即ち首なるハリストスなり。',
          en: 'But speaking the truth in love, may grow up into Him in all things, which is the head, even Christ:',
          ru: 'но истинною любовью все возращали в Того, Который есть глава Христос,',
        },
      },
      {
        verse: 16,
        text: {
          ja: '彼に由りて、全身は諸節の相助くるに因りて相聯り相絡み、各肢その量を守りて働くに従いて、身の長大を成し、愛において自ら立つるなり。',
          en: 'From whom the whole body fitly joined together and compacted by that which every joint supplieth, according to the effectual working in the measure of every part, maketh increase of the body unto the edifying of itself in love.',
          ru: 'из Которого все тело, составляемое и совокупляемое посредством всяких взаимно скрепляющих связей, при действии в свою меру каждого члена, получает приращение для созидания самого себя в любви.',
        },
      },
      {
        verse: 17,
        text: {
          ja: '是の故に我此を言い主において証す、爾等復異邦人のその虚妄の心に循いて行わるる如く行わるることなかれ。',
          en: 'This I say therefore, and testify in the Lord, that ye henceforth walk not as other Gentiles walk, in the vanity of their mind,',
          ru: 'Посему я говорю и заклинаю Господом, чтобы вы более не поступали, как поступают прочие народы, по суетности ума своего,',
        },
      },
      {
        verse: 18,
        text: {
          ja: '彼等は智恵暗く、その内の無知と心の頑愚とに因りて、神の生命より隔たり、',
          en: 'Having the understanding darkened, being alienated from the life of God through the ignorance that is in them, because of the blindness of their heart:',
          ru: 'будучи помрачены в разуме, отчуждены от жизни Божией, по причине их невежества и ожесточения сердца их.',
        },
      },
      {
        verse: 19,
        text: {
          ja: '痛みを感ぜずして、自ら放蕩に任せ、貪りて総ての汚穢を行えり。',
          en: 'Who being past feeling have given themselves over unto lasciviousness, to work all uncleanness with greediness.',
          ru: 'Они, дойдя до бесчувствия, предались распутству так, что делают всякую нечистоту с ненасытимостью.',
        },
      },
    ],
  },

  // TODAY: Thursday of 17th week after Pentecost (Old Calendar Sept 11) - Gospel
  'Mark 11.27-33': {
    display: 'Mark 11:27–33',
    source: 'Gospel',
    book: {
      ja: 'マルコに因る聖福音',
      en: 'The Holy Gospel According to St. Mark',
      ru: 'Святое Евангелие от Марка',
    },
    pericopeTan: 52,
    verses: [
      {
        verse: 27,
        text: {
          ja: '彼等復エルサレムに至る。イイスス聖堂を行くに、祭司長等、学者等、長老等、彼に近づきて、',
          en: 'And they come again to Jerusalem: and as He was walking in the temple, there come to Him the chief priests, and the scribes, and the elders,',
          ru: 'Пришли опять в Иерусалим. И когда Он ходил в храме, подошли к Нему первосвященники и книжники, и старейшины',
        },
      },
      {
        verse: 28,
        text: {
          ja: '言わく、「爾何の権を以て此等の事を行うや、誰か爾に此等の事を行う権を与えしや。」',
          en: 'And say unto Him, By what authority doest Thou these things? and who gave Thee this authority to do these things?',
          ru: 'и говорили Ему: какою властью Ты это делаешь? и кто Тебе дал власть делать это?',
        },
      },
      {
        verse: 29,
        text: {
          ja: 'イイスス答えて彼等に言い給わく、「我爾等に一事を問わん、爾等我に答えよ、然らば我も何の権を以て此等の事を行うかを爾等に告げん。',
          en: 'And Jesus answered and said unto them, I will also ask of you one question, and answer Me, and I will tell you by what authority I do these things.',
          ru: 'Иисус сказал им в ответ: спрошу и Я вас об одном, отвечайте Мне; тогда и Я скажу вам, какою властью это делаю.',
        },
      },
      {
        verse: 30,
        text: {
          ja: 'イオアンの洗礼は天よりせしや、人よりせしや、我に答えよ。」',
          en: 'The baptism of John, was it from heaven, or of men? answer Me.',
          ru: 'Крещение Иоанново с небес было, или от человеков? отвечайте Мне.',
        },
      },
      {
        verse: 31,
        text: {
          ja: '彼等相謀りて言わく、「若し『天より』と言わば、彼言わん、『然らば何ぞ彼を信ぜざりしや』と。',
          en: 'And they reasoned with themselves, saying, If we shall say, From heaven; He will say, Why then did ye not believe him?',
          ru: 'Они рассуждали между собою: если скажем: с небес, — то Он скажет: почему же вы не поверили ему?',
        },
      },
      {
        verse: 32,
        text: {
          ja: '若し『人より』と言わば」と（然れども彼等民を懼れたり、蓋し皆イオアンを真の預言者と為せばなり）。',
          en: 'But if we shall say, Of men; they feared the people: for all men counted John, that he was a prophet indeed.',
          ru: 'а сказать: от человеков? — боялись народа, потому что все полагали, что Иоанн точно был пророк.',
        },
      },
      {
        verse: 33,
        text: {
          ja: '遂に彼等イイススに答えて言わく、「我等知らず。」イイスス彼等に言い給わく、「我も何の権を以て此等の事を行うかを爾等に告げじ。」',
          en: 'And they answered and said unto Jesus, We cannot tell. And Jesus answering saith unto them, Neither do I tell you by what authority I do these things.',
          ru: 'И сказали в ответ Иисусу: не знаем. Тогда Иисус сказал им в ответ: и Я не скажу вам, какою властью это делаю.',
        },
      },
    ],
  },

  // Friday of 17th week after Pentecost - Epistle
  'Ephesians 4.17-25': {
    display: 'Ephesians 4:17–25',
    source: 'Epistle',
    book: {
      ja: '聖使徒パウェルのエフェソ人に致す書（エフェソ書）',
      en: 'The Epistle of St. Paul to the Ephesians',
      ru: 'Послание святого апостола Павла к Ефесянам',
    },
    pericopeTan: 226,
    verses: [
      {
        verse: 17,
        text: {
          ja: '是の故に我此を言い主において証す、爾等復異邦人のその虚妄の心に循いて行わるる如く行わるることなかれ。',
          en: 'This I say therefore, and testify in the Lord, that ye henceforth walk not as other Gentiles walk, in the vanity of their mind,',
          ru: 'Посему я говорю и заклинаю Господом, чтобы вы более не поступали, как поступают прочие народы, по суетности ума своего,',
        },
      },
      {
        verse: 18,
        text: {
          ja: '彼等は智恵暗く、その内の無知と心の頑愚とに因りて、神の生命より隔たり、',
          en: 'Having the understanding darkened, being alienated from the life of God through the ignorance that is in them, because of the blindness of their heart:',
          ru: 'будучи помрачены в разуме, отчуждены от жизни Божией, по причине их невежества и ожесточения сердца их,',
        },
      },
      {
        verse: 19,
        text: {
          ja: '痛みを感ぜずして、自ら放蕩に任せ、貪りて総ての汚穢を行えり。',
          en: 'Who being past feeling have given themselves over unto lasciviousness, to work all uncleanness with greediness.',
          ru: 'они, дойдя до бесчувствия, предались распутству так, что делают всякую нечистоту с ненасытимостью.',
        },
      },
      {
        verse: 20,
        text: {
          ja: '然れど爾等はハリストスに就きて然る如く学ばざりき。',
          en: 'But ye have not so learned Christ;',
          ru: 'Но вы не так познали Христа;',
        },
      },
      {
        verse: 21,
        text: {
          ja: '爾等彼を聞き、また爾等の内の真理がイイススに在る如く、彼に於いて教えを受けたれば。',
          en: 'If so be that ye have heard Him, and have been taught by Him, as the truth is in Jesus:',
          ru: 'потому что вы слышали о Нем и в Нем научились, — так как истина во Иисусе,',
        },
      },
      {
        verse: 22,
        text: {
          ja: '誘惑の欲に循いて壊るる前の行状の故き人を脱ぎ棄て、',
          en: 'That ye put off concerning the former conversation the old man, which is corrupt according to the deceitful lusts;',
          ru: 'отложить прежний образ жизни ветхого человека, истлевающего в обольстительных похотях,',
        },
      },
      {
        verse: 23,
        text: {
          ja: '爾等の心の神において新にせられ、',
          en: 'And be renewed in the spirit of your mind;',
          ru: 'а обновиться духом ума вашего',
        },
      },
      {
        verse: 24,
        text: {
          ja: '真の義と聖とに遵いて、神の如く造られたる新しき人を著るべし。',
          en: 'And that ye put on the new man, which after God is created in righteousness and true holiness.',
          ru: 'и облечься в нового человека, созданного по Богу, в праведности и святости истины.',
        },
      },
      {
        verse: 25,
        text: {
          ja: '是の故に虚言を棄てて、各その隣に向かいて真実を語るべし、蓋し我等は相肢となればなり。',
          en: 'Wherefore putting away lying, speak every man truth with his neighbour: for we are members one of another.',
          ru: 'Посему, отвергнув ложь, говорите истину каждый ближнему своему, потому что мы члены друг другу.',
        },
      },
    ],
  },

  // Friday of 17th week after Pentecost - Gospel
  'Mark 12.1-12': {
    display: 'Mark 12:1–12',
    source: 'Gospel',
    book: {
      ja: 'マルコに因る聖福音',
      en: 'The Holy Gospel According to St. Mark',
      ru: 'Святое Евангелие от Марка',
    },
    pericopeTan: 53,
    verses: [
      {
        verse: 1,
        text: {
          ja: 'イイスス譬を以て彼等に語り初め給わく、「人あり、葡萄園を作り、之に垣を繞らし、搾槽を掘り、櫓を建て、農夫等に貸して、遠き国に赴けり。',
          en: 'And He began to speak unto them by parables. A certain man planted a vineyard, and set an hedge about it, and digged a place for the winefat, and built a tower, and let it out to husbandmen, and went into a far country.',
          ru: 'И начал говорить им притчами: некоторый человек насадил виноградник и обнес оградою, и выкопал точило, и построил башню, и, отдав его виноградарям, отлучился.',
        },
      },
      {
        verse: 2,
        text: {
          ja: '時に至りて一人の僕を農夫等に遣わし、葡萄園の果実を農夫等より受けんとせり。',
          en: 'And at the season he sent to the husbandmen a servant, that he might receive from the husbandmen of the fruit of the vineyard.',
          ru: 'И послал в свое время к виноградарям слугу — принять от виноградарей плодов из виноградника.',
        },
      },
      {
        verse: 3,
        text: {
          ja: '農夫等彼を捕えて打ち、手ぶらにて返せり。',
          en: 'And they caught him, and beat him, and sent him away empty.',
          ru: 'Они схватили его, прибили и отослали ни с чем.',
        },
      },
      {
        verse: 4,
        text: {
          ja: '又他の僕を遣わせり、彼等その頭を石にて打ち、辱めて帰せり。',
          en: 'And again he sent unto them another servant; and at him they cast stones, and wounded him in the head, and sent him away shamefully handled.',
          ru: 'Опять послал к ним другого слугу; и того камнями ранили в голову и отпустили с бесчестием.',
        },
      },
      {
        verse: 5,
        text: {
          ja: '又他の者を遣わせり、彼等之を殺せり、又更に多くの者を遣わせり、ある者を打ち、ある者を殺せり。',
          en: 'And again he sent another; and him they killed, and many others; beating some, and killing some.',
          ru: 'И опять иного послал: и того убили; и многих других то прибивали, то убивали.',
        },
      },
      {
        verse: 6,
        text: {
          ja: 'なお一人あり、彼の愛する子なり、最後に彼を彼等に遣わして言わく、「我が子を敬わんか」と。',
          en: 'Having yet therefore one son, his wellbeloved, he sent him also last unto them, saying, They will reverence my son.',
          ru: 'Имея же ещё одного сына, любезного ему, напоследок послал и его к ним, говоря: постыдятся сына моего.',
        },
      },
      {
        verse: 7,
        text: {
          ja: '然れど農夫等相語りて言わく、「是れ嗣子なり、来りて之を殺さん、然らば財産は我等のものとならん」と。',
          en: 'But those husbandmen said among themselves, This is the heir; come, let us kill him, and the inheritance shall be ours.',
          ru: 'Но виноградари сказали между собою: это наследник; пойдем, убьем его, и наследство будет наше.',
        },
      },
      {
        verse: 8,
        text: {
          ja: '彼等之を捕えて殺し、葡萄園の外に投げ出せり。',
          en: 'And they took him, and killed him, and cast him out of the vineyard.',
          ru: 'И, схватив его, убили и выбросили вон из виноградника.',
        },
      },
      {
        verse: 9,
        text: {
          ja: '然らば葡萄園の主は何を為さんや、来りてかの農夫等を滅ぼし、葡萄園を他人に与えん。',
          en: 'What shall therefore the lord of the vineyard do? he will come and destroy the husbandmen, and will give the vineyard unto others.',
          ru: 'Что же сделает хозяин виноградника? Придет и предаст смерти виноградарей, и отдаст виноградник другим.',
        },
      },
      {
        verse: 10,
        text: {
          ja: '爾等聖経に録されたる『造家者の棄てたる石は、隅の首石となれり。',
          en: 'And have ye not read this scripture; The stone which the builders rejected is become the head of the corner:',
          ru: 'Неужели вы не читали сего в Писании: камень, который отвергли строители, тот самый сделался главою угла;',
        },
      },
      {
        verse: 11,
        text: {
          ja: '是れ主より成る所にして、我等の目には奇異なり』とあるを読まざりしや。」',
          en: 'This was the Lord’s doing, and it is marvellous in our eyes?',
          ru: 'это от Господа, и есть дивно в очах наших.',
        },
      },
      {
        verse: 12,
        text: {
          ja: '彼等イイススを捕えんとせり、蓋しこの譬の自己に向かいて言えるを知ればなり、然れども民を懼れて、彼を捨てて去れり。',
          en: 'And they sought to lay hold on Him, but feared the people: for they knew that He had spoken the parable against them: and they left Him, and went their way.',
          ru: 'И старались схватить Его, но побоялись народа, ибо поняли, что о них сказал притчу; и, оставив Его, отошли.',
        },
      },
    ],
  },

  // 17th Sunday after Pentecost - Canaanite Woman (Gospel)
  'Matthew 15.21-28': {
    display: 'Matthew 15:21–28',
    source: 'Gospel',
    book: {
      ja: 'マトフェイに因る聖福音',
      en: 'The Holy Gospel According to St. Matthew',
      ru: 'Святое Евангелие от Матфея',
    },
    pericopeTan: 62,
    verses: [
      {
        verse: 21,
        text: {
          ja: 'イイスス其処を出でて、ティルとシドンとの地方に赴き給えり。',
          en: 'Then Jesus went thence, and departed into the coasts of Tyre and Sidon.',
          ru: 'И, выйдя оттуда, Иисус удалился в страны Тирские и Сидонские.',
        },
      },
      {
        verse: 22,
        text: {
          ja: '視よ、ハナンの女その境より出でて、叫びて言わく、「ダヴィドの子なる主よ、我を憐れみ給え、我が女悪鬼に甚だ苦しめらる。」',
          en: 'And, behold, a woman of Canaan came out of the same coasts, and cried unto Him, saying, Have mercy on me, O Lord, thou son of David; my daughter is grievously vexed with a devil.',
          ru: 'И вот, женщина Хананеянка, выйдя из тех мест, кричала Ему: помилуй меня, Господи, сын Давидов, дочь моя жестоко беснуется.',
        },
      },
      {
        verse: 23,
        text: {
          ja: 'イイスス彼に一言も答え給わず。弟子等来りて彼に願いて言わく、「彼女を去らしめ給え、我等の後に叫ぶなり。」',
          en: 'But He answered her not a word. And His disciples came and besought Him, saying, Send her away; for she crieth after us.',
          ru: 'Он же не отвечал ей ни слова. И ученики Его, приступив, просили Его: отпусти её, потому что кричит за нами.',
        },
      },
      {
        verse: 24,
        text: {
          ja: 'イイスス答えて言い給わく、「我はイスラエルの家の失いたる羊の外に、遣わさるることなし。」',
          en: 'But He answered and said, I am not sent but unto the lost sheep of the house of Israel.',
          ru: 'Он же сказал в ответ: Я послан только к погибшим овцам дома Израилева.',
        },
      },
      {
        verse: 25,
        text: {
          ja: '女来りてイイススを拝して言わく、「主よ、我を助け給え。」',
          en: 'Then came she and worshipped Him, saying, Lord, help me.',
          ru: 'А она, подойдя, кланялась Ему и говорила: Господи! помоги мне.',
        },
      },
      {
        verse: 26,
        text: {
          ja: 'イイスス答えて言い給わく、「子等の食物を取りて小犬に投ぐるは善からず。」',
          en: 'But He answered and said, It is not meet to take the children\u2019s bread, and to cast it to dogs.',
          ru: 'Он же сказал в ответ: нехорошо взять хлеб у детей и бросить псам.',
        },
      },
      {
        verse: 27,
        text: {
          ja: '彼言わく、「然り、主よ、然れど小犬も主人の机より落つる屑を食らうなり。」',
          en: 'And she said, Truth, Lord: yet the dogs eat of the crumbs which fall from their masters\u2019 table.',
          ru: 'Она сказала: так, Господи! но и псы едят крохи, которые падают со стола господ их.',
        },
      },
      {
        verse: 28,
        text: {
          ja: 'イイスス答えて彼に言い給わく、「ああ女よ、爾の信仰は大なり、爾の願う所に成るべし。」その時より女の娘は癒えたり。',
          en: 'Then Jesus answered and said unto her, O woman, great is thy faith: be it unto thee even as thou wilt. And her daughter was made whole from that very hour.',
          ru: 'Тогда Иисус сказал ей в ответ: о, женщина! велика вера твоя; да будет тебе по желанию твоему. И исцелилась дочь ее в тот час.',
        },
      },
    ],
  },

  // 17th Sunday after Pentecost - Epistle
  '2 Corinthians 6.16-7.1': {
    display: '2 Corinthians 6:16–7:1',
    source: 'Epistle',
    book: {
      ja: '聖使徒パウェルのコリンフ人に致す後書（コリンフ後書）',
      en: 'The Second Epistle of St. Paul to the Corinthians',
      ru: 'Второе послание святого апостола Павла к Коринфянам',
    },
    pericopeTan: 181,
    verses: [
      {
        verse: 16,
        text: {
          ja: '神の堂と偶像とは如何にして和合せんや。我等は生ける神の堂なり、神の言い給える如し、「我彼等の中に住み、彼等の中を歩まん、我は彼等の神となり、彼等は我が民とならん。」',
          en: 'And what agreement hath the temple of God with idols? for ye are the temple of the living God; as God hath said, I will dwell in them, and walk in them; and I will be their God, and they shall be my people.',
          ru: 'Какая совместность храма Божия с идолами? Ибо вы храм Бога живаго, как сказал Бог: вселюсь в них и буду ходить в них; и буду их Богом, и они будут Моим народом.',
        },
      },
      {
        verse: 17,
        text: {
          ja: '是の故に主は言い給う、「彼等の中より出でて離れよ、不潔な者に触るるなかれ、然らば我爾等を受けん、」',
          en: 'Wherefore come out from among them, and be ye separate, saith the Lord, and touch not the unclean thing; and I will receive you,',
          ru: 'И потому выйдите из среды их и отделитесь, говорит Господь, и не прикасайтесь к нечистому; и Я прииму вас',
        },
      },
      {
        verse: 18,
        text: {
          ja: '「我爾等の父となり、爾等は我が子となり娘となるべし、と全能の主は言い給えり。」',
          en: 'And will be a Father unto you, and ye shall be My sons and daughters, saith the Lord Almighty.',
          ru: 'и буду вам Отцем, и вы будете Моими сынами и дщерями, говорит Господь Вседержитель.',
        },
      },
      {
        verse: 1,
        text: {
          ja: '愛する者よ、我等此等の約束を有つが故に、自ら潔くして肉と神との総ての汚穢を離れ、神を懼れて聖を全うすべし。',
          en: 'Having therefore these promises, dearly beloved, let us cleanse ourselves from all filthiness of the flesh and spirit, perfecting holiness in the fear of God.',
          ru: 'Итак, возлюбленные, имея такие обетования, очистим себя от всякой скверны плоти и духа, совершая святыню в страхе Божием.',
        },
      },
    ],
  },

  // Elevation of the Holy Cross (Sept 14 Julian / Sept 27 Greg) - Epistle
  '1 Corinthians 1.18-24': {
    display: '1 Corinthians 1:18–24',
    source: 'Epistle',
    book: {
      ja: '聖使徒パウェルのコリンフ人に致す前書（コリンフ前書）',
      en: 'The First Epistle of St. Paul to the Corinthians',
      ru: 'Первое послание святого апостола Павла к Коринфянам',
    },
    pericopeTan: 125,
    verses: [
      {
        verse: 18,
        text: {
          ja: '十字架の道は滅びる者には狂暴なれども、救わるる我等には神の力なり。',
          en: 'For the preaching of the cross is to them that perish foolishness; but unto us which are saved it is the power of God.',
          ru: 'Ибо слово о кресте для погибающих юродство есть, а для нас, спасаемых, — сила Божия.',
        },
      },
      {
        verse: 19,
        text: {
          ja: '録されたる「我は智者の智恵を滅ぼし、巧者の巧みを廃するべし」とある如くなり。',
          en: 'For it is written, I will destroy the wisdom of the wise, and will bring to nothing the understanding of the prudent.',
          ru: 'ибо написано: погублю мудрость мудрецов, и разум разумных отвергну.',
        },
      },
      {
        verse: 20,
        text: {
          ja: '智者は何処にあるや、学者は何処にあるや、此の世の弁論家は何処にあるや。神は此の世の智恵を愚かにされざりしや。',
          en: 'Where is the wise? where is the scribe? where is the disputer of this world? hath not God made foolish the wisdom of this world?',
          ru: 'Где мудрец? где книжник? где совопросник века сего? Не обратил ли Бог мудрость мира сего в безумие?',
        },
      },
      {
        verse: 21,
        text: {
          ja: '神の智恵に於いては、世は己の智恵を以て神を知らざりければ、神は宣教の愚かさを以て信ずる者を救うことを善しとされたり。',
          en: 'For after that in the wisdom of God the world by wisdom knew not God, it pleased God by the foolishness of preaching to save them that believe.',
          ru: 'Ибо когда мир своею мудростью не познал Бога в премудрости Божией, то благоугодно было Богу юродством проповеди спасти верующих.',
        },
      },
      {
        verse: 22,
        text: {
          ja: 'ユダ人は表徴を求め、ギリシャ人は智恵を求む。',
          en: 'For the Jews require a sign, and the Greeks seek after wisdom:',
          ru: 'Ибо и Иудеи требуют чудес, и Еллины ищут мудрости,',
        },
      },
      {
        verse: 23,
        text: {
          ja: '我等は十字架に付けられしハリストスを宣べ伝う、是れイウダ人には躓き、異邦人には狂暴なれども、',
          en: 'But we preach Christ crucified, unto the Jews a stumblingblock, and unto the Greeks foolishness;',
          ru: 'а мы проповедуем Христа распятого, для Иудеев соблазн, а для Еллинов безумие,',
        },
      },
      {
        verse: 24,
        text: {
          ja: '召されたるイウダ人にもギリシャ人にも、ハリストスは神の力、神の智恵なり。',
          en: 'But unto them which are called, both Jews and Greeks, Christ the power of God, and the wisdom of God.',
          ru: 'для самих же призванных, Иудеев и Еллинов, — Христа, Божию силу и Божию премудрость;',
        },
      },
    ],
  },

  // Elevation of the Holy Cross - Gospel
  'John 19.6-35': {
    display: 'John 19:6–11, 13–20, 25–28, 30–35',
    source: 'Gospel',
    book: {
      ja: 'イオアンに因る聖福音',
      en: 'The Holy Gospel According to St. John',
      ru: 'Святое Евангелие от Иоанна',
    },
    pericopeTan: 60,
    verses: [
      {
        verse: 6,
        text: {
          ja: '祭司長等と役人等イイススを見て、叫びて言わく、「十字架に釘づけよ、十字架に釘づけよ。」ピラト彼等に言わく、「爾等彼を引き取りて十字架に釘づけよ、我は彼に罪を見ず。」',
          en: 'When the chief priests therefore and officers saw Him, they cried out, saying, Crucify Him, crucify Him. Pilate saith unto them, Take ye Him, and crucify Him: for I find no fault in Him.',
          ru: 'Когда же увидели Его первосвященники и служители, то закричали: распни, распни Его! Пилат говорит им: возьмите Его вы, и распните; ибо я не нахожу в Нем вины.',
        },
      },
      {
        verse: 9,
        text: {
          ja: 'ピラト又官邸に入り、イイススに言わく、「爾は何処より来たれるや。」然れどイイスス彼に答え給わず。',
          en: 'And went again into the judgment hall, and saith unto Jesus, Whence art Thou? But Jesus gave him no answer.',
          ru: 'и опять вошел в преторию и сказал Иисусу: откуда Ты? Но Иисус не дал ему ответа.',
        },
      },
      {
        verse: 10,
        text: {
          ja: 'ピラト彼に言わく、「爾我に語らずや、我に爾を放つ権あり、爾を十字架に釘づくる権あるを知らずや。」',
          en: 'Then saith Pilate unto Him, Speakest Thou not unto me? knowest Thou not that I have power to crucify Thee, and have power to release Thee?',
          ru: 'Пилат говорит Ему: мне ли не отвечаешь? не знаешь ли, что я имею власть распять Тебя и власть имею отпустить Тебя?',
        },
      },
      {
        verse: 11,
        text: {
          ja: 'イイスス答え給わく、「神より与えられずば、爾我に対して権なし、是の故に我を爾に渡せし者の罪は更に大なり。」',
          en: 'Jesus answered, Thou couldest have no power at all against Me, except it were given thee from above: therefore he that delivered Me unto thee hath the greater sin.',
          ru: 'Иисус отвечал: ты не имел бы надо Мною никакой власти, если бы не было дано тебе свыше; посему более греха на том, кто предал Меня тебе.',
        },
      },
      {
        verse: 13,
        text: {
          ja: 'ピラト此の言を聞きて、イイススを連れ出し、敷石（ヘブル語ではガッファタ）と称する場所の裁判席に坐せり。',
          en: 'When Pilate therefore heard that saying, he brought Jesus forth, and sat down in the judgment seat in a place that is called the Pavement, but in the Hebrew, Gabbatha.',
          ru: 'Пилат, услышав это слово, вывел вон Иисуса и сел на судилище, на месте, называемом Лифостротон, а по-еврейски Гаввафа.',
        },
      },
      {
        verse: 14,
        text: {
          ja: '時は過越の備えの日、六時頃なりき、ピラト西人に言わく、「視よ、爾等の王なり。」',
          en: 'And it was the preparation of the passover, and about the sixth hour: and he saith unto the Jews, Behold your King!',
          ru: 'Тогда была пятница перед Пасхою, и час шестый. И сказал Пилат Иудеям: вот, Царь ваш!',
        },
      },
      {
        verse: 15,
        text: {
          ja: '彼等叫びて言わく、「取り去れ、取り去れ、彼を十字架に釘づけよ。」ピラト彼等に言わく、「我爾等の王を十字架に釘づくべきや。」祭司長等答えく、「カイサルの他に我等に王なし。」',
          en: 'But they cried out, Away with Him, away with Him, crucify Him. Pilate saith unto them, Shall I crucify your King? The chief priests answered, We have no king but Caesar.',
          ru: 'Но они закричали: возьми, возьми, распни Его! Пилат говорит им: Царя ли вашего распну? Первосвященники отвечали: нет у нас царя, кроме кесаря.',
        },
      },
      {
        verse: 16,
        text: {
          ja: 'かく彼等に渡し、十字架に釘づけられんとて去り給えり。彼等イイススを引き取り、',
          en: 'Then delivered he Him therefore unto them to be crucified. And they took Jesus, and led Him away.',
          ru: 'Тогда наконец он предал Его им на распятие. И взяли Иисуса и повели.',
        },
      },
      {
        verse: 17,
        text: {
          ja: '自ら十字架を負い、されこうべの場（ヘブル語ではゴルゴタ）と称する場所に出で給えり。',
          en: 'And He bearing His cross went forth into a place called the place of a skull, which is called in the Hebrew Golgotha:',
          ru: 'и, неся крест Свой, Он вышел на место, называемое Лобное, по-еврейски Голгофа;',
        },
      },
      {
        verse: 18,
        text: {
          ja: 'かしこにて彼等イイススを十字架に釘づけ、他の二人をも共に、一人はここに一人はかしこに、イイススを中央にして。',
          en: 'Where they crucified Him, and two other with Him, on either side one, and Jesus in the midst.',
          ru: 'там распяли Его и с Ним двух других, по ту и по другую сторону, а посреди Иисуса.',
        },
      },
      {
        verse: 19,
        text: {
          ja: 'ピラト、罪状書きを書きて十字架の上に掲げたり。書かれたるは「ナザレのイイスス、西人の王」なりき。',
          en: 'And Pilate wrote a title, and put it on the cross. And the writing was, JESUS OF NAZARETH THE KING OF THE JEWS.',
          ru: 'Пилат же написал и надпись, и поставил на кресте. Написано было: Иисус Назорей, Царь Иудейский.',
        },
      },
      {
        verse: 20,
        text: {
          ja: 'イイスス十字架に釘づけられし場は都の近くなりければ、多くの西人此の罪状書きを読めり。之はヘブル語、ラテン語、ギリシャ語にて書かれたり。',
          en: 'This title then read many of the Jews: for the place where Jesus was crucified was nigh to the city: and it was written in Hebrew, and Greek, and Latin.',
          ru: 'Эту надпись читали многие из Иудеев, потому что место, где был распят Иисус, было недалеко от города, и написано было по-еврейски, по-гречески, по-римски.',
        },
      },
      {
        verse: 25,
        text: {
          ja: 'イイススの十字架の傍には其の母、及び母の姉妹マリア・クロパの妻、及びマグダリンのマリアが立てり。',
          en: 'Now there stood by the cross of Jesus His mother, and His mother\u2019s sister, Mary the wife of Cleophas, and Mary Magdalene.',
          ru: 'При кресте Иисуса стояли Матерь Его и сестра Матери Его, Мария Клеопова, и Мария Магдалина.',
        },
      },
      {
        verse: 26,
        text: {
          ja: 'イイスス其の母及び側に立てる愛する弟子を見て、母に言い給わく、「婦人よ、視よ、爾の子なり。」',
          en: 'When Jesus therefore saw His mother, and the disciple standing by, whom He loved, He saith unto His mother, Woman, behold thy son!',
          ru: 'Иисус, увидев Матерь и ученика тут стоящего, которого любил, говорит Матери Своей: Жено! се, сын Твой.',
        },
      },
      {
        verse: 27,
        text: {
          ja: '次に弟子に言い給わく、「視よ、爾の母なり。」かの時よりして此の弟子彼女を自宅に引き取れり。',
          en: 'Then saith He to the disciple, Behold thy mother! And from that hour that disciple took her unto his own home.',
          ru: 'Потом говорит ученику: се, Матерь твоя! И с этого времени ученик сей взял Её к себе.',
        },
      },
      {
        verse: 28,
        text: {
          ja: '此の後イイスス総ての事は既に成し遂げられたりと知り給い、聖経が成就せんため言い給わく、「我渇く。」',
          en: 'After this, Jesus knowing that all things were now accomplished, that the scripture might be fulfilled, saith, I thirst.',
          ru: 'После того Иисус, зная, что уже всё совершилось, да сбудется Писание, говорит: жажду.',
        },
      },
      {
        verse: 30,
        text: {
          ja: 'イイスス酢を受け、言わく、「成し遂げられたり。」首を垂れて、霊を付嘱し給えり。',
          en: 'When Jesus therefore had received the vinegar, He said, It is finished: and He bowed His head, and gave up the ghost.',
          ru: 'Когда же Иисус вкусил уксуса, сказал: совершилось! И, преклонив главу, предал дух.',
        },
      },
      {
        verse: 31,
        text: {
          ja: '西人等はその日が備えの日なりしゆえ、安息日に死体を十字架に残しておかぬよう（その安息日は大なる日なりき）、ピラトに彼等の脛を折り、死体を取り除かん事を求めたり。',
          en: 'The Jews therefore, because it was the preparation, that the bodies should not remain upon the cross on the sabbath day, (for that sabbath day was an high day,) besought Pilate that their legs might be broken, and that they might be taken away.',
          ru: 'Но так как тогда была пятница, то Иудеи, дабы не оставить тел на кресте в субботу, ибо та суббота была день великий, просили Пилата, чтобы перебить у них голени и снять их.',
        },
      },
      {
        verse: 33,
        text: {
          ja: 'イイススの所に至りし時、彼は既に死し給えるを見て、その脛を折らざりき。',
          en: 'But when they came to Jesus, and saw that He was dead already, they brake not His legs:',
          ru: 'Но, придя к Иисусу, как увидели Его уже умершим, не перебили у Него голеней,',
        },
      },
      {
        verse: 34,
        text: {
          ja: '但し兵士の一人が槍を以て彼の脇腹を刺したり、即ち血と水とが流れ出でたり。',
          en: 'But one of the soldiers with a spear pierced His side, and forthwith came there out blood and water.',
          ru: 'но один из воинов копьём пронзил Ему ребра, и тотчас истекла кровь и вода.',
        },
      },
      {
        verse: 35,
        text: {
          ja: '見たる者が証しをなせり、その証は真なり、彼は自分が真の事を言うと知れり、爾等も信ぜんがためなり。',
          en: 'And he that saw it bare record, and his record is true: and he knoweth that he saith true, that ye might believe.',
          ru: 'И видевший засвидетельствовал, и истинно свидетельство его; он знает, что говорит истину, дабы вы поверили.',
        },
      },
    ],
  },

  // Protection of the Theotokos (Pokrov, Oct 1 Julian / Oct 14 Greg) - Epistle
  'Hebrews 9.1-7': {
    display: 'Hebrews 9:1–7',
    source: 'Epistle',
    book: {
      ja: '聖使徒パウェルのヘブル人に致す書（ヘブル書）',
      en: 'The Epistle of St. Paul to the Hebrews',
      ru: 'Послание святого апостола Павла к Евреям',
    },
    pericopeTan: 320,
    verses: [
      {
        verse: 1,
        text: {
          ja: '初めの契約にもまた礼拝の定規と、世にある聖所とありき。',
          en: 'Then verily the first covenant had also ordinances of divine service, and a worldly sanctuary.',
          ru: 'И первый завет имел постановление о Богослужении и святилище земное:',
        },
      },
      {
        verse: 2,
        text: {
          ja: '蓋し幕屋設けられたり、その前の部を聖所と称す、その中に燈台と机と供麺とあり。',
          en: 'For there was a tabernacle made; the first, wherein was the candlestick, and the table, and the shewbread; which is called the sanctuary.',
          ru: 'ибо устроена была скиния первая, в которой был светильник, и трапеза, и предложение хлебов, и которая называется Святое.',
        },
      },
      {
        verse: 3,
        text: {
          ja: '第二の幕の後には至聖所と称する幕屋あり。',
          en: 'And after the second veil, the tabernacle which is called the Holiest of all;',
          ru: 'За второю же завесою была скиния, называемая Святое Святых,',
        },
      },
      {
        verse: 4,
        text: {
          ja: 'その中には金の香炉と、四方を金にて蔽われたる契約の柩とあり、その中には金の壺にマナを入れたると、芽生えたるアロンの杖と、契約の板とあり。',
          en: 'Which had the golden censer, and the ark of the covenant overlaid round about with gold, wherein was the golden pot that had manna, and Aaron\'s rod that budded, and the tables of the covenant;',
          ru: 'имевшая золотую кадильницу и обложенный со всех сторон золотом ковчег завета, где были золотой сосуд с манною, жезл Ааронов расцветший и скрижали завета,',
        },
      },
      {
        verse: 5,
        text: {
          ja: '此の上には光栄のケルビムが贖罪の座を蔽い、是等の事に就きては今詳しく語ることを得ず。',
          en: 'And over it the cherubims of glory shadowing the mercyseat; of which we cannot now speak particularly.',
          ru: 'а над ним херувимы славы, осеняющие жертвенник примирения; о чем не нужно теперь говорить подробно.',
        },
      },
      {
        verse: 6,
        text: {
          ja: '此等の事如此く備えられたれば、祭司等は常に前の幕屋に入りて礼拝を行う。',
          en: 'Now when these things were thus ordained, the priests went always into the first tabernacle, accomplishing the service of God.',
          ru: 'При таком устройстве, в первую скинию всегда входят священники совершать Богослужение;',
        },
      },
      {
        verse: 7,
        text: {
          ja: '然れど第二の幕屋には大祭司のみが一年に一度入る、血なくして入らず、その血は自己と民の知らずして犯した罪のために献ぐ。',
          en: 'But into the second went the high priest alone once every year, not without blood, which he offered for himself, and for the errors of the people:',
          ru: 'а во вторую — однажды в год один только первосвященник, не без крови, которую приносит за себя и за грехи неведения народа.',
        },
      },
    ],
  },

  // Theotokos Feasts Gospel (Mary and Martha)
  'Luke 10.38-42, 11.27-28': {
    display: 'Luke 10:38–42, 11:27–28',
    source: 'Gospel',
    book: {
      ja: 'ルカに因る聖福音',
      en: 'The Holy Gospel According to St. Luke',
      ru: 'Святое Евангелие от Луки',
    },
    pericopeTan: 54,
    verses: [
      {
        verse: 38,
        text: {
          ja: '彼等行く時、イイスス或る村に入り給えり。マルファという女、彼をその家に迎えたり。',
          en: 'Now it came to pass, as they went, that He entered into a certain village: and a certain woman named Martha received Him into her house.',
          ru: 'В продолжение пути их пришел Он в одно селение; здесь женщина, именем Марфа, приняла Его в дом свой;',
        },
      },
      {
        verse: 39,
        text: {
          ja: 'この女にマリアという妹ありて、主の足もとに坐して御言を聞きいたり。',
          en: 'And she had a sister called Mary, which also sat at Jesus\u2019 feet, and heard His word.',
          ru: 'у неё была сестра, называемая Мария, которая села у ног Иисуса и слушала слово Его.',
        },
      },
      {
        verse: 40,
        text: {
          ja: 'マルファは多くの奉仕にて気を散らし、側に来て言わく、「主よ、我が妹が奉仕を我のみにまかせておくを御覧じなさらぬか、彼女に言いつけ、我を助けさせ給え。」',
          en: 'But Martha was cumbered about much serving, and came to Him, and said, Lord, dost Thou not care that my sister hath left me to serve alone? bid her therefore that she help me.',
          ru: 'Марфа же заботилась о большом угощении и, подойдя, сказала: Господи! или Тебе нужды нет, что сестра моя одну меня оставила служить? скажи ей, чтобы помогла мне.',
        },
      },
      {
        verse: 41,
        text: {
          ja: 'イイスス答えて彼女に言い給わく、「マルファ、マルファ、爾は多くの事に心を労して惑えるなり。',
          en: 'And Jesus answered and said unto her, Martha, Martha, thou art careful and troubled about many things:',
          ru: 'Иисус же сказал ей в ответ: Марфа! Марфа! ты заботишься и суетишься о многом,',
        },
      },
      {
        verse: 42,
        text: {
          ja: '然れども要なる事は唯だ一のみ。マリアは善き分を選べり、之を彼より奪うべからず。',
          en: 'But one thing is needful: and Mary hath chosen that good part, which shall not be taken away from her.',
          ru: 'а одно только нужно; Мария же избрала благую часть, которая не отнимется у нее.',
        },
      },
      {
        verse: 27,
        text: {
          ja: 'イイスス此等の事を言い給う時、群衆の中より一人の女声を揚て彼に言わく、「爾を胎みし胎と、爾を含ませし乳房とは福なり。」',
          en: 'And it came to pass, as He spake these things, a certain woman of the company lifted up her voice, and said unto Him, Blessed is the womb that bare Thee, and the paps which Thou hast sucked.',
          ru: 'Когда же Он говорил это, одна женщина, возвысив голос из народа, сказала Ему: блаженно чрево, носившее Тебя, и сосцы, тебя питавшие!',
        },
      },
      {
        verse: 28,
        text: {
          ja: 'イイスス言い給わく、「誠に、神の言を聞きて之を守る者は福なり。」',
          en: 'But He said, Yea rather, blessed are they that hear the word of God, and keep it.',
          ru: 'А Он сказал: блаженны слышащие слово Божие и соблюдающие его.',
        },
      },
    ],
  },
};
