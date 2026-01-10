import * as fc from 'fast-check';
import { Experience } from '@/lib/types';
import { sortExperiencesByDate, sortExperiencesByRelevance } from '@/data/experience';
import { experienceListGenerator } from '@/__tests__/utils/generators';

describe('Experience Data Property Tests', () => {
  /**
   * Feature: portfolio-personnel, Property 9: Ordre chronologique des expériences
   * Validates: Requirements 5.5
   */
  test('Property 9: Chronological ordering - experiences should be sorted by date (most recent first)', () => {
    fc.assert(
      fc.property(experienceListGenerator, (experiences: Experience[]) => {
        const sortedExperiences = sortExperiencesByDate(experiences);
        
        // Vérifier que la liste est triée par ordre chronologique décroissant
        for (let i = 0; i < sortedExperiences.length - 1; i++) {
          const currentExp = sortedExperiences[i];
          const nextExp = sortedExperiences[i + 1];
          
          // Utiliser la date de fin si disponible, sinon la date de début
          const currentDate = new Date(currentExp.endDate || currentExp.startDate);
          const nextDate = new Date(nextExp.endDate || nextExp.startDate);
          
          // La date actuelle doit être >= à la suivante (ordre décroissant)
          expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime());
        }
        
        // Vérifier que tous les éléments originaux sont présents
        expect(sortedExperiences).toHaveLength(experiences.length);
        
        // Vérifier que chaque expérience originale est présente dans le résultat trié
        experiences.forEach(originalExp => {
          expect(sortedExperiences.some(sortedExp => sortedExp.id === originalExp.id)).toBe(true);
        });
      }),
      { numRuns: 100 }
    );
  });

  test('Property 9 (Relevance): Relevance ordering - experiences should be sorted by type relevance then by date', () => {
    fc.assert(
      fc.property(experienceListGenerator, (experiences: Experience[]) => {
        const sortedExperiences = sortExperiencesByRelevance(experiences);
        const relevanceOrder = ['work', 'project', 'internship', 'education', 'certification'];
        
        // Vérifier que la liste respecte l'ordre de pertinence
        for (let i = 0; i < sortedExperiences.length - 1; i++) {
          const currentExp = sortedExperiences[i];
          const nextExp = sortedExperiences[i + 1];
          
          const currentRelevanceIndex = relevanceOrder.indexOf(currentExp.type);
          const nextRelevanceIndex = relevanceOrder.indexOf(nextExp.type);
          
          // Si même type, vérifier l'ordre chronologique
          if (currentRelevanceIndex === nextRelevanceIndex) {
            const currentDate = new Date(currentExp.endDate || currentExp.startDate);
            const nextDate = new Date(nextExp.endDate || nextExp.startDate);
            expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime());
          } else {
            // Sinon, vérifier l'ordre de pertinence
            expect(currentRelevanceIndex).toBeLessThanOrEqual(nextRelevanceIndex);
          }
        }
        
        // Vérifier que tous les éléments originaux sont présents
        expect(sortedExperiences).toHaveLength(experiences.length);
        
        // Vérifier que chaque expérience originale est présente dans le résultat trié
        experiences.forEach(originalExp => {
          expect(sortedExperiences.some(sortedExp => sortedExp.id === originalExp.id)).toBe(true);
        });
      }),
      { numRuns: 100 }
    );
  });
});