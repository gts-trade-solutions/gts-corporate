import { ModuleTheme } from "@/components/ModuleTheme";

/** Scopes this section's colour theme to every page under /automotive-parts. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <ModuleTheme name="automotive-parts">{children}</ModuleTheme>;
}
