"use client";

import { useState, useEffect } from "react";
import { ArrowUp, ArrowUpRight, Mail, Coffee } from "lucide-react";
import { socialLinks } from "@/data/social";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  TelegramIcon,
} from "@/components/ui/icons";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Journey", href: "#journey" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "Github":
        return <GithubIcon className="w-4 h-4" />;
      case "Linkedin":
        return <LinkedinIcon className="w-4 h-4" />;
      case "Send":
        return <TelegramIcon className="w-4 h-4" />;
      case "Instagram":
        return <InstagramIcon className="w-4 h-4" />;
      case "Mail":
        return <Mail className="w-4 h-4" />;
      case "Coffee":
        return <Coffee className="w-4 h-4 text-[#FFDD00]" />;
      default:
        return <ArrowUpRight className="w-4 h-4" />;
    }
  };

  return (
    <footer className="relative bg-[#0A0A0A] text-white overflow-hidden pt-20 pb-12 border-t border-[#1C1C1C]">
      {/* Giant Watermark Background Text */}
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-display text-[18vw] font-bold text-white/[0.03] select-none pointer-events-none whitespace-nowrap tracking-tighter"
        aria-hidden="true"
      >
        AADITH C V
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#222222]">
          {/* Brand info */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#B15F2C] text-white flex items-center justify-center font-heading text-sm font-semibold">
                A
              </span>
              <span className="font-heading text-2xl font-bold tracking-wide">
                AADITH C V
              </span>
            </div>
            <p className="text-[#8D8D8D] text-sm max-w-sm leading-relaxed mt-1">
              Independent developer dedicated to turning ambitious ideas into resilient mobile applications, modern web platforms, and automated software.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs text-[#8D8D8D]">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Available for worldwide remote collaboration & freelance projects
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8D8D8D] font-mono mb-2">
              Index
            </span>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-[#CCCCCC] hover:text-[#B15F2C] transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#B15F2C] text-xs">
                      →
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/donate"
                  className="text-sm text-[#B15F2C] hover:text-[#E28743] font-medium transition-colors duration-200 inline-flex items-center gap-1.5"
                >
                  <span>☕</span>
                  <span>Buy Me a Coffee (UPI)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Channels */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8D8D8D] font-mono mb-2">
              Connect
            </span>
            <ul className="flex flex-col gap-2.5">
              {socialLinks.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-sm text-[#CCCCCC] hover:text-[#B15F2C] transition-colors duration-200 py-1 border-b border-[#1A1A1A] group"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[#8D8D8D] group-hover:text-[#B15F2C] transition-colors">
                        {getSocialIcon(s.icon)}
                      </span>
                      <span>{s.platform}</span>
                    </span>
                    <span className="text-xs text-[#666666] group-hover:text-[#8D8D8D] font-mono">
                      {s.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#777777]">
          <p>© {currentYear} Aadith C V. Built with precision, care, and code.</p>

          <div className="flex items-center gap-6">
            <span className="text-[#555555]">Kerala, India</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#222222] hover:border-[#B15F2C] text-[#AAAAAA] hover:text-white transition-all duration-200 cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#B15F2C]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
