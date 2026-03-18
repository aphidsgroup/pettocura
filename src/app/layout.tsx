import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
  description: 'Premium pet grooming and boarding services in Nolambur & Mogappair, Chennai. Certified groomers, safe boarding, and 24/7 live pet updates. Book your appointment today.',
  keywords: [
    'pet grooming Chennai', 'dog boarding Chennai', 'pet care Nolambur',
    'dog grooming Mogappair', 'pet boarding Mogappair', 'pet spa Chennai',
    'premium pet grooming', 'safe dog boarding', 'pet daycare Chennai',
    'Petto Cura', 'pet grooming near me', 'best pet grooming Chennai',
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
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Petto Cura - Premium Pet Care',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Petto Cura — Premium Pet Care in Chennai',
    description: 'Premium pet grooming & boarding in Nolambur & Mogappair. Book now!',
    images: ['/og-image.png'],
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
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
