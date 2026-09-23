'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRAYERS_DATA } from '../../data/prayers';
import { LITURGY_CHRYSOSTOM } from '../../data/liturgy';
import { getDayInfo } from '../../lib/calendarEngine';
import {
  BookOpen,
  Church,
  Sun,
  Moon,
  Wine,
  Utensils,
  Sparkles,
  Type,
  SplitSquareVertical,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Locale } from '../../lib/types';

export function ReaderView() {
  const { locale, selectedDate, fontSize, setFontSize } = useApp();
  const [section, setSection] = useState<'todayReadings' | 'liturgy' | 'morning' | 'evening' | 'communion' | 'meals' | 'patronal'>('todayReadings');
  const [parallelLang, setParallelLang] = useState<Locale | 'none'>('none');
  const [expandedLiturgyPart, setExpandedLiturgyPart] = useState<string | null>(null);

  const dayInfo = getDayInfo(selectedDate);

  const sections = [
    {
      id: 'todayReadings' as const,
      icon: <BookOpen className="w-3.5 h-3.5" />,
      label: { ja: '今日の朗読', en: "Today's Readings", ru: 'Чтения дня' },
    },
    {
      id: 'liturgy' as const,
      icon: <Church className="w-3.5 h-3.5" />,
      label: { ja: '聖体礼儀（全編）', en: 'Divine Liturgy', ru: 'Литургия (полная)' },
    },
    {
      id: 'morning' as const,
      icon: <Sun className="w-3.5 h-3.5" />,
      label: { ja: '朝の祈り', en: 'Morning Prayers', ru: 'Утренние молитвы' },
    },
    {
      id: 'evening' as const,
      icon: <Moon className="w-3.5 h-3.5" />,
      label: { ja: '就寝前の祈り', en: 'Evening Prayers', ru: 'На сон грядущим' },
    },
    {
      id: 'communion' as const,
      icon: <Wine className="w-3.5 h-3.5" />,
      label: { ja: '領聖祝文（前後）', en: 'Holy Communion', ru: 'Ко Святому Причащению' },
    },
    {
      id: 'meals' as const,
      icon: <Utensils className="w-3.5 h-3.5" />,
      label: { ja: '食前・食後・旅', en: 'Meals & Occasional', ru: 'Трапеза и разные' },
    },
    {
      id: 'patronal' as const,
      icon: <Sparkles className="w-3.5 h-3.5" />,
      label: { ja: '庇護祭 守護聖歌', en: 'Pokrov Hymns', ru: 'Тропарь Покрова' },
    },
  ];

  return (
    <div className="space-y-4 pb-24 max-w-3xl mx-auto px-3 sm:px-4 pt-3">
      {/* Category Pills (Scrollable on small mobile) */}
      <div className="flex overflow-x-auto no-scrollbar gap-1.5 bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-1.5 shadow-sm">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 whitespace-nowrap transition-all select-none ${
              section === s.id
                ? 'bg-orthodox-gold text-orthodox-navy shadow-md font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {s.icon}
            <span>{s.label[locale]}</span>
          </button>
        ))}
      </div>

      {/* Font Size & Dual-Language Control Bar */}
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

        {/* Parallel Language Mode */}
        {section === 'liturgy' && (
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

      {/* 1. Today's Scripture Readings Section */}
      {section === 'todayReadings' && (
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

      {/* 2. Full Divine Liturgy of St. John Chrysostom (All 17 Movements!) */}
      {section === 'liturgy' && (
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
                  ? '礼拝の順序に従い、全17章の祈祷文と式順を掲載しています。各項目をタップして開閉できます。'
                  : locale === 'ru'
                  ? 'Полный чин Литургии из 17 последовательных частей. Нажмите для открытия/закрытия.'
                  : 'Complete text and rubrics for the 17 parts of the Divine Liturgy.'}
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

      {/* 3. Morning Prayers */}
      {section === 'morning' && (
        <div className="space-y-4">
          <div className="px-1">
            <h3 className="text-base sm:text-lg font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light">
              {locale === 'ja' ? '朝の祈り（小祈祷書）' : locale === 'ru' ? 'Утренние молитвы' : 'Morning Prayers'}
            </h3>
            <p className="text-xs text-slate-500">
              {locale === 'ja' ? '一日を神への感謝と祈りで始める伝統の祈祷' : locale === 'ru' ? 'Молитвенное правило на начало дня' : 'Traditional prayer rule upon rising'}
            </p>
          </div>

          {PRAYERS_DATA.filter((p) => p.category === 'morning').map((prayer) => (
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
      )}

      {/* 4. Evening Prayers */}
      {section === 'evening' && (
        <div className="space-y-4">
          <div className="px-1">
            <h3 className="text-base sm:text-lg font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light">
              {locale === 'ja' ? '晩の祈り（就寝前の祈祷）' : locale === 'ru' ? 'Молитвы на сон грядущим' : 'Prayers before Sleep'}
            </h3>
            <p className="text-xs text-slate-500">
              {locale === 'ja' ? '一日の過ちの赦しを乞い、安らかな眠りを祈る' : locale === 'ru' ? 'Вечернее молитвенное правило перед отходом ко сну' : 'Evening prayer rule before going to sleep'}
            </p>
          </div>

          {PRAYERS_DATA.filter((p) => p.category === 'evening').map((prayer) => (
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
      )}

      {/* 5. Communion Prayers (Pre & Post) */}
      {section === 'communion' && (
        <div className="space-y-4">
          <div className="px-1">
            <h3 className="text-base sm:text-lg font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light">
              {locale === 'ja' ? '領聖祝文（聖体拝領前及び拝領後）' : locale === 'ru' ? 'Молитвы ко Святому Причащению' : 'Prayers for Holy Communion'}
            </h3>
            <p className="text-xs text-slate-500">
              {locale === 'ja' ? '主の聖体と尊き聖血を拝領するための告白と感謝の祈祷' : locale === 'ru' ? 'Последование ко Святому Причащению и благодарственные молитвы' : 'Pre-communion preparation and post-communion thanksgiving'}
            </p>
          </div>

          {PRAYERS_DATA.filter((p) => p.category === 'communion').map((prayer) => (
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
      )}

      {/* 6. Meals & Occasional Prayers */}
      {section === 'meals' && (
        <div className="space-y-4">
          <div className="px-1">
            <h3 className="text-base sm:text-lg font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light">
              {locale === 'ja' ? '日常の祈り（食前・食後・旅立ち）' : locale === 'ru' ? 'Молитвы на разные случаи' : 'Daily Life & Occasional Prayers'}
            </h3>
          </div>

          {PRAYERS_DATA.filter((p) => p.category === 'meals' || p.category === 'occasional').map((prayer) => (
            <div
              key={prayer.id}
              className="bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-5 shadow-sm space-y-2"
            >
              <div>
                <h4 className="font-serif font-bold text-base sm:text-lg text-orthodox-navy dark:text-orthodox-gold-light">
                  {prayer.title[locale]}
                </h4>
              </div>
              <p className="font-serif leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line text-justify pt-1">
                {prayer.text[locale]}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 7. Pokrov Patronal Hymns */}
      {section === 'patronal' && (
        <div className="space-y-4">
          <div className="px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-orthodox-burgundy dark:text-orthodox-gold block">
              {locale === 'ja' ? '大阪聖堂守護聖歌' : locale === 'ru' ? 'Тропарь храма в Осаке' : 'Osaka Patronal Hymns'}
            </span>
            <h3 className="text-base sm:text-lg font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light">
              {locale === 'ja' ? '生神女庇護祭 祭日讃詞及び小讃詞' : locale === 'ru' ? 'Тропарь и Кондак Покрова Богородицы' : 'Troparion & Kontakion of Pokrov'}
            </h3>
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
