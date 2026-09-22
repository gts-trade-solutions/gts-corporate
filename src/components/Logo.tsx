import Image from "next/image";
import Link from "next/link";

/** Keep the supplied identity in its original colours, with a white ground on dark sections. */
export function Logo({ inverted = false, href = "/" }: { inverted?: boolean; href?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex shrink-0 items-center ${inverted ? "rounded-sm bg-white px-3 py-2" : ""}`}
      aria-label={href === "/" ? "GTS Trade Solutions — home" : "GTS Trade Solutions — admin"}
    >
      <Image
        src="/images/gts-logo.png"
        width={277}
        height={86}
        alt="GTS Integrated Solutions"
        className="h-12 w-auto sm:h-14"
        loading={inverted ? "lazy" : "eager"}
        unoptimized
      />
    </Link>
  );
}
