import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import Providers from '~/provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LearnChinese.club - AI Generated Mandarin Flashcards ',
  description: 'Randomly Generated Mandarin Flashcards, powered by ChatGPT',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-red-50`}>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
