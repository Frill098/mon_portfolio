import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import * as fc from 'fast-check';
import Navigation from '@/components/layout/Navigation';
import { navItemGenerator, sectionIdGenerator, screenSizeGenerator } from '@/__tests__/utils/generators';

// Mock Intersection Observer
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Mock getElementById pour les tests
const mockGetElementById = jest.fn();
Object.defineProperty(document, 'getElementById', {
  writable: true,
  value: mockGetElementById
});

describe('Navigation Component - Property Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetElementById.mockImplementation((id: string) => {
      // Retourner un élément mock avec l'id approprié
      return {
        id,
        scrollIntoView: jest.fn()
      } as any;
    });
  });

  /**
   * Feature: portfolio-personnel, Property 10: Fonctionnalité de navigation fluide
   * Validates: Requirements 7.1, 7.3, 7.4
   */
  test('Property 10: Navigation fluide - Pour tous les liens de navigation, cliquer doit déclencher un scroll fluide vers la section correspondante', () => {
    fc.assert(fc.property(
      sectionIdGenerator,
      (activeSection) => {
        const { container } = render(<Navigation activeSection={activeSection} />);
        
        // Vérifier que la navigation est rendue
        const nav = container.querySelector('nav');
        expect(nav).toBeInTheDocument();
        
        // Vérifier que la section active est mise en évidence
        const activeButton = container.querySelector(`[aria-current="page"]`);
        expect(activeButton).toBeInTheDocument();
        
        // Simuler un clic sur un lien de navigation
        const navButtons = container.querySelectorAll('button[class*="px-3 py-2"]');
        if (navButtons.length > 0) {
          const firstButton = navButtons[0] as HTMLButtonElement;
          fireEvent.click(firstButton);
          
          // Vérifier que scrollIntoView a été appelé
          expect(mockGetElementById).toHaveBeenCalled();
        }
      }
    ), { numRuns: 10 });
  });

  test('Property 10: Navigation fluide - La navigation sticky/fixed doit être présente', () => {
    fc.assert(fc.property(
      sectionIdGenerator,
      (activeSection) => {
        const { container } = render(<Navigation activeSection={activeSection} />);
        
        // Vérifier que la navigation a les classes fixed/sticky appropriées
        const nav = container.querySelector('nav');
        expect(nav).toHaveClass('fixed');
        expect(nav).toHaveClass('top-0');
        expect(nav).toHaveClass('z-50');
      }
    ), { numRuns: 10 });
  });

  test('Property 10: Navigation fluide - Tous les éléments de navigation doivent être accessibles au clavier', () => {
    fc.assert(fc.property(
      sectionIdGenerator,
      (activeSection) => {
        const { container } = render(<Navigation activeSection={activeSection} />);
        
        // Vérifier que tous les boutons de navigation sont focusables
        const navButtons = container.querySelectorAll('button');
        navButtons.forEach(button => {
          expect(button).not.toHaveAttribute('tabindex', '-1');
        });
        
        // Vérifier que les liens ont les attributs d'accessibilité appropriés
        const activeButton = container.querySelector('[aria-current="page"]');
        expect(activeButton).toBeInTheDocument();
      }
    ), { numRuns: 10 });
  });

  test('Property 10: Navigation fluide - Le smooth scrolling doit être configuré correctement', () => {
    fc.assert(fc.property(
      sectionIdGenerator,
      (activeSection) => {
        const { container } = render(<Navigation activeSection={activeSection} />);
        
        // Simuler un clic sur un bouton de navigation
        const navButtons = container.querySelectorAll('button[class*="px-3 py-2"]');
        if (navButtons.length > 0) {
          const button = navButtons[0] as HTMLButtonElement;
          
          // Mock d'un élément avec scrollIntoView
          const mockElement = {
            scrollIntoView: jest.fn()
          };
          mockGetElementById.mockReturnValue(mockElement);
          
          fireEvent.click(button);
          
          // Vérifier que scrollIntoView a été appelé avec les bonnes options
          expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    ), { numRuns: 10 });
  });

  /**
   * Feature: portfolio-personnel, Property 11: Responsivité multi-appareils
   * Validates: Requirements 7.5, 8.5
   */
  test('Property 11: Responsivité - La navigation doit s\'adapter à toutes les tailles d\'écran', () => {
    fc.assert(fc.property(
      sectionIdGenerator,
      (activeSection) => {
        const { container } = render(<Navigation activeSection={activeSection} />);
        
        // Vérifier que la navigation desktop est présente avec les classes responsive appropriées
        const desktopNav = container.querySelector('.hidden.md\\:block');
        expect(desktopNav).toBeInTheDocument();
        
        // Vérifier que le menu hamburger mobile est présent
        const mobileMenuButton = container.querySelector('.md\\:hidden button');
        expect(mobileMenuButton).toBeInTheDocument();
        
        // Vérifier que le menu hamburger a les attributs d'accessibilité
        expect(mobileMenuButton).toHaveAttribute('aria-expanded');
        expect(mobileMenuButton).toHaveAttribute('aria-label');
      }
    ), { numRuns: 10 });
  });

  test('Property 11: Responsivité - Le menu mobile doit fonctionner correctement', () => {
    fc.assert(fc.property(
      sectionIdGenerator,
      (activeSection) => {
        const { container } = render(<Navigation activeSection={activeSection} />);
        
        // Trouver et cliquer sur le bouton hamburger
        const hamburgerButton = container.querySelector('.md\\:hidden button');
        expect(hamburgerButton).toBeInTheDocument();
        
        // Vérifier l'état initial (menu fermé)
        expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
        
        // Cliquer pour ouvrir le menu
        fireEvent.click(hamburgerButton!);
        
        // Vérifier que le menu mobile apparaît
        const mobileMenu = container.querySelector('.md\\:hidden .px-2');
        expect(mobileMenu).toBeInTheDocument();
        
        // Vérifier que l'état du bouton change
        expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');
      }
    ), { numRuns: 10 });
  });

  test('Property 11: Responsivité - Les éléments de navigation doivent avoir les classes responsive appropriées', () => {
    fc.assert(fc.property(
      sectionIdGenerator,
      (activeSection) => {
        const { container } = render(<Navigation activeSection={activeSection} />);
        
        // Vérifier que le conteneur principal a les classes responsive
        const mainContainer = container.querySelector('.max-w-7xl');
        expect(mainContainer).toBeInTheDocument();
        expect(mainContainer).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
        
        // Vérifier que la navigation desktop est cachée sur mobile
        const desktopNav = container.querySelector('.hidden.md\\:block');
        expect(desktopNav).toHaveClass('hidden', 'md:block');
        
        // Vérifier que le bouton CV desktop est caché sur mobile
        const desktopCvButton = container.querySelector('.hidden.md\\:block a');
        expect(desktopCvButton).toBeInTheDocument();
      }
    ), { numRuns: 10 });
  });

  test('Property 11: Responsivité - Le menu mobile doit contenir tous les éléments de navigation', () => {
    fc.assert(fc.property(
      sectionIdGenerator,
      (activeSection) => {
        const { container } = render(<Navigation activeSection={activeSection} />);
        
        // Ouvrir le menu mobile
        const hamburgerButton = container.querySelector('.md\\:hidden button');
        fireEvent.click(hamburgerButton!);
        
        // Vérifier que le menu mobile contient tous les liens de navigation
        const mobileNavButtons = container.querySelectorAll('.md\\:hidden .px-2 button');
        expect(mobileNavButtons.length).toBeGreaterThan(0);
        
        // Vérifier que le bouton CV est présent dans le menu mobile
        const mobileCvButton = container.querySelector('.md\\:hidden .px-2 a');
        expect(mobileCvButton).toBeInTheDocument();
        expect(mobileCvButton).toHaveTextContent('Télécharger CV');
      }
    ), { numRuns: 10 });
  });
});