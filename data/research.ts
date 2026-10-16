import type { ResearchArea } from '@/types';

export const researchAreas: ResearchArea[] = [
  {
    id: 'applied-ai-industrial-automation',
    title: 'Applied AI and Industrial Automation',
    shortDescription:
      'AI and machine-learning methods for labor-intensive analysis, classification, and inspection workflows.',
    description: [
      'MSU Wood AI works with industry partners to identify research problems within workflows that rely on manual analysis or classification. The lab studies how artificial intelligence and machine learning can support more consistent, scalable ways to interpret data and images.',
      'This work connects practical needs with model development and evaluation. The goal is to create research tools that complement domain expertise and can be assessed for the conditions in which they will be used.',
    ],
    topics: [
      'Industry collaboration',
      'Workflow automation',
      'Automated inspection',
    ],
    questions: [
      'Which labor-intensive tasks are suitable for reliable AI-assisted analysis?',
      'How can models be evaluated for the data and operating conditions of an industrial workflow?',
    ],
    methods: [
      'Machine learning',
      'Model development and validation',
      'Applied data analysis',
    ],
  },
  {
    id: 'computer-vision-drone-imagery',
    title: 'Computer Vision and Drone Imagery',
    shortDescription:
      'Image-classification methods for drone imagery and other visual data from research and industry.',
    description: [
      'The lab develops and evaluates computer-vision methods for image-based classification problems. Drone imagery is one application, alongside other visual datasets that can support research, inspection, and materials assessment.',
      'This area considers how data quality, class definitions, and evaluation affect whether an image classifier provides useful and repeatable results.',
    ],
    topics: [
      'Drone-image classification',
      'Computer vision',
      'Visual data analysis',
    ],
    questions: [
      'How can drone and other image datasets be classified accurately and consistently?',
      'How do image conditions and dataset composition affect model performance?',
    ],
    methods: [
      'Deep learning',
      'Image preprocessing and classification',
      'Performance evaluation',
    ],
  },
  {
    id: 'bio-based-materials-engineered-wood',
    title: 'Bio-based Materials and Engineered Wood',
    shortDescription:
      'Research on bio-based composites and engineered wood products, supported by computational and AI methods.',
    description: [
      'The lab studies bio-based composites, engineered wood products, and the material properties that influence their performance. This work brings materials research together with computation, measurement, and data-driven analysis.',
      'Artificial intelligence and machine learning are used where they can help characterize materials, interpret images or measurements, and support quality assessment.',
    ],
    topics: [
      'Bio-based composites',
      'Engineered wood products',
      'Materials assessment',
    ],
    questions: [
      'How can data-driven methods improve the assessment of wood and bio-based materials?',
      'Which material features are most useful for classification or property prediction?',
    ],
    methods: [
      'Materials characterization',
      'Machine learning',
      'Image-based assessment',
    ],
  },
  {
    id: 'transport-renewable-systems',
    title: 'Transport Modeling and Renewable Systems',
    shortDescription:
      'Computational research on moisture and thermal transport and renewable or alternative energy systems.',
    description: [
      'The lab investigates moisture and thermal transport in materials and systems, including the ways heat and moisture move and interact. Modeling these processes supports a better understanding of performance under changing conditions.',
      'Related work examines renewable and alternative energy systems, connecting computational analysis with questions in sustainable materials and energy use.',
    ],
    topics: [
      'Moisture transport',
      'Thermal transport',
      'Renewable and alternative energy',
    ],
    questions: [
      'How do coupled moisture and thermal processes influence material behavior?',
      'How can computational models support the analysis of renewable and alternative energy systems?',
    ],
    methods: [
      'Computational modeling',
      'Heat and mass transfer analysis',
      'Data analysis',
    ],
  },
];
