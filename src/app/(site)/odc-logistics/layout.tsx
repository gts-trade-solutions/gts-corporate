import { ModuleTheme } from "@/components/ModuleTheme";

/** Scopes this section's colour theme to every page under /odc-logistics. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <ModuleTheme name="odc-logistics">{children}</ModuleTheme>;
}
