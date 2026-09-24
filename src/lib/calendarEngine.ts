import { DayInfo, FeastDay, SaintCommemoration, ScriptureReading, ParishService } from './types';
import { calculateOrthodoxPascha, formatJulianDate, getMoveableCycle, gregorianToJulian, calculateTone } from './paschalion';
import { getFastingRule } from './fasting';
import { PARISH_SCHEDULE_2026 } from '../data/parishSchedule2026';
import { TONE_NAMES } from '../data/terminology';
import { DAILY_SAINTS_JULIAN } from '../data/dailySaints';
import { getOldCalendarReadings } from './orthodoxLectionary';

export function getDayInfo(date: Date, customSchedule?: ParishService[]): DayInfo {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // 1-12
  const day = date.getUTCDate();
  const dayOfWeek = date.getUTCDay(); // 0 = Sun

  const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const julian = gregorianToJulian(date);
  const julianKey = `${String(julian.month).padStart(2, '0')}-${String(julian.day).padStart(2, '0')}`;
  const julianString = `${julian.month}月${julian.day}日 (旧暦)`;

  const cycle = getMoveableCycle(year);
  const tone = calculateTone(date, cycle.pascha);

  // Fasting rule
  const fasting = getFastingRule(date);

  // Feasts determination
  const feasts: FeastDay[] = [];

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getUTCFullYear() === d2.getUTCFullYear() &&
    d1.getUTCMonth() === d2.getUTCMonth() &&
    d1.getUTCDate() === d2.getUTCDate();

  // Moveable Feasts
  if (isSameDay(date, cycle.pascha)) {
    feasts.push({
      title: {
        ja: '主の復活大祭（ハリストス復活！パスカ）',
        en: 'HOLY PASCHA — The Bright Resurrection of Christ',
        ru: 'СВЕТЛОЕ ХРИСТОВО ВОСКРЕСЕНИЕ — ПАСХА',
      },
      rank: 'great',
      isMovable: true,
    });
  } else if (isSameDay(date, cycle.palmSunday)) {
    feasts.push({
      title: {
        ja: '主のエルサレム入城（聖枝祭）',
        en: 'Entry of the Lord into Jerusalem (Palm Sunday)',
        ru: 'Вход Господень в Иерусалим (Вербное воскресенье)',
      },
      rank: 'great',
      isMovable: true,
    });
  } else if (isSameDay(date, cycle.ascension)) {
    feasts.push({
      title: {
        ja: '主の昇天祭',
        en: 'The Ascension of our Lord',
        ru: 'Вознесение Господне',
      },
      rank: 'great',
      isMovable: true,
    });
  } else if (isSameDay(date, cycle.pentecost)) {
    feasts.push({
      title: {
        ja: '五旬祭（聖三位一体祭）',
        en: 'Holy Pentecost (Trinity Sunday)',
        ru: 'День Святой Троицы (Пятидесятница)',
      },
      rank: 'great',
      isMovable: true,
    });
  }

  // Fixed Feasts
  if (month === 1 && day === 7) {
    feasts.push({
      title: {
        ja: '主の降誕祭（旧暦降誕大祭）',
        en: 'Nativity of Christ (Old Calendar Great Feast)',
        ru: 'Рождество Христово (Юлианский календарь)',
      },
      rank: 'great',
      isMovable: false,
    });
  } else if (month === 12 && day === 25) {
    feasts.push({
      title: {
        ja: '新暦主の降誕祭（大阪正教会祝祭）',
        en: 'Nativity of Christ (New Calendar Celebration at Osaka)',
        ru: 'Рождество Христово (Новоюлианский праздник)',
      },
      rank: 'great',
      isMovable: false,
    });
  } else if (month === 1 && day === 19) {
    feasts.push({
      title: {
        ja: '主の神現祭（洗礼祭）',
        en: 'The Holy Theophany of our Lord (Baptism of the Lord)',
        ru: 'Богоявление Господне (Крещение Господне)',
      },
      rank: 'great',
      isMovable: false,
    });
  } else if (month === 2 && day === 15) {
    feasts.push({
      title: {
        ja: '主の迎接祭',
        en: 'The Meeting of our Lord in the Temple',
        ru: 'Сретение Господне',
      },
      rank: 'great',
      isMovable: false,
    });
  } else if (month === 2 && day === 16) {
    feasts.push({
      title: {
        ja: '日本の亜使徒大主教聖ニコライ祭',
        en: 'St. Nicholas of Japan, Equal-to-the-Apostles',
        ru: 'Святителя Николая Японского, равноапостольного',
      },
      rank: 'polyeleos',
      isMovable: false,
    });
  } else if (month === 4 && day === 7) {
    feasts.push({
      title: {
        ja: '生神女福音祭',
        en: 'The Annunciation of the Theotokos',
        ru: 'Благовещение Пресвятой Богородицы',
      },
      rank: 'great',
      isMovable: false,
    });
  } else if (month === 7 && day === 7) {
    feasts.push({
      title: {
        ja: '前駆授洗イオアン誕生祭',
        en: 'Nativity of the Holy Forerunner & Baptist John',
        ru: 'Рождество святого Пророка и Крестителя Иоанна',
      },
      rank: 'polyeleos',
      isMovable: false,
    });
  } else if (month === 7 && day === 12) {
    feasts.push({
      title: {
        ja: '首座使徒ペトル・パエル祭',
        en: 'Holy Apostles Peter and Paul',
        ru: 'Святых первоверховных апостолов Петра и Павла',
      },
      rank: 'polyeleos',
      isMovable: false,
    });
  } else if (month === 8 && day === 19) {
    feasts.push({
      title: {
        ja: '主の変容祭',
        en: 'The Transfiguration of our Lord',
        ru: 'Преображение Господне',
      },
      rank: 'great',
      isMovable: false,
    });
  } else if (month === 8 && day === 28) {
    feasts.push({
      title: {
        ja: '生神女就寝祭',
        en: 'The Dormition of the Most Holy Theotokos',
        ru: 'Успение Пресвятой Богородицы',
      },
      rank: 'great',
      isMovable: false,
    });
  } else if (month === 9 && day === 11) {
    feasts.push({
      title: {
        ja: '前駆授洗イオアン斬首祭',
        en: 'Beheading of the Holy Forerunner & Baptist John',
        ru: 'Усекновение главы святого Пророка и Крестителя Иоанна',
      },
      rank: 'polyeleos',
      isMovable: false,
    });
  } else if (month === 9 && day === 21) {
    feasts.push({
      title: {
        ja: '生神女誕生祭',
        en: 'The Nativity of the Most Holy Theotokos',
        ru: 'Рождество Пресвятой Богородицы',
      },
      rank: 'great',
      isMovable: false,
    });
  } else if (month === 9 && day === 27) {
    feasts.push({
      title: {
        ja: '十字架挙栄祭',
        en: 'The Elevation of the Precious and Life-Giving Cross',
        ru: 'Воздвижение Честнаго и Животворящаго Креста Господня',
      },
      rank: 'great',
      isMovable: false,
    });
  } else if (month === 10 && day === 8) {
    feasts.push({
      title: {
        ja: 'ラドネジの奇跡者聖セルギイ祭',
        en: 'St. Sergius of Radonezh the Wonderworker',
        ru: 'Преподобного Сергия Радонежского чудотворца',
      },
      rank: 'polyeleos',
      isMovable: false,
    });
  } else if (month === 10 && day === 14) {
    feasts.push({
      title: {
        ja: '生神女庇護祭（大阪教会 堂祭・守護祝日）',
        en: 'The Protection of the Theotokos (Pokrov — Osaka Patronal Feast)',
        ru: 'Покров Пресвятой Богородицы (Престольный праздник храма в Осаке)',
      },
      rank: 'great',
      isMovable: false,
    });
  } else if (month === 11 && day === 21) {
    feasts.push({
      title: {
        ja: '天軍主ミハイル及び諸天軍の会現祭',
        en: 'Synaxis of Archangel Michael & All Bodiless Powers',
        ru: 'Собор Архистратига Михаила и прочих Небесных Сил бесплотных',
      },
      rank: 'polyeleos',
      isMovable: false,
    });
  } else if (month === 12 && day === 4) {
    feasts.push({
      title: {
        ja: '生神女進堂祭',
        en: 'The Entry of the Most Holy Theotokos into the Temple',
        ru: 'Введение во храм Пресвятой Богородицы',
      },
      rank: 'great',
      isMovable: false,
    });
  } else if (month === 12 && day === 19) {
    feasts.push({
      title: {
        ja: 'ミラ・リキヤの奇跡者聖ニコライ大祭',
        en: 'St. Nicholas the Wonderworker of Myra',
        ru: 'Святителя Николая Чудотворца, архиепископа Мир Ликийских',
      },
      rank: 'polyeleos',
      isMovable: false,
    });
  }

  // Saints for the day (from rich Julian calendar Menologion)
  let saints: SaintCommemoration[] = DAILY_SAINTS_JULIAN[julianKey] || [];

  if (saints.length === 0) {
    saints = [
      {
        name: {
          ja: '教会の聖暦に記憶される諸聖人',
          en: 'Saints Commemorated on this Day',
          ru: 'Память святых угодников Божиих',
        },
        bio: {
          ja: '正教会聖暦（ユリウス暦）に従い、神の御前に祈る諸聖人を記念します。',
          en: 'According to the church menologion, we honor the holy saints who intercede for us.',
          ru: 'По церковному календарю чтится память святых угодников Божиих.',
        },
      },
    ];
  }

  // Daily Scripture Readings according to Orthodox Old Calendar Lectionary
  const readings: ScriptureReading[] = getOldCalendarReadings(date, cycle.pascha);

  // Match parish services for this specific date
  const scheduleSource = customSchedule && customSchedule.length > 0 ? customSchedule : PARISH_SCHEDULE_2026;
  const parishServices = scheduleSource.filter((s) => s.date === dateString);

  // Sunday Title (if Sunday)
  let sundayTitle = undefined;
  if (dayOfWeek === 0) {
    sundayTitle = {
      ja: `主日（${tone > 0 ? TONE_NAMES[tone].ja : '特式'}）`,
      en: `Lord's Day (${tone > 0 ? TONE_NAMES[tone].en : 'Special'})`,
      ru: `Воскресный день (${tone > 0 ? TONE_NAMES[tone].ru : 'Особый'})`,
    };
  }

  // Days until Pascha
  const daysToPascha = Math.ceil((cycle.pascha.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  return {
    civilDate: date,
    dateString,
    julianDateString: julianString,
    tone,
    sundayTitle,
    feasts,
    saints,
    fasting,
    readings,
    parishServices,
    daysToPascha: daysToPascha > 0 && daysToPascha <= 50 ? daysToPascha : undefined,
  };
}
