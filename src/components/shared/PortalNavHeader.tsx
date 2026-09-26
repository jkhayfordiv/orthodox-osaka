'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import {
  Church,
  BookOpen,
  Music,
  Scroll,
  Compass,
  Moon,
  Sun,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { Locale } from '../../lib/types';

interface PortalNavHeaderProps {
  currentPortal: 'osaka' | 'george' | 'maria' | 'liturgy' | 'westjapan';
}

export function PortalNavHeader({ currentPortal }: PortalNavHeaderProps) {
  const { locale, setLocale, theme, setTheme } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalsDropdownOpen, setPortalsDropdownOpen] = useState(false);

  const locales: { code: Locale; label: string; flag: string }[] = [
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  ];

  const portals = [
    {
      id: 'osaka' as const,
      href: '/',
      title: { ja: '大阪ハリストス正教会', en: 'Osaka Orthodox Church', ru: 'Осакский приход' },
      shortTitle: { ja: '大阪教会', en: 'Osaka Parish', ru: 'Осака' },
      icon: Church,
      badge: { ja: '生神女庇護聖堂', en: 'Parish & App', ru: 'Приход' },
    },
    {
      id: 'george' as const,
      href: '/george',
      title: { ja: '司祭ゲオルギイ松島雄一 神学アーカイブ', en: 'Fr. George Theological Library', ru: 'Труды прот. Георгия' },
      shortTitle: { ja: '司祭ゲオルギイ神学', en: 'Fr. George', ru: 'О. Георгий' },
      icon: BookOpen,
      badge: { ja: '要理・聖師父・Q&A', en: 'Catechism & Fathers', ru: 'Богословие' },
    },
    {
      id: 'maria' as const,
      href: '/maria',
      title: { ja: 'マリア松島純子 聖歌ポータル', en: 'Matushka Maria Sacred Music', ru: 'Церковные ноты Марии' },
      shortTitle: { ja: 'マリア聖歌譜', en: 'Sacred Music', ru: 'Ноты' },
      icon: Music,
      badge: { ja: '八調譜・大式・聖歌論', en: 'Scores & History', ru: 'Партитуры' },
    },
    {
      id: 'liturgy' as const,
      href: '/liturgy',
      title: { ja: '日本正教会 奉神礼・祈祷文ポータル', en: 'Orthodox Liturgy & Prayers', ru: 'Богослужебные тексты' },
      shortTitle: { ja: '奉神礼集', en: 'Liturgy', ru: 'Литургия' },
      icon: Scroll,
      badge: { ja: '聖体礼儀・時課・式文', en: 'Services & Rubrics', ru: 'Чинопоследования' },
    },
    {
      id: 'westjapan' as const,
      href: '/westjapan',
      title: { ja: '日本正教会 西日本主教教区', en: 'Western Diocese of Japan', ru: 'Западно-Японская епархия' },
      shortTitle: { ja: '西日本主教区', en: 'Diocese', ru: 'Епархия' },
      icon: Compass,
      badge: { ja: '各地の聖堂案内', en: 'Parishes & Map', ru: 'Храмы епархии' },
    },
  ];

  const currentInfo = portals.find(p => p.id === currentPortal) || portals[0];
  const CurrentIcon = currentInfo.icon;

  return (
    <header className="sticky top-0 z-40 bg-orthodox-navy text-white shadow-md border-b border-orthodox-gold/30 backdrop-blur-md bg-orthodox-navy/95 transition-colors">
      {/* Top Cross-Portal Switcher Bar (Desktop & Tablet) */}
      <div className="hidden md:block bg-orthodox-navy-dark/90 border-b border-orthodox-gold/20 text-xs px-4 sm:px-6 lg:px-8 py-1.5">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
            <span className="text-[10px] uppercase font-bold text-orthodox-gold tracking-wider mr-2 flex-shrink-0">
              {locale === 'ja' ? '正教ポータル群:' : 'Orthodox Portals:'}
            </span>
            {portals.map((p) => {
              const PIcon = p.icon;
              const isCurrent = p.id === currentPortal;
              return (
                <Link
                  key={p.id}
                  href={p.href}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-colors whitespace-nowrap ${
                    isCurrent
                      ? 'bg-orthodox-gold text-orthodox-navy font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <PIcon className="w-3.5 h-3.5" />
                  <span>{p.shortTitle[locale]}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-[11px] text-orthodox-gold-light/80 flex-shrink-0">
            <span>orthodox-jp.com</span>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Portal Identity Branding */}
          <Link
            href={currentInfo.href}
            className="flex items-center space-x-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-orthodox-gold/20 border border-orthodox-gold/40 flex items-center justify-center text-orthodox-gold-light group-hover:bg-orthodox-gold group-hover:text-orthodox-navy transition-all shadow-xs flex-shrink-0">
              <CurrentIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xs font-bold uppercase tracking-wider text-orthodox-gold">
                  {currentInfo.badge[locale]}
                </span>
              </div>
              <h1 className="font-serif font-bold text-sm sm:text-base lg:text-lg text-white group-hover:text-orthodox-gold-light transition-colors leading-tight">
                {currentInfo.title[locale]}
              </h1>
            </div>
          </Link>

          {/* Right Controls: Locales, Dark Mode, Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Quick Language Switcher */}
            <div className="flex bg-orthodox-navy-dark/70 rounded-lg p-0.5 border border-orthodox-gold/30 text-xs">
              {locales.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  className={`px-2 py-1 rounded-md transition-all font-medium flex items-center space-x-1 ${
                    locale === l.code
                      ? 'bg-orthodox-gold text-orthodox-navy font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                  title={l.label}
                >
                  <span className="text-xs">{l.flag}</span>
                  <span className="hidden sm:inline text-2xs uppercase">{l.code}</span>
                </button>
              ))}
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-orthodox-navy-dark/70 border border-orthodox-gold/30 text-orthodox-gold hover:text-white hover:bg-white/10 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-orthodox-navy-dark/70 border border-orthodox-gold/30 text-slate-200 hover:text-white focus:outline-none"
              aria-label="Toggle Portal Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-orthodox-navy-dark border-b border-orthodox-gold/30 px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top-2">
          <div className="text-[10px] font-bold text-orthodox-gold uppercase tracking-wider px-1">
            {locale === 'ja' ? '関連ポータル一覧' : 'Portals & Archives'}
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {portals.map((p) => {
              const PIcon = p.icon;
              const isCurrent = p.id === currentPortal;
              return (
                <Link
                  key={p.id}
                  href={p.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-xl flex items-center justify-between transition-colors ${
                    isCurrent
                      ? 'bg-orthodox-gold text-orthodox-navy font-bold'
                      : 'bg-white/5 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <PIcon className="w-4 h-4 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold">{p.title[locale]}</div>
                      <div className={`text-[10px] ${isCurrent ? 'text-orthodox-navy/80' : 'text-slate-400'}`}>
                        {p.badge[locale]}
                      </div>
                    </div>
                  </div>
                  {isCurrent && (
                    <span className="text-[10px] bg-orthodox-navy text-orthodox-gold px-2 py-0.5 rounded-full font-bold">
                      {locale === 'ja' ? '表示中' : 'Current'}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
