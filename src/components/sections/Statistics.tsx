"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    value: 6,
    suffix: "+",
    label: "Projects Built",
    description: "Production web applications, mobile tools, and community services.",
  },
  {
    value: 15,
    suffix: "+",
    label: "Technologies Mastered",
    description: "Across frontend, cross-platform mobile, databases, and microservices.",
  },
  {
    value: 4,
    suffix: "",
    label: "Full Applications",
    description: "Deployed end-to-end with authentication, state, and database storage.",
  },
  {
    value: 3,
    suffix: "+",
    label: "Years of Crafting",
    description: "Continuous daily code commits, architectural iterations, and learning.",
  },
];

function CounterNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1600; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Background glow subtle effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-radial from-[#B15F2C]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B15F2C]">
                06 / METRICS
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              By the numbers.
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#8D8D8D] max-w-md font-light leading-relaxed">
            Tangible milestones and measurable output from thousands of hours spent building and optimizing code.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-[#141414] hover:bg-[#181818] p-8 rounded-2xl border border-[#222222] hover:border-[#B15F2C]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-white mb-4 text-[#B15F2C]">
                  <CounterNumber target={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="font-serif text-xl text-white mb-2">
                  {stat.label}
                </h3>
              </div>

              <p className="text-xs text-[#8D8D8D] leading-relaxed pt-6 border-t border-[#222222]/80 mt-4">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
