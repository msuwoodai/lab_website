import type { NewsItem } from '@/types';

export const newsItems: NewsItem[] = [
  {
    id: 'news-01',
    slug: 'lab-update-01',
    title: '[LAB UPDATE TITLE 01]',
    date: '[DATE]',
    summary:
      'Replace this summary with a verified update about a publication, presentation, award, project, or lab activity.',
    content:
      '[FULL UPDATE CONTENT — ADD CONFIRMED CONTEXT, PEOPLE, LINKS, AND OUTCOMES OR REMOVE THIS FIELD.]',
    image: '/news/news-placeholder-01.svg',
    imageAlt: 'Placeholder for lab update 01 imagery',
    category: '[UPDATE TYPE]',
    isPlaceholder: true,
  },
  {
    id: 'news-02',
    title: '[LAB UPDATE TITLE 02]',
    date: '[DATE]',
    summary:
      'Use this item for a recent student achievement, conference activity, outreach event, or other confirmed news.',
    image: '/news/news-placeholder-02.svg',
    imageAlt: 'Placeholder for lab update 02 imagery',
    category: '[UPDATE TYPE]',
    isPlaceholder: true,
  },
  {
    id: 'news-03',
    title: '[LAB UPDATE TITLE 03]',
    date: '[DATE]',
    summary:
      'Add one concise paragraph that explains what happened and why it is relevant to the lab community.',
    image: '/news/news-placeholder-03.svg',
    imageAlt: 'Placeholder for lab update 03 imagery',
    category: '[UPDATE TYPE]',
    isPlaceholder: true,
  },
];

export const publishedNewsItems = newsItems.filter(
  (item) => !item.isPlaceholder,
);
