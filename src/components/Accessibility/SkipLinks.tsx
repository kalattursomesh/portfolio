'use client';

import React from 'react';
import { useSkipLinks } from '@/hooks/useAccessibility';

interface SkipLink {
  id: string;
  label: string;
}

interface SkipLinksProps {
  links?: SkipLink[];
}

const defaultSkipLinks: SkipLink[] = [
  { id: 'main-content', label: 'Skip to main content' },
  { id: 'navigation', label: 'Skip to navigation' },
  { id: 'footer', label: 'Skip to footer' }
];

export const SkipLinks: React.FC<SkipLinksProps> = ({ 
  links = defaultSkipLinks 
}) => {
  const { skipToContent } = useSkipLinks();

  const handleSkipClick = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    skipToContent(id);
  };

  const handleKeyDown = (event: React.KeyboardEvent, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      skipToContent(id);
    }
  };

  return (
    <div className="skip-links">
      {links.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className="skip-link"
          onClick={(e) => handleSkipClick(e, link.id)}
          onKeyDown={(e) => handleKeyDown(e, link.id)}
        >
          {link.label}
        </a>
      ))}
      
      <style jsx>{`
        .skip-links {
          position: absolute;
          top: -100px;
          left: 0;
          z-index: 9999;
        }
        
        .skip-link {
          position: absolute;
          top: -100px;
          left: 8px;
          padding: 8px 16px;
          background: #000;
          color: #fff;
          text-decoration: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          transition: top 0.2s ease;
          border: 2px solid transparent;
        }
        
        .skip-link:focus {
          top: 8px;
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
        }
        
        .skip-link:hover:focus {
          background: #1f2937;
        }
      `}</style>
    </div>
  );
};

export default SkipLinks;