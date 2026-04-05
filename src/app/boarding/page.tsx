import type { Metadata } from 'next';
import BoardingContent from './BoardingContent';
import { generateBreadcrumbSchema, generateServiceSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Premium Pet Boarding in Nolambur, Chennai | Petto Cura',
  description: 'Safe, cage-free pet boarding in Nolambur, Chennai. 24/7 CCTV, live updates, and vet on-call. Climate-controlled suites from ₹1300/night.',
  keywords: ['pet boarding Chennai', 'dog boarding Nolambur', 'safe pet boarding Chennai', 'cat boarding Chennai', 'pet daycare Chennai', 'pet hotel Chennai'],
  alternates: {
    canonical: 'https://pettocura.com/boarding',
  },
  openGraph: {
    title: 'Safe & Premium Pet Boarding | Petto Cura Chennai',
    description: 'Cage-free climate-controlled boarding with 24/7 CCTV and live updates. From ₹1300/night.',
    url: 'https://pettocura.com/boarding',
    images: [{ url: 'https://pettocura.com/og-image.png', width: 1200, height: 630, alt: 'Petto Cura Pet Boarding Nolambur Chennai' }],
  },
};

export default function BoardingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pettocura.com' },
    { name: 'Boarding', url: 'https://pettocura.com/boarding' },
  ]);

  const serviceSchema = generateServiceSchema(
    'Premium Pet Boarding in Nolambur',
    'Safe, cage-free, and climate-controlled overnight pet boarding with CCTV monitoring and live updates in Chennai.',
    '1300',
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
      <BoardingContent />
    </>
  );
}
