'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CURATED_PARISH_PHOTOS, ParishPhotoItem } from '../../data/parishPhotos';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Filter } from 'lucide-react';

export function PhotoGallerySection() {
  const { locale } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'exterior' | 'interior' | 'services' | 'community' | 'bells'>('all');
  const [activeModalPhoto, setActiveModalPhoto] = useState<ParishPhotoItem | null>(null);

  const categories: { id: typeof selectedCategory; label: { ja: string; en: string; ru: string } }[] = [
    { id: 'all', label: { ja: 'すべて', en: 'All Photos', ru: 'Все фотографии' } },
    { id: 'exterior', label: { ja: '聖堂外観', en: 'Architecture', ru: 'Храм и территория' } },
    { id: 'interior', label: { ja: '聖堂内部・聖像', en: 'Interior & Icons', ru: 'Интерьер и иконы' } },
    { id: 'services', label: { ja: '礼拝・復活大祭', en: 'Services & Pascha', ru: 'Службы и Пасха' } },
    { id: 'community', label: { ja: '信徒の集い・庭園', en: 'Community & Gardens', ru: 'Приходская жизнь' } },
    { id: 'bells', label: { ja: '鐘楼と鐘', en: 'Belfry & Bells', ru: 'Колокольня' } },
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? CURATED_PARISH_PHOTOS
    : CURATED_PARISH_PHOTOS.filter((p) => p.category === selectedCategory);

  const currentIndex = activeModalPhoto ? filteredPhotos.findIndex((p) => p.id === activeModalPhoto.id) : -1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setActiveModalPhoto(filteredPhotos[currentIndex - 1]);
    } else {
      setActiveModalPhoto(filteredPhotos[filteredPhotos.length - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < filteredPhotos.length - 1) {
      setActiveModalPhoto(filteredPhotos[currentIndex + 1]);
    } else {
      setActiveModalPhoto(filteredPhotos[0]);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 lg:p-10 shadow-sm space-y-6">
      {/* Header and Filter Pills */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orthodox-gold/15 text-orthodox-gold text-xs font-semibold mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>
              {locale === 'ja' ? '写真で見る大阪教会' : locale === 'ru' ? 'Приходская фотогалерея' : 'Parish Photo Gallery'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            {locale === 'ja'
              ? '聖堂と信徒の祈りの歩み'
              : locale === 'ru'
              ? 'Жизнь храма и молитва общины'
              : 'Our Temple, Worship & Community'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            {locale === 'ja'
              ? '吹田の青空にそびえる聖堂、厳かな奉神礼、そして温かい信徒の交流の記録です。'
              : locale === 'ru'
              ? 'Красота храма в Суите, пасхальная радость и тепло приходских встреч.'
              : 'Authentic photos of the Osaka temple, sacred liturgies, and parish life.'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all select-none ${
                selectedCategory === cat.id
                  ? 'bg-white dark:bg-slate-700 text-orthodox-navy dark:text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.label[locale]}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Photo Grid for PC (4 cols) & Tablet (3 cols) & Mobile (2 cols) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActiveModalPhoto(photo)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer bg-slate-900 aspect-4/3 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <img
              src={photo.src}
              alt={photo.title[locale]}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Photo Caption Pill */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-3.5 text-white">
              <h3 className="font-serif font-bold text-xs sm:text-sm leading-tight text-white drop-shadow-sm line-clamp-1">
                {photo.title[locale]}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-300 line-clamp-1 mt-0.5 opacity-90">
                {photo.caption[locale]}
              </p>
            </div>

            {/* Hover Expand Icon */}
            <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 backdrop-blur-xs text-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeModalPhoto && (
        <div
          onClick={() => setActiveModalPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[92vh]"
          >
            {/* Top Bar with Title & Close */}
            <div className="p-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between text-white">
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-orthodox-gold-light">
                  {activeModalPhoto.title[locale]}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {activeModalPhoto.caption[locale]}
                </p>
              </div>

              <button
                onClick={() => setActiveModalPhoto(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Container with Prev/Next buttons */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[350px] sm:min-h-[500px]">
              <img
                src={activeModalPhoto.src}
                alt={activeModalPhoto.title[locale]}
                className="max-w-full max-h-[70vh] object-contain select-none"
              />

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all backdrop-blur-xs border border-white/10"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all backdrop-blur-xs border border-white/10"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Footer Status */}
            <div className="px-4 py-2.5 bg-slate-900 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>{activeModalPhoto.id}</span>
              <span>
                {currentIndex + 1} / {filteredPhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
