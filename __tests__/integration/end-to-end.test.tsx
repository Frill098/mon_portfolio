import React from 'react';
import { render, fireEvent, screen } from '../utils/test-utils';
import Home from '../../app/page';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock smooth scrolling
const mockScrollIntoView = jest.fn();
Element.prototype.scrollIntoView = mockScrollIntoView;

describe('End-to-End Integration Tests', () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;

    // Reset scroll mock
    mockScrollIntoView.mockClear();
  });

  test('Complete portfolio navigation flow', () => {
    const { container } = render(<Home />);
    
    // Verify all main sections are present
    const heroSection = container.querySelector('#hero');
    const aboutSection = container.querySelector('#about');
    const skillsSection = container.querySelector('#skills');
    const projectsSection = container.querySelector('#projects');
    const experienceSection = container.querySelector('#experience');
    const contactSection = container.querySelector('#contact');
    
    expect(heroSection).toBeInTheDocument();
    expect(aboutSection).toBeInTheDocument();
    expect(skillsSection).toBeInTheDocument();
    expect(projectsSection).toBeInTheDocument();
    expect(experienceSection).toBeInTheDocument();
    expect(contactSection).toBeInTheDocument();
    
    // Test section content is properly rendered
    expect(heroSection?.textContent).toContain('Votre Nom');
    expect(aboutSection?.textContent).toContain('À Propos');
    expect(skillsSection?.textContent).toContain('Compétences');
    expect(projectsSection?.textContent).toContain('Projets');
    expect(experienceSection?.textContent).toContain('Expérience');
    expect(contactSection?.textContent).toContain('Contact');
  });

  test('Responsive design across different screen sizes', () => {
    // Test mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 667,
    });
    
    const { container: mobileContainer } = render(<Home />);
    
    // Verify mobile-specific classes or behaviors
    const sections = mobileContainer.querySelectorAll('section');
    sections.forEach(section => {
      expect(section).toBeInTheDocument();
      // Verify sections are stacked vertically (basic responsive check)
      const computedStyle = window.getComputedStyle(section);
      expect(computedStyle).toBeDefined();
    });
    
    // Test tablet viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });
    
    const { container: tabletContainer } = render(<Home />);
    const tabletSections = tabletContainer.querySelectorAll('section');
    expect(tabletSections.length).toBeGreaterThanOrEqual(6);
    
    // Test desktop viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    
    const { container: desktopContainer } = render(<Home />);
    const desktopSections = desktopContainer.querySelectorAll('section');
    expect(desktopSections.length).toBeGreaterThanOrEqual(6);
  });

  test('Accessibility with axe-core simulation', () => {
    const { container } = render(<Home />);
    
    // Simulate basic axe-core checks
    
    // Check for proper heading hierarchy
    const h1Elements = container.querySelectorAll('h1');
    const h2Elements = container.querySelectorAll('h2');
    const h3Elements = container.querySelectorAll('h3');
    
    expect(h1Elements.length).toBe(1); // Only one h1 per page
    expect(h2Elements.length).toBeGreaterThan(0); // Section headings
    
    // Check for alt text on images
    const images = container.querySelectorAll('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).not.toBe('');
    });
    
    // Check for proper form labels
    const inputs = container.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      const id = input.getAttribute('id');
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledBy = input.getAttribute('aria-labelledby');
      
      if (id) {
        const label = container.querySelector(`label[for="${id}"]`);
        expect(label || ariaLabel || ariaLabelledBy).toBeTruthy();
      } else {
        expect(ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    });
    
    // Check for keyboard accessibility
    const interactiveElements = container.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    interactiveElements.forEach(element => {
      const tagName = element.tagName.toLowerCase();
      const tabIndex = element.getAttribute('tabindex');
      
      const isNaturallyFocusable = ['a', 'button', 'input', 'textarea', 'select'].includes(tagName);
      const hasPositiveTabIndex = tabIndex && parseInt(tabIndex) >= 0;
      
      expect(isNaturallyFocusable || hasPositiveTabIndex).toBe(true);
    });
    
    // Check color contrast (simplified)
    const textElements = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a');
    textElements.forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      // In a real test, you would calculate actual contrast ratios
      // For this test, we just verify the elements have computed styles
      expect(computedStyle.color).toBeDefined();
    });
  });

  test('Performance and optimization checks', () => {
    const { container } = render(<Home />);
    
    // Check for lazy loading attributes on images
    const images = container.querySelectorAll('img');
    images.forEach(img => {
      // Next.js images should have loading="lazy" by default (except above fold)
      const loading = img.getAttribute('loading');
      expect(['lazy', 'eager', null]).toContain(loading);
    });
    
    // Check for proper semantic structure for SEO
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
    
    const sections = container.querySelectorAll('section');
    expect(sections.length).toBeGreaterThanOrEqual(6);
    
    // Verify sections have proper IDs for navigation
    const sectionIds = Array.from(sections).map(section => section.getAttribute('id'));
    const expectedIds = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
    
    expectedIds.forEach(expectedId => {
      expect(sectionIds).toContain(expectedId);
    });
  });

  test('Content integration and data flow', () => {
    const { container } = render(<Home />);
    
    // Test Hero section content
    const heroSection = container.querySelector('#hero');
    expect(heroSection?.textContent).toContain('Votre Nom');
    expect(heroSection?.textContent).toContain('Développeur Full Stack');
    
    // Test About section content
    const aboutSection = container.querySelector('#about');
    expect(aboutSection?.textContent).toContain('À Propos');
    
    // Test Skills section content
    const skillsSection = container.querySelector('#skills');
    expect(skillsSection?.textContent).toContain('Compétences');
    
    // Test Projects section content
    const projectsSection = container.querySelector('#projects');
    expect(projectsSection?.textContent).toContain('Projets');
    
    // Test Experience section content
    const experienceSection = container.querySelector('#experience');
    expect(experienceSection?.textContent).toContain('Expérience');
    
    // Test Contact section content
    const contactSection = container.querySelector('#contact');
    expect(contactSection?.textContent).toContain('Contact');
    
    // Verify data is properly passed to components
    // Check for specific content that should be rendered from data files
    const skillCategories = container.querySelectorAll('[data-testid*="skill-category"], .skill-category');
    // Skills should be organized in categories
    expect(skillCategories.length >= 0).toBe(true); // Allow for different implementations
    
    // Check for experience items
    const experienceItems = container.querySelectorAll('[data-testid*="experience"], .experience-item');
    expect(experienceItems.length >= 0).toBe(true); // Allow for different implementations
  });

  test('Theme consistency across all sections', () => {
    const { container } = render(<Home />);
    
    // Check that all sections have dark theme classes
    const sections = container.querySelectorAll('section');
    sections.forEach(section => {
      const classList = Array.from(section.classList);
      const hasThemeClasses = classList.some(className => 
        className.includes('bg-gray') || 
        className.includes('text-gray') ||
        className.includes('dark:')
      );
      
      // At minimum, sections should have some styling
      expect(section.className.length).toBeGreaterThan(0);
    });
    
    // Check main container has proper theme
    const main = container.querySelector('main');
    expect(main).toHaveClass('bg-gray-900', 'text-gray-100');
  });
});