/**
 * Project Data Types
 * Defines data structures for project showcase and portfolio display
 */

// ============================================================================
// Project Data Models
// ============================================================================

export interface ProjectData {
  projects: Project[];
  categories: ProjectCategory[];
  technologies: Technology[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: Technology[];
  category: string;
  images: ImageData[];
  liveUrl?: string;
  githubUrl?: string;
  directLink?: boolean;
  featured: boolean;
  completedDate: Date;
  status: 'completed' | 'in-progress' | 'planned';
  highlights: string[];
  challenges?: string[];
  learnings?: string[];
  teamSize?: number;
  duration?: string;
  client?: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
  description?: string;
  count?: number;
}

export interface Technology {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tool' | 'cloud' | 'mobile' | 'design';
  icon: string;
  color: string;
  proficiency: number; // 0-100
  yearsExperience?: number;
  projects?: string[]; // Project IDs
  certifications?: string[];
  url?: string; // Official documentation or website
}

// ============================================================================
// Project Display and Interaction Types
// ============================================================================

export interface ProjectsShowcaseProps {
  projects: Project[];
  categories: ProjectCategory[];
  layout: 'grid' | 'masonry' | 'carousel';
  filterEnabled: boolean;
  searchEnabled: boolean;
}

export interface ProjectFilter {
  categories: string[];
  technologies: string[];
  status: string[];
  featured?: boolean;
  searchQuery?: string;
}

export interface ProjectSortOptions {
  field: 'title' | 'completedDate' | 'category' | 'featured';
  direction: 'asc' | 'desc';
}

// ============================================================================
// Project Detail and Modal Types
// ============================================================================

export interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export interface ProjectGallery {
  images: ImageData[];
  currentIndex: number;
  showThumbnails: boolean;
  autoPlay?: boolean;
  interval?: number;
}

// ============================================================================
// Import ImageData from portfolio types
// ============================================================================

import { ImageData } from './portfolio';