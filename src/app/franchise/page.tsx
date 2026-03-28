import type { Metadata } from 'next';
import FranchiseContent from './FranchiseContent';

export const metadata: Metadata = {
  title: 'Franchise Opportunity — Own a Petto Cura Pet Care Center',
  description: 'Start your own pet care business with Petto Cura franchise. Low investment, high returns, complete training & support. Join India\'s fastest-growing pet care brand.',
  keywords: ['pet franchise', 'pet care franchise India', 'pet grooming franchise Chennai', 'Petto Cura franchise', 'pet business opportunity'],
  openGraph: {
    title: 'Franchise Opportunity — Petto Cura',
    description: 'Own a Petto Cura franchise. Low investment, proven model, complete support.',
  },
};

export default function FranchisePage() {
  return <FranchiseContent />;
}
