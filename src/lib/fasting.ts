import { FastingInfo, FastingLevel, FastingPeriod, TrilingualText } from './types';
import { getMoveableCycle } from './paschalion';

export function getFastingRule(date: Date): FastingInfo {
  const year = date.getUTCFullYear();
  const cycle = getMoveableCycle(year);
  const time = date.getTime();

  const month = date.getUTCMonth() + 1; // 1-12
  const day = date.getUTCDate();
  const dayOfWeek = date.getUTCDay(); // 0 = Sun, 1 = Mon, ... 6 = Sat

  // --- 1. Christmastide (Jan 7 - Jan 17): Fast-Free ---
  if (month === 1 && day >= 7 && day <= 17) {
    return {
      level: 'no_fast',
      period: 'none',
      icon: '🟢',
      badgeText: { ja: '斎なし（降誕節）', en: 'Fast-Free (Christmastide)', ru: 'Сплошная седмица (Святки)' },
      explanation: {
        ja: '降誕祭後の祝祷期間のため斎はありません。すべての食物が許されます。',
        en: 'Continuous fast-free period celebrating the Nativity of Christ. All foods permitted.',
        ru: 'Сплошной период святочных дней после Рождества. Поста нет.',
      },
    };
  }

  // --- 2. Eve of Theophany (Jan 18): Strict Fast ---
  if (month === 1 && day === 18) {
    return {
      level: 'strict',
      period: 'none',
      icon: '🟣',
      badgeText: { ja: '厳斎（神現祭前夜）', en: 'Strict Fast (Theophany Eve)', ru: 'Строгий пост (Навечерие Богоявления)' },
      explanation: {
        ja: '神現祭の大聖水式に備える厳斎日です。',
        en: 'Strict fast day preparing for the Great Blessing of Water on Theophany.',
        ru: 'День строгого поста перед праздником Крещения Господня.',
      },
    };
  }

  // --- 3. Fast-free Week: Publican and Pharisee ---
  const triodionStart = cycle.triodionBegins.getTime();
  const meatfare = cycle.meatfareSunday.getTime();
  if (time >= triodionStart && time < meatfare) {
    return {
      level: 'no_fast',
      period: 'none',
      icon: '🟢',
      badgeText: { ja: '斎なし（税吏とファリセイの週）', en: 'Fast-Free Week (Publican & Pharisee)', ru: 'Сплошная седмица (Мытаря и Фарисея)' },
      explanation: {
        ja: 'ファリセイ人の誇りを避けるため水曜・金曜も斎が解かれます。',
        en: 'Fast-free week including Wednesday and Friday, learning humility from the Publican.',
        ru: 'Сплошная седмица, пост в среду и пятницу отменяется.',
      },
    };
  }

  // --- 4. Cheesefare Week (Maslenitsa) ---
  const cheesefare = cycle.cheesefareSunday.getTime();
  if (time >= meatfare && time <= cheesefare) {
    return {
      level: 'dairy',
      period: 'none',
      icon: '🧀',
      badgeText: { ja: '乾酪・乳卵可（肉断ち）', en: 'Cheesefare (No Meat, Dairy Allowed)', ru: 'Сырная седмица (Масленица, без мяса)' },
      explanation: {
        ja: '大斎直前の週。肉類は禁じられますが、乳製品・卵・魚は毎日許されます。',
        en: 'The week before Great Lent. Meat is forbidden, but dairy, eggs, and fish are permitted.',
        ru: 'Седмица перед Великим постом. Мясо исключается, сыр, яйца, рыба разрешаются.',
      },
    };
  }

  // --- 5. Great Lent (Clean Monday to Palm Sunday) ---
  const lentStart = cycle.greatLentBegins.getTime();
  const palmSun = cycle.palmSunday.getTime();
  if (time >= lentStart && time < palmSun) {
    // Annunciation (April 7 civil / Mar 25 Julian) in Lent: Fish allowed
    if (month === 4 && day === 7) {
      return {
        level: 'fish',
        period: 'great_lent',
        icon: '🐟',
        badgeText: { ja: '魚酒油可（生神女福音祭）', en: 'Fish Allowed (Annunciation)', ru: 'Рыба разрешена (Благовещение)' },
        periodName: { ja: '大斎', en: 'Great Lent', ru: 'Великий Пост' },
        explanation: {
          ja: '大斎中ですが生神女福音大祭のため魚・酒・油が許されます。',
          en: 'During Great Lent, fish, wine, and oil are permitted for the Great Feast of the Annunciation.',
          ru: 'Праздник Благовещения Пресвятой Богородицы, разрешается рыба, вино и елей.',
        },
      };
    }

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return {
        level: 'wine_oil',
        period: 'great_lent',
        icon: '🟡',
        badgeText: { ja: '酒油可（大斎の週末）', en: 'Wine & Oil (Great Lent Weekend)', ru: 'Вино и елей (Суббота/Воскресенье)' },
        periodName: { ja: '大斎', en: 'Great Lent', ru: 'Великий Пост' },
        explanation: {
          ja: '大斎期間中、土曜と日曜はワインと植物油が許されます。',
          en: 'During Great Lent, wine and oil are permitted on Saturdays and Sundays.',
          ru: 'В субботу и воскресенье Великого поста разрешаются вино и елей.',
        },
      };
    }

    return {
      level: 'strict',
      period: 'great_lent',
      icon: '🟣',
      badgeText: { ja: '厳斎（大斎平日）', en: 'Strict Fast (Great Lent Weekday)', ru: 'Строгий пост (Будни Великого Поста)' },
      periodName: { ja: '大斎', en: 'Great Lent', ru: 'Великий Пост' },
      explanation: {
        ja: '肉、乳製品、魚、油、酒を断つ大斎の精進日です。',
        en: 'Strict fast abstaining from meat, dairy, fish, wine, and oil.',
        ru: 'Строгий пост без мяса, молока, рыбы, вина и масла.',
      },
    };
  }

  // --- 6. Palm Sunday ---
  if (Math.abs(time - palmSun) < 24 * 60 * 60 * 1000 && date.getUTCDate() === cycle.palmSunday.getUTCDate()) {
    return {
      level: 'fish',
      period: 'holy_week',
      icon: '🐟',
      badgeText: { ja: '魚酒油可（聖枝祭）', en: 'Fish Allowed (Palm Sunday)', ru: 'Рыба разрешена (Вербное Воскресенье)' },
      periodName: { ja: '受難週', en: 'Holy Week', ru: 'Страстная Седмица' },
      explanation: {
        ja: '主のエルサレム入城を祝し、魚・酒・油が許されます。',
        en: 'Fish, wine, and oil are permitted in honor of the Entry of the Lord into Jerusalem.',
        ru: 'Вход Господень в Иерусалим, разрешается рыба, вино и елей.',
      },
    };
  }

  // --- 7. Holy Week (Passion Week) ---
  const pascha = cycle.pascha.getTime();
  if (time > palmSun && time < pascha) {
    if (month === cycle.holyThursday.getUTCMonth() + 1 && day === cycle.holyThursday.getUTCDate()) {
      return {
        level: 'wine_oil',
        period: 'holy_week',
        icon: '🟡',
        badgeText: { ja: '酒油可（聖大木曜日）', en: 'Wine & Oil (Holy Thursday)', ru: 'Вино и елей (Великий Четверток)' },
        periodName: { ja: '受難週', en: 'Holy Week', ru: 'Страстная Седмица' },
        explanation: {
          ja: '機密制定の晩餐を記念し、酒と油が許されます。',
          en: 'Commemorating the Mystical Supper; wine and oil are permitted.',
          ru: 'Воспоминание Тайной Вечери, разрешаются вино и елей.',
        },
      };
    }

    if (month === cycle.holyFriday.getUTCMonth() + 1 && day === cycle.holyFriday.getUTCDate()) {
      return {
        level: 'total',
        period: 'holy_week',
        icon: '⚪',
        badgeText: { ja: '完全斎（聖大金曜日）', en: 'Total Fast (Holy Friday)', ru: 'Полный пост (Великий Пяток)' },
        periodName: { ja: '受難週', en: 'Holy Week', ru: 'Страстная Седмица' },
        explanation: {
          ja: '主の十字架の受難を想い、聖骸布着座まで完全断食とします。',
          en: 'Total fast commemorating the Crucifixion until the Plaschanitsa (Epitaphios) vespers.',
          ru: 'День строжайшего поста в воспоминание Крестных страданий Спасителя.',
        },
      };
    }

    return {
      level: 'strict',
      period: 'holy_week',
      icon: '🟣',
      badgeText: { ja: '厳斎（受難週）', en: 'Strict Fast (Holy Week)', ru: 'Строгий пост (Страстная Седмица)' },
      periodName: { ja: '受難週', en: 'Holy Week', ru: 'Страстная Седмица' },
      explanation: {
        ja: '主の受難を偲ぶ最も厳粛な斎の週です。',
        en: 'The most solemn days of fast following Christ on the path to Golgotha.',
        ru: 'Дни сугубого поста и покаяния на пути ко Кресту.',
      },
    };
  }

  // --- 8. Bright Week (Pascha to Thomas Sunday) ---
  const brightWeekEnd = cycle.thomasSunday.getTime();
  if (time >= pascha && time < brightWeekEnd) {
    return {
      level: 'no_fast',
      period: 'none',
      icon: '🟢',
      badgeText: { ja: '斎なし（光明週間）', en: 'Fast-Free (Bright Week)', ru: 'Сплошная седмица (Светлая)' },
      explanation: {
        ja: '主の復活を歓喜する光明週間。すべての食物が許されます。',
        en: 'Bright Week celebrating the Resurrection of Christ! All foods permitted every day.',
        ru: 'Светлая седмица Воскресения Христова! Поста нет во все дни.',
      },
    };
  }

  // --- 9. Trinity Week (Pentecost to All Saints) ---
  const pentecost = cycle.pentecost.getTime();
  const allSaints = cycle.allSaintsSunday.getTime();
  if (time >= pentecost && time <= allSaints) {
    return {
      level: 'no_fast',
      period: 'none',
      icon: '🟢',
      badgeText: { ja: '斎なし（五旬祭後第1週）', en: 'Fast-Free (Trinity Week)', ru: 'Сплошная седмица (Троицкая)' },
      explanation: {
        ja: '聖三位一体祭後の祝悼週間のため水曜・金曜も斎はありません。',
        en: 'Fast-free week following Pentecost celebrating the Holy Trinity.',
        ru: 'Троицкая сплошная седмица, поста в среду и пятницу нет.',
      },
    };
  }

  // --- 10. Apostles Fast (Day after All Saints to July 11) ---
  const apostlesFastStart = cycle.apostlesFastBegins.getTime();
  const apostlesFastEnd = new Date(Date.UTC(year, 6, 11)).getTime(); // July 11
  if (time >= apostlesFastStart && time <= apostlesFastEnd) {
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isTuesdayThursday = dayOfWeek === 2 || dayOfWeek === 4;

    if (isWeekend || isTuesdayThursday) {
      return {
        level: 'fish',
        period: 'apostles_fast',
        icon: '🐟',
        badgeText: { ja: '魚酒油可（聖使徒の斎）', en: 'Fish Allowed (Apostles Fast)', ru: 'Рыба разрешена (Петров пост)' },
        periodName: { ja: '聖使徒の斎', en: "Apostles' Fast", ru: 'Петров пост' },
        explanation: {
          ja: '聖使徒ペトル・パエル祭に備える斎。週末および火・木曜は魚が許されます。',
          en: "Apostles' Fast preparing for Ss. Peter & Paul. Fish permitted on weekends, Tuesdays & Thursdays.",
          ru: 'Петров пост, в выходные, вторник и четверг разрешается рыба.',
        },
      };
    }

    return {
      level: 'strict',
      period: 'apostles_fast',
      icon: '🟣',
      badgeText: { ja: '精進（聖使徒の斎）', en: 'Fast Day (Apostles Fast)', ru: 'Постный день (Петров пост)' },
      periodName: { ja: '聖使徒の斎', en: "Apostles' Fast", ru: 'Петров пост' },
      explanation: {
        ja: '聖使徒の斎の精進日（肉・乳製品・魚なし）。',
        en: "Fast day of the Apostles' Fast (abstaining from meat, dairy, and fish).",
        ru: 'День Петрова поста (без мяса, молока и рыбы).',
      },
    };
  }

  // --- 11. Dormition Fast (August 14 to August 27 civil) ---
  if (month === 8 && day >= 14 && day <= 27) {
    // Transfiguration of the Lord (Aug 19 civil / Aug 6 Julian): Fish allowed
    if (day === 19) {
      return {
        level: 'fish',
        period: 'dormition_fast',
        icon: '🐟',
        badgeText: { ja: '魚酒油可（主の変容祭）', en: 'Fish Allowed (Transfiguration)', ru: 'Рыба разрешена (Преображение)' },
        periodName: { ja: '生神女就寝祭の斎', en: 'Dormition Fast', ru: 'Успенский пост' },
        explanation: {
          ja: '就寝祭斎中ですが主の変容祭のため魚・酒・油が許されます。',
          en: 'Transfiguration of the Lord: fish, wine, and oil are permitted during Dormition Fast.',
          ru: 'Преображение Господне, разрешается рыба, вино и елей.',
        },
      };
    }

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return {
        level: 'wine_oil',
        period: 'dormition_fast',
        icon: '🟡',
        badgeText: { ja: '酒油可（就寝祭斎週末）', en: 'Wine & Oil (Dormition Fast)', ru: 'Вино и елей (Успенский пост)' },
        periodName: { ja: '生神女就寝祭の斎', en: 'Dormition Fast', ru: 'Успенский пост' },
        explanation: {
          ja: '生神女就寝祭に備える斎の週末。植物油とワインが許されます。',
          en: 'Dormition Fast weekend: wine and oil are permitted.',
          ru: 'Выходные дни Успенского поста, разрешаются вино и елей.',
        },
      };
    }

    return {
      level: 'strict',
      period: 'dormition_fast',
      icon: '🟣',
      badgeText: { ja: '厳斎（就寝祭斎平日）', en: 'Strict Fast (Dormition Fast)', ru: 'Строгий пост (Успенский пост)' },
      periodName: { ja: '生神女就寝祭の斎', en: 'Dormition Fast', ru: 'Успенский пост' },
      explanation: {
        ja: '生神女就寝祭に備える厳格な斎（大斎に準じる精進）です。',
        en: 'Strict fast in preparation for the Dormition of the Mother of God.',
        ru: 'Строгий пост перед Успением Пресвятой Богородицы.',
      },
    };
  }

  // --- 12. Beheading of St. John the Baptist (Sept 11 civil / Aug 29 Julian): Strict Fast ---
  if (month === 9 && day === 11) {
    return {
      level: 'strict',
      period: 'none',
      icon: '🟣',
      badgeText: { ja: '厳斎（前駆授洗イオアン斬首祭）', en: 'Strict Fast (Beheading of St. John)', ru: 'Строгий пост (Усекновение главы Иоанна Предтечи)' },
      explanation: {
        ja: '前駆授洗イオアンの斬首殉教を偲ぶ一日厳斎日です。',
        en: 'Strict fast day commemorating the Beheading of the Holy Forerunner John the Baptist.',
        ru: 'День строгого поста в память Усекновения главы святого Иоанна Предтечи.',
      },
    };
  }

  // --- 13. Exaltation of the Holy Cross (Sept 27 civil / Sept 14 Julian): Strict Fast ---
  if (month === 9 && day === 27) {
    return {
      level: 'strict',
      period: 'none',
      icon: '🟣',
      badgeText: { ja: '厳斎（十字架挙栄祭）', en: 'Strict Fast (Exaltation of the Cross)', ru: 'Строгий пост (Воздвижение Креста Господня)' },
      explanation: {
        ja: '尊い十字架の崇敬と主の苦難を想う一日厳斎日です。',
        en: 'Strict fast day in honor of the Elevation of the Precious and Life-Giving Cross.',
        ru: 'День строгого поста в честь Воздвижения Животворящего Креста Господня.',
      },
    };
  }

  // --- 14. Nativity Fast (Nov 28 to Jan 6 civil) ---
  const isNativityFast = (month === 11 && day >= 28) || month === 12 || (month === 1 && day <= 6);
  if (isNativityFast) {
    // St. Nicholas the Wonderworker (Dec 19 civil): Fish allowed
    if (month === 12 && day === 19) {
      return {
        level: 'fish',
        period: 'nativity_fast',
        icon: '🐟',
        badgeText: { ja: '魚酒油可（奇跡者聖ニコライ祭）', en: 'Fish Allowed (St. Nicholas)', ru: 'Рыба разрешена (Свт. Николай Чудотворец)' },
        periodName: { ja: '降誕祭の斎', en: 'Nativity Fast', ru: 'Рождественский пост' },
        explanation: {
          ja: '聖ニコライ大祭のため魚・酒・油が許されます。',
          en: 'Feast of St. Nicholas: fish, wine, and oil are permitted.',
          ru: 'День памяти святителя Николая Чудотворца, разрешается рыба, вино и елей.',
        },
      };
    }

    // New Calendar Christmas (Dec 25): Osaka parish blessing
    if (month === 12 && day === 25) {
      return {
        level: 'fish',
        period: 'nativity_fast',
        icon: '🐟',
        badgeText: { ja: '魚酒油可（新暦降誕祭）', en: 'Fish Allowed (New Cal. Nativity)', ru: 'Рыба разрешена (Новоюлианское Рождество)' },
        periodName: { ja: '降誕祭の斎', en: 'Nativity Fast', ru: 'Рождественский пост' },
        explanation: {
          ja: '大阪正教会で祝われる新暦降誕祭のため魚・酒・油が許されます。',
          en: 'Celebrated at Osaka Church for New Calendar Christmas: fish, wine, and oil allowed.',
          ru: 'Празднование Рождества в Осаке: разрешается рыба, вино и елей.',
        },
      };
    }

    // Final week before Nativity (Jan 2 - Jan 6): Stricter fasting
    if (month === 1 && day >= 2 && day <= 6) {
      return {
        level: 'strict',
        period: 'nativity_fast',
        icon: '🟣',
        badgeText: { ja: '厳斎（降誕祭直前）', en: 'Strict Fast (Nativity Forefeast)', ru: 'Строгий пост (Предпразднство Рождества)' },
        periodName: { ja: '降誕祭の斎', en: 'Nativity Fast', ru: 'Рождественский пост' },
        explanation: {
          ja: '降誕祭直前の厳粛な精進期間です。魚・油を断ちます。',
          en: 'Strict fasting days directly preceding the Nativity of Christ.',
          ru: 'Строгие дни предпразднства Рождества Христова.',
        },
      };
    }

    // Regular Nativity fast weekends: Fish allowed
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return {
        level: 'fish',
        period: 'nativity_fast',
        icon: '🐟',
        badgeText: { ja: '魚酒油可（降誕祭の斎 週末）', en: 'Fish Allowed (Nativity Fast Weekend)', ru: 'Рыба разрешена (Рождественский пост, выходные)' },
        periodName: { ja: '降誕祭の斎', en: 'Nativity Fast', ru: 'Рождественский пост' },
        explanation: {
          ja: 'フィリップの斎（降誕祭の斎）の週末は魚・酒・油が許されます。',
          en: 'Fish, wine, and oil are permitted on weekends during the Nativity Fast.',
          ru: 'В субботу и воскресенье Рождественского поста разрешается рыба, вино и елей.',
        },
      };
    }

    return {
      level: 'strict',
      period: 'nativity_fast',
      icon: '🟣',
      badgeText: { ja: '精進（降誕祭の斎 平日）', en: 'Fast Day (Nativity Fast Weekday)', ru: 'Постный день (Рождественский пост)' },
      periodName: { ja: '降誕祭の斎', en: 'Nativity Fast', ru: 'Рождественский пост' },
      explanation: {
        ja: 'フィリップの斎の精進日（肉・乳製品・魚なし）。',
        en: 'Weekday fast during the Nativity Fast (no meat, dairy, or fish).',
        ru: 'Будний день Рождественского поста без рыбы.',
      },
    };
  }

  // --- 15. Regular Wednesdays & Fridays throughout the Year ---
  if (dayOfWeek === 3 || dayOfWeek === 5) {
    return {
      level: 'wine_oil',
      period: 'none',
      icon: '🟡',
      badgeText: {
        ja: dayOfWeek === 3 ? '水曜日の斎（油可）' : '金曜日の斎（油可）',
        en: dayOfWeek === 3 ? 'Wednesday Fast (Wine & Oil)' : 'Friday Fast (Wine & Oil)',
        ru: dayOfWeek === 3 ? 'Пост в среду (Вино и елей)' : 'Пост в пятницу (Вино и елей)',
      },
      explanation: {
        ja: dayOfWeek === 3
          ? '主の裏切りを記憶する水曜日の精進日です。肉・乳製品を控えます。'
          : '主の十字架の受難を記憶する金曜日の精進日です。肉・乳製品を控えます。',
        en: dayOfWeek === 3
          ? 'Wednesday fast commemorating the betrayal of Christ. Abstain from meat and dairy.'
          : 'Friday fast commemorating the Crucifixion of Christ. Abstain from meat and dairy.',
        ru: dayOfWeek === 3
          ? 'Пост в среду в воспоминание предательства Иуды. Воздержание от мяса и молочного.'
          : 'Пост в пятницу в воспоминание Крестных страданий Спасителя.',
      },
    };
  }

  // --- 16. Default: No Fast (斎なし) ---
  return {
    level: 'no_fast',
    period: 'none',
    icon: '🟢',
    badgeText: { ja: '斎なし', en: 'No Fast', ru: 'Без поста' },
    explanation: {
      ja: '通常日です。すべての食物が感謝をもって許されます。',
      en: 'Standard non-fasting day. All foods permitted with thanksgiving.',
      ru: 'Обычный непостный день. Разрешается любая пища.',
    },
  };
}
