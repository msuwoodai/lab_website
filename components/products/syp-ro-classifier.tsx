import {
  ImageClassifierTrial,
  type LabeledImageExample,
} from '@/components/products/image-classifier-trial';

const classes = [
  { key: 'ro', label: 'RO' },
  { key: 'syp', label: 'SYP' },
] as const;

const examples = [
  {
    id: 'ro-example',
    src: '/products/samples/syp-ro/ro.webp',
    filename: 'ro-known-label.webp',
    alt: 'Close-up view of reddish-brown hardwood chips used as the RO labeled example',
    title: 'RO wood chips',
    expectedClassKey: 'ro',
    expectedClassLabel: 'RO',
  },
  {
    id: 'syp-example',
    src: '/products/samples/syp-ro/syp.webp',
    filename: 'syp-known-label.webp',
    alt: 'Close-up view of pale elongated wood chips used as the SYP labeled example',
    title: 'SYP wood chips',
    expectedClassKey: 'syp',
    expectedClassLabel: 'SYP',
  },
] as const satisfies readonly LabeledImageExample[];

export function SypRoClassifier() {
  return (
    <ImageClassifierTrial
      endpoint="/api/predict"
      inputId="syp-ro-classifier-image"
      instructions="Choose one supported image. The model will return an RO or SYP prediction with confidence scores for both classes."
      classes={classes}
      examples={examples}
    />
  );
}
