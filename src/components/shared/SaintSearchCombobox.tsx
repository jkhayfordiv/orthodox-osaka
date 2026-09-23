'use client';

import React, { useState, useRef, useEffect } from 'react';
import { COMMON_NAME_DAYS } from '../../data/nameDays';
import { NameDayEntry, Locale } from '../../lib/types';
import { Search, X, Check, Award, Calendar } from 'lucide-react';

interface SaintSearchComboboxProps {
  selectedSaintId: string | null;
  onSelect: (saintId: string | null) => void;
  locale: Locale;
  label?: string;
  placeholder?: string;
}

export function SaintSearchCombobox({
  selectedSaintId,
  onSelect,
  locale,
  label,
  placeholder,
}: SaintSearchComboboxProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedSaint = COMMON_NAME_DAYS.find((s) => s.id === selectedSaintId) || null;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter saints with multilingual fuzzy matching
  const filteredSaints = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return COMMON_NAME_DAYS.slice(0, 15); // Show first 15 if empty
    }

    // Common aliases for enhanced cross-lingual search (e.g. maria <-> mary <-> マリヤ)
    const aliases: Record<string, string[]> = {
      mary: ['mary', 'maria', 'mariya', 'マリア', 'マリヤ', 'мария'],
      maria: ['mary', 'maria', 'mariya', 'マリア', 'マリヤ', 'мария'],
      john: ['john', 'ioan', 'ivan', 'イオアン', 'иоанн', 'иван'],
      ioan: ['john', 'ioan', 'ivan', 'イオアン', 'иоанн', 'иван'],
      nicholas: ['nicholas', 'nikolai', 'nicolas', 'ニコライ', 'николай'],
      nikolai: ['nicholas', 'nikolai', 'nicolas', 'ニコライ', 'николай'],
      peter: ['peter', 'petr', 'ペトル', 'пётр', 'петр'],
      paul: ['paul', 'pavel', 'パウェル', 'павел'],
      alexander: ['alexander', 'aleksandr', 'アレクサンドル', 'александр'],
      alexandra: ['alexandra', 'アレクサンドラ', 'александра'],
      anna: ['anna', 'anne', 'アンナ', 'анна'],
      catherine: ['catherine', 'ekaterina', 'エカテリナ', 'екатерина'],
      elizabeth: ['elizabeth', 'elizaveta', 'エリザベト', 'елизавета'],
      anastasia: ['anastasia', 'anastasiya', 'アナスタシヤ', 'анастасия'],
      george: ['george', 'georgii', 'ゲオルギイ', 'георгий'],
      michael: ['michael', 'mikhail', 'ミハイル', 'михаил'],
      basil: ['basil', 'vasilii', 'ワシリイ', 'василий'],
      gregory: ['gregory', 'grigorii', 'グリゴリイ', 'григорий'],
      seraphim: ['seraphim', 'セラフィム', 'серафим'],
      sergius: ['sergius', 'sergii', 'セルギイ', 'сергий'],
    };

    // Find any expanded search terms
    let searchTerms = [q];
    for (const [key, list] of Object.entries(aliases)) {
      if (list.some((item) => item.includes(q) || q.includes(item))) {
        searchTerms = Array.from(new Set([...searchTerms, ...list]));
      }
    }

    return COMMON_NAME_DAYS.filter((entry) => {
      const matchJa = `${entry.name.ja} ${entry.saint.ja}`.toLowerCase();
      const matchEn = `${entry.name.en} ${entry.saint.en}`.toLowerCase();
      const matchRu = `${entry.name.ru} ${entry.saint.ru}`.toLowerCase();

      return searchTerms.some(
        (term) =>
          matchJa.includes(term) ||
          matchEn.includes(term) ||
          matchRu.includes(term) ||
          entry.feastDateCivil.includes(term) ||
          entry.feastDateJulian.includes(term)
      );
    });
  }, [query]);

  const defaultPlaceholder =
    locale === 'ja'
      ? '聖人名を入力（例: マリヤ, ニコライ, Mary, John）'
      : locale === 'ru'
      ? 'Поиск святого (напр. Мария, Николай, Иоанн)...'
      : 'Type to search saint (e.g. Mary, Nicholas, John)...';

  return (
    <div ref={containerRef} className="relative w-full space-y-2">
      {label && (
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
          {label}
        </label>
      )}

      {/* Selected Saint Display Card */}
      {selectedSaint ? (
        <div className="flex items-center justify-between p-3 rounded-xl border-2 border-orthodox-gold bg-orthodox-candle/20 dark:bg-slate-800/80 shadow-sm animate-in fade-in">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <Award className="w-5 h-5 text-orthodox-gold flex-shrink-0" />
            <div className="truncate">
              <div className="font-bold text-sm text-orthodox-navy dark:text-orthodox-gold-light truncate">
                {selectedSaint.name[locale]} — {selectedSaint.saint[locale]}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-2 mt-0.5">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-orthodox-burgundy dark:text-orthodox-gold" />
                  <span>
                    {locale === 'ja' ? '新暦 ' : locale === 'ru' ? 'Нов. стиль ' : 'Civil: '}
                    {selectedSaint.feastDateCivil}
                  </span>
                </span>
                <span className="text-slate-400">|</span>
                <span>
                  {locale === 'ja' ? '旧暦 ' : locale === 'ru' ? 'Ст. стиль ' : 'Julian: '}
                  {selectedSaint.feastDateJulian}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
                setQuery('');
              }}
              className="text-xs py-1 px-2.5 rounded-lg bg-orthodox-gold/20 hover:bg-orthodox-gold text-orthodox-navy dark:text-orthodox-gold-light hover:text-orthodox-navy font-bold transition-colors"
            >
              {locale === 'ja' ? '変更' : locale === 'ru' ? 'Изменить' : 'Change'}
            </button>
            <button
              type="button"
              onClick={() => onSelect(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
              title="Clear selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Search Input when no saint is selected (or when choosing) */
        <div className="relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-orthodox-gold absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder={placeholder || defaultPlaceholder}
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-orthodox-gold shadow-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating / Inline Dropdown List */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-40 mt-1 bg-white dark:bg-slate-900 border border-orthodox-gold/40 rounded-xl shadow-2xl overflow-hidden max-h-72 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
          <div className="p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-[11px] text-slate-500 font-semibold px-3">
            <span>
              {query
                ? `${filteredSaints.length} ${
                    locale === 'ja'
                      ? '件の候補が見つかりました'
                      : locale === 'ru'
                      ? 'найдено'
                      : 'saints found'
                  }`
                : `${locale === 'ja' ? '主な聖人一覧（入力して検索可能）' : 'Common Saints (Type to search)'}`}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs"
            >
              ✕ {locale === 'ja' ? '閉じる' : 'Close'}
            </button>
          </div>

          {filteredSaints.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500">
              {locale === 'ja'
                ? '該当する聖人が見つかりませんでした。別の読みや英語・ロシア語表記をお試しください。'
                : 'No matching saints found. Try typing another spelling or language.'}
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredSaints.map((entry) => {
                const isSelected = entry.id === selectedSaintId;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => {
                      onSelect(entry.id);
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className={`w-full text-left p-3 hover:bg-orthodox-candle/30 dark:hover:bg-slate-800/80 transition-colors flex items-center justify-between group ${
                      isSelected ? 'bg-orthodox-gold/15' : ''
                    }`}
                  >
                    <div className="pr-2 min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-sm text-orthodox-navy dark:text-orthodox-gold-light group-hover:text-orthodox-burgundy dark:group-hover:text-orthodox-gold transition-colors">
                          {entry.name[locale]}
                        </span>
                        <span className="text-xs text-slate-400 font-normal truncate">
                          ({entry.name.en !== entry.name[locale] ? entry.name.en : entry.name.ja})
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-serif leading-snug mt-0.5 line-clamp-1">
                        {entry.saint[locale]}
                      </p>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center space-x-2">
                        <span className="font-medium text-orthodox-navy dark:text-orthodox-gold">
                          {locale === 'ja' ? '新暦: ' : 'Civil: '}
                          {entry.feastDateCivil}
                        </span>
                        <span>•</span>
                        <span>
                          {locale === 'ja' ? '旧暦: ' : 'Julian: '}
                          {entry.feastDateJulian}
                        </span>
                      </div>
                    </div>

                    <div className="flex-shrink-0 ml-2">
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-orthodox-gold text-orthodox-navy flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-orthodox-gold opacity-0 group-hover:opacity-100 transition-opacity">
                          {locale === 'ja' ? '選択' : 'Select'}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
