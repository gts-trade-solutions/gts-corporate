import { ModuleTheme } from "@/components/ModuleTheme";

/** Scopes this section's colour theme to every page under /import-export. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <ModuleTheme name="import-export">{children}</ModuleTheme>;
}
