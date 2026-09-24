'use client';

import React from 'react';
import { X, FileText, Download, ShieldCheck, ExternalLink, Building, User, MapPin, Phone, Mail, CreditCard, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TokushohoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TokushohoModal({ isOpen, onClose }: TokushohoModalProps) {
  const { locale } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 flex items-center justify-center flex-shrink-0 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {locale === 'ja'
                  ? '特定商取引法に基づく表示'
                  : locale === 'ru'
                  ? 'Сведения по Закону об особых коммерческих сделках'
                  : 'Specified Commercial Transactions Act Disclosure'}
              </h2>
              <p className="text-2xs sm:text-xs text-slate-500 dark:text-slate-400">
                {locale === 'ja'
                  ? 'オンライン献金・決済に関する法定事項の開示'
                  : 'Statutory compliance details regarding donations and contributions'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
            <dl className="divide-y divide-slate-100 dark:divide-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 bg-slate-50/50 dark:bg-slate-800/40">
                <dt className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Building className="w-4 h-4 text-orthodox-gold" />
                  <span>事業者名</span>
                </dt>
                <dd className="sm:col-span-2 text-slate-900 dark:text-white font-medium mt-1 sm:mt-0">
                  大阪ハリストス正教会
                </dd>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 p-4">
                <dt className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <User className="w-4 h-4 text-orthodox-gold" />
                  <span>代表責任者名</span>
                </dt>
                <dd className="sm:col-span-2 text-slate-900 dark:text-white font-medium mt-1 sm:mt-0">
                  松島 雄一（長司祭 ゲオルギイ 松島 雄一）
                </dd>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 bg-slate-50/50 dark:bg-slate-800/40">
                <dt className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orthodox-gold" />
                  <span>所在地</span>
                </dt>
                <dd className="sm:col-span-2 text-slate-900 dark:text-white mt-1 sm:mt-0">
                  〒564-0073 大阪府吹田市山手町１丁目８−１５
                </dd>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 p-4">
                <dt className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orthodox-gold" />
                  <span>電話番号</span>
                </dt>
                <dd className="sm:col-span-2 font-mono text-slate-900 dark:text-white mt-1 sm:mt-0">
                  <a href="tel:06-6388-4512" className="hover:underline">06-6388-4512</a>
                </dd>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 bg-slate-50/50 dark:bg-slate-800/40">
                <dt className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orthodox-gold" />
                  <span>メールアドレス</span>
                </dt>
                <dd className="sm:col-span-2 font-mono text-slate-900 dark:text-white mt-1 sm:mt-0">
                  <a href="mailto:osaka.orthodox.church@gmail.com" className="hover:underline">osaka.orthodox.church@gmail.com</a>
                </dd>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 p-4">
                <dt className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-orthodox-gold" />
                  <span>サイトURL</span>
                </dt>
                <dd className="sm:col-span-2 font-mono text-xs text-slate-900 dark:text-white mt-1 sm:mt-0">
                  https://orthodox-jp.com/osaka/
                </dd>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 bg-slate-50/50 dark:bg-slate-800/40">
                <dt className="font-semibold text-slate-700 dark:text-slate-300">
                  献金・指定金額
                </dt>
                <dd className="sm:col-span-2 text-slate-900 dark:text-white mt-1 sm:mt-0">
                  上限10万円未満で100円〜99,999円内で金額を指定
                </dd>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 p-4">
                <dt className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-orthodox-gold" />
                  <span>支払方法</span>
                </dt>
                <dd className="sm:col-span-2 text-slate-900 dark:text-white mt-1 sm:mt-0 space-y-1">
                  <div>・クレジットカード決済</div>
                  <div>・銀行振込</div>
                  <div>・口座振替</div>
                </dd>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 bg-slate-50/50 dark:bg-slate-800/40">
                <dt className="font-semibold text-slate-700 dark:text-slate-300">
                  商品代金以外の手数料
                </dt>
                <dd className="sm:col-span-2 text-slate-900 dark:text-white mt-1 sm:mt-0">
                  銀行振込の場合：各金融機関所定の振込手数料
                </dd>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 p-4">
                <dt className="font-semibold text-slate-700 dark:text-slate-300">
                  支払時期
                </dt>
                <dd className="sm:col-span-2 text-slate-900 dark:text-white mt-1 sm:mt-0 space-y-2">
                  <div>
                    <span className="font-semibold">＜スポットでの献金＞</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      銀行振込：振込時点で献金が成立／クレジットカード決済：献金申し込み時点で決済
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold">＜月額献金の決済＞</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      クレジットカード決済：初回申し込み時に決済、次月以降は毎月25日に請求
                    </p>
                  </div>
                </dd>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 bg-slate-50/50 dark:bg-slate-800/40">
                <dt className="font-semibold text-slate-700 dark:text-slate-300">
                  引渡し時期
                </dt>
                <dd className="sm:col-span-2 text-slate-900 dark:text-white mt-1 sm:mt-0">
                  献金であるため、商品の引き渡し等はございません。
                </dd>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 p-4">
                <dt className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-orthodox-gold" />
                  <span>返金・キャンセルについて</span>
                </dt>
                <dd className="sm:col-span-2 text-slate-900 dark:text-white mt-1 sm:mt-0">
                  性質上、原則として返金には応じかねます。金額の相違など、万が一の場合は教会問合せ窓口までご連絡ください。
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Footer with PDF Download */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-500">日本ハリストス正教会 西日本主教区 大阪ハリストス正教会</span>
          <a
            href="/tokushoho.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orthodox-navy dark:bg-slate-800 text-white font-semibold hover:bg-orthodox-navy/90 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-orthodox-gold" />
            <span>公式原本PDFを表示・保存</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  );
}
