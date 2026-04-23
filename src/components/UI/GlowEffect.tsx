'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

// Hook to detect mobile devices
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

export const GlowEffect: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 40, stiffness: 300 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 300 });

  const shadowX = useSpring(mouseX, { damping: 60, stiffness: 100 });
  const shadowY = useSpring(mouseY, { damping: 60, stiffness: 100 });

  // Matrix rain effect — DESKTOP ONLY
  useEffect(() => {
    // Skip the expensive canvas animation entirely on mobile
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1).map(() => Math.random() * -100);

    let animFrame: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 16, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(0, 255, 136, 0.08)';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text || '', i * fontSize, drops[i]! * fontSize);

        if (drops[i]! * fontSize > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i]! += 0.5;
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame);
    };
  }, [isMobile]);

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

  // Mobile: render a lightweight static version
  if (isMobile) {
    return (
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none">
        {/* Subtle static grid — no animation cost */}
        <div className="absolute inset-0 grid-bg opacity-20" />
        {/* Simple ambient glow — no blur, just gradient */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 136, 0.06) 0%, transparent 70%)',
          }}
        />
        {/* Noise overlay — very cheap */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      </div>
    );
  }

  // Desktop: full experience
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none">
      {/* Matrix rain canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Inner glow - matrix green */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full blur-[80px]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(0, 255, 136, 0.12) 0%, transparent 70%)',
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Outer glow - electric blue */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{
          x: shadowX,
          y: shadowY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
          opacity: isVisible ? 0.8 : 0,
        }}
      />

      {/* Precise tracking crosshair */}
      <motion.div
        className="absolute w-5 h-5"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 0.25 : 0,
        }}
      >
        <div className="absolute inset-0 border border-[#00ff88]/30 rounded-full" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-[#00ff88]/20" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-[#00ff88]/20" />
      </motion.div>

      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
    </div>
  );
};

export default GlowEffect;
