export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://pettocura.com/#localbusiness',
    name: 'Petto Cura',
    description: 'Premium pet grooming and boarding services in Nolambur, Chennai. Professional pet care with certified groomers and safe boarding facilities.',
    url: 'https://pettocura.com',
    telephone: '+91-95662-42236',
    email: 'hello@pettocura.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot.No.6, Door.No.4, M.C.K Layout, Nolambur',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      postalCode: '600095',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 13.068643,
      longitude: 80.162437,
    },
    openingHours: 'Mo-Su 09:00-20:00',
    priceRange: '₹₹',
    image: 'https://pettocura.com/og-image.png',
    sameAs: [
      'https://www.instagram.com/pettocura',
      'https://www.facebook.com/pettocura',
    ],
    areaServed: [
      { '@type': 'City', name: 'Chennai' },
      { '@type': 'Place', name: 'Nolambur, Chennai' },
      { '@type': 'Place', name: 'Mogappair, Chennai' },
      { '@type': 'Place', name: 'Anna Nagar, Chennai' },
      { '@type': 'Place', name: 'Ambattur, Chennai' },
      { '@type': 'Place', name: 'Padi, Chennai' },
      { '@type': 'Place', name: 'Koyambedu, Chennai' },
      { '@type': 'Place', name: 'Maduravoyal, Chennai' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pet Care Services in Nolambur, Chennai',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Pet Grooming in Nolambur', description: 'Professional pet grooming, spa treatments, de-shedding, nail trimming, and puppy grooming in Nolambur, Chennai' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Pet Boarding in Nolambur', description: 'Safe overnight pet boarding, CCTV-monitored premium suites, daycare, and extended stays in Nolambur, Chennai' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Doorstep Pet Pickup', description: 'Free doorstep pickup and drop service for pet grooming in Nolambur and nearby areas in Chennai' },
        },
      ],
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://pettocura.com/#organization',
    name: 'Petto Cura',
    url: 'https://pettocura.com',
    logo: 'https://pettocura.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-95662-42236',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi', 'ta'],
    },
    sameAs: [
      'https://www.instagram.com/pettocura',
      'https://www.facebook.com/pettocura',
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://pettocura.com/#website',
    url: 'https://pettocura.com',
    name: 'Petto Cura',
    description: 'Where every tail wags with joy — Premium Pet Grooming & Boarding in Chennai.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://pettocura.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateServiceSchema(
  name: string,
  description: string,
  price: string,
  areaServed: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Petto Cura',
      url: 'https://pettocura.com',
    },
    areaServed: {
      '@type': 'Place',
      name: areaServed,
    },
    offers: {
      '@type': 'Offer',
      price: price.replace(/[^0-9]/g, ''),
      priceCurrency: 'INR',
    },
  };
}

export function generateBlogPostSchema(post: {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  slug: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'Petto Cura',
      url: 'https://pettocura.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://pettocura.com/blog/${post.slug}`,
    },
    image: post.image,
  };
}
