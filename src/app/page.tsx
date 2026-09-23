'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/shared/Header';
import { BottomNav } from '../components/shared/BottomNav';
import { TodayView } from '../components/today/TodayView';
import { CalendarView } from '../components/calendar/CalendarView';
import { ParishView } from '../components/parish/ParishView';
import { ReaderView } from '../components/reader/ReaderView';
import { SettingsModal } from '../components/shared/SettingsModal';
import { OnboardingModal } from '../components/onboarding/OnboardingModal';

export default function Home() {
  const { activeTab } = useApp();

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {activeTab === 'today' && <TodayView />}
        {activeTab === 'calendar' && <CalendarView />}
        {activeTab === 'parish' && <ParishView />}
        {activeTab === 'reader' && <ReaderView />}
      </main>

      <BottomNav />
      <SettingsModal />
      <OnboardingModal />
    </div>
  );
}
