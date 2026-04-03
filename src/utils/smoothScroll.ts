/**
 * Smooth scroll utility functions
 */

export interface SmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  offset?: number;
}

// Easing functions
export const easingFunctions = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t: number) => t * t * t * t,
  easeOutQuart: (t: number) => 1 - (--t) * t * t * t,
  easeInOutQuart: (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  easeInQuint: (t: number) => t * t * t * t * t,
  easeOutQuint: (t: number) => 1 + (--t) * t * t * t * t,
  easeInOutQuint: (t: number) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
};

/**
 * Smooth scroll to a target element or position
 */
export const smoothScrollTo = (
  target: string | number | Element,
  options: SmoothScrollOptions = {}
): Promise<void> => {
  return new Promise((resolve) => {
    const {
      duration = 800,
      easing = easingFunctions.easeInOutCubic,
      offset = 0
    } = options;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Instant scroll for users who prefer reduced motion
      let targetPosition: number;
      
      if (typeof target === 'number') {
        targetPosition = target;
      } else if (typeof target === 'string') {
        const element = document.querySelector(target);
        if (!element) {
          resolve();
          return;
        }
        targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
      } else {
        targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      }
      
      window.scrollTo(0, targetPosition + offset);
      resolve();
      return;
    }

    const startPosition = window.pageYOffset;
    let targetPosition: number;

    // Determine target position
    if (typeof target === 'number') {
      targetPosition = target;
    } else if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (!element) {
        resolve();
        return;
      }
      targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    } else {
      targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    }

    const distance = targetPosition - startPosition + offset;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const easedProgress = easing(progress);
      const currentPosition = startPosition + (distance * easedProgress);

      window.scrollTo(0, currentPosition);

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(animation);
  });
};

/**
 * Smooth scroll to top of page
 */
export const scrollToTop = (options: SmoothScrollOptions = {}): Promise<void> => {
  return smoothScrollTo(0, options);
};

/**
 * Smooth scroll to element by ID
 */
export const scrollToElement = (
  elementId: string,
  options: SmoothScrollOptions = {}
): Promise<void> => {
  return smoothScrollTo(`#${elementId}`, options);
};

/**
 * Get scroll progress (0-1) of the page
 */
export const getScrollProgress = (): number => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? scrollTop / docHeight : 0;
};

/**
 * Check if element is in viewport
 */
export const isElementInViewport = (
  element: Element,
  threshold: number = 0
): boolean => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const verticalThreshold = windowHeight * threshold;
  const horizontalThreshold = windowWidth * threshold;

  return (
    rect.top >= -verticalThreshold &&
    rect.left >= -horizontalThreshold &&
    rect.bottom <= windowHeight + verticalThreshold &&
    rect.right <= windowWidth + horizontalThreshold
  );
};

/**
 * Throttle function for scroll events
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Debounce function for scroll events
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};