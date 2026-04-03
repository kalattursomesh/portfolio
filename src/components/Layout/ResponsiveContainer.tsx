'use client';

import React from 'react';
import { useResponsive, useSafeArea } from '@/hooks/useResponsive';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  center?: boolean;
  respectSafeArea?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full'
};

const paddingClasses = {
  none: '',
  sm: 'px-4 sm:px-6',
  md: 'px-4 sm:px-6 md:px-8',
  lg: 'px-4 sm:px-6 md:px-8 lg:px-12',
  xl: 'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16'
};

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  maxWidth = '4xl',
  padding = 'md',
  center = true,
  respectSafeArea = false
}) => {
  const { isMobile, isTablet } = useResponsive();
  const safeArea = useSafeArea();

  const containerClasses = [
    'w-full',
    maxWidthClasses[maxWidth],
    paddingClasses[padding],
    center ? 'mx-auto' : '',
    className
  ].filter(Boolean).join(' ');

  const safeAreaStyles = respectSafeArea ? {
    paddingTop: `max(1rem, ${safeArea.top}px)`,
    paddingRight: `max(1rem, ${safeArea.right}px)`,
    paddingBottom: `max(1rem, ${safeArea.bottom}px)`,
    paddingLeft: `max(1rem, ${safeArea.left}px)`
  } : {};

  return (
    <div
      className={containerClasses}
      style={safeAreaStyles}
      data-mobile={isMobile}
      data-tablet={isTablet}
    >
      {children}
    </div>
  );
};

export default ResponsiveContainer;