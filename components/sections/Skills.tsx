"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SkillCategory, Skill } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { SPRING_EASE } from "@/lib/constants";

interface SkillsProps {
  skillCategories: SkillCategory[];
}

const SPRING = { ease: SPRING_EASE, duration: 0.6 };

const levelConfig: Record<string, { label: string; color: string; pct: number }> = {
  expert:       { label: "Expert",        color: "bg-emerald-500", pct: 100 },
  advanced:     { label: "Avancé",        color: "bg-violet-500",  pct: 80  },
  intermediate: { label: "Intermédiaire", color: "bg-amber-500",   pct: 60  },
  beginner:     { label: "Débutant",      color: "bg-zinc-400",    pct: 40  },
};

function SkillChip({ skill }: { skill: Skill }) {
  const cfg = levelConfig[skill.level ?? "beginner"];

  return (
    <div className="flex items-center justify-between gap-4 py-2 px-3 rounded-md border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:border-violet-400/60 dark:hover:border-violet-500/40 transition-colors">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-zinc-500 dark:text-zinc-400 shrink-0">
          <SkillIcon name={skill.name} className="w-4 h-4" />
        </span>
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate">
          {skill.name}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {/* Progress bar — width set via inline style to avoid SSR class mismatch */}
        <div className="w-16 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          <div
            className={`h-full rounded-full ${cfg.color}`}
            style={{ width: `${cfg.pct}%` }}
          />
        </div>
        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 w-20 text-right leading-none">
          {cfg.label}
        </span>
      </div>
    </div>
  );
}

export default function Skills({ skillCategories }: SkillsProps) {
  const nonEmpty = skillCategories.filter(
    (c) => c.skills?.length > 0 && c.title.trim().length > 0
  );

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: SPRING },
  };

  return (
    <section id="skills" className="py-28 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          {/* Header */}
          <motion.div variants={item} className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
              Compétences
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Ce que je maîtrise
            </h2>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={item}>
            <Tabs defaultValue={nonEmpty[0]?.title ?? ""}>
              <TabsList className="flex flex-wrap h-auto gap-1 mb-2">
                {nonEmpty.map((cat) => (
                  <TabsTrigger key={cat.title} value={cat.title}>
                    {cat.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {nonEmpty.map((cat) => (
                <TabsContent key={cat.title} value={cat.title}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={cat.title}
                      variants={container}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0 }}
                      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
                    >
                      {cat.skills.map((skill) => (
                        <motion.div key={skill.name} variants={item}>
                          <SkillChip skill={skill} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
