import fs from 'fs';
import path from 'path';

const SECTIONS = ['george', 'maria', 'liturgy', 'pandane'];

function categorize(item, text) {
  const title = item.title || path.basename(item.relativePath || '');
  const relativePath = item.relativePath || '';
  const section = item.section || '';
  const lowerPath = relativePath.toLowerCase();
  const lowerTitle = title.toLowerCase();

  // 1. Choir Scores / PDFs
  if (item.type === 'pdf') {
    return {
      category: 'scores_pdf',
      categoryLabel: { ja: '聖歌譜面・PDF', en: 'Choir Scores (PDF)', ru: 'Ноты и партитуры (PDF)' }
    };
  }

  // 2. Patristics / Saints
  if (
    lowerPath.includes('paisi') ||
    lowerPath.includes('sanfjohn') ||
    lowerPath.includes('st_ioan') ||
    lowerPath.includes('st_cyril') ||
    lowerPath.includes('serafim') ||
    lowerPath.includes('himawari') ||
    lowerPath.includes('farthers') ||
    lowerTitle.includes('パイシイ') ||
    lowerTitle.includes('イオアン') ||
    lowerTitle.includes('師父') ||
    lowerTitle.includes('聖人') ||
    lowerTitle.includes('セラフィム')
  ) {
    return {
      category: 'patristics',
      categoryLabel: { ja: '聖師父と聖人伝', en: 'Holy Fathers & Saints', ru: 'Святые отцы и жития' }
    };
  }

  // 3. Liturgy & Church Singing
  if (
    section === 'maria' ||
    lowerPath.includes('liturg') ||
    lowerPath.includes('gardner') ||
    lowerPath.includes('reader') ||
    lowerPath.includes('structure') ||
    lowerPath.includes('hoshiinrei') ||
    lowerTitle.includes('聖歌') ||
    lowerTitle.includes('奉神礼') ||
    lowerTitle.includes('誦経')
  ) {
    return {
      category: 'liturgy_chant',
      categoryLabel: { ja: '奉神礼と聖歌の学び', en: 'Liturgy & Sacred Chant', ru: 'Богослужение и пение' }
    };
  }

  // 4. Creeds, Canons & Church History
  if (
    lowerPath.includes('symbol') ||
    lowerPath.includes('kisoku') ||
    lowerPath.includes('nikea') ||
    lowerPath.includes('conceptofchurch') ||
    lowerPath.includes('khomiakov') ||
    lowerTitle.includes('信経') ||
    lowerTitle.includes('規則') ||
    lowerTitle.includes('教会観') ||
    lowerTitle.includes('公会')
  ) {
    return {
      category: 'theology_history',
      categoryLabel: { ja: '信条・教会法・教会史', en: 'Creeds, Canons & History', ru: 'Символы веры и каноны' }
    };
  }

  // 5. Spiritual Life & Prayer
  if (
    lowerPath.includes('kallistos') ||
    lowerPath.includes('inori') ||
    lowerPath.includes('whylent') ||
    lowerPath.includes('lent') ||
    lowerPath.includes('pascha') ||
    lowerTitle.includes('祈り') ||
    lowerTitle.includes('大斎') ||
    lowerTitle.includes('復活')
  ) {
    return {
      category: 'spiritual_life',
      categoryLabel: { ja: '信仰生活と祈り', en: 'Spiritual Life & Prayer', ru: 'Духовная жизнь и молитва' }
    };
  }

  // 6. Default to Catechism / Basics
  return {
    category: 'catechism',
    categoryLabel: { ja: '正教入門とＱ＆Ａ', en: 'Catechism & Inquirers', ru: 'Основы веры и вопросы' }
  };
}

function extractTags(title, content) {
  const tags = [];
  const checks = [
    { tag: '入門', regex: /入門|初めて|知りたい|どんな教会/ },
    { tag: '聖体礼儀', regex: /聖体礼儀|リトゥルギア/ },
    { tag: '祈り', regex: /祈り|イエスの祈り|祈祷/ },
    { tag: '大斎・復活祭', regex: /大斎|パスハ|復活/ },
    { tag: '聖歌', regex: /聖歌|ア・カペラ|合唱|八調/ },
    { tag: '聖人伝', regex: /聖人|パイシイ|イオアン|セラフィム|聖ニコライ/ },
    { tag: '聖書', regex: /聖書|福音|みことば/ },
    { tag: '公会議・信条', regex: /公会|信経|カルケドン|ニケア/ },
    { tag: 'Ｑ＆Ａ', regex: /質問|Q&A|お答え|相談/ }
  ];

  for (const c of checks) {
    if (c.regex.test(title) || c.regex.test(content)) {
      tags.push(c.tag);
    }
  }
  return tags.slice(0, 4);
}

// ----------------------------------------------------
// JAPANESE TITLE DICTIONARIES
// ----------------------------------------------------
const OHANASHI_TITLES = {
  'ohanashiindex': '子供たちのための「聖体礼儀のお話」解説シリーズ目次',
  'ohanashi1': '聖体礼儀のお話 第1回: 教会に行きましょう',
  'ohanashi2': '聖体礼儀のお話 第2回: 神の家、聖堂について',
  'ohanashi3': '聖体礼儀のお話 第3回: 至聖所について',
  'ohanashi4': '聖体礼儀のお話 第4回: 奉献礼儀',
  'ohanashi5': '聖体礼儀のお話 第5回: 神の国への旅行',
  'ohanashi6': '聖体礼儀のお話 第6回: 信徒の祈り・大連祷',
  'ohanashi7': '聖体礼儀のお話 第7回: 幸せの歌（第1アンティホン）',
  'ohanashi8': '聖体礼儀のお話 第8回: 第2アンティホン',
  'ohanashi9': '聖体礼儀のお話 第9回: 幸福な生活の法規（真福九端）',
  'ohanashi10': '聖体礼儀のお話 第10回: ハリストスの行進（小聖入）',
  'ohanashi11': '聖体礼儀のお話 第11回: 神の言を聞く準備',
  'ohanashi12': '聖体礼儀のお話 第12回: 使徒経（使徒パウェルたちの書簡）',
  'ohanashi13': '聖体礼儀のお話 第13回: 良き知らせ（福音経）',
  'ohanashi14': '聖体礼儀のお話 第14回: 大聖入・信者の聖体礼儀',
  'ohanashi15': '聖体礼儀のお話 第15回: 領聖準備・愛について',
  'ohanashi16': '聖体礼儀のお話 第16回: 領聖準備・信仰の表明（信経）',
  'ohanashi17': '聖体礼儀のお話 第17回: 親しみの捧げもの（感謝の祈祷）',
  'ohanashi18': '聖体礼儀のお話 第18回: ハリストスの贈物（成聖）',
  'ohanashi19': '聖体礼儀のお話 第19回: 生神女マリヤと諸聖人の記憶',
  'ohanashi20': '聖体礼儀のお話 第20回: 主の祈り（天に在ます我らの父よ）',
  'ohanashi21': '聖体礼儀のお話 第21回: 神の贈物・領聖（聖体拝領）',
  'ohanashi22': '聖体礼儀のお話 第22回: 平安と感謝・聖体礼儀の終わり',
  'ohanashi23': '聖体礼儀のお話 第23回: 聖体礼儀の復習とまとめ',
  'ohanashi24': '聖体礼儀のお話 第24回: 小さなハリストスになりましょう'
};

const NANDEMO_TITLES = {
  'nandemo': '教会生活 何でも質問箱（信仰と生活の疑問ガイダンス）',
  'nandemo1': 'Q&A: 非信徒（仏教徒の家）との結婚への対処と正教会の結婚観',
  'nandemo2': 'Q&A: 未信徒との結婚と教会の祝福（クリスチャンの結婚は「機密」）',
  'nandemo3': 'Q&A: 正教会は保守的すぎる？（長時間の祈祷や規定についての疑問）',
  'nandemo4': 'Q&A: 正教会の儀式主義について（儀式に込められた霊的意味）',
  'nandemo5': 'Q&A: 仏教徒の実家の両親や親族のためにどう祈ればよいか',
  'nandemo6': 'Q&A: 降誕祭（クリスマス）の日付について（ユリウス暦とグレゴリオ暦）',
  'nandemo7': 'Q&A: 立ち続ける祈祷で疲れてしまう時の心がけ（立礼と着席）',
  'nandemo8': 'Q&A: 正教会の聖歌の歌い方とリズム（教会音楽の特質）',
  'nandemo9': 'Q&A: 家屋成聖や新車成聖は古代の迷信か？（正教会の物質成聖観）',
  'nandemo10': 'Q&A: 斎（ものいみ・断食）とは何か？律法主義への逆戻りなのか',
  'nandemo11': 'Q&A: なぜ教会へ参祷しなければならないのか？（一人で祈るだけでは不十分か）',
  'nandemo12': 'Q&A: 参祷と領聖（聖体拝領）の真の意味（聖書を読むだけとの違い）',
  'nandemo13': 'Q&A: 小さな子どもが騒ぐ時の聖体礼儀への参祷について',
  'nandemo14': 'Q&A: 聖体礼儀に遅刻してしまった時の参祷の心構え',
  'nandemo16': 'Q&A: 痛悔機密（告解）でなぜ口頭で神父に罪を告白するのか',
  'nandemo17': 'Q&A: 痛悔機密（告解）で自分の罪を具体的に振り返る方法',
  'nandemo18': 'Q&A: 司祭自身も痛悔機密（告解）を受けるのか？',
  'nandemo20': 'Q&A: 私祈祷（日常の祈り）で自分の言葉で祈ってはいけないのか',
  'nandemo21': 'Q&A: 幼児洗礼を受けた信徒の悩み（親から受け継いだ信仰に向き合う）',
  'nandemo22': 'Q&A: 正教会における死後の信仰（カトリックの「煉獄」教理との違い）',
  'nandemo23': 'Q&A: なぜ「天皇及び国をつかさどる者」のために祈るのか（教会の祈祷と世俗権力）',
  'nandemo24': 'Q&A: 「選ばれた者だけが救われる（予定説）」についての正教会の見解',
  'nandemo25': 'Q&A: キリスト教を名乗る新興宗教と「正統（オーソドックス）」の違い',
  'nandemo28': 'Q&A: 教会法（カノン）とは何か？現代における古代教会の規則',
  'nandemo29': 'Q&A: 家族や近親者が重病・危篤になったときの教会の対処と祈り',
  'nandemo30': 'Q&A: 奉神礼以外の教会行事や催しはなぜ必要なのか',
  'nandemo31': 'Q&A: ヘルビム・セラフィムとは何か（天使の階級と神の讃美）'
};

const VESTMENT_TITLES = {
  'vestment': '正教会の祭服解説 総論',
  'stehari': '正教会の祭服 1: 直衣（ステハリ）',
  'orari': '正教会の祭服 2: 大帯（オラリ）',
  'epitara': '正教会の祭服 3: 領帯（エピタラヒリ）',
  'kote': '正教会の祭服 4: 手届（コテ）',
  'poyas': '正教会の祭服 5: 腰帯（ポヤス）',
  'feron': '正教会の祭服 6: 祭服（フェロン）',
  'sakkos': '正教会の祭服 7: サッコス（主教祭服）',
  'omofol': '正教会の祭服 8: オモフォル（大頸帯）',
  'mantia': '正教会の祭服 9: マンティヤ（主教のマント）',
  'boushi': '正教会の祭服 10: カミラフカとクロブーク（修道・司祭の帽子）',
  'paritsa': '正教会の祭服 11: パリツァとナベドラニク（剣の象徴）',
  'orlet': '正教会の祭服 12: オルレツ（鷲敷）'
};

const SPECIFIC_TITLES = {
  'stalexy': 'モスクワの府主教 聖アレクシイ (St. Alexis, Metropolitan of Moscow)',
  'stalex': '全ロシアの奇蹟者 府主教・聖アレクセイの生涯',
  'stioancry': '聖金口イオアンの生涯 (St. John Chrysostom)',
  'questions': '中学生の質問にお答え（正教会・信仰・教会についての32の問答）',
  'seikyoukaitoha': '正教会とは（キリスト教の源流と東方正統信仰）',
  'gospel': 'みことばに立ち止まる（福音書の瞑想）',
  'msj3': '正教会にわくわくの好奇心をお持ちの方に',
  'msj2': 'キリスト教をとらえ直してみたい方へ',
  'msj1b': 'おやじのこごと 2',
  'oyaji1': 'おやじのこごと 1',
  'farthers': '正教会の聖師父たち（古代教父の教え）',
  'paisiindex': 'アトスの聖パイシイ対話録 目次・解題',
  'sanfjohnindex': '上海とサンフランシスコの聖イオアン 主日講話集 目次',
  'kankoku': '聖師父・長老たちの金言集',
  'illustratedortho': 'イラストで学ぶ正教会（教会の空間・奉神礼・聖器物）',
  'liturgy': '正教会の奉神礼（神との交わりの祈り）',
  'kakutikaihou': '各地の会報から（小教区の信仰生活の息吹）',
  'saints': '正教会の諸聖人たち（聖人伝アーカイブ）',
  'bookguide': '正教会 読書案内・参考文献ガイド',
  'whylent': 'なぜ、大斎（四旬節と正教会の信仰）',
  'htrb': '正教徒は聖書をどのように読むべきか',
  'conceptofchurch': '教会への正教の理解 (J.メイエンドルフ神父)',
  'bishopwareindex': 'カリストス・ウェア主教 著作集（イエスの祈り・正教会入門）',
  'universalsalv': '普遍的救済論と正教会神学',
  'khomiakov': 'ホミャーコフと正教会の教会論（ソボールノスチ）',
  'solascriptura': '「聖書のみ」その前提 (C.カールトン)',
  'stpimen': 'ポチャエフの克肖者 聖ピーメン伝',
  'lifeofpaisios': 'アトスの聖パイシイ 長老の生涯と奇蹟',
  'shazai': '大斎初日の赦罪の晩課（赦しと和解の祈祷）',
  'funeral': '正教会のお葬式（埋葬式と永眠者のための祈り）',
  'sugihara': '杉原千畝と正教会',
  'kenshu': '正教会修道院研修記',
  'sinnen': '新年の祈りと正教会の暦',
  'ishinomaki157': '石巻ハリストス正教会の歩み 1',
  'ishinomaki2': '石巻ハリストス正教会の歩み 2',
  'NagoyaChurch': '名古屋ハリストス正教会 生神女福音聖堂の紹介',
  'HandaChurch': '半田ハリストス正教会 ダマスコの聖イオアン聖堂の紹介',
  'Mark_composition02': '聖歌メロディの構造（シラビック・ネウマティク・メリスマティク）',
  'Rom-Baptism': 'ルーマニア語・日本語対訳 洗礼機密式（BOTEZ）'
};

// ----------------------------------------------------
// ENGLISH TRANSLATIONS DICTIONARIES
// ----------------------------------------------------
const OHANASHI_TITLES_EN = {
  'ohanashiindex': 'Children\'s Guide to the Divine Liturgy (Series Index & Introduction)',
  'ohanashi1': 'Stories of the Liturgy 1: Let Us Go to Church',
  'ohanashi2': 'Stories of the Liturgy 2: The House of God (The Temple)',
  'ohanashi3': 'Stories of the Liturgy 3: The Sanctuary & Altar (Holy of Holies)',
  'ohanashi4': 'Stories of the Liturgy 4: The Proskomedia (Liturgy of Preparation)',
  'ohanashi5': 'Stories of the Liturgy 5: A Journey to the Kingdom of Heaven',
  'ohanashi6': 'Stories of the Liturgy 6: The Great Litany (Litany of Peace)',
  'ohanashi7': 'Stories of the Liturgy 7: Song of Blessing (The First Antiphon)',
  'ohanashi8': 'Stories of the Liturgy 8: The Only-Begotten Son (The Second Antiphon)',
  'ohanashi9': 'Stories of the Liturgy 9: The Beatitudes (Nine Rules for a Blessed Life)',
  'ohanashi10': 'Stories of the Liturgy 10: The Procession of Christ (The Small Entrance)',
  'ohanashi11': 'Stories of the Liturgy 11: Preparing to Hear the Living Word of God',
  'ohanashi12': 'Stories of the Liturgy 12: The Epistles of the Holy Apostles',
  'ohanashi13': 'Stories of the Liturgy 13: The Holy Gospel (Good News of Salvation)',
  'ohanashi14': 'Stories of the Liturgy 14: The Great Entrance & Liturgy of the Faithful',
  'ohanashi15': 'Stories of the Liturgy 15: Preparing for Communion: On Christian Love',
  'ohanashi16': 'Stories of the Liturgy 16: The Nicene Creed: Confession of Our Faith',
  'ohanashi17': 'Stories of the Liturgy 17: The Eucharistic Canon (The Anaphora)',
  'ohanashi18': 'Stories of the Liturgy 18: The Gift of Christ: Consecration of the Gifts',
  'ohanashi19': 'Stories of the Liturgy 19: Remembering the Theotokos and All Saints',
  'ohanashi20': 'Stories of the Liturgy 20: The Lord\'s Prayer (Our Father in Heaven)',
  'ohanashi21': 'Stories of the Liturgy 21: Holy Communion: The Sacred Gift of Life',
  'ohanashi22': 'Stories of the Liturgy 22: Peace and Thanksgiving: Dismissal and Blessing',
  'ohanashi23': 'Stories of the Liturgy 23: Review & Summary of the Divine Liturgy',
  'ohanashi24': 'Stories of the Liturgy 24: Becoming Little Christs in Everyday Life'
};

const NANDEMO_TITLES_EN = {
  'nandemo': 'Parish Inquirer Mailbox: Practical Guidance on Faith & Daily Orthodox Life',
  'nandemo1': 'Q&A: Marriage with a Non-Christian (Buddhist Family) & Orthodox Views',
  'nandemo2': 'Q&A: Marriage to a Non-Orthodox Partner and Church Blessing (Holy Mystery)',
  'nandemo3': 'Q&A: Is Orthodoxy Too Conservative? Long Services & Traditional Rules',
  'nandemo4': 'Q&A: Orthodox Ritualism: The Spiritual Meaning Behind Sacred Rites',
  'nandemo5': 'Q&A: How to Pray for Buddhist Parents, Relatives, and Ancestors',
  'nandemo6': 'Q&A: The Date of Christmas (Julian Calendar vs. Revised Calendar)',
  'nandemo7': 'Q&A: Standing in Prayer and Fatigue: Etiquette of Standing vs. Sitting',
  'nandemo8': 'Q&A: Orthodox Sacred Chant: Singing Style, Rhythm & Sacred Tone',
  'nandemo9': 'Q&A: Blessing Homes and Cars: Ancient Superstition or Sanctification of Matter?',
  'nandemo10': 'Q&A: What is Fasting (Lent)? Spiritual Discipline vs. Legalism',
  'nandemo11': 'Q&A: Why Must We Attend Church? Isn\'t Praying Alone Sufficient?',
  'nandemo12': 'Q&A: True Meaning of Attending Liturgy & Receiving Holy Communion',
  'nandemo13': 'Q&A: Bringing Restless Young Children to the Divine Liturgy',
  'nandemo14': 'Q&A: Arriving Late to Church: Heartfelt Attitude and Etiquette',
  'nandemo16': 'Q&A: Holy Mystery of Confession: Why Confess Orally to a Priest?',
  'nandemo17': 'Q&A: Holy Confession: Practical Steps for Examining One\'s Conscience',
  'nandemo18': 'Q&A: Does the Priest Himself Go to Confession?',
  'nandemo20': 'Q&A: Daily Personal Prayers: Can We Pray in Our Own Words?',
  'nandemo21': 'Q&A: Struggles of Being Baptized as an Infant: Embracing Inherited Faith',
  'nandemo22': 'Q&A: Life After Death: Orthodox Beliefs vs. Roman Catholic Purgatory',
  'nandemo23': 'Q&A: Why the Church Prays for Civil Rulers and Governing Authorities',
  'nandemo24': 'Q&A: Double Predestination: Orthodox Theology on Grace and Free Will',
  'nandemo25': 'Q&A: What Distinguishes Orthodox Christianity from Modern Cults?',
  'nandemo28': 'Q&A: What are Church Canons? Applying Ancient Ecumenical Rules Today',
  'nandemo29': 'Q&A: Prayers and Pastoral Care When a Family Member is Seriously Ill',
  'nandemo30': 'Q&A: Why are Parish Fellowships and Social Gatherings Necessary?',
  'nandemo31': 'Q&A: Who are Cherubim and Seraphim? The Heavenly Ranks of Angels'
};

const VESTMENT_TITLES_EN = {
  'vestment': 'Orthodox Clergy Vestments: An Overview of Sacred Garments',
  'stehari': 'Vestments 1: The Sticharion (Tunic of Salvation)',
  'orari': 'Vestments 2: The Orarion (Deacon\'s Stole of Wings)',
  'epitara': 'Vestments 3: The Epitrachelion (Priest\'s Stole of Grace)',
  'kote': 'Vestments 4: The Epimanikia (Liturgical Cuffs)',
  'poyas': 'Vestments 5: The Zone (Priestly Belt / Girdle of Strength)',
  'feron': 'Vestments 6: The Phelonion (Priestly Chasuble of Righteousness)',
  'sakkos': 'Vestments 7: The Sakkos (Hierarchical Tunic of Humility)',
  'omofol': 'Vestments 8: The Omophorion (Bishop\'s Pallium / The Lost Sheep)',
  'mantia': 'Vestments 9: The Mantiya (Bishop\'s Monastic Mantle)',
  'boushi': 'Vestments 10: The Kamilavka and Klobuk (Clerical & Monastic Headgear)',
  'paritsa': 'Vestments 11: The Palitsa and Nabedrennik (Sword of the Spirit)',
  'orlet': 'Vestments 12: The Orletz (The Eagle Rug for Hierarchical Services)'
};

const SPECIFIC_TITLES_EN = {
  'stalexy': 'St. Alexis, Metropolitan of Moscow and Wonderworker of All Russia',
  'stalex': 'Life of St. Alexis, Metropolitan of Moscow and Wonderworker',
  'stioancry': 'Life of St. John Chrysostom, Archbishop of Constantinople',
  'questions': 'Answers to Middle School Inquirers (32 Questions on Faith)',
  'seikyoukaitoha': 'What is the Orthodox Church? (Apostolic Origin & Faith)',
  'gospel': 'Pausing at the Word of God: Meditations on the Gospels',
  'msj3': 'To Those with Curious Hearts About the Orthodox Church',
  'msj2': 'To Those Seeking to Rediscover Christianity',
  'msj1b': 'Fatherly Reflections (Part 2)',
  'oyaji1': 'Fatherly Reflections (Part 1)',
  'farthers': 'The Holy Fathers of the Orthodox Church (Patristic Teachings)',
  'paisiindex': 'Dialogues with St. Paisios of Mount Athos (Index & Guide)',
  'sanfjohnindex': 'Sunday Homilies of St. John of Shanghai & San Francisco',
  'kankoku': 'Treasury of Sayings from the Holy Fathers & Elders',
  'illustratedortho': 'Illustrated Guide to Orthodoxy (Sanctuary, Liturgy & Vessels)',
  'liturgy': 'The Divine Liturgy & Worship of the Orthodox Church',
  'kakutikaihou': 'Voices from Parishes: The Breath of Orthodox Community Life',
  'saints': 'Lives of the Holy Orthodox Saints (Hagiography Archive)',
  'bookguide': 'Orthodox Reading Guide & Recommended Literature',
  'whylent': 'Why Great Lent? (The Fast and Orthodox Spiritual Discipline)',
  'htrb': 'How Should an Orthodox Christian Read the Holy Bible?',
  'conceptofchurch': 'Orthodox Conception of the Church (Fr. John Meyendorff)',
  'bishopwareindex': 'Selected Works of Metropolitan Kallistos Ware',
  'universalsalv': 'Universal Salvation & Orthodox Theology',
  'khomiakov': 'A.S. Khomiakov and Orthodox Ecclesiology (Sobornost)',
  'solascriptura': 'The Presuppositions of "Sola Scriptura" (Clark Carlton)',
  'stpimen': 'Life of Venerable St. Pimen of Pochaev',
  'lifeofpaisios': 'Life and Miracles of St. Paisios of Mount Athos',
  'shazai': 'Forgiveness Vespers (Cheesefare Sunday & Lent Entrance)',
  'funeral': 'Orthodox Funeral Service & Prayers for the Departed',
  'sugihara': 'Chiune Sugihara and the Orthodox Church',
  'kenshu': 'A Pilgrim\'s Journal: Studies in Orthodox Monasteries',
  'sinnen': 'New Year Prayers and the Liturgical Calendar of the Church',
  'ishinomaki157': 'History of Ishinomaki Orthodox Church (Part 1)',
  'ishinomaki2': 'History of Ishinomaki Orthodox Church (Part 2)',
  'NagoyaChurch': 'Annunciation Church in Nagoya: Parish History & Sanctuary',
  'HandaChurch': 'St. John of Damascus Church in Handa: History & Community',
  'Mark_composition02': 'Structure of Orthodox Melodies (Syllabic, Neumatic, Melismatic)',
  'Rom-Baptism': 'Romanian-Japanese Bilingual Holy Baptism Rite (BOTEZ)'
};

// ----------------------------------------------------
// RUSSIAN TRANSLATIONS DICTIONARIES
// ----------------------------------------------------
const OHANASHI_TITLES_RU = {
  'ohanashiindex': 'Беседы о Божественной Литургии для детей (Оглавление)',
  'ohanashi1': 'Беседы о Литургии 1: Пойдем в храм',
  'ohanashi2': 'Беседы о Литургии 2: Дом Божий — православный храм',
  'ohanashi3': 'Беседы о Литургии 3: Святой алтарь (Святая Святых)',
  'ohanashi4': 'Беседы о Литургии 4: Проскомидия (Литургия приготовления)',
  'ohanashi5': 'Беседы о Литургии 5: Путешествие в Небесное Царство',
  'ohanashi6': 'Беседы о Литургии 6: Великая ектения (Мирная)',
  'ohanashi7': 'Беседы о Литургии 7: Песнь благословения (Первый антифон)',
  'ohanashi8': 'Беседы о Литургии 8: Единородный Сын (Второй антифон)',
  'ohanashi9': 'Беседы о Литургии 9: Заповеди блаженства (Блаженны кроткие)',
  'ohanashi10': 'Беседы о Литургии 10: Шествие со Христом (Малый вход)',
  'ohanashi11': 'Беседы о Литургии 11: Приготовление к слушанию Слова Божия',
  'ohanashi12': 'Беседы о Литургии 12: Чтение Апостола',
  'ohanashi13': 'Беседы о Литургии 13: Святое Евангелие (Благая Весть)',
  'ohanashi14': 'Беседы о Литургии 14: Великий вход и Литургия верных',
  'ohanashi15': 'Беседы о Литургии 15: Приготовление к Причастию: О любви',
  'ohanashi16': 'Беседы о Литургии 16: Символ веры: Исповедание веры',
  'ohanashi17': 'Беседы о Литургии 17: Евхаристический канон (Анафора)',
  'ohanashi18': 'Беседы о Литургии 18: Дар Христов: Освящение Святых Даров',
  'ohanashi19': 'Беседы о Литургии 19: Поминовение Богородицы и всех святых',
  'ohanashi20': 'Беседы о Литургии 20: Молитва Господня (Отче наш)',
  'ohanashi21': 'Беседы о Литургии 21: Святое Причащение (Святые Дары)',
  'ohanashi22': 'Беседы о Литургии 22: Мир и благодарение: Окончание Литургии',
  'ohanashi23': 'Беседы о Литургии 23: Повторение и итоги Литургии',
  'ohanashi24': 'Беседы о Литургии 24: Будем маленькими христианами в жизни'
};

const NANDEMO_TITLES_RU = {
  'nandemo': 'Вопрошания о вере: Ответы на вопросы прихожан о духовной жизни',
  'nandemo1': 'Q&A: Брак с нехристианином (в буддийской семье) и взгляд Церкви',
  'nandemo2': 'Q&A: Брак с неправославным и церковное благословение (Таинство брака)',
  'nandemo3': 'Q&A: Не слишком ли Православие консервативно? Длинные службы и устав',
  'nandemo4': 'Q&A: Обрядность в Православии: Духовный смысл священных обрядов',
  'nandemo5': 'Q&A: Как молиться о родителях и сродниках буддистах',
  'nandemo6': 'Q&A: О дате Рождества Христова (Юлианский и Новоюлианский календари)',
  'nandemo7': 'Q&A: Молитва стоя и усталость: Стояние и сидение во время службы',
  'nandemo8': 'Q&A: Церковное пение: Особенности и ритм богослужебного пения',
  'nandemo9': 'Q&A: Освящение домов и автомобилей: Освящение тварного мира',
  'nandemo10': 'Q&A: Что такое пост? Духовное упражнение или законничество',
  'nandemo11': 'Q&A: Зачем ходить в храм? Разве недостаточно молиться дома?',
  'nandemo12': 'Q&A: Истинный смысл Литургии и Святого Причащения',
  'nandemo13': 'Q&A: О посещении Литургии с маленькими детьми',
  'nandemo14': 'Q&A: Опоздание на Божественную Литургию: Настроение сердца',
  'nandemo16': 'Q&A: Таинство покаяния: Зачем исповедоваться священнику?',
  'nandemo17': 'Q&A: Как готовиться к исповеди и испытывать совесть',
  'nandemo18': 'Q&A: Исповедуется ли сам священник?',
  'nandemo20': 'Q&A: Домашняя молитва: Можно ли молиться своими словами?',
  'nandemo21': 'Q&A: Проблемы крещеных во младенчестве: Осознание веры',
  'nandemo22': 'Q&A: Загробная жизнь: Православное учение и отличие от чистилища',
  'nandemo23': 'Q&A: Почему Церковь молится о властях и правителях',
  'nandemo24': 'Q&A: О предопределении ко спасению: Взгляд Православия',
  'nandemo25': 'Q&A: Отличие Православной Церкви от современных сект',
  'nandemo28': 'Q&A: Церковные каноны: Древние правила в современном мире',
  'nandemo29': 'Q&A: Молитва и пастырская забота о тяжелобольных сродниках',
  'nandemo30': 'Q&A: Зачем нужны приходские праздники и общение вне служб',
  'nandemo31': 'Q&A: Кто такие херувимы и серафимы? Ангельские чины'
};

const VESTMENT_TITLES_RU = {
  'vestment': 'Священные облачения Православной Церкви: Общий обзор',
  'stehari': 'Облачения 1: Стихарь (Одежда спасения)',
  'orari': 'Облачения 2: Орарь (Диаконская лента ангельских крыл)',
  'epitara': 'Облачения 3: Епитрахиль (Благодать священства)',
  'kote': 'Облачения 4: Поручи (Укрепление десницы Господней)',
  'poyas': 'Облачения 5: Пояс (Опоясание силою Божией)',
  'feron': 'Облачения 6: Фелонь (Иерейская риза правды)',
  'sakkos': 'Облачения 7: Саккос (Архиерейское облачение смирения)',
  'omofol': 'Облачения 8: Омофор (Заблудшая овца, взятая на рамена)',
  'mantia': 'Облачения 9: Мантия (Монашеское архиерейское одеяние)',
  'boushi': 'Облачения 10: Камилавка и клобук (Священные головные уборы)',
  'paritsa': 'Облачения 11: Палица и набедренник (Меч духовный)',
  'orlet': 'Облачения 12: Орлец (Архиерейский коврик с орлом)'
};

const SPECIFIC_TITLES_RU = {
  'stalexy': 'Святитель Алексий, митрополит Московский и всея Руси чудотворец',
  'stalex': 'Житие святителя Алексия, митрополита Московского',
  'stioancry': 'Житие святителя Иоанна Златоуста',
  'questions': 'Ответы школьникам: 32 вопроса о православной вере и Церкви',
  'seikyoukaitoha': 'Что такое Православная Церковь? (Апостольские истоки)',
  'gospel': 'Размышления над Евангелием: Вслушиваясь в Слово Божие',
  'msj3': 'Всем, кто с искренним интересом обращается к Православию',
  'msj2': 'Для тех, кто хочет заново открыть для себя христианство',
  'msj1b': 'Беседы и наставления священника (Часть 2)',
  'oyaji1': 'Беседы и наставления священника (Часть 1)',
  'farthers': 'Святые отцы Православной Церкви (Учение древних отцов)',
  'paisiindex': 'Беседы со старцем Паисием Святогорцем (Оглавление)',
  'sanfjohnindex': 'Воскресные проповеди святителя Иоанна Шанхайского',
  'kankoku': 'Золотые поучения святых отцов и старцев',
  'illustratedortho': 'Иллюстрированное введение в Православие (Храм, таинства, утварь)',
  'liturgy': 'Богослужение и молитва в Православной Церкви',
  'kakutikaihou': 'Голоса приходов: Жизнь японских православных общин',
  'saints': 'Жития святых Православной Церкви',
  'bookguide': 'Путеводитель по чтению: Рекомендуемая православная литература',
  'whylent': 'Зачем нужен Великий Пост? (Духовный смысл воздержания)',
  'htrb': 'Как православному христианину читать Священное Писание',
  'conceptofchurch': 'Православное учение о Церкви (Прот. Иоанн Мейендорф)',
  'bishopwareindex': 'Труды митрополита Каллиста (Уэра)',
  'universalsalv': 'Православное богословие и вопрос апокатастасиса',
  'khomiakov': 'А. С. Хомяков и православное учение о Церкви (Соборность)',
  'solascriptura': 'Предпосылки учения «Sola Scriptura» (Кларк Карлтон)',
  'stpimen': 'Житие преподобного Пимена Почаевского',
  'lifeofpaisios': 'Житие и чудеса преподобного Паисия Святогорца',
  'shazai': 'Чин прощения на вечерне Прощеного воскресенья',
  'funeral': 'Православное отпевание и поминовение усопших',
  'sugihara': 'Тиунэ Сугихара и Православная Церковь',
  'kenshu': 'Записки паломника: Опыт монастырской жизни',
  'sinnen': 'Новогодняя молитва и церковный календарь',
  'ishinomaki157': 'Летопись Исиномакского храма (Часть 1)',
  'ishinomaki2': 'Летопись Исиномакского храма (Часть 2)',
  'NagoyaChurch': 'Храм Благовещения в Нагое: История и святыни',
  'HandaChurch': 'Храм св. Иоанна Дамаскина в Ханде',
  'Mark_composition02': 'Основы церковного пения: Силлабика, невмы, мелизмы',
  'Rom-Baptism': 'Чин святого крещения (румынско-японский текст)'
};

// ----------------------------------------------------
// SAINTS & PANDANE MULTILINGUAL MAPPINGS
// ----------------------------------------------------
const SAINTS_MAP = {
  'stakaki': { en: 'Holy Martyr Acacius', ru: 'Святой мученик Акакий' },
  'stagaft': { en: 'Holy Martyrs Agathopodes and Theodulus', ru: 'Святые мученики Агафопод и Феодул' },
  'stadriannatari': { en: 'Holy Martyrs Adrian and Natalia', ru: 'Святые мученики Адриан и Наталия' },
  'stanastasiag': { en: 'Holy Great Martyr Anastasia the Deliverer from Potions', ru: 'Святая великомученица Анастасия Узорешительница' },
  'stafanashia': { en: 'Venerable Mother Athanasia of Aegina', ru: 'Преподобная игумения Афанасия' },
  'stathanasius': { en: 'Life of St. Athanasius the Great, Patriarch of Alexandria', ru: 'Житие святителя Афанасия Великого' },
  'stantony': { en: 'Life of St. Anthony the Great, Father of Monasticism', ru: 'Житие преподобного Антония Великого' },
  'standrei': { en: 'Holy Apostle Andrew the First-Called', ru: 'Святой апостол Андрей Первозванный' },
  'standreicret': { en: 'St. Andrew of Crete, Author of the Great Canon', ru: 'Святитель Андрей Критский' },
  'stambrseoptina': { en: 'Venerable St. Ambrose of Optina', ru: 'Преподобный Амвросий Оптинский' },
  'stiakofbroflord': { en: 'St. James, Brother of the Lord and First Bishop of Jerusalem', ru: 'Святой апостол Иаков, брат Господень' },
  'stjustine': { en: 'Holy Martyr Justin the Philosopher', ru: 'Святой мученик Иустин Философ' },
  'stioasaf': { en: 'Life of St. Joasaph, Bishop of Belgorod', ru: 'Житие святителя Иоасафа Белгородского' },
  'stioancry': { en: 'Life of St. John Chrysostom, Archbishop of Constantinople', ru: 'Житие святителя Иоанна Златоуста' },
  'stioandmsk': { en: 'St. John of Damascus, Theologian and Hymnographer', ru: 'Преподобный Иоанн Дамаскин' },
  'stioansol': { en: 'Righteous John the Soldier', ru: 'Святой праведный Иоанн Воин' },
  'stioanclima': { en: 'St. John Climacus, Author of The Ladder of Divine Ascent', ru: 'Преподобный Иоанн Лествичник' },
  'stJohnkinkou': { en: 'St. John Chrysostom (Golden-Mouthed)', ru: 'Святитель Иоанн Златоуст' },
  'stiosif': { en: 'Righteous Joseph the Betrothed', ru: 'Праведный Иосиф Обручник' },
  'stiof': { en: 'Holy Righteous Job the Long-Suffering', ru: 'Праведный Иов Многострадальный' },
  'stignaty': { en: 'Holy Hieromartyr Ignatius the God-Bearer of Antioch', ru: 'Священномученик Игнатий Богоносец' },
  'stirina': { en: 'Holy Great Martyr Irene of Thessalonica', ru: 'Святая великомученица Ирина' },
  'stiria': { en: 'Holy Glorious Prophet Elijah (Elias)', ru: 'Святой пророк Илия' },
  'st3sistermother': { en: 'Holy Martyrs Faith, Hope, Love and Mother Sophia', ru: 'Святые мученицы Вера, Надежда, Любовь и матерь их София' },
  'steudokia': { en: 'Holy Martyr Eudokia', ru: 'Преподобномученица Евдокия' },
  'steuple': { en: 'Holy Martyr Euplus the Archdeacon', ru: 'Священномученик диакон Евпл' },
  'stekaterina': { en: 'Holy Great Martyr Catherine of Alexandria', ru: 'Святая великомученица Екатерина Александрийская' },
  'stgeorge': { en: 'Holy Great Martyr George the Trophy-Bearer', ru: 'Святой великомученик Георгий Победоносец' },
  'stsera': { en: 'Venerable St. Seraphim of Vyritsa', ru: 'Преподобный Серафим Вырицкий' },
  'stpimen': { en: 'Venerable St. Pimen of Pochaev', ru: 'Преподобный Пимен Почаевский' },
  'st_t01': { en: 'St. Tikhon of Zadonsk, Wonderworker', ru: 'Святитель Тихон Задонский чудотворец' },
  'st_ioan01': { en: 'St. John of Kronstadt: Introduction', ru: 'Святой праведный Иоанн Кронштадтский: Введение' },
  'st_ioan02': { en: 'St. John of Kronstadt: House of Industry', ru: 'Святой Иоанн Кронштадтский: Дом трудолюбия' },
  'st_ioan03': { en: 'St. John of Kronstadt: On Prayer (Part 1)', ru: 'Святой Иоанн Кронштадтский: О молитве (1)' },
  'st_ioan04': { en: 'St. John of Kronstadt: On Prayer (Part 2)', ru: 'Святой Иоанн Кронштадтский: О молитве (2)' },
  'st_ioan05': { en: 'St. John of Kronstadt: Miracles and Healings', ru: 'Святой Иоанн Кронштадтский: Чудеса и исцеления' },
  'st_ioan06': { en: 'St. John of Kronstadt: Spiritual Insight & Prophecy', ru: 'Святой Иоанн Кронштадтский: Прозорливость' },
  'st_ioan07': { en: 'St. John of Kronstadt: Words on Church and Clergy', ru: 'Святой Иоанн Кронштадтский: О Церкви и священстве' },
  'kinkou': { en: 'Life of St. John Chrysostom', ru: 'Житие святителя Иоанна Златоуста' },
  'bishopware1a': { en: 'Metropolitan Kallistos Ware Lecture 1 (Part 1)', ru: 'Митрополит Каллист (Уэр) Лекция 1 (Часть 1)' },
  'bishopware1b': { en: 'Metropolitan Kallistos Ware Lecture 1 (Part 2)', ru: 'Митрополит Каллист (Уэр) Лекция 1 (Часть 2)' },
  'bishopware5a': { en: 'Metropolitan Kallistos Ware Lecture 5 (Part 1): The Jesus Prayer', ru: 'Митрополит Каллист (Уэр) Лекция 5 (Часть 1): Иисусова молитва' },
  'bishopware5b': { en: 'Metropolitan Kallistos Ware Lecture 5 (Part 2): The Jesus Prayer', ru: 'Митрополит Каллист (Уэр) Лекция 5 (Часть 2): Иисусова молитва' }
};

const PANDANE_MAP = {
  'asa': { en: 'Orthodox Morning Prayers', ru: 'Утренние молитвы' },
  'hiru': { en: 'Orthodox Midday Prayers', ru: 'Дневные молитвы' },
  'kure': { en: 'Orthodox Evening Prayers (Compline)', ru: 'Молитвы на сон грядущим' },
  'dl_': { en: 'The Divine Liturgy of St. John Chrysostom', ru: 'Божественная Литургия свт. Иоанна Златоуста' },
  'panihida': { en: 'Panikhida (Memorial Service for the Departed)', ru: 'Панихида (Заупокойное богослужение)' },
  'youseikansya': { en: 'Thanksgiving Prayers After Holy Communion', ru: 'Благодарственные молитвы по Святом Причащении' },
  'theo_aka': { en: 'Akathist Hymn to the Most Holy Theotokos', ru: 'Акафист Пресвятой Богородице' },
  'nikekon': { en: 'Nicene-Constantinopolitan Creed (Symbol of Faith)', ru: 'Никео-Цареградский Символ веры' },
  'nikea': { en: 'The Creed of Nicaea (325 AD)', ru: 'Никейский Символ веры (325 г.)' },
  'karu': { en: 'The Chalcedonian Definition of Faith (451 AD)', ru: 'Халкидонский орос (451 г.)' },
  'kon': { en: 'The Definition of the Sixth Ecumenical Council', ru: 'Орос Шестого Вселенского собора' },
  'seizou': { en: 'Decree of the Seventh Ecumenical Council on Icons', ru: 'Определение Седьмого Вселенского собора об иконах' },
  'apostol': { en: 'Canons of the Holy Apostles', ru: 'Правила Святых Апостолов' },
  'E01': { en: 'Canons of the First Ecumenical Council (Nicaea I)', ru: 'Правила Первого Вселенского Собора' },
  'E02': { en: 'Canons of the Second Ecumenical Council (Constantinople I)', ru: 'Правила Второго Вселенского Собора' },
  'E03': { en: 'Canons of the Third Ecumenical Council (Ephesus)', ru: 'Правила Третьего Вселенского Собора' },
  'E04': { en: 'Canons of the Fourth Ecumenical Council (Chalcedon)', ru: 'Правила Четвертого Вселенского Собора' },
  'E07': { en: 'Canons of the Seventh Ecumenical Council (Nicaea II)', ru: 'Правила Седьмого Вселенского Собора' },
  'mokuji': { en: 'The Book of Canons (Pedalion): Table of Contents', ru: 'Оглавление Книги правил' },
  'jousiki1': { en: 'Common Customs and Practices in the Orthodox Church (1)', ru: 'Обычаи и традиции Православной Церкви (1)' },
  'jousiki2': { en: 'Common Customs and Practices in the Orthodox Church (2)', ru: 'Обычаи и традиции Православной Церкви (2)' },
  'jousiki03': { en: 'Common Customs and Practices in the Orthodox Church (3)', ru: 'Обычаи и традиции Православной Церкви (3)' },
  'jousiki04': { en: 'Common Customs and Practices in the Orthodox Church (4)', ru: 'Обычаи и традиции Православной Церкви (4)' },
  'himawari01': { en: 'Heliotropion (The Sunflower) 01: Foundations', ru: 'Илиотропион свт. Иоанна Тобольского (1)' },
  'himawari02': { en: 'Heliotropion 02: Teachings of St. Bernard', ru: 'Илиотропион: Поучения св. Бернарда (2)' },
  'himawari03': { en: 'Heliotropion 03: The Judgments of God', ru: 'Илиотропион: Судьбы Господни (3)' },
  'himawari04': { en: 'Heliotropion 04: Conforming Our Will to God', ru: 'Илиотропион: Предание воле Божией (4)' },
  'himawari05': { en: 'Heliotropion 05: Trials and the Chastening of God', ru: 'Илиотропион: Промысл Божий в испытаниях (5)' },
  'cyril_hom02': { en: 'Catechetical Lectures of St. Cyril: God the Father', ru: 'Огласительные поучения свт. Кирилла: О Боге Отце' },
  'cyril_hom03': { en: 'Catechetical Lectures of St. Cyril: God the Son', ru: 'Огласительные поучения свт. Кирилла: О Сыне Божием' },
  'ser1': { en: 'Metropolitan Sergius (Tikhomirov): Faith and Religion', ru: 'Митрополит Сергий (Тихомиров): Вера и религия' },
  'ser2': { en: 'Metropolitan Sergius: Sermon on Consecration of Tokyo Cathedral', ru: 'Митрополит Сергий: Проповедь на освящение собора в Токио' },
  'ser3': { en: 'Metropolitan Sergius: Finding the True Value of Christ', ru: 'Митрополит Сергий: Обретение ценности во Христе' },
  'ser4': { en: 'Metropolitan Sergius: The Three Forces in Church Building', ru: 'Митрополит Сергий: Три силы церковного созидания' },
  'ser5': { en: 'Metropolitan Sergius: Epistle to Children of Japan Orthodox Church', ru: 'Митрополит Сергий: Послание верным чадам Японской Церкви' }
};

const PRECOMPILED_SNIPPETS_EN = {
  'george_seikyoukaitoha': 'The apostolic faith preserved unchanged from Christ and the Apostles down to modern Japan, worshiping through choral beauty and sacred icons.',
  'george_farthers': 'Teachings and spiritual wisdom from the ancient Holy Fathers of the undivided early Church, guiding faith and Christian life.',
  'george_liturgy': 'An introduction to the mystery and divine harmony of the Orthodox Divine Liturgy, celebrating the Kingdom of God on earth.',
  'george_whylent': 'The spiritual meaning of Great Lent, fasting, repentance, and preparation of soul and body for the radiant Feast of Holy Pascha.',
  'george_questions': 'Answers to 32 practical questions asked by middle school inquirers about Orthodox Christian faith, sanctuary customs, and worship.',
  'george_conceptofchurch': 'An exploration of Orthodox ecclesiology by Fr. John Meyendorff, examining the sacramental unity of the local and universal Church.',
  'george_khomiakov': 'The theological vision of A.S. Khomiakov on Sobornost (catholicity) and unity in freedom and love within the Church.',
  'george_stalexy': 'The life and miracles of St. Alexis, Metropolitan of Moscow and Wonderworker of All Russia, patron saint and builder of peace.'
};

function getMultilingualTitles(item, baseName, displayTitle) {
  let titleEn = '';
  let titleRu = '';

  // 1. Exact dictionaries first
  if (SPECIFIC_TITLES_EN[baseName]) {
    titleEn = SPECIFIC_TITLES_EN[baseName];
    titleRu = SPECIFIC_TITLES_RU[baseName] || titleEn;
    return { titleEn, titleRu };
  }
  if (OHANASHI_TITLES_EN[baseName]) {
    titleEn = OHANASHI_TITLES_EN[baseName];
    titleRu = OHANASHI_TITLES_RU[baseName] || titleEn;
    return { titleEn, titleRu };
  }
  if (NANDEMO_TITLES_EN[baseName]) {
    titleEn = NANDEMO_TITLES_EN[baseName];
    titleRu = NANDEMO_TITLES_RU[baseName] || titleEn;
    return { titleEn, titleRu };
  }
  if (VESTMENT_TITLES_EN[baseName]) {
    titleEn = VESTMENT_TITLES_EN[baseName];
    titleRu = VESTMENT_TITLES_RU[baseName] || titleEn;
    return { titleEn, titleRu };
  }
  if (SAINTS_MAP[baseName]) {
    titleEn = SAINTS_MAP[baseName].en;
    titleRu = SAINTS_MAP[baseName].ru;
    return { titleEn, titleRu };
  }
  if (PANDANE_MAP[baseName]) {
    titleEn = PANDANE_MAP[baseName].en;
    titleRu = PANDANE_MAP[baseName].ru;
    return { titleEn, titleRu };
  }

  // 2. Pattern-based for St. Paisios dialogues
  if (/^paisi(\d+)$/i.test(baseName)) {
    const num = baseName.replace(/paisi/i, '');
    titleEn = `Dialogues with St. Paisios of Mount Athos (Dialogue ${num})`;
    titleRu = `Беседы со старцем Паисием Святогорцем (Беседа ${num})`;
    return { titleEn, titleRu };
  }

  // 3. Pattern-based for St. John homilies
  if (/^sanfjohn(\d+)$/i.test(baseName)) {
    const num = baseName.replace(/sanfjohn/i, '');
    titleEn = `St. John of San Francisco: Sunday Homily #${num}`;
    titleRu = `Святитель Иоанн Шанхайский: Воскресная проповедь №${num}`;
    return { titleEn, titleRu };
  }

  // 4. PDF Choir Scores
  if (item.type === 'pdf') {
    const octMatch = baseName.match(/octoechos_sun_(\d)/i);
    if (octMatch) {
      titleEn = `Octoechos: Tone ${octMatch[1]} Sunday Choir Score (PDF)`;
      titleRu = `Октоих: Воскресные песнопения ${octMatch[1]}-го гласа (PDF)`;
    } else if (baseName.toLowerCase().includes('daishiki')) {
      titleEn = 'Divine Liturgy: Full Choir Score (PDF)';
      titleRu = 'Божественная Литургия: Партитура для хора (PDF)';
    } else {
      titleEn = `Orthodox Choir Score: ${decodeURIComponent(baseName.replace(/[_-]/g, ' '))} (PDF)`;
      titleRu = `Православные ноты: ${decodeURIComponent(baseName.replace(/[_-]/g, ' '))} (PDF)`;
    }
    return { titleEn, titleRu };
  }

  // 5. Intelligent Fallbacks
  if (displayTitle.includes('聖体礼儀')) {
    titleEn = `Divine Liturgy: ${displayTitle.replace(/聖体礼儀/g, '').replace(/[（()）]/g, '').trim()}`;
    titleRu = `Божественная Литургия: ${displayTitle.replace(/聖体礼儀/g, '').replace(/[（()）]/g, '').trim()}`;
  } else if (displayTitle.startsWith('聖') || displayTitle.includes('聖人')) {
    titleEn = `Life of Saint: ${displayTitle.replace(/聖人伝|聖/g, '').trim()}`;
    titleRu = `Житие святого: ${displayTitle.replace(/聖人伝|聖/g, '').trim()}`;
  } else {
    titleEn = displayTitle;
    titleRu = displayTitle;
  }

  return { titleEn, titleRu };
}

function getSubTopic(item, title) {
  const rel = (item.relativePath || '').toLowerCase();
  const baseName = path.basename(item.relativePath, path.extname(item.relativePath)).toLowerCase();
  const lowerTitle = (title || '').toLowerCase();

  // 1. Holy Fathers & Saints (聖師父と現代の長老・聖人伝)
  if (
    baseName.startsWith('st') ||
    rel.includes('paisi') ||
    rel.includes('sanfjohn') ||
    rel.includes('st_ioan') ||
    rel.includes('st_cyril') ||
    rel.includes('serafim') ||
    rel.includes('stalexy') ||
    rel.includes('stioan') ||
    rel.includes('stioancry') ||
    rel.includes('farthers') ||
    rel.includes('saints') ||
    rel.includes('kankoku') ||
    lowerTitle.includes('パイシイ') ||
    lowerTitle.includes('サンフランシスコ') ||
    lowerTitle.includes('聖師父') ||
    lowerTitle.includes('金言') ||
    lowerTitle.includes('聖人') ||
    lowerTitle.includes('アレクシイ') ||
    lowerTitle.includes('聖金口') ||
    lowerTitle.startsWith('聖') ||
    lowerTitle.includes(' 聖') ||
    lowerTitle.includes('致命者') ||
    lowerTitle.includes('克肖者') ||
    lowerTitle.includes('義人')
  ) {
    return 'fathers_saints';
  }

  // 2. Q&A & Inquirer Guidance (信徒・求道者のＱ＆Ａ)
  if (
    rel.includes('questions') ||
    rel.includes('nandemo') ||
    lowerTitle.includes('質問') ||
    lowerTitle.includes('q&a')
  ) {
    return 'inquiries_qa';
  }

  // 3. Liturgy, Great Lent & Prayer (奉神礼・聖体礼儀・大斎・祈り)
  if (
    rel.includes('ohanashi') ||
    rel.includes('liturgy') ||
    rel.includes('whylent') ||
    rel.includes('kallistos') ||
    rel.includes('shazai') ||
    lowerTitle.includes('聖体礼儀') ||
    lowerTitle.includes('大斎') ||
    lowerTitle.includes('奉神礼') ||
    lowerTitle.includes('祈り') ||
    lowerTitle.includes('イエスの祈り')
  ) {
    return 'liturgy_prayer';
  }

  // 4. Theology, Ecclesiology & Canons (神学・教会論・歴史)
  if (
    rel.includes('concept') ||
    rel.includes('khomiakov') ||
    rel.includes('solascriptura') ||
    rel.includes('universalsalv') ||
    rel.includes('kisoku') ||
    rel.includes('nikea') ||
    rel.includes('symbol') ||
    lowerTitle.includes('教会論') ||
    lowerTitle.includes('神学') ||
    lowerTitle.includes('公会') ||
    lowerTitle.includes('規則') ||
    lowerTitle.includes('信経')
  ) {
    return 'theology_church';
  }

  // 5. Church Life, Vestments & Heritage (教会生活・祭服・慣習)
  if (
    rel.includes('vestment') ||
    rel.includes('funeral') ||
    rel.includes('illust') ||
    rel.includes('kaiho') ||
    rel.includes('sugihara') ||
    rel.includes('bookguide') ||
    lowerTitle.includes('祭服') ||
    lowerTitle.includes('葬式') ||
    lowerTitle.includes('読書案内') ||
    lowerTitle.includes('会報')
  ) {
    return 'church_life';
  }

  // 6. Foundations & Basics of Orthodoxy (正教会の信仰と基本)
  return 'foundations';
}

function getAuthor(item) {
  if (item.section === 'george') return '司祭 ゲオルギイ 松島 雄一 (Fr. George Matsushima)';
  if (item.relativePath.includes('gardner')) return 'ヨハン・フォン・ガードナー (Johann von Gardner)';
  if (item.relativePath.includes('paisi')) return 'アトスの聖パイシイ (St. Paisios of Mt. Athos)';
  if (item.relativePath.includes('sanfjohn')) return '上海とサンフランシスコの聖イオアン (St. John of Shanghai)';
  if (item.relativePath.includes('st_ioan')) return 'クロンシュタットの聖イオアン (St. John of Kronstadt)';
  if (item.relativePath.includes('kallistos')) return 'カリストス・ウェア主教 (Bishop Kallistos Ware)';
  if (item.relativePath.includes('cyril')) return '日本正教会伝統テキスト (Traditional Orthodox Text)';
  return '正教会文献アーカイブ (Orthodox Heritage Archive)';
}

function cleanSnippet(content, title) {
  if (!content) return '';
  const lines = content.split('\n');
  const valid = [];

  for (let l of lines) {
    l = l.trim();
    if (!l || l.startsWith('#') || l.startsWith('*Original') || l.startsWith('---') || l.startsWith('![') || l.startsWith('[](')) {
      continue;
    }
    // If line has a relative link to another page like (heiannishite.htm), skip it
    if (/\([^\)]+\.html?\)/i.test(l) || /\[.*\]\(.*\.html?\)/i.test(l)) {
      continue;
    }
    // Remove navigation links like [TOP PAGE](index.html), [index.html], [](index.html)
    l = l.replace(/\[\s*(?:TOP PAGE|TOP|index|目次|TOPPAGE)?\s*\]\([^\)]+\)/gi, '');
    l = l.replace(/\[\s*\]\([^\)]+\)/g, '');
    l = l.replace(/\[(?:index\.html|top|toppage|page)\]/gi, '');
    // Remove anchor links like [正教の奉神礼](#sokode)
    l = l.replace(/\[([^\]]+)\]\(#[^\)]+\)/g, '');
    // Unwrap regular links
    l = l.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
    // Strip markdown formatting symbols
    l = l.replace(/[*_#~`]/g, '');
    // Replace html entities
    l = l.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    // Clean outer quotes
    l = l.replace(/^[“”"']+|[”"']+$/g, '').trim();
    l = l.replace(/\s+/g, ' ');

    if (l.length < 8) continue;
    if (title && (l === title || l.startsWith(title))) continue;
    if (['リトゥルギア', '正教の奉神礼', '聖師父たちの言葉', 'みことばに立ち止まる', '教会の教え', 'はじめに'].includes(l)) continue;
    if (/^(?:Fr\.|Joost|Herman|By|翻訳|著|訳)\s/i.test(l)) continue;

    valid.push(l);
    if (valid.join(' ').length >= 140) break;
  }

  const res = valid.join(' ').replace(/\s+/g, ' ').trim();
  return res.length > 135 ? res.slice(0, 132) + '...' : res;
}

async function main() {
  console.log('Building library catalog from archives...');
  const allItems = [];

  for (const sec of SECTIONS) {
    const catalogPath = path.resolve(`archive/${sec}/catalog.json`);
    if (!fs.existsSync(catalogPath)) continue;

    const items = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    for (const item of items) {
      item.section = sec;

      let content = '';
      if (item.markdownPath && fs.existsSync(item.markdownPath)) {
        content = fs.readFileSync(item.markdownPath, 'utf8');
      }

      // Ignore trivial single-line or redirect pages
      if (item.type === 'article' && item.contentLength < 100) {
        continue;
      }

      const baseName = path.basename(item.relativePath, path.extname(item.relativePath));
      let displayTitle = item.title;

      // 1. Direct dictionary overrides first (highest accuracy)
      if (SPECIFIC_TITLES[baseName]) {
        displayTitle = SPECIFIC_TITLES[baseName];
      } else if (OHANASHI_TITLES[baseName]) {
        displayTitle = OHANASHI_TITLES[baseName];
      } else if (NANDEMO_TITLES[baseName]) {
        displayTitle = NANDEMO_TITLES[baseName];
      } else if (VESTMENT_TITLES[baseName]) {
        displayTitle = VESTMENT_TITLES[baseName];
      } else if (displayTitle === 'arekisymtrpl') {
        displayTitle = 'モスクワの府主教 聖アレクシイ (St. Alexis, Metropolitan of Moscow)';
      } else if (displayTitle === 'stioancry') {
        displayTitle = '聖金口イオアンの生涯 (St. John Chrysostom)';
      }

      const isRawFilename =
        !displayTitle ||
        displayTitle === 'No title' ||
        displayTitle === 'none' ||
        displayTitle.endsWith('.htm') ||
        displayTitle.endsWith('.html') ||
        /^[a-zA-Z0-9_\-\.]+$/.test(displayTitle);

      if (isRawFilename) {
        if (content) {
          const lines = content
            .split('\n')
            .map(l => l.trim())
            .filter(l => l && !l.startsWith('#') && !l.startsWith('*Original') && !l.startsWith('---') && !l.startsWith('![]') && !l.startsWith('[]'));
          
          if (lines.length > 0) {
            const first = lines[0]
              .replace(/\*\*/g, '')
              .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
              .replace(/&quot;/g, '"')
              .replace(/&amp;/g, '&')
              .trim();
            if (first.length >= 2 && first.length <= 90 && !first.endsWith('.htm') && !first.endsWith('.html')) {
              displayTitle = first;
            }
          }
        }

        // Contextual overrides for known series
        if (/^paisi(\d+)$/i.test(baseName)) {
          const num = baseName.replace(/paisi/i, '');
          displayTitle = `${displayTitle && !displayTitle.includes('.htm') && !/^[a-zA-Z0-9]+$/.test(displayTitle) ? displayTitle + ' ' : ''}(聖パイシイ対話 第${num}話)`;
        } else if (/^sanfjohn(\d+)$/i.test(baseName)) {
          const num = baseName.replace(/sanfjohn/i, '');
          displayTitle = `サンフランシスコの聖イオアン 主日講話 第${num}講`;
        } else if (!displayTitle || displayTitle.endsWith('.htm') || displayTitle.endsWith('.html') || /^[a-zA-Z0-9_\-]+$/.test(displayTitle)) {
          const octMatch = baseName.match(/octoechos_sun_(\d)/i);
          if (octMatch) {
            displayTitle = `主日八調 聖歌楽譜 第${octMatch[1]}調 (Octoechos Tone ${octMatch[1]})`;
          } else if (baseName.toLowerCase().includes('daishiki')) {
            displayTitle = '大式聖体礼儀 聖歌楽譜 (Divine Liturgy Full Score)';
          } else {
            displayTitle = decodeURIComponent(baseName.replace(/[_-]/g, ' '));
          }
        }
      }

      const catInfo = categorize(item, content);
      const tags = item.type === 'pdf' ? ['聖歌楽譜', 'PDF', '奉神礼'] : extractTags(displayTitle, content);
      const author = getAuthor(item);
      const subTopic = getSubTopic(item, displayTitle);

      // Multi-lingual titles
      const { titleEn, titleRu } = getMultilingualTitles(item, baseName, displayTitle);

      // Estimate reading time: 500 Japanese characters per minute
      const readTimeMinutes = Math.max(1, Math.ceil((item.contentLength || 500) / 500));

      const itemId = `${sec}_${path.basename(item.relativePath, path.extname(item.relativePath))}`.replace(/[^a-zA-Z0-9_-]/g, '_');

      allItems.push({
        id: itemId,
        title: displayTitle,
        titleEn,
        titleRu,
        section: sec,
        type: item.type,
        url: item.url,
        relativePath: item.relativePath,
        category: catInfo.category,
        categoryLabel: catInfo.categoryLabel,
        subTopic,
        author,
        readTimeMinutes: item.type === 'article' ? readTimeMinutes : undefined,
        tags,
        snippet: item.type === 'pdf' ? `正教会聖歌楽譜 PDFファイル (${Math.round((item.size || 0) / 1024)} KB)` : cleanSnippet(content, displayTitle),
        snippetEn: PRECOMPILED_SNIPPETS_EN[itemId] || undefined,
        contentLength: item.contentLength,
        size: item.size
      });
    }
  }

  // Filter out duplicate or junk entries, deduplicating IDs
  const seenIds = new Set();
  const cleanItems = allItems.filter(item => {
    if (!item.title || item.title === 'No title' || item.title === 'none') return false;
    if (seenIds.has(item.id)) return false;
    seenIds.add(item.id);
    return true;
  });

  // Pick top featured articles for Inquirers (AboutOrthodoxyView)
  const featuredInquirerArticles = [
    'george_seikyoukaitoha',
    'george_questions',
    'george_gospel',
    'george_farthers',
    'george_liturgy',
    'george_whylent',
    'george_paisiindex',
    'george_conceptofchurch'
  ];

  const featured = cleanItems.filter(i => featuredInquirerArticles.includes(i.id));

  const outputData = {
    generatedAt: new Date().toISOString(),
    totalCount: cleanItems.length,
    articlesCount: cleanItems.filter(i => i.type === 'article').length,
    scoresCount: cleanItems.filter(i => i.type === 'pdf').length,
    featuredInquirers: featured,
    items: cleanItems
  };

  const jsonPath = path.resolve('src/data/libraryCatalog.json');
  fs.writeFileSync(jsonPath, JSON.stringify(outputData, null, 2), 'utf8');

  // Also write a TypeScript helper
  const tsContent = `// Auto-generated library catalog
import libraryData from './libraryCatalog.json';

export type OrthodoxSubTopic =
  | 'foundations'
  | 'liturgy_prayer'
  | 'inquiries_qa'
  | 'fathers_saints'
  | 'theology_church'
  | 'church_life';

export interface LibraryItem {
  id: string;
  title: string;
  titleEn?: string;
  titleRu?: string;
  section: 'george' | 'maria' | 'liturgy' | 'pandane';
  type: 'article' | 'pdf';
  url: string;
  relativePath: string;
  category: 'catechism' | 'patristics' | 'spiritual_life' | 'theology_history' | 'liturgy_chant' | 'scores_pdf';
  categoryLabel: { ja: string; en: string; ru: string };
  subTopic?: OrthodoxSubTopic;
  author: string;
  readTimeMinutes?: number;
  tags: string[];
  snippet: string;
  snippetEn?: string;
  contentLength?: number;
  size?: number;
}

export const LIBRARY_DATA = libraryData as {
  generatedAt: string;
  totalCount: number;
  articlesCount: number;
  scoresCount: number;
  featuredInquirers: LibraryItem[];
  items: LibraryItem[];
};
`;

  fs.writeFileSync(path.resolve('src/data/libraryCatalog.ts'), tsContent, 'utf8');
  console.log(`Successfully generated libraryCatalog.json with ${cleanItems.length} curated items!`);
  console.log(`- Articles: ${outputData.articlesCount}`);
  console.log(`- PDF Choir Scores: ${outputData.scoresCount}`);
}

main();
