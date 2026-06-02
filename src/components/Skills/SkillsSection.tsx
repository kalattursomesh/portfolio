'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '@/types';
import { Cpu, Cloud, Code2, Layers, Zap, Wrench } from 'lucide-react';

interface SkillsSectionProps {
  skills: Skill[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const categories = Array.from(new Set(skills.map(s => s.category)));

  const getCategoryTheme = (category: string) => {
    switch (category.toLowerCase()) {
      case 'cloud': return { color: '#38BDF8', gradient: 'from-[#38BDF8]/20 to-[#3B82F6]/10', icon: <Cloud className="w-5 h-5" />, emoji: '☁️' };
      case 'ai/ml': return { color: '#A855F7', gradient: 'from-[#A855F7]/20 to-[#FF2D78]/10', icon: <Cpu className="w-5 h-5" />, emoji: '🧠' };
      case 'languages': return { color: '#BEFF46', gradient: 'from-[#BEFF46]/15 to-[#38BDF8]/10', icon: <Code2 className="w-5 h-5" />, emoji: '💻' };
      case 'frontend': return { color: '#FF2D78', gradient: 'from-[#FF2D78]/20 to-[#FF6B35]/10', icon: <Layers className="w-5 h-5" />, emoji: '🎨' };
      case 'tools': return { color: '#FF6B35', gradient: 'from-[#FF6B35]/20 to-[#BEFF46]/10', icon: <Wrench className="w-5 h-5" />, emoji: '🔧' };
      case 'cs fundamentals': return { color: '#3B82F6', gradient: 'from-[#3B82F6]/20 to-[#818CF8]/10', icon: <Zap className="w-5 h-5" />, emoji: '⚡' };
      default: return { color: '#94A3B8', gradient: 'from-white/10 to-white/5', icon: <Code2 className="w-5 h-5" />, emoji: '📦' };
    }
  };

  return (
    <section id="skills" className="py-28 relative overflow-hidden px-6 section-dark">
      {/* Background orbs */}
      <div className="absolute top-1/4 right-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#3B82F6]/[0.04] blur-[80px] md:blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#A855F7]/[0.04] blur-[80px] md:blur-[200px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 pill-badge-blue mb-4">
            <Wrench className="w-3.5 h-3.5" />
            what i work with
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white/90 tracking-tighter leading-[0.95] mb-4">
            my toolkit<span className="genz-heading-sm !text-5xl md:!text-7xl">.</span> 🛠️
          </h2>
          <p className="text-lg text-white/40 font-medium max-w-2xl">
            The technologies and tools I use to build intelligent systems and modern applications.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category, catIdx) => {
            const theme = getCategoryTheme(category);
            const categorySkills = skills.filter(s => s.category === category);

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="genz-card group"
              >
                <div className={`relative z-10 p-6 h-full bg-gradient-to-br ${theme.gradient} rounded-3xl`}>
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="text-2xl">{theme.emoji}</div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">{category}</h3>
                      <span className="text-xs text-white/25 font-medium">{categorySkills.length} skills</span>
                    </div>
                  </div>

                  {/* Skill pills */}
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group/skill relative px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-default"
                        style={{
                          background: `${theme.color}10`,
                          border: `1px solid ${theme.color}20`,
                          color: `${theme.color}CC`,
                        }}
                      >
                        <span className="relative z-10">{skill.name}</span>

                        {/* Proficiency tooltip on hover */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/skill:opacity-100 transition-opacity pointer-events-none">
                          <div
                            className="px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap"
                            style={{ background: theme.color, color: '#0A0A0F' }}
                          >
                            {skill.proficiency}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
