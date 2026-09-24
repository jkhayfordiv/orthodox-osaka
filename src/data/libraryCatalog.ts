// Auto-generated library catalog
import libraryData from './libraryCatalog.json';

export type OrthodoxSubTopic =
  | 'foundations'
  | 'liturgy_prayer'
  | 'inquiries_qa'
  | 'fathers_saints'
  | 'theology_church'
  | 'church_life';

export interface LibraryItem {
  id: string;
  title: string;
  titleEn?: string;
  titleRu?: string;
  section: 'george' | 'maria' | 'liturgy' | 'pandane';
  type: 'article' | 'pdf';
  url: string;
  relativePath: string;
  category: 'catechism' | 'patristics' | 'spiritual_life' | 'theology_history' | 'liturgy_chant' | 'scores_pdf';
  categoryLabel: { ja: string; en: string; ru: string };
  subTopic?: OrthodoxSubTopic;
  author: string;
  readTimeMinutes?: number;
  tags: string[];
  snippet: string;
  snippetEn?: string;
  contentLength?: number;
  size?: number;
}

export const LIBRARY_DATA = libraryData as {
  generatedAt: string;
  totalCount: number;
  articlesCount: number;
  scoresCount: number;
  featuredInquirers: LibraryItem[];
  items: LibraryItem[];
};
