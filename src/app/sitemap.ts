import type { MetadataRoute } from 'next';
import { defaultBlogPosts } from '@/data/defaults';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pettocura.com';

  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1, lastModified: now },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: `${baseUrl}/grooming`, changeFrequency: 'monthly', priority: 0.9, lastModified: now },
    { url: `${baseUrl}/boarding`, changeFrequency: 'monthly', priority: 0.9, lastModified: now },
    { url: `${baseUrl}/franchise`, changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: `${baseUrl}/find-a-center`, changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.7, lastModified: now },
  ];

  const blogPages: MetadataRoute.Sitemap = defaultBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
