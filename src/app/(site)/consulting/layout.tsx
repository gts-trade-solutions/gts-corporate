import { ModuleTheme } from "@/components/ModuleTheme";

/** Scopes this section's colour theme to every page under /consulting. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <ModuleTheme name="consulting">{children}</ModuleTheme>;
}
