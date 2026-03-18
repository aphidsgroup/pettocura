import type { Metadata } from 'next';
import GroomingContent from './GroomingContent';

export const metadata: Metadata = {
  title: 'Pet Grooming Services — Premium Dog & Cat Grooming in Chennai',
  description: 'Professional pet grooming in Nolambur & Mogappair, Chennai. Full body grooming, spa, de-shedding, and puppy grooming by certified groomers. Starting at ₹599.',
  keywords: ['pet grooming Chennai', 'dog grooming Nolambur', 'cat grooming Mogappair', 'pet spa Chennai', 'premium pet grooming near me'],
  openGraph: {
    title: 'Pet Grooming Services | Petto Cura Chennai',
    description: 'Professional pet grooming in Nolambur & Mogappair. Full body grooming, spa, de-shedding starting at ₹599.',
    url: 'https://pettocura.com/grooming',
  },
};

export default function GroomingPage() {
  return <GroomingContent />;
}
