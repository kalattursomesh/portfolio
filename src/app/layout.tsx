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
  title: 'Somesh K — AI/ML Engineer & Full-Stack Developer',
  description: 'Hey! I\'m Somesh — an AI/ML engineer building cool stuff with deep learning, full-stack dev, and cloud infrastructure. Check out my work.',
  keywords: ['AI/ML Engineer', 'Portfolio', 'Full Stack Developer', 'AWS Certified', 'Deep Learning', 'Python', 'Gen Z Developer'],
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
      <body className="font-sans text-white bg-[#0A0A0F]">
        <GlowEffect />
        <Navigation />
        {children}
      </body>
    </html>
  );
}