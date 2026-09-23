'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getDayInfo } from '../../lib/calendarEngine';
import { SCRIPTURE_DATABASE } from '../../data/scripturePassages';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Share2,
  BookOpen,
  Info,
  Clock,
  Award,
  Check,
  Languages,
} from 'lucide-react';
import { formatJulianDate } from '../../lib/paschalion';
import { Locale } from '../../lib/types';
import { TONE_NAMES } from '../../data/terminology';
import { notifyDailyReadingIfDue, notifyNameDaysIfDue } from '../../lib/notifications';
import { FastingGuideModal } from '../shared/FastingGuideModal';

export function TodayView() {
  const {
    locale,
    selectedDate,
    setSelectedDate,
    patronSaintId,
    familyMembers,
    showTooltips,
    allSaints,
    notificationPrefs,
    fontSize,
    parishSchedule,
  } = useApp();
  const [expandedReading, setExpandedReading] = useState<'epistle' | 'gospel' | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);
  const [fastingGuideOpen, setFastingGuideOpen] = useState(false);

  const readingTextSizeClass =
    fontSize === 'sm'
      ? 'text-xs sm:text-sm'
      : fontSize === 'lg'
      ? 'text-base sm:text-lg'
      : fontSize === 'xl'
      ? 'text-lg sm:text-xl'
      : 'text-sm sm:text-base';

  // Compute information for selectedDate
  const dayInfo = getDayInfo(selectedDate, parishSchedule);

  // Navigate dates
  const handlePrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  const handleResetToday = () => {
    setSelectedDate(new Date());
  };

  const isToday = () => {
    const today = new Date();
    return (
      today.getFullYear() === selectedDate.getFullYear() &&
      today.getMonth() === selectedDate.getMonth() &&
      today.getDate() === selectedDate.getDate()
    );
  };

  // Find next upcoming Osaka parish service
  const todayStr = new Date().toISOString().split('T')[0];
  const upcomingServices = parishSchedule.filter((s) => s.date >= todayStr).sort((a, b) =>
    a.date.localeCompare(b.date)
  );
  const nextService = upcomingServices[0];

  let daysUntilService = 0;
  if (nextService) {
    const serviceDate = new Date(nextService.date);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    daysUntilService = Math.round((serviceDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  }

  // Name days check for today (MM-DD)
  const currentMonthDay = `${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(
    selectedDate.getDate()
  ).padStart(2, '0')}`;

  const userPatronSaint = (patronSaintId ? allSaints.find((s) => s.id === patronSaintId) : null) || null;
  const isUserPatronSaintToday = userPatronSaint ? userPatronSaint.feastDateCivil === currentMonthDay : false;

  const celebratingFamilyMembers = familyMembers
    .map((m) => ({
      member: m,
      saint: allSaints.find((s) => s.id === m.saintId),
    }))
    .filter(
      (x): x is { member: typeof familyMembers[0]; saint: (typeof allSaints)[0] } =>
        Boolean(x.saint && x.saint.feastDateCivil === currentMonthDay)
    );

  // Trigger web notification if today is user's or family member's name day or daily readings are due
  useEffect(() => {
    if (notificationPrefs.nameDaysEnabled) {
      const familyPayload = celebratingFamilyMembers.map((x) => ({
        name: x.member.name,
        saint: x.saint,
      }));
      notifyNameDaysIfDue(isUserPatronSaintToday, userPatronSaint, familyPayload, locale);
    }
    if (notificationPrefs.dailyReadingsEnabled && dayInfo.readings && dayInfo.readings.length > 0) {
      notifyDailyReadingIfDue(dayInfo.readings, locale);
    }
  }, [
    selectedDate,
    isUserPatronSaintToday,
    userPatronSaint,
    celebratingFamilyMembers,
    notificationPrefs,
    locale,
    dayInfo.readings,
  ]);

  // Formatting date string
  const formatCivilDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString(
      locale === 'ja' ? 'ja-JP' : locale === 'ru' ? 'ru-RU' : 'en-US',
      options
    );
  };

  // Share functionality
  const handleShare = async () => {
    const saintTitle = dayInfo.saints[0]?.name[locale] || 'Saints of the Day';
    const textToShare = `☦ ${formatCivilDate(selectedDate)} (${formatJulianDate(selectedDate, locale)})\n${saintTitle}\n${dayInfo.fasting.badgeText[locale]}\n\n大阪ハリストス正教会 (Holy Protection Orthodox Church in Osaka)`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Osaka Orthodox Church Calendar',
          text: textToShare,
          url: window.location.href,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(textToShare);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="space-y-4 pb-24 md:pb-12 max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-4">
      {/* 1. Day Navigation Header (Senior-friendly large buttons) */}
      <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/40 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevDay}
            className="flex items-center space-x-1 py-2 px-3 sm:px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orthodox-candle dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold transition-all active:scale-95"
            aria-label="Previous day"
          >
            <ChevronLeft className="w-5 h-5 text-orthodox-gold-dark" />
            <span className="text-xs sm:text-sm hidden sm:inline">
              {locale === 'ja' ? '前日' : locale === 'ru' ? 'Вчера' : 'Yesterday'}
            </span>
          </button>

          <div className="text-center">
            <h2 className="text-base sm:text-xl font-bold font-serif text-orthodox-navy dark:text-orthodox-gold-light">
              {formatCivilDate(selectedDate)}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              <span className="font-medium">{formatJulianDate(selectedDate, locale)}</span>
              {dayInfo.tone > 0 && (
                <>
                  <span>•</span>
                  <span className="font-semibold text-orthodox-gold-dark dark:text-orthodox-gold">
                    {TONE_NAMES[dayInfo.tone]?.[locale] || (locale === 'ja' ? `第${dayInfo.tone}調` : locale === 'ru' ? `Глас ${dayInfo.tone}` : `Tone ${dayInfo.tone}`)}
                  </span>
                </>
              )}
              <span>•</span>
              <span className="font-bold text-orthodox-burgundy dark:text-orthodox-gold flex items-center space-x-1">
                <span>{dayInfo.fasting.icon}</span>
                <span>{dayInfo.fasting.badgeText[locale]}</span>
              </span>
            </div>
          </div>

          <button
            onClick={handleNextDay}
            className="flex items-center space-x-1 py-2 px-3 sm:px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orthodox-candle dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold transition-all active:scale-95"
            aria-label="Next day"
          >
            <span className="text-xs sm:text-sm hidden sm:inline">
              {locale === 'ja' ? '翌日' : locale === 'ru' ? 'Завтра' : 'Tomorrow'}
            </span>
            <ChevronRight className="w-5 h-5 text-orthodox-gold-dark" />
          </button>
        </div>

        {!isToday() && (
          <div className="text-center mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleResetToday}
              className="text-xs font-bold text-orthodox-burgundy dark:text-orthodox-gold hover:underline inline-flex items-center space-x-1"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{locale === 'ja' ? '今日に戻る' : locale === 'ru' ? 'Вернуться к сегодняшнему дню' : 'Back to Today'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Responsive 2-Column Dashboard on Desktop (lg:grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Main Column: Celebrations & Scripture Readings */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">

      {/* 2. TOP PRIORITY: Name Day Celebration Card */}
      {(isUserPatronSaintToday || celebratingFamilyMembers.length > 0) && (
        <div className="bg-gradient-to-r from-amber-500/20 via-orthodox-gold/30 to-amber-500/15 dark:from-amber-950/60 dark:via-orthodox-gold/20 dark:to-amber-950/40 border-2 border-amber-400 dark:border-amber-600 rounded-2xl p-4 shadow-md flex items-start space-x-3.5 animate-in fade-in">
          <Award className="w-8 h-8 text-orthodox-gold flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-sm sm:text-base text-amber-950 dark:text-amber-100">
              {isUserPatronSaintToday
                ? locale === 'ja'
                  ? '👑 聖名日のお祝い！本日はあなたの守護聖人の記念日です！'
                  : locale === 'ru'
                  ? '👑 С Днём Ангела! Сегодня день памяти вашего святого покровителя!'
                  : '👑 Happy Name Day! Today is your Patron Saint celebration!'
                : locale === 'ja'
                ? '🎂 ご家族の聖名日のお祝い！'
                : locale === 'ru'
                ? '🎂 Именины в вашей семье!'
                : '🎂 Family Name Day Celebration!'}
            </h4>
            <div className="text-xs text-amber-900 dark:text-amber-200 space-y-0.5">
              {isUserPatronSaintToday && userPatronSaint && (
                <p className="font-semibold">
                  ☦ {userPatronSaint.name[locale]} — {userPatronSaint.saint[locale]}
                </p>
              )}
              {celebratingFamilyMembers.map((item) => (
                <p key={item.member.id} className="font-medium">
                  🎉 {item.member.name}: {item.saint.saint[locale]}
                </p>
              ))}
            </div>
            <p className="text-[11px] text-amber-800 dark:text-amber-300 font-serif italic pt-0.5 border-t border-amber-300/40 dark:border-amber-700/40">
              {locale === 'ja'
                ? '「多くの歳月を！（ムノガヤ・レタ）」聖人の執り成しにより主の恵みが豊かにありますように。'
                : locale === 'ru'
                ? 'Многая и благая лета! Молитвами святых ваших да укрепит вас Господь!'
                : 'Many Years! (Mnogaya Leta!) May your holy patrons intercede for you before God!'}
            </p>
          </div>
        </div>
      )}

      {/* 3. Feast Day Celebratory Banner (if Major Feast) */}
      {dayInfo.feasts.length > 0 && (
        <div className="bg-gradient-to-r from-orthodox-burgundy via-orthodox-burgundy-light to-orthodox-burgundy text-white p-4 rounded-2xl shadow-md border-2 border-orthodox-gold flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-full bg-orthodox-gold flex items-center justify-center text-orthodox-navy font-bold text-2xl flex-shrink-0 shadow">
            ☦
          </div>
          <div className="flex-1">
            <span className="text-[11px] font-bold tracking-wider uppercase text-orthodox-gold-light block">
              {locale === 'ja' ? '大祝日' : locale === 'ru' ? 'Великий праздник' : 'Great Feast Day'}
            </span>
            <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-snug">
              {dayInfo.feasts[0].title[locale]}
            </h3>
          </div>
        </div>
      )}

      {/* 4. Daily Scripture Readings Card (Epistle & Gospel - Complete Verse Text) */}
      <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-orthodox-gold" />
            <h3 className="font-serif font-bold text-base sm:text-lg text-orthodox-navy dark:text-orthodox-gold-light">
              {locale === 'ja' ? '本日の聖書朗読（旧暦日課）' : locale === 'ru' ? 'Дневные чтения (ст.ст.)' : 'Daily Scripture Readings (Old Cal.)'}
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-serif">
            {locale === 'ja' ? '使徒経・福音経' : locale === 'ru' ? 'Апостол и Евангелие' : 'Epistle & Gospel'}
          </span>
        </div>

        <div className="space-y-3.5">
          {dayInfo.readings.map((reading, idx) => {
            const isEpistle = reading.source === 'Epistle';
            const isExpanded = expandedReading === (isEpistle ? 'epistle' : 'gospel');

            // Check if full verse passage exists in SCRIPTURE_DATABASE
            const dbKey = isEpistle ? 'Ephesians 3.8-21' : 'Mark 11.22-26';
            const fullPassage = SCRIPTURE_DATABASE[dbKey];

            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 bg-slate-50/50 dark:bg-slate-800/40"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-orthodox-gold-dark dark:text-orthodox-gold block">
                      {isEpistle
                        ? locale === 'ja' ? '聖使徒経' : locale === 'ru' ? 'Апостол' : 'The Epistle'
                        : locale === 'ja' ? '聖福音経' : locale === 'ru' ? 'Евангелие' : 'The Gospel'}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                      {reading.book[locale]} {reading.reference.replace(/^[A-Za-z0-9\s]+(\d+:\d+.*)$/, '$1')}
                      {reading.pericopeTan && (
                        <span className="text-xs font-normal text-slate-500 ml-1.5">
                          （{locale === 'ja' ? `端${reading.pericopeTan}` : locale === 'ru' ? `Зач. ${reading.pericopeTan}` : `Pericope ${reading.pericopeTan}`}）
                        </span>
                      )}
                    </h4>
                  </div>
                  <button
                    onClick={() =>
                      setExpandedReading(isExpanded ? null : isEpistle ? 'epistle' : 'gospel')
                    }
                    className="text-xs font-bold text-orthodox-burgundy dark:text-orthodox-gold hover:underline py-1 px-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
                  >
                    {isExpanded
                      ? locale === 'ja' ? '閉じる ▲' : locale === 'ru' ? 'Свернуть ▲' : 'Close ▲'
                      : locale === 'ja' ? '全文を読む ▼' : locale === 'ru' ? 'Читать полный текст ▼' : 'Read Full Passage ▼'}
                  </button>
                </div>

                {/* Expanded Full Scripture Text with Verses */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                    {fullPassage && fullPassage.verses ? (
                      <div className={`space-y-1.5 font-serif ${readingTextSizeClass} text-slate-800 dark:text-slate-200 leading-relaxed`}>
                        {fullPassage.verses.map((v) => (
                          <p key={v.verse} className="text-justify">
                            <span className="font-bold text-orthodox-gold-dark dark:text-orthodox-gold mr-1.5 text-xs select-none">
                              {v.verse}.
                            </span>
                            <span>{v.text[locale]}</span>
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className={`font-serif leading-relaxed text-slate-700 dark:text-slate-300 ${readingTextSizeClass} whitespace-pre-line`}>
                        {reading.text[locale]}
                      </p>
                    )}

                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-right">
                      <span className="text-[11px] text-slate-400">
                        {locale === 'ja'
                          ? '日本正教会訳（1902年 亜使徒ニコライ・中井木菟麻呂訳）'
                          : locale === 'ru'
                          ? 'Синодальный перевод'
                          : 'King James Version (KJV)'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>

    {/* Right Sidebar Column: Fasting, Services & Saints */}
    <div className="lg:col-span-5 xl:col-span-4 space-y-4">
      {/* 5. Fasting Rule Card */}
      <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl" role="img" aria-label="Fasting icon">
              {dayInfo.fasting.icon}
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                  {dayInfo.fasting.badgeText[locale]}
                </h3>
                {dayInfo.fasting.periodName && (
                  <span className="text-xs py-0.5 px-2 rounded-full bg-orthodox-gold/20 text-orthodox-burgundy dark:text-orthodox-gold font-bold">
                    {dayInfo.fasting.periodName[locale]}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                {dayInfo.fasting.explanation[locale]}
              </p>
            </div>
          </div>
        </div>

        {/* Fasting Guide Button */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setFastingGuideOpen(true)}
            className="text-xs font-semibold text-orthodox-burgundy dark:text-orthodox-gold hover:underline flex items-center justify-between w-full transition-colors group"
          >
            <span className="flex items-center space-x-1.5">
              <span>❓</span>
              <span>
                {locale === 'ja'
                  ? '「厳斎」とは？ 斎の手引きを見る'
                  : locale === 'ru'
                  ? 'Что такое строгий пост? Руководство'
                  : 'What is a Strict Fast? Fasting Guide'}
              </span>
            </span>
            <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform text-xs">➔</span>
          </button>
        </div>

        {showTooltips && (
          <div className="mt-2 text-[11px] text-slate-400 flex items-center space-x-1.5">
            <Info className="w-3.5 h-3.5 text-orthodox-gold flex-shrink-0" />
            <span>
              {locale === 'ja'
                ? '「斎（ものいみ）」は祈りと節制により神に向かう正教会の伝統的な精進です。'
                : locale === 'ru'
                ? 'Пост — это время молитвы, воздержания и духовного очищения перед Господом.'
                : 'Fasting in the Orthodox Church is a spiritual practice of prayer and abstinence.'}
            </span>
          </div>
        )}
      </div>

      {/* 6. Next Service at Osaka Church Card */}
      {nextService && (
        <div className="bg-orthodox-candle/40 dark:bg-slate-900 border-2 border-orthodox-gold rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-orthodox-burgundy dark:text-orthodox-gold-light flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{locale === 'ja' ? '次の奉事（大阪教会）' : locale === 'ru' ? 'Ближайшая служба в Осаке' : 'Next Service in Osaka'}</span>
            </span>
            <span className="text-xs font-bold py-0.5 px-2 rounded-full bg-orthodox-gold text-orthodox-navy shadow-xs">
              {daysUntilService === 0
                ? locale === 'ja' ? '本日開催' : locale === 'ru' ? 'Сегодня' : 'Today!'
                : locale === 'ja' ? `あと${daysUntilService}日` : locale === 'ru' ? `через ${daysUntilService} дн.` : `in ${daysUntilService} days`}
            </span>
          </div>

          <div className="flex items-start space-x-3.5">
            <img
              src="/photos/church-belfry.jpg"
              alt="Osaka Orthodox Church Belfry"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-orthodox-gold/60 shadow-xs flex-shrink-0"
            />
            <div className="space-y-1 min-w-0 flex-1">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                {(() => {
                  const [y, m, d] = nextService.date.split('-').map(Number);
                  const dateObj = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
                  const weekday = locale === 'ja'
                    ? ['日', '月', '火', '水', '木', '金', '土'][dateObj.getUTCDay()]
                    : dateObj.toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', { weekday: 'short', timeZone: 'UTC' });
                  return `${m}/${d} (${weekday}) ${nextService.time} — ${nextService.title[locale]}`;
                })()}
              </h4>

              {nextService.dutyGroup && (
                <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center flex-wrap gap-1 pt-0.5">
                  <span className="font-semibold text-orthodox-navy dark:text-orthodox-gold-light">
                    {locale === 'ja' ? '愛餐（昼食）当番: ' : locale === 'ru' ? 'Дежурные по трапезе: ' : 'Meal Duty: '}
                  </span>
                  <span className="font-semibold text-orthodox-burgundy dark:text-orthodox-gold bg-orthodox-gold/15 dark:bg-orthodox-gold/20 px-2 py-0.5 rounded-md text-xs">
                    {nextService.dutyGroup.replace(/^<|>$/g, '')}
                  </span>
                  {nextService.dutyPeople && nextService.dutyPeople.length > 0 && (
                    <span className="text-slate-500"> ({nextService.dutyPeople.join(', ')})</span>
                  )}
                </div>
              )}

              {nextService.notes && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
                  {nextService.notes[locale]}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 7. Saints Commemorated Card with Real Biographies */}
      <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
          <h3 className="font-serif font-bold text-base sm:text-lg text-orthodox-navy dark:text-orthodox-gold-light flex items-center space-x-2">
            <span>⛪</span>
            <span>{locale === 'ja' ? '今日の記憶（聖人）' : locale === 'ru' ? 'Память святых' : 'Saints of the Day'}</span>
          </h3>
          <button
            onClick={handleShare}
            className="flex items-center space-x-1 text-xs py-1 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
            title="Share"
          >
            {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedShare ? (locale === 'ja' ? 'コピー完了' : 'Copied!') : (locale === 'ja' ? '共有' : locale === 'ru' ? 'Поделиться' : 'Share')}</span>
          </button>
        </div>

        <ul className="space-y-3.5">
          {dayInfo.saints.map((saint, idx) => (
            <li key={idx} className="space-y-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orthodox-gold flex-shrink-0 self-center"></span>
                <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                  {saint.name[locale]}
                </span>
                {saint.title && (
                  <span className="text-xs text-slate-500 font-medium">
                    ({saint.title[locale]})
                  </span>
                )}
                {saint.isPatronSaint && (
                  <span className="text-[10px] font-bold py-0.5 px-1.5 rounded bg-orthodox-gold/20 text-orthodox-gold-dark dark:text-orthodox-gold">
                    {locale === 'ja' ? '守護聖人' : locale === 'ru' ? 'Покровитель' : 'Patron'}
                  </span>
                )}
              </div>
              {saint.bio && (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-3.5 leading-relaxed">
                  {saint.bio[locale]}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>

  {/* Fasting Guide Modal */}
  <FastingGuideModal
    isOpen={fastingGuideOpen}
    onClose={() => setFastingGuideOpen(false)}
  />
</div>
  );
}
