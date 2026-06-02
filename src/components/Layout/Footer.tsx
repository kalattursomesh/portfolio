'use client';

import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative overflow-hidden z-50" style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #08060E 100%)' }}>
      {/* Background orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#FF2D78]/[0.04] blur-[180px] rounded-full pointer-events-none" />

      {/* Main footer content */}
      <div className="border-t border-white/5">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <div className="flex flex-col items-center text-center gap-8 mb-16">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20">
              <span className="status-dot-live" />
              <span className="text-sm font-semibold text-[#22C55E]">open to new opportunities</span>
            </div>

            {/* Bold CTA */}
            <h2 className="text-5xl md:text-8xl font-black text-white/90 tracking-tighter leading-[0.95]">
              let&apos;s work<br />
              <span className="genz-heading !text-5xl md:!text-8xl">together.</span> ✨
            </h2>
            <p className="text-lg text-white/30 font-medium max-w-md">
              Have an idea? Let&apos;s turn it into something amazing.
            </p>

            {/* Email button */}
            <a href="mailto:kalathursomesh@gmail.com" className="btn-gradient py-4 px-10 text-lg group">
              <Mail className="mr-3 w-5 h-5" />
              say hello
              <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Social icons */}
            <div className="flex gap-3">
              <SocialIcon icon={<Github className="w-5 h-5" />} href="https://github.com/kalattursomesh" />
              <SocialIcon icon={<Linkedin className="w-5 h-5" />} href="https://linkedin.com/in/kalattursomesh" />
              <SocialIcon icon={<Twitter className="w-5 h-5" />} href="https://twitter.com/kalattursomesh" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto max-w-6xl px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-sm font-semibold gradient-text-pink">
              somesh.
            </div>
            <div className="text-xs text-white/20 font-medium">
              © {new Date().getFullYear()} Kalattur Somesh — Built with 💖 in Bangalore
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a
    href={href}
    target="_blank"
    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/40 hover:text-[#FF2D78] hover:border-[#FF2D78]/30 hover:bg-[#FF2D78]/[0.06] transition-all duration-300"
  >
    {icon}
  </a>
);