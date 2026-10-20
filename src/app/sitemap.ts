import type { MetadataRoute } from "next";
import { flatNav, site } from "@/content/site";

export const dynamic = "force-static";

/** Every page, for search engines. URLs resolve against the deployed base (site.url). */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string) => new URL(path.replace(/^\//, ""), site.url).toString();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...flatNav.map((item) => ({
      url: page(item.href),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: item.href === "/docs/bridge/" || item.href === "/docs/video/" ? 0.9 : 0.7,
    })),
  ];
}
