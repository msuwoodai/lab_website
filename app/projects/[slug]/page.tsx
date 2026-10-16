import type { Metadata } from 'next';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Container } from '@/components/site/container';
import Link from '@/components/site/full-page-link';
import { PublicationItem } from '@/components/site/publication-item';
import { Tag } from '@/components/site/tag';
import { people } from '@/data/people';
import { getProjectBySlug, publishedProjects } from '@/data/projects';
import { publications } from '@/data/publications';
import { cn } from '@/lib/utils';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project not found' };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [],
    },
    twitter: {
      card: 'summary',
      title: project.title,
      description: project.shortDescription,
      images: [],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const timeline = project.startYear
    ? project.endYear
      ? `${project.startYear}–${project.endYear}`
      : project.status === 'current'
        ? `${project.startYear}–present`
        : String(project.startYear)
    : null;
  const team = people.filter((person) => project.people?.includes(person.id));
  const relatedPublications = publications.filter((publication) =>
    project.publicationIds?.includes(publication.id),
  );
  const externalLinks = [
    project.repositoryUrl
      ? { label: 'Repository', href: project.repositoryUrl }
      : null,
    project.demoUrl ? { label: 'Demo', href: project.demoUrl } : null,
    project.externalUrl
      ? { label: 'Project website', href: project.externalUrl }
      : null,
  ].filter((link): link is { label: string; href: string } => Boolean(link));

  return (
    <main id="main-content">
      <section className="border-b border-border bg-secondary/50 py-14 sm:py-18 lg:py-22">
        <Container>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All projects
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Tag>{project.status}</Tag>
                {project.isPlaceholder ? <Tag>Placeholder project</Tag> : null}
              </div>
              <h1 className="mt-6 font-heading text-4xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                {project.shortDescription}
              </p>
              {project.tags?.length ? (
                <ul className="mt-7 flex flex-wrap gap-2" aria-label="Project tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <dl
              className={cn(
                'grid gap-px border border-border bg-border',
                (timeline || project.funding) && 'sm:grid-cols-2',
              )}
            >
              <div className="bg-background p-5">
                <dt className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Status
                </dt>
                <dd className="mt-2 font-heading text-xl font-semibold capitalize">
                  {project.status}
                </dd>
              </div>
              {timeline ? (
                <div className="bg-background p-5">
                  <dt className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    Timeline
                  </dt>
                  <dd className="mt-2 font-heading text-xl font-semibold">
                    {timeline}
                  </dd>
                </div>
              ) : null}
              {project.funding ? (
                <div className="bg-background p-5 sm:col-span-2">
                  <dt className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    Funding
                  </dt>
                  <dd className="mt-2 text-sm leading-6 font-semibold">
                    {project.funding}
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          {project.image ? (
            <div className="relative aspect-[3/2] max-h-[48rem] overflow-hidden border border-border bg-muted">
              <Image
                src={project.image}
                alt={project.imageAlt ?? ''}
                fill
                priority
                sizes="(max-width: 1440px) 100vw, 1408px"
                className="object-cover"
              />
            </div>
          ) : null}
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Project record
            </p>
            <nav aria-label="On this page" className="mt-5">
              <ul className="space-y-3 text-sm font-semibold text-muted-foreground">
                <li>
                  <a href="#overview" className="hover:text-primary">
                    Overview
                  </a>
                </li>
                {project.problem ? (
                  <li>
                    <a href="#problem" className="hover:text-primary">
                      Problem and motivation
                    </a>
                  </li>
                ) : null}
                {project.approach ? (
                  <li>
                    <a href="#approach" className="hover:text-primary">
                      Research approach
                    </a>
                  </li>
                ) : null}
                {project.methods?.length ? (
                  <li>
                    <a href="#methods" className="hover:text-primary">
                      Methods and system
                    </a>
                  </li>
                ) : null}
                {team.length ? (
                  <li>
                    <a href="#team" className="hover:text-primary">
                      Team
                    </a>
                  </li>
                ) : null}
                {relatedPublications.length ? (
                  <li>
                    <a href="#publications" className="hover:text-primary">
                      Publications
                    </a>
                  </li>
                ) : null}
              </ul>
            </nav>
          </aside>

          <div className="space-y-14">
            <section id="overview" className="scroll-mt-28">
              <h2 className="font-heading text-3xl font-semibold tracking-[-0.025em]">
                Overview
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground">
                {project.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            {project.problem ? (
              <section id="problem" className="scroll-mt-28 border-t border-border pt-10">
                <h2 className="font-heading text-3xl font-semibold tracking-[-0.025em]">
                  Problem and motivation
                </h2>
                <p className="mt-6 text-base leading-8 text-muted-foreground">
                  {project.problem}
                </p>
              </section>
            ) : null}

            {project.approach ? (
              <section id="approach" className="scroll-mt-28 border-t border-border pt-10">
                <h2 className="font-heading text-3xl font-semibold tracking-[-0.025em]">
                  Research approach
                </h2>
                <p className="mt-6 text-base leading-8 text-muted-foreground">
                  {project.approach}
                </p>
              </section>
            ) : null}

            {project.methods?.length ? (
              <section id="methods" className="scroll-mt-28 border-t border-border pt-10">
                <h2 className="font-heading text-3xl font-semibold tracking-[-0.025em]">
                  Methods and system
                </h2>
                <ul className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2">
                  {project.methods.map((method, index) => (
                    <li key={method} className="bg-background p-5">
                      <span className="font-mono text-xs text-primary">
                        0{index + 1}
                      </span>
                      <p className="mt-3 font-semibold">{method}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {project.outcomes?.length ? (
              <section className="border-t border-border pt-10">
                <h2 className="font-heading text-3xl font-semibold tracking-[-0.025em]">
                  Results and outcomes
                </h2>
                <ul className="mt-6 list-disc space-y-3 pl-5 text-base leading-8 text-muted-foreground">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {team.length ? (
              <section id="team" className="scroll-mt-28 border-t border-border pt-10">
                <h2 className="font-heading text-3xl font-semibold tracking-[-0.025em]">
                  Team
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {team.map((person) => (
                    <li key={person.id} className="border border-border p-5">
                      <p className="font-heading text-lg font-semibold">
                        {person.name}
                      </p>
                      {person.title ?? person.program ? (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {person.title ?? person.program}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {relatedPublications.length ? (
              <section
                id="publications"
                className="scroll-mt-28 border-t border-border pt-10"
              >
                <h2 className="font-heading text-3xl font-semibold tracking-[-0.025em]">
                  Related publications
                </h2>
                <div className="mt-5">
                  {relatedPublications.map((publication) => (
                    <PublicationItem
                      key={publication.id}
                      publication={publication}
                    />
                  ))}
                </div>
              </section>
            ) : null}

            {externalLinks.length ? (
              <section className="border-t border-border pt-10">
                <h2 className="font-heading text-3xl font-semibold tracking-[-0.025em]">
                  Project links
                </h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  {externalLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="inline-flex min-h-11 items-center gap-2 border border-border px-4 text-sm font-semibold text-primary hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {link.label}
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </Container>
      </section>
    </main>
  );
}
