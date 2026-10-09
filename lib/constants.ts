import { AppConfig } from './types';

export const APP_CONFIG: AppConfig = {
  site: {
    name: "Déo-Gratias DAGA — Portfolio",
    description:
      "Portfolio de Déo-Gratias DAGA, Tech Lead & Développeur Full Stack spécialisé Laravel, React et Next.js. Basé au Bénin, disponible pour missions freelance.",
    url: "https://deo-daga.dev",
    author: "Déo-Gratias DAGA",
    email: "dagadeogratias@gmail.com",
    ogImage: "/images/og-image.jpg",
  },
  navigation: [
    { id: "hero",       label: "Accueil",     href: "#hero" },
    { id: "about",      label: "À propos",    href: "#about" },
    { id: "skills",     label: "Compétences", href: "#skills" },
    { id: "projects",   label: "Projets",     href: "#projects" },
    { id: "experience", label: "Expérience",  href: "#experience" },
    { id: "contact",    label: "Contact",     href: "#contact" },
  ],
  seo: {
    keywords: [
      "développeur full stack",
      "Tech Lead",
      "Laravel",
      "React",
      "Next.js",
      "Bénin",
      "freelance",
      "portfolio",
    ],
    ogImage: "/images/og-image.jpg",
  },
};

export const SPRING_EASE = [0.16, 1, 0.3, 1] as const;
