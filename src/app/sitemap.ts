import type { MetadataRoute } from "next";
import { blogPostsByDate } from "@/data/blog";
import { partCategories } from "@/data/parts";
import { siteUrl } from "@/data/site";
import { listVehicleModels } from "@/lib/vehicle-models-store";

/**
 * Rebuilt whenever a model is saved. The hourly interval is a backstop, so a
 * missed revalidation cannot leave a new model page out of the sitemap for
 * long.
 */
export const revalidate = 3600;

type Route = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  /**
   * Posts carry their publication date and models their last edit, rather
   * than every page claiming to have changed at the last build.
   */
  lastModified?: string | Date;
};

const routes: Route[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/import-export", priority: 0.9, changeFrequency: "monthly" },
  { path: "/import-export/trade-categories", priority: 0.8, changeFrequency: "monthly" },
  { path: "/import-export/vehicle-trade", priority: 0.8, changeFrequency: "monthly" },
  { path: "/import-export/india-partner", priority: 0.8, changeFrequency: "monthly" },
  { path: "/automotive-parts", priority: 0.9, changeFrequency: "monthly" },
  { path: "/vehicle-models", priority: 0.9, changeFrequency: "monthly" },
  { path: "/manufacturing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/manufacturing/scope", priority: 0.8, changeFrequency: "monthly" },
  { path: "/manufacturing/process", priority: 0.8, changeFrequency: "monthly" },
  { path: "/consulting", priority: 0.9, changeFrequency: "monthly" },
  { path: "/consulting/fire-safety", priority: 0.8, changeFrequency: "monthly" },
  { path: "/consulting/commercial-vehicle-service", priority: 0.8, changeFrequency: "monthly" },
  { path: "/consulting/homologation-market-entry", priority: 0.8, changeFrequency: "monthly" },
  { path: "/odc-logistics", priority: 0.9, changeFrequency: "monthly" },
  { path: "/odc-logistics/route-survey", priority: 0.8, changeFrequency: "monthly" },
  { path: "/odc-logistics/reports", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
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
  ...blogPostsByDate.map(
    (post): Route => ({
      path: `/blog/${post.slug}`,
      priority: 0.6,
      changeFrequency: "yearly",
      lastModified: post.updatedAt ?? post.publishedAt,
    }),
  ),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const buildDate = new Date();

  // One page per vehicle model — "<model> spare parts" long-tail queries.
  // Read at request time: models are added and removed from /admin.
  const models = (await listVehicleModels()).map(
    (item): Route => ({
      path: `/vehicle-models/${item.slug}`,
      priority: 0.6,
      changeFrequency: "monthly",
      lastModified: item.updatedAt ? new Date(item.updatedAt) : undefined,
    }),
  );

  return [...routes, ...models].map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified:
      route.lastModified instanceof Date
        ? route.lastModified
        : route.lastModified
          ? new Date(`${route.lastModified}T00:00:00Z`)
          : buildDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
