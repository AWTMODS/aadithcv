"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();

    const timer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      start = Math.round(eased * 100);
      setCount(start);

      if (progress >= 1) {
        clearInterval(timer);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 850);
        }, 200);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="page-loader"
        initial={{ y: 0 }}
        animate={isExiting ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center select-none cursor-wait overflow-hidden"
      >
        {/* Subtle background grain / radial lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(177,95,44,0.06)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          {/* Logo / Monogram */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-white text-2xl md:text-3xl font-serif tracking-[0.25em] font-normal">
              AADITH C V
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#8D8D8D] text-xs md:text-sm tracking-[0.3em] uppercase"
          >
            Building something meaningful.
          </motion.p>
        </div>

        {/* Counter bottom-left */}
        <div className="absolute bottom-10 left-8 md:bottom-12 md:left-12 z-10 flex items-baseline gap-2">
          <span className="text-white font-mono text-2xl md:text-3xl font-light tabular-nums">
            {String(count).padStart(3, "0")}
          </span>
          <span className="text-[#8D8D8D] font-mono text-xs">%</span>
        </div>

        {/* Bottom right status indicator */}
        <div className="absolute bottom-10 right-8 md:bottom-12 md:right-12 z-10 hidden sm:flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B15F2C] animate-pulse" />
          <span className="text-[#8D8D8D] text-xs tracking-widest uppercase">
            Initializing Portfolio
          </span>
        </div>

        {/* Full-width bottom progress line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#222222]">
          <motion.div
            className="h-full bg-[#B15F2C]"
            style={{ width: `${count}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
