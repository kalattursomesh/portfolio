'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PersonalInfo } from '@/types';
import { MapPin, GraduationCap, Code2, HeartPulse, Terminal, Wifi, HardDrive, Cpu } from 'lucide-react';

interface AboutSectionProps {
  personal: PersonalInfo;
}

const systemModules = [
  { name: 'neural_networks.py', status: 'active', cpu: '34%', color: '#00ff88' },
  { name: 'cloud_infra.aws', status: 'active', cpu: '28%', color: '#00d4ff' },
  { name: 'web_runtime.tsx', status: 'active', cpu: '22%', color: '#a855f7' },
  { name: 'dsa_engine.cpp', status: 'idle', cpu: '8%', color: '#ffaa00' },
];

export const AboutSection: React.FC<AboutSectionProps> = ({ personal }) => {
  const { name, bio, location } = personal;

  return (
    <section id="about" className="py-28 relative overflow-hidden px-6" style={{ background: 'linear-gradient(180deg, #050510 0%, #060618 50%, #050510 100%)' }}>
      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Left Column: System Monitor Window */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            <div className="os-window">
              <div className="os-titlebar">
                <div className="os-titlebar-dots">
                  <div className="os-titlebar-dot bg-[#ff5f57]" />
                  <div className="os-titlebar-dot bg-[#febc2e]" />
                  <div className="os-titlebar-dot bg-[#28c840]" />
                </div>
                <span className="font-mono text-[10px] text-white/30 ml-3">system_info.sh</span>
              </div>

              <div className="p-6 space-y-6">
                {/* System Info */}
                <div className="space-y-3">
                  <div className="font-mono text-[10px] text-[#00ff88]/60 uppercase tracking-widest">// User Profile</div>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/40">user</span>
                      <span className="text-white font-bold">{name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">role</span>
                      <span className="text-[#00ff88]">AI/ML Engineer</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">location</span>
                      <span className="text-[#00d4ff]">{location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">status</span>
                      <span className="text-[#00ff88] flex items-center gap-2">
                        <span className="status-dot !w-1.5 !h-1.5" /> online
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-white/5" />

                {/* Active Modules */}
                <div className="space-y-3">
                  <div className="font-mono text-[10px] text-[#00ff88]/60 uppercase tracking-widest">// Active Modules</div>
                  <div className="space-y-2">
                    {systemModules.map((mod) => (
                      <div key={mod.name} className="flex items-center justify-between font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: mod.color, boxShadow: `0 0 6px ${mod.color}80` }} />
                          <span className="text-white/60">{mod.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-white/20">{mod.cpu}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider" style={{ color: mod.color, background: `${mod.color}15`, border: `1px solid ${mod.color}30` }}>
                            {mod.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-white/5" />

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <StatMini icon={<Cpu className="w-3.5 h-3.5" />} label="Uptime" value="3+ yrs" color="#00ff88" />
                  <StatMini icon={<HardDrive className="w-3.5 h-3.5" />} label="Projects" value="10+" color="#00d4ff" />
                  <StatMini icon={<Wifi className="w-3.5 h-3.5" />} label="Network" value="Stable" color="#a855f7" />
                  <StatMini icon={<Terminal className="w-3.5 h-3.5" />} label="Commits" value="500+" color="#ffaa00" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            {/* Section header */}
            <div className="mb-10">
              <div className="font-mono text-xs text-[#00ff88]/50 mb-3 flex items-center gap-2">
                <span className="text-[#00ff88]">❯</span> cat ~/about.md
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white/90 tracking-tighter leading-[0.9] mb-4">
                About <span className="section-header !text-5xl md:!text-6xl lg:!text-7xl">me.</span>
              </h2>
            </div>

            {/* Bio paragraphs */}
            <div className="space-y-6 mb-12">
              {(bio || '').split('\n').map((paragraph, index) => (
                <p key={index} className={`text-lg leading-relaxed font-medium ${index === 0 ? 'text-white/80 text-xl' : 'text-white/40'}`}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Detail cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <AboutCard
                icon={<MapPin className="w-5 h-5" />}
                label="Location"
                value={location}
                color="#00d4ff"
              />
              <AboutCard
                icon={<GraduationCap className="w-5 h-5" />}
                label="Education"
                value="B.E in AI & ML"
                color="#a855f7"
              />
              <AboutCard
                icon={<HeartPulse className="w-5 h-5" />}
                label="Focus"
                value="Deep Learning & CNNs"
                color="#ff3366"
              />
              <AboutCard
                icon={<Code2 className="w-5 h-5" />}
                label="Toolkit"
                value="Python, Next.js, AWS"
                color="#00ff88"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatMini = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) => (
  <div className="p-3 rounded-lg bg-white/3 border border-white/5 hover:border-white/10 transition-all">
    <div className="flex items-center gap-1.5 mb-1" style={{ color }}>
      {icon}
      <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">{label}</span>
    </div>
    <div className="font-bold text-white text-sm">{value}</div>
  </div>
);

const AboutCard = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) => (
  <div className="os-window !rounded-xl p-5 flex items-center gap-4 hover:-translate-y-1 transition-all duration-300">
    <div
      className="p-3 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
    >
      {icon}
    </div>
    <div>
      <div className="text-xs font-mono text-white/30 tracking-wider uppercase">{label}</div>
      <div className="text-base font-bold text-white tracking-tight leading-tight">{value}</div>
    </div>
  </div>
);

export default AboutSection;