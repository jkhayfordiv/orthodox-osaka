'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { Church, BookOpen, Music, Scroll, Compass } from 'lucide-react';

export function PortalFooter() {
  const { locale } = useApp();

  return (
    <footer className="bg-orthodox-navy-dark text-slate-400 border-t border-orthodox-gold/30 mt-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: About the orthodox-jp.com web cluster */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white">
              <span className="font-serif font-bold text-base text-orthodox-gold-light">orthodox-jp.com</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              {locale === 'ja'
                ? '日本ハリストス正教会 西日本主教区・大阪教会を拠点とする正教信仰・奉神礼・聖歌・神学の総合情報アーカイブ群です。'
                : 'Comprehensive Orthodox Christian archives, liturgical texts, sacred music, and theological writings based in Osaka and the Western Japan Diocese.'}
            </p>
          </div>

          {/* Col 2: Portals */}
          <div className="space-y-2.5">
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-orthodox-gold">
              {locale === 'ja' ? '正教研究ポータル' : 'Portals & Archives'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/george" className="hover:text-orthodox-gold transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-orthodox-gold" />
                  <span>{locale === 'ja' ? '司祭ゲオルギイ松島雄一 神学・教理' : 'Fr. George Theological Library'}</span>
                </Link>
              </li>
              <li>
                <Link href="/maria" className="hover:text-orthodox-gold transition-colors flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-orthodox-gold" />
                  <span>{locale === 'ja' ? 'マリア松島純子 聖歌ポータル' : 'Matushka Maria Sacred Music'}</span>
                </Link>
              </li>
              <li>
                <Link href="/liturgy" className="hover:text-orthodox-gold transition-colors flex items-center gap-1.5">
                  <Scroll className="w-3.5 h-3.5 text-orthodox-gold" />
                  <span>{locale === 'ja' ? '日本正教会 奉神礼・祈祷文集' : 'Orthodox Liturgy & Services'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Diocese & Churches */}
          <div className="space-y-2.5">
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-orthodox-gold">
              {locale === 'ja' ? '主教区・教区聖堂' : 'Diocese & Churches'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-orthodox-gold transition-colors flex items-center gap-1.5">
                  <Church className="w-3.5 h-3.5 text-orthodox-gold" />
                  <span>{locale === 'ja' ? '大阪ハリストス正教会 生神女庇護聖堂' : 'Holy Protection Osaka Church'}</span>
                </Link>
              </li>
              <li>
                <Link href="/westjapan" className="hover:text-orthodox-gold transition-colors flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-orthodox-gold" />
                  <span>{locale === 'ja' ? '西日本主教教区・各地の聖堂案内' : 'Western Japan Diocese Churches'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Note & Copyright */}
          <div className="space-y-2.5">
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-orthodox-gold">
              {locale === 'ja' ? '資料利用について' : 'About Materials'}
            </h4>
            <p className="text-2xs text-slate-400 leading-relaxed">
              {locale === 'ja'
                ? '当サイトに掲載されている論文・説教・楽譜・祈祷文は、正教会の信仰の学びおよび奉神礼のために公開されています。私的学習・教会での礼拝用途にご自由にお用いいただけます。'
                : 'Texts, liturgical orders, homilies, and choral scores are made freely accessible for personal study and parish liturgical worship.'}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-2xs text-slate-400">
          <span>© 1999–2026 Orthodox Church in Japan / Osaka Parish. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-orthodox-gold transition-colors">
              {locale === 'ja' ? '大阪教会トップ' : 'Parish Home'}
            </Link>
            <span>·</span>
            <Link href="/george" className="hover:text-orthodox-gold transition-colors">
              {locale === 'ja' ? 'ゲオルギイ神父' : 'Fr. George'}
            </Link>
            <span>·</span>
            <Link href="/maria" className="hover:text-orthodox-gold transition-colors">
              {locale === 'ja' ? 'マリア松島' : 'Matushka Maria'}
            </Link>
            <span>·</span>
            <Link href="/liturgy" className="hover:text-orthodox-gold transition-colors">
              {locale === 'ja' ? '奉神礼集' : 'Liturgy'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
