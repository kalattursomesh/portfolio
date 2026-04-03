# Content Management Guide

This guide explains how to manage and update content in your portfolio website without touching the code.

## 📋 Table of Contents

- [Overview](#overview)
- [Personal Information](#personal-information)
- [Projects](#projects)
- [Skills](#skills)
- [Experience](#experience)
- [Site Configuration](#site-configuration)
- [Images and Assets](#images-and-assets)
- [Best Practices](#best-practices)

## 🎯 Overview

The portfolio uses a JSON-based content management system that separates content from code. All content is stored in JSON files in the `src/data/` directory:

- `portfolio.json` - Main portfolio content (personal info, projects, skills, experience)
- `siteConfig.json` - Site-wide settings and configuration
- `projectCategories.json` - Project category definitions

## 👤 Personal Information

Edit the `personal` section in `src/data/portfolio.json`:

```json
{
  "personal": {
    "name": "Your Full Name",
    "title": "Your Professional Title",
    "email": "your@email.com",
    "phone": "+1 (555) 123-4567",
    "location": "Your City, State",
    "bio": "Your professional bio (2-3 sentences)",
    "avatar": "/images/avatar.jpg",
    "resume": "/files/your-resume.pdf",
    "socialLinks": [
      {
        "platform": "GitHub",
        "url": "https://github.com/yourusername",
        "icon": "github",
        "username": "yourusername"
      }
    ]
  }
}
```

### Social Links

Supported platforms and their icons:
- `github` - GitHub profile
- `linkedin` - LinkedIn profile
- `twitter` - Twitter/X profile
- `dribbble` - Dribbble profile
- `behance` - Behance profile
- `instagram` - Instagram profile
- `youtube` - YouTube channel
- `medium` - Medium profile

## 🚀 Projects

### Adding a New Project

Add to the `projects` array in `portfolio.json`:

```json
{
  "id": "unique-project-id",
  "title": "Project Title",
  "description": "Short description (1-2 sentences)",
  "longDescription": "Detailed description (2-3 paragraphs)",
  "technologies": [
    {
      "name": "React",
      "category": "frontend",
      "icon": "react",
      "color": "#61DAFB"
    }
  ],
  "category": "web-development",
  "images": [
    {
      "src": "/images/projects/project-hero.jpg",
      "alt": "Project screenshot description",
      "width": 1200,
      "height": 800,
      "priority": true
    }
  ],
  "liveUrl": "https://project-demo.com",
  "githubUrl": "https://github.com/username/project",
  "featured": true,
  "completedDate": "2024-01-15T00:00:00.000Z",
  "highlights": [
    "Key achievement 1",
    "Key achievement 2",
    "Key achievement 3"
  ]
}
```

### Project Categories

Available categories (defined in `projectCategories.json`):
- `web-development` - Web applications
- `mobile-development` - Mobile apps
- `data-visualization` - Charts and dashboards
- `ai-ml` - AI and machine learning
- `ui-ux` - Design projects
- `open-source` - Open source contributions

### Technology Categories

For the `technologies` array:
- `frontend` - Frontend technologies
- `backend` - Backend technologies
- `database` - Databases
- `tool` - Tools and utilities
- `cloud` - Cloud services

### Image Guidelines

- **Hero Image**: 1200x800px, high quality
- **Additional Images**: Various sizes, optimized
- **Alt Text**: Descriptive text for accessibility
- **Priority**: Set `true` for above-the-fold images

## 🛠️ Skills

### Skill Categories

Organize skills into categories in the `skills` array:

```json
{
  "category": "Frontend Development",
  "color": "#3B82F6",
  "icon": "code",
  "skills": [
    {
      "name": "React",
      "proficiency": 95,
      "yearsExperience": 5,
      "projects": ["project-id-1", "project-id-2"]
    }
  ]
}
```

### Proficiency Levels

- `90-100` - Expert level
- `80-89` - Advanced level
- `70-79` - Intermediate level
- `60-69` - Beginner level

### Available Icons

Common skill category icons:
- `code` - Programming/Frontend
- `server` - Backend/Infrastructure
- `database` - Data/Storage
- `smartphone` - Mobile development
- `palette` - Design/Creative
- `brain` - AI/ML
- `chart` - Analytics/Data

## 💼 Experience

### Adding Work Experience

Add to the `experience` array:

```json
{
  "id": "unique-experience-id",
  "company": "Company Name",
  "position": "Your Position",
  "startDate": "2022-03-01T00:00:00.000Z",
  "endDate": null,
  "current": true,
  "description": "Brief role description",
  "responsibilities": [
    "Key responsibility 1",
    "Key responsibility 2"
  ],
  "technologies": ["React", "Node.js", "TypeScript"],
  "achievements": [
    "Major achievement 1",
    "Major achievement 2"
  ],
  "companyLogo": "/images/companies/company.png",
  "companyUrl": "https://company.com"
}
```

### Date Format

Use ISO 8601 format: `YYYY-MM-DDTHH:mm:ss.sssZ`
- Current position: `"endDate": null, "current": true`
- Past position: `"endDate": "2022-02-28T00:00:00.000Z", "current": false`

## ⚙️ Site Configuration

Edit `src/data/siteConfig.json` for site-wide settings:

### Basic Site Info

```json
{
  "site": {
    "name": "Your Portfolio Name",
    "title": "Page title for SEO",
    "description": "Meta description for SEO",
    "url": "https://yourportfolio.com",
    "author": "Your Name",
    "keywords": ["keyword1", "keyword2"]
  }
}
```

### Theme Configuration

```json
{
  "theme": {
    "colorScheme": "auto",
    "primaryColor": "#3B82F6",
    "secondaryColor": "#64748B",
    "accentColor": "#F59E0B"
  }
}
```

### Section Management

Enable/disable sections:

```json
{
  "sections": [
    {
      "id": "hero",
      "enabled": true,
      "order": 1,
      "title": "Welcome"
    }
  ]
}
```

### Navigation

Customize navigation items:

```json
{
  "navigation": {
    "logo": "Your Initials",
    "items": [
      {
        "label": "Home",
        "href": "#hero",
        "order": 1
      }
    ]
  }
}
```

## 🖼️ Images and Assets

### Directory Structure

```
public/
├── images/
│   ├── avatar.jpg           # Your profile photo
│   ├── og-image.jpg         # Social media preview
│   ├── projects/            # Project screenshots
│   │   ├── project1-hero.jpg
│   │   └── project1-detail.jpg
│   └── companies/           # Company logos
│       └── company-logo.png
├── icons/                   # Icon files
└── files/                   # Documents
    └── resume.pdf
```

### Image Optimization

- **Format**: Use WebP or AVIF when possible
- **Size**: Optimize for web (compress images)
- **Dimensions**: Follow recommended sizes
- **Alt Text**: Always provide descriptive alt text

### Recommended Sizes

- **Avatar**: 400x400px (square)
- **Project Hero**: 1200x800px (3:2 ratio)
- **Project Details**: 1200x800px or 800x600px
- **Company Logos**: 200x100px (transparent background)
- **OG Image**: 1200x630px (social media)

## 📝 Best Practices

### Content Writing

1. **Keep it concise**: Use clear, concise language
2. **Focus on impact**: Highlight achievements and results
3. **Use action words**: Start with strong verbs
4. **Be specific**: Include numbers and metrics
5. **Stay current**: Update regularly

### SEO Optimization

1. **Keywords**: Include relevant keywords naturally
2. **Meta descriptions**: Write compelling descriptions
3. **Alt text**: Describe images accurately
4. **URLs**: Use clean, descriptive URLs
5. **Structured data**: Ensure proper schema markup

### Accessibility

1. **Alt text**: Provide for all images
2. **Headings**: Use proper heading hierarchy
3. **Links**: Write descriptive link text
4. **Colors**: Ensure sufficient contrast
5. **Forms**: Label all form fields

### Performance

1. **Images**: Optimize and compress all images
2. **Content**: Keep descriptions reasonable length
3. **Links**: Verify all external links work
4. **Data**: Remove unused projects/skills
5. **Updates**: Regular content maintenance

## 🔄 Content Updates

### Regular Maintenance

- **Monthly**: Review and update project status
- **Quarterly**: Add new projects and skills
- **Annually**: Update experience and achievements
- **As needed**: Fix broken links and outdated info

### Version Control

1. **Backup**: Keep backups of your content files
2. **Testing**: Test changes in development first
3. **Validation**: Validate JSON syntax
4. **Deployment**: Deploy changes carefully

### Content Validation

Before publishing:
- [ ] JSON syntax is valid
- [ ] All image paths exist
- [ ] External links work
- [ ] Dates are in correct format
- [ ] Required fields are filled
- [ ] Content is proofread

## 🆘 Troubleshooting

### Common Issues

1. **JSON Syntax Error**
   - Check for missing commas or quotes
   - Use a JSON validator tool
   - Check bracket/brace matching

2. **Images Not Loading**
   - Verify file paths are correct
   - Check file exists in public directory
   - Ensure proper file extensions

3. **Dates Not Displaying**
   - Use ISO 8601 format
   - Include timezone information
   - Check for typos in date strings

4. **Links Not Working**
   - Verify URLs are complete
   - Test external links
   - Check for typos in URLs

### Getting Help

If you need assistance:
1. Check the main README.md
2. Review error messages carefully
3. Validate JSON syntax online
4. Create an issue on GitHub

---

**Remember**: Always test your changes in development before deploying to production!