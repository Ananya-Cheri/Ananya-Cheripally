import { about } from "@/content/portfolio";
import Island from "./Island";
import { Reveal, SectionTitle } from "./Reveal";

export default function About() {
  return (
    <section id="about" className="flex min-h-svh scroll-mt-24 flex-col justify-center px-5 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <SectionTitle n="01" label="About" landing={false}>
            {about.heading[0]} <em className="text-rose">{about.heading[1]}</em>
          </SectionTitle>

          <Reveal delay={0.08}>
            <ul className="mt-6 flex flex-wrap gap-2">
              {about.tagline.map((t) => (
                <li key={t} className="chip bg-ink px-3 py-1 text-xs font-medium tracking-wide text-paper">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/75">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.12 + i * 0.08}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10">
              {about.facts.map((f) => (
                <div key={f.label} className="bg-[#fffaf2] p-5 sm:p-6">
                  <dt className="text-xs uppercase tracking-[0.2em] text-ink/45">{f.label}</dt>
                  <dd className="mt-2 font-display text-xl leading-snug sm:text-2xl">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* the plane touches down on this island, where I'm coding on the beach */}
        <Reveal delay={0.1}>
          <Island />
        </Reveal>
      </div>
    </section>
  );
}
