import { PersonalInfo, SocialLink, Statistic } from '@/lib/types';

export const personalInfo: PersonalInfo = {
  fullName: "Déo-Gratias DAGA",
  role: "Tech Lead · Développeur Full Stack",
  catchphrase: "Je conçois, je pilote, je livre — de l'idée au produit en production.",
  avatar: "/images/Avatar.png",
  cvUrl: "/cv/CV_Deo-Gratias_DAGA_Dev.pdf",
};

export const socialLinks: SocialLink[] = [
  { platform: "github",   url: "https://github.com/Frill098" },
  { platform: "linkedin", url: "https://www.linkedin.com/in/d%C3%A9o-daga-837266378/" },
  { platform: "discord",  url: "https://discord.com/users/kiritox_05" },
];

export const biography = [
  "Tech Lead orienté résultats, avec de l'expérience dans la conception, le pilotage et la livraison d'applications SaaS et web. Je fais le lien entre les besoins métier et l'exécution technique.",
  "Maîtrise des méthodologies Agile/Scrum, de Laravel, React et du déploiement cloud. Passionné par l'architecture propre, les livraisons dans les délais et l'amélioration continue.",
  "Basé à Abomey-Calavi, Bénin · Disponible pour des missions freelance et des collaborations à distance.",
];

export const aboutStats: Statistic[] = [
  { label: "Applications livrées",    value: "5+" },
  { label: "Technologies maîtrisées", value: "15+" },
  { label: "Années d'expérience",     value: "2+" },
];
