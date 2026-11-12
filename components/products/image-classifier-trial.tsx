'use client';

import {
  CircleAlert,
  CircleCheck,
  Download,
  ImageUp,
  LoaderCircle,
  RotateCcw,
} from 'lucide-react';
import Image from 'next/image';
import {
  type ChangeEvent,
  type ReactNode,
  type SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Button } from '@/components/ui/button';
import {
  createImageOverlay,
  downloadImageFile,
} from '@/lib/client/download-image-overlay';
import {
  prepareImageUpload,
  type PreparedImageUpload,
} from '@/lib/client/prepare-image-upload';

const MAX_SELECTED_FILE_BYTES = 50 * 1024 * 1024;
const TARGET_UPLOAD_BYTES = Math.floor(3.75 * 1024 * 1024);
const MAX_IMAGE_DIMENSION = 1504;
const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

export interface ClassDefinition {
  key: string;
  label: string;
}

export interface ImageTrialExample {
  id: string;
  src: string;
  filename: string;
  alt: string;
  title: string;
  note?: string;
}

export interface LabeledImageExample extends ImageTrialExample {
  expectedClassKey: string;
  expectedClassLabel: string;
}

interface ImageClassifierTrialProps {
  endpoint: string;
  inputId: string;
  instructions: string;
  classes: readonly ClassDefinition[];
  examples?: readonly LabeledImageExample[];
}

interface ImageRegressionTrialProps {
  endpoint: string;
  inputId: string;
  instructions: string;
}

interface ImageSegmentationTrialProps {
  endpoint: string;
  inputId: string;
  instructions: string;
  examples?: readonly ImageTrialExample[];
}

interface ImageTrialProps<Result> {
  endpoint: string;
  inputId: string;
  instructions: string;
  submitLabel: string;
  submittingLabel: string;
  failureMessage: string;
  parseResult: (value: unknown) => Result | null;
  renderResult: (
    result: Result,
    previewUrl: string | null,
    selectedExample: ImageTrialExample | null,
  ) => ReactNode;
  examples?: readonly ImageTrialExample[];
}

interface PredictionResult {
  predicted_class: string;
  confidence: number;
  probabilities: Record<string, number>;
}

interface MoisturePredictionResult {
  predicted_moisture_percent: number;
  unit: 'percent';
}

interface TreeRingPredictionResult {
  model_id: 'tree-ring-boundary-generic';
  threshold: number;
  input_width: number;
  input_height: number;
  boundary_pixel_fraction: number;
  mask_data_url: string;
}

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 1,
});

function isProbability(value: unknown): value is number {
  return (
    typeof value === 'number' &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= 1
  );
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function parsePredictionResult(
  value: unknown,
  classes: readonly ClassDefinition[],
): PredictionResult | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const record = value as Record<string, unknown>;
  const probabilities = record.probabilities;
  const classKeys = classes.map((classDefinition) => classDefinition.key);

  if (
    typeof record.predicted_class !== 'string' ||
    !classKeys.includes(record.predicted_class) ||
    !isProbability(record.confidence) ||
    !probabilities ||
    typeof probabilities !== 'object'
  ) {
    return null;
  }

  const probabilityRecord = probabilities as Record<string, unknown>;

  if (
    Object.keys(probabilityRecord).length !== classKeys.length ||
    !classKeys.every((classKey) => isProbability(probabilityRecord[classKey]))
  ) {
    return null;
  }

  return {
    predicted_class: record.predicted_class,
    confidence: record.confidence,
    probabilities: Object.fromEntries(
      classKeys.map((classKey) => [
        classKey,
        probabilityRecord[classKey] as number,
      ]),
    ),
  };
}

function parseMoisturePredictionResult(
  value: unknown,
): MoisturePredictionResult | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const record = value as Record<string, unknown>;
  if (
    typeof record.predicted_moisture_percent !== 'number' ||
    !Number.isFinite(record.predicted_moisture_percent) ||
    record.unit !== 'percent'
  ) {
    return null;
  }

  return {
    predicted_moisture_percent: record.predicted_moisture_percent,
    unit: 'percent',
  };
}

function parseTreeRingPredictionResult(
  value: unknown,
): TreeRingPredictionResult | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const record = value as Record<string, unknown>;

  if (
    record.model_id !== 'tree-ring-boundary-generic' ||
    !isProbability(record.threshold) ||
    !isFiniteNumber(record.input_width) ||
    !Number.isInteger(record.input_width) ||
    !isFiniteNumber(record.input_height) ||
    !Number.isInteger(record.input_height) ||
    record.input_width !== 1504 ||
    record.input_height !== 1504 ||
    !isProbability(record.boundary_pixel_fraction) ||
    typeof record.mask_data_url !== 'string' ||
    !record.mask_data_url.startsWith('data:image/png;base64,')
  ) {
    return null;
  }

  return {
    model_id: 'tree-ring-boundary-generic',
    threshold: record.threshold,
    input_width: record.input_width,
    input_height: record.input_height,
    boundary_pixel_fraction: record.boundary_pixel_fraction,
    mask_data_url: record.mask_data_url,
  };
}

function getErrorMessage(value: unknown) {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const error = (value as Record<string, unknown>).error;
  return typeof error === 'string' ? error : null;
}

function isLabeledImageExample(
  example: ImageTrialExample,
): example is LabeledImageExample {
  return 'expectedClassKey' in example && 'expectedClassLabel' in example;
}

export function ImageClassifierTrial({
  endpoint,
  inputId,
  instructions,
  classes,
  examples,
}: ImageClassifierTrialProps) {
  return (
    <ImageTrial
      endpoint={endpoint}
      inputId={inputId}
      instructions={instructions}
      submitLabel="Classify image"
      submittingLabel="Classifying…"
      failureMessage="The image could not be classified. Try again."
      parseResult={(value) => parsePredictionResult(value, classes)}
      renderResult={(prediction, _previewUrl, selectedExample) => (
        <PredictionPanel
          prediction={prediction}
          classes={classes}
          selectedExample={
            selectedExample && isLabeledImageExample(selectedExample)
              ? selectedExample
              : null
          }
        />
      )}
      examples={examples}
    />
  );
}

export function ImageRegressionTrial({
  endpoint,
  inputId,
  instructions,
}: ImageRegressionTrialProps) {
  return (
    <ImageTrial
      endpoint={endpoint}
      inputId={inputId}
      instructions={instructions}
      submitLabel="Estimate moisture"
      submittingLabel="Estimating…"
      failureMessage="The moisture content could not be estimated. Try again."
      parseResult={parseMoisturePredictionResult}
      renderResult={(prediction) => (
        <MoisturePredictionPanel prediction={prediction} />
      )}
    />
  );
}

export function ImageSegmentationTrial({
  endpoint,
  inputId,
  instructions,
  examples,
}: ImageSegmentationTrialProps) {
  return (
    <ImageTrial
      endpoint={endpoint}
      inputId={inputId}
      instructions={instructions}
      submitLabel="Detect ring boundaries"
      submittingLabel="Detecting…"
      failureMessage="Tree-ring boundaries could not be detected. Try again."
      parseResult={parseTreeRingPredictionResult}
      renderResult={(prediction, previewUrl, selectedExample) => (
        <TreeRingPredictionPanel
          prediction={prediction}
          previewUrl={previewUrl}
          isExampleInput={Boolean(selectedExample)}
        />
      )}
      examples={examples}
    />
  );
}

function ImageTrial<Result>({
  endpoint,
  inputId,
  instructions,
  submitLabel,
  submittingLabel,
  failureMessage,
  parseResult,
  renderResult,
  examples = [],
}: ImageTrialProps<Result>) {
  const [file, setFile] = useState<File | null>(null);
  const [fileDetails, setFileDetails] = useState<PreparedImageUpload | null>(
    null,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedExample, setSelectedExample] =
    useState<ImageTrialExample | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);
  const preparationRequestRef = useRef(0);
  const guidanceId = `${inputId}-guidance`;

  useEffect(() => {
    return () => {
      preparationRequestRef.current += 1;
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  function replacePreview(nextFile: File | null) {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const nextUrl = nextFile ? URL.createObjectURL(nextFile) : null;
    previewUrlRef.current = nextUrl;
    setPreviewUrl(nextUrl);
  }

  async function prepareSelection(
    loadFile: () => Promise<File>,
    example: ImageTrialExample | null,
  ) {
    const requestId = preparationRequestRef.current + 1;
    preparationRequestRef.current = requestId;

    setResult(null);
    setError(null);
    setFile(null);
    setFileDetails(null);
    setSelectedExample(null);
    replacePreview(null);
    setIsPreparing(true);

    try {
      const selectedFile = await loadFile();

      if (preparationRequestRef.current !== requestId) {
        return;
      }

      if (!allowedImageTypes.has(selectedFile.type.toLowerCase())) {
        throw new Error('Choose a JPEG, PNG, or WebP image.');
      }

      if (selectedFile.size > MAX_SELECTED_FILE_BYTES) {
        throw new Error('Choose an image no larger than 50 MB.');
      }

      if (selectedFile.size === 0) {
        throw new Error('The selected image is empty. Choose another file.');
      }

      const preparedImage = await prepareImageUpload(selectedFile, {
        maxDimension: MAX_IMAGE_DIMENSION,
        targetBytes: TARGET_UPLOAD_BYTES,
        maxSourceBytes: MAX_SELECTED_FILE_BYTES,
      });

      if (preparationRequestRef.current !== requestId) {
        return;
      }

      setFile(preparedImage.file);
      setFileDetails(preparedImage);
      setSelectedExample(example);
      replacePreview(preparedImage.file);
    } catch (caughtError) {
      if (preparationRequestRef.current !== requestId) {
        return;
      }

      setFile(null);
      setFileDetails(null);
      replacePreview(null);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'The selected image could not be prepared for upload.',
      );
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } finally {
      if (preparationRequestRef.current === requestId) {
        setIsPreparing(false);
      }
    }
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null;

    if (!selectedFile) {
      resetTrial();
      return;
    }

    await prepareSelection(async () => selectedFile, null);
  }

  async function handleExampleSelect(example: ImageTrialExample) {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    await prepareSelection(async () => {
      const response = await fetch(example.src, { cache: 'force-cache' });

      if (!response.ok) {
        throw new Error('This example image could not be loaded. Try again.');
      }

      const blob = await response.blob();
      return new File([blob], example.filename, {
        type: blob.type,
        lastModified: 0,
      });
    }, example);
  }

  function resetTrial() {
    preparationRequestRef.current += 1;
    setIsPreparing(false);
    setFile(null);
    setFileDetails(null);
    setSelectedExample(null);
    replacePreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
    event.preventDefault();

    if (!file || isPreparing || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });
      const payload: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(getErrorMessage(payload) ?? failureMessage);
      }

      const parsedResult = parseResult(payload);

      if (!parsedResult) {
        throw new Error(
          'The prediction service returned an unexpected response.',
        );
      }

      setResult(parsedResult);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'The prediction service is temporarily unavailable.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="border border-border bg-card p-5 sm:p-8">
      <div className="border-b border-border pb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
          Live model trial
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.025em]">
          {examples.length > 0
            ? 'Choose an example or upload an image'
            : 'Upload an image'}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          {instructions}
        </p>
      </div>

      <form
        className="mt-7"
        onSubmit={handleSubmit}
        aria-busy={isPreparing || isSubmitting}
      >
        {examples.length > 0 ? (
          <fieldset>
            <legend className="text-sm font-bold text-foreground">
              {examples.every(isLabeledImageExample)
                ? 'Try a labeled example'
                : 'Try an example input'}
            </legend>
            <p className="mt-2 max-w-2xl text-xs leading-5 text-muted-foreground">
              {examples.every(isLabeledImageExample)
                ? 'Select an image with a known label, run the model, and compare the reference label with the prediction.'
                : 'Select the reference image, run the model, and inspect its predicted boundary overlay.'}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {examples.map((example) => {
                const isSelected = selectedExample?.id === example.id;

                return (
                  <button
                    key={example.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => void handleExampleSelect(example)}
                    disabled={isPreparing || isSubmitting}
                    className={`group min-h-11 border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                      isSelected
                        ? 'border-primary bg-primary/[0.06]'
                        : 'border-border bg-card hover:border-primary/55 hover:bg-secondary/45'
                    }`}
                  >
                    <span className="relative block aspect-[4/3] overflow-hidden bg-muted">
                      <Image
                        src={example.src}
                        alt={example.alt}
                        fill
                        sizes="(min-width: 1280px) 200px, (min-width: 640px) 260px, 80vw"
                        className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                      />
                    </span>
                    <span className="mt-3 block text-sm font-semibold">
                      {example.title}
                    </span>
                    <span className="mt-1 block text-xs font-bold uppercase tracking-[0.12em] text-primary">
                      {isLabeledImageExample(example)
                        ? `Known label: ${example.expectedClassLabel}`
                        : 'Example input'}
                    </span>
                    {example.note ? (
                      <span className="mt-2 block text-xs leading-5 text-muted-foreground">
                        {example.note}
                      </span>
                    ) : null}
                    <span className="mt-2 block text-xs text-muted-foreground">
                      {isSelected ? 'Selected' : 'Use this example'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="my-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
              <span>Or upload your own</span>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>
          </fieldset>
        ) : null}

        <label
          htmlFor={inputId}
          className="block text-sm font-bold text-foreground"
        >
          {examples.length > 0 ? 'Your image file' : 'Image file'}
        </label>
        <div className="mt-3 border border-dashed border-primary/40 bg-secondary/55 p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center bg-primary text-primary-foreground">
              <ImageUp className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <input
                id={inputId}
                ref={fileInputRef}
                name="file"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={isPreparing || isSubmitting}
                aria-describedby={guidanceId}
                className="block min-h-11 w-full cursor-pointer text-sm text-muted-foreground file:mr-4 file:min-h-11 file:cursor-pointer file:border-0 file:bg-primary file:px-4 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-60 disabled:file:cursor-not-allowed"
              />
              <p
                id={guidanceId}
                className="mt-2 text-xs leading-5 text-muted-foreground"
              >
                JPEG, PNG, or WebP · Images up to 50 MB are automatically
                optimized before upload
              </p>
            </div>
          </div>
        </div>

        {previewUrl && file && fileDetails ? (
          <div className="mt-6 grid gap-5 border border-border p-4 sm:grid-cols-[12rem_1fr] sm:items-center">
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src={previewUrl}
                alt={`Preview of ${fileDetails.originalName}`}
                fill
                unoptimized
                sizes="192px"
                className="object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Selected image
              </p>
              <p
                className="mt-2 truncate text-sm font-semibold"
                title={fileDetails.originalName}
              >
                {fileDetails.originalName}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Prepared copy: {(file.size / (1024 * 1024)).toFixed(2)} MB
                {' · '}Original:{' '}
                {(fileDetails.originalBytes / (1024 * 1024)).toFixed(2)} MB
                {' · '}
                {fileDetails.outputWidth} × {fileDetails.outputHeight} px
              </p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Your original file stays on this device. Only this prepared copy
                is sent when you run the model.
              </p>
              {selectedExample ? (
                <div className="mt-3 border-l-2 border-primary bg-primary/[0.05] px-3 py-2">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                    {isLabeledImageExample(selectedExample)
                      ? 'Known label'
                      : 'Reference input'}
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {isLabeledImageExample(selectedExample)
                      ? selectedExample.expectedClassLabel
                      : selectedExample.title}
                  </p>
                  {selectedExample.note ? (
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {selectedExample.note}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            type="submit"
            size="lg"
            className="h-11 rounded-sm px-5 font-semibold"
            disabled={!file || isPreparing || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="animate-spin" aria-hidden="true" />
                {submittingLabel}
              </>
            ) : (
              submitLabel
            )}
          </Button>
          {file || result || error ? (
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-11 rounded-sm px-5 font-semibold"
              onClick={resetTrial}
              disabled={isPreparing || isSubmitting}
            >
              <RotateCcw aria-hidden="true" />
              Start over
            </Button>
          ) : null}
        </div>
      </form>

      <div className="mt-7" aria-live="polite" aria-atomic="true">
        {isPreparing ? (
          <p className="flex items-center gap-2 border-l-2 border-primary bg-primary/[0.04] px-4 py-3 text-sm">
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            Preparing a smaller upload copy on your device…
          </p>
        ) : null}

        {isSubmitting ? (
          <p className="border-l-2 border-primary bg-primary/[0.04] px-4 py-3 text-sm">
            The model is analyzing your image. This can take a moment on the
            first request.
          </p>
        ) : null}

        {error ? (
          <div
            role="alert"
            className="border border-destructive/35 bg-destructive/[0.06] px-4 py-3 text-sm text-destructive"
          >
            {error}
          </div>
        ) : null}

        {result ? renderResult(result, previewUrl, selectedExample) : null}
      </div>
    </div>
  );
}

function PredictionPanel({
  prediction,
  classes,
  selectedExample,
}: {
  prediction: PredictionResult;
  classes: readonly ClassDefinition[];
  selectedExample: LabeledImageExample | null;
}) {
  const predictedLabel =
    classes.find(
      (classDefinition) => classDefinition.key === prediction.predicted_class,
    )?.label ?? prediction.predicted_class;
  const matchesKnownLabel = selectedExample
    ? selectedExample.expectedClassKey === prediction.predicted_class
    : null;

  return (
    <section className="border-t-4 border-primary bg-secondary/60 p-5 sm:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
        Prediction complete
      </p>
      {selectedExample ? (
        <>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="border border-border bg-card p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Known label
              </p>
              <p className="mt-2 font-heading text-3xl font-semibold tracking-[-0.02em]">
                {selectedExample.expectedClassLabel}
              </p>
            </div>
            <div className="border border-primary/35 bg-card p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                Model prediction
              </p>
              <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                <p className="font-heading text-3xl font-semibold tracking-[-0.02em]">
                  {predictedLabel}
                </p>
                <p className="text-sm font-semibold text-primary">
                  {percentFormatter.format(prediction.confidence)} confidence
                </p>
              </div>
            </div>
          </div>

          <div
            className={`mt-3 flex items-start gap-3 border px-4 py-3 text-sm font-semibold ${
              matchesKnownLabel
                ? 'border-primary/30 bg-primary/[0.06] text-foreground'
                : 'border-amber-700/35 bg-amber-50 text-amber-950'
            }`}
          >
            {matchesKnownLabel ? (
              <CircleCheck
                className="mt-0.5 size-5 shrink-0 text-primary"
                aria-hidden="true"
              />
            ) : (
              <CircleAlert
                className="mt-0.5 size-5 shrink-0 text-amber-800"
                aria-hidden="true"
              />
            )}
            <span>
              {matchesKnownLabel
                ? 'The model prediction matches this example’s known label.'
                : 'The model prediction differs from this example’s known label.'}
            </span>
          </div>
        </>
      ) : (
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="font-heading text-4xl font-semibold tracking-[-0.02em]">
              {predictedLabel}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Predicted class
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="font-heading text-3xl font-semibold text-primary">
              {percentFormatter.format(prediction.confidence)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Model confidence
            </p>
          </div>
        </div>
      )}

      <div className="mt-7 border-t border-border pt-6">
        <h4 className="text-sm font-bold">Class probabilities</h4>
        <ul className="mt-4 space-y-4">
          {classes.map((classDefinition) => {
            const value = prediction.probabilities[classDefinition.key];

            return (
              <li key={classDefinition.key}>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="font-semibold">{classDefinition.label}</span>
                  <span>{percentFormatter.format(value)}</span>
                </div>
                <progress
                  className="sr-only"
                  aria-label={`${classDefinition.label} probability`}
                  max={1}
                  value={value}
                />
                <div className="mt-2 h-2 bg-accent/60" aria-hidden="true">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${value * 100}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

const moistureFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

function MoisturePredictionPanel({
  prediction,
}: {
  prediction: MoisturePredictionResult;
}) {
  return (
    <section className="border-t-4 border-primary bg-secondary/60 p-5 sm:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
        Estimate complete
      </p>
      <div className="mt-4">
        <h3 className="font-heading text-4xl font-semibold tracking-[-0.02em] text-primary sm:text-5xl">
          {moistureFormatter.format(prediction.predicted_moisture_percent)}%
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Estimated wood-chip moisture content
        </p>
      </div>
      <p className="mt-6 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
        This is the model’s direct regression output, not a laboratory moisture
        measurement. Interpret it alongside appropriate sampling and domain
        expertise.
      </p>
    </section>
  );
}

function TreeRingPredictionPanel({
  prediction,
  previewUrl,
  isExampleInput,
}: {
  prediction: TreeRingPredictionResult;
  previewUrl: string | null;
  isExampleInput: boolean;
}) {
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [resultImageError, setResultImageError] = useState<string | null>(null);

  useEffect(() => {
    if (!previewUrl) {
      return;
    }

    let cancelled = false;
    let objectUrl: string | null = null;

    void createImageOverlay({
      baseImageUrl: previewUrl,
      overlayImageUrl: prediction.mask_data_url,
      width: prediction.input_width,
      height: prediction.input_height,
    })
      .then((resultBlob) => {
        objectUrl = URL.createObjectURL(resultBlob);

        if (cancelled) {
          URL.revokeObjectURL(objectUrl);
          objectUrl = null;
          return;
        }

        setResultImageUrl(objectUrl);
      })
      .catch(() => {
        if (!cancelled) {
          setResultImageError(
            'The aligned result image could not be displayed. Please run the model again.',
          );
        }
      });

    return () => {
      cancelled = true;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [
    prediction.input_height,
    prediction.input_width,
    prediction.mask_data_url,
    previewUrl,
  ]);

  function handleDownload() {
    if (resultImageUrl) {
      downloadImageFile(resultImageUrl, 'msu-wood-ai-tree-ring-result.png');
    }
  }

  return (
    <section className="border-t-4 border-primary bg-secondary/60 p-5 sm:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
        Detection complete
      </p>
      <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h3 className="font-heading text-3xl font-semibold tracking-[-0.02em]">
            Predicted boundary map
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Maroon pixels mark areas where the model’s boundary probability met
            the fixed {percentFormatter.format(prediction.threshold)} threshold.
          </p>
        </div>
        <div className="shrink-0 sm:text-right">
          <p className="font-heading text-2xl font-semibold text-primary">
            {percentFormatter.format(prediction.boundary_pixel_fraction)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Image area highlighted
          </p>
        </div>
      </div>

      {isExampleInput ? (
        <div className="mt-5 flex items-start gap-3 border border-primary/25 bg-card px-4 py-3 text-sm leading-6">
          <CircleAlert
            className="mt-0.5 size-5 shrink-0 text-primary"
            aria-hidden="true"
          />
          <p>
            This reference image does not include a human-annotated boundary
            mask. The result below demonstrates the model output; it is not an
            accuracy comparison against known boundaries.
          </p>
        </div>
      ) : null}

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <figure>
          <div className="relative aspect-square overflow-hidden border border-border bg-muted">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Uploaded wood cross-section resized for model input"
                fill
                unoptimized
                sizes="(min-width: 768px) 35vw, 80vw"
                className="object-fill"
              />
            ) : null}
          </div>
          <figcaption className="mt-2 text-xs font-semibold text-muted-foreground">
            Model input · {prediction.input_width} × {prediction.input_height}
          </figcaption>
        </figure>

        <figure>
          <div className="relative aspect-square overflow-hidden border border-primary/30 bg-muted">
            {resultImageUrl ? (
              <Image
                src={resultImageUrl}
                alt="Wood cross-section with predicted tree-ring boundary overlay"
                fill
                unoptimized
                sizes="(min-width: 768px) 35vw, 80vw"
                className="object-fill"
              />
            ) : (
              <div
                className="absolute inset-0 grid place-items-center p-5 text-center text-sm text-muted-foreground"
                role={resultImageError ? 'alert' : 'status'}
              >
                {resultImageError ? (
                  resultImageError
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle
                      className="size-4 animate-spin"
                      aria-hidden="true"
                    />
                    Aligning boundary preview…
                  </span>
                )}
              </div>
            )}
          </div>
          <figcaption className="mt-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <span className="size-3 shrink-0 bg-primary" aria-hidden="true" />
            Predicted tree-ring boundaries
          </figcaption>
        </figure>
      </div>

      <div className="mt-6 flex flex-col items-start gap-2 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-muted-foreground">
          Save this exact aligned preview as one PNG image.
        </p>
        <Button
          type="button"
          size="lg"
          className="h-11 rounded-sm px-5 font-semibold"
          onClick={handleDownload}
          disabled={!resultImageUrl}
        >
          <Download aria-hidden="true" />
          Download result image
        </Button>
      </div>

      <p className="mt-6 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
        This visualization is a neural segmentation result. It does not count
        annual rings or replace the pith-dependent geometric analysis used in
        the full pith-dependent research workflow.
      </p>
    </section>
  );
}
