'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { APP_CONFIG } from '@/lib/constants';
import { NavItem } from '@/lib/types';

export default function Navigation() {
  const [mounted, setMounted]                           = useState(false);
  const [scrolled, setScrolled]                         = useState(false);
  const [currentActiveSection, setCurrentActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen]                     = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrentActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    APP_CONFIG.navigation.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (href: string, id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!mounted) return;
    const button = e.currentTarget;
    const rect   = button.getBoundingClientRect();
    const x      = rect.left + rect.width  / 2;
    const y      = rect.top  + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth  - x),
      Math.max(y, window.innerHeight - y)
    );
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

    if (!('startViewTransition' in document)) {
      setTheme(nextTheme);
      return;
    }

    const transitionClass = nextTheme === 'light' ? 'light-transition' : 'dark-transition';
    document.documentElement.classList.add(transitionClass);

    const transition = (document as Document & {
      startViewTransition: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
    }).startViewTransition(() => { setTheme(nextTheme); });

    transition.ready.then(() => {
      if (nextTheme === 'light') {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
          { duration: 500, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
        );
      } else {
        document.documentElement.animate(
          { clipPath: [`circle(${endRadius}px at ${x}px ${y}px)`, `circle(4px at ${x}px ${y}px)`] },
          { duration: 500, easing: 'ease-in-out', fill: 'forwards', pseudoElement: '::view-transition-old(root)' }
        );
      }
    });

    transition.finished.then(() => {
      document.documentElement.classList.remove(transitionClass);
    });
  };

  const ThemeIcon = () => {
    if (!mounted) return <span className="w-5 h-5 block" />;
    return resolvedTheme === 'dark' ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707m12.728 0-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    );
  };

  return (
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        mounted && scrolled
          ? 'bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-sm'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <button
            onClick={() => handleNavClick('#hero', 'hero')}
            className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-50 hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-200"
          >
            DG<span className="text-violet-500">.</span>DAGA
          </button>

          {/* Nav desktop */}
          <div className="hidden md:flex items-center gap-1">
            {APP_CONFIG.navigation.map((item: NavItem) => (
              <div key={item.id} className="relative">
                <button
                  onClick={() => handleNavClick(item.href, item.id)}
                  aria-current={mounted && currentActiveSection === item.id ? 'page' : undefined}
                  className={[
                    'px-3 py-2 text-sm font-medium rounded-md transition-all duration-200',
                    mounted && currentActiveSection === item.id
                      ? 'text-violet-500 dark:text-violet-400'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50',
                  ].join(' ')}
                >
                  {item.label}
                </button>
                {mounted && currentActiveSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500 rounded-full"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Actions desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Basculer le thème"
              className="p-2 rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              <ThemeIcon />
            </button>
            <a
              href="/cv/CV_Deo-Gratias_DAGA_Dev.pdf"
              download
              aria-label="Télécharger le CV"
              className="px-4 py-2 text-sm font-medium rounded-md bg-violet-600 hover:bg-violet-700 text-white transition-colors duration-200"
            >
              CV
            </a>
          </div>

          {/* Boutons mobile : thème + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Basculer le thème"
              className="p-2 rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              <ThemeIcon />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Menu principal"
              className="p-2 rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              <svg className="w-5 h-5" stroke="currentColor" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800"
          >
            <div className="px-4 py-3 flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
              {APP_CONFIG.navigation.map((item: NavItem) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href, item.id)}
                  aria-current={mounted && currentActiveSection === item.id ? 'page' : undefined}
                  className={[
                    'w-full text-left px-3 py-3 text-sm font-medium rounded-md transition-all duration-200',
                    mounted && currentActiveSection === item.id
                      ? 'text-violet-500 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800',
                  ].join(' ')}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 mt-1">
                <a
                  href="/cv/CV_Deo-Gratias_DAGA_Dev.pdf"
                  download
                  className="block w-full text-center px-4 py-3 text-sm font-medium rounded-md bg-violet-600 hover:bg-violet-700 text-white transition-colors duration-200"
                >
                  Télécharger CV
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
