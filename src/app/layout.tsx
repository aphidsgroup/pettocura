import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutShell from '@/components/LayoutShell';
import { generateLocalBusinessSchema } from '@/lib/schema';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pettocura.com'),
  title: {
    default: 'Petto Cura — Premium Pet Grooming & Boarding in Chennai',
    template: '%s | Petto Cura',
  },
  description: 'Best pet grooming in Nolambur, Chennai. Professional dog grooming, pet boarding, doorstep pickup & drop. Certified groomers, CCTV-monitored boarding. Book now!',
  keywords: [
    'pet grooming Nolambur', 'pet grooming in Nolambur Chennai', 'dog grooming Nolambur',
    'pet boarding Nolambur', 'pet boarding Chennai', 'pet spa Chennai',
    'doorstep pet grooming Chennai', 'dog grooming near me Nolambur',
    'premium pet grooming Chennai', 'safe dog boarding', 'pet daycare Chennai',
    'Petto Cura', 'best pet grooming Chennai', 'pet care Nolambur',
    'dog spa Nolambur Chennai', 'pet grooming near Anna Nagar',
  ],
  authors: [{ name: 'Petto Cura' }],
  creator: 'Petto Cura',
  publisher: 'Petto Cura',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://pettocura.com',
    siteName: 'Petto Cura',
    title: 'Petto Cura — Premium Pet Grooming & Boarding in Chennai',
    description: 'Where every tail wags with joy. Premium pet grooming, boarding, and daycare services in Chennai.',
    images: [
      {
        url: 'https://pettocura.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Petto Cura - Premium Pet Care',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Petto Cura — Premium Pet Care in Chennai',
    description: 'Premium pet grooming & boarding in Nolambur, Chennai. Book now!',
    images: ['https://pettocura.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://pettocura.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="antialiased bg-white text-stone-900">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}

