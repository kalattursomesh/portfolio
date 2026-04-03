/**
 * Type Definitions Index
 * Central export point for all TypeScript interfaces and types
 */

// ============================================================================
// Core Portfolio Types
// ============================================================================

export * from './portfolio';
export * from './project';
export * from './skills';
export * from './experience';
export * from './components';
export * from './validation';

// ============================================================================
// Re-export commonly used types for convenience
// ============================================================================

export type {
  // Core Configuration
  PortfolioConfig,
  PersonalInfo,
  ThemeConfig,
  SEOConfig,

  // Animation and UI
  AnimationConfig,
  ImageData
} from './portfolio';

export type {
  Project,
  ProjectData,
  ProjectCategory,
  Technology,
  ProjectFilter,
  ProjectDetailProps
} from './project';

export type {
  Skill,
  SkillGroup,
  SkillsData,
  SkillCategory,
  Certification,
  Achievement,
  SkillsVisualizationProps
} from './skills';

export type {
  WorkExperience,
  Education,
  ExperienceData,
  CareerTimeline,
  TimelineEvent,
  Reference,
  Recommendation
} from './experience';

export type {
  HeroSectionProps,
  ProjectsSectionProps,
  SkillsSectionProps,
  ContactFormProps,
  NavigationProps,
  AppLayoutProps,
  ModalProps,
  FilterControlsProps,
  ScrollAnimationProps,
  ContactFormData,
  ContactFormResponse,
  LoadingState
} from './components';

export type {
  ValidationSchema,
  ValidationResult,
  ValidationError,
  FieldSchema,
  CustomValidator,
  ValidationErrorCode,
  ValidatorConfig,
  BatchValidationResult
} from './validation';