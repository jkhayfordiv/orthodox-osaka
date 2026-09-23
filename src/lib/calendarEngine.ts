import { DayInfo, FeastDay, SaintCommemoration, ScriptureReading } from './types';
import { calculateOrthodoxPascha, formatJulianDate, getMoveableCycle, gregorianToJulian, calculateTone } from './paschalion';
import { getFastingRule } from './fasting';
import { PARISH_SCHEDULE_2026 } from '../data/parishSchedule2026';
import { TONE_NAMES } from '../data/terminology';

export function getDayInfo(date: Date): DayInfo {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // 1-12
  const day = date.getUTCDate();
  const dayOfWeek = date.getUTCDay(); // 0 = Sun

  const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const julian = gregorianToJulian(date);
  const julianString = `${julian.month}月${julian.day}日 (旧暦)`;

  const cycle = getMoveableCycle(year);
  const tone = calculateTone(date, cycle.pascha);

  // Fasting rule
  const fasting = getFastingRule(date);

  // Feasts determination
  const feasts: FeastDay[] = [];

  // Check Moveable Feasts
  const time = date.getTime();
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getUTCFullYear() === d2.getUTCFullYear() &&
    d1.getUTCMonth() === d2.getUTCMonth() &&
    d1.getUTCDate() === d2.getUTCDate();

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

  // Check Fixed Feasts (based on civil / Julian dates)
  // Nativity of Christ
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
  }

  // Theophany (Jan 19 civil)
  if (month === 1 && day === 19) {
    feasts.push({
      title: {
        ja: '主の神現祭（洗礼祭）',
        en: 'The Holy Theophany of our Lord (Baptism of the Lord)',
        ru: 'Богоявление Господне (Крещение Господне)',
      },
      rank: 'great',
      isMovable: false,
    });
  }

  // Meeting of the Lord (Feb 15 civil)
  if (month === 2 && day === 15) {
    feasts.push({
      title: {
        ja: '主の迎接祭',
        en: 'The Meeting of our Lord in the Temple',
        ru: 'Сретение Господне',
      },
      rank: 'great',
      isMovable: false,
    });
  }

  // St. Nicholas of Japan (Feb 16 civil)
  if (month === 2 && day === 16) {
    feasts.push({
      title: {
        ja: '日本の亜使徒大主教聖ニコライ祭',
        en: 'St. Nicholas of Japan, Equal-to-the-Apostles',
        ru: 'Святителя Николая Японского, равноапостольного',
      },
      rank: 'polyeleos',
      isMovable: false,
    });
  }

  // Annunciation (April 7 civil)
  if (month === 4 && day === 7) {
    feasts.push({
      title: {
        ja: '生神女福音祭',
        en: 'The Annunciation of the Theotokos',
        ru: 'Благовещение Пресвятой Богородицы',
      },
      rank: 'great',
      isMovable: false,
    });
  }

  // Nativity of St. John the Baptist (July 7 civil)
  if (month === 7 && day === 7) {
    feasts.push({
      title: {
        ja: '前駆授洗イオアン誕生祭',
        en: 'Nativity of the Holy Forerunner & Baptist John',
        ru: 'Рождество святого Пророка и Крестителя Иоанна',
      },
      rank: 'polyeleos',
      isMovable: false,
    });
  }

  // Holy Apostles Peter and Paul (July 12 civil)
  if (month === 7 && day === 12) {
    feasts.push({
      title: {
        ja: '首座使徒ペトル・パエル祭',
        en: 'Holy Apostles Peter and Paul',
        ru: 'Святых первоверховных апостолов Петра и Павла',
      },
      rank: 'polyeleos',
      isMovable: false,
    });
  }

  // Transfiguration (Aug 19 civil)
  if (month === 8 && day === 19) {
    feasts.push({
      title: {
        ja: '主の変容祭',
        en: 'The Transfiguration of our Lord',
        ru: 'Преображение Господне',
      },
      rank: 'great',
      isMovable: false,
    });
  }

  // Dormition of the Theotokos (Aug 28 civil)
  if (month === 8 && day === 28) {
    feasts.push({
      title: {
        ja: '生神女就寝祭',
        en: 'The Dormition of the Most Holy Theotokos',
        ru: 'Успение Пресвятой Богородицы',
      },
      rank: 'great',
      isMovable: false,
    });
  }

  // Beheading of St. John the Baptist (Sept 11 civil)
  if (month === 9 && day === 11) {
    feasts.push({
      title: {
        ja: '前駆授洗イオアン斬首祭',
        en: 'Beheading of the Holy Forerunner & Baptist John',
        ru: 'Усекновение главы святого Пророка и Крестителя Иоанна',
      },
      rank: 'polyeleos',
      isMovable: false,
    });
  }

  // Nativity of the Theotokos (Sept 21 civil)
  if (month === 9 && day === 21) {
    feasts.push({
      title: {
        ja: '生神女誕生祭',
        en: 'The Nativity of the Most Holy Theotokos',
        ru: 'Рождество Пресвятой Богородицы',
      },
      rank: 'great',
      isMovable: false,
    });
  }

  // Exaltation of the Cross (Sept 27 civil)
  if (month === 9 && day === 27) {
    feasts.push({
      title: {
        ja: '十字架挙栄祭',
        en: 'The Elevation of the Precious and Life-Giving Cross',
        ru: 'Воздвижение Честнаго и Животворящаго Креста Господня',
      },
      rank: 'great',
      isMovable: false,
    });
  }

  // St. Sergius of Radonezh (Oct 8 civil)
  if (month === 10 && day === 8) {
    feasts.push({
      title: {
        ja: 'ラドネジの奇跡者聖セルギイ祭',
        en: 'St. Sergius of Radonezh the Wonderworker',
        ru: 'Преподобного Сергия Радонежского чудотворца',
      },
      rank: 'polyeleos',
      isMovable: false,
    });
  }

  // Holy Protection of the Mother of God (Pokrov - Oct 14 civil / Church Patronal Feast!)
  if (month === 10 && day === 14) {
    feasts.push({
      title: {
        ja: '生神女庇護祭（大阪教会 堂祭・守護祝日）',
        en: 'The Protection of the Theotokos (Pokrov — Osaka Patronal Feast)',
        ru: 'Покров Пресвятой Богородицы (Престольный праздник храма в Осаке)',
      },
      rank: 'great',
      isMovable: false,
    });
  }

  // Archangel Michael (Nov 21 civil)
  if (month === 11 && day === 21) {
    feasts.push({
      title: {
        ja: '天軍主ミハイル及び諸天軍の会現祭',
        en: 'Synaxis of Archangel Michael & All Bodiless Powers',
        ru: 'Собор Архистратига Михаила и прочих Небесных Сил бесплотных',
      },
      rank: 'polyeleos',
      isMovable: false,
    });
  }

  // Entry of the Theotokos into the Temple (Dec 4 civil)
  if (month === 12 && day === 4) {
    feasts.push({
      title: {
        ja: '生神女進堂祭',
        en: 'The Entry of the Most Holy Theotokos into the Temple',
        ru: 'Введение во храм Пресвятой Богородицы',
      },
      rank: 'great',
      isMovable: false,
    });
  }

  // St. Nicholas the Wonderworker (Dec 19 civil)
  if (month === 12 && day === 19) {
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

  // Saints commemorations of the day
  const saints: SaintCommemoration[] = [
    {
      name: {
        ja: '当日の記憶される諸聖人',
        en: 'Saints Commemorated on this Day',
        ru: 'Память святых сего дня',
      },
      bio: {
        ja: '教会の聖暦に従い、本日神の御前に祈る諸聖人を記念します。',
        en: 'According to the church menologion, we honor the holy saints who intercede for us.',
        ru: 'По церковному календарю чтится память святых угодников Божиих.',
      },
    },
  ];

  // Specific saints on famous days
  if (month === 2 && day === 16) {
    saints.unshift({
      name: {
        ja: '日本の亜使徒大主教聖ニコライ（カサートキン）',
        en: 'St. Nicholas (Kasatkin), Equal-to-the-Apostles, Archbishop of Japan',
        ru: 'Святитель Николай Японский, просветитель Японии',
      },
      isPatronSaint: true,
      bio: {
        ja: '1861年に箱館に着任し、新約聖書や祈祷書を日本語に翻訳、神田ニコライ堂を建立した日本正教会の開教者。',
        en: 'Founder of the Orthodox Church in Japan, missionary, translator of the Scriptures into Japanese.',
        ru: 'Основатель Японской Православной Церкви, перевёл Священное Писание и богослужения на японский язык.',
      },
    });
  } else if (month === 10 && day === 14) {
    saints.unshift({
      name: {
        ja: 'いと聖なる生神女マリヤの御庇護',
        en: 'The Holy Protection of the Most Holy Theotokos (Pokrov)',
        ru: 'Покров Пресвятой Владычицы нашей Богородицы',
      },
      isPatronSaint: true,
      bio: {
        ja: '10世紀のコンスタンティノープル・ヴラヘルネ聖堂において、聖アンドレイに現れ信徒を御外套で覆い庇護された奇跡を記念。',
        en: 'Commemorates the appearance of the Mother of God at the Blachernae church in Constantinople.',
        ru: 'Праздник в память явления Богоматери во Влахернском храме в Константинополе.',
      },
    });
  }

  // Daily Readings (Default readings based on liturgical day)
  const readings: ScriptureReading[] = [
    {
      source: 'Epistle',
      book: { ja: '使徒経（ガラテヤ書）', en: 'Epistle (Galatians)', ru: 'Апостол (К Галатам)' },
      reference: '4:28–5:10',
      pericopeTan: 210,
      text: {
        ja: `兄弟よ、我等はイサアクの如く約言の子なり。されど其の時、肉に依りて生まれし者が、霊に依りて生まれし者を窘めしが如く、今も亦然り。然れども聖書は何と言えるや、「婢女とその子とを逐い出せ、婢女の子は自由の女の子と共に嗣業を受くべからざればなり」と。是の故に兄弟よ、我等は婢女の子に非ず、自由の子なり。`,
        en: `Now we, brethren, as Isaac was, are the children of promise. But as then he that was born after the flesh persecuted him that was born after the Spirit, even so it is now. Nevertheless what saith the scripture? Cast out the bondwoman and her son: for the son of the bondwoman shall not be heir with the son of the freewoman. So then, brethren, we are not children of the bondwoman, but of the free.`,
        ru: `Мы, братия, дети обетования по Исааку. Но, как тогда рожденный по плоти гнал рожденного по духу, так и ныне. Что же говорит Писание? Изгони рабу и сына ее, ибо сын рабы не будет наследником вместе с сыном свободной. Итак, братия, мы дети не рабы, но свободной.`,
      },
    },
    {
      source: 'Gospel',
      book: { ja: '福音経（聖マルコ福音）', en: 'Holy Gospel (St. Mark)', ru: 'Евангелие от Марка' },
      reference: '6:54–7:8',
      pericopeTan: 26,
      text: {
        ja: `舟を出づれば、人々直ちにイイススを認めて、其の四方の邑里を馳せ巡り、彼の在すを聞きし処へ、病人を床に載せて舁き来たりぬ。凡そ其の入り給う所の村にても町にても田舎にても、病人を街上に置き、唯だ其の衣の総にでも触れしめ給わんことを乞い願えり。触りし者は皆救われき。`,
        en: `And when they were come out of the ship, straightway they knew Him, and ran through that whole region round about, and began to carry about in beds those that were sick, where they heard He was. And whithersoever He entered, into villages, or cities, or country, they laid the sick in the streets, and besought Him that they might touch if it were but the border of His garment: and as many as touched Him were made whole.`,
        ru: `Когда вышли они из лодки, тотчас жители, узнав Его, обежали всю окрестность ту и начали на постелях приносить больных туда, где Он, как слышно было, находился. И куда ни приходил Он, в селения ли, в города ли, в деревни ли, клали больных на открытых местах и просили Его, чтобы им прикоснуться хотя к краю одежды Его; и которые прикасались к Нему, исцелялись.`,
      },
    },
  ];

  // Match parish services for this specific date
  const parishServices = PARISH_SCHEDULE_2026.filter((s) => s.date === dateString);

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
