'use client';

import React, { useState } from 'react';
import { useApp, FontSize } from '../../context/AppContext';
import { COMMON_NAME_DAYS } from '../../data/nameDays';
import { X, Globe, Sun, Moon, Type, Award, Users, HelpCircle } from 'lucide-react';
import { Locale } from '../../lib/types';

export function SettingsModal() {
  const {
    settingsOpen,
    setSettingsOpen,
    locale,
    setLocale,
    theme,
    setTheme,
    fontSize,
    setFontSize,
    patronSaintId,
    setPatronSaintId,
    familyMembers,
    addFamilyMember,
    removeFamilyMember,
    showTooltips,
    setShowTooltips,
  } = useApp();

  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberSaintId, setNewMemberSaintId] = useState(COMMON_NAME_DAYS[0]?.id || '');

  if (!settingsOpen) return null;

  const fontSizes: { id: FontSize; label: { ja: string; en: string; ru: string } }[] = [
    { id: 'sm', label: { ja: '小', en: 'Small', ru: 'Мелкий' } },
    { id: 'base', label: { ja: '標準', en: 'Normal', ru: 'Обычный' } },
    { id: 'lg', label: { ja: '大', en: 'Large', ru: 'Крупный' } },
    { id: 'xl', label: { ja: '特大', en: 'Extra Large', ru: 'Очень крупный' } },
  ];

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMemberName.trim()) {
      addFamilyMember({ name: newMemberName.trim(), saintId: newMemberSaintId });
      setNewMemberName('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-orthodox-parchment dark:bg-slate-900 border-2 border-orthodox-gold text-slate-800 dark:text-slate-100 rounded-2xl max-w-lg w-full p-5 sm:p-7 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-orthodox-gold/30 pb-3 mb-5">
          <h2 className="text-xl font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light flex items-center space-x-2">
            <span>⚙</span>
            <span>
              {locale === 'ja' ? 'アプリ設定' : locale === 'ru' ? 'Настройки' : 'Settings'}
            </span>
          </h2>
          <button
            onClick={() => setSettingsOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-slate-500 hover:text-slate-900 dark:hover:text-white" />
          </button>
        </div>

        <div className="space-y-6">
          {/* 1. Language Selection */}
          <section className="space-y-2">
            <label className="text-sm font-bold flex items-center space-x-2 text-slate-700 dark:text-slate-300">
              <Globe className="w-4 h-4 text-orthodox-gold" />
              <span>{locale === 'ja' ? '言語 / Language / Язык' : locale === 'ru' ? 'Язык' : 'Language'}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['ja', 'en', 'ru'] as Locale[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`py-2 px-3 rounded-xl border text-sm font-semibold transition-all ${
                    locale === l
                      ? 'border-orthodox-gold bg-orthodox-gold text-orthodox-navy font-bold shadow'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {l === 'ja' ? '🇯🇵 日本語' : l === 'en' ? '🇬🇧 English' : '🇷🇺 Русский'}
                </button>
              ))}
            </div>
          </section>

          {/* 2. Theme Selection */}
          <section className="space-y-2">
            <label className="text-sm font-bold flex items-center space-x-2 text-slate-700 dark:text-slate-300">
              {theme === 'dark' ? <Moon className="w-4 h-4 text-orthodox-gold" /> : <Sun className="w-4 h-4 text-orthodox-gold" />}
              <span>{locale === 'ja' ? '表示テーマ' : locale === 'ru' ? 'Тема оформления' : 'Theme'}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTheme('light')}
                className={`py-2 px-3 rounded-xl border text-sm font-semibold flex items-center justify-center space-x-2 ${
                  theme === 'light'
                    ? 'border-orthodox-gold bg-orthodox-gold text-orthodox-navy font-bold shadow'
                    : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>{locale === 'ja' ? 'ライト（昼）' : locale === 'ru' ? 'Светлая' : 'Light'}</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`py-2 px-3 rounded-xl border text-sm font-semibold flex items-center justify-center space-x-2 ${
                  theme === 'dark'
                    ? 'border-orthodox-gold bg-orthodox-gold text-orthodox-navy font-bold shadow'
                    : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>{locale === 'ja' ? 'ダーク（夜・祈祷用）' : locale === 'ru' ? 'Тёмная' : 'Dark'}</span>
              </button>
            </div>
          </section>

          {/* 3. Font Size Control with Live Preview */}
          <section className="space-y-2">
            <label className="text-sm font-bold flex items-center space-x-2 text-slate-700 dark:text-slate-300">
              <Type className="w-4 h-4 text-orthodox-gold" />
              <span>{locale === 'ja' ? '文字サイズ（見やすさ調整）' : locale === 'ru' ? 'Размер шрифта' : 'Font Size'}</span>
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {fontSizes.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFontSize(f.id)}
                  className={`py-2 px-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                    fontSize === f.id
                      ? 'border-orthodox-gold bg-orthodox-gold text-orthodox-navy font-bold shadow'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {f.label[locale]}
                </button>
              ))}
            </div>

            {/* Live Preview Card */}
            <div className="mt-2 p-3 bg-white dark:bg-slate-800 rounded-xl border border-orthodox-gold/30">
              <span className="text-xs text-slate-400 block mb-1">
                {locale === 'ja' ? 'プレビュー表示:' : locale === 'ru' ? 'Предпросмотр:' : 'Preview:'}
              </span>
              <p className="font-serif">
                {locale === 'ja'
                  ? '主イイスス・ハリストス、神の子よ、我を憐れみ給え。'
                  : locale === 'ru'
                  ? 'Господи Иисусе Христе, Сыне Божий, помилуй мя.'
                  : 'Lord Jesus Christ, Son of God, have mercy on me.'}
              </p>
            </div>
          </section>

          {/* 4. Patron Saint Selection (Name Day) */}
          <section className="space-y-2">
            <label className="text-sm font-bold flex items-center space-x-2 text-slate-700 dark:text-slate-300">
              <Award className="w-4 h-4 text-orthodox-gold" />
              <span>{locale === 'ja' ? 'あなたの守護聖人（聖名祝日・名前の日）' : locale === 'ru' ? 'Ваш небесный покровитель (Именины)' : 'Your Patron Saint (Name Day)'}</span>
            </label>
            <select
              value={patronSaintId || ''}
              onChange={(e) => setPatronSaintId(e.target.value ? e.target.value : null)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-orthodox-gold"
            >
              <option value="">
                {locale === 'ja' ? '（未設定）' : locale === 'ru' ? '(Не выбрано)' : '(Not selected)'}
              </option>
              {COMMON_NAME_DAYS.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.name[locale]} — {entry.saint[locale]} ({entry.feastDateCivil})
                </option>
              ))}
            </select>
          </section>

          {/* 5. Family Members for Name Day Tracking */}
          <section className="space-y-2.5">
            <label className="text-sm font-bold flex items-center space-x-2 text-slate-700 dark:text-slate-300">
              <Users className="w-4 h-4 text-orthodox-gold" />
              <span>{locale === 'ja' ? 'ご家族・代子の聖名日' : locale === 'ru' ? 'Именины членов семьи и крестников' : 'Family & Godchildren Name Days'}</span>
            </label>

            {familyMembers.length > 0 && (
              <ul className="space-y-1.5 mb-2">
                {familyMembers.map((m) => {
                  const saint = COMMON_NAME_DAYS.find((s) => s.id === m.saintId);
                  return (
                    <li
                      key={m.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800 text-xs sm:text-sm border border-slate-200 dark:border-slate-700"
                    >
                      <div>
                        <span className="font-bold text-orthodox-navy dark:text-orthodox-gold-light mr-2">
                          {m.name}
                        </span>
                        <span className="text-slate-500">
                          {saint ? `${saint.name[locale]} (${saint.feastDateCivil})` : ''}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFamilyMember(m.id)}
                        className="text-red-500 hover:text-red-700 text-xs px-2 py-0.5 rounded"
                      >
                        {locale === 'ja' ? '削除' : locale === 'ru' ? 'Удалить' : 'Remove'}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            <form onSubmit={handleAddMember} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder={locale === 'ja' ? 'お名前（例: アナスタシヤ）' : locale === 'ru' ? 'Имя' : 'Name'}
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                className="flex-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:border-orthodox-gold"
              />
              <select
                value={newMemberSaintId}
                onChange={(e) => setNewMemberSaintId(e.target.value)}
                className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:border-orthodox-gold"
              >
                {COMMON_NAME_DAYS.map((entry) => (
                  <option key={entry.id} value={entry.id}>
                    {entry.name[locale]} ({entry.feastDateCivil})
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="py-2 px-3 rounded-xl bg-orthodox-gold text-orthodox-navy font-bold text-xs sm:text-sm hover:bg-orthodox-gold-dark shadow"
              >
                {locale === 'ja' ? '追加' : locale === 'ru' ? 'Добавить' : 'Add'}
              </button>
            </form>
          </section>

          {/* 6. Contextual Help Tooltips Toggle */}
          <section className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-orthodox-gold/30">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-orthodox-gold" />
              <div>
                <span className="text-sm font-bold block">
                  {locale === 'ja' ? '用語の解説ヒント表示' : locale === 'ru' ? 'Подсказки к терминам' : 'Helpful Terminology Tips'}
                </span>
                <span className="text-xs text-slate-500">
                  {locale === 'ja' ? '「旧暦」「斎」「調」等の説明' : locale === 'ru' ? 'Пояснения к словам пост, глас, стиль' : 'Explanations for Fasting, Tone, Old Calendar'}
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={showTooltips}
              onChange={(e) => setShowTooltips(e.target.checked)}
              className="w-5 h-5 accent-orthodox-gold rounded cursor-pointer"
            />
          </section>
        </div>

        {/* Done Button */}
        <div className="mt-6 pt-3 border-t border-orthodox-gold/30">
          <button
            onClick={() => setSettingsOpen(false)}
            className="w-full py-3 rounded-xl bg-orthodox-gold hover:bg-orthodox-gold-dark text-orthodox-navy font-bold text-base shadow transition-all"
          >
            {locale === 'ja' ? '完了' : locale === 'ru' ? 'Готово' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
}
