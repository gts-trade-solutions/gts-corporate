import Image from "next/image";
import Link from "next/link";
import { vehicleImage, vehicleImageAlt, type VehicleModel } from "@/data/vehicle-models";

/**
 * A compact model card: catalogue photograph, maker and model, linking to the
 * model page. Used where a page lists several models of one type; the full
 * `VehicleModelCard`, with specs and parts, is for the schedule itself.
 */
export function VehicleModelTile({ item }: { item: VehicleModel }) {
  return (
    <Link
      href={`/vehicle-models/${item.slug}`}
      className="keyline group flex h-full flex-col overflow-hidden rounded-sm border border-steel-200 bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-lift"
    >
      {/* `contain`: these are cut-out shots on a plain ground, and cropping
          them lops the ends off the longer trucks. */}
      <div className="relative aspect-[3/2] border-b border-steel-200 bg-white">
        <Image
          src={vehicleImage(item)}
          alt={vehicleImageAlt(item)}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
          className="object-contain p-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col px-3.5 py-3 sm:px-4">
        <span className="truncate text-[10.5px] font-bold uppercase tracking-[0.14em] text-accent-700">
          {item.oem}
        </span>
        <span className="mt-1 text-[14.5px] font-bold leading-snug text-ink transition-colors duration-200 group-hover:text-navy-800">
          {item.model}
        </span>
        <span className="mt-0.5 text-[12.5px] text-ink-muted">{item.segment}</span>
      </div>
    </Link>
  );
}
