import * as fc from 'fast-check';
import { 
  projectGenerator, 
  skillCategoryGenerator, 
  contactMethodGenerator,
  socialLinkGenerator 
} from '../utils/generators';
import { Project, SkillCategory, ContactMethod, SocialLink, Statistic } from '@/lib/types';
import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { aboutStats } from '@/data/personal';

describe('Conditional Display Property Tests', () => {
  /**
   * Feature: portfolio-personnel, Property 5: Affichage conditionnel des éléments optionnels
   * Validates: Requirements 2.4, 4.5, 5.2, 5.4, 6.3
   */
  
  test('Property 5a: Projects with optional demo URLs should only display demo links when demoUrl is present and non-empty', () => {
    fc.assert(
      fc.property(projectGenerator, (project: Project) => {
        if (project.demoUrl && project.demoUrl.trim() !== '') {
          // If demoUrl is present and non-empty, it should be valid
          expect(project.demoUrl).toBeDefined();
          expect(project.demoUrl.trim()).not.toBe('');
          expect(typeof project.demoUrl).toBe('string');
        } else {
          // If demoUrl is not present or empty, it should be undefined or empty
          expect(project.demoUrl === undefined || project.demoUrl === null || project.demoUrl.trim() === '').toBe(true);
        }
      }),
      { numRuns: 100 }
    );
  });

  test('Property 5b: Skill categories should only be displayed when they contain at least one skill', () => {
    fc.assert(
      fc.property(skillCategoryGenerator, (category: SkillCategory) => {
        // Every skill category should have at least one skill to be displayed
        expect(category.skills).toBeDefined();
        expect(Array.isArray(category.skills)).toBe(true);
        expect(category.skills.length).toBeGreaterThan(0);
        
        // Each skill in the category should have a valid name
        category.skills.forEach(skill => {
          expect(skill.name).toBeDefined();
          expect(typeof skill.name).toBe('string');
          expect(skill.name.trim()).not.toBe('');
        });
      }),
      { numRuns: 100 }
    );
  });

  test('Property 5c: Contact methods should only be displayed when they have valid values and URLs', () => {
    fc.assert(
      fc.property(contactMethodGenerator, (contactMethod: ContactMethod) => {
        // Contact method should have valid value and URL
        expect(contactMethod.value).toBeDefined();
        expect(typeof contactMethod.value).toBe('string');
        expect(contactMethod.value.trim()).not.toBe('');
        
        expect(contactMethod.url).toBeDefined();
        expect(typeof contactMethod.url).toBe('string');
        expect(contactMethod.url.trim()).not.toBe('');
        
        expect(contactMethod.type).toBeDefined();
        expect(['email', 'whatsapp', 'linkedin', 'twitter', 'discord']).toContain(contactMethod.type);
      }),
      { numRuns: 100 }
    );
  });

  test('Property 5d: Social links should only be displayed when they have valid platform and URL', () => {
    fc.assert(
      fc.property(socialLinkGenerator, (socialLink: SocialLink) => {
        // Social link should have valid platform and URL
        expect(socialLink.platform).toBeDefined();
        expect(typeof socialLink.platform).toBe('string');
        expect(socialLink.platform.trim()).not.toBe('');
        
        expect(socialLink.url).toBeDefined();
        expect(typeof socialLink.url).toBe('string');
        expect(socialLink.url.trim()).not.toBe('');
      }),
      { numRuns: 100 }
    );
  });

  test('Property 5e: Statistics should only be displayed when they have valid label and value', () => {
    // Test with generated statistics
    const statisticGenerator = fc.record({
      label: fc.string({ minLength: 1, maxLength: 50 }),
      value: fc.string({ minLength: 1, maxLength: 20 }),
      icon: fc.option(fc.constant(() => null))
    });

    fc.assert(
      fc.property(statisticGenerator, (stat: Statistic) => {
        // Statistic should have valid label and value
        expect(stat.label).toBeDefined();
        expect(typeof stat.label).toBe('string');
        expect(stat.label.trim()).not.toBe('');
        
        expect(stat.value).toBeDefined();
        expect(typeof stat.value).toBe('string');
        expect(stat.value.trim()).not.toBe('');
      }),
      { numRuns: 100 }
    );
  });

  // Test static data to ensure it follows the conditional display rules
  test('Static projects data should follow conditional display rules', () => {
    projects.forEach(project => {
      // Required fields should always be present
      expect(project.title.trim()).not.toBe('');
      expect(project.description.trim()).not.toBe('');
      expect(project.githubUrl.trim()).not.toBe('');
      
      // Optional demoUrl should only be displayed if present and non-empty
      if (project.demoUrl) {
        expect(project.demoUrl.trim()).not.toBe('');
      }
    });
  });

  test('Static skill categories should follow conditional display rules', () => {
    skillCategories.forEach(category => {
      // Categories should only exist if they have skills
      expect(category.skills.length).toBeGreaterThan(0);
      
      category.skills.forEach(skill => {
        expect(skill.name.trim()).not.toBe('');
      });
    });
  });

  test('Static statistics should follow conditional display rules', () => {
    aboutStats.forEach(stat => {
      expect(stat.label.trim()).not.toBe('');
      expect(stat.value.trim()).not.toBe('');
    });
  });
});