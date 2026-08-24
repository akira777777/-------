import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Montserrat, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext', 'cyrillic-ext'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#08080B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://aura-piercing.cz'),
  title: 'AURA Piercing Studio Praha | Анатомический пирсинг & Ear Curation',
  description: 'Флагманская студия анатомического пирсинга и ювелирной эстетики в Праге. Имплантационный титан ASTM F-136, золото 14k/18k, стерильность Class B EN 13060 и персональное сопровождение мастера Anastasya.',
  keywords: [
    'пирсинг прага',
    'piercing praha',
    'ear curation prague',
    'пирсинг ушей прага',
    'титановые украшения astm f136',
    'золотой пирсинг 14k',
    'даунсайз пирсинг',
    'anastasya piercing'
  ],
  authors: [{ name: 'Anastasya · AURA Studio' }],
  openGraph: {
    title: 'AURA Piercing Studio Praha · Анатомический пирсинг & Ear Curation',
    description: 'Ювелирная эстетика и медицинская безопасность в Праге. Титан ASTM F-136, золото 14k/18k и бесплатный даунсайз.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'AURA Piercing Studio Praha',
    images: [
      {
        url: '/images/curated-ear-styling.webp',
        width: 1200,
        height: 630,
        alt: 'AURA Studio Prague Ear Curation & Piercing Setup',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AURA Piercing Studio Praha',
    description: 'Анатомический пирсинг и ювелирный подбор сетапов в Праге.',
    images: ['/images/curated-ear-styling.webp'],
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://aura-piercing.cz',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'AURA Piercing Studio Praha',
  description: 'Студия анатомического пирсинга, Ear Curation и ювелирного подбора украшений в Праге.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Praha',
    addressCountry: 'CZ',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '11:00',
      closes: '21:30',
    },
  ],
  priceRange: '550 CZK - 9500 CZK',
  currenciesAccepted: 'CZK, EUR, USD',
  paymentAccepted: 'Cash, Credit Card, Revolut, Apple Pay',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.98',
    reviewCount: '148',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ru" className={`${montserrat.variable} ${jakarta.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#08080B] text-white font-body antialiased selection:bg-[#E0A98B] selection:text-black">
        {children}
      </body>
    </html>
  );
}

