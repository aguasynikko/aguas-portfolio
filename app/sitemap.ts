import type { MetadataRoute } from "next";
import { getChapters } from "@/lib/memoir";
import { siteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const chapters = await getChapters();
  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteUrl}/publications`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/memoir`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...chapters.map((c) => ({
      url: `${siteUrl}/memoir/${c.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
