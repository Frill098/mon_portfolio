/**
 * Performance monitoring utilities
 */

// Web Vitals tracking
export function trackWebVitals() {
  if (typeof window === 'undefined') return;

  // Track Core Web Vitals
  import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
    onCLS(console.log);
    onINP(console.log);
    onFCP(console.log);
    onLCP(console.log);
    onTTFB(console.log);
  }).catch(() => {
    // Web vitals not available
  });
}

// Performance observer for monitoring
export function initPerformanceObserver() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 50) {
          console.warn('Long task detected:', {
            name: entry.name,
            duration: entry.duration,
            startTime: entry.startTime,
          });
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['longtask'] });
    } catch {
      // Longtask observer not supported
    }
  }

  // Monitor navigation timing
  if ('performance' in window && 'getEntriesByType' in performance) {
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
      const navigation = navigationEntries[0] as PerformanceNavigationTiming;
      console.log('Navigation timing:', {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstByte: navigation.responseStart - navigation.requestStart,
      });
    }
  }
}

// Image loading performance
export function trackImagePerformance(img: HTMLImageElement, src: string) {
  const startTime = performance.now();
  
  img.onload = () => {
    const loadTime = performance.now() - startTime;
    console.log(`Image loaded: ${src} (${Math.round(loadTime)}ms)`);
  };
  
  img.onerror = () => {
    console.error(`Image failed to load: ${src}`);
  };
}

// Lazy loading intersection observer
export function createLazyLoadObserver(callback: (entries: IntersectionObserverEntry[]) => void) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px',
    threshold: 0.01,
  });
}

// Memory usage monitoring (if available)
export function monitorMemoryUsage() {
  if (typeof window === 'undefined') return;

  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.log('Memory usage:', {
      used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
      total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB',
    });
  }
}