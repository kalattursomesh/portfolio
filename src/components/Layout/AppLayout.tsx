'use client';

import { ReactNode } from 'react';
import Head from 'next/head';
import Navigation from '../Navigation';
import { Footer } from './Footer';
import { SEOMetadata } from '@/types';
import { GlowEffect } from '../UI/GlowEffect';

interface AppLayoutProps {
  children: ReactNode;
  metadata: SEOMetadata;
}

export function AppLayout({ children, metadata }: AppLayoutProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": metadata.title,
    "description": metadata.description,
    "url": metadata.canonicalUrl,
    "image": metadata.ogImage,
    "sameAs": metadata.socialLinks || []
  };

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(', ')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={metadata.canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.ogImage} />
        <meta property="og:url" content={metadata.canonicalUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.ogImage} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>

      <div className="min-h-screen bg-slate-950 relative overflow-x-hidden selection:bg-sky-500/30">
        <GlowEffect />
        <Navigation />
        <main role="main" className="relative z-10">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}