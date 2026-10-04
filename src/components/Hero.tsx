"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { TextLoop } from "@/components/motion-primitives/text-loop";
import Avatar from "@/components/Avatar";
import { useEyeTracking } from "@/components/useEyeTracking";

// ✏️ Placeholder wording — swap in your own.
const ROLE = "Data-driven techie";
const BUILDING = [
  "data pipelines",
  "insightful dashboards",
  "machine learning models",
  "stories from data",
  "smarter decisions with data",
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const svg = useRef<SVGSVGElement>(null);

  // ---- scroll: the hero holds still while the name lifts away and the portrait settles
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const nameY = useTransform(scrollYProgress, [0, 0.7], [0, -140]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const nameBlur = useTransform(scrollYProgress, [0, 0.55], ["blur(0px)", "blur(10px)"]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.84]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // ---- cursor: portrait and name drift in opposite directions for depth
  const mx = useMotionValue(0), my = useMotionValue(0);
  const spring = { stiffness: 60, damping: 18, mass: 0.6 };
  const sx = useSpring(mx, spring), sy = useSpring(my, spring);
  const portraitX = useTransform(sx, (v) => v * 12);
  const portraitTiltY = useTransform(sy, (v) => v * 6);
  const portraitRotate = useTransform(sx, (v) => v * 1.2);
  const nameX = useTransform(sx, (v) => v * -16);
  const nameTiltY = useTransform(sy, (v) => v * -6);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      mx.set((e.clientX / innerWidth) * 2 - 1);
      my.set((e.clientY / innerHeight) * 2 - 1);
    };
    addEventListener("pointermove", move);
    return () => removeEventListener("pointermove", move);
  }, [mx, my]);
  useEyeTracking(svg);

  return (
    <section id="top" ref={section} className="relative h-[170svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* name + role */}
        <motion.div
          style={reduce ? undefined : { y: nameY, opacity: nameOpacity, filter: nameBlur }}
          className="absolute inset-x-0 top-[13svh] z-10 px-5 sm:px-10 md:top-[24svh] lg:px-16"
        >
          <motion.div style={reduce ? undefined : { x: nameX, y: nameTiltY }}>
            <TextEffect as="p" per="char" preset="fade-in-blur" delay={0.15} className="font-hand text-3xl text-rose sm:text-4xl">
              hi, I&apos;m
            </TextEffect>
            <h1 className="font-display leading-[0.85] tracking-tight text-ink">
              <TextEffect
                as="span"
                per="char"
                preset="fade-in-blur"
                delay={0.35}
                speedReveal={0.9}
                className="block text-[clamp(4.5rem,17vw,13rem)]"
              >
                Ananya
              </TextEffect>
              <TextEffect
                as="span"
                per="char"
                preset="fade-in-blur"
                delay={0.65}
                speedReveal={1.1}
                className="block text-[clamp(2.6rem,9.5vw,7.5rem)] italic text-ink/85"
              >
                Cheripally
              </TextEffect>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8, ease }}
              className="mt-6 max-w-md text-base text-ink/75 sm:text-lg md:mt-8"
            >
              <span className="font-medium text-ink">{ROLE}</span> building{" "}
              <TextLoop
                interval={2.6}
                className="inline-flex align-baseline"
                transition={{ duration: 0.45, ease }}
                variants={{
                  initial: { y: 14, opacity: 0, filter: "blur(4px)" },
                  animate: { y: 0, opacity: 1, filter: "blur(0px)" },
                  exit: { y: -14, opacity: 0, filter: "blur(4px)" },
                }}
              >
                {BUILDING.map((b) => (
                  <span key={b} className="font-hand text-2xl leading-none text-rose sm:text-3xl">
                    {b}
                  </span>
                ))}
              </TextLoop>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* illustrated me, eyes follow the cursor */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease }}
          className="absolute bottom-0 left-1/2 w-[min(100vw,60svh)] -translate-x-1/2 md:left-auto md:right-[2vw] md:w-[min(50vw,88svh)] md:translate-x-0"
        >
          <motion.div style={reduce ? undefined : { scale: portraitScale, y: portraitY }} className="origin-bottom">
            <motion.div
              style={reduce ? undefined : { x: portraitX, y: portraitTiltY, rotate: portraitRotate }}
              className="origin-bottom will-change-transform"
            >
              <Avatar ref={svg} className="block h-auto w-full select-none" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-7 left-5 z-10 hidden items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-ink/60 sm:left-10 md:flex lg:left-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <span className="relative h-10 w-px overflow-hidden bg-ink/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-scrollline bg-ink/70" />
            </span>
            scroll
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
