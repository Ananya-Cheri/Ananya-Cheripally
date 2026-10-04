import { experience, education, achievements, certifications, leadership } from "@/content/portfolio";
import { Reveal, SectionTitle } from "./Reveal";

type Item = {
  when: string;
  title: string;
  org: string;
  place?: string;
  note?: string;
  points?: readonly string[];
  project?: { name: string; detail: string };
  tags?: readonly string[];
};

function Timeline({ items }: { items: readonly Item[] }) {
  return (
    <ol className="relative mt-14 space-y-8 border-l-2 border-dashed border-rose/40 pl-8 sm:pl-12">
      {items.map((it, i) => (
        <Reveal key={it.title + it.when} delay={i * 0.1}>
          <li className="relative">
            {/* dot on the dotted flight line */}
            <span className="absolute -left-[41px] top-8 size-4 rounded-full border-4 border-paper bg-rose sm:-left-[57px]" />
            <div className="rounded-3xl border border-ink/10 bg-[#fffaf2] p-6 transition-[box-shadow,border-color] duration-300 hover:border-rose/40 hover:shadow-[0_24px_50px_-30px_rgba(70,40,20,0.35)] sm:p-8">
              <span className="inline-block rounded-full bg-rose/10 px-3 py-1 text-xs font-medium text-rose">{it.when}</span>
              <h3 className="mt-3 font-display text-3xl leading-tight">{it.title}</h3>
              <p className="mt-1 font-medium text-ink/80">
                {it.org}
                {it.place && <span className="font-normal text-ink/50"> · {it.place}</span>}
              </p>
              {it.note && <p className="mt-1 font-hand text-xl text-ink/55">{it.note}</p>}

              {it.points && (
                <ul className="mt-5 space-y-2.5">
                  {it.points.map((p) => (
                    <li key={p} className="flex gap-3 leading-relaxed text-ink/75">
                      <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-rose" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}

              {it.project && (
                <div className="mt-6 rounded-2xl border border-dashed border-rose/40 bg-rose/5 p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose">✈ Key project</p>
                  <p className="mt-2 font-display text-xl">{it.project.name}</p>
                  <p className="mt-1 leading-relaxed text-ink/70">{it.project.detail}</p>
                </div>
              )}

              {it.tags && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {it.tags.map((t) => (
                    <li key={t} className="chip bg-ink/5 px-3 py-1 text-xs font-medium">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

export function Experience() {
  return (
    <section id="experience" className="flex min-h-svh scroll-mt-24 flex-col justify-center px-5 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-4xl">
        <SectionTitle n="03" label="Experience">
          Where I&apos;ve <em className="text-rose">worked</em>
        </SectionTitle>
        <Timeline items={experience} />
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="flex min-h-svh scroll-mt-24 flex-col justify-center px-5 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-4xl">
        <SectionTitle n="05" label="Education">
          Where I&apos;ve <em className="text-rose">learned</em>
        </SectionTitle>
        <Timeline items={education} />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl bg-ink p-7 text-paper">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose">🏆 Achievements</p>
              {achievements.map((a) => (
                <div key={a.name} className="mt-4">
                  <p className="font-display text-2xl leading-snug">{a.name}</p>
                  <p className="mt-2 leading-relaxed text-paper/70">{a.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="h-full rounded-3xl border border-ink/10 bg-[#fffaf2] p-7">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose">📜 Certifications</p>
              <ul className="mt-4 space-y-2">
                {certifications.map((c) => {
                  const body = (
                    <>
                      <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full bg-rose/15 text-sm text-rose transition-colors group-hover:bg-rose group-hover:text-white">
                        ✓
                      </span>
                      <span className="flex-1">{c.name}</span>
                      {c.url && (
                        <span aria-hidden className="text-base text-rose transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                          ↗
                        </span>
                      )}
                    </>
                  );
                  return (
                    <li key={c.name}>
                      {c.url ? (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View my ${c.name} certificate`}
                          className="group -mx-3 flex items-center gap-3 rounded-2xl px-3 py-2 font-display text-xl transition-colors hover:bg-rose/10 hover:text-rose"
                        >
                          {body}
                        </a>
                      ) : (
                        <div className="group -mx-3 flex items-center gap-3 px-3 py-2 font-display text-xl">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
              {/* cute hint that the certificates open */}
              <p className="mt-5 flex items-center gap-2 font-hand text-xl text-ink/60">
                <span aria-hidden className="inline-block -rotate-12 text-rose">✎</span>
                psst… click a certificate to see the real thing ✨
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Leadership() {
  return (
    <section id="leadership" className="flex min-h-svh scroll-mt-24 flex-col justify-center px-5 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-4xl">
        <SectionTitle n="06" label="Leadership & Volunteering">
          Giving <em className="text-rose">back</em>
        </SectionTitle>
        <Timeline items={leadership} />
      </div>
    </section>
  );
}
