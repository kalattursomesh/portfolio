'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { WorkExperience } from '@/types';
import { Calendar, MapPin, Briefcase, ChevronRight, GitBranch } from 'lucide-react';

interface ExperienceSectionProps {
  experience: WorkExperience[];
}

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
    <section id="experience" className="py-28 relative overflow-hidden px-6" style={{ background: 'linear-gradient(180deg, #050510 0%, #060618 50%, #050510 100%)' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00d4ff]/3 blur-[200px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="font-mono text-xs text-[#00ff88]/50 mb-3 inline-flex items-center gap-2">
            <span className="text-[#00ff88]">❯</span> git log --oneline --graph
          </div>
          <h2 className="section-header mb-4">Experience.</h2>
          <p className="text-lg text-white/40 font-medium max-w-xl mx-auto">
            My professional journey and contributions so far.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00ff88]/20 to-transparent md:-translate-x-1/2" />

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 top-8 z-10">
                  <div className="w-4 h-4 rounded-full bg-[#0a0a1a] border-2 border-[#00ff88] shadow-[0_0_12px_rgba(0,255,136,0.4)]" />
                </div>

                {/* Git branch icon */}
                <div className="absolute left-[22px] md:left-1/2 -translate-x-1/2 top-14 text-[#00ff88]/30">
                  <GitBranch className="w-3 h-3" />
                </div>

                {/* Date card */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pl-16 md:pl-0`}>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00ff88]/8 border border-[#00ff88]/15 font-mono text-xs text-[#00ff88] ${index % 2 === 0 ? '' : ''}`}>
                    <Calendar className="w-3 h-3" />
                    {formatDate(exp.startDate)} → {formatDate(exp.endDate)}
                  </div>
                  <div className="font-mono text-[10px] text-white/20 mt-2 tracking-widest uppercase">
                    {calculateDuration(exp.startDate, exp.endDate)}
                  </div>
                </div>

                {/* Experience card */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} pl-16 md:pl-0`}>
                  <div className="os-window">
                    <div className="os-titlebar">
                      <div className="os-titlebar-dots">
                        <div className="os-titlebar-dot bg-[#ff5f57]" />
                        <div className="os-titlebar-dot bg-[#febc2e]" />
                        <div className="os-titlebar-dot bg-[#28c840]" />
                      </div>
                      <span className="font-mono text-[10px] text-white/30 ml-3">
                        {exp.company.toLowerCase().replace(/\s+/g, '_')}.log
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                        {exp.position}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="flex items-center gap-1.5 font-mono text-xs text-[#00d4ff]">
                          <Briefcase className="w-3 h-3" /> {exp.company}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-xs text-[#a855f7]">
                          <MapPin className="w-3 h-3" /> {exp.location}
                        </span>
                      </div>

                      <p className="text-sm text-white/40 leading-relaxed mb-5 border-l-2 border-[#00ff88]/20 pl-4">
                        {exp.description}
                      </p>

                      {exp.responsibilities && (
                        <div className="space-y-2 mb-5">
                          {exp.responsibilities.map((resp, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm">
                              <ChevronRight className="w-4 h-4 text-[#00ff88]/50 shrink-0 mt-0.5" />
                              <span className="text-white/50 leading-relaxed">{resp}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {exp.technologies && (
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                          {exp.technologies.map(tech => (
                            <span key={tech} className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-white/30 border border-white/5">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;