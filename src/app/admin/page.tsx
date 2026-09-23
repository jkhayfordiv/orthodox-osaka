'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { ScheduleAdminModal } from '../../components/admin/ScheduleAdminModal';

export default function AdminPage() {
  const router = useRouter();
  const { setAdminModalOpen } = useApp();

  useEffect(() => {
    setAdminModalOpen(true);
  }, [setAdminModalOpen]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <ScheduleAdminModal />
      <div className="text-center text-slate-400 text-sm space-y-3">
        <p>管理者モーダルを開いています...</p>
        <button
          onClick={() => router.push('/')}
          className="text-xs text-orthodox-gold hover:underline font-semibold"
        >
          ← トップページに戻る (Back to App)
        </button>
      </div>
    </div>
  );
}
