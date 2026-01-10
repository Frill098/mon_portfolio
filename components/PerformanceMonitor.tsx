'use client';

import { useEffect } from 'react';
import { trackWebVitals, initPerformanceObserver, monitorMemoryUsage } from '@/lib/performance';

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in development or when explicitly enabled
    if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING === 'true') {
      trackWebVitals();
      initPerformanceObserver();
      
      // Monitor memory usage every 30 seconds
      const memoryInterval = setInterval(monitorMemoryUsage, 30000);
      
      return () => {
        clearInterval(memoryInterval);
      };
    }
  }, []);

  // This component doesn't render anything
  return null;
}