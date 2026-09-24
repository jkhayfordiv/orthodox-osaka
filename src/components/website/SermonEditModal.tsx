'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ArchivedSermon } from '../../data/sermonsArchive';
import { getSermonPublicReleaseDate, isSermonAvailableToPublic } from '../../lib/sermonSchedule';
import { Locale } from '../../lib/types';
import {
  X,
  Save,
  Trash2,
  Calendar,
  Clock,
  Sparkles,
  Eye,
  Edit3,
  AlertCircle,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface SermonEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  sermonToEdit?: ArchivedSermon | null;
  onSaved?: (savedSermon: ArchivedSermon) => void;
}

export function SermonEditModal({
  isOpen,
  onClose,
  sermonToEdit,
  onSaved,
}: SermonEditModalProps) {
  const { locale, updateSermon, addSermon, deleteSermon } = useApp();

  const [language, setLanguage] = useState<Locale>('ja');
  const [date, setDate] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [excerpt, setExcerpt] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Initialize form state when sermonToEdit changes or modal opens
  useEffect(() => {
    if (sermonToEdit) {
      setLanguage(sermonToEdit.language);
      setDate(sermonToEdit.date || '');
      setTitle(sermonToEdit.title || '');
      setExcerpt(sermonToEdit.excerpt || '');
      setContent(sermonToEdit.contentText || sermonToEdit.contentHtml || '');
    } else {
      // Default to upcoming Sunday date in YYYY-MM-DD
      const now = new Date();
      const dayOfWeek = now.getUTCDay();
      const daysUntilSunday = (7 - dayOfWeek) % 7 || 7;
      const upcomingSunday = new Date(now.getTime() + daysUntilSunday * 24 * 60 * 60 * 1000);
      const y = upcomingSunday.getUTCFullYear();
      const m = String(upcomingSunday.getUTCMonth() + 1).padStart(2, '0');
      const d = String(upcomingSunday.getUTCDate()).padStart(2, '0');

      setLanguage(locale);
      setDate(`${y}-${m}-${d}`);
      setTitle('');
      setExcerpt('');
      setContent('');
    }
    setActiveTab('editor');
    setStatusMessage(null);
  }, [sermonToEdit, isOpen, locale]);

  // Compute public release info
  const releaseInfo = useMemo(() => {
    if (!date) return null;
    const releaseDate = getSermonPublicReleaseDate(date);
    const now = new Date();
    const isPublic = now.getTime() >= releaseDate.getTime();
    return {
      releaseDate,
      isPublic,
    };
  }, [date]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) {
      setStatusMessage({
        type: 'error',
        text: locale === 'ja' ? 'タイトルを入力してください。' : 'Please enter a title.',
      });
      return;
    }
    if (!date.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(date.trim())) {
      setStatusMessage({
        type: 'error',
        text: locale === 'ja' ? '日付を YYYY-MM-DD の形式で入力してください。' : 'Please enter a date in YYYY-MM-DD format.',
      });
      return;
    }

    const trimmedDate = date.trim();
    const formattedHtml = content
      .split('\n\n')
      .map((p) => `<p class="wp-block-paragraph">${p.trim()}</p>`)
      .join('\n');

    let savedResult: ArchivedSermon;

    if (sermonToEdit) {
      savedResult = {
        ...sermonToEdit,
        title: title.trim(),
        date: trimmedDate,
        dateTime: `${trimmedDate}T07:00:00`,
        language,
        excerpt: excerpt.trim(),
        contentText: content.trim(),
        contentHtml: formattedHtml,
      };
      updateSermon(savedResult);
    } else {
      const newId = Date.now();
      savedResult = {
        id: newId,
        slug: `sermon-${trimmedDate}-${language}`,
        date: trimmedDate,
        dateTime: `${trimmedDate}T07:00:00`,
        link: '',
        language,
        title: title.trim(),
        excerpt: excerpt.trim(),
        contentText: content.trim(),
        contentHtml: formattedHtml,
      };
      addSermon(savedResult);
    }

    setStatusMessage({
      type: 'success',
      text: locale === 'ja' ? '説教を保存しました。' : 'Sermon saved successfully.',
    });

    if (onSaved) {
      onSaved(savedResult);
    }

    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleDelete = () => {
    if (!sermonToEdit) return;
    const confirmMsg =
      locale === 'ja'
        ? 'この説教のカスタム編集を削除しますか？'
        : 'Are you sure you want to delete this custom sermon?';
    if (window.confirm(confirmMsg)) {
      deleteSermon(sermonToEdit.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/40 text-slate-800 dark:text-slate-100 rounded-2xl max-w-2xl w-full shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-orthodox-parchment/60 dark:bg-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-orthodox-gold text-orthodox-navy shadow-xs">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-orthodox-navy dark:text-orthodox-gold">
                {sermonToEdit
                  ? locale === 'ja' ? '説教の編集' : 'Edit Sermon'
                  : locale === 'ja' ? '新しい主日説教を作成' : 'New Sunday Sermon'}
              </h3>
              <p className="text-2xs sm:text-xs text-slate-500 dark:text-slate-400">
                {locale === 'ja'
                  ? '管理者パスワード認証済み — 編集内容は即時反映されます'
                  : 'Authenticated Administrator — edits take effect immediately'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Release Status Banner */}
        {releaseInfo && (
          <div
            className={`px-5 py-2.5 text-xs flex items-center gap-2 border-b ${
              releaseInfo.isPublic
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-800/40'
            }`}
          >
            {releaseInfo.isPublic ? (
              <>
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>
                  {locale === 'ja'
                    ? '【一般公開中】この説教はウェブサイト上で誰でも閲覧可能です。'
                    : '【Publicly Live】This sermon is visible to all visitors online.'}
                </span>
              </>
            ) : (
              <>
                <Clock className="w-4 h-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                <span>
                  {locale === 'ja'
                    ? '【土曜朝まで非公開】この説教は土曜朝6:00 (JST) に自動公開されます。（管理者のみ閲覧可能）'
                    : '【Held Until Saturday Morning】Public release scheduled for Saturday 06:00 JST (Admin Preview only).'}
                </span>
              </>
            )}
          </div>
        )}

        {/* Tab switcher: Editor vs Preview */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-5 bg-slate-50/50 dark:bg-slate-900/50 text-xs font-bold">
          <button
            onClick={() => setActiveTab('editor')}
            className={`py-2.5 px-4 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'editor'
                ? 'border-orthodox-gold text-orthodox-navy dark:text-orthodox-gold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            {locale === 'ja' ? '編集' : 'Edit'}
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`py-2.5 px-4 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'preview'
                ? 'border-orthodox-gold text-orthodox-navy dark:text-orthodox-gold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            {locale === 'ja' ? 'プレビュー' : 'Preview'}
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs sm:text-sm">
          {statusMessage && (
            <div
              className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-200'
                  : 'bg-red-100 text-red-900 dark:bg-red-900/50 dark:text-red-200'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {activeTab === 'editor' ? (
            <>
              {/* Language and Date row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-2xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    {locale === 'ja' ? '言語' : 'Language'}
                  </label>
                  <div className="flex rounded-lg border border-slate-300 dark:border-slate-700 overflow-hidden">
                    {(['ja', 'en', 'ru'] as Locale[]).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setLanguage(lang)}
                        className={`flex-1 py-1.5 text-xs font-bold transition-colors ${
                          language === lang
                            ? 'bg-orthodox-gold text-orthodox-navy'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {lang === 'ja' ? '日本語' : lang === 'en' ? 'English' : 'Русский'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-2xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    {locale === 'ja' ? '主日・祝日 日付 (YYYY-MM-DD)' : 'Sunday / Feast Date (YYYY-MM-DD)'}
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs sm:text-sm focus:outline-hidden focus:border-orthodox-gold"
                    />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {locale === 'ja' ? '説教タイトル' : 'Sermon Title'}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={
                    locale === 'ja'
                      ? '例: 十字架挙栄祭　説教'
                      : 'e.g. Feast of the Exaltation of the Cross — Homily'
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs sm:text-sm focus:outline-hidden focus:border-orthodox-gold font-serif font-bold"
                />
              </div>

              {/* Excerpt / Scripture Reading */}
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {locale === 'ja' ? '抜粋 / 当該福音経箇所' : 'Excerpt / Gospel Reference'}
                </label>
                <input
                  type="text"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder={
                    locale === 'ja'
                      ? '例: マルコ 12:1-12　葡萄園の悪しき農夫の譬え'
                      : 'e.g. Mark 12:1–12 Parable of the Wicked Vinedressers'
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs sm:text-sm focus:outline-hidden focus:border-orthodox-gold"
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center justify-between">
                  <span>{locale === 'ja' ? '説教本文' : 'Sermon Text'}</span>
                  <span className="text-3xs text-slate-400 font-normal">
                    {locale === 'ja' ? '段落は空行で区切られます' : 'Separate paragraphs with blank lines'}
                  </span>
                </label>
                <textarea
                  rows={10}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={
                    locale === 'ja'
                      ? '父と子と聖神の名によりて。...\n\n主イイスス・ハリストスは教え給わく...'
                      : 'In the name of the Father, and of the Son, and of the Holy Spirit...'
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-serif leading-relaxed focus:outline-hidden focus:border-orthodox-gold"
                />
              </div>
            </>
          ) : (
            /* Live Preview Tab */
            <div className="p-4 rounded-xl bg-orthodox-candle/20 dark:bg-slate-800/60 border border-orthodox-gold/30 space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
                <span className="text-2xs font-bold text-orthodox-gold-dark dark:text-orthodox-gold uppercase tracking-wider">
                  {date} • {language.toUpperCase()}
                </span>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-orthodox-navy dark:text-orthodox-gold mt-1">
                  {title || (locale === 'ja' ? '（無題の説教）' : '(Untitled Sermon)')}
                </h2>
                {excerpt && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 italic">
                    {excerpt}
                  </p>
                )}
              </div>
              <div className="font-serif leading-relaxed text-slate-800 dark:text-slate-200 text-xs sm:text-sm space-y-3 whitespace-pre-line">
                {content || (locale === 'ja' ? '本文がありません。' : 'No content yet.')}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <div>
            {sermonToEdit && (
              <button
                type="button"
                onClick={handleDelete}
                className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {locale === 'ja' ? '削除' : 'Delete'}
              </button>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {locale === 'ja' ? 'キャンセル' : 'Cancel'}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg bg-orthodox-gold text-orthodox-navy font-bold text-xs shadow-xs hover:bg-orthodox-gold-light active:scale-98 transition-all flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              {locale === 'ja' ? '説教を保存' : 'Save Sermon'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
