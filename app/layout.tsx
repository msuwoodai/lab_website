import type { Metadata, Viewport } from 'next';

import { LabChat } from '@/components/chat/lab-chat';
import { Footer } from '@/components/site/footer';
import { Header } from '@/components/site/header';
import { chatConfig } from '@/data/chat';
import { siteConfig } from '@/data/site';
import { siteUrl } from '@/lib/metadata';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${siteConfig.labName} at ${siteConfig.university}`,
    template: `%s | ${siteConfig.labName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.labName,
  keywords: [
    'MSU Wood AI',
    'Mississippi State University',
    'wood science',
    'artificial intelligence',
    'machine learning',
    'computer vision',
    'sustainable bioproducts',
  ],
  category: 'education',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.labName,
    title: `${siteConfig.labName} at ${siteConfig.university}`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary',
    title: `${siteConfig.labName} at ${siteConfig.university}`,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#5D1725',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ResearchOrganization',
    name: siteConfig.labName,
    description: siteConfig.description,
    url: siteUrl.toString(),
    email: siteConfig.email,
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: siteConfig.university,
      url: 'https://www.msstate.edu/',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.location,
      addressLocality: 'Starkville',
      addressRegion: 'MS',
      postalCode: '39759',
      addressCountry: 'US',
    },
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a
          href="#main-content"
          className="fixed top-3 left-3 z-[100] -translate-y-20 bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <Header />
        {children}
        <Footer />
        {chatConfig.enabled ? <LabChat /> : null}
      </body>
    </html>
  );
}
