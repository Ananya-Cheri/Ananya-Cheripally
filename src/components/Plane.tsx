"use client";

import { useEffect, useRef } from "react";

// A little plane that flies with the scroll. It takes off from off-screen and lands on
// each section's [data-landing] pad in turn, leaving a dotted contrail.
// Its on-screen position eases toward the scroll-driven target, so it always glides slowly.
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const TAU = Math.PI * 2;

type Pt = { x: number; y: number };

// Every leg follows the same flowing pattern: a smooth S-curve across the screen
// with gentle, evenly spaced waves riding on top — like a ribbon unfurling.
const flight = (q: number, A: Pt, B: Pt, vw: number, vh: number, dir: number): Pt => {
  const fade = Math.sin(Math.PI * q); // calm at take-off and landing, widest mid-flight
  const x = lerp(A.x, B.x, q) + Math.sin(TAU * q) * vw * 0.22 * dir;
  const y = lerp(A.y, B.y, q) - fade * vh * 0.1 + Math.sin(q * TAU * 3) * 34 * fade;
  return { x, y };
};

export default function Plane() {
  const plane = useRef<HTMLDivElement>(null);
  const trail = useRef<SVGPolylineElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, rot = 0;
    let shown: Pt | null = null;
    const points: Pt[] = []; // trail, in page coordinates

    const frame = (time: number) => {
      const el = plane.current;
      if (!el) return;
      const s = scrollY, vh = innerHeight, vw = innerWidth;

      // stops: an off-screen start, then every landing pad (viewport coords + when we "arrive")
      const stops = [{ x: -90, y: vh * 0.3, at: 0 }];
      document.querySelectorAll<HTMLElement>("[data-landing]").forEach((pad) => {
        const r = pad.getBoundingClientRect();
        stops.push({ x: r.left + 26, y: r.top - 16, at: Math.max(r.top + s - vh * 0.4, stops[stops.length - 1].at + 1) });
      });

      let k = stops.length - 1;
      while (k > 0 && s < stops[k].at) k--;
      const A = stops[k], B = stops[Math.min(k + 1, stops.length - 1)];
      const t = B === A ? 1 : clamp01((s - A.at) / (B.at - A.at));
      // sit on the pad for the first and last bit of each leg, fly in between
      const u = B === A ? 0 : smooth(clamp01((t - 0.15) / 0.7));
      const target = u === 0 ? A : u === 1 ? B : flight(u, A, B, vw, vh, k % 2 ? -1 : 1);
      const flying = u > 0 && u < 1;

      // glide toward the target instead of snapping — keeps it slow and floaty
      // ease toward the target, but never faster than a gentle cruising speed (px per frame)
      if (!shown) shown = { ...target };
      else {
        const ease = flying ? 0.025 : 0.08;
        const maxStep = flying ? 3.2 : 14;
        let dx = (target.x - shown.x) * ease, dy = (target.y - shown.y) * ease;
        const step = Math.hypot(dx, dy);
        if (step > maxStep) {
          dx *= maxStep / step;
          dy *= maxStep / step;
        }
        shown = { x: shown.x + dx, y: shown.y + dy };
      }
      const prev = points.length ? { x: points[points.length - 1].x, y: points[points.length - 1].y - s } : shown;
      const moving = Math.hypot(shown.x - prev.x, shown.y - prev.y) > 0.4;

      const heading = moving && flying ? (Math.atan2(shown.y - prev.y, shown.x - prev.x) * 180) / Math.PI : 0;
      rot += ((((heading - rot) % 360) + 540) % 360 - 180) * 0.08;
      const bob = flying ? Math.sin(time / 300) * 1.5 : Math.sin(time / 500) * 2;

      el.style.transform = `translate(${shown.x}px, ${shown.y + bob}px) translate(-50%, -50%) rotate(${rot}deg)`;

      // dotted contrail behind the plane
      if (flying && moving) points.push({ x: shown.x, y: shown.y + s });
      else if (points.length) points.shift();
      if (points.length > 90) points.shift();
      trail.current?.setAttribute("points", points.map((q) => `${q.x.toFixed(1)},${(q.y - s).toFixed(1)}`).join(" "));

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <svg className="absolute inset-0 size-full">
        <polyline ref={trail} fill="none" stroke="#d9707a" strokeWidth="2.5" strokeDasharray="2 9" strokeLinecap="round" opacity=".5" />
      </svg>
      <div ref={plane} className="absolute left-0 top-0 w-16 will-change-transform">
        <div>
          <svg viewBox="0 0 80 50" className="w-full drop-shadow-[0_6px_6px_rgba(70,40,20,0.18)]">
            {/* tail + back wing */}
            <path d="M8,22 L2,6 Q2,3 6,4 L18,18 Z" fill="#d9707a" />
            <path d="M30,24 L22,10 Q21,7 25,8 L40,22 Z" fill="#c95f6b" />
            {/* body */}
            <path d="M6,24 Q6,15 22,15 L58,15 Q72,15 74,25 Q72,34 58,34 L18,34 Q6,33 6,24 Z" fill="#f4a3b0" />
            <path d="M18,30 L62,30" stroke="#e98d9c" strokeWidth="2" strokeLinecap="round" />
            {/* window with a little face */}
            <circle cx="56" cy="23" r="6" fill="#fffaf2" stroke="#d9707a" strokeWidth="1.5" />
            <circle cx="54.5" cy="22.5" r="1" fill="#2b1a12" />
            <circle cx="58" cy="22.5" r="1" fill="#2b1a12" />
            <path d="M54.5,25 Q56.3,26.5 58,25" fill="none" stroke="#2b1a12" strokeWidth="1" strokeLinecap="round" />
            <circle cx="44" cy="23" r="3.2" fill="#fffaf2" opacity=".9" />
            <circle cx="35" cy="23" r="3.2" fill="#fffaf2" opacity=".9" />
            {/* front wing */}
            <path d="M34,27 L24,44 Q23,47 27,46 L46,29 Z" fill="#d9707a" />
            {/* little wheels */}
            <circle cx="30" cy="37" r="2.6" fill="#5b4a42" />
            <circle cx="56" cy="37" r="2.6" fill="#5b4a42" />
            {/* propeller */}
            <circle cx="75" cy="25" r="2.2" fill="#f6d26b" />
            <g className="origin-[76px_25px] animate-propeller">
              <ellipse cx="76" cy="25" rx="1.6" ry="11" fill="#5b4a42" opacity=".75" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
