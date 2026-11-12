import {
  ImageClassifierTrial,
  type LabeledImageExample,
} from '@/components/products/image-classifier-trial';

const classes = [
  { key: '2A', label: '2A' },
  { key: '3A', label: '3A' },
  { key: '4A', label: '4A' },
] as const;

const examples = [
  {
    id: 'veneer-2a-example',
    src: '/products/samples/guitar-veneer/2a.webp',
    filename: 'veneer-2a-known-label.webp',
    alt: 'Face-on veneer sheet under controlled lighting used as the 2A labeled example',
    title: '2A veneer',
    expectedClassKey: '2A',
    expectedClassLabel: '2A',
  },
  {
    id: 'veneer-3a-example',
    src: '/products/samples/guitar-veneer/3a.webp',
    filename: 'veneer-3a-known-label.webp',
    alt: 'Face-on figured veneer sheet under controlled lighting used as the 3A labeled example',
    title: '3A veneer',
    expectedClassKey: '3A',
    expectedClassLabel: '3A',
  },
  {
    id: 'veneer-4a-example',
    src: '/products/samples/guitar-veneer/4a.webp',
    filename: 'veneer-4a-known-label.webp',
    alt: 'Face-on highly figured veneer sheet under controlled lighting used as the 4A labeled example',
    title: '4A veneer',
    expectedClassKey: '4A',
    expectedClassLabel: '4A',
  },
] as const satisfies readonly LabeledImageExample[];

export function GuitarVeneerClassifier() {
  return (
    <ImageClassifierTrial
      endpoint="/api/predict/guitar-veneer"
      inputId="guitar-veneer-classifier-image"
      instructions="Choose one supported guitar veneer image. The model will return a 2A, 3A, or 4A prediction with confidence scores for all three grades."
      classes={classes}
      examples={examples}
    />
  );
}
