"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Journey", href: "#journey" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["about", "services", "projects", "skills", "journey", "certificates", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 sm:px-10 lg:px-16 py-4 md:py-6",
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-[#E6E5E2]/80 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.03)] py-3 md:py-4"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="group flex items-center gap-2.5 text-inherit transition-transform duration-200"
          >
            <span className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center font-serif text-sm font-semibold tracking-wider group-hover:bg-[#B15F2C] transition-colors duration-300">
              A
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-wider font-semibold text-[#111111] leading-tight">
                AADITH C V
              </span>
              <span className="text-[10px] tracking-widest text-[#8D8D8D] uppercase font-mono">
                Developer & Builder
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 bg-[#F1F0EE]/80 px-6 py-2.5 rounded-full border border-[#E6E5E2] backdrop-blur-sm shadow-xs">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className={cn(
                    "relative text-xs tracking-wider uppercase font-medium transition-colors duration-200 py-1 cursor-pointer",
                    isActive
                      ? "text-[#B15F2C] font-semibold"
                      : "text-[#555555] hover:text-[#111111]"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B15F2C] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Status Indicator & CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="/donate"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111111] hover:bg-[#B15F2C] text-white text-xs font-mono uppercase tracking-wider transition-colors shadow-2xs"
            >
              <span className="text-sm">☕</span>
              <span className="hidden sm:inline">Buy Me a Coffee</span>
              <span className="sm:hidden">Donate</span>
            </a>

            <div className="hidden lg:flex items-center gap-2 bg-[#F1F0EE] border border-[#E6E5E2] px-3.5 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-medium tracking-wide text-[#333333]">
                Available for Projects
              </span>
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#contact");
              }}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#111111] hover:bg-[#B15F2C] text-white text-xs uppercase tracking-wider font-medium px-4 py-2.5 rounded-full transition-colors duration-200"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden relative w-10 h-10 rounded-full bg-[#F1F0EE] border border-[#E6E5E2] flex flex-col items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
            >
              <span
                className={cn(
                  "w-4 h-[1.5px] bg-[#111111] transition-all duration-300",
                  mobileOpen && "rotate-45 translate-y-[4.5px]"
                )}
              />
              <span
                className={cn(
                  "w-4 h-[1.5px] bg-[#111111] transition-all duration-300",
                  mobileOpen && "-rotate-45 -translate-y-[3px]"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] text-white flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#8D8D8D]">
                Navigation
              </span>
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map((link, idx) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                    onClick={() => handleLinkClick(link.href)}
                    className="flex items-center justify-between text-2xl font-serif text-left py-2 border-b border-[#222222] hover:text-[#B15F2C] transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-5 h-5 text-[#8D8D8D]" />
                  </motion.button>
                ))}

                <motion.a
                  href="/donate"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  className="flex items-center justify-between text-xl font-serif text-left py-3 px-4 rounded-xl bg-[#1A1A1A] text-[#B15F2C] border border-[#2A2A2A] hover:border-[#B15F2C]"
                >
                  <span className="flex items-center gap-2">
                    <span>☕</span>
                    <span>Buy Me a Coffee (UPI)</span>
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-[#B15F2C]" />
                </motion.a>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6 border-t border-[#222222]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs text-[#8D8D8D]">
                  Currently accepting freelance & collaborative projects
                </span>
              </div>
              <p className="text-xs text-[#555555]">
                Kerala, India • UTC+05:30
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
