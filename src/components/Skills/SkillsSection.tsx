'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '@/types';
import { Cpu, Cloud, Code2, Terminal, Layers, Globe, Zap } from 'lucide-react';

interface SkillsSectionProps {
  skills: Skill[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const categories = Array.from(new Set(skills.map(s => s.category)));

  const getCategoryTheme = (category: string) => {
    switch (category.toLowerCase()) {
      case 'cloud': return { color: '#00C9FF', icon: <Cloud className="w-5 h-5" />, cmd: 'aws' };
      case 'ai/ml': return { color: '#8B5CF6', icon: <Cpu className="w-5 h-5" />, cmd: 'torch' };
      case 'languages': return { color: '#00FFB2', icon: <Code2 className="w-5 h-5" />, cmd: 'lang' };
      case 'frontend': return { color: '#FF6B9D', icon: <Layers className="w-5 h-5" />, cmd: 'web' };
      case 'tools': return { color: '#FBBF24', icon: <Terminal className="w-5 h-5" />, cmd: 'tools' };
      case 'cs fundamentals': return { color: '#00C9FF', icon: <Zap className="w-5 h-5" />, cmd: 'core' };
      default: return { color: '#ffffff', icon: <Globe className="w-5 h-5" />, cmd: 'misc' };
    }
  };

  return (
    <section id="skills" className="py-28 relative overflow-hidden px-6 aurora-section">
      {/* Aurora ambient */}
      <div className="absolute top-1/4 right-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#00FFB2]/[0.03] blur-[80px] md:blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#8B5CF6]/[0.04] blur-[80px] md:blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-[#00C9FF]/[0.02] blur-[100px] md:blur-[180px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section heading */}
        <div className="mb-16">
          <div className="font-mono text-xs text-[#00FFB2]/50 mb-3 flex items-center gap-2">
            <span className="text-[#00FFB2]">❯</span> ls -la ~/skills/
          </div>
          <h2 className="section-header mb-4">Technical Stack.</h2>
          <p className="text-lg text-white/40 font-medium max-w-2xl">
            The technologies and tools I use to architect intelligent systems, deploy cloud infrastructure, and build modern applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, catIdx) => {
            const theme = getCategoryTheme(category);
            const categorySkills = skills.filter(s => s.category === category);

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="os-window group"
              >
                {/* Window title bar */}
                <div className="os-titlebar">
                  <div className="os-titlebar-dots">
                    <div className="os-titlebar-dot bg-[#ff5f57]" />
                    <div className="os-titlebar-dot bg-[#febc2e]" />
                    <div className="os-titlebar-dot bg-[#28c840]" />
                  </div>
                  <span className="font-mono text-[10px] text-white/30 ml-3">
                    {theme.cmd}.config
                  </span>
                </div>

                <div className="p-6">
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="p-2.5 rounded-xl"
                      style={{ background: `${theme.color}12`, color: theme.color, border: `1px solid ${theme.color}25` }}
                    >
                      {theme.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">{category}</h3>
                      <span className="font-mono text-[10px] text-white/20">{categorySkills.length} modules</span>
                    </div>
                  </div>

                  {/* Skill items */}
                  <div className="space-y-4">
                    {categorySkills.map((skill, skillIdx) => (
                      <div key={skill.name} className="group/skill">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-white/70 group-hover/skill:text-white transition-colors tracking-tight">
                            {skill.name}
                          </span>
                          <span
                            className="font-mono text-xs font-bold transition-all"
                            style={{ color: theme.color }}
                          >
                            {skill.proficiency}%
                          </span>
                        </div>

                        {/* Progress bar with shimmer */}
                        <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: `${theme.color}10` }}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: skillIdx * 0.1, ease: 'easeOut' }}
                            className="h-full rounded-full relative skill-bar-shimmer"
                            style={{
                              background: `linear-gradient(90deg, ${theme.color}80, ${theme.color})`,
                              boxShadow: `0 0 12px ${theme.color}40`,
                            }}
                          >
                            {/* Glow tip */}
                            <div
                              className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                              style={{
                                background: theme.color,
                                boxShadow: `0 0 10px ${theme.color}`,
                              }}
                            />
                          </motion.div>
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
