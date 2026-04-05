import type { Metadata } from 'next';
import FranchiseContent from './FranchiseContent';
import { generateBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Franchise Opportunity — Own a Petto Cura Pet Care Center',
  description: 'Start your own pet care business with Petto Cura franchise. Low investment, high returns, complete training & support. Join India\'s fastest-growing pet care brand.',
  keywords: ['pet franchise', 'pet care franchise India', 'pet grooming franchise Chennai', 'Petto Cura franchise', 'pet business opportunity'],
  alternates: {
    canonical: 'https://pettocura.com/franchise',
  },
  openGraph: {
    title: 'Franchise Opportunity — Petto Cura',
    description: 'Own a Petto Cura franchise. Low investment, proven model, complete support.',
    url: 'https://pettocura.com/franchise',
    images: [{ url: 'https://pettocura.com/og-image.png', width: 1200, height: 630, alt: 'Petto Cura Franchise Opportunity India' }],
  },
};

export default function FranchisePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pettocura.com' },
    { name: 'Franchise', url: 'https://pettocura.com/franchise' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FranchiseContent />
    </>
  );
}
