'use client';

import React, { useEffect, useRef } from 'react';
import { useFocusManagement } from '@/hooks/useAccessibility';

interface FocusManagerProps {
  children: React.ReactNode;
  trapFocus?: boolean;
  autoFocus?: boolean;
  restoreFocus?: boolean;
  className?: string;
}

export const FocusManager: React.FC<FocusManagerProps> = ({
  children,
  trapFocus = false,
  autoFocus = false,
  restoreFocus = false,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<Element | null>(null);
  const { trapFocus: trapFocusInContainer, focusElement } = useFocusManagement();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Store previously focused element
    if (restoreFocus) {
      previouslyFocusedRef.current = document.activeElement;
    }

    // Auto focus first focusable element
    if (autoFocus) {
      const firstFocusable = container.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      
      if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 0);
      }
    }

    // Set up focus trap
    let cleanupFocusTrap: (() => void) | undefined;
    if (trapFocus) {
      cleanupFocusTrap = trapFocusInContainer(container);
    }

    return () => {
      // Cleanup focus trap
      if (cleanupFocusTrap) {
        cleanupFocusTrap();
      }

      // Restore focus
      if (restoreFocus && previouslyFocusedRef.current) {
        focusElement(previouslyFocusedRef.current);
      }
    };
  }, [trapFocus, autoFocus, restoreFocus, trapFocusInContainer, focusElement]);

  return (
    <div
      ref={containerRef}
      className={className}
      role={trapFocus ? 'dialog' : undefined}
      aria-modal={trapFocus ? 'true' : undefined}
    >
      {children}
    </div>
  );
};

export default FocusManager;