'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { PARISH_SCHEDULE_2026 } from '../../data/parishSchedule2026';
import { PARISH_ANNOUNCEMENTS } from '../../data/bulletin';
import { PARISH_INFO } from '../../data/terminology';
import { ParishService, Locale } from '../../lib/types';
import {
  Calendar,
  Bell,
  MapPin,
  Phone,
  Mail,
  Printer,
  Compass,
  Users,
  Clock,
  Info,
  ExternalLink,
  Search,
  Sparkles,
  CalendarDays,
  X,
} from 'lucide-react';

// Safe date parser to avoid timezone drift across midnight UTC/local
function parseServiceDate(dateStr: string) {
  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10); // 1-12
  const day = parseInt(dayStr, 10);
  const dateObj = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  return { year, month, day, dateObj };
}

// Localized short month string (e.g. "9月", "SEP", "СЕН")
function formatMonthShort(dateObj: Date, locale: Locale): string {
  if (locale === 'ja') {
    return `${dateObj.getUTCMonth() + 1}月`;
  }
  return dateObj
    .toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
      month: 'short',
      timeZone: 'UTC',
    })
    .toUpperCase();
}

// Localized weekday string (e.g. "土曜日", "Saturday", "Суббота")
function formatWeekday(dateObj: Date, locale: Locale, short = false): string {
  if (locale === 'ja') {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return short ? `${days[dateObj.getUTCDay()]}` : `${days[dateObj.getUTCDay()]}曜日`;
  }
  return dateObj.toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
    weekday: short ? 'short' : 'long',
    timeZone: 'UTC',
  });
}

// Localized full date string (e.g. "2026年9月26日 (土)", "Saturday, September 26, 2026")
function formatFullDate(dateObj: Date, locale: Locale): string {
  if (locale === 'ja') {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return `${dateObj.getUTCFullYear()}年${dateObj.getUTCMonth() + 1}月${dateObj.getUTCDate()}日 (${days[dateObj.getUTCDay()]})`;
  }
  return dateObj.toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

// Clean duty team name (removes raw angle brackets)
function cleanDutyGroupName(group: string, locale: Locale): string {
  const stripped = group.replace(/^<|>$/g, '').trim();
  switch (stripped.toLowerCase()) {
    case 'rabboni':
      return locale === 'ja' ? 'ラボニ組' : locale === 'ru' ? 'Группа «Рабвуни»' : 'Rabboni Team';
    case "daria's kitchen":
    case 'darias kitchen':
      return locale === 'ja' ? 'ダリヤの台所' : locale === 'ru' ? '«Кухня Дарии»' : "Daria's Kitchen";
    case 'church friends':
      return locale === 'ja' ? 'チャーチフレンズ' : locale === 'ru' ? '«Друзья церкви»' : 'Church Friends';
    case 'choir':
      return locale === 'ja' ? '聖歌隊' : locale === 'ru' ? 'Клирос / Хор' : 'Choir';
    default:
      return stripped;
  }
}

// Visual badges for liturgical service types
function getServiceTypeBadge(type: ParishService['serviceType'], locale: Locale) {
  switch (type) {
    case 'liturgy':
      return {
        label: { ja: '聖体礼儀', en: 'Divine Liturgy', ru: 'Божественная Литургия' }[locale],
        badgeClass: 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800',
      };
    case 'vigil':
      return {
        label: { ja: '徹夜祷', en: 'All-Night Vigil', ru: 'Всенощное бдение' }[locale],
        badgeClass: 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-200 border-indigo-300 dark:border-indigo-800',
      };
    case 'vespers':
      return {
        label: { ja: '晩課', en: 'Vespers', ru: 'Вечерня' }[locale],
        badgeClass: 'bg-sky-100 dark:bg-sky-950/70 text-sky-900 dark:text-sky-200 border-sky-300 dark:border-sky-800',
      };
    case 'panikhida':
      return {
        label: { ja: 'パニヒダ', en: 'Panikhida', ru: 'Панихида' }[locale],
        badgeClass: 'bg-rose-100 dark:bg-rose-950/70 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-800',
      };
    case 'water_blessing':
      return {
        label: { ja: '聖水式', en: 'Blessing of Water', ru: 'Водоосвящение' }[locale],
        badgeClass: 'bg-cyan-100 dark:bg-cyan-950/70 text-cyan-900 dark:text-cyan-200 border-cyan-300 dark:border-cyan-800',
      };
    case 'special':
      return {
        label: { ja: '特別行事', en: 'Special Event', ru: 'Особое событие' }[locale],
        badgeClass: 'bg-purple-100 dark:bg-purple-950/70 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-800',
      };
    default:
      return {
        label: { ja: '奉事', en: 'Service', ru: 'Служба' }[locale],
        badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700',
      };
  }
}

export function ParishView() {
  const { locale } = useApp();
  const [subTab, setSubTab] = useState<'schedule' | 'bulletin' | 'visit'>('schedule');

  // Schedule filtering states
  const [monthFilter, setMonthFilter] = useState<string>('upcoming'); // 'upcoming', '2026-08', '2026-09', ..., 'all'
  const [typeFilter, setTypeFilter] = useState<'all' | 'liturgy' | 'vigil' | 'special'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const todayStr = useMemo(() => {
    // Current simulation or civil date YYYY-MM-DD
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }, []);

  // Compute Next Upcoming Service for the Hero Card
  const nextService = useMemo(() => {
    const upcoming = PARISH_SCHEDULE_2026.filter((s) => s.date >= todayStr);
    return upcoming.length > 0 ? upcoming[0] : PARISH_SCHEDULE_2026[0];
  }, [todayStr]);

  // Extract all unique Year-Months available in schedule
  const availableMonths = useMemo(() => {
    const set = new Set<string>();
    PARISH_SCHEDULE_2026.forEach((s) => {
      set.add(s.date.slice(0, 7)); // 'YYYY-MM'
    });
    return Array.from(set).sort();
  }, []);

  // Filtered services
  const filteredServices = useMemo(() => {
    return PARISH_SCHEDULE_2026.filter((s) => {
      // Month filter
      if (monthFilter === 'upcoming') {
        if (s.date < todayStr) return false;
      } else if (monthFilter !== 'all') {
        if (!s.date.startsWith(monthFilter)) return false;
      }

      // Service type filter
      if (typeFilter === 'liturgy' && s.serviceType !== 'liturgy') return false;
      if (typeFilter === 'vigil' && s.serviceType !== 'vigil' && s.serviceType !== 'vespers') return false;
      if (typeFilter === 'special' && s.serviceType !== 'special' && s.serviceType !== 'water_blessing' && s.serviceType !== 'panikhida') return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = (s.title[locale] || '').toLowerCase().includes(q) ||
                           (s.title.en || '').toLowerCase().includes(q) ||
                           (s.title.ja || '').toLowerCase().includes(q) ||
                           (s.title.ru || '').toLowerCase().includes(q);
        const dutyMatch = (s.dutyGroup || '').toLowerCase().includes(q) ||
                          (s.dutyPeople || []).some((p) => p.toLowerCase().includes(q));
        const notesMatch = (s.notes?.[locale] || '').toLowerCase().includes(q);
        if (!titleMatch && !dutyMatch && !notesMatch) return false;
      }

      return true;
    });
  }, [monthFilter, typeFilter, searchQuery, todayStr, locale]);

  const subTabs = [
    {
      id: 'schedule' as const,
      icon: <Calendar className="w-4 h-4" />,
      label: { ja: '奉事日程・当番', en: 'Services & Roster', ru: 'Расписание служб' },
    },
    {
      id: 'bulletin' as const,
      icon: <Bell className="w-4 h-4" />,
      label: { ja: '教会だより', en: 'Bulletin & News', ru: 'Объявления' },
    },
    {
      id: 'visit' as const,
      icon: <Compass className="w-4 h-4" />,
      label: { ja: '教会案内・アクセス', en: 'Visitor Guide', ru: 'О храме и проезд' },
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-5 pb-24 md:pb-12 max-w-6xl xl:max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-4">
      {/* Sub-tab Navigation */}
      <div className="no-print bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-1.5 shadow-sm flex space-x-1 max-w-xl mx-auto sm:mx-0">
        {subTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            className={`flex-1 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all select-none ${
              subTab === t.id
                ? 'bg-orthodox-gold text-orthodox-navy shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.icon}
            <span>{t.label[locale]}</span>
          </button>
        ))}
      </div>

      {/* 1. Services & Duty Roster Sub-tab */}
      {subTab === 'schedule' && (
        <div className="space-y-6">
          {/* Header Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
            <div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-orthodox-navy dark:text-orthodox-gold-light">
                {locale === 'ja'
                  ? '大阪ハリストス正教会 奉事日程・当番表'
                  : locale === 'ru'
                  ? 'Расписание богослужений и череда дежурств'
                  : 'Parish Service Schedule & Duty Roster'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {locale === 'ja'
                  ? '日本ハリストス正教会 西日本主教教区 聖生神女庇護聖堂'
                  : locale === 'ru'
                  ? 'Храм Покрова Пресвятой Богородицы, Осака'
                  : 'Holy Protection Temple, Western Diocese, Osaka'}
              </p>
            </div>

            <button
              onClick={handlePrint}
              className="no-print inline-flex items-center space-x-2 self-start sm:self-auto text-xs sm:text-sm py-2 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all"
            >
              <Printer className="w-4 h-4 text-orthodox-gold-dark" />
              <span>{locale === 'ja' ? '日程を印刷・保存' : locale === 'ru' ? 'Печать расписания' : 'Print Schedule'}</span>
            </button>
          </div>

          {/* Featured Hero Card: NEXT UPCOMING SERVICE */}
          {nextService && (
            <div className="no-print bg-gradient-to-br from-amber-50/90 via-white to-orange-50/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-orthodox-navy-dark/40 border-2 border-orthodox-gold/60 rounded-3xl p-5 sm:p-6 shadow-md transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-orthodox-gold/20 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-orthodox-gold-dark dark:text-orthodox-gold">
                    {locale === 'ja' ? '次回の奉事（直近）' : locale === 'ru' ? 'Ближайшая служба' : 'Next Upcoming Service'}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold py-1 px-2.5 rounded-lg border bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700">
                    {getServiceTypeBadge(nextService.serviceType, locale).label}
                  </span>
                  {nextService.isTransferred && (
                    <span className="text-xs font-bold py-1 px-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {locale === 'ja' ? '繰上兼行' : locale === 'ru' ? 'Перенесено' : 'Transferred'}
                    </span>
                  )}
                </div>
              </div>

              {/* Main Content Area */}
              {(() => {
                const { dateObj } = parseServiceDate(nextService.date);
                return (
                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                    {/* Left: Liturgical Date & Time */}
                    <div className="lg:col-span-4 flex items-center space-x-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-orthodox-candle/70 dark:bg-slate-800 border-2 border-orthodox-gold flex flex-col items-center justify-center shadow-sm flex-shrink-0">
                        <span className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          {formatMonthShort(dateObj, locale)}
                        </span>
                        <span className="text-2xl sm:text-3xl font-serif font-black text-orthodox-navy dark:text-orthodox-gold-light leading-none my-0.5">
                          {dateObj.getUTCDate()}
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold text-orthodox-burgundy dark:text-orthodox-gold">
                          {formatWeekday(dateObj, locale, true)}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center space-x-1.5 text-orthodox-navy dark:text-orthodox-gold font-bold text-sm sm:text-base">
                          <Clock className="w-4 h-4 text-orthodox-gold-dark" />
                          <span>{nextService.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {formatFullDate(dateObj, locale)}
                        </p>
                      </div>
                    </div>

                    {/* Center: Service Title & Notes */}
                    <div className="lg:col-span-5 space-y-1.5">
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 dark:text-white leading-snug">
                        {nextService.title[locale]}
                      </h3>
                      {nextService.notes && (
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-800/80 p-2.5 rounded-xl border border-orthodox-gold/20">
                          {nextService.notes[locale]}
                        </p>
                      )}
                    </div>

                    {/* Right: Duty Team Assignment */}
                    <div className="lg:col-span-3 bg-white dark:bg-slate-800/80 rounded-2xl p-3.5 border border-orthodox-gold/30 shadow-sm space-y-1.5">
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                        <Users className="w-4 h-4 text-orthodox-gold" />
                        <span>{locale === 'ja' ? '担当当番組' : locale === 'ru' ? 'Дежурные' : 'Assigned Duty Team'}</span>
                      </div>
                      {nextService.dutyGroup ? (
                        <div className="space-y-1">
                          <span className="inline-block font-bold text-sm text-orthodox-navy dark:text-orthodox-gold-light">
                            {cleanDutyGroupName(nextService.dutyGroup, locale)}
                          </span>
                          {nextService.dutyPeople && nextService.dutyPeople.length > 0 && (
                            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                              {nextService.dutyPeople.join(', ')}
                            </p>
                          )}
                        </div>
                      ) : nextService.dutyPeople && nextService.dutyPeople.length > 0 ? (
                        <p className="text-xs font-bold text-orthodox-navy dark:text-orthodox-gold-light">
                          {nextService.dutyPeople.join(', ')}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400 italic">
                          {locale === 'ja' ? '全信徒奉加' : locale === 'ru' ? 'Общее служение' : 'All Parishioners'}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Interactive Filters Bar */}
          <div className="no-print space-y-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 shadow-sm">
            {/* Top Row: Month Selector Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
              {/* Upcoming Option */}
              <button
                onClick={() => setMonthFilter('upcoming')}
                className={`flex-shrink-0 text-xs sm:text-sm font-bold py-1.5 px-3 rounded-xl transition-all flex items-center space-x-1.5 ${
                  monthFilter === 'upcoming'
                    ? 'bg-orthodox-navy text-orthodox-gold-light shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-orthodox-gold" />
                <span>{locale === 'ja' ? '近日の奉事' : locale === 'ru' ? 'Ближайшие' : 'Upcoming'}</span>
              </button>

              {/* Month Pills */}
              {availableMonths.map((ym) => {
                const [y, m] = ym.split('-');
                const monthObj = new Date(Date.UTC(parseInt(y, 10), parseInt(m, 10) - 1, 15));
                const monthLabel =
                  locale === 'ja'
                    ? `${y}年${parseInt(m, 10)}月`
                    : locale === 'ru'
                    ? monthObj.toLocaleDateString('ru-RU', { month: 'short', year: 'numeric', timeZone: 'UTC' })
                    : monthObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

                const count = PARISH_SCHEDULE_2026.filter((s) => s.date.startsWith(ym)).length;

                return (
                  <button
                    key={ym}
                    onClick={() => setMonthFilter(ym)}
                    className={`flex-shrink-0 text-xs sm:text-sm font-semibold py-1.5 px-3 rounded-xl transition-all flex items-center space-x-1.5 ${
                      monthFilter === ym
                        ? 'bg-orthodox-gold text-orthodox-navy font-bold shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>{monthLabel}</span>
                    <span className="text-[10px] py-0.2 px-1.5 rounded-full bg-black/10 dark:bg-white/10 font-bold">
                      {count}
                    </span>
                  </button>
                );
              })}

              {/* All Year Option */}
              <button
                onClick={() => setMonthFilter('all')}
                className={`flex-shrink-0 text-xs sm:text-sm font-bold py-1.5 px-3 rounded-xl transition-all ${
                  monthFilter === 'all'
                    ? 'bg-orthodox-navy text-orthodox-gold-light shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {locale === 'ja' ? '通年（全日程）' : locale === 'ru' ? 'Все службы' : 'All Year'}
              </button>
            </div>

            {/* Bottom Row: Service Type Filter Chips + Search Input */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              {/* Type Chips */}
              <div className="flex items-center space-x-1 overflow-x-auto text-xs">
                {(
                  [
                    { id: 'all', label: { ja: 'すべて', en: 'All Services', ru: 'Все' } },
                    { id: 'liturgy', label: { ja: '聖体礼儀のみ', en: 'Divine Liturgy', ru: 'Литургия' } },
                    { id: 'vigil', label: { ja: '徹夜祷・晩課', en: 'Vigil & Vespers', ru: 'Всенощная' } },
                    { id: 'special', label: { ja: '特別祭・パニヒダ', en: 'Feasts & Special', ru: 'Праздники' } },
                  ] as const
                ).map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => setTypeFilter(chip.id)}
                    className={`py-1.5 px-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                      typeFilter === chip.id
                        ? 'bg-orthodox-candle/90 dark:bg-slate-800 text-orthodox-navy dark:text-orthodox-gold border border-orthodox-gold/60 font-bold shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    {chip.label[locale]}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64 flex-shrink-0">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    locale === 'ja'
                      ? '奉事名・当番組・行事を検索...'
                      : locale === 'ru'
                      ? 'Поиск службы или дежурных...'
                      : 'Search services, duties, notes...'
                  }
                  className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-orthodox-gold"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results Count Summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>
              {locale === 'ja'
                ? `該当する奉事: ${filteredServices.length}件`
                : locale === 'ru'
                ? `Найдено богослужений: ${filteredServices.length}`
                : `Showing ${filteredServices.length} services`}
            </span>
            {(monthFilter !== 'upcoming' || typeFilter !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setMonthFilter('upcoming');
                  setTypeFilter('all');
                  setSearchQuery('');
                }}
                className="no-print text-orthodox-gold-dark hover:underline font-bold"
              >
                {locale === 'ja' ? 'フィルターをリセット' : locale === 'ru' ? 'Сбросить фильтры' : 'Reset filters'}
              </button>
            )}
          </div>

          {/* Service Cards Grid */}
          {filteredServices.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 text-center space-y-2">
              <CalendarDays className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <h4 className="font-bold text-base text-slate-700 dark:text-slate-300">
                {locale === 'ja' ? '該当する奉事日程がありません' : locale === 'ru' ? 'Службы не найдены' : 'No services found'}
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {locale === 'ja'
                  ? '検索条件や選択中の月フィルターを変更してお試しください。'
                  : locale === 'ru'
                  ? 'Попробуйте изменить параметры поиска или выбрать другой месяц.'
                  : 'Try selecting a different month or clearing your search filter.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredServices.map((s) => {
                const { dateObj } = parseServiceDate(s.date);
                const badge = getServiceTypeBadge(s.serviceType, locale);
                const isNext = s.id === nextService?.id;

                return (
                  <div
                    key={s.id}
                    className={`bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-xs border transition-all flex flex-col justify-between ${
                      isNext
                        ? 'border-2 border-orthodox-gold ring-1 ring-orthodox-gold/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-orthodox-gold/50 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      {/* Top Row: Date square + Service Type + Time */}
                      <div className="flex items-start space-x-3">
                        {/* Liturgical Date Badge */}
                        <div className="w-12 text-center py-1 px-1 rounded-xl bg-orthodox-candle/70 dark:bg-slate-800 border border-orthodox-gold/40 flex-shrink-0">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block uppercase tracking-tight">
                            {formatMonthShort(dateObj, locale)}
                          </span>
                          <span className="text-lg font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light block leading-tight">
                            {dateObj.getUTCDate()}
                          </span>
                          <span className="text-[9px] font-bold text-orthodox-burgundy dark:text-orthodox-gold block">
                            {formatWeekday(dateObj, locale, true)}
                          </span>
                        </div>

                        {/* Title and metadata */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5 mb-1">
                            <span className={`text-[10px] font-bold py-0.5 px-2 rounded-md border ${badge.badgeClass}`}>
                              {badge.label}
                            </span>
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-orthodox-gold-dark inline" />
                              <span>{s.time}</span>
                            </span>
                            {s.isTransferred && (
                              <span className="text-[9px] font-bold py-0.5 px-1.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                                {locale === 'ja' ? '繰上' : locale === 'ru' ? 'Перенос' : 'Transferred'}
                              </span>
                            )}
                          </div>

                          <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                            {s.title[locale]}
                          </h4>
                        </div>
                      </div>

                      {/* Special Service Notes Callout */}
                      {s.notes && (
                        <div className="mt-3 text-xs text-slate-600 dark:text-slate-300 bg-amber-50/60 dark:bg-slate-800/60 p-2.5 rounded-xl border border-orthodox-gold/20">
                          {s.notes[locale]}
                        </div>
                      )}
                    </div>

                    {/* Duty Team Footer */}
                    {(s.dutyGroup || (s.dutyPeople && s.dutyPeople.length > 0)) && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-xs">
                        <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-400">
                          <Users className="w-3.5 h-3.5 text-orthodox-gold-dark flex-shrink-0" />
                          <span className="text-slate-400">
                            {locale === 'ja' ? '当番:' : locale === 'ru' ? 'Дежурные:' : 'Duty:'}
                          </span>
                          {s.dutyGroup && (
                            <span className="font-bold text-orthodox-navy dark:text-orthodox-gold-light">
                              {cleanDutyGroupName(s.dutyGroup, locale)}
                            </span>
                          )}
                          {s.dutyPeople && s.dutyPeople.length > 0 && (
                            <span className="text-slate-500 dark:text-slate-400 truncate">
                              ({s.dutyPeople.join(', ')})
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. Bulletin & News Sub-tab */}
      {subTab === 'bulletin' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-orthodox-navy dark:text-orthodox-gold-light">
              {locale === 'ja' ? '教会だより・お知らせ' : locale === 'ru' ? 'Приходские новости и объявления' : 'Parish News & Announcements'}
            </h3>
            <span className="text-xs text-slate-400">
              {locale === 'ja' ? '最新の案内' : locale === 'ru' ? 'Последние события' : 'Latest updates'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PARISH_ANNOUNCEMENTS.map((ann) => (
              <div
                key={ann.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border transition-all ${
                  ann.important
                    ? 'border-2 border-orthodox-gold bg-amber-50/30 dark:bg-slate-900'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {ann.important && (
                    <span className="text-[10px] font-bold py-0.5 px-2 rounded-full bg-orthodox-burgundy text-white uppercase tracking-wider">
                      {locale === 'ja' ? '重要行事' : locale === 'ru' ? 'Важно' : 'Important'}
                    </span>
                  )}
                  {ann.category === 'sunday_school' && (
                    <span className="text-[10px] font-bold py-0.5 px-2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 uppercase tracking-wider">
                      {locale === 'ja' ? '日曜学校' : locale === 'ru' ? 'Воскресная школа' : 'Sunday School'}
                    </span>
                  )}
                  {ann.date && (
                    <span className="text-xs text-slate-400 font-medium">
                      {ann.date}
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2 leading-snug">
                  {ann.title[locale]}
                </h4>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {ann.content[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Visitor Guide Sub-tab */}
      {subTab === 'visit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Parish Overview & Emergency Pastoral Contact */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-4">
            {/* Parish Overview Card */}
            <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <img
                  src="/brand/church-seal-round.png"
                  alt="Osaka Orthodox Church Logo"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-orthodox-gold shadow-md object-cover flex-shrink-0"
                />
                <div className="text-center sm:text-left">
                  <h3 className="font-serif font-bold text-lg sm:text-2xl text-orthodox-navy dark:text-orthodox-gold-light">
                    {PARISH_INFO.name[locale]}
                  </h3>
                  <p className="text-xs sm:text-sm text-orthodox-burgundy dark:text-orthodox-gold font-serif mt-0.5 font-bold">
                    {locale === 'ja'
                      ? '聖生神女庇護聖堂（日本ハリストス正教会 西日本主教教区）'
                      : locale === 'ru'
                      ? 'Храм Покрова Пресвятой Богородицы (Западно-Японская епархия)'
                      : 'Holy Protection Temple (Western Diocese, Orthodox Church in Japan)'}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5">
                    {locale === 'ja'
                      ? '大阪ハリストス正教会は、日本正教会・西日本主教教区に属する歴史ある祈りの場です。正教会の信徒の方だけでなく、初めて見学される方や祈りを共にしたい方も心より歓迎いたします。'
                      : locale === 'ru'
                      ? 'Храм Покрова Пресвятой Богородицы в Осаке — приход Японской Православной Церкви (Западно-Японская епархия). Мы всегда рады православным христианам и всем ищущим Бога!'
                      : 'The Holy Protection Church in Osaka is a parish of the Orthodox Church in Japan (Western Diocese). We warmly welcome all faithful, visitors, and inquirers.'}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-orthodox-gold flex-shrink-0 mt-0.5" />
                  <span>{PARISH_INFO.address[locale]}</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Compass className="w-4 h-4 text-orthodox-gold flex-shrink-0 mt-0.5" />
                  <span>{PARISH_INFO.access[locale]}</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-orthodox-gold flex-shrink-0" />
                  <a href={`tel:${PARISH_INFO.phone}`} className="hover:text-orthodox-gold-dark hover:underline">
                    {PARISH_INFO.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Mail className="w-4 h-4 text-orthodox-gold flex-shrink-0" />
                  <a href={`mailto:${PARISH_INFO.email}`} className="hover:text-orthodox-gold-dark hover:underline">
                    {PARISH_INFO.email}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=大阪府吹田市山手町1-8-15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 py-2.5 px-4 rounded-xl bg-orthodox-gold text-orthodox-navy font-bold text-xs sm:text-sm hover:bg-orthodox-gold-dark shadow transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  <span>{locale === 'ja' ? 'Googleマップで開く' : locale === 'ru' ? 'Открыть на Google Maps' : 'Open in Google Maps'}</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>

            {/* Emergency Pastoral Contact Card */}
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl p-4 flex items-center space-x-3.5">
              <Phone className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-sm text-red-900 dark:text-red-200">
                  {locale === 'ja' ? '緊急の牧会連絡（臨終・病者訪問など）' : locale === 'ru' ? 'Срочные требы (причастие болящих, отпевание)' : 'Urgent Pastoral Needs'}
                </h5>
                <p className="text-xs text-red-700 dark:text-red-300 mt-0.5">
                  {locale === 'ja'
                    ? '緊急の病気のお見舞いや葬儀のご相談は、教会電話（06-6388-4512）またはメールにてご連絡ください。'
                    : locale === 'ru'
                    ? 'В экстренных случаях звоните по телефону храма 06-6388-4512 или пишите на почту.'
                    : 'For hospital visits or funeral arrangements, please call 06-6388-4512.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: First-Time Visitor Etiquette Guide */}
          <div className="lg:col-span-6 xl:col-span-5 bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3.5">
            <h4 className="font-serif font-bold text-base sm:text-lg text-orthodox-navy dark:text-orthodox-gold-light flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Info className="w-4 h-4 text-orthodox-gold" />
              <span>
                {locale === 'ja' ? '初めて正教会に来られる方へ（参拝の心得）' : locale === 'ru' ? 'Для тех, кто впервые в храме' : 'First-Time Visitors: Church Etiquette'}
              </span>
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <h5 className="font-bold text-slate-900 dark:text-white mb-1">
                  {locale === 'ja' ? '1. 服装について' : locale === 'ru' ? '1. Одежда' : '1. Attire'}
                </h5>
                <p>
                  {locale === 'ja'
                    ? '礼拝にふさわしい清楚で敬虔な服装でお越しください。露出の多い服装や短パンは控えめにされることをお勧めします。'
                    : locale === 'ru'
                    ? 'Просьба приходить в храм в скромной и благоговейной одежде.'
                    : 'Modest, respectful attire is appropriate for church services.'}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <h5 className="font-bold text-slate-900 dark:text-white mb-1">
                  {locale === 'ja' ? '2. ろうそくのお献げ' : locale === 'ru' ? '2. Свечи' : '2. Candles'}
                </h5>
                <p>
                  {locale === 'ja'
                    ? '聖堂入口でろうそくをいただき、イコン（聖像）の前でお祈りしながら灯します。献金箱にお心をお納めください。'
                    : locale === 'ru'
                    ? 'Свечи возжигаются перед святыми иконами с молитвой о здравии и упокоении.'
                    : 'Candles are placed before the holy icons with a quiet prayer for loved ones.'}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <h5 className="font-bold text-slate-900 dark:text-white mb-1">
                  {locale === 'ja' ? '3. 聖体礼儀の「領聖（聖体拝領）」について' : locale === 'ru' ? '3. Святое Причастие' : '3. Holy Communion'}
                </h5>
                <p>
                  {locale === 'ja'
                    ? '聖体と聖血の拝領（杯からの領聖）は、正教会で洗礼・傅膏機密を受け、告解による準備をした信徒に限られます。洗礼を受けておられない方や見学の方は、礼儀の最後に配られる「アンティドル（祝福されたパン）」を感謝してお受け取りいただけます。'
                    : locale === 'ru'
                    ? 'К Святой Чаше приступают только крещеные православные христиане, подготовившиеся постом и исповедью. Неправославные гости могут подойти к кресту и получить благословенный антидор (хлеб).'
                    : 'Holy Communion from the Chalice is reserved for prepared Orthodox Christians. All visitors are warmly welcome to receive the blessed bread (antidoron) distributed at the end.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
