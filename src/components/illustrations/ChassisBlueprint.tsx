import type { CSSProperties } from "react";

/**
 * Plan view of a welded ladder chassis — two C-section side rails, cross
 * members, corner gussets and weld points — drawn as an engineering blueprint
 * with an overall-length dimension. Used as the Manufacturing page artwork.
 *
 * Same idiom as [AxleBlueprint](./AxleBlueprint.tsx): every shape carries
 * `pathLength={1}` so one set of keyframes draws it regardless of real path
 * length, and the delays stagger the build in assembly order — rails, then
 * cross members, then the welds that join them.
 */

const delay = (ms: number) => ({ "--draw-delay": `${ms}ms` }) as CSSProperties;

/** Cross member with a weld point at each end. */
function CrossMember({ x, from }: { x: number; from: number }) {
  return (
    <g>
      <path
        d={`M${x} 74 H${x + 17} V156 H${x} Z`}
        pathLength={1}
        className="draw-line"
        style={delay(from)}
      />
      <circle cx={x + 8.5} cy={79} r={3.5} pathLength={1} className="draw-line stroke-accent-500" style={delay(from + 120)} />
      <circle cx={x + 8.5} cy={151} r={3.5} pathLength={1} className="draw-line stroke-accent-500" style={delay(from + 160)} />
    </g>
  );
}

/** Bolt holes along a rail flange — the detail that makes it read as fabricated. */
function BoltRow({ y, from }: { y: number; from: number }) {
  return (
    <g>
      {Array.from({ length: 11 }, (_, i) => 78 + i * 57).map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={y}
          r={2.6}
          pathLength={1}
          className="draw-line text-white/30"
          style={delay(from + i * 18)}
        />
      ))}
    </g>
  );
}

export function ChassisBlueprint({ className = "" }: { className?: string }) {
  const members = [128, 232, 336, 440, 544];

  return (
    <svg
      viewBox="0 0 720 226"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label="Technical plan-view drawing of a welded ladder chassis frame with two side rails, five cross members, corner gussets, weld points and an overall-length dimension."
    >
      <g stroke="currentColor" strokeWidth={1.6} className="text-white/35">
        {/* Side rails, drawn as C-sections: outer face, web, inner face. */}
        <path d="M48 52 H672 V74 H48 Z" pathLength={1} className="draw-line" style={delay(0)} />
        <path d="M48 156 H672 V178 H48 Z" pathLength={1} className="draw-line" style={delay(90)} />
        <path
          d="M48 63 H672 M48 167 H672"
          pathLength={1}
          className="draw-line text-white/16"
          style={delay(260)}
        />
      </g>

      <g stroke="currentColor" strokeWidth={1.4}>
        <BoltRow y={63} from={1180} />
        <BoltRow y={167} from={1240} />
      </g>

      {/* Cross members, laid in from the front of the frame backwards. */}
      <g stroke="currentColor" strokeWidth={1.6} className="text-white/40">
        {members.map((x, index) => (
          <CrossMember key={x} x={x} from={360 + index * 90} />
        ))}
      </g>

      {/* Corner gussets — the plates that stiffen a welded frame. */}
      <g stroke="currentColor" strokeWidth={1.4} className="text-white/28">
        <path d="M48 74 L90 74 L48 116 Z" pathLength={1} className="draw-line" style={delay(830)} />
        <path d="M672 74 L630 74 L672 116 Z" pathLength={1} className="draw-line" style={delay(880)} />
        <path d="M48 156 L90 156 L48 114 Z" pathLength={1} className="draw-line" style={delay(930)} />
        <path d="M672 156 L630 156 L672 114 Z" pathLength={1} className="draw-line" style={delay(980)} />
      </g>

      {/* Frame centre line. */}
      <line
        x1={20}
        y1={115}
        x2={700}
        y2={115}
        stroke="currentColor"
        strokeWidth={1}
        strokeDasharray="18 5 5 5"
        pathLength={1}
        className="draw-line text-white/22"
        style={delay(1040)}
      />

      {/* Overall-length dimension. */}
      <g stroke="currentColor" strokeWidth={1.3} className="text-accent-500">
        <path
          d="M48 190 V212 M672 190 V212 M48 201 H286 M486 201 H672"
          pathLength={1}
          className="draw-line"
          style={delay(1120)}
        />
        <path
          d="M56 197 L48 201 L56 205 M664 197 L672 201 L664 205"
          pathLength={1}
          className="draw-line"
          style={delay(1260)}
        />
        {/* Frame width, up the left edge. */}
        <path
          d="M18 52 H40 M18 178 H40 M29 52 V88 M29 142 V178"
          pathLength={1}
          className="draw-line"
          style={delay(1320)}
        />
        <path
          d="M25 60 L29 52 L33 60 M25 170 L29 178 L33 170"
          pathLength={1}
          className="draw-line"
          style={delay(1400)}
        />
      </g>

      <g
        className="fill-accent-500 font-display"
        fontSize={11}
        fontWeight={700}
        letterSpacing="0.14em"
        textAnchor="middle"
      >
        <text x={386} y={205}>
          OVERALL LENGTH
        </text>
        <text x={29} y={119} transform="rotate(-90 29 115)">
          FRAME WIDTH
        </text>
      </g>
    </svg>
  );
}
