import type { Metadata } from 'next';
import './globals.css';
import { SITE_CONFIG } from '@/lib/utils';

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} — BCA Education in Kalaburagi`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: 'S.R.N. Mehta Degree College offers a 3-year BCA program in Kalaburagi, Karnataka. Affiliated to Gulbarga University. Build your career in technology with hands-on education.',
  keywords: [
    'SRN Mehta Degree College',
    'S.R.N. Mehta Degree College',
    'BCA college Kalaburagi',
    'BCA in Gulbarga',
    'Bachelor of Computer Applications Karnataka',
    'degree college Kalaburagi',
    'BCA Gulbarga University',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — BCA Education in Kalaburagi`,
    description: 'Build your career in technology. 3-year BCA program affiliated to Gulbarga University.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-paper text-ink antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-ember focus:text-white focus:px-4 focus:py-2 focus:rounded-md">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
