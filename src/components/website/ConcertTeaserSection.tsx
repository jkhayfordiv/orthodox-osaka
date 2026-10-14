'use client';

import React from 'react';
import Link from 'next/link';
import { Music, Calendar, MapPin, Download, ArrowRight, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CONCERT_EVENT_DATA } from '../../data/parishWebsiteData';

export function ConcertTeaserSection() {
  const { locale } = useApp();
  const event = CONCERT_EVENT_DATA;

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

  const currentPdfUrl = event.pdfFlyerUrls?.[locale] || event.pdfFlyerUrl;

  return (
    <section id="concert-event" className="space-y-4">
      {/* Section Kicker */}
      <div className="flex items-center gap-3 border-l-2 border-amber-800/80 pl-3">
        <div>
          <span className="text-2xs font-bold uppercase tracking-widest text-amber-900/80 dark:text-amber-300">
            {locale === 'ja' ? '特別企画・演奏会' : 'Featured Parish Event'}
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white">
            {locale === 'ja' ? 'ラフマニノフと正教会の鐘' : 'Rachmaninoff & The Orthodox Bells'}
          </h2>
        </div>
      </div>

      {/* Compact Editorial Banner Card */}
      <div className="rounded-md border border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-slate-900 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Thumbnail Preview */}
          <div className="md:col-span-4 lg:col-span-3 flex justify-center">
            <Link
              href="/events/rachmaninoff-2027"
              className="group block relative w-40 sm:w-44 md:w-full rounded-md overflow-hidden border border-stone-300 dark:border-stone-700 bg-stone-900 shadow-sm aspect-3/4"
            >
              <img
                src={event.flyerImages.p1}
                alt={event.title[locale]}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors" />
            </Link>
          </div>

          {/* Details & CTAs */}
          <div className="md:col-span-8 lg:col-span-9 space-y-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-amber-900 dark:text-amber-300 tracking-wider">
                  {event.subtitle[locale]}
                </span>
                <span className="text-stone-300 dark:text-stone-700">·</span>
                <span className="text-stone-600 dark:text-stone-400 font-serif">
                  {locale === 'ja' ? '2026年12月1日より予約受付開始' : 'Reservations Open Dec 1, 2026'}
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900 dark:text-white leading-snug">
                {event.title[locale]}
              </h3>

              <div className="font-serif text-sm sm:text-base text-amber-900 dark:text-amber-200">
                {event.artist.name[locale]} <span className="text-xs text-stone-500">（ピアノ）</span>
              </div>
            </div>

            {/* Date, Time, Admission in one compact line */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-700 dark:text-stone-300 font-serif pt-1 border-y border-stone-200/80 dark:border-stone-800 py-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-800 dark:text-amber-400" />
                <span className="font-bold">{event.date.fullDisplay[locale]}</span>
              </div>
              <div className="text-stone-500">
                {event.date.doorsOpen[locale]} / {event.date.time[locale]}
              </div>
              <div className="font-semibold">
                {event.admission.price} ({event.admission.seating[locale]})
              </div>
            </div>

            <p className="font-serif text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-2">
              {event.themePoem[locale]}
            </p>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/events/rachmaninoff-2027"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-orthodox-navy hover:bg-orthodox-navy/90 text-white font-bold text-xs transition-colors shadow-xs"
              >
                <span>{locale === 'ja' ? '詳細・ご予約案内を見る →' : 'View Full Details & Booking →'}</span>
              </Link>

              <a
                href={`mailto:${event.reservationInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-white dark:bg-slate-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:bg-stone-50 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-800 dark:text-amber-400" />
                <span>事前のお問い合わせ (メール)</span>
              </a>

              <a
                href={currentPdfUrl}
                download
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDFチラシ</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
