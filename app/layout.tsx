import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Syne, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'cyrillic-ext'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AURA Piercing Studio | Анатомический пирсинг & Ювелирная эстетика',
  description: 'Премиальная студия пирсинга: имплантационный титан ASTM F-136, 100% стерильность, интерактивная карта проколов и конфигуратор украшений.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ru" className={`${syne.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="bg-[#0B0B0E] text-white font-body antialiased selection:bg-[#E0A98B] selection:text-black">
        {children}
      </body>
    </html>
  );
}
