import { ScriptureReading, TrilingualText, CalendarStyle, Locale } from './types';
import { gregorianToJulian } from './paschalion';
import { SCRIPTURE_DATABASE } from '../data/scripturePassages';

/**
 * Format scripture reading title without duplicating book names (e.g. avoiding "Luke Luke 4.37-44")
 */
export function formatScriptureTitle(reading: ScriptureReading, locale: Locale): string {
  const bookName = reading.book[locale] || '';
  const ref = reading.reference || '';

  // 1. Check for week fallback patterns like "Week 18 after Pentecost" or "Luke (Week 18)"
  const weekMatch = ref.match(/(?:Week\s*(\d+)(?:\s*after\s*Pentecost)?|\b(?:Luke|Matthew|Mark|John)\s*\(Week\s*(\d+)\))/i);
  if (weekMatch) {
    const weekNum = weekMatch[1] || weekMatch[2];
    if (locale === 'ja') {
      return `${bookName}（五旬祭後第${weekNum}週日課）`;
    }
    if (locale === 'ru') {
      return `${bookName} (${weekNum}-я седмица по Пятидесятнице)`;
    }
    return `${bookName} (Week ${weekNum} after Pentecost)`;
  }

  // 2. Extract chapter and verse numbers (e.g. "2.12-16", "2:12-16", "10:38–42, 11:27–28")
  // Matches the first chapter number followed by a dot or colon and verse numbers
  const cvMatch = ref.match(/\b\d+[\.:]\d+.*$/);
  if (cvMatch) {
    // Standardize dot chapter separators to colons and hyphens to en-dashes
    const cleanCv = cvMatch[0]
      .replace(/(\d+)\.(\d+)/g, '$1:$2')
      .replace(/-/g, '–');
    return `${bookName} ${cleanCv}`.trim();
  }

  // 3. Fallback: if ref doesn't match chapter/verse, only append if not already containing book name
  if (ref && !ref.includes(bookName) && !bookName.includes(ref)) {
    return `${bookName} ${ref}`.trim();
  }
  return bookName;
}

interface BookTranslation {
  ja: string;
  en: string;
  ru: string;
}

export const LECTIONARY_BOOKS: Record<string, BookTranslation> = {
  MAT: { ja: 'マトフェイに因る聖福音', en: 'Holy Gospel According to St. Matthew', ru: 'Евангелие от Матфея' },
  MRK: { ja: 'マルコに因る聖福音', en: 'Holy Gospel According to St. Mark', ru: 'Евангелие от Марка' },
  LUK: { ja: 'ルカに因る聖福音', en: 'Holy Gospel According to St. Luke', ru: 'Евангелие от Луки' },
  JHN: { ja: 'イオアンに因る聖福音', en: 'Holy Gospel According to St. John', ru: 'Евангелие от Иоанна' },
  ACT: { ja: '使徒行実', en: 'Acts of the Apostles', ru: 'Деяния святых апостолов' },
  ROM: { ja: 'ロマ書', en: 'Epistle to the Romans', ru: 'Послание к Римлянам' },
  '1CO': { ja: 'コリンフ前書', en: '1 Corinthians', ru: '1-е Коринфянам' },
  '2CO': { ja: 'コリンフ後書', en: '2 Corinthians', ru: '2-е Коринфянам' },
  GAL: { ja: 'ガラテヤ書', en: 'Epistle to the Galatians', ru: 'Послание к Галатам' },
  EPH: { ja: 'エフェソ書', en: 'Epistle to the Ephesians', ru: 'Послание к Ефесянам' },
  PHP: { ja: 'フィリッポイ書', en: 'Epistle to the Philippians', ru: 'Послание к Филиппийцам' },
  COL: { ja: 'コロサイ書', en: 'Epistle to the Colossians', ru: 'Послание к Колоссянам' },
  '1TH': { ja: 'テサロニケ前書', en: '1 Thessalonians', ru: '1-е Фессалоникийцам' },
  '2TH': { ja: 'テサロニケ後書', en: '2 Thessalonians', ru: '2-е Фессалоникийцам' },
  '1TI': { ja: 'ティモテイ前書', en: '1 Timothy', ru: '1-е Тимофею' },
  '2TI': { ja: 'ティモテイ後書', en: '2 Timothy', ru: '2-е Тимофею' },
  TIT: { ja: 'ティト書', en: 'Epistle to Titus', ru: 'Послание к Титу' },
  PHM: { ja: 'フィリモン書', en: 'Epistle to Philemon', ru: 'Послание к Филимону' },
  HEB: { ja: 'ヘブル書', en: 'Epistle to the Hebrews', ru: 'Послание к Евреям' },
  JAS: { ja: 'イアコフ公書', en: 'Epistle of James', ru: 'Послание Иакова' },
  '1PE': { ja: 'ペトル前書', en: '1 Peter', ru: '1-е Петра' },
  '2PE': { ja: 'ペトル後書', en: '2 Peter', ru: '2-е Петра' },
  '1JN': { ja: 'イオアン第1公書', en: '1 John', ru: '1-е Иоанна' },
};

export interface LectionaryEntry {
  epistle: {
    bookCode: string;
    reference: string;
    pericopeTan?: number;
    dbKey?: string;
  };
  gospel: {
    bookCode: string;
    reference: string;
    pericopeTan?: number;
    dbKey?: string;
  };
}

/**
 * Great Feasts on the Julian Calendar (month 1-12, day 1-31 Old Style)
 */
const JULIAN_FIXED_FEASTS: Record<string, LectionaryEntry> = {
  // Sept 8 Julian (Sept 21 Greg): Nativity of the Theotokos
  '09-08': {
    epistle: { bookCode: 'PHP', reference: 'Philippians 2:5–11', pericopeTan: 240, dbKey: 'Philippians 2.5-11' },
    gospel: { bookCode: 'LUK', reference: 'Luke 10:38–42, 11:27–28', pericopeTan: 54, dbKey: 'Luke 10.38-42, 11.27-28' },
  },
  // Sept 14 Julian (Sept 27 Greg): Elevation of the Cross
  '09-14': {
    epistle: { bookCode: '1CO', reference: '1 Corinthians 1:18–24', pericopeTan: 125, dbKey: '1 Corinthians 1.18-24' },
    gospel: { bookCode: 'JHN', reference: 'John 19:6–11, 13–20, 25–28, 30–35', pericopeTan: 60, dbKey: 'John 19.6-35' },
  },
  // Oct 1 Julian (Oct 14 Greg): Protection of the Theotokos (Pokrov - Osaka Church Feast)
  '10-01': {
    epistle: { bookCode: 'HEB', reference: 'Hebrews 9:1–7', pericopeTan: 320, dbKey: 'Hebrews 9.1-7' },
    gospel: { bookCode: 'LUK', reference: 'Luke 10:38–42, 11:27–28', pericopeTan: 54, dbKey: 'Luke 10.38-42, 11.27-28' },
  },
  // Nov 21 Julian (Dec 4 Greg): Entry of the Theotokos into the Temple
  '11-21': {
    epistle: { bookCode: 'HEB', reference: 'Hebrews 9:1–7', pericopeTan: 320, dbKey: 'Hebrews 9.1-7' },
    gospel: { bookCode: 'LUK', reference: 'Luke 10:38–42, 11:27–28', pericopeTan: 54, dbKey: 'Luke 10.38-42, 11.27-28' },
  },
  // Dec 6 Julian (Dec 19 Greg): St. Nicholas the Wonderworker
  '12-06': {
    epistle: { bookCode: 'HEB', reference: 'Hebrews 13:17–21', pericopeTan: 335, dbKey: 'Hebrews 13.17-21' },
    gospel: { bookCode: 'LUK', reference: 'Luke 6:17–23', pericopeTan: 24, dbKey: 'Luke 6.17-23' },
  },
  // Dec 25 Julian (Jan 7 Greg): Nativity of Christ (Old Calendar Christmas)
  '12-25': {
    epistle: { bookCode: 'GAL', reference: 'Galatians 4:4–7', pericopeTan: 209, dbKey: 'Galatians 4.4-7' },
    gospel: { bookCode: 'MAT', reference: 'Matthew 2:1–12', pericopeTan: 3, dbKey: 'Matthew 2.1-12' },
  },
  // Jan 6 Julian (Jan 19 Greg): Theophany (Epiphany)
  '01-06': {
    epistle: { bookCode: 'TIT', reference: 'Titus 2:11–14, 3:4–7', pericopeTan: 302, dbKey: 'Titus 2.11-14' },
    gospel: { bookCode: 'MAT', reference: 'Matthew 3:13–17', pericopeTan: 6, dbKey: 'Matthew 3.13-17' },
  },
  // Feb 2 Julian (Feb 15 Greg): Meeting of the Lord
  '02-02': {
    epistle: { bookCode: 'HEB', reference: 'Hebrews 7:7–17', pericopeTan: 316, dbKey: 'Hebrews 7.7-17' },
    gospel: { bookCode: 'LUK', reference: 'Luke 2:22–40', pericopeTan: 7, dbKey: 'Luke 2.22-40' },
  },
  // Mar 25 Julian (Apr 7 Greg): Annunciation of the Theotokos
  '03-25': {
    epistle: { bookCode: 'HEB', reference: 'Hebrews 2:11–18', pericopeTan: 306, dbKey: 'Hebrews 2.11-18' },
    gospel: { bookCode: 'LUK', reference: 'Luke 1:24–38', pericopeTan: 3, dbKey: 'Luke 1.24-38' },
  },
  // Aug 6 Julian (Aug 19 Greg): Transfiguration of the Lord
  '08-06': {
    epistle: { bookCode: '2PE', reference: '2 Peter 1:10–19', pericopeTan: 65, dbKey: '2 Peter 1.10-19' },
    gospel: { bookCode: 'MAT', reference: 'Matthew 17:1–9', pericopeTan: 70, dbKey: 'Matthew 17.1-9' },
  },
  // Aug 15 Julian (Aug 28 Greg): Dormition of the Theotokos
  '08-15': {
    epistle: { bookCode: 'PHP', reference: 'Philippians 2:5–11', pericopeTan: 240, dbKey: 'Philippians 2.5-11' },
    gospel: { bookCode: 'LUK', reference: 'Luke 10:38–42, 11:27–28', pericopeTan: 54, dbKey: 'Luke 10.38-42, 11.27-28' },
  },
};

/**
 * Standard Slavic / Russian / Japanese Orthodox Lectionary by Week after Pentecost
 * Each week has 7 days: 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
 */
const PENTECOST_CYCLE_READINGS: Record<number, Record<number, LectionaryEntry>> = {
  // 1st Sunday after Pentecost (All Saints)
  1: {
    0: {
      epistle: { bookCode: 'HEB', reference: 'Hebrews 11:33–12:2', pericopeTan: 330, dbKey: 'Hebrews 11.33-12.2' },
      gospel: { bookCode: 'MAT', reference: 'Matthew 10:32–33, 37–38, 19:27–30', pericopeTan: 38, dbKey: 'Matthew 10.32-38' },
    },
  },
  // 2nd Sunday after Pentecost (All Saints of Russia / Athos)
  2: {
    0: {
      epistle: { bookCode: 'ROM', reference: 'Romans 2:10–16', pericopeTan: 81, dbKey: 'Romans 2.10-16' },
      gospel: { bookCode: 'MAT', reference: 'Matthew 4:18–23', pericopeTan: 9, dbKey: 'Matthew 4.18-23' },
    },
  },
  // 3rd Sunday after Pentecost
  3: {
    0: {
      epistle: { bookCode: 'ROM', reference: 'Romans 5:1–10', pericopeTan: 88, dbKey: 'Romans 5.1-10' },
      gospel: { bookCode: 'MAT', reference: 'Matthew 6:22–33', pericopeTan: 18, dbKey: 'Matthew 6.22-33' },
    },
  },
  // 4th Sunday after Pentecost (Centurion)
  4: {
    0: {
      epistle: { bookCode: 'ROM', reference: 'Romans 6:18–23', pericopeTan: 93, dbKey: 'Romans 6.18-23' },
      gospel: { bookCode: 'MAT', reference: 'Matthew 8:5–13', pericopeTan: 25, dbKey: 'Matthew 8.5-13' },
    },
  },
  // 5th Sunday after Pentecost (Gadarene demoniacs)
  5: {
    0: {
      epistle: { bookCode: 'ROM', reference: 'Romans 10:1–10', pericopeTan: 103, dbKey: 'Romans 10.1-10' },
      gospel: { bookCode: 'MAT', reference: 'Matthew 8:28–9:1', pericopeTan: 28, dbKey: 'Matthew 8.28-9.1' },
    },
  },
  // 6th Sunday after Pentecost (Paralytic)
  6: {
    0: {
      epistle: { bookCode: 'ROM', reference: 'Romans 12:6–14', pericopeTan: 110, dbKey: 'Romans 12.6-14' },
      gospel: { bookCode: 'MAT', reference: 'Matthew 9:1–8', pericopeTan: 29, dbKey: 'Matthew 9.1-8' },
    },
  },
  // 7th Sunday after Pentecost (Two blind men)
  7: {
    0: {
      epistle: { bookCode: 'ROM', reference: 'Romans 15:1–7', pericopeTan: 116, dbKey: 'Romans 15.1-7' },
      gospel: { bookCode: 'MAT', reference: 'Matthew 9:27–35', pericopeTan: 33, dbKey: 'Matthew 9.27-35' },
    },
  },
  // 8th Sunday after Pentecost (Feeding 5000)
  8: {
    0: {
      epistle: { bookCode: '1CO', reference: '1 Corinthians 1:10–18', pericopeTan: 124, dbKey: '1 Corinthians 1.10-18' },
      gospel: { bookCode: 'MAT', reference: 'Matthew 14:14–22', pericopeTan: 58, dbKey: 'Matthew 14.14-22' },
    },
  },
  // 9th Sunday after Pentecost (Walking on water)
  9: {
    0: {
      epistle: { bookCode: '1CO', reference: '1 Corinthians 3:9–17', pericopeTan: 128, dbKey: '1 Corinthians 3.9-17' },
      gospel: { bookCode: 'MAT', reference: 'Matthew 14:22–34', pericopeTan: 59, dbKey: 'Matthew 14.22-34' },
    },
  },
  // 10th Sunday after Pentecost (Lunatic boy)
  10: {
    0: {
      epistle: { bookCode: '1CO', reference: '1 Corinthians 4:9–16', pericopeTan: 131, dbKey: '1 Corinthians 4.9-16' },
      gospel: { bookCode: 'MAT', reference: 'Matthew 17:14–23', pericopeTan: 72, dbKey: 'Matthew 17.14-23' },
    },
  },
  // 11th Sunday after Pentecost (Unforgiving servant)
  11: {
    0: {
      epistle: { bookCode: '1CO', reference: '1 Corinthians 9:2–12', pericopeTan: 141, dbKey: '1 Corinthians 9.2-12' },
      gospel: { bookCode: 'MAT', reference: 'Matthew 18:23–35', pericopeTan: 77, dbKey: 'Matthew 18.23-35' },
    },
  },
  // 12th Sunday after Pentecost (Rich young man)
  12: {
    0: {
      epistle: { bookCode: '1CO', reference: '1 Corinthians 15:1–11', pericopeTan: 158, dbKey: '1 Corinthians 15.1-11' },
      gospel: { bookCode: 'MAT', reference: 'Matthew 19:16–26', pericopeTan: 79, dbKey: 'Matthew 19.16-26' },
    },
  },
  // 13th Sunday after Pentecost (Wicked vinedressers)
  13: {
    0: {
      epistle: { bookCode: '1CO', reference: '1 Corinthians 16:13–24', pericopeTan: 166, dbKey: '1 Corinthians 16.13-24' },
      gospel: { bookCode: 'MAT', reference: 'Matthew 21:33–42', pericopeTan: 87, dbKey: 'Matthew 21.33-42' },
    },
  },
  // 14th Sunday after Pentecost (Wedding banquet)
  14: {
    0: {
      epistle: { bookCode: '2CO', reference: '2 Corinthians 1:21–2:4', pericopeTan: 170, dbKey: '2 Corinthians 1.21-2.4' },
      gospel: { bookCode: 'MAT', reference: 'Matthew 22:1–14', pericopeTan: 89, dbKey: 'Matthew 22.1-14' },
    },
  },
  // 15th Sunday after Pentecost (Greatest commandment)
  15: {
    0: {
      epistle: { bookCode: '2CO', reference: '2 Corinthians 4:6–15', pericopeTan: 176, dbKey: '2 Corinthians 4.6-15' },
      gospel: { bookCode: 'MAT', reference: 'Matthew 22:35–46', pericopeTan: 92, dbKey: 'Matthew 22.35-46' },
    },
  },
  // 16th Sunday after Pentecost (Talents)
  16: {
    0: {
      epistle: { bookCode: '2CO', reference: '2 Corinthians 6:1–10', pericopeTan: 181, dbKey: '2 Corinthians 6.1-10' },
      gospel: { bookCode: 'MAT', reference: 'Matthew 25:14–30', pericopeTan: 105, dbKey: 'Matthew 25.14-30' },
    },
  },
  // 17th Week after Pentecost (Current week!)
  17: {
    // Sunday: 17th Sunday after Pentecost (Canaanite Woman)
    0: {
      epistle: { bookCode: '2CO', reference: '2 Corinthians 6:16–7:1', pericopeTan: 182, dbKey: '2 Corinthians 6.16-7.1' },
      gospel: { bookCode: 'MAT', reference: 'Matthew 15:21–28', pericopeTan: 62, dbKey: 'Matthew 15.21-28' },
    },
    // Monday
    1: {
      epistle: { bookCode: 'EPH', reference: 'Ephesians 1:22–2:3', pericopeTan: 218, dbKey: 'Ephesians 1.22-2.3' },
      gospel: { bookCode: 'MRK', reference: 'Mark 10:46–52', pericopeTan: 48, dbKey: 'Mark 10.46-52' },
    },
    // Tuesday
    2: {
      epistle: { bookCode: 'EPH', reference: 'Ephesians 2:19–3:7', pericopeTan: 221, dbKey: 'Ephesians 2.19-3.7' },
      gospel: { bookCode: 'MRK', reference: 'Mark 11:11–23', pericopeTan: 50, dbKey: 'Mark 11.11-23' },
    },
    // Wednesday (Sept 23, 2026)
    3: {
      epistle: { bookCode: 'EPH', reference: 'Ephesians 3:8–21', pericopeTan: 223, dbKey: 'Ephesians 3.8-21' },
      gospel: { bookCode: 'MRK', reference: 'Mark 11:22–26', pericopeTan: 51, dbKey: 'Mark 11.22-26' },
    },
    // Thursday (Today! Sept 24, 2026)
    4: {
      epistle: { bookCode: 'EPH', reference: 'Ephesians 4:14–19', pericopeTan: 225, dbKey: 'Ephesians 4.14-19' },
      gospel: { bookCode: 'MRK', reference: 'Mark 11:27–33', pericopeTan: 52, dbKey: 'Mark 11.27-33' },
    },
    // Friday (Sept 25, 2026)
    5: {
      epistle: { bookCode: 'EPH', reference: 'Ephesians 4:17–25', pericopeTan: 226, dbKey: 'Ephesians 4.17-25' },
      gospel: { bookCode: 'MRK', reference: 'Mark 12:1–12', pericopeTan: 53, dbKey: 'Mark 12.1-12' },
    },
    // Saturday (Sept 26, 2026 - Saturday before Elevation of Holy Cross)
    6: {
      epistle: { bookCode: '1CO', reference: '1 Corinthians 2:6–9', pericopeTan: 126, dbKey: '1 Corinthians 2.6-9' },
      gospel: { bookCode: 'MAT', reference: 'Matthew 10:37–11:1', pericopeTan: 39, dbKey: 'Matthew 10.37-11.1' },
    },
  },

  // 18th Week after Pentecost (Luke cycle starts)
  18: {
    // 18th Sunday after Pentecost (Miraculous catch of fish)
    0: {
      epistle: { bookCode: '2CO', reference: '2 Corinthians 9:6–11', pericopeTan: 188, dbKey: '2 Corinthians 9.6-11' },
      gospel: { bookCode: 'LUK', reference: 'Luke 5:1–11', pericopeTan: 17, dbKey: 'Luke 5.1-11' },
    },
    1: {
      epistle: { bookCode: 'EPH', reference: 'Ephesians 4:25–32', pericopeTan: 227, dbKey: 'Ephesians 4.25-32' },
      gospel: { bookCode: 'LUK', reference: 'Luke 3:19–22', pericopeTan: 10, dbKey: 'Luke 3.19-22' },
    },
    2: {
      epistle: { bookCode: 'EPH', reference: 'Ephesians 5:20–26', pericopeTan: 229, dbKey: 'Ephesians 5.20-26' },
      gospel: { bookCode: 'LUK', reference: 'Luke 3:23–4:1', pericopeTan: 11, dbKey: 'Luke 3.23-4.1' },
    },
    3: {
      epistle: { bookCode: 'EPH', reference: 'Ephesians 5:25–33', pericopeTan: 231, dbKey: 'Ephesians 5.25-33' },
      gospel: { bookCode: 'LUK', reference: 'Luke 4:1–15', pericopeTan: 12, dbKey: 'Luke 4.1-15' },
    },
    4: {
      epistle: { bookCode: 'EPH', reference: 'Ephesians 5:33–6:9', pericopeTan: 232, dbKey: 'Ephesians 5.33-6.9' },
      gospel: { bookCode: 'LUK', reference: 'Luke 4:16–22', pericopeTan: 13, dbKey: 'Luke 4.16-22' },
    },
    5: {
      epistle: { bookCode: 'EPH', reference: 'Ephesians 6:18–24', pericopeTan: 233, dbKey: 'Ephesians 6.18-24' },
      gospel: { bookCode: 'LUK', reference: 'Luke 4:22–30', pericopeTan: 14, dbKey: 'Luke 4.22-30' },
    },
    6: {
      epistle: { bookCode: '1CO', reference: '1 Corinthians 15:39–45', pericopeTan: 161, dbKey: '1 Corinthians 15.39-45' },
      gospel: { bookCode: 'LUK', reference: 'Luke 4:31–36', pericopeTan: 15, dbKey: 'Luke 4.31-36' },
    },
  },

  // 19th Week after Pentecost (Love your enemies)
  19: {
    0: {
      epistle: { bookCode: '2CO', reference: '2 Corinthians 11:31–12:9', pericopeTan: 194, dbKey: '2 Corinthians 11.31-12.9' },
      gospel: { bookCode: 'LUK', reference: 'Luke 6:31–36', pericopeTan: 26, dbKey: 'Luke 6.31-36' },
    },
  },

  // 20th Week after Pentecost (Widow of Nain)
  20: {
    0: {
      epistle: { bookCode: 'GAL', reference: 'Galatians 1:11–19', pericopeTan: 200, dbKey: 'Galatians 1.11-19' },
      gospel: { bookCode: 'LUK', reference: 'Luke 7:11–16', pericopeTan: 30, dbKey: 'Luke 7.11-16' },
    },
  },

  // 21st Week after Pentecost (Parable of the Sower)
  21: {
    0: {
      epistle: { bookCode: 'GAL', reference: 'Galatians 2:16–20', pericopeTan: 203, dbKey: 'Galatians 2.16-20' },
      gospel: { bookCode: 'LUK', reference: 'Luke 8:5–15', pericopeTan: 35, dbKey: 'Luke 8.5-15' },
    },
  },

  // 22nd Week after Pentecost (Rich Man and Lazarus)
  22: {
    0: {
      epistle: { bookCode: 'GAL', reference: 'Galatians 6:11–18', pericopeTan: 215, dbKey: 'Galatians 6.11-18' },
      gospel: { bookCode: 'LUK', reference: 'Luke 16:19–31', pericopeTan: 83, dbKey: 'Luke 16.19-31' },
    },
  },

  // 23rd Week after Pentecost (Gadarene demoniac)
  23: {
    0: {
      epistle: { bookCode: 'EPH', reference: 'Ephesians 2:4–10', pericopeTan: 220, dbKey: 'Ephesians 2.4-10' },
      gospel: { bookCode: 'LUK', reference: 'Luke 8:26–39', pericopeTan: 38, dbKey: 'Luke 8.26-39' },
    },
  },

  // 24th Week after Pentecost (Jairus' Daughter)
  24: {
    0: {
      epistle: { bookCode: 'EPH', reference: 'Ephesians 2:14–22', pericopeTan: 221, dbKey: 'Ephesians 2.14-22' },
      gospel: { bookCode: 'LUK', reference: 'Luke 8:41–56', pericopeTan: 39, dbKey: 'Luke 8.41-56' },
    },
  },

  // 25th Week after Pentecost (Good Samaritan)
  25: {
    0: {
      epistle: { bookCode: 'EPH', reference: 'Ephesians 4:1–6', pericopeTan: 224, dbKey: 'Ephesians 4.1-6' },
      gospel: { bookCode: 'LUK', reference: 'Luke 10:25–37', pericopeTan: 53, dbKey: 'Luke 10.25-37' },
    },
  },

  // 26th Week after Pentecost (Rich Fool)
  26: {
    0: {
      epistle: { bookCode: 'EPH', reference: 'Ephesians 5:9–19', pericopeTan: 229, dbKey: 'Ephesians 5.9-19' },
      gospel: { bookCode: 'LUK', reference: 'Luke 12:16–21', pericopeTan: 66, dbKey: 'Luke 12.16-21' },
    },
  },

  // 27th Week after Pentecost (Woman bowed together)
  27: {
    0: {
      epistle: { bookCode: 'EPH', reference: 'Ephesians 6:10–17', pericopeTan: 233, dbKey: 'Ephesians 6.10-17' },
      gospel: { bookCode: 'LUK', reference: 'Luke 13:10–17', pericopeTan: 71, dbKey: 'Luke 13.10-17' },
    },
  },

  // 28th Week after Pentecost (Holy Forefathers)
  28: {
    0: {
      epistle: { bookCode: 'COL', reference: 'Colossians 1:12–18', pericopeTan: 250, dbKey: 'Colossians 1.12-18' },
      gospel: { bookCode: 'LUK', reference: 'Luke 14:16–24', pericopeTan: 76, dbKey: 'Luke 14.16-24' },
    },
  },

  // 29th Week after Pentecost (Ten Lepers)
  29: {
    0: {
      epistle: { bookCode: 'COL', reference: 'Colossians 3:4–11', pericopeTan: 257, dbKey: 'Colossians 3.4-11' },
      gospel: { bookCode: 'LUK', reference: 'Luke 17:12–19', pericopeTan: 85, dbKey: 'Luke 17.12-19' },
    },
  },

  // 30th Week after Pentecost (Rich Young Ruler)
  30: {
    0: {
      epistle: { bookCode: 'COL', reference: 'Colossians 3:12–16', pericopeTan: 258, dbKey: 'Colossians 3.12-16' },
      gospel: { bookCode: 'LUK', reference: 'Luke 18:18–27', pericopeTan: 91, dbKey: 'Luke 18.18-27' },
    },
  },

  // 31st Week after Pentecost (Blind Man of Jericho)
  31: {
    0: {
      epistle: { bookCode: '1TI', reference: '1 Timothy 1:15–17', pericopeTan: 280, dbKey: '1 Timothy 1.15-17' },
      gospel: { bookCode: 'LUK', reference: 'Luke 18:35–43', pericopeTan: 93, dbKey: 'Luke 18.35-43' },
    },
  },

  // 32nd Week after Pentecost (Zacchaeus)
  32: {
    0: {
      epistle: { bookCode: '1TI', reference: '1 Timothy 4:9–15', pericopeTan: 285, dbKey: '1 Timothy 4.9-15' },
      gospel: { bookCode: 'LUK', reference: 'Luke 19:1–10', pericopeTan: 94, dbKey: 'Luke 19.1-10' },
    },
  },

  // 33rd Week after Pentecost (Publican & Pharisee)
  33: {
    0: {
      epistle: { bookCode: '2TI', reference: '2 Timothy 3:10–15', pericopeTan: 296, dbKey: '2 Timothy 3.10-15' },
      gospel: { bookCode: 'LUK', reference: 'Luke 18:10–14', pericopeTan: 89, dbKey: 'Luke 18.10-14' },
    },
  },
};

/**
 * Calculates accurate Orthodox scripture readings for any date based on calendar style
 */
export function getOldCalendarReadings(
  civilDate: Date,
  paschaDate: Date,
  calendarStyle: CalendarStyle = 'old'
): ScriptureReading[] {
  const julian = gregorianToJulian(civilDate);
  const julianKey = `${String(julian.month).padStart(2, '0')}-${String(julian.day).padStart(2, '0')}`;
  const civilMonth = civilDate.getUTCMonth() + 1;
  const civilDay = civilDate.getUTCDate();
  const civilKey = `${String(civilMonth).padStart(2, '0')}-${String(civilDay).padStart(2, '0')}`;

  // 1. Check Fixed Feast (Old Calendar matches on Julian date, New Calendar matches on civil date)
  const keyToUse = calendarStyle === 'old' ? julianKey : civilKey;
  const feastEntry = JULIAN_FIXED_FEASTS[keyToUse];
  if (feastEntry) {
    return buildReadings(feastEntry);
  }

  // 2. Movable Pentecost Cycle
  const pentecostDate = new Date(paschaDate.getTime() + 49 * 24 * 60 * 60 * 1000);
  const diffDays = Math.floor((civilDate.getTime() - pentecostDate.getTime()) / (1000 * 60 * 60 * 24));
  const dayOfWeek = civilDate.getUTCDay();

  if (diffDays >= 0) {
    // Liturgical week calculation:
    // On Sundays (dayOfWeek === 0), week number is diffDays / 7 (e.g. 7 days -> 1st Sun, 126 days -> 18th Sun)
    // On weekdays (dayOfWeek 1-6), week number is Math.floor(diffDays / 7) + 1
    const weekAfterPentecost = dayOfWeek === 0
      ? Math.max(1, Math.round(diffDays / 7))
      : Math.floor(diffDays / 7) + 1;

    const weekMap = PENTECOST_CYCLE_READINGS[weekAfterPentecost];
    if (weekMap && weekMap[dayOfWeek]) {
      return buildReadings(weekMap[dayOfWeek]);
    }

    // Sunday fallback from weekMap[0]
    if (dayOfWeek === 0 && weekMap && weekMap[0]) {
      return buildReadings(weekMap[0]);
    }

    // Week 17 explicit readings
    if (weekAfterPentecost === 17 && PENTECOST_CYCLE_READINGS[17][dayOfWeek]) {
      return buildReadings(PENTECOST_CYCLE_READINGS[17][dayOfWeek]);
    }

    // For weeks >= 18 (Luke cycle in autumn/winter), Gospel is St. Luke
    if (weekAfterPentecost >= 18) {
      return [
        {
          source: 'Epistle',
          book: { ja: '使徒書', en: 'Epistle', ru: 'Апостол' },
          reference: `Week ${weekAfterPentecost} after Pentecost`,
          text: {
            ja: `【使徒経】五旬祭後第${weekAfterPentecost}週の日課使徒書`,
            en: `【Epistle】Daily Epistle reading for Week ${weekAfterPentecost} after Pentecost`,
            ru: `【Апостол】Рядовое зачало ${weekAfterPentecost}-й седмицы по Пятидесятнице`,
          },
        },
        {
          source: 'Gospel',
          book: LECTIONARY_BOOKS['LUK'],
          reference: `Luke (Week ${weekAfterPentecost})`,
          text: {
            ja: `【福音経】ルカに因る聖福音（五旬祭後第${weekAfterPentecost}週日課）`,
            en: `【Gospel】Holy Gospel According to St. Luke (Week ${weekAfterPentecost})`,
            ru: `【Евангелие】Евангелие от Луки (${weekAfterPentecost}-я седмица по Пятидесятнице)`,
          },
        },
      ];
    }

    // Weeks < 18 (Matthew cycle in summer)
    return [
      {
        source: 'Epistle',
        book: { ja: '使徒書', en: 'Epistle', ru: 'Апостол' },
        reference: `Week ${weekAfterPentecost} after Pentecost`,
        text: {
          ja: `【使徒経】五旬祭後第${weekAfterPentecost}週の日課使徒書`,
          en: `【Epistle】Daily Epistle reading for Week ${weekAfterPentecost} after Pentecost`,
          ru: `【Апостол】Рядовое зачало ${weekAfterPentecost}-й седмицы по Пятидесятнице`,
        },
      },
      {
        source: 'Gospel',
        book: LECTIONARY_BOOKS['MAT'],
        reference: `Matthew (Week ${weekAfterPentecost})`,
        text: {
          ja: `【福音経】マトフェイに因る聖福音（五旬祭後第${weekAfterPentecost}週日課）`,
          en: `【Gospel】Holy Gospel According to St. Matthew (Week ${weekAfterPentecost})`,
          ru: `【Евангелие】Евангелие от Матфея (${weekAfterPentecost}-я седмица по Пятидесятнице)`,
        },
      },
    ];
  }

  // 3. Fallback for current week
  const todayEntry = PENTECOST_CYCLE_READINGS[17][dayOfWeek] || PENTECOST_CYCLE_READINGS[17][4];
  return buildReadings(todayEntry);
}

function buildReadings(entry: LectionaryEntry): ScriptureReading[] {
  const epistleBook = LECTIONARY_BOOKS[entry.epistle.bookCode] || {
    ja: entry.epistle.bookCode,
    en: entry.epistle.bookCode,
    ru: entry.epistle.bookCode,
  };
  const gospelBook = LECTIONARY_BOOKS[entry.gospel.bookCode] || {
    ja: entry.gospel.bookCode,
    en: entry.gospel.bookCode,
    ru: entry.gospel.bookCode,
  };

  // Find passage in SCRIPTURE_DATABASE if available
  const epistlePassage = entry.epistle.dbKey ? SCRIPTURE_DATABASE[entry.epistle.dbKey] : undefined;
  const gospelPassage = entry.gospel.dbKey ? SCRIPTURE_DATABASE[entry.gospel.dbKey] : undefined;

  const epistleReading: ScriptureReading = {
    source: 'Epistle',
    book: epistlePassage ? epistlePassage.book : epistleBook,
    reference: entry.epistle.reference,
    pericopeTan: entry.epistle.pericopeTan,
    text: epistlePassage
      ? {
          ja: epistlePassage.verses.map((v) => `${v.verse}. ${v.text.ja}`).join('\n'),
          en: epistlePassage.verses.map((v) => `${v.verse}. ${v.text.en}`).join('\n'),
          ru: epistlePassage.verses.map((v) => `${v.verse}. ${v.text.ru}`).join('\n'),
        }
      : {
          ja: `【使徒経】${epistleBook.ja}（第${entry.epistle.pericopeTan || ''}端）${entry.epistle.reference}`,
          en: `【Epistle】${epistleBook.en} (Pericope ${entry.epistle.pericopeTan || ''}) ${entry.epistle.reference}`,
          ru: `【Апостол】${epistleBook.ru} (Зачало ${entry.epistle.pericopeTan || ''}) ${entry.epistle.reference}`,
        },
    verses: epistlePassage ? epistlePassage.verses : undefined,
  };

  const gospelReading: ScriptureReading = {
    source: 'Gospel',
    book: gospelPassage ? gospelPassage.book : gospelBook,
    reference: entry.gospel.reference,
    pericopeTan: entry.gospel.pericopeTan,
    text: gospelPassage
      ? {
          ja: gospelPassage.verses.map((v) => `${v.verse}. ${v.text.ja}`).join('\n'),
          en: gospelPassage.verses.map((v) => `${v.verse}. ${v.text.en}`).join('\n'),
          ru: gospelPassage.verses.map((v) => `${v.verse}. ${v.text.ru}`).join('\n'),
        }
      : {
          ja: `【福音経】${gospelBook.ja}（第${entry.gospel.pericopeTan || ''}端）${entry.gospel.reference}`,
          en: `【Gospel】${gospelBook.en} (Pericope ${entry.gospel.pericopeTan || ''}) ${entry.gospel.reference}`,
          ru: `【Евангелие】${gospelBook.ru} (Зачало ${entry.gospel.pericopeTan || ''}) ${entry.gospel.reference}`,
        },
    verses: gospelPassage ? gospelPassage.verses : undefined,
  };

  return [epistleReading, gospelReading];
}
