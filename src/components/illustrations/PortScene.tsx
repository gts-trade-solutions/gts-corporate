/**
 * Container terminal scene — flat layered silhouettes rather than line art, so
 * it reads as imagery and can carry a full-bleed hero.
 *
 * This is the default artwork for photo slots until real photography is
 * supplied; see `src/data/media.ts`. Depth comes from four bands of receding
 * navy with a single amber container as the focal accent.
 */

type Stack = { x: number; y: number; w: number; h: number; tone: string };

/** Rows of stacked containers, back to front. */
const stacks: Stack[] = [
  // Far row
  ...[80, 200, 320, 440, 560, 680, 800, 920, 1040, 1160, 1280, 1400].map((x, i) => ({
    x,
    y: 470,
    w: 110,
    h: 46,
    tone: i % 3 === 0 ? "#2a75b5" : "#154273",
  })),
  ...[140, 260, 500, 620, 860, 980, 1220, 1340].map((x, i) => ({
    x,
    y: 424,
    w: 110,
    h: 46,
    tone: i % 4 === 1 ? "#2468a6" : "#2a75b5",
  })),
  // Mid row
  ...[40, 172, 304, 436, 568, 700, 832, 964, 1096, 1228, 1360, 1492].map((x, i) => ({
    x,
    y: 566,
    w: 122,
    h: 52,
    tone: i % 5 === 2 ? "#2a75b5" : "#1d5b93",
  })),
  ...[172, 436, 700, 964, 1228].map((x, i) => ({
    x,
    y: 514,
    w: 122,
    h: 52,
    tone: i === 2 ? "#b54708" : "#2468a6",
  })),
];

function Crane({ x, scale = 1 }: { x: number; scale?: number }) {
  return (
    <g transform={`translate(${x} 0) scale(${scale})`} fill="#154273">
      {/* Gantry legs */}
      <rect x={0} y={200} width={14} height={280} />
      <rect x={150} y={200} width={14} height={280} />
      {/* Cross member */}
      <rect x={0} y={196} width={164} height={16} />
      {/* Boom */}
      <rect x={-90} y={150} width={340} height={12} />
      <path d="M-90 150 L60 196 L60 162 Z" />
      {/* Tower */}
      <rect x={70} y={96} width={16} height={100} />
      <path d="M70 96 L250 150 L250 162 L70 112 Z" />
      {/* Trolley */}
      <rect x={186} y={162} width={26} height={18} />
      <rect x={197} y={180} width={4} height={54} />
      <rect x={176} y={234} width={46} height={14} fill="#2468a6" />
    </g>
  );
}

export function PortScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 760"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Illustration of a container terminal: gantry cranes over stacked shipping containers, with a cargo vessel on the horizon."
    >
      {/* Sky wash */}
      <defs>
        <linearGradient id="port-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06172b" />
          <stop offset="70%" stopColor="#0a2440" />
        </linearGradient>
        <radialGradient id="port-glow" cx="0.72" cy="0.52" r="0.5">
          <stop offset="0%" stopColor="#2468a6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2468a6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="760" fill="url(#port-sky)" />
      <rect width="1600" height="760" fill="url(#port-glow)" />

      {/* Horizon */}
      <rect x="0" y="392" width="1600" height="2" fill="#2468a6" opacity="0.5" />

      {/* Vessel on the horizon */}
      <g fill="#123a63">
        <path d="M1040 392 L1560 392 L1524 348 L1076 348 Z" />
        <rect x="1150" y="300" width="120" height="48" />
        <rect x="1178" y="272" width="60" height="28" />
        <rect x="1300" y="316" width="24" height="32" />
        <rect x="1352" y="316" width="24" height="32" />
      </g>

      {/* Cranes */}
      <Crane x={120} scale={0.86} />
      <Crane x={640} scale={0.95} />
      <Crane x={1150} scale={0.8} />

      {/* Container stacks */}
      <g>
        {stacks.map((s, i) => (
          <g key={`${s.x}-${s.y}-${i}`}>
            <rect x={s.x} y={s.y} width={s.w} height={s.h} fill={s.tone} />
            {/* corrugation */}
            {Array.from({ length: 5 }, (_, r) => (
              <rect
                key={r}
                x={s.x + 12 + r * 20}
                y={s.y + 7}
                width={2}
                height={s.h - 14}
                fill="#06172b"
                opacity={0.35}
              />
            ))}
            <rect x={s.x} y={s.y} width={s.w} height={3} fill="#ffffff" opacity={0.07} />
          </g>
        ))}
      </g>

      {/* Quayside ground */}
      <rect x="0" y="618" width="1600" height="142" fill="#081d34" />
      <rect x="0" y="618" width="1600" height="2" fill="#2468a6" opacity="0.45" />

      {/* Foreground container, cropped by the frame */}
      <g>
        <rect x="1120" y="640" width="560" height="150" fill="#0a2947" />
        <rect x="1120" y="640" width="560" height="4" fill="#dc6803" opacity="0.75" />
        {Array.from({ length: 16 }, (_, i) => (
          <rect
            key={i}
            x={1150 + i * 34}
            y={660}
            width={4}
            height={110}
            fill="#06172b"
            opacity={0.4}
          />
        ))}
      </g>

      {/* Ground markings */}
      <g fill="#2468a6" opacity="0.35">
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={i * 150} y={706} width={78} height={3} />
        ))}
      </g>
    </svg>
  );
}
