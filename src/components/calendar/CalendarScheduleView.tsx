'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CalendarView } from './CalendarView';
import { ParishView } from '../parish/ParishView';
import { CalendarDays, Calendar as CalendarIcon, Church, Sparkles } from 'lucide-react';

interface CalendarScheduleViewProps {
  initialSubTab?: 'schedule' | 'calendar';
}

export function CalendarScheduleView({ initialSubTab = 'schedule' }: CalendarScheduleViewProps) {
  const { locale, activeTab } = useApp();
  const [subTab, setSubTab] = useState<'schedule' | 'calendar'>(
    activeTab === 'calendar' ? 'calendar' : initialSubTab
  );

  useEffect(() => {
    if (activeTab === 'calendar') {
      setSubTab('calendar');
    } else if (activeTab === 'parish') {
      setSubTab('schedule');
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-20">
      {/* Top Banner with Sub-tab Switcher */}
      <div className="bg-orthodox-navy border-b border-orthodox-gold/30 pt-6 pb-5 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-orthodox-gold flex items-center gap-1.5 mb-1">
              <CalendarIcon className="w-3.5 h-3.5 text-orthodox-gold" />
              <span>
                {locale === 'ja'
                  ? '大阪ハリストス正教会 聖暦・奉事'
                  : locale === 'ru'
                  ? 'Календарь и расписание служб'
                  : 'Liturgical Calendar & Schedule'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight">
              {subTab === 'schedule'
                ? locale === 'ja'
                  ? '吹田聖堂 奉事当番表・お知らせ'
                  : locale === 'ru'
                  ? 'Расписание богослужений и послушаний'
                  : 'Parish Schedule & Duties'
                : locale === 'ja'
                ? '年間正教会聖暦カレンダー'
                : locale === 'ru'
                ? 'Церковный богослужебный календарь'
                : 'Orthodox Liturgical Calendar'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-sans mt-0.5">
              {subTab === 'schedule'
                ? locale === 'ja'
                  ? '吹田聖堂の礼拝日程、愛餐当番グループ、月例パニヒダ'
                  : locale === 'ru'
                  ? 'Богослужения, клирос, трапезные послушания и объявления'
                  : 'Service hours, Agape meal duties & monthly parish notices'
                : locale === 'ja'
                  ? '正教会暦、十二大祭、斎の規程、日課聖書通読'
                  : locale === 'ru'
                  ? 'Праздники, посты, дневные чтения Священного Писания'
                  : 'Feasts, Paschalion, fasting rules & daily scripture readings'}
            </p>
          </div>

          {/* Sub-tab Pill Switcher */}
          <div className="flex bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 text-xs shadow-inner self-stretch sm:self-auto justify-center">
            <button
              onClick={() => setSubTab('schedule')}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold transition-all flex-1 sm:flex-initial select-none ${
                subTab === 'schedule'
                  ? 'bg-orthodox-gold text-orthodox-navy shadow-md scale-102'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>{locale === 'ja' ? '奉事日程・当番表' : locale === 'ru' ? 'Расписание служб' : 'Parish Schedule'}</span>
            </button>
            <button
              onClick={() => setSubTab('calendar')}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold transition-all flex-1 sm:flex-initial select-none ${
                subTab === 'calendar'
                  ? 'bg-orthodox-gold text-orthodox-navy shadow-md scale-102'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>{locale === 'ja' ? '聖暦カレンダー' : locale === 'ru' ? 'Священный календарь' : 'Liturgical Calendar'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Render Active View */}
      {subTab === 'schedule' ? <ParishView /> : <CalendarView />}
    </div>
  );
}
