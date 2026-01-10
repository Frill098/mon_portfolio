import { Experience } from '@/lib/types';

export const experiences: Experience[] = [
  {
    id: "formation-1",
    title: "Master en Informatique",
    organization: "Université de Technologie",
    location: "Paris, France",
    startDate: "2020-09",
    endDate: "2022-06",
    description: "Spécialisation en développement web et ingénierie logicielle. Projets académiques en React, Node.js et bases de données.",
    type: "education",
    skills: ["JavaScript", "React", "Node.js", "PostgreSQL", "Git"]
  },
  {
    id: "work-1",
    title: "Développeur Full Stack",
    organization: "TechCorp Solutions",
    location: "Lyon, France",
    startDate: "2022-07",
    endDate: "2024-12",
    description: "Développement d'applications web modernes avec React et Next.js. Collaboration en équipe agile et maintenance de systèmes existants.",
    type: "work",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    current: false
  },
  {
    id: "internship-1",
    title: "Stage Développeur Frontend",
    organization: "StartupInnovante",
    location: "Remote",
    startDate: "2021-06",
    endDate: "2021-08",
    description: "Développement d'interfaces utilisateur responsives et intégration d'APIs REST. Première expérience professionnelle en développement web.",
    type: "internship",
    skills: ["HTML", "CSS", "JavaScript", "Vue.js", "REST API"]
  },
  {
    id: "project-1",
    title: "Projet de Fin d'Études",
    organization: "Université de Technologie",
    location: "Paris, France",
    startDate: "2022-01",
    endDate: "2022-06",
    description: "Développement d'une plateforme e-learning avec authentification, gestion de cours et système de notation.",
    type: "project",
    skills: ["React", "Node.js", "Express", "MongoDB", "JWT"]
  },
  {
    id: "certification-1",
    title: "Certification AWS Cloud Practitioner",
    organization: "Amazon Web Services",
    startDate: "2023-03",
    description: "Certification des connaissances fondamentales du cloud computing et des services AWS.",
    type: "certification",
    skills: ["AWS", "Cloud Computing", "DevOps"]
  }
];

// Fonction pour trier les expériences par ordre chronologique (plus récentes en premier)
export function sortExperiencesByDate(experiences: Experience[]): Experience[] {
  return [...experiences].sort((a, b) => {
    // Utiliser la date de fin si disponible, sinon la date de début
    const dateA = new Date(a.endDate || a.startDate);
    const dateB = new Date(b.endDate || b.startDate);
    
    // Trier par ordre décroissant (plus récent en premier)
    return dateB.getTime() - dateA.getTime();
  });
}

// Fonction pour trier les expériences par pertinence (ordre défini manuellement)
export function sortExperiencesByRelevance(experiences: Experience[]): Experience[] {
  const relevanceOrder = ['work', 'project', 'internship', 'education', 'certification'];
  
  return [...experiences].sort((a, b) => {
    const indexA = relevanceOrder.indexOf(a.type);
    const indexB = relevanceOrder.indexOf(b.type);
    
    // Si même type, trier par date
    if (indexA === indexB) {
      const dateA = new Date(a.endDate || a.startDate);
      const dateB = new Date(b.endDate || b.startDate);
      return dateB.getTime() - dateA.getTime();
    }
    
    return indexA - indexB;
  });
}