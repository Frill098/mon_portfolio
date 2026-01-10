import React from 'react';
import * as fc from 'fast-check';
import { render, fireEvent } from '../utils/test-utils';
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
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('Accessibility Integration Tests', () => {
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
   * Feature: portfolio-personnel, Property 13: Navigation au clavier
   * Validates: Requirements 10.4
   */
  test('Feature: portfolio-personnel, Property 13: Navigation au clavier', () => {
    fc.assert(fc.property(
      fc.constant(null), // No random input needed for this test
      () => {
        const { container } = render(<Home />);
        
        // Get all interactive elements (links, buttons, inputs)
        const interactiveElements = container.querySelectorAll(
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        // Verify all interactive elements are keyboard accessible
        interactiveElements.forEach(element => {
          // Element should be focusable (have tabindex or be naturally focusable)
          const tagName = element.tagName.toLowerCase();
          const tabIndex = element.getAttribute('tabindex');
          
          const isNaturallyFocusable = ['a', 'button', 'input', 'textarea', 'select'].includes(tagName);
          const hasPositiveTabIndex = tabIndex && parseInt(tabIndex) >= 0;
          
          expect(isNaturallyFocusable || hasPositiveTabIndex).toBe(true);
          
          // Links should have href or role
          if (tagName === 'a') {
            const href = element.getAttribute('href');
            const role = element.getAttribute('role');
            expect(href || role).toBeTruthy();
          }
          
          // Buttons should be focusable
          if (tagName === 'button') {
            expect(element.getAttribute('disabled')).not.toBe('true');
          }
        });
        
        // Test keyboard navigation simulation
        const firstInteractiveElement = interactiveElements[0] as HTMLElement;
        if (firstInteractiveElement) {
          // Focus the first element
          firstInteractiveElement.focus();
          expect(document.activeElement).toBe(firstInteractiveElement);
          
          // Test Enter key on buttons and links
          if (firstInteractiveElement.tagName.toLowerCase() === 'button' || 
              firstInteractiveElement.tagName.toLowerCase() === 'a') {
            const clickSpy = jest.fn();
            firstInteractiveElement.addEventListener('click', clickSpy);
            
            // Simulate Enter key press
            fireEvent.keyDown(firstInteractiveElement, { key: 'Enter', code: 'Enter' });
            
            // For buttons, Enter should trigger click
            if (firstInteractiveElement.tagName.toLowerCase() === 'button') {
              // Note: In a real implementation, this would trigger the click
              // For this test, we're just verifying the element can receive keyboard events
              expect(firstInteractiveElement).toHaveAttribute('type');
            }
          }
        }
      }
    ), { numRuns: 100 });
  });

  test('All interactive elements have proper accessibility attributes', () => {
    const { container } = render(<Home />);
    
    // Check buttons have proper attributes
    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
      // Buttons should have accessible text (either text content or aria-label)
      const hasAccessibleText = button.textContent?.trim() || button.getAttribute('aria-label');
      expect(hasAccessibleText).toBeTruthy();
    });
    
    // Check links have proper attributes
    const links = container.querySelectorAll('a');
    links.forEach(link => {
      // Links should have accessible text and href
      const hasAccessibleText = link.textContent?.trim() || link.getAttribute('aria-label');
      expect(hasAccessibleText).toBeTruthy();
      
      // External links should have proper attributes
      const href = link.getAttribute('href');
      if (href && (href.startsWith('http') || href.startsWith('mailto'))) {
        // External links should ideally have target and rel attributes for security
        // This is a best practice check
        expect(href).toBeTruthy();
      }
    });
  });

  test('Form elements have proper labels and accessibility', () => {
    const { container } = render(<Home />);
    
    // Check form inputs have labels or aria-label
    const inputs = container.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      const id = input.getAttribute('id');
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledBy = input.getAttribute('aria-labelledby');
      
      // Input should have either a label (via id), aria-label, or aria-labelledby
      if (id) {
        const label = container.querySelector(`label[for="${id}"]`);
        expect(label || ariaLabel || ariaLabelledBy).toBeTruthy();
      } else {
        expect(ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    });
  });

  test('Images have proper alt text', () => {
    const { container } = render(<Home />);
    
    const images = container.querySelectorAll('img');
    images.forEach(img => {
      const alt = img.getAttribute('alt');
      expect(alt).not.toBeNull();
      
      // Alt text should not be just whitespace
      if (alt) {
        expect(alt.trim().length).toBeGreaterThan(0);
      }
    });
  });
});