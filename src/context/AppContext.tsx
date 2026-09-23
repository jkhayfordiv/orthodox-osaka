'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Locale } from '../lib/types';

export type FontSize = 'sm' | 'base' | 'lg' | 'xl';
export type AppTab = 'today' | 'calendar' | 'parish' | 'reader';

export interface FamilyMember {
  id: string;
  name: string;
  saintId: string;
}

interface AppContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  hasCompletedOnboarding: boolean;
  completeOnboarding: (selectedLocale: Locale) => void;
  patronSaintId: string | null;
  setPatronSaintId: (id: string | null) => void;
  familyMembers: FamilyMember[];
  addFamilyMember: (member: Omit<FamilyMember, 'id'>) => void;
  removeFamilyMember: (id: string) => void;
  showTooltips: boolean;
  setShowTooltips: (show: boolean) => void;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ja');
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSizeState] = useState<FontSize>('base');
  const [activeTab, setActiveTab] = useState<AppTab>('today');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(true); // default true for SSR, checked in useEffect
  const [patronSaintId, setPatronSaintIdState] = useState<string | null>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [showTooltips, setShowTooltipsState] = useState<boolean>(true);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load from localStorage
    try {
      const savedLocale = localStorage.getItem('orthodox_locale') as Locale | null;
      if (savedLocale && ['ja', 'en', 'ru'].includes(savedLocale)) {
        setLocaleState(savedLocale);
      }

      const savedTheme = localStorage.getItem('orthodox_theme') as 'light' | 'dark' | null;
      if (savedTheme) {
        setThemeState(savedTheme);
        if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else {
        // Detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          setThemeState('dark');
          document.documentElement.classList.add('dark');
        }
      }

      const savedFontSize = localStorage.getItem('orthodox_font_size') as FontSize | null;
      if (savedFontSize) setFontSizeState(savedFontSize);

      const onboarding = localStorage.getItem('orthodox_onboarding');
      if (!onboarding) {
        setHasCompletedOnboarding(false);
      }

      const saint = localStorage.getItem('orthodox_patron_saint');
      if (saint) setPatronSaintIdState(saint);

      const fam = localStorage.getItem('orthodox_family_members');
      if (fam) setFamilyMembers(JSON.parse(fam));

      const tooltips = localStorage.getItem('orthodox_tooltips');
      if (tooltips !== null) setShowTooltipsState(tooltips === 'true');
    } catch {
      // Ignore localStorage errors (e.g. incognito)
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('orthodox_locale', newLocale);
    } catch {}
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('orthodox_theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {}
  };

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    try {
      localStorage.setItem('orthodox_font_size', size);
    } catch {}
  };

  const completeOnboarding = (chosenLocale: Locale) => {
    setLocale(chosenLocale);
    setHasCompletedOnboarding(true);
    try {
      localStorage.setItem('orthodox_onboarding', 'true');
    } catch {}
  };

  const setPatronSaintId = (id: string | null) => {
    setPatronSaintIdState(id);
    try {
      if (id) {
        localStorage.setItem('orthodox_patron_saint', id);
      } else {
        localStorage.removeItem('orthodox_patron_saint');
      }
    } catch {}
  };

  const addFamilyMember = (member: Omit<FamilyMember, 'id'>) => {
    const updated = [...familyMembers, { ...member, id: 'fam-' + Date.now() }];
    setFamilyMembers(updated);
    try {
      localStorage.setItem('orthodox_family_members', JSON.stringify(updated));
    } catch {}
  };

  const removeFamilyMember = (id: string) => {
    const updated = familyMembers.filter((m) => m.id !== id);
    setFamilyMembers(updated);
    try {
      localStorage.setItem('orthodox_family_members', JSON.stringify(updated));
    } catch {}
  };

  const setShowTooltips = (show: boolean) => {
    setShowTooltipsState(show);
    try {
      localStorage.setItem('orthodox_tooltips', String(show));
    } catch {}
  };

  return (
    <AppContext.Provider
      value={{
        locale,
        setLocale,
        theme,
        setTheme,
        fontSize,
        setFontSize,
        activeTab,
        setActiveTab,
        selectedDate,
        setSelectedDate,
        hasCompletedOnboarding,
        completeOnboarding,
        patronSaintId,
        setPatronSaintId,
        familyMembers,
        addFamilyMember,
        removeFamilyMember,
        showTooltips,
        setShowTooltips,
        settingsOpen,
        setSettingsOpen,
      }}
    >
      <div
        className={
          fontSize === 'sm'
            ? 'text-sm'
            : fontSize === 'lg'
            ? 'text-lg'
            : fontSize === 'xl'
            ? 'text-xl'
            : 'text-base'
        }
      >
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
