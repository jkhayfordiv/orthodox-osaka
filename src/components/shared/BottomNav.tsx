'use client';

import React from 'react';
import { useApp, AppTab } from '../../context/AppContext';
import { Home, Calendar as CalendarIcon, Church, BookOpen } from 'lucide-react';

export function BottomNav() {
  const { activeTab, setActiveTab, locale } = useApp();

  const tabs: { id: AppTab; icon: React.ReactNode; label: { ja: string; en: string; ru: string } }[] = [
    {
      id: 'today',
      icon: <Home className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: { ja: '今日', en: 'Today', ru: 'Сегодня' },
    },
    {
      id: 'calendar',
      icon: <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: { ja: '聖暦', en: 'Calendar', ru: 'Календарь' },
    },
    {
      id: 'parish',
      icon: <Church className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: { ja: '教会', en: 'Parish', ru: 'Приход' },
    },
    {
      id: 'reader',
      icon: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: { ja: '祈祷書', en: 'Reader', ru: 'Молитвы' },
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-orthodox-navy border-t border-orthodox-gold/40 shadow-2xl safe-area-bottom">
      <div className="max-w-4xl mx-auto flex items-center justify-around h-16 sm:h-18 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all h-full min-h-[56px] focus:outline-none select-none ${
                isActive
                  ? 'text-orthodox-gold font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1 rounded-full transition-colors ${
                  isActive ? 'bg-orthodox-gold/20' : ''
                }`}
              >
                {tab.icon}
              </div>
              <span className="text-[11px] sm:text-xs tracking-tight mt-0.5">
                {tab.label[locale]}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
