import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const root = "https://mikezhao.dev";
  return ["/", "/projects/adventureworks-analytics", "/projects/adventureworks-analytics/business", "/projects/adventureworks-analytics/technical"].map((path, index) => ({ url: root + (path === "/" ? "" : path), priority: index === 0 ? 1 : 0.7 }));
}
