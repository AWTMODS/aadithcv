export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  tech: string[];
  year: string;
  demoUrl: string | null;
  githubUrl: string | null;
  color: string;
  accent: string;
  featured: boolean;
  role: string;
}

export const projects: Project[] = [
  {
    id: "musify",
    title: "MUSIFY",
    category: "Mobile Application",
    tagline: "High-Fidelity Audio Streaming & Local Player",
    description:
      "A modern, intuitive music player and streaming application built with Flutter. Features low-latency audio buffering, offline playback caching, dynamic audio equalizer, and seamless cloud synchronization with Firebase.",
    tech: ["Flutter", "Dart", "Firebase", "AudioService", "Provider"],
    year: "2023",
    demoUrl: null,
    githubUrl: null,
    color: "#18181B",
    accent: "#B15F2C",
    featured: true,
    role: "Lead Mobile Developer",
  },
  {
    id: "hyrebit",
    title: "HYREBIT",
    category: "Web Platform",
    tagline: "Creative Discovery & Visual Creator Marketplace",
    description:
      "A modern digital platform connecting professional photographers and videographers with commercial clients. Includes verified portfolio showcases, booking pipelines, direct messaging, and an intuitive management dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    year: "2024",
    demoUrl: null,
    githubUrl: null,
    color: "#0F172A",
    accent: "#38BDF8",
    featured: true,
    role: "Full Stack Developer",
  },
  {
    id: "awtmods",
    title: "AWTMODS",
    category: "Platform & Community",
    tagline: "Tech Distribution Hub & Telegram Community",
    description:
      "A curated technology hub and mobile utility platform serving thousands of active users. Integrates real-time Telegram Bot updates, over-the-air binary distribution, and automated crash reporting.",
    tech: ["Flutter", "Firebase", "Telegram Bot API", "Cloud Functions"],
    year: "2023",
    demoUrl: null,
    githubUrl: null,
    color: "#132338",
    accent: "#0284C7",
    featured: false,
    role: "Founder & Developer",
  },
  {
    id: "kruponam",
    title: "K R U P O N A M",
    category: "Event Management",
    tagline: "Fest Ticketing & Gate Verification System",
    description:
      "A high-throughput event ticketing and access control system for large-scale college cultural festivals. Features cryptographic QR badge generation, sub-second gate validation, and real-time organizer analytics.",
    tech: ["React", "Node.js", "Firebase", "ZXing Barcode", "REST API"],
    year: "2024",
    demoUrl: null,
    githubUrl: null,
    color: "#27122E",
    accent: "#A855F7",
    featured: false,
    role: "Backend & Systems Lead",
  },
  {
    id: "telegram-automation",
    title: "TELEGRAM AUTOMATION",
    category: "Cloud & Automation",
    tagline: "Automated Content Pipelines & Microservices",
    description:
      "A suite of autonomous Telegram bots and microservices handling automated file distribution, media compression, channel moderation, and scheduled webhook triggers with zero downtime.",
    tech: ["Python", "Node.js", "Telegram Bot API", "Docker", "AsyncIO"],
    year: "2024",
    demoUrl: null,
    githubUrl: null,
    color: "#1B2421",
    accent: "#10B981",
    featured: false,
    role: "DevOps & Bot Engineer",
  },
];
