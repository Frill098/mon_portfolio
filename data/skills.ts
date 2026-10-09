import { SkillCategory } from '@/lib/types';

export const skillCategories: SkillCategory[] = [
  {
    title: "Gestion de projet",
    skills: [
      { name: "Agile / Scrum",   level: "advanced" },
      { name: "Jira",            level: "advanced" },
      { name: "Trello",          level: "advanced" },
      { name: "Roadmap produit", level: "intermediate" },
    ],
  },
  {
    title: "Back-end",
    skills: [
      { name: "PHP / Laravel", level: "expert" },
      { name: "Node.js",       level: "advanced" },
      { name: "Python",        level: "intermediate" },
      { name: "MySQL",         level: "advanced" },
      { name: "PostgreSQL",    level: "intermediate" },
      { name: "API REST",      level: "expert" },
    ],
  },
  {
    title: "Front-end",
    skills: [
      { name: "JavaScript (ES6+)", level: "expert" },
      { name: "React.js",          level: "expert" },
      { name: "Next.js",           level: "advanced" },
      { name: "TypeScript",        level: "advanced" },
      { name: "Tailwind CSS",      level: "advanced" },
      { name: "React Native",      level: "intermediate" },
    ],
  },
  {
    title: "DevOps & Outils",
    skills: [
      { name: "Git / GitHub",          level: "advanced" },
      { name: "GitHub Actions (CI/CD)", level: "intermediate" },
      { name: "AWS EC2 / S3",          level: "intermediate" },
      { name: "Figma",                  level: "intermediate" },
      { name: "Docker",                 level: "beginner" },
    ],
  },
  {
    title: "Autres",
    skills: [
      { name: "Flutter",    level: "beginner" },
      { name: "Kotlin",     level: "beginner" },
      { name: "WordPress",  level: "intermediate" },
      { name: "C / C++",    level: "beginner" },
    ],
  },
  {
    title: "Réseaux & Sécurité",
    skills: [
      { name: "TCP/IP",                    level: "intermediate" },
      { name: "DNS / DHCP",               level: "intermediate" },
      { name: "Sécurité réseau",           level: "intermediate" },
      { name: "Linux / Windows Server",   level: "intermediate" },
    ],
  },
  {
    title: "Maintenance & Support",
    skills: [
      { name: "Diagnostic matériel/logiciel", level: "intermediate" },
      { name: "Installation OS",              level: "intermediate" },
      { name: "Virtualisation (VirtualBox)",  level: "intermediate" },
      { name: "Photoshop",                    level: "intermediate" },
      { name: "Figma",                        level: "intermediate" },
    ],
  },
];
