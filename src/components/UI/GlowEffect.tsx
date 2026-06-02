'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

const blobs = [
  { color: '#FF2D78', size: 500, x: '15%', y: '10%', animation: 'blob-drift-1', duration: '25s' },
  { color: '#A855F7', size: 450, x: '70%', y: '20%', animation: 'blob-drift-2', duration: '30s' },
  { color: '#3B82F6', size: 400, x: '40%', y: '60%', animation: 'blob-drift-3', duration: '28s' },
  { color: '#BEFF46', size: 350, x: '80%', y: '70%', animation: 'blob-drift-1', duration: '32s' },
  { color: '#FF6B35', size: 300, x: '20%', y: '80%', animation: 'blob-drift-2', duration: '26s' },
];

const mobileBlobs = [
  { color: '#FF2D78', size: 250, x: '20%', y: '15%' },
  { color: '#A855F7', size: 200, x: '70%', y: '40%' },
  { color: '#3B82F6', size: 220, x: '30%', y: '70%' },
];

export const GlowEffect: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 40, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 200 });

  // Mouse tracking — DESKTOP ONLY
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible, isMobile]);

  // Mobile: lightweight static blobs
  if (isMobile) {
    return (
      <div className="mesh-gradient">
        {mobileBlobs.map((blob, i) => (
          <div
            key={i}
            className="mesh-blob"
            style={{
              width: blob.size,
              height: blob.size,
              left: blob.x,
              top: blob.y,
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      </div>
    );
  }

  // Desktop: animated mesh gradient blobs + cursor glow
  return (
    <div className="mesh-gradient">
      {/* Animated mesh gradient blobs */}
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="mesh-blob"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            animation: `${blob.animation} ${blob.duration} ease-in-out infinite`,
          }}
        />
      ))}

      {/* Cursor glow — pink/purple */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(255, 45, 120, 0.08) 0%, rgba(168, 85, 247, 0.04) 40%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />
    </div>
  );
};

export default GlowEffect;
