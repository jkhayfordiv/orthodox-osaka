'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { PARISH_INFO } from '../../data/terminology';
import { TokushohoModal } from './TokushohoModal';
import { Church, ShieldCheck, FileText, Phone, Mail, MapPin, Heart } from 'lucide-react';

export function SiteFooter() {
  const { locale, setActiveTab } = useApp();
  const [isTokushohoOpen, setIsTokushohoOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-12 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Parish Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-serif font-bold text-base">
                <Church className="w-5 h-5 text-orthodox-gold flex-shrink-0" />
                <span>{PARISH_INFO.name[locale]}</span>
              </div>
              <p className="text-2xs text-slate-500 dark:text-slate-400 font-serif">
                {locale === 'ja' ? (
                  <>
                    <Link href="/westjapan" className="text-orthodox-gold hover:underline font-semibold">
                      日本ハリストス正教会 西日本主教区
                    </Link>{' '}
                    所属教会
                  </>
                ) : (
                  <Link href="/westjapan" className="text-orthodox-gold hover:underline">
                    Western Japan Diocese of the Autonomous Orthodox Church of Japan
                  </Link>
                )}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
                {PARISH_INFO.address[locale]} · {PARISH_INFO.access[locale]}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                <a href={`tel:${PARISH_INFO.phone}`} className="flex items-center gap-1.5 hover:text-orthodox-gold transition-colors font-mono">
                  <Phone className="w-3.5 h-3.5 text-orthodox-gold" />
                  <span>{PARISH_INFO.phone}</span>
                </a>
                <a href={`mailto:${PARISH_INFO.email}`} className="flex items-center gap-1.5 hover:text-orthodox-gold transition-colors font-mono">
                  <Mail className="w-3.5 h-3.5 text-orthodox-gold" />
                  <span>{PARISH_INFO.email}</span>
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="space-y-2">
              <div className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-2xs">
                {locale === 'ja' ? '教会案内・参祷' : 'Parish Navigation'}
              </div>
              <ul className="space-y-1.5">
                <li>
                  <button onClick={() => setActiveTab('today')} className="hover:text-orthodox-gold transition-colors font-bold text-orthodox-gold">
                    {locale === 'ja' ? '今日（日課・斎・聖人）' : 'Today’s Fast & Saints'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('home')} className="hover:text-orthodox-gold transition-colors">
                    {locale === 'ja' ? '教会案内トップ' : 'Our Parish'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('orthodoxy')} className="hover:text-orthodox-gold transition-colors">
                    {locale === 'ja' ? '正教会とは（入門手引）' : 'About Orthodoxy'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('history')} className="hover:text-orthodox-gold transition-colors">
                    {locale === 'ja' ? '教会の歴史・文化財' : 'Parish History'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('access')} className="hover:text-orthodox-gold transition-colors">
                    {locale === 'ja' ? '礼拝案内・アクセス' : 'Visit & Service Times'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('sermons')} className="hover:text-orthodox-gold transition-colors">
                    {locale === 'ja' ? '主日説教アーカイブ' : 'Sermon Archive'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Dedicated Portals */}
            <div className="space-y-2">
              <div className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-2xs">
                {locale === 'ja' ? '研究・専門ポータル群' : 'Portals & Archives'}
              </div>
              <ul className="space-y-1.5">
                <li>
                  <Link href="/george" className="hover:text-orthodox-gold transition-colors flex items-center gap-1.5">
                    <span className="text-orthodox-gold">📖</span>
                    <span>{locale === 'ja' ? '司祭ゲオルギイ松島雄一 神学' : 'Fr. George Archive'}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/maria" className="hover:text-orthodox-gold transition-colors flex items-center gap-1.5">
                    <span className="text-indigo-400">🎵</span>
                    <span>{locale === 'ja' ? 'マリア松島純子 聖歌ポータル' : 'Matushka Maria Music'}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/liturgy" className="hover:text-orthodox-gold transition-colors flex items-center gap-1.5">
                    <span className="text-rose-400">🕊️</span>
                    <span>{locale === 'ja' ? '日本正教会 奉神礼・祈祷文集' : 'Liturgical Texts'}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/westjapan" className="hover:text-orthodox-gold transition-colors font-bold text-orthodox-gold flex items-center gap-1.5 pt-0.5">
                    <span>🧭</span>
                    <span>{locale === 'ja' ? '西日本主教区（各地の聖堂）' : 'Western Diocese Parishes'}</span>
                    <span>→</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Compliance & Legal */}
            <div className="space-y-2">
              <div className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-2xs">
                {locale === 'ja' ? '法的表記・コンプライアンス' : 'Compliance & Legal'}
              </div>
              <ul className="space-y-1.5">
                <li>
                  <button
                    onClick={() => setIsTokushohoOpen(true)}
                    className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-400 hover:underline font-medium text-left"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>特定商取引法に基づく表示</span>
                  </button>
                </li>
                <li>
                  <a
                    href="/tokushoho.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>特定商取引法草案 (PDF)</span>
                  </a>
                </li>
                <li className="text-2xs text-slate-400 pt-1">
                  オンライン献金および会費決済に関する法定表示を遵守しています。
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-2xs text-slate-500">
            <span>© 2026 {PARISH_INFO.name[locale]}. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <span>生神女庇護聖堂 (Pokrov)</span>
              <span>·</span>
              <button onClick={() => setIsTokushohoOpen(true)} className="hover:underline">
                特定商取引法に基づく表示
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Statutory Tokushoho Modal */}
      <TokushohoModal
        isOpen={isTokushohoOpen}
        onClose={() => setIsTokushohoOpen(false)}
      />
    </>
  );
}
