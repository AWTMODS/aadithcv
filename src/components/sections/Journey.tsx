"use client";

import { motion } from "framer-motion";
import { Calendar, GraduationCap, Smartphone, Rocket, Briefcase, Zap } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  role: string;
  description: string;
  icon: React.ReactNode;
  tags?: string[];
}

const milestones: Milestone[] = [
  {
    year: "2022 — 2025",
    title: "Bachelor of Computer Applications (BCA)",
    role: "Computer Science Foundation",
    description:
      "Formally studying algorithms, database management, software engineering patterns, and object-oriented paradigms. Applying concepts directly to production-grade side projects.",
    icon: <GraduationCap className="w-4 h-4 text-[#B15F2C]" />,
    tags: ["Data Structures", "Databases", "Software Engineering"],
  },
  {
    year: "2023",
    title: "Mobile Architecture with Flutter",
    role: "Specialized Mobile Development",
    description:
      "Deep dived into the Flutter ecosystem, Dart internals, reactive state management (Provider/Riverpod), and cross-platform native channel integration.",
    icon: <Smartphone className="w-4 h-4 text-[#B15F2C]" />,
    tags: ["Flutter", "Dart", "Native Channels"],
  },
  {
    year: "2023",
    title: "Launched MUSIFY Music Player",
    role: "Audio Engineering & Flutter App",
    description:
      "Architected a sleek local and streaming audio application with low-latency buffering, background playback service, and custom sound equalization.",
    icon: <Rocket className="w-4 h-4 text-[#B15F2C]" />,
    tags: ["AudioService", "Firebase", "Offline Caching"],
  },
  {
    year: "2024",
    title: "Engineered HYREBIT Creator Platform",
    role: "Full Stack Web Platform",
    description:
      "Engineered a digital platform for visual creatives and commercial clients featuring portfolio showcases, booking pipelines, and responsive React interfaces.",
    icon: <Briefcase className="w-4 h-4 text-[#B15F2C]" />,
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    year: "2024",
    title: "Created ZEACH Digital Retail POS",
    role: "Fintech & Invoicing Engine",
    description:
      "Built a specialized digital billing POS for boutique fashion stores with real-time inventory management, thermal receipt formatting, and Supabase data synchronization.",
    icon: <Zap className="w-4 h-4 text-[#B15F2C]" />,
    tags: ["Next.js", "Supabase", "TypeScript"],
  },
  {
    year: "2025 & Beyond",
    title: "Continuous Building & System Design",
    role: "Independent Software Builder",
    description:
      "Pushing boundaries with Next.js 16, autonomous agents, high-concurrency Telegram microservices, and AI-driven developer utilities.",
    icon: <Calendar className="w-4 h-4 text-[#B15F2C]" />,
    tags: ["Distributed Systems", "AI Tooling", "Cloud Architecture"],
  },
];

export default function Journey() {
  return (
    <section
      id="journey"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#F1F0EE] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B15F2C]">
                05 / EVOLUTION
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight">
              My Journey.
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#666666] max-w-md font-light leading-relaxed">
            The trajectory of turning academic curiosity into a focused obsession with engineering reliable applications.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 md:pl-32">
          {/* Vertical Line */}
          <div className="absolute top-4 bottom-4 left-6 sm:left-10 md:left-32 w-[2px] bg-[#E6E5E2] -translate-x-1/2" />

          {/* Timeline Milestones */}
          <div className="flex flex-col gap-12 sm:gap-16">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="relative flex flex-col md:flex-row md:items-start gap-4 sm:gap-8 group"
              >
                {/* Year Badge (Desktop left of line) */}
                <div className="hidden md:block absolute -left-32 w-28 text-right pr-6 pt-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#8D8D8D] group-hover:text-[#B15F2C] transition-colors font-semibold">
                    {item.year}
                  </span>
                </div>

                {/* Timeline Center Dot */}
                <div className="absolute -left-6 sm:-left-10 md:-left-32 -translate-x-1/2 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#E6E5E2] group-hover:border-[#B15F2C] flex items-center justify-center transition-colors duration-300 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#111111] group-hover:bg-[#B15F2C] transition-colors duration-300" />
                </div>

                {/* Mobile Year Badge */}
                <div className="md:hidden flex items-center gap-2 pl-4">
                  <span className="font-mono text-xs text-[#B15F2C] font-semibold tracking-wider">
                    {item.year}
                  </span>
                </div>

                {/* Milestone Card */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E6E5E2] hover:border-[#B15F2C]/40 transition-all duration-300 shadow-2xs hover:shadow-md flex-1 ml-4 sm:ml-6 md:ml-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#F1F0EE] flex items-center justify-center">
                        {item.icon}
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#111111] group-hover:text-[#B15F2C] transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <span className="text-xs font-mono uppercase tracking-wider text-[#8D8D8D]">
                      {item.role}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-[#666666] font-light leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {item.tags && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[#F1F0EE]">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#F1F0EE] text-[#555555]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
