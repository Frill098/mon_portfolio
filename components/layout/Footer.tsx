'use client';

import { APP_CONFIG } from '@/lib/constants';
import { contactMethods } from '@/data/contact';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Filtrer les liens de réseaux sociaux principaux pour le footer
  const socialLinks = contactMethods.filter(method => 
    ['linkedin', 'twitter', 'discord'].includes(method.type)
  );

  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Section Copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-2">
              {APP_CONFIG.site.author}
            </h3>
            <p className="text-gray-400 text-sm">
              © {currentYear} {APP_CONFIG.site.author}. Tous droits réservés.
            </p>
          </div>

          {/* Section Stack Technique */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">
              Stack Technique
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-200">
                Next.js 15
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-900 text-cyan-200">
                Tailwind CSS
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-200">
                TypeScript
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900 text-purple-200">
                Framer Motion
              </span>
            </div>
          </div>

          {/* Section Liens Sociaux */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-white mb-2">
              Suivez-moi
            </h3>
            <div className="flex justify-center md:justify-end space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.type}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={`Suivre sur ${social.type}`}
                >
                  {/* Icône temporaire - sera remplacée par les vraies icônes */}
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {social.type.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Connectons-nous !
            </p>
          </div>
        </div>

        {/* Ligne de séparation et message final */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-center text-gray-400 text-sm">
            Développé avec ❤️ en utilisant les dernières technologies web
          </p>
        </div>
      </div>
    </footer>
  );
}