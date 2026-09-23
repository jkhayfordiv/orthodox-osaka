'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { NameDayEntry, Locale } from '../../lib/types';
import { Search, X, Check, Award, Calendar, Plus, Sparkles } from 'lucide-react';
import { convertCivilToJulian, convertJulianToCivil } from '../../lib/notifications';

interface SaintSearchComboboxProps {
  selectedSaintId: string | null;
  onSelect: (saintId: string | null) => void;
  locale: Locale;
  label?: string;
  placeholder?: string;
}

export function SaintSearchCombobox({
  selectedSaintId,
  onSelect,
  locale,
  label,
  placeholder,
}: SaintSearchComboboxProps) {
  const { allSaints, addCustomSaint } = useApp();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Modal state for adding a custom unlisted saint
  const [showAddModal, setShowAddModal] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customCalendarType, setCustomCalendarType] = useState<'julian' | 'civil'>('julian');
  const [customMonth, setCustomMonth] = useState<number>(new Date().getMonth() + 1);
  const [customDay, setCustomDay] = useState<number>(new Date().getDate());

  const selectedSaint = allSaints.find((s) => s.id === selectedSaintId) || null;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset query and close dropdown when selectedSaintId is cleared externally
  useEffect(() => {
    if (!selectedSaintId) {
      setQuery('');
      setIsOpen(false);
    }
  }, [selectedSaintId]);

  // Compute preview dates for the custom saint modal
  const customDatePreview = useMemo(() => {
    if (customCalendarType === 'julian') {
      const julianStr = `${String(customMonth).padStart(2, '0')}-${String(customDay).padStart(2, '0')}`;
      const civil = convertJulianToCivil(customMonth, customDay);
      return {
        julian: julianStr,
        civil: civil.formatted,
      };
    } else {
      const civilStr = `${String(customMonth).padStart(2, '0')}-${String(customDay).padStart(2, '0')}`;
      const julian = convertCivilToJulian(customMonth, customDay);
      return {
        julian: julian.formatted,
        civil: civilStr,
      };
    }
  }, [customCalendarType, customMonth, customDay]);

  const handleCreateCustomSaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newId = addCustomSaint({
      name: {
        ja: customName.trim(),
        en: customName.trim(),
        ru: customName.trim(),
      },
      saint: {
        ja: customName.trim(),
        en: customName.trim(),
        ru: customName.trim(),
      },
      feastDateCivil: customDatePreview.civil,
      feastDateJulian: customDatePreview.julian,
      aliases: [customName.trim().toLowerCase()],
      isCustom: true,
    });

    onSelect(newId);
    setShowAddModal(false);
    setIsOpen(false);
    setQuery('');
    setCustomName('');
  };

  // Filter saints with multilingual fuzzy matching
  const filteredSaints = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return allSaints.slice(0, 20); // Show first 20 if empty
    }

    // Bidirectional multilingual aliases for cross-language matching and nicknames
    const ALIAS_GROUPS: string[][] = [
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
      ['stephen', 'stepan', 'stefan', 'ステファン', 'ステパン', 'стефан', 'степан', 'стёпа'],
      ['mark', 'marcus', 'マルコ', 'марк'],
      ['matthew', 'matfei', 'matvey', 'マトフェイ', 'матфей', 'матвей', 'мотя'],
      ['thomas', 'foma', 'トマス', 'фома'],
      ['james', 'jacob', 'iakov', 'yakov', 'イアコフ', 'иаков', 'яков', 'яша'],
      ['timothy', 'timofey', 'tima', 'ティモフェイ', 'тиモフェイ', 'тимофей', 'тима'],
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
      ['gleb', 'グレブ', 'gleb', 'глеб'],
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
      ['kevin', 'ケヴィン', 'кевин'],
      ['brendan', 'ブレンダン', 'брендан'],
      ['alban', 'アルバノ', 'албан'],
      ['chad', 'チャド', 'чед'],
      ['hilda', 'ヒルダ', 'хильда'],
      ['audrey', 'オードリー', 'этельдреда'],
      ['mildred', 'ミルドレッド', 'мильдреда'],
      ['dunstan', 'ダンスタン', 'дунстан'],
      ['swithun', 'スウィザン', 'свитун'],
      ['ursula', 'ウルズラ', 'урсула'],
      ['boniface', 'ボニファス', 'бонифаций'],
      ['fanourios', 'ファヌリオス', 'фанурий'],
      ['stylianos', 'スティリアノス', 'стилиан'],
      ['gerasimos', 'ゲラシモス', 'герасим'],
      ['dionysios', 'ディオニシオス', 'дионисий'],
      ['philothei', 'フィロテイ', 'филофея'],
      ['sophrony', 'ソフロニイ', 'софроний'],
      ['markella', 'マルケラ', 'маркелла'],
      ['kyriaki', 'キリアキ', 'кириакия'],
      ['tabitha', 'タビタ', 'тавифа'],
      ['priscilla', 'プリスキラ', 'прискилла'],
      ['aquila', 'アキラ', 'акила'],
      ['sarah', 'サラ', 'сарра'],
      ['rebecca', 'レベッカ', 'ревекка'],
      ['rachel', 'ラケル', 'рахиль'],
      ['ruth', 'ルツ', 'руфь'],
      ['noah', 'ノア', 'ной'],
    ];

    // Find any expanded search terms from ALIAS_GROUPS
    let searchTerms = [q];
    for (const group of ALIAS_GROUPS) {
      if (group.some((item) => item.includes(q) || q.includes(item))) {
        searchTerms = Array.from(new Set([...searchTerms, ...group]));
      }
    }

    return allSaints.filter((entry) => {
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
  }, [query, allSaints]);

  const defaultPlaceholder =
    locale === 'ja'
      ? '聖人名を入力（例: マリヤ, ニコライ, Mary, John）'
      : locale === 'ru'
      ? 'Поиск святого (напр. Мария, Николай, Иоанн)...'
      : 'Type to search saint (e.g. Mary, Nicholas, John)...';

  return (
    <div ref={containerRef} className="relative w-full space-y-2">
      {label && (
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
          {label}
        </label>
      )}

      {/* Selected Saint Display Card */}
      {selectedSaint ? (
        <div className="flex items-center justify-between p-3 rounded-xl border-2 border-orthodox-gold bg-orthodox-candle/20 dark:bg-slate-800/80 shadow-sm animate-in fade-in">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <Award className="w-5 h-5 text-orthodox-gold flex-shrink-0" />
            <div className="truncate">
              <div className="font-bold text-sm text-orthodox-navy dark:text-orthodox-gold-light truncate flex items-center space-x-1.5">
                <span>{selectedSaint.name[locale]} — {selectedSaint.saint[locale]}</span>
                {selectedSaint.isCustom && (
                  <span className="text-[10px] py-0.5 px-1.5 rounded bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-semibold">
                    {locale === 'ja' ? '手動登録' : locale === 'ru' ? 'Свой' : 'Custom'}
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-2 mt-0.5">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-orthodox-burgundy dark:text-orthodox-gold" />
                  <span>
                    {locale === 'ja' ? '新暦 ' : locale === 'ru' ? 'Нов. стиль ' : 'Civil: '}
                    {selectedSaint.feastDateCivil}
                  </span>
                </span>
                <span className="text-slate-400">|</span>
                <span>
                  {locale === 'ja' ? '旧暦 ' : locale === 'ru' ? 'Ст. стиль ' : 'Julian: '}
                  {selectedSaint.feastDateJulian}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
                setQuery('');
              }}
              className="text-xs py-1 px-2.5 rounded-lg bg-orthodox-gold/20 hover:bg-orthodox-gold text-orthodox-navy dark:text-orthodox-gold-light hover:text-orthodox-navy font-bold transition-colors"
            >
              {locale === 'ja' ? '変更' : locale === 'ru' ? 'Изменить' : 'Change'}
            </button>
            <button
              type="button"
              onClick={() => onSelect(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
              title="Clear selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Search Input when no saint is selected (or when choosing) */
        <div className="relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-orthodox-gold absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder={placeholder || defaultPlaceholder}
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-orthodox-gold shadow-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating / Inline Dropdown List */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-40 mt-1 bg-white dark:bg-slate-900 border border-orthodox-gold/40 rounded-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
          <div className="p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-[11px] text-slate-500 font-semibold px-3">
            <span>
              {query
                ? `${filteredSaints.length} ${
                    locale === 'ja'
                      ? '件の候補が見つかりました'
                      : locale === 'ru'
                      ? 'найдено'
                      : 'saints found'
                  }`
                : `${locale === 'ja' ? '主な聖人一覧（入力して検索可能）' : 'Common Saints (Type to search)'}`}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs"
            >
              ✕ {locale === 'ja' ? '閉じる' : 'Close'}
            </button>
          </div>

          {filteredSaints.length === 0 ? (
            <div className="p-4 text-center space-y-2">
              <p className="text-xs text-slate-500">
                {locale === 'ja'
                  ? '該当する聖人が見つかりませんでした。別の読みや表記をお試しいただくか、下記より手動で追加してください。'
                  : 'No matching saints found in database. You can manually register any saint below:'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredSaints.map((entry) => {
                const isSelected = entry.id === selectedSaintId;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => {
                      onSelect(entry.id);
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className={`w-full text-left p-3 hover:bg-orthodox-candle/30 dark:hover:bg-slate-800/80 transition-colors flex items-center justify-between group ${
                      isSelected ? 'bg-orthodox-gold/15' : ''
                    }`}
                  >
                    <div className="pr-2 min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-sm text-orthodox-navy dark:text-orthodox-gold-light group-hover:text-orthodox-burgundy dark:group-hover:text-orthodox-gold transition-colors">
                          {entry.name[locale]}
                        </span>
                        <span className="text-xs text-slate-400 font-normal truncate">
                          ({entry.name.en !== entry.name[locale] ? entry.name.en : entry.name.ja})
                        </span>
                        {entry.isCustom && (
                          <span className="text-[9px] py-0.2 px-1.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-semibold">
                            {locale === 'ja' ? '手動登録' : 'Custom'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-serif leading-snug mt-0.5 line-clamp-1">
                        {entry.saint[locale]}
                      </p>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center space-x-2">
                        <span className="font-medium text-orthodox-navy dark:text-orthodox-gold">
                          {locale === 'ja' ? '新暦: ' : 'Civil: '}
                          {entry.feastDateCivil}
                        </span>
                        <span>•</span>
                        <span>
                          {locale === 'ja' ? '旧暦: ' : 'Julian: '}
                          {entry.feastDateJulian}
                        </span>
                      </div>
                    </div>

                    <div className="flex-shrink-0 ml-2">
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-orthodox-gold text-orthodox-navy flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-orthodox-gold opacity-0 group-hover:opacity-100 transition-opacity">
                          {locale === 'ja' ? '選択' : 'Select'}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Button to Add Saint Not Listed */}
          <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80">
            <button
              type="button"
              onClick={() => {
                setShowAddModal(true);
                setIsOpen(false);
              }}
              className="w-full py-2 px-3 rounded-lg border border-dashed border-orthodox-gold hover:border-orthodox-gold-dark text-orthodox-gold-dark dark:text-orthodox-gold font-bold text-xs flex items-center justify-center space-x-1.5 hover:bg-orthodox-gold/10 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>
                {locale === 'ja'
                  ? '＋ 一覧にない聖人を手動登録する'
                  : locale === 'ru'
                  ? '+ Добавить святого, которого нет в списке'
                  : '+ Add saint not listed (Custom Saint)'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Modal for Adding Custom Saint */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border-2 border-orthodox-gold rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-orthodox-gold/30 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-orthodox-gold" />
                <h3 className="font-serif font-bold text-base sm:text-lg text-orthodox-navy dark:text-orthodox-gold-light">
                  {locale === 'ja'
                    ? '一覧にない聖人の手動登録'
                    : locale === 'ru'
                    ? 'Добавить святого вручную'
                    : 'Add Saint Not Listed'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {locale === 'ja'
                ? '聖人のお名前と記憶日（祝日）を入力してください。旧暦（教会暦）または新暦（現行暦）のいずれかを指定でき、13日間の暦差は自動計算されます。'
                : locale === 'ru'
                ? 'Введите имя святого и день памяти. Вы можете указать дату по старому (юлианскому) или новому стилю — 13 дней разницы рассчитаются автоматически.'
                : 'Enter the saint’s name and feast day. You can specify either Old Calendar (Julian) or Civil (New Calendar) date — the 13-day calendar difference will be auto-calculated.'}
            </p>

            <form onSubmit={handleCreateCustomSaint} className="space-y-4">
              {/* Saint Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  {locale === 'ja' ? '聖人名 / 洗礼名' : locale === 'ru' ? 'Имя святого' : 'Saint / Baptismal Name'} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    locale === 'ja'
                      ? '例: 聖ケヴィン（グレンダーロッホの）、アイルランドの諸聖人'
                      : locale === 'ru'
                      ? 'Напр. Кевин Глендалохский'
                      : 'e.g. St. Kevin of Glendalough'
                  }
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:border-orthodox-gold"
                />
              </div>

              {/* Calendar Style Toggle */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  {locale === 'ja' ? '日付の指定基準' : locale === 'ru' ? 'Стиль календаря' : 'Calendar Style of Feast Date'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomCalendarType('julian')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      customCalendarType === 'julian'
                        ? 'bg-orthodox-gold text-orthodox-navy border-orthodox-gold shadow'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    📜 {locale === 'ja' ? '旧暦（ユリウス暦）' : locale === 'ru' ? 'Старый стиль' : 'Old Calendar (Julian)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomCalendarType('civil')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      customCalendarType === 'civil'
                        ? 'bg-orthodox-gold text-orthodox-navy border-orthodox-gold shadow'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    🔔 {locale === 'ja' ? '新暦（グレゴリオ暦）' : locale === 'ru' ? 'Новый стиль' : 'Civil (New Calendar)'}
                  </button>
                </div>
              </div>

              {/* Month and Day Selectors */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    {locale === 'ja' ? '月 (Month)' : 'Month'}
                  </label>
                  <select
                    value={customMonth}
                    onChange={(e) => setCustomMonth(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:border-orthodox-gold"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <option key={m} value={m}>
                        {locale === 'ja' ? `${m}月` : `Month ${m}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    {locale === 'ja' ? '日 (Day)' : 'Day'}
                  </label>
                  <select
                    value={customDay}
                    onChange={(e) => setCustomDay(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:border-orthodox-gold"
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>
                        {locale === 'ja' ? `${d}日` : `Day ${d}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Conversion Preview Box */}
              <div className="p-3 rounded-xl bg-orthodox-candle/20 dark:bg-slate-800/90 border border-orthodox-gold/50 text-xs space-y-1.5">
                <div className="font-bold text-orthodox-navy dark:text-orthodox-gold-light flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-orthodox-gold" />
                  <span>{locale === 'ja' ? 'カレンダー変換プレビュー' : 'Calendar Conversion Preview'}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-300 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-500 block">
                      {locale === 'ja' ? '旧暦（教会暦）' : 'Old Calendar (Julian)'}
                    </span>
                    <span className="font-bold text-sm text-orthodox-burgundy dark:text-orthodox-gold">
                      {customDatePreview.julian}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">
                      {locale === 'ja' ? '新暦（現行市民暦）' : 'Civil (New Calendar)'}
                    </span>
                    <span className="font-bold text-sm text-orthodox-navy dark:text-slate-100">
                      {customDatePreview.civil}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {locale === 'ja' ? 'キャンセル' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={!customName.trim()}
                  className={`w-1/2 py-2.5 rounded-xl font-bold text-xs transition-all shadow ${
                    customName.trim()
                      ? 'bg-orthodox-gold text-orthodox-navy hover:bg-orthodox-gold-dark'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {locale === 'ja' ? '登録して選択' : 'Save & Select'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
