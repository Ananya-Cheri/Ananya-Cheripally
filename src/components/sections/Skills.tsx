import { skills, tools } from "@/content/portfolio";
import { InfiniteSliderStrip } from "./SkillStrip";
import { Reveal, SectionTitle } from "./Reveal";
import SkillArt from "./SkillArt";

const TINTS = ["bg-[#fdeef0]", "bg-[#edf4fd]", "bg-[#fdf6e2]"];

export default function Skills() {
  return (
    <section id="skills" className="flex min-h-svh scroll-mt-24 flex-col justify-center py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-10 lg:px-16">
        <SectionTitle n="02" label="Skills">
          My <em className="text-rose">toolkit</em>
        </SectionTitle>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {skills.map((s, i) => (
            <Reveal key={s.group} delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-[#fffaf2] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-30px_rgba(70,40,20,0.35)]">
                <div className={`${TINTS[i % TINTS.length]} px-8 pb-4 pt-8 transition-transform duration-500 group-hover:scale-[1.03]`}>
                  <SkillArt kind={s.icon} />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-3xl leading-tight">{s.group}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink/70">{s.blurb}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <li key={item} className="chip border border-ink/15 px-3 py-1 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-8 rounded-3xl border border-ink/10 bg-[#fffaf2] p-7 sm:p-8">
            <h3 className="font-display text-3xl">
              Technologies <em className="text-rose">&amp;</em> Tools
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {tools.map((t) => (
                <li
                  key={t}
                  className="chip border border-ink/15 bg-paper px-4 py-1.5 text-sm"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <InfiniteSliderStrip items={tools} />
    </section>
  );
}
