import type { MetadataRoute } from 'next';
import { destinations } from '@/lib/destinations';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.org';
  return ['/', '/explore', '/culture', '/plan', '/credits', ...destinations.map((item) => `/destinations/${item.slug}`)].map((path) => ({url: `${base}${path}`, changeFrequency: 'monthly' as const, priority: path === '/' ? 1 : 0.7}));
}
