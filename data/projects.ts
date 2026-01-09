import { Project } from '@/lib/types';

export const projects: Project[] = [
  {
    id: "1",
    title: "Application E-commerce",
    description: "Une application e-commerce complète avec panier, paiement et gestion des commandes.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL"],
    image: "/projects/ecommerce.jpg",
    githubUrl: "https://github.com/username/ecommerce-app",
    demoUrl: "https://ecommerce-demo.com",
    featured: true
  },
  {
    id: "2",
    title: "Dashboard Analytics",
    description: "Tableau de bord interactif pour visualiser des données analytiques en temps réel.",
    technologies: ["React", "D3.js", "Node.js", "MongoDB"],
    image: "/projects/dashboard.jpg",
    githubUrl: "https://github.com/username/analytics-dashboard",
    demoUrl: "https://dashboard-demo.com",
    featured: true
  },
  {
    id: "3",
    title: "API REST Blog",
    description: "API REST complète pour un système de blog avec authentification et gestion des articles.",
    technologies: ["NestJS", "PostgreSQL", "JWT", "Swagger"],
    image: "/projects/api.jpg",
    githubUrl: "https://github.com/username/blog-api",
    featured: false
  }
];