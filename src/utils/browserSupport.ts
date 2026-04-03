/**
 * Browser support detection and polyfill utilities
 */

// Browser detection
export const getBrowserInfo = () => {
  if (typeof window === 'undefined') {
    return { name: 'unknown', version: 'unknown', isSupported: true };
  }

  const userAgent = navigator.userAgent;
  let browserName = 'unknown';
  let browserVersion = 'unknown';

  // Chrome
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    browserName = 'chrome';
    const match = userAgent.match(/Chrome\/(\d+)/);
    browserVersion = match ? (match[1] || 'unknown') : 'unknown';
  }
  // Firefox
  else if (userAgent.includes('Firefox')) {
    browserName = 'firefox';
    const match = userAgent.match(/Firefox\/(\d+)/);
    browserVersion = match ? (match[1] || 'unknown') : 'unknown';
  }
  // Safari
  else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browserName = 'safari';
    const match = userAgent.match(/Version\/(\d+)/);
    browserVersion = match ? (match[1] || 'unknown') : 'unknown';
  }
  // Edge
  else if (userAgent.includes('Edg')) {
    browserName = 'edge';
    const match = userAgent.match(/Edg\/(\d+)/);
    browserVersion = match ? (match[1] || 'unknown') : 'unknown';
  }
  // Internet Explorer
  else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
    browserName = 'ie';
    const match = userAgent.match(/(?:MSIE |rv:)(\d+)/);
    browserVersion = match ? (match[1] || 'unknown') : 'unknown';
  }

  // Check if browser is supported (last 2 versions)
  const supportedVersions: Record<string, number> = {
    chrome: 90,
    firefox: 88,
    safari: 14,
    edge: 90,
    ie: 0 // IE not supported
  };

  const isSupported = browserName !== 'unknown' && 
    parseInt(browserVersion) >= (supportedVersions[browserName] || 0);

  return {
    name: browserName,
    version: browserVersion,
    isSupported,
    userAgent
  };
};

// Feature detection
export const supportsFeature = {
  // CSS Features
  cssGrid: () => {
    if (typeof window === 'undefined') return true;
    return CSS.supports('display', 'grid');
  },

  cssFlexbox: () => {
    if (typeof window === 'undefined') return true;
    return CSS.supports('display', 'flex');
  },

  cssCustomProperties: () => {
    if (typeof window === 'undefined') return true;
    return CSS.supports('--custom-property', 'value');
  },

  cssClipPath: () => {
    if (typeof window === 'undefined') return true;
    return CSS.supports('clip-path', 'circle(50%)');
  },

  cssBackdropFilter: () => {
    if (typeof window === 'undefined') return true;
    return CSS.supports('backdrop-filter', 'blur(10px)');
  },

  // JavaScript Features
  intersectionObserver: () => {
    return typeof window !== 'undefined' && 'IntersectionObserver' in window;
  },

  resizeObserver: () => {
    return typeof window !== 'undefined' && 'ResizeObserver' in window;
  },

  webAnimations: () => {
    return typeof window !== 'undefined' && 'animate' in document.createElement('div');
  },

  serviceWorker: () => {
    return typeof window !== 'undefined' && 'serviceWorker' in navigator;
  },

  webp: () => {
    if (typeof window === 'undefined') return true;
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  },

  avif: () => {
    if (typeof window === 'undefined') return true;
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  },

  // Touch and pointer events
  touchEvents: () => {
    return typeof window !== 'undefined' && 'ontouchstart' in window;
  },

  pointerEvents: () => {
    return typeof window !== 'undefined' && 'onpointerdown' in window;
  },

  // Media queries
  prefersReducedMotion: () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  prefersColorScheme: () => {
    if (typeof window === 'undefined') return 'light';
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    return 'no-preference';
  }
};

// Polyfills
export const loadPolyfills = async () => {
  const polyfills: Promise<void>[] = [];

  // IntersectionObserver polyfill
  if (!supportsFeature.intersectionObserver()) {
    // polyfills.push(
    //   import('intersection-observer').then(() => {
    //     console.log('IntersectionObserver polyfill loaded');
    //   }).catch(() => {
    //     console.warn('Failed to load IntersectionObserver polyfill');
    //   })
    // );
  }

  // ResizeObserver polyfill
  if (!supportsFeature.resizeObserver()) {
    // polyfills.push(
    //   import('@juggle/resize-observer').then(({ ResizeObserver }) => {
    //     if (!window.ResizeObserver) {
    //       window.ResizeObserver = ResizeObserver;
    //     }
    //     console.log('ResizeObserver polyfill loaded');
    //   }).catch(() => {
    //     console.warn('Failed to load ResizeObserver polyfill');
    //   })
    // );
  }

  // Web Animations API polyfill
  if (!supportsFeature.webAnimations()) {
    // polyfills.push(
    //   import('web-animations-js').then(() => {
    //     console.log('Web Animations API polyfill loaded');
    //   }).catch(() => {
    //     console.warn('Failed to load Web Animations API polyfill');
    //   })
    // );
  }

  // CSS.supports polyfill for older browsers
  if (typeof CSS === 'undefined' || !CSS.supports) {
    window.CSS = window.CSS || {};
    CSS.supports = CSS.supports || (() => false);
  }

  await Promise.all(polyfills);
};

// Graceful fallbacks
export const getFallbackStyles = () => {
  const fallbacks: Record<string, string> = {};

  if (!supportsFeature.cssGrid()) {
    fallbacks['--grid-fallback'] = 'flex';
  }

  if (!supportsFeature.cssCustomProperties()) {
    fallbacks['--primary-color'] = '#3b82f6';
    fallbacks['--secondary-color'] = '#64748b';
    fallbacks['--accent-color'] = '#f59e0b';
  }

  if (!supportsFeature.cssBackdropFilter()) {
    fallbacks['--backdrop-fallback'] = 'rgba(255, 255, 255, 0.9)';
  }

  return fallbacks;
};

// Browser-specific CSS classes
export const getBrowserClasses = () => {
  const browser = getBrowserInfo();
  const classes = [`browser-${browser.name}`, `browser-${browser.name}-${browser.version}`];

  if (!browser.isSupported) {
    classes.push('browser-unsupported');
  }

  // Feature-based classes
  if (!supportsFeature.cssGrid()) classes.push('no-css-grid');
  if (!supportsFeature.cssFlexbox()) classes.push('no-css-flexbox');
  if (!supportsFeature.cssCustomProperties()) classes.push('no-css-custom-properties');
  if (!supportsFeature.touchEvents()) classes.push('no-touch');
  if (supportsFeature.touchEvents()) classes.push('touch');
  if (supportsFeature.prefersReducedMotion()) classes.push('reduced-motion');

  return classes;
};

// Unsupported browser warning
export const showUnsupportedBrowserWarning = () => {
  const browser = getBrowserInfo();
  
  if (!browser.isSupported && typeof document !== 'undefined') {
    const warning = document.createElement('div');
    warning.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #fbbf24;
        color: #92400e;
        padding: 12px;
        text-align: center;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      ">
        <strong>Unsupported Browser:</strong> 
        You're using ${browser.name} ${browser.version}. 
        For the best experience, please update to a modern browser.
        <button onclick="this.parentElement.parentElement.remove()" style="
          margin-left: 12px;
          background: #92400e;
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
        ">×</button>
      </div>
    `;
    
    document.body.appendChild(warning);
  }
};

// Initialize browser support
export const initializeBrowserSupport = async () => {
  // Add browser classes to document
  if (typeof document !== 'undefined') {
    const classes = getBrowserClasses();
    document.documentElement.classList.add(...classes);
  }

  // Load polyfills
  await loadPolyfills();

  // Show warning for unsupported browsers
  showUnsupportedBrowserWarning();

  // Apply fallback styles
  const fallbacks = getFallbackStyles();
  if (typeof document !== 'undefined' && Object.keys(fallbacks).length > 0) {
    const style = document.createElement('style');
    style.textContent = `:root { ${Object.entries(fallbacks)
      .map(([key, value]) => `${key}: ${value};`)
      .join(' ')} }`;
    document.head.appendChild(style);
  }
};

export default {
  getBrowserInfo,
  supportsFeature,
  loadPolyfills,
  getFallbackStyles,
  getBrowserClasses,
  initializeBrowserSupport
};