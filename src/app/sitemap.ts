import type { MetadataRoute } from 'next';
import { defaultBlogPosts } from '@/data/defaults';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pettocura.com';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/grooming`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/boarding`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/find-a-center`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const blogPages: MetadataRoute.Sitemap = defaultBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
