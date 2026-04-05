import type { Metadata } from 'next';
import AboutContent from './AboutContent';
import { generateBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'About Us | Petto Cura — Premium Pet Care Chennai',
  description: 'Learn about Petto Cura, our expert team of certified groomers, and our commitment to premium pet care in Nolambur, Chennai. Your pet’s second home.',
  keywords: ['about Petto Cura', 'professional pet groomers Chennai', 'pet care experts Nolambur', 'pet care studio Chennai'],
  openGraph: {
    title: 'About Petto Cura | Premium Pet Care',
    description: 'Our mission is to provide the best grooming and boarding for your pets in Chennai.',
    url: 'https://pettocura.com/about',
  },
};

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pettocura.com' },
    { name: 'About Us', url: 'https://pettocura.com/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutContent />
    </>
  );
}
