'use client';

import React from 'react';
import { useResponsive, useTouchDevice } from '@/hooks/useResponsive';

interface TouchTargetProps {
  children: React.ReactNode;
  className?: string;
  minSize?: number;
  as?: keyof JSX.IntrinsicElements;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  'aria-label'?: string;
  disabled?: boolean;
}

/**
 * TouchTarget component ensures interactive elements meet accessibility
 * guidelines for touch targets (minimum 44px x 44px)
 */
export const TouchTarget: React.FC<TouchTargetProps> = ({
  children,
  className = '',
  minSize = 44,
  as: Component = 'button',
  onClick,
  href,
  target,
  rel,
  'aria-label': ariaLabel,
  disabled = false,
  ...props
}) => {
  const { isMobile } = useResponsive();
  const isTouchDevice = useTouchDevice();

  // Apply minimum touch target size on mobile/touch devices
  const shouldApplyMinSize = isMobile || isTouchDevice;

  const touchTargetStyles: React.CSSProperties = shouldApplyMinSize ? {
    minWidth: `${minSize}px`,
    minHeight: `${minSize}px`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  } : {};

  const combinedClassName = [
    'touch-target',
    shouldApplyMinSize ? 'touch-optimized' : '',
    disabled ? 'disabled:opacity-50 disabled:cursor-not-allowed' : '',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    'transition-all duration-200',
    className
  ].filter(Boolean).join(' ');

  const commonProps = {
    className: combinedClassName,
    style: touchTargetStyles,
    'aria-label': ariaLabel,
    disabled: disabled,
    ...props
  };

  // Handle different component types
  if (Component === 'a' && href) {
    return (
      <a
        {...commonProps}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  if (Component === 'button') {
    return (
      <button
        {...commonProps}
        type="button"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  // Generic component
  const GenericComponent = Component as any;
  return (
    <GenericComponent
      {...commonProps}
      onClick={onClick}
    >
      {children}
    </GenericComponent>
  );
};

/**
 * Hook to get touch-optimized styles
 */
export const useTouchOptimized = (minSize: number = 44) => {
  const { isMobile } = useResponsive();
  const isTouchDevice = useTouchDevice();
  
  const shouldOptimize = isMobile || isTouchDevice;
  
  return {
    shouldOptimize,
    styles: shouldOptimize ? {
      minWidth: `${minSize}px`,
      minHeight: `${minSize}px`,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    } : {},
    className: shouldOptimize ? 'touch-optimized' : ''
  };
};

export default TouchTarget;