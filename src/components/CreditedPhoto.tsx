import Image from "next/image";
import type { SegmentPhoto } from "@/data/vehicle-segments";

/**
 * A photograph with its credit printed beneath it.
 *
 * The vehicle-type photographs are Creative Commons BY / BY-SA images from
 * Wikimedia Commons, and those licences require the photographer and the
 * licence to be shown with the picture. The caption links both. A photograph
 * without a credit (the client's own catalogue shots) renders without one.
 */
export function CreditedPhoto({
  photo,
  sizes,
  className = "",
}: {
  photo: SegmentPhoto;
  sizes: string;
  className?: string;
}) {
  const contain = photo.fit === "contain";
  return (
    <figure className={className}>
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-sm border border-steel-200 ${
          contain ? "bg-white" : "bg-navy-900"
        }`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          className={contain ? "object-contain p-6" : "object-cover"}
        />
      </div>
      {photo.credit ? (
        <figcaption className="mt-2.5 text-[12px] leading-snug text-ink-muted">
          Photo:{" "}
          <a
            href={photo.credit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-steel-300 underline-offset-2 hover:text-ink"
          >
            {photo.credit.name}
          </a>
          ,{" "}
          <a
            href={photo.credit.licenceUrl}
            target="_blank"
            rel="noopener noreferrer license"
            className="underline decoration-steel-300 underline-offset-2 hover:text-ink"
          >
            {photo.credit.licence}
          </a>
          , via Wikimedia Commons
        </figcaption>
      ) : null}
    </figure>
  );
}
