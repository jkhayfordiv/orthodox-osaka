'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getDayInfo } from '../../lib/calendarEngine';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List, Grid, X } from 'lucide-react';
import { formatJulianDate } from '../../lib/paschalion';

export function CalendarView() {
  const { locale, selectedDate, setSelectedDate, setActiveTab } = useApp();
  const [currentYear, setCurrentYear] = useState<number>(selectedDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(selectedDate.getMonth()); // 0-indexed
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [inspectDate, setInspectDate] = useState<Date | null>(selectedDate);

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleJumpToday = () => {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setSelectedDate(today);
    setInspectDate(today);
  };

  // Generate days for grid
  const firstDayOfMonth = new Date(Date.UTC(currentYear, currentMonth, 1));
  const startingDayOfWeek = firstDayOfMonth.getUTCDay(); // 0 = Sun
  const daysInMonth = new Date(Date.UTC(currentYear, currentMonth + 1, 0)).getUTCDate();

  const daysArray: (Date | null)[] = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(new Date(Date.UTC(currentYear, currentMonth, d)));
  }

  // Weekday headers
  const weekdays = [
    { ja: '日', en: 'Sun', ru: 'Вс' },
    { ja: '月', en: 'Mon', ru: 'Пн' },
    { ja: '火', en: 'Tue', ru: 'Вт' },
    { ja: '水', en: 'Wed', ru: 'Ср' },
    { ja: '木', en: 'Thu', ru: 'Чт' },
    { ja: '金', en: 'Fri', ru: 'Пт' },
    { ja: '土', en: 'Sat', ru: 'Сб' },
  ];

  // Month title
  const monthNames = [
    { ja: '1月', en: 'January', ru: 'Январь' },
    { ja: '2月', en: 'February', ru: 'Февраль' },
    { ja: '3月', en: 'March', ru: 'Март' },
    { ja: '4月', en: 'April', ru: 'Апрель' },
    { ja: '5月', en: 'May', ru: 'Май' },
    { ja: '6月', en: 'June', ru: 'Июнь' },
    { ja: '7月', en: 'July', ru: 'Июль' },
    { ja: '8月', en: 'August', ru: 'Август' },
    { ja: '9月', en: 'September', ru: 'Сентябрь' },
    { ja: '10月', en: 'October', ru: 'Октябрь' },
    { ja: '11月', en: 'November', ru: 'Ноябрь' },
    { ja: '12月', en: 'December', ru: 'Декабрь' },
  ];

  const inspectDayInfo = inspectDate ? getDayInfo(inspectDate) : null;

  return (
    <div className="space-y-4 pb-20 max-w-3xl mx-auto px-3 sm:px-4 pt-3">
      {/* Month Header & Controls */}
      <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/40 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orthodox-candle dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all active:scale-95"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-orthodox-gold-dark" />
          </button>

          <div className="text-center">
            <h2 className="text-lg sm:text-xl font-bold font-serif text-orthodox-navy dark:text-orthodox-gold-light">
              {currentYear}年 {monthNames[currentMonth][locale]}
            </h2>
            <button
              onClick={handleJumpToday}
              className="text-xs text-orthodox-burgundy dark:text-orthodox-gold hover:underline font-bold mt-0.5 inline-flex items-center space-x-1"
            >
              <CalendarIcon className="w-3 h-3" />
              <span>{locale === 'ja' ? '今月・今日へ' : locale === 'ru' ? 'К сегодняшнему дню' : 'Jump to Today'}</span>
            </button>
          </div>

          <button
            onClick={handleNextMonth}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orthodox-candle dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all active:scale-95"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-orthodox-gold-dark" />
          </button>
        </div>

        {/* View mode toggle (Grid vs List) */}
        <div className="flex justify-end mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 rounded-md flex items-center space-x-1 font-semibold ${
                viewMode === 'grid'
                  ? 'bg-orthodox-gold text-orthodox-navy shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>{locale === 'ja' ? 'カレンダー' : locale === 'ru' ? 'Сетка' : 'Grid'}</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-2.5 py-1 rounded-md flex items-center space-x-1 font-semibold ${
                viewMode === 'list'
                  ? 'bg-orthodox-gold text-orthodox-navy shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>{locale === 'ja' ? '一覧（大きめ）' : locale === 'ru' ? 'Список' : 'List'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid Mode View */}
      {viewMode === 'grid' && (
        <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-3 sm:p-4 shadow-sm">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs mb-2">
            {weekdays.map((w, idx) => (
              <div
                key={idx}
                className={`py-1 ${
                  idx === 0 ? 'text-red-600 dark:text-red-400' : idx === 6 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
                }`}
              >
                {w[locale]}
              </div>
            ))}
          </div>

          {/* Calendar Day Cells */}
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
            {daysArray.map((d, index) => {
              if (!d) {
                return <div key={`empty-${index}`} className="min-h-[52px] sm:min-h-[64px]" />;
              }

              const info = getDayInfo(d);
              const isSelected =
                inspectDate &&
                inspectDate.getUTCFullYear() === d.getUTCFullYear() &&
                inspectDate.getUTCMonth() === d.getUTCMonth() &&
                inspectDate.getUTCDate() === d.getUTCDate();

              const isActualToday =
                new Date().getUTCFullYear() === d.getUTCFullYear() &&
                new Date().getUTCMonth() === d.getUTCMonth() &&
                new Date().getUTCDate() === d.getUTCDate();

              const hasFeast = info.feasts.length > 0;
              const hasService = info.parishServices.length > 0;

              return (
                <button
                  key={d.toISOString()}
                  onClick={() => setInspectDate(d)}
                  className={`min-h-[52px] sm:min-h-[64px] p-1 rounded-xl flex flex-col justify-between items-center border transition-all text-left relative ${
                    isSelected
                      ? 'border-2 border-orthodox-gold bg-orthodox-candle/60 dark:bg-orthodox-gold/20 shadow-md'
                      : isActualToday
                      ? 'border-orthodox-burgundy bg-red-50/50 dark:bg-red-950/20'
                      : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="w-full flex items-center justify-between text-xs">
                    <span
                      className={`font-bold ${
                        d.getUTCDay() === 0
                          ? 'text-red-600 dark:text-red-400'
                          : d.getUTCDay() === 6
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {d.getUTCDate()}
                    </span>
                    <span className="text-[10px]" title={info.fasting.badgeText[locale]}>
                      {info.fasting.icon}
                    </span>
                  </div>

                  {/* Badges for Feast & Osaka Services */}
                  <div className="w-full flex flex-wrap gap-0.5 justify-center my-0.5">
                    {hasFeast && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-orthodox-gold text-orthodox-navy font-bold line-clamp-1">
                        大祭
                      </span>
                    )}
                    {hasService && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-orthodox-burgundy text-white font-bold">
                        奉事
                      </span>
                    )}
                  </div>

                  <span className="text-[9px] text-slate-400 dark:text-slate-500 scale-90">
                    旧{info.julianDateString.split('月')[1]?.split('日')[0] || ''}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* List Mode View (Senior-friendly) */}
      {viewMode === 'list' && (
        <div className="space-y-2">
          {daysArray.filter((d): d is Date => d !== null).map((d) => {
            const info = getDayInfo(d);
            const isSelected =
              inspectDate &&
              inspectDate.getUTCFullYear() === d.getUTCFullYear() &&
              inspectDate.getUTCMonth() === d.getUTCMonth() &&
              inspectDate.getUTCDate() === d.getUTCDate();

            return (
              <button
                key={d.toISOString()}
                onClick={() => setInspectDate(d)}
                className={`w-full p-3 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                  isSelected
                    ? 'border-2 border-orthodox-gold bg-orthodox-candle/50 dark:bg-slate-800'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="text-center min-w-[44px]">
                  <span className="text-xl font-bold font-serif text-slate-900 dark:text-white block">
                    {d.getUTCDate()}
                  </span>
                  <span className="text-xs text-slate-500">
                    {weekdays[d.getUTCDay()][locale]}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-base">{info.fasting.icon}</span>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {info.fasting.badgeText[locale]}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ({formatJulianDate(d, locale)})
                    </span>
                  </div>

                  {info.feasts.length > 0 && (
                    <div className="font-bold text-sm text-orthodox-burgundy dark:text-orthodox-gold mt-1">
                      ☦ {info.feasts[0].title[locale]}
                    </div>
                  )}

                  {info.parishServices.length > 0 && (
                    <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                      ⛪ 大阪教会: {info.parishServices[0].time} {info.parishServices[0].title[locale]}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Selected Day Detail Drawer / Card */}
      {inspectDayInfo && inspectDate && (
        <div className="bg-white dark:bg-slate-900 border-2 border-orthodox-gold rounded-2xl p-4 sm:p-5 shadow-lg relative animate-in fade-in">
          <div className="flex items-start justify-between border-b border-orthodox-gold/30 pb-3 mb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orthodox-gold-dark dark:text-orthodox-gold block">
                {formatJulianDate(inspectDate, locale)}
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-orthodox-navy dark:text-white">
                {inspectDate.toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })}
              </h3>
            </div>
            <button
              onClick={() => {
                setSelectedDate(inspectDate);
                setActiveTab('today');
              }}
              className="py-1 px-3 rounded-xl bg-orthodox-gold text-orthodox-navy text-xs font-bold hover:bg-orthodox-gold-dark shadow"
            >
              {locale === 'ja' ? '今日の画面で開く →' : locale === 'ru' ? 'Открыть в «Сегодня» →' : 'Open in Today →'}
            </button>
          </div>

          <div className="space-y-3 text-sm">
            {/* Fasting Info */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{inspectDayInfo.fasting.icon}</span>
              <div>
                <span className="font-bold text-slate-800 dark:text-white block">
                  {inspectDayInfo.fasting.badgeText[locale]}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {inspectDayInfo.fasting.explanation[locale]}
                </span>
              </div>
            </div>

            {/* Feasts */}
            {inspectDayInfo.feasts.map((f, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-orthodox-candle/40 dark:bg-slate-800 border border-orthodox-gold/40">
                <span className="text-[10px] font-bold text-orthodox-burgundy dark:text-orthodox-gold uppercase block">
                  {locale === 'ja' ? '祝日典礼' : locale === 'ru' ? 'Праздник' : 'Feast Day'}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {f.title[locale]}
                </span>
              </div>
            ))}

            {/* Osaka Church Services on this day */}
            {inspectDayInfo.parishServices.length > 0 && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700">
                <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase block mb-1">
                  ⛪ 大阪教会の奉事予定 (Scheduled at Osaka Church)
                </span>
                {inspectDayInfo.parishServices.map((s) => (
                  <div key={s.id} className="space-y-0.5">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {s.time} — {s.title[locale]}
                    </p>
                    {s.dutyGroup && (
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        当番: &lt;{s.dutyGroup}&gt;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
