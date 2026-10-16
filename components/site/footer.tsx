import Image from 'next/image';

import { Container } from '@/components/site/container';
import Link from '@/components/site/full-page-link';
import { navigation, siteConfig } from '@/data/site';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-primary text-primary-foreground">
      <Container className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr] lg:py-16">
        <div className="max-w-md">
          <p className="font-heading text-xl font-semibold">
            {siteConfig.labName}
          </p>
          <p className="mt-2 text-sm italic text-primary-foreground/85">
            {siteConfig.tagline}
          </p>
          <p className="mt-4 text-sm font-bold text-primary-foreground">
            {siteConfig.university}
          </p>
          <p className="mt-1 text-xs italic text-primary-foreground/75">
            {siteConfig.department}
          </p>
        </div>

        <nav aria-labelledby="footer-navigation-heading">
          <h2
            id="footer-navigation-heading"
            className="text-xs font-bold uppercase tracking-[0.18em] text-accent"
          >
            Navigate
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  className="text-primary-foreground/75 underline-offset-4 transition-colors hover:text-primary-foreground hover:underline"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
            Contact
          </h2>
          <div className="mt-5 space-y-2 text-sm leading-6 text-primary-foreground/75">
            <p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="underline decoration-primary-foreground/35 underline-offset-4 transition-colors hover:text-primary-foreground hover:decoration-primary-foreground"
              >
                {siteConfig.email}
              </a>
            </p>
            <p>{siteConfig.location}</p>
            <Link
              className="inline-block pt-2 font-semibold text-primary-foreground underline decoration-accent underline-offset-4"
              href="/contact"
            >
              Contact information
            </Link>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/15">
        <Container className="grid gap-7 py-8 md:grid-cols-[17rem_1fr] md:items-center md:gap-10">
          <Image
            src={siteConfig.universityLogoWhite}
            alt="Mississippi State University"
            width={333}
            height={61}
            sizes="272px"
            className="h-auto w-full max-w-[17rem]"
          />
          <div className="border-t border-white/20 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-10">
            <p className="text-sm font-semibold text-primary-foreground">
              {siteConfig.department}
            </p>
          </div>
        </Container>
      </div>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs leading-5 text-primary-foreground/75 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.labName}.
          </p>
        </Container>
      </div>
    </footer>
  );
}
