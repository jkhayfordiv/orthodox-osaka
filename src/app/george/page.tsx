import React from 'react';
import type { Metadata } from 'next';
import { GeorgePortalView } from '../../components/george/GeorgePortalView';

export const metadata: Metadata = {
  title: '司祭ゲオルギイ松島雄一 神学・教理アーカイブ / Fr. George Matsushima Theological Archive',
  description: '日本正教会 司祭ゲオルギイ松島雄一による神学論考、使徒継承信仰、聖師父霊性、アトスの聖パイシイ対話録、信徒・求道者のＱ＆Ａ質問箱。',
  openGraph: {
    title: '司祭ゲオルギイ松島雄一 神学・教理アーカイブ',
    description: '150編以上の神学論文、聖体礼儀の神秘、聖パイシイ対話録、上海とサンフランシスコの聖イオアン主日講話。',
    images: ['/church-photos/vespers-candlelight.jpg'],
  },
};

export default function GeorgePage() {
  return <GeorgePortalView />;
}
