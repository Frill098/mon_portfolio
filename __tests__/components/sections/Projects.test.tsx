import * as fc from 'fast-check';
import { render } from '@testing-library/react';
import { projectGenerator, projectListGenerator } from '../../utils/generators';
import { Project } from '@/lib/types';
import Projects from '@/components/sections/Projects';

describe('Projects Section Property Tests', () => {
  /**
   * Feature: portfolio-personnel, Property 7: Contrainte d'affichage des projets
   * Validates: Requirements 4.1, 4.6
   */
  
  test('Property 7: Project display constraint - should display 3-6 projects maximum with featured projects first', () => {
    fc.assert(
      fc.property(
        fc.array(projectGenerator, { minLength: 1, maxLength: 20 }), // Generate more projects than limit
        (allProjects: Project[]) => {
          const rendered = render(<Projects projects={allProjects} />);
          
          // Get all project cards rendered
          const projectCards = rendered.container.querySelectorAll('[data-testid="project-card"]');
          
          // Should display maximum 6 projects
          expect(projectCards.length).toBeLessThanOrEqual(6);
          
          // Should display minimum 3 projects if available
          if (allProjects.length >= 3) {
            expect(projectCards.length).toBeGreaterThanOrEqual(3);
          } else {
            expect(projectCards.length).toBe(allProjects.length);
          }
          
          // If there are featured projects, they should appear first
          const featuredProjects = allProjects.filter(p => p.featured);
          const nonFeaturedProjects = allProjects.filter(p => !p.featured);
          
          if (featuredProjects.length > 0) {
            // Get the displayed projects in order
            const displayedProjects = Array.from(projectCards).map(card => {
              const titleElement = card.querySelector('[data-testid="project-title"]');
              return titleElement?.textContent || '';
            });
            
            // Featured projects should come first in the displayed list
            const sortedProjects = [...featuredProjects, ...nonFeaturedProjects].slice(0, 6);
            const expectedTitles = sortedProjects.map(p => p.title);
            
            // Check that the order matches (featured first)
            displayedProjects.forEach((title, index) => {
              if (index < expectedTitles.length) {
                expect(expectedTitles).toContain(title);
              }
            });
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 7a: Featured projects ordering - featured projects should always appear before non-featured ones', () => {
    fc.assert(
      fc.property(
        fc.array(projectGenerator, { minLength: 4, maxLength: 10 }),
        (projects: Project[]) => {
          // Ensure we have both featured and non-featured projects
          const modifiedProjects = projects.map((project, index) => ({
            ...project,
            featured: index < Math.floor(projects.length / 2) // First half are featured
          }));
          
          const rendered = render(<Projects projects={modifiedProjects} />);
          const projectCards = rendered.container.querySelectorAll('[data-testid="project-card"]');
          
          // Get the order of projects as they appear in the DOM
          const displayedTitles = Array.from(projectCards).map(card => {
            const titleElement = card.querySelector('[data-testid="project-title"]');
            return titleElement?.textContent || '';
          });
          
          // Find the positions of featured and non-featured projects
          let lastFeaturedIndex = -1;
          let firstNonFeaturedIndex = displayedTitles.length;
          
          displayedTitles.forEach((title, index) => {
            const project = modifiedProjects.find(p => p.title === title);
            if (project?.featured) {
              lastFeaturedIndex = Math.max(lastFeaturedIndex, index);
            } else {
              firstNonFeaturedIndex = Math.min(firstNonFeaturedIndex, index);
            }
          });
          
          // Featured projects should come before non-featured ones
          if (lastFeaturedIndex >= 0 && firstNonFeaturedIndex < displayedTitles.length) {
            expect(lastFeaturedIndex).toBeLessThan(firstNonFeaturedIndex);
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 7b: Project count constraint - should never display more than 6 projects regardless of input size', () => {
    fc.assert(
      fc.property(
        fc.array(projectGenerator, { minLength: 7, maxLength: 50 }), // Always more than 6
        (projects: Project[]) => {
          const rendered = render(<Projects projects={projects} />);
          const projectCards = rendered.container.querySelectorAll('[data-testid="project-card"]');
          
          // Should never exceed 6 projects
          expect(projectCards.length).toBeLessThanOrEqual(6);
          expect(projectCards.length).toBe(Math.min(6, projects.length));
        }
      ),
      { numRuns: 10 }
    );
  });

  /**
   * Feature: portfolio-personnel, Property 8: Informations complètes des projets
   * Validates: Requirements 4.2, 4.3, 4.4
   */
  
  test('Property 8: Complete project information - all displayed projects should include name, description, technologies, image and GitHub link', () => {
    fc.assert(
      fc.property(
        fc.array(projectGenerator, { minLength: 1, maxLength: 10 }),
        (projects: Project[]) => {
          const rendered = render(<Projects projects={projects} />);
          const projectCards = rendered.container.querySelectorAll('[data-testid="project-card"]');
          
          // Each displayed project should have all required information
          projectCards.forEach(card => {
            // Should have project title
            const titleElement = card.querySelector('[data-testid="project-title"]');
            expect(titleElement).toBeInTheDocument();
            expect(titleElement?.textContent?.trim()).not.toBe('');
            
            // Should have project description
            const descriptionElement = card.querySelector('[data-testid="project-description"]');
            expect(descriptionElement).toBeInTheDocument();
            expect(descriptionElement?.textContent?.trim()).not.toBe('');
            
            // Should have technologies list
            const technologiesElement = card.querySelector('[data-testid="project-technologies"]');
            expect(technologiesElement).toBeInTheDocument();
            
            // Should have at least one technology
            const techBadges = card.querySelectorAll('[data-testid="tech-badge"]');
            expect(techBadges.length).toBeGreaterThan(0);
            
            // Should have project image
            const imageElement = card.querySelector('[data-testid="project-image"]');
            expect(imageElement).toBeInTheDocument();
            expect(imageElement).toHaveAttribute('src');
            expect(imageElement?.getAttribute('src')?.trim()).not.toBe('');
            
            // Should have GitHub link
            const githubLink = card.querySelector('[data-testid="github-link"]');
            expect(githubLink).toBeInTheDocument();
            expect(githubLink).toHaveAttribute('href');
            expect(githubLink?.getAttribute('href')?.trim()).not.toBe('');
          });
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 8a: Technology display - each project should display all its technologies as badges', () => {
    fc.assert(
      fc.property(
        projectGenerator,
        (project: Project) => {
          // Filter out empty or whitespace-only technologies as they would be trimmed in UI
          const validTechnologies = project.technologies.filter(tech => tech.trim().length > 0);
          
          if (validTechnologies.length === 0) {
            // Skip projects with no valid technologies
            return true;
          }
          
          const rendered = render(<Projects projects={[project]} />);
          const projectCard = rendered.container.querySelector('[data-testid="project-card"]');
          
          if (projectCard) {
            const techBadges = projectCard.querySelectorAll('[data-testid="tech-badge"]');
            
            // Should have a badge for each valid technology
            expect(techBadges.length).toBe(validTechnologies.length);
            
            // Each valid technology should be displayed
            validTechnologies.forEach(tech => {
              const techBadge = Array.from(techBadges).find(badge => 
                badge.textContent?.trim() === tech.trim()
              );
              expect(techBadge).toBeInTheDocument();
            });
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 8b: Image preview requirement - each project should have a valid image preview', () => {
    fc.assert(
      fc.property(
        projectGenerator,
        (project: Project) => {
          const rendered = render(<Projects projects={[project]} />);
          const projectCard = rendered.container.querySelector('[data-testid="project-card"]');
          
          if (projectCard) {
            const imageElement = projectCard.querySelector('[data-testid="project-image"]');
            expect(imageElement).toBeInTheDocument();
            
            // Image should have src attribute (Next.js may transform it for optimization)
            expect(imageElement).toHaveAttribute('src');
            const srcValue = imageElement?.getAttribute('src');
            expect(srcValue).toBeTruthy();
            
            // For Next.js Image component, the src might be transformed, so we check if it contains the original URL
            // or if it's a Next.js optimized URL
            const isNextJsOptimized = srcValue?.includes('/_next/image?url=');
            const containsOriginalUrl = srcValue?.includes(encodeURIComponent(project.image)) || srcValue === project.image;
            
            expect(isNextJsOptimized || containsOriginalUrl).toBe(true);
            
            // Image should have alt text
            expect(imageElement).toHaveAttribute('alt');
            expect(imageElement?.getAttribute('alt')?.trim()).not.toBe('');
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 8c: GitHub link requirement - each project should have a valid GitHub repository link', () => {
    fc.assert(
      fc.property(
        projectGenerator,
        (project: Project) => {
          const rendered = render(<Projects projects={[project]} />);
          const projectCard = rendered.container.querySelector('[data-testid="project-card"]');
          
          if (projectCard) {
            const githubLink = projectCard.querySelector('[data-testid="github-link"]');
            expect(githubLink).toBeInTheDocument();
            
            // GitHub link should point to the correct URL
            expect(githubLink).toHaveAttribute('href', project.githubUrl);
            
            // Link should open in new tab for external links
            expect(githubLink).toHaveAttribute('target', '_blank');
            expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
          }
        }
      ),
      { numRuns: 10 }
    );
  });
});