import type { MetadataRoute } from 'next';

import { availableProducts } from '@/data/products';
import { publishedProjects } from '@/data/projects';
import { absoluteUrl } from '@/lib/metadata';

const staticRoutes = [
  '',
  '/research',
  '/people',
  '/projects',
  '/products',
  '/publications',
  '/news',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = publishedProjects.map(
    (project) => `/projects/${project.slug}`,
  );
  const productRoutes = availableProducts.flatMap((product) =>
    product.demoUrl ? [product.demoUrl] : [],
  );

  return [...staticRoutes, ...projectRoutes, ...productRoutes].map((route) => ({
    url: absoluteUrl(route || '/'),
    changeFrequency:
      route.startsWith('/projects/') || route.startsWith('/products/')
        ? 'monthly'
        : 'weekly',
    priority:
      route === ''
        ? 1
        : route.startsWith('/projects/') || route.startsWith('/products/')
          ? 0.7
          : 0.8,
  }));
}
