import type { MetadataRoute } from "next";
import { asset, site } from "@/content/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Agent Kit",
    description: site.description,
    start_url: asset("/"),
    scope: asset("/"),
    display: "standalone",
    background_color: "#0b0b0b",
    theme_color: "#ff2da8",
    icons: [
      { src: asset("/icon-192.png"), sizes: "192x192", type: "image/png", purpose: "any" },
      { src: asset("/icon-512.png"), sizes: "512x512", type: "image/png", purpose: "any" },
      { src: asset("/icon-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
