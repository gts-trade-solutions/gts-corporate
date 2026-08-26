import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icon";
import {
  vehicleImage,
  vehicleImageAlt,
  vehicleModelGroup,
  type VehicleModel,
} from "@/data/vehicle-models";

const PREVIEW_PARTS = 4;

/**
 * One model in the schedule. The whole card is a single link through to the
 * model page, so there is no nested anchor — the "select parts" affordance at
 * the foot is styled text, not a second link.
 */
export function VehicleModelCard({ item }: { item: VehicleModel }) {
  const group = vehicleModelGroup(item.group);
  const preview = item.parts.slice(0, PREVIEW_PARTS);
  const remaining = item.parts.length - preview.length;

  return (
    <Link
      href={`/vehicle-models/${item.slug}`}
      className="keyline group relative flex h-full flex-col overflow-hidden rounded-sm border border-steel-200 bg-white p-5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift"
    >
      {/* Catalogue photograph. `contain`, not `cover`: these are cut-out shots on
          a plain ground, and cropping them lops the ends off the longer trucks. */}
      <div className="relative -mx-5 -mt-5 mb-5 aspect-[3/2] overflow-hidden border-b border-steel-200 bg-white">
        <Image
          src={vehicleImage(item)}
          alt={vehicleImageAlt(item)}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
          className="object-contain p-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="block truncate text-[11px] font-bold uppercase tracking-[0.14em] text-accent-700">
            {item.oem}
          </span>
          <h3 className="mt-1.5 text-[18px] font-bold leading-snug text-ink transition-colors duration-200 group-hover:text-navy-800">
            {item.model}
          </h3>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-navy-50 text-navy-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:bg-navy-800 group-hover:text-white">
          <Icon name={group?.icon ?? "car"} className="h-5 w-5" />
        </span>
      </div>

      <dl className="mt-4 grid gap-2 border-t border-steel-200 pt-4 text-[13px]">
        <div className="flex gap-2">
          <dt className="w-[68px] shrink-0 font-semibold uppercase tracking-[0.08em] text-ink-muted">
            Type
          </dt>
          <dd className="text-ink">{item.segment}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-[68px] shrink-0 font-semibold uppercase tracking-[0.08em] text-ink-muted">
            Export
          </dt>
          <dd className="text-ink">{item.exportedFrom}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-[68px] shrink-0 font-semibold uppercase tracking-[0.08em] text-ink-muted">
            Markets
          </dt>
          <dd className="text-ink">{item.markets.join(", ")}</dd>
        </div>
      </dl>

      <div className="mt-4 border-t border-steel-200 pt-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
          Priority parts
        </span>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {preview.map((part) => (
            <li
              key={part}
              className="rounded-sm border border-steel-200 bg-steel-50 px-2 py-1 text-[12.5px] font-medium text-ink-soft"
            >
              {part}
            </li>
          ))}
          {remaining > 0 ? (
            <li className="rounded-sm border border-steel-200 bg-white px-2 py-1 text-[12.5px] font-semibold text-navy-700">
              +{remaining} more
            </li>
          ) : null}
        </ul>
      </div>

      <span className="mt-5 flex flex-1 items-end">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors duration-200 group-hover:text-accent-700">
          <span className="relative">
            Select parts &amp; enquire
            <span
              className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent-600 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              aria-hidden="true"
            />
          </span>
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      </span>
    </Link>
  );
}
