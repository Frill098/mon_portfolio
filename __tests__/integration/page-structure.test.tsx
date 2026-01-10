import React from 'react';
import * as fc from 'fast-check';
import { render, screen } from '../utils/test-utils';
import Home from '../../app/page';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

// Mock framer-motion to avoid prop warnings
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileInView, whileHover, whileTap, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, whileInView, whileHover, whileTap, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, whileInView, whileHover, whileTap, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, whileInView, whileHover, whileTap, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, whileInView, whileHover, whileTap, ...props }: any) => <p {...props}>{children}</p>,
    ul: ({ children, whileInView, whileHover, whileTap, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, whileInView, whileHover, whileTap, ...props }: any) => <li {...props}>{children}</li>,
    a: ({ children, whileInView, whileHover, whileTap, ...props }: any) => <a {...props}>{children}</a>,
    button: ({ children, whileInView, whileHover, whileTap, ...props }: any) => <button {...props}>{children}</button>,
    form: ({ children, whileInView, whileHover, whileTap, ...props }: any) => <form {...props}>{children}</form>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('Page Structure Integration Tests', () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  /**
   * Feature: portfolio-personnel, Property 12: Structure HTML sémantique
   * Validates: Requirements 10.2, 10.3
   */
  test('Feature: portfolio-personnel, Property 12: Structure HTML sémantique', () => {
    fc.assert(fc.property(
      fc.constant(null), // No random input needed for this test
      () => {
        const { container } = render(<Home />);
        
        // Verify semantic HTML structure
        const main = container.querySelector('main');
        expect(main).toBeInTheDocument();
        
        // Verify all required sections exist with proper semantic tags
        const heroSection = container.querySelector('section#hero');
        const aboutSection = container.querySelector('section#about');
        const skillsSection = container.querySelector('section#skills');
        const projectsSection = container.querySelector('section#projects');
        const experienceSection = container.querySelector('section#experience');
        const contactSection = container.querySelector('section#contact');
        
        expect(heroSection).toBeInTheDocument();
        expect(aboutSection).toBeInTheDocument();
        expect(skillsSection).toBeInTheDocument();
        expect(projectsSection).toBeInTheDocument();
        expect(experienceSection).toBeInTheDocument();
        expect(contactSection).toBeInTheDocument();
        
        // Verify all images have alt attributes
        const images = container.querySelectorAll('img');
        images.forEach(img => {
          expect(img).toHaveAttribute('alt');
          expect(img.getAttribute('alt')).not.toBe('');
        });
        
        // Verify proper heading hierarchy (h1 should be unique, h2s for sections)
        const h1Elements = container.querySelectorAll('h1');
        expect(h1Elements.length).toBe(1); // Only one h1 per page
        
        const h2Elements = container.querySelectorAll('h2');
        expect(h2Elements.length).toBeGreaterThan(0); // Section headings
        
        // Verify sections are properly nested within main
        expect(main).toContainElement(heroSection);
        expect(main).toContainElement(aboutSection);
        expect(main).toContainElement(skillsSection);
        expect(main).toContainElement(projectsSection);
        expect(main).toContainElement(experienceSection);
        expect(main).toContainElement(contactSection);
      }
    ), { numRuns: 100 });
  });

  test('All sections have proper semantic structure', () => {
    const { container } = render(<Home />);
    
    // Verify each section has proper content structure
    const sections = container.querySelectorAll('section');
    sections.forEach(section => {
      // Each section should have an id
      expect(section).toHaveAttribute('id');
      
      // Each section should have some content
      expect(section.textContent?.trim()).not.toBe('');
    });
  });

  test('Page has proper document structure', () => {
    const { container } = render(<Home />);
    
    // Verify main element exists and contains all content
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
    
    // Verify main contains all sections
    const sectionsInMain = main?.querySelectorAll('section');
    expect(sectionsInMain?.length).toBeGreaterThanOrEqual(6);
  });
});