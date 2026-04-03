/**
 * Experience and Career Types
 * Defines data structures for work experience, education, and career progression
 */

// ============================================================================
// Experience Data Models
// ============================================================================

export interface ExperienceData {
  workExperience: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
  volunteerWork?: VolunteerWork[];
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[]; // Technology IDs or names
  achievements: string[];
  companyLogo?: string;
  companyUrl?: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  industry: string;
  teamSize?: number;
  reportsTo?: string;
  directReports?: number;
  keyProjects?: string[]; // Project IDs
  skills: string[]; // Skills developed or used
  promotions?: Promotion[];
}

export interface Promotion {
  fromPosition: string;
  toPosition: string;
  date: Date;
  reason?: string;
  salaryIncrease?: number; // percentage
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate: Date;
  gpa?: number;
  maxGpa?: number;
  honors?: string[];
  relevantCourses?: string[];
  thesis?: Thesis;
  activities?: string[];
  location: string;
  logo?: string;
  url?: string;
  graduated: boolean;
}

export interface Thesis {
  title: string;
  abstract: string;
  advisor: string;
  url?: string;
  keywords: string[];
  publicationDate?: Date;
}

export interface VolunteerWork {
  id: string;
  organization: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  activities: string[];
  skills: string[];
  impact?: string;
  hoursPerWeek?: number;
  location: string;
  organizationUrl?: string;
  cause: string;
}

// ============================================================================
// Career Timeline and Progression
// ============================================================================

export interface CareerTimeline {
  events: TimelineEvent[];
  milestones: CareerMilestone[];
  totalExperience: number; // years
  industries: string[];
  roles: string[];
}

export interface TimelineEvent {
  id: string;
  date: Date;
  type: 'job-start' | 'job-end' | 'promotion' | 'education' | 'certification' | 'achievement' | 'project';
  title: string;
  description: string;
  organization: string;
  location?: string;
  icon?: string;
  color?: string;
  relatedId?: string; // ID of related work experience, education, etc.
}

export interface CareerMilestone {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: 'career' | 'education' | 'skill' | 'leadership' | 'recognition';
  significance: 'major' | 'moderate' | 'minor';
  evidence?: string[];
  impact?: string;
}

// ============================================================================
// Professional References and Recommendations
// ============================================================================

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email?: string;
  phone?: string;
  relationship: 'manager' | 'colleague' | 'client' | 'mentor' | 'direct-report';
  workingPeriod: {
    start: Date;
    end: Date;
  };
  canContact: boolean;
  linkedinUrl?: string;
  notes?: string;
}

export interface Recommendation {
  id: string;
  recommender: {
    name: string;
    position: string;
    company: string;
    linkedinUrl?: string;
    photo?: string;
  };
  content: string;
  date: Date;
  relationship: string;
  skills: string[]; // Skills mentioned in recommendation
  projects?: string[]; // Projects mentioned
  platform: 'linkedin' | 'email' | 'letter' | 'other';
  verified: boolean;
  featured: boolean;
}

// ============================================================================
// Performance and Growth Tracking
// ============================================================================

export interface PerformanceReview {
  id: string;
  workExperienceId: string;
  reviewPeriod: {
    start: Date;
    end: Date;
  };
  overallRating: number; // 1-5 scale
  competencies: CompetencyRating[];
  goals: Goal[];
  feedback: {
    strengths: string[];
    areasForImprovement: string[];
    managerComments?: string;
    selfAssessment?: string;
  };
  careerDevelopment: {
    nextRole?: string;
    skillsToImprove: string[];
    trainingRecommendations: string[];
  };
}

export interface CompetencyRating {
  competency: string;
  rating: number; // 1-5 scale
  comments?: string;
  examples?: string[];
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'performance' | 'development' | 'project' | 'leadership';
  targetDate: Date;
  status: 'not-started' | 'in-progress' | 'completed' | 'cancelled';
  progress: number; // 0-100
  metrics?: string[];
  outcomes?: string[];
}

// ============================================================================
// Import shared types
// ============================================================================

import { Certification, Achievement } from './skills';