'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

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

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
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

  // Particle constellation — DESKTOP ONLY
  useEffect(() => {
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

    const colors = ['#00FFB2', '#00C9FF', '#8B5CF6', '#FF6B9D'];
    const particleCount = 60;
    const connectionDistance = 150;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]!,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let animFrame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]!;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / connectionDistance) * 0.08;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
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

  // Mobile: lightweight static version
  if (isMobile) {
    return (
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 178, 0.06) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
          }}
        />
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      </div>
    );
  }

  // Desktop: full particle constellation experience
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none">
      {/* Particle constellation canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Inner glow — emerald */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(0, 255, 178, 0.1) 0%, transparent 70%)',
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Outer glow — violet */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px]"
        style={{
          x: shadowX,
          y: shadowY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.07) 0%, transparent 70%)',
          opacity: isVisible ? 0.8 : 0,
        }}
      />

      {/* Precise tracking dot */}
      <motion.div
        className="absolute w-5 h-5"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 0.2 : 0,
        }}
      >
        <div className="absolute inset-0 border border-[#00FFB2]/30 rounded-full" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-[#00FFB2]/20" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-[#00FFB2]/20" />
      </motion.div>

      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />
    </div>
  );
};

export default GlowEffect;
