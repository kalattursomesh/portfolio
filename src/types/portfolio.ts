/**
 * Core Portfolio Configuration Types
 * Defines the main data structures for the professional portfolio system
 */

// ============================================================================
// Core Portfolio Configuration
// ============================================================================

export interface PortfolioConfig {
  personal: PersonalInfo;
  sections: SectionConfig[];
  theme: ThemeConfig;
  seo: SEOConfig;
  analytics: AnalyticsConfig;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  bio: string;
  avatar: string;
  resume: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface SectionConfig {
  id: string;
  enabled: boolean;
  order: number;
  title: string;
  subtitle?: string;
  content: any; // Section-specific content
  animations: AnimationConfig[];
}

// ============================================================================
// Theme Configuration
// ============================================================================

export interface ThemeConfig {
  colorScheme: 'light' | 'dark' | 'auto';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: FontConfig;
  borderRadius: string;
  shadows: boolean;
  glassmorphism: boolean;
}

export interface FontConfig {
  heading: string;
  body: string;
  mono: string;
}

// ============================================================================
// SEO and Analytics Configuration
// ============================================================================

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
  structuredData: StructuredData;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
  socialLinks?: string[];
  author?: string;
  type?: string;
  locale?: string;
  siteName?: string;
  twitterHandle?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  name: string;
  jobTitle: string;
  url: string;
  sameAs: string[];
  worksFor?: Organization;
}

export interface Organization {
  '@type': string;
  name: string;
  url?: string;
}

export interface AnalyticsConfig {
  googleAnalytics?: string;
  googleTagManager?: string;
  hotjar?: string;
  enabled: boolean;
}

// ============================================================================
// Animation Configuration
// ============================================================================

export interface AnimationConfig {
  type: 'fadeIn' | 'slideUp' | 'scaleIn' | 'rotateIn' | 'custom';
  duration: number;
  delay: number;
  easing: string;
  trigger?: ScrollTriggerConfig;
}

export interface ScrollTriggerConfig {
  start: string;
  end: string;
  scrub: boolean;
  pin: boolean;
  markers?: boolean;
}

export interface ParticleConfig {
  count: number;
  size: { min: number; max: number };
  speed: { min: number; max: number };
  colors: string[];
  shapes: ('circle' | 'square' | 'triangle')[];
}

export interface HeroAnimations {
  textReveal: AnimationConfig;
  avatarHover: AnimationConfig;
  backgroundParticles: ParticleConfig;
}

// ============================================================================
// Image and Media Types
// ============================================================================

export interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
  placeholder?: string;
  priority?: boolean;
}

export interface CTAButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
  icon?: string;
}