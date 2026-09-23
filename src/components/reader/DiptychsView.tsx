'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { PrayerListItem, Locale } from '../../lib/types';
import {
  Flame,
  Plus,
  Trash2,
  Edit2,
  BookOpen,
  Search,
  X,
  HeartHandshake,
  Check,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface DiptychsViewProps {
  embeddedMode?: boolean; // When rendered inside Morning Prayer #8
}

export function DiptychsView({ embeddedMode = false }: DiptychsViewProps) {
  const { locale, prayerList, addPrayerItem, updatePrayerItem, removePrayerItem, allSaints } = useApp();

  // 'prayer' = easy reading while chanting; 'manage' = adding/editing list
  const [activeView, setActiveView] = useState<'prayer' | 'manage'>('prayer');
  const [manageFilter, setManageFilter] = useState<'all' | 'living' | 'departed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State for Add / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PrayerListItem | null>(null);

  // Form State
  const [formType, setFormType] = useState<'living' | 'departed'>('living');
  const [formName, setFormName] = useState('');
  const [formBaptismalName, setFormBaptismalName] = useState('');
  const [formSelectedSaintId, setFormSelectedSaintId] = useState<string | undefined>(undefined);
  const [formRelation, setFormRelation] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [saintSearch, setSaintSearch] = useState('');
  const [showSaintSuggestions, setShowSaintSuggestions] = useState(false);

  // Delete confirmation state
  const [deletingItem, setDeletingItem] = useState<PrayerListItem | null>(null);

  // Filtered lists
  const livingList = useMemo(() => {
    return prayerList.filter((p) => p.type === 'living');
  }, [prayerList]);

  const departedList = useMemo(() => {
    return prayerList.filter((p) => p.type === 'departed');
  }, [prayerList]);

  const filteredManageList = useMemo(() => {
    let list = prayerList;
    if (manageFilter === 'living') list = list.filter((p) => p.type === 'living');
    if (manageFilter === 'departed') list = list.filter((p) => p.type === 'departed');
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.baptismalName && p.baptismalName.toLowerCase().includes(q)) ||
          (p.relation && p.relation.toLowerCase().includes(q)) ||
          (p.notes && p.notes.toLowerCase().includes(q))
      );
    }
    return list;
  }, [prayerList, manageFilter, searchQuery]);

  // Saint suggestions for autocomplete
  const saintSuggestions = useMemo(() => {
    if (!saintSearch.trim()) return [];
    const q = saintSearch.toLowerCase();
    return allSaints
      .filter(
        (s) =>
          s.name[locale].toLowerCase().includes(q) ||
          s.name.en.toLowerCase().includes(q) ||
          (s.aliases && s.aliases.some((a) => a.toLowerCase().includes(q)))
      )
      .slice(0, 5);
  }, [allSaints, saintSearch, locale]);

  const handleOpenAdd = (type: 'living' | 'departed' = 'living') => {
    setEditingItem(null);
    setFormType(type);
    setFormName('');
    setFormBaptismalName('');
    setFormSelectedSaintId(undefined);
    setFormRelation('');
    setFormNotes('');
    setSaintSearch('');
    setShowSaintSuggestions(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: PrayerListItem) => {
    setEditingItem(item);
    setFormType(item.type);
    setFormName(item.name);
    setFormBaptismalName(item.baptismalName || '');
    setFormSelectedSaintId(item.saintId);
    setFormRelation(item.relation || '');
    setFormNotes(item.notes || '');
    setSaintSearch(item.baptismalName || '');
    setShowSaintSuggestions(false);
    setModalOpen(true);
  };

  const handleConfirmDelete = (item: PrayerListItem) => {
    setDeletingItem(item);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingItem) {
      updatePrayerItem(editingItem.id, {
        name: formName.trim(),
        baptismalName: formBaptismalName.trim() || undefined,
        saintId: formSelectedSaintId,
        relation: formRelation.trim() || undefined,
        notes: formNotes.trim() || undefined,
        type: formType,
      });
    } else {
      addPrayerItem({
        type: formType,
        name: formName.trim(),
        baptismalName: formBaptismalName.trim() || undefined,
        saintId: formSelectedSaintId,
        relation: formRelation.trim() || undefined,
        notes: formNotes.trim() || undefined,
      });
    }

    setModalOpen(false);
  };

  const quickRelations = {
    ja: ['代子', '父', '母', '夫', '妻', '子', '祖父', '祖母', '兄弟', '友人', '霊父・司祭'],
    en: ['Godchild', 'Father', 'Mother', 'Husband', 'Wife', 'Child', 'Grandfather', 'Grandmother', 'Brother', 'Friend', 'Priest'],
    ru: ['Крестник', 'Отец', 'Мать', 'Муж', 'Жена', 'Сын/Дочь', 'Дедушка', 'Бабушка', 'Брат', 'Друг', 'Духовник'],
  }[locale];

  const quickNotesLiving = {
    ja: ['健康と救い', '病気平癒', '旅の平安', '学業・仕事', '心身の平安'],
    en: ['Health & Salvation', 'For Healing', 'Safe Travel', 'Studies/Work', 'Peace of Mind'],
    ru: ['О здравии', 'О болящих (исцеление)', 'О путешествующих', 'О помощи в учебе', 'О душевном мире'],
  }[locale];

  const quickNotesDeparted = {
    ja: ['永遠の安息', '新永眠（40日以内）', '命日記念', '教会の恩人', '先祖代々'],
    en: ['Eternal Repose', 'Newly Departed (40 days)', 'Memorial', 'Benefactor', 'Ancestors'],
    ru: ['О упокоении', 'Новопреставленный', 'Годовщина памяти', 'Благодетели храма', 'Сродники'],
  }[locale];

  return (
    <div className={`space-y-4 ${embeddedMode ? 'mt-4' : ''}`}>
      {/* Top Banner (Only in standalone mode) */}
      {!embeddedMode && (
        <div className="bg-gradient-to-r from-orthodox-navy via-slate-900 to-orthodox-navy dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white rounded-2xl p-4 sm:p-6 shadow-md border border-orthodox-gold/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl">📜</span>
                <h2 className="font-serif font-bold text-lg sm:text-2xl text-orthodox-gold-light">
                  {locale === 'ja'
                    ? '記憶帳（ディプティク・祈祷名簿）'
                    : locale === 'ru'
                    ? 'Помянник (О здравии и о упокоении)'
                    : 'Orthodox Diptychs & Prayer List'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {locale === 'ja'
                  ? '聖イコンの前に立ち、生者の健康と救い、および眠れる親族・恩人の永遠の記憶を祈るための個人祈祷名簿です。'
                  : locale === 'ru'
                  ? 'Ежедневное поминовение живых и усопших сродников и близких перед святыми иконами во время утренних и вечерних молитв.'
                  : 'Your personal diptychs for daily commemoration of living and departed loved ones, godchildren, and ancestors before the holy icons.'}
              </p>
            </div>

            {/* View Mode Switcher: Prayer vs Manage Mode */}
            <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-orthodox-gold/30 self-start sm:self-auto">
              <button
                onClick={() => setActiveView('prayer')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeView === 'prayer'
                    ? 'bg-orthodox-gold text-orthodox-navy shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{locale === 'ja' ? '祈祷' : locale === 'ru' ? 'Молитва' : 'Prayer'}</span>
              </button>
              <button
                onClick={() => setActiveView('manage')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeView === 'manage'
                    ? 'bg-orthodox-gold text-orthodox-navy shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{locale === 'ja' ? '名簿の編集' : locale === 'ru' ? 'Редактировать' : 'Manage'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Mode Header Switcher */}
      {embeddedMode && (
        <div className="flex items-center justify-between bg-amber-50/80 dark:bg-slate-800/80 p-2 rounded-xl border border-orthodox-gold/30">
          <div className="flex items-center space-x-2">
            <span className="text-base">📜</span>
            <span className="font-serif font-bold text-xs sm:text-sm text-orthodox-navy dark:text-orthodox-gold-light">
              {locale === 'ja' ? 'あなたの個人記憶帳' : locale === 'ru' ? 'Ваш личный помянник' : 'Your Personal Diptychs'}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setActiveView('prayer')}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold ${
                activeView === 'prayer'
                  ? 'bg-orthodox-gold text-orthodox-navy shadow-sm'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {locale === 'ja' ? '祈祷表示' : locale === 'ru' ? 'Молитва' : 'Read'}
            </button>
            <button
              onClick={() => setActiveView('manage')}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold ${
                activeView === 'manage'
                  ? 'bg-orthodox-gold text-orthodox-navy shadow-sm'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {locale === 'ja' ? '編集' : locale === 'ru' ? 'Править' : 'Edit'}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 1. PRAYER MODE (EASY LEGIBLE CHANTING BEFORE ICONS)       */}
      {/* ========================================================= */}
      {activeView === 'prayer' && (
        <div className="space-y-5">
          {/* A. FOR THE LIVING (生者の記憶) */}
          <div className="bg-amber-50/40 dark:bg-slate-900/90 border-2 border-amber-300/60 dark:border-amber-900/60 rounded-2xl p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-amber-200/60 dark:border-amber-900/60 pb-3 mb-4">
              <div className="flex items-center space-x-2.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                </span>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-amber-950 dark:text-amber-200">
                    {locale === 'ja'
                      ? '生者の記憶（健康と救い）'
                      : locale === 'ru'
                      ? 'О здравии и спасении живущих'
                      : 'For the Health & Salvation of the Living'}
                  </h3>
                  <p className="text-xs text-amber-800/80 dark:text-amber-400">
                    {livingList.length} {locale === 'ja' ? '名の信徒・親族' : locale === 'ru' ? 'имен' : 'names'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleOpenAdd('living')}
                className="flex items-center space-x-1 text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-200/60 dark:bg-amber-900/50 hover:bg-amber-200 px-2.5 py-1.5 rounded-xl transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{locale === 'ja' ? '生者を追加' : locale === 'ru' ? 'Добавить' : 'Add'}</span>
              </button>
            </div>

            {/* Liturgical Rubric / Prayer Invocations */}
            <div className="bg-white/80 dark:bg-slate-800/80 p-3 sm:p-4 rounded-xl border border-amber-200/50 dark:border-amber-900/40 mb-4">
              <p className="font-serif italic text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {locale === 'ja'
                  ? '「慈愛深き主イイスス・ハリストスよ、我が霊父、父母、親族、代子、恩人、病気・艱難にある僕らの健康と救いを記憶し、その霊と肉体に豊かな恩寵を垂れ給え。」'
                  : locale === 'ru'
                  ? '«Спаси, Господи, и помилуй отца моего духовнаго, родителей, сродников, крестников, благодетелей и всех православных христиан; подаждь им здравие, мир и душевное спасение.»'
                  : '“Remember, O Lord Jesus Christ, our spiritual father, parents, relatives, godchildren, benefactors, and all those in sickness or sorrow; visit, strengthen, and grant them health, peace, and salvation.”'}
              </p>
            </div>

            {/* Legible Grid / List of Names */}
            {livingList.length === 0 ? (
              <div className="text-center py-6 text-slate-400 dark:text-slate-500 text-xs sm:text-sm">
                <p>{locale === 'ja' ? '登録された生者の名前はまだありません。' : locale === 'ru' ? 'Список о здравии пуст.' : 'No living names added yet.'}</p>
                <button
                  onClick={() => handleOpenAdd('living')}
                  className="mt-2 text-xs font-bold text-orthodox-gold underline"
                >
                  {locale === 'ja' ? '最初の名前を追加する' : locale === 'ru' ? 'Добавить первое имя' : 'Add your first name'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {livingList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleOpenEdit(item)}
                    className="group cursor-pointer bg-white dark:bg-slate-800 hover:bg-amber-50/60 dark:hover:bg-slate-750 p-3 rounded-xl border border-amber-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-600/70 shadow-sm flex items-start justify-between space-x-2 transition-all"
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center space-x-1.5 flex-wrap">
                        <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                          {item.name}
                        </span>
                        {item.baptismalName && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-300/40">
                            ☦ {item.baptismalName}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                        {item.relation && (
                          <span className="bg-slate-100 dark:bg-slate-700/60 px-1.5 py-0.5 rounded text-[11px] font-medium text-slate-600 dark:text-slate-300">
                            {item.relation}
                          </span>
                        )}
                        {item.notes && (
                          <span className="italic text-amber-700 dark:text-amber-300 text-[11px]">
                            • {item.notes}
                          </span>
                        )}
                        {item.isFromFamily && (
                          <span className="text-[10px] text-orthodox-gold-dark dark:text-orthodox-gold font-bold">
                            ★ {locale === 'ja' ? '名日登録' : locale === 'ru' ? 'святцы' : 'name day'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons (Edit & Delete) */}
                    <div className="flex items-center space-x-0.5 flex-shrink-0 opacity-80 sm:opacity-40 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEdit(item);
                        }}
                        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-amber-100/70 dark:hover:bg-slate-700 transition-colors"
                        title={locale === 'ja' ? '編集' : locale === 'ru' ? 'Редактировать' : 'Edit'}
                        aria-label="Edit name"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConfirmDelete(item);
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title={locale === 'ja' ? '削除' : locale === 'ru' ? 'Удалить' : 'Delete'}
                        aria-label="Delete name"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* B. FOR THE DEPARTED (永眠者の記憶) */}
          <div className="bg-indigo-50/40 dark:bg-slate-900/90 border-2 border-indigo-200/70 dark:border-indigo-950/70 rounded-2xl p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-indigo-200/60 dark:border-indigo-950/70 pb-3 mb-4">
              <div className="flex items-center space-x-2.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 font-serif font-bold text-sm">
                  ☦
                </span>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-indigo-950 dark:text-indigo-200">
                    {locale === 'ja'
                      ? '永眠者の記憶（永遠の記憶・安息）'
                      : locale === 'ru'
                      ? 'О упокоении усопших (Вечная память)'
                      : 'For the Repose of the Departed'}
                  </h3>
                  <p className="text-xs text-indigo-800/80 dark:text-indigo-400">
                    {departedList.length} {locale === 'ja' ? '名の永眠者' : locale === 'ru' ? 'имен' : 'names'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleOpenAdd('departed')}
                className="flex items-center space-x-1 text-xs font-bold text-indigo-950 dark:text-indigo-200 bg-indigo-200/60 dark:bg-indigo-900/50 hover:bg-indigo-200 px-2.5 py-1.5 rounded-xl transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{locale === 'ja' ? '永眠者を追加' : locale === 'ru' ? 'Добавить' : 'Add'}</span>
              </button>
            </div>

            {/* Liturgical Rubric / Invocations */}
            <div className="bg-white/80 dark:bg-slate-800/80 p-3 sm:p-4 rounded-xl border border-indigo-200/50 dark:border-indigo-950/40 mb-4">
              <p className="font-serif italic text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {locale === 'ja'
                  ? '「主よ、復活と永遠の生命を望みて眠りにつける我が祖父母、父母、親族、恩人、正教の信徒らの霊を記憶し、自らと自らならずして犯せし総ての罪を赦し、永遠の記憶を与え給え。永遠の記憶！」'
                  : locale === 'ru'
                  ? '«Упокой, Господи, души усопших раб Твоих: праотцев, отец и братий наших, сродников и всех православных христиан; и прости им вся согрешения вольная и невольная, и сотвори им вечную память!»'
                  : '“Remember, O Lord, the souls of Thy departed servants: our grandparents, parents, brethren, and all Orthodox Christians fallen asleep in the hope of the resurrection; forgive them every transgression and grant them eternal memory! Memory Eternal!”'}
              </p>
            </div>

            {/* List of Departed */}
            {departedList.length === 0 ? (
              <div className="text-center py-6 text-slate-400 dark:text-slate-500 text-xs sm:text-sm">
                <p>{locale === 'ja' ? '登録された永眠者の名前はまだありません。' : locale === 'ru' ? 'Список о упокоении пуст.' : 'No departed names added yet.'}</p>
                <button
                  onClick={() => handleOpenAdd('departed')}
                  className="mt-2 text-xs font-bold text-orthodox-gold underline"
                >
                  {locale === 'ja' ? '永眠者・先祖の名前を追加する' : locale === 'ru' ? 'Добавить первое имя' : 'Add departed loved ones'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {departedList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleOpenEdit(item)}
                    className="group cursor-pointer bg-white dark:bg-slate-800 hover:bg-indigo-50/60 dark:hover:bg-slate-750 p-3 rounded-xl border border-indigo-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600/70 shadow-sm flex items-start justify-between space-x-2 transition-all"
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center space-x-1.5 flex-wrap">
                        <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                          {item.name}
                        </span>
                        {item.baptismalName && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-200 border border-indigo-200/40">
                            ☦ {item.baptismalName}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                        {item.relation && (
                          <span className="bg-slate-100 dark:bg-slate-700/60 px-1.5 py-0.5 rounded text-[11px] font-medium text-slate-600 dark:text-slate-300">
                            {item.relation}
                          </span>
                        )}
                        {item.notes && (
                          <span className="italic text-indigo-700 dark:text-indigo-300 text-[11px]">
                            • {item.notes}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons (Edit & Delete) */}
                    <div className="flex items-center space-x-0.5 flex-shrink-0 opacity-80 sm:opacity-40 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEdit(item);
                        }}
                        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-indigo-100/70 dark:hover:bg-slate-700 transition-colors"
                        title={locale === 'ja' ? '編集' : locale === 'ru' ? 'Редактировать' : 'Edit'}
                        aria-label="Edit name"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConfirmDelete(item);
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title={locale === 'ja' ? '削除' : locale === 'ru' ? 'Удалить' : 'Delete'}
                        aria-label="Delete name"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. MANAGE MODE (ADD, EDIT, DELETE NAMES)                  */}
      {/* ========================================================= */}
      {activeView === 'manage' && (
        <div className="space-y-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Filter buttons */}
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setManageFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  manageFilter === 'all'
                    ? 'bg-white dark:bg-slate-700 text-orthodox-navy dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {locale === 'ja' ? '全員' : locale === 'ru' ? 'Все' : 'All'} ({prayerList.length})
              </button>
              <button
                onClick={() => setManageFilter('living')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  manageFilter === 'living'
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                🕯️ {locale === 'ja' ? '生者' : locale === 'ru' ? 'Живые' : 'Living'} ({livingList.length})
              </button>
              <button
                onClick={() => setManageFilter('departed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  manageFilter === 'departed'
                    ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                ☦️ {locale === 'ja' ? '永眠者' : locale === 'ru' ? 'Усопшие' : 'Departed'} ({departedList.length})
              </button>
            </div>

            {/* Actions: Search & Add */}
            <div className="flex items-center space-x-2">
              <div className="relative flex-1 sm:w-48">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={locale === 'ja' ? '名前を検索...' : locale === 'ru' ? 'Поиск...' : 'Search names...'}
                  className="w-full pl-7 pr-6 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                onClick={() => handleOpenAdd('living')}
                className="flex items-center space-x-1.5 bg-orthodox-gold hover:bg-orthodox-gold-dark text-orthodox-navy px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>{locale === 'ja' ? '名前を追加' : locale === 'ru' ? 'Добавить' : 'Add Name'}</span>
              </button>
            </div>
          </div>

          {/* List of items with edit & delete */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredManageList.length === 0 ? (
              <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-xs sm:text-sm">
                {locale === 'ja' ? '一致する名前は見つかりませんでした。' : locale === 'ru' ? 'Имена не найдены.' : 'No names found.'}
              </div>
            ) : (
              filteredManageList.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between space-x-3">
                  <div className="flex items-start space-x-2.5">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 ${
                        item.type === 'living'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                          : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-serif'
                      }`}
                    >
                      {item.type === 'living' ? '🕯️' : '☦'}
                    </span>
                    <div>
                      <div className="flex items-center space-x-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {item.name}
                        </span>
                        {item.baptismalName && (
                          <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                            ☦ {item.baptismalName}
                          </span>
                        )}
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                            item.type === 'living'
                              ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                              : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300'
                          }`}
                        >
                          {item.type === 'living'
                            ? locale === 'ja'
                              ? '生者'
                              : locale === 'ru'
                              ? 'Живой'
                              : 'Living'
                            : locale === 'ja'
                            ? '永眠者'
                            : locale === 'ru'
                            ? 'Усопший'
                            : 'Departed'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex-wrap">
                        {item.relation && <span>{item.relation}</span>}
                        {item.notes && <span className="italic">• {item.notes}</span>}
                        {item.isFromFamily && (
                          <span className="text-[10px] text-orthodox-gold font-bold">
                            ★ {locale === 'ja' ? '名日連動' : locale === 'ru' ? 'синхр. святцы' : 'synced from name days'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                      title={locale === 'ja' ? '編集' : 'Edit'}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleConfirmDelete(item)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all"
                      title={locale === 'ja' ? '削除' : 'Delete'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. ADD / EDIT MODAL                                       */}
      {/* ========================================================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-slate-900 border border-orthodox-gold/40 rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-serif font-bold text-base sm:text-lg text-orthodox-navy dark:text-orthodox-gold-light">
                {editingItem
                  ? locale === 'ja'
                    ? '祈祷名の編集'
                    : locale === 'ru'
                    ? 'Редактировать поминовение'
                    : 'Edit Prayer Entry'
                  : locale === 'ja'
                  ? '記憶帳に新しい名前を追加'
                  : locale === 'ru'
                  ? 'Добавить имя в помянник'
                  : 'Add Name to Prayer List'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              {/* Type Switcher: Living vs Departed */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {locale === 'ja' ? '祈祷区分' : locale === 'ru' ? 'Раздел помянника' : 'Category'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormType('living')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                      formType === 'living'
                        ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-400 text-amber-900 dark:text-amber-200 shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span>🕯️</span>
                    <span>{locale === 'ja' ? '生者（健康と救い）' : locale === 'ru' ? 'О здравии (живые)' : 'For the Living'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType('departed')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                      formType === 'departed'
                        ? 'bg-indigo-100 dark:bg-indigo-950/80 border-indigo-400 text-indigo-900 dark:text-indigo-200 shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span>☦️</span>
                    <span>{locale === 'ja' ? '永眠者（安息と記憶）' : locale === 'ru' ? 'О упокоении (усопшие)' : 'For the Departed'}</span>
                  </button>
                </div>
              </div>

              {/* Birth Name / Civil Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {locale === 'ja' ? '氏名・本名（俗名）*' : locale === 'ru' ? 'Мирское имя (имя при рождении)*' : 'Birth / Civil Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder={locale === 'ja' ? '例: 太郎, Alexander, Maria' : 'e.g. Taro, Alexander, Elena'}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-orthodox-gold"
                />
              </div>

              {/* Patron Saint / Baptismal Name */}
              <div className="relative">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {locale === 'ja' ? '受洗名・保護聖人（聖名）' : locale === 'ru' ? 'Имя в крещении / Святой покровитель' : 'Baptismal / Patron Saint’s Name'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formBaptismalName}
                    onChange={(e) => {
                      setFormBaptismalName(e.target.value);
                      setSaintSearch(e.target.value);
                      setShowSaintSuggestions(true);
                    }}
                    onFocus={() => setShowSaintSuggestions(true)}
                    placeholder={locale === 'ja' ? '例: 聖ニコライ, St. Nicholas, イオアン' : 'e.g. St. Nicholas, Ioann, Anastasia'}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-orthodox-gold"
                  />
                  {formBaptismalName && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormBaptismalName('');
                        setSaintSearch('');
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Autocomplete suggestions from 312 Saints */}
                {showSaintSuggestions && saintSuggestions.length > 0 && (
                  <div className="absolute z-20 left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-orthodox-gold/40 rounded-xl shadow-lg overflow-hidden divide-y divide-slate-100 dark:divide-slate-700">
                    {saintSuggestions.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setFormBaptismalName(s.name[locale]);
                          setFormSelectedSaintId(s.id);
                          setShowSaintSuggestions(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-amber-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            {s.name[locale]}
                          </span>
                          <span className="text-[11px] text-slate-400 ml-1.5">
                            ({s.name.en} / {s.name.ru})
                          </span>
                        </div>
                        <span className="text-[10px] text-orthodox-gold font-medium">
                          {s.feastDateCivil}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Relation (Quick chips) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {locale === 'ja' ? '間柄・関係（任意）' : locale === 'ru' ? 'Кем приходится (степень родства)' : 'Relation (Optional)'}
                </label>
                <input
                  type="text"
                  value={formRelation}
                  onChange={(e) => setFormRelation(e.target.value)}
                  placeholder={locale === 'ja' ? '例: 代子, 父, 母, 友人...' : 'e.g. Godchild, Father, Mother, Friend...'}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-orthodox-gold"
                />
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {quickRelations.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setFormRelation(r)}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes / Prayer Intentions */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {locale === 'ja' ? '祈願・意図（任意）' : locale === 'ru' ? 'Молитвенное прошение' : 'Prayer Intention (Optional)'}
                </label>
                <input
                  type="text"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder={locale === 'ja' ? '例: 病気平癒, 永遠の安息, 新永眠...' : 'e.g. For healing, newly departed, peace...'}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-orthodox-gold"
                />
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {(formType === 'living' ? quickNotesLiving : quickNotesDeparted).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setFormNotes(n)}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit & Delete Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                {editingItem ? (
                  <button
                    type="button"
                    onClick={() => {
                      const itemToDelete = editingItem;
                      setModalOpen(false);
                      handleConfirmDelete(itemToDelete);
                    }}
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all border border-rose-200 dark:border-rose-900/50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{locale === 'ja' ? 'この名前を削除' : locale === 'ru' ? 'Удалить' : 'Delete Name'}</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    {locale === 'ja' ? 'キャンセル' : locale === 'ru' ? 'Отмена' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-orthodox-gold hover:bg-orthodox-gold-dark text-orthodox-navy shadow-sm transition-all"
                  >
                    {editingItem
                      ? locale === 'ja'
                        ? '変更を保存'
                        : locale === 'ru'
                        ? 'Сохранить'
                        : 'Save Changes'
                      : locale === 'ja'
                      ? '記憶帳に保存'
                      : locale === 'ru'
                      ? 'Записать'
                      : 'Save to Diptychs'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. DELETE CONFIRMATION MODAL                              */}
      {/* ========================================================= */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-900/60 rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-rose-600 dark:text-rose-400">
              <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {locale === 'ja'
                    ? '名前の削除確認'
                    : locale === 'ru'
                    ? 'Удалить из помянника?'
                    : 'Delete from Prayer List?'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {locale === 'ja'
                    ? 'この名前を記憶帳から削除しますか？'
                    : locale === 'ru'
                    ? 'Удалить это имя из списка?'
                    : 'Remove this person from your prayer list?'}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-1.5">
                <span>{deletingItem.name}</span>
                {deletingItem.baptismalName && (
                  <span className="text-xs font-normal text-orthodox-gold">
                    ☦ {deletingItem.baptismalName}
                  </span>
                )}
              </div>
              {deletingItem.relation && (
                <div>
                  <span className="text-slate-400">{locale === 'ja' ? '間柄: ' : locale === 'ru' ? 'Сродство: ' : 'Relation: '}</span>
                  <span>{deletingItem.relation}</span>
                </div>
              )}
              {deletingItem.isFromFamily && (
                <p className="text-[11px] text-amber-700 dark:text-amber-300 font-medium pt-1.5 mt-1 border-t border-slate-200 dark:border-slate-700 leading-relaxed">
                  ⚠️ {locale === 'ja'
                    ? '※この名前は「家族・代子の聖名祝日」にも登録されています。削除すると聖名祝日リストからも連動して削除されます。'
                    : locale === 'ru'
                    ? '※Это имя также привязано к именинам семьи. Удаление удалит его и из списка именин.'
                    : '※This name is linked with your Family Name Days. Deleting it will also remove it from your Name Days list.'}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                {locale === 'ja' ? 'キャンセル' : locale === 'ru' ? 'Отмена' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => {
                  removePrayerItem(deletingItem.id);
                  setDeletingItem(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-all"
              >
                {locale === 'ja' ? '削除する' : locale === 'ru' ? 'Удалить' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
