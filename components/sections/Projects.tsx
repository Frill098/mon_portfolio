'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  // Implémenter la limitation à 3-6 projets et l'ordre par projets featured (Exigences 4.1, 4.6)
  const sortedProjects = [...projects]
    .sort((a, b) => {
      // Featured projects first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    })
    .slice(0, Math.min(6, Math.max(3, projects.length))); // 3-6 projects maximum

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Titre de section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">Projets</h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
            <p className="text-gray-300 mt-6 text-lg max-w-2xl mx-auto">
              Découvrez une sélection de mes projets les plus récents et significatifs
            </p>
          </motion.div>

          {/* Grille de projets */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {sortedProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                data-testid="project-card"
                className="group"
              >
                <Card className="h-full bg-gray-900 border-gray-700 hover:border-blue-400 transition-all duration-300 overflow-hidden">
                  {/* Image du projet avec lazy loading */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`Aperçu du projet ${project.title}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-testid="project-image"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-blue-500 text-white">
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {/* Titre du projet */}
                    <h3 
                      className="text-xl font-semibold text-gray-100 mb-3 group-hover:text-blue-400 transition-colors"
                      data-testid="project-title"
                    >
                      {project.title}
                    </h3>

                    {/* Description du projet */}
                    <p 
                      className="text-gray-300 mb-4 leading-relaxed"
                      data-testid="project-description"
                    >
                      {project.description}
                    </p>

                    {/* Technologies utilisées */}
                    <div className="mb-6" data-testid="project-technologies">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400"
                            data-testid="tech-badge"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Liens d'action */}
                    <div className="flex gap-3">
                      {/* Lien GitHub (obligatoire) */}
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="github-link"
                        className="flex-1 inline-flex items-center justify-center h-8 rounded-md px-3 text-xs border border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 font-medium transition-colors duration-300"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Code
                      </Link>

                      {/* Lien démo (optionnel) */}
                      {project.demoUrl && (
                        <Link
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid="demo-link"
                          className="flex-1 inline-flex items-center justify-center h-8 rounded-md px-3 text-xs bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors duration-300"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          Démo
                        </Link>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Message si aucun projet */}
          {sortedProjects.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <p className="text-gray-400 text-lg">
                Aucun projet à afficher pour le moment.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}