'use client';

import React, { useState } from 'react';
import { useApp, AppTab } from '../../context/AppContext';
import { PARISH_INFO } from '../../data/terminology';
import {
  Settings,
  Moon,
  Sun,
  Home,
  Calendar as CalendarIcon,
  Church,
  BookOpen,
  Menu,
  X,
  Compass,
  FileText,
  Sparkles,
  ChevronDown,
  Navigation,
  ScrollText,
} from 'lucide-react';
import { Locale } from '../../lib/types';

export function Header() {
  const {
    locale,
    setLocale,
    theme,
    setTheme,
    setSettingsOpen,
    activeTab,
    setActiveTab,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appDropdownOpen, setAppDropdownOpen] = useState(false);

  const locales: { code: Locale; label: string; flag: string }[] = [
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  ];

  // Public Website Primary Tabs
  const websiteNavItems: { id: AppTab; label: { ja: string; en: string; ru: string } }[] = [
    { id: 'home', label: { ja: '教会案内', en: 'Our Parish', ru: 'О приходе' } },
    { id: 'history', label: { ja: '教会の歴史', en: 'History', ru: 'История' } },
    { id: 'orthodoxy', label: { ja: '正教会とは？', en: 'Orthodoxy', ru: 'О вере' } },
    { id: 'access', label: { ja: '交通・見学', en: 'Visit & Access', ru: 'Визит и адрес' } },
    { id: 'sermons', label: { ja: '説教・教会報', en: 'Sermons', ru: 'Проповеди' } },
  ];

  // Daily Liturgical App Items
  const appNavItems: { id: AppTab; icon: React.ReactNode; label: { ja: string; en: string; ru: string }; desc: { ja: string; en: string; ru: string } }[] = [
    {
      id: 'today',
      icon: <Sparkles className="w-4 h-4 text-orthodox-gold" />,
      label: { ja: '今日（斎・聖人・日課）', en: 'Today’s Fast & Saints', ru: 'Сегодня: Пост и святые' },
      desc: { ja: '本日の祭日、斎の規則、聖書通読', en: 'Daily feast, fasting rule & readings', ru: 'Праздник дня, устав поста, чтения' },
    },
    {
      id: 'reader',
      icon: <BookOpen className="w-4 h-4 text-emerald-400" />,
      label: { ja: '祈祷書・聖体礼儀', en: 'Prayers & Liturgy', ru: 'Молитвослов' },
      desc: { ja: '朝夕の祈り、聖体礼儀、ディプティフ', en: 'Daily prayers, Liturgy & diptychs', ru: 'Утренние/вечерние молитвы, Литургия' },
    },
    {
      id: 'calendar',
      icon: <CalendarIcon className="w-4 h-4 text-indigo-400" />,
      label: { ja: '聖暦・奉事日程', en: 'Schedule & Calendar', ru: 'Расписание и календарь' },
      desc: { ja: '吹田礼拝日程、当番表、年間聖暦', en: 'Suita services, duties & liturgical calendar', ru: 'Службы, послушания и церковный календарь' },
    },
    {
      id: 'sermons',
      icon: <ScrollText className="w-4 h-4 text-amber-300" />,
      label: { ja: '主日説教・教会報', en: 'Sunday Sermons', ru: 'Воскресные проповеди' },
      desc: { ja: '松島神父による主日説教集・アーカイブ', en: 'Weekly homilies & pastoral reflections', ru: 'Проповеди о. Георгия и архив' },
    },
  ];

  const isAppTabActive = ['today', 'calendar', 'parish', 'reader', 'sermons'].includes(activeTab);

  const handleNavClick = (tabId: AppTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setAppDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-orthodox-navy text-white shadow-md border-b border-orthodox-gold/30">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-2.5 flex items-center justify-between">
        {/* Left: Church Icon & Title */}
        <div
          onClick={() => handleNavClick('today')}
          className="flex items-center space-x-2.5 cursor-pointer group select-none"
          title={locale === 'ja' ? '今日（ホーム）' : 'Today (Home)'}
        >
          <img
            src="/brand/church-seal-round.png"
            alt="Osaka Orthodox Church Emblem"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-orthodox-gold shadow-sm group-hover:scale-105 transition-transform flex-shrink-0"
          />
          <div>
            <h1 className="font-serif font-bold text-sm sm:text-base leading-tight tracking-wide text-orthodox-gold-light group-hover:text-white transition-colors">
              {PARISH_INFO.shortName[locale]}
            </h1>
            <p className="text-[10px] sm:text-[11px] text-slate-300 font-sans tracking-tight">
              {locale === 'ja'
                ? '聖生神女庇護聖堂'
                : locale === 'ru'
                ? 'Храм Покрова Пресвятой Богородицы'
                : 'Holy Protection Temple'}
            </p>
          </div>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
          {websiteNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all select-none ${
                  isActive
                    ? 'bg-orthodox-gold text-orthodox-navy shadow-sm'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label[locale]}
              </button>
            );
          })}

          {/* Parish App Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setAppDropdownOpen(!appDropdownOpen)}
              onBlur={() => setTimeout(() => setAppDropdownOpen(false), 200)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border select-none ${
                isAppTabActive
                  ? 'bg-orthodox-gold-dark/40 border-orthodox-gold text-orthodox-gold-light shadow-sm'
                  : 'bg-white/5 border-orthodox-gold/30 text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-orthodox-gold" />
              <span>{locale === 'ja' ? '信徒アプリ' : locale === 'ru' ? 'Церковная жизнь' : 'Parish App'}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${appDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {appDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-orthodox-navy-dark border border-orthodox-gold/40 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 text-[10px] font-bold text-orthodox-gold-light uppercase tracking-wider border-b border-orthodox-gold/20">
                  {locale === 'ja' ? '日々の祈祷・教会暦機能' : locale === 'ru' ? 'Ежедневные богослужебные разделы' : 'Daily Liturgical Life'}
                </div>
                {appNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-white/10 transition-colors ${
                      activeTab === item.id ? 'bg-white/15 text-orthodox-gold' : 'text-slate-200'
                    }`}
                  >
                    <div className="mt-0.5">{item.icon}</div>
                    <div>
                      <div className="text-xs font-semibold">{item.label[locale]}</div>
                      <div className="text-[10px] text-slate-400">{item.desc[locale]}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right: Quick Language Switcher, Theme & Settings */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Language Selector Pills */}
          <div className="flex bg-orthodox-navy-dark/70 rounded-lg p-0.5 border border-orthodox-gold/30 text-xs">
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => setLocale(l.code)}
                className={`px-1.5 sm:px-2 py-1 rounded-md transition-all font-medium flex items-center space-x-1 ${
                  locale === l.code
                    ? 'bg-orthodox-gold text-orthodox-navy font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
                title={l.label}
              >
                <span>{l.flag}</span>
                <span className="hidden sm:inline text-[11px]">{l.code.toUpperCase()}</span>
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 sm:p-2 rounded-lg bg-orthodox-navy-dark/70 text-orthodox-gold-light hover:text-white border border-orthodox-gold/30 transition-colors"
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>


          {/* Settings Button */}
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-1.5 sm:p-2 rounded-lg bg-orthodox-navy-dark/70 text-orthodox-gold-light hover:text-white border border-orthodox-gold/30 transition-colors"
            aria-label="Settings"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 rounded-lg bg-orthodox-navy-dark/70 text-orthodox-gold-light hover:text-white border border-orthodox-gold/30 lg:hidden transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-orthodox-navy-dark border-t border-orthodox-gold/30 shadow-2xl px-4 py-4 space-y-4 animate-in fade-in slide-in-from-top-2">
          {/* Website Section */}
          <div>
            <div className="text-[10px] font-bold text-orthodox-gold-light uppercase tracking-wider mb-2">
              {locale === 'ja' ? '教会公式案内' : locale === 'ru' ? 'О приходе' : 'Church Information'}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {websiteNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-orthodox-gold text-orthodox-navy font-bold'
                      : 'bg-white/5 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  {item.label[locale]}
                </button>
              ))}
            </div>
          </div>

          {/* App Section */}
          <div className="pt-2 border-t border-orthodox-gold/20">
            <div className="text-[10px] font-bold text-orthodox-gold-light uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orthodox-gold" />
              <span>{locale === 'ja' ? '信徒・参祷者アプリ' : locale === 'ru' ? 'Приложение для прихожан' : 'Parish Daily App'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {appNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2.5 rounded-lg text-xs text-left flex items-center gap-2.5 transition-colors ${
                    activeTab === item.id
                      ? 'bg-orthodox-gold text-orthodox-navy font-bold'
                      : 'bg-white/5 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <div>{item.icon}</div>
                  <div>
                    <div className="font-semibold">{item.label[locale]}</div>
                    <div className="text-[10px] opacity-75">{item.desc[locale]}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
