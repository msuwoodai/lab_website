'use client';

import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Container } from '@/components/site/container';
import Link from '@/components/site/full-page-link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { navigation, siteConfig } from '@/data/site';
import { cn } from '@/lib/utils';

function isCurrentPath(pathname: string, href: string) {
  return href === '/'
    ? pathname === '/'
    : pathname === href || pathname.startsWith(`${href}/`);
}

function BrandLockup({
  compact = false,
  inverse = false,
}: {
  compact?: boolean;
  inverse?: boolean;
}) {
  return (
    <span className="flex min-w-0 items-center">
      <span
        className={cn(
          'shrink-0 font-heading leading-none font-semibold tracking-[-0.055em]',
          compact ? 'text-[1.65rem]' : 'text-[1.8rem] sm:text-[2.25rem]',
          inverse ? 'text-primary-foreground' : 'text-primary',
        )}
      >
        MSU
      </span>
      <span
        className={cn(
          'mx-2.5 h-9 w-px shrink-0 bg-border sm:mx-3.5 sm:h-11',
          compact && 'mx-2.5 h-9',
          inverse && 'bg-primary-foreground/30',
        )}
        aria-hidden="true"
      />
      <span className="min-w-0 leading-tight">
        <span
          className={cn(
            'block font-heading font-semibold tracking-[0.08em]',
            compact ? 'text-sm' : 'text-[0.78rem] sm:text-[0.98rem]',
            inverse ? 'text-primary-foreground' : 'text-foreground',
          )}
        >
          WOOD AI
        </span>
        <span
          className={cn(
            'mt-0.5 block font-medium',
            compact
              ? 'text-[0.62rem]'
              : 'max-w-[10.5rem] text-[0.54rem] sm:max-w-none sm:text-[0.68rem]',
            inverse
              ? 'text-primary-foreground/75'
              : 'text-muted-foreground',
          )}
        >
          {siteConfig.university}
        </span>
      </span>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/15 bg-primary text-primary-foreground">
      <Container className="flex min-h-[5.25rem] items-center justify-between gap-3 py-2.5">
        <Link
          href="/"
          className="group min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-primary"
          aria-label={`${siteConfig.labName} home`}
        >
          <BrandLockup inverse />
        </Link>

        <nav aria-label="Primary navigation" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {navigation.map((item) => {
              const isCurrent = isCurrentPath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex h-10 items-center px-3 text-[0.78rem] font-semibold text-primary-foreground/75 transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary',
                      isCurrent &&
                        'text-primary-foreground after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-accent',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon-lg"
                className="size-11 rounded-sm border-white/35 bg-transparent text-primary-foreground hover:border-white/60 hover:bg-white/10 hover:text-primary-foreground focus-visible:border-primary-foreground focus-visible:ring-primary-foreground focus-visible:ring-offset-primary xl:hidden"
                aria-label="Open navigation menu"
              />
            }
          >
            <Menu aria-hidden="true" />
          </SheetTrigger>
          <SheetContent className="w-[min(90vw,25rem)] overflow-y-auto bg-background p-0">
            <SheetHeader className="border-b border-border px-6 py-6 pr-14 text-left">
              <SheetTitle className="sr-only">
                {siteConfig.labName} navigation
              </SheetTitle>
              <SheetDescription>
                <BrandLockup compact />
              </SheetDescription>
            </SheetHeader>
            <nav aria-label="Mobile navigation" className="px-3 py-4">
              <ul className="space-y-1">
                {navigation.map((item) => {
                  const isCurrent = isCurrentPath(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isCurrent ? 'page' : undefined}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'flex min-h-12 items-center border-l-2 border-transparent px-4 text-base font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                          isCurrent &&
                            'border-primary bg-primary/[0.06] text-primary',
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
