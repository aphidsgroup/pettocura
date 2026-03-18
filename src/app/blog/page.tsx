import type { Metadata } from 'next';
import BlogContent from './BlogContent';

export const metadata: Metadata = {
  title: 'Pet Care Blog — Expert Tips & Guides',
  description: 'Expert pet care tips, grooming guides, and boarding advice from Petto Cura. Learn how to keep your furry friend healthy and happy.',
  keywords: ['pet care tips', 'dog grooming guide', 'pet boarding tips', 'pet health blog', 'Chennai pet care'],
  openGraph: {
    title: 'Pet Care Blog | Petto Cura',
    description: 'Expert pet care tips, grooming guides, and boarding advice.',
    url: 'https://pettocura.com/blog',
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
