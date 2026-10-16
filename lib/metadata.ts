import type { Metadata } from 'next';

import { siteConfig } from '@/data/site';

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const siteUrl = new URL(
  configuredSiteUrl && /^https?:\/\//.test(configuredSiteUrl)
    ? configuredSiteUrl
    : 'https://msuwoodai.com',
);

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function createPageMetadata(
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: 'website',
      siteName: siteConfig.labName,
      title,
      description,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}
