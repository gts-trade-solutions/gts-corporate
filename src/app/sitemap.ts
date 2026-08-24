import type { MetadataRoute } from "next";
import { blogPostsByDate } from "@/data/blog";
import { partCategories } from "@/data/parts";
import { siteUrl } from "@/data/site";
import { vehicleModels } from "@/data/vehicle-models";

type Route = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  /** Posts carry their own publication date rather than the build date. */
  lastModified?: string;
};

const routes: Route[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/import-export", priority: 0.9, changeFrequency: "monthly" },
  { path: "/automotive-parts", priority: 0.9, changeFrequency: "monthly" },
  { path: "/vehicle-models", priority: 0.9, changeFrequency: "monthly" },
  { path: "/manufacturing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/consulting", priority: 0.9, changeFrequency: "monthly" },
  { path: "/odc-logistics", priority: 0.9, changeFrequency: "monthly" },
  { path: "/odc-logistics/route-survey", priority: 0.8, changeFrequency: "monthly" },
  { path: "/odc-logistics/reports", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  // One detail page per component category — the long-tail SEO layer.
  ...partCategories.map(
    (category): Route => ({
      path: `/automotive-parts/${category.id}`,
      priority: 0.7,
      changeFrequency: "monthly",
    }),
  ),
  // One page per vehicle model — "<model> spare parts" long-tail queries.
  ...vehicleModels.map(
    (item): Route => ({
      path: `/vehicle-models/${item.slug}`,
      priority: 0.6,
      changeFrequency: "monthly",
    }),
  ),
  ...blogPostsByDate.map(
    (post): Route => ({
      path: `/blog/${post.slug}`,
      priority: 0.6,
      changeFrequency: "yearly",
      lastModified: post.updatedAt ?? post.publishedAt,
    }),
  ),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: route.lastModified ? new Date(`${route.lastModified}T00:00:00Z`) : buildDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
