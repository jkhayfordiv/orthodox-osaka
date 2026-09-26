'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { PARISH_ANNOUNCEMENTS } from '../../data/bulletin';
import { PARISH_INFO } from '../../data/terminology';
import { ParishService, Locale } from '../../lib/types';
import {
  Calendar,
  Bell,
  MapPin,
  Phone,
  Mail,
  Printer,
  Compass,
  Users,
  Clock,
  Info,
  ExternalLink,
  Search,
  Sparkles,
  CalendarDays,
  X,
  Camera,
  Maximize2,
  HeartHandshake,
  ChevronDown,
  Utensils,
  Settings,
  FileText,
} from 'lucide-react';

// Safe date parser to avoid timezone drift across midnight UTC/local
function parseServiceDate(dateStr: string) {
  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10); // 1-12
  const day = parseInt(dayStr, 10);
  const dateObj = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  return { year, month, day, dateObj };
}

// Localized short month string (e.g. "9月", "SEP", "СЕН")
function formatMonthShort(dateObj: Date, locale: Locale): string {
  if (locale === 'ja') {
    return `${dateObj.getUTCMonth() + 1}月`;
  }
  return dateObj
    .toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
      month: 'short',
      timeZone: 'UTC',
    })
    .toUpperCase();
}

// Localized weekday string (e.g. "土曜日", "Saturday", "Суббота")
function formatWeekday(dateObj: Date, locale: Locale, short = false): string {
  if (locale === 'ja') {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return short ? `${days[dateObj.getUTCDay()]}` : `${days[dateObj.getUTCDay()]}曜日`;
  }
  return dateObj.toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
    weekday: short ? 'short' : 'long',
    timeZone: 'UTC',
  });
}

// Clean meal duty team name (removes raw angle brackets and translates)
function cleanDutyGroupName(group: string, locale: Locale): string {
  const stripped = group.replace(/^<|>$/g, '').trim();
  switch (stripped.toLowerCase()) {
    case 'rabboni':
      return locale === 'ja' ? 'ラボーニ組' : locale === 'ru' ? 'Группа «Рабвуни»' : 'Rabboni Team';
    case "daria's kitchen":
    case 'darias kitchen':
      return locale === 'ja' ? 'ダリヤの台所' : locale === 'ru' ? '«Кухня Дарии»' : "Daria's Kitchen";
    case 'church friends':
      return locale === 'ja' ? 'チャーチフレンズ' : locale === 'ru' ? '«Друзья церкви»' : 'Church Friends';
    case 'choir':
      return locale === 'ja' ? '聖歌隊' : locale === 'ru' ? 'Клирос / Хор' : 'Choir';
    case "women's club":
    case 'womens club':
      return locale === 'ja' ? '婦人会' : locale === 'ru' ? 'Сестричество / Женский клуб' : "Women's Association";
    case 'all parishioners':
    case 'all parishioners / 全員':
    case 'church friends & all parishioners':
      return locale === 'ja' ? '信徒全員' : locale === 'ru' ? 'Все прихожане' : 'All Parishioners';
    default:
      return stripped;
  }
}

// Localize parishioner duty names into canonical Katakana / Russian / English
function formatDutyPerson(name: string, locale: Locale): string {
  const nameMap: Record<string, { ja: string; ru: string; en: string }> = {
    'Anastasia': { ja: 'アナスタシヤ', ru: 'Анастасия', en: 'Anastasia' },
    'Antonina': { ja: 'アントニナ', ru: 'Антонина', en: 'Antonina' },
    'Alexandra S.': { ja: 'アレクサンドラ S.', ru: 'Александра С.', en: 'Alexandra S.' },
    'Alexandra': { ja: 'アレクサンドラ', ru: 'Александра', en: 'Alexandra' },
    'Anna': { ja: 'アンナ', ru: 'Анна', en: 'Anna' },
    'Natalia': { ja: 'ナタリヤ', ru: 'Наталия', en: 'Natalia' },
    'Olya': { ja: 'オーリャ', ru: 'Оля', en: 'Olya' },
    'Olga': { ja: 'オリガ', ru: 'Ольга', en: 'Olga' },
    'Elena': { ja: 'エレナ', ru: 'Елена', en: 'Elena' },
    'Jace': { ja: 'ジェイス', ru: 'Джейс', en: 'Jace' },
    'Ruth': { ja: 'ルフィ', ru: 'Руфь', en: 'Ruth' },
    'All Parishioners / 全員': { ja: '全員', ru: 'Все прихожане', en: 'All' },
  };

  if (nameMap[name]) {
    return nameMap[name][locale];
  }
  return name;
}

// Visual badges for liturgical service types
function getServiceTypeBadge(type: ParishService['serviceType'], locale: Locale) {
  switch (type) {
    case 'liturgy':
      return {
        label: { ja: '聖体礼儀', en: 'Divine Liturgy', ru: 'Божественная Литургия' }[locale],
        badgeClass: 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800',
      };
    case 'vigil':
      return {
        label: { ja: '徹夜祷', en: 'All-Night Vigil', ru: 'Всенощное бдение' }[locale],
        badgeClass: 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-200 border-indigo-300 dark:border-indigo-800',
      };
    case 'vespers':
      return {
        label: { ja: '晩課', en: 'Vespers', ru: 'Вечерня' }[locale],
        badgeClass: 'bg-sky-100 dark:bg-sky-950/70 text-sky-900 dark:text-sky-200 border-sky-300 dark:border-sky-800',
      };
    case 'panikhida':
      return {
        label: { ja: 'パニヒダ', en: 'Panikhida', ru: 'Панихида' }[locale],
        badgeClass: 'bg-rose-100 dark:bg-rose-950/70 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-800',
      };
    case 'water_blessing':
      return {
        label: { ja: '聖水式', en: 'Blessing of Water', ru: 'Водоосвящение' }[locale],
        badgeClass: 'bg-cyan-100 dark:bg-cyan-950/70 text-cyan-900 dark:text-cyan-200 border-cyan-300 dark:border-cyan-800',
      };
    case 'special':
      return {
        label: { ja: '特別行事', en: 'Special Event', ru: 'Особое событие' }[locale],
        badgeClass: 'bg-purple-100 dark:bg-purple-950/70 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-800',
      };
    default:
      return {
        label: { ja: '奉事', en: 'Service', ru: 'Служба' }[locale],
        badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700',
      };
  }
}

// Seasonal icons for month sections
function getMonthIcon(monthNum: number): string {
  switch (monthNum) {
    case 1:
      return '🕊️';
    case 2:
      return '🌸';
    case 3:
      return '🌿';
    case 4:
      return '✝️';
    case 5:
      return '🌟';
    case 8:
      return '🍇';
    case 9:
      return '🍂';
    case 10:
      return '🍁';
    case 11:
      return '❄️';
    case 12:
      return '🎄';
    default:
      return '📅';
  }
}

// Month highlights/subtitles
function getMonthHighlight(yearMonth: string, locale: Locale): string | null {
  switch (yearMonth) {
    case '2026-08':
      return locale === 'ja' ? '主の変容祭・生神女就寝祭' : locale === 'ru' ? 'Преображение и Успение Пресвятой Богородицы' : 'Transfiguration & Dormition';
    case '2026-09':
      return locale === 'ja' ? '十字架挙栄祭・敬老会' : locale === 'ru' ? 'Воздвижение Креста Господня' : 'Exaltation of the Cross';
    case '2026-10':
      return locale === 'ja' ? '堂祭 生神女庇護祭・庭園バーベキュー親睦会' : locale === 'ru' ? 'Престольный праздник Покрова и приходское барбекю' : 'Temple Feast of Holy Protection & Parish BBQ';
    case '2026-11':
      return locale === 'ja' ? '天軍主ミハイル祭・ロシア人墓地祈祷' : locale === 'ru' ? 'Собор Архистратига Михаила и панихида на кладбище' : 'Archangel Michael & Cemetery Prayers';
    case '2026-12':
      return locale === 'ja' ? '奇跡者聖ニコライ祭・主の降誕祭' : locale === 'ru' ? 'Святителя Николая и Рождество Христово' : 'St. Nicholas & Nativity of Christ';
    case '2027-01':
      return locale === 'ja' ? '旧暦降誕大祭・神現大祭大聖水式' : locale === 'ru' ? 'Рождество Христово и Богоявление (Великая Агиасма)' : 'Nativity (OS) & Theophany Blessing of Water';
    case '2027-02':
      return locale === 'ja' ? '日本の亜使徒大主教 聖ニコライ祭' : locale === 'ru' ? 'Святого равноапостольного Николая Японского' : 'St. Nicholas of Japan, Equal-to-the-Apostles';
    case '2027-03':
      return locale === 'ja' ? '大斎開始・乾酪主日赦罪晩課' : locale === 'ru' ? 'Начало Великого поста и Прощёное воскресенье' : 'Great Lent begins & Forgiveness Vespers';
    case '2027-04':
      return locale === 'ja' ? '聖受難週（聖大木曜日・聖大金曜日）' : locale === 'ru' ? 'Страстная седмица: Великий Четверток и Пяток' : 'Holy Week: Holy Thursday & Holy Friday';
    case '2027-05':
      return locale === 'ja' ? '主の復活大祭（ハリストス復活！パスカ祝宴）' : locale === 'ru' ? 'Светлое Христово Воскресение — Пасха Господня!' : 'Holy Pascha: Christ is Risen!';
    default:
      return null;
  }
}

// Authentic parish gallery photos
const PARISH_PHOTOS = [
  {
    id: 'exterior',
    src: '/photos/church-exterior.jpg',
    title: {
      ja: '聖堂外観（吹田市・青空と鐘楼）',
      en: 'Holy Protection Temple Facade & Belfry',
      ru: 'Фасад храма Покрова и колокольня',
    },
    desc: {
      ja: '緑青の屋根と八端十字架が青空に映える大阪ハリストス正教会聖堂。阪急千里線豊津駅より徒歩すぐ。',
      en: 'Holy Protection Orthodox Church in Suita, Osaka, featuring copper domes and Orthodox three-bar crosses.',
      ru: 'Храм Покрова Пресвятой Богородицы в городе Суйта (префектура Осака). Недалеко от станции Тоёцу.',
    },
  },
  {
    id: 'belfry',
    src: '/photos/church-belfry.jpg',
    title: {
      ja: '鐘楼と正教会十字架',
      en: 'Belfry Spire & Orthodox Cross',
      ru: 'Шпиль колокольни и крест',
    },
    desc: {
      ja: '礼拝の始まりを告げる青銅の鐘楼と、太陽の光を受け尖塔に影を落とす八端十字架。',
      en: 'The bronze belfry bell that calls faithful to prayer, beneath the towering spire and cross.',
      ru: 'Колокольня с бронзовым колоколом, созывающим верующих на молитву, и крест на шпиле.',
    },
  },
  {
    id: 'interior',
    src: '/photos/church-interior.jpg',
    title: {
      ja: '聖所とイコノスタシス（聖障）',
      en: 'Holy Sanctuary & Iconostasis',
      ru: 'Алтарь и иконостас храма',
    },
    desc: {
      ja: '蜜蝋のろうそくと香煙の香り漂う祈りの空間。荘厳な木製イコノスタシスと至聖所。',
      en: 'The prayerful interior adorned with beeswax candles, the analogion, and the carved iconostasis with Royal Doors.',
      ru: 'Внутреннее убранство храма: деревянный иконостас, Царские врата, светильники и аналой.',
    },
  },
  {
    id: 'priest',
    src: '/photos/priest-liturgy.jpg',
    title: {
      ja: '聖体礼儀（祈りと香炉の振り）',
      en: 'Divine Liturgy & Pastoral Service',
      ru: 'Божественная Литургия и каждение',
    },
    desc: {
      ja: '祝祭の赤の祭服をまとい、香炉を掲げて聖堂と信徒を祝福する管轄司祭。',
      en: 'The parish priest censing the holy icons and congregation during the celebratory festive Divine Liturgy.',
      ru: 'Настоятель храма совершает праздничное каждение святых икон и прихожан в красном облачении.',
    },
  },
];

export function ParishView() {
  const { locale, parishSchedule, setAdminModalOpen } = useApp();
  const [subTab, setSubTab] = useState<'schedule' | 'bulletin' | 'visit'>('schedule');

  // Schedule filtering states
  const [viewScope, setViewScope] = useState<'upcoming' | 'all'>('upcoming'); // Upcoming (Next 45 days) vs All Year
  const [selectedMonth, setSelectedMonth] = useState<string>('all'); // 'all' or '2026-09', etc.
  const [typeFilter, setTypeFilter] = useState<'all' | 'liturgy' | 'vigil' | 'special'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Photo Lightbox modal state
  const [activePhoto, setActivePhoto] = useState<{ src: string; title: string; desc: string } | null>(null);

  const todayStr = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }, []);

  // Compute Next Upcoming Service
  const nextService = useMemo(() => {
    const upcoming = parishSchedule.filter((s) => s.date >= todayStr);
    return upcoming.length > 0 ? upcoming[0] : parishSchedule[0];
  }, [parishSchedule, todayStr]);

  // Extract all unique Year-Months available in schedule
  const availableMonths = useMemo(() => {
    const set = new Set<string>();
    parishSchedule.forEach((s) => {
      set.add(s.date.slice(0, 7)); // 'YYYY-MM'
    });
    return Array.from(set).sort();
  }, [parishSchedule]);

  // Filtered services
  const filteredServices = useMemo(() => {
    return parishSchedule.filter((s) => {
      // View scope filter (Upcoming vs All Year)
      if (viewScope === 'upcoming' && selectedMonth === 'all') {
        if (s.date < todayStr) return false;
      }

      // Specific Month filter (from dropdown)
      if (selectedMonth !== 'all') {
        if (!s.date.startsWith(selectedMonth)) return false;
      }

      // Service type filter
      if (typeFilter === 'liturgy' && s.serviceType !== 'liturgy') return false;
      if (typeFilter === 'vigil' && s.serviceType !== 'vigil' && s.serviceType !== 'vespers') return false;
      if (typeFilter === 'special' && s.serviceType !== 'special' && s.serviceType !== 'water_blessing' && s.serviceType !== 'panikhida') return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = (s.title[locale] || '').toLowerCase().includes(q) ||
                           (s.title.en || '').toLowerCase().includes(q) ||
                           (s.title.ja || '').toLowerCase().includes(q) ||
                           (s.title.ru || '').toLowerCase().includes(q);
        const dutyMatch = (s.dutyGroup || '').toLowerCase().includes(q) ||
                          (s.dutyPeople || []).some((p) => p.toLowerCase().includes(q));
        const notesMatch = (s.notes?.[locale] || '').toLowerCase().includes(q);
        if (!titleMatch && !dutyMatch && !notesMatch) return false;
      }

      return true;
    });
  }, [viewScope, selectedMonth, typeFilter, searchQuery, todayStr, locale]);

  // Group filtered services chronologically by month
  const groupedServices = useMemo(() => {
    const groups: { monthKey: string; monthLabel: string; monthNum: number; highlight: string | null; services: ParishService[] }[] = [];
    const map = new Map<string, ParishService[]>();

    for (const s of filteredServices) {
      const ym = s.date.slice(0, 7);
      if (!map.has(ym)) map.set(ym, []);
      map.get(ym)!.push(s);
    }

    const sortedKeys = Array.from(map.keys()).sort();
    for (const key of sortedKeys) {
      const [y, m] = key.split('-').map(Number);
      const dateObj = new Date(Date.UTC(y, m - 1, 15));
      const monthLabel =
        locale === 'ja'
          ? `${y}年${m}月`
          : locale === 'ru'
          ? dateObj.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric', timeZone: 'UTC' })
          : dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

      groups.push({
        monthKey: key,
        monthLabel,
        monthNum: m,
        highlight: getMonthHighlight(key, locale),
        services: map.get(key)!,
      });
    }

    return groups;
  }, [filteredServices, locale]);

  const subTabs = [
    {
      id: 'schedule' as const,
      icon: <Calendar className="w-4 h-4" />,
      label: { ja: '奉事日程・愛餐当番', en: 'Services & Meal Roster', ru: 'Расписание служб и трапеза' },
    },
    {
      id: 'bulletin' as const,
      icon: <Bell className="w-4 h-4" />,
      label: { ja: '教会だより', en: 'Bulletin & News', ru: 'Объявления' },
    },
    {
      id: 'visit' as const,
      icon: <Compass className="w-4 h-4" />,
      label: { ja: '教会案内・アクセス', en: 'Visitor Guide', ru: 'О храме и проезд' },
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-5 pb-24 md:pb-12 max-w-5xl xl:max-w-6xl mx-auto px-3 sm:px-6 pt-3 sm:pt-4">
      {/* Sub-tab Navigation */}
      <div className="no-print bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-1.5 shadow-sm flex space-x-1 max-w-xl mx-auto sm:mx-0">
        {subTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            className={`flex-1 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all select-none ${
              subTab === t.id
                ? 'bg-orthodox-gold text-orthodox-navy shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.icon}
            <span>{t.label[locale]}</span>
          </button>
        ))}
      </div>

      {/* 1. Services & Duty Roster Sub-tab (LINEAR LITURGICAL TIMELINE) */}
      {subTab === 'schedule' && (
        <div className="space-y-6">
          {/* Header Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
            <div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-orthodox-navy dark:text-orthodox-gold-light">
                {locale === 'ja'
                  ? '大阪ハリストス正教会 奉事日程・愛餐当番表'
                  : locale === 'ru'
                  ? 'Расписание богослужений и дежурство по трапезе'
                  : 'Parish Services & Meal Duty Roster'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {locale === 'ja'
                  ? '日本ハリストス正教会 西日本主教教区 生神女庇護聖堂'
                  : locale === 'ru'
                  ? 'Храм Покрова Пресвятой Богородицы, Осака'
                  : 'Holy Protection Temple, Western Diocese, Osaka'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              <a
                href="/schedule/osaka-schedule-2026-oct-dec.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="no-print inline-flex items-center space-x-1.5 text-xs sm:text-sm py-2 px-3.5 rounded-xl border border-orthodox-gold bg-orthodox-gold text-orthodox-navy hover:bg-orthodox-gold-dark font-bold shadow-sm transition-all"
                title={locale === 'ja' ? '教会予定表PDF（10月・11月・12月）を開く・保存' : locale === 'ru' ? 'Скачать расписание в PDF (окт–дек)' : 'Download Schedule PDF (Oct–Dec)'}
              >
                <FileText className="w-4 h-4" />
                <span>{locale === 'ja' ? '公式予定表PDF (10〜12月)' : locale === 'ru' ? 'Расписание PDF (10–12)' : 'Schedule PDF (Oct–Dec)'}</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
              </a>

              <button
                onClick={() => setAdminModalOpen(true)}
                className="no-print inline-flex items-center space-x-1.5 text-xs sm:text-sm py-2 px-3.5 rounded-xl border border-orthodox-gold/40 bg-orthodox-gold/10 hover:bg-orthodox-gold/20 font-semibold text-orthodox-navy dark:text-orthodox-gold shadow-sm transition-all"
                title={locale === 'ja' ? '予定表の編集・月報取込（管理者）' : locale === 'ru' ? 'Редактировать расписание' : 'Manage Schedule'}
              >
                <Settings className="w-4 h-4 text-orthodox-gold" />
                <span>{locale === 'ja' ? '予定の編集・取込' : locale === 'ru' ? 'Управление' : 'Admin & Import'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="no-print inline-flex items-center space-x-2 text-xs sm:text-sm py-2 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all"
              >
                <Printer className="w-4 h-4 text-orthodox-gold-dark" />
                <span>{locale === 'ja' ? '日程を印刷・保存' : locale === 'ru' ? 'Печать расписания' : 'Print Schedule'}</span>
              </button>
            </div>
          </div>

          {/* Official Schedule Leaflet PDF Banner */}
          <div className="no-print bg-gradient-to-r from-orthodox-gold/20 via-amber-500/10 to-orthodox-gold/15 border border-orthodox-gold/50 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-orthodox-gold/25 border border-orthodox-gold/50 flex items-center justify-center text-orthodox-gold-dark dark:text-orthodox-gold flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm sm:text-base text-orthodox-navy dark:text-orthodox-gold-light">
                  {locale === 'ja'
                    ? '2026年 10月・11月・12月の教会予定表（公式配布版）'
                    : locale === 'ru'
                    ? 'Расписание богослужений на октябрь, ноябрь и декабрь 2026 года'
                    : 'Official Parish Schedule (October, November & December 2026)'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  {locale === 'ja'
                    ? '堂祭BBQ、名曲喫茶くるみ割り人形コンサート、広島集会、露人墓地パニヒダの日程を含む最新版'
                    : locale === 'ru'
                    ? 'Престольный праздник, Рождественский пост, концерт «Щелкунчик» и панихида'
                    : 'Includes Temple Feast BBQ, LP Record Nutcracker Concert, Hiroshima Liturgy & cemetery memorial'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <a
                href="/schedule/osaka-schedule-2026-oct-dec.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 py-2 px-4 rounded-xl bg-orthodox-gold hover:bg-orthodox-gold-dark text-orthodox-navy font-bold text-xs shadow-xs transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>{locale === 'ja' ? 'PDFを開く' : locale === 'ru' ? 'Открыть PDF' : 'Open PDF'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Clean, Non-Scrolling Linear Toolbar (NO horizontal scrollbar) */}
          <div className="no-print bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-sm space-y-3">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Left: Scope Toggle (Upcoming vs All Year) */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
                <button
                  onClick={() => {
                    setViewScope('upcoming');
                    setSelectedMonth('all');
                  }}
                  className={`py-1.5 px-3 rounded-lg flex items-center space-x-1.5 transition-all ${
                    viewScope === 'upcoming' && selectedMonth === 'all'
                      ? 'bg-orthodox-gold text-orthodox-navy shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{locale === 'ja' ? '近日の予定' : locale === 'ru' ? 'Ближайшие' : 'Upcoming'}</span>
                </button>
                <button
                  onClick={() => {
                    setViewScope('all');
                    setSelectedMonth('all');
                  }}
                  className={`py-1.5 px-3 rounded-lg transition-all ${
                    viewScope === 'all' && selectedMonth === 'all'
                      ? 'bg-orthodox-gold text-orthodox-navy shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>{locale === 'ja' ? '全日程（通年）' : locale === 'ru' ? 'Все службы' : 'All Year'}</span>
                </button>
              </div>

              {/* Middle: Month Quick-Jump Dropdown */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-500 whitespace-nowrap hidden sm:inline">
                  {locale === 'ja' ? '月を選択:' : locale === 'ru' ? 'Месяц:' : 'Month:'}
                </span>
                <div className="relative flex-1 sm:w-48">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full appearance-none py-1.5 pl-3 pr-8 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-orthodox-gold"
                  >
                    <option value="all">
                      {locale === 'ja' ? 'すべての月を表示' : locale === 'ru' ? 'Все месяцы' : 'All Months'}
                    </option>
                    {availableMonths.map((ym) => {
                      const [y, m] = ym.split('-');
                      const monthObj = new Date(Date.UTC(parseInt(y, 10), parseInt(m, 10) - 1, 15));
                      const label =
                        locale === 'ja'
                          ? `${y}年${parseInt(m, 10)}月`
                          : monthObj.toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
                              month: 'short',
                              year: 'numeric',
                              timeZone: 'UTC',
                            });
                      const count = parishSchedule.filter((s) => s.date.startsWith(ym)).length;
                      return (
                        <option key={ym} value={ym}>
                          {label} ({count})
                        </option>
                      );
                    })}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Right: Search Input */}
              <div className="relative flex-1 md:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    locale === 'ja'
                      ? '奉事名・愛餐当番・行事を検索...'
                      : locale === 'ru'
                      ? 'Поиск службы, трапезы, событий...'
                      : 'Search services, meal duty, events...'
                  }
                  className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-orthodox-gold"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Type filter chips (Compact single line) */}
            <div className="flex items-center space-x-1 pt-1.5 border-t border-slate-100 dark:border-slate-800 text-xs overflow-x-auto">
              <span className="text-[11px] font-semibold text-slate-400 mr-1 flex-shrink-0">
                {locale === 'ja' ? '種別:' : locale === 'ru' ? 'Тип:' : 'Type:'}
              </span>
              {(
                [
                  { id: 'all', label: { ja: 'すべて', en: 'All', ru: 'Все' } },
                  { id: 'liturgy', label: { ja: '聖体礼儀', en: 'Liturgy', ru: 'Литургия' } },
                  { id: 'vigil', label: { ja: '徹夜祷・晩課', en: 'Vigil', ru: 'Всенощная' } },
                  { id: 'special', label: { ja: '特別祭・パニヒダ', en: 'Feasts & Special', ru: 'Праздники' } },
                ] as const
              ).map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => setTypeFilter(chip.id)}
                  className={`py-1 px-2.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    typeFilter === chip.id
                      ? 'bg-orthodox-navy text-orthodox-gold-light font-bold shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {chip.label[locale]}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count & Reset Filter */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>
              {locale === 'ja'
                ? `該当する奉事: ${filteredServices.length}件`
                : locale === 'ru'
                ? `Найдено богослужений: ${filteredServices.length}`
                : `Showing ${filteredServices.length} services`}
            </span>
            {(selectedMonth !== 'all' || typeFilter !== 'all' || searchQuery || viewScope !== 'upcoming') && (
              <button
                onClick={() => {
                  setViewScope('upcoming');
                  setSelectedMonth('all');
                  setTypeFilter('all');
                  setSearchQuery('');
                }}
                className="no-print text-orthodox-gold-dark hover:underline font-bold"
              >
                {locale === 'ja' ? 'フィルターをリセット' : locale === 'ru' ? 'Сбросить фильтры' : 'Reset filters'}
              </button>
            )}
          </div>

          {/* LINEAR CHRONOLOGICAL TIMELINE */}
          {groupedServices.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 text-center space-y-2">
              <CalendarDays className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <h4 className="font-bold text-base text-slate-700 dark:text-slate-300">
                {locale === 'ja' ? '該当する奉事日程がありません' : locale === 'ru' ? 'Службы не найдены' : 'No services found'}
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {locale === 'ja'
                  ? '条件を変更するか「全日程（通年）」を選択してお試しください。'
                  : locale === 'ru'
                  ? 'Попробуйте изменить фильтры или выберите «Все службы».'
                  : 'Try changing your search or switching to "All Year".'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {groupedServices.map((group) => (
                <div key={group.monthKey} className="space-y-2.5">
                  {/* Month Section Header */}
                  <div className="flex items-center justify-between pb-1.5 border-b-2 border-orthodox-gold/40 px-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg sm:text-xl">{getMonthIcon(group.monthNum)}</span>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-orthodox-navy dark:text-orthodox-gold-light">
                        {group.monthLabel}
                      </h3>
                      {group.highlight && (
                        <span className="hidden sm:inline-block text-xs font-semibold py-0.5 px-2 rounded-full bg-orthodox-candle/70 dark:bg-slate-800 text-orthodox-burgundy dark:text-orthodox-gold border border-orthodox-gold/30">
                          {group.highlight}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-slate-400">
                      {group.services.length} {locale === 'ja' ? '件' : locale === 'ru' ? 'служб' : 'services'}
                    </span>
                  </div>

                  {/* Linear List of Services for this Month */}
                  <div className="space-y-2">
                    {group.services.map((s) => {
                      const { dateObj } = parseServiceDate(s.date);
                      const badge = getServiceTypeBadge(s.serviceType, locale);
                      const isNext = s.id === nextService?.id;

                      return (
                        <div
                          key={s.id}
                          className={`p-3 sm:p-4 rounded-2xl border transition-all ${
                            isNext
                              ? 'border-2 border-orthodox-gold bg-amber-50/50 dark:bg-amber-950/20 shadow-sm ring-1 ring-orthodox-gold/30'
                              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-orthodox-gold/50'
                          }`}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            {/* Left: Date Square + Time & Service Title */}
                            <div className="flex items-start sm:items-center space-x-3.5 flex-1 min-w-0">
                              {/* Date Badge */}
                              <div className="w-12 text-center py-1 px-1 rounded-xl bg-orthodox-candle/70 dark:bg-slate-800 border border-orthodox-gold/40 flex-shrink-0">
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block uppercase tracking-tight">
                                  {formatMonthShort(dateObj, locale)}
                                </span>
                                <span className="text-lg font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light block leading-tight">
                                  {dateObj.getUTCDate()}
                                </span>
                                <span className="text-[9px] font-bold text-orthodox-burgundy dark:text-orthodox-gold block">
                                  {formatWeekday(dateObj, locale, true)}
                                </span>
                              </div>

                              {/* Title, Time, Badges */}
                              <div className="space-y-1 min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  {/* Time */}
                                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                                    <Clock className="w-3.5 h-3.5 text-orthodox-gold-dark inline" />
                                    <span>{s.time}</span>
                                  </span>

                                  {/* Service Type Chip */}
                                  <span className={`text-[10px] font-bold py-0.5 px-2 rounded-md border ${badge.badgeClass}`}>
                                    {badge.label}
                                  </span>

                                  {/* Next Service Indicator */}
                                  {isNext && (
                                    <span className="text-[9px] font-bold py-0.5 px-2 rounded-full bg-emerald-500 text-white uppercase tracking-wider animate-pulse flex items-center space-x-1">
                                      <span>★</span>
                                      <span>{locale === 'ja' ? '次回の奉事' : locale === 'ru' ? 'Ближайшая' : 'Next Up'}</span>
                                    </span>
                                  )}

                                  {/* Transferred Badge */}
                                  {s.isTransferred && (
                                    <span className="text-[9px] font-bold py-0.5 px-1.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                                      {locale === 'ja' ? '繰上' : locale === 'ru' ? 'Перенос' : 'Transferred'}
                                    </span>
                                  )}
                                </div>

                                <h4 className="font-serif font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                                  {s.title[locale]}
                                </h4>

                                {/* Event Notes (Inline for quick reading) */}
                                {s.notes && (
                                  <p className="text-xs text-slate-600 dark:text-slate-300 bg-amber-50/70 dark:bg-slate-800/80 p-1.5 rounded-lg border border-orthodox-gold/20 inline-block mt-0.5">
                                    {s.notes[locale]}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Right: Meal Duty Team Assignment */}
                            {(s.dutyGroup || (s.dutyPeople && s.dutyPeople.length > 0)) && (
                              <div className="flex items-center space-x-1.5 text-xs text-slate-600 dark:text-slate-400 bg-amber-50/80 dark:bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-200/70 dark:border-amber-900/60 flex-shrink-0 self-start md:self-center ml-15 md:ml-0">
                                <Utensils className="w-3.5 h-3.5 text-orthodox-gold-dark flex-shrink-0" />
                                <span className="text-slate-500 dark:text-slate-400 font-medium">
                                  {locale === 'ja' ? '愛餐（昼食）当番:' : locale === 'ru' ? 'Дежурные по трапезе:' : 'Meal Duty:'}
                                </span>
                                {s.dutyGroup && (
                                  <span className="font-bold text-orthodox-navy dark:text-orthodox-gold-light">
                                    {cleanDutyGroupName(s.dutyGroup, locale)}
                                  </span>
                                )}
                                {s.dutyPeople && s.dutyPeople.length > 0 && (
                                  <span className="text-slate-600 dark:text-slate-300">
                                    ({s.dutyPeople.map((p) => formatDutyPerson(p, locale)).join(', ')})
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. Bulletin & News Sub-tab */}
      {subTab === 'bulletin' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-orthodox-navy dark:text-orthodox-gold-light">
                {locale === 'ja' ? '教会だより・お知らせ' : locale === 'ru' ? 'Приходские новости и объявления' : 'Parish News & Announcements'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {locale === 'ja' ? '教会行事や日曜学校、お知らせのご案内' : locale === 'ru' ? 'Жизнь прихода, праздники и воскресная школа' : 'Parish life, upcoming events and church school'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PARISH_ANNOUNCEMENTS.map((ann) => (
              <div
                key={ann.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border transition-all ${
                  ann.important
                    ? 'border-2 border-orthodox-gold bg-amber-50/30 dark:bg-slate-900'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {ann.important && (
                    <span className="text-[10px] font-bold py-0.5 px-2 rounded-full bg-orthodox-burgundy text-white uppercase tracking-wider">
                      {locale === 'ja' ? '重要行事' : locale === 'ru' ? 'Важно' : 'Important'}
                    </span>
                  )}
                  {ann.category === 'sunday_school' && (
                    <span className="text-[10px] font-bold py-0.5 px-2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 uppercase tracking-wider">
                      {locale === 'ja' ? '日曜学校' : locale === 'ru' ? 'Воскресная школа' : 'Sunday School'}
                    </span>
                  )}
                  {ann.date && (
                    <span className="text-xs text-slate-400 font-medium">
                      {ann.date}
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2 leading-snug">
                  {ann.title[locale]}
                </h4>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {ann.content[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Visitor Guide Sub-tab (Enhanced with Authentic Photos) */}
      {subTab === 'visit' && (
        <div className="space-y-6">
          {/* Main Church Overview Hero Banner (Features church-exterior.jpg) */}
          <div className="bg-white dark:bg-slate-900 border-2 border-orthodox-gold/50 rounded-3xl p-5 sm:p-7 shadow-md overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: Photo of Osaka Church Exterior */}
              <div className="lg:col-span-5 relative group cursor-pointer" onClick={() => setActivePhoto({
                src: '/photos/church-exterior.jpg',
                title: PARISH_PHOTOS[0].title[locale],
                desc: PARISH_PHOTOS[0].desc[locale]
              })}>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-orthodox-gold shadow-md">
                  <img
                    src="/photos/church-exterior.jpg"
                    alt="Holy Protection Church in Osaka Exterior"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-black/70 text-white text-xs font-bold py-1.5 px-3 rounded-xl flex items-center space-x-1">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>{locale === 'ja' ? '写真を拡大' : locale === 'ru' ? 'Увеличить' : 'Enlarge Photo'}</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center mt-2 font-medium">
                  {PARISH_PHOTOS[0].title[locale]}
                </p>
              </div>

              {/* Right Column: Parish Information & Location */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <div className="flex items-center space-x-2.5 mb-1.5">
                    <img
                      src="/brand/church-seal-round.png"
                      alt="Parish Seal"
                      className="w-8 h-8 rounded-full border border-orthodox-gold object-cover shadow-sm"
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-orthodox-gold-dark dark:text-orthodox-gold">
                      {locale === 'ja' ? '日本ハリストス正教会 西日本主教教区' : locale === 'ru' ? 'Японская Православная Церковь' : 'Orthodox Church in Japan'}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-orthodox-navy dark:text-orthodox-gold-light">
                    {PARISH_INFO.name[locale]}
                  </h3>
                  <p className="text-xs sm:text-sm text-orthodox-burgundy dark:text-orthodox-gold font-serif mt-0.5 font-bold">
                    {locale === 'ja'
                      ? '生神女庇護聖堂（大阪ハリストス正教会）'
                      : locale === 'ru'
                      ? 'Храм Покрова Пресвятой Богородицы в Осаке'
                      : 'Holy Protection Temple, Osaka'}
                  </p>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {locale === 'ja'
                    ? '大阪ハリストス正教会は、日本正教会・西日本主教教区に属する歴史ある祈りの場です。正教会の信徒の方だけでなく、初めて見学される方や祈りを共にしたい方も心より歓迎いたします。'
                    : locale === 'ru'
                    ? 'Храм Покрова Пресвятой Богородицы в Осаке — приход Японской Православной Церкви (Западно-Японская епархия). Мы всегда рады православным христианам, гостям города и всем ищущим Бога!'
                    : 'The Holy Protection Church in Osaka is a parish of the Orthodox Church in Japan (Western Diocese). We warmly welcome all faithful, visitors, and inquirers.'}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-orthodox-gold flex-shrink-0 mt-0.5" />
                    <span>{PARISH_INFO.address[locale]}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Compass className="w-4 h-4 text-orthodox-gold flex-shrink-0 mt-0.5" />
                    <span>{PARISH_INFO.access[locale]}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1.5 pt-1">
                    <a href={`tel:${PARISH_INFO.phone}`} className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300 hover:text-orthodox-gold-dark font-medium">
                      <Phone className="w-4 h-4 text-orthodox-gold" />
                      <span>{PARISH_INFO.phone}</span>
                    </a>
                    <a href={`mailto:${PARISH_INFO.email}`} className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300 hover:text-orthodox-gold-dark font-medium">
                      <Mail className="w-4 h-4 text-orthodox-gold" />
                      <span>{PARISH_INFO.email}</span>
                    </a>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  <a
                    href="https://maps.google.com/?q=大阪府吹田市山手町1-8-15"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 py-2 px-4 rounded-xl bg-orthodox-gold text-orthodox-navy font-bold text-xs sm:text-sm hover:bg-orthodox-gold-dark shadow transition-all"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{locale === 'ja' ? 'Googleマップで開く' : locale === 'ru' ? 'Открыть на Google Maps' : 'Open in Google Maps'}</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                  <a
                    href={`tel:${PARISH_INFO.phone}`}
                    className="inline-flex items-center space-x-1.5 py-2 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-xs"
                  >
                    <Phone className="w-4 h-4 text-orthodox-gold-dark" />
                    <span>{locale === 'ja' ? '教会に電話する' : locale === 'ru' ? 'Позвонить в храм' : 'Call Parish'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Pastoral Care & Rector's Welcome Card (Features priest-liturgy.jpg) */}
          <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-3xl p-5 sm:p-7 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Priest Photo */}
              <div className="md:col-span-4 lg:col-span-3 text-center cursor-pointer group" onClick={() => setActivePhoto({
                src: '/photos/priest-liturgy.jpg',
                title: PARISH_PHOTOS[3].title[locale],
                desc: PARISH_PHOTOS[3].desc[locale]
              })}>
                <div className="relative inline-block mx-auto">
                  <img
                    src="/photos/priest-liturgy.jpg"
                    alt="Parish Rector in Festive Vestments"
                    className="w-36 h-48 sm:w-44 sm:h-56 rounded-2xl object-cover border-2 border-orthodox-gold shadow-md mx-auto group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4 text-white drop-shadow" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 font-medium">
                  {locale === 'ja' ? '聖体礼儀における香炉の祝福' : locale === 'ru' ? 'Настоятель храма за богослужением' : 'Parish Priest at Divine Liturgy'}
                </p>
              </div>

              {/* Pastoral Welcome Text */}
              <div className="md:col-span-8 lg:col-span-9 space-y-3">
                <div className="flex items-center space-x-2 text-orthodox-gold-dark dark:text-orthodox-gold font-bold text-xs uppercase tracking-wider">
                  <HeartHandshake className="w-4 h-4" />
                  <span>{locale === 'ja' ? '管轄司祭より皆様へ' : locale === 'ru' ? 'Пастырское слово настоятеля' : 'A Pastoral Welcome'}</span>
                </div>

                <h4 className="font-serif font-bold text-lg sm:text-2xl text-orthodox-navy dark:text-orthodox-gold-light">
                  {locale === 'ja'
                    ? '「どなたでも心よりお待ちしております」'
                    : locale === 'ru'
                    ? '«Двери нашего храма всегда открыты для каждого»'
                    : '“You are warmly welcome in our spiritual home”'}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {locale === 'ja'
                    ? '大阪ハリストス正教会は、生神女の温かい庇護のもと、祈りと愛を分かち合う神の家族です。信仰をお持ちの方はもちろん、キリスト教に関心をお持ちの方、祈りの静けさをお求めの方、人生のご相談など、どなたでも歓迎いたします。土曜の徹夜祷や日曜の聖体礼儀にお気軽にお越しください。'
                    : locale === 'ru'
                    ? 'Храм Покрова Пресвятой Богородицы в Осаке — это молитвенный дом и духовная семья под материнским кровом Божией Матери. Мы рады приветствовать прихожан, соотечественников в Японии, гостей и всех, кто интересуется православием. Приходите на субботнюю вечерню и воскресную Литургию!'
                    : 'The Holy Protection Church in Osaka is a spiritual family praying together under the maternal protection of the Mother of God. Whether you are a lifelong Orthodox Christian, exploring the faith, or simply in need of prayer and peace, you are warmly invited to join us for Saturday Vigil and Sunday Divine Liturgy.'}
                </p>

                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="py-1 px-2.5 rounded-lg bg-orthodox-candle/70 dark:bg-slate-800 text-orthodox-navy dark:text-orthodox-gold-light border border-orthodox-gold/30 font-medium">
                    {locale === 'ja' ? '☦ 告解・信仰相談' : locale === 'ru' ? '☦ Исповедь и беседы' : '☦ Confession & Counseling'}
                  </span>
                  <span className="py-1 px-2.5 rounded-lg bg-orthodox-candle/70 dark:bg-slate-800 text-orthodox-navy dark:text-orthodox-gold-light border border-orthodox-gold/30 font-medium">
                    {locale === 'ja' ? '🏥 病者訪問・病気平癒祈祷' : locale === 'ru' ? '🏥 Причастие болящих' : '🏥 Hospital & Sick Visits'}
                  </span>
                  <span className="py-1 px-2.5 rounded-lg bg-orthodox-candle/70 dark:bg-slate-800 text-orthodox-navy dark:text-orthodox-gold-light border border-orthodox-gold/30 font-medium">
                    {locale === 'ja' ? '🏠 家屋成聖式（家祓い）' : locale === 'ru' ? '🏠 Освящение жилищ' : '🏠 House Blessings'}
                  </span>
                  <span className="py-1 px-2.5 rounded-lg bg-orthodox-candle/70 dark:bg-slate-800 text-orthodox-navy dark:text-orthodox-gold-light border border-orthodox-gold/30 font-medium">
                    {locale === 'ja' ? '🕊️ 永眠者のパニヒダ（記憶祭）' : locale === 'ru' ? '🕊️ Панихиды и поминовение' : '🕊️ Memorial Prayers'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Two Columns: Church Sanctuary/Interior Photo + Visitor Etiquette Guide */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Sanctuary Photo & Iconostasis Details */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-3xl p-5 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-orthodox-navy dark:text-orthodox-gold-light">
                <Camera className="w-4 h-4 text-orthodox-gold" />
                <span>{locale === 'ja' ? '聖堂内部（イコノスタシス）' : locale === 'ru' ? 'Внутреннее убранство храма' : 'Sanctuary & Iconostasis'}</span>
              </div>

              <div className="relative group cursor-pointer aspect-[4/3] rounded-2xl overflow-hidden border-2 border-orthodox-gold shadow-sm" onClick={() => setActivePhoto({
                src: '/photos/church-interior.jpg',
                title: PARISH_PHOTOS[2].title[locale],
                desc: PARISH_PHOTOS[2].desc[locale]
              })}>
                <img
                  src="/photos/church-interior.jpg"
                  alt="Holy Protection Church Iconostasis"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-black/70 text-white text-xs font-bold py-1.5 px-3 rounded-xl flex items-center space-x-1">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>{locale === 'ja' ? '写真を拡大' : locale === 'ru' ? 'Увеличить' : 'Enlarge'}</span>
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {locale === 'ja'
                  ? '聖堂前方の壁一面に広がる「イコノスタシス（聖障）」には、ハリストス、生神女マリヤ、天使や聖人たちのイコンが美しく配置されています。中央の「王門」の奥に至聖所（祭壇）があります。'
                  : locale === 'ru'
                  ? 'Величественный деревянный иконостас с образами Спасителя, Богородицы и святых отделяет алтарную часть от средней части храма. В центре находятся Царские врата.'
                  : 'The carved iconostasis separates the nave from the altar, adorned with holy icons of Christ, the Theotokos, angels, and patron saints. The Royal Doors stand in the center.'}
              </p>
            </div>

            {/* Right: First-Time Visitor Etiquette Guide */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-3xl p-5 sm:p-6 shadow-sm space-y-3.5">
              <h4 className="font-serif font-bold text-base sm:text-lg text-orthodox-navy dark:text-orthodox-gold-light flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Info className="w-4 h-4 text-orthodox-gold" />
                <span>
                  {locale === 'ja' ? '初めて正教会に来られる方へ（参拝の心得）' : locale === 'ru' ? 'Для тех, кто впервые в храме' : 'First-Time Visitors: Church Etiquette'}
                </span>
              </h4>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">
                    {locale === 'ja' ? '1. 服装について' : locale === 'ru' ? '1. Одежда' : '1. Attire'}
                  </h5>
                  <p>
                    {locale === 'ja'
                      ? '礼拝にふさわしい清楚で敬虔な服装でお越しください。露出の多い服装や短パンは控えめにされることをお勧めします。'
                      : locale === 'ru'
                      ? 'Просьба приходить в храм в скромной и благоговейной одежде.'
                      : 'Modest, respectful attire is appropriate for church services.'}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">
                    {locale === 'ja' ? '2. ろうそくのお献げ' : locale === 'ru' ? '2. Свечи' : '2. Candles'}
                  </h5>
                  <p>
                    {locale === 'ja'
                      ? '聖堂入口でろうそくをいただき、イコン（聖像）の前でお祈りしながら灯します。献金箱にお心をお納めください。'
                      : locale === 'ru'
                      ? 'Свечи возжигаются перед святыми иконами с молитвой о здравии и упокоении.'
                      : 'Candles are placed before the holy icons with a quiet prayer for loved ones.'}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">
                    {locale === 'ja' ? '3. 聖体礼儀の「領聖（聖体拝領）」について' : locale === 'ru' ? '3. Святое Причастие' : '3. Holy Communion'}
                  </h5>
                  <p>
                    {locale === 'ja'
                      ? '聖体と聖血の拝領（杯からの領聖）は、正教会で洗礼・傅膏機密を受け、告解による準備をした信徒に限られます。洗礼を受けておられない方や見学の方は、礼儀の最後に配られる「アンティドル（祝福されたパン）」を感謝してお受け取りいただけます。'
                      : locale === 'ru'
                      ? 'К Святой Чаше приступают только крещеные православные христиане, подготовившиеся постом и исповедью. Неправославные гости могут подойти к кресту и получить благословенный антидор (хлеб).'
                      : 'Holy Communion from the Chalice is reserved for prepared Orthodox Christians. All visitors are warmly welcome to receive the blessed bread (antidoron) distributed at the end.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Parish Life Photo Gallery (4 Photos Grid with enlargement) */}
          <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-3xl p-5 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-lg sm:text-xl text-orthodox-navy dark:text-orthodox-gold-light flex items-center space-x-2">
                  <Camera className="w-5 h-5 text-orthodox-gold" />
                  <span>{locale === 'ja' ? '教会フォトギャラリー' : locale === 'ru' ? 'Фотогалерея прихода' : 'Parish Photo Gallery'}</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {locale === 'ja' ? 'タップすると写真を拡大表示できます' : locale === 'ru' ? 'Нажмите на фото для увеличения' : 'Click any photo to enlarge'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {PARISH_PHOTOS.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setActivePhoto({
                    src: photo.src,
                    title: photo.title[locale],
                    desc: photo.desc[locale]
                  })}
                  className="group cursor-pointer rounded-2xl overflow-hidden border-2 border-orthodox-gold/40 hover:border-orthodox-gold bg-slate-100 dark:bg-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={photo.src}
                      alt={photo.title[locale]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="w-5 h-5 text-white drop-shadow" />
                    </div>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900">
                    <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200 line-clamp-1">
                      {photo.title[locale]}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Photo Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 border-2 border-orthodox-gold rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute right-3 top-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              aria-label="Close photo"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[65vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-5 space-y-1.5 bg-white dark:bg-slate-900">
              <h4 className="font-serif font-bold text-base sm:text-lg text-orthodox-navy dark:text-orthodox-gold-light">
                {activePhoto.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activePhoto.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
