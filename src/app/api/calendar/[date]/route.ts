import { NextRequest, NextResponse } from 'next/server';
import { gregorianToJulian } from '@/lib/paschalion';

interface OrthocalReadingPassage {
  book: string;
  chapter: number;
  verse: number;
  content: string;
  paragraph_start?: boolean;
}

interface OrthocalReading {
  source: string;
  book: string;
  description: string;
  display: string;
  short_display: string;
  passage?: OrthocalReadingPassage[];
}

interface OrthocalDayResponse {
  year: number;
  month: number;
  day: number;
  weekday: number;
  tone: number;
  titles: string[];
  summary_title: string;
  feast_level: number;
  feast_level_description: string;
  feasts: string[] | null;
  fast_level: number;
  fast_level_desc: string;
  saints: string[];
  readings: OrthocalReading[];
}

// Translations for common biblical books
const BOOK_NAMES: Record<string, { ja: string; en: string; ru: string }> = {
  MAT: { ja: 'マトフェイに因る聖福音', en: 'Gospel of Matthew', ru: 'Евангелие от Матфея' },
  MRK: { ja: 'マルコに因る聖福音', en: 'Gospel of Mark', ru: 'Евангелие от Марка' },
  LUK: { ja: 'ルカに因る聖福音', en: 'Gospel of Luke', ru: 'Евангелие от Луки' },
  JHN: { ja: 'イオアンに因る聖福音', en: 'Gospel of John', ru: 'Евангелие от Иоанна' },
  ACT: { ja: '聖使徒行実', en: 'Acts of the Apostles', ru: 'Деяния святых апостолов' },
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
  '2JN': { ja: 'イオアン第2公書', en: '2 John', ru: '2-е Иоанна' },
  '3JN': { ja: 'イオアン第3公書', en: '3 John', ru: '3-е Иоанна' },
  JUD: { ja: 'イウダ公書', en: 'Epistle of Jude', ru: 'Послание Иуды' },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  try {
    const { date: dateParam } = await params;
    // Expected format: YYYY-MM-DD
    const parts = dateParam.split('-');
    if (parts.length !== 3) {
      return NextResponse.json({ error: 'Invalid date format (expected YYYY-MM-DD)' }, { status: 400 });
    }

    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    const gregorianDate = new Date(Date.UTC(year, month - 1, day));

    // Convert Gregorian to Julian (subtract 13 days for 1900–2099)
    const julianDate = new Date(gregorianDate.getTime());
    julianDate.setUTCDate(julianDate.getUTCDate() - 13);
    const jYear = julianDate.getUTCFullYear();
    const jMonth = julianDate.getUTCMonth() + 1;
    const jDay = julianDate.getUTCDate();

    // Call Orthocal Julian API endpoint with the Julian calendar date
    const orthocalUrl = `https://orthocal.info/api/julian/${jYear}/${jMonth}/${jDay}/`;
    const res = await fetch(orthocalUrl, {
      next: { revalidate: 86400 }, // Cache on edge for 24 hours
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Orthocal error: ${res.statusText}` }, { status: res.status });
    }

    const data: OrthocalDayResponse = await res.json();

    // Process readings into full passage text
    const processedReadings = data.readings.map((r) => {
      const bookCode = r.passage && r.passage.length > 0 ? r.passage[0].book : '';
      const bookName = BOOK_NAMES[bookCode] || {
        ja: r.display,
        en: r.display,
        ru: r.display,
      };

      // Full English text with verse numbers
      const fullEnglishText = r.passage
        ? r.passage.map((v) => `${v.verse}. ${v.content}`).join('\n')
        : '';

      return {
        source: r.source,
        book: bookName,
        display: r.display,
        reference: r.display,
        verses: r.passage || [],
        fullTextEn: fullEnglishText,
      };
    });

    return NextResponse.json({
      success: true,
      civilDate: dateParam,
      julian: {
        year: data.year,
        month: data.month,
        day: data.day,
      },
      tone: data.tone,
      titles: data.titles,
      summaryTitle: data.summary_title,
      saints: data.saints,
      fastLevel: data.fast_level,
      fastDesc: data.fast_level_desc,
      readings: processedReadings,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
