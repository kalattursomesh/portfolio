# Professional Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features smooth animations, optimal performance, and comprehensive accessibility support.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Smooth Animations**: Framer Motion & GSAP integration
- **Responsive Design**: Mobile-first approach with touch optimization
- **Performance Optimized**: Lighthouse score 90+, lazy loading, image optimization
- **SEO Ready**: Structured data, meta tags, sitemap generation
- **Accessibility Compliant**: WCAG 2.1 AA standards
- **Cross-Browser Compatible**: Chrome, Firefox, Safari, Edge support
- **Content Management**: JSON-based configuration system
- **Contact Form**: Validation, spam protection, email integration
- **Dark/Light Mode**: Automatic theme detection

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Customization](#customization)
- [Deployment](#deployment)
- [Performance](#performance)
- [Accessibility](#accessibility)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_SITE_URL=https://yourportfolio.com
   NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
   EMAIL_FROM=noreply@yourportfolio.com
   EMAIL_TO=hello@yourportfolio.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
│   ├── images/            # Images and graphics
│   ├── icons/             # Icon files
│   └── files/             # Documents (resume, etc.)
├── src/
│   ├── app/               # Next.js 15 App Router
│   │   ├── api/           # API routes
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   ├── sitemap.ts     # Sitemap generation
│   │   └── robots.ts      # Robots.txt
│   ├── components/        # React components
│   │   ├── Animation/     # Animation components
│   │   ├── Contact/       # Contact form
│   │   ├── Hero/          # Hero section
│   │   ├── Layout/        # Layout components
│   │   ├── Projects/      # Project showcase
│   │   ├── Skills/        # Skills visualization
│   │   └── UI/            # Reusable UI components
│   ├── data/              # Content configuration
│   │   ├── portfolio.json # Main portfolio data
│   │   └── siteConfig.json# Site configuration
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   ├── types/             # TypeScript definitions
│   └── utils/             # Utility functions
├── .kiro/                 # Kiro configuration
│   └── specs/             # Project specifications
├── docs/                  # Documentation
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## ⚙️ Configuration

### Site Configuration

Edit `src/data/siteConfig.json` to customize your site:

```json
{
  "site": {
    "name": "Your Name Portfolio",
    "title": "Your Name - Your Title",
    "description": "Your description",
    "url": "https://yourportfolio.com",
    "author": "Your Name"
  },
  "theme": {
    "primaryColor": "#3B82F6",
    "secondaryColor": "#64748B"
  }
}
```

### Portfolio Content

Edit `src/data/portfolio.json` to add your content:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "bio": "Your bio",
    "email": "your@email.com"
  },
  "projects": [...],
  "skills": [...],
  "experience": [...]
}
```

## 🎨 Customization

### Adding Your Content

1. **Personal Information**
   - Update `src/data/portfolio.json` with your details
   - Replace avatar image in `public/images/avatar.jpg`
   - Add your resume to `public/files/resume.pdf`

2. **Projects**
   - Add project images to `public/images/projects/`
   - Update project data in `portfolio.json`
   - Include live URLs and GitHub repositories

3. **Skills**
   - Organize skills by categories
   - Set proficiency levels (0-100)
   - Link skills to relevant projects

4. **Experience**
   - Add work experience with dates
   - Include company logos in `public/images/companies/`
   - List achievements and technologies used

### Styling

1. **Colors**
   - Edit `tailwind.config.js` for color scheme
   - Update CSS custom properties in `globals.css`

2. **Typography**
   - Configure fonts in `next.config.js`
   - Update font families in `siteConfig.json`

3. **Animations**
   - Customize animation settings in component files
   - Adjust timing and easing in animation hooks

### Components

All components are modular and customizable:

- **Hero Section**: `src/components/Hero/HeroSection.tsx`
- **Projects**: `src/components/Projects/ProjectShowcase.tsx`
- **Skills**: `src/components/Skills/SkillsVisualization.tsx`
- **Contact**: `src/components/Contact/ContactForm.tsx`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Set environment variables**
   - Add environment variables in Vercel dashboard
   - Configure custom domain if needed

### Netlify

1. **Build command**: `npm run build`
2. **Publish directory**: `out`
3. **Set environment variables** in Netlify dashboard

### Self-Hosted

1. **Build the project**
   ```bash
   npm run build
   npm run export
   ```

2. **Serve static files**
   - Upload `out/` directory to your server
   - Configure web server (nginx, Apache)

## ⚡ Performance

### Optimization Features

- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components and images load on demand
- **Critical CSS**: Above-the-fold styles inlined
- **Compression**: Gzip/Brotli compression enabled
- **Caching**: Optimized cache headers

### Performance Monitoring

```bash
# Lighthouse audit
npm run lighthouse

# Bundle analysis
npm run analyze

# Performance testing
npm run test:performance
```

### Performance Targets

- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## ♿ Accessibility

### WCAG 2.1 AA Compliance

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and descriptions
- **Color Contrast**: 4.5:1 minimum ratio
- **Focus Management**: Visible focus indicators
- **Skip Links**: Navigation shortcuts
- **Semantic HTML**: Proper heading structure

### Accessibility Testing

```bash
# Automated accessibility testing
npm run test:a11y

# Manual testing checklist
npm run a11y:checklist
```

### Accessibility Features

- Skip links for keyboard users
- Screen reader announcements
- Reduced motion support
- High contrast mode support
- Touch target optimization (44px minimum)

## 🌐 Browser Support

### Supported Browsers

- **Chrome**: Last 2 versions
- **Firefox**: Last 2 versions  
- **Safari**: Last 2 versions
- **Edge**: Last 2 versions

### Polyfills Included

- IntersectionObserver
- ResizeObserver
- Web Animations API
- CSS Custom Properties (IE11)

### Feature Detection

The site includes automatic feature detection and graceful fallbacks:

```javascript
// Example: CSS Grid fallback
.grid-container {
  display: flex; /* Fallback */
  display: grid; /* Modern browsers */
}
```

## 🧪 Testing

### Running Tests

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Accessibility tests
npm run test:a11y

# Performance tests
npm run test:performance
```

### Test Coverage

- **Unit Tests**: Component logic and utilities
- **Integration Tests**: Component interactions
- **E2E Tests**: User workflows
- **Visual Regression**: UI consistency
- **Performance Tests**: Load times and metrics

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier
```

### Code Quality

- **ESLint**: Code linting and best practices
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **Husky**: Pre-commit hooks
- **Commitlint**: Conventional commits

### Environment Variables

```env
# Required
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com

# Optional
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
EMAIL_FROM=noreply@yourportfolio.com
EMAIL_TO=hello@yourportfolio.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 📚 Documentation

### Additional Docs

- [Content Management Guide](docs/content-management.md)
- [Customization Guide](docs/customization.md)
- [Deployment Guide](docs/deployment.md)
- [Performance Guide](docs/performance.md)
- [Accessibility Guide](docs/accessibility.md)
- [Troubleshooting](docs/troubleshooting.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Maintain accessibility standards
- Update documentation
- Follow conventional commits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [GSAP](https://greensock.com/gsap/) - Animation platform
- [Vercel](https://vercel.com/) - Deployment platform

## 📞 Support

If you have any questions or need help:

- 📧 Email: support@yourportfolio.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/portfolio/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/portfolio/discussions)

---

**Built with ❤️ using Next.js and modern web technologies**