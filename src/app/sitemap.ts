import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://valymoekspertai.lt";
  const content = await getSiteContent();

  return [
    {
      url: siteUrl,
      lastModified: new Date(content.updatedAt),
      changeFrequency: "weekly",
      priority: 1
    }
  ];
}
