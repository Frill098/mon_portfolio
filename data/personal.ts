import { PersonalInfo, Statistic, SocialLink } from '@/lib/types';

export const personalInfo: PersonalInfo = {
  fullName: "Votre Nom",
  role: "Développeur Full Stack",
  catchphrase: "Créateur d'expériences web modernes et performantes",
  avatar: "/images/avatar.jpg",
  cvUrl: "/cv/cv.pdf"
};

export const socialLinks: SocialLink[] = [
  {
    platform: "github",
    url: "https://github.com/votre-username"
  },
  {
    platform: "linkedin",
    url: "https://linkedin.com/in/votre-profil"
  },
  {
    platform: "twitter",
    url: "https://twitter.com/votre_handle"
  },
  {
    platform: "discord",
    url: "https://discord.com/users/votre_user_id"
  }
];

export const aboutStats: Statistic[] = [
  {
    label: "Années d'expérience",
    value: "3+"
  },
  {
    label: "Projets réalisés",
    value: "15+"
  },
  {
    label: "Technologies maîtrisées",
    value: "10+"
  }
];

export const biography = [
  "Développeur passionné avec plus de 3 ans d'expérience dans le développement web moderne. Spécialisé dans les technologies JavaScript et les frameworks React/Next.js.",
  "J'aime créer des applications web performantes, accessibles et avec une excellente expérience utilisateur. Mon approche combine créativité et rigueur technique.",
  "Toujours en quête d'apprentissage, je reste à l'affût des dernières tendances et meilleures pratiques du développement web."
];