"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import LiquidText from "@/components/ui/liquid-text";
import MagneticButton from "@/components/animations/MagneticButton";
import HeroVisual from "@/components/ui/HeroVisual";

export default function Hero() {
  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 sm:pt-32 pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#FFFFFF]">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 right-5 w-96 h-96 rounded-full bg-radial from-[#B15F2C]/[0.07] to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-radial from-[#F1F0EE] to-transparent blur-2xl pointer-events-none" />

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F0EE] border border-[#E6E5E2] mb-6 sm:mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B15F2C]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#555555]">
                INDEPENDENT DEVELOPER &amp; BUILDER
              </span>
            </motion.div>

            {/* Hero Headings */}
            <div className="flex flex-col w-full">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif font-normal text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.2rem] leading-[0.95] tracking-tight text-[#111111]"
              >
                <span>Building ideas.</span>
                <br />
                <span className="italic font-light text-[#B15F2C]">
                  Into digital reality.
                </span>
              </motion.h1>

              {/* Liquid Typography Canvas */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.35 }}
                className="w-full max-w-2xl -mt-2 sm:-mt-4 mb-4 sm:mb-6"
              >
                <LiquidText text="Aadith." autoplay={true} tone="dark" />
              </motion.div>
            </div>

            {/* Subtitle Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-base sm:text-lg md:text-xl text-[#666666] max-w-xl font-light leading-relaxed mb-8 sm:mb-10"
            >
              Architecting high-performance mobile applications with Flutter and full-stack web platforms with Next.js &amp; TypeScript. Focusing on tactile user interfaces, resilient systems, and meaningful digital tools.
            </motion.p>

            {/* CTA Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <MagneticButton strength={0.25}>
                <button
                  onClick={scrollToProjects}
                  className="group relative inline-flex items-center gap-3 bg-[#111111] hover:bg-[#B15F2C] text-white px-7 py-4 rounded-full font-medium text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>Explore My Work</span>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-y-0.5 transition-transform duration-200">
                    <ArrowDown className="w-3.5 h-3.5 text-white" />
                  </span>
                </button>
              </MagneticButton>

              <MagneticButton strength={0.25}>
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 border border-[#CCCCCC] hover:border-[#111111] bg-transparent text-[#111111] px-7 py-4 rounded-full font-medium text-sm tracking-wide transition-all duration-300 hover:bg-[#F1F0EE] cursor-pointer"
                >
                  <span>Let&apos;s Connect</span>
                  <ArrowUpRight className="w-4 h-4 text-[#8D8D8D]" />
                </button>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Artwork filling the white space */}
          <div className="lg:col-span-5 w-full flex items-center justify-center lg:justify-end pt-6 lg:pt-0">
            <HeroVisual />
          </div>

        </div>
      </div>

      {/* Bottom status and scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pt-12 border-t border-[#E6E5E2]/80 mt-12 text-xs text-[#8D8D8D] font-mono"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B15F2C]" />
          <span>BASED IN KERALA, INDIA</span>
        </div>

        <button
          onClick={scrollToProjects}
          className="flex items-center gap-2 hover:text-[#111111] transition-colors cursor-pointer group"
        >
          <span className="uppercase tracking-widest hidden sm:inline">
            Scroll to explore
          </span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#B15F2C]" />
        </button>
      </motion.div>
    </section>
  );
}
