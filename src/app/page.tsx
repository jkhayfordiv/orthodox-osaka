'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/shared/Header';
import { BottomNav } from '../components/shared/BottomNav';
import { HomeWebsiteView } from '../components/website/HomeWebsiteView';
import { HistoryView } from '../components/website/HistoryView';
import { AboutOrthodoxyView } from '../components/website/AboutOrthodoxyView';
import { AccessVisitView } from '../components/website/AccessVisitView';
import { SermonsView } from '../components/website/SermonsView';
import { TodayView } from '../components/today/TodayView';
import { CalendarView } from '../components/calendar/CalendarView';
import { ParishView } from '../components/parish/ParishView';
import { ReaderView } from '../components/reader/ReaderView';
import { SettingsModal } from '../components/shared/SettingsModal';
import { OnboardingModal } from '../components/onboarding/OnboardingModal';
import { ScheduleAdminModal } from '../components/admin/ScheduleAdminModal';
import { BackupModal } from '../components/shared/BackupModal';
import { SiteFooter } from '../components/shared/SiteFooter';

export default function Home() {
  const { activeTab } = useApp();
  const isWebsiteTab = ['home', 'history', 'orthodoxy', 'access', 'sermons'].includes(activeTab);

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {activeTab === 'home' && <HomeWebsiteView />}
        {activeTab === 'history' && <HistoryView />}
        {activeTab === 'orthodoxy' && <AboutOrthodoxyView />}
        {activeTab === 'access' && <AccessVisitView />}
        {activeTab === 'sermons' && <SermonsView />}
        {activeTab === 'today' && <TodayView />}
        {activeTab === 'calendar' && <CalendarView />}
        {activeTab === 'parish' && <ParishView />}
        {activeTab === 'reader' && <ReaderView />}
      </main>

      {isWebsiteTab && <SiteFooter />}

      <BottomNav />
      <SettingsModal />
      <OnboardingModal />
      <ScheduleAdminModal />
      <BackupModal />
    </div>
  );
}
