'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PersonalInfo } from '@/types';
import { MapPin, GraduationCap, Code2, HeartPulse, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface AboutSectionProps {
  personal: PersonalInfo;
}

const bentoCards = [
  {
    emoji: '📍',
    icon: <MapPin className="w-5 h-5" />,
    label: 'Based in',
    value: 'Bangalore, India',
    gradient: 'from-[#3B82F6]/20 to-[#818CF8]/10',
    color: '#3B82F6',
  },
  {
    emoji: '🎓',
    icon: <GraduationCap className="w-5 h-5" />,
    label: 'Education',
    value: 'B.E in AI & ML',
    gradient: 'from-[#A855F7]/20 to-[#FF2D78]/10',
    color: '#A855F7',
  },
  {
    emoji: '🧠',
    icon: <HeartPulse className="w-5 h-5" />,
    label: 'Focus',
    value: 'Deep Learning & CNNs',
    gradient: 'from-[#FF2D78]/20 to-[#FF6B35]/10',
    color: '#FF2D78',
  },
  {
    emoji: '🛠️',
    icon: <Code2 className="w-5 h-5" />,
    label: 'Toolkit',
    value: 'Python, Next.js, AWS',
    gradient: 'from-[#BEFF46]/15 to-[#38BDF8]/10',
    color: '#BEFF46',
  },
];

const quickStats = [
  { value: '10+', label: 'Projects', emoji: '🚀' },
  { value: '3+', label: 'Years Exp', emoji: '⏳' },
  { value: '500+', label: 'Commits', emoji: '💻' },
  { value: '∞', label: 'Curiosity', emoji: '✨' },
];

export const AboutSection: React.FC<AboutSectionProps> = ({ personal }) => {
  const { name, bio } = personal;

  return (
    <section id="about" className="py-28 relative overflow-hidden px-6 section-dark">
      {/* Background orbs */}
      <div className="absolute top-1/4 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#A855F7]/[0.04] blur-[100px] md:blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#FF2D78]/[0.03] blur-[80px] md:blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto relative z-10 max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 pill-badge-purple mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            get to know me
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white/90 tracking-tighter leading-[0.95] mb-4">
            about <span className="genz-heading-sm !text-5xl md:!text-7xl">me.</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Large card: Photo + Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-2 md:row-span-2 genz-card-glow"
          >
            <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row gap-8 h-full">
              {/* Photo */}
              <div className="flex-shrink-0">
                <div className="relative w-full md:w-48 aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="/images/avatar.jpg"
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, 200px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Bio */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white tracking-tight mb-4">
                  {name} <span className="text-[#FF2D78]">✦</span>
                </h3>
                <div className="space-y-4">
                  {(bio || '').split('\n').map((paragraph, index) => (
                    <p
                      key={index}
                      className={`leading-relaxed font-medium ${index === 0 ? 'text-white/70 text-lg' : 'text-white/40'}`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Quick stats row */}
                <div className="flex flex-wrap gap-3 mt-8">
                  {quickStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/[0.06]"
                    >
                      <span className="text-sm">{stat.emoji}</span>
                      <span className="font-bold text-white text-sm">{stat.value}</span>
                      <span className="text-xs text-white/30">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Small bento cards */}
          {bentoCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="genz-card group hover:!border-white/10"
            >
              <div className={`relative z-10 p-6 h-full bg-gradient-to-br ${card.gradient} rounded-3xl`}>
                <div className="text-3xl mb-3">{card.emoji}</div>
                <div className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-1">
                  {card.label}
                </div>
                <div className="text-lg font-bold text-white tracking-tight">
                  {card.value}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;