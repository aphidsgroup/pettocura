import type { Metadata } from 'next';
import GroomingContent from './GroomingContent';
import { generateBreadcrumbSchema, generateServiceSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Pet Grooming & Spa in Nolambur | Petto Cura Chennai',
  description: 'Professional pet grooming in Nolambur, Chennai. 20% OFF Grand Opening! Full body grooming, spa, and de-shedding by certified experts. Free pickup & drop.',
  keywords: ['pet grooming Chennai', 'dog grooming Nolambur', 'cat grooming Nolambur', 'pet spa Chennai', 'premium pet grooming near me', 'pet grooming Mogappair', 'dog grooming Anna Nagar'],
  openGraph: {
    title: 'Pet Grooming & Spa in Nolambur | Petto Cura',
    description: 'Professional pet grooming in Nolambur, Chennai. 20% OFF Grand Opening! Certified groomers, doorstep pickup & drop.',
    url: 'https://pettocura.com/grooming',
  },
};

export default function GroomingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pettocura.com' },
    { name: 'Grooming', url: 'https://pettocura.com/grooming' },
  ]);

  const serviceSchema = generateServiceSchema(
    'Professional Pet Grooming in Nolambur',
    'Certified pet grooming services including spa baths, full body haircuts, and de-shedding for dog and cats.',
    '960',
    'Nolambur, Chennai'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <GroomingContent />
    </>
  );
}
