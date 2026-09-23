export type Locale = 'ja' | 'en' | 'ru';

export interface TrilingualText {
  ja: string;
  en: string;
  ru: string;
}

export type FastingLevel =
  | 'no_fast'     // 🟢 斎なし / No Fast / Без поста
  | 'dairy'       // 🧀 乾酪（肉なし） / Dairy permitted / Сырная седмица
  | 'fish'        // 🐟 魚酒油可 / Fish, wine, oil / Рыба, вино, елей
  | 'wine_oil'    // 🟡 🫒 酒油可 / Wine & oil / Вино и елей
  | 'oil_only'    // 🟠 🍳 油可 / Oil allowed / Горячая с маслом
  | 'strict'      // 🟣 🍞 厳斎 / Strict fast (Xerophagy) / Сухоядение
  | 'total';      // ⚫ ✕ 完全断食 / Total fast / Полный пост

export type FastingPeriod =
  | 'none'
  | 'great_lent'      // 大斎 / Great Lent / Великий пост
  | 'holy_week'       // 受難週 / Passion Week / Страстная седмица
  | 'apostles_fast'   // 聖使徒の斎 / Apostles' Fast / Петров пост
  | 'dormition_fast'  // 就寝祭斎 / Dormition Fast / Успенский пост
  | 'nativity_fast';  // フィリップの斎 / Nativity Fast / Рождественский пост

export interface FastingInfo {
  level: FastingLevel;
  period: FastingPeriod;
  icon: string;
  badgeText: TrilingualText;
  periodName?: TrilingualText;
  explanation: TrilingualText;
}

export interface ScriptureReading {
  source: 'Epistle' | 'Gospel' | 'OldTestament';
  book: TrilingualText;
  reference: string;
  pericopeTan?: number; // 端 (Tan / Зачало)
  text: TrilingualText;
}

export interface SaintCommemoration {
  name: TrilingualText;
  title?: TrilingualText;
  bio?: TrilingualText;
  isPatronSaint?: boolean;
}

export interface FeastDay {
  title: TrilingualText;
  rank: 'great' | 'polyeleos' | 'minor'; // 大祭, 中祭, 小祭
  isMovable: boolean;
}

export interface ParishService {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "17:00", "10:00"
  serviceType: 'vigil' | 'liturgy' | 'vespers' | 'panikhida' | 'water_blessing' | 'compline' | 'presanctified' | 'matins' | 'special';
  title: TrilingualText;
  tone?: string;
  dutyGroup?: string; // e.g. "Rabboni", "Daria's Kitchen", "Women's Club", "Church Friends", "Choir"
  dutyPeople?: string[];
  notes?: TrilingualText;
  isTransferred?: boolean;
  location?: string;
}

export interface BulletinAnnouncement {
  id: string;
  date?: string;
  title: TrilingualText;
  category: 'event' | 'meeting' | 'sunday_school' | 'notice';
  content: TrilingualText;
  important?: boolean;
}

export interface NameDayEntry {
  id: string;
  name: TrilingualText;
  saint: TrilingualText;
  feastDateCivil: string; // MM-DD
  feastDateJulian: string; // MM-DD
  aliases?: string[];
  isCustom?: boolean;
}

export interface NotificationPreferences {
  dailyReadingsEnabled: boolean;
  dailyReadingsTime: string; // e.g. "08:00"
  nameDaysEnabled: boolean;
  nameDaysTime: string; // e.g. "08:00"
}

export interface PrayerListItem {
  id: string;
  type: 'living' | 'departed'; // 生者 (Living) vs 永眠者 (Departed)
  name: string; // Birth name / secular name (e.g. "Taro", "Alexander", "Elena")
  baptismalName?: string; // Patron saint / baptismal name (e.g. "St. Nicholas", "St. Anastasia")
  saintId?: string; // Optional reference to NameDayEntry
  relation?: string; // e.g. "Godchild / 代子", "Father / 父", "Mother / 母", "Friend / 友人"
  notes?: string; // e.g. "for health / 病気平癒", "newly departed / 新永眠"
  isFromFamily?: boolean; // true if auto-synced from Name Days family/godchildren
  familyMemberId?: string; // ID of linked FamilyMember
  createdAt?: string;
}

export interface DayInfo {
  civilDate: Date;
  dateString: string; // YYYY-MM-DD
  julianDateString: string; // e.g. "9月10日" / "Sept 10 (OS)" / "10 сентября (ст.ст.)"
  tone: number; // 1 to 8, 0 if none
  sundayTitle?: TrilingualText;
  feasts: FeastDay[];
  saints: SaintCommemoration[];
  fasting: FastingInfo;
  readings: ScriptureReading[];
  parishServices: ParishService[];
  daysToPascha?: number;
}

