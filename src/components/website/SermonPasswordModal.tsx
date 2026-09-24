'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Unlock, KeyRound, X, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

interface SermonPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated?: () => void;
}

const ADMIN_PINS = ['1882', 'orthodox1882', 'osaka1882']; // 1882: Founding year of Osaka Church

export function SermonPasswordModal({
  isOpen,
  onClose,
  onAuthenticated,
}: SermonPasswordModalProps) {
  const { locale, isSermonAdmin, setIsSermonAdmin } = useApp();
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleaned = passwordInput.trim().toLowerCase();
    if (ADMIN_PINS.includes(cleaned) || cleaned === '1882') {
      setIsSermonAdmin(true);
      setPasswordInput('');
      setErrorMessage(null);
      if (onAuthenticated) {
        onAuthenticated();
      }
      onClose();
    } else {
      setErrorMessage(
        locale === 'ja'
          ? 'パスワードが正しくありません。（ヒント：大阪教会設立年 1882）'
          : 'Incorrect password. (Hint: Osaka Church founding year 1882)'
      );
    }
  };

  const handleLogout = () => {
    setIsSermonAdmin(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/40 text-slate-800 dark:text-slate-100 rounded-2xl max-w-sm w-full shadow-2xl p-5 overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-orthodox-gold text-orthodox-navy">
              <KeyRound className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-orthodox-navy dark:text-orthodox-gold">
              {locale === 'ja' ? '説教管理者認証' : 'Sermon Administrator'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSermonAdmin ? (
          <div className="py-4 space-y-3 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {locale === 'ja'
                ? '現在、管理者として認証されています。説教の編集や未公開説教の閲覧が可能です。'
                : 'You are currently authenticated as Administrator. You can edit sermons and view unreleased Sunday drafts.'}
            </p>
            <div className="pt-2 flex justify-center gap-2">
              <button
                type="button"
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-lg border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-50 dark:hover:bg-red-950/40"
              >
                {locale === 'ja' ? 'ログアウト' : 'Log Out'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-orthodox-gold text-orthodox-navy text-xs font-bold"
              >
                {locale === 'ja' ? '閉じる' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="py-4 space-y-3.5">
            <p className="text-2xs sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {locale === 'ja'
                ? '説教の編集および土曜朝前の事前公開分を閲覧するには、管理者パスワードを入力してください。'
                : 'Enter the administrator password to edit sermons or preview upcoming Sunday sermons before Saturday morning.'}
            </p>

            {errorMessage && (
              <div className="p-2.5 rounded-lg bg-red-100 text-red-900 dark:bg-red-950/60 dark:text-red-200 text-2xs flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-3xs font-bold uppercase text-slate-500 mb-1">
                {locale === 'ja' ? '管理者パスワード (PIN: 1882)' : 'Administrator Password (PIN: 1882)'}
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="1882"
                autoFocus
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs tracking-widest focus:outline-hidden focus:border-orthodox-gold"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold"
              >
                {locale === 'ja' ? 'キャンセル' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-orthodox-gold text-orthodox-navy font-bold text-xs shadow-xs hover:bg-orthodox-gold-light active:scale-98 transition-all flex items-center gap-1"
              >
                <Unlock className="w-3.5 h-3.5" />
                {locale === 'ja' ? '認証する' : 'Authenticate'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
