"use client";

import { useEffect, useId, useRef, type Ref } from "react";

// Original illustration of Ananya peeking over her laptop.
// Pupils are marked with data-pupil (+ their eye centre) so the hero can aim them at the cursor.

const HAIR = "#2b1711";
const HAIR_DK = "#160b07";
const HAIR_HI = "#8a4526"; // auburn highlights, like the reference portrait
const LINE = "#2a1810";
const GOLD = "#d8ae4f";

function rng(seed: number) {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

// Long, centre-parted curly hair (like the reference portrait): a silhouette that
// hugs the head and falls past the shoulders, with bouncy edges and wavy auburn strands.
const HAIR_SIDE = [
  [300, 98], [250, 102], [204, 120], [168, 152], [144, 198], [128, 252], [114, 312],
  [104, 372], [98, 432], [98, 494], [104, 560],
];
const hair = (() => {
  const r = rng(11);
  const outline = [...HAIR_SIDE, ...HAIR_SIDE.slice().reverse().map(([x, y]) => [600 - x, y])];
  const silhouette = `M${outline.map((p) => p.join(",")).join(" L")} Z`;

  // bouncy curl bumps along the outline: small on top, bigger lower down
  const bumps: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < outline.length - 1; i++) {
    const [x0, y0] = outline[i], [x1, y1] = outline[i + 1];
    const steps = Math.max(1, Math.round(Math.hypot(x1 - x0, y1 - y0) / 22));
    for (let k = 0; k < steps; k++) {
      const x = x0 + ((x1 - x0) * k) / steps, y = y0 + ((y1 - y0) * k) / steps;
      const size = y < 180 ? 10 + r() * 6 : 18 + r() * 12;
      bumps.push({ x: x + (r() - 0.5) * 8, y: y + (r() - 0.5) * 8, r: size });
    }
  }

  // loose curls: irregular wavy strands (long down the sides, short across the crown)
  // plus scattered curl loops for volume
  const strands: { d: string; hi: boolean }[] = [];
  for (let x = 116; x <= 484; x += 24 + r() * 8) {
    const mid = x > 196 && x < 404;
    const top = 112 + Math.abs(x - 300) * 0.32 + r() * 30;
    const end = mid ? 166 + r() * 8 : 430 + r() * 110;
    let d = `M${x.toFixed(1)},${top.toFixed(1)}`;
    for (let y = top, flip = r() < 0.5 ? 1 : -1; y < end; flip *= -1) {
      const w = 9 + r() * 7, h = 10 + r() * 8;
      d += ` q${(flip * w).toFixed(1)},${h.toFixed(1)} ${(flip * r() * 3).toFixed(1)},${(h * 2).toFixed(1)}`;
      y += h * 2;
    }
    strands.push({ d, hi: r() < 0.7 });
  }
  const loops: { x: number; y: number; s: number; rot: number }[] = [];
  while (loops.length < 34) {
    const x = 110 + r() * 380, y = 200 + r() * 330;
    if (Math.abs(x - 300) > 128) loops.push({ x, y, s: 6 + r() * 5, rot: r() * 360 });
  }
  return { silhouette, bumps, strands, loops };
})();

// a short ringlet: tight waves going down from (x, y)
const ringlet = (x: number, y: number, n: number, w = 7, h = 9) => {
  let d = `M${x},${y}`;
  for (let i = 0; i < n; i++) d += ` q${i % 2 ? -w : w},${h} 0,${h * 2}`;
  return d;
};

// Face shape from Ananya's portrait: full cheeks, softly tapered rounded chin.
const FACE = "M300,170 C366,170 410,220 410,288 C410,346 380,398 338,418 C324,425 312,428 300,428 C288,428 276,425 262,418 C220,398 190,346 190,288 C190,220 234,170 300,170 Z";

type Look = {
  label: string;
  skin: string;
  skinShade: string;
  eyeR: number;
  lowerLiner: boolean;
  blush: string;
  blushOpacity: number;
};

// All four match the portrait (golden-tan skin, coral blush, winged liner, rose lips);
// they differ in eye size and skin depth.
const BASE = { skin: "#c47a45", skinShade: "#a2602f", blush: "#ec6a4a", blushOpacity: 0.34, lowerLiner: false };
export const LOOKS = {
  a: { ...BASE, label: "closest to your portrait · medium round eyes", eyeR: 29 },
  b: { ...BASE, label: "big round eyes (like before)", eyeR: 33 },
  c: { ...BASE, label: "smaller eyes · full liner · more grown-up", eyeR: 25, lowerLiner: true },
  d: { ...BASE, label: "medium eyes · slightly lighter golden skin", eyeR: 29, skin: "#cf8a55", skinShade: "#ad6c3c", blushOpacity: 0.3 },
} satisfies Record<string, Look>;
export type LookName = keyof typeof LOOKS;

const EYES = [
  { cx: 252, cy: 294, side: -1 },
  { cx: 348, cy: 294, side: 1 },
];

export default function Avatar({
  ref,
  className = "",
  look: lookName = "a",
}: {
  ref?: Ref<SVGSVGElement>;
  className?: string;
  look?: LookName;
}) {
  const look: Look = LOOKS[lookName];
  const uid = useId().replace(/:/g, "");
  const blinkRef = useRef<SVGGElement>(null);

  // blink every few seconds
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const blink = () => {
      blinkRef.current?.classList.add("blinking");
      setTimeout(() => blinkRef.current?.classList.remove("blinking"), 140);
      timer = setTimeout(blink, 2600 + Math.random() * 3200);
    };
    timer = setTimeout(blink, 1800);
    return () => clearTimeout(timer);
  }, []);

  const pencil = `url(#pencil-${uid})`;

  return (
    <svg ref={ref} viewBox="0 0 600 600" className={className} role="img" aria-label="Illustration of Ananya peeking over her laptop">
      <defs>
        <filter id={`pencil-${uid}`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="4" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="3" xChannelSelector="R" yChannelSelector="G" result="wobbly" />
          <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="1" seed="9" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 1  0 0 0 0 .98  0 0 0 0 .94  1.5 0 0 0 -.95" result="specks" />
          <feComposite in="specks" in2="wobbly" operator="in" result="specksIn" />
          <feMerge>
            <feMergeNode in="wobbly" />
            <feMergeNode in="specksIn" />
          </feMerge>
        </filter>
      </defs>

      {/* faint stars behind */}
      {[
        [96, 250, 1.3, -12],
        [512, 178, 1, 14],
        [540, 360, 0.6, -6],
      ].map(([x, y, s, rot], i) => (
        <path
          key={i}
          d="M0,-26 L7,-8 L26,-8 L11,4 L17,24 L0,12 L-17,24 L-11,4 L-26,-8 L-7,-8 Z"
          transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}
          fill="none"
          stroke="#efcf7a"
          strokeWidth="3"
          strokeLinejoin="round"
          opacity=".7"
        />
      ))}

      {/* hair, back */}
      <g filter={pencil}>
        <path d={hair.silhouette} fill={HAIR} />
        {hair.bumps.map((c, i) => (
          <circle key={i} cx={c.x.toFixed(1)} cy={c.y.toFixed(1)} r={c.r.toFixed(1)} fill={HAIR} />
        ))}
        {hair.strands.map((st, i) => (
          <path key={i} d={st.d} fill="none" stroke={st.hi ? HAIR_HI : HAIR_DK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {hair.loops.map((c, i) => (
          <path
            key={i}
            d={`M${-c.s},0 a${c.s},${c.s} 0 1,1 ${(c.s * 1.5).toFixed(1)},${(c.s * 1.1).toFixed(1)}`}
            transform={`translate(${c.x.toFixed(1)} ${c.y.toFixed(1)}) rotate(${c.rot.toFixed(0)})`}
            fill="none"
            stroke={i % 3 ? HAIR_HI : HAIR_DK}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* neck, white blazer over a black top, pendant necklace */}
      <g filter={pencil}>
        <rect x="270" y="380" width="60" height="70" fill={look.skinShade} />
        <path d="M100,600 C110,478 186,430 262,420 L338,420 C414,430 490,478 500,600 Z" fill="#f6f1ea" />
        <path d="M250,424 Q300,436 350,424 L344,600 L256,600 Z" fill="#2a2224" />
        <path d="M262,421 L240,470 L276,520 L250,600 M338,421 L360,470 L324,520 L350,600" fill="none" stroke="#d8cfc3" strokeWidth="4" strokeLinejoin="round" />
        <path d="M150,540 Q170,500 200,488 M450,540 Q430,500 400,488" fill="none" stroke="#e3dbd0" strokeWidth="3" />
      </g>
      <path d="M276,424 Q300,462 324,424" fill="none" stroke={GOLD} strokeWidth="1.8" />
      <circle cx="300" cy="446" r="6" fill="#e8c46a" stroke="#b88f2e" strokeWidth="1.4" />

      {/* face */}
      <g filter={pencil}>
        <path d={FACE} fill={look.skin} />
        <ellipse cx="236" cy="334" rx="28" ry="17" fill={look.blush} opacity={look.blushOpacity} />
        <ellipse cx="364" cy="334" rx="28" ry="17" fill={look.blush} opacity={look.blushOpacity} />
      </g>

      {/* round eyes with winged liner */}
      <g ref={blinkRef}>
        {EYES.map((e, i) => {
          const r = look.eyeR, w = e.side;
          return (
            <g key={i} className="eye-blink">
              <circle cx={e.cx} cy={e.cy} r={r} fill="#fffaf3" stroke={LINE} strokeWidth="2.2" />
              <clipPath id={`eye-${uid}-${i}`}>
                <circle cx={e.cx} cy={e.cy} r={r - 1.4} />
              </clipPath>
              <g clipPath={`url(#eye-${uid}-${i})`}>
                <g data-pupil data-cx={e.cx} data-cy={e.cy} data-travel={(r * 0.34).toFixed(1)}>
                  <circle cx={e.cx} cy={e.cy} r={r * 0.62} fill="#2b1a12" />
                  <circle cx={e.cx + r * 0.22} cy={e.cy - r * 0.22} r={r * 0.17} fill="#fff" />
                  <circle cx={e.cx - r * 0.18} cy={e.cy + r * 0.21} r={r * 0.07} fill="#fff" opacity=".85" />
                </g>
              </g>
              {/* upper liner sweeping into a wing */}
              <path
                d={`M${e.cx - w * (r - 2)},${e.cy - r * 0.3} A${r},${r} 0 0 ${w > 0 ? 1 : 0} ${e.cx + w * r},${e.cy - r * 0.15} L${e.cx + w * (r + 13)},${e.cy - r * 0.45}`}
                fill="none"
                stroke={LINE}
                strokeWidth="4.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {look.lowerLiner && (
                <path
                  d={`M${e.cx - w * (r - 6)},${e.cy + r * 0.6} A${r},${r} 0 0 ${w > 0 ? 0 : 1} ${e.cx + w * (r - 2)},${e.cy + r * 0.32}`}
                  fill="none"
                  stroke={LINE}
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity=".7"
                />
              )}
            </g>
          );
        })}
      </g>

      {/* thick arched brows */}
      <path d="M216,252 Q232,232 258,232 Q274,233 282,240 Q262,240 246,245 Q230,250 216,252 Z" fill={HAIR_DK} />
      <path d="M384,252 Q368,232 342,232 Q326,233 318,240 Q338,240 354,245 Q370,250 384,252 Z" fill={HAIR_DK} />

      {/* nose with septum ring */}
      <path d="M296,292 Q292,316 288,326" fill="none" stroke={look.skinShade} strokeWidth="2.4" strokeLinecap="round" opacity=".6" />
      <path d="M284,328 Q280,336 289,338 Q295,333 300,337 Q305,333 311,338 Q320,336 316,328" fill="none" stroke="#6e3b1d" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M295,339 a5,5 0 0 0 10,0" fill="none" stroke={GOLD} strokeWidth="2.4" strokeLinecap="round" />

      {/* full rose lips, closed smile */}
      <path d="M276,360 Q288,352 300,357 Q312,352 324,360 Q300,364 276,360 Z" fill="#9c3442" />
      <path d="M276,360 Q300,364 324,360 Q316,378 300,379 Q284,378 276,360 Z" fill="#bd4a58" />
      <path d="M276,360 Q300,366 324,360" fill="none" stroke="#6f2230" strokeWidth="2" strokeLinecap="round" />
      <path d="M272,357 Q274,361 277,361 M328,357 Q326,361 323,361" fill="none" stroke={look.skinShade} strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="306" cy="370" rx="6" ry="2" fill="#fff" opacity=".25" />

      {/* hair, front: centre-parted sweeps + curls framing the face */}
      <g filter={pencil}>
        {/* centre part: two sweeps meeting at a part line, falling past the cheeks */}
        <path d="M300,124 C236,120 186,158 176,240 C172,292 178,326 188,360 C194,284 214,226 258,204 C278,194 293,186 300,170 Z" fill={HAIR} />
        <path d="M300,124 C364,120 414,158 424,240 C428,292 422,326 412,360 C406,284 386,226 342,204 C322,194 307,186 300,170 Z" fill={HAIR} />
        <path d="M300,128 L300,170" stroke="#5a3624" strokeWidth="2.4" strokeLinecap="round" />
        {/* sweep texture */}
        <path d="M290,140 C246,146 206,186 194,250 M280,158 C246,170 214,210 204,270" fill="none" stroke={HAIR_HI} strokeWidth="3" strokeLinecap="round" />
        <path d="M310,140 C354,146 394,186 406,250 M320,158 C354,170 386,210 396,270" fill="none" stroke={HAIR_HI} strokeWidth="3" strokeLinecap="round" />
        {/* ringlets tumbling down beside the face */}
        {[
          [184, 300, 9], [170, 330, 8], [196, 352, 6],
          [416, 300, 9], [430, 330, 8], [404, 352, 6],
        ].map(([x, y, n], i) => (
          <g key={i}>
            <path d={ringlet(x, y, n, 9, 10)} fill="none" stroke={HAIR} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
            <path d={ringlet(x, y, n, 9, 10)} fill="none" stroke={HAIR_HI} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
      </g>

      {/* ear piercings (star stud + huggies) + flower */}
      {[
        [195, 334, 5],
        [194, 350, 7],
        [405, 334, 5],
        [406, 350, 7],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="none" stroke={GOLD} strokeWidth="3" />
      ))}
      <path transform="translate(197 314) scale(.32)" d="M0,-24 L7,-8 L24,-8 L10,4 L15,22 L0,11 L-15,22 L-10,4 L-24,-8 L-7,-8 Z" fill={GOLD} />
      <g transform="translate(404 188) rotate(18)" filter={pencil}>
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-17" rx="12" ry="18" fill="#eba6cb" stroke="#d987b2" strokeWidth="1.5" transform={`rotate(${a})`} />
        ))}
        <circle r="7" fill="#f6d26b" />
      </g>

      {/* laptop with stickers, hands on top */}
      <g filter={pencil}>
        <path d="M118,604 L118,474 Q118,454 138,454 L462,454 Q482,454 482,474 L482,604 Z" fill="#d6d0ea" stroke="#b6aed3" strokeWidth="3" />
        <g transform="translate(206 512) rotate(-8)">
          <rect x="-50" y="-24" width="100" height="48" rx="12" fill="#ffd76a" />
          <text x="0" y="10" textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="700" fontSize="28" fill="#2b1a12">
            &lt;/&gt;
          </text>
        </g>
        <path transform="translate(398 512) rotate(10) scale(1.3)" d="M0,8 C-14,-2 -16,-14 -8,-18 C-3,-20 0,-16 0,-13 C0,-16 3,-20 8,-18 C16,-14 14,-2 0,8 Z" fill="#ef7f9c" />
        <path transform="translate(320 568) rotate(-10) scale(.9)" d="M0,-24 L7,-8 L24,-8 L10,4 L15,22 L0,11 L-15,22 L-10,4 L-24,-8 L-7,-8 Z" fill="#f7c948" />
        <g transform="translate(176 572)">
          <circle r="22" fill="#f4a7c1" />
          <path d="M-8,-6 L-8,0 M8,-6 L8,0 M-11,7 Q0,17 11,7" stroke="#2b1a12" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
        <g transform="translate(438 576) rotate(6)">
          <rect x="-34" y="-14" width="68" height="28" rx="6" fill="#bfe3cf" />
          <text x="0" y="6" textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="700" fontSize="13" fill="#2b1a12">
            hi :)
          </text>
        </g>
        {[206, 394].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy="456" rx="30" ry="17" fill={look.skin} />
            <path d={`M${x - 14},448 l0,14 M${x - 4},446 l0,16 M${x + 6},446 l0,16 M${x + 16},448 l0,13`} stroke={look.skinShade} strokeWidth="2.4" strokeLinecap="round" />
          </g>
        ))}
      </g>

      {/* coffee */}
      <g filter={pencil}>
        <path d="M562,530 q22,4 18,24 q-4,16 -22,12" fill="none" stroke="#f3e2c8" strokeWidth="8" />
        <rect x="498" y="512" width="68" height="88" rx="12" fill="#fff4e6" stroke="#e5cfb0" strokeWidth="3" />
        <path transform="translate(532 556) scale(.9)" d="M0,8 C-14,-2 -16,-14 -8,-18 C-3,-20 0,-16 0,-13 C0,-16 3,-20 8,-18 C16,-14 14,-2 0,8 Z" fill="#ef7f9c" />
      </g>
      {[516, 540].map((x, i) => (
        <path
          key={x}
          className="animate-steam"
          style={{ animationDelay: `${i * 0.9}s` }}
          d={`M${x},500 q-8,-12 0,-24 q8,-12 0,-24`}
          fill="none"
          stroke="#c9b8a6"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
