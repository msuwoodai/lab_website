import { ArrowRight, CheckCircle2, MousePointerClick } from 'lucide-react';

import { Container } from '@/components/site/container';
import { EmptyState } from '@/components/site/empty-state';
import Link from '@/components/site/full-page-link';
import { PageHero } from '@/components/site/page-hero';
import { ProductCard } from '@/components/site/product-card';
import { SectionHeading } from '@/components/site/section-heading';
import { products } from '@/data/products';
import { siteConfig } from '@/data/site';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata(
  'Products',
  `Explore and try AI models, research prototypes, and software products from ${siteConfig.labName}.`,
);

export default function ProductsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Products"
        title="Explore and try our AI models"
        description="A public catalog of MSU Wood AI models, research prototypes, and software tools—with direct trial access when each product is ready."
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Model catalog"
              title="Research translated into usable products"
              description="Try available research prototypes and review their intended uses, outputs, and limitations."
            />
            <div className="flex max-w-md items-start gap-3 border-l-2 border-accent pl-4 text-sm leading-6 text-muted-foreground">
              <MousePointerClick
                className="mt-0.5 size-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <p>
                Select “Try this model” to open an available trial, review its
                limitations, and submit a supported input.
              </p>
            </div>
          </div>

          {products.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-12">
              <EmptyState
                title="Product catalog coming soon"
                description="MSU Wood AI models and public trials will appear here as they become ready for use."
              />
            </div>
          )}
        </Container>
      </section>

      <section className="border-y border-border bg-secondary/60 py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
          <SectionHeading
            eyebrow="Responsible access"
            title="What visitors should know before trying a model"
            description="Each product listing is designed to provide the context needed to use a research model thoughtfully."
          />
          <ol className="divide-y divide-border border-y border-border">
            {[
              [
                'Understand the purpose',
                'Review the model’s intended use, supported inputs, and the problem it was designed to address.',
              ],
              [
                'Check the limitations',
                'Read the version, known constraints, and any guidance about appropriate interpretation of outputs.',
              ],
              [
                'Open the trial',
                'Use the verified trial link to interact with the product, then follow its citation and feedback guidance.',
              ],
            ].map(([title, description], index) => (
              <li
                key={title}
                className="grid gap-4 py-6 sm:grid-cols-[3rem_1fr]"
              >
                <span className="grid size-10 place-items-center bg-primary font-heading text-sm font-bold text-primary-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-heading text-xl font-semibold">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 bg-primary px-6 py-10 text-primary-foreground sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 text-accent">
                <CheckCircle2 className="size-5" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.2em]">
                  Product releases
                </p>
              </div>
              <h2 className="mt-4 font-heading text-3xl leading-tight font-semibold tracking-[-0.025em] sm:text-4xl">
                Additional models will be added as trials become ready
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-primary-foreground/80">
                Each release can include a public demo, usage notes,
                documentation, version information, and a citation.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-11 w-fit items-center justify-center gap-2 bg-primary-foreground px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary-foreground/90 focus-visible:outline-primary-foreground"
            >
              Ask about a product
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
