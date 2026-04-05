import type { Metadata } from 'next';
import ContactContent from './ContactContent';
import { generateBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Book Appointment & Contact | Petto Cura Nolambur',
  description: 'Book your pet grooming or boarding appointment at Petto Cura, Nolambur, Chennai. Contact us at +91-95662-42236 or visit our pet studio.',
  keywords: ['contact Petto Cura', 'book pet grooming', 'pet boarding appointment Chennai', 'pet care Nolambur contact', 'grooming appointment Chennai'],
  openGraph: {
    title: 'Book Appointment | Petto Cura Chennai',
    description: 'Schedule your pet grooming or boarding stay. Located in Nolambur, Chennai.',
    url: 'https://pettocura.com/contact',
  },
};

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pettocura.com' },
    { name: 'Contact', url: 'https://pettocura.com/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactContent />
    </>
  );
}
