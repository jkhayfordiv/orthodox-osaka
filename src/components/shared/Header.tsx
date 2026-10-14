'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  Music,
} from 'lucide-react';
import { Locale } from '../../lib/types';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
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
  const [portalsDropdownOpen, setPortalsDropdownOpen] = useState(false);

  const appDropdownRef = useRef<HTMLDivElement>(null);
  const portalsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | PointerEvent | TouchEvent) {
      const target = event.target as Node;
      if (appDropdownRef.current && !appDropdownRef.current.contains(target)) {
        setAppDropdownOpen(false);
      }
      if (portalsDropdownRef.current && !portalsDropdownRef.current.contains(target)) {
        setPortalsDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        setAppDropdownOpen(false);
        setPortalsDropdownOpen(false);
      }
    }

    document.addEventListener('pointerdown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const locales: { code: Locale; label: string; short: string }[] = [
    { code: 'ja', label: '日本語', short: 'JP' },
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'ru', label: 'Русский', short: 'RU' },
  ];

  // Public Website Primary Tabs
  const websiteNavItems: { id: AppTab; label: { ja: string; en: string; ru: string } }[] = [
    { id: 'home', label: { ja: '当教会', en: 'Our Parish', ru: 'О приходе' } },
    { id: 'history', label: { ja: '沿革', en: 'History', ru: 'История' } },
    { id: 'orthodoxy', label: { ja: '正教会とは', en: 'Orthodoxy', ru: 'О вере' } },
    { id: 'access', label: { ja: 'アクセス・聖堂見学', en: 'Visit & Access', ru: 'Визит и адрес' } },
    { id: 'sermons', label: { ja: '説教', en: 'Sermons', ru: 'Проповеди' } },
  ];

  // Daily Liturgical App Items
  const appNavItems: { id: AppTab; icon: React.ReactNode; label: { ja: string; en: string; ru: string }; desc: { ja: string; en: string; ru: string } }[] = [
    {
      id: 'today',
      icon: <Sparkles className="w-4 h-4 text-orthodox-gold" />,
      label: { ja: '今日（斎・聖人・日課）', en: 'Today’s Fast & Saints', ru: 'Сегодня: Пост и святые' },
      desc: { ja: '本日の祭日、斎の規定、聖書日課', en: 'Daily feast, fasting rule & readings', ru: 'Праздник дня, устав поста, чтения' },
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
      desc: { ja: '奉事日程、当番表、年間教会暦', en: 'Suita services, duties & liturgical calendar', ru: 'Службы, послушания и церковный календарь' },
    },
    {
      id: 'sermons',
      icon: <ScrollText className="w-4 h-4 text-amber-300" />,
      label: { ja: '主日説教・教会報', en: 'Sunday Sermons', ru: 'Воскресные проповеди' },
      desc: { ja: '松島神父による主日説教集・アーカイブ', en: 'Weekly homilies & pastoral reflections', ru: 'Проповеди о. Георгия и архив' },
    },
  ];

  // Dedicated Portals List
  const portalNavItems = [
    {
      href: '/george',
      icon: <BookOpen className="w-4 h-4 text-orthodox-gold" />,
      label: { ja: '司祭ゲオルギイ松島雄一 神学', en: 'Fr. George Archive', ru: 'О. Георгий Мацусима' },
      desc: { ja: '要理・聖師父・信仰問答Q&A', en: 'Catechism & Theology', ru: 'Богословие и ответы' },
    },
    {
      href: '/maria',
      icon: <Music className="w-4 h-4 text-indigo-300" />,
      label: { ja: 'マリア松島純子 聖歌譜', en: 'Matushka Maria Scores', ru: 'Церковные ноты Марии' },
      desc: { ja: '主日八調・大式全曲譜・聖歌論', en: 'Choral Scores & History', ru: 'Партитуры и история' },
    },
    {
      href: '/liturgy',
      icon: <ScrollText className="w-4 h-4 text-rose-300" />,
      label: { ja: '日本正教会 奉神礼・祈祷文集', en: 'Liturgical Texts', ru: 'Богослужебные тексты' },
      desc: { ja: '聖体礼儀式文・時課・PDF冊子', en: 'Services & Rubrics', ru: 'Чинопоследования' },
    },
    {
      href: '/westjapan',
      icon: <Compass className="w-4 h-4 text-amber-300" />,
      label: { ja: '西日本主教教区 案内', en: 'Western Diocese', ru: 'Западно-Японская епархия' },
      desc: { ja: '東海・近畿・中国・四国・九州', en: 'Parishes in West Japan', ru: 'Храмы епархии' },
    },
  ];

  const tabRoutes: Record<AppTab, string> = {
    home: '/',
    history: '/history',
    orthodoxy: '/orthodoxy',
    access: '/visit',
    sermons: '/sermons',
    today: '/app',
    calendar: '/app/calendar',
    parish: '/app/schedule',
    reader: '/app/prayers',
  };
  const routeTabs = Object.entries(tabRoutes) as [AppTab, string][];
  const routeTab = routeTabs.find(([, href]) => href === pathname)?.[0];
  const currentTab = pathname === '/app/sermons' ? 'sermons' : routeTab || activeTab;
  const isAppTabActive = pathname.startsWith('/app');

  const navigateTo = (tabId: AppTab, href = tabRoutes[tabId]) => {
    setActiveTab(tabId);
    router.push(href);
    setMobileMenuOpen(false);
    setAppDropdownOpen(false);
    setPortalsDropdownOpen(false);
  };

  const handleNavClick = (tabId: AppTab) => navigateTo(tabId);

  return (
    <header className="sticky top-0 z-40 bg-orthodox-navy text-white shadow-md border-b border-orthodox-gold/30">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-2.5 flex items-center justify-between">
        {/* Left: Church Icon & Title */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-2.5 cursor-pointer group select-none"
          title={locale === 'ja' ? '教会案内トップ' : 'Parish home'}
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
                ? '生神女庇護聖堂'
                : locale === 'ru'
                ? 'Храм Покрова Пресвятой Богородицы'
                : 'Holy Protection Temple'}
            </p>
          </div>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
          {websiteNavItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orthodox-gold ${
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
          <div className="relative" ref={appDropdownRef}>
            <button
              onClick={() => setAppDropdownOpen(!appDropdownOpen)}
              aria-expanded={appDropdownOpen}
              aria-controls="parish-app-menu"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border select-none cursor-pointer touch-manipulation active:scale-95 ${
                isAppTabActive
                  ? 'bg-orthodox-gold-dark/40 border-orthodox-gold text-orthodox-gold-light shadow-sm'
                  : 'bg-white/5 border-orthodox-gold/30 text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-orthodox-gold" />
              <span>{locale === 'ja' ? '信徒アプリ' : locale === 'ru' ? 'Церковная жизнь' : 'Parish App'}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${appDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {appDropdownOpen && (
              <div id="parish-app-menu" className="absolute right-0 mt-2 w-64 rounded-xl bg-orthodox-navy-dark border border-orthodox-gold/40 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 text-[10px] font-bold text-orthodox-gold-light uppercase tracking-wider border-b border-orthodox-gold/20">
                  {locale === 'ja' ? '日々の祈祷・教会暦機能' : locale === 'ru' ? 'Ежедневные богослужебные разделы' : 'Daily Liturgical Life'}
                </div>
                {appNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id, item.id === 'sermons' ? '/app/sermons' : tabRoutes[item.id])}
                    aria-current={currentTab === item.id ? 'page' : undefined}
                    className={`w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer touch-manipulation select-none ${
                      currentTab === item.id ? 'bg-white/15 text-orthodox-gold' : 'text-slate-200'
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

          {/* Portals & Diocese Dropdown */}
          <div className="relative" ref={portalsDropdownRef}>
            <button
              onClick={() => setPortalsDropdownOpen(!portalsDropdownOpen)}
              aria-expanded={portalsDropdownOpen}
              aria-controls="portals-menu"
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border select-none cursor-pointer touch-manipulation active:scale-95 bg-white/5 border-orthodox-gold/30 text-slate-200 hover:text-white hover:bg-white/10"
              title={locale === 'ja' ? '研究ポータル群・西日本主教教区' : 'Orthodox Portals & Diocese'}
            >
              <ScrollText className="w-3.5 h-3.5 text-orthodox-gold" />
              <span>{locale === 'ja' ? 'ポータル' : locale === 'ru' ? 'Порталы' : 'Portals'}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${portalsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {portalsDropdownOpen && (
              <div id="portals-menu" className="absolute right-0 mt-2 w-72 rounded-xl bg-orthodox-navy-dark border border-orthodox-gold/40 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 text-[10px] font-bold text-orthodox-gold-light uppercase tracking-wider border-b border-orthodox-gold/20">
                  {locale === 'ja' ? '研究ポータル群・西日本主教教区' : 'Portals & Western Diocese'}
                </div>
                {portalNavItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setPortalsDropdownOpen(false)}
                    className="w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-white/10 active:bg-white/20 transition-colors text-slate-200 cursor-pointer touch-manipulation select-none"
                  >
                    <div className="mt-0.5">{item.icon}</div>
                    <div>
                      <div className="text-xs font-semibold text-white">{item.label[locale]}</div>
                      <div className="text-[10px] text-slate-400">{item.desc[locale]}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right: Quick Language Switcher, Theme & Settings */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Typographic Language Switcher */}
          <div className="flex items-center rounded-md border border-orthodox-gold/40 bg-orthodox-navy-dark/90 px-1 py-0.5 text-xs shadow-xs">
            {locales.map((l, idx) => (
              <React.Fragment key={l.code}>
                {idx > 0 && <span className="text-white/40 text-[10px] px-0.5 select-none" aria-hidden="true">|</span>}
                <button
                  type="button"
                  onClick={() => setLocale(l.code)}
                  className={`px-2 py-1 rounded text-xs font-bold tracking-wider transition-all select-none cursor-pointer ${
                    locale === l.code
                      ? 'bg-orthodox-gold text-orthodox-navy shadow-xs'
                      : 'text-stone-200 hover:text-white hover:bg-white/10'
                  }`}
                  title={l.label}
                  aria-pressed={locale === l.code}
                >
                  {l.short}
                </button>
              </React.Fragment>
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
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            className="p-1.5 sm:p-2 rounded-lg bg-orthodox-navy-dark/70 text-orthodox-gold-light hover:text-white border border-orthodox-gold/30 lg:hidden transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="lg:hidden bg-orthodox-navy-dark border-t border-orthodox-gold/30 shadow-2xl px-4 py-4 space-y-4 animate-in fade-in slide-in-from-top-2">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between pb-3 border-b border-orthodox-gold/20">
            <span className="text-[10px] font-bold text-orthodox-gold-light uppercase tracking-wider">
              {locale === 'ja' ? '言語切替 (Language)' : 'Language'}
            </span>
            <div className="flex items-center rounded-md border border-orthodox-gold/40 bg-white/5 p-0.5 text-xs">
              {locales.map((l, idx) => (
                <React.Fragment key={l.code}>
                  {idx > 0 && <span className="text-white/30 text-[10px] px-1 select-none">|</span>}
                  <button
                    type="button"
                    onClick={() => {
                      setLocale(l.code);
                    }}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      locale === l.code
                        ? 'bg-orthodox-gold text-orthodox-navy font-bold shadow-xs'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    {l.short}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Website Section */}
          <div>
            <div className="text-[10px] font-bold text-orthodox-gold-light uppercase tracking-wider mb-2">
              {locale === 'ja' ? '教会案内・公式情報' : locale === 'ru' ? 'О приходе' : 'Church Information'}
            </div>
            <div className="flex flex-col space-y-1.5">
              {websiteNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-semibold text-left transition-colors ${
                    currentTab === item.id
                      ? 'bg-orthodox-gold text-orthodox-navy font-bold'
                      : 'bg-white/5 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  {item.label[locale]}
                </button>
              ))}
            </div>
          </div>

          {/* Portals & Diocese Section */}
          <div className="pt-2 border-t border-orthodox-gold/20">
            <div className="text-[10px] font-bold text-orthodox-gold-light uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ScrollText className="w-3.5 h-3.5 text-orthodox-gold" />
              <span>{locale === 'ja' ? '研究ポータル群・教区' : 'Orthodox Portals & Diocese'}</span>
            </div>
            <div className="flex flex-col space-y-1.5">
              {portalNavItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-lg text-xs text-left flex items-center gap-2.5 transition-colors bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
                >
                  <div>{item.icon}</div>
                  <div>
                    <div className="font-semibold text-white">{item.label[locale]}</div>
                    <div className="text-[10px] text-slate-400">{item.desc[locale]}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* App Section */}
          <div className="hidden">
            <div className="text-[10px] font-bold text-orthodox-gold-light uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orthodox-gold" />
              <span>{locale === 'ja' ? '信徒・参祷者アプリ' : locale === 'ru' ? 'Приложение для прихожан' : 'Parish Daily App'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {appNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id, item.id === 'sermons' ? '/app/sermons' : tabRoutes[item.id])}
                  className={`px-3 py-2.5 rounded-lg text-xs text-left flex items-center gap-2.5 transition-colors ${
                    currentTab === item.id
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
