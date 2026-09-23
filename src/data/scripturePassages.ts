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
  // Today: Wednesday of 17th week after Pentecost (Old Calendar Sept 10)
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
};
