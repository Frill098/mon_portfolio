'use client';

import { motion } from 'framer-motion';
import { Experience } from '@/lib/types';
import { sortExperiencesByDate, sortExperiencesByRelevance } from '@/data/experience';

interface ExperienceProps {
  experiences: Experience[];
  orderBy?: 'chronological' | 'relevance';
}

export default function ExperienceSection({ experiences, orderBy = 'chronological' }: ExperienceProps) {
  // Trier les expériences selon l'ordre spécifié (Exigence 5.5)
  const sortedExperiences = orderBy === 'chronological' 
    ? sortExperiencesByDate(experiences)
    : sortExperiencesByRelevance(experiences);

  // Filtrer les expériences pour n'afficher que celles qui ont du contenu (Exigence 5.2, 5.4)
  const validExperiences = sortedExperiences.filter(exp => 
    exp.title && exp.organization && exp.description
  );

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 1, ease: "easeOut" as const }
    }
  };

  // Fonction pour formater les dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  // Fonction pour obtenir l'icône selon le type d'expérience
  const getTypeIcon = (type: Experience['type']) => {
    switch (type) {
      case 'education':
        return '🎓';
      case 'work':
        return '💼';
      case 'internship':
        return '🚀';
      case 'project':
        return '🛠️';
      case 'certification':
        return '📜';
      default:
        return '📋';
    }
  };

  // Fonction pour obtenir le label du type
  const getTypeLabel = (type: Experience['type']) => {
    switch (type) {
      case 'education':
        return 'Formation';
      case 'work':
        return 'Expérience';
      case 'internship':
        return 'Stage';
      case 'project':
        return 'Projet';
      case 'certification':
        return 'Certification';
      default:
        return 'Autre';
    }
  };

  if (validExperiences.length === 0) {
    return null; // N'afficher rien si aucune expérience valide
  }

  return (
    <section id="experience" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          {/* Titre de section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">Expérience & Formation</h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Ligne de timeline */}
            <motion.div
              variants={timelineVariants}
              className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-400 origin-top"
              style={{ transformOrigin: 'top' }}
            />

            {/* Expériences */}
            <div className="space-y-12" data-testid="experience-timeline">
              {validExperiences.map((experience) => (
                <motion.div
                  key={experience.id}
                  variants={itemVariants}
                  className="relative flex items-start space-x-8"
                  data-testid="experience-item"
                >
                  {/* Point de timeline */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-2xl">
                      {getTypeIcon(experience.type)}
                    </div>
                  </div>

                  {/* Contenu de l'expérience */}
                  <div className="flex-1 bg-gray-900 rounded-lg p-6 border border-gray-700 hover:border-blue-400 transition-colors duration-300">
                    {/* En-tête */}
                    <div className="flex flex-wrap items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-100 mb-1" data-testid="experience-title">
                          {experience.title}
                        </h3>
                        <p className="text-blue-400 font-medium mb-1" data-testid="experience-organization">
                          {experience.organization}
                        </p>
                        {experience.location && (
                          <p className="text-gray-400 text-sm" data-testid="experience-location">
                            📍 {experience.location}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-400/10 text-blue-400 border border-blue-400/20">
                          {getTypeLabel(experience.type)}
                        </span>
                        <div className="text-gray-400 text-sm text-right" data-testid="experience-dates">
                          {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Présent'}
                          {experience.current && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-400/10 text-green-400">
                              En cours
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed mb-4" data-testid="experience-description">
                      {experience.description}
                    </p>

                    {/* Compétences */}
                    {experience.skills && experience.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2" data-testid="experience-skills">
                        {experience.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300 border border-gray-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}