import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/dm-sans';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import './globals.css';
import { profile } from '@/data/content';

const site = process.env.SITE_URL || 'https://hitesh-ahuja.embarko.app';
const description =
  'Hitesh Ahuja is a full-stack developer at viaSocket who builds web products end to end with React, Next.js and Node.js, and automates the work in between.';

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: `${profile.name} · Full-stack developer`,
  description,
  alternates: { canonical: '/' },
  authors: [{ name: profile.name, url: profile.linkedin }],
  keywords: ['Hitesh Ahuja', 'full-stack developer', 'Next.js', 'Node.js', 'API integrations', 'OAuth', 'viaSocket', 'portfolio'],
  openGraph: {
    type: 'profile', url: site, title: `${profile.name} · Full-stack developer`, description,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: profile.motto }],
  },
  twitter: { card: 'summary_large_image', title: `${profile.name} · Full-stack developer`, description, images: ['/og.png'] },
  icons: { icon: '/icon.svg' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F1EBDD' },
    { media: '(prefers-color-scheme: dark)', color: '#161915' },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'Person', name: profile.name, jobTitle: profile.title,
  email: `mailto:${profile.email}`, url: site, sameAs: [profile.linkedin, profile.github],
  address: { '@type': 'PostalAddress', addressLocality: 'Indore', addressCountry: 'IN' },
  alumniOf: 'Medi-Caps University', worksFor: { '@type': 'Organization', name: 'Walkover Web Solution' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
