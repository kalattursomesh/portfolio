/**
 * Content Management System
 * Handles loading, validation, and management of portfolio content from JSON files
 */

import {
  PortfolioConfig,
  ProjectData,
  SkillsData,
  ExperienceData,
  ValidationResult,
  ValidationSchema,
  ValidationError,
  ValidationErrorCode,
  PersonalInfoSchema,
  ProjectSchema,
  SkillSchema,
  WorkExperienceSchema,
  ThemeConfigSchema
} from '../types';
import { validateData, validateBatch } from './validation';

// ============================================================================
// Content Manager Class
// ============================================================================

export class ContentManager {
  private static instance: ContentManager;
  private portfolioConfig: PortfolioConfig | null = null;
  private projectData: ProjectData | null = null;
  private skillsData: SkillsData | null = null;
  private experienceData: ExperienceData | null = null;
  private isInitialized = false;

  private constructor() { }

  public static getInstance(): ContentManager {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager();
    }
    return ContentManager.instance;
  }

  // ============================================================================
  // Initialization and Loading
  // ============================================================================

  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      await Promise.all([
        this.loadPortfolioConfig(),
        this.loadProjectData(),
        this.loadSkillsData(),
        this.loadExperienceData()
      ]);

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize content manager:', error);
      throw new Error('Content initialization failed');
    }
  }

  public async reload(): Promise<void> {
    this.isInitialized = false;
    this.portfolioConfig = null;
    this.projectData = null;
    this.skillsData = null;
    this.experienceData = null;
    await this.initialize();
  }

  // ============================================================================
  // Portfolio Configuration Management
  // ============================================================================

  public async loadPortfolioConfig(): Promise<PortfolioConfig> {
    try {
      const response = await fetch('/content/portfolio-config.json');
      if (!response.ok) {
        throw new Error(`Failed to load portfolio config: ${response.statusText}`);
      }

      const config = await response.json();
      const validationResult = this.validatePortfolioConfig(config);

      if (!validationResult.isValid) {
        console.error('Portfolio config validation failed:', validationResult.errors);
        throw new Error('Invalid portfolio configuration');
      }

      this.portfolioConfig = config;
      return config;
    } catch (error) {
      console.error('Error loading portfolio config:', error);
      throw error;
    }
  }

  public getPortfolioConfig(): PortfolioConfig {
    if (!this.portfolioConfig) {
      throw new Error('Portfolio config not loaded. Call initialize() first.');
    }
    return this.portfolioConfig;
  }

  public async updatePortfolioConfig(config: Partial<PortfolioConfig>): Promise<void> {
    const currentConfig = this.getPortfolioConfig();
    const updatedConfig = { ...currentConfig, ...config };

    const validationResult = this.validatePortfolioConfig(updatedConfig);
    if (!validationResult.isValid) {
      throw new Error('Invalid configuration update');
    }

    this.portfolioConfig = updatedConfig;
    await this.savePortfolioConfig(updatedConfig);
  }

  // ============================================================================
  // Project Data Management
  // ============================================================================

  public async loadProjectData(): Promise<ProjectData> {
    try {
      const response = await fetch('/content/projects.json');
      if (!response.ok) {
        throw new Error(`Failed to load project data: ${response.statusText}`);
      }

      const data = await response.json();
      const validationResult = this.validateProjectData(data);

      if (!validationResult.isValid) {
        console.error('Project data validation failed:', validationResult.errors);
        throw new Error('Invalid project data');
      }

      this.projectData = data;
      return data;
    } catch (error) {
      console.error('Error loading project data:', error);
      throw error;
    }
  }

  public getProjectData(): ProjectData {
    if (!this.projectData) {
      throw new Error('Project data not loaded. Call initialize() first.');
    }
    return this.projectData;
  }

  public getProjects() {
    return this.getProjectData().projects;
  }

  public getProject(id: string) {
    const projects = this.getProjects();
    return projects.find(project => project.id === id);
  }

  public getFeaturedProjects() {
    return this.getProjects().filter(project => project.featured);
  }

  public getProjectsByCategory(category: string) {
    return this.getProjects().filter(project => project.category === category);
  }

  // ============================================================================
  // Skills Data Management
  // ============================================================================

  public async loadSkillsData(): Promise<SkillsData> {
    try {
      const response = await fetch('/content/skills.json');
      if (!response.ok) {
        throw new Error(`Failed to load skills data: ${response.statusText}`);
      }

      const data = await response.json();
      const validationResult = this.validateSkillsData(data);

      if (!validationResult.isValid) {
        console.error('Skills data validation failed:', validationResult.errors);
        throw new Error('Invalid skills data');
      }

      this.skillsData = data;
      return data;
    } catch (error) {
      console.error('Error loading skills data:', error);
      throw error;
    }
  }

  public getSkillsData(): SkillsData {
    if (!this.skillsData) {
      throw new Error('Skills data not loaded. Call initialize() first.');
    }
    return this.skillsData;
  }

  public getSkillGroups() {
    return this.getSkillsData().skillGroups;
  }

  public getSkillsByCategory(category: string) {
    const skillGroups = this.getSkillGroups();
    const group = skillGroups.find(group => group.category === category);
    return group ? group.skills : [];
  }

  // ============================================================================
  // Experience Data Management
  // ============================================================================

  public async loadExperienceData(): Promise<ExperienceData> {
    try {
      const response = await fetch('/content/experience.json');
      if (!response.ok) {
        throw new Error(`Failed to load experience data: ${response.statusText}`);
      }

      const data = await response.json();
      const validationResult = this.validateExperienceData(data);

      if (!validationResult.isValid) {
        console.error('Experience data validation failed:', validationResult.errors);
        throw new Error('Invalid experience data');
      }

      this.experienceData = data;
      return data;
    } catch (error) {
      console.error('Error loading experience data:', error);
      throw error;
    }
  }

  public getExperienceData(): ExperienceData {
    if (!this.experienceData) {
      throw new Error('Experience data not loaded. Call initialize() first.');
    }
    return this.experienceData;
  }

  public getWorkExperience() {
    return this.getExperienceData().workExperience;
  }

  public getEducation() {
    return this.getExperienceData().education;
  }

  public getCurrentJob() {
    const workExperience = this.getWorkExperience();
    return workExperience.find(job => job.current);
  }

  // ============================================================================
  // Content Validation
  // ============================================================================

  private validatePortfolioConfig(config: any): ValidationResult {
    // Validate personal info
    const personalInfoResult = validateData(config.personal, PersonalInfoSchema);
    if (!personalInfoResult.isValid) {
      return personalInfoResult;
    }

    // Validate theme config
    const themeResult = validateData(config.theme, ThemeConfigSchema);
    if (!themeResult.isValid) {
      return themeResult;
    }

    // Additional custom validations
    const errors: ValidationError[] = [];

    // Validate sections
    if (!config.sections || !Array.isArray(config.sections)) {
      errors.push({
        field: 'sections',
        message: 'Sections must be an array',
        code: 'INVALID_TYPE'
      });
    }

    // Validate SEO config
    if (!config.seo || typeof config.seo !== 'object') {
      errors.push({
        field: 'seo',
        message: 'SEO configuration is required',
        code: 'REQUIRED'
      });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private validateProjectData(data: any): ValidationResult {
    if (!data.projects || !Array.isArray(data.projects)) {
      return {
        isValid: false,
        errors: [{
          field: 'projects',
          message: 'Projects must be an array',
          code: 'INVALID_TYPE'
        }]
      };
    }

    // Validate each project
    const projectResults = data.projects.map((project: any, index: number) => ({
      [`project_${index}`]: validateData(project, ProjectSchema)
    }));

    const batchResult = validateBatch(projectResults);
    return {
      isValid: batchResult.isValid,
      errors: batchResult.results ? Object.values(batchResult.results).flatMap((r: any) => r.errors) : []
    };
  }

  private validateSkillsData(data: any): ValidationResult {
    if (!data.skillGroups || !Array.isArray(data.skillGroups)) {
      return {
        isValid: false,
        errors: [{
          field: 'skillGroups',
          message: 'Skill groups must be an array',
          code: 'INVALID_TYPE'
        }]
      };
    }

    const errors = [];

    // Validate each skill group
    for (const group of data.skillGroups) {
      if (!group.skills || !Array.isArray(group.skills)) {
        errors.push({
          field: `skillGroups.${group.category}.skills`,
          message: 'Skills must be an array',
          code: 'INVALID_TYPE'
        });
        continue;
      }

      // Validate each skill in the group
      for (const skill of group.skills) {
        const skillResult = validateData(skill, SkillSchema);
        if (!skillResult.isValid) {
          errors.push(...skillResult.errors.map((error: any) => ({
            ...error,
            field: `skillGroups.${group.category}.skills.${skill.name}.${error.field}`
          })));
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private validateExperienceData(data: any): ValidationResult {
    const errors = [];

    // Validate work experience
    if (data.workExperience && Array.isArray(data.workExperience)) {
      for (const experience of data.workExperience) {
        const result = validateData(experience, WorkExperienceSchema);
        if (!result.isValid) {
          errors.push(...result.errors.map((error: any) => ({
            ...error,
            field: `workExperience.${experience.id}.${error.field}`
          })));
        }
      }
    }

    // Validate education (basic validation)
    if (data.education && Array.isArray(data.education)) {
      for (const edu of data.education) {
        if (!edu.institution || !edu.degree || !edu.field) {
          errors.push({
            field: `education.${edu.id}`,
            message: 'Institution, degree, and field are required',
            code: 'REQUIRED'
          });
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // ============================================================================
  // Content Persistence (for dynamic updates)
  // ============================================================================

  private async savePortfolioConfig(config: PortfolioConfig): Promise<void> {
    // In a real application, this would save to a backend API
    // For now, we'll just log the update
    console.log('Portfolio config updated:', config);

    // In development, you might want to save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-config', JSON.stringify(config));
    }
  }

  // ============================================================================
  // Utility Methods
  // ============================================================================

  public async refreshContent(): Promise<void> {
    await this.reload();
  }

  public getContentSummary() {
    if (!this.isInitialized) {
      return null;
    }

    return {
      projects: this.projectData?.projects.length || 0,
      skillGroups: this.skillsData?.skillGroups.length || 0,
      workExperience: this.experienceData?.workExperience.length || 0,
      education: this.experienceData?.education.length || 0,
      lastUpdated: new Date().toISOString()
    };
  }

  public isContentLoaded(): boolean {
    return this.isInitialized;
  }
}

// ============================================================================
// Singleton Export
// ============================================================================

export const contentManager = ContentManager.getInstance();