import type { ReactNode } from "react";

/**
 * The set of module themes defined in `globals.css`. Adding a name here without
 * a matching `[data-module="…"]` block simply leaves that section on the brand
 * navy/red defaults, so the site can never break — but the two lists are meant
 * to stay in step.
 */
export type ModuleName =
  | "import-export"
  | "automotive-parts"
  | "manufacturing"
  | "consulting"
  | "odc-logistics"
  | "vehicle-models"
  | "blog";

/**
 * Applies a module's colour theme to everything inside it.
 *
 * The wrapper carries nothing but a `data-module` attribute: the CSS re-declares
 * the design tokens (`--color-navy-*`, `--color-accent-*`, the steels, the ink,
 * the shadows and the scene ramp) on this element, and every Tailwind utility
 * below it resolves against those instead of the root ones. Nothing inside the
 * subtree needs to know which module it is in.
 *
 * Used from each route segment's `layout.tsx` rather than from the pages, so
 * nested routes — `/automotive-parts/[category]`, `/odc-logistics/reports`,
 * `/blog/[slug]` — inherit their section's theme without repeating themselves.
 * It renders on the server, so the theme is in the first paint: no flash of the
 * default palette on a hard load.
 */
export function ModuleTheme({ name, children }: { name: ModuleName; children: ReactNode }) {
  return <div data-module={name}>{children}</div>;
}
