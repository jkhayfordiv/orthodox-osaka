'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Locale } from '../../lib/types';
import { CheckCircle2, WifiOff, Calendar, ArrowRight } from 'lucide-react';

export function OnboardingModal() {
  const { hasCompletedOnboarding, completeOnboarding } = useApp();
  const [selectedLang, setSelectedLang] = useState<Locale | null>(null);
  const [step, setStep] = useState<'language' | 'welcome'>('language');

  if (hasCompletedOnboarding) return null;

  const handleSelectLanguage = (lang: Locale) => {
    setSelectedLang(lang);
    setStep('welcome');
  };

  const handleFinish = () => {
    if (selectedLang) {
      completeOnboarding(selectedLang);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-orthodox-parchment dark:bg-slate-900 border-2 border-orthodox-gold text-slate-800 dark:text-slate-100 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl overflow-hidden relative">
        {/* Step 1: Big Language Selection */}
        {step === 'language' && (
          <div className="text-center space-y-6">
            <img
              src="/brand/church-seal-round.png"
              alt="Osaka Orthodox Church Logo"
              className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-orthodox-gold shadow-xl"
            />

            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light mb-1">
                大阪ハリストス正教会
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Osaka Orthodox Church / Православная Церковь в Осаке
              </p>
            </div>

            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              言語を選択してください / Choose your language / Выберите язык:
            </p>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => handleSelectLanguage('ja')}
                className="w-full min-h-[58px] py-3.5 px-5 rounded-xl border-2 border-orthodox-gold bg-white dark:bg-slate-800 hover:bg-orthodox-candle dark:hover:bg-slate-700 font-bold text-lg text-slate-900 dark:text-white shadow-md flex items-center justify-between transition-all transform active:scale-98"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🇯🇵</span>
                  <span>日本語</span>
                </div>
                <ArrowRight className="w-5 h-5 text-orthodox-gold-dark" />
              </button>

              <button
                onClick={() => handleSelectLanguage('en')}
                className="w-full min-h-[58px] py-3.5 px-5 rounded-xl border-2 border-orthodox-gold bg-white dark:bg-slate-800 hover:bg-orthodox-candle dark:hover:bg-slate-700 font-bold text-lg text-slate-900 dark:text-white shadow-md flex items-center justify-between transition-all transform active:scale-98"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🇬🇧</span>
                  <span>English</span>
                </div>
                <ArrowRight className="w-5 h-5 text-orthodox-gold-dark" />
              </button>

              <button
                onClick={() => handleSelectLanguage('ru')}
                className="w-full min-h-[58px] py-3.5 px-5 rounded-xl border-2 border-orthodox-gold bg-white dark:bg-slate-800 hover:bg-orthodox-candle dark:hover:bg-slate-700 font-bold text-lg text-slate-900 dark:text-white shadow-md flex items-center justify-between transition-all transform active:scale-98"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🇷🇺</span>
                  <span>Русский</span>
                </div>
                <ArrowRight className="w-5 h-5 text-orthodox-gold-dark" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Welcome & Reassurance */}
        {step === 'welcome' && selectedLang && (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-orthodox-gold shadow-md">
              <div className="h-32 sm:h-36 w-full relative">
                <img
                  src="/photos/church-exterior.jpg"
                  alt="Osaka Orthodox Church"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-2.5 inset-x-3 text-center text-white">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-orthodox-gold-light drop-shadow">
                    {selectedLang === 'ja'
                      ? 'ようこそ、大阪教会へ'
                      : selectedLang === 'ru'
                      ? 'Добро пожаловать в храм Осаки'
                      : 'Welcome to Osaka Orthodox Church'}
                  </h3>
                  <p className="text-[11px] text-slate-200">
                    {selectedLang === 'ja'
                      ? '聖生神女庇護聖堂（大阪府吹田市）'
                      : selectedLang === 'ru'
                      ? 'Храм Покрова Пресвятой Богородицы'
                      : 'Holy Protection Orthodox Temple, Osaka'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3.5 text-sm">
              <div className="flex items-start space-x-3 bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-orthodox-gold/30 shadow-sm">
                <Calendar className="w-6 h-6 text-orthodox-gold mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">
                    {selectedLang === 'ja'
                      ? '聖暦・奉事日程・斎の確認'
                      : selectedLang === 'ru'
                      ? 'Календарь, службы и посты'
                      : 'Calendar, Services & Fasting'}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                    {selectedLang === 'ja'
                      ? '今日の聖人、聖書朗読、斎の規定、大阪教会の奉事日程がいつでも分かります。'
                      : selectedLang === 'ru'
                      ? 'Святые дня, чтения, указания о посте и расписание богослужений храма.'
                      : 'Check the saint of the day, scripture readings, fasting rules, and parish services.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-orthodox-gold/30 shadow-sm">
                <WifiOff className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">
                    {selectedLang === 'ja'
                      ? '電波がなくても安心（オフライン動作）'
                      : selectedLang === 'ru'
                      ? 'Работает без интернета'
                      : 'Works Completely Offline'}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                    {selectedLang === 'ja'
                      ? '教会堂の中など、電波の届きにくい場所でもそのまま閲覧できます。'
                      : selectedLang === 'ru'
                      ? 'Приложение работает даже внутри храма при отсутствии сигнала сети.'
                      : 'Access the calendar and prayers anywhere, even inside church walls without signal.'}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-4 px-6 rounded-xl bg-orthodox-gold hover:bg-orthodox-gold-dark text-orthodox-navy font-bold text-lg shadow-lg flex items-center justify-center space-x-2 transition-all transform active:scale-98"
            >
              <span>
                {selectedLang === 'ja'
                  ? 'アプリをはじめる'
                  : selectedLang === 'ru'
                  ? 'Начать использование'
                  : 'Start App'}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
