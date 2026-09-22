import { ModuleTheme } from "@/components/ModuleTheme";

/** Scopes this section's colour theme to every page under /vehicle-models. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <ModuleTheme name="vehicle-models">{children}</ModuleTheme>;
}
