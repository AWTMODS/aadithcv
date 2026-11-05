"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FolderGit2, Sparkles, Terminal } from "lucide-react";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#F1F0EE] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B15F2C]">
                03 / SELECTED WORKS
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight">
              Things I&apos;ve built.
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#666666] max-w-md font-light leading-relaxed">
            A curated collection of mobile applications, production web platforms, and community utilities engineered with focus and speed.
          </p>
        </div>

        {/* Project Cards - Alternating Layout */}
        <div className="flex flex-col gap-12 lg:gap-16">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="group relative bg-[#FFFFFF] rounded-3xl border border-[#E6E5E2] overflow-hidden p-6 sm:p-10 lg:p-12 hover:border-[#B15F2C]/40 transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isEven ? "" : "lg:grid-flow-dense"
                  }`}
                >
                  {/* Visual Preview / Artwork side */}
                  <div
                    className={`lg:col-span-5 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div
                      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden p-8 flex flex-col justify-between transition-transform duration-500 group-hover:scale-[1.02]"
                      style={{
                        backgroundColor: project.color,
                        boxShadow: "inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {/* Background ambient glow */}
                      <div
                        className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at 75% 25%, ${project.accent}, transparent 60%)`,
                        }}
                      />

                      {/* Top metadata badge */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-white/70 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                          {project.year}
                        </span>
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: project.accent }}
                        />
                      </div>

                      {/* Center Monogram / Typographic Art */}
                      <div className="relative z-10 my-auto text-center">
                        <span className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wider text-white/90 drop-shadow-md">
                          {project.title.slice(0, 2)}
                        </span>
                        <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-white/60 mt-1">
                          {project.category}
                        </p>
                      </div>

                      {/* Bottom status */}
                      <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10 text-white/60 text-xs font-mono">
                        <span className="flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-white/80" />
                          <span>{project.role}</span>
                        </span>
                        <span className="text-[11px] text-white/80">PROD-READY</span>
                      </div>
                    </div>
                  </div>

                  {/* Content / Narrative side */}
                  <div
                    className={`lg:col-span-7 flex flex-col justify-center ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    {/* Category & Index */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#B15F2C]" />
                        <span className="font-mono text-xs uppercase tracking-widest text-[#B15F2C]">
                          {project.category}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[#8D8D8D]">
                        0{index + 1} / 06
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#111111] mb-2 group-hover:text-[#B15F2C] transition-colors duration-200">
                      {project.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-sm font-medium text-[#555555] mb-4">
                      {project.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-base text-[#666666] leading-relaxed mb-6 font-light">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono px-3 py-1 rounded-md bg-[#F1F0EE] border border-[#E6E5E2] text-[#444444]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-2">
                      <button
                        onClick={() => {
                          const contactEl = document.getElementById("contact");
                          if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#B15F2C] text-white px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-colors duration-200 cursor-pointer"
                      >
                        <span>Project Overview</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <span className="inline-flex items-center gap-1.5 text-xs text-[#8D8D8D] font-mono">
                        <Sparkles className="w-3 h-3 text-[#B15F2C]" />
                        <span>Private Repository / Internal IP</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
