'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';
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

const vibes = [
  { emoji: '🧠', label: 'AI / ML', color: '#A855F7' },
  { emoji: '⚡', label: 'Full-Stack', color: '#3B82F6' },
  { emoji: '☁️', label: 'AWS Certified', color: '#38BDF8' },
  { emoji: '🟢', label: 'Available', color: '#22C55E' },
];

export function HeroSection({ profile }: HeroSectionProps) {
  const [show, setShow] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), isMobile ? 100 : 300);
    return () => clearTimeout(timer);
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-24 pb-12"
      style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #110A1F 40%, #0A0A0F 100%)' }}
    >
      {/* Decorative gradient orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] right-[10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#FF2D78]/[0.06] blur-[80px] md:blur-[140px] rounded-full" />
        <div className="absolute bottom-[15%] left-[5%] w-[300px] md:w-[450px] h-[300px] md:h-[450px] bg-[#A855F7]/[0.05] blur-[80px] md:blur-[140px] rounded-full" />
        <div className="absolute top-[50%] left-[40%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#3B82F6]/[0.04] blur-[60px] md:blur-[120px] rounded-full" />
      </div>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="container mx-auto max-w-6xl relative z-10"
          >
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Left: Text Content */}
              <div className="flex-1 max-w-2xl text-center lg:text-left order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  {/* Greeting pill */}
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] mb-8">
                    <span className="text-lg">👋</span>
                    <span className="text-sm font-semibold text-white/80">hey, i&apos;m somesh</span>
                  </div>

                  {/* Big headline */}
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[0.95] tracking-tighter">
                    <span className="block text-white/90">I build</span>
                    <span className="block gradient-text-pink">cool stuff</span>
                    <span className="block text-white/40">
                      with <span className="gradient-text-cool">AI & code</span>
                    </span>
                  </h1>

                  {/* Subtitle with typewriter */}
                  <div className="text-lg md:text-xl text-white/40 max-w-xl mb-10 leading-relaxed font-medium mx-auto lg:mx-0 min-h-[60px]">
                    <Typewriter
                      words={[
                        "crafting deep learning pipelines & neural networks.",
                        "building high-performance full-stack applications.",
                        "architecting scalable cloud infrastructure on AWS.",
                        "turning complex data into intelligent solutions.",
                      ]}
                      typingSpeed={35}
                      deletingSpeed={18}
                      pauseTime={3000}
                    />
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                    <button onClick={scrollToContact} className="btn-gradient group">
                      <span className="flex items-center gap-2">
                        let&apos;s connect
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                    <a href={profile.resume} className="btn-ghost group" download>
                      <Download className="mr-2 w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                      download resume
                    </a>
                  </div>

                  {/* Vibe pills */}
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {vibes.map((vibe) => (
                      <motion.div
                        key={vibe.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + vibes.indexOf(vibe) * 0.1 }}
                        className="pill-badge"
                        style={{
                          background: `${vibe.color}12`,
                          borderColor: `${vibe.color}30`,
                          color: vibe.color,
                        }}
                      >
                        <span>{vibe.emoji}</span>
                        {vibe.label}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right: Photo Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex-shrink-0 order-1 lg:order-2 w-full max-w-xs md:max-w-sm"
              >
                <div className="relative group">
                  {/* Gradient border ring */}
                  <div
                    className="absolute -inset-1 rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                    style={{ background: 'linear-gradient(135deg, #FF2D78, #A855F7, #3B82F6, #BEFF46)' }}
                  />

                  {/* Photo container */}
                  <div className="relative rounded-3xl overflow-hidden bg-[#140F28]">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src="/images/avatar.jpg"
                        alt={profile.name}
                        fill
                        sizes="(max-width: 768px) 80vw, 384px"
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />

                      {/* Name overlay */}
                      <div className="absolute bottom-0 inset-x-0 p-5">
                        <div className="font-black text-white text-xl tracking-tight">{profile.name}</div>
                        <div className="text-sm text-white/50 font-medium mt-1">
                          AI & ML Engineer · Bangalore
                        </div>
                      </div>
                    </div>
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
              <div className="text-xs text-white/20 mb-3 tracking-widest font-medium">
                SCROLL DOWN
              </div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronDown className="w-5 h-5 text-white/20 group-hover:text-[#FF2D78]/60 transition-colors" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
