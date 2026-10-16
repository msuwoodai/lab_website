import { ArrowRight, CircleHelp, Wrench } from 'lucide-react';
import Image from 'next/image';

import { Container } from '@/components/site/container';
import { EmptyState } from '@/components/site/empty-state';
import Link from '@/components/site/full-page-link';
import { LinkButton } from '@/components/site/link-button';
import { PageHero } from '@/components/site/page-hero';
import { Tag } from '@/components/site/tag';
import { researchPageContent } from '@/data/pages';
import { publishedProjects } from '@/data/projects';
import { publications } from '@/data/publications';
import { researchAreas } from '@/data/research';
import { siteConfig } from '@/data/site';
import { cn } from '@/lib/utils';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata(
  'Research',
  `Explore the major research directions, questions, methods, projects, and publications of ${siteConfig.labName}.`,
);

export default function ResearchPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Research"
        title="A connected program of scholarly inquiry"
        description={researchPageContent.heroDescription}
      />

      <section className="py-14 sm:py-18">
        <Container className="grid gap-8 border-b border-border pb-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {researchPageContent.frameworkLabel}
          </p>
          <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
            {researchPageContent.framework.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <div>
        {researchAreas.length ? researchAreas.map((area, index) => {
          const hasQuestions = Boolean(area.questions?.length);
          const hasMethods = Boolean(area.methods?.length);
          const relatedProjects = publishedProjects.filter((project) =>
            area.relatedProjects?.includes(project.id),
          );
          const relatedPublications = publications.filter((publication) =>
            area.relatedPublications?.includes(publication.id),
          );

          return (
            <section
              key={area.id}
              id={area.id}
              className="scroll-mt-28 border-b border-border py-20 sm:py-24 lg:py-28 odd:bg-secondary/35"
            >
              <Container>
                <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-18">
                  <div className={index % 2 === 1 ? 'lg:order-2' : undefined}>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs font-bold text-primary">
                        AREA {String(index + 1).padStart(2, '0')}
                      </span>
                      {area.isPlaceholder ? <Tag>Placeholder content</Tag> : null}
                    </div>
                    <h2 className="mt-6 font-heading text-3xl leading-tight font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                      {area.title}
                    </h2>
                    <div className="mt-7 max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
                      {area.description.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {area.topics?.length ? (
                      <ul
                        className="mt-8 flex flex-wrap gap-2"
                        aria-label={`${area.title} topics`}
                      >
                        {area.topics.map((topic) => (
                          <li key={topic}>
                            <Tag>{topic}</Tag>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  <div className={index % 2 === 1 ? 'lg:order-1' : undefined}>
                    {area.image ? (
                      <div className="relative aspect-[10/7] overflow-hidden border border-border bg-muted">
                        <Image
                          src={area.image}
                          alt={area.imageAlt ?? ''}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    {hasQuestions || hasMethods ? (
                      <div
                        className={cn(
                          'grid gap-px border-x border-b border-border bg-border',
                          !area.image && 'border-t',
                          hasQuestions && hasMethods && 'sm:grid-cols-2',
                        )}
                      >
                        {hasQuestions ? (
                          <div className="bg-background p-6">
                            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                              <CircleHelp className="size-4" aria-hidden="true" />
                              Questions
                            </h3>
                            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                              {area.questions?.map((question) => (
                                <li
                                  key={question}
                                  className="border-l border-accent pl-3"
                                >
                                  {question}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        {hasMethods ? (
                          <div className="bg-background p-6">
                            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                              <Wrench className="size-4" aria-hidden="true" />
                              Methods
                            </h3>
                            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                              {area.methods?.map((method) => (
                                <li key={method}>{method}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>

                {relatedProjects.length || relatedPublications.length ? (
                  <div className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-2">
                    {relatedProjects.length ? (
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                          Related projects
                        </h3>
                        <ul className="mt-4 space-y-3">
                          {relatedProjects.map((project) => (
                            <li key={project.id}>
                              <Link
                                href={`/projects/${project.slug}`}
                                className="inline-flex items-center gap-2 font-heading text-lg font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                {project.title}
                                <ArrowRight className="size-4" aria-hidden="true" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {relatedPublications.length ? (
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                          Related publications
                        </h3>
                        <ul className="mt-4 space-y-3">
                          {relatedPublications.map((publication) => (
                            <li
                              key={publication.id}
                              className="text-sm leading-6 text-foreground"
                            >
                              {publication.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </Container>
            </section>
          );
        }) : (
          <section className="py-20 sm:py-24">
            <Container>
              <h2 className="sr-only">Research areas</h2>
              <EmptyState
                title="Research overview coming soon"
                description="The lab’s confirmed research directions will be added here."
              />
            </Container>
          </section>
        )}
      </div>

      {researchPageContent.collaboration ? (
        <section className="py-20 sm:py-24">
          <Container>
            <div className="grid gap-9 bg-primary px-6 py-10 text-primary-foreground sm:px-10 sm:py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  {researchPageContent.collaboration.eyebrow}
                </p>
                <h2 className="mt-4 font-heading text-3xl font-semibold tracking-[-0.025em]">
                  {researchPageContent.collaboration.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-primary-foreground/80">
                  {researchPageContent.collaboration.description}
                </p>
              </div>
              <LinkButton
                href="/contact"
                variant="secondary"
                className="w-fit bg-primary-foreground text-primary hover:bg-primary-foreground/90 focus-visible:outline-primary-foreground"
              >
                {researchPageContent.collaboration.ctaLabel}
              </LinkButton>
            </div>
          </Container>
        </section>
      ) : null}
    </main>
  );
}
