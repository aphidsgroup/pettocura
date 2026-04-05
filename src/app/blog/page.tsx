import type { Metadata } from 'next';
import BlogContent from './BlogContent';

export const metadata: Metadata = {
  title: 'Pet Care Blog — Expert Tips & Guides',
  description: 'Expert pet care tips, grooming guides, and boarding advice from Petto Cura. Learn how to keep your furry friend healthy and happy.',
  keywords: ['pet care tips', 'dog grooming guide', 'pet boarding tips', 'pet health blog', 'Chennai pet care'],
  alternates: {
    canonical: 'https://pettocura.com/blog',
  },
  openGraph: {
    title: 'Pet Care Blog | Petto Cura',
    description: 'Expert pet care tips, grooming guides, and boarding advice.',
    url: 'https://pettocura.com/blog',
    images: [{ url: 'https://pettocura.com/og-image.png', width: 1200, height: 630, alt: 'Petto Cura Pet Care Blog Chennai' }],
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
