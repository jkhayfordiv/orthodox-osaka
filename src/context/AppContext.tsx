'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Locale, NameDayEntry, NotificationPreferences } from '../lib/types';
import { COMMON_NAME_DAYS } from '../data/nameDays';
import { requestNotificationPermission as requestPerm } from '../lib/notifications';

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
  customSaints: NameDayEntry[];
  addCustomSaint: (saint: Omit<NameDayEntry, 'id'>) => string;
  deleteCustomSaint: (id: string) => void;
  allSaints: NameDayEntry[];
  notificationPrefs: NotificationPreferences;
  setNotificationPrefs: (prefs: Partial<NotificationPreferences>) => void;
  requestNotificationPermission: () => Promise<boolean>;
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
  const [customSaints, setCustomSaints] = useState<NameDayEntry[]>([]);
  const [notificationPrefs, setNotificationPrefsState] = useState<NotificationPreferences>({
    dailyReadingsEnabled: false,
    dailyReadingsTime: '08:00',
    nameDaysEnabled: false,
    nameDaysTime: '08:00',
  });
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

      const custom = localStorage.getItem('orthodox_custom_saints');
      if (custom) setCustomSaints(JSON.parse(custom));

      const notif = localStorage.getItem('orthodox_notification_prefs');
      if (notif) setNotificationPrefsState(JSON.parse(notif));

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
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-font-size', size);
        const fontSizes: Record<FontSize, string> = {
          sm: '14px',
          base: '16px',
          lg: '18.5px',
          xl: '22px',
        };
        document.documentElement.style.fontSize = fontSizes[size] || '16px';
      }
    } catch {}
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-font-size', fontSize);
      const fontSizes: Record<FontSize, string> = {
        sm: '14px',
        base: '16px',
        lg: '18.5px',
        xl: '22px',
      };
      document.documentElement.style.fontSize = fontSizes[fontSize] || '16px';
    }
  }, [fontSize]);

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

  const addCustomSaint = (saint: Omit<NameDayEntry, 'id'>): string => {
    const newId = 'custom-' + Date.now();
    const newEntry: NameDayEntry = { ...saint, id: newId, isCustom: true };
    const updated = [newEntry, ...customSaints];
    setCustomSaints(updated);
    try {
      localStorage.setItem('orthodox_custom_saints', JSON.stringify(updated));
    } catch {}
    return newId;
  };

  const deleteCustomSaint = (id: string) => {
    const updated = customSaints.filter((s) => s.id !== id);
    setCustomSaints(updated);
    try {
      localStorage.setItem('orthodox_custom_saints', JSON.stringify(updated));
    } catch {}
  };

  const allSaints = React.useMemo(() => {
    return [...customSaints, ...COMMON_NAME_DAYS];
  }, [customSaints]);

  const setNotificationPrefs = (prefs: Partial<NotificationPreferences>) => {
    const updated = { ...notificationPrefs, ...prefs };
    setNotificationPrefsState(updated);
    try {
      localStorage.setItem('orthodox_notification_prefs', JSON.stringify(updated));
    } catch {}
  };

  const requestNotificationPermission = async () => {
    return await requestPerm();
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
        customSaints,
        addCustomSaint,
        deleteCustomSaint,
        allSaints,
        notificationPrefs,
        setNotificationPrefs,
        requestNotificationPermission,
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
