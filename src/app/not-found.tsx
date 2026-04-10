import Link from 'next/link';
import { Terminal, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050510] px-6 relative overflow-hidden text-white font-mono">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff3366]/5 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-xl w-full relative z-10">
        <div className="os-window">
          <div className="os-titlebar border-b border-white/10 bg-black/40 px-4 py-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[10px] text-white/30 uppercase tracking-widest pl-2">
              error_handler.sh
            </span>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6 text-[#ff3366]">
              <Terminal className="w-6 h-6" />
              <span className="text-xl font-bold tracking-widest">FATAL ERROR 404</span>
            </div>

            <div className="space-y-4 text-sm md:text-base text-white/70 mb-8">
              <p>
                <span className="text-[#00d4ff]">root@somesh_os</span>:
                <span className="text-[#00ff88]">~</span>$ locate requested_page
              </p>
              <p className="text-[#ff3366]">
                Command failed: The specified module or directory could not be found in the current filesystem.
              </p>
              <p className="text-white/40 italic">
                // The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
              </p>
            </div>

            <Link href="/" className="btn-matrix inline-flex py-3 px-8 text-sm group">
              <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              ./return_to_home.sh
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
