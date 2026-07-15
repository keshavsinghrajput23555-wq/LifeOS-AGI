import './globals.css';
import { Inter, Noto_Sans_Devanagari } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const noto = Noto_Sans_Devanagari({ subsets: ['devanagari'], variable: '--font-dev' });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${noto.variable} min-h-screen`}>{children}</body>
    </html>
  );
}
