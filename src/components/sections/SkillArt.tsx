// Cute little illustrations for each skill card.
const INK = "#2b1a12";

// CSV / JSON / XLS files riding a pipe into a database
function Pipeline() {
  return (
    <svg viewBox="0 0 200 120" className="w-full" aria-hidden>
      <path d="M18,78 H150" stroke="#e9dccb" strokeWidth="18" strokeLinecap="round" />
      <path d="M18,78 H150" stroke="#f4a3b0" strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" className="animate-flow" />
      {[
        { x: 22, label: "CSV", c: "#bfe3cf" },
        { x: 62, label: "XLS", c: "#bcd6f5" },
        { x: 102, label: "JSON", c: "#f6d26b" },
      ].map((f, i) => (
        <g key={f.label} transform={`translate(${f.x} 36)`}>
          <g className="animate-hop" style={{ animationDelay: `${i * 0.25}s` }}>
          <path d="M0,4 Q0,0 4,0 H22 L30,8 V34 Q30,38 26,38 H4 Q0,38 0,34 Z" fill="#fffaf2" stroke={INK} strokeWidth="2" />
          <rect x="3" y="15" width="24" height="11" rx="3" fill={f.c} />
          <text x="15" y="23.5" textAnchor="middle" fontSize="7.5" fontWeight="700" fontFamily="ui-monospace, monospace" fill={INK}>
            {f.label}
          </text>
          </g>
        </g>
      ))}
      <g transform="translate(150 44)">
        <ellipse cx="22" cy="10" rx="22" ry="8" fill="#e98d9c" stroke={INK} strokeWidth="2" />
        <path d="M0,10 V50 Q22,62 44,50 V10" fill="#f4a3b0" stroke={INK} strokeWidth="2" />
        <path d="M0,24 Q22,34 44,24 M0,38 Q22,48 44,38" fill="none" stroke={INK} strokeWidth="1.6" opacity=".5" />
      </g>
      <g transform="translate(176 26)">
        <circle r="9" fill="#bfe3cf" stroke={INK} strokeWidth="1.6" />
        <path d="M-4,0 L-1,3 L4,-3" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

// A database next to a tiny ER diagram and a trigger bolt
function Database() {
  return (
    <svg viewBox="0 0 200 120" className="w-full" aria-hidden>
      <path d="M100,40 H124 M100,84 H124 M150,52 V72" stroke={INK} strokeWidth="1.6" strokeDasharray="3 4" />
      <g transform="translate(44 18)">
        <g className="animate-hop">
        <ellipse cx="30" cy="12" rx="30" ry="11" fill="#9fc2ef" stroke={INK} strokeWidth="2" />
        <path d="M0,12 V72 Q30,88 60,72 V12" fill="#bcd6f5" stroke={INK} strokeWidth="2" />
        <path d="M0,32 Q30,46 60,32 M0,52 Q30,66 60,52" fill="none" stroke={INK} strokeWidth="1.6" opacity=".5" />
        </g>
      </g>
      {/* ER tables */}
      {[
        { x: 124, y: 26, c: "#f6d26b" },
        { x: 124, y: 70, c: "#bfe3cf" },
      ].map((t) => (
        <g key={t.y} transform={`translate(${t.x} ${t.y})`}>
          <rect width="52" height="30" rx="5" fill="#fffaf2" stroke={INK} strokeWidth="2" />
          <rect width="52" height="10" rx="5" fill={t.c} stroke={INK} strokeWidth="2" />
          <path d="M8,18 H40 M8,24 H30" stroke={INK} strokeWidth="1.6" strokeLinecap="round" opacity=".6" />
        </g>
      ))}
      {/* trigger bolt */}
      <path d="M26,30 L16,52 H26 L20,70 L36,44 H26 L32,30 Z" fill="#f6d26b" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" className="animate-twinkle" />
    </svg>
  );
}

// Bar chart, a magnifying glass and a little ML brain
function Analysis() {
  return (
    <svg viewBox="0 0 200 120" className="w-full" aria-hidden>
      <rect x="20" y="14" width="110" height="92" rx="12" fill="#fffaf2" stroke={INK} strokeWidth="2" />
      <path d="M32,94 H118" stroke={INK} strokeWidth="1.6" />
      {[
        { x: 38, h: 30, c: "#bcd6f5" },
        { x: 58, h: 48, c: "#f4a3b0" },
        { x: 78, h: 38, c: "#f6d26b" },
        { x: 98, h: 60, c: "#bfe3cf" },
      ].map((b, i) => (
        <rect key={b.x} x={b.x} y={94 - b.h} width="14" height={b.h} rx="3" fill={b.c} stroke={INK} strokeWidth="1.6" className="animate-grow origin-bottom" style={{ animationDelay: `${i * 0.2}s`, transformBox: "fill-box" }} />
      ))}
      <path d="M40,58 L62,40 L84,50 L106,28" fill="none" stroke="#d9707a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      {/* magnifier */}
      <g transform="translate(150 70)">
        <g className="animate-hop">
        <circle r="18" fill="#e7f3fb" fillOpacity=".7" stroke={INK} strokeWidth="2.4" />
        <path d="M12,13 L26,27" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        <path d="M-8,-6 Q-4,-12 2,-12" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      </g>
      {/* brain */}
      <g transform="translate(160 26)">
        <path d="M-14,4 Q-18,-10 -6,-12 Q0,-18 8,-12 Q18,-10 14,2 Q18,12 6,14 Q0,18 -6,14 Q-18,14 -14,4 Z" fill="#f4a3b0" stroke={INK} strokeWidth="1.8" />
        <path d="M0,-12 V14 M-10,0 Q-4,-2 0,2 M10,-2 Q4,0 0,4" fill="none" stroke={INK} strokeWidth="1.4" opacity=".6" />
      </g>
    </svg>
  );
}

export default function SkillArt({ kind }: { kind: "pipeline" | "database" | "analysis" }) {
  if (kind === "pipeline") return <Pipeline />;
  if (kind === "database") return <Database />;
  return <Analysis />;
}
