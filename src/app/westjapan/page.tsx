import React from 'react';
import type { Metadata } from 'next';
import { WestJapanView } from '../../components/westjapan/WestJapanView';

export const metadata: Metadata = {
  title: '聖自治日本正教会 西日本主教教区 / Western Diocese of the Orthodox Church in Japan',
  description: '日本正教会 西日本主教教区（京都主教座教会、大阪、神戸、名古屋、豊橋、半田、和歌山、徳島、柳井原、福岡、熊本、人吉、鹿児島、広島・宮崎）の教会案内・行事・所在地。',
  openGraph: {
    title: '聖自治日本正教会 西日本主教教区',
    description: '西日本主教教区（東海・近畿・中国・四国・九州）各地の聖堂・会堂のご案内と最新行事。',
    images: ['/images/westjapan/CATHEDRAL_KYOTO.jpg'],
  },
};

export default function WestJapanPage() {
  return <WestJapanView />;
}
