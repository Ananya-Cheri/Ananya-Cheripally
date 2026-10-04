"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { links, projectCategories, projects, projectsIntro } from "@/content/portfolio";
import { Reveal, SectionTitle } from "./Reveal";

const CATEGORY_STYLE: Record<string, { chip: string; icon: string }> = {
  "Data Engineering": { chip: "bg-[#fdeef0] text-[#c2566a]", icon: "⚙️" },
  Databases: { chip: "bg-[#edf4fd] text-[#3f6fb5]", icon: "🗄️" },
  "Machine Learning": { chip: "bg-[#fdf6e2] text-[#a7791b]", icon: "🧠" },
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="flex min-h-svh scroll-mt-24 flex-col justify-center px-5 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionTitle n="04" label="Projects">
              Featured <em className="text-rose">projects</em>
            </SectionTitle>
            <Reveal delay={0.05}>
              <p className="mt-4 max-w-xl text-lg text-ink/65">{projectsIntro}</p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium underline decoration-rose decoration-2 underline-offset-4"
            >
              More on GitHub
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>

        {/* filter tabs */}
        <Reveal delay={0.12}>
          <div role="tablist" aria-label="Filter projects" className="mt-10 inline-flex flex-wrap gap-1 rounded-3xl border border-ink/10 bg-[#fffaf2] p-1.5 sm:rounded-full">
            {projectCategories.map((c) => {
              const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={filter === c}
                  onClick={() => setFilter(c)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${filter === c ? "text-white" : "text-ink/65 hover:text-ink"}`}
                >
                  {filter === c && (
                    <motion.span layoutId="project-filter" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                  )}
                  <span className="relative">
                    {c} <span className={filter === c ? "text-white/60" : "text-ink/35"}>{count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => {
              const style = CATEGORY_STYLE[p.category];
              return (
                <motion.article
                  key={p.title}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease }}
                  className="group flex flex-col rounded-3xl border border-ink/10 bg-[#fffaf2] p-7 transition-[box-shadow,border-color] duration-500 hover:border-rose/40 hover:shadow-[0_30px_60px_-30px_rgba(70,40,20,0.35)] sm:p-8"
                >
                  <span className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${style.chip}`}>
                    {style.icon} {p.category}
                  </span>
                  <h3 className="mt-4 font-display text-3xl leading-tight">
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="hover:text-rose">
                        {p.title} ↗
                      </a>
                    ) : (
                      p.title
                    )}
                  </h3>
                  <p className="mt-1 text-sm text-ink/50">{p.context}</p>
                  <p className="mt-4 flex-1 leading-relaxed text-ink/75">{p.summary}</p>

                  <dl className="mt-6 grid grid-cols-3 gap-3">
                    {p.stats.map((s) => (
                      <div key={s.value + s.label} className="rounded-2xl bg-paper px-2 py-3 text-center">
                        <dt className="sr-only">{s.label}</dt>
                        <dd className="break-words font-display text-xl leading-none text-rose sm:text-2xl">{s.value}</dd>
                        <dd className="mt-1.5 text-xs leading-tight text-ink/55">{s.label}</dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li key={t} className="chip bg-ink/5 px-3 py-1 text-xs font-medium">
                        {t}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
