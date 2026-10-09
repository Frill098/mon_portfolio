"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  FolderKanban,
  Award,
  Rocket,
} from "lucide-react";
import { Experience } from "@/lib/types";
import { sortExperiencesByDate, sortExperiencesByRelevance, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { SPRING_EASE } from "@/lib/constants";

interface ExperienceProps {
  experiences: Experience[];
  orderBy?: "chronological" | "relevance";
}

const SPRING = { ease: SPRING_EASE, duration: 0.7 };

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: SPRING },
};

function TypeIcon({ type }: { type: Experience["type"] }) {
  const cls = "w-4 h-4";
  switch (type) {
    case "education":     return <GraduationCap className={cls} aria-hidden="true" />;
    case "work":          return <Briefcase      className={cls} aria-hidden="true" />;
    case "internship":    return <Rocket         className={cls} aria-hidden="true" />;
    case "project":       return <FolderKanban   className={cls} aria-hidden="true" />;
    case "certification": return <Award          className={cls} aria-hidden="true" />;
    default:              return <Briefcase      className={cls} aria-hidden="true" />;
  }
}

const TYPE_LABEL: Record<Experience["type"], string> = {
  education:     "Formation",
  work:          "Expérience",
  internship:    "Stage",
  project:       "Projet",
  certification: "Certification",
};

export default function ExperienceSection({
  experiences,
  orderBy = "chronological",
}: ExperienceProps) {
  const sorted =
    orderBy === "chronological"
      ? sortExperiencesByDate(experiences)
      : sortExperiencesByRelevance(experiences);

  const valid = sorted.filter((e) => e.title && e.organization && e.description);

  if (!valid.length) return null;

  return (
    <section id="experience" className="py-28 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Header */}
          <motion.div variants={item} className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
              Parcours
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Expérience & Formation
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-3xl">
            {/* Vertical line */}
            <div
              className="absolute left-[23px] top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800"
              aria-hidden="true"
            />

            <div className="space-y-10">
              {valid.map((exp) => (
                <motion.div
                  key={exp.id}
                  variants={item}
                  className="relative flex gap-6"
                >
                  {/* Icon dot */}
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-violet-600 dark:text-violet-400 shadow-sm">
                    <TypeIcon type={exp.type} />
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:border-violet-400/60 dark:hover:border-violet-500/40 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 leading-snug">
                          {exp.title}
                        </h3>
                        <p className="text-sm text-violet-600 dark:text-violet-400 font-medium mt-0.5">
                          {exp.organization}
                        </p>
                        {exp.location && (
                          <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">
                            📍 {exp.location}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                          {TYPE_LABEL[exp.type]}
                        </Badge>
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                          {formatDate(exp.startDate)} —{" "}
                          {exp.current ? (
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                              Présent
                            </span>
                          ) : exp.endDate ? (
                            formatDate(exp.endDate)
                          ) : (
                            "Présent"
                          )}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded text-[11px] font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
