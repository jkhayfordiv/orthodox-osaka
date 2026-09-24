'use client';

import React, { useState } from 'react';
import {
  Music,
  Calendar,
  MapPin,
  Ticket,
  Mail,
  Download,
  ExternalLink,
  ChevronRight,
  Info,
  Maximize2,
  X,
  Award,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CONCERT_EVENT_DATA } from '../../data/parishWebsiteData';

export function ConcertEventSection() {
  const { locale } = useApp();
  const [activeFlyerPage, setActiveFlyerPage] = useState<1 | 2>(1);
  const [flyerLocale, setFlyerLocale] = useState<'ja' | 'en' | 'ru'>(locale);
  const [modalOpen, setModalOpen] = useState(false);

  // Sync flyer language when site language changes
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
      ? '2027年2月23日 ラフマニノフ演奏会 予約・お問い合わせ'
      : locale === 'ru'
      ? 'Запрос на бронирование: Концерт Рахманинова 23 февраля 2027 г.'
      : 'Reservation Inquiry: Rachmaninoff Concert Feb 23, 2027'
  );

  const mailtoBody = encodeURIComponent(
    locale === 'ja'
      ? 'お名前（ふりがな）：\n参加人数：\n電話番号：\n決済希望（郵便振替 / キャッシュレス）：\nご質問・メッセージ：\n'
      : locale === 'ru'
      ? 'ФИО:\nКоличество мест:\nТелефон:\nПредпочтительный способ оплаты:\nВопросы/комментарии:\n'
      : 'Full Name:\nNumber of Attendees:\nPhone Number:\nPreferred Payment (Postal Transfer / Cashless Online):\nQuestions / Notes:\n'
  );

  return (
    <section
      id="concert-event"
      className="rounded-3xl border border-amber-200/90 dark:border-amber-900/60 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-10 shadow-lg relative overflow-hidden space-y-10"
    >
      {/* Decorative Gold Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orthodox-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Badge & Title */}
      <div className="space-y-3 relative z-10 border-b border-amber-100 dark:border-slate-800 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orthodox-gold/20 dark:bg-orthodox-gold/15 border border-orthodox-gold/40 text-orthodox-navy dark:text-orthodox-gold text-xs font-bold">
            <Music className="w-3.5 h-3.5 text-orthodox-gold" />
            <span>{event.subtitle[locale]}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {locale === 'ja'
                ? '2026年12月1日 予約開始予定'
                : locale === 'ru'
                ? 'Бронирование откроется 1 декабря'
                : 'Reservations Open Dec 1'}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
            {event.title[locale]}
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-orthodox-gold dark:text-amber-300">
            {event.artist.name[locale]}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-serif leading-relaxed max-w-4xl pt-1">
          {event.themePoem[locale]}
        </p>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left 5 Cols: Visual Flyer Preview with Page Switcher & Download */}
        <div className="lg:col-span-5 space-y-4">
          {/* Language Edition Selector Tabs for Flyer */}
          <div className="flex items-center justify-between gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-2xs">
            <span className="px-2 text-slate-500 dark:text-slate-400 font-medium">
              {locale === 'ja' ? 'チラシ言語:' : locale === 'ru' ? 'Язык афиши:' : 'Flyer Language:'}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setFlyerLocale('ja')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  flyerLocale === 'ja'
                    ? 'bg-orthodox-navy text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                日本語
              </button>
              <button
                type="button"
                onClick={() => setFlyerLocale('en')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  flyerLocale === 'en'
                    ? 'bg-orthodox-navy text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setFlyerLocale('ru')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  flyerLocale === 'ru'
                    ? 'bg-orthodox-navy text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Русский
              </button>
            </div>
          </div>

          <div className="relative group rounded-2xl overflow-hidden border border-amber-200 dark:border-slate-800 bg-slate-900 shadow-md aspect-3/4">
            <img
              src={currentFlyerImage}
              alt="Rachmaninoff Concert Flyer"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
              loading="lazy"
            />

            {/* Hover overlay with zoom button */}
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/95 text-slate-900 font-bold text-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform"
              >
                <Maximize2 className="w-4 h-4 text-orthodox-gold" />
                <span>{locale === 'ja' ? 'チラシを拡大表示' : locale === 'ru' ? 'Увеличить афишу' : 'Enlarge Flyer'}</span>
              </button>
            </div>

            {/* Page number and language pill badge */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-black/65 backdrop-blur-xs text-white text-2xs font-mono">
                Page {activeFlyerPage} / 2
              </span>
              <span className="px-2 py-0.5 rounded-md bg-orthodox-gold/90 text-orthodox-navy text-2xs font-bold uppercase">
                {flyerLocale}
              </span>
            </div>
          </div>

          {/* Page Switcher Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFlyerPage(1)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                activeFlyerPage === 1
                  ? 'bg-orthodox-gold text-orthodox-navy border-orthodox-gold font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {locale === 'ja' ? '表面：公演概要' : locale === 'ru' ? 'Стр. 1: Афиша' : 'Page 1: Program'}
            </button>
            <button
              onClick={() => setActiveFlyerPage(2)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                activeFlyerPage === 2
                  ? 'bg-orthodox-gold text-orthodox-navy border-orthodox-gold font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {locale === 'ja' ? '裏面：略歴と鐘の解説' : locale === 'ru' ? 'Стр. 2: Об авторе и колоколах' : 'Page 2: Biography & Bells'}
            </button>
          </div>

          {/* Download Buttons */}
          <div className="pt-2 space-y-2">
            <a
              href={currentPdfUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orthodox-navy hover:bg-orthodox-navy/90 text-white font-bold text-xs transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-orthodox-gold" />
              <span>
                {locale === 'ja'
                  ? `チラシPDFをダウンロード (${flyerLocale.toUpperCase()}版)`
                  : locale === 'ru'
                  ? `Скачать афишу PDF (${flyerLocale.toUpperCase()})`
                  : `Download Flyer PDF (${flyerLocale.toUpperCase()} Edition)`}
              </span>
            </a>

            {/* Direct download links for all editions */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-2xs text-slate-500 dark:text-slate-400">
              <span className="font-medium">{locale === 'ja' ? '全版PDF:' : 'All Editions:'}</span>
              <a
                href={event.pdfFlyerUrls.ja}
                target="_blank"
                rel="noreferrer noopener"
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-orthodox-gold/20 text-slate-700 dark:text-slate-200 transition-colors"
              >
                🇯🇵 日本語
              </a>
              <a
                href={event.pdfFlyerUrls.en}
                target="_blank"
                rel="noreferrer noopener"
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-orthodox-gold/20 text-slate-700 dark:text-slate-200 transition-colors"
              >
                🇬🇧 English
              </a>
              <a
                href={event.pdfFlyerUrls.ru}
                target="_blank"
                rel="noreferrer noopener"
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-orthodox-gold/20 text-slate-700 dark:text-slate-200 transition-colors"
              >
                🇷🇺 Русский
              </a>
              <a
                href={event.pdfBackgroundUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-orthodox-gold/20 text-slate-700 dark:text-slate-200 transition-colors"
                title="水彩背景のみの白紙版"
              >
                🎨 {locale === 'ja' ? '背景版' : 'Background'}
              </a>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Detailed Program, Artist Profile & Action */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Facts Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
              <div className="flex items-center gap-2 text-orthodox-gold text-xs font-semibold">
                <Calendar className="w-4 h-4" />
                <span>{locale === 'ja' ? '開催日時' : locale === 'ru' ? 'Дата и время' : 'Date & Time'}</span>
              </div>
              <div className="font-serif font-bold text-base text-slate-900 dark:text-white">
                {event.date.fullDisplay[locale]}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {event.date.time[locale]}（{event.date.doorsOpen[locale]}）
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
              <div className="flex items-center gap-2 text-orthodox-gold text-xs font-semibold">
                <MapPin className="w-4 h-4" />
                <span>{locale === 'ja' ? '会場・アクセス' : locale === 'ru' ? 'Место проведения' : 'Sanctuary Venue'}</span>
              </div>
              <div className="font-serif font-bold text-base text-slate-900 dark:text-white">
                {event.venue.name[locale]}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {event.venue.access[locale]}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
              <div className="flex items-center gap-2 text-orthodox-gold text-xs font-semibold">
                <Ticket className="w-4 h-4" />
                <span>{locale === 'ja' ? '参加献金・定員' : locale === 'ru' ? 'Пожертвование и места' : 'Admission & Capacity'}</span>
              </div>
              <div className="font-serif font-bold text-base text-slate-900 dark:text-white">
                {event.admission.price}{' '}
                <span className="text-xs font-sans font-normal text-slate-500">
                  （{event.admission.seating[locale]}）
                </span>
              </div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {locale === 'ja' ? '100席限定・要事前予約' : 'Limited to 100 seats · Reservation required'}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
              <div className="flex items-center gap-2 text-orthodox-gold text-xs font-semibold">
                <Mail className="w-4 h-4" />
                <span>{locale === 'ja' ? '予約・受付方法' : locale === 'ru' ? 'Бронирование' : 'Reservations'}</span>
              </div>
              <div className="font-serif font-bold text-base text-slate-900 dark:text-white">
                {locale === 'ja' ? 'メール予約受付' : 'Email Application'}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {event.reservationInfo.paymentMethods[locale]}
              </div>
            </div>
          </div>

          {/* Program Repertoire */}
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 dark:bg-slate-800/60 border border-amber-200/70 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-orthodox-gold font-serif font-bold text-sm border-b border-amber-200/60 dark:border-slate-700 pb-2">
              <Music className="w-4 h-4" />
              <span>{locale === 'ja' ? '演奏予定曲目（ラフマニノフ作品集）' : locale === 'ru' ? 'Программа концерта' : 'Concert Program'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {event.program.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-orthodox-gold/20 text-orthodox-navy dark:text-amber-200 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-serif font-bold text-slate-900 dark:text-white">
                      {item.title[locale]}
                    </div>
                    <div className="text-2xs text-slate-500 dark:text-slate-400 font-mono">
                      {item.opus} {item.key ? `· ${item.key[locale]}` : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Artist Bio Snippet */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-orthodox-gold font-serif font-bold text-sm">
                <Award className="w-4 h-4" />
                <span>{locale === 'ja' ? '出演者プロフィール' : locale === 'ru' ? 'Об исполнителе' : 'About the Artist'}</span>
              </div>
              <span className="text-2xs px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 font-medium">
                {event.artist.awards[locale]}
              </span>
            </div>

            <p className="font-serif font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              {event.artist.name[locale]}
            </p>
            <p className="text-2xs sm:text-xs text-slate-500 dark:text-slate-400">
              {event.artist.title[locale]}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans line-clamp-3 pt-1">
              {event.artist.profile[locale]}
            </p>
          </div>

          {/* Reservation Action Banner */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-orthodox-navy via-orthodox-navy to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-semibold text-orthodox-gold-light">
                {event.reservationInfo.reservationStartDate[locale]}
              </div>
              <div className="font-serif font-bold text-base sm:text-lg">
                {locale === 'ja'
                  ? '公演に関するお問い合わせ・事前予約'
                  : locale === 'ru'
                  ? 'Вопросы и предварительное бронирование'
                  : 'Inquiries & Early Reservations'}
              </div>
              <div className="text-2xs text-slate-300">
                {event.reservationInfo.announcementPeriod[locale]}
              </div>
            </div>

            <a
              href={`mailto:${event.reservationInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orthodox-gold hover:bg-orthodox-gold-light text-orthodox-navy font-bold text-xs sm:text-sm transition-all shadow-md transform hover:-translate-y-0.5 flex-shrink-0"
            >
              <Mail className="w-4 h-4 text-orthodox-navy" />
              <span>{locale === 'ja' ? 'メールでお問い合わせ' : locale === 'ru' ? 'Написать на email' : 'Email Inquiry'}</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>


      {/* Fullscreen Flyer Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[92vh] flex flex-col bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <Music className="w-4 h-4 text-orthodox-gold" />
                <span>{event.title[locale]} (Page {activeFlyerPage}/2)</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveFlyerPage(prev => (prev === 1 ? 2 : 1))}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-orthodox-gold transition-colors"
                >
                  {activeFlyerPage === 1 ? '裏面を表示 →' : '← 表面を表示'}
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Body */}
            <div className="overflow-y-auto p-4 flex items-center justify-center bg-slate-950">
              <img
                src={currentFlyerImage}
                alt="Flyer Expanded View"
                className="max-h-[75vh] w-auto object-contain rounded-xl shadow-lg"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>{event.venue.name[locale]} · 2027.02.23</span>
              <a
                href={currentPdfUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-orthodox-gold hover:underline font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{locale === 'ja' ? 'PDFをダウンロード' : locale === 'ru' ? 'Скачать PDF' : 'Download PDF'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
