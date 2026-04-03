import { PersonalInfo, Project, WorkExperience, Education } from '@/types';

/**
 * Generate structured data for SEO
 */

export interface StructuredDataConfig {
  personal: PersonalInfo;
  projects?: Project[];
  experience?: WorkExperience[];
  education?: Education[];
  siteUrl: string;
}

// Person Schema
export const generatePersonSchema = (personal: PersonalInfo, siteUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.name,
    jobTitle: personal.title,
    description: personal.bio,
    url: siteUrl,
    email: personal.email,
    telephone: personal.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: personal.location
    },
    image: personal.avatar ? `${siteUrl}${personal.avatar}` : undefined,
    sameAs: personal.socialLinks?.map(link => link.url) || [],
    knowsAbout: (personal as any).skills || [],
    alumniOf: (personal as any).education?.map((edu: any) => ({
      '@type': 'EducationalOrganization',
      name: edu.institution,
      description: `${edu.degree} in ${edu.field}`
    })) || [],
    worksFor: (personal as any).experience?.[0] ? {
      '@type': 'Organization',
      name: (personal as any).experience[0].company,
      description: (personal as any).experience[0].position
    } : undefined
  };
};

// Website Schema
export const generateWebsiteSchema = (siteUrl: string, siteName: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: 'Professional portfolio showcasing projects, skills, and experience',
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    creator: {
      '@type': 'Person',
      name: siteName.replace(' Portfolio', '').replace('Portfolio', '').trim()
    }
  };
};

// Portfolio/Creative Work Schema
export const generatePortfolioSchema = (projects: Project[], siteUrl: string, authorName: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${authorName} - Portfolio`,
    description: 'A collection of professional projects and creative works',
    url: siteUrl,
    author: {
      '@type': 'Person',
      name: authorName
    },
    hasPart: projects.map(project => ({
      '@type': 'CreativeWork',
      name: project.title,
      description: project.description,
      url: project.liveUrl || project.githubUrl,
      dateCreated: project.completedDate,
      author: {
        '@type': 'Person',
        name: authorName
      },
      keywords: project.technologies?.map(tech => tech.name) || [],
      image: project.images?.[0]?.src ? `${siteUrl}${project.images[0].src}` : undefined
    }))
  };
};

// Professional Service Schema
export const generateProfessionalServiceSchema = (personal: PersonalInfo, siteUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${personal.name} - ${personal.title}`,
    description: personal.bio,
    url: siteUrl,
    telephone: personal.phone,
    email: personal.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: personal.location
    },
    provider: {
      '@type': 'Person',
      name: personal.name,
      jobTitle: personal.title,
      description: personal.bio
    },
    areaServed: 'Worldwide',
    serviceType: personal.title || 'Professional Services'
  };
};

// Organization Schema (if freelancer/company)
export const generateOrganizationSchema = (personal: PersonalInfo, siteUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: personal.name,
    description: personal.bio,
    url: siteUrl,
    email: personal.email,
    telephone: personal.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: personal.location
    },
    founder: {
      '@type': 'Person',
      name: personal.name
    },
    sameAs: personal.socialLinks?.map(link => link.url) || []
  };
};

// Breadcrumb Schema
export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
};

// FAQ Schema (for common questions)
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

// Article Schema (for blog posts if applicable)
export const generateArticleSchema = (
  title: string,
  description: string,
  author: string,
  publishedDate: string,
  modifiedDate: string,
  url: string,
  imageUrl?: string
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@type': 'Person',
      name: author
    },
    datePublished: publishedDate,
    dateModified: modifiedDate,
    url: url,
    image: imageUrl ? {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630
    } : undefined,
    publisher: {
      '@type': 'Person',
      name: author
    }
  };
};

// Main function to generate all structured data
export const generateAllStructuredData = (config: StructuredDataConfig) => {
  const { personal, projects = [], experience = [], education = [], siteUrl } = config;
  
  const schemas: any[] = [
    generatePersonSchema(personal, siteUrl),
    generateWebsiteSchema(siteUrl, `${personal.name} Portfolio`),
    generateProfessionalServiceSchema(personal, siteUrl)
  ];

  // Add portfolio schema if projects exist
  if (projects.length > 0) {
    schemas.push(generatePortfolioSchema(projects, siteUrl, personal.name));
  }

  // Combine all schemas into a single structured data object
  return {
    '@context': 'https://schema.org',
    '@graph': schemas
  };
};

export default generateAllStructuredData;