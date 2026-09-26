import React from 'react';
import type { Metadata } from 'next';
import { MariaPortalView } from '../../components/maria/MariaPortalView';

export const metadata: Metadata = {
  title: 'マリア松島純子 聖歌ポータル・正教会聖歌研究 / Matushka Maria Sacred Music Portal',
  description: '日本正教会 聖歌指導者マリア松島純子による聖歌楽譜アーカイブ。大式聖体礼儀全曲譜、主日八調合唱譜、大祭・三歌斎楽譜、および日本正教会聖歌史・聖歌論研究。',
  openGraph: {
    title: 'マリア松島純子 聖歌ポータル・日本正教会 聖歌アーカイブ',
    description: '大式聖体礼儀全曲譜、主日八調（第1調〜第8調）、大祭聖歌PDF、ヨハン・フォン・ガードナーの教会聖歌論研究。',
    images: ['/church-photos/choir-loft.jpg'],
  },
};

export default function MariaPage() {
  return <MariaPortalView />;
}
