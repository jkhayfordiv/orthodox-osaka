'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRAYERS_DATA } from '../../data/prayers';
import { LITURGY_CHRYSOSTOM } from '../../data/liturgy';
import { getDayInfo } from '../../lib/calendarEngine';
import {
  BookOpen,
  Church,
  Shield,
  Sun,
  Moon,
  Wine,
  Utensils,
  Type,
  SplitSquareVertical,
  ChevronDown,
  ChevronUp,
  Scroll,
  Music,
  Download,
  Search,
  FileText,
} from 'lucide-react';
import { PrayingHandsIcon } from '../shared/PrayingHandsIcon';
import { DiptychsView } from './DiptychsView';
import { Locale } from '../../lib/types';
import { LIBRARY_DATA, LibraryItem } from '../../data/libraryCatalog';

export function ReaderView() {
  const { locale, selectedDate, fontSize, setFontSize } = useApp();

  // Top-level category: Scripture | Liturgy | Prayer Book | Patronal Hymns | Choir Scores
  const [mainCategory, setMainCategory] = useState<'scripture' | 'liturgy' | 'prayers' | 'patronal' | 'scores'>('scripture');
  const [scoreSearch, setScoreSearch] = useState('');
  const [scoreFilter, setScoreFilter] = useState<'all' | 'octoechos' | 'liturgy' | 'lent'>('all');

  // Sub-category under Prayer Book: Daily Prayers (Morning/Evening) | Communion | Meals/Travel | Diptychs
  const [prayerSubCategory, setPrayerSubCategory] = useState<'daily' | 'communion' | 'meals' | 'diptychs'>('daily');
  const [dailyRuleType, setDailyRuleType] = useState<'morning' | 'evening'>('morning');
  const [communionPhase, setCommunionPhase] = useState<'preparation' | 'thanksgiving'>('preparation');

  const [parallelLang, setParallelLang] = useState<Locale | 'none'>('none');
  const [expandedLiturgyPart, setExpandedLiturgyPart] = useState<string | null>(null);

  const dayInfo = getDayInfo(selectedDate);

  const fontSizeClasses = {
    sm: 'text-xs sm:text-sm leading-relaxed',
    base: 'text-sm sm:text-base leading-relaxed',
    lg: 'text-base sm:text-lg leading-relaxed',
    xl: 'text-lg sm:text-xl leading-relaxed',
  }[fontSize] || 'text-sm sm:text-base leading-relaxed';

  const mainCategories = [
    {
      id: 'scripture' as const,
      icon: <BookOpen className="w-4 h-4" />,
      label: { ja: '日課朗読', en: 'Scripture', ru: 'Чтения' },
    },
    {
      id: 'liturgy' as const,
      icon: <Church className="w-4 h-4" />,
      label: { ja: '聖体礼儀', en: 'Liturgy', ru: 'Литургия' },
    },
    {
      id: 'prayers' as const,
      icon: <PrayingHandsIcon className="w-4 h-4" />,
      label: { ja: '祈祷書', en: 'Prayer Book', ru: 'Молитвослов' },
    },
    {
      id: 'patronal' as const,
      icon: <Shield className="w-4 h-4" />,
      label: { ja: '守護聖歌', en: 'Patronal', ru: 'Покров' },
    },
    {
      id: 'scores' as const,
      icon: <Music className="w-4 h-4" />,
      label: { ja: '聖歌楽譜', en: 'Choir Scores', ru: 'Ноты' },
    },
  ];

  const prayerSubCategories = [
    {
      id: 'daily' as const,
      icon: <Sun className="w-3.5 h-3.5" />,
      label: { ja: '朝夕の祈り', en: 'Daily Prayers', ru: 'Утренние и вечерние' },
    },
    {
      id: 'communion' as const,
      icon: <Wine className="w-3.5 h-3.5" />,
      label: { ja: '領聖祝文', en: 'Communion', ru: 'Причащение' },
    },
    {
      id: 'meals' as const,
      icon: <Utensils className="w-3.5 h-3.5" />,
      label: { ja: '食前食後・旅', en: 'Meals/Travel', ru: 'Трапеза' },
    },
    {
      id: 'diptychs' as const,
      icon: <Scroll className="w-3.5 h-3.5" />,
      label: { ja: '記憶帳', en: 'Prayer List', ru: 'Помянник' },
    },
  ];

  return (
    <div className="space-y-4 pb-24 md:pb-12 max-w-5xl xl:max-w-6xl mx-auto px-3 sm:px-6 pt-3 sm:pt-4">
      {/* 1. Main Category Navigation (No horizontal scrolling! Fits cleanly on any screen) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2.5 bg-white dark:bg-slate-900 border border-orthodox-gold/40 rounded-2xl p-1.5 sm:p-2 shadow-sm">
        {mainCategories.map((c) => {
          const isActive = mainCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setMainCategory(c.id)}
              className={`py-2 px-1 sm:py-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 transition-all select-none ${
                isActive
                  ? 'bg-orthodox-gold text-orthodox-navy shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {c.icon}
              <span className="tracking-tight">{c.label[locale]}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Sub-Category Tabs (Shown only when "Prayer Book / 祈祷書" is selected) */}
      {mainCategory === 'prayers' && (
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 bg-slate-100 dark:bg-slate-800/60 p-1.5 sm:p-2 rounded-xl border border-slate-200 dark:border-slate-700 animate-in fade-in">
          {prayerSubCategories.map((sub) => {
            const isSubActive = prayerSubCategory === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setPrayerSubCategory(sub.id)}
                className={`py-1.5 px-1 sm:py-2 sm:px-2 rounded-lg text-xs font-bold flex flex-col sm:flex-row items-center justify-center space-y-0.5 sm:space-y-0 sm:space-x-1.5 transition-all select-none ${
                  isSubActive
                    ? 'bg-orthodox-navy text-orthodox-gold-light dark:bg-orthodox-gold dark:text-orthodox-navy shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {sub.icon}
                <span className="text-[11px] sm:text-xs tracking-tight">{sub.label[locale]}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Font Size & Dual-Language Control Bar */}
      <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 sm:p-3 flex items-center justify-between text-xs sm:text-sm">
        {/* Font size picker */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <Type className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orthodox-gold" />
          <span className="font-semibold text-slate-500">
            {locale === 'ja' ? '文字サイズ:' : locale === 'ru' ? 'Шрифт:' : 'Font:'}
          </span>
          {(['sm', 'base', 'lg', 'xl'] as const).map((sz) => (
            <button
              key={sz}
              onClick={() => setFontSize(sz)}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded font-bold transition-all ${
                fontSize === sz
                  ? 'bg-orthodox-gold text-orthodox-navy shadow-sm'
                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border'
              }`}
            >
              {sz === 'sm' ? 'S' : sz === 'base' ? 'M' : sz === 'lg' ? 'L' : 'XL'}
            </button>
          ))}
        </div>

        {/* Parallel Language Mode (for Liturgy, Prayers, and Patronal) */}
        {(mainCategory === 'liturgy' || (mainCategory === 'prayers' && prayerSubCategory !== 'diptychs') || mainCategory === 'patronal') && (
          <div className="flex items-center space-x-1.5">
            <SplitSquareVertical className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orthodox-gold" />
            <select
              value={parallelLang}
              onChange={(e) => setParallelLang(e.target.value as Locale | 'none')}
              className="py-1 px-2 rounded-lg bg-white dark:bg-slate-700 border text-slate-700 dark:text-slate-200 text-xs sm:text-sm"
            >
              <option value="none">{locale === 'ja' ? '単一言語' : locale === 'ru' ? 'Один язык' : 'Single'}</option>
              <option value="ja">並列: 日本語</option>
              <option value="en">並列: English</option>
              <option value="ru">並列: Русский</option>
            </select>
          </div>
        )}
      </div>

      {/* ========================================================
          A. Daily Scripture Readings Section
          ======================================================== */}
      {mainCategory === 'scripture' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <h3 className="text-base sm:text-xl font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light mb-1">
                {locale === 'ja' ? '本日の聖書朗読（日課）' : locale === 'ru' ? 'Дневные чтения' : "Today's Scripture Readings"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                {dayInfo.civilDate.toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {dayInfo.readings.map((reading, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-xs font-bold py-0.5 px-2 rounded bg-orthodox-gold text-orthodox-navy uppercase">
                      {reading.source}
                    </span>
                    <h4 className="font-bold text-base sm:text-lg text-slate-800 dark:text-slate-100">
                      {reading.book[locale]} {reading.reference}
                      {reading.pericopeTan && (
                        <span className="text-xs font-normal text-slate-400 ml-1.5">
                          （端{reading.pericopeTan}）
                        </span>
                      )}
                    </h4>
                  </div>
                  <p className={`font-serif text-slate-800 dark:text-slate-200 whitespace-pre-line text-justify ${fontSizeClasses}`}>
                    {reading.text[locale]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          B. Full Divine Liturgy of St. John Chrysostom
          ======================================================== */}
      {mainCategory === 'liturgy' && (
        <div className="space-y-4">
          {/* Sanctuary Banner with Church Interior */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-orthodox-gold shadow-md">
            <div className="h-44 sm:h-52 w-full relative">
              <img
                src="/photos/church-interior.jpg"
                alt="Holy Protection Church Sanctuary & Iconostasis"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/25"></div>
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white space-y-1">
                <span className="text-[11px] font-bold py-0.5 px-2.5 rounded-full bg-orthodox-gold text-orthodox-navy uppercase tracking-wider inline-block shadow-sm">
                  {locale === 'ja' ? '大阪ハリストス正教会 聖体礼儀' : locale === 'ru' ? 'Божественная Литургия' : 'Divine Liturgy'}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-orthodox-gold-light drop-shadow">
                  {locale === 'ja'
                    ? '聖金口イオアン聖体礼儀（全編祈祷文）'
                    : locale === 'ru'
                    ? 'Божественная Литургия святителя Иоанна Златоуста'
                    : 'The Divine Liturgy of St. John Chrysostom'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 drop-shadow line-clamp-1">
                  {locale === 'ja'
                    ? '聖生神女庇護聖堂にて捧げられる全17章の式順と祈祷文（日本正教会訳）'
                    : locale === 'ru'
                    ? 'Полный чин Литургии из 17 последовательных частей с японским, церковнославянским и английским текстами'
                    : 'Complete text and rubrics for all 17 parts as served at Holy Protection Temple'}
                </p>
              </div>
            </div>
          </div>

            <div className="space-y-3">
              {LITURGY_CHRYSOSTOM.map((part) => {
                const isExpanded = expandedLiturgyPart === part.id || expandedLiturgyPart === 'all';
                return (
                  <div
                    key={part.id}
                    className="border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-800/40 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedLiturgyPart(isExpanded ? null : part.id)}
                      className="w-full p-3.5 flex items-center justify-between text-left hover:bg-orthodox-candle/40 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="w-2 h-2 rounded-full bg-orthodox-gold flex-shrink-0"></span>
                        <h4 className="font-serif font-bold text-sm sm:text-base text-orthodox-burgundy dark:text-orthodox-gold">
                          {part.title[locale]}
                        </h4>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-slate-400">
                        <span className="hidden sm:inline font-sans">{part.celebrant}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-3.5 pt-0 border-t border-slate-200 dark:border-slate-700 mt-1">
                        {part.rubric && (
                          <p className="text-xs italic text-slate-500 dark:text-slate-400 my-2.5 pl-3 border-l-2 border-orthodox-gold">
                            {part.rubric[locale]}
                          </p>
                        )}

                        {parallelLang === 'none' || parallelLang === locale ? (
                          <p className={`font-serif leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line pl-2 text-justify ${fontSizeClasses}`}>
                            {part.text[locale]}
                          </p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                            <div className="border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 pb-3 md:pb-0 md:pr-4">
                              <span className="text-[10px] font-bold text-orthodox-gold uppercase block mb-1.5 tracking-wider">
                                {locale.toUpperCase()}
                              </span>
                              <p className={`font-serif text-slate-800 dark:text-slate-200 whitespace-pre-line ${fontSizeClasses}`}>
                                {part.text[locale]}
                              </p>
                            </div>
                            <div className="md:pl-2">
                              <span className="text-[10px] font-bold text-orthodox-gold uppercase block mb-1.5 tracking-wider">
                                {parallelLang.toUpperCase()}
                              </span>
                              <p className={`font-serif text-slate-800 dark:text-slate-200 whitespace-pre-line ${fontSizeClasses}`}>
                                {part.text[parallelLang]}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      {/* ========================================================
          C. Prayer Book (Categorized: Morning, Evening, Communion, Meals)
          ======================================================== */}
      {mainCategory === 'prayers' && (
        <div className="space-y-4">
          <div className="px-1 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-xl font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light">
                {prayerSubCategory === 'daily' && (
                  dailyRuleType === 'morning'
                    ? (locale === 'ja' ? '朝の祈り（起床時の祈祷規則）' : locale === 'ru' ? 'Утренние молитвы' : 'Morning Prayers')
                    : (locale === 'ja' ? '就寝前の祈り（晩の祈祷規則）' : locale === 'ru' ? 'Молитвы на сон грядущим' : 'Evening Prayers')
                )}
                {prayerSubCategory === 'communion' && (
                  communionPhase === 'preparation'
                    ? (locale === 'ja' ? '領聖準備祝文（聖体拝領前の祈祷）' : locale === 'ru' ? 'Последование ко Святому Причащению' : 'Pre-Communion Prayers')
                    : (locale === 'ja' ? '領聖感謝祝文（聖体拝領後の感謝）' : locale === 'ru' ? 'Благодарственные молитвы по Святом Причащении' : 'Thanksgiving after Holy Communion')
                )}
                {prayerSubCategory === 'meals' && (locale === 'ja' ? '日常の祈り（食前・食後・旅・生神女）' : locale === 'ru' ? 'Трапезные молитвы, в дорогу и Богородице' : 'Prayers at Meals, Travel & Marian')}
                {prayerSubCategory === 'diptychs' && (locale === 'ja' ? '記憶帳（生者・永眠者の代祷名簿）' : locale === 'ru' ? 'Помянник (О здравии и О упокоении)' : 'Diptychs / Commemoration List')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {prayerSubCategory === 'daily' && (
                  dailyRuleType === 'morning'
                    ? (locale === 'ja'
                      ? '一日を神への感謝と祈りで始める伝統の正教会祈祷規則（信経・詩篇50篇を含む全8祈祷）'
                      : locale === 'ru'
                      ? 'Последование утренних молитв (включая Символ веры и 50-й псалом)'
                      : 'Traditional morning prayer rule upon rising (including the Creed and Psalm 50)')
                    : (locale === 'ja'
                      ? '一日の過ちの赦しを乞い、安らかな眠りを祈る就寝前の祈祷規則（痛悔讃詞・十字架の祈り）'
                      : locale === 'ru'
                      ? 'Молитвы на сон грядущим с покаянными тропарями и молитвой Честному Кресту'
                      : 'Evening prayer rule before sleep with penitential troparia and prayer to the Cross')
                )}
                {prayerSubCategory === 'communion' && (
                  communionPhase === 'preparation'
                    ? (locale === 'ja'
                      ? '主の聖体と尊き聖血を拝領するための告白と準備（聖大ワシリイ・金口イオアン・ダマスコのイオアン・新神学者シメオンの祈祷）'
                      : locale === 'ru'
                      ? 'Молитвы ко Святому Причащению святителей Василия Великаго, Иоанна Златоуста, Иоанна Дамаскина и Симеона Новаго Богослова'
                      : 'Prayers of preparation before partaking of the Holy Mysteries (St. Basil the Great, St. John Chrysostom, St. John of Damascus, St. Symeon the New Theologian)')
                    : (locale === 'ja'
                      ? '尊き身肉と血を拝領した後の感謝祈祷（聖大ワシリイ・シメオン・メタフラスト・至聖生神女への祈り・シメオン祝歌）'
                      : locale === 'ru'
                      ? 'Благодарственные молитвы по Святом Причащении (свт. Василия Великаго, св. Симеона Метафраста, ко Богородице и Ныне отпущаеши)'
                      : 'Thanksgiving prayers following Holy Communion (St. Basil the Great, St. Symeon Metaphrastes, to the Theotokos, and Nunc Dimittis)')
                )}
                {prayerSubCategory === 'meals' && (
                  locale === 'ja'
                    ? '日々の食事（食前・食後）・旅路の平安・生神女への祈祷（ボゴロージツェ）'
                    : locale === 'ru'
                    ? 'Молитвы перед и после вкушения пищи, в дорогу и Богородице Дево'
                    : 'Prayers at meals, travel, and the Angelic Salutation (Bogoroditse Devo)'
                )}
                {prayerSubCategory === 'diptychs' && (
                  locale === 'ja'
                    ? '生者（健康と救い）および永眠者（永遠の記憶）を祈るための私的代祷名簿。代子・家族の聖名日も自動連動。'
                    : locale === 'ru'
                    ? 'Записки о здравии и о упокоении с именами по крещению. Автоматически синхронизируется с именами семьи и крестников.'
                    : 'Commemoration lists of the Living and the Departed with baptismal patron saints. Auto-syncs with family & godchildren.'
                )}
              </p>
            </div>

            {/* 1. Daily Prayers Switch: Morning vs Evening */}
            {prayerSubCategory === 'daily' && (
              <div className="flex items-center space-x-1.5 bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl flex-shrink-0 self-start md:self-auto shadow-inner">
                <button
                  onClick={() => setDailyRuleType('morning')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all select-none ${
                    dailyRuleType === 'morning'
                      ? 'bg-orthodox-gold text-orthodox-navy shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>{locale === 'ja' ? '朝の祈り' : locale === 'ru' ? 'Утренние' : 'Morning'}</span>
                </button>
                <button
                  onClick={() => setDailyRuleType('evening')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all select-none ${
                    dailyRuleType === 'evening'
                      ? 'bg-orthodox-navy text-orthodox-gold-light dark:bg-orthodox-gold dark:text-orthodox-navy shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>{locale === 'ja' ? '就寝前の祈り' : locale === 'ru' ? 'На сон' : 'Evening'}</span>
                </button>
              </div>
            )}

            {/* 2. Communion Switch: Preparation vs Thanksgiving */}
            {prayerSubCategory === 'communion' && (
              <div className="flex items-center space-x-1.5 bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl flex-shrink-0 self-start md:self-auto shadow-inner">
                <button
                  onClick={() => setCommunionPhase('preparation')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all select-none ${
                    communionPhase === 'preparation'
                      ? 'bg-orthodox-gold text-orthodox-navy shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Wine className="w-3.5 h-3.5" />
                  <span>{locale === 'ja' ? '準備祝文' : locale === 'ru' ? 'Подготовка' : 'Preparation'}</span>
                </button>
                <button
                  onClick={() => setCommunionPhase('thanksgiving')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all select-none ${
                    communionPhase === 'thanksgiving'
                      ? 'bg-orthodox-navy text-orthodox-gold-light dark:bg-orthodox-gold dark:text-orthodox-navy shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <PrayingHandsIcon className="w-3.5 h-3.5" />
                  <span>{locale === 'ja' ? '感謝祝文' : locale === 'ru' ? 'Благодарение' : 'Thanksgiving'}</span>
                </button>
              </div>
            )}
          </div>

          {prayerSubCategory === 'diptychs' ? (
            <DiptychsView />
          ) : (
            <div className={parallelLang !== 'none' && parallelLang !== locale ? 'space-y-4' : 'grid grid-cols-1 lg:grid-cols-2 gap-4 items-start'}>
              {PRAYERS_DATA.filter((p) => {
                if (prayerSubCategory === 'daily') {
                  return dailyRuleType === 'morning' ? p.category === 'morning' : p.category === 'evening';
                }
                if (prayerSubCategory === 'communion') {
                  return p.category === 'communion' && (p.communionPhase === communionPhase || (!p.communionPhase && communionPhase === 'preparation'));
                }
                if (prayerSubCategory === 'meals') {
                  return p.category === 'meals' || p.category === 'occasional';
                }
                return false;
              }).map((prayer) => (
                <div
                  key={prayer.id}
                  className={`bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3 h-full flex flex-col justify-between ${
                    prayer.id === 'morning-living-departed' ? 'lg:col-span-2' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        {prayer.sequenceNumber && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orthodox-gold/20 text-orthodox-burgundy dark:text-orthodox-gold border border-orthodox-gold/40">
                            #{prayer.sequenceNumber}
                          </span>
                        )}
                        <h4 className="font-serif font-bold text-base sm:text-lg text-orthodox-navy dark:text-orthodox-gold-light">
                          {prayer.title[locale]}
                        </h4>
                      </div>
                    </div>
                    {prayer.subtitle && (
                      <span className="text-xs text-slate-500 font-medium block mt-1">
                        {prayer.subtitle[locale]}
                      </span>
                    )}

                    {parallelLang !== 'none' && parallelLang !== locale ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-orthodox-gold-dark dark:text-orthodox-gold mb-1 block">
                            {locale === 'ja' ? '日本語' : locale === 'ru' ? 'Русский' : 'English'}
                          </span>
                          <p className={`font-serif text-slate-800 dark:text-slate-200 whitespace-pre-line text-justify ${fontSizeClasses}`}>
                            {prayer.text[locale]}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                            {parallelLang === 'ja' ? '日本語' : parallelLang === 'ru' ? 'Русский' : 'English'}
                          </span>
                          <p className={`font-serif text-slate-700 dark:text-slate-300 whitespace-pre-line text-justify ${fontSizeClasses}`}>
                            {prayer.text[parallelLang]}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className={`font-serif text-slate-800 dark:text-slate-200 whitespace-pre-line text-justify pt-2.5 ${fontSizeClasses}`}>
                        {prayer.text[locale]}
                      </p>
                    )}

                    {/* If this is the commemoration prayer in Morning Rule, embed the prayer list right here! */}
                    {prayer.id === 'morning-living-departed' && (
                      <div className="mt-5 pt-4 border-t-2 border-orthodox-gold/40">
                        <DiptychsView embeddedMode={true} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          D. Patronal & Commemorative Hymns (Pokrov & St. Nicholas of Japan)
          ======================================================== */}
      {mainCategory === 'patronal' && (
        <div className="space-y-6">
          <div className="px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-orthodox-burgundy dark:text-orthodox-gold block">
              {locale === 'ja' ? '守護聖歌・記念聖歌' : locale === 'ru' ? 'Тропари храма и святителя' : 'Patronal & Commemorative Hymns'}
            </span>
            <h3 className="text-base sm:text-xl font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light">
              {locale === 'ja'
                ? '聖生神女庇護祭 & 亜使徒日本の大主教聖ニコライ'
                : locale === 'ru'
                ? 'Покров Пресвятой Богородицы и свт. Николай Японский'
                : 'Holy Protection (Pokrov) & St. Nicholas of Japan'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {locale === 'ja'
                ? '大阪教会の守護聖堂讃歌、および日本正教会光照者・聖ニコライ大主教の讃詞と小讃詞です。'
                : locale === 'ru'
                ? 'Тропари и кондаки престольного праздника в Осаке и просветителя Японии святителя Николая.'
                : 'Patronal hymns for Holy Protection Church in Osaka and St. Nicholas, Enlightener of Japan.'}
            </p>
          </div>

          {/* 1. Holy Protection (Pokrov / 生神女庇護) */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 border-b border-orthodox-gold/30 pb-2">
              <Shield className="w-4 h-4 text-orthodox-gold flex-shrink-0" />
              <h4 className="font-serif font-bold text-sm sm:text-base text-orthodox-navy dark:text-orthodox-gold-light">
                {locale === 'ja' ? '聖生神女庇護祭（大阪教会 守護）' : locale === 'ru' ? 'Покров Пресвятой Богородицы (Храм в Осаке)' : 'Holy Protection of the Theotokos (Pokrov)'}
              </h4>
            </div>

            <div className={parallelLang !== 'none' && parallelLang !== locale ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
              {PRAYERS_DATA.filter((p) => p.category === 'patronal' && p.patronGroup === 'pokrov').map((prayer) => (
                <div
                  key={prayer.id}
                  className="bg-white dark:bg-slate-900 border-2 border-orthodox-gold/60 rounded-2xl p-4 sm:p-5 shadow-sm space-y-2 h-full flex flex-col justify-between"
                >
                  <div>
                    <h5 className="font-serif font-bold text-base sm:text-lg text-orthodox-navy dark:text-orthodox-gold-light">
                      {prayer.title[locale]}
                    </h5>
                    {prayer.subtitle && (
                      <span className="text-xs text-slate-500 font-medium block mt-0.5">
                        {prayer.subtitle[locale]}
                      </span>
                    )}

                    {parallelLang !== 'none' && parallelLang !== locale ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-orthodox-gold-dark dark:text-orthodox-gold mb-1 block">
                            {locale === 'ja' ? '日本語' : locale === 'ru' ? 'Русский' : 'English'}
                          </span>
                          <p className={`font-serif text-slate-800 dark:text-slate-200 whitespace-pre-line text-justify ${fontSizeClasses}`}>
                            {prayer.text[locale]}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                            {parallelLang === 'ja' ? '日本語' : parallelLang === 'ru' ? 'Русский' : 'English'}
                          </span>
                          <p className={`font-serif text-slate-700 dark:text-slate-300 whitespace-pre-line text-justify ${fontSizeClasses}`}>
                            {prayer.text[parallelLang]}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className={`font-serif text-slate-800 dark:text-slate-200 whitespace-pre-line text-justify pt-1.5 ${fontSizeClasses}`}>
                        {prayer.text[locale]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. St. Nicholas of Japan, Equal-to-the-Apostles (亜使徒聖ニコライ) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-2 border-b border-orthodox-gold/30 pb-2">
              <Church className="w-4 h-4 text-orthodox-gold flex-shrink-0" />
              <h4 className="font-serif font-bold text-sm sm:text-base text-orthodox-navy dark:text-orthodox-gold-light">
                {locale === 'ja' ? '亜使徒日本の大主教 聖ニコライ（日本正教会 光照者）' : locale === 'ru' ? 'Святитель Николай Японский, равноапостольный' : 'St. Nicholas of Japan, Equal-to-the-Apostles'}
              </h4>
            </div>

            <div className={parallelLang !== 'none' && parallelLang !== locale ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
              {PRAYERS_DATA.filter((p) => p.category === 'patronal' && p.patronGroup === 'st-nicholas').map((prayer) => (
                <div
                  key={prayer.id}
                  className="bg-white dark:bg-slate-900 border-2 border-orthodox-gold/60 rounded-2xl p-4 sm:p-5 shadow-sm space-y-2 h-full flex flex-col justify-between"
                >
                  <div>
                    <h5 className="font-serif font-bold text-base sm:text-lg text-orthodox-navy dark:text-orthodox-gold-light">
                      {prayer.title[locale]}
                    </h5>
                    {prayer.subtitle && (
                      <span className="text-xs text-slate-500 font-medium block mt-0.5">
                        {prayer.subtitle[locale]}
                      </span>
                    )}

                    {parallelLang !== 'none' && parallelLang !== locale ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-orthodox-gold-dark dark:text-orthodox-gold mb-1 block">
                            {locale === 'ja' ? '日本語' : locale === 'ru' ? 'Русский' : 'English'}
                          </span>
                          <p className={`font-serif text-slate-800 dark:text-slate-200 whitespace-pre-line text-justify ${fontSizeClasses}`}>
                            {prayer.text[locale]}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                            {parallelLang === 'ja' ? '日本語' : parallelLang === 'ru' ? 'Русский' : 'English'}
                          </span>
                          <p className={`font-serif text-slate-700 dark:text-slate-300 whitespace-pre-line text-justify ${fontSizeClasses}`}>
                            {prayer.text[parallelLang]}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className={`font-serif text-slate-800 dark:text-slate-200 whitespace-pre-line text-justify pt-1.5 ${fontSizeClasses}`}>
                        {prayer.text[locale]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Choir Scores PDF Library */}
      {mainCategory === 'scores' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-xs font-semibold">
                  <Music className="w-3.5 h-3.5" />
                  <span>{locale === 'ja' ? '奉神礼聖歌楽譜アーカイブ' : locale === 'ru' ? 'Архив церковных нот' : 'Choir Scores Archive'}</span>
                </div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                  {locale === 'ja' ? '正教会 聖歌譜面・八調PDF' : locale === 'ru' ? 'Богослужебные ноты и партитуры' : 'Orthodox Liturgical Sheet Music'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {locale === 'ja'
                    ? '西日本主教区・大阪教会で長年保存されてきた主日八調、聖体礼儀、大斎三歌斎などの合唱用PDF楽譜（240点以上）を閲覧・保存できます。'
                    : 'Over 240 printable choral scores including Sunday Octoechos Tones 1-8, Divine Liturgy, and Triodion.'}
                </p>
              </div>

              <div className="flex-shrink-0">
                <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
                  {LIBRARY_DATA.scoresCount} {locale === 'ja' ? '件の楽譜' : 'scores'}
                </span>
              </div>
            </div>

            {/* Search & Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={scoreSearch}
                  onChange={e => setScoreSearch(e.target.value)}
                  placeholder={locale === 'ja' ? '調や曲名で検索（例: 第1調, 聖体礼儀, Pascha）...' : 'Search by tone or title (e.g. Tone 1, Liturgy)...'}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orthodox-gold"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { id: 'all' as const, label: locale === 'ja' ? 'すべて' : 'All' },
                  { id: 'octoechos' as const, label: locale === 'ja' ? '主日八調' : 'Octoechos' },
                  { id: 'liturgy' as const, label: locale === 'ja' ? '聖体礼儀' : 'Divine Liturgy' },
                  { id: 'lent' as const, label: locale === 'ja' ? '大斎・三歌斎' : 'Lent / Triodion' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setScoreFilter(tab.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                      scoreFilter === tab.id
                        ? 'bg-orthodox-gold text-orthodox-navy shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 1. Curated Octoechos 8-Tones Showcase (Shown in All & Octoechos) */}
          {(scoreFilter === 'all' || scoreFilter === 'octoechos') && !scoreSearch.trim() && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orthodox-gold" />
                  <h4 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                    {locale === 'ja' ? '主日八調 聖歌楽譜（第1調〜第8調）' : 'Sunday Octoechos (Tones 1–8)'}
                  </h4>
                </div>
                <span className="text-2xs text-slate-400">PDF譜面</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(tone => {
                  const score = LIBRARY_DATA.items.find(i => i.type === 'pdf' && i.relativePath.toLowerCase().includes(`octoechos_sun_${tone}.pdf`));
                  return (
                    <div
                      key={tone}
                      className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:border-orthodox-gold transition-all flex flex-col justify-between space-y-2.5"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="w-7 h-7 rounded-xl bg-orthodox-gold/20 text-orthodox-navy dark:text-orthodox-gold font-bold text-xs flex items-center justify-center">
                            #{tone}
                          </span>
                          <span className="text-2xs text-slate-400">
                            {score?.size ? `${Math.round(score.size / 1024)} KB` : 'PDF'}
                          </span>
                        </div>
                        <h5 className="font-serif font-bold text-sm text-slate-900 dark:text-white mt-1.5">
                          {locale === 'ja' ? `主日 第${tone}調 聖歌` : `Sunday Tone ${tone}`}
                        </h5>
                      </div>

                      {score && (
                        <a
                          href={`/${score.section}/${score.relativePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-orthodox-gold text-orthodox-navy hover:bg-orthodox-gold-light text-xs font-bold transition-colors w-full shadow-2xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{locale === 'ja' ? '楽譜を開く' : 'Open PDF'}</span>
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Gospels & Exapostilarion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {LIBRARY_DATA.items.filter(i => i.type === 'pdf' && (i.relativePath.includes('Gospel') || i.relativePath.includes('Exapostilarion'))).map(item => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between gap-3"
                  >
                    <div>
                      <h5 className="font-serif font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {item.title}
                      </h5>
                      <span className="text-2xs text-slate-400">
                        {item.size ? `${Math.round(item.size / 1024)} KB` : 'PDF'}
                      </span>
                    </div>
                    <a
                      href={`/${item.section}/${item.relativePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 py-1.5 px-3 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-orthodox-gold hover:text-orthodox-navy transition-colors flex-shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{locale === 'ja' ? '開く' : 'Open'}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Divine Liturgy Highlight (Shown in All & Liturgy) */}
          {(scoreFilter === 'all' || scoreFilter === 'liturgy') && !scoreSearch.trim() && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orthodox-burgundy dark:bg-orthodox-gold" />
                  <h4 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                    {locale === 'ja' ? '聖体礼儀 全曲譜 & 基本聖歌' : 'Divine Liturgy Scores'}
                  </h4>
                </div>
              </div>

              {/* Featured Daishiki Card */}
              {(() => {
                const daishiki = LIBRARY_DATA.items.find(i => i.relativePath.includes('Daishiki.pdf'));
                return (
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-850 border-2 border-orthodox-gold/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-orthodox-gold/30 text-orthodox-navy dark:text-amber-200 text-2xs font-bold uppercase">
                        Master Score
                      </span>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                        {locale === 'ja' ? '大式聖体礼儀 聖歌楽譜（全曲集）' : 'Full Divine Liturgy Choral Score (Daishiki)'}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        {locale === 'ja'
                          ? '聖金口イオアン聖体礼儀の全合唱パート譜を1冊にまとめた大式譜面です。'
                          : 'Complete choral score of the Divine Liturgy of St. John Chrysostom.'}
                      </p>
                    </div>

                    {daishiki && (
                      <a
                        href={`/${daishiki.section}/${daishiki.relativePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orthodox-gold hover:bg-orthodox-gold-light text-orthodox-navy font-bold text-xs sm:text-sm shadow-md transition-all flex-shrink-0"
                      >
                        <Download className="w-4 h-4" />
                        <span>{locale === 'ja' ? '全曲譜を開く (PDF)' : 'Open Full Score'}</span>
                      </a>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* 3. Searchable & Filtered Scores List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <h4 className="font-serif font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                {scoreSearch.trim()
                  ? (locale === 'ja' ? `検索結果: "${scoreSearch}"` : `Search Results for "${scoreSearch}"`)
                  : (locale === 'ja' ? '全楽譜アーカイブ一覧' : 'All Archived Scores')}
              </h4>
              <span className="text-2xs text-slate-400">
                {
                  LIBRARY_DATA.items
                    .filter(item => item.type === 'pdf')
                    .filter(item => {
                      if (scoreFilter === 'octoechos') return item.relativePath.toLowerCase().includes('octoechos');
                      if (scoreFilter === 'liturgy') return item.relativePath.toLowerCase().includes('liturgy') || item.title.includes('大式');
                      if (scoreFilter === 'lent') return item.relativePath.toLowerCase().includes('triodion') || item.title.includes('三歌斎');
                      return true;
                    })
                    .filter(item => {
                      if (!scoreSearch.trim()) return true;
                      const q = scoreSearch.toLowerCase();
                      return item.title.toLowerCase().includes(q) || item.relativePath.toLowerCase().includes(q);
                    }).length
                } 件
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {LIBRARY_DATA.items
                .filter(item => item.type === 'pdf')
                .filter(item => {
                  if (scoreFilter === 'octoechos') return item.relativePath.toLowerCase().includes('octoechos');
                  if (scoreFilter === 'liturgy') return item.relativePath.toLowerCase().includes('liturgy') || item.title.includes('大式');
                  if (scoreFilter === 'lent') return item.relativePath.toLowerCase().includes('triodion') || item.title.includes('三歌斎');
                  return true;
                })
                .filter(item => {
                  if (!scoreSearch.trim()) return true;
                  const q = scoreSearch.toLowerCase();
                  return item.title.toLowerCase().includes(q) || item.relativePath.toLowerCase().includes(q);
                })
                .slice(0, scoreSearch.trim() || scoreFilter !== 'all' ? 100 : 24)
                .map(score => (
                  <div
                    key={score.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs flex flex-col justify-between hover:border-orthodox-gold/60 transition-all group"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold text-2xs">
                          PDF
                        </span>
                        {score.size && (
                          <span className="text-2xs text-slate-400">
                            {Math.round(score.size / 1024)} KB
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-orthodox-gold transition-colors">
                        {score.title}
                      </h4>
                    </div>

                    <div className="pt-2.5 mt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-2xs text-slate-400 truncate max-w-[130px]">
                        {score.relativePath.split('/').pop()}
                      </span>
                      <a
                        href={`/${score.section}/${score.relativePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-orthodox-gold hover:text-orthodox-navy text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        <span>{locale === 'ja' ? '開く' : 'Open'}</span>
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
