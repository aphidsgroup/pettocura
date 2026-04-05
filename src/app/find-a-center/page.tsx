import type { Metadata } from 'next';
import FindCenterContent from './FindCenterContent';

export const metadata: Metadata = {
  title: 'Find a Center — Pet Care Center in Nolambur, Chennai',
  description: 'Find Petto Cura pet care center in Nolambur, Chennai. Full grooming and boarding services available.',
  keywords: ['pet care center Nolambur', 'pet grooming center Chennai', 'pet boarding near me Chennai', 'Petto Cura locations'],
  alternates: {
    canonical: 'https://pettocura.com/find-a-center',
  },
  openGraph: {
    title: 'Find a Petto Cura Center | Chennai',
    description: 'Locate our pet care center in Nolambur, Chennai.',
    url: 'https://pettocura.com/find-a-center',
    images: [{ url: 'https://pettocura.com/og-image.png', width: 1200, height: 630, alt: 'Petto Cura Pet Care Center Nolambur Chennai' }],
  },
};

export default function FindCenterPage() {
  return <FindCenterContent />;
}
