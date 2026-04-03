/**
 * Skills and Expertise Types
 * Defines data structures for skills visualization and technical proficiency
 */

// ============================================================================
// Skills Data Models
// ============================================================================

export interface SkillsData {
  skillGroups: SkillGroup[];
  certifications: Certification[];
  achievements: Achievement[];
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
  color: string;
  icon: string;
  description?: string;
  order: number;
}

export interface Skill {
  name: string;
  proficiency: number; // 0-100
  yearsExperience: number;
  projects: string[]; // Project IDs
  certifications?: string[];
  category: SkillCategory;
  icon?: string;
  color?: string;
  description?: string;
  learningResources?: LearningResource[];
  lastUsed?: Date;
  trending?: boolean;
}

export type SkillCategory = 
  | 'frontend' 
  | 'backend' 
  | 'database' 
  | 'cloud' 
  | 'mobile' 
  | 'design' 
  | 'tools' 
  | 'soft-skills' 
  | 'languages';

export interface LearningResource {
  title: string;
  url: string;
  type: 'course' | 'book' | 'documentation' | 'tutorial' | 'certification';
  completed: boolean;
  completedDate?: Date;
}

// ============================================================================
// Skills Visualization Types
// ============================================================================

export interface SkillsVisualizationProps {
  skillGroups: SkillGroup[];
  visualizationType: 'bars' | 'circles' | 'hexagon' | 'cards' | 'radar';
  showProficiency: boolean;
  showExperience: boolean;
  interactive: boolean;
  animateOnScroll: boolean;
}

export interface SkillVisualizationConfig {
  type: 'bars' | 'circles' | 'hexagon' | 'cards' | 'radar';
  showLabels: boolean;
  showValues: boolean;
  colorScheme: 'category' | 'proficiency' | 'custom';
  animation: {
    enabled: boolean;
    duration: number;
    delay: number;
    stagger: number;
  };
}

// ============================================================================
// Certifications and Achievements
// ============================================================================

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[]; // Skill names
  logo?: string;
  description?: string;
  verified: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: 'award' | 'recognition' | 'milestone' | 'publication' | 'speaking';
  organization?: string;
  url?: string;
  skills?: string[]; // Related skill names
  projects?: string[]; // Related project IDs
  media?: {
    type: 'image' | 'video' | 'document';
    url: string;
    caption?: string;
  }[];
}

// ============================================================================
// Skills Assessment and Progress
// ============================================================================

export interface SkillAssessment {
  skillId: string;
  selfRating: number; // 0-100
  peerRating?: number; // 0-100
  managerRating?: number; // 0-100
  assessmentDate: Date;
  notes?: string;
  improvementAreas?: string[];
  strengths?: string[];
}

export interface SkillProgress {
  skillId: string;
  startProficiency: number;
  currentProficiency: number;
  targetProficiency: number;
  milestones: SkillMilestone[];
  learningPlan?: LearningPlan;
}

export interface SkillMilestone {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  completedDate?: Date;
  proficiencyGain: number;
  evidence?: string[]; // URLs or descriptions
}

export interface LearningPlan {
  skillId: string;
  goal: string;
  targetProficiency: number;
  timeline: number; // months
  resources: LearningResource[];
  milestones: SkillMilestone[];
  status: 'planned' | 'in-progress' | 'completed' | 'paused';
}