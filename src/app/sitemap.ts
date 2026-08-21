import type { MetadataRoute } from "next";
import { partCategories } from "@/data/parts";
import { siteUrl } from "@/data/site";

const routes: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/import-export", priority: 0.9, changeFrequency: "monthly" },
  { path: "/automotive-parts", priority: 0.9, changeFrequency: "monthly" },
  { path: "/manufacturing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/consulting", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  // One detail page per component category — the long-tail SEO layer.
  ...partCategories.map((category) => ({
    path: `/automotive-parts/${category.id}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
