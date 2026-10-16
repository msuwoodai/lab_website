export type PersonRole =
  | 'principal-investigator'
  | 'staff'
  | 'phd'
  | 'masters'
  | 'undergraduate'
  | 'alumni';

export type ProjectStatus = 'current' | 'completed';

export type ProductStatus = 'available' | 'limited-preview' | 'coming-soon';

export type PublicationType =
  | 'journal'
  | 'conference'
  | 'workshop'
  | 'poster'
  | 'report'
  | 'thesis'
  | 'preprint';

export interface NavigationItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  isTemplate: boolean;
  labName: string;
  shortName: string;
  tagline: string;
  university: string;
  department: string;
  affiliationStatement: string;
  universityLogo: string;
  universityLogoWhite: string;
  departmentLogo: string;
  departmentLogoWhite: string;
  description: string;
  mission: string;
  email: string;
  location: string;
  building: string;
  room: string;
  mailingAddress: string;
  mapsUrl?: string;
  universityDirectoryUrl?: string;
}

export interface Person {
  id: string;
  name: string;
  role: PersonRole;
  title?: string;
  program?: string;
  image?: string;
  imageAlt?: string;
  bio?: string;
  researchInterests?: string[];
  education?: string[];
  email?: string;
  phone?: string;
  office?: string;
  website?: string;
  websiteLabel?: string;
  linkedin?: string;
  googleScholar?: string;
  github?: string;
  orcid?: string;
  imageCredit?: string;
  isPlaceholder?: boolean;
}

export interface ResearchArea {
  id: string;
  title: string;
  shortDescription: string;
  description: string[];
  image?: string;
  imageAlt?: string;
  topics?: string[];
  questions?: string[];
  methods?: string[];
  relatedProjects?: string[];
  relatedPublications?: string[];
  isPlaceholder?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string[];
  status: ProjectStatus;
  startYear?: number;
  endYear?: number;
  image?: string;
  imageAlt?: string;
  tags?: string[];
  people?: string[];
  publicationIds?: string[];
  problem?: string;
  approach?: string;
  methods?: string[];
  outcomes?: string[];
  repositoryUrl?: string;
  demoUrl?: string;
  externalUrl?: string;
  funding?: string;
  isFeatured?: boolean;
  isPlaceholder?: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  status: ProductStatus;
  capabilities: string[];
  version?: string;
  demoUrl?: string;
  documentationUrl?: string;
  isPlaceholder?: boolean;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue?: string;
  year: number;
  type: PublicationType;
  researchAreas?: string[];
  doi?: string;
  paperUrl?: string;
  codeUrl?: string;
  datasetUrl?: string;
  bibtex?: string;
  isFeatured?: boolean;
  isPlaceholder?: boolean;
}

export interface NewsItem {
  id: string;
  slug?: string;
  title: string;
  date: string;
  dateIso?: string;
  summary: string;
  content?: string;
  image?: string;
  imageAlt?: string;
  externalUrl?: string;
  category?: string;
  isPlaceholder?: boolean;
}

export interface ResearchPageContent {
  heroDescription: string;
  frameworkLabel: string;
  framework: string[];
  collaboration?: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
  };
}
