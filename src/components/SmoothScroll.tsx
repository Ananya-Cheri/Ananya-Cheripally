"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Buttery, eased scrolling for the whole page (skipped if the visitor prefers reduced motion).
export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.085, anchors: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
