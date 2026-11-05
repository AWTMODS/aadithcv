"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, Sparkles, Terminal, Cpu } from "lucide-react";

export default function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[440px] xl:max-w-[480px] mx-auto lg:ml-auto"
    >
      {/* Ambient background glow behind the card */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#B15F2C]/15 via-[#B15F2C]/5 to-transparent rounded-[36px] blur-2xl -z-10 pointer-events-none" />

      {/* Main Editorial Showcase Card */}
      <div className="relative rounded-[32px] bg-[#FFFFFF] border border-[#E6E5E2] p-6 sm:p-7 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] overflow-hidden">
        
        {/* Top Status Bar */}
        <div className="flex items-center justify-between pb-5 border-b border-[#F1F0EE] text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold text-[#111111] tracking-wider uppercase text-[11px]">
              Active Builder
            </span>
          </div>

          <span className="text-[10px] tracking-widest text-[#8D8D8D] uppercase">
            BCA • 2023–Present
          </span>
        </div>

        {/* Center Visual: Modern Creative Developer Studio Artwork */}
        <div className="relative my-6 aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#0A0A0A] p-6 flex flex-col justify-between overflow-hidden shadow-inner group">
          {/* Subtle geometric grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
          
          {/* Warm copper radial accent */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#B15F2C]/30 blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-36 h-36 rounded-full bg-[#B15F2C]/20 blur-xl pointer-events-none" />

          {/* Top of visual frame */}
          <div className="relative z-10 flex items-center justify-between text-white/60 text-[10px] font-mono">
            <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10 text-white/90">
              <Terminal className="w-3 h-3 text-[#B15F2C]" />
              <span>aadith.dev</span>
            </span>
            <span className="text-white/40">SYSTEM://ONLINE</span>
          </div>

          {/* Center Monogram / Graphic Motif */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-2">
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#B15F2C] to-[#E28743] flex items-center justify-center shadow-[0_10px_25px_rgba(177,95,44,0.4)] group-hover:scale-105 transition-transform duration-300">
              <span className="font-serif font-black text-3xl text-white tracking-wider">
                ACV
              </span>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#111111] border-2 border-white/20 flex items-center justify-center text-[9px] text-[#B15F2C]">
                ✦
              </div>
            </div>
            <p className="font-serif italic text-lg text-white/90 mt-3 font-light">
              Aadith C V
            </p>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 mt-0.5">
              Independent Developer
            </p>
          </div>

          {/* Bottom Code Line */}
          <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/50 pt-2 border-t border-white/10">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>ready_to_build</span>
            </span>
            <span>v2.4.0</span>
          </div>
        </div>

        {/* Floating Stack Pills */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F1F0EE]/80 border border-[#E6E5E2] hover:border-[#B15F2C]/40 transition-colors">
            <div className="w-7 h-7 rounded-lg bg-[#FFFFFF] flex items-center justify-center shadow-xs text-[#B15F2C]">
              <Smartphone className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#111111]">
                Flutter &amp; Dart
              </span>
              <span className="text-[10px] text-[#8D8D8D] font-mono">
                Mobile Apps
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F1F0EE]/80 border border-[#E6E5E2] hover:border-[#B15F2C]/40 transition-colors">
            <div className="w-7 h-7 rounded-lg bg-[#FFFFFF] flex items-center justify-center shadow-xs text-[#B15F2C]">
              <Code2 className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#111111]">
                Next.js &amp; TS
              </span>
              <span className="text-[10px] text-[#8D8D8D] font-mono">
                Web Platforms
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Tagline Banner */}
        <div className="mt-3.5 p-3 rounded-xl bg-[#111111] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B15F2C]" />
            <span className="text-xs font-medium text-white/90">
              Transforming ideas into products
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#8D8D8D]">
            2026
          </span>
        </div>

      </div>
    </motion.div>
  );
}

