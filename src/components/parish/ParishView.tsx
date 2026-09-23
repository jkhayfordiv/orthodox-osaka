'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PARISH_SCHEDULE_2026 } from '../../data/parishSchedule2026';
import { PARISH_ANNOUNCEMENTS } from '../../data/bulletin';
import { PARISH_INFO } from '../../data/terminology';
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
} from 'lucide-react';

export function ParishView() {
  const { locale } = useApp();
  const [subTab, setSubTab] = useState<'schedule' | 'bulletin' | 'visit'>('schedule');

  const subTabs = [
    {
      id: 'schedule' as const,
      icon: <Calendar className="w-4 h-4" />,
      label: { ja: '奉事日程・当番', en: 'Services & Roster', ru: 'Расписание служб' },
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
    <div className="space-y-4 pb-20 max-w-3xl mx-auto px-3 sm:px-4 pt-3">
      {/* Sub-tab Navigation */}
      <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-1.5 shadow-sm flex space-x-1">
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

      {/* 1. Services & Duty Roster Sub-tab */}
      {subTab === 'schedule' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-serif font-bold text-base sm:text-lg text-orthodox-navy dark:text-orthodox-gold-light">
              {locale === 'ja'
                ? '大阪ハリストス正教会 奉事日程'
                : locale === 'ru'
                ? 'Расписание богослужений храма'
                : 'Parish Service Schedule'}
            </h3>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1 text-xs py-1.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 font-semibold text-slate-700 dark:text-slate-200"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{locale === 'ja' ? '印刷する' : locale === 'ru' ? 'Печать' : 'Print'}</span>
            </button>
          </div>

          <div className="space-y-3">
            {PARISH_SCHEDULE_2026.map((s) => (
              <div
                key={s.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm hover:border-orthodox-gold/60 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 text-center py-1 px-1 rounded-xl bg-orthodox-candle/70 dark:bg-slate-800 border border-orthodox-gold/40">
                      <span className="text-xs text-slate-500 font-bold block uppercase">
                        {new Date(s.date).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
                          month: 'numeric',
                        })}月
                      </span>
                      <span className="text-lg font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light block">
                        {new Date(s.date).getUTCDate()}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-orthodox-burgundy dark:text-orthodox-gold">
                          {new Date(s.date).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
                            weekday: 'short',
                          })}曜日
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {s.time}
                        </span>
                        {s.isTransferred && (
                          <span className="text-[10px] font-bold py-0.5 px-1.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                            繰上
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-base text-slate-900 dark:text-white mt-0.5">
                        {s.title[locale]}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Duty Team Info */}
                {s.dutyGroup && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-400">
                      <Users className="w-3.5 h-3.5 text-orthodox-gold-dark" />
                      <span>{locale === 'ja' ? '昼食・奉仕当番: ' : locale === 'ru' ? 'Дежурные: ' : 'Lunch & Duty: '}</span>
                      <span className="font-bold text-orthodox-navy dark:text-orthodox-gold-light">
                        &lt;{s.dutyGroup}&gt;
                      </span>
                      {s.dutyPeople && s.dutyPeople.length > 0 && (
                        <span> ({s.dutyPeople.join(', ')})</span>
                      )}
                    </div>
                  </div>
                )}

                {s.notes && (
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                    {s.notes[locale]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Bulletin & News Sub-tab */}
      {subTab === 'bulletin' && (
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-base sm:text-lg text-orthodox-navy dark:text-orthodox-gold-light px-1">
            {locale === 'ja' ? '教会だより・お知らせ' : locale === 'ru' ? 'Приходские новости и объявления' : 'Parish News & Announcements'}
          </h3>

          <div className="space-y-3.5">
            {PARISH_ANNOUNCEMENTS.map((ann) => (
              <div
                key={ann.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border ${
                  ann.important
                    ? 'border-2 border-orthodox-gold bg-orthodox-candle/20 dark:bg-slate-900'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {ann.important && (
                    <span className="text-[10px] font-bold py-0.5 px-2 rounded-full bg-orthodox-burgundy text-white uppercase tracking-wider">
                      {locale === 'ja' ? '重要行事' : locale === 'ru' ? 'Важно' : 'Important'}
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

      {/* 3. Visitor Guide Sub-tab */}
      {subTab === 'visit' && (
        <div className="space-y-4">
          {/* Parish Overview Card */}
          <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="font-serif font-bold text-lg text-orthodox-navy dark:text-orthodox-gold-light">
              {PARISH_INFO.name[locale]}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {locale === 'ja'
                ? '大阪ハリストス正教会は、日本正教会・西日本主教教区に属する歴史ある祈りの場です。正教会の信徒の方だけでなく、初めて見学される方や祈りを共にしたい方も心より歓迎いたします。'
                : locale === 'ru'
                ? 'Храм Покрова Пресвятой Богородицы в Осаке — приход Японской Православной Церкви (Западно-Японская епархия). Мы всегда рады православным христианам и всем ищущим Бога!'
                : 'The Holy Protection Church in Osaka is a parish of the Orthodox Church in Japan (Western Diocese). We warmly welcome all faithful, visitors, and inquirers.'}
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-orthodox-gold flex-shrink-0 mt-0.5" />
                <span>{PARISH_INFO.address[locale]}</span>
              </div>
              <div className="flex items-start space-x-2">
                <Compass className="w-4 h-4 text-orthodox-gold flex-shrink-0 mt-0.5" />
                <span>{PARISH_INFO.access[locale]}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-orthodox-gold flex-shrink-0" />
                <span>{PARISH_INFO.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orthodox-gold flex-shrink-0" />
                <span>{PARISH_INFO.email}</span>
              </div>
            </div>

            <div className="pt-2">
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
            </div>
          </div>

          {/* First-Time Visitor Etiquette Guide */}
          <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/30 rounded-2xl p-5 shadow-sm space-y-3">
            <h4 className="font-serif font-bold text-base text-orthodox-navy dark:text-orthodox-gold-light flex items-center space-x-2">
              <Info className="w-4 h-4 text-orthodox-gold" />
              <span>
                {locale === 'ja' ? '初めて正教会に来られる方へ（参拝の心得）' : locale === 'ru' ? 'Для тех, кто впервые в храме' : 'First-Time Visitors: Church Etiquette'}
              </span>
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
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

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
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

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
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

          {/* Emergency Pastoral Contact Card */}
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl p-4 flex items-center space-x-3.5">
            <Phone className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div>
              <h5 className="font-bold text-sm text-red-900 dark:text-red-200">
                {locale === 'ja' ? '緊急の牧会連絡（臨終・病者訪問など）' : locale === 'ru' ? 'Срочные требы (причастие болящих, отпевание)' : 'Urgent Pastoral Needs'}
              </h5>
              <p className="text-xs text-red-700 dark:text-red-300 mt-0.5">
                {locale === 'ja'
                  ? '緊急の病気のお見舞いや葬儀のご相談は、教会電話（06-6388-4512）またはメールにてご連絡ください。'
                  : locale === 'ru'
                  ? 'В экстренных случаях звоните по телефону храма 06-6388-4512 или пишите на почту.'
                  : 'For hospital visits or funeral arrangements, please call 06-6388-4512.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
