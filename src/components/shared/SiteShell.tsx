'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { SettingsModal } from './SettingsModal';
import { ScheduleAdminModal } from '../admin/ScheduleAdminModal';
import { BackupModal } from './BackupModal';
import { SiteFooter } from './SiteFooter';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isApp = pathname.startsWith('/app');

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      {!isApp && <SiteFooter />}
      {isApp && <BottomNav />}
      <SettingsModal />
      <ScheduleAdminModal />
      <BackupModal />
    </div>
  );
}
