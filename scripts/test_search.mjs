import fs from 'fs';

const text = fs.readFileSync('src/data/nameDays.ts', 'utf8');
const jsonMatch = text.match(/export const COMMON_NAME_DAYS: NameDayEntry\[\] = (\[[\s\S]*?\]);/);
if (!jsonMatch) {
  console.error("Could not parse COMMON_NAME_DAYS from file");
  process.exit(1);
}
const COMMON_NAME_DAYS = JSON.parse(jsonMatch[1]);

const ALIAS_GROUPS = [
  ['mary', 'maria', 'mariya', 'マリア', 'マリヤ', 'мария', 'маша'],
  ['john', 'ioann', 'ioan', 'ivan', 'イオアン', 'иоанн', 'иван', 'ваня'],
  ['nicholas', 'nikolai', 'nicolas', 'klaus', 'ニコライ', 'николай', 'коля'],
  ['peter', 'petr', 'pyotr', 'petar', 'ペトル', 'пётр', 'петр', 'петя'],
  ['paul', 'pavel', 'パウェル', 'павел', 'паша'],
  ['alexander', 'aleksandr', 'sasha', 'shura', 'アレクサンドル', 'александр', 'саша'],
  ['alexandra', 'sasha', 'shura', 'アレクサンドラ', 'александра'],
  ['alexis', 'alexei', 'alexey', 'aleksei', 'aleksey', 'alyosha', 'アレクシイ', 'アレクセイ', 'алексей', 'алёша'],
  ['anna', 'anne', 'ann', 'アンナ', 'анна', 'аня'],
  ['catherine', 'ekaterina', 'katya', 'katerina', 'エカテリナ', 'екатерина', 'катя'],
  ['elizabeth', 'elizaveta', 'liza', 'elisabeth', 'エリザベト', 'елизавета', 'лиза'],
  ['anastasia', 'anastasiya', 'nastya', 'アナスタシヤ', 'анастасия', 'настя'],
  ['tatiana', 'tatyana', 'tanya', 'タチヤナ', 'タチアナ', 'татьяна', 'таня'],
  ['olga', 'olha', 'olya', 'オルガ', 'ольга', 'оля'],
  ['helen', 'elena', 'yelena', 'lena', 'エレナ', 'елена', 'лена'],
  ['michael', 'mikhail', 'misha', 'ミハイル', 'михаил', 'миша'],
  ['gabriel', 'gavriil', 'gavrila', 'ガヴリイル', 'гавриил'],
  ['george', 'georgii', 'yuri', 'yury', 'egor', 'georgios', 'ゲオルギイ', 'ユーリ', 'георгий', 'юрий', 'егор'],
  ['demetrius', 'dmitri', 'dmitry', 'dima', 'димитрий', 'дмитрий', 'дима', 'ディミトリイ', 'ディミトリー'],
  ['basil', 'vasilii', 'vasily', 'vasya', 'ワシリイ', 'василий', 'вася'],
  ['gregory', 'grigorii', 'grigory', 'grisha', 'グリゴリイ', 'григорий', 'гриша'],
  ['sergius', 'sergii', 'sergei', 'sergey', 'seryozha', 'セルギイ', 'сергий', 'сергей', 'серёжа'],
  ['seraphim', 'serafim', 'sima', 'セラフィム', 'серафим'],
  ['andrew', 'andrei', 'andrey', 'アンドレイ', 'андрей'],
  ['luke', 'lucas', 'luka', 'ルカ', 'лука'],
  ['daniel', 'danil', 'daniil', 'danya', 'ダニイル', 'даниил', 'даня'],
  ['david', 'ダヴィド', 'давид'],
  ['stephen', 'stepan', 'stefan', 'ステファン', 'ステパン', 'стефан', 'степан', 'стёパ'],
  ['mark', 'marcus', 'マルコ', 'марк'],
  ['matthew', 'matfei', 'matvey', 'マトフェイ', 'матфей', 'матвей', 'мотя'],
  ['thomas', 'foma', 'トマス', 'фома'],
  ['james', 'jacob', 'iakov', 'yakov', 'イアコフ', 'иаков', 'яков', 'яша'],
  ['timothy', 'timofey', 'tima', 'ティモフェイ', 'тимофей', 'тима'],
  ['barbara', 'varvara', 'varya', 'ワルワラ', 'варвара', 'варя'],
  ['xenia', 'ksenia', 'oksana', 'ksyusha', 'クセニヤ', 'ксения', 'оксана', 'ксюша'],
  ['daria', 'dasha', 'ダリヤ', 'дарья', 'даша'],
  ['natalia', 'natalie', 'natasha', 'ナタリア', 'наталья', 'наташа'],
  ['sophia', 'sofia', 'sonya', 'ソフィヤ', 'софия', 'софья', 'соня'],
  ['vera', 'faith', 'ヴェラ', 'вера'],
  ['hope', 'nadezhda', 'nadya', 'ナデジダ', 'надежда', 'надя'],
  ['love', 'lyubov', 'lyuba', 'リュボフィ', 'любовь', 'люба'],
  ['irene', 'irina', 'ira', 'イリナ', 'ирина', 'ира'],
  ['nina', 'nino', 'ニーナ', 'нина'],
  ['tamara', 'tamar', 'タマラ', 'тамара'],
  ['matrona', 'matryona', 'マトローナ', 'матрона'],
  ['veronica', 'veronika', 'ヴェロニカ', 'вероника'],
  ['photina', 'photini', 'svetlana', 'sveta', 'スヴェトラーナ', 'фотина', 'светлана', 'света'],
  ['juliana', 'ulyana', 'yuliana', 'yulia', 'ユリアナ', 'ウリヤナ', 'иулиания', 'ульяна', 'юлия'],
  ['ludmila', 'lyudmila', 'lyuda', 'リュドミラ', 'людмила', 'люда'],
  ['elijah', 'elias', 'ilya', 'イリヤ', 'илия', 'илья'],
  ['moses', 'moisei', 'モイセイ', 'моисей'],
  ['joseph', 'iosif', 'osip', 'イオシフ', 'иосиф'],
  ['simeon', 'simon', 'semen', 'senya', 'シメオン', 'симеон', 'семён', 'сеня'],
  ['panteleimon', 'pantaleon', 'パンテレイモン', 'пантелеимон', 'пантелеймон'],
  ['anthony', 'antony', 'anton', 'アントニイ', 'антоний', 'антон'],
  ['athanasius', 'afanasy', 'アファナシイ', 'афанасий'],
  ['herman', 'german', 'ヘルマン', 'герман'],
  ['innocent', 'innokenty', 'インノケンティ', 'иннокентий'],
  ['tikhon', 'ティホン', 'тихон'],
  ['vladimir', 'volodya', 'vova', 'ウラジーミル', 'владимир', 'володя', 'вова'],
  ['constantine', 'konstantin', 'kostya', 'コンスタンティン', 'константин', 'костя'],
  ['roman', 'рома', 'ロマン', 'роман', 'рома'],
  ['cosmas', 'kozma', 'コスマ', 'косма', 'козьма'],
  ['maximus', 'maksim', 'maxim', 'マクシム', 'максим'],
  ['cyril', 'kirill', 'キリル', 'кирилл'],
  ['methodius', 'mefody', 'メフォディ', 'мефодий'],
  ['boris', 'ボリス', 'борис', 'боря'],
  ['gleb', 'グレブ', 'глеб'],
  ['igor', 'イゴール', 'игорь'],
  ['spyridon', 'spiridon', 'スピリドン', 'спиридон'],
  ['philip', 'filipp', 'フィリポ', 'филипп', 'филя'],
  ['bartholomew', 'varfolomey', 'ワルフォロメイ', 'варфоломей'],
  ['jude', 'thaddaeus', 'faddey', 'ユダ', 'фаддей'],
  ['matthias', 'matfiy', 'マフィヤ', 'матфий'],
  ['barnabas', 'varnava', 'ワルナワ', 'варнава'],
  ['titus', 'tit', 'ティト', 'тит'],
  ['lazarus', 'lazar', 'ラザリ', 'лазарь'],
  ['eugene', 'evgeny', 'yevgeny', 'zhenya', 'エヴゲニイ', 'евгений', 'женя'],
  ['eugenia', 'evgenia', 'zhenya', 'エヴゲニヤ', 'евгения'],
  ['nikita', 'ニキータ', 'никита'],
  ['artemy', 'artem', 'artyom', 'アルテミイ', 'артемий', 'артём'],
  ['anatoly', 'tolya', 'アナトリイ', 'анатолий', 'толя'],
  ['denis', 'dionysius', 'dionisii', 'デニス', 'дионисий', 'денис'],
  ['vadim', 'ヴァディム', 'вадим'],
  ['valery', 'valeriy', 'ヴァレリイ', 'валерий'],
  ['valentina', 'valya', 'ヴァレンティナ', 'валентина', 'валя'],
  ['vyacheslav', 'slava', 'ヴャチェスラフ', 'вячеслав', 'слава'],
  ['vladislav', 'vlad', 'ウラジスラフ', 'владислав', 'влад'],
  ['yaroslav', 'ヤロスラフ', 'ярослав'],
  ['stanislav', 'stas', 'スタニスラフ', 'станислав', 'стас'],
  ['rostislav', 'ロスティスラフ', 'ростислав'],
  ['oleg', 'オレグ', 'олег'],
  ['polina', 'apollinaria', 'ポリナ', 'полина', 'аполлинария'],
  ['taisia', 'thais', 'タイシヤ', 'таисия'],
  ['christina', 'khristina', 'クリスティナ', 'христина'],
  ['galina', 'galya', 'ガリナ', 'галина', 'галя'],
  ['claudia', 'klavdiya', 'クラウディヤ', 'клавдия'],
  ['lydia', 'lidiya', 'リディヤ', 'лидия'],
  ['larisa', 'ラリサ', 'лариса'],
  ['kira', 'キラ', 'кира'],
  ['zoya', 'zoe', 'ゾヤ', 'зоя'],
  ['inna', 'インナ', 'инна'],
  ['rimma', 'リンマ', 'римма'],
  ['nonna', 'ノンナ', 'нонна'],
  ['monica', 'モニカ', 'моника'],
  ['victoria', 'viktoriya', 'ヴィクトリヤ', 'виктория', 'вика'],
  ['lucy', 'lucia', 'ルキヤ', 'лукия'],
  ['patrick', 'patrik', 'patricius', 'パトリック', 'патрикий'],
  ['columba', 'コルンバ', 'колумба'],
  ['brigid', 'ブリギット', 'бригитта'],
  ['aidan', 'アイダン', 'айдан'],
  ['cuthbert', 'カスバート', 'кутберт'],
  ['bede', 'ベダ', 'беда'],
  ['martin', 'マルティン', 'мартин'],
  ['benedict', 'ベネディクト', 'венедикт'],
  ['sava', 'savva', 'サワ', 'савва'],
  ['theodore', 'fyodor', 'fedor', 'fedya', 'フェオドル', 'фёдор', 'федя'],
  ['prochorus', 'prokhor', 'プロホル', 'прохор'],
  ['lawrence', 'lavrenty', 'ラヴレンティ', 'лаврентий'],
  ['leonid', 'レオニード', 'леонид', 'лёня'],
  ['lev', 'leo', 'leon', 'レフ', 'лев'],
  ['miron', 'myron', 'ミロン', 'мирон'],
  ['rodion', 'ロディオン', 'родион'],
  ['arkady', 'アルカジイ', 'аркадий'],
  ['gennady', 'gena', 'ゲンナジイ', 'геннадий', 'гена'],
  ['pachomius', 'pakhomy', 'パホミイ', 'пахомий'],
  ['hilarion', 'ilarion', 'イラリオン', 'иларий', 'иларион'],
  ['ephrem', 'efrem', 'エフレム', 'ефрем'],
  ['isaac', 'isaak', 'イサアク', 'исаак'],
  ['macarius', 'makary', 'マカリイ', 'макарий'],
  ['sabbas', 'savva', 'サワ', 'савва'],
  ['euthymius', 'evfimy', 'エフフィミイ', 'евфимий'],
  ['theodosius', 'feodosy', 'フェオドシイ', 'феодосий'],
  ['silouan', 'silvan', 'シルアン', 'силуан'],
  ['theophan', 'feofan', 'フェオファン', 'феофан'],
  ['ignatius', 'ignaty', 'イグナティ', 'игнатий'],
  ['charalambos', 'kharalampy', 'ハララムピイ', 'харалампий'],
  ['blaise', 'vlasy', 'ウラシイ', 'власий'],
  ['sebastian', 'sevastian', 'セバスティアン', 'севастиан'],
  ['victor', 'viktor', 'ヴィクトル', 'виктор'],
  ['procopius', 'prokopy', 'プロコピイ', 'прокопий'],
  ['eustathius', 'evstafy', 'エフスタフィイ', 'евстафий'],
  ['tryphon', 'trifon', 'トリフォン', 'трифон'],
  ['pelagia', 'ペラギヤ', 'пелагия'],
  ['paraskeva', 'petka', 'パラスケヴァ', 'параскева'],
  ['agnes', 'agniya', 'アグニヤ', 'агния'],
  ['cecilia', 'kikiliya', 'キキリヤ', 'кикилия'],
  ['agatha', 'agafiya', 'アガフィヤ', 'агафия'],
  ['thekla', 'fyokla', 'フェクラ', 'фёкла'],
  ['valeria', 'valeriya', 'ヴァレリヤ', 'валерия'],
  ['alla', 'アッラ', 'алла'],
  ['zlata', 'chryse', 'ズラタ', 'злата'],
  ['adam', 'アダム', 'адам'],
  ['adrian', 'アドリアン', 'адриан'],
  ['bogdan', 'theodotus', 'ボグダン', 'богдан'],
  ['arthur', 'artur', 'アーサー', 'артур'],
  ['scholastica', 'スコラスティカ', 'схоластика'],
  ['edward', 'エドワード', 'эдуард'],
  ['genevieve', 'ジュヌヴィエーヴ', 'женевьева'],
  ['justin', 'iustin', 'ユスティン', 'иустин'],
  ['irenaeus', 'iriney', 'イリネイ', 'ириней'],
  ['cyprian', 'kiprian', 'キプリアン', 'киприан'],
  ['ambrose', 'amvrosy', 'アンヴロシイ', 'амвросий'],
  ['augustine', 'avgustin', 'アウグスティン', 'августин'],
  ['jerome', 'ieronim', 'イエロニム', 'иероним'],
  ['nektarios', 'nektary', 'ネクタリオス', 'нектарий'],
  ['paisios', 'paisy', 'パイシオス', 'паисий'],
  ['porphyrios', 'porfiry', 'ポルフィリオス', 'порфирий'],
  ['raphael', 'rafail', 'ラファイル', 'рафаил'],
  ['uriel', 'uriil', 'ウリイル', 'уриил'],
  ['samuel', 'samuil', 'サモイル', 'самуил'],
  ['joshua', 'イイスス・ナヴィン', 'иисус навин'],
  ['isaiah', 'isaiya', 'イサイヤ', 'исаия'],
  ['jeremiah', 'ieremiya', 'イエレミヤ', 'иеремия'],
  ['ezekiel', 'iezekiil', 'エゼキイル', 'иезекииль'],
  ['abraham', 'avraam', 'アヴラアム', 'авраам'],
  ['joachim', 'ioakim', 'イオアキム', 'иоаким'],
  ['zachariah', 'zakhariya', 'ザハリア', 'захария'],
  ['nicodemus', 'nikodim', 'ニコディム', 'никодим'],
  ['andrei rublev', 'rublev', 'ルブリョフ', 'рублёв'],
  ['nestor', 'ネストル', 'нестор'],
  ['fevronia', 'fevroniya', 'フェヴロニヤ', 'феврония'],
];

function search(query) {
  const q = query.trim().toLowerCase();
  let searchTerms = [q];
  for (const group of ALIAS_GROUPS) {
    if (group.some((item) => item.includes(q) || q.includes(item))) {
      searchTerms = Array.from(new Set([...searchTerms, ...group]));
    }
  }

  return COMMON_NAME_DAYS.filter((entry) => {
    const matchJa = `${entry.name.ja} ${entry.saint.ja}`.toLowerCase();
    const matchEn = `${entry.name.en} ${entry.saint.en}`.toLowerCase();
    const matchRu = `${entry.name.ru} ${entry.saint.ru}`.toLowerCase();
    const matchAliases = (entry.aliases || []).join(' ').toLowerCase();

    return searchTerms.some(
      (term) =>
        matchJa.includes(term) ||
        matchEn.includes(term) ||
        matchRu.includes(term) ||
        matchAliases.includes(term) ||
        entry.feastDateCivil.includes(term) ||
        entry.feastDateJulian.includes(term)
    );
  });
}

const testQueries = [
  'Mary', 'dmitry', 'дима', 'alyosha', 'yuri', 'ivan', 'тимофей',
  'zhenya', 'patrick', 'luke', 'herman', 'ksenia', 'sveta', 'ulyana',
  'katya', 'liza', 'varya', 'tanya', 'natasha', 'spyridon', 'columba',
  'ニコライ', 'マリヤ', 'ペトル', 'エヴゲニイ', 'ボグダン', 'アーサー'
];

console.log(`Total database size: ${COMMON_NAME_DAYS.length} saints.`);
let passed = true;
for (const q of testQueries) {
  const results = search(q);
  console.log(`Query "${q}": found ${results.length} matches (e.g. ${results[0]?.name?.en || 'NONE'})`);
  if (results.length === 0) {
    passed = false;
    console.error(`FAILED: "${q}" returned 0 results!`);
  }
}

if (passed) {
  console.log('ALL TEST QUERIES PASSED!');
} else {
  process.exit(1);
}
