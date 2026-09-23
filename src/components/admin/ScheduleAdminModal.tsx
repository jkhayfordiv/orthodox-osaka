'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ParishService, ServiceType, Locale } from '../../lib/types';
import { parseScheduleText, CANONICAL_DUTY_GROUPS, DutyGroup } from '../../lib/scheduleParser';
import {
  X,
  Lock,
  Unlock,
  KeyRound,
  Calendar,
  FileText,
  Upload,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
  Save,
  Check,
  Sparkles,
  Utensils,
  Clock,
  ShieldCheck,
} from 'lucide-react';

const ADMIN_PIN = '1882'; // Founding year of Osaka Holy Protection Church (1882)

const SAMPLE_BULLETIN_TEXT = `【2026年9月 大阪ハリストス正教会 予定表】

9月5日(土) 17:00 徹夜祷（五旬祭後第14主日）
9月6日(日) 10:00 聖体礼儀（五旬祭後第14主日）
愛餐当番：ラボニ（担当：アナスタシヤ石田、アントニナ）
※第1週：聖堂掃除、執事会

9月12日(土) 17:00 徹夜祷（五旬祭後第15主日）
9月13日(日) 10:00 聖体礼儀（五旬祭後第15主日）
愛餐当番：ダリアの台所（担当：アレクサンドラ、アンナ、ナタリヤ）
※月例パニヒダ

9月19日(土) 17:00 徹夜祷（五旬祭後第16主日）
9月20日(日) 10:00 聖体礼儀（五旬祭後第16主日）
愛餐当番：教会フレンズ（担当：マリア、タチアナ、イオアン）
※ぶどうの成聖式

9月26日(土) 17:00 徹夜祷（十字架挙栄祭 前夜）
9月27日(日) 10:00 聖体礼儀（十字架挙栄祭）
愛餐当番：聖歌隊（担当：エレナ、ソフィヤ）
※全斎日（十字架挙栄祭）`;

export function ScheduleAdminModal() {
  const {
    adminModalOpen,
    setAdminModalOpen,
    locale,
    parishSchedule,
    addParishService,
    updateParishService,
    deleteParishService,
    importParishSchedule,
    resetParishSchedule,
  } = useApp();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);

  // Active admin tab
  const [activeTab, setActiveTab] = useState<'import' | 'editor' | 'backup'>('import');

  // Tab 1: Importer state
  const [rawText, setRawText] = useState<string>('');
  const [parseYear, setParseYear] = useState<number>(2026);
  const [parsedServices, setParsedServices] = useState<ParishService[]>([]);
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const [hasParsed, setHasParsed] = useState<boolean>(false);
  const [importMode, setImportMode] = useState<'replace_month' | 'merge'>('replace_month');
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Tab 2: Visual Editor state
  const [selectedEditorMonth, setSelectedEditorMonth] = useState<string>('2026-09');
  const [editingService, setEditingService] = useState<ParishService | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);

  // New/Edit Service Form state
  const [formDate, setFormDate] = useState<string>('');
  const [formTime, setFormTime] = useState<string>('10:00');
  const [formType, setFormType] = useState<ServiceType>('liturgy');
  const [formTitleJa, setFormTitleJa] = useState<string>('');
  const [formTitleEn, setFormTitleEn] = useState<string>('');
  const [formTitleRu, setFormTitleRu] = useState<string>('');
  const [formFeastJa, setFormFeastJa] = useState<string>('');
  const [formDutyGroup, setFormDutyGroup] = useState<string>('Rabboni');
  const [formDutyPeople, setFormDutyPeople] = useState<string>('');
  const [formNotesJa, setFormNotesJa] = useState<string>('');

  // Extract all unique months available in current schedule
  const availableMonths = useMemo(() => {
    const set = new Set<string>();
    parishSchedule.forEach((s) => set.add(s.date.slice(0, 7)));
    return Array.from(set).sort();
  }, [parishSchedule]);

  if (!adminModalOpen) return null;

  // Handle PIN authentication
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError(null);
      setPinInput('');
    } else {
      setPinError(
        locale === 'ja'
          ? 'PINコードが正しくありません。（大阪教会創立年の4桁）'
          : 'Incorrect PIN. Hint: Church founding year (1882).'
      );
    }
  };

  // Trigger parsing
  const handleParse = () => {
    if (!rawText.trim()) return;
    const result = parseScheduleText(rawText, parseYear);
    setParsedServices(result.services);
    setParseErrors(result.errors);
    setHasParsed(true);
  };

  // Remove single parsed service before importing
  const handleRemoveParsedRow = (index: number) => {
    setParsedServices((prev) => prev.filter((_, i) => i !== index));
  };

  // Apply parsed services to app schedule
  const handleApplyImport = () => {
    if (parsedServices.length === 0) return;
    importParishSchedule(parsedServices, importMode === 'replace_month' ? 'replace_month' : 'merge');
    setActionSuccessMessage(
      locale === 'ja'
        ? `✅ ${parsedServices.length}件の奉神礼予定を正常に反映しました！`
        : `✅ Successfully imported ${parsedServices.length} parish services!`
    );
    setTimeout(() => setActionSuccessMessage(null), 5000);
    setParsedServices([]);
    setHasParsed(false);
    setRawText('');
  };

  // Start adding a new service in editor
  const handleStartAddService = () => {
    const defaultDate = `${selectedEditorMonth}-01`;
    setEditingService(null);
    setFormDate(defaultDate);
    setFormTime('10:00');
    setFormType('liturgy');
    setFormTitleJa('聖体礼儀');
    setFormTitleEn('Divine Liturgy');
    setFormTitleRu('Божественная Литургия');
    setFormFeastJa('');
    setFormDutyGroup('Rabboni');
    setFormDutyPeople('');
    setFormNotesJa('');
    setIsAddingNew(true);
  };

  // Start editing existing service
  const handleStartEditService = (service: ParishService) => {
    setEditingService(service);
    setFormDate(service.date);
    setFormTime(service.time);
    setFormType(service.serviceType);
    setFormTitleJa(service.title.ja);
    setFormTitleEn(service.title.en);
    setFormTitleRu(service.title.ru);
    setFormFeastJa(service.feastName?.ja || '');
    setFormDutyGroup(service.dutyGroup || 'none');
    setFormDutyPeople(service.dutyPeople ? service.dutyPeople.join(', ') : '');
    setFormNotesJa(service.notes?.ja || '');
    setIsAddingNew(true);
  };

  // Save Service from Form
  const handleSaveServiceForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDate || !formTime || !formTitleJa) return;

    // Split duty people by commas / spaces
    const dutyPeopleArray = formDutyPeople
      .split(/[,、]/)
      .map((p) => p.trim())
      .filter(Boolean);

    const isSunday = new Date(formDate).getUTCDay() === 0;

    const serviceData: ParishService = {
      id: editingService ? editingService.id : `custom-${formDate}-${formTime.replace(':', '')}`,
      date: formDate,
      time: formTime,
      serviceType: formType,
      title: {
        ja: formTitleJa.trim(),
        en: formTitleEn.trim() || formTitleJa.trim(),
        ru: formTitleRu.trim() || formTitleJa.trim(),
      },
      feastName: formFeastJa.trim()
        ? {
            ja: formFeastJa.trim(),
            en: formFeastJa.trim(),
            ru: formFeastJa.trim(),
          }
        : undefined,
      dutyGroup: isSunday && formDutyGroup !== 'none' ? formDutyGroup : undefined,
      dutyPeople: isSunday && dutyPeopleArray.length > 0 ? dutyPeopleArray : undefined,
      notes: formNotesJa.trim()
        ? {
            ja: formNotesJa.trim(),
            en: formNotesJa.trim(),
            ru: formNotesJa.trim(),
          }
        : undefined,
    };

    if (editingService) {
      updateParishService(editingService.id, serviceData);
      setActionSuccessMessage(locale === 'ja' ? '予定を更新しました' : 'Service updated');
    } else {
      addParishService(serviceData);
      setActionSuccessMessage(locale === 'ja' ? '新しい予定を追加しました' : 'New service added');
    }

    setTimeout(() => setActionSuccessMessage(null), 4000);
    setIsAddingNew(false);
    setEditingService(null);
  };

  // Export JSON file
  const handleExportJson = () => {
    const jsonStr = JSON.stringify(parishSchedule, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orthodox_osaka_schedule_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON file
  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          importParishSchedule(parsed, 'replace');
          setActionSuccessMessage(
            locale === 'ja'
              ? `JSONファイルから ${parsed.length} 件の予定を復元しました`
              : `Imported ${parsed.length} services from JSON`
          );
          setTimeout(() => setActionSuccessMessage(null), 4000);
        } else {
          alert('無効なJSONフォーマットです。予定の配列が含まれている必要があります。');
        }
      } catch (err) {
        alert('JSONファイルの読み込みに失敗しました。');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div className="bg-orthodox-parchment dark:bg-slate-900 border-2 border-orthodox-gold text-slate-800 dark:text-slate-100 rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl relative my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-orthodox-gold/30 pb-3 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-orthodox-gold/20 text-orthodox-gold-dark dark:text-orthodox-gold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light flex items-center space-x-2">
                <span>
                  {locale === 'ja'
                    ? '教会予定表・愛餐当番 管理システム'
                    : locale === 'ru'
                    ? 'Управление расписанием и трапезой'
                    : 'Parish Schedule & Duty Manager'}
                </span>
                {isAuthenticated && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {locale === 'ja'
                  ? '大阪ハリストス正教会 月報テキスト自動取込・奉神礼日程編集'
                  : 'Holy Protection Temple, Osaka — Liturgical Bulletin Admin'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setAdminModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-slate-500 hover:text-slate-900 dark:hover:text-white" />
          </button>
        </div>

        {/* Success toast notification */}
        {actionSuccessMessage && (
          <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-200 flex items-center space-x-2 shadow-xs animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{actionSuccessMessage}</span>
          </div>
        )}

        {/* 1. PIN Screen if not authenticated */}
        {!isAuthenticated ? (
          <div className="py-8 px-4 flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-orthodox-gold/20 flex items-center justify-center text-orthodox-gold">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {locale === 'ja' ? '管理者PIN認証' : 'Administrator PIN'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {locale === 'ja'
                  ? '予定表の編集には管理者PIN（大阪教会 創立年 4桁）を入力してください。'
                  : 'Please enter the 4-digit administrator PIN (Osaka Church founding year: 1882).'}
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="w-full space-y-3">
              <div className="relative">
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="PIN: 1882"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-mono py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-orthodox-gold"
                  autoFocus
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {pinError && <p className="text-xs font-semibold text-red-500">{pinError}</p>}

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-orthodox-gold hover:bg-orthodox-gold-dark text-orthodox-navy font-bold text-sm shadow transition-all flex items-center justify-center space-x-1.5"
              >
                <Unlock className="w-4 h-4" />
                <span>{locale === 'ja' ? 'ロック解除' : 'Unlock Admin'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* 2. Authenticated Admin Dashboard */
          <div className="flex-1 flex flex-col min-h-0 space-y-4">
            {/* Admin Tabs */}
            <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('import')}
                className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition-all ${
                  activeTab === 'import'
                    ? 'bg-orthodox-gold text-orthodox-navy shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>{locale === 'ja' ? '月報テキスト自動取込' : 'Text/PDF Importer'}</span>
              </button>

              <button
                onClick={() => setActiveTab('editor')}
                className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition-all ${
                  activeTab === 'editor'
                    ? 'bg-orthodox-gold text-orthodox-navy shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>{locale === 'ja' ? '月別予定の編集・追加' : 'Schedule Editor'}</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition-all ${
                  activeTab === 'backup'
                    ? 'bg-orthodox-gold text-orthodox-navy shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Save className="w-4 h-4" />
                <span>{locale === 'ja' ? 'バックアップ・復元' : 'Backup & Restore'}</span>
              </button>
            </div>

            {/* TAB 1: Smart Text / PDF Importer */}
            {activeTab === 'import' && (
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-900 dark:text-amber-200 space-y-1">
                  <div className="font-bold flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>神父様の月報・プリントのテキストを自動解析</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-amber-800 dark:text-amber-300">
                    PDFやメールから予定表の文章をコピーしてそのまま貼り付けてください。日付・時刻・徹夜祷/聖体礼儀の種別・主日愛餐当番グループ（ラボニ、ダリアの台所など）・当番信徒名・掃除等の特記事項をAIパーサーが瞬時に判別します。
                  </p>
                </div>

                {/* Input area controls */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <label className="font-bold text-slate-700 dark:text-slate-300">基準年:</label>
                    <select
                      value={parseYear}
                      onChange={(e) => setParseYear(parseInt(e.target.value, 10))}
                      className="py-1 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
                    >
                      <option value={2026}>2026年</option>
                      <option value={2027}>2027年</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setRawText(SAMPLE_BULLETIN_TEXT)}
                    className="text-xs text-orthodox-gold-dark hover:underline font-bold"
                  >
                    📄 9月度月報サンプルを入力
                  </button>
                </div>

                <textarea
                  rows={6}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder={`ここに神父様の月報テキストを貼り付けます\n例:\n9月6日(日) 10:00 聖体礼儀\n愛餐当番：ラボニ（担当：アナスタシヤ、アントニナ）\n※第1週：聖堂掃除、執事会`}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-mono focus:outline-none focus:border-orthodox-gold leading-relaxed"
                />

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setRawText('');
                      setParsedServices([]);
                      setHasParsed(false);
                    }}
                    className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  >
                    クリア
                  </button>

                  <button
                    type="button"
                    onClick={handleParse}
                    disabled={!rawText.trim()}
                    className={`py-2 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow flex items-center space-x-1.5 ${
                      rawText.trim()
                        ? 'bg-orthodox-gold hover:bg-orthodox-gold-dark text-orthodox-navy'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>解析を実行する (Parse)</span>
                  </button>
                </div>

                {/* Parsed Preview Table */}
                {hasParsed && (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>解析結果プレビュー ({parsedServices.length}件の奉神礼を検出)</span>
                      </h4>

                      <div className="flex items-center space-x-2 text-xs">
                        <label className="font-bold text-slate-600 dark:text-slate-400">取込モード:</label>
                        <select
                          value={importMode}
                          onChange={(e) => setImportMode(e.target.value as any)}
                          className="py-1 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
                        >
                          <option value="replace_month">該当月を置き換えて反映（推奨・重複防止）</option>
                          <option value="merge">既存の予定にマージ（追加）</option>
                        </select>
                      </div>
                    </div>

                    {parsedServices.length === 0 ? (
                      <div className="p-4 bg-slate-100 dark:bg-slate-800/60 rounded-xl text-center text-xs text-slate-500">
                        奉神礼の日時を検出できませんでした。日付（例: 9月6日）と奉神礼名（聖体礼儀、徹夜祷など）が含まれているか確認してください。
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {parsedServices.map((service, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-xs"
                          >
                            <div className="flex-1 space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono font-bold text-xs bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-800 dark:text-slate-200">
                                  {service.date}
                                </span>
                                <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
                                  {service.time}
                                </span>
                                <span
                                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                    service.serviceType === 'liturgy'
                                      ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200'
                                      : 'bg-blue-100 text-blue-900 dark:bg-blue-950/60 dark:text-blue-200'
                                  }`}
                                >
                                  {service.serviceType === 'liturgy' ? '聖体礼儀' : '徹夜祷'}
                                </span>
                                <span className="font-bold text-xs text-slate-900 dark:text-white">
                                  {service.title.ja}
                                </span>
                              </div>

                              {/* Duty info */}
                              {service.dutyGroup && (
                                <div className="text-xs flex items-center space-x-1.5 text-slate-600 dark:text-slate-300">
                                  <Utensils className="w-3.5 h-3.5 text-orthodox-gold shrink-0" />
                                  <span className="font-semibold text-orthodox-gold-dark dark:text-orthodox-gold">
                                    愛餐当番: {service.dutyGroup}
                                  </span>
                                  {service.dutyPeople && service.dutyPeople.length > 0 && (
                                    <span className="text-[11px] text-slate-500">
                                      （{service.dutyPeople.join('、')}）
                                    </span>
                                  )}
                                </div>
                              )}

                              {/* Notes */}
                              {service.notes?.ja && (
                                <div className="text-[11px] text-slate-500 italic">
                                  特記: {service.notes.ja}
                                </div>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveParsedRow(idx)}
                              className="text-slate-400 hover:text-red-500 p-1.5 transition-colors self-end sm:self-center"
                              title="除外する"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}

                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={handleApplyImport}
                            className="w-full py-3 rounded-xl bg-orthodox-gold hover:bg-orthodox-gold-dark text-orthodox-navy font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                          >
                            <Check className="w-4 h-4" />
                            <span>解析した予定表をアプリに一括反映する ({parsedServices.length}件)</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Visual Month Editor */}
            {activeTab === 'editor' && (
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {/* Month Picker & Add button */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">対象月:</label>
                    <select
                      value={selectedEditorMonth}
                      onChange={(e) => setSelectedEditorMonth(e.target.value)}
                      className="py-1.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-semibold"
                    >
                      {availableMonths.map((ym) => (
                        <option key={ym} value={ym}>
                          {ym.replace('-', '年')}月 (
                          {parishSchedule.filter((s) => s.date.startsWith(ym)).length}件)
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleStartAddService}
                    className="py-1.5 px-3.5 rounded-xl bg-orthodox-gold hover:bg-orthodox-gold-dark text-orthodox-navy font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>奉神礼を追加</span>
                  </button>
                </div>

                {/* Sub-form: Add / Edit Service */}
                {isAddingNew && (
                  <form
                    onSubmit={handleSaveServiceForm}
                    className="p-4 bg-slate-50 dark:bg-slate-800/80 border-2 border-orthodox-gold/60 rounded-xl space-y-3 animate-in fade-in"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                      <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                        {editingService ? '奉神礼の編集' : '新しい奉神礼の登録'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsAddingNew(false)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-bold block mb-1">日付 (YYYY-MM-DD)</label>
                        <input
                          type="date"
                          value={formDate}
                          onChange={(e) => setFormDate(e.target.value)}
                          required
                          className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold block mb-1">時刻 (例: 10:00)</label>
                        <input
                          type="time"
                          value={formTime}
                          onChange={(e) => setFormTime(e.target.value)}
                          required
                          className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold block mb-1">奉神礼種別</label>
                        <select
                          value={formType}
                          onChange={(e) => setFormType(e.target.value as ServiceType)}
                          className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
                        >
                          <option value="liturgy">聖体礼儀 (Divine Liturgy)</option>
                          <option value="vigil">徹夜祷 (All-Night Vigil)</option>
                          <option value="vespers">晩祷 (Vespers)</option>
                          <option value="water_blessing">聖水式 (Water Blessing)</option>
                          <option value="panikhida">パニヒダ (Panikhida)</option>
                          <option value="moleben">モレーベン (Moleben)</option>
                          <option value="other">特式・その他</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold block mb-1">奉神礼名・祝祭（日本語）</label>
                        <input
                          type="text"
                          value={formTitleJa}
                          onChange={(e) => setFormTitleJa(e.target.value)}
                          placeholder="例: 聖体礼儀（五旬祭後第15主日）"
                          required
                          className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold block mb-1">祝祭名（任意）</label>
                        <input
                          type="text"
                          value={formFeastJa}
                          onChange={(e) => setFormFeastJa(e.target.value)}
                          placeholder="例: 生神女庇護祭"
                          className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                      </div>
                    </div>

                    {/* Meal Duty Section (Sunday only) */}
                    <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 rounded-lg border border-amber-200/80 dark:border-amber-800/40 space-y-2">
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-900 dark:text-amber-200">
                        <Utensils className="w-3.5 h-3.5 text-orthodox-gold" />
                        <span>主日 愛餐（昼食）当番の指定（日曜日のみ）</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold block mb-1 text-slate-700 dark:text-slate-300">
                            当番グループ名:
                          </label>
                          <select
                            value={formDutyGroup}
                            onChange={(e) => setFormDutyGroup(e.target.value)}
                            className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
                          >
                            <option value="none">当番なし（平日など）</option>
                            {CANONICAL_DUTY_GROUPS.map((g) => (
                              <option key={g.id} value={g.id}>
                                {g.ja}
                              </option>
                            ))}
                            <option value="Other">その他</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold block mb-1 text-slate-700 dark:text-slate-300">
                            担当信徒氏名（カンマ区切り）:
                          </label>
                          <input
                            type="text"
                            value={formDutyPeople}
                            onChange={(e) => setFormDutyPeople(e.target.value)}
                            placeholder="例: アナスタシヤ、アントニナ"
                            className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="text-xs font-bold block mb-1">特記事項・掃除・会議など</label>
                      <input
                        type="text"
                        value={formNotesJa}
                        onChange={(e) => setFormNotesJa(e.target.value)}
                        placeholder="例: 第1週：聖堂掃除、執事会"
                        className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingNew(false)}
                        className="py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400"
                      >
                        キャンセル
                      </button>
                      <button
                        type="submit"
                        className="py-1.5 px-4 rounded-lg bg-orthodox-gold hover:bg-orthodox-gold-dark text-orthodox-navy font-bold text-xs shadow transition-all"
                      >
                        保存する
                      </button>
                    </div>
                  </form>
                )}

                {/* List of services in this month */}
                <div className="space-y-2">
                  {parishSchedule
                    .filter((s) => s.date.startsWith(selectedEditorMonth))
                    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
                    .map((service) => (
                      <div
                        key={service.id}
                        className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono font-bold text-xs bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-800 dark:text-slate-200">
                              {service.date}
                            </span>
                            <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
                              {service.time}
                            </span>
                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                service.serviceType === 'liturgy'
                                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200'
                                  : 'bg-blue-100 text-blue-900 dark:bg-blue-950/60 dark:text-blue-200'
                              }`}
                            >
                              {service.serviceType === 'liturgy' ? '聖体礼儀' : '徹夜祷'}
                            </span>
                            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                              {service.title.ja}
                            </span>
                          </div>

                          {service.dutyGroup && (
                            <div className="text-xs flex items-center space-x-1.5 text-slate-600 dark:text-slate-300">
                              <Utensils className="w-3.5 h-3.5 text-orthodox-gold shrink-0" />
                              <span className="font-semibold text-orthodox-gold-dark dark:text-orthodox-gold">
                                愛餐当番: {service.dutyGroup}
                              </span>
                              {service.dutyPeople && service.dutyPeople.length > 0 && (
                                <span className="text-[11px] text-slate-500">
                                  （{service.dutyPeople.join('、')}）
                                </span>
                              )}
                            </div>
                          )}

                          {service.notes?.ja && (
                            <div className="text-[11px] text-slate-500">
                              特記: {service.notes.ja}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-1">
                          <button
                            type="button"
                            onClick={() => handleStartEditService(service)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                            title="編集"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`「${service.title.ja}」を削除しますか？`)) {
                                deleteParishService(service.id);
                              }
                            }}
                            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/50 text-slate-400 hover:text-red-500"
                            title="削除"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TAB 3: Backup & Restore */}
            {activeTab === 'backup' && (
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3">
                  <div className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center space-x-2">
                    <Download className="w-4 h-4 text-orthodox-gold" />
                    <span>予定表データのバックアップ（JSON出力）</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    現在アプリに保存されている全奉神礼予定（現在 {parishSchedule.length} 件）をバックアップファイルとしてダウンロードします。
                  </p>
                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="py-2 px-4 rounded-xl bg-orthodox-gold hover:bg-orthodox-gold-dark text-orthodox-navy font-bold text-xs sm:text-sm shadow transition-all flex items-center space-x-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>JSONファイルをダウンロード</span>
                  </button>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3">
                  <div className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center space-x-2">
                    <Upload className="w-4 h-4 text-orthodox-gold" />
                    <span>バックアップからの復元（JSON読み込み）</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    以前書き出したJSONファイルから予定表を一括復元します。
                  </p>
                  <label className="inline-flex items-center space-x-2 py-2 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 cursor-pointer font-bold text-xs sm:text-sm">
                    <Upload className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    <span>ファイルを選択して復元</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJsonFile}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="p-4 bg-red-50/60 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 rounded-xl space-y-2">
                  <div className="font-bold text-sm text-red-800 dark:text-red-300 flex items-center space-x-2">
                    <RotateCcw className="w-4 h-4 text-red-600" />
                    <span>初期データ（2026年標準スケジュール）にリセット</span>
                  </div>
                  <p className="text-xs text-red-700/80 dark:text-red-400 leading-relaxed">
                    カスタム追加・編集した予定をすべて消去し、アプリ内蔵の2026年初期予定表データに戻します。この操作は取り消せません。
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('本当に初期データにリセットしますか？カスタム変更内容は失われます。')) {
                        resetParishSchedule();
                        setActionSuccessMessage('予定表を初期状態にリセットしました');
                        setTimeout(() => setActionSuccessMessage(null), 4000);
                      }
                    }}
                    className="py-1.5 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all"
                  >
                    初期データにリセットする
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-orthodox-gold/30 flex justify-between items-center text-xs text-slate-500">
          <div>
            {isAuthenticated ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1">
                <Check className="w-3.5 h-3.5" />
                <span>認証中 (PIN: 1882)</span>
              </span>
            ) : (
              <span>大阪正教会 予定表管理</span>
            )}
          </div>
          <button
            onClick={() => setAdminModalOpen(false)}
            className="py-1.5 px-4 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-bold text-slate-800 dark:text-slate-200 transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
