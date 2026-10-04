import type { ReactNode } from "react";
import { InView } from "@/components/motion-primitives/in-view";

// Fades + lifts its content into place the first time it scrolls into view.
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <InView
      once
      viewOptions={{ margin: "0px 0px -12% 0px" }}
      variants={{
        hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </InView>
  );
}

export function SectionTitle({
  n,
  label,
  children,
  landing = true,
}: {
  n: string;
  label: string;
  children: ReactNode;
  landing?: boolean;
}) {
  return (
    <Reveal>
      <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-ink/50">
        <span className="text-rose">{n}</span>
        <span className="h-px w-10 bg-ink/20" />
        {label}
        {/* the plane lands here */}
        {landing && <span data-landing className="inline-block h-px w-16" />}
      </p>
      <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">{children}</h2>
    </Reveal>
  );
}
