'use client';

import React from 'react';

interface VisuallyHiddenProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  focusable?: boolean;
}

/**
 * VisuallyHidden component hides content visually but keeps it available to screen readers
 * Useful for providing additional context or instructions for assistive technologies
 */
export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({
  children,
  as: Component = 'span',
  className = '',
  focusable = false,
  ...props
}) => {
  const visuallyHiddenStyles = {
    position: 'absolute' as const,
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap' as const,
    border: '0',
    ...(focusable && {
      // Allow the element to be focusable
      clipPath: 'inset(50%)',
      clip: 'auto'
    })
  };

  const focusableStyles = focusable ? {
    '&:focus': {
      position: 'static',
      width: 'auto',
      height: 'auto',
      padding: '0.25rem 0.5rem',
      margin: '0',
      overflow: 'visible',
      clip: 'auto',
      clipPath: 'none',
      whiteSpace: 'normal',
      backgroundColor: '#000',
      color: '#fff',
      fontSize: '0.875rem',
      fontWeight: '600',
      textDecoration: 'none',
      borderRadius: '0.25rem',
      zIndex: 9999
    }
  } : {};

  return (
    <>
      <Component
        className={`visually-hidden ${className}`}
        style={visuallyHiddenStyles}
        tabIndex={focusable ? 0 : undefined}
        {...props}
      >
        {children}
      </Component>
      
      {focusable && (
        <style jsx>{`
          .visually-hidden:focus {
            position: static !important;
            width: auto !important;
            height: auto !important;
            padding: 0.25rem 0.5rem !important;
            margin: 0 !important;
            overflow: visible !important;
            clip: auto !important;
            clip-path: none !important;
            white-space: normal !important;
            background-color: #000 !important;
            color: #fff !important;
            font-size: 0.875rem !important;
            font-weight: 600 !important;
            text-decoration: none !important;
            border-radius: 0.25rem !important;
            z-index: 9999 !important;
          }
        `}</style>
      )}
    </>
  );
};

export default VisuallyHidden;