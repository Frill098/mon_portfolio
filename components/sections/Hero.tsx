"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { PersonalInfo, SocialLink } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/Tooltip";
import { SPRING_EASE } from "@/lib/constants";

interface HeroProps {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
}

const SPRING = { ease: SPRING_EASE, duration: 0.7 };

const CODE_LINES = [
  { indent: 0, plain: "const daga = {" },
  { indent: 1, key: "role",     value: '"Tech Lead · Full Stack",' },
  { indent: 1, key: "location", value: '"Abomey-Calavi, Bénin",' },
  { indent: 1, key: "stack",    value: '["Laravel", "React", "Next.js"],' },
  { indent: 1, key: "status",   value: '"🟢 Disponible",' },
  { indent: 0, plain: "};" },
];

/* ─── Typing animation ─────────────────────────────────────────── */
function TypingCatchphrase({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone]           = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, 30);
    return () => clearInterval(id);
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && (
        <span
          className="inline-block w-0.5 h-5 bg-violet-500 ml-0.5 animate-pulse align-middle"
          aria-hidden="true"
        />
      )}
    </span>
  );
}

/* ─── Terminal block ────────────────────────────────────────────── */
function TerminalBlock() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setVisibleCount((v) => {
        if (v >= CODE_LINES.length) { clearInterval(id); return v; }
        return v + 1;
      });
    }, 220);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 overflow-hidden shadow-lg font-mono text-sm w-full max-w-md">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
        <span className="w-3 h-3 rounded-full bg-red-400"     aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-amber-400"   aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-emerald-400" aria-hidden="true" />
        <span className="ml-2 text-xs text-zinc-400">daga.ts</span>
      </div>
      {/* Lines */}
      <div className="p-4 space-y-1 min-h-[160px]">
        {CODE_LINES.slice(0, visibleCount).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="leading-relaxed"
            style={{ paddingLeft: `${line.indent * 1.25}rem` }}
          >
            {"plain" in line ? (
              <span className="text-zinc-800 dark:text-zinc-200">{line.plain}</span>
            ) : (
              <>
                <span className="text-zinc-500 dark:text-zinc-500">{line.key}</span>
                <span className="text-zinc-700 dark:text-zinc-300">: </span>
                <span className="text-violet-600 dark:text-violet-400">{line.value}</span>
              </>
            )}
          </motion.div>
        ))}
        {visibleCount < CODE_LINES.length && (
          <span className="inline-block w-2 h-4 bg-violet-500 animate-pulse" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────── */
export default function Hero({ personalInfo, socialLinks }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Track mouse position relative to the section and update CSS vars on the element
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    section.style.setProperty("--hero-x", `${e.clientX - rect.left}px`);
    section.style.setProperty("--hero-y", `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    const section = sectionRef.current;
    if (!section) return;
    // Reset to center so the glow fades away gracefully
    const rect = section.getBoundingClientRect();
    section.style.setProperty("--hero-x", `${rect.width / 2}px`);
    section.style.setProperty("--hero-y", `${rect.height / 2}px`);
  };

  const containerVariants = {
    hidden:   { opacity: 0 },
    visible:  { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden:   { opacity: 0, y: 24 },
    visible:  { opacity: 1, y: 0, transition: SPRING },
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950"
      /* Default CSS var values so the gradient doesn't break before first mousemove */
      style={
        { "--hero-x": "50%", "--hero-y": "50%" } as React.CSSProperties
      }
    >
      {/* ── Base dot grid (always visible, subtle) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(63,63,70,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        /* Light-mode override via a sibling — handled below */
      />

      {/* ── Light-mode dot grid (shown only in light, hidden in dark via CSS) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none block dark:hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(212,212,216,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Mouse-reveal glow layer ── */}
      {/*  Dark: violet dots revealed around cursor                              */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none hidden dark:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(139,92,246,0.25) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(200px at var(--hero-x) var(--hero-y), black 20%, transparent 100%)",
          maskImage:
            "radial-gradient(200px at var(--hero-x) var(--hero-y), black 20%, transparent 100%)",
          transition: "mask-position 0.05s ease, -webkit-mask-position 0.05s ease",
        }}
      />
      {/*  Light: soft violet glow on dots                                       */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none block dark:hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(139,92,246,0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(200px at var(--hero-x) var(--hero-y), black 20%, transparent 100%)",
          maskImage:
            "radial-gradient(200px at var(--hero-x) var(--hero-y), black 20%, transparent 100%)",
          transition: "mask-position 0.05s ease, -webkit-mask-position 0.05s ease",
        }}
      />

      {/* ── Bottom fade overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-zinc-50/0 via-zinc-50/40 to-zinc-50 dark:from-zinc-950/0 dark:via-zinc-950/40 dark:to-zinc-950"
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">

            <motion.div variants={itemVariants} className="mb-6">
              <Badge variant="success" className="gap-1.5 py-1 px-3 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                Disponible pour missions
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4"
            >
              {personalInfo.fullName}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl font-semibold gradient-text mb-6"
            >
              {personalInfo.role}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg mb-10 min-h-[3.5rem]"
            >
              <TypingCatchphrase text={personalInfo.catchphrase} />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10">
              <Button
                size="lg"
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Voir mes projets
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Me contacter
              </Button>
              <a
                href={personalInfo.cvUrl}
                download
                aria-label="Télécharger le CV"
                className="inline-flex items-center justify-center h-12 px-8 text-base font-medium rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-violet-500 hover:text-violet-600 dark:hover:border-violet-400 dark:hover:text-violet-400 transition-colors duration-200"
              >
                Télécharger CV
              </a>
            </motion.div>

            <motion.div variants={itemVariants}>
              <TooltipProvider delayDuration={200}>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <Tooltip key={social.platform}>
                      <TooltipTrigger asChild>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Profil ${social.platform}`}
                          className="p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-violet-500 hover:text-violet-600 dark:hover:border-violet-400 dark:hover:text-violet-400 transition-colors"
                        >
                          <SocialIcon platform={social.platform} className="w-5 h-5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="capitalize">{social.platform}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </motion.div>
          </motion.div>

          {/* Right — terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...SPRING, delay: 0.5 }}
            className="flex justify-center lg:justify-end"
          >
            <TerminalBlock />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <ArrowDown className="w-5 h-5 text-zinc-400 dark:text-zinc-600" />
      </motion.div>
    </section>
  );
}
