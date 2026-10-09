import { Experience } from '@/lib/types';

export const experiences: Experience[] = [
  {
    id: "freelance-2025",
    title: "Développeur Full Stack Junior",
    organization: "Freelance / Auto-entrepreneur",
    location: "Bénin",
    startDate: "2025-07",
    endDate: "2025-10",
    description:
      "Développement et déploiement de 2+ applications web pour des entreprises locales : systèmes de réservation, marketplaces de services, sites vitrines. Gestion autonome des besoins clients, délais et livrables.",
    type: "work",
    skills: ["Laravel", "React", "MySQL", "REST API", "Déploiement cloud"],
    current: false,
  },
  {
    id: "licence-memoire",
    title: "Projet de fin de Licence — Plateforme académique",
    organization: "UATM GASA Formation",
    location: "Cotonou, Bénin",
    startDate: "2025-01",
    endDate: "2025-07",
    description:
      "Conception et développement d'une plateforme web de gestion académique et de suivi parental. Fonctionnalités : saisie des notes, calcul des moyennes, bulletins PDF, notifications aux parents, tableau de bord administratif.",
    type: "project",
    skills: ["React", "Laravel", "MySQL", "Tailwind CSS", "Figma"],
    current: false,
  },
  {
    id: "licence-genie-logiciel",
    title: "Licence Professionnelle en Génie Logiciel",
    organization: "UATM GASA Formation",
    location: "Cotonou, Bénin",
    startDate: "2023-10",
    description:
      "Formation en développement web, architecture logicielle, bases de données et gestion de projet Agile.",
    type: "education",
    skills: ["JavaScript", "React", "PHP", "MySQL", "Git"],
    current: true,
  },
  {
    id: "bac-2022",
    title: "Baccalauréat Série D",
    organization: "CSPB DAV-AMEN",
    location: "Bénin",
    startDate: "2021-10",
    endDate: "2022-06",
    description: "Baccalauréat scientifique, série D (Sciences de la vie et de la terre).",
    type: "education",
    skills: [],
    current: false,
  },
];

export function sortExperiencesByDate(exps: Experience[]): Experience[] {
  return [...exps].sort((a, b) => {
    const dateA = new Date(a.endDate || a.startDate);
    const dateB = new Date(b.endDate || b.startDate);
    return dateB.getTime() - dateA.getTime();
  });
}

export function sortExperiencesByRelevance(exps: Experience[]): Experience[] {
  const order = ['work', 'project', 'internship', 'education', 'certification'];
  return [...exps].sort((a, b) => {
    const ia = order.indexOf(a.type);
    const ib = order.indexOf(b.type);
    if (ia === ib) {
      return new Date(b.endDate || b.startDate).getTime() -
             new Date(a.endDate || a.startDate).getTime();
    }
    return ia - ib;
  });
}
