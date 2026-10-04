"use client";

import { useEffect, type RefObject } from "react";

// Eases every [data-pupil] group inside the SVG toward the cursor.
// Each pupil carries its eye centre (data-cx/cy, in viewBox units) and how far it may travel.
export function useEyeTracking(svg: RefObject<SVGSVGElement | null>) {
  useEffect(() => {
    let px = innerWidth / 2, py = innerHeight / 2, raf = 0;
    const offsets = new WeakMap<Element, { x: number; y: number }>();
    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
    };

    const tick = () => {
      const el = svg.current, box = el?.getBoundingClientRect();
      if (el && box && box.bottom > 0 && box.top < innerHeight) {
        const k = box.width / el.viewBox.baseVal.width;
        el.querySelectorAll<SVGGElement>("[data-pupil]").forEach((p) => {
          const cx = Number(p.dataset.cx), cy = Number(p.dataset.cy);
          const tx = Number(p.dataset.travel), ty = Number(p.dataset.travelY ?? tx);
          const dx = px - (box.left + cx * k), dy = py - (box.top + cy * k);
          const d = Math.hypot(dx, dy) || 1, pull = Math.min(d / 240, 1);
          const o = offsets.get(p) ?? { x: 0, y: 0 };
          o.x += ((dx / d) * pull * tx - o.x) * 0.18;
          o.y += ((dy / d) * pull * ty - o.y) * 0.18;
          offsets.set(p, o);
          p.setAttribute("transform", `translate(${o.x.toFixed(2)} ${o.y.toFixed(2)})`);
        });
      }
      raf = requestAnimationFrame(tick);
    };

    addEventListener("pointermove", move);
    tick();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
    };
  }, [svg]);
}
