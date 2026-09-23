import { ParishService, ServiceType } from './types';

export interface ParseResult {
  services: ParishService[];
  errors: string[];
  rawLineCount: number;
}

// Canonical duty groups
export type DutyGroup = 'Rabboni' | "Daria's Kitchen" | 'Church Friends' | 'Choir' | "Women's Association";

export const CANONICAL_DUTY_GROUPS: { id: DutyGroup; ja: string; en: string; ru: string }[] = [
  { id: 'Rabboni', ja: 'ラボニ（Rabboni）', en: 'Rabboni', ru: 'Рабвуни' },
  { id: "Daria's Kitchen", ja: "ダリアの台所（Daria's Kitchen）", en: "Daria's Kitchen", ru: 'Кухня Дарьи' },
  { id: 'Church Friends', ja: '教会フレンズ（Church Friends）', en: 'Church Friends', ru: 'Друзья храма' },
  { id: 'Choir', ja: '聖歌隊（Choir）', en: 'Choir', ru: 'Хор' },
  { id: "Women's Association", ja: '婦人会（Women’s Association）', en: 'Women’s Association', ru: 'Сестричество' },
];

/**
 * Intelligent parser for Japanese Orthodox monthly schedules
 * Accepts pasted text from Father's monthly announcements / PDF documents
 */
export function parseScheduleText(text: string, defaultYear = 2026): ParseResult {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const services: ParishService[] = [];
  const errors: string[] = [];

  // Detect year from text if present (e.g. 2026年 or 2027年)
  let activeYear = defaultYear;
  const yearMatch = text.match(/(\d{4})\s*年/);
  if (yearMatch) {
    activeYear = parseInt(yearMatch[1], 10);
  }

  // Detect default month if present (e.g. 9月 or 10月予定)
  let activeMonth: number | null = null;
  const monthMatch = text.match(/(\d{1,2})\s*月\s*(?:度|分)?\s*予定/);
  if (monthMatch) {
    activeMonth = parseInt(monthMatch[1], 10);
  }

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];

    // Check for standalone month headers like "【9月】" or "10月"
    const standaloneMonth = line.match(/^【?(\d{1,2})月】?$/);
    if (standaloneMonth) {
      activeMonth = parseInt(standaloneMonth[1], 10);
      continue;
    }

    // Match date patterns:
    // e.g. "9月6日(日)", "9/6(日)", "6日(日)", "2026/09/06", "9月6日"
    const dateMatch =
      line.match(/(?:(\d{4})[年\/-])?(\d{1,2})[月\/-](\d{1,2})日?(?:\s*\([日月火水木金土祝]\))?/) ||
      (activeMonth !== null && line.match(/^(\d{1,2})日(?:\s*\([日月火水木金土祝]\))?/));

    if (!dateMatch) {
      continue;
    }

    let year = activeYear;
    let month = activeMonth || 1;
    let day = 1;

    if (dateMatch[1] && dateMatch[2] && dateMatch[3]) {
      // "2026年9月6日"
      year = parseInt(dateMatch[1], 10);
      month = parseInt(dateMatch[2], 10);
      day = parseInt(dateMatch[3], 10);
      activeMonth = month;
    } else if (dateMatch[2] && dateMatch[3]) {
      // "9月6日"
      month = parseInt(dateMatch[2], 10);
      day = parseInt(dateMatch[3], 10);
      activeMonth = month;
    } else if (dateMatch[1] && activeMonth !== null) {
      // "6日" with activeMonth
      day = parseInt(dateMatch[1], 10);
    }

    const pad = (n: number) => String(n).padStart(2, '0');
    const dateString = `${year}-${pad(month)}-${pad(day)}`;

    // Extract time (e.g. "10:00", "17:00", "10時", "17時30分")
    let time = '10:00';
    const timeMatch = line.match(/(\d{1,2})[:：](\d{2})/) || line.match(/(\d{1,2})時(?:(\d{2})分)?/);
    if (timeMatch) {
      const h = parseInt(timeMatch[1], 10);
      const m = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
      time = `${pad(h)}:${pad(m)}`;
    }

    // Determine service type
    let serviceType: ServiceType = 'liturgy';
    if (/徹夜祷|通夜|晩課|徹宵/i.test(line)) {
      serviceType = 'vigil';
      if (!timeMatch) time = '17:00';
    } else if (/聖体礼儀|リツルギヤ|早朝礼儀/i.test(line)) {
      serviceType = 'liturgy';
      if (!timeMatch) time = '10:00';
    } else if (/聖水式|小聖水|大聖水/i.test(line)) {
      serviceType = 'water_blessing';
      if (!timeMatch) time = '11:00';
    } else if (/パニヒダ|追悼|パニヒィダ|記念礼拝/i.test(line)) {
      serviceType = 'panikhida';
      if (!timeMatch) time = '11:30';
    } else if (/モレビアン|感謝祈祷|祈願式/i.test(line)) {
      serviceType = 'moleben';
      if (!timeMatch) time = '11:00';
    } else if (/晩祷/i.test(line)) {
      serviceType = 'vespers';
      if (!timeMatch) time = '17:00';
    }

    // Extract Trapeza / Meal duty (only for Sunday liturgy services)
    let dutyGroup: DutyGroup | undefined = undefined;
    if (/ラボニ|Laboni|Rabboni/i.test(line)) {
      dutyGroup = 'Rabboni';
    } else if (/ダリア|ダリヤ|Daria/i.test(line)) {
      dutyGroup = "Daria's Kitchen";
    } else if (/教会フレンズ|フレンズ|Friends/i.test(line)) {
      dutyGroup = 'Church Friends';
    } else if (/聖歌隊|クワイア|Choir/i.test(line)) {
      dutyGroup = 'Choir';
    } else if (/婦人会|Women/i.test(line)) {
      dutyGroup = "Women's Association";
    }

    // Extract duty members in parentheses or after "担当:"
    let dutyPeople: string[] | undefined = undefined;
    const dutyPeopleMatch = line.match(/(?:愛餐当番|当番|担当)?[:：]?\s*[（\(]([^）\)]+)[）\)]/);
    if (dutyPeopleMatch) {
      dutyPeople = dutyPeopleMatch[1]
        .split(/[,、\/\s]+/)
        .map((s) => s.trim())
        .filter((s) => s && !s.includes('当番') && !s.includes('担当'));
    }

    // Extract special notes (e.g. 聖堂掃除, 役員会, 執事会, ぶどうの成聖, 墓参り)
    let notesJa: string | undefined = undefined;
    let notesEn: string | undefined = undefined;
    let notesRu: string | undefined = undefined;

    const notesList: string[] = [];
    if (/聖堂掃除|大掃除/i.test(line)) notesList.push('聖堂掃除');
    if (/役員会|執事会|役員総会/i.test(line)) notesList.push('執事会');
    if (/婦人会総会|婦人会集会/i.test(line)) notesList.push('婦人会総会');
    if (/ぶどう|果物.*成聖/i.test(line)) notesList.push('ぶどう・果物の成聖式');
    if (/墓参り|納骨堂|墓地/i.test(line)) notesList.push('墓地祈祷');
    if (/誕生祝|バースデー/i.test(line)) notesList.push('誕生祝');
    if (/信徒会|総会/i.test(line) && !notesList.includes('執事会')) notesList.push('信徒総会');

    if (notesList.length > 0) {
      notesJa = notesList.join('、');
      notesEn = notesList
        .map((n) =>
          n === '聖堂掃除'
            ? 'Chapel cleaning'
            : n === '執事会'
            ? 'Board Meeting'
            : n === '婦人会総会'
            ? 'Women’s Association Meeting'
            : n === 'ぶどう・果物の成聖式'
            ? 'Blessing of grapes'
            : n === '墓地祈祷'
            ? 'Graveside prayers'
            : n
        )
        .join(', ');
      notesRu = notesList
        .map((n) =>
          n === '聖堂掃除'
            ? 'Уборка храма'
            : n === '執事会'
            ? 'Заседание совета'
            : n === '婦人会総会'
            ? 'Собрание сестричества'
            : n === 'ぶどう・果物の成聖式'
            ? 'Освящение плодов'
            : n
        )
        .join(', ');
    }

    // Generate Titles (Trilingual)
    // Extract title text from line
    let customTitle = line
      .replace(/(?:(\d{4})[年\/-])?(\d{1,2})[月\/-](\d{1,2})日?(?:\s*\([日月火水木金土祝]\))?/, '')
      .replace(/(\d{1,2})[:：](\d{2})|(\d{1,2})時(?:(\d{2})分)?/, '')
      .replace(/愛餐当番[:：]?\s*[^\s,、\(\)]+/g, '')
      .replace(/[（\(][^）\)]+[）\)]/g, '')
      .trim();

    let titleJa = '';
    let titleEn = '';
    let titleRu = '';

    if (serviceType === 'liturgy') {
      titleJa = customTitle || '主日聖体礼儀';
      titleEn = 'Divine Liturgy';
      titleRu = 'Божественная Литургия';
    } else if (serviceType === 'vigil') {
      titleJa = customTitle || '主日前夕 徹夜祷';
      titleEn = 'All-Night Vigil';
      titleRu = 'Всенощное бдение';
    } else if (serviceType === 'water_blessing') {
      titleJa = customTitle || '小聖水式';
      titleEn = 'Lesser Blessing of Water';
      titleRu = 'Малое водоосвящение';
    } else if (serviceType === 'panikhida') {
      titleJa = customTitle || 'パニヒダ（永眠者記憶祈祷）';
      titleEn = 'Memorial Service (Panikhida)';
      titleRu = 'Панихида';
    } else if (serviceType === 'moleben') {
      titleJa = customTitle || 'モレビアン（感謝祈願式）';
      titleEn = 'Supplication Service (Moleben)';
      titleRu = 'Молебен';
    } else {
      titleJa = customTitle || '晩祷';
      titleEn = 'Vespers';
      titleRu = 'Вечерня';
    }

    // Ensure id uniqueness
    const id = `s-${dateString}-${time.replace(':', '')}-${serviceType}`;

    const newService: ParishService = {
      id,
      date: dateString,
      time,
      serviceType,
      title: {
        ja: titleJa,
        en: titleEn,
        ru: titleRu,
      },
      ...(dutyGroup ? { dutyGroup } : {}),
      ...(dutyPeople && dutyPeople.length > 0 ? { dutyPeople } : {}),
      ...(notesJa ? { notes: { ja: notesJa, en: notesEn || notesJa, ru: notesRu || notesJa } } : {}),
    };

    services.push(newService);
  }

  return {
    services,
    errors,
    rawLineCount: lines.length,
  };
}
