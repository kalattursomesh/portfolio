'use client';

import React, { Suspense, lazy } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * LazySection component that only renders its children when in view
 * Useful for heavy components that are below the fold
 */
export const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback = <div className="animate-pulse bg-gray-100 h-64 rounded-lg" />,
  className = '',
  threshold = 0.1,
  rootMargin = '50px',
  once = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: threshold,
    margin: rootMargin as any,
    once
  });

  return (
    <div ref={ref} className={className}>
      {isInView ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};

/**
 * Higher-order component to create lazy-loaded components
 */
export const withLazyLoading = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) => {
  const LazyComponent = lazy(() => Promise.resolve({ default: Component }));

  return (props: P) => (
    <Suspense fallback={fallback || <div className="animate-pulse bg-gray-100 h-32 rounded" />}>
      <LazyComponent {...(props as any)} />
    </Suspense>
  );
};

/**
 * Hook for creating intersection observer-based lazy loading
 */
export const useLazyLoad = (
  threshold: number = 0.1,
  rootMargin: string = '50px'
) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: threshold,
    margin: rootMargin as any,
    once: true
  });

  return { ref, isInView };
};

export default LazySection;