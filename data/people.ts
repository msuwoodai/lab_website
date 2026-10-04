import type { Person } from '@/types';

export const people: Person[] = [
  {
    id: 'pi',
    name: 'Dr. Jason Tyler Street',
    role: 'principal-investigator',
    title: 'Interim Head · Associate Professor',
    image: '/people/jason-tyler-street.jpg',
    bio: 'Dr. Street leads AIMS Lab and serves as Interim Head and Associate Professor in Mississippi State University’s Department of Sustainable Bioproducts. His work spans sustainable materials, engineered wood products, artificial intelligence, transport modeling, and renewable energy systems.',
    researchInterests: [
      'Bio-based composites and engineered wood products',
      'AI and machine learning in materials research',
      'Moisture and thermal transport modeling',
      'Renewable and alternative energy systems',
    ],
    education: [
      'Ph.D. in Engineering, Mississippi State University',
      'M.S. in Biological Engineering, Mississippi State University',
      'B.S. in Biological Engineering, Mississippi State University',
    ],
    email: 'jts118@msstate.edu',
    phone: '662-325-5120',
    office: 'Room 5204, Forest Products Laboratory',
    website: 'https://www.fwrc.msstate.edu/people/jts118',
    websiteLabel: 'Official MSU profile',
  },
  {
    id: 'tilak-neupane',
    name: 'Tilak Neupane',
    role: 'phd',
    title: 'Graduate Research Assistant · PhD in Sustainable Bioproducts',
    program:
      'PhD in Sustainable Bioproducts, Department of Sustainable Bioproducts',
    image: '/people/tilak-neupane.png',
    bio: 'Tilak Neupane is a final-year PhD student in the Department of Sustainable Bioproducts. His research applies machine learning and deep learning to assess wood properties, including wood chip moisture content and the mechanical properties of tree logs. He earned an MS in Forestry from the University of Georgia.',
    researchInterests: [
      'Artificial intelligence and computer vision for wood quality assessment',
      'Moisture content prediction',
      'Hyperspectral imaging',
      'Nondestructive evaluation',
    ],
    email: 'tn614@msstate.edu',
  },
  {
    id: 'benjamin-wiley',
    name: 'Benjamin Wiley',
    role: 'masters',
    title:
      'Graduate Research Assistant · M.S. in Sustainable Bioproducts and MBA',
    program:
      'M.S. in Sustainable Bioproducts and Master of Business Administration',
    image: '/people/placeholder-person.svg',
    imageAlt: 'Profile photo placeholder for Benjamin Wiley',
    bio: 'Benjamin Wiley is a graduate research assistant and dual M.S. in Sustainable Bioproducts and MBA candidate at Mississippi State University. His work examines biomass residuals for alternative-energy systems and develops machine-learning and computer-vision models to estimate biomass strength, appearance, and composition.',
    researchInterests: [
      'Machine learning and computer vision for biomass',
      'Biomass residual utilization',
      'Alternative energy systems',
      'Life-cycle assessment',
    ],
    education: [
      'M.S. in Sustainable Bioproducts, Mississippi State University (expected 2028)',
      'Master of Business Administration, Mississippi State University (expected 2027)',
      'B.S. in Sustainable Bioproducts, Mississippi State University (2026)',
    ],
    email: 'btw209@msstate.edu',
    linkedin: 'https://www.linkedin.com/in/benjamin-wiley-45254b2b4',
  },
  {
    id: 'madeline-gnann',
    name: 'Madeline Gnann',
    role: 'masters',
    title: 'Graduate Research Assistant · M.S. in Sustainable Bioproducts',
    program: 'M.S. in Sustainable Bioproducts',
    image: '/people/placeholder-person.svg',
    imageAlt: 'Profile photo placeholder for Madeline Gnann',
    bio: 'Madeline Gnann is a graduate research assistant pursuing an M.S. in Sustainable Bioproducts after earning her B.S. in Sustainable Bioproducts at Mississippi State University. Her laboratory experience includes chemical analysis and wood identification.',
    researchInterests: [
      'Sustainable bioproducts',
      'Wood identification',
      'Chemical laboratory methods',
    ],
    education: [
      'M.S. in Sustainable Bioproducts, Mississippi State University (expected 2027)',
      'B.S. in Sustainable Bioproducts, Mississippi State University (2025)',
    ],
    linkedin: 'https://www.linkedin.com/in/madeline-gnann-9b91ba28b',
  },
  {
    id: 'bibek-bhatta',
    name: 'Bibek Bhatta',
    role: 'undergraduate',
    title: 'Undergraduate Student · Mechanical Engineering',
    program: 'B.S. in Mechanical Engineering',
    image: '/people/placeholder-person.svg',
    imageAlt: 'Profile photo placeholder for Bibek Bhatta',
    bio: 'Bibek Bhatta is an undergraduate Mechanical Engineering student at Mississippi State University. His experience includes organizing a NASA Space Apps Challenge event and teaching introductory machine-learning concepts to participants.',
    researchInterests: [
      'Machine learning',
      'Mechanical engineering',
      'Technical education and outreach',
    ],
    education: [
      'B.S. in Mechanical Engineering, Mississippi State University (in progress)',
    ],
    linkedin: 'https://www.linkedin.com/in/beebekisme',
  },
  {
    id: 'niraj-gupta',
    name: 'Niraj Gupta',
    role: 'undergraduate',
    title: 'Undergraduate Researcher · Computer Science',
    program: 'B.S. in Computer Science',
    image: '/people/placeholder-person.svg',
    imageAlt: 'Profile photo placeholder for Niraj Gupta',
    bio: 'Niraj Gupta is an undergraduate Computer Science student at Mississippi State University whose work focuses on artificial intelligence. His research experience includes deep-learning image classification, computer vision for wood-material analysis, and growth-ring prediction.',
    researchInterests: [
      'Artificial intelligence and machine learning',
      'Computer vision and image classification',
      'Deep learning for forest products',
      'Large language models',
    ],
    education: [
      'B.S. in Computer Science, Mississippi State University (expected 2028)',
    ],
    linkedin: 'https://www.linkedin.com/in/ng9812',
  },
  {
    id: 'quinton-wiley',
    name: 'Quinton Wiley',
    role: 'undergraduate',
    title:
      'Undergraduate Researcher · Sustainable Bioproducts and Natural Resources',
    program: 'Sustainable Bioproducts and Wildlife, Fisheries & Aquaculture',
    image: '/people/quinton-wiley.webp',
    imageAlt: 'Portrait of Quinton Wiley',
    bio: 'Quinton Wiley is an undergraduate researcher whose interests connect sustainability and conservation with sustainable-product development. He has participated in the Sustainable Bioproducts REU and previously served as a research assistant in Mississippi State University’s College of Forest Resources.',
    researchInterests: [
      'Sustainability and conservation',
      'Environmental research',
      'Sustainable-product development',
      'Laboratory research',
    ],
    linkedin: 'https://www.linkedin.com/in/quinton-wiley-922497369',
  },
  {
    id: 'ethan-turo',
    name: 'Ethan Turo',
    role: 'alumni',
    title: 'Laboratory Technician · Huber Engineered Woods',
    image: '/people/placeholder-person.svg',
    imageAlt: 'Profile photo placeholder for Ethan Turo',
    bio: 'Ethan Turo is an AIMS Lab alumnus with M.S. and B.S. degrees in Sustainable Bioproducts from Mississippi State University. His research involved testing the mechanical and physical properties of wood and engineered wood products and analyzing the resulting data. He is now a laboratory technician at Huber Engineered Woods.',
    researchInterests: [
      'Engineered wood products',
      'Wood materials testing',
      'Statistical data analysis',
      'Computer vision',
    ],
    education: [
      'M.S. in Sustainable Bioproducts, Mississippi State University (2025)',
      'B.S. in Sustainable Bioproducts, Mississippi State University (2023)',
    ],
    linkedin: 'https://www.linkedin.com/in/ethan-turo-244655270',
  },
];

export const principalInvestigator = people.find(
  (person) => person.role === 'principal-investigator',
);

export const currentResearchers = people.filter(
  (person) =>
    person.role !== 'principal-investigator' && person.role !== 'alumni',
);
