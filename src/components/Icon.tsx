import type { SVGProps } from "react";

/**
 * Small stroke-icon set drawn inline so the site ships no external icon
 * font or sprite. Every glyph uses the same 24px grid and currentColor.
 */
const paths = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 2.5 4 5.6 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.6-4-9s1.4-6.5 4-9Z" />
    </>
  ),
  package: (
    <>
      <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z" />
      <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
      <path d="m3 12 9 4.5L21 12" />
      <path d="m3 16.5 9 4.5 9-4.5" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4c0 8-4.5 13-10 13a6 6 0 0 1-6-6C4 6 9.5 4 20 4Z" />
      <path d="M4 20c2-4.5 5.5-8 10-10" />
    </>
  ),
  sparkle: (
    <>
      <path d="M13 3 15 9l6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />
      <path d="M6 3.5 6.8 5.7 9 6.5l-2.2.8L6 9.5l-.8-2.2L3 6.5l2.2-.8L6 3.5Z" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6.5h10v9h-10z" />
      <path d="M12.5 9.5h4l3 3v3h-7z" />
      <circle cx="7" cy="17.5" r="2" />
      <circle cx="17" cy="17.5" r="2" />
      <path d="M9 17.5h6M2.5 17.5h2.5" />
    </>
  ),
  bus: (
    <>
      <rect x="3" y="4" width="18" height="12.5" rx="2" />
      <path d="M3 9.5h18M9 4v5.5M15 4v5.5" />
      <circle cx="7" cy="18.5" r="1.6" />
      <circle cx="17" cy="18.5" r="1.6" />
    </>
  ),
  motorcycle: (
    <>
      <circle cx="5" cy="16" r="3.5" />
      <circle cx="19" cy="16" r="3.5" />
      <path d="M5 16l4-6h5l2 3 3 3" />
      <path d="M9 10h5M13.5 7.5 16 10" />
    </>
  ),
  threeWheeler: (
    <>
      <path d="M6 15V9.5A4.5 4.5 0 0 1 10.5 5h2A5.5 5.5 0 0 1 18 10.5V15" />
      <path d="M4.5 15h15" />
      <circle cx="7" cy="17.5" r="2" />
      <circle cx="17" cy="17.5" r="2" />
      <path d="M9 9.5h5" />
    </>
  ),
  car: (
    <>
      <path d="M3 14.5 4.8 9A2 2 0 0 1 6.7 7.5h10.6A2 2 0 0 1 19.2 9L21 14.5" />
      <path d="M3 14.5h18v3H3z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>
  ),
  tractor: (
    <>
      <circle cx="7.5" cy="16.5" r="4" />
      <circle cx="18" cy="17.5" r="2.5" />
      <path d="M4 10.5h5l1.5-4h4v6" />
      <path d="M14.5 12.5H19v3" />
    </>
  ),
  trailer: (
    <>
      <path d="M2.5 6h16v9h-16z" />
      <path d="M18.5 15h3" />
      <circle cx="8" cy="17.5" r="1.8" />
      <circle cx="13" cy="17.5" r="1.8" />
      <path d="M2.5 15v3" />
    </>
  ),
  container: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="1" />
      <path d="M7 6v12M11 6v12M15 6v12M19 6v12" />
    </>
  ),
  snowflake: (
    <>
      <path d="M12 2.5v19M4 7l16 10M20 7 4 17" />
      <path d="m9.5 4.5 2.5 2.5 2.5-2.5M9.5 19.5l2.5-2.5 2.5 2.5" />
    </>
  ),
  bolt: <path d="M13.5 2.5 5 13.5h5.5L10 21.5l8.5-11H13l.5-8Z" />,
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M10.4 2.5h3.2l.4 2.3 1.9 1.1 2.1-1 1.6 2.8-1.7 1.6v2.2l1.7 1.6-1.6 2.8-2.1-1-1.9 1.1-.4 2.3h-3.2l-.4-2.3-1.9-1.1-2.1 1-1.6-2.8 1.7-1.6V9.3L4.4 7.7 6 4.9l2.1 1L10 4.8l.4-2.3Z" />
    </>
  ),
  factory: (
    <>
      <path d="M3 20.5V10l5.5 3.5V10L14 13.5V7.5h1.5l1-4h2l1 4H21v13z" />
      <path d="M3 20.5h18" />
    </>
  ),
  wrench: (
    <>
      <path d="M15.5 3a5.5 5.5 0 0 0-5 7.7L3.8 17.4a2 2 0 0 0 2.8 2.8l6.7-6.7A5.5 5.5 0 0 0 20.6 6l-3 3-2.6-2.6 3-3A5.5 5.5 0 0 0 15.5 3Z" />
    </>
  ),
  handshake: (
    <>
      <path d="M3 9.5 6.5 6h4l2 1.5 2-1.5h3L21 9.5" />
      <path d="M8.5 8.5 6 11a1.8 1.8 0 0 0 2.5 2.6l1.2-1 1.8 1.8a1.6 1.6 0 0 0 2.3-2.2" />
      <path d="m13.8 12.2 2 2a1.7 1.7 0 0 0 2.4-2.4L15.5 9" />
      <path d="M3 9.5v5M21 9.5v5" />
    </>
  ),
  clipboard: (
    <>
      <path d="M9 4.5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="2.5" width="6" height="4" rx="1" />
      <path d="M8.5 11.5h7M8.5 15h5" />
    </>
  ),
  flame: (
    <>
      <path d="M12 2.5s5.5 4 5.5 9.5a5.5 5.5 0 0 1-11 0C6.5 8.5 9 7 9.5 4.5c1.5 1 2.5 2.5 2.5 4.5 0-3 0-5 0-6.5Z" />
      <path d="M12 21a2.8 2.8 0 0 0 2.8-2.8c0-2-2.8-4-2.8-4s-2.8 2-2.8 4A2.8 2.8 0 0 0 12 21Z" />
    </>
  ),
  shieldCheck: (
    <>
      <path d="M12 2.5 4.5 5.5v6c0 4.6 3.1 8.4 7.5 10 4.4-1.6 7.5-5.4 7.5-10v-6L12 2.5Z" />
      <path d="m8.8 11.8 2.4 2.4 4.2-4.4" />
    </>
  ),
  route: (
    <>
      <circle cx="5.5" cy="5.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
      <path d="M8 5.5h6.5A3.5 3.5 0 0 1 18 9v0a3.5 3.5 0 0 1-3.5 3.5h-5A3.5 3.5 0 0 0 6 16v0a3.5 3.5 0 0 0 3.5 3.5H16" />
    </>
  ),
  draft: (
    <>
      <path d="M5 3.5h9l5 5v12H5z" />
      <path d="M14 3.5v5h5" />
      <path d="M8.5 12.5h7M8.5 16h4.5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="M8 20v-6M12.5 20V9M17 20v-9.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
