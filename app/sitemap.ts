import { MetadataRoute } from "next";
import { APP_CONFIG } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = APP_CONFIG.site.url;
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/mentions-legales`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
