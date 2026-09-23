import archiveData from './sermonsArchive.json';
import { Locale } from '../lib/types';

export interface ArchivedSermon {
  id: number;
  slug: string;
  date: string;
  dateTime: string;
  link: string;
  language: 'ja' | 'en' | 'ru';
  title: string;
  excerpt: string;
  iconImage?: string;
  iconThumbnail?: string;
  iconAlt?: string;
  contentHtml: string;
  contentText: string;
}

export const SERMONS_ARCHIVE: ArchivedSermon[] = archiveData as ArchivedSermon[];

export function getSermonsByLanguage(lang: Locale): ArchivedSermon[] {
  return SERMONS_ARCHIVE.filter((s) => s.language === lang);
}

export function searchSermons(query: string, lang?: Locale): ArchivedSermon[] {
  const q = query.trim().toLowerCase();
  return SERMONS_ARCHIVE.filter((s) => {
    if (lang && s.language !== lang) return false;
    if (!q) return true;
    return (
      s.title.toLowerCase().includes(q) ||
      s.contentText.toLowerCase().includes(q) ||
      s.date.includes(q)
    );
  });
}

export function getSermonYears(): string[] {
  const years = new Set<string>();
  for (const s of SERMONS_ARCHIVE) {
    if (s.date && s.date.length >= 4) {
      years.add(s.date.substring(0, 4));
    }
  }
  return Array.from(years).sort().reverse();
}
