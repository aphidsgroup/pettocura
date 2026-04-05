'use client';

import HeroSection from '@/components/ui/HeroSection';
import ServiceCard from '@/components/ui/ServiceCard';
import KeyFactsTable from '@/components/ui/KeyFactsTable';
import QuickAnswers from '@/components/ui/QuickAnswers';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { PageGate } from '@/components/PageGate';
import { SectionGate } from '@/components/SectionGate';
import FranchiseSection from '@/components/FranchiseSection';
import { defaultServices, ServiceItem } from '@/data/defaults';
import { useAdminData } from '@/hooks/useAdminData';
import { generateFAQSchema } from '@/lib/schema';

const groomingFaqs = [
  { question: 'What is the Grand Opening Offer?', answer: 'We are currently offering 20% OFF on all grooming services as part of our Grand Opening! This includes our Spa Bath, Bath + Basic Grooming, and Full Service packages.' },
  { question: 'How often should I groom my dog?', answer: 'Most dogs benefit from professional grooming every 4-6 weeks. Breeds with longer coats (Shih Tzu, Poodle) may need grooming every 3-4 weeks, while short-coat breeds can go 6-8 weeks.' },
  { question: 'What grooming products do you use?', answer: 'We exclusively use pH-balanced, vet-approved, and premium products. Our line includes quality shampoos and conditioners that are safe and gentle for all skin types.' },
  { question: 'Can you groom cats?', answer: 'Yes! We offer specialized cat grooming including gentle baths, mat removal, nail trimming, and styling. Our groomers are experienced in handling cats with care.' },
  { question: 'Do I need an appointment?', answer: 'We recommend booking appointments for the best experience, but walk-ins are welcome based on availability. You can book online through our Contact page or call us directly at 9566242236.' },
];

const quickAnswers = [
  { question: 'What is the cost of pet grooming at Petto Cura, Chennai?', answer: 'Our grooming services currently feature a 20% Grand Opening Discount. Prices start at ₹960 for Spa Bath, ₹1440 for Bath + Basic Grooming, and ₹2000 for Full Service. Add-ons like Tick Treatment or Dematting are also available.' },
  { question: 'Where is Petto Cura\'s grooming center located?', answer: 'Our grooming center is in Nolambur (Plot.No.6, Door.No.4, M.C.K Layout, Chennai - 600095). We are open 7 days a week from 9:00 AM to 8:00 PM.' },
  { question: 'What is included in the Full Service grooming?', answer: 'Full Service is our most comprehensive package. it includes full grooming, body haircut/styling, blow dry, sanitary trim, paw and body massage, combing, brushing, and mouth spray.' },
];

const keyFacts = [
  { label: 'Primary Services', value: 'Spa Bath, Bath + Basic Grooming, Full Service' },
  { label: 'Price Range', value: '₹960 – ₹2000 (Grand Opening Offer)' },
  { label: 'Experience', value: 'Certified & experienced groomers' },
  { label: 'Products', value: 'Premium products used' },
  { label: 'Environment', value: 'Hygienic, safe & stress-free' },
  { label: 'Pickup & Drop', value: 'Available upon request' },
  { label: 'Operating Hours', value: '9:00 AM to 8:00 PM, 7 days a week' },
  { label: 'Location', value: 'Nolambur, Chennai' },
];

export default function GroomingContent() {
  const { data: allServices } = useAdminData<ServiceItem>('services', defaultServices, 'sort_order');
  const groomingServices = allServices.filter((s) => s.category === 'grooming');
  const faqSchema = generateFAQSchema(groomingFaqs);

  return (
    <PageGate pageKey="grooming">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SectionGate id="grooming-hero">
        <HeroSection
          badge="GRAND OPENING OFFER - 20% OFF"
          title="Premium Pet Grooming Studio in"
          highlight="Nolambur, Chennai"
          subtitle="Experience professional grooming by certified experts using premium products. Enjoy a 20% discount on all packages during our Grand Opening season."
          ctaText="Book Slot Now"
          ctaHref="/contact"
          secondaryCtaText="View New Prices"
          secondaryCtaHref="#services"
        />
      </SectionGate>

      <SectionGate id="grooming-quick-answers">
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <QuickAnswers answers={quickAnswers} />
          </div>
        </section>
      </SectionGate>

      <SectionGate id="grooming-key-facts">
        <section className="py-4 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <KeyFactsTable title="Petto Cura Grooming — Key Facts" facts={keyFacts} />
          </div>
        </section>
      </SectionGate>

      <SectionGate id="grooming-services">
        <section id="services" className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Our Grooming Packages</span>
              <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-stone-900">Choose the Perfect Groom</h2>
              <p className="mt-4 text-stone-500 max-w-2xl mx-auto">Every grooming package includes a health check, ear inspection, and breed-appropriate styling.</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {groomingServices.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  icon={service.icon}
                  name={service.name}
                  description={service.description}
                  price={service.price}
                  features={service.features}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>
      </SectionGate>

      <SectionGate id="grooming-faq">
        <section id="faq" className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12">
              <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Got Questions?</span>
              <h2 className="mt-3 text-3xl font-bold text-stone-900">Frequently Asked Questions</h2>
            </AnimatedSection>

            <div className="space-y-4">
              {groomingFaqs.map((faq, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <details className="group bg-white rounded-2xl border border-stone-200 overflow-hidden">
                    <summary className="flex items-center justify-between px-6 py-5 cursor-pointer hover:bg-stone-50 transition-colors">
                      <span className="font-semibold text-stone-900 text-sm pr-4">{faq.question}</span>
                      <svg className="w-5 h-5 text-stone-400 flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-5 text-sm text-stone-600 leading-relaxed">{faq.answer}</div>
                  </details>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </SectionGate>

      <SectionGate id="grooming-franchise">
        <FranchiseSection />
      </SectionGate>
    </PageGate>
  );
}
