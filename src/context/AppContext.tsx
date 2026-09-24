'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Locale, NameDayEntry, NotificationPreferences, PrayerListItem, ParishService } from '../lib/types';
import { COMMON_NAME_DAYS } from '../data/nameDays';
import { PARISH_SCHEDULE_2026 } from '../data/parishSchedule2026';
import { requestNotificationPermission as requestPerm } from '../lib/notifications';

export type FontSize = 'sm' | 'base' | 'lg' | 'xl';
export type AppTab =
  | 'home'
  | 'history'
  | 'orthodoxy'
  | 'access'
  | 'sermons'
  | 'today'
  | 'calendar'
  | 'parish'
  | 'reader';

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
  prayerList: PrayerListItem[];
  addPrayerItem: (item: Omit<PrayerListItem, 'id'>) => void;
  updatePrayerItem: (id: string, item: Partial<PrayerListItem>) => void;
  removePrayerItem: (id: string) => void;
  notificationPrefs: NotificationPreferences;
  setNotificationPrefs: (prefs: Partial<NotificationPreferences>) => void;
  requestNotificationPermission: () => Promise<boolean>;
  showTooltips: boolean;
  setShowTooltips: (show: boolean) => void;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  isInstallable: boolean;
  isInstalled: boolean;
  installApp: () => Promise<boolean>;
  parishSchedule: ParishService[];
  addParishService: (service: Omit<ParishService, 'id'>) => void;
  updateParishService: (id: string, updates: Partial<ParishService>) => void;
  deleteParishService: (id: string) => void;
  importParishSchedule: (services: ParishService[], mode?: 'merge' | 'replace' | 'replace_month') => void;
  resetParishSchedule: () => void;
  adminModalOpen: boolean;
  setAdminModalOpen: (open: boolean) => void;
  backupModalOpen: boolean;
  setBackupModalOpen: (open: boolean) => void;
  exportBackupJson: () => string;
  importBackupJson: (jsonStr: string) => { success: boolean; prayerCount: number; error?: string };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ja');
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSizeState] = useState<FontSize>('base');
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(true); // default true for SSR, checked in useEffect
  const [patronSaintId, setPatronSaintIdState] = useState<string | null>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [customSaints, setCustomSaints] = useState<NameDayEntry[]>([]);
  const [manualPrayerList, setManualPrayerList] = useState<PrayerListItem[]>([]);
  const [notificationPrefs, setNotificationPrefsState] = useState<NotificationPreferences>({
    dailyReadingsEnabled: false,
    dailyReadingsTime: '08:00',
    nameDaysEnabled: false,
    nameDaysTime: '08:00',
  });
  const [showTooltips, setShowTooltipsState] = useState<boolean>(true);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);
  const [backupModalOpen, setBackupModalOpen] = useState<boolean>(false);
  const [customSchedule, setCustomSchedule] = useState<ParishService[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const deferredPromptRef = React.useRef<any>(null);

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

      const prayers = localStorage.getItem('orthodox_manual_prayer_list');
      if (prayers) setManualPrayerList(JSON.parse(prayers));

      const sched = localStorage.getItem('orthodox_custom_parish_schedule');
      if (sched) {
        try {
          setCustomSchedule(JSON.parse(sched));
        } catch {}
      }

      const notif = localStorage.getItem('orthodox_notification_prefs');
      if (notif) setNotificationPrefsState(JSON.parse(notif));

      const tooltips = localStorage.getItem('orthodox_tooltips');
      if (tooltips !== null) setShowTooltipsState(tooltips === 'true');
    } catch {
      // Ignore localStorage errors (e.g. incognito)
    }

    // PWA Standalone Detection & beforeinstallprompt handler
    if (typeof window !== 'undefined') {
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://');
      setIsInstalled(Boolean(isStandalone));

      const mediaQuery = window.matchMedia('(display-mode: standalone)');
      const handleMediaChange = (e: MediaQueryListEvent) => {
        setIsInstalled(e.matches);
      };
      mediaQuery.addEventListener('change', handleMediaChange);

      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        deferredPromptRef.current = e;
        setIsInstallable(true);
      };
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      const handleAppInstalled = () => {
        setIsInstalled(true);
        setIsInstallable(false);
        deferredPromptRef.current = null;
      };
      window.addEventListener('appinstalled', handleAppInstalled);

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch((err) => {
          console.debug('ServiceWorker reg notice:', err);
        });
      }

      return () => {
        mediaQuery.removeEventListener('change', handleMediaChange);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
      };
    }
  }, []);

  const installApp = async (): Promise<boolean> => {
    if (!deferredPromptRef.current) return false;
    try {
      await deferredPromptRef.current.prompt();
      const choice = await deferredPromptRef.current.userChoice;
      deferredPromptRef.current = null;
      if (choice && choice.outcome === 'accepted') {
        setIsInstalled(true);
        setIsInstallable(false);
        return true;
      }
    } catch (err) {
      console.debug('Install prompt error:', err);
    }
    return false;
  };

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

  // Combined prayer list: auto-synced family members & godchildren (living) + manual prayer items
  const prayerList = React.useMemo(() => {
    const familyItems: PrayerListItem[] = familyMembers.map((fam) => {
      const saint = allSaints.find((s) => s.id === fam.saintId);
      const saintName = saint ? saint.name[locale] : undefined;
      return {
        id: `fam-prayer-${fam.id}`,
        type: 'living' as const,
        name: fam.name,
        baptismalName: saintName,
        saintId: fam.saintId,
        relation: locale === 'ja' ? '代子・家族' : locale === 'ru' ? 'Семья / Кресник' : 'Family / Godchild',
        isFromFamily: true,
        familyMemberId: fam.id,
      };
    });

    return [...familyItems, ...manualPrayerList];
  }, [familyMembers, allSaints, locale, manualPrayerList]);

  const addPrayerItem = (item: Omit<PrayerListItem, 'id'>) => {
    const newItem: PrayerListItem = {
      ...item,
      id: 'prayer-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...manualPrayerList, newItem];
    setManualPrayerList(updated);
    try {
      localStorage.setItem('orthodox_manual_prayer_list', JSON.stringify(updated));
    } catch {}
  };

  const updatePrayerItem = (id: string, updates: Partial<PrayerListItem>) => {
    if (id.startsWith('fam-prayer-')) {
      const famId = id.replace('fam-prayer-', '');
      const updatedFam = familyMembers.map((f) => {
        if (f.id === famId) {
          let newSaintId = f.saintId;
          if (updates.saintId) {
            newSaintId = updates.saintId;
          } else if (updates.baptismalName) {
            const matched = allSaints.find(
              (s) =>
                s.name.ja === updates.baptismalName ||
                s.name.en.toLowerCase() === updates.baptismalName?.toLowerCase() ||
                s.name.ru.toLowerCase() === updates.baptismalName?.toLowerCase()
            );
            if (matched) newSaintId = matched.id;
          }
          return {
            ...f,
            name: updates.name !== undefined ? updates.name : f.name,
            saintId: newSaintId,
          };
        }
        return f;
      });
      setFamilyMembers(updatedFam);
      try {
        localStorage.setItem('orthodox_family_members', JSON.stringify(updatedFam));
      } catch {}
      return;
    }
    const updated = manualPrayerList.map((p) => (p.id === id ? { ...p, ...updates } : p));
    setManualPrayerList(updated);
    try {
      localStorage.setItem('orthodox_manual_prayer_list', JSON.stringify(updated));
    } catch {}
  };

  const removePrayerItem = (id: string) => {
    if (id.startsWith('fam-prayer-')) {
      const famId = id.replace('fam-prayer-', '');
      removeFamilyMember(famId);
    } else {
      const updated = manualPrayerList.filter((p) => p.id !== id);
      setManualPrayerList(updated);
      try {
        localStorage.setItem('orthodox_manual_prayer_list', JSON.stringify(updated));
      } catch {}
    }
  };

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

  const parishSchedule = React.useMemo(() => {
    if (customSchedule && customSchedule.length > 0) {
      return customSchedule;
    }
    return PARISH_SCHEDULE_2026;
  }, [customSchedule]);

  const saveSchedule = (newSchedule: ParishService[]) => {
    setCustomSchedule(newSchedule);
    try {
      localStorage.setItem('orthodox_custom_parish_schedule', JSON.stringify(newSchedule));
    } catch {}
  };

  const addParishService = (service: Omit<ParishService, 'id'>) => {
    const current = customSchedule.length > 0 ? customSchedule : [...PARISH_SCHEDULE_2026];
    const newService: ParishService = {
      ...service,
      id: `s-${service.date}-${service.time.replace(':', '')}-${Date.now().toString().slice(-4)}`,
    };
    const updated = [...current, newService].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
    saveSchedule(updated);
  };

  const updateParishService = (id: string, updates: Partial<ParishService>) => {
    const current = customSchedule.length > 0 ? customSchedule : [...PARISH_SCHEDULE_2026];
    const updated = current.map((s) => (s.id === id ? { ...s, ...updates } : s));
    saveSchedule(updated);
  };

  const deleteParishService = (id: string) => {
    const current = customSchedule.length > 0 ? customSchedule : [...PARISH_SCHEDULE_2026];
    const updated = current.filter((s) => s.id !== id);
    saveSchedule(updated);
  };

  const importParishSchedule = (
    services: ParishService[],
    mode: 'merge' | 'replace' | 'replace_month' = 'replace_month'
  ) => {
    if (mode === 'replace') {
      saveSchedule(services);
    } else if (mode === 'replace_month') {
      const current = customSchedule.length > 0 ? customSchedule : [...PARISH_SCHEDULE_2026];
      const targetMonths = new Set(services.map((s) => s.date.slice(0, 7))); // e.g. "2026-09"
      const filtered = current.filter((s) => !targetMonths.has(s.date.slice(0, 7)));
      const combined = [...filtered, ...services].sort(
        (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)
      );
      saveSchedule(combined);
    } else {
      const current = customSchedule.length > 0 ? customSchedule : [...PARISH_SCHEDULE_2026];
      const map = new Map<string, ParishService>();
      current.forEach((s) => map.set(`${s.date}_${s.time}`, s));
      services.forEach((s) => map.set(`${s.date}_${s.time}`, s));
      const merged = Array.from(map.values()).sort(
        (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)
      );
      saveSchedule(merged);
    }
  };

  const resetParishSchedule = () => {
    setCustomSchedule([]);
    try {
      localStorage.removeItem('orthodox_custom_parish_schedule');
    } catch {}
  };

  const exportBackupJson = () => {
    const backupData = {
      app: 'orthodox-osaka',
      version: 1,
      exportedAt: new Date().toISOString(),
      locale,
      theme,
      fontSize,
      patronSaintId,
      familyMembers,
      prayerList: manualPrayerList,
      notificationPrefs,
    };
    return JSON.stringify(backupData, null, 2);
  };

  const importBackupJson = (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr.trim());
      if (!data || typeof data !== 'object') {
        return { success: false, prayerCount: 0, error: 'Invalid backup file format' };
      }

      let importedCount = 0;

      // Import prayer list
      if (Array.isArray(data.prayerList)) {
        setManualPrayerList(data.prayerList);
        try {
          localStorage.setItem('orthodox_manual_prayer_list', JSON.stringify(data.prayerList));
        } catch {}
        importedCount = data.prayerList.length;
      }

      // Import family members
      if (Array.isArray(data.familyMembers)) {
        setFamilyMembers(data.familyMembers);
        try {
          localStorage.setItem('orthodox_family_members', JSON.stringify(data.familyMembers));
        } catch {}
      }

      // Import patron saint
      if (typeof data.patronSaintId === 'string' || data.patronSaintId === null) {
        setPatronSaintId(data.patronSaintId);
      }

      // Import preferences if present
      if (data.locale && ['ja', 'en', 'ru'].includes(data.locale)) {
        setLocale(data.locale);
      }
      if (data.theme && ['light', 'dark'].includes(data.theme)) {
        setTheme(data.theme);
      }
      if (data.fontSize && ['sm', 'base', 'lg', 'xl'].includes(data.fontSize)) {
        setFontSize(data.fontSize);
      }

      return { success: true, prayerCount: importedCount };
    } catch (err: any) {
      return { success: false, prayerCount: 0, error: err.message || 'Could not parse JSON' };
    }
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
        prayerList,
        addPrayerItem,
        updatePrayerItem,
        removePrayerItem,
        notificationPrefs,
        setNotificationPrefs,
        requestNotificationPermission,
        showTooltips,
        setShowTooltips,
        settingsOpen,
        setSettingsOpen,
        isInstallable,
        isInstalled,
        installApp,
        parishSchedule,
        addParishService,
        updateParishService,
        deleteParishService,
        importParishSchedule,
        resetParishSchedule,
        adminModalOpen,
        setAdminModalOpen,
        backupModalOpen,
        setBackupModalOpen,
        exportBackupJson,
        importBackupJson,
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
