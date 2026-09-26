'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { PARISH_HISTORY_DATA } from '../../data/parishWebsiteData';
import { PARISH_INFO } from '../../data/terminology';
import { Church, BookOpen, Clock, Award, Shield, Sparkles, MapPin } from 'lucide-react';

export function HistoryView() {
  const { locale, setActiveTab } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-20">
      {/* Header Banner with Church Panorama Background */}
      <div className="relative bg-orthodox-navy text-white py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
          <img
            src="/church-photos/osaka-church-panoramic.jpg"
            alt="Osaka Orthodox Church Panorama"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-orthodox-navy via-orthodox-navy/95 to-orthodox-navy/85 z-0" />

        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orthodox-gold/20 border border-orthodox-gold/40 text-orthodox-gold-light text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>
              {locale === 'ja'
                ? '明治から続く信仰と文化の歩み'
                : locale === 'ru'
                ? 'Духовное наследие с эпохи Мэйдзи'
                : 'Heritage since the Meiji Era'}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
            {locale === 'ja'
              ? '大阪ハリストス正教会の歴史と文化遺産'
              : locale === 'ru'
              ? 'История прихода и духовное наследие'
              : 'History & Heritage of Osaka Orthodox Church'}
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm lg:text-base max-w-3xl font-light leading-relaxed">
            {locale === 'ja'
              ? '日本の亜使徒大主教 聖ニコライの宣教、懐徳堂出身の翻訳家・中井木菟麻呂の訳経、日本初の洋画家・山下りんの聖像、そして帝政ロシア時代の大鐘。'
              : locale === 'ru'
              ? 'Труды святителя Николая Японского, переводы Павла Накаи (академия Кайтокудо), иконы Ирины Ямаситы и исторические колокола.'
              : 'The apostolic labors of St. Nicholas of Japan, translator Paul Nakai from Kaitokudo, iconography by Rin Yamashita, and pre-revolutionary bells.'}
          </p>
        </div>
      </div>

      {/* Main Content Area: 12-Column Responsive Layout on PC */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Intro Quote Banner */}
        <div className="p-6 lg:p-8 rounded-3xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-serif italic text-center max-w-4xl mx-auto shadow-xs">
          {locale === 'ja'
            ? '「大阪は西日本宣教の要の地である。この地に正教の光を灯し、信徒の信仰を固く守らねばならぬ。」—— 日本の亜使徒大主教 聖ニコライの日記より'
            : locale === 'ru'
            ? '«Осака — сердце миссии в Западной Японии. Здесь непрестанно должен сиять свет Православия...» — Из дневников свт. Николая Японского'
            : '"Osaka is the pivotal spiritual center of Western Japan. Here the light of Orthodoxy must shine continually..." — From the diaries of St. Nicholas of Japan'}
        </div>

        {/* 3 Major Historical Eras / Themes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {PARISH_HISTORY_DATA.map((section, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-2xl bg-orthodox-navy text-orthodox-gold-light flex items-center justify-center font-bold text-sm font-serif shadow-xs">
                    {idx + 1}
                  </span>
                  <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white leading-snug break-words sm:break-keep">
                    {section.title[locale]}
                  </h2>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {section.content[locale].map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Illustrated Heritage Showcase: 4 Wide Cards on PC */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 lg:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div className="text-xs font-bold text-orthodox-gold uppercase tracking-wide">
                {locale === 'ja' ? '写真で見る文化財と聖具' : locale === 'ru' ? 'Святыни в фотографиях' : 'Treasures & Relics in Photos'}
              </div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 dark:text-white mt-1 flex items-center gap-2">
                <Church className="w-6 h-6 text-orthodox-gold" />
                <span>
                  {locale === 'ja' ? '受け継がれる祈りの空間と文化財' : locale === 'ru' ? 'Храмовое пространство и святыни' : 'The Sacred Temple & Heritage'}
                </span>
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              {locale === 'ja' ? '吹田市山手町 聖堂境内' : locale === 'ru' ? 'Суита, Осака' : 'Suita, Osaka'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Royal Doors & Iconostasis */}
            <div className="space-y-2.5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-4/3 bg-slate-900">
                <img
                  src="/church-photos/royal-doors-iconostasis.jpg"
                  alt="Royal Doors and Iconostasis"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {locale === 'ja' ? '王門と聖障（イコノスタス）' : locale === 'ru' ? 'Царские врата и иконостас' : 'The Royal Doors'}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {locale === 'ja'
                    ? '天国と地上の交わりを象徴する金色の王門と至聖所の聖障。'
                    : locale === 'ru'
                    ? 'Врата, ведущие к святому престолу, и благолепный иконостас.'
                    : 'The gilded Royal Doors and sacred iconostasis.'}
                </p>
              </div>
            </div>

            {/* Card 2: Historic Bell */}
            <div className="space-y-2.5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-4/3 bg-slate-900">
                <img
                  src="/photos/bell-belfry-tower.jpg"
                  alt="Historic Russian Bell"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {locale === 'ja' ? '帝政ロシア製の大鐘' : locale === 'ru' ? 'Старинный русский колокол' : 'Historic Russian Bell'}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {locale === 'ja'
                    ? '革命前のロシアで鋳造され、1世紀以上響き続ける祈りの大鐘。'
                    : locale === 'ru'
                    ? 'Колокол дореволюционного литья, благовествующий более ста лет.'
                    : 'Cast in pre-revolutionary Russia, proclaiming the Gospel for over a century.'}
                </p>
              </div>
            </div>

            {/* Card 3: Rin Yamashita Iconography */}
            <div className="space-y-2.5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-4/3 bg-slate-900">
                <img
                  src="/images/westjapan/church/Osakaiconos07.jpg"
                  alt="Rin Yamashita Icons"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {locale === 'ja' ? '山下りんの聖像画' : locale === 'ru' ? 'Иконы Ирины Ямаситы' : 'Icons by Rin Yamashita'}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {locale === 'ja'
                    ? 'ペテルブルクで学んだ日本初の女性洋画家・山下りんによる聖像。'
                    : locale === 'ru'
                    ? 'Образа кисти первой японской иконописицы Ирины (Рин) Ямаситы.'
                    : 'Sacred icons painted by Rin Yamashita, trained in St. Petersburg.'}
                </p>
              </div>
            </div>

            {/* Card 4: Nakai Tsugumaro & Monument */}
            <div className="space-y-2.5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-4/3 bg-slate-900">
                <img
                  src="/church-photos/church-altar-light.jpg"
                  alt="Nakai Tsugumaro Heritage"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {locale === 'ja' ? '中井木菟麻呂の訳経と顕彰碑' : locale === 'ru' ? 'Павел Накаи и памятник' : 'Paul Nakai & Monument'}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {locale === 'ja'
                    ? '懐徳堂の学統を継ぎ全祈祷文・聖書を翻訳した木菟麻呂の顕彰碑。'
                    : locale === 'ru'
                    ? 'Памятный знак в честь переводчика богослужебных книг Павла Накаи.'
                    : 'Monument honoring translator Paul Nakai from Kaitokudo.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Ribbon */}
        <div className="pt-4 flex items-center justify-end">
          <button
            onClick={() => setActiveTab('access')}
            className="px-5 py-2.5 rounded-xl bg-orthodox-gold text-orthodox-navy font-bold text-xs shadow-sm hover:bg-orthodox-gold-light transition-all"
          >
            {locale === 'ja' ? '聖堂を見学する（参祷案内）' : locale === 'ru' ? 'Посетить храм' : 'Plan a Visit'}
          </button>
        </div>
      </div>
    </div>
  );
}
