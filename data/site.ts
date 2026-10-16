import type { NavigationItem, SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  isTemplate: false,
  labName: 'MSU Wood AI',
  shortName: 'MSU Wood AI',
  tagline: 'Artificial Intelligence for Wood & Bioproducts',
  university: 'Mississippi State University',
  department: 'Department of Sustainable Bioproducts',
  affiliationStatement:
    'MSU Wood AI is a research laboratory at Mississippi State University within the Department of Sustainable Bioproducts.',
  universityLogo: '/brand/msstate-wordmark-maroon.svg',
  universityLogoWhite: '/brand/msstate-wordmark-white.svg',
  departmentLogo: '/brand/sustainable-bioproducts-maroon.svg',
  departmentLogoWhite: '/brand/sustainable-bioproducts-white.svg',
  description:
    'MSU Wood AI is a Mississippi State University research laboratory applying artificial intelligence, machine learning, and computer vision to wood, bioproducts, and industry challenges.',
  mission:
    'We partner with researchers and industry to turn wood and materials data into practical AI tools for classification, inspection, measurement, and decision support.',
  email: 'jts118@msstate.edu',
  location: '201 Locksley Way, Starkville, MS 39759',
  building: 'Forest Products Laboratory',
  room: 'Building 4',
  mailingAddress: 'P.O. Box 9820, Mississippi State, MS 39762',
};

export const navigation: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Research', href: '/research' },
  { label: 'People', href: '/people' },
  { label: 'Projects', href: '/projects' },
  { label: 'Products', href: '/products' },
  { label: 'Publications', href: '/publications' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
];
