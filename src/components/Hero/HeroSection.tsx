'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Terminal, ChevronRight, Activity, Cpu, Globe, Shield } from 'lucide-react';
import Image from 'next/image';
import Typewriter from '@/components/Animation/Typewriter';

interface HeroSectionProps {
  profile: any;
}

const bootLines = [
  { text: 'SOMESH_OS v2.0.26 — INITIALIZING...', delay: 0, color: '#00ff88' },
  { text: '[OK] Loading neural networks...', delay: 300, color: '#00d4ff' },
  { text: '[OK] Compiling AI/ML modules...', delay: 600, color: '#00d4ff' },
  { text: '[OK] Mounting cloud infrastructure (AWS)...', delay: 900, color: '#00d4ff' },
  { text: '[OK] Starting full-stack runtime...', delay: 1200, color: '#00d4ff' },
  { text: '[READY] All systems operational.', delay: 1500, color: '#00ff88' },
];

const stats = [
  { icon: <Cpu className="w-4 h-4" />, label: 'FOCUS', value: 'AI & ML', color: '#00ff88' },
  { icon: <Globe className="w-4 h-4" />, label: 'STACK', value: 'Full-Stack', color: '#00d4ff' },
  { icon: <Shield className="w-4 h-4" />, label: 'CERT', value: 'AWS CCP', color: '#a855f7' },
  { icon: <Activity className="w-4 h-4" />, label: 'STATUS', value: 'Available', color: '#00ff88' },
];

export function HeroSection({ profile }: HeroSectionProps) {
  const [bootComplete, setBootComplete] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Boot sequence animation
    const timers: NodeJS.Timeout[] = [];

    bootLines.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
      }, bootLines[index]!.delay);
      timers.push(timer);
    });

    // After boot completes, show the main content
    const contentTimer = setTimeout(() => {
      setBootComplete(true);
      setTimeout(() => setShowContent(true), 300);
    }, 2200);
    timers.push(contentTimer);

    return () => timers.forEach(clearTimeout);
  }, []);

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
      style={{ background: 'linear-gradient(180deg, #050510 0%, #080820 50%, #050510 100%)' }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transform-gpu translate-z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00ff88]/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00d4ff]/5 blur-[100px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#a855f7]/3 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Boot Sequence Terminal */}
        <AnimatePresence>
          {!bootComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.5 }}
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
                      transition={{ duration: 0.3 }}
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

        {/* Main Hero Content — Appears after boot */}
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
                    {/* Terminal-style greeting */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00ff88]/8 border border-[#00ff88]/20 mb-8">
                      <span className="status-dot" />
                      <span className="font-mono text-sm text-[#00ff88]">
                        system ready — all modules loaded
                      </span>
                    </div>

                    {/* Big headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
                      <span className="block text-white/90">I architect</span>
                      <span className="block text-white/40">intelligent</span>
                      <span className="block mt-2">
                        <span className="section-header !text-5xl md:!text-7xl lg:!text-8xl">
                          systems.
                        </span>
                      </span>
                    </h1>

                    {/* Description */}
                    <div className="text-lg md:text-xl text-white/40 max-w-xl mb-10 leading-relaxed font-medium mx-auto lg:mx-0 min-h-[60px] md:min-h-[80px]">
                      <span className="text-[#00ff88]/80 font-mono text-sm mr-2 align-middle">&gt;</span>
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
                      <a href={profile.resume} className="btn-outline-terminal text-base group">
                        <Download className="mr-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                        download resume
                      </a>
                    </div>
                  </motion.div>
                </div>

                {/* Right: System Dashboard */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex-shrink-0 order-1 lg:order-2 w-full max-w-sm"
                >
                  {/* Avatar OS Window */}
                  <div className="os-window">
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

                    {/* Avatar */}
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src="/images/avatar.jpg"
                        alt={profile.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent" />

                      {/* HUD overlay */}
                      <div className="absolute top-3 left-3 font-mono text-[9px] text-[#00ff88]/60 space-y-1">
                        <div>ID: SOMESH_KS</div>
                        <div>LOC: 12.97°N 77.59°E</div>
                      </div>
                      <div className="absolute top-3 right-3">
                        <div className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_10px_rgba(0,255,136,0.8)] animate-pulse" />
                      </div>

                      {/* Name badge */}
                      <div className="absolute bottom-0 inset-x-0 p-4">
                        <div className="font-bold text-white text-lg tracking-tight leading-none">
                          {profile.name}
                        </div>
                        <div className="font-mono text-xs text-[#00ff88]/80 mt-1">
                          AI & ML Engineer
                        </div>
                      </div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-px bg-white/5">
                      {stats.map((stat) => (
                        <div key={stat.label} className="p-4 bg-[#0a0a1a]">
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
                <div className="w-8 h-14 rounded-full border border-white/10 flex items-start justify-center p-2 group-hover:border-[#00ff88]/30 transition-colors">
                  <motion.div
                    animate={{ y: [0, 14, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-1.5 h-3 rounded-full bg-[#00ff88]/60"
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
