import type { CSSProperties } from "react";

/**
 * Side elevation of a tractor unit and box trailer, drawn as an engineering
 * blueprint with dimension lines and centre marks.
 *
 * Inline SVG rather than a photograph: it costs ~4KB, scales perfectly, tracks
 * the brand colours, and makes no claim about equipment GTS owns. Every shape
 * carries pathLength="1" so a single keyframe can stroke-draw the whole thing.
 */

const delay = (ms: number) => ({ "--draw-delay": `${ms}ms` }) as CSSProperties;

/** Wheel with rim, hub and spokes. */
function Wheel({ cx, cy, from }: { cx: number; cy: number; from: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={30} pathLength={1} className="draw-line" style={delay(from)} />
      <circle cx={cx} cy={cy} r={19} pathLength={1} className="draw-line" style={delay(from + 90)} />
      <circle
        cx={cx}
        cy={cy}
        r={7}
        pathLength={1}
        className="draw-line stroke-accent-500"
        style={delay(from + 160)}
      />
      {[0, 60, 120].map((angle) => (
        <line
          key={angle}
          x1={cx - 19 * Math.cos((angle * Math.PI) / 180)}
          y1={cy - 19 * Math.sin((angle * Math.PI) / 180)}
          x2={cx + 19 * Math.cos((angle * Math.PI) / 180)}
          y2={cy + 19 * Math.sin((angle * Math.PI) / 180)}
          pathLength={1}
          className="draw-line"
          style={delay(from + 200 + angle)}
        />
      ))}
    </g>
  );
}

export function TruckBlueprint({ className = "" }: { className?: string }) {
  const corrugations = Array.from({ length: 15 }, (_, i) => 300 + i * 34);

  return (
    <svg
      viewBox="0 0 860 330"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label="Technical side-elevation drawing of a tractor unit coupled to a box trailer, with overall length and height dimensions marked."
    >
      {/* Body lines */}
      <g stroke="currentColor" strokeWidth={1.6} className="text-white/35">
        {/* Trailer body */}
        <path
          d="M268 78 H816 V186 H268 Z"
          pathLength={1}
          className="draw-line"
          style={delay(0)}
        />
        {/* Corrugation ribs */}
        {corrugations.map((x, i) => (
          <line
            key={x}
            x1={x}
            y1={88}
            x2={x}
            y2={176}
            pathLength={1}
            className="draw-line text-white/16"
            style={delay(260 + i * 45)}
          />
        ))}
        {/* Trailer under-rail and rear door edge */}
        <path d="M268 186 H816 V196 H268 Z" pathLength={1} className="draw-line" style={delay(220)} />
        <line x1={786} y1={86} x2={786} y2={178} pathLength={1} className="draw-line" style={delay(300)} />

        {/* Landing legs */}
        <path d="M340 196 V244 M354 196 V244 M332 244 H362" pathLength={1} className="draw-line" style={delay(520)} />

        {/* Tractor cab */}
        <path
          d="M62 202 V116 C62 106 69 98 79 98 H176 C185 98 190 105 190 114 V202 Z"
          pathLength={1}
          className="draw-line"
          style={delay(90)}
        />
        {/* Windscreen */}
        <path d="M74 112 H178 V150 H74 Z" pathLength={1} className="draw-line" style={delay(180)} />
        {/* Door line and handle */}
        <path d="M120 150 V202 M112 168 H128" pathLength={1} className="draw-line text-white/20" style={delay(360)} />
        {/* Grille */}
        <path d="M66 176 H100 M66 186 H100" pathLength={1} className="draw-line text-white/20" style={delay(400)} />
        {/* Chassis rail and fifth wheel */}
        <path d="M186 186 H272 V196 H186 Z" pathLength={1} className="draw-line" style={delay(300)} />
        <path d="M236 178 H266 L258 190 H244 Z" pathLength={1} className="draw-line stroke-accent-500" style={delay(460)} />
      </g>

      {/* Running gear */}
      <g stroke="currentColor" strokeWidth={1.6} className="text-white/40">
        <Wheel cx={112} cy={232} from={620} />
        <Wheel cx={250} cy={232} from={700} />
        <Wheel cx={694} cy={232} from={780} />
        <Wheel cx={758} cy={232} from={860} />
      </g>

      {/* Ground line */}
      <line
        x1={24}
        y1={263}
        x2={840}
        y2={263}
        stroke="currentColor"
        strokeWidth={1.4}
        strokeDasharray="10 7"
        pathLength={1}
        className="draw-line text-white/25"
        style={delay(560)}
      />

      {/* Dimensions */}
      <g stroke="currentColor" strokeWidth={1.3} className="text-accent-500">
        {/* Overall length */}
        <path
          d="M62 284 V308 M816 284 V308 M62 296 H352 M528 296 H816"
          pathLength={1}
          className="draw-line"
          style={delay(1020)}
        />
        <path d="M70 292 L62 296 L70 300 M808 292 L816 296 L808 300" pathLength={1} className="draw-line" style={delay(1160)} />
        {/* Overall height */}
        <path
          d="M28 78 H52 M28 263 H52 M40 78 V150 M40 214 V263"
          pathLength={1}
          className="draw-line"
          style={delay(1080)}
        />
        <path d="M36 86 L40 78 L44 86 M36 255 L40 263 L44 255" pathLength={1} className="draw-line" style={delay(1200)} />
      </g>

      {/* Dimension labels */}
      <g
        className="fill-accent-500 font-display"
        fontSize={11}
        fontWeight={700}
        letterSpacing="0.14em"
        textAnchor="middle"
      >
        <text x={440} y={300}>
          OVERALL LENGTH
        </text>
        <text x={40} y={186} transform="rotate(-90 40 186)">
          HEIGHT
        </text>
      </g>

      {/* Centre marks over each axle */}
      <g stroke="currentColor" strokeWidth={1} className="text-white/20">
        {[112, 250, 694, 758].map((x, i) => (
          <line
            key={x}
            x1={x}
            y1={196}
            x2={x}
            y2={276}
            strokeDasharray="4 4 12 4"
            pathLength={1}
            className="draw-line"
            style={delay(900 + i * 60)}
          />
        ))}
      </g>
    </svg>
  );
}
