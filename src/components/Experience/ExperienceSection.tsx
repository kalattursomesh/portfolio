'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { WorkExperience } from '@/types';
import { Calendar, MapPin, Briefcase, ChevronRight } from 'lucide-react';

interface ExperienceSectionProps {
  experience: WorkExperience[];
}

const gradientColors = ['#FF2D78', '#A855F7', '#3B82F6', '#BEFF46', '#FF6B35'];

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => {
  const formatDate = (date: any) => {
    if (!date) return 'Present';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const calculateDuration = (startDate: any, endDate: any) => {
    const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const end = endDate ? (typeof endDate === 'string' ? new Date(endDate) : endDate) : new Date();
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const m = months % 12;
    return years > 0 ? `${years}y ${m}m` : `${m}mo`;
  };

  return (
    <section id="experience" className="py-28 relative overflow-hidden px-6 section-dark">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#A855F7]/[0.03] blur-[120px] md:blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-[#FF2D78]/[0.04] blur-[100px] md:blur-[180px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 pill-badge-orange mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            where i&apos;ve worked
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white/90 tracking-tighter leading-[0.95] mb-4">
            experience<span className="genz-heading-sm !text-5xl md:!text-7xl">.</span> 💼
          </h2>
          <p className="text-lg text-white/40 font-medium max-w-xl mx-auto">
            My professional journey and contributions so far.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — gradient */}
          <div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(255,45,120,0.3), rgba(168,85,247,0.3), transparent)' }}
          />

          <div className="space-y-12">
            {experience.map((exp, index) => {
              const accentColor = gradientColors[index % gradientColors.length]!;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline node */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 top-8 z-10">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        background: accentColor,
                        boxShadow: `0 0 16px ${accentColor}60`,
                      }}
                    />
                  </div>

                  {/* Date card */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pl-16 md:pl-0`}>
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                      style={{
                        background: `${accentColor}12`,
                        border: `1px solid ${accentColor}25`,
                        color: accentColor,
                      }}
                    >
                      <Calendar className="w-3 h-3" />
                      {formatDate(exp.startDate)} → {formatDate(exp.endDate)}
                    </div>
                    <div className="text-[11px] text-white/20 mt-2 tracking-wider uppercase font-medium">
                      {calculateDuration(exp.startDate, exp.endDate)}
                    </div>
                  </div>

                  {/* Experience card */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} pl-16 md:pl-0`}>
                    <div className="genz-card">
                      <div className="relative z-10 p-6">
                        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                          {exp.position}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: accentColor }}>
                            <Briefcase className="w-3 h-3" /> {exp.company}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-white/40">
                            <MapPin className="w-3 h-3" /> {exp.location}
                          </span>
                        </div>

                        <p className="text-sm text-white/40 leading-relaxed mb-5">
                          {exp.description}
                        </p>

                        {exp.responsibilities && (
                          <div className="space-y-2 mb-5">
                            {exp.responsibilities.map((resp, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm">
                                <ChevronRight className="w-4 h-4 shrink-0 mt-0.5" style={{ color: `${accentColor}80` }} />
                                <span className="text-white/50 leading-relaxed">{resp}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {exp.technologies && (
                          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                            {exp.technologies.map(tech => (
                              <span key={tech} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/[0.04] text-white/30 border border-white/[0.05]">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;