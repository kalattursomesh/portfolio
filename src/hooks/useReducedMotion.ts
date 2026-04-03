'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect user's motion preferences
 * Respects prefers-reduced-motion media query for accessibility
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') {
      return;
    }

    // Check initial preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
};

/**
 * Hook that provides animation-safe values based on motion preferences
 */
export const useAnimationConfig = () => {
  const prefersReducedMotion = useReducedMotion();

  const getAnimationProps = (
    normalProps: Record<string, any>,
    reducedProps: Record<string, any> = {}
  ) => {
    if (prefersReducedMotion) {
      return {
        ...normalProps,
        ...reducedProps,
        // Override animation durations to be very short or instant
        duration: reducedProps.duration ?? 0.01,
        transition: reducedProps.transition ?? { duration: 0.01 },
        animate: reducedProps.animate ?? normalProps.initial ?? {},
      };
    }
    return normalProps;
  };

  const getSafeTransition = (transition: any) => {
    if (prefersReducedMotion) {
      return { duration: 0.01 };
    }
    return transition;
  };

  const getSafeDuration = (duration: number) => {
    if (prefersReducedMotion) {
      return 0.01;
    }
    return duration;
  };

  return {
    prefersReducedMotion,
    getAnimationProps,
    getSafeTransition,
    getSafeDuration,
  };
};

export default useReducedMotion;