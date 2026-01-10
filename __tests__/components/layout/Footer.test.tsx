import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/layout/Footer';
import { APP_CONFIG } from '@/lib/constants';

describe('Footer Component - Unit Tests', () => {
  beforeEach(() => {
    // Mock current year to ensure consistent testing
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Copyright Information (Requirement 9.1)', () => {
    test('should display copyright information with current year and developer name', () => {
      render(<Footer />);
      
      // Vérifier la présence du nom du développeur
      expect(screen.getByText(APP_CONFIG.site.author)).toBeInTheDocument();
      
      // Vérifier la présence du copyright avec l'année courante
      const currentYear = new Date().getFullYear();
      const copyrightText = `© ${currentYear} ${APP_CONFIG.site.author}. Tous droits réservés.`;
      expect(screen.getByText(copyrightText)).toBeInTheDocument();
    });

    test('should display developer name as heading', () => {
      render(<Footer />);
      
      const developerHeading = screen.getByRole('heading', { 
        name: APP_CONFIG.site.author,
        level: 3 
      });
      expect(developerHeading).toBeInTheDocument();
    });
  });

  describe('Technology Stack Information (Requirement 9.2)', () => {
    test('should display technology stack section with heading', () => {
      render(<Footer />);
      
      const stackHeading = screen.getByRole('heading', { 
        name: 'Stack Technique',
        level: 3 
      });
      expect(stackHeading).toBeInTheDocument();
    });

    test('should display all technology badges', () => {
      render(<Footer />);
      
      // Vérifier la présence des technologies principales
      expect(screen.getByText('Next.js 15')).toBeInTheDocument();
      expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Framer Motion')).toBeInTheDocument();
    });

    test('should style technology badges with appropriate colors', () => {
      const { container } = render(<Footer />);
      
      // Vérifier que les badges ont les bonnes classes de couleur
      const nextjsBadge = screen.getByText('Next.js 15');
      expect(nextjsBadge).toHaveClass('bg-blue-900', 'text-blue-200');
      
      const tailwindBadge = screen.getByText('Tailwind CSS');
      expect(tailwindBadge).toHaveClass('bg-cyan-900', 'text-cyan-200');
      
      const typescriptBadge = screen.getByText('TypeScript');
      expect(typescriptBadge).toHaveClass('bg-blue-900', 'text-blue-200');
      
      const framerBadge = screen.getByText('Framer Motion');
      expect(framerBadge).toHaveClass('bg-purple-900', 'text-purple-200');
    });
  });

  describe('Social Media Links (Requirement 9.3)', () => {
    test('should display social media section with heading', () => {
      render(<Footer />);
      
      const socialHeading = screen.getByRole('heading', { 
        name: 'Suivez-moi',
        level: 3 
      });
      expect(socialHeading).toBeInTheDocument();
    });

    test('should display social media links with proper attributes', () => {
      const { container } = render(<Footer />);
      
      // Vérifier que les liens sociaux sont présents
      const socialLinks = container.querySelectorAll('a[target="_blank"]');
      expect(socialLinks.length).toBeGreaterThan(0);
      
      // Vérifier les attributs de sécurité
      socialLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        expect(link).toHaveAttribute('aria-label');
      });
    });

    test('should display call-to-action message for social connections', () => {
      render(<Footer />);
      
      expect(screen.getByText('Connectons-nous !')).toBeInTheDocument();
    });

    test('should filter and display only main social platforms', () => {
      const { container } = render(<Footer />);
      
      // Vérifier que seuls les liens principaux sont affichés (linkedin, twitter, discord)
      const socialLinks = container.querySelectorAll('a[target="_blank"]');
      
      // Le nombre de liens devrait correspondre aux plateformes filtrées
      expect(socialLinks.length).toBeLessThanOrEqual(3);
    });
  });

  describe('Dark Theme Consistency (Requirement 9.4)', () => {
    test('should apply consistent dark theme styling', () => {
      const { container } = render(<Footer />);
      
      // Vérifier le background sombre du footer
      const footer = container.querySelector('footer');
      expect(footer).toHaveClass('bg-gray-900');
      
      // Vérifier la bordure supérieure
      expect(footer).toHaveClass('border-t', 'border-gray-700');
    });

    test('should use appropriate text colors for dark theme', () => {
      const { container } = render(<Footer />);
      
      // Vérifier les couleurs des titres (blanc)
      const headings = container.querySelectorAll('h3');
      headings.forEach(heading => {
        expect(heading).toHaveClass('text-white');
      });
      
      // Vérifier les couleurs du texte secondaire (gris)
      const secondaryTexts = container.querySelectorAll('.text-gray-400');
      expect(secondaryTexts.length).toBeGreaterThan(0);
    });

    test('should apply hover effects consistent with dark theme', () => {
      const { container } = render(<Footer />);
      
      // Vérifier les effets de hover sur les liens sociaux
      const socialLinks = container.querySelectorAll('a[target="_blank"]');
      socialLinks.forEach(link => {
        expect(link).toHaveClass('text-gray-400', 'hover:text-white');
        expect(link).toHaveClass('transition-colors', 'duration-200');
      });
    });
  });

  describe('Layout and Structure', () => {
    test('should have proper responsive grid layout', () => {
      const { container } = render(<Footer />);
      
      // Vérifier la grille responsive
      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-3', 'gap-8');
    });

    test('should display final message with separator', () => {
      render(<Footer />);
      
      const finalMessage = screen.getByText('Développé avec ❤️ en utilisant les dernières technologies web');
      expect(finalMessage).toBeInTheDocument();
      
      // Vérifier que le message est dans une section séparée
      const { container } = render(<Footer />);
      const separator = container.querySelector('.border-t.border-gray-700');
      expect(separator).toBeInTheDocument();
    });

    test('should have proper container and padding classes', () => {
      const { container } = render(<Footer />);
      
      // Vérifier le conteneur principal
      const mainContainer = container.querySelector('.max-w-7xl');
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer).toHaveClass('mx-auto', 'px-4', 'sm:px-6', 'lg:px-8', 'py-8');
    });
  });

  describe('Accessibility', () => {
    test('should have proper heading hierarchy', () => {
      render(<Footer />);
      
      // Vérifier que tous les titres sont de niveau 3
      const headings = screen.getAllByRole('heading', { level: 3 });
      expect(headings).toHaveLength(3);
      
      // Vérifier les textes des titres
      expect(screen.getByRole('heading', { name: APP_CONFIG.site.author })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Stack Technique' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Suivez-moi' })).toBeInTheDocument();
    });

    test('should have proper aria-labels for social links', () => {
      const { container } = render(<Footer />);
      
      const socialLinks = container.querySelectorAll('a[aria-label]');
      socialLinks.forEach(link => {
        const ariaLabel = link.getAttribute('aria-label');
        expect(ariaLabel).toMatch(/^Suivre sur \w+$/);
      });
    });
  });
});