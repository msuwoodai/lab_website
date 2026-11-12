import {
  ImageSegmentationTrial,
  type ImageTrialExample,
} from '@/components/products/image-classifier-trial';

const examples = [
  {
    id: 'tree-ring-cross-section',
    src: '/products/tree-ring-input-example.webp',
    filename: 'tree-ring-example-input.webp',
    alt: 'Wood log cross-section photographed face-on with visible growth rings and a measuring scale',
    title: 'Wood cross-section',
    note: 'Reference input only; no human-labeled boundary mask is available.',
  },
] as const satisfies readonly ImageTrialExample[];

export function TreeRingBoundaryDetector() {
  return (
    <ImageSegmentationTrial
      endpoint="/api/predict/tree-ring-detection"
      inputId="tree-ring-boundary-image"
      instructions="Choose the example cross-section or upload your own image. The generic model will resize it to 1504 × 1504 pixels and highlight likely tree-ring boundary pixels."
      examples={examples}
    />
  );
}
