import { SkillCategory } from '@/lib/types';

export const skillCategories: SkillCategory[] = [
  {
    title: "Langages",
    skills: [
      { name: "JavaScript", level: "expert" },
      { name: "TypeScript", level: "advanced" },
      { name: "Java", level: "intermediate" },
      { name: "PHP", level: "intermediate" },
      { name: "Python", level: "beginner" }
    ]
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", level: "expert" },
      { name: "Next.js", level: "advanced" },
      { name: "Tailwind CSS", level: "advanced" },
      { name: "HTML5", level: "expert" },
      { name: "CSS3", level: "expert" }
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: "advanced" },
      { name: "NestJS", level: "intermediate" },
      { name: "PostgreSQL", level: "intermediate" },
      { name: "MongoDB", level: "intermediate" },
      { name: "Express.js", level: "advanced" }
    ]
  },
  {
    title: "Outils",
    skills: [
      { name: "Git", level: "advanced" },
      { name: "GitHub", level: "advanced" },
      { name: "Figma", level: "intermediate" },
      { name: "Docker", level: "beginner" },
      { name: "VS Code", level: "expert" }
    ]
  }
];