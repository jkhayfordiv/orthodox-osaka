import { TrilingualText } from './types';
import { getMoveableCycle, addDays } from './paschalion';

export interface FastingSeasonInfo {
  id: string;
  name: TrilingualText;
  startDate: Date;
  endDate: Date;
  durationDays: number;
  status: 'active' | 'upcoming' | 'passed';
  daysUntilStart: number;
  daysRemaining?: number;
  ruleDescription: TrilingualText;
  allowedFoods: TrilingualText;
  icon: string;
}

export function getFastingSeasons(year: number, currentDate: Date = new Date()): FastingSeasonInfo[] {
  const cycle = getMoveableCycle(year);
  const now = new Date(currentDate);
  now.setHours(0, 0, 0, 0);

  // 1. Great Lent (Clean Monday to Holy Saturday)
  const lentStart = cycle.greatLentBegins;
  const lentEnd = addDays(cycle.pascha, -1);

  // 2. Apostles' Fast (Day after All Saints to July 11 civil)
  const apostlesStart = cycle.apostlesFastBegins;
  const apostlesEnd = new Date(Date.UTC(year, 6, 11)); // July 11

  // 3. Dormition Fast (August 14 to August 27 civil)
  const dormitionStart = new Date(Date.UTC(year, 7, 14)); // Aug 14
  const dormitionEnd = new Date(Date.UTC(year, 7, 27));   // Aug 27

  // 4. Nativity Fast (November 28 to January 6 next year civil)
  const nativityStart = new Date(Date.UTC(year, 10, 28)); // Nov 28
  const nativityEnd = new Date(Date.UTC(year + 1, 0, 6));  // Jan 6 next year

  const rawSeasons = [
    {
      id: 'great_lent',
      name: {
        ja: '大斎（受難週間を含む）',
        en: 'Great Lent & Holy Week',
        ru: 'Великий Пост и Страстная Седмица',
      },
      startDate: lentStart,
      endDate: lentEnd,
      icon: '🟣',
      ruleDescription: {
        ja: '復活大祭に備える最も厳粛な48日間の斎。肉、乳製品、魚、酒、油を断ちます。',
        en: 'The 48-day solemn fast preparing for Holy Pascha. Abstain from meat, dairy, fish, wine, and oil.',
        ru: '48 дней сугубого покаяния и воздержания перед Пасхой Христовой.',
      },
      allowedFoods: {
        ja: '穀物、野菜、豆類、果物。週末は酒・油可。受難週は厳斎。生神女福音祭と聖枝祭は魚可。',
        en: 'Grains, vegetables, legumes, fruits. Wine and oil on weekends. Fish on Annunciation and Palm Sunday.',
        ru: 'Растительная пища. В субботу и воскресенье вино и елей. На Благовещение и Вербное воскресенье — рыба.',
      },
    },
    {
      id: 'apostles_fast',
      name: {
        ja: '聖使徒の斎（ペトル・パエル祭の斎）',
        en: "Apostles' Fast (Peter & Paul)",
        ru: 'Петров пост (Апостольский пост)',
      },
      startDate: apostlesStart,
      endDate: apostlesEnd,
      icon: '🐟',
      ruleDescription: {
        ja: '聖使徒ペトル・パエル祭に備える斎。福音宣教の使徒たちの労苦を偲びます。',
        en: 'Fast preparing for the Feast of the Holy Apostles Peter & Paul.',
        ru: 'Пост в честь святых первоверховных апостолов Петра и Павла.',
      },
      allowedFoods: {
        ja: '肉・乳製品は断ちますが、土日・火曜・木曜は魚・酒・油が許されます。',
        en: 'Abstain from meat and dairy; fish, wine, and oil permitted on weekends, Tuesdays, and Thursdays.',
        ru: 'Воздержание от мяса и молочного. Рыба разрешается по выходным, вторникам и четвергам.',
      },
    },
    {
      id: 'dormition_fast',
      name: {
        ja: '生神女就寝祭の斎（就寝祭斎）',
        en: 'Dormition Fast of the Theotokos',
        ru: 'Успенский пост Пресвятой Богородицы',
      },
      startDate: dormitionStart,
      endDate: dormitionEnd,
      icon: '🍇',
      ruleDescription: {
        ja: 'いと聖なる生神女の就寝を偲ぶ2週間の厳格な斎（大斎に準じる精進）。',
        en: 'Two-week strict fast in honor of the Dormition of the Mother of God.',
        ru: 'Двухнедельный строгий пост перед Успением Божией Матери.',
      },
      allowedFoods: {
        ja: '肉・乳製品・魚を断ちます。週末は酒・油可。主の変容祭（8/19）は魚・酒・油が許されます。',
        en: 'Abstain from meat, dairy, fish. Wine and oil on weekends. Fish permitted on Transfiguration (Aug 19).',
        ru: 'Строгий пост. В выходные вино и елей. В праздник Преображения Господня (19 авг) разрешается рыба.',
      },
    },
    {
      id: 'nativity_fast',
      name: {
        ja: '主の降誕祭の斎（フィリップの斎）',
        en: 'Nativity Fast (St. Philip’s Fast)',
        ru: 'Рождественский пост (Филиппов пост)',
      },
      startDate: nativityStart,
      endDate: nativityEnd,
      icon: '⭐',
      ruleDescription: {
        ja: '主イイスス・ハリストスの降誕大祭を迎えるための40日間の斎。',
        en: 'Forty-day winter fast preparing for the Nativity of our Lord Jesus Christ.',
        ru: 'Сорокадневный пост в преддверии праздника Рождества Христова.',
      },
      allowedFoods: {
        ja: '肉・乳製品を断ちます。1月1日までの週末や聖ニコライ祭等は魚可。1月2日以降は厳斎。',
        en: 'Abstain from meat and dairy. Fish permitted on weekends until Jan 1. Stricter from Jan 2.',
        ru: 'Воздержание от мяса и молока. До 1 января по выходным разрешается рыба. Со 2 января — строгий пост.',
      },
    },
  ];

  return rawSeasons.map((s) => {
    const startMs = s.startDate.getTime();
    const endMs = s.endDate.getTime();
    const nowMs = now.getTime();

    const durationDays = Math.round((endMs - startMs) / (1000 * 60 * 60 * 24)) + 1;
    const daysUntilStart = Math.ceil((startMs - nowMs) / (1000 * 60 * 60 * 24));

    let status: 'active' | 'upcoming' | 'passed' = 'upcoming';
    let daysRemaining = undefined;

    if (nowMs >= startMs && nowMs <= endMs) {
      status = 'active';
      daysRemaining = Math.ceil((endMs - nowMs) / (1000 * 60 * 60 * 24));
    } else if (nowMs > endMs) {
      status = 'passed';
    }

    return {
      ...s,
      durationDays,
      status,
      daysUntilStart,
      daysRemaining,
    };
  });
}
