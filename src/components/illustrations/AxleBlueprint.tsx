import type { CSSProperties } from "react";

/**
 * Front elevation of a trailer axle assembly — beam, hubs, brake drums and a
 * leaf-spring pack — drawn as an engineering blueprint with a track-width
 * dimension. Used as the Automotive Parts page artwork.
 */

const delay = (ms: number) => ({ "--draw-delay": `${ms}ms` }) as CSSProperties;

function DrumAssembly({ cx, from, flip = false }: { cx: number; from: number; flip?: boolean }) {
  const cy = 138;
  const dir = flip ? -1 : 1;
  return (
    <g>
      {/* Brake drum */}
      <circle cx={cx} cy={cy} r={46} pathLength={1} className="draw-line" style={delay(from)} />
      <circle cx={cx} cy={cy} r={33} pathLength={1} className="draw-line" style={delay(from + 90)} />
      {/* Hub and studs */}
      <circle cx={cx} cy={cy} r={13} pathLength={1} className="draw-line stroke-accent-500" style={delay(from + 170)} />
      {[30, 90, 150, 210, 270, 330].map((angle) => (
        <circle
          key={angle}
          cx={cx + 22 * Math.cos((angle * Math.PI) / 180)}
          cy={cy + 22 * Math.sin((angle * Math.PI) / 180)}
          r={3}
          pathLength={1}
          className="draw-line"
          style={delay(from + 220 + angle / 3)}
        />
      ))}
      {/* Spindle stub into the beam */}
      <path
        d={`M${cx + dir * 46} ${cy - 13} H${cx + dir * 78} V${cy + 13} H${cx + dir * 46}`}
        pathLength={1}
        className="draw-line"
        style={delay(from + 130)}
      />
    </g>
  );
}

export function AxleBlueprint({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 250"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label="Technical front-elevation drawing of a trailer axle assembly with brake drums, hubs, leaf-spring pack and track-width dimension."
    >
      <g stroke="currentColor" strokeWidth={1.6} className="text-white/35">
        {/* Axle beam */}
        <path d="M138 125 H582 V151 H138 Z" pathLength={1} className="draw-line" style={delay(0)} />
        <path d="M138 133 H582 M138 143 H582" pathLength={1} className="draw-line text-white/16" style={delay(200)} />

        {/* Leaf-spring pack */}
        <path
          d="M232 104 C300 84 420 84 488 104"
          pathLength={1}
          className="draw-line"
          style={delay(320)}
        />
        <path
          d="M248 112 C308 95 412 95 472 112"
          pathLength={1}
          className="draw-line text-white/22"
          style={delay(400)}
        />
        <path
          d="M266 119 C316 106 404 106 454 119"
          pathLength={1}
          className="draw-line text-white/22"
          style={delay(470)}
        />
        {/* U-bolts clamping the pack to the beam */}
        <path
          d="M286 96 V158 M306 96 V158 M414 96 V158 M434 96 V158"
          pathLength={1}
          className="draw-line stroke-accent-500"
          style={delay(560)}
        />
        {/* Air-bag mount pads */}
        <path d="M190 151 H230 V166 H190 Z M490 151 H530 V166 H490 Z" pathLength={1} className="draw-line" style={delay(640)} />
      </g>

      <g stroke="currentColor" strokeWidth={1.6} className="text-white/40">
        <DrumAssembly cx={60} from={700} />
        <DrumAssembly cx={660} from={780} flip />
      </g>

      {/* Axis centre line */}
      <line
        x1={16}
        y1={138}
        x2={704}
        y2={138}
        stroke="currentColor"
        strokeWidth={1}
        strokeDasharray="18 5 5 5"
        pathLength={1}
        className="draw-line text-white/22"
        style={delay(880)}
      />

      {/* Track-width dimension */}
      <g stroke="currentColor" strokeWidth={1.3} className="text-accent-500">
        <path
          d="M60 196 V220 M660 196 V220 M60 208 H296 M484 208 H660"
          pathLength={1}
          className="draw-line"
          style={delay(980)}
        />
        <path d="M68 204 L60 208 L68 212 M652 204 L660 208 L652 212" pathLength={1} className="draw-line" style={delay(1120)} />
      </g>

      <g
        className="fill-accent-500 font-display"
        fontSize={11}
        fontWeight={700}
        letterSpacing="0.14em"
        textAnchor="middle"
      >
        <text x={390} y={212}>
          TRACK WIDTH
        </text>
      </g>
    </svg>
  );
}
