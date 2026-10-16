import { Container } from '@/components/site/container';
import { EmptyState } from '@/components/site/empty-state';
import { NewsCard } from '@/components/site/news-card';
import { PageHero } from '@/components/site/page-hero';
import { SectionHeading } from '@/components/site/section-heading';
import { publishedNewsItems } from '@/data/news';
import { siteConfig } from '@/data/site';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata(
  'News',
  `News, publications, presentations, awards, projects, and student achievements from ${siteConfig.labName}.`,
);

export default function NewsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="News"
        title="Updates from the lab"
        description={
          siteConfig.isTemplate
            ? 'Use this page for verified research, student, conference, award, outreach, and community updates. Items should remain concise and newest-first.'
            : 'Research, student, conference, award, outreach, and community updates from the lab.'
        }
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Archive"
            title="Latest updates"
            description={
              siteConfig.isTemplate
                ? 'News records are listed in newest-first order. Replace each marked item with a confirmed date, category, summary, and approved image.'
                : 'The latest confirmed activity from the lab, listed newest first.'
            }
          />
          {publishedNewsItems.length ? (
            <div className="mt-12 grid gap-x-7 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
              {publishedNewsItems.map((item) => (
                <NewsCard key={item.id} item={item} showContent />
              ))}
            </div>
          ) : (
            <div className="mt-10">
              <EmptyState
                title="No lab updates yet"
                description="Add a verified item in data/news.ts when the lab has news to share."
              />
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
