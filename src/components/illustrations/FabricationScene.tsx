/**
 * Fabrication shop scene — sawtooth roof, overhead crane and a trailer chassis
 * on stands, with a weld flare as the focal accent.
 *
 * Companion to PortScene: flat layered silhouettes that can carry a full-bleed
 * band. Stands in for photography until real images are supplied.
 */

export function FabricationScene({ className = "" }: { className?: string }) {
  const bays = [0, 1, 2, 3, 4];

  return (
    <svg
      viewBox="0 0 1600 760"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Illustration of a fabrication workshop: sawtooth roof and overhead crane above a trailer chassis on stands, with a weld flare."
    >
      <defs>
        <linearGradient id="fab-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06172b" />
          <stop offset="100%" stopColor="#0a2440" />
        </linearGradient>
        <radialGradient id="weld-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#f38a1e" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#dc6803" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#dc6803" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="window-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16487a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#16487a" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      <rect width="1600" height="760" fill="url(#fab-bg)" />

      {/* Sawtooth roof with glazed faces */}
      <g>
        {bays.map((b) => {
          const x = b * 320;
          return (
            <g key={b}>
              <path d={`M${x} 150 L${x + 170} 40 L${x + 170} 150 Z`} fill="url(#window-glow)" />
              <path
                d={`M${x} 150 L${x + 170} 40 L${x + 175} 40 L${x + 175} 150 Z`}
                fill="#0c2743"
              />
              <path d={`M${x + 175} 40 L${x + 320} 150 L${x + 175} 150 Z`} fill="#0a2136" />
              {/* Glazing bars */}
              {[36, 72, 108].map((o) => (
                <rect key={o} x={x + o} y={150 - (o * 110) / 170} width={2} height={(o * 110) / 170} fill="#06172b" opacity={0.5} />
              ))}
            </g>
          );
        })}
        <rect x="0" y="150" width="1600" height="10" fill="#0c2743" />
      </g>

      {/* Rear wall and columns */}
      <rect x="0" y="160" width="1600" height="330" fill="#081f37" />
      <g fill="#0b2743">
        {[120, 440, 760, 1080, 1400].map((x) => (
          <rect key={x} x={x} y={160} width={22} height={330} />
        ))}
      </g>

      {/* Overhead crane */}
      <g fill="#0e2f52">
        <rect x="0" y="222" width="1600" height="16" />
        <rect x="0" y="246" width="1600" height="6" opacity={0.6} />
        <rect x="700" y="238" width="150" height="34" />
        <rect x="768" y="272" width="6" height="120" />
        <rect x="716" y="392" width="118" height="18" fill="#16487a" />
      </g>

      {/* Trailer chassis on stands */}
      <g>
        {/* Main rails */}
        <rect x="260" y="470" width="1010" height="20" fill="#123a63" />
        <rect x="260" y="500" width="1010" height="12" fill="#0e2f52" />
        {/* Cross members */}
        {Array.from({ length: 13 }, (_, i) => (
          <rect key={i} x={288 + i * 76} y={490} width={14} height={26} fill="#16487a" opacity={0.85} />
        ))}
        {/* Stands */}
        {[320, 700, 1160].map((x) => (
          <g key={x} fill="#0b2743">
            <rect x={x} y={512} width={16} height={96} />
            <rect x={x - 26} y={604} width={68} height={12} />
          </g>
        ))}
        {/* Kingpin plate */}
        <rect x="300" y="446" width="150" height="26" fill="#14406c" />
      </g>

      {/* Weld flare */}
      <g>
        <circle cx="1042" cy="482" r="150" fill="url(#weld-glow)" />
        <circle cx="1042" cy="482" r="13" fill="#ffd9a8" />
        <circle cx="1042" cy="482" r="30" fill="#f38a1e" opacity={0.45} />
        {/* Sparks */}
        {[
          [1092, 440],
          [1116, 496],
          [1000, 428],
          [962, 470],
          [1078, 536],
          [1010, 546],
          [1140, 452],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 4 : 2.5} fill="#f38a1e" opacity={0.9} />
        ))}
      </g>

      {/* Operator silhouette, for scale */}
      <g fill="#06172b">
        <circle cx="1120" cy="512" r="16" />
        <path d="M1100 532 h40 l10 76 h-60 Z" />
        <rect x="1104" y="608" width="14" height="44" />
        <rect x="1124" y="608" width="14" height="44" />
      </g>

      {/* Floor */}
      <rect x="0" y="648" width="1600" height="112" fill="#061a30" />
      <rect x="0" y="648" width="1600" height="2" fill="#16487a" opacity={0.45} />
      <g fill="#dc6803" opacity={0.35}>
        {Array.from({ length: 10 }, (_, i) => (
          <rect key={i} x={i * 172} y={702} width={96} height={4} />
        ))}
      </g>
    </svg>
  );
}
