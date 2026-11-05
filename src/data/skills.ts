export interface SkillItem {
  name: string;
  level?: string;
  icon?: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming Languages",
    description: "Core languages used across native mobile, backend services, and web applications.",
    skills: [
      { name: "Dart", level: "Advanced", featured: true },
      { name: "TypeScript", level: "Advanced", featured: true },
      { name: "JavaScript (ES6+)", level: "Advanced", featured: true },
      { name: "Python", level: "Intermediate", featured: true },
      { name: "HTML5 / CSS3", level: "Advanced", featured: false },
      { name: "SQL", level: "Intermediate", featured: false },
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks & Libraries",
    description: "Battle-tested toolkits for architecting responsive web and cross-platform apps.",
    skills: [
      { name: "Flutter", level: "Advanced", featured: true },
      { name: "Next.js (App Router)", level: "Advanced", featured: true },
      { name: "React", level: "Advanced", featured: true },
      { name: "Node.js & Express", level: "Advanced", featured: true },
      { name: "Tailwind CSS", level: "Expert", featured: true },
      { name: "Framer Motion", level: "Intermediate", featured: false },
    ],
  },
  {
    id: "backend-data",
    title: "Backend & Database",
    description: "Cloud backends, document & relational databases, real-time sync, and API design.",
    skills: [
      { name: "Firebase (Auth, Firestore)", level: "Advanced", featured: true },
      { name: "Supabase", level: "Intermediate", featured: true },
      { name: "MongoDB", level: "Intermediate", featured: true },
      { name: "PostgreSQL", level: "Intermediate", featured: false },
      { name: "REST APIs & Webhooks", level: "Advanced", featured: true },
      { name: "Telegram Bot API", level: "Advanced", featured: true },
    ],
  },
  {
    id: "tools",
    title: "Tools & Ecosystem",
    description: "Developer tooling, version control, build workflows, and design software.",
    skills: [
      { name: "Git & GitHub", level: "Advanced", featured: true },
      { name: "Android Studio", level: "Intermediate", featured: true },
      { name: "VS Code", level: "Advanced", featured: true },
      { name: "Figma", level: "Intermediate", featured: true },
      { name: "Postman", level: "Intermediate", featured: false },
      { name: "Vercel / Cloud Deploy", level: "Intermediate", featured: false },
    ],
  },
];
