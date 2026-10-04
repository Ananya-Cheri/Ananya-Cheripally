"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { links } from "@/content/portfolio";
import { Magnetic } from "@/components/motion-primitives/magnetic";
import { Reveal } from "./Reveal";

function GitHubLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-6">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.15c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedInLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-6">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-6">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-5">
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
    </svg>
  );
}

// A cute pastel icon tile that wiggles on hover.
function Social({ href, label, color, children }: { href: string; label: string; color: string; children: ReactNode }) {
  const ready = Boolean(href);
  return (
    <a
      href={ready ? href : undefined}
      aria-label={ready ? label : `${label} (coming soon)`}
      aria-disabled={!ready}
      title={ready ? label : `${label} — coming soon`}
      {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className={`grid size-16 place-items-center rounded-2xl ${color} text-ink transition-transform duration-300 ${
        ready ? "hover:-translate-y-1 hover:rotate-[-6deg] hover:scale-110" : "opacity-50"
      }`}
    >
      {children}
    </a>
  );
}

const field =
  "w-full rounded-2xl border border-paper/15 bg-paper/[0.06] px-4 py-3.5 text-paper placeholder:text-paper/35 outline-none transition focus:border-rose focus:bg-paper/10 focus:ring-2 focus:ring-rose/30";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      location.href = `mailto:${links.email}`;
    }
  };

  // The form opens the visitor's email app with everything pre-filled.
  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim() || `Hello from ${name}`;
    const message = String(data.get("message") ?? "").trim();
    const body = `Hi Ananya,\n\n${message}\n\n— ${name} (${email})`;
    location.href = `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="scroll-mt-24 px-5 pb-16 pt-12 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-ink px-6 py-20 text-paper sm:px-12 sm:py-24">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-paper/50">
              <span className="text-rose">07</span> — Contact
              <span data-landing className="inline-block h-px w-16" />
            </p>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl">
              Let&apos;s grab a <em className="text-rose">coffee</em> ☕
            </h2>
            <p className="mx-auto mt-6 max-w-md text-lg text-paper/70">
              Let&apos;s chat! Feel free to reach out about graduate or junior opportunities, projects, or just to connect.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          {/* contact form */}
          <Reveal delay={0.1}>
            <form onSubmit={send} className="rounded-[2rem] border border-paper/10 bg-paper/[0.04] p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-paper/80">Your name</span>
                  <input name="name" required autoComplete="name" placeholder="Jane Smith" className={field} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-paper/80">Your email</span>
                  <input name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className={field} />
                </label>
              </div>
              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-medium text-paper/80">Subject</span>
                <input name="subject" placeholder="Graduate Data Engineer opportunity" className={field} />
              </label>
              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-medium text-paper/80">Message</span>
                <textarea name="message" required rows={5} placeholder="Your message…" className={`${field} resize-y`} />
              </label>
              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-rose px-6 py-4 text-lg font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                <SendIcon /> Send message
              </button>
              <p className="mt-3 text-center text-xs text-paper/45">Opens your email app with your message ready to send.</p>
            </form>
          </Reveal>

          {/* email + socials */}
          <Reveal delay={0.2}>
            <div className="flex h-full flex-col gap-10">
              <div>
                <h3 className="font-display text-3xl">Prefer email?</h3>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Magnetic intensity={0.25} range={90}>
                    <a
                      href={`mailto:${links.email}`}
                      className="inline-flex items-center gap-2 break-all rounded-full bg-paper/10 px-5 py-3 font-medium transition-colors hover:bg-rose"
                    >
                      ✉️ {links.email}
                    </a>
                  </Magnetic>
                  <button
                    onClick={copy}
                    className="rounded-full border border-paper/25 px-5 py-3 text-sm font-medium transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                  >
                    {copied ? "Copied! ✓" : "Copy email"}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-display text-3xl">Connect on social</h3>
                <div className="mt-5 flex gap-4">
                  <Social href={links.linkedin} label="LinkedIn" color="bg-[#bcd6f5]">
                    <LinkedInLogo />
                  </Social>
                  <Social href={links.github} label="GitHub" color="bg-[#f4a3b0]">
                    <GitHubLogo />
                  </Social>
                  <Social href={`mailto:${links.email}`} label="Email" color="bg-[#f6d26b]">
                    <MailIcon />
                  </Social>
                </div>
                <p className="mt-4 font-hand text-xl text-paper/55">say hi, I don&apos;t bite (I do drink a lot of coffee) ☕</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <footer className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-ink/50">
        <span className="font-display text-xl italic text-ink">
          ac<span className="text-rose">.</span>
        </span>
        <span>© {new Date().getFullYear()} Ananya Cheripally · made with data &amp; coffee</span>
        <a href="#top" className="hover:text-ink">
          back to top ↑
        </a>
      </footer>
    </section>
  );
}
