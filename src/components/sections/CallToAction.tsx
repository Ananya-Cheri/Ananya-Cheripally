import { links } from "@/content/portfolio";
import { Magnetic } from "@/components/motion-primitives/magnetic";
import { Reveal } from "./Reveal";

export default function CallToAction() {
  return (
    <section className="px-5 py-16 sm:px-10 lg:px-16">
      <Reveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-ink/10 bg-[#fffaf2] px-6 py-16 text-center sm:px-12">
          {/* soft decorative blobs */}
          <span aria-hidden className="absolute -left-16 -top-16 size-56 rounded-full bg-rose/10 blur-2xl" />
          <span aria-hidden className="absolute -bottom-20 -right-10 size-64 rounded-full bg-[#f6d26b]/20 blur-2xl" />

          <h2 className="relative font-display text-4xl leading-tight tracking-tight sm:text-6xl">
            Looking for a Graduate <em className="text-rose">Data Engineer</em> or <em className="text-rose">Analyst?</em>
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg text-ink/65">
            Take a look at my projects or download my résumé for the full details.
          </p>

          <div className="relative mt-10 flex flex-wrap justify-center gap-4">
            <Magnetic intensity={0.25} range={80}>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 font-medium transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                View my work <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <Magnetic intensity={0.25} range={80}>
              <a
                href={links.resume || undefined}
                download={links.resume ? "" : undefined}
                aria-disabled={!links.resume}
                className={`inline-flex items-center gap-2 rounded-full bg-rose px-7 py-3.5 font-medium text-white transition-transform ${
                  links.resume ? "hover:scale-105" : "opacity-60"
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-5">
                  <path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                </svg>
                {links.resume ? "Download résumé" : "Résumé coming soon"}
              </a>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
