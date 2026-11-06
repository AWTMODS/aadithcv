"use client";

import { motion } from "framer-motion";
import GlassFolder, { FolderFile } from "@/components/ui/glass-folder-cards";
import { Award, ExternalLink, Sparkles } from "lucide-react";

export default function Certificates() {
  const academicFiles: FolderFile[] = [
    {
      name: "BCA Computer Applications",
      meta: "Krupanidhi · 2024–2027",
      art: "glacier",
    },
    {
      name: "Data Structures & Algorithms",
      meta: "Core CS · Certified",
      art: "aurora",
    },
    {
      name: "Database Systems (DBMS)",
      meta: "SQL & RDBMS Schema",
    },
    {
      name: "Object-Oriented Design",
      meta: "Design Patterns",
    },
  ];

  const mobileFiles: FolderFile[] = [
    {
      name: "Flutter & Dart Architecture",
      meta: "Mobile Dev · Android",
      art: "ember",
    },
    {
      name: "Reactive State Management",
      meta: "Riverpod / Bloc",
      art: "verdant",
    },
    {
      name: "Beats Music Player Build",
      meta: "Flutter Production App",
      href: "https://github.com/AWTMODS/Beats-Music",
    },
    {
      name: "Android Studio & Tooling",
      meta: "Gradle & Native NDK",
    },
  ];

  const fullstackFiles: FolderFile[] = [
    {
      name: "Modern Next.js & React 19",
      meta: "Web Engineering",
      art: "dusk",
    },
    {
      name: "TypeScript Professional",
      meta: "Strict Typing & Patterns",
      art: "glacier",
    },
    {
      name: "Telegram Bot Automation",
      meta: "Python & Node APIs",
      art: "ember",
    },
    {
      name: "Supabase & Cloud Services",
      meta: "Auth & Realtime DB",
    },
  ];

  return (
    <section
      id="certificates"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#F8F7F4] relative overflow-hidden border-t border-[#E6E5E2]"
    >
      {/* Background Decorative Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-[#111111] opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.2px, transparent 1.4px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-[#B15F2C]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B15F2C]">
                06 / CREDENTIALS
              </span>
            </div>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight">
              Certificates &amp; Archives.
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#666666] max-w-md font-light leading-relaxed">
            An interactive frosted-glass vault storing verified academic credentials, specialized course milestones, and architectural competencies.
          </p>
        </div>

        {/* Glass Folders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10 justify-items-center items-end pt-6 pb-12">
          {/* Folder 1: Academic & CS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <GlassFolder
              label="Academic & CS"
              meta="BCA 2024–2027"
              art="aurora"
              seed={14}
              action="more"
              files={academicFiles}
              labelPlacement="bottom-left"
              appearDelay={0}
              menu={[
                { label: "View Krupanidhi Portal" },
                { label: "Copy Credential ID" },
              ]}
            />
            <div className="mt-8 text-center">
              <h3 className="font-heading text-lg font-semibold text-[#111111]">
                Academic &amp; CS Foundation
              </h3>
              <p className="text-xs text-[#8D8D8D] font-mono mt-1">
                Krupanidhi Degree College • Bangalore
              </p>
            </div>
          </motion.div>

          {/* Folder 2: Mobile Architecture (Dark Frosted Glass) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-col items-center"
          >
            <GlassFolder
              label="Mobile Dev"
              meta="Flutter & Dart"
              tone="dark"
              art="ember"
              seed={27}
              action="more"
              files={mobileFiles}
              labelPlacement="top-left"
              appearDelay={150}
              menu={[
                { label: "Open Beats Music Repo" },
                { label: "Inspect Flutter Architecture" },
              ]}
            />
            <div className="mt-8 text-center">
              <h3 className="font-heading text-lg font-semibold text-[#111111]">
                Mobile Architecture &amp; Flutter
              </h3>
              <p className="text-xs text-[#8D8D8D] font-mono mt-1">
                Cross-Platform &amp; Audio Engines
              </p>
            </div>
          </motion.div>

          {/* Folder 3: Full-Stack & Automation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <GlassFolder
              label="Web & Systems"
              meta="Full-Stack & APIs"
              art="dusk"
              seed={42}
              action="more"
              files={fullstackFiles}
              labelPlacement="top-right"
              appearDelay={300}
              menu={[
                { label: "Inspect Next.js Stack" },
                { label: "Automation Daemons" },
              ]}
            />
            <div className="mt-8 text-center">
              <h3 className="font-heading text-lg font-semibold text-[#111111]">
                Full-Stack &amp; Automation
              </h3>
              <p className="text-xs text-[#8D8D8D] font-mono mt-1">
                Next.js, TypeScript &amp; Python Bots
              </p>
            </div>
          </motion.div>
        </div>

        {/* Micro-Interaction Hint */}
        <div className="flex items-center justify-center gap-3 pt-4 text-xs font-mono text-[#8D8D8D] uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#B15F2C]" />
          <span>Interactive 3D Glass: Hover to lean · Click folder to open · Select certificate</span>
        </div>
      </div>
    </section>
  );
}

