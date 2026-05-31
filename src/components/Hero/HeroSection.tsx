'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Terminal, Activity, Cpu, Globe, Shield } from 'lucide-react';
import Image from 'next/image';
import Typewriter from '@/components/Animation/Typewriter';

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

interface HeroSectionProps {
  profile: any;
}

const bootLines = [
  { text: 'SOMESH_OS v2.0.26 — INITIALIZING...', delay: 0, color: '#00FFB2' },
  { text: '[OK] Loading neural networks...', delay: 250, color: '#00C9FF' },
  { text: '[OK] Compiling AI/ML modules...', delay: 450, color: '#8B5CF6' },
  { text: '[OK] Mounting cloud infrastructure (AWS)...', delay: 650, color: '#00C9FF' },
  { text: '[OK] Starting full-stack runtime...', delay: 850, color: '#8B5CF6' },
  { text: '[READY] All systems operational.', delay: 1050, color: '#00FFB2' },
];

const stats = [
  { icon: <Cpu className="w-4 h-4" />, label: 'FOCUS', value: 'AI & ML', color: '#00FFB2' },
  { icon: <Globe className="w-4 h-4" />, label: 'STACK', value: 'Full-Stack', color: '#00C9FF' },
  { icon: <Shield className="w-4 h-4" />, label: 'CERT', value: 'AWS CCP', color: '#8B5CF6' },
  { icon: <Activity className="w-4 h-4" />, label: 'STATUS', value: 'Available', color: '#00FFB2' },
];

// 3D Tilt Hook
function useTilt(ref: React.RefObject<HTMLDivElement | null>) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
  }, [ref]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, handleMouseMove, handleMouseLeave]);

  return tilt;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const [bootComplete, setBootComplete] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const isMobile = useIsMobile();
  const cardRef = useRef<HTMLDivElement>(null);
  const tilt = useTilt(cardRef);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    const speedMultiplier = isMobile ? 0.3 : 1;

    bootLines.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
      }, bootLines[index]!.delay * speedMultiplier);
      timers.push(timer);
    });

    const bootDuration = isMobile ? 600 : 1500;
    const contentTimer = setTimeout(() => {
      setBootComplete(true);
      setTimeout(() => setShowContent(true), isMobile ? 80 : 200);
    }, bootDuration);
    timers.push(contentTimer);

    return () => timers.forEach(clearTimeout);
  }, [isMobile]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-20"
      style={{ background: 'linear-gradient(180deg, #030014 0%, #0A0520 40%, #060318 100%)' }}
    >
      {/* Aurora ambient lights */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transform-gpu translate-z-0">
        <div className="absolute top-[10%] left-[15%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#00FFB2]/[0.04] blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-[#8B5CF6]/[0.05] blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-[#00C9FF]/[0.03] blur-[100px] md:blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] left-[30%] w-[200px] md:w-[350px] h-[200px] md:h-[350px] bg-[#FF6B9D]/[0.03] blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Boot Sequence Terminal */}
        <AnimatePresence>
          {!bootComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="os-window">
                <div className="os-titlebar">
                  <div className="os-titlebar-dots">
                    <div className="os-titlebar-dot bg-[#ff5f57]" />
                    <div className="os-titlebar-dot bg-[#febc2e]" />
                    <div className="os-titlebar-dot bg-[#28c840]" />
                  </div>
                  <span className="font-mono text-[10px] text-white/30 ml-3">
                    boot.sh — portfolio_os
                  </span>
                </div>
                <div className="p-6 font-mono text-sm space-y-2">
                  {bootLines.slice(0, visibleLines).map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ color: line.color }}
                    >
                      {line.text}
                    </motion.div>
                  ))}
                  {visibleLines < bootLines.length && (
                    <span className="terminal-cursor" />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Hero Content */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
                {/* Left: Main Content */}
                <div className="flex-1 max-w-2xl text-center lg:text-left order-2 lg:order-1">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    {/* Terminal greeting */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00FFB2]/[0.06] border border-[#00FFB2]/20 mb-8">
                      <span className="status-dot" />
                      <span className="font-mono text-sm text-[#00FFB2]">
                        system ready — all modules loaded
                      </span>
                    </div>

                    {/* Big headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
                      <span className="block text-white/90">I architect</span>
                      <span className="block text-white/40">intelligent</span>
                      <span className="block mt-2">
                        <span className="shimmer-text !text-5xl md:!text-7xl lg:!text-8xl font-black">
                          systems.
                        </span>
                      </span>
                    </h1>

                    {/* Description */}
                    <div className="text-lg md:text-xl text-white/40 max-w-xl mb-10 leading-relaxed font-medium mx-auto lg:mx-0 min-h-[60px] md:min-h-[80px]">
                      <span className="text-[#00FFB2]/80 font-mono text-sm mr-2 align-middle">&gt;</span>
                      <Typewriter 
                        words={[
                          "AI/ML engineer crafting deep learning pipelines.",
                          "AWS Certified architecting scalable cloud infrastructure.",
                          "Full-Stack developer building high-performance web applications.",
                          "Transforming complex data into cognitive solutions."
                        ]} 
                        typingSpeed={40}
                        deletingSpeed={20}
                        pauseTime={3000}
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <button onClick={scrollToContact} className="btn-matrix text-base group">
                        <Terminal className="mr-2 w-5 h-5" />
                        ./connect.sh
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <a href={profile.resume} className="btn-outline-terminal text-base group" download>
                        <Download className="mr-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                        download resume
                      </a>
                    </div>
                  </motion.div>
                </div>

                {/* Right: 3D Tilt Avatar Dashboard */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex-shrink-0 order-1 lg:order-2 w-full max-w-sm"
                  ref={cardRef}
                  style={{
                    perspective: '1000px',
                  }}
                >
                  <div
                    className="os-window transition-transform duration-200 ease-out"
                    style={{
                      transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div className="os-titlebar">
                      <div className="os-titlebar-dots">
                        <div className="os-titlebar-dot bg-[#ff5f57]" />
                        <div className="os-titlebar-dot bg-[#febc2e]" />
                        <div className="os-titlebar-dot bg-[#28c840]" />
                      </div>
                      <span className="font-mono text-[10px] text-white/30 ml-3">
                        profile.sys
                      </span>
                    </div>

                    {/* Avatar with aurora ring */}
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src="/images/avatar.jpg"
                        alt={profile.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent" />

                      {/* HUD overlay */}
                      <div className="absolute top-3 left-3 font-mono text-[9px] text-[#00FFB2]/60 space-y-1">
                        <div>ID: SOMESH_KS</div>
                        <div>LOC: 12.97°N 77.59°E</div>
                      </div>
                      <div className="absolute top-3 right-3">
                        <div className="w-2 h-2 rounded-full bg-[#00FFB2] shadow-[0_0_10px_rgba(0,255,178,0.8)] animate-pulse" />
                      </div>

                      {/* Name badge */}
                      <div className="absolute bottom-0 inset-x-0 p-4">
                        <div className="font-bold text-white text-lg tracking-tight leading-none">
                          {profile.name}
                        </div>
                        <div className="font-mono text-xs mt-1">
                          <span className="text-[#00FFB2]/80">AI & ML</span>
                          <span className="text-white/20 mx-1.5">·</span>
                          <span className="text-[#00C9FF]/80">Full-Stack</span>
                          <span className="text-white/20 mx-1.5">·</span>
                          <span className="text-[#8B5CF6]/80">Cloud</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-px bg-white/5">
                      {stats.map((stat) => (
                        <div key={stat.label} className="p-4 bg-[#030014]/80">
                          <div className="flex items-center gap-2 mb-1.5" style={{ color: stat.color }}>
                            {stat.icon}
                            <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
                              {stat.label}
                            </span>
                          </div>
                          <div className="font-bold text-white text-sm tracking-tight">
                            {stat.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={scrollToAbout}
                className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex-col items-center group"
              >
                <div className="font-mono text-[10px] text-white/20 mb-3 tracking-widest">
                  SCROLL TO EXPLORE
                </div>
                <div className="w-8 h-14 rounded-full border border-white/10 flex items-start justify-center p-2 group-hover:border-[#00FFB2]/30 transition-colors">
                  <motion.div
                    animate={{ y: [0, 14, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-1.5 h-3 rounded-full bg-gradient-to-b from-[#00FFB2]/60 to-[#8B5CF6]/60"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
