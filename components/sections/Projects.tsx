"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Project } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { SPRING_EASE } from "@/lib/constants";

interface ProjectsProps {
  projects: Project[];
}

const SPRING = { ease: SPRING_EASE, duration: 0.7 };

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: SPRING },
};

export default function Projects({ projects }: ProjectsProps) {
  const sorted = [...projects]
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 6);

  return (
    <section id="projects" className="py-28 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Header */}
          <motion.div variants={item} className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
              Projets
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Ce que j&apos;ai construit
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl">
              Une sélection de projets récents — du SaaS au marketplace en passant par la gestion académique.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((project) => (
              <motion.div
                key={project.id}
                variants={item}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group flex flex-col rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden hover:border-violet-400/60 dark:hover:border-violet-500/40 transition-colors"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={project.image}
                    alt={`Aperçu du projet ${project.title}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Featured badge — rendered consistently on both server and client */}
                  {project.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="default" className="text-[10px] py-0 px-2">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-2 pt-1">
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Code source de ${project.title}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 h-8 rounded-md text-xs font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-violet-500 hover:text-violet-600 dark:hover:border-violet-400 dark:hover:text-violet-400 transition-colors"
                    >
                      <SocialIcon platform="github" className="w-3.5 h-3.5" />
                      Code
                    </Link>
                    {project.demoUrl && (
                      <Link
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Démo de ${project.title}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 h-8 rounded-md text-xs font-medium bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        Démo
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
