"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Smartphone, Globe, Bot, Box } from "lucide-react";

interface ServiceItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

const services: ServiceItem[] = [
  {
    number: "01",
    title: "Mobile Applications",
    subtitle: "Cross-Platform & Native Performance",
    description:
      "Engineered with Flutter & Dart for iOS and Android. High-refresh-rate animations, custom native plugins, offline SQLite/Hive caching, and cloud audio streaming.",
    icon: <Smartphone className="w-6 h-6 text-[#B15F2C]" />,
    tags: ["Flutter", "Dart", "Firebase", "State Management", "Offline Sync"],
  },
  {
    number: "02",
    title: "Web Development",
    subtitle: "Modern, Scalable Web Applications",
    description:
      "Crafting production web applications using Next.js (App Router), React, and TypeScript. Optimized for Lighthouse performance, responsive fluidity, and clean component architecture.",
    icon: <Globe className="w-6 h-6 text-[#B15F2C]" />,
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    number: "03",
    title: "Automation & Bots",
    subtitle: "Autonomous Microservices & Workflows",
    description:
      "High-bandwidth Telegram bots, API scrapers, and asynchronous pipeline bots built in Python and Node.js for content delivery, real-time alerts, and community management.",
    icon: <Bot className="w-6 h-6 text-[#B15F2C]" />,
    tags: ["Python", "Telegram Bot API", "Node.js", "Webhooks", "Pipelines"],
  },
  {
    number: "04",
    title: "Digital Products",
    subtitle: "End-to-End Architectural Solutions",
    description:
      "Complete product lifecycle execution: from user authentication and relational database modeling to QR ticketing systems and retail POS billing software.",
    icon: <Box className="w-6 h-6 text-[#B15F2C]" />,
    tags: ["Supabase", "MongoDB", "REST APIs", "Payment Flows", "System Design"],
  },
];

export default function WhatIBuild() {
  return (
    <section
      id="services"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#FFFFFF] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B15F2C]">
                02 / CAPABILITIES
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight">
              What I build.
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#666666] max-w-md font-light leading-relaxed">
            Delivering full-spectrum software solutions, focusing on speed, elegance, and unyielding reliability.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative bg-[#F1F0EE] hover:bg-[#FFFFFF] p-8 sm:p-10 rounded-2xl border border-[#E6E5E2] hover:border-[#B15F2C]/40 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between"
            >
              {/* Top row: Number and Arrow */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#E6E5E2] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#111111] transition-all duration-300">
                      <span className="group-hover:text-white transition-colors duration-300">
                        {item.icon}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#8D8D8D] uppercase tracking-widest">
                      {item.number}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-[#E6E5E2] flex items-center justify-center text-[#8D8D8D] group-hover:text-white group-hover:bg-[#B15F2C] group-hover:border-[#B15F2C] transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] mb-2 group-hover:text-[#B15F2C] transition-colors">
                  {item.title}
                </h3>
                <h4 className="text-xs uppercase font-mono tracking-wider text-[#8D8D8D] mb-4">
                  {item.subtitle}
                </h4>

                <p className="text-sm sm:text-base text-[#666666] leading-relaxed mb-8 font-light">
                  {item.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E6E5E2]/80">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/80 border border-[#E6E5E2] text-[#555555]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
