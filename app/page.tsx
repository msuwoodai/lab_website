import { ArrowRight, BookOpenText } from 'lucide-react';
import Image from 'next/image';

import { Container } from '@/components/site/container';
import { EmptyState } from '@/components/site/empty-state';
import Link from '@/components/site/full-page-link';
import { LinkButton } from '@/components/site/link-button';
import { NewsCard } from '@/components/site/news-card';
import { PersonCard } from '@/components/site/person-card';
import { ProductCard } from '@/components/site/product-card';
import { ProjectCard } from '@/components/site/project-card';
import { PublicationItem } from '@/components/site/publication-item';
import { ResearchAreaCard } from '@/components/site/research-area-card';
import { SectionHeading } from '@/components/site/section-heading';
import { publishedNewsItems } from '@/data/news';
import { currentResearchers, principalInvestigator } from '@/data/people';
import { products } from '@/data/products';
import { featuredProjects } from '@/data/projects';
import { featuredPublications } from '@/data/publications';
import { researchAreas } from '@/data/research';
import { siteConfig } from '@/data/site';

export default function Home() {
  return (
    <main id="main-content">
      <section className="relative overflow-hidden border-b border-border bg-secondary/35">
        <Container className="grid items-stretch gap-10 py-10 lg:min-h-[calc(100svh-5.25rem)] lg:grid-cols-[1.04fr_0.96fr] lg:gap-14 lg:py-14">
          <div className="flex max-w-3xl flex-col justify-center py-5 lg:py-10">
            <p className="mb-6 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-primary sm:text-xs">
              Mississippi State University · Department of Sustainable
              Bioproducts
            </p>
            <h1 className="font-heading text-[clamp(3.2rem,7vw,6.7rem)] leading-[0.92] font-semibold tracking-[-0.042em] text-balance">
              {siteConfig.labName}
            </h1>
            <p className="mt-6 max-w-2xl font-heading text-xl leading-7 font-medium text-primary sm:text-2xl sm:leading-8">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 text-base font-semibold text-foreground sm:text-lg">
              A research laboratory at {siteConfig.university}
            </p>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              {siteConfig.department}
            </p>
            <p className="mt-8 max-w-2xl border-l-2 border-primary pl-5 text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
              {siteConfig.mission}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/research">
                Explore our research
                <ArrowRight aria-hidden="true" />
              </LinkButton>
              <LinkButton href="/products" variant="outline">
                Try our AI tools
              </LinkButton>
            </div>
            <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3">
              <div className="bg-background px-4 py-4 sm:px-5">
                <dt className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  Computer vision
                </dt>
                <dd className="mt-2 text-xs font-bold uppercase tracking-[0.1em] text-foreground">
                  Classification &amp; detection
                </dd>
              </div>
              <div className="bg-background px-4 py-4 sm:px-5">
                <dt className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  Wood &amp; bioproducts
                </dt>
                <dd className="mt-2 text-xs font-bold uppercase tracking-[0.1em] text-foreground">
                  Materials intelligence
                </dd>
              </div>
              <div className="col-span-2 bg-background px-4 py-4 sm:col-span-1 sm:px-5">
                <dt className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  Industry partnerships
                </dt>
                <dd className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                  Applied research
                </dd>
              </div>
            </dl>
          </div>

          <figure className="relative min-h-[30rem] overflow-hidden bg-primary lg:min-h-[43rem]">
            <Image
              src="/products/tree-ring-input-example.webp"
              alt="Wood cross-section with visible growth rings used for computer-vision research"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              className="pointer-events-none absolute inset-4 border border-white/45 sm:inset-6"
              aria-hidden="true"
            />
            <div className="absolute top-6 left-6 bg-background px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-primary shadow-sm sm:top-8 sm:left-8">
              Wood science · Computer vision
            </div>
            <figcaption className="absolute right-0 bottom-0 left-0 bg-primary/95 px-6 py-5 text-primary-foreground sm:px-8 sm:py-6">
              <p className="font-heading text-xl font-semibold sm:text-2xl">
                Turning wood imagery into measurable data
              </p>
              <p className="mt-1.5 text-xs leading-5 text-primary-foreground/75 sm:text-sm">
                Applied research in classification, assessment, and automated
                analysis
              </p>
            </figcaption>
          </figure>
        </Container>
      </section>

      <section
        className="border-b border-border bg-secondary/70 py-10 sm:py-12"
        aria-labelledby="university-affiliation-heading"
      >
        <Container className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              University affiliation
            </p>
            <h2
              id="university-affiliation-heading"
              className="mt-3 font-heading text-2xl leading-tight font-semibold tracking-[-0.02em] sm:text-3xl"
            >
              A research laboratory at Mississippi State University
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
              {siteConfig.affiliationStatement}
            </p>
          </div>
          <div className="border-t border-border pt-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
            <Image
              src={siteConfig.departmentLogo}
              alt="Mississippi State University Department of Sustainable Bioproducts"
              width={617}
              height={116}
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="h-auto w-full max-w-[38rem]"
            />
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-background py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Products"
              title="AI models people can explore and try"
              description="Explore public models and software products developed from the lab’s research."
            />
            <Link
              href="/products"
              className="inline-flex w-fit items-center gap-2 text-sm font-bold text-primary underline decoration-primary/35 underline-offset-4 hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View all products
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          {products.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-12">
              <EmptyState
                title="Product catalog coming soon"
                description="MSU Wood AI models and public trials will appear here as they become ready."
              />
            </div>
          )}
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Research directions"
              title="Questions that organize our work"
              description="Explore the major themes, questions, and methods that connect the lab’s research program."
            />
            <Link
              href="/research"
              className="inline-flex w-fit items-center gap-2 text-sm font-bold text-primary underline decoration-primary/35 underline-offset-4 hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Full research overview
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          {researchAreas.length ? (
            <div className="mt-12 grid gap-x-8 gap-y-2 sm:grid-cols-2 xl:grid-cols-4">
              {researchAreas.map((area, index) => (
                <ResearchAreaCard key={area.id} area={area} index={index} />
              ))}
            </div>
          ) : (
            <div className="mt-12">
              <EmptyState
                title="Research overview coming soon"
                description="The lab’s confirmed research directions will be added here."
              />
            </div>
          )}
        </Container>
      </section>

      <section className="bg-primary py-20 text-primary-foreground sm:py-24 lg:py-28">
        <Container>
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Featured work
              </p>
              <h2 className="mt-4 font-heading text-3xl leading-[1.1] font-semibold tracking-[-0.025em] text-balance sm:text-4xl lg:text-[2.8rem]">
                Current projects and research in progress
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-primary-foreground/75 sm:text-lg sm:leading-8">
                {siteConfig.isTemplate
                  ? 'Project records are ready for real motivations, methods, team members, and verified outcomes.'
                  : 'Explore selected ongoing and completed work from across the lab.'}
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex w-fit items-center gap-2 text-sm font-bold text-primary-foreground underline decoration-accent underline-offset-4 hover:decoration-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
            >
              View all projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          {featuredProjects.length ? (
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featuredProjects.slice(0, 3).map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  priority={index === 0}
                />
              ))}
            </div>
          ) : (
            <div className="mt-12">
              <EmptyState
                title="No featured projects yet"
                description="Featured project records will appear here once they are available."
              />
            </div>
          )}
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Selected publications"
              title="Recent scholarly work"
              description={
                featuredPublications.some(
                  (publication) => publication.isPlaceholder,
                )
                  ? 'Publication records are grouped and rendered from one typed data file, ready for verified citations and paper links.'
                  : 'A selection of recent publications by Dr. Jason Tyler Street.'
              }
            />
            {featuredPublications.some(
              (publication) => publication.isPlaceholder,
            ) ? (
              <div className="mt-8 flex items-center gap-3 border-l-2 border-accent pl-4 text-sm leading-6 text-muted-foreground">
                <BookOpenText
                  className="size-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <p>
                  Placeholder citations are clearly marked and should not be
                  published.
                </p>
              </div>
            ) : null}
            <LinkButton href="/publications" variant="outline" className="mt-8">
              View all publications
            </LinkButton>
          </div>
          <div>
            {featuredPublications.length ? (
              featuredPublications
                .slice(0, 3)
                .map((publication) => (
                  <PublicationItem
                    key={publication.id}
                    publication={publication}
                  />
                ))
            ) : (
              <EmptyState
                title="No featured publications yet"
                description="Verified citations will appear here once they are added."
              />
            )}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-secondary/60 py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="People"
              title="A collaborative research community"
              description="Profiles support the links and research details commonly needed by faculty, students, alumni, and prospective collaborators."
            />
            <Link
              href="/people"
              className="inline-flex w-fit items-center gap-2 text-sm font-bold text-primary underline decoration-primary/35 underline-offset-4 hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Meet everyone
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          {principalInvestigator || currentResearchers.length ? (
            <div
              className={`mt-12 grid gap-8 ${
                principalInvestigator && currentResearchers.length
                  ? 'xl:grid-cols-[1.15fr_1fr]'
                  : ''
              }`}
            >
              {principalInvestigator ? (
                <PersonCard person={principalInvestigator} featured />
              ) : null}
              {currentResearchers.length ? (
                <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3 xl:gap-5">
                  {currentResearchers.slice(0, 3).map((person) => (
                    <PersonCard key={person.id} person={person} />
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="mt-12">
              <EmptyState
                title="Team profiles coming soon"
                description="Confirmed lab-member profiles will be added here."
              />
            </div>
          )}
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Lab notes"
              title="News and recent activity"
              description={
                siteConfig.isTemplate
                  ? 'Use these records for confirmed publications, student achievements, presentations, projects, and outreach.'
                  : 'Recent publications, presentations, achievements, projects, and outreach from the lab.'
              }
            />
            <Link
              href="/news"
              className="inline-flex w-fit items-center gap-2 text-sm font-bold text-primary underline decoration-primary/35 underline-offset-4 hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              All updates
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          {publishedNewsItems.length ? (
            <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-7">
              {publishedNewsItems.slice(0, 3).map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="mt-12">
              <EmptyState
                title="No lab updates yet"
                description="Confirmed news and recent activity will appear here."
              />
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
