import type { Metadata, Viewport } from "next";
import { Fira_Code } from 'next/font/google';
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import StructuredData from "@/components/StructuredData";

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-fira-code',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#000000' }
  ],
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://andreidodu.se'),
  title: {
    default: 'Andrei Dodu - Full-Stack Developer, AI Engineer & Value Investor',
    template: '%s | Andrei Dodu'
  },
  description: 'Portfolio of Andrei Dodu, a full-stack developer, AI engineer, and value investor with deep ML expertise (training, fine-tuning, optimization). Based in Göteborg, Sweden.',
  keywords: [
    'Full-Stack Developer',
    'AI Engineer',
    'Machine Learning',
    'ML Engineer',
    'Value Investor',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'Portfolio',
    'Sweden',
    'Göteborg',
    'Web Development',
    'Financial Analysis',
    'Software Engineer',
    'Ruby on Rails',
    'AI/ML',
    'Model Training',
    'Fine-tuning'
  ],
  authors: [{ name: 'Andrei Dodu', url: 'https://andreidodu.se' }],
  creator: 'Andrei Dodu',
  publisher: 'Andrei Dodu',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['sv_SE'],
    url: 'https://andreidodu.se',
    siteName: 'Andrei Dodu Portfolio',
    title: 'Andrei Dodu - Full-Stack Developer, AI Engineer & Value Investor',
    description: 'Portfolio of Andrei Dodu, a full-stack developer, AI engineer with deep ML expertise, and value investor based in Göteborg, Sweden.',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 1200,
        alt: 'Andrei Dodu - Full-Stack Developer, AI Engineer & Value Investor',
      }
    ]
  },

  twitter: {
    card: 'summary_large_image',
    site: '@andreidoduse',
    creator: '@andreidoduse',
    title: 'Andrei Dodu - Full-Stack Developer, AI Engineer & Value Investor',
    description: 'Full-stack developer, AI engineer with deep ML expertise, and value investor based in Göteborg, Sweden.',
    images: ['/profile.jpg']
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
    canonical: 'https://andreidodu.se',
    languages: {
      'en-US': 'https://andreidodu.se',
      'sv-SE': 'https://andreidodu.se?lang=sv',
    },
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
  },

  manifest: '/manifest.json',

  category: 'technology',
  referrer: 'origin-when-cross-origin',
};

import LanguageWrapper from "@/components/LanguageWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <LanguageWrapper fontClassName={firaCode.variable}>
        <StructuredData />
        {/* Fixed diagonal gradient background */}
        <div className="diagonal-gradient-bg" />
        {children}
      </LanguageWrapper>
    </LanguageProvider>
  );
}
