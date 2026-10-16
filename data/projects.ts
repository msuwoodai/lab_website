import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'project-01',
    slug: 'project-01',
    title: '[PROJECT TITLE 01]',
    shortDescription:
      'Replace this summary with the project’s purpose, approach, and expected contribution.',
    description: [
      'Use this overview to describe the project in enough detail for researchers, collaborators, and prospective students to understand its scope.',
      'Add confirmed context about the work, its relationship to the lab’s research agenda, and the specific questions the team is investigating.',
    ],
    status: 'current',
    image: '/projects/project-placeholder-01.svg',
    imageAlt: 'Placeholder for project 01 imagery',
    tags: ['[RESEARCH AREA 01]', '[METHOD 01]'],
    people: ['pi', 'phd-01'],
    publicationIds: ['publication-01'],
    problem:
      '[DESCRIBE THE RESEARCH PROBLEM, ITS CONTEXT, AND WHY IT MATTERS.]',
    approach:
      '[DESCRIBE THE LAB’S RESEARCH APPROACH WITHOUT CLAIMING UNSUPPLIED RESULTS.]',
    methods: ['[METHOD 01]', '[METHOD 02]', '[SYSTEM OR TOOL]'],
    isFeatured: true,
    isPlaceholder: true,
  },
  {
    id: 'project-02',
    slug: 'project-02',
    title: '[PROJECT TITLE 02]',
    shortDescription:
      'Add a concise, accessible account of the second featured project here.',
    description: [
      'Replace this paragraph with the project’s motivation, major research activities, and intended scholarly contribution.',
      'Describe the project’s relationship to other work in the lab and include collaborators or facilities only when confirmed.',
    ],
    status: 'current',
    image: '/projects/project-placeholder-02.svg',
    imageAlt: 'Placeholder for project 02 imagery',
    tags: ['[RESEARCH AREA 02]', '[METHOD 02]'],
    people: ['pi', 'phd-02', 'masters-01'],
    publicationIds: ['publication-02'],
    problem: '[DESCRIBE THE RESEARCH PROBLEM.]',
    approach: '[DESCRIBE THE RESEARCH APPROACH.]',
    methods: ['[METHOD 01]', '[METHOD 02]'],
    isFeatured: true,
    isPlaceholder: true,
  },
  {
    id: 'project-03',
    slug: 'project-03',
    title: '[PROJECT TITLE 03]',
    shortDescription:
      'Use this field for a short summary of the third highlighted project.',
    description: [
      'Add the confirmed project overview here. A reader should understand the motivation, approach, and connection to the lab’s larger program of research.',
      'Do not add quantitative outcomes until they are ready for public release and have been verified by the project team.',
    ],
    status: 'current',
    image: '/projects/project-placeholder-03.svg',
    imageAlt: 'Placeholder for project 03 imagery',
    tags: ['[RESEARCH AREA 03]', '[METHOD 03]'],
    people: ['staff-01', 'undergraduate-01'],
    publicationIds: ['publication-03'],
    problem: '[DESCRIBE THE RESEARCH PROBLEM.]',
    approach: '[DESCRIBE THE RESEARCH APPROACH.]',
    methods: ['[METHOD 01]', '[SYSTEM OR TOOL]'],
    isFeatured: true,
    isPlaceholder: true,
  },
  {
    id: 'project-04',
    slug: 'project-04',
    title: '[COMPLETED PROJECT TITLE]',
    shortDescription:
      'Replace this text with a summary of a completed project, or remove the record.',
    description: [
      'Use this page to preserve an accessible record of completed work, its methods, and its confirmed contributions.',
    ],
    status: 'completed',
    image: '/projects/project-placeholder-04.svg',
    imageAlt: 'Placeholder for completed project imagery',
    tags: ['[RESEARCH AREA 04]'],
    people: ['pi', 'alumni-01'],
    publicationIds: ['publication-04'],
    problem: '[DESCRIBE THE RESEARCH PROBLEM.]',
    approach: '[DESCRIBE THE RESEARCH APPROACH.]',
    methods: ['[METHOD 01]'],
    isPlaceholder: true,
  },
];

export const publishedProjects = projects.filter(
  (project) => !project.isPlaceholder,
);

export const featuredProjects = publishedProjects.filter(
  (project) => project.isFeatured,
);

export function getProjectBySlug(slug: string) {
  return publishedProjects.find((project) => project.slug === slug);
}
