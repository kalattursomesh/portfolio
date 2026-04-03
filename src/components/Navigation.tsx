'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUp, Terminal, User, Wrench, FolderOpen, Briefcase, Mail, Home } from 'lucide-react';

interface NavigationSection {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navigationSections: NavigationSection[] = [
  { id: 'hero', label: 'init', href: '#hero', icon: <Home className="w-4 h-4" /> },
  { id: 'about', label: 'whoami', href: '#about', icon: <User className="w-4 h-4" /> },
  { id: 'skills', label: 'skills', href: '#skills', icon: <Wrench className="w-4 h-4" /> },
  { id: 'projects', label: 'projects', href: '#projects', icon: <FolderOpen className="w-4 h-4" /> },
  { id: 'experience', label: 'history', href: '#experience', icon: <Briefcase className="w-4 h-4" /> },
];

export default function Navigation() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navigationSections.map(s => s.id);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        if (!id) continue;
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollPosition) {
          setCurrentSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* OS Top Bar */}
      <nav
        className={`fixed top-0 inset-x-0 z-[1000] transition-all duration-500 ${
          scrolled ? 'py-2 px-3' : 'py-3 px-4 md:px-6'
        }`}
      >
        <div className="container mx-auto">
          <div
            className={`mx-auto max-w-5xl transition-all duration-500 ${
              scrolled
                ? 'os-window !rounded-xl'
                : 'bg-transparent border-transparent'
            }`}
          >
            <div
              className={`flex justify-between items-center px-4 md:px-6 transition-all duration-500 ${
                scrolled ? 'h-14' : 'h-12'
              }`}
            >
              {/* Logo — Terminal Style */}
              <button
                onClick={() => scrollToSection('#hero')}
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#00d4ff] flex items-center justify-center shadow-lg shadow-[#00ff88]/20 group-hover:shadow-[#00ff88]/40 transition-shadow">
                  <Terminal className="w-4 h-4 text-black" />
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#00ff88]">somesh</span>
                  <span className="text-white/30 font-mono text-sm">@</span>
                  <span className="font-mono text-sm text-[#00d4ff]">portfolio</span>
                  <span className="text-white/20 font-mono text-xs hidden md:inline">~</span>
                </div>
              </button>

              {/* Desktop Nav — Dock Style */}
              <div className="hidden lg:flex items-center gap-1">
                {navigationSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.href)}
                    className={`group relative px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-300 flex items-center gap-2 ${
                      currentSection === section.id
                        ? 'text-[#00ff88]'
                        : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    {section.icon}
                    <span className="relative z-10">{section.label}</span>
                    {currentSection === section.id && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-[#00ff88]/8 border border-[#00ff88]/20 rounded-lg"
                        transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
                      />
                    )}
                    {/* Dock reflection dot */}
                    {currentSection === section.id && (
                      <motion.div
                        layoutId="nav-dot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00ff88] shadow-[0_0_6px_rgba(0,255,136,0.8)]"
                      />
                    )}
                  </button>
                ))}

                <div className="w-px h-6 bg-white/10 mx-2" />

                {/* Live time display */}
                <div className="font-mono text-[10px] text-white/30 px-2 hidden xl:block min-w-[70px]">
                  {mounted ? time : '--:--:--'}
                </div>

                <div className="w-px h-6 bg-white/10 mx-2 hidden xl:block" />

                <button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-matrix text-xs py-2 px-5 flex items-center gap-2 group !rounded-lg"
                >
                  <span className="status-dot !w-1.5 !h-1.5" />
                  <Mail className="w-3.5 h-3.5" />
                  contact
                </button>
              </div>

              {/* Mobile Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="lg:hidden absolute top-full inset-x-3 mt-2 z-[1000]"
            >
              <div className="os-window p-4">
                {/* Terminal header */}
                <div className="os-titlebar !px-3 !py-2 mb-3 rounded-lg">
                  <div className="os-titlebar-dots">
                    <div className="os-titlebar-dot bg-[#ff5f57]" />
                    <div className="os-titlebar-dot bg-[#febc2e]" />
                    <div className="os-titlebar-dot bg-[#28c840]" />
                  </div>
                  <span className="font-mono text-[10px] text-white/30 ml-2">
                    navigation.sh
                  </span>
                </div>

                <div className="space-y-1">
                  {navigationSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.href)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-mono font-medium transition-all flex items-center gap-3 ${
                        currentSection === section.id
                          ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20'
                          : 'text-white/60 border border-transparent hover:bg-white/5'
                      }`}
                    >
                      <span className="text-[#00ff88]/60">$</span>
                      {section.icon}
                      {section.label}
                      {currentSection === section.id && (
                        <span className="ml-auto status-dot !w-1.5 !h-1.5" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/5">
                  <button
                    onClick={() => scrollToSection('#contact')}
                    className="w-full btn-matrix py-3 text-sm flex items-center justify-center gap-2 !rounded-lg"
                  >
                    <Mail className="w-4 h-4" />
                    ./contact.sh
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Back to top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-[1000] w-12 h-12 rounded-xl border border-[#00ff88]/20 bg-[#0a0a1a]/80 backdrop-blur-xl text-[#00ff88] flex items-center justify-center shadow-2xl hover:-translate-y-1 hover:border-[#00ff88]/50 hover:shadow-[0_0_20px_rgba(0,255,136,0.2)] transition-all"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}