'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PersonalInfo, SocialLink } from '@/lib/types';

interface HeroProps {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
}

export default function Hero({ personalInfo, socialLinks }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  // Icônes simplifiées pour les réseaux sociaux
  const getSocialIcon = (platform: string) => {
    const iconClass = "w-6 h-6";
    switch (platform.toLowerCase()) {
      case 'github':
        return <div className={`${iconClass} bg-gray-700 rounded-full`} data-testid={`${platform}-icon`}></div>;
      case 'linkedin':
        return <div className={`${iconClass} bg-blue-600 rounded-full`} data-testid={`${platform}-icon`}></div>;
      case 'twitter':
        return <div className={`${iconClass} bg-blue-400 rounded-full`} data-testid={`${platform}-icon`}></div>;
      case 'discord':
        return <div className={`${iconClass} bg-indigo-500 rounded-full`} data-testid={`${platform}-icon`}></div>;
      default:
        return <div className={`${iconClass} bg-gray-500 rounded-full`} data-testid={`${platform}-icon`}></div>;
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Avatar */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <Image
                src={personalInfo.avatar}
                alt={`Photo de profil de ${personalInfo.fullName}`}
                fill
                className="rounded-full object-cover border-4 border-blue-400"
                priority
                data-testid="hero-avatar"
              />
            </div>
          </motion.div>

          {/* Nom et rôle */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 
              className="text-5xl md:text-6xl font-bold text-gray-100 mb-4"
              data-testid="hero-name"
            >
              {personalInfo.fullName}
            </h1>
            <h2 
              className="text-2xl md:text-3xl text-blue-400 font-medium mb-6"
              data-testid="hero-role"
            >
              {personalInfo.role}
            </h2>
          </motion.div>

          {/* Slogan */}
          <motion.div variants={itemVariants} className="mb-12">
            <p 
              className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
              data-testid="hero-catchphrase"
            >
              {personalInfo.catchphrase}
            </p>
          </motion.div>

          {/* Boutons d'action */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={personalInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cv-download-button"
                className="inline-flex items-center justify-center h-10 rounded-md px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Télécharger CV
              </Link>
              
              <Link
                href="#contact"
                data-testid="contact-button"
                className="inline-flex items-center justify-center h-10 rounded-md px-8 border border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 font-medium transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Me Contacter
              </Link>
            </div>
          </motion.div>

          {/* Liens réseaux sociaux */}
          <motion.div variants={itemVariants}>
            <div className="flex justify-center space-x-6" data-testid="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  variants={socialVariants}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                  aria-label={`Suivre sur ${social.platform}`}
                  data-testid={`social-link-${social.platform}`}
                >
                  {getSocialIcon(social.platform)}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Indicateur de scroll */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-gray-400"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}