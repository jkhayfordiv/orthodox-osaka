'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getDayInfo } from '../../lib/calendarEngine';
import { getFastingSeasons } from '../../lib/fastingPeriods';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  List,
  Grid,
  BookOpen,
  Church,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { formatJulianDate } from '../../lib/paschalion';
import { TONE_NAMES } from '../../data/terminology';

export function CalendarView() {
  const { locale, selectedDate, setSelectedDate, setActiveTab } = useApp();
  const [currentYear, setCurrentYear] = useState<number>(selectedDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(selectedDate.getMonth()); // 0-indexed
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [inspectDate, setInspectDate] = useState<Date>(selectedDate);
  const [showFastingSeasons, setShowFastingSeasons] = useState<boolean>(true);
  const [expandedReading, setExpandedReading] = useState<'epistle' | 'gospel' | null>(null);

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

  // Fasting seasons data
  const fastingSeasons = getFastingSeasons(currentYear, selectedDate);
  const inspectDayInfo = getDayInfo(inspectDate);

  return (
    <div className="space-y-4 pb-24 max-w-3xl mx-auto px-3 sm:px-4 pt-3">
      {/* 1. Fasting Periods Overview Card (Collapsible) */}
      <div className="bg-white dark:bg-slate-900 border-2 border-orthodox-gold/60 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🕯️</span>
            <div>
              <h3 className="font-serif font-bold text-sm sm:text-base text-orthodox-navy dark:text-orthodox-gold-light">
                {locale === 'ja'
                  ? '正教会の四大断食期間（斎の期）'
                  : locale === 'ru'
                  ? 'Четыре многодневных поста'
                  : 'Four Major Fasting Seasons'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {locale === 'ja'
                  ? 'これからの断食期と規定の確認'
                  : locale === 'ru'
                  ? 'Предстоящие посты и правила воздержания'
                  : 'Upcoming fasting seasons & rules'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowFastingSeasons(!showFastingSeasons)}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            aria-label="Toggle fasting periods"
          >
            {showFastingSeasons ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {showFastingSeasons && (
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {fastingSeasons.map((season) => (
              <div
                key={season.id}
                className={`p-3 rounded-xl border transition-all ${
                  season.status === 'active'
                    ? 'border-2 border-purple-500 bg-purple-50/60 dark:bg-purple-950/30'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-lg">{season.icon}</span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {season.name[locale]}
                    </h4>
                  </div>
                  {season.status === 'active' ? (
                    <span className="text-[10px] font-bold py-0.5 px-2 rounded-full bg-purple-600 text-white animate-pulse">
                      {locale === 'ja' ? '現在進行中' : locale === 'ru' ? 'Идёт пост' : 'Active Fast'}
                    </span>
                  ) : season.daysUntilStart > 0 ? (
                    <span className="text-[10px] font-bold py-0.5 px-2 rounded-full bg-orthodox-gold text-orthodox-navy">
                      {locale === 'ja'
                        ? `あと${season.daysUntilStart}日`
                        : locale === 'ru'
                        ? `через ${season.daysUntilStart} дн.`
                        : `in ${season.daysUntilStart} days`}
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400">
                      {locale === 'ja' ? '終了' : locale === 'ru' ? 'Прошёл' : 'Passed'}
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-0.5 mt-1.5">
                  <p className="font-semibold text-orthodox-burgundy dark:text-orthodox-gold">
                    📅 {season.startDate.toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', { month: 'numeric', day: 'numeric' })}
                    {' ～ '}
                    {season.endDate.toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', { month: 'numeric', day: 'numeric' })}
                    {' '}({season.durationDays}{locale === 'ja' ? '日間' : ' days'})
                  </p>
                  <p className="text-slate-500 leading-tight text-[10px] sm:text-xs">
                    {season.allowedFoods[locale]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Month Navigation & Controls Header */}
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
              <span>{locale === 'ja' ? '今月・今日へ戻る' : locale === 'ru' ? 'К сегодняшнему дню' : 'Jump to Today'}</span>
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

        {/* Legend for Fasting & View Mode Switcher */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Fasting Legend */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
            <span className="flex items-center space-x-0.5"><span>🟢</span><span>斎なし</span></span>
            <span className="flex items-center space-x-0.5"><span>🐟</span><span>魚可</span></span>
            <span className="flex items-center space-x-0.5"><span>🟡</span><span>油可</span></span>
            <span className="flex items-center space-x-0.5"><span>🟣</span><span>厳斎</span></span>
          </div>

          {/* Grid / List view toggle */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
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
              <span>{locale === 'ja' ? '一覧' : locale === 'ru' ? 'Список' : 'List'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Grid Mode View */}
      {viewMode === 'grid' && (
        <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-3 sm:p-4 shadow-sm">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs mb-2">
            {weekdays.map((w, idx) => (
              <div
                key={idx}
                className={`py-1 ${
                  idx === 0
                    ? 'text-red-600 dark:text-red-400'
                    : idx === 6
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-500'
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
                return <div key={`empty-${index}`} className="min-h-[56px] sm:min-h-[66px]" />;
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
                  className={`min-h-[56px] sm:min-h-[66px] p-1 rounded-xl flex flex-col justify-between items-center border transition-all text-left relative ${
                    isSelected
                      ? 'border-2 border-orthodox-gold bg-orthodox-candle/70 dark:bg-orthodox-gold/20 shadow-md ring-2 ring-orthodox-gold/40'
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
                    <span className="text-[11px]" title={info.fasting.badgeText[locale]}>
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

      {/* 4. List Mode View (Senior-friendly) */}
      {viewMode === 'list' && (
        <div className="space-y-2">
          {daysArray
            .filter((d): d is Date => d !== null)
            .map((d) => {
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
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
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

      {/* 5. Rich Daily Details Section in Month View */}
      {inspectDayInfo && inspectDate && (
        <div className="bg-white dark:bg-slate-900 border-2 border-orthodox-gold rounded-2xl p-4 sm:p-6 shadow-xl relative animate-in fade-in space-y-4">
          <div className="flex items-start justify-between border-b border-orthodox-gold/30 pb-3">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-orthodox-gold-dark dark:text-orthodox-gold">
                <span>{formatJulianDate(inspectDate, locale)}</span>
                {inspectDayInfo.tone > 0 && (
                  <>
                    <span>•</span>
                    <span>
                      {TONE_NAMES[inspectDayInfo.tone]?.[locale] || (locale === 'ja' ? `第${inspectDayInfo.tone}調` : locale === 'ru' ? `Глас ${inspectDayInfo.tone}` : `Tone ${inspectDayInfo.tone}`)}
                    </span>
                  </>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-orthodox-navy dark:text-white mt-0.5">
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
              className="py-1.5 px-3 rounded-xl bg-orthodox-gold text-orthodox-navy text-xs font-bold hover:bg-orthodox-gold-dark shadow transition-all active:scale-95"
            >
              {locale === 'ja' ? '「今日」画面で開く →' : locale === 'ru' ? 'В «Сегодня» →' : 'Open in Today →'}
            </button>
          </div>

          {/* Fasting Details */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start space-x-3">
            <span className="text-2xl mt-0.5">{inspectDayInfo.fasting.icon}</span>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {inspectDayInfo.fasting.badgeText[locale]}
                </span>
                {inspectDayInfo.fasting.periodName && (
                  <span className="text-[10px] font-bold py-0.5 px-2 rounded-full bg-orthodox-gold/20 text-orthodox-burgundy dark:text-orthodox-gold">
                    {inspectDayInfo.fasting.periodName[locale]}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {inspectDayInfo.fasting.explanation[locale]}
              </p>
            </div>
          </div>

          {/* Saints of this Day */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-sm text-orthodox-navy dark:text-orthodox-gold-light flex items-center space-x-1.5">
              <span>⛪</span>
              <span>{locale === 'ja' ? '記憶される聖人' : locale === 'ru' ? 'Память святых' : 'Saints of the Day'}</span>
            </h4>
            <ul className="space-y-2 pl-1">
              {inspectDayInfo.saints.map((saint, idx) => (
                <li key={idx} className="text-xs sm:text-sm">
                  <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orthodox-gold flex-shrink-0"></span>
                    <span>{saint.name[locale]}</span>
                  </div>
                  {saint.bio && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 pl-3 leading-relaxed mt-0.5">
                      {saint.bio[locale]}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Scripture Readings with Full Text Expander */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-sm text-orthodox-navy dark:text-orthodox-gold-light flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5 text-orthodox-gold" />
              <span>{locale === 'ja' ? '聖書朗読（日課）' : locale === 'ru' ? 'Чтения дня' : 'Daily Readings'}</span>
            </h4>

            <div className="space-y-2">
              {inspectDayInfo.readings.map((reading, idx) => {
                const isExpanded = expandedReading === (reading.source === 'Epistle' ? 'epistle' : 'gospel');
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-orthodox-gold-dark dark:text-orthodox-gold">
                          {reading.source}
                        </span>
                        <h5 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">
                          {reading.book[locale]} {reading.reference}
                        </h5>
                      </div>
                      <button
                        onClick={() =>
                          setExpandedReading(isExpanded ? null : reading.source === 'Epistle' ? 'epistle' : 'gospel')
                        }
                        className="text-xs text-orthodox-burgundy dark:text-orthodox-gold hover:underline font-bold"
                      >
                        {isExpanded ? (locale === 'ja' ? '閉じる ▲' : 'Close ▲') : (locale === 'ja' ? '全文を開く ▼' : 'Full Text ▼')}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-700 text-xs sm:text-sm font-serif leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
                        {reading.text[locale]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Osaka Parish Schedule if scheduled on this day */}
          {inspectDayInfo.parishServices.length > 0 && (
            <div className="p-3.5 rounded-xl bg-orthodox-candle/50 dark:bg-slate-800 border-2 border-orthodox-gold space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orthodox-burgundy dark:text-orthodox-gold flex items-center space-x-1">
                <Church className="w-3.5 h-3.5" />
                <span>{locale === 'ja' ? '大阪教会の奉事日程' : locale === 'ru' ? 'Служба в храме Осаки' : 'Osaka Parish Service'}</span>
              </span>
              {inspectDayInfo.parishServices.map((s) => (
                <div key={s.id}>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">
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
      )}
    </div>
  );
}
