'use client';

import HeroSection from '@/components/ui/HeroSection';
import ServiceCard from '@/components/ui/ServiceCard';
import KeyFactsTable from '@/components/ui/KeyFactsTable';
import QuickAnswers from '@/components/ui/QuickAnswers';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { PageGate } from '@/components/PageGate';
import { SectionGate } from '@/components/SectionGate';
import { defaultServices } from '@/data/defaults';
import { generateFAQSchema } from '@/lib/schema';
import { motion } from 'framer-motion';

const boardingFaqs = [
  { question: 'What vaccinations are required for boarding?', answer: 'All pets must be up-to-date on core vaccinations (Rabies, DHPP for dogs; FVRCP for cats) at least 2 weeks before their stay. We also recommend Bordetella (kennel cough) vaccination.' },
  { question: 'Can I visit the facility before booking?', answer: 'Absolutely! We encourage prospective pet parents to tour our facility anytime during operating hours. No appointment needed for tours.' },
  { question: 'What if my pet needs medication during their stay?', answer: 'Our trained staff can administer prescribed medications at no additional charge. Please provide medications in original packaging with clear dosage instructions.' },
  { question: 'How do I receive updates about my pet?', answer: 'We send photo and video updates via WhatsApp throughout the day. Premium Suite guests also get access to live webcam streaming of their pet\'s room.' },
];

const quickAnswers = [
  { question: 'How much does pet boarding cost at Petto Cura, Chennai?', answer: 'Overnight Boarding starts at ₹999/night. Our Premium Suite is ₹1,799/night with private room, live webcam, and personal caretaker. Daycare is ₹599/day. Extended stays (7+ days) get discounted rates at ₹799/night.' },
  { question: 'Is Petto Cura boarding facility safe for dogs?', answer: 'Yes. Our facility features 24/7 CCTV monitoring, climate-controlled rooms, fire safety systems, veterinarian on-call, and separate areas for different-sized pets. Only trained staff handle your pets.' },
  { question: 'Does Petto Cura offer live pet updates during boarding?', answer: 'Yes! All boarding guests receive WhatsApp photo/video updates throughout the day. Premium Suite guests additionally get live webcam streaming for real-time monitoring.' },
];

const keyFacts = [
  { label: 'Services', value: 'Overnight Boarding, Premium Suite, Daycare, Extended Stay (7+ days)' },
  { label: 'Price Range', value: '₹599/day (Daycare) – ₹1,799/night (Premium Suite)' },
  { label: 'Location', value: 'Nolambur, Chennai, Tamil Nadu' },
  { label: 'Safety Features', value: '24/7 CCTV, Climate Control, Vet On-Call, Fire Safety' },
  { label: 'Updates', value: 'WhatsApp photo/video updates; live webcam for Premium Suite' },
  { label: 'Meals', value: '3 meals/day (customizable to pet\'s diet)' },
  { label: 'Check-in Time', value: '8:00 AM – 8:00 PM' },
  { label: 'Requirements', value: 'Up-to-date vaccinations (at least 2 weeks prior)' },
];

const safetyFeatures = [
  { icon: '📹', title: '24/7 CCTV', desc: 'Round-the-clock video monitoring in all areas with cloud-recorded footage.' },
  { icon: '🌡️', title: 'Climate Control', desc: 'Temperature and humidity controlled for year-round comfort.' },
  { icon: '👨‍⚕️', title: 'Vet On-Call', desc: 'Licensed veterinarian available 24/7 for emergency care.' },
  { icon: '🔥', title: 'Fire Safety', desc: 'Smoke detectors, fire extinguishers, and emergency evacuation plan.' },
  { icon: '🐕', title: 'Size Separation', desc: 'Separate play areas and rooms for small, medium, and large pets.' },
  { icon: '🧹', title: 'Daily Sanitation', desc: 'Hospital-grade cleaning and disinfection of all areas daily.' },
];

export default function BoardingContent() {
  const boardingServices = defaultServices.filter((s) => s.category === 'boarding');
  const faqSchema = generateFAQSchema(boardingFaqs);

  return (
    <PageGate pageKey="boarding">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SectionGate id="boarding-hero">
        <HeroSection
          badge="Safety-First Pet Boarding"
          title="Safe Dog Boarding in"
          highlight="Nolambur, Chennai"
          subtitle="Climate-controlled, CCTV-monitored boarding with live updates. Your pet's safety is our top priority — always."
          ctaText="Book Boarding"
          ctaHref="/contact"
          secondaryCtaText="Tour Our Facility"
          secondaryCtaHref="/find-a-center"
        />
      </SectionGate>

      <SectionGate id="boarding-quick-answers">
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <QuickAnswers answers={quickAnswers} />
          </div>
        </section>
      </SectionGate>

      <SectionGate id="boarding-key-facts">
        <section className="py-4 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <KeyFactsTable title="Petto Cura Boarding — Key Facts" facts={keyFacts} />
          </div>
        </section>
      </SectionGate>

      <SectionGate id="boarding-safety">
        <section className="py-20 bg-stone-50">
          {/* ... safety content stays same ... */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Safety First</span>
              <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-stone-900">Your Pet&apos;s Safety, Guaranteed</h2>
              <p className="mt-4 text-stone-500 max-w-2xl mx-auto">We&apos;ve invested in the best safety infrastructure so you can rest easy.</p>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safetyFeatures.map((feature, i) => (
                <AnimatedSection key={feature.title} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl p-6 border border-stone-100 hover:shadow-lg hover:border-teal-200/50 transition-all duration-300 h-full">
                    <span className="text-3xl mb-4 block">{feature.icon}</span>
                    <h3 className="text-lg font-bold text-stone-900 mb-2">{feature.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </SectionGate>

      <SectionGate id="boarding-live-update">
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Live Pet Updates</span>
              <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-stone-900">Never Miss a Moment</h2>
              <p className="mt-4 text-stone-500 leading-relaxed">Get real-time WhatsApp updates with photos and videos of your pet throughout their stay. Premium Suite guests enjoy live webcam access to their pet&apos;s room.</p>
              <ul className="mt-6 space-y-3">
                {['📸 Photo updates every 3-4 hours', '🎥 Video clips of playtime', '📱 WhatsApp delivery', '🔴 Live webcam (Premium Suite)'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-stone-600">{item}</li>
                ))}
              </ul>
            </AnimatedSection>

            {/* Phone Mockup */}
            <AnimatedSection delay={0.2}>
              <div className="flex justify-center">
                <motion.div
                  initial={{ rotate: 3 }}
                  whileInView={{ rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative w-64 h-[500px] bg-stone-900 rounded-[2.5rem] p-3 shadow-2xl"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-stone-900 rounded-b-2xl z-10" />
                  <div className="w-full h-full bg-gradient-to-b from-teal-50 to-white rounded-[2rem] overflow-hidden flex flex-col">
                    <div className="bg-teal-600 px-4 py-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-bold">PC</div>
                      <div>
                        <div className="text-white text-sm font-semibold">Petto Cura Updates</div>
                        <div className="text-teal-200 text-xs">Online</div>
                      </div>
                    </div>
                    <div className="flex-1 p-3 space-y-3 overflow-hidden">
                      <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-[85%]">
                        <div className="w-full h-28 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center text-3xl mb-2">🐕</div>
                        <p className="text-xs text-stone-600">Your buddy just finished his morning playtime! He made a new friend today 🐾</p>
                        <p className="text-[10px] text-stone-400 mt-1 text-right">10:30 AM</p>
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-[85%]">
                        <p className="text-xs text-stone-600">Lunch time! He ate all his kibble + the special treat you packed 😋</p>
                        <p className="text-[10px] text-stone-400 mt-1 text-right">1:15 PM</p>
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-[85%]">
                        <div className="w-full h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center text-2xl mb-2">😴🐕</div>
                        <p className="text-xs text-stone-600">Nap time in his cozy suite. Such a good boy! 💤</p>
                        <p className="text-[10px] text-stone-400 mt-1 text-right">3:45 PM</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
          </div>
        </section>
      </SectionGate>

      <SectionGate id="boarding-services">
        <section className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Boarding Packages</span>
              <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-stone-900">Find the Perfect Stay</h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {boardingServices.map((service, i) => (
                <ServiceCard key={service.id} icon={service.icon} name={service.name} description={service.description} price={service.price} features={service.features} index={i} />
              ))}
            </div>
          </div>
        </section>
      </SectionGate>

      <SectionGate id="boarding-faq">
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12">
              <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Questions?</span>
              <h2 className="mt-3 text-3xl font-bold text-stone-900">Boarding FAQs</h2>
            </AnimatedSection>

            <div className="space-y-4">
              {boardingFaqs.map((faq, i) => (
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
    </PageGate>
  );
}
