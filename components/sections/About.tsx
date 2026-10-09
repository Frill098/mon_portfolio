"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { PersonalInfo, Statistic } from "@/lib/types";
import { SPRING_EASE } from "@/lib/constants";

interface AboutProps {
  biography: string[];
  stats: Statistic[];
  personalInfo: PersonalInfo;
}

const SPRING = { ease: SPRING_EASE, duration: 0.7 };

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: SPRING },
};

export default function About({ biography, stats, personalInfo }: AboutProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const close = useCallback(() => setLightboxOpen(false), []);

  // Close on Escape key
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, close]);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  return (
    <section id="about" className="py-28 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Section header */}
          <motion.div variants={item} className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
              À propos
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Qui suis-je ?
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — avatar + stats */}
            <motion.div variants={item} className="space-y-8">

              {/* Avatar — clickable */}
              <button
                onClick={() => setLightboxOpen(true)}
                aria-label="Voir la photo en taille réelle"
                className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-violet-500/30 shadow-xl hover:border-violet-500/60 hover:scale-105 transition-all duration-300 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              >
                <Image
                  src={personalInfo.avatar}
                  alt={`Photo de profil de ${personalInfo.fullName}`}
                  fill
                  priority
                  className="object-cover"
                />
              </button>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center p-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
                  >
                    <span className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                      {stat.value}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 text-center mt-1 leading-tight">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — biography */}
            <motion.div variants={item} className="space-y-5">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Mon parcours
              </h3>
              {biography.slice(0, 3).map((para, i) => (
                <p
                  key={i}
                  className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base"
                >
                  {para}
                </p>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={close}
          >
            {/* Close button */}
            <button
              onClick={close}
              aria-label="Fermer"
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{ scale: 0.85,    opacity: 0 }}
              transition={{ duration: 0.25, ease: SPRING_EASE }}
              className="relative w-[min(90vw,480px)] h-[min(90vw,480px)] rounded-full overflow-hidden border-4 border-violet-500/40 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={personalInfo.avatar}
                alt={`Photo de profil de ${personalInfo.fullName}`}
                fill
                className="object-cover"
                sizes="480px"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
