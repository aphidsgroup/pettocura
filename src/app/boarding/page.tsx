import type { Metadata } from 'next';
import BoardingContent from './BoardingContent';

export const metadata: Metadata = {
  title: 'Pet Boarding — Safe Dog & Cat Boarding in Chennai',
  description: 'Safe, climate-controlled pet boarding in Nolambur, Chennai. 24/7 CCTV monitoring, vet on-call, live pet updates. Overnight boarding from ₹999/night.',
  keywords: ['pet boarding Chennai', 'dog boarding Nolambur', 'safe pet boarding Chennai', 'cat boarding Chennai', 'pet daycare Chennai'],
  openGraph: {
    title: 'Safe Pet Boarding | Petto Cura Chennai',
    description: 'Climate-controlled boarding with 24/7 CCTV and live updates. From ₹999/night.',
    url: 'https://pettocura.com/boarding',
  },
};

export default function BoardingPage() {
  return <BoardingContent />;
}
