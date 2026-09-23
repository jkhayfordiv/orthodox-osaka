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
} from 'lucide-react';
import { PrayingHandsIcon } from '../shared/PrayingHandsIcon';
import { Locale } from '../../lib/types';

export function ReaderView() {
  const { locale, selectedDate, fontSize, setFontSize } = useApp();

  // Top-level category: Scripture | Liturgy | Prayer Book | Patronal Hymns
  const [mainCategory, setMainCategory] = useState<'scripture' | 'liturgy' | 'prayers' | 'patronal'>('scripture');

  // Sub-category under Prayer Book
  const [prayerSubCategory, setPrayerSubCategory] = useState<'morning' | 'evening' | 'communion' | 'meals'>('morning');

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
  ];

  const prayerSubCategories = [
    {
      id: 'morning' as const,
      icon: <Sun className="w-3.5 h-3.5" />,
      label: { ja: '朝の祈り', en: 'Morning', ru: 'Утренние' },
    },
    {
      id: 'evening' as const,
      icon: <Moon className="w-3.5 h-3.5" />,
      label: { ja: '就寝前の祈り', en: 'Evening', ru: 'На сон' },
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
  ];

  return (
    <div className="space-y-4 pb-24 md:pb-12 max-w-5xl xl:max-w-6xl mx-auto px-3 sm:px-6 pt-3 sm:pt-4">
      {/* 1. Main Category Navigation (No horizontal scrolling! Fits cleanly on any screen) */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-3 bg-white dark:bg-slate-900 border border-orthodox-gold/40 rounded-2xl p-1.5 sm:p-2 shadow-sm">
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
                <span className="text-[11px] sm:text-xs">{sub.label[locale]}</span>
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
        {(mainCategory === 'liturgy' || mainCategory === 'prayers' || mainCategory === 'patronal') && (
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
          <div className="px-1">
            <h3 className="text-base sm:text-xl font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light">
              {prayerSubCategory === 'morning' && (locale === 'ja' ? '朝の祈り（起床時の祈祷）' : locale === 'ru' ? 'Утренние молитвы' : 'Morning Prayers')}
              {prayerSubCategory === 'evening' && (locale === 'ja' ? '就寝前の祈り（晩の祈祷）' : locale === 'ru' ? 'Молитвы на сон грядущим' : 'Prayers before Sleep')}
              {prayerSubCategory === 'communion' && (locale === 'ja' ? '領聖祝文（聖体拝領準備及び感謝）' : locale === 'ru' ? 'Молитвы ко Святому Причащению' : 'Holy Communion Prayers')}
              {prayerSubCategory === 'meals' && (locale === 'ja' ? '日常の祈り（食前・食後・旅・生神女）' : locale === 'ru' ? 'Трапезные молитвы, в дорогу и Богородице' : 'Prayers at Meals, Travel & Marian')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {prayerSubCategory === 'morning' && (
                locale === 'ja'
                  ? '一日を神への感謝と祈りで始める伝統の正教会祈祷規則（信経・詩篇50篇を含む全8祈祷）'
                  : locale === 'ru'
                  ? 'Последование утренних молитв (включая Символ веры и 50-й псалом)'
                  : 'Traditional morning prayer rule upon rising (including the Creed and Psalm 50)'
              )}
              {prayerSubCategory === 'evening' && (
                locale === 'ja'
                  ? '一日の過ちの赦しを乞い、安らかな眠りを祈る就寝前の祈祷規則（痛悔讃詞・十字架の祈り）'
                  : locale === 'ru'
                  ? 'Молитвы на сон грядущим с покаянными тропарями и молитвой Честному Кресту'
                  : 'Evening prayer rule before sleep with penitential troparia and prayer to the Cross'
              )}
              {prayerSubCategory === 'communion' && (
                locale === 'ja'
                  ? '主の聖体と尊き聖血を拝領するための告白と感謝の祈祷（金口イオアンの祈祷）'
                  : locale === 'ru'
                  ? 'Молитвы ко Святому Причащению и благодарственные молитвы'
                  : 'Pre-communion confession and post-communion thanksgiving'
              )}
              {prayerSubCategory === 'meals' && (
                locale === 'ja'
                  ? '日々の食事（食前・食後）・旅路の平安・生神女への祈祷（ボゴロージツェ）'
                  : locale === 'ru'
                  ? 'Молитвы перед и после вкушения пищи, в дорогу и Богородице Дево'
                  : 'Prayers at meals, travel, and the Angelic Salutation (Bogoroditse Devo)'
              )}
            </p>
          </div>

          <div className={parallelLang !== 'none' && parallelLang !== locale ? 'space-y-4' : 'grid grid-cols-1 lg:grid-cols-2 gap-4 items-start'}>
            {PRAYERS_DATA.filter((p) => {
              if (prayerSubCategory === 'morning') return p.category === 'morning';
              if (prayerSubCategory === 'evening') return p.category === 'evening';
              if (prayerSubCategory === 'communion') return p.category === 'communion';
              if (prayerSubCategory === 'meals') return p.category === 'meals' || p.category === 'occasional';
              return false;
            }).map((prayer) => (
              <div
                key={prayer.id}
                className="bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3 h-full flex flex-col justify-between"
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
                </div>
              </div>
            ))}
          </div>
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
    </div>
  );
}
