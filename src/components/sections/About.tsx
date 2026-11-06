"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/animations/TextReveal";
import { Code2, Compass, Layers, Zap } from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: <Code2 className="w-5 h-5 text-[#B15F2C]" />,
      title: "Pragmatic Engineering",
      desc: "Focusing on clean architecture, maintainable state management, and production-tested patterns.",
    },
    {
      icon: <Zap className="w-5 h-5 text-[#B15F2C]" />,
      title: "Performance First",
      desc: "Optimizing frame render times in Flutter and network payloads across server-rendered web apps.",
    },
    {
      icon: <Layers className="w-5 h-5 text-[#B15F2C]" />,
      title: "End-to-End Delivery",
      desc: "Bridging the complete gap from UI micro-interactions to database schemas and automated deployment.",
    },
    {
      icon: <Compass className="w-5 h-5 text-[#B15F2C]" />,
      title: "Community Driven",
      desc: "Building tools, distribution bots, and open ecosystems that serve thousands of daily active users.",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#F1F0EE] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Number + Heading */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-baseline gap-4 mb-4"
            >
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B15F2C]">
                01 / PHILOSOPHY
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-[#111111] leading-[1.05] tracking-tight mb-8"
            >
              A little <br />
              <span className="font-normal text-[#B15F2C]">about me.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-[#E6E5E2] w-full"
            >
              <p className="font-heading italic text-lg text-[#111111] leading-relaxed mb-3">
                &ldquo;Great software feels effortless because every edge case and interaction was obsessively considered.&rdquo;
              </p>
              <span className="text-xs font-mono uppercase tracking-widest text-[#8D8D8D]">
                — Engineering Principle
              </span>
            </motion.div>
          </div>

          {/* Right Column: Editorial narrative with TextReveal */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="text-xl sm:text-2xl lg:text-3xl font-heading font-medium text-[#111111] leading-snug">
              <TextReveal
                text="I am Aadith C V, an independent software developer from Kerala, India. I specialize in building tactile mobile experiences, full-stack web applications, and autonomous digital automation."
                delay={0.1}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-[#555555] leading-relaxed font-light mt-2"
            >
              My journey began with a curiosity about how software shapes daily routines. Currently pursuing my Bachelor of Computer Applications (BCA, 2024–2027) at Krupanidhi Degree College in Bangalore, I actively pair formal computer science principles with high-stakes production projects—architecting local & cloud audio engines in Flutter, high-volume event ticketing gateways, and automated Telegram bot systems.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-[#555555] leading-relaxed font-light"
            >
              Whether crafting fluid user interfaces with React & Next.js, modeling database relations in Supabase & MongoDB, or writing asynchronous Python daemons, I prioritize clarity, zero bloat, and durable engineering.
            </motion.p>

            {/* Core Values Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 mt-4 border-t border-[#E6E5E2]"
            >
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="bg-white/80 p-5 rounded-xl border border-[#E6E5E2] flex flex-col gap-2 hover:border-[#B15F2C]/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {h.icon}
                    <h3 className="font-semibold text-sm text-[#111111]">
                      {h.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
