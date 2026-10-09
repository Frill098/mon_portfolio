import { Project } from '@/lib/types';

export const projects: Project[] = [
  {
    id: "echobuy",
    title: "Echobuy",
    description:
      "Marketplace de services et produits développée en React + Laravel. Permet la mise en relation acheteurs/vendeurs avec gestion des commandes, paiements et profils.",
    technologies: ["React", "Laravel", "MySQL", "Tailwind CSS", "REST API"],
    image: "/projects/ecommerce.jpg",
    githubUrl: "https://github.com/Frill098/echobuy",
    featured: true,
  },
  {
    id: "geststock",
    title: "GestStock",
    description:
      "Application full stack de gestion de stock en temps réel. Backend NestJS avec API REST, frontend React avec tableau de bord analytique et gestion des entrées/sorties.",
    technologies: ["React", "NestJS", "PostgreSQL", "TypeScript", "JWT"],
    image: "/projects/dashboard.jpg",
    githubUrl: "https://github.com/Frill098/Projet_React-Nest_GestStock",
    featured: true,
  },
  {
    id: "plateforme-academique",
    title: "Plateforme académique",
    description:
      "Projet de mémoire de Licence : plateforme web de gestion académique et de suivi parental. Gestion des notes, bulletins, notifications aux parents et tableau de bord administratif.",
    technologies: ["React", "Laravel", "MySQL", "REST API", "Tailwind CSS"],
    image: "/projects/api.jpg",
    githubUrl: "https://github.com/Frill098",
    featured: false,
  },
];
