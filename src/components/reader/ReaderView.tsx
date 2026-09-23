'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRAYERS_DATA } from '../../data/prayers';
import { LITURGY_CHRYSOSTOM } from '../../data/liturgy';
import { getDayInfo } from '../../lib/calendarEngine';
import { BookOpen, Church, Heart, Sparkles, Type, SplitSquareVertical } from 'lucide-react';
import { Locale } from '../../lib/types';

export function ReaderView() {
  const { locale, selectedDate, fontSize, setFontSize } = useApp();
  const [section, setSection] = useState<'todayReadings' | 'liturgy' | 'dailyPrayers' | 'patronal'>('todayReadings');
  const [parallelLang, setParallelLang] = useState<Locale | 'none'>('none');

  const dayInfo = getDayInfo(selectedDate);

  const sections = [
    {
      id: 'todayReadings' as const,
      icon: <BookOpen className="w-4 h-4" />,
      label: { ja: '今日の朗読', en: "Today's Readings", ru: 'Чтения дня' },
    },
    {
      id: 'liturgy' as const,
      icon: <Church className="w-4 h-4" />,
      label: { ja: '聖体礼儀 祈祷文', en: 'Divine Liturgy', ru: 'Литургия' },
    },
    {
      id: 'dailyPrayers' as const,
      icon: <Heart className="w-4 h-4" />,
      label: { ja: '基本の祈り', en: 'Daily Prayers', ru: 'Молитвослов' },
    },
    {
      id: 'patronal' as const,
      icon: <Sparkles className="w-4 h-4" />,
      label: { ja: '生神女庇護祭 聖歌', en: 'Pokrov Hymns', ru: 'Тропарь Покрова' },
    },
  ];

  return (
    <div className="space-y-4 pb-20 max-w-3xl mx-auto px-3 sm:px-4 pt-3">
      {/* Category Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-1.5 shadow-sm">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all select-none ${
              section === s.id
                ? 'bg-orthodox-gold text-orthodox-navy shadow-md'
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
          <span className="font-semibold text-slate-500">文字サイズ:</span>
          {(['sm', 'base', 'lg', 'xl'] as const).map((sz) => (
            <button
              key={sz}
              onClick={() => setFontSize(sz)}
              className={`px-2 py-0.5 rounded font-bold transition-all ${
                fontSize === sz
                  ? 'bg-orthodox-gold text-orthodox-navy'
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
              <option value="none">単一言語表示</option>
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
              {locale === 'ja' ? '本日の聖書朗読（日課）' : locale === 'ru' ? 'Чтения сего дня' : "Today's Scripture Readings"}
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

      {/* 2. Divine Liturgy Section */}
      {section === 'liturgy' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-5 shadow-sm">
            <h3 className="text-base sm:text-lg font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light mb-1">
              {locale === 'ja'
                ? '聖金口イオアン聖体礼儀'
                : locale === 'ru'
                ? 'Божественная Литургия свт. Иоанна Златоуста'
                : 'The Divine Liturgy of St. John Chrysostom'}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              {locale === 'ja'
                ? '礼拝中に祈祷の言葉を追うことができます。'
                : locale === 'ru'
                ? 'Текст службы для следования за богослужением.'
                : 'Follow along with the liturgical prayers during Sunday service.'}
            </p>

            <div className="space-y-6">
              {LITURGY_CHRYSOSTOM.map((part) => (
                <div key={part.id} className="border-b border-slate-100 dark:border-slate-800 pb-5 last:border-b-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-orthodox-gold"></span>
                    <h4 className="font-bold font-serif text-base text-orthodox-burgundy dark:text-orthodox-gold">
                      {part.title[locale]}
                    </h4>
                  </div>

                  {part.rubric && (
                    <p className="text-xs italic text-slate-500 dark:text-slate-400 mb-2 pl-3 border-l-2 border-orthodox-gold/40">
                      {part.rubric[locale]}
                    </p>
                  )}

                  {/* Single or Parallel Display */}
                  {parallelLang === 'none' || parallelLang === locale ? (
                    <p className="font-serif leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line pl-3">
                      {part.text[locale]}
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                      <div className="border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-700 pb-3 sm:pb-0 sm:pr-3">
                        <span className="text-[10px] font-bold text-orthodox-gold uppercase block mb-1">
                          {locale}
                        </span>
                        <p className="font-serif text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
                          {part.text[locale]}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-orthodox-gold uppercase block mb-1">
                          {parallelLang}
                        </span>
                        <p className="font-serif text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
                          {part.text[parallelLang]}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Daily Prayers Section */}
      {section === 'dailyPrayers' && (
        <div className="space-y-4">
          {PRAYERS_DATA.filter((p) => p.category === 'daily').map((prayer) => (
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

      {/* 4. Patronal Pokrov Hymns Section */}
      {section === 'patronal' && (
        <div className="space-y-4">
          {PRAYERS_DATA.filter((p) => p.category === 'patronal').map((prayer) => (
            <div
              key={prayer.id}
              className="bg-white dark:bg-slate-900 border-2 border-orthodox-gold rounded-2xl p-5 shadow-sm space-y-2"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orthodox-burgundy dark:text-orthodox-gold block">
                  {locale === 'ja' ? '大阪聖堂守護聖歌' : locale === 'ru' ? 'Тропарь храма в Осаке' : 'Osaka Patronal Hymn'}
                </span>
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
