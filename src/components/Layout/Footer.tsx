'use client';

import { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Mail, Terminal, Wifi, Cpu } from 'lucide-react';

export function Footer() {
  const [time, setTime] = useState('');
  const [uptime, setUptime] = useState('');

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const mins = Math.floor(elapsed / 60);
      const secs = elapsed % 60;
      setUptime(`${mins}m ${secs}s`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative overflow-hidden z-50" style={{ background: 'linear-gradient(180deg, #050510 0%, #030308 100%)' }}>
      {/* Main footer content */}
      <div className="border-t border-white/5">
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-12 mb-16">
            {/* CTA */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00ff88]/8 border border-[#00ff88]/15 mb-6">
                <span className="status-dot" />
                <span className="font-mono text-xs text-[#00ff88]">currently accepting new projects</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white/90 tracking-tighter leading-[0.9] mb-4">
                Let&apos;s build <br />
                <span className="section-header !text-5xl md:!text-7xl">something.</span>
              </h2>
              <p className="text-lg text-white/30 font-medium max-w-md">
                Have an idea? Let&apos;s architect it together.
              </p>
            </div>

            {/* Actions */}
            <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
              <a href="mailto:kalathursomesh@gmail.com" className="btn-matrix group py-4 px-8 text-base justify-center">
                <Mail className="mr-2 w-5 h-5" />
                ./send_email.sh
              </a>
              <div className="flex gap-2">
                <SocialIcon icon={<Github className="w-5 h-5" />} href="https://github.com/kalattursomesh" label="gh" />
                <SocialIcon icon={<Linkedin className="w-5 h-5" />} href="https://linkedin.com/in/kalattursomesh" label="li" />
                <SocialIcon icon={<Twitter className="w-5 h-5" />} href="https://twitter.com/kalattursomesh" label="tw" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OS Status Bar */}
      <div className="border-t border-white/5 bg-[#030308]">
        <div className="container mx-auto max-w-6xl px-6 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            {/* Left status */}
            <div className="flex items-center gap-4 font-mono text-[10px] text-white/20">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3 h-3" />
                <span>SOMESH_OS v2.0</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <Wifi className="w-3 h-3 text-[#00ff88]" />
                <span>connected</span>
              </div>
              <div className="hidden md:flex items-center gap-1.5">
                <Cpu className="w-3 h-3" />
                <span>session: {uptime}</span>
              </div>
            </div>

            {/* Center */}
            <div className="font-mono text-[10px] text-white/15">
              © {new Date().getFullYear()} Kalattur Somesh — Engineered in Bangalore
            </div>

            {/* Right status */}
            <div className="font-mono text-[10px] text-white/20 flex items-center gap-2">
              <span className="status-dot !w-1 !h-1" />
              {time}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const SocialIcon = ({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    className="flex-1 sm:flex-none flex items-center justify-center gap-2 p-4 rounded-xl os-window hover:!border-[#00ff88]/30 transition-all group"
  >
    <span className="text-white/40 group-hover:text-[#00ff88] transition-colors">{icon}</span>
    <span className="font-mono text-[10px] text-white/20 group-hover:text-[#00ff88]/60 transition-colors hidden sm:inline">{label}</span>
  </a>
);