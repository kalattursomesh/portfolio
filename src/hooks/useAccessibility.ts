'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * Hook for managing focus and keyboard navigation
 */
export const useFocusManagement = () => {
  const [focusedElement, setFocusedElement] = useState<Element | null>(null);
  const focusHistoryRef = useRef<Element[]>([]);

  useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as Element;
      setFocusedElement(target);

      // Add to focus history
      if (target && !focusHistoryRef.current.includes(target)) {
        focusHistoryRef.current.push(target);

        // Keep only last 10 focused elements
        if (focusHistoryRef.current.length > 10) {
          focusHistoryRef.current.shift();
        }
      }
    };

    const handleFocusOut = () => {
      setFocusedElement(null);
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  const focusElement = (element: Element | string) => {
    const target = typeof element === 'string'
      ? document.querySelector(element)
      : element;

    if (target && 'focus' in target) {
      (target as HTMLElement).focus();
    }
  };

  const focusPrevious = () => {
    const history = focusHistoryRef.current;
    if (history.length > 1) {
      const previousElement = history[history.length - 2];
      if (previousElement) {
        focusElement(previousElement);
      }
    }
  };

  const trapFocus = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown as EventListener);

    // Focus first element
    if (firstElement) {
      firstElement.focus();
    }

    return () => {
      container.removeEventListener('keydown', handleKeyDown as EventListener);
    };
  };

  return {
    focusedElement,
    focusElement,
    focusPrevious,
    trapFocus,
    focusHistory: focusHistoryRef.current
  };
};

/**
 * Hook for managing ARIA announcements
 */
export const useAnnouncements = () => {
  const [announcer, setAnnouncer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Create or find the announcer element
    let announcerElement = document.getElementById('aria-announcer');

    if (!announcerElement) {
      announcerElement = document.createElement('div');
      announcerElement.id = 'aria-announcer';
      announcerElement.setAttribute('aria-live', 'polite');
      announcerElement.setAttribute('aria-atomic', 'true');
      announcerElement.style.position = 'absolute';
      announcerElement.style.left = '-10000px';
      announcerElement.style.width = '1px';
      announcerElement.style.height = '1px';
      announcerElement.style.overflow = 'hidden';

      document.body.appendChild(announcerElement);
    }

    setAnnouncer(announcerElement);

    return () => {
      if (announcerElement && announcerElement.parentNode) {
        announcerElement.parentNode.removeChild(announcerElement);
      }
    };
  }, []);

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (announcer) {
      announcer.setAttribute('aria-live', priority);
      announcer.textContent = message;

      // Clear after announcement
      setTimeout(() => {
        if (announcer) {
          announcer.textContent = '';
        }
      }, 1000);
    }
  };

  return { announce };
};

/**
 * Hook for keyboard navigation
 */
export const useKeyboardNavigation = (
  onEnter?: () => void,
  onEscape?: () => void,
  onArrowKeys?: (direction: 'up' | 'down' | 'left' | 'right') => void
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          if (onEnter) {
            event.preventDefault();
            onEnter();
          }
          break;
        case 'Escape':
          if (onEscape) {
            event.preventDefault();
            onEscape();
          }
          break;
        case 'ArrowUp':
          if (onArrowKeys) {
            event.preventDefault();
            onArrowKeys('up');
          }
          break;
        case 'ArrowDown':
          if (onArrowKeys) {
            event.preventDefault();
            onArrowKeys('down');
          }
          break;
        case 'ArrowLeft':
          if (onArrowKeys) {
            event.preventDefault();
            onArrowKeys('left');
          }
          break;
        case 'ArrowRight':
          if (onArrowKeys) {
            event.preventDefault();
            onArrowKeys('right');
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onEnter, onEscape, onArrowKeys]);
};

/**
 * Hook for managing skip links
 */
export const useSkipLinks = () => {
  const [skipLinks, setSkipLinks] = useState<Array<{ id: string; label: string }>>([]);

  const addSkipLink = (id: string, label: string) => {
    setSkipLinks(prev => {
      const exists = prev.find(link => link.id === id);
      if (!exists) {
        return [...prev, { id, label }];
      }
      return prev;
    });
  };

  const removeSkipLink = (id: string) => {
    setSkipLinks(prev => prev.filter(link => link.id !== id));
  };

  const skipToContent = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return {
    skipLinks,
    addSkipLink,
    removeSkipLink,
    skipToContent
  };
};

/**
 * Hook for color contrast checking
 */
export const useColorContrast = () => {
  const checkContrast = (foreground: string, background: string): number => {
    // Convert hex to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1]!, 16),
        g: parseInt(result[2]!, 16),
        b: parseInt(result[3]!, 16)
      } : null;
    };

    // Calculate relative luminance
    const getLuminance = (r: number, g: number, b: number) => {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      }) as [number, number, number];
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const fg = hexToRgb(foreground);
    const bg = hexToRgb(background);

    if (!fg || !bg) return 0;

    const fgLuminance = getLuminance(fg.r, fg.g, fg.b);
    const bgLuminance = getLuminance(bg.r, bg.g, bg.b);

    const lighter = Math.max(fgLuminance, bgLuminance);
    const darker = Math.min(fgLuminance, bgLuminance);

    return (lighter + 0.05) / (darker + 0.05);
  };

  const meetsWCAG = (contrast: number, level: 'AA' | 'AAA' = 'AA', size: 'normal' | 'large' = 'normal') => {
    if (level === 'AAA') {
      return size === 'large' ? contrast >= 4.5 : contrast >= 7;
    }
    return size === 'large' ? contrast >= 3 : contrast >= 4.5;
  };

  return { checkContrast, meetsWCAG };
};

/**
 * Hook for screen reader detection
 */
export const useScreenReader = () => {
  const [isScreenReader, setIsScreenReader] = useState(false);

  useEffect(() => {
    // Check for screen reader indicators
    const checkScreenReader = () => {
      // Check for common screen reader user agents or accessibility APIs
      const hasScreenReader =
        navigator.userAgent.includes('NVDA') ||
        navigator.userAgent.includes('JAWS') ||
        navigator.userAgent.includes('VoiceOver') ||
        // @ts-ignore - checking for accessibility APIs
        window.speechSynthesis ||
        // @ts-ignore
        window.navigator.userAgentData?.brands?.some((brand: any) =>
          brand.brand.includes('Screen Reader')
        );

      setIsScreenReader(!!hasScreenReader);
    };

    checkScreenReader();
  }, []);

  return isScreenReader;
};

export default useFocusManagement;