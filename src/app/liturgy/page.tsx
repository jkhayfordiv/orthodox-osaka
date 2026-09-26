import React from 'react';
import type { Metadata } from 'next';
import { LiturgyPortalView } from '../../components/liturgy/LiturgyPortalView';

export const metadata: Metadata = {
  title: '日本正教会 奉神礼・祈祷文ポータル / Orthodox Liturgy & Service Orders',
  description: '日本正教会 聖金口イオアン聖体礼儀式文、晩課・早課・各時課の日課奉神礼、機密聖事式順、および220点以上の奉神礼小冊子PDFアーカイブ。',
  openGraph: {
    title: '日本正教会 奉神礼・祈祷文ポータル',
    description: '聖金口イオアン・聖大ワシリイ聖体礼儀、時課、諸機密祈祷文、奉神礼解説。',
    images: ['/church-photos/vespers-candlelight.jpg'],
  },
};

export default function LiturgyPage() {
  return <LiturgyPortalView />;
}
