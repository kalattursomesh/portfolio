/** @type {import('next').NextConfig} */
const nextConfig = {
  // Experimental features
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap'],
  },

  // Turbopack configuration (Next.js 16 default)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },

  // Output configuration for Netlify/GitHub Pages
  output: 'export',

  // Disable x-powered-by header
  poweredByHeader: false,

  // Enable React strict mode
  reactStrictMode: true,

  // Webpack config (fallback for legacy builds)
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;