import type { Metadata } from 'next';
import FindCenterContent from './FindCenterContent';

export const metadata: Metadata = {
  title: 'Find a Center — Pet Care Centers in Nolambur & Mogappair',
  description: 'Find Petto Cura pet care centers near you in Chennai. Locations in Nolambur and Mogappair East with full grooming and boarding services.',
  keywords: ['pet care center Nolambur', 'pet grooming center Mogappair', 'pet boarding near me Chennai', 'Petto Cura locations'],
  openGraph: {
    title: 'Find a Petto Cura Center | Chennai',
    description: 'Locate our pet care centers in Nolambur & Mogappair, Chennai.',
    url: 'https://pettocura.com/find-a-center',
  },
};

export default function FindCenterPage() {
  return <FindCenterContent />;
}
