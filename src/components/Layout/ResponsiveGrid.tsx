'use client';

import React from 'react';
import { useResponsive } from '@/hooks/useResponsive';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  autoFit?: boolean;
  minItemWidth?: string;
}

const gapClasses = {
  none: 'gap-0',
  sm: 'gap-2 sm:gap-3',
  md: 'gap-3 sm:gap-4 md:gap-6',
  lg: 'gap-4 sm:gap-6 md:gap-8',
  xl: 'gap-6 sm:gap-8 md:gap-10 lg:gap-12'
};

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className = '',
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 'md',
  autoFit = false,
  minItemWidth = '250px'
}) => {
  const { currentBreakpoint } = useResponsive();

  // Get current column count based on breakpoint
  const getCurrentColumns = (): number => {
    if (columns['2xl'] && (currentBreakpoint === '2xl' || currentBreakpoint === '3xl' || currentBreakpoint === '4xl')) {
      return columns['2xl'];
    }
    if (columns.xl && (currentBreakpoint === 'xl' || currentBreakpoint === '2xl' || currentBreakpoint === '3xl' || currentBreakpoint === '4xl')) {
      return columns.xl;
    }
    if (columns.lg && (currentBreakpoint === 'lg' || currentBreakpoint === 'xl' || currentBreakpoint === '2xl' || currentBreakpoint === '3xl' || currentBreakpoint === '4xl')) {
      return columns.lg;
    }
    if (columns.md && (currentBreakpoint === 'md' || currentBreakpoint === 'lg' || currentBreakpoint === 'xl' || currentBreakpoint === '2xl' || currentBreakpoint === '3xl' || currentBreakpoint === '4xl')) {
      return columns.md;
    }
    if (columns.sm && (currentBreakpoint === 'sm' || currentBreakpoint === 'md' || currentBreakpoint === 'lg' || currentBreakpoint === 'xl' || currentBreakpoint === '2xl' || currentBreakpoint === '3xl' || currentBreakpoint === '4xl')) {
      return columns.sm;
    }
    return columns.xs || 1;
  };

  const currentColumns = getCurrentColumns();

  // Build grid classes
  const gridClasses = [
    'grid',
    gapClasses[gap],
    className
  ].filter(Boolean).join(' ');

  // Grid template columns style
  const gridStyle: React.CSSProperties = autoFit 
    ? {
        gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`
      }
    : {
        gridTemplateColumns: `repeat(${currentColumns}, 1fr)`
      };

  return (
    <div 
      className={gridClasses}
      style={gridStyle}
      data-columns={currentColumns}
      data-breakpoint={currentBreakpoint}
    >
      {children}
    </div>
  );
};

export default ResponsiveGrid;