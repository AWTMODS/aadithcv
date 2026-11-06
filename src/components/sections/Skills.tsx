"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Cpu, Wrench, Layers, Database } from "lucide-react";
import { skillCategories } from "@/data/skills";

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "programming":
        return <Cpu className="w-4 h-4" />;
      case "frameworks":
        return <Layers className="w-4 h-4" />;
      case "backend-data":
        return <Database className="w-4 h-4" />;
      case "tools":
        return <Wrench className="w-4 h-4" />;
      default:
        return <Cpu className="w-4 h-4" />;
    }
  };

  const displayedCategories =
    activeTab === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeTab);

  return (
    <section
      id="skills"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#FFFFFF] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B15F2C]">
                04 / EXPERTISE
              </span>
            </div>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight">
              Tools I work with.
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#666666] max-w-md font-light leading-relaxed">
            Technologies, frameworks, and workflows leveraged to engineer durable, highly responsive digital systems.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-12">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2 rounded-full text-xs font-heading font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeTab === "all"
                ? "bg-[#111111] text-white shadow-sm"
                : "bg-[#F1F0EE] hover:bg-[#E6E5E2] text-[#555555]"
            }`}
          >
            All Disciplines
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-heading font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === cat.id
                  ? "bg-[#111111] text-white shadow-sm"
                  : "bg-[#F1F0EE] hover:bg-[#E6E5E2] text-[#555555]"
              }`}
            >
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Categories Stack */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-12"
          >
            {displayedCategories.map((category) => (
              <div
                key={category.id}
                className="bg-[#F1F0EE] p-8 sm:p-10 rounded-3xl border border-[#E6E5E2]"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E6E5E2]">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-white border border-[#E6E5E2] flex items-center justify-center text-[#B15F2C]">
                      {getCategoryIcon(category.id)}
                    </span>
                    <h3 className="font-heading font-semibold text-2xl text-[#111111]">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#777777] max-w-sm font-light">
                    {category.description}
                  </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                  {category.skills.map((skill, sIdx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: sIdx * 0.04 }}
                      whileHover={{ y: -3 }}
                      className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E6E5E2] hover:border-[#B15F2C]/40 transition-all flex flex-col justify-between group shadow-2xs hover:shadow-md"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#8D8D8D]">
                          {skill.level}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B15F2C]/60 group-hover:text-[#B15F2C] transition-colors" />
                      </div>
                      <span className="text-sm font-medium text-[#111111] group-hover:text-[#B15F2C] transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
