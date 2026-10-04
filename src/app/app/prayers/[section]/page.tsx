import { notFound } from 'next/navigation';
import { ReaderView } from '../../../../components/reader/ReaderView';

const sections = ['liturgy', 'prayers', 'patronal'] as const;
type ReaderSection = (typeof sections)[number];

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export default async function ReaderSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!sections.includes(section as ReaderSection)) notFound();
  return <ReaderView initialCategory={section as ReaderSection} />;
}
