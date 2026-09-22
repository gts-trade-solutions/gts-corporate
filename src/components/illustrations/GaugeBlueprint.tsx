import type { CSSProperties } from "react";

/**
 * A dial gauge with a tolerance band, feeding a stamped approval document —
 * measure, then certify. Drawn as an engineering blueprint and used as the
 * Consulting page artwork, where the work is testing, inspection and approval
 * coordination rather than a product.
 *
 * Same idiom as [AxleBlueprint](./AxleBlueprint.tsx): `pathLength={1}` on every
 * shape so one set of keyframes draws it, with delays that build the gauge
 * first and the document it produces second.
 */

const delay = (ms: number) => ({ "--draw-delay": `${ms}ms` }) as CSSProperties;

const CX = 140;
const CY = 106;
const point = (angle: number, radius: number) => {
  const rad = (angle * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
};

export function GaugeBlueprint({ className = "" }: { className?: string }) {
  /* 12 major graduations, with a minor between each. */
  const majors = Array.from({ length: 12 }, (_, i) => i * 30);
  const minors = Array.from({ length: 12 }, (_, i) => i * 30 + 15);
  const needle = point(-40, 54);
  const arcFrom = point(-70, 76);
  const arcTo = point(-10, 76);

  return (
    <svg
      viewBox="0 0 720 226"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label="Technical drawing of a dial gauge with a tolerance band marked on its scale, connected to a stamped approval document."
    >
      {/* Dial */}
      <g stroke="currentColor" strokeWidth={1.6} className="text-white/35">
        <circle cx={CX} cy={CY} r={82} pathLength={1} className="draw-line" style={delay(0)} />
        <circle cx={CX} cy={CY} r={70} pathLength={1} className="draw-line text-white/22" style={delay(120)} />
        {majors.map((angle, i) => {
          const a = point(angle, 70);
          const b = point(angle, 56);
          return (
            <line
              key={angle}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              pathLength={1}
              className="draw-line"
              style={delay(240 + i * 26)}
            />
          );
        })}
        {minors.map((angle, i) => {
          const a = point(angle, 70);
          const b = point(angle, 63);
          return (
            <line
              key={angle}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              pathLength={1}
              className="draw-line text-white/20"
              style={delay(300 + i * 26)}
            />
          );
        })}
      </g>

      {/* Needle, hub and the tolerance band it has to land inside. */}
      <g stroke="currentColor" strokeWidth={1.8} className="text-accent-500">
        <path
          d={`M${arcFrom.x.toFixed(1)} ${arcFrom.y.toFixed(1)} A76 76 0 0 1 ${arcTo.x.toFixed(1)} ${arcTo.y.toFixed(1)}`}
          strokeWidth={4}
          pathLength={1}
          className="draw-line"
          style={delay(700)}
        />
        <line
          x1={CX} y1={CY} x2={needle.x.toFixed(1)} y2={needle.y.toFixed(1)}
          pathLength={1}
          className="draw-line"
          style={delay(860)}
        />
        <circle cx={CX} cy={CY} r={7} pathLength={1} className="draw-line" style={delay(940)} />
      </g>

      {/* Reading carried across to the document. */}
      <line
        x1={228} y1={CY} x2={304} y2={CY}
        stroke="currentColor"
        strokeWidth={1}
        strokeDasharray="14 6"
        pathLength={1}
        className="draw-line text-white/25"
        style={delay(1000)}
      />

      {/* Approval document, with a folded corner and a stamp. */}
      <g stroke="currentColor" strokeWidth={1.6} className="text-white/35">
        <path
          d="M312 34 H624 L664 74 V178 H312 Z"
          pathLength={1}
          className="draw-line"
          style={delay(1060)}
        />
        <path d="M624 34 V74 H664" pathLength={1} className="draw-line text-white/22" style={delay(1180)} />
        {[74, 94, 114, 134].map((y, i) => (
          <line
            key={y}
            x1={338} y1={y} x2={i % 2 === 0 ? 596 : 528} y2={y}
            pathLength={1}
            className="draw-line text-white/20"
            style={delay(1240 + i * 60)}
          />
        ))}
      </g>

      <g stroke="currentColor" strokeWidth={1.6} className="text-accent-500">
        <circle cx={596} cy={146} r={24} pathLength={1} className="draw-line" style={delay(1500)} />
        <circle cx={596} cy={146} r={17} pathLength={1} className="draw-line" style={delay(1570)} />
      </g>

      <g
        className="fill-accent-500 font-display"
        fontSize={11}
        fontWeight={700}
        letterSpacing="0.14em"
        textAnchor="middle"
      >
        <text x={CX} y={212}>
          TOLERANCE BAND
        </text>
      </g>
    </svg>
  );
}
