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
  { question: 'How often should I groom my dog?', answer: 'Most dogs benefit from professional grooming every 4-6 weeks. Breeds with longer coats (Shih Tzu, Poodle) may need grooming every 3-4 weeks, while short-coat breeds can go 6-8 weeks.' },
  { question: 'What grooming products do you use?', answer: 'We exclusively use pH-balanced, vet-approved, and cruelty-free products. Our premium line includes hypoallergenic shampoos, organic conditioners, and natural de-shedding treatments.' },
  { question: 'Can you groom cats?', answer: 'Yes! We offer specialized cat grooming including gentle baths, mat removal, nail trimming, and lion cuts. Our cat groomers are trained in feline-specific handling techniques.' },
  { question: 'What is the "Puppy First Groom" package?', answer: 'This is a gentle introduction to grooming for puppies aged 3-6 months. We use positive reinforcement to build trust, with puppy-safe products and minimal stress. It typically takes 30-45 minutes.' },
  { question: 'Do I need an appointment?', answer: 'We recommend booking appointments for the best experience, but walk-ins are welcome based on availability. You can book online through our Contact page or call us directly.' },
];

const quickAnswers = [
  { question: 'What is the cost of pet grooming at Petto Cura, Chennai?', answer: 'Our grooming services start at ₹599 for Basic Bath & Brush and go up to ₹1,999 for our premium Spa & De-shedding package. Full Body Grooming is ₹1,499. All packages include breed-specific care.' },
  { question: 'Where is Petto Cura\'s grooming center located?', answer: 'Our grooming center is in Nolambur (Plot.No.6, Door.No.4, M.C.K Layout, Chennai - 600095). We are open 7 days a week from 8 AM to 8 PM.' },
  { question: 'Is Petto Cura\'s grooming safe for puppies?', answer: 'Absolutely. Our Puppy First Groom package (₹599) is designed for puppies aged 3-6 months. We use puppy-safe, hypoallergenic products and gentle handling techniques with positive reinforcement.' },
];

const keyFacts = [
  { label: 'Services', value: 'Full Body Grooming, Spa & De-shedding, Basic Bath & Brush, Puppy First Groom' },
  { label: 'Price Range', value: '₹599 – ₹1,999 per session' },
  { label: 'Location', value: 'Nolambur, Chennai, Tamil Nadu' },
  { label: 'Animals Served', value: 'Dogs & Cats of all breeds and sizes' },
  { label: 'Products Used', value: 'pH-balanced, vet-approved, cruelty-free' },
  { label: 'Appointment Required', value: 'Recommended but walk-ins accepted' },
  { label: 'Operating Hours', value: '8:00 AM – 8:00 PM, 7 days a week' },
  { label: 'Certifications', value: 'Professionally trained, 5+ years average experience' },
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
          badge="Certified Professional Groomers"
          title="Premium Pet Grooming in"
          highlight="Chennai"
          subtitle="Breed-specific grooming by certified experts using premium, vet-approved products. Your pet leaves happy, clean, and looking their best."
          ctaText="Book Grooming"
          ctaHref="/contact"
          secondaryCtaText="View Prices"
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
