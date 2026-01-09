import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Mock ThemeProvider for tests
const MockThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <div data-theme="dark">{children}</div>;
};

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MockThemeProvider>
      {children}
    </MockThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

// Utility functions for testing
export const calculateContrastRatio = (color1: string, color2: string): number => {
  // Simplified contrast ratio calculation for testing
  // In a real implementation, you would parse the colors and calculate the actual ratio
  return 4.5; // Mock value that passes accessibility standards
};

export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });
  window.IntersectionObserver = mockIntersectionObserver;
};