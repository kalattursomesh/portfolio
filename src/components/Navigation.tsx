'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUp, User, Wrench, FolderOpen, Briefcase, Mail, Home } from 'lucide-react';

interface NavigationSection {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navigationSections: NavigationSection[] = [
  { id: 'hero', label: 'home', href: '#hero', icon: <Home className="w-4 h-4" /> },
  { id: 'about', label: 'about', href: '#about', icon: <User className="w-4 h-4" /> },
  { id: 'skills', label: 'skills', href: '#skills', icon: <Wrench className="w-4 h-4" /> },
  { id: 'projects', label: 'projects', href: '#projects', icon: <FolderOpen className="w-4 h-4" /> },
  { id: 'experience', label: 'experience', href: '#experience', icon: <Briefcase className="w-4 h-4" /> },
];

export default function Navigation() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      {/* Floating Pill Navigation */}
      <nav
        className={`fixed top-0 inset-x-0 z-[1000] transition-all duration-500 ${
          scrolled ? 'py-3 px-4' : 'py-4 px-6'
        }`}
      >
        <div className="container mx-auto">
          <div
            className={`mx-auto max-w-3xl transition-all duration-500 ${
              scrolled
                ? 'bg-[#0A0A0F]/80 backdrop-blur-2xl border border-white/[0.06] rounded-full shadow-2xl shadow-black/30'
                : 'bg-transparent'
            }`}
          >
            <div
              className={`flex justify-between items-center transition-all duration-500 ${
                scrolled ? 'h-14 px-6' : 'h-12 px-2'
              }`}
            >
              {/* Logo */}
              <button
                onClick={() => scrollToSection('#hero')}
                className="flex items-center gap-2 group"
              >
                <span className="text-lg font-black tracking-tight gradient-text-pink">
                  somesh.
                </span>
              </button>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-1">
                {navigationSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.href)}
                    className={`group relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      currentSection === section.id
                        ? 'text-white'
                        : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    <span className="relative z-10">{section.label}</span>
                    {currentSection === section.id && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,45,120,0.15), rgba(168,85,247,0.1))',
                          border: '1px solid rgba(255,45,120,0.2)',
                        }}
                        transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
                      />
                    )}
                  </button>
                ))}

                <div className="w-px h-5 bg-white/10 mx-2" />

                <button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-gradient text-xs py-2 px-5"
                >
                  <Mail className="w-3.5 h-3.5 mr-1.5" />
                  contact
                </button>
              </div>

              {/* Mobile Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white hover:bg-white/10 transition-all"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu — Full Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 z-[999] bg-[#0A0A0F]/95 backdrop-blur-2xl flex flex-col items-center justify-center"
              >
                {/* Close button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-6 right-6 p-3 rounded-full bg-white/[0.06] border border-white/[0.08] text-white"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="space-y-4 text-center">
                  {navigationSections.map((section) => (
                    <motion.button
                      key={section.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: navigationSections.indexOf(section) * 0.05 }}
                      onClick={() => scrollToSection(section.href)}
                      className={`block w-full text-3xl font-black tracking-tight transition-colors py-2 ${
                        currentSection === section.id
                          ? 'gradient-text-pink'
                          : 'text-white/40 hover:text-white/70'
                      }`}
                    >
                      {section.label}
                    </motion.button>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-6"
                  >
                    <button
                      onClick={() => scrollToSection('#contact')}
                      className="btn-gradient py-4 px-10 text-lg"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      get in touch
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Back to top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-[1000] w-12 h-12 rounded-full bg-gradient-to-br from-[#FF2D78] to-[#A855F7] text-white flex items-center justify-center shadow-2xl shadow-[#FF2D78]/20 hover:-translate-y-1 hover:shadow-[#FF2D78]/30 transition-all"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}