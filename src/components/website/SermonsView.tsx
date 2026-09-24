'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ArchivedSermon } from '../../data/sermonsArchive';
import { PARISH_INFO } from '../../data/terminology';
import {
  filterVisibleSermons,
  isSermonAvailableToPublic,
  getSermonPublicReleaseDate,
} from '../../lib/sermonSchedule';
import { SermonEditModal } from './SermonEditModal';
import { SermonPasswordModal } from './SermonPasswordModal';
import {
  BookOpen,
  Calendar,
  Search,
  X,
  ExternalLink,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Clock,
  Lock,
  Unlock,
  Edit3,
  Plus,
  ShieldCheck,
} from 'lucide-react';
import { Locale } from '../../lib/types';

// Helper to sanitize WordPress HTML while preserving sacred book layout and callouts
function sanitizeSermonHtml(rawHtml: string): string {
  if (!rawHtml) return '';
  return rawHtml
    // Remove outer fixed-width div wrapper if present to allow responsive container
    .replace(/^\s*<div[^>]*style="[^"]*font-family:[^"]*"[^>]*>/i, '')
    .replace(/<\/div>\s*$/i, '')
    // Remove empty comment paragraphs
    .replace(/<p>\s*<!--[^>]*-->\s*<\/p>/gi, '')
    .replace(/<!--[^>]*-->/gi, '')
    // Clean redundant empty paragraphs
    .replace(/<p>\s*(&nbsp;)?\s*<\/p>/gi, '')
    // Fix broken wrapping tags
    .replace(/<p>\s*<div/gi, '<div')
    .replace(/<\/div>\s*<\/p>/gi, '</div>');
}

export function SermonsView() {
  const { locale, setActiveTab, sermons, isSermonAdmin, targetSermonId, setTargetSermonId } = useApp();

  const [activeLang, setActiveLang] = useState<Locale>(locale);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSermonId, setSelectedSermonId] = useState<number | null>(null);

  // Admin Modals State
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState<boolean>(false);
  const [editingSermon, setEditingSermon] = useState<ArchivedSermon | null>(null);

  // Sync active language when site locale changes
  useEffect(() => {
    setActiveLang(locale);
    setSelectedSermonId(null);
  }, [locale]);

  // Handle targetSermonId navigation (e.g. from Today view button)
  useEffect(() => {
    if (targetSermonId !== null) {
      setSelectedSermonId(targetSermonId);
      const found = sermons.find((s) => s.id === targetSermonId);
      if (found) {
        setActiveLang(found.language);
      }
      setTargetSermonId(null);
    }
  }, [targetSermonId, sermons, setTargetSermonId]);

  // Available sermons: unreleased upcoming Sunday sermons are hidden from non-admin visitors until Saturday 06:00 JST
  const availableSermons = useMemo(() => {
    return filterVisibleSermons(sermons, isSermonAdmin);
  }, [sermons, isSermonAdmin]);

  // Available years from available sermons
  const years = useMemo(() => {
    const ySet = new Set<string>();
    for (const s of availableSermons) {
      if (s.date && s.date.length >= 4) {
        ySet.add(s.date.substring(0, 4));
      }
    }
    return Array.from(ySet).sort().reverse();
  }, [availableSermons]);

  // Filtered sermons
  const filteredSermons = useMemo(() => {
    return availableSermons.filter((sermon) => {
      // Language filter
      if (activeLang && sermon.language !== activeLang) {
        return false;
      }
      // Year filter
      if (selectedYear !== 'all' && !sermon.date.startsWith(selectedYear)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchesTitle = sermon.title.toLowerCase().includes(q);
        const matchesContent = sermon.contentText.toLowerCase().includes(q);
        const matchesDate = sermon.date.includes(q);
        if (!matchesTitle && !matchesContent && !matchesDate) {
          return false;
        }
      }
      return true;
    });
  }, [availableSermons, activeLang, selectedYear, searchQuery]);

  const activeSermon: ArchivedSermon | undefined = useMemo(() => {
    if (selectedSermonId !== null) {
      const found = availableSermons.find((s) => s.id === selectedSermonId);
      // Strictly enforce that the active sermon must match the active language!
      if (found && found.language === activeLang) {
        return found;
      }
      // If language changed, try to find the counterpart sermon for the exact same date in the new language
      if (found) {
        const matchingSermon = filteredSermons.find((s) => s.date === found.date);
        if (matchingSermon) return matchingSermon;
      }
    }
    return filteredSermons[0] || availableSermons.find((s) => s.language === activeLang) || availableSermons[0];
  }, [selectedSermonId, filteredSermons, availableSermons, activeLang]);

  // Index of active sermon within currently filtered list for Prev/Next navigation
  const currentIndex = useMemo(() => {
    if (!activeSermon) return -1;
    return filteredSermons.findIndex((s) => s.id === activeSermon.id);
  }, [filteredSermons, activeSermon]);

  // Newer sermon (previous index because list is sorted descending by date)
  const newerSermon = currentIndex > 0 ? filteredSermons[currentIndex - 1] : null;
  // Older sermon (next index)
  const olderSermon =
    currentIndex >= 0 && currentIndex < filteredSermons.length - 1
      ? filteredSermons[currentIndex + 1]
      : null;

  const handleSelectLanguage = (l: Locale) => {
    setActiveLang(l);
    setSelectedSermonId(null);
  };

  const handleSelectSermon = (sermon: ArchivedSermon) => {
    setSelectedSermonId(sermon.id);
    const el = document.getElementById('sermon-reader');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const cleanContentHtml = useMemo(() => {
    if (!activeSermon) return '';
    return sanitizeSermonHtml(activeSermon.contentHtml);
  }, [activeSermon]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-20">
      {/* Global CSS for book-like sacred reading typography */}
      <style jsx global>{`
        .sermon-reader-content {
          font-family: var(--font-serif), 'Hiragino Mincho ProN', 'Yu Mincho', 'Georgia', serif;
          line-height: 1.95;
          font-size: 1.0625rem;
          color: #334155;
        }
        .dark .sermon-reader-content {
          color: #cbd5e1;
        }
        .sermon-reader-content p {
          margin-bottom: 1.5rem;
        }
        .sermon-reader-content h2 {
          font-family: var(--font-serif), 'Hiragino Mincho ProN', 'Yu Mincho', 'Georgia', serif;
          color: #1a3a5f;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .dark .sermon-reader-content h2 {
          color: #fde68a !important;
        }
        .sermon-reader-content h3 {
          font-family: var(--font-serif), 'Hiragino Mincho ProN', 'Yu Mincho', 'Georgia', serif;
          color: #64748b;
        }
        .dark .sermon-reader-content h3 {
          color: #94a3b8 !important;
        }
        /* Callouts (Scripture quotes) */
        .sermon-reader-content [style*="border-left"] {
          border-left-color: #1a3a5f !important;
          border-left-width: 4px !important;
          background-color: #f8fafc !important;
          border-radius: 0 12px 12px 0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        .dark .sermon-reader-content [style*="border-left"] {
          border-left-color: #d97706 !important;
          background-color: rgba(30, 41, 59, 0.8) !important;
          color: #f1f5f9 !important;
        }
        /* Closing reflection box */
        .sermon-reader-content [style*="background-color: #eef2f5"] {
          background-color: #f1f5f9 !important;
          border: 1px solid #e2e8f0;
          border-radius: 16px !important;
        }
        .dark .sermon-reader-content [style*="background-color: #eef2f5"] {
          background-color: rgba(30, 41, 59, 0.9) !important;
          border-color: rgba(217, 119, 6, 0.3) !important;
        }
        .dark .sermon-reader-content [style*="background-color: #eef2f5"] p {
          color: #fde68a !important;
        }
        /* Vigil greeting centered */
        .dark .sermon-reader-content [style*="color: #2c3e50"] {
          color: #fde68a !important;
        }
      `}</style>

      {/* Atmospheric Twilight Hero Banner with Church Dome */}
      <div className="relative text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[300px] flex items-center">
        {/* Background Image: Evening photo of church dome & cross */}
        <div className="absolute inset-0 z-0">
          <img
            src="/church-photos/church-sunset-bright.jpg"
            alt="Osaka Orthodox Church Dome at Sunset"
            className="w-full h-full object-cover object-center scale-105 filter brightness-90"
          />
        </div>
        {/* Rich Orthodox Dusk Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-orthodox-navy/75 z-0" />

        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto w-full relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orthodox-gold/25 backdrop-blur-md border border-orthodox-gold/40 text-orthodox-gold-light text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>
              {locale === 'ja'
                ? `吹田聖堂 主日説教全集（495編）`
                : locale === 'ru'
                ? `Архив воскресных проповедей (495 бесед)`
                : `Sunday Sermons & Homilies (495 homilies)`}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3 max-w-4xl drop-shadow-md">
            {activeSermon ? activeSermon.title : locale === 'ja' ? '主日説教・司祭のメッセージ' : locale === 'ru' ? 'Воскресные проповеди' : 'Sunday Sermons & Messages'}
          </h1>
          <p className="text-amber-100/90 text-xs sm:text-sm font-medium tracking-wide flex items-center gap-2">
            <span>{PARISH_INFO.name[locale]}</span>
            <span>•</span>
            <span className="font-mono">{activeSermon?.date}</span>
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Search & Filter Toolbar */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  locale === 'ja'
                    ? '説教を検索（タイトル・本文・聖書箇所）...'
                    : locale === 'ru'
                    ? 'Поиск по проповедям и чтениям...'
                    : 'Search sermons by keyword, gospel, or date...'
                }
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 border border-transparent focus:border-orthodox-gold focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Language & Year Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
              {/* Language Pills */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
                {(['ja', 'en', 'ru'] as Locale[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => handleSelectLanguage(l)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      activeLang === l
                        ? 'bg-orthodox-gold text-orthodox-navy shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {l === 'ja' ? '🇯🇵 日本語' : l === 'en' ? '🇬🇧 English' : '🇷🇺 Русский'}
                  </button>
                ))}
              </div>

              {/* Year Pills */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setSelectedYear('all')}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                    selectedYear === 'all'
                      ? 'bg-white dark:bg-slate-700 text-orthodox-navy dark:text-white font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {locale === 'ja' ? '全期間' : locale === 'ru' ? 'Все' : 'All'}
                </button>
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => setSelectedYear(y)}
                    className={`px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                      selectedYear === y
                        ? 'bg-white dark:bg-slate-700 text-orthodox-navy dark:text-white font-bold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count & Admin Toolbar */}
          <div className="text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800 pt-2.5">
            <div className="flex items-center gap-2">
              <span>
                {locale === 'ja'
                  ? `${filteredSermons.length} 件の説教が見つかりました`
                  : locale === 'ru'
                  ? `Найдено ${filteredSermons.length} проповедей`
                  : `Showing ${filteredSermons.length} sermons`}
              </span>
              {searchQuery && (
                <span className="text-orthodox-gold font-medium">
                  &ldquo;{searchQuery}&rdquo;
                </span>
              )}
            </div>

            {/* Admin Controls */}
            <div className="flex items-center gap-2">
              {isSermonAdmin ? (
                <>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-3xs font-bold border border-emerald-300 dark:border-emerald-800">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{locale === 'ja' ? '説教管理者認証中' : 'Sermon Admin Active'}</span>
                  </span>
                  <button
                    onClick={() => {
                      setEditingSermon(null);
                      setEditModalOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-orthodox-gold text-orthodox-navy font-bold text-2xs flex items-center gap-1 shadow-xs hover:bg-orthodox-gold-light transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{locale === 'ja' ? '新規説教作成' : 'New Sermon'}</span>
                  </button>
                  <button
                    onClick={() => setPasswordModalOpen(true)}
                    className="text-2xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline"
                  >
                    {locale === 'ja' ? 'ログアウト' : 'Log out'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setEditingSermon(null);
                    setPasswordModalOpen(true);
                  }}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-orthodox-gold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-2xs font-medium flex items-center gap-1 transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>{locale === 'ja' ? '管理者ログイン' : 'Admin Login'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 12-Column Responsive Layout: Reader (8 cols) + Directory (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 8 COLUMNS: Active Sermon Sacred Reader */}
          <div id="sermon-reader" className="lg:col-span-8 space-y-6">
            {activeSermon ? (
              <article className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-[#fdfdfc] dark:bg-slate-900 p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
                {/* Meta bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap items-center gap-2">
                    <Calendar className="w-4 h-4 text-orthodox-gold" />
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                      {activeSermon.date}
                    </span>

                    {/* Pre-release status badge */}
                    {!isSermonAvailableToPublic(activeSermon) ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 text-2xs font-semibold border border-amber-300/40">
                        <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        <span>
                          {locale === 'ja'
                            ? '土曜朝6:00 (JST) に一般公開'
                            : locale === 'ru'
                            ? 'Публикация: в субботу в 6:00 (JST)'
                            : 'Public release: Saturday 6:00 AM JST'}
                        </span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-3xs font-semibold border border-emerald-300/30">
                        {locale === 'ja' ? '公開中' : 'Public'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5">
                    {/* Admin edit button */}
                    {isSermonAdmin ? (
                      <button
                        onClick={() => {
                          setEditingSermon(activeSermon);
                          setEditModalOpen(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-orthodox-gold/20 hover:bg-orthodox-gold/30 border border-orthodox-gold text-orthodox-navy dark:text-orthodox-gold text-2xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{locale === 'ja' ? '説教を編集' : 'Edit Sermon'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingSermon(activeSermon);
                          setPasswordModalOpen(true);
                        }}
                        className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-orthodox-gold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-3xs font-medium flex items-center gap-1 transition-colors"
                        title={locale === 'ja' ? '管理者ログイン' : 'Admin Login'}
                      >
                        <Lock className="w-3 h-3" />
                        <span>{locale === 'ja' ? '管理者編集' : 'Admin Edit'}</span>
                      </button>
                    )}

                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">
                      {activeSermon.language}
                    </span>
                    {activeSermon.link && (
                      <a
                        href={activeSermon.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 inline-flex items-center gap-1"
                        title="View original on orthodox-jp.com"
                      >
                        <span className="text-[11px] hidden sm:inline">WordPress</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* THE HOLY ICON (Featured Image of the Sunday) */}
                {activeSermon.iconImage && (
                  <div className="flex flex-col items-center justify-center pt-2 pb-6 px-2">
                    <div className="relative group max-w-md w-full rounded-2xl overflow-hidden shadow-lg border border-amber-900/15 dark:border-amber-400/25 bg-amber-50/50 dark:bg-slate-800/80 p-2">
                      <img
                        src={activeSermon.iconImage}
                        alt={activeSermon.iconAlt || activeSermon.title}
                        className="w-full h-auto object-contain max-h-[480px] mx-auto rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
                        loading="eager"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                )}

                {/* SERMON BODY (Preserves sacred book layout, quotes, and centered liturgical greetings) */}
                <div
                  className="sermon-reader-content max-w-[760px] mx-auto space-y-6"
                  dangerouslySetInnerHTML={{ __html: cleanContentHtml }}
                />

                {/* Footer Signature */}
                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                  <span className="font-serif italic">
                    {locale === 'ja'
                      ? '大阪ハリストス正教会 司祷司祭'
                      : locale === 'ru'
                      ? 'Настоятель храма Покрова Пресвятой Богородицы в Осаке'
                      : 'Rector, Holy Protection Osaka Orthodox Church'}
                  </span>
                  <span>{PARISH_INFO.name[locale]}</span>
                </div>

                {/* PREVIOUS / NEXT SUNDAY SERMON NAVIGATION */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Newer Sermon (Previous in descending list) */}
                  {newerSermon ? (
                    <button
                      onClick={() => handleSelectSermon(newerSermon)}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:bg-amber-50/50 dark:hover:bg-slate-800 text-left transition-all group flex items-start gap-3"
                    >
                      <ChevronLeft className="w-5 h-5 text-orthodox-gold flex-shrink-0 mt-0.5 group-hover:-translate-x-0.5 transition-transform" />
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                          {locale === 'ja' ? '← 次の週（最新へ）' : locale === 'ru' ? '← Следующая' : '← Newer Sermon'}
                        </div>
                        <div className="font-serif font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-orthodox-gold transition-colors">
                          {newerSermon.title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {newerSermon.date}
                        </div>
                      </div>
                    </button>
                  ) : (
                    <div className="hidden sm:block" />
                  )}

                  {/* Older Sermon (Next in descending list) */}
                  {olderSermon && (
                    <button
                      onClick={() => handleSelectSermon(olderSermon)}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:bg-amber-50/50 dark:hover:bg-slate-800 text-right transition-all group flex items-start justify-end gap-3"
                    >
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                          {locale === 'ja' ? '前の週（過去へ） →' : locale === 'ru' ? 'Предыдущая →' : 'Older Sermon →'}
                        </div>
                        <div className="font-serif font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-orthodox-gold transition-colors">
                          {olderSermon.title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {olderSermon.date}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-orthodox-gold flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>
              </article>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400">
                {locale === 'ja'
                  ? '該当する説教が見つかりませんでした。'
                  : locale === 'ru'
                  ? 'Проповеди по вашему запросу не найдены.'
                  : 'No sermons found matching your criteria.'}
              </div>
            )}
          </div>

          {/* RIGHT 4 COLUMNS: Illuminated Archive Directory (Scrollable with Icon Thumbnails) */}
          <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-20">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-orthodox-gold" />
                  <span>{locale === 'ja' ? '説教一覧' : locale === 'ru' ? 'Список проповедей' : 'Sermon Directory'}</span>
                </h3>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {filteredSermons.length}
                </span>
              </div>

              {/* Scrollable list with thumbnails */}
              <div className="space-y-2.5 max-h-[75vh] overflow-y-auto pr-1">
                {filteredSermons.map((sermon) => {
                  const isSelected = activeSermon?.id === sermon.id;
                  const thumb = sermon.iconThumbnail || sermon.iconImage;

                  return (
                    <button
                      key={sermon.id}
                      onClick={() => handleSelectSermon(sermon)}
                      className={`w-full text-left p-3 rounded-2xl transition-all border flex items-start gap-3 ${
                        isSelected
                          ? 'bg-amber-50/80 dark:bg-amber-950/30 border-orthodox-gold text-orthodox-navy dark:text-white shadow-xs ring-1 ring-orthodox-gold/30'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {/* Icon Thumbnail */}
                      <div className="w-12 h-14 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 flex-shrink-0 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center">
                        {thumb ? (
                          <img
                            src={thumb}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-slate-400" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-0.5">
                          <span className="flex items-center gap-1.5">
                            <span>{sermon.date}</span>
                            {!isSermonAvailableToPublic(sermon) && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-sans font-medium flex items-center gap-0.5">
                                <Lock className="w-2.5 h-2.5" />
                                <span>{locale === 'ja' ? '土曜公開前' : locale === 'ru' ? 'В субботу' : 'Sat Release'}</span>
                              </span>
                            )}
                          </span>
                          <span className="uppercase text-[10px] font-bold text-orthodox-gold">
                            {sermon.language}
                          </span>
                        </div>
                        <div className="font-serif font-bold text-xs sm:text-sm line-clamp-1 leading-snug">
                          {sermon.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 opacity-80 leading-relaxed font-sans">
                          {sermon.excerpt}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Admin Modals */}
      <SermonEditModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingSermon(null);
        }}
        sermonToEdit={editingSermon}
        onSaved={(saved) => {
          setSelectedSermonId(saved.id);
          setActiveLang(saved.language);
        }}
      />
      <SermonPasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onAuthenticated={() => {
          if (editingSermon) {
            setEditModalOpen(true);
          }
        }}
      />
    </div>
  );
}
