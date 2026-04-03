/**
 * Accessibility utility functions
 */

// ARIA attributes helpers
export const generateAriaLabel = (text: string, context?: string): string => {
  return context ? `${text}, ${context}` : text;
};

export const generateAriaDescribedBy = (ids: string[]): string => {
  return ids.filter(Boolean).join(' ');
};

// Focus management utilities
export const getFocusableElements = (container: Element): HTMLElement[] => {
  const focusableSelectors = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(', ');

  return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
};

export const getFirstFocusableElement = (container: Element): HTMLElement | null => {
  const focusableElements = getFocusableElements(container);
  return focusableElements[0] || null;
};

export const getLastFocusableElement = (container: Element): HTMLElement | null => {
  const focusableElements = getFocusableElements(container);
  return focusableElements[focusableElements.length - 1] || null;
};

// Keyboard event utilities
export const isEnterKey = (event: KeyboardEvent | React.KeyboardEvent): boolean => {
  return event.key === 'Enter';
};

export const isSpaceKey = (event: KeyboardEvent | React.KeyboardEvent): boolean => {
  return event.key === ' ' || event.key === 'Space';
};

export const isEscapeKey = (event: KeyboardEvent | React.KeyboardEvent): boolean => {
  return event.key === 'Escape' || event.key === 'Esc';
};

export const isArrowKey = (event: KeyboardEvent | React.KeyboardEvent): boolean => {
  return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key);
};

export const isTabKey = (event: KeyboardEvent | React.KeyboardEvent): boolean => {
  return event.key === 'Tab';
};

// Screen reader utilities
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  const announcer = document.getElementById('aria-announcer') || createAnnouncer();
  announcer.setAttribute('aria-live', priority);
  announcer.textContent = message;
  
  // Clear after announcement
  setTimeout(() => {
    announcer.textContent = '';
  }, 1000);
};

const createAnnouncer = (): HTMLElement => {
  const announcer = document.createElement('div');
  announcer.id = 'aria-announcer';
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  announcer.style.cssText = `
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  `;
  document.body.appendChild(announcer);
  return announcer;
};

// Color contrast utilities
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1]!, 16),
    g: parseInt(result[2]!, 16),
    b: parseInt(result[3]!, 16)
  } : null;
};

export const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * (rs ?? 0) + 0.7152 * (gs ?? 0) + 0.0722 * (bs ?? 0);
};

export const getContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 0;
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

export const meetsWCAGContrast = (
  foreground: string, 
  background: string, 
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean => {
  const contrast = getContrastRatio(foreground, background);
  
  if (level === 'AAA') {
    return size === 'large' ? contrast >= 4.5 : contrast >= 7;
  }
  return size === 'large' ? contrast >= 3 : contrast >= 4.5;
};

// ARIA role utilities
export const getImplicitRole = (element: Element): string | null => {
  const tagName = element.tagName.toLowerCase();
  const type = element.getAttribute('type');
  
  const roleMap: Record<string, string | null> = {
    'a': element.hasAttribute('href') ? 'link' : null,
    'button': 'button',
    'input': type === 'button' || type === 'submit' || type === 'reset' ? 'button' : 
             type === 'checkbox' ? 'checkbox' :
             type === 'radio' ? 'radio' : 'textbox',
    'textarea': 'textbox',
    'select': 'combobox',
    'h1': 'heading',
    'h2': 'heading',
    'h3': 'heading',
    'h4': 'heading',
    'h5': 'heading',
    'h6': 'heading',
    'nav': 'navigation',
    'main': 'main',
    'aside': 'complementary',
    'section': 'region',
    'article': 'article',
    'header': 'banner',
    'footer': 'contentinfo',
    'ul': 'list',
    'ol': 'list',
    'li': 'listitem',
    'table': 'table',
    'thead': 'rowgroup',
    'tbody': 'rowgroup',
    'tfoot': 'rowgroup',
    'tr': 'row',
    'th': 'columnheader',
    'td': 'cell'
  };
  
  return roleMap[tagName] || null;
};

// Validation utilities
export const validateAriaLabel = (element: Element): boolean => {
  const ariaLabel = element.getAttribute('aria-label');
  const ariaLabelledBy = element.getAttribute('aria-labelledby');
  const textContent = element.textContent?.trim();
  
  // Element should have accessible name
  return !!(ariaLabel || ariaLabelledBy || textContent);
};

export const validateAriaDescribedBy = (element: Element): boolean => {
  const ariaDescribedBy = element.getAttribute('aria-describedby');
  
  if (!ariaDescribedBy) return true; // Optional attribute
  
  // Check if referenced elements exist
  const ids = ariaDescribedBy.split(' ');
  return ids.every(id => document.getElementById(id) !== null);
};

// Touch target utilities
export const validateTouchTarget = (element: Element): boolean => {
  const rect = element.getBoundingClientRect();
  const minSize = 44; // WCAG recommended minimum
  
  return rect.width >= minSize && rect.height >= minSize;
};

// Heading structure utilities
export const validateHeadingStructure = (container: Element = document.body): string[] => {
  const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const errors: string[] = [];
  
  let previousLevel = 0;
  
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    
    if (index === 0 && level !== 1) {
      errors.push('First heading should be h1');
    }
    
    if (level > previousLevel + 1) {
      errors.push(`Heading level ${level} skips level ${previousLevel + 1}`);
    }
    
    previousLevel = level;
  });
  
  return errors;
};

// Export all utilities
export default {
  generateAriaLabel,
  generateAriaDescribedBy,
  getFocusableElements,
  getFirstFocusableElement,
  getLastFocusableElement,
  isEnterKey,
  isSpaceKey,
  isEscapeKey,
  isArrowKey,
  isTabKey,
  announceToScreenReader,
  getContrastRatio,
  meetsWCAGContrast,
  validateAriaLabel,
  validateAriaDescribedBy,
  validateTouchTarget,
  validateHeadingStructure
};