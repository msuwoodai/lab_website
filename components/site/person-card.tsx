import { ExternalLink, GraduationCap, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

import { Tag } from '@/components/site/tag';
import { isPlaceholderValue } from '@/lib/content';
import type { Person } from '@/types';

interface PersonCardProps {
  person: Person;
  featured?: boolean;
}

export function PersonCard({ person, featured = false }: PersonCardProps) {
  const hasRealEmail = person.email && !isPlaceholderValue(person.email);
  const profileLinks = [
    person.linkedin ? { label: 'LinkedIn', href: person.linkedin } : null,
    person.website
      ? { label: person.websiteLabel ?? 'Website', href: person.website }
      : null,
    person.googleScholar
      ? { label: 'Google Scholar', href: person.googleScholar }
      : null,
    person.github ? { label: 'GitHub', href: person.github } : null,
    person.orcid ? { label: 'ORCID', href: person.orcid } : null,
  ].filter((link): link is { label: string; href: string } => Boolean(link));

  return (
    <article
      className={
        featured
          ? person.image
            ? 'grid gap-7 border border-border bg-card p-5 sm:grid-cols-[13rem_1fr] sm:p-7'
            : 'border border-border bg-card p-6 sm:p-8'
          : 'flex h-full flex-col'
      }
    >
      {person.image ? (
        <div className={featured ? undefined : 'w-full sm:w-[13rem]'}>
          <div className="relative aspect-[4/5] overflow-hidden bg-muted">
            <Image
              src={person.image}
              alt={
                person.imageAlt ??
                (person.isPlaceholder
                  ? `Profile placeholder for ${person.name}`
                  : `${person.name}${person.title ? `, ${person.title}` : ''}`)
              }
              fill
              sizes={featured ? '208px' : '(max-width: 639px) 100vw, 208px'}
              className="object-cover object-top"
            />
          </div>
          {person.imageCredit ? (
            <p className="mt-2 text-[0.65rem] leading-4 text-muted-foreground">
              {person.imageCredit}
            </p>
          ) : null}
        </div>
      ) : null}
      <div
        className={
          featured
            ? person.image
              ? 'min-w-0 self-start'
              : undefined
            : `flex flex-1 flex-col ${person.image ? 'pt-5' : ''}`
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          {person.isPlaceholder ? <Tag>Placeholder profile</Tag> : null}
        </div>
        <h3 className="mt-4 font-heading text-2xl leading-tight font-semibold tracking-[-0.02em]">
          {person.name}
        </h3>
        {(person.title ?? person.program) ? (
          <p className="mt-2 text-sm font-semibold text-primary">
            {person.title ?? person.program}
          </p>
        ) : null}
        {person.bio ? (
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            {person.bio}
          </p>
        ) : null}
        {person.researchInterests?.length ? (
          <ul
            className="mt-4 flex flex-wrap gap-2"
            aria-label="Research interests"
          >
            {person.researchInterests.map((interest) => (
              <li key={interest}>
                <Tag>{interest}</Tag>
              </li>
            ))}
          </ul>
        ) : null}
        {featured && person.education?.length ? (
          <div className="mt-5 border-t border-border pt-5">
            <h4 className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              <GraduationCap
                className="size-4 text-primary"
                aria-hidden="true"
              />
              Education
            </h4>
            <ul className="mt-3 space-y-1.5 text-xs leading-5 text-muted-foreground">
              {person.education.map((credential) => (
                <li key={credential}>{credential}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-4">
          {hasRealEmail ? (
            <a
              href={`mailto:${person.email}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Mail className="size-4" aria-hidden="true" /> Email
            </a>
          ) : null}
          {person.email && !hasRealEmail ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
              <Mail className="size-4" aria-hidden="true" /> {person.email}
            </span>
          ) : null}
          {person.phone ? (
            <a
              href={`tel:${person.phone.replace(/[^\d+]/g, '')}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Phone className="size-4" aria-hidden="true" /> {person.phone}
            </a>
          ) : null}
          {person.office ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
              <MapPin className="size-4" aria-hidden="true" /> {person.office}
            </span>
          ) : null}
          {profileLinks.length ? (
            <div className="flex w-full flex-col items-start gap-2">
              {profileLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
