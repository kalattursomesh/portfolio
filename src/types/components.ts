/**
 * Component Props and UI Types
 * Defines interfaces for React components and UI interactions
 */

import { ReactNode } from 'react';
import {
  PortfolioConfig,
  SEOMetadata,
  AnimationConfig,
  ImageData,
  PersonalInfo,
  HeroAnimations,
  ParticleConfig
} from './portfolio';
import { Project, ProjectCategory, ProjectFilter } from './project';
import { Skill, SkillGroup } from './skills';
import { WorkExperience, Education } from './experience';
import { ValidationError } from './validation';

// ============================================================================
// Layout Component Types
// ============================================================================

export interface AppLayoutProps {
  children: ReactNode;
  metadata: SEOMetadata;
  config?: PortfolioConfig;
}

export interface NavigationProps {
  sections: NavigationSection[];
  currentSection: string;
  isMobile: boolean;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onSectionClick: (sectionId: string) => void;
}

export interface NavigationSection {
  id: string;
  label: string;
  href: string;
  order: number;
  enabled: boolean;
}

// ============================================================================
// Section Component Types
// ============================================================================

export interface HeroSectionProps {
  profile: PersonalInfo;
  animations?: HeroAnimations;
  onCTAClick?: () => void;
}

export interface AboutSectionProps {
  bio: string;
  highlights: string[];
  personalInfo: PersonalInfo;
  downloadResumeUrl: string;
}

export interface ProjectsSectionProps {
  projects: Project[];
  categories: ProjectCategory[];
  layout: 'grid' | 'masonry' | 'carousel';
  showFilters: boolean;
  showSearch: boolean;
  onProjectClick: (project: Project) => void;
}

export interface SkillsSectionProps {
  skillGroups: SkillGroup[];
  visualizationType: 'bars' | 'circles' | 'hexagon' | 'cards' | 'radar';
  showProficiency: boolean;
  showExperience: boolean;
  animateOnScroll: boolean;
}

export interface ExperienceSectionProps {
  workExperience: WorkExperience[];
  education: Education[];
  showTimeline: boolean;
  showDetails: boolean;
}

export interface ContactSectionProps {
  personalInfo: PersonalInfo;
  onFormSubmit: (data: ContactFormData) => Promise<ContactFormResponse>;
  showSocialLinks: boolean;
}

// ============================================================================
// Form Component Types
// ============================================================================

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<ContactFormResponse>;
  validation: ValidationRules;
  isLoading: boolean;
  initialData?: Partial<ContactFormData>;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string; // Anti-spam field
  consent: boolean; // GDPR consent
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  errors?: ValidationError[];
  timestamp: Date;
}

export interface ValidationRules {
  name: FieldValidation;
  email: FieldValidation;
  subject: FieldValidation;
  message: FieldValidation;
}

export interface FieldValidation {
  required: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidator?: (value: string) => string | null;
}

// ============================================================================
// Modal and Overlay Types
// ============================================================================

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size: 'small' | 'medium' | 'large' | 'fullscreen';
  closeOnOverlayClick: boolean;
  closeOnEscape: boolean;
  children: ReactNode;
}

export interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  showNavigation: boolean;
}

export interface ImageGalleryProps {
  images: ImageData[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  showThumbnails: boolean;
  showControls: boolean;
  autoPlay?: boolean;
  interval?: number;
}

// ============================================================================
// Interactive Component Types
// ============================================================================

export interface FilterControlsProps {
  categories: ProjectCategory[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

export interface SkillCardProps {
  skill: Skill;
  showProficiency: boolean;
  showExperience: boolean;
  interactive: boolean;
  onClick?: (skill: Skill) => void;
  onHover?: (skill: Skill) => void;
}

export interface ProjectCardProps {
  project: Project;
  layout: 'card' | 'tile' | 'list';
  showTechnologies: boolean;
  showDescription: boolean;
  onClick: (project: Project) => void;
  onTechnologyClick?: (technology: string) => void;
}

// ============================================================================
// Animation and Interaction Types
// ============================================================================

export interface ScrollAnimationProps {
  children: ReactNode;
  animation: AnimationConfig;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export interface ParallaxProps {
  children: ReactNode;
  speed: number;
  direction: 'up' | 'down' | 'left' | 'right';
  disabled?: boolean;
}

export interface IntersectionObserverProps {
  children: ReactNode;
  onIntersect: (isIntersecting: boolean) => void;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// ============================================================================
// Utility and Helper Types
// ============================================================================

export interface LoadingState {
  isLoading: boolean;
  error?: string;
  progress?: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast: boolean;
  showPrevNext: boolean;
  maxVisiblePages: number;
}

export interface SearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder: string;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  debounceMs?: number;
}

export interface TooltipProps {
  content: ReactNode;
  position: 'top' | 'bottom' | 'left' | 'right';
  trigger: 'hover' | 'click' | 'focus';
  delay?: number;
  children: ReactNode;
}