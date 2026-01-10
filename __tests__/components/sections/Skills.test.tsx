import React from 'react';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import Skills from '@/components/sections/Skills';
import { skillCategoriesGenerator } from '@/__tests__/utils/generators';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, variants, initial, whileInView, viewport, whileHover, animate, transition, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, variants, initial, whileInView, viewport, whileHover, animate, transition, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

describe('Skills Component', () => {
  /**
   * Feature: portfolio-personnel, Property 6: Organisation des compétences par catégories
   * Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5
   */
  test('Property 6: Organisation des compétences par catégories', () => {
    fc.assert(fc.property(
      skillCategoriesGenerator,
      (skillCategories) => {
        // Filtrer les catégories non vides comme le fait le composant
        const nonEmptyCategories = skillCategories.filter(category => 
          category.skills && category.skills.length > 0 && category.title.trim().length > 0
        );

        const { container } = render(<Skills skillCategories={skillCategories} />);

        // Vérifier que toutes les catégories non vides sont affichées
        nonEmptyCategories.forEach((category, index) => {
          const categoryElement = container.querySelector(`[data-testid="skill-category-${category.title.toLowerCase()}-${index}"]`);
          expect(categoryElement).toBeInTheDocument();
          
          // Vérifier que le titre de la catégorie est affiché (utiliser getAllByText pour gérer les doublons)
          const titleElements = screen.getAllByText(category.title);
          expect(titleElements.length).toBeGreaterThan(0);
          
          // Vérifier que chaque compétence de la catégorie est affichée
          category.skills.forEach(skill => {
            if (skill.name.trim().length > 0) {
              const skillBadge = container.querySelector(`[data-testid="skill-badge-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}"]`);
              expect(skillBadge).toBeInTheDocument();
              const skillElements = screen.getAllByText(skill.name);
              expect(skillElements.length).toBeGreaterThan(0);
            }
          });
        });

        // Vérifier qu'aucune catégorie vide n'est affichée
        const emptyCategories = skillCategories.filter(category => 
          !category.skills || category.skills.length === 0 || category.title.trim().length === 0
        );
        
        // Pour les catégories vides, vérifier qu'elles n'ont pas de data-testid correspondant
        emptyCategories.forEach((category, index) => {
          if (category.title.trim().length > 0) {
            const categoryElement = container.querySelector(`[data-testid="skill-category-${category.title.toLowerCase()}-${index}"]`);
            expect(categoryElement).not.toBeInTheDocument();
          }
        });
      }
    ), { numRuns: 10 });
  });

  // Test unitaire pour vérifier la structure de base
  test('should render skills section with proper structure', () => {
    const mockSkillCategories = [
      {
        title: "Frontend",
        skills: [
          { name: "React", level: "expert" as const },
          { name: "TypeScript", level: "advanced" as const }
        ]
      },
      {
        title: "Backend", 
        skills: [
          { name: "Node.js", level: "intermediate" as const }
        ]
      }
    ];

    render(<Skills skillCategories={mockSkillCategories} />);

    // Vérifier la présence du titre principal
    expect(screen.getByText('Compétences')).toBeInTheDocument();
    
    // Vérifier la présence des catégories
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    
    // Vérifier la présence des compétences
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  // Test unitaire pour les catégories vides
  test('should not display empty categories', () => {
    const mockSkillCategories = [
      {
        title: "Frontend",
        skills: [
          { name: "React", level: "expert" as const }
        ]
      },
      {
        title: "EmptyCategory",
        skills: []
      }
    ];

    const { container } = render(<Skills skillCategories={mockSkillCategories} />);

    // Vérifier que la catégorie non vide est affichée
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    
    // Vérifier que la catégorie vide n'est pas affichée
    expect(screen.queryByText('EmptyCategory')).not.toBeInTheDocument();
    const emptyCategory = container.querySelector('[data-testid="skill-category-emptycategory"]');
    expect(emptyCategory).not.toBeInTheDocument();
  });

  // Test unitaire pour les niveaux de compétences
  test('should display skill levels correctly', () => {
    const mockSkillCategories = [
      {
        title: "Test",
        skills: [
          { name: "Expert Skill", level: "expert" as const },
          { name: "Advanced Skill", level: "advanced" as const },
          { name: "Intermediate Skill", level: "intermediate" as const },
          { name: "Beginner Skill", level: "beginner" as const },
          { name: "No Level Skill" }
        ]
      }
    ];

    render(<Skills skillCategories={mockSkillCategories} />);

    // Vérifier que les niveaux sont affichés
    expect(screen.getByText(/Expert Skill/)).toBeInTheDocument();
    expect(screen.getByText(/\(expert\)/)).toBeInTheDocument();
    expect(screen.getByText(/\(advanced\)/)).toBeInTheDocument();
    expect(screen.getByText(/\(intermediate\)/)).toBeInTheDocument();
    expect(screen.getByText(/\(beginner\)/)).toBeInTheDocument();
    
    // Vérifier que la compétence sans niveau est affichée sans niveau
    expect(screen.getByText('No Level Skill')).toBeInTheDocument();
  });
});