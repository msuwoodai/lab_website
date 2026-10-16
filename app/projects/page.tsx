import { Container } from '@/components/site/container';
import { EmptyState } from '@/components/site/empty-state';
import { PageHero } from '@/components/site/page-hero';
import { ProjectCard } from '@/components/site/project-card';
import { SectionHeading } from '@/components/site/section-heading';
import { publishedProjects } from '@/data/projects';
import { siteConfig } from '@/data/site';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata(
  'Projects',
  `Explore current and completed research projects from ${siteConfig.labName}.`,
);

export default function ProjectsPage() {
  const currentProjects = publishedProjects.filter(
    (project) => project.status === 'current',
  );
  const completedProjects = publishedProjects.filter(
    (project) => project.status === 'completed',
  );

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Projects"
        title="Research in progress and completed work"
        description={
          siteConfig.isTemplate
            ? 'Each project page supports motivation, approach, methods, team members, publications, and links—without requiring a database or CMS.'
            : 'Explore current research initiatives and an archive of completed work from the lab.'
        }
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Current"
            title="Active projects"
            description={
              siteConfig.isTemplate
                ? 'Replace these records with confirmed current work. No funding, partners, outcomes, or availability are implied by placeholder content.'
                : 'Ongoing investigations, collaborations, and research systems from across the lab.'
            }
          />
          {currentProjects.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {currentProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="mt-10">
              <EmptyState
                title="No current projects listed"
                description="Add a current project in data/projects.ts when the lab is ready to publish it."
              />
            </div>
          )}
        </Container>
      </section>

      {completedProjects.length ? (
        <section className="border-t border-border bg-secondary/40 py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Archive"
              title="Completed projects"
              description="Preserve a clear record of past work and link it to verified publications, datasets, or repositories when available."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {completedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </main>
  );
}
