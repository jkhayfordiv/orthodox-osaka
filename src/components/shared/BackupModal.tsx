'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  QrCode,
  Download,
  Upload,
  Copy,
  Check,
  Smartphone,
  ShieldCheck,
  AlertCircle,
  FileText,
  Printer,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import QRCode from 'qrcode';

export function BackupModal() {
  const {
    backupModalOpen,
    setBackupModalOpen,
    locale,
    prayerList,
    familyMembers,
    exportBackupJson,
    importBackupJson,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'qr' | 'file' | 'print'>('qr');
  const [qrMode, setQrMode] = useState<'show' | 'import'>('show');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [manualCode, setManualCode] = useState<string>('');
  const [importStatus, setImportStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate QR code when modal opens or prayer list updates
  useEffect(() => {
    if (!backupModalOpen) {
      setImportStatus({ type: null, message: '' });
      return;
    }

    try {
      const json = exportBackupJson();
      // Generate QR Data URL
      QRCode.toDataURL(json, {
        errorCorrectionLevel: 'M',
        margin: 2,
        width: 340,
        color: {
          dark: '#1e293b',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => {
          console.warn('QR code generation failed for full payload, using compact fallback', err);
          // Fallback: create compact payload for QR
          const compact = JSON.stringify({
            app: 'orthodox-osaka',
            p: prayerList.map((x) => ({ t: x.type, n: x.name, b: x.baptismalName, s: x.saintId, r: x.relation })),
            f: familyMembers,
          });
          QRCode.toDataURL(compact, { errorCorrectionLevel: 'L', margin: 2, width: 340 })
            .then((url) => setQrDataUrl(url))
            .catch(() => {});
        });
    } catch (e) {
      console.error('Error preparing QR data', e);
    }
  }, [backupModalOpen, prayerList, familyMembers, exportBackupJson]);

  if (!backupModalOpen) return null;

  const handleCopyCode = () => {
    const json = exportBackupJson();
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleDownloadFile = () => {
    try {
      const json = exportBackupJson();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      a.href = url;
      a.download = `orthodox-osaka-backup-${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setImportStatus({
        type: 'success',
        message:
          locale === 'ja'
            ? 'バックアップファイルを保存しました。'
            : locale === 'ru'
            ? 'Файл резервной копии успешно сохранен.'
            : 'Backup file saved successfully.',
      });
    } catch (err: any) {
      setImportStatus({
        type: 'error',
        message: err.message || 'Export failed',
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        processImportJson(content);
      }
    };
    reader.readAsText(file);
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const processImportJson = (jsonStr: string) => {
    try {
      // Check if compact payload
      let raw = jsonStr.trim();
      const res = importBackupJson(raw);
      if (res.success) {
        setImportStatus({
          type: 'success',
          message:
            locale === 'ja'
              ? `復元が完了しました！（祈りの名: ${res.prayerCount}名）`
              : locale === 'ru'
              ? `Данные успешно восстановлены! (Имен: ${res.prayerCount})`
              : `Restore successful! (${res.prayerCount} prayer names restored)`,
        });
      } else {
        setImportStatus({
          type: 'error',
          message: res.error || 'Invalid backup data',
        });
      }
    } catch (err: any) {
      setImportStatus({
        type: 'error',
        message: err.message || 'Import failed',
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border-2 border-orthodox-gold text-slate-800 dark:text-slate-100 rounded-3xl max-w-lg md:max-w-2xl w-full p-5 sm:p-8 shadow-2xl relative my-8 max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-orthodox-gold/20 text-orthodox-gold flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-orthodox-navy dark:text-amber-200">
                {locale === 'ja'
                  ? 'データの保存と端末引き継ぎ'
                  : locale === 'ru'
                  ? 'Резервная копия и перенос'
                  : 'Backup & Device Transfer'}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {locale === 'ja'
                  ? '祈り名・記念誌はすべて端末内に安全に保管されます（完全非公開）'
                  : locale === 'ru'
                  ? 'Имена помянника хранятся только на вашем устройстве (100% приватно)'
                  : 'Prayer lists & settings are stored locally on your device (100% private)'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setBackupModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-slate-400 hover:text-slate-700 dark:hover:text-white" />
          </button>
        </div>

        {/* Status Notification Banner */}
        {importStatus.type && (
          <div
            className={`mb-5 p-3.5 rounded-2xl flex items-center gap-2.5 text-xs font-semibold ${
              importStatus.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-800'
                : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-950/40 dark:text-red-200 dark:border-red-800'
            }`}
          >
            {importStatus.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            )}
            <span>{importStatus.message}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl text-xs font-semibold mb-6">
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'qr'
                ? 'bg-white dark:bg-slate-700 text-orthodox-navy dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <QrCode className="w-4 h-4 text-orthodox-gold" />
            <span>{locale === 'ja' ? 'QRで引き継ぎ' : locale === 'ru' ? 'По QR-коду' : 'QR Transfer'}</span>
          </button>

          <button
            onClick={() => setActiveTab('file')}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'file'
                ? 'bg-white dark:bg-slate-700 text-orthodox-navy dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Download className="w-4 h-4 text-orthodox-gold" />
            <span>{locale === 'ja' ? 'ファイル保存' : locale === 'ru' ? 'Файл бэкапа' : 'File Backup'}</span>
          </button>

          <button
            onClick={() => setActiveTab('print')}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'print'
                ? 'bg-white dark:bg-slate-700 text-orthodox-navy dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Printer className="w-4 h-4 text-orthodox-gold" />
            <span>{locale === 'ja' ? '記念誌印刷' : locale === 'ru' ? 'Печать помянника' : 'Print List'}</span>
          </button>
        </div>

        {/* ========================================================
            TAB 1: QR CODE TRANSFER (INSTANT DEVICE-TO-DEVICE)
        ======================================================== */}
        {activeTab === 'qr' && (
          <div className="space-y-6">
            {/* Mode Toggle: Show QR vs Import */}
            <div className="flex justify-center">
              <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setQrMode('show')}
                  className={`px-4 py-1.5 rounded-lg transition-all ${
                    qrMode === 'show'
                      ? 'bg-orthodox-gold text-orthodox-navy font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {locale === 'ja' ? '① この端末のQRを表示' : locale === 'ru' ? 'Показать мой QR' : 'Show My QR Code'}
                </button>
                <button
                  onClick={() => setQrMode('import')}
                  className={`px-4 py-1.5 rounded-lg transition-all ${
                    qrMode === 'import'
                      ? 'bg-orthodox-gold text-orthodox-navy font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {locale === 'ja' ? '② 新しい端末で読み込む' : locale === 'ru' ? 'Импортировать' : 'Import on New Device'}
                </button>
              </div>
            </div>

            {qrMode === 'show' ? (
              <div className="space-y-4 text-center">
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                  {locale === 'ja'
                    ? '新しいスマートフォンのカメラでこのQRコードを読み取るか、本アプリでインポートすると祈り名が瞬時に引き継がれます。'
                    : locale === 'ru'
                    ? 'Отсканируйте этот QR-код камерой нового устройства, чтобы мгновенно перенести все имена помянника.'
                    : 'Scan this QR code with your new device’s camera or this app to immediately transfer all prayer names and settings.'}
                </p>

                {/* QR Code Container */}
                <div className="inline-block p-4 rounded-3xl bg-white shadow-md border-2 border-orthodox-gold/40 mx-auto">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="Transfer QR Code"
                      className="w-56 h-56 sm:w-64 sm:h-64 object-contain mx-auto"
                    />
                  ) : (
                    <div className="w-56 h-56 flex items-center justify-center text-slate-400">
                      <RefreshCw className="w-8 h-8 animate-spin text-orthodox-gold" />
                    </div>
                  )}
                </div>

                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {locale === 'ja'
                    ? `登録済み: 祈り名 ${prayerList.length}件 · ご家族 ${familyMembers.length}件`
                    : locale === 'ru'
                    ? `В помяннике: ${prayerList.length} имен · Семья: ${familyMembers.length}`
                    : `Packaged: ${prayerList.length} prayer names · ${familyMembers.length} family members`}
                </div>

                {/* Copy Text Code Option */}
                <div className="pt-2">
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-600">
                          {locale === 'ja' ? 'コードをコピーしました！' : locale === 'ru' ? 'Скопировано!' : 'Code Copied!'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-orthodox-gold" />
                        <span>
                          {locale === 'ja' ? '引き継ぎコードをコピー' : locale === 'ru' ? 'Скопировать код текстом' : 'Copy Transfer Code Text'}
                        </span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {locale === 'ja'
                      ? '※ メールやメモ帳に貼り付けて自分宛に送ることもできます。'
                      : locale === 'ru'
                      ? 'Можно отправить код себе в заметки или на почту.'
                      : 'You can also paste this into a private note or send it to yourself.'}
                  </p>
                </div>
              </div>
            ) : (
              /* Import Mode */
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 text-xs space-y-2">
                  <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" />
                    <span>{locale === 'ja' ? '引き継ぎコードの貼り付け' : locale === 'ru' ? 'Вставить код переноса' : 'Paste Transfer Code'}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    {locale === 'ja'
                      ? '旧端末で「コードをコピー」した内容をここに貼り付けて「復元する」を押してください。'
                      : locale === 'ru'
                      ? 'Вставьте скопированный с прошлого устройства код и нажмите «Восстановить».'
                      : 'Paste the transfer code copied from your previous device and tap Restore.'}
                  </p>
                </div>

                <textarea
                  rows={4}
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder={
                    locale === 'ja'
                      ? 'ここにコードを貼り付け...'
                      : locale === 'ru'
                      ? 'Вставьте код здесь...'
                      : 'Paste transfer code here...'
                  }
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:border-orthodox-gold"
                />

                <button
                  disabled={!manualCode.trim()}
                  onClick={() => processImportJson(manualCode)}
                  className="w-full py-3 rounded-xl bg-orthodox-navy hover:bg-orthodox-navy/90 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-4 h-4 text-orthodox-gold" />
                  <span>
                    {locale === 'ja' ? 'データを復元する' : locale === 'ru' ? 'Восстановить помянник' : 'Restore Prayer Data'}
                  </span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 2: FILE BACKUP & RESTORE (.JSON)
        ======================================================== */}
        {activeTab === 'file' && (
          <div className="space-y-6">
            {/* Export Card */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-2 font-serif font-bold text-sm text-slate-900 dark:text-white">
                <Download className="w-4 h-4 text-orthodox-gold" />
                <span>
                  {locale === 'ja' ? '① バックアップファイルを保存' : locale === 'ru' ? 'Скачать файл резервной копии' : 'Export Backup File'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {locale === 'ja'
                  ? '登録された祈り名、ご家族の聖名日、個人設定を含むバックアップファイル（.json）をダウンロードします。端末のファイルアプリ、iCloud、Googleドライブ等に安全に保管できます。'
                  : locale === 'ru'
                  ? 'Скачивает файл (.json) со всеми вашими записями, именами и днями ангела. Сохраните в файлы устройства или облако.'
                  : 'Downloads a secure .json backup containing all your prayer names, patron saints, and settings. Store in Files, iCloud, or Google Drive.'}
              </p>
              <button
                onClick={handleDownloadFile}
                className="w-full py-2.5 rounded-xl bg-orthodox-navy hover:bg-orthodox-navy/90 text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-orthodox-gold" />
                <span>
                  {locale === 'ja' ? 'バックアップをダウンロード (.json)' : locale === 'ru' ? 'Скачать бэкап (.json)' : 'Download Backup File (.json)'}
                </span>
              </button>
            </div>

            {/* Import Card */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-2 font-serif font-bold text-sm text-slate-900 dark:text-white">
                <Upload className="w-4 h-4 text-orthodox-gold" />
                <span>
                  {locale === 'ja' ? '② バックアップファイルから復元' : locale === 'ru' ? 'Восстановить из файла' : 'Restore from Backup File'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {locale === 'ja'
                  ? '以前保存したバックアップファイル（.json）を選択すると、祈りの名簿をすぐに元通りに復元できます。'
                  : locale === 'ru'
                  ? 'Выберите ранее сохраненный файл (.json) для восстановления помянника на этом устройстве.'
                  : 'Select a previously saved .json backup file to restore all your prayer lists immediately.'}
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileChange}
                className="hidden"
                id="backup-file-upload"
              />

              <label
                htmlFor="backup-file-upload"
                className="w-full py-2.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <Upload className="w-4 h-4 text-orthodox-gold" />
                <span>
                  {locale === 'ja' ? 'ファイルを選択して復元' : locale === 'ru' ? 'Выбрать файл' : 'Select Backup File to Restore'}
                </span>
              </label>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: PRINTABLE COMMEMORATION SLIP (PROSKOMEDIA / PANIKHIDA)
        ======================================================== */}
        {activeTab === 'print' && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 text-xs space-y-2">
              <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                <span>
                  {locale === 'ja' ? '聖体礼儀・パニヒダ用 記念誌用紙' : locale === 'ru' ? 'Записка о здравии и упокоении' : 'Commemoration Slip for Liturgy'}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {locale === 'ja'
                  ? '教会での聖体礼儀（奉献礼儀）やパニヒダ（記憶祭）に持参できる伝統的な記念誌フォーマットで印刷できます。'
                  : locale === 'ru'
                  ? 'Распечатайте имена близких для подачи на проскомидию или панихиду в храме.'
                  : 'Print a clean traditional slip of your living and departed loved ones to bring to the church altar.'}
              </p>
            </div>

            {/* Print Preview Container */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4 max-h-60 overflow-y-auto font-serif">
              {/* Living Section */}
              <div className="space-y-1">
                <div className="font-bold text-xs text-orthodox-navy dark:text-amber-300 border-b pb-1">
                  {locale === 'ja' ? '生者（聖寿）' : locale === 'ru' ? 'О здравии' : 'For the Living'}
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 flex flex-wrap gap-2 pt-1">
                  {prayerList.filter((p) => p.type === 'living').length > 0 ? (
                    prayerList
                      .filter((p) => p.type === 'living')
                      .map((p) => (
                        <span key={p.id} className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                          {p.name} {p.baptismalName ? `(${p.baptismalName})` : ''}
                        </span>
                      ))
                  ) : (
                    <span className="text-slate-400 italic text-[11px]">
                      {locale === 'ja' ? '未登録' : 'None registered'}
                    </span>
                  )}
                </div>
              </div>

              {/* Departed Section */}
              <div className="space-y-1 pt-2">
                <div className="font-bold text-xs text-slate-600 dark:text-slate-400 border-b pb-1">
                  {locale === 'ja' ? '死者（永眠）' : locale === 'ru' ? 'О упокоении' : 'For the Departed'}
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 flex flex-wrap gap-2 pt-1">
                  {prayerList.filter((p) => p.type === 'departed').length > 0 ? (
                    prayerList
                      .filter((p) => p.type === 'departed')
                      .map((p) => (
                        <span key={p.id} className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                          {p.name} {p.baptismalName ? `(${p.baptismalName})` : ''}
                        </span>
                      ))
                  ) : (
                    <span className="text-slate-400 italic text-[11px]">
                      {locale === 'ja' ? '未登録' : 'None registered'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handlePrint}
              className="w-full py-3 rounded-xl bg-orthodox-gold hover:bg-orthodox-gold-light text-orthodox-navy font-bold text-xs sm:text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>{locale === 'ja' ? 'この名簿を印刷する' : locale === 'ru' ? 'Распечатать записку' : 'Print Commemoration Slip'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
