'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { SkillCategory } from '@/lib/types';

interface SkillsProps {
  skillCategories: SkillCategory[];
}

export default function Skills({ skillCategories }: SkillsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const skillsGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" as const }
    }
  };

  // Filtrer les catégories non vides (Exigence 3.1, 3.2, 3.3, 3.4, 3.5)
  const nonEmptyCategories = skillCategories.filter(category => 
    category.skills && category.skills.length > 0 && category.title.trim().length > 0
  );

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'expert':
        return 'bg-green-500 text-white border-green-500';
      case 'advanced':
        return 'bg-blue-500 text-white border-blue-500';
      case 'intermediate':
        return 'bg-yellow-500 text-white border-yellow-500';
      case 'beginner':
        return 'bg-gray-500 text-white border-gray-500';
      default:
        return 'bg-gray-700 text-gray-100 border-gray-600';
    }
  };

  return (
    <section id="skills" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Titre de section */}
          <motion.div variants={categoryVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">Compétences</h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
          </motion.div>

          {/* Grille des catégories de compétences */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {nonEmptyCategories.map((category, categoryIndex) => (
              <motion.div
                key={`${category.title}-${categoryIndex}`}
                variants={categoryVariants}
                className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-blue-400 transition-colors duration-300"
                data-testid={`skill-category-${category.title.toLowerCase()}-${categoryIndex}`}
              >
                {/* Titre de catégorie */}
                <h3 className="text-xl font-semibold text-gray-100 mb-4 text-center">
                  {category.title}
                </h3>

                {/* Grille des compétences */}
                <motion.div
                  variants={skillsGridVariants}
                  className="flex flex-wrap gap-2 justify-center"
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={`${skill.name}-${skillIndex}`}
                      variants={skillVariants}
                      whileHover={{ scale: 1.05 }}
                      className="inline-block"
                    >
                      <Badge
                        variant="outline"
                        className={`${getLevelColor(skill.level)} hover:scale-105 transition-transform duration-200 cursor-default`}
                        data-testid={`skill-badge-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      >
                        {skill.icon && (
                          <span className="mr-2 text-sm">{skill.icon}</span>
                        )}
                        {skill.name}
                        {skill.level && (
                          <span className="ml-2 text-xs opacity-75">
                            ({skill.level})
                          </span>
                        )}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}