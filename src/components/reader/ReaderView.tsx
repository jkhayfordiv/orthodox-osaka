'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRAYERS_DATA } from '../../data/prayers';
import { LITURGY_CHRYSOSTOM } from '../../data/liturgy';
import { getDayInfo } from '../../lib/calendarEngine';
import {
  BookOpen,
  Church,
  Heart,
  Sparkles,
  Sun,
  Moon,
  Wine,
  Utensils,
  Type,
  SplitSquareVertical,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
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
      icon: <Heart className="w-4 h-4" />,
      label: { ja: '祈祷書', en: 'Prayer Book', ru: 'Молитвослов' },
    },
    {
      id: 'patronal' as const,
      icon: <Sparkles className="w-4 h-4" />,
      label: { ja: '守護聖歌', en: 'Pokrov', ru: 'Покров' },
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
    <div className="space-y-4 pb-24 max-w-3xl mx-auto px-3 sm:px-4 pt-3">
      {/* 1. Main Category Navigation (No horizontal scrolling! Fits cleanly on any screen) */}
      <div className="grid grid-cols-4 gap-1.5 bg-white dark:bg-slate-900 border border-orthodox-gold/40 rounded-2xl p-1.5 shadow-sm">
        {mainCategories.map((c) => {
          const isActive = mainCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setMainCategory(c.id)}
              className={`py-2 px-1 rounded-xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1.5 transition-all select-none ${
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
        <div className="grid grid-cols-4 gap-1.5 bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 animate-in fade-in">
          {prayerSubCategories.map((sub) => {
            const isSubActive = prayerSubCategory === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setPrayerSubCategory(sub.id)}
                className={`py-1.5 px-1 rounded-lg text-xs font-bold flex flex-col sm:flex-row items-center justify-center space-y-0.5 sm:space-y-0 sm:space-x-1 transition-all select-none ${
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
      <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 flex items-center justify-between text-xs">
        {/* Font size picker */}
        <div className="flex items-center space-x-1.5">
          <Type className="w-3.5 h-3.5 text-orthodox-gold" />
          <span className="font-semibold text-slate-500">
            {locale === 'ja' ? '文字サイズ:' : locale === 'ru' ? 'Шрифт:' : 'Font:'}
          </span>
          {(['sm', 'base', 'lg', 'xl'] as const).map((sz) => (
            <button
              key={sz}
              onClick={() => setFontSize(sz)}
              className={`px-2 py-0.5 rounded font-bold transition-all ${
                fontSize === sz
                  ? 'bg-orthodox-gold text-orthodox-navy shadow-sm'
                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border'
              }`}
            >
              {sz === 'sm' ? 'S' : sz === 'base' ? 'M' : sz === 'lg' ? 'L' : 'XL'}
            </button>
          ))}
        </div>

        {/* Parallel Language Mode (for Liturgy) */}
        {mainCategory === 'liturgy' && (
          <div className="flex items-center space-x-1">
            <SplitSquareVertical className="w-3.5 h-3.5 text-orthodox-gold" />
            <select
              value={parallelLang}
              onChange={(e) => setParallelLang(e.target.value as Locale | 'none')}
              className="py-1 px-1.5 rounded bg-white dark:bg-slate-700 border text-slate-700 dark:text-slate-200 text-[11px]"
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
          <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-5 shadow-sm">
            <h3 className="text-base sm:text-lg font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light mb-1">
              {locale === 'ja' ? '本日の聖書朗読（日課）' : locale === 'ru' ? 'Дневные чтения' : "Today's Scripture Readings"}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {dayInfo.civilDate.toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              })}
            </p>

            <div className="space-y-6">
              {dayInfo.readings.map((reading, idx) => (
                <div key={idx} className="border-b border-slate-100 dark:border-slate-800 pb-5 last:border-b-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-bold py-0.5 px-2 rounded bg-orthodox-gold text-orthodox-navy uppercase">
                      {reading.source}
                    </span>
                    <h4 className="font-bold text-base text-slate-800 dark:text-slate-100">
                      {reading.book[locale]} {reading.reference}
                      {reading.pericopeTan && (
                        <span className="text-xs font-normal text-slate-400 ml-1.5">
                          （端{reading.pericopeTan}）
                        </span>
                      )}
                    </h4>
                  </div>
                  <p className="font-serif leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line text-justify pl-1">
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
          <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <h3 className="text-base sm:text-lg font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light mb-1">
                {locale === 'ja'
                  ? '聖金口イオアン聖体礼儀（全編祈祷文）'
                  : locale === 'ru'
                  ? 'Божественная Литургия святителя Иоанна Златоуста'
                  : 'The Divine Liturgy of St. John Chrysostom'}
              </h3>
              <p className="text-xs text-slate-500">
                {locale === 'ja'
                  ? '全17章の式順と祈祷文を掲載。各章をタップして開閉できます。'
                  : locale === 'ru'
                  ? 'Полный чин Литургии из 17 последовательных частей. Нажмите для открытия.'
                  : 'Complete text and rubrics for all 17 parts of the Divine Liturgy.'}
              </p>
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
                          <p className="font-serif leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line pl-2 text-justify">
                            {part.text[locale]}
                          </p>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 p-3 bg-white dark:bg-slate-800 rounded-xl border">
                            <div className="border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-700 pb-3 sm:pb-0 sm:pr-3">
                              <span className="text-[10px] font-bold text-orthodox-gold uppercase block mb-1">
                                {locale.toUpperCase()}
                              </span>
                              <p className="font-serif text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
                                {part.text[locale]}
                              </p>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-orthodox-gold uppercase block mb-1">
                                {parallelLang.toUpperCase()}
                              </span>
                              <p className="font-serif text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
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
        </div>
      )}

      {/* ========================================================
          C. Prayer Book (Categorized: Morning, Evening, Communion, Meals)
          ======================================================== */}
      {mainCategory === 'prayers' && (
        <div className="space-y-4">
          <div className="px-1">
            <h3 className="text-base sm:text-lg font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light">
              {prayerSubCategory === 'morning' && (locale === 'ja' ? '朝の祈り（起床時の祈祷）' : locale === 'ru' ? 'Утренние молитвы' : 'Morning Prayers')}
              {prayerSubCategory === 'evening' && (locale === 'ja' ? '就寝前の祈り（晩の祈祷）' : locale === 'ru' ? 'Молитвы на сон грядущим' : 'Prayers before Sleep')}
              {prayerSubCategory === 'communion' && (locale === 'ja' ? '領聖祝文（聖体拝領準備及び感謝）' : locale === 'ru' ? 'Молитвы ко Святому Причащению' : 'Holy Communion Prayers')}
              {prayerSubCategory === 'meals' && (locale === 'ja' ? '日常の祈り（食前・食後・旅立ち）' : locale === 'ru' ? 'Трапезные молитвы и в дорогу' : 'Prayers at Meals & Travel')}
            </h3>
            <p className="text-xs text-slate-500">
              {prayerSubCategory === 'morning' && (locale === 'ja' ? '一日を神への感謝と祈りで始める伝統の祈祷' : 'Traditional prayer rule upon rising')}
              {prayerSubCategory === 'evening' && (locale === 'ja' ? '一日の過ちの赦しを乞い、安らかな眠りを祈る' : 'Evening prayer rule before going to sleep')}
              {prayerSubCategory === 'communion' && (locale === 'ja' ? '主の聖体と尊き聖血を拝領するための告白と感謝の祈祷' : 'Pre-communion confession and post-communion thanksgiving')}
              {prayerSubCategory === 'meals' && (locale === 'ja' ? '日々の食事と旅路を守る祈祷' : 'Prayers for food, drink, and safe journey')}
            </p>
          </div>

          <div className="space-y-3.5">
            {PRAYERS_DATA.filter((p) => {
              if (prayerSubCategory === 'morning') return p.category === 'morning';
              if (prayerSubCategory === 'evening') return p.category === 'evening';
              if (prayerSubCategory === 'communion') return p.category === 'communion';
              if (prayerSubCategory === 'meals') return p.category === 'meals' || p.category === 'occasional';
              return false;
            }).map((prayer) => (
              <div
                key={prayer.id}
                className="bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-5 shadow-sm space-y-2"
              >
                <div>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-orthodox-navy dark:text-orthodox-gold-light">
                    {prayer.title[locale]}
                  </h4>
                  {prayer.subtitle && (
                    <span className="text-xs text-slate-500 font-medium">
                      {prayer.subtitle[locale]}
                    </span>
                  )}
                </div>
                <p className="font-serif leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line text-justify pt-1">
                  {prayer.text[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          D. Pokrov Patronal Hymns Section
          ======================================================== */}
      {mainCategory === 'patronal' && (
        <div className="space-y-4">
          <div className="px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-orthodox-burgundy dark:text-orthodox-gold block">
              {locale === 'ja' ? '大阪聖堂守護聖歌' : locale === 'ru' ? 'Тропарь храма в Осаке' : 'Osaka Patronal Hymns'}
            </span>
            <h3 className="text-base sm:text-lg font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light">
              {locale === 'ja' ? '生神女庇護祭 祭日讃詞及び小讃詞' : locale === 'ru' ? 'Тропарь и Кондак Покрова Богородицы' : 'Troparion & Kontakion of Pokrov'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {locale === 'ja'
                ? '大阪ハリストス正教会 聖生神女庇護聖堂の守護聖歌です。'
                : locale === 'ru'
                ? 'Тропарь и кондак престольного праздника Покрова Божией Матери в Осаке.'
                : 'Patronal hymns for Holy Protection Church in Osaka.'}
            </p>
          </div>

          {PRAYERS_DATA.filter((p) => p.category === 'patronal').map((prayer) => (
            <div
              key={prayer.id}
              className="bg-white dark:bg-slate-900 border-2 border-orthodox-gold rounded-2xl p-5 shadow-sm space-y-2"
            >
              <div>
                <h4 className="font-serif font-bold text-base sm:text-lg text-orthodox-navy dark:text-orthodox-gold-light">
                  {prayer.title[locale]}
                </h4>
                {prayer.subtitle && (
                  <span className="text-xs text-slate-500 font-medium">
                    {prayer.subtitle[locale]}
                  </span>
                )}
              </div>
              <p className="font-serif leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line text-justify pt-2 pl-1">
                {prayer.text[locale]}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
