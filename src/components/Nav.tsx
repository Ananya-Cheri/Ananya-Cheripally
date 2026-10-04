"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Magnetic } from "@/components/motion-primitives/magnetic";
import { links } from "@/content/portfolio";

const SECTIONS = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

// Sections without their own menu item light up their neighbour's.
const ALIASES: Record<string, string> = { skills: "about", leadership: "education" };

// Highlights whichever section sits in the middle of the screen.
function useActiveSection() {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const ids = [...SECTIONS.map((s) => s.id), ...Object.keys(ALIASES)];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(ALIASES[e.target.id] ?? e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export default function Nav() {
  const active = useActiveSection();
  const [hovered, setHovered] = useState<string | null>(null);
  const lit = hovered ?? active;

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-center px-3 py-4 md:justify-between md:px-10 lg:px-16"
    >
      <a href="#top" className="hidden font-display text-2xl italic tracking-tight md:block">
        ac<span className="text-rose">.</span>
      </a>

      {/* cute pill menu */}
      <nav aria-label="Sections" className="md:absolute md:left-1/2 md:-translate-x-1/2">
        <ul
          onMouseLeave={() => setHovered(null)}
          className="flex items-center rounded-full bg-ink p-1 shadow-[0_12px_30px_-12px_rgba(31,25,21,0.55)] sm:gap-1 sm:p-1.5"
        >
          {SECTIONS.map((s) => (
            <li key={s.id} className="relative">
              {lit === s.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-rose"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <a
                href={`#${s.id}`}
                onMouseEnter={() => setHovered(s.id)}
                aria-current={active === s.id ? "true" : undefined}
                className={`relative block rounded-full px-[7px] py-1.5 text-[11.5px] font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                  lit === s.id ? "text-white" : "text-paper/75 hover:text-paper"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Magnetic intensity={0.35} range={90}>
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ananya's GitHub profile"
          className="group hidden items-center gap-2 rounded-full border border-ink/15 bg-paper/70 px-4 py-2 text-sm font-medium backdrop-blur transition-colors hover:border-ink hover:bg-ink hover:text-paper md:flex"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4 transition-transform duration-500 group-hover:rotate-[360deg]">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.15c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
          </svg>
          GitHub
        </a>
      </Magnetic>
    </motion.header>
  );
}
