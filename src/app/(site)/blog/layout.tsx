import { ModuleTheme } from "@/components/ModuleTheme";

/** Scopes this section's colour theme to every page under /blog. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <ModuleTheme name="blog">{children}</ModuleTheme>;
}
