import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutShell from '@/components/LayoutShell';
import { generateLocalBusinessSchema, generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema';

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
    'pet grooming Mogappair', 'dog grooming Mogappair',
  ],
  creator: 'Petto Cura',
  publisher: 'Petto Cura',
  applicationName: 'Petto Cura',
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
  alternates: {
    canonical: 'https://pettocura.com',
  },
  verification: {
    google: 'ee3804gysDuNqgvAqum7HdDNi6t4XYullRayDdK1AGM',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = generateLocalBusinessSchema();
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TDC2CXN6');`
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18099096358"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18099096358');
            `
          }}
        />
        {/* End Google tag (gtag.js) */}
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased bg-white text-stone-900">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TDC2CXN6"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}

