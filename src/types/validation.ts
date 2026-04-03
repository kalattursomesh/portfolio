/**
 * Validation Schema Types
 * Defines validation rules and schemas for content data validation
 */

// ============================================================================
// Base Validation Types
// ============================================================================

export interface ValidationSchema<T = any> {
  fields: Record<keyof T, FieldSchema>;
  customValidators?: CustomValidator<T>[];
  required?: (keyof T)[];
}

export interface FieldSchema {
  type: 'string' | 'number' | 'boolean' | 'date' | 'email' | 'url' | 'array' | 'object';
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  enum?: string[] | number[];
  arrayOf?: FieldSchema;
  properties?: Record<string, FieldSchema>;
  customValidator?: (value: any) => ValidationResult;
}

export interface CustomValidator<T> {
  name: string;
  validator: (data: T) => ValidationResult;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings?: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: ValidationErrorCode;
  value?: any;
}

export interface ValidationWarning {
  field: string;
  message: string;
  code: string;
  value?: any;
}

export type ValidationErrorCode = 
  | 'REQUIRED'
  | 'INVALID_TYPE'
  | 'MIN_LENGTH'
  | 'MAX_LENGTH'
  | 'MIN_VALUE'
  | 'MAX_VALUE'
  | 'INVALID_FORMAT'
  | 'INVALID_EMAIL'
  | 'INVALID_URL'
  | 'INVALID_DATE'
  | 'ENUM_MISMATCH'
  | 'CUSTOM_ERROR';

// ============================================================================
// Portfolio Configuration Validation Schemas
// ============================================================================

export const PersonalInfoSchema: ValidationSchema = {
  fields: {
    name: { type: 'string', required: true, minLength: 2, maxLength: 100 },
    title: { type: 'string', required: true, minLength: 2, maxLength: 200 },
    email: { type: 'email', required: true },
    phone: { type: 'string', pattern: /^\+?[\d\s\-\(\)]+$/ },
    location: { type: 'string', required: true, minLength: 2, maxLength: 100 },
    bio: { type: 'string', required: true, minLength: 50, maxLength: 1000 },
    avatar: { type: 'url', required: true },
    resume: { type: 'url', required: true },
    socialLinks: { 
      type: 'array', 
      arrayOf: {
        type: 'object',
        properties: {
          platform: { type: 'string', required: true },
          url: { type: 'url', required: true },
          icon: { type: 'string', required: true },
          label: { type: 'string', required: true }
        }
      }
    }
  },
  required: ['name', 'title', 'email', 'location', 'bio', 'avatar', 'resume']
};

export const ProjectSchema: ValidationSchema = {
  fields: {
    id: { type: 'string', required: true, pattern: /^[a-z0-9-]+$/ },
    title: { type: 'string', required: true, minLength: 2, maxLength: 100 },
    description: { type: 'string', required: true, minLength: 50, maxLength: 1000 },
    technologies: { 
      type: 'array', 
      arrayOf: { type: 'string' },
      minLength: 1 
    },
    category: { type: 'string', required: true },
    images: { 
      type: 'array', 
      arrayOf: {
        type: 'object',
        properties: {
          src: { type: 'url', required: true },
          alt: { type: 'string', required: true },
          width: { type: 'number', required: true, min: 1 },
          height: { type: 'number', required: true, min: 1 }
        }
      },
      minLength: 1
    },
    liveUrl: { type: 'url' },
    githubUrl: { type: 'url' },
    featured: { type: 'boolean', required: true },
    completedDate: { type: 'date', required: true },
    status: { 
      type: 'string', 
      enum: ['completed', 'in-progress', 'planned'],
      required: true 
    }
  },
  required: ['id', 'title', 'description', 'technologies', 'category', 'images', 'featured', 'completedDate', 'status']
};

export const SkillSchema: ValidationSchema = {
  fields: {
    name: { type: 'string', required: true, minLength: 1, maxLength: 50 },
    proficiency: { type: 'number', required: true, min: 0, max: 100 },
    yearsExperience: { type: 'number', required: true, min: 0, max: 50 },
    projects: { 
      type: 'array', 
      arrayOf: { type: 'string' }
    },
    category: { 
      type: 'string', 
      enum: ['frontend', 'backend', 'database', 'cloud', 'mobile', 'design', 'tools', 'soft-skills', 'languages'],
      required: true 
    }
  },
  required: ['name', 'proficiency', 'yearsExperience', 'category']
};

export const WorkExperienceSchema: ValidationSchema = {
  fields: {
    id: { type: 'string', required: true, pattern: /^[a-z0-9-]+$/ },
    company: { type: 'string', required: true, minLength: 2, maxLength: 100 },
    position: { type: 'string', required: true, minLength: 2, maxLength: 100 },
    startDate: { type: 'date', required: true },
    endDate: { type: 'date' },
    current: { type: 'boolean', required: true },
    description: { type: 'string', required: true, minLength: 50, maxLength: 1000 },
    responsibilities: { 
      type: 'array', 
      arrayOf: { type: 'string', minLength: 10, maxLength: 200 },
      minLength: 1
    },
    technologies: { 
      type: 'array', 
      arrayOf: { type: 'string' }
    },
    achievements: { 
      type: 'array', 
      arrayOf: { type: 'string', minLength: 10, maxLength: 200 }
    },
    location: { type: 'string', required: true, minLength: 2, maxLength: 100 },
    employmentType: { 
      type: 'string', 
      enum: ['full-time', 'part-time', 'contract', 'freelance', 'internship'],
      required: true 
    }
  },
  required: ['id', 'company', 'position', 'startDate', 'current', 'description', 'responsibilities', 'location', 'employmentType'],
  customValidators: [
    {
      name: 'dateConsistency',
      validator: (data) => {
        if (!data.current && !data.endDate) {
          return {
            isValid: false,
            errors: [{
              field: 'endDate',
              message: 'End date is required when current is false',
              code: 'REQUIRED'
            }]
          };
        }
        if (data.endDate && data.startDate && new Date(data.endDate) <= new Date(data.startDate)) {
          return {
            isValid: false,
            errors: [{
              field: 'endDate',
              message: 'End date must be after start date',
              code: 'INVALID_DATE'
            }]
          };
        }
        return { isValid: true, errors: [] };
      },
      message: 'Date validation failed'
    }
  ]
};

export const ThemeConfigSchema: ValidationSchema = {
  fields: {
    colorScheme: { 
      type: 'string', 
      enum: ['light', 'dark', 'auto'],
      required: true 
    },
    primaryColor: { 
      type: 'string', 
      required: true, 
      pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/ 
    },
    secondaryColor: { 
      type: 'string', 
      required: true, 
      pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/ 
    },
    accentColor: { 
      type: 'string', 
      required: true, 
      pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/ 
    },
    fontFamily: {
      type: 'object',
      required: true,
      properties: {
        heading: { type: 'string', required: true },
        body: { type: 'string', required: true },
        mono: { type: 'string', required: true }
      }
    },
    borderRadius: { type: 'string', required: true },
    shadows: { type: 'boolean', required: true },
    glassmorphism: { type: 'boolean', required: true }
  },
  required: ['colorScheme', 'primaryColor', 'secondaryColor', 'accentColor', 'fontFamily', 'borderRadius', 'shadows', 'glassmorphism']
};

// ============================================================================
// Contact Form Validation Schema
// ============================================================================

export const ContactFormSchema: ValidationSchema = {
  fields: {
    name: { 
      type: 'string', 
      required: true, 
      minLength: 2, 
      maxLength: 100,
      pattern: /^[a-zA-Z\s\-'\.]+$/
    },
    email: { 
      type: 'email', 
      required: true,
      maxLength: 254
    },
    subject: { 
      type: 'string', 
      required: true, 
      minLength: 5, 
      maxLength: 200 
    },
    message: { 
      type: 'string', 
      required: true, 
      minLength: 20, 
      maxLength: 2000 
    },
    honeypot: { 
      type: 'string',
      customValidator: (value) => {
        if (value && value.trim() !== '') {
          return {
            isValid: false,
            errors: [{
              field: 'honeypot',
              message: 'Spam detected',
              code: 'CUSTOM_ERROR'
            }]
          };
        }
        return { isValid: true, errors: [] };
      }
    },
    consent: { 
      type: 'boolean', 
      required: true,
      customValidator: (value) => {
        if (value !== true) {
          return {
            isValid: false,
            errors: [{
              field: 'consent',
              message: 'Consent is required',
              code: 'REQUIRED'
            }]
          };
        }
        return { isValid: true, errors: [] };
      }
    }
  },
  required: ['name', 'email', 'subject', 'message', 'consent']
};

// ============================================================================
// Validation Utility Functions
// ============================================================================

export interface ValidatorConfig {
  strict?: boolean; // Fail on warnings
  skipCustomValidators?: boolean;
  fieldPrefix?: string; // For nested validation
}

export interface BatchValidationResult {
  isValid: boolean;
  results: Record<string, ValidationResult>;
  summary: {
    totalErrors: number;
    totalWarnings: number;
    validItems: number;
    invalidItems: number;
  };
}