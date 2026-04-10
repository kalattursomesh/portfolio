import type { Metadata } from 'next';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import GlowEffect from '@/components/UI/GlowEffect';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kalattur Somesh — AI/ML Engineer & System Architect',
  description: 'Portfolio OS of Kalattur Somesh. AI/ML specialist, full-stack developer, and AWS-certified cloud engineer. Explore my terminal.',
  keywords: ['AI/ML Engineer', 'Portfolio', 'Full Stack Developer', 'AWS Certified', 'Deep Learning', 'Python'],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${outfit.variable} ${jetbrains.variable} scroll-smooth`}>
      <body className="font-sans text-white bg-[#050510] scanlines">
        <GlowEffect />
        <Navigation />
        {children}
      </body>
    </html>
  );
}