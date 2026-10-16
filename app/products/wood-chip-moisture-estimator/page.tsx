import {
  ArrowLeft,
  CircleAlert,
  FileImage,
  LockKeyhole,
  Microscope,
} from 'lucide-react';

import { WoodChipMoistureEstimator } from '@/components/products/wood-chip-moisture-estimator';
import { Container } from '@/components/site/container';
import Link from '@/components/site/full-page-link';
import { PageHero } from '@/components/site/page-hero';
import { createPageMetadata } from '@/lib/metadata';

const productTitle = 'Wood Chip Moisture Content Estimator';

export const metadata = createPageMetadata(
  productTitle,
  'Try the MSU Wood AI image-based wood-chip moisture content estimation research prototype.',
);

export default function WoodChipMoistureEstimatorPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Products · Moisture estimation"
        title={productTitle}
        description="Upload a supported wood-chip image to receive the model’s estimated moisture content as a percentage."
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to all products
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:items-start">
            <WoodChipMoistureEstimator />

            <aside className="space-y-8" aria-label="Model information">
              <section className="border-t-4 border-primary bg-secondary/60 p-6">
                <div className="flex items-center gap-3 text-primary">
                  <Microscope className="size-5" aria-hidden="true" />
                  <h2 className="font-heading text-2xl font-semibold">
                    Research prototype
                  </h2>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  This tool demonstrates an image-based regression model. Its
                  output is an experimental estimate and is not a laboratory or
                  instrument measurement of moisture content.
                </p>
              </section>

              <section className="border border-border bg-card p-6">
                <h2 className="font-heading text-2xl font-semibold">
                  Trial details
                </h2>
                <dl className="mt-5 divide-y divide-border border-y border-border text-sm">
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="text-muted-foreground">Model task</dt>
                    <dd className="font-semibold">Image regression</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="text-muted-foreground">Output</dt>
                    <dd className="font-semibold">Moisture content (%)</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="text-muted-foreground">Selected image</dt>
                    <dd className="font-semibold">Up to 50 MB</dd>
                  </div>
                </dl>
              </section>

              <section className="border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <CircleAlert
                    className="size-5 text-primary"
                    aria-hidden="true"
                  />
                  <h2 className="font-heading text-2xl font-semibold">
                    Current limitations
                  </h2>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Lighting, background, camera position, chip appearance, and
                  differences from the training data can affect the estimate.
                  The model has not been validated for every material or image
                  capture condition.
                </p>
              </section>

              <section className="border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <LockKeyhole
                    className="size-5 text-primary"
                    aria-hidden="true"
                  />
                  <h2 className="font-heading text-2xl font-semibold">
                    Image handling
                  </h2>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  A resized and compressed copy is sent to the MSU Wood AI
                  prediction service for this request. Your original stays on
                  your device, and the lab application does not save the copy
                  after the request completes.
                </p>
              </section>

              <section className="flex gap-4 border-l-2 border-accent pl-5">
                <FileImage
                  className="mt-0.5 size-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <div>
                  <h2 className="text-sm font-bold">Supported files</h2>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Use a clear JPEG, PNG, or WebP image up to 50 MB. Your
                    browser prepares a copy no larger than 1504 pixels per side
                    and under 4 MB before upload.
                  </p>
                </div>
              </section>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
