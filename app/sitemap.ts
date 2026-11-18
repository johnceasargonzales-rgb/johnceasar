
import type { MetadataRoute } from "next";
import { destinations } from "@/lib/destinations";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    "https://johnceasargonzales-rgb.github.io/johnceasar";

  return [
    "/",
    "/explore",
    "/culture",
    "/plan",
    "/credits",
    ...destinations.map(
      (item) => `/destinations/${item.slug}`
    ),
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
