import { AppConfig } from './types';

export const APP_CONFIG: AppConfig = {
  site: {
    name: "Portfolio Personnel",
    description: "Portfolio personnel moderne développé avec Next.js et Tailwind CSS",
    url: "https://mon-portfolio.com",
    author: "Votre Nom"
  },
  navigation: [
    { id: "hero", label: "Accueil", href: "#hero" },
    { id: "about", label: "À Propos", href: "#about" },
    { id: "skills", label: "Compétences", href: "#skills" },
    { id: "projects", label: "Projets", href: "#projects" },
    { id: "experience", label: "Expérience", href: "#experience" },
    { id: "contact", label: "Contact", href: "#contact" }
  ],
  social: [],
  seo: {
    keywords: [
      "développeur web",
      "portfolio",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS"
    ],
    ogImage: "/og-image.jpg"
  }
};

export const THEME_CONFIG = {
  defaultTheme: 'dark' as const,
  enableSystemTheme: true,
  storageKey: 'portfolio-theme'
};