// The little island the plane lands on in the About section: a runway, a palm tree,
// a doodle of Ananya coding on her beach towel, and IT doodles floating around.
// The [data-landing] pad sits at the start of the runway.
const INK = "#2b1a12";
const SKIN = "#c47a45";
const HAIR = "#2b1711";
const HAIR_HI = "#8a4526";

// Ananya, sitting cross-legged on a towel with her laptop (origin = centre of her face)
function MiniMe() {
  return (
    <g>
      {/* towel */}
      <rect x="-46" y="46" width="92" height="20" rx="6" fill="#fffaf2" transform="rotate(-3)" />
      {[-34, -14, 6, 26].map((x) => (
        <rect key={x} x={x} y="46" width="9" height="20" fill="#f4a3b0" transform="rotate(-3)" />
      ))}
      {/* hair, back */}
      {[
        [-20, -6, 14], [20, -6, 14], [-16, -18, 13], [16, -18, 13], [0, -22, 14],
        [-24, 8, 12], [24, 8, 12], [-24, 22, 11], [24, 22, 11], [-20, 34, 10], [20, 34, 10],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={HAIR} />
      ))}
      {/* body: white blazer, black top */}
      <path d="M-26,58 Q-28,30 -12,22 L12,22 Q28,30 26,58 Z" fill="#f6f1ea" stroke="#d8cfc3" strokeWidth="1.5" />
      <path d="M-8,22 L8,22 L6,50 L-6,50 Z" fill="#2a2224" />
      {/* crossed legs */}
      <path d="M-34,62 Q-30,52 -6,56 Q6,58 30,52 Q38,58 30,64 Q4,68 -30,68 Z" fill="#cfc7bb" />
      {/* laptop on lap (we see the back of the screen) */}
      <path d="M-20,52 L20,52 L24,58 L-24,58 Z" fill="#b6aed3" />
      <rect x="-18" y="30" width="36" height="24" rx="3" fill="#d6d0ea" stroke="#b6aed3" strokeWidth="1.5" />
      <text x="0" y="45.5" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="ui-monospace, monospace" fill={INK}>
        &lt;/&gt;
      </text>
      <circle cx="12" cy="35" r="2.4" fill="#f4a3b0" />
      {/* hands on the keyboard */}
      <circle cx="-14" cy="54" r="4" fill={SKIN} />
      <circle cx="14" cy="54" r="4" fill={SKIN} />
      {/* neck + face */}
      <rect x="-4" y="12" width="8" height="12" fill="#a2602f" />
      <ellipse cx="0" cy="0" rx="15" ry="16" fill={SKIN} />
      {/* fringe + part */}
      <path d="M0,-16 C-12,-16 -18,-8 -16,4 C-12,-4 -6,-10 0,-12 C6,-10 12,-4 16,4 C18,-8 12,-16 0,-16 Z" fill={HAIR} />
      <path d="M-14,0 q-3,6 0,12 M14,0 q3,6 0,12" fill="none" stroke={HAIR_HI} strokeWidth="1.6" strokeLinecap="round" />
      {/* eyes looking down at the screen, blush, smile */}
      <circle cx="-5.5" cy="2" r="3.4" fill="#fffaf3" stroke={INK} strokeWidth="0.9" />
      <circle cx="5.5" cy="2" r="3.4" fill="#fffaf3" stroke={INK} strokeWidth="0.9" />
      <circle cx="-5.5" cy="3.2" r="2" fill={INK} />
      <circle cx="5.5" cy="3.2" r="2" fill={INK} />
      <ellipse cx="-9" cy="7.5" rx="3" ry="1.8" fill="#ec6a4a" opacity=".45" />
      <ellipse cx="9" cy="7.5" rx="3" ry="1.8" fill="#ec6a4a" opacity=".45" />
      <path d="M-2.5,9.5 Q0,11.5 2.5,9.5" fill="none" stroke="#9c3442" strokeWidth="1.4" strokeLinecap="round" />
      {/* pink flower */}
      <g transform="translate(11 -13)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-3.5" rx="2.4" ry="3.6" fill="#eba6cb" transform={`rotate(${a})`} />
        ))}
        <circle r="1.6" fill="#f6d26b" />
      </g>
    </g>
  );
}

// Hand-drawn IT doodles that bob around the island
function Doodles() {
  const ink = { fill: "none", stroke: INK, strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const items = [
    // </>
    <g key="code" transform="translate(48 58)">
      <path {...ink} d="M-14,0 L-24,10 L-14,20 M14,0 L24,10 L14,20 M5,-2 L-5,22" />
    </g>,
    // cloud upload
    <g key="cloud" transform="translate(290 46)">
      <path {...ink} d="M-22,14 Q-32,14 -30,4 Q-28,-6 -18,-4 Q-14,-16 0,-14 Q12,-14 14,-4 Q26,-6 26,6 Q26,14 16,14 Z" fill="#fffaf2" />
      <path {...ink} d="M0,10 V-4 M-5,1 L0,-5 L5,1" />
    </g>,
    // database
    <g key="db" transform="translate(556 176)">
      <ellipse {...ink} cx="0" cy="-12" rx="14" ry="5" fill="#bcd6f5" />
      <path {...ink} d="M-14,-12 V12 Q0,20 14,12 V-12 M-14,0 Q0,8 14,0" />
    </g>,
    // gear
    <g key="gear" transform="translate(44 226)">
      <circle {...ink} r="9" />
      <circle {...ink} r="3" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <path key={a} {...ink} d="M0,-9 V-14" transform={`rotate(${a})`} />
      ))}
    </g>,
    // SQL bubble
    <g key="sql" transform="translate(396 168)">
      <path {...ink} d="M-24,-12 Q-24,-20 -16,-20 H16 Q24,-20 24,-12 V2 Q24,10 16,10 H-2 L-10,18 L-8,10 H-16 Q-24,10 -24,2 Z" fill="#fffaf2" />
      <text x="0" y="0" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="ui-monospace, monospace" fill={INK}>
        SQL
      </text>
    </g>,
    // bar chart
    <g key="chart" transform="translate(150 150)">
      <path {...ink} d="M-14,14 H18 M-10,14 V2 M-2,14 V-8 M6,14 V-2 M14,14 V-12" />
    </g>,
    // { }
    <g key="braces" transform="translate(40 410)">
      <text x="0" y="0" fontSize="22" fontFamily="ui-monospace, monospace" fill={INK} opacity=".75">
        {"{ }"}
      </text>
    </g>,
    // binary
    <g key="bits" transform="translate(528 418)">
      <text x="0" y="0" fontSize="14" fontWeight="700" fontFamily="ui-monospace, monospace" fill={INK} opacity=".7">
        0101
      </text>
    </g>,
  ];
  return (
    <g opacity=".85">
      {items.map((it, i) => (
        <g key={i} className="animate-bob-doodle" style={{ animationDelay: `${i * 0.4}s` }}>
          {it}
        </g>
      ))}
    </g>
  );
}

export default function Island() {
  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      <svg viewBox="0 0 600 440" className="w-full" role="img" aria-label="A cute island where Ananya sits coding on a beach towel under a palm tree, with IT doodles floating around">
        {/* sun + cloud */}
        <circle cx="520" cy="70" r="40" fill="#ffd98a" opacity=".85" />
        <g className="animate-drift" fill="#fffaf2">
          <ellipse cx="170" cy="70" rx="40" ry="15" />
          <ellipse cx="196" cy="60" rx="26" ry="17" />
          <ellipse cx="148" cy="64" rx="18" ry="12" />
        </g>

        <Doodles />

        {/* sea */}
        <ellipse cx="300" cy="352" rx="292" ry="74" fill="#a9dbe3" />
        <ellipse cx="300" cy="346" rx="250" ry="52" fill="#c3e8ed" />
        <g className="animate-waves" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".8">
          <path d="M60,372 q12,-8 24,0 t24,0" />
          <path d="M470,388 q12,-8 24,0 t24,0" />
          <path d="M150,404 q12,-8 24,0 t24,0" />
          <path d="M380,410 q12,-8 24,0 t24,0" />
        </g>

        {/* island */}
        <path d="M96,330 Q120,250 230,236 Q300,228 380,234 Q490,246 508,330 Q300,356 96,330 Z" fill="#f2d39a" />
        <path d="M96,330 Q300,356 508,330 Q500,346 300,350 Q110,348 96,330 Z" fill="#e2b877" />
        <path d="M120,300 Q150,276 196,272 Q170,290 120,300 Z" fill="#9cc98a" />
        <path d="M452,268 Q486,280 494,306 Q470,288 452,268 Z" fill="#9cc98a" />

        {/* runway (left), windsock */}
        <path d="M150,266 L346,262 L354,280 L142,284 Z" fill="#e7ddd0" />
        <path d="M170,274 l22,-0.4 M212,273 l22,-0.4 M254,272 l22,-0.4 M296,271 l22,-0.4" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <path d="M132,276 L132,232" stroke="#8a6a55" strokeWidth="3" strokeLinecap="round" />
        <path className="animate-windsock origin-[132px_234px]" d="M132,232 L164,238 L162,250 L132,248 Z" fill="#f4a3b0" />

        {/* palm tree shading her spot */}
        <path d="M486,300 Q494,236 466,186" fill="none" stroke="#a0714f" strokeWidth="11" strokeLinecap="round" />
        <path d="M486,300 Q494,236 466,186" fill="none" stroke="#8a5d3e" strokeWidth="11" strokeDasharray="3 10" strokeLinecap="round" />
        <g className="animate-sway-slow origin-[466px_186px]" fill="#6fb36b">
          <path d="M466,186 Q430,160 392,176 Q430,168 466,190 Z" />
          <path d="M466,186 Q450,142 412,136 Q448,154 464,188 Z" />
          <path d="M466,186 Q494,142 532,148 Q494,158 468,188 Z" />
          <path d="M466,186 Q508,174 536,198 Q502,184 468,190 Z" />
          <path d="M466,186 Q472,146 494,128 Q478,156 470,188 Z" />
        </g>
        <circle cx="462" cy="194" r="6" fill="#8a5d3e" />
        <circle cx="472" cy="196" r="6" fill="#7a4f33" />

        {/* me, coding on the beach */}
        <g transform="translate(416 246)">
          <MiniMe />
        </g>
        {/* coffee by the towel */}
        <rect x="466" y="300" width="13" height="15" rx="3" fill="#fffaf2" stroke="#e5cfb0" strokeWidth="2" />
        <path d="M479,304 q6,1 4,7 q-2,3 -4,2" fill="none" stroke="#e5cfb0" strokeWidth="2" />
        <path className="animate-steam" d="M470,296 q-4,-6 0,-12 q4,-6 0,-12" fill="none" stroke="#c9b8a6" strokeWidth="2" strokeLinecap="round" />

        {/* flowers */}
        {[[214, 304], [262, 310], [312, 302]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="0" cy="-4" rx="2.6" ry="4" fill={i % 2 ? "#f6d26b" : "#f4a3b0"} transform={`rotate(${a})`} />
            ))}
            <circle r="2" fill="#fffaf2" />
          </g>
        ))}
      </svg>
      {/* the plane lands here, at the start of the runway */}
      <span data-landing className="absolute left-[32%] top-[61.5%] h-px w-px" />
    </div>
  );
}
