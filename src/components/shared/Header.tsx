'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { PARISH_INFO } from '../../data/terminology';
import { Settings, Moon, Sun } from 'lucide-react';
import { Locale } from '../../lib/types';

export function Header() {
  const { locale, setLocale, theme, setTheme, setSettingsOpen } = useApp();

  const locales: { code: Locale; label: string; flag: string }[] = [
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-orthodox-navy text-white shadow-md border-b border-orthodox-gold/30">
      <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Left: Church Icon & Title */}
        <div className="flex items-center space-x-2.5">
          <img
            src="/brand/church-seal-round.png"
            alt="Osaka Orthodox Church Emblem"
            className="w-9 h-9 rounded-full object-cover border border-orthodox-gold shadow-sm select-none flex-shrink-0"
          />
          <div>
            <h1 className="font-serif font-bold text-base sm:text-lg leading-tight tracking-wide text-orthodox-gold-light">
              {PARISH_INFO.shortName[locale]}
            </h1>
            <p className="text-[11px] text-slate-300 font-sans tracking-tight">
              {locale === 'ja'
                ? '聖生神女庇護聖堂'
                : locale === 'ru'
                ? 'Храм Покрова Пресвятой Богородицы'
                : 'Holy Protection Temple'}
            </p>
          </div>
        </div>

        {/* Right: Quick Language Switcher & Settings */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Language Selector Pills */}
          <div className="flex bg-orthodox-navy-dark/70 rounded-lg p-0.5 border border-orthodox-gold/30 text-xs">
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => setLocale(l.code)}
                className={`px-2 py-1 rounded-md transition-all font-medium flex items-center space-x-1 ${
                  locale === l.code
                    ? 'bg-orthodox-gold text-orthodox-navy font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
                title={l.label}
              >
                <span>{l.flag}</span>
                <span className="hidden sm:inline">{l.label}</span>
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-orthodox-navy-dark/70 text-orthodox-gold-light hover:text-white border border-orthodox-gold/30 transition-colors"
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Settings Button */}
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-2 rounded-lg bg-orthodox-navy-dark/70 text-orthodox-gold-light hover:text-white border border-orthodox-gold/30 transition-colors"
            aria-label="Settings"
            title="Settings / 設定"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
