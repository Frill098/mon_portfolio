'use client';

import { motion } from 'framer-motion';
import { Statistic } from '@/lib/types';

interface AboutProps {
  biography: string[];
  stats: Statistic[];
}

export default function About({ biography, stats }: AboutProps) {
  // Limiter la biographie à 3 paragraphes maximum (Exigence 2.1)
  const limitedBiography = biography.slice(0, 3);

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
    <section id="about" className="py-20 bg-gray-900">
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
            <h2 className="text-4xl font-bold text-gray-100 mb-4">À Propos</h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
          </motion.div>

          {/* Contenu principal en colonnes responsive */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Biographie */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-100 mb-6">Mon Parcours</h3>
              <div className="space-y-4" data-testid="biography-section">
                {limitedBiography.map((paragraph, index) => (
                  <p key={index} className="text-gray-300 leading-relaxed text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Statistiques d'expérience */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-100 mb-6">En Chiffres</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-400 transition-colors duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      {stat.icon && (
                        <div className="text-blue-400 text-2xl">
                          <stat.icon />
                        </div>
                      )}
                      <div>
                        <div className="text-3xl font-bold text-blue-400 mb-1">
                          {stat.value}
                        </div>
                        <div className="text-gray-300 text-sm font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}