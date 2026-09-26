import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '../context/AppContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://orthodox-jp.com'),
  title: '大阪ハリストス正教会 / Osaka Orthodox Church',
  description: '大阪ハリストス正教会 生神女庇護聖堂 聖暦カレンダー・奉事日程・祈祷書 (The Holy Protection Orthodox Church in Osaka)',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '大阪正教会',
  },
};

export const viewport: Viewport = {
  themeColor: '#1B2A4A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="大阪正教会" />
      </head>
      <body className="min-h-screen flex flex-col bg-orthodox-parchment dark:bg-slate-950 transition-colors">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
