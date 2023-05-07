import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LearnChinese.club - AI Generated Mandarin Flashcards ',
  description: 'Randomly Generated Mandarin Flashcards, powered by ChatGPT',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-red-100`}>{children}</body>
      <Analytics />
    </html>
  );
}
