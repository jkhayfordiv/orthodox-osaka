/**
 * Orthodox Paschalion and Movable Cycle Calculation
 * Uses the traditional Gauss / Meeus Julian Computus
 * Valid for Gregorian years 1900 to 2099 (Julian offset = 13 days)
 */

export interface MoveableFeastDates {
  year: number;
  pascha: Date;
  triodionBegins: Date;       // Pascha - 70 days (Publican & Pharisee / 税吏とファリセイ)
  meatfareSunday: Date;       // Pascha - 56 days (断肉主日)
  cheesefareSunday: Date;     // Pascha - 49 days (乾酪主日 / 赦罪晩課)
  greatLentBegins: Date;      // Pascha - 48 days (Clean Monday / 大斎始)
  stGregoryPalamas: Date;     // Pascha - 35 days (2nd Sunday of Lent)
  holyCrossSunday: Date;      // Pascha - 28 days (3rd Sunday of Lent / 十字架叩拝主日)
  stJohnClimacus: Date;       // Pascha - 21 days (4th Sunday of Lent / 階梯者イオアン主日)
  stMaryOfEgypt: Date;        // Pascha - 14 days (5th Sunday of Lent / エジプトマリア主日)
  palmSunday: Date;           // Pascha - 7 days  (聖枝主日)
  holyThursday: Date;         // Pascha - 3 days  (聖大木曜日)
  holyFriday: Date;           // Pascha - 2 days  (聖大金曜日)
  holySaturday: Date;         // Pascha - 1 day   (聖大土曜日)
  brightWeek: Date;           // Pascha + 1 day
  thomasSunday: Date;         // Pascha + 7 days  (フォマ主日 / Antipascha)
  myrrhbearersSunday: Date;   // Pascha + 14 days (携香女主日)
  paralyticSunday: Date;      // Pascha + 21 days (癱者主日)
  samaritanWomanSunday: Date; // Pascha + 28 days (サマリア女主日)
  blindManSunday: Date;       // Pascha + 35 days (瞽者主日)
  ascension: Date;            // Pascha + 39 days (主の昇天祭)
  pentecost: Date;            // Pascha + 49 days (五旬祭 / 聖三位一体祭)
  allSaintsSunday: Date;      // Pascha + 56 days (衆聖人の主日)
  apostlesFastBegins: Date;   // Pascha + 57 days (聖使徒の斎 開始)
}

/**
 * Calculates Gregorian date of Orthodox Pascha for any given year
 */
export function calculateOrthodoxPascha(year: number): Date {
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31); // Julian month: 3 = March, 4 = April
  const day = ((d + e + 114) % 31) + 1;

  // Julian date
  const julianDate = new Date(Date.UTC(year, month - 1, day));
  // Add 13 days for Gregorian calendar offset (1900-2099)
  julianDate.setUTCDate(julianDate.getUTCDate() + 13);
  return julianDate;
}

/**
 * Adds or subtracts days to a Date object (UTC safe)
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date.getTime());
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

/**
 * Computes all movable feasts for a given calendar year
 */
export function getMoveableCycle(year: number): MoveableFeastDates {
  const pascha = calculateOrthodoxPascha(year);

  return {
    year,
    pascha,
    triodionBegins: addDays(pascha, -70),
    meatfareSunday: addDays(pascha, -56),
    cheesefareSunday: addDays(pascha, -49),
    greatLentBegins: addDays(pascha, -48),
    stGregoryPalamas: addDays(pascha, -35),
    holyCrossSunday: addDays(pascha, -28),
    stJohnClimacus: addDays(pascha, -21),
    stMaryOfEgypt: addDays(pascha, -14),
    palmSunday: addDays(pascha, -7),
    holyThursday: addDays(pascha, -3),
    holyFriday: addDays(pascha, -2),
    holySaturday: addDays(pascha, -1),
    brightWeek: addDays(pascha, 1),
    thomasSunday: addDays(pascha, 7),
    myrrhbearersSunday: addDays(pascha, 14),
    paralyticSunday: addDays(pascha, 21),
    samaritanWomanSunday: addDays(pascha, 28),
    blindManSunday: addDays(pascha, 35),
    ascension: addDays(pascha, 39),
    pentecost: addDays(pascha, 49),
    allSaintsSunday: addDays(pascha, 56),
    apostlesFastBegins: addDays(pascha, 57),
  };
}

/**
 * Converts a Gregorian civil date to Julian (Old Style) date (-13 days)
 */
export function gregorianToJulian(civilDate: Date): { year: number; month: number; day: number } {
  const julian = new Date(civilDate.getTime());
  julian.setUTCDate(julian.getUTCDate() - 13);
  return {
    year: julian.getUTCFullYear(),
    month: julian.getUTCMonth() + 1,
    day: julian.getUTCDate(),
  };
}

/**
 * Formats a Julian date into trilingual representation
 */
export function formatJulianDate(civilDate: Date, locale: 'ja' | 'en' | 'ru'): string {
  const j = gregorianToJulian(civilDate);
  if (locale === 'ja') {
    return `旧暦 ${j.month}月${j.day}日`;
  }
  if (locale === 'ru') {
    const monthsRu = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    return `${j.day} ${monthsRu[j.month - 1]} (ст.ст.)`;
  }
  const monthsEn = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return `${monthsEn[j.month - 1]} ${j.day} (Old Style)`;
}

/**
 * Calculates tone (1-8) for a given Sunday based on distance from Pascha
 */
export function calculateTone(date: Date, paschaDate: Date): number {
  const diffDays = Math.floor((date.getTime() - paschaDate.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) {
    // Before Pascha (Triodion period), tone follows previous year's Pentecost cycle
    return 0;
  }
  if (diffDays < 7) {
    // Bright Week has special daily tones
    return (diffDays % 8) + 1;
  }
  // From Thomas Sunday (+7 days) onwards, tone increases by 1 each week mod 8
  const weekNumber = Math.floor((diffDays - 7) / 7);
  return (weekNumber % 8) + 1;
}
