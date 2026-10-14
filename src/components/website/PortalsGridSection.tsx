'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Music, ScrollText, Compass, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function PortalsGridSection() {
  const { locale } = useApp();

  const portals = [
    {
      href: '/george',
      icon: <BookOpen className="w-5 h-5 text-amber-800 dark:text-amber-300" />,
      title: {
        ja: '司祭ゲオルギイ松島雄一 神学',
        en: 'Fr. George Matsushima Archive',
        ru: 'О. Георгий Мацусима — Богословие',
      },
      tag: { ja: '教理・信仰問答', en: 'Catechism & Q&A', ru: 'Вероучение' },
      desc: {
        ja: '正教会の教理、聖師父の教え、信仰問答Q&A、初代教会からの伝統的神学論考。',
        en: 'Orthodox theology, teachings of the Holy Fathers, catechism, and pastoral Q&A.',
        ru: 'Православное богословие, святоотеческое наследие и пастырские ответы на вопросы.',
      },
    },
    {
      href: '/maria',
      icon: <Music className="w-5 h-5 text-amber-800 dark:text-amber-300" />,
      title: {
        ja: 'マリア松島純子 聖歌ポータル',
        en: 'Matushka Maria Sacred Music',
        ru: 'Мария Мацусима — Церковное пение',
      },
      tag: { ja: '聖歌譜・音楽論', en: 'Scores & History', ru: 'Партитуры и история' },
      desc: {
        ja: '日本正教会で歌われる主日八調式文、大式聖体礼儀全曲譜、聖歌論と歴史的資料。',
        en: 'Eight Tones, Divine Liturgy scores, and treatises on Japanese Orthodox chant.',
        ru: 'Песнопения осмогласия, ноты Божественной Литургии и статьи о церковном пении.',
      },
    },
    {
      href: '/liturgy',
      icon: <ScrollText className="w-5 h-5 text-amber-800 dark:text-amber-300" />,
      title: {
        ja: '奉神礼・祈祷文集',
        en: 'Liturgical Prayers & Services',
        ru: 'Богослужебные тексты',
      },
      tag: { ja: '式文・祈祷書', en: 'Service Books', ru: 'Чинопоследования' },
      desc: {
        ja: '聖体礼儀、徹夜祷、時課祈祷の日本語定式文およびPDFテキスト文集。',
        en: 'Official Japanese liturgical texts for Divine Liturgy, Vigil, and Daily Hours.',
        ru: 'Японские тексты Литургии, Всенощного бдения и Часов с PDF-публикациями.',
      },
    },
    {
      href: '/westjapan',
      icon: <Compass className="w-5 h-5 text-amber-800 dark:text-amber-300" />,
      title: {
        ja: '西日本主教教区',
        en: 'Western Japan Diocese',
        ru: 'Западно-Японская епархия',
      },
      tag: { ja: '教区聖堂案内', en: 'Parish Directory', ru: 'Приходы епархии' },
      desc: {
        ja: '京都主教座聖堂をはじめ、近畿・東海・中国・四国・九州各地の正教会案内。',
        en: 'Kyoto Cathedral and all Orthodox parishes across Western Japan and Kyushu.',
        ru: 'Кафедральный собор в Киото и храмы епархии в регионах Кансай, Тюгоку, Кюсю.',
      },
    },
  ];

  return (
    <section className="space-y-4">
      {/* Editorial Section Kicker */}
      <div className="flex items-center gap-3 border-l-2 border-amber-800/80 pl-3">
        <div>
          <span className="text-2xs font-bold uppercase tracking-widest text-amber-900/80 dark:text-amber-300">
            {locale === 'ja' ? '研究・専門資料' : 'Archives & Resources'}
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white">
            {locale === 'ja' ? '正教研究ポータル・主教教区' : 'Orthodox Portals & Western Diocese'}
          </h2>
        </div>
      </div>

      {/* Clean 4-Column Editorial List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {portals.map((portal, idx) => (
          <Link
            key={idx}
            href={portal.href}
            className="group block p-5 rounded-md bg-[#FAF8F5] dark:bg-slate-900 border border-stone-200 dark:border-stone-800 shadow-xs hover:border-amber-800/50 hover:bg-white dark:hover:bg-slate-850 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-md bg-stone-100 dark:bg-slate-800 flex items-center justify-center border border-stone-200 dark:border-stone-700">
                {portal.icon}
              </div>
              <span className="text-3xs font-semibold uppercase tracking-wider text-stone-500">
                {portal.tag[locale]}
              </span>
            </div>

            <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-white group-hover:text-amber-900 dark:group-hover:text-amber-300 transition-colors flex items-center justify-between">
              <span>{portal.title[locale]}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0 ml-1" />
            </h3>

            <p className="font-serif text-xs text-stone-600 dark:text-stone-400 leading-relaxed mt-2 line-clamp-3">
              {portal.desc[locale]}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
