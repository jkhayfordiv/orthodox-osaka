'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Music,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Mail,
  Download,
  ExternalLink,
  ChevronLeft,
  Award,
  BookOpen,
  ArrowRight,
  Phone,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CONCERT_EVENT_DATA } from '../../data/parishWebsiteData';
import { PARISH_INFO } from '../../data/terminology';

export function RachmaninoffConcertView() {
  const { locale } = useApp();
  const [activeFlyerPage, setActiveFlyerPage] = useState<1 | 2>(1);
  const [flyerLocale, setFlyerLocale] = useState<'ja' | 'en' | 'ru'>(locale);

  React.useEffect(() => {
    setFlyerLocale(locale);
  }, [locale]);

  const event = CONCERT_EVENT_DATA;
  const currentFlyerImage =
    event.flyerImagesByLocale?.[flyerLocale]?.[activeFlyerPage === 1 ? 'p1' : 'p2'] ||
    (activeFlyerPage === 1 ? event.flyerImages.p1 : event.flyerImages.p2);

  const currentPdfUrl = event.pdfFlyerUrls?.[flyerLocale] || event.pdfFlyerUrl;

  const mailtoSubject = encodeURIComponent(
    locale === 'ja'
      ? '2027年2月23日 ラフマニノフ演奏会 事前お問い合わせ'
      : locale === 'ru'
      ? 'Концерт Рахманинова 23 февраля 2027 г. — Вопрос'
      : 'Rachmaninoff Concert Feb 23, 2027 — Inquiry'
  );

  const mailtoBody = encodeURIComponent(
    locale === 'ja'
      ? 'お名前（ふりがな）：\n参加希望人数：\n電話番号：\n事前のお問い合わせ内容・ご質問：\n\n※2026年12月1日より正式なご予約受付を開始いたします。\n'
      : locale === 'ru'
      ? 'ФИО:\nКоличество мест:\nТелефон:\nВопросы/пожелания:\n\n* Официальное бронирование откроется 1 декабря 2026 г.\n'
      : 'Full Name:\nNumber of Attendees:\nPhone Number:\nQuestions / Inquiries:\n\n* Formal reservations open December 1, 2026.\n'
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-slate-950 text-stone-900 dark:text-stone-100 pb-24">
      {/* Editorial Header Banner */}
      <div className="relative bg-orthodox-navy text-white py-14 lg:py-18 px-4 sm:px-6 lg:px-8 border-b border-amber-900/30">
        <div className="max-w-5xl mx-auto space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-200/80 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{locale === 'ja' ? '教会トップへ戻る' : 'Back to Parish Home'}</span>
          </Link>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-orthodox-gold-light uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-orthodox-gold" />
              <span>{event.subtitle[locale]}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              {event.title[locale]}
            </h1>

            <p className="font-serif text-lg sm:text-xl text-amber-200 font-light">
              {event.artist.name[locale]}
            </p>
          </div>

          <p className="font-serif text-sm sm:text-base text-stone-200 max-w-3xl leading-relaxed pt-2">
            {event.themePoem[locale]}
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* 4 Logistics Cards (Hairline Editorial Borders) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-md bg-white dark:bg-slate-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              <Calendar className="w-4 h-4" />
              <span>{locale === 'ja' ? '日時' : 'Date & Time'}</span>
            </div>
            <div className="font-serif font-bold text-base text-stone-900 dark:text-white pt-1">
              {event.date.fullDisplay[locale]}
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400">
              {event.date.doorsOpen[locale]} / {event.date.time[locale]}
            </div>
          </div>

          <div className="p-5 rounded-md bg-white dark:bg-slate-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              <MapPin className="w-4 h-4" />
              <span>{locale === 'ja' ? '会場' : 'Venue'}</span>
            </div>
            <div className="font-serif font-bold text-base text-stone-900 dark:text-white pt-1">
              {event.venue.name[locale]}
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400 leading-snug">
              {event.venue.address[locale]}
            </div>
          </div>

          <div className="p-5 rounded-md bg-white dark:bg-slate-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              <Ticket className="w-4 h-4" />
              <span>{locale === 'ja' ? '入場料・定員' : 'Admission'}</span>
            </div>
            <div className="font-serif font-bold text-xl text-stone-900 dark:text-white pt-1">
              {event.admission.price}
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400">
              {event.admission.seating[locale]}
            </div>
          </div>

          <div className="p-5 rounded-md bg-white dark:bg-slate-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              <Clock className="w-4 h-4" />
              <span>{locale === 'ja' ? '予約受付' : 'Booking'}</span>
            </div>
            <div className="font-serif font-bold text-sm text-stone-900 dark:text-white pt-1">
              {event.reservationInfo.reservationStartDate[locale]}
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400">
              {event.reservationInfo.method[locale]}
            </div>
          </div>
        </div>

        {/* 2-Column: Flyer Viewer + Program & Performer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5 Cols: Flyer Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between gap-1 p-1 bg-stone-100 dark:bg-slate-900 rounded-md border border-stone-200 dark:border-stone-800 text-xs">
              <span className="px-2 text-stone-500 font-medium text-2xs">
                {locale === 'ja' ? 'チラシ言語:' : 'Edition:'}
              </span>
              <div className="flex items-center gap-1">
                {(['ja', 'en', 'ru'] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setFlyerLocale(l)}
                    className={`px-2.5 py-0.5 rounded text-2xs font-semibold transition-colors ${
                      flyerLocale === l
                        ? 'bg-orthodox-navy text-white'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-md overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-900 shadow-sm aspect-3/4">
              <img
                src={currentFlyerImage}
                alt="Rachmaninoff Concert Flyer"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Page switcher & PDF download */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveFlyerPage(1)}
                  className={`px-3 py-1.5 rounded-md font-semibold text-xs border ${
                    activeFlyerPage === 1
                      ? 'bg-orthodox-navy text-white border-orthodox-navy'
                      : 'bg-white dark:bg-slate-900 text-stone-700 dark:text-stone-200 border-stone-200'
                  }`}
                >
                  {locale === 'ja' ? '表面' : 'Page 1'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFlyerPage(2)}
                  className={`px-3 py-1.5 rounded-md font-semibold text-xs border ${
                    activeFlyerPage === 2
                      ? 'bg-orthodox-navy text-white border-orthodox-navy'
                      : 'bg-white dark:bg-slate-900 text-stone-700 dark:text-stone-200 border-stone-200'
                  }`}
                >
                  {locale === 'ja' ? '裏面' : 'Page 2'}
                </button>
              </div>

              <a
                href={currentPdfUrl}
                download
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-200 dark:bg-slate-800 hover:bg-stone-300 text-stone-800 dark:text-stone-100 text-xs font-semibold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF (印刷用)</span>
              </a>
            </div>
          </div>

          {/* Right 7 Cols: Program & Performer Biography */}
          <div className="lg:col-span-7 space-y-6">
            {/* Program */}
            <div className="p-6 rounded-md bg-white dark:bg-slate-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
              <div className="border-l-2 border-amber-800/80 pl-3">
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                  {locale === 'ja' ? '演奏予定プログラム（オール・ラフマニノフ）' : 'Concert Program (All-Rachmaninoff)'}
                </h3>
                <p className="text-xs text-stone-500 font-serif">
                  {locale === 'ja' ? 'セルゲイ・ラフマニノフ（1873–1943）作曲' : 'Works of Sergei Rachmaninoff (1873–1943)'}
                </p>
              </div>

              <div className="divide-y divide-stone-100 dark:divide-stone-800">
                {event.program.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-start justify-between gap-4">
                    <div>
                      <div className="font-serif font-bold text-sm text-stone-900 dark:text-white">
                        {item.title[locale]}
                      </div>
                      {item.key && (
                        <div className="text-xs text-stone-500 font-serif">{item.key[locale]}</div>
                      )}
                    </div>
                    <span className="font-mono text-xs text-amber-800 dark:text-amber-400 whitespace-nowrap">
                      {item.opus}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performer Bio */}
            <div className="p-6 rounded-md bg-white dark:bg-slate-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
              <div className="border-l-2 border-amber-800/80 pl-3">
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                  {event.artist.name[locale]}
                </h3>
                <p className="text-xs text-stone-500 font-serif">
                  {event.artist.title[locale]} · {event.artist.awards[locale]}
                </p>
              </div>

              <p className="font-serif text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {event.artist.profile[locale]}
              </p>
            </div>

            {/* Inquiry Box */}
            <div className="p-6 rounded-md bg-[#F3EFEA] dark:bg-slate-900 border border-amber-900/20 space-y-3">
              <div className="font-serif font-bold text-sm text-stone-900 dark:text-white">
                {locale === 'ja' ? '演奏会に関するお問い合わせ' : 'Inquiries regarding the Concert'}
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 font-serif leading-relaxed">
                {locale === 'ja'
                  ? '正式な座席のご予約は2026年12月1日より受付を開始いたします。事前のご質問や団体でのお問い合わせは、下記メールまたはお電話にて承ります。'
                  : 'Official reservations will begin on December 1, 2026. For inquiries or questions, please contact us by email or phone.'}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={`mailto:${event.reservationInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-orthodox-navy hover:bg-orthodox-navy/90 text-white font-bold text-xs transition-colors"
                >
                  <Mail className="w-4 h-4 text-orthodox-gold" />
                  <span>事前のお問い合わせ (メール)</span>
                </a>
                <a
                  href="tel:0663884512"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-white dark:bg-slate-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-mono font-bold hover:bg-stone-50 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-orthodox-gold" />
                  <span>06-6388-4512</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
