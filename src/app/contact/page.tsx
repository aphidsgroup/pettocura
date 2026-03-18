import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us — Book an Appointment',
  description: 'Contact Petto Cura for pet grooming and boarding appointments. Located in Nolambur, Chennai. Call us or fill out our booking form.',
  keywords: ['contact Petto Cura', 'book pet grooming', 'pet boarding appointment Chennai', 'pet care Nolambur contact'],
  openGraph: {
    title: 'Contact Petto Cura | Book Appointment',
    description: 'Book your pet grooming or boarding appointment. Nolambur, Chennai.',
    url: 'https://pettocura.com/contact',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
