import * as fc from 'fast-check';
import { render } from '@testing-library/react';
import { biographyGenerator, statisticGenerator } from '../../utils/generators';
import About from '@/components/sections/About';
import { Statistic } from '@/lib/types';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

describe('About Component Property Tests', () => {
  /**
   * Feature: portfolio-personnel, Property 4: Limitation de la biographie
   * Validates: Requirements 2.1
   */
  test('Property 4: Biography should be limited to maximum 3 paragraphs', () => {
    fc.assert(
      fc.property(
        biographyGenerator,
        fc.array(statisticGenerator, { minLength: 0, maxLength: 5 }),
        (biography: string[], stats: Statistic[]) => {
          const { container } = render(<About biography={biography} stats={stats} />);
          
          // Compter le nombre de paragraphes affichés dans la biographie
          const biographySection = container.querySelector('[data-testid="biography-section"]') || 
                                  container.querySelector('div:has(> p)') ||
                                  container;
          
          const paragraphs = biographySection.querySelectorAll('p');
          const displayedParagraphs = Array.from(paragraphs).filter(p => 
            p.textContent && p.textContent.trim().length > 0
          );
          
          // Si la biographie originale a plus de 3 paragraphes, 
          // seulement 3 doivent être affichés
          if (biography.length > 3) {
            expect(displayedParagraphs.length).toBeLessThanOrEqual(3);
          } else {
            // Si la biographie originale a 3 paragraphes ou moins,
            // tous doivent être affichés
            expect(displayedParagraphs.length).toBe(biography.length);
          }
          
          // Vérifier que les paragraphes affichés correspondent aux 3 premiers
          // de la biographie originale
          const maxParagraphsToShow = Math.min(biography.length, 3);
          for (let i = 0; i < maxParagraphsToShow; i++) {
            const paragraphFound = Array.from(displayedParagraphs).some(p => 
              p.textContent?.includes(biography[i])
            );
            expect(paragraphFound).toBe(true);
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Biography limitation with specific test cases', () => {
    // Test avec exactement 3 paragraphes
    const threeParagraphs = [
      "Premier paragraphe de test",
      "Deuxième paragraphe de test", 
      "Troisième paragraphe de test"
    ];
    
    const { container: container3 } = render(<About biography={threeParagraphs} stats={[]} />);
    const paragraphs3 = container3.querySelectorAll('p');
    expect(paragraphs3.length).toBe(3);

    // Test avec plus de 3 paragraphes
    const fiveParagraphs = [
      "Premier paragraphe de test",
      "Deuxième paragraphe de test",
      "Troisième paragraphe de test",
      "Quatrième paragraphe de test",
      "Cinquième paragraphe de test"
    ];
    
    const { container: container5 } = render(<About biography={fiveParagraphs} stats={[]} />);
    const paragraphs5 = container5.querySelectorAll('p');
    expect(paragraphs5.length).toBeLessThanOrEqual(3);

    // Test avec moins de 3 paragraphes
    const oneParagraph = ["Seul paragraphe de test"];
    
    const { container: container1 } = render(<About biography={oneParagraph} stats={[]} />);
    const paragraphs1 = container1.querySelectorAll('p');
    expect(paragraphs1.length).toBe(1);
  });

  test('Statistics should be displayed when provided', () => {
    const biography = ["Test biography"];
    const stats = [
      { label: "Test Stat 1", value: "5+" },
      { label: "Test Stat 2", value: "10+" }
    ];

    const { getByText } = render(<About biography={biography} stats={stats} />);
    
    expect(getByText("5+")).toBeInTheDocument();
    expect(getByText("Test Stat 1")).toBeInTheDocument();
    expect(getByText("10+")).toBeInTheDocument();
    expect(getByText("Test Stat 2")).toBeInTheDocument();
  });
});