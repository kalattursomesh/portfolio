'use client';

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SmoothScrollProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({
  children,
  speed = 1,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    // Skip smooth scrolling if user prefers reduced motion
    if (prefersReducedMotion || typeof window === 'undefined') {
      return;
    }

    let animationId: number;
    let currentY = 0;
    let targetY = 0;

    const updateScroll = () => {
      if (!containerRef.current || !contentRef.current) return;

      // Get scroll position
      targetY = window.scrollY;
      
      // Smooth interpolation
      currentY += (targetY - currentY) * speed * 0.1;
      
      // Apply transform
      contentRef.current.style.transform = `translateY(${-currentY}px)`;
      
      // Continue animation
      animationId = requestAnimationFrame(updateScroll);
    };

    // Start animation
    animationId = requestAnimationFrame(updateScroll);

    // Handle resize
    const handleResize = () => {
      if (contentRef.current) {
        const height = contentRef.current.offsetHeight;
        document.body.style.height = `${height}px`;
      }
    };

    // Set initial height
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      document.body.style.height = '';
    };
  }, [speed, prefersReducedMotion]);

  // If reduced motion is preferred, render without smooth scrolling
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div 
      ref={containerRef}
      className={`fixed top-0 left-0 w-full h-full overflow-hidden ${className}`}
      style={{ pointerEvents: 'none' }}
    >
      <div 
        ref={contentRef}
        style={{ pointerEvents: 'auto' }}
      >
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;