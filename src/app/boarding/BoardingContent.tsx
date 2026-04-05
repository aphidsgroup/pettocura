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
import { motion } from 'framer-motion';

const boardingFaqs = [
  { question: 'What vaccinations are required for boarding?', answer: 'All pets must be up-to-date on core vaccinations (Rabies, DHPP for dogs; FVRCP for cats) at least 2 weeks before their stay. We also recommend Bordetella (kennel cough) vaccination.' },
  { question: 'Can I visit the facility before booking?', answer: 'Absolutely! We encourage prospective pet parents to tour our facility anytime during operating hours. No appointment needed for tours.' },
  { question: 'What if my pet needs medication during their stay?', answer: 'Our trained staff can administer prescribed medications at no additional charge. Please provide medications in original packaging with clear dosage instructions.' },
  { question: 'How do I receive updates about my pet?', answer: 'We send photo and video updates via WhatsApp throughout the day. Premium Suite guests also get access to live webcam streaming of their pet\'s room.' },
];

const quickAnswers = [
  { question: 'How much does pet boarding cost at Petto Cura, Chennai?', answer: 'Pet Boarding for all breeds starts at ₹1300/night. We offer a comfortable, hygienic, and stress-free environment for your furry friends. Food options include bringing your own (no extra charge) or using our premium meals for ₹200/day.' },
  { question: 'Is Petto Cura boarding cage-free?', answer: 'Yes! We pride ourselves on providing a cage-free, safe, and secure environment where pets can enjoy playtime and supervision throughout their stay.' },
  { question: 'What updates will I receive during my pet\'s stay?', answer: 'We provide daily updates, including photos and videos, so pet parents can stay connected and have peace of mind while they are away.' },
];

const keyFacts = [
  { label: 'Pricing', value: 'Starting ₹1300 / Night' },
  { label: 'Walks', value: '2-3 Walks Daily included' },
  { label: 'Environment', value: 'Comfortable, Hygienic & Cage-Free' },
  { label: 'Handlers', value: 'Experienced & Caring Handlers' },
  { label: 'Care', value: 'Stress-free & Personalized' },
  { label: 'Food Options', value: 'Owner Food (Free) or Our Food (₹200/day)' },
  { label: 'Daily Updates', value: 'Photo/video updates for pet parents' },
  { label: 'Extra Services', value: 'Pickup/Drop, Grooming, Medication Care' },
];

const safetyFeatures = [
  { icon: '🏠', title: 'Cage-Free Boarding', desc: 'A stress-free environment where pets are not confined to cages.' },
  { icon: '🛡️', title: 'Safe & Secure', desc: 'Secure environment with constant supervision and experienced handlers.' },
  { icon: '🧼', title: 'Hygienic Stay', desc: 'Hospital-grade cleaning and fresh water available in a clean space always.' },
  { icon: '🚶', title: 'Daily Walks', desc: '2-3 walks daily to ensure your pet stays active and happy.' },
  { icon: '📱', title: 'Daily Updates', desc: 'Regular photo and video updates sent directly to your phone via WhatsApp.' },
  { icon: '💎', title: 'Premium Care', desc: 'Personalized attention and premium care for pets of all breeds.' },
  { icon: '👩‍🏫', title: 'Trained staff', desc: 'All pets are handled exclusively by trained, pet-loving professionals with experience in animal behavior.' },
];

import { useSiteContent } from '@/hooks/useSiteContent';

export default function BoardingContent() {
  const { getContentValue, loading } = useSiteContent('boarding');
  const { data: allServices } = useAdminData<ServiceItem>('services', defaultServices, 'sort_order');
  const boardingServices = allServices.filter((s) => s.category === 'boarding');

  const boardingFaqs = [
    { question: getContentValue('boarding_faq_1_q', 'What vaccinations are required for boarding?'), answer: getContentValue('boarding_faq_1_a', 'All pets must be up-to-date on core vaccinations (Rabies, DHPP for dogs; FVRCP for cats) at least 2 weeks before their stay. We also recommend Bordetella (kennel cough) vaccination.') },
    { question: getContentValue('boarding_faq_2_q', 'Can I visit the facility before booking?'), answer: getContentValue('boarding_faq_2_a', 'Absolutely! We encourage prospective pet parents to tour our facility anytime during operating hours. No appointment needed for tours.') },
    { question: getContentValue('boarding_faq_3_q', 'What if my pet needs medication during their stay?'), answer: getContentValue('boarding_faq_3_a', 'Our trained staff can administer prescribed medications at no additional charge. Please provide medications in original packaging with clear dosage instructions.') },
    { question: getContentValue('boarding_faq_4_q', 'How do I receive updates about my pet?'), answer: getContentValue('boarding_faq_4_a', 'We send photo and video updates via WhatsApp throughout the day. Premium Suite guests also get access to live webcam streaming of their pet\'s room.') },
  ];

  const quickAnswers = [
    { question: getContentValue('boarding_qa_1_q', 'How much does pet boarding cost at Petto Cura, Chennai?'), answer: getContentValue('boarding_qa_1_a', 'Pet Boarding for all breeds starts at ₹1300/night. We offer a comfortable, hygienic, and stress-free environment for your furry friends. Food options include bringing your own (no extra charge) or using our premium meals for ₹200/day.') },
    { question: getContentValue('boarding_qa_2_q', 'Is Petto Cura boarding cage-free?'), answer: getContentValue('boarding_qa_2_a', 'Yes! We pride ourselves on providing a cage-free, safe, and secure environment where pets can enjoy playtime and supervision throughout their stay.') },
    { question: getContentValue('boarding_qa_3_q', 'What updates will I receive during my pet\'s stay?'), answer: getContentValue('boarding_qa_3_a', 'We provide daily updates, including photos and videos, so pet parents can stay connected and have peace of mind while they are away.') },
  ];

  const keyFacts = [
    { label: getContentValue('boarding_kf_1_l', 'Pricing'), value: getContentValue('boarding_kf_1_v', 'Starting ₹1300 / Night') },
    { label: getContentValue('boarding_kf_2_l', 'Walks'), value: getContentValue('boarding_kf_2_v', '2-3 Walks Daily included') },
    { label: getContentValue('boarding_kf_3_l', 'Environment'), value: getContentValue('boarding_kf_3_v', 'Comfortable, Hygienic & Cage-Free') },
    { label: getContentValue('boarding_kf_4_l', 'Handlers'), value: getContentValue('boarding_kf_4_v', 'Experienced & Caring Handlers') },
    { label: getContentValue('boarding_kf_5_l', 'Care'), value: getContentValue('boarding_kf_5_v', 'Stress-free & Personalized') },
    { label: getContentValue('boarding_kf_6_l', 'Food Options'), value: getContentValue('boarding_kf_6_v', 'Owner Food (Free) or Our Food (₹200/day)') },
    { label: getContentValue('boarding_kf_7_l', 'Daily Updates'), value: getContentValue('boarding_kf_7_v', 'Photo/video updates for pet parents') },
    { label: getContentValue('boarding_kf_8_l', 'Extra Services'), value: getContentValue('boarding_kf_8_v', 'Pickup/Drop, Grooming, Medication Care') },
  ];

  const safetyFeatures = [
    { icon: '🏠', title: getContentValue('boarding_safety_1_t', 'Cage-Free Boarding'), desc: getContentValue('boarding_safety_1_d', 'A stress-free environment where pets are not confined to cages.') },
    { icon: '🛡️', title: getContentValue('boarding_safety_2_t', 'Safe & Secure'), desc: getContentValue('boarding_safety_2_d', 'Secure environment with constant supervision and experienced handlers.') },
    { icon: '🧼', title: getContentValue('boarding_safety_3_t', 'Hygienic Stay'), desc: getContentValue('boarding_safety_3_d', 'Hospital-grade cleaning and fresh water available in a clean space always.') },
    { icon: '🚶', title: getContentValue('boarding_safety_4_t', 'Daily Walks'), desc: getContentValue('boarding_safety_4_d', '2-3 walks daily to ensure your pet stays active and happy.') },
    { icon: '📱', title: getContentValue('boarding_safety_5_t', 'Daily Updates'), desc: getContentValue('boarding_safety_5_d', 'Regular photo and video updates sent directly to your phone via WhatsApp.') },
    { icon: '💎', title: getContentValue('boarding_safety_6_t', 'Premium Care'), desc: getContentValue('boarding_safety_6_d', 'Personalized attention and premium care for pets of all breeds.') },
    { icon: '👩‍🏫', title: getContentValue('boarding_safety_7_t', 'Trained staff'), desc: getContentValue('boarding_safety_7_d', 'All pets are handled exclusively by trained, pet-loving professionals with experience in animal behavior.') },
  ];

  const faxSchema = generateFAQSchema(boardingFaqs);

  if (loading) return <div className="py-20 text-center text-stone-400">Loading Boarding Suite...</div>;

  return (
    <PageGate pageKey="boarding">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faxSchema) }}
      />

      <SectionGate id="boarding-hero">
        <HeroSection
          badge={getContentValue('boarding_hero_badge', 'Cage-Free Pet Boarding Studio')}
          title={getContentValue('boarding_hero_title', 'Safe Pet Boarding for')}
          highlight={getContentValue('boarding_hero_highlight', 'All Breeds')}
          subtitle={getContentValue('boarding_hero_subtitle', 'Experienced handlers providing a comfortable, hygienic, and stress-free stay in Nolambur, Chennai. Starting from ₹1300/night with daily walks and updates.')}
          ctaText="Book Slot Now"
          ctaHref="/contact"
          secondaryCtaText="Tour Online"
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
            <KeyFactsTable title={getContentValue('boarding_kf_title', 'Petto Cura Boarding — Key Facts')} facts={keyFacts} />
          </div>
        </section>
      </SectionGate>

      <SectionGate id="boarding-safety">
        <section className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">
                {getContentValue('boarding_safety_badge', 'Safety First')}
              </span>
              <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-stone-900">
                {getContentValue('boarding_safety_title', 'Your Pet\'s Safety, Guaranteed')}
              </h2>
              <p className="mt-4 text-stone-500 max-w-2xl mx-auto">
                {getContentValue('boarding_safety_subtitle', 'We\'ve invested in the best safety infrastructure so you can rest easy.')}
              </p>
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
              <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">
                {getContentValue('boarding_live_badge', 'Live Pet Updates')}
              </span>
              <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-stone-900">
                {getContentValue('boarding_live_title', 'Never Miss a Moment')}
              </h2>
              <p className="mt-4 text-stone-500 leading-relaxed">
                {getContentValue('boarding_live_subtitle', 'Get real-time WhatsApp updates with photos and videos of your pet throughout their stay. Premium Suite guests enjoy live webcam access to their pet\'s room.')}
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  getContentValue('boarding_live_point_1', '📸 Photo updates every 3-4 hours'), 
                  getContentValue('boarding_live_point_2', '🎥 Video clips of playtime'), 
                  getContentValue('boarding_live_point_3', '📱 WhatsApp delivery'), 
                  getContentValue('boarding_live_point_4', '🔴 Live webcam (Premium Suite)')
                ].map((item) => (
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
                        <div className="w-full h-28 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center text-3xl mb-2">
                          {getContentValue('boarding_live_phone_icon_1', '🐕')}
                        </div>
                        <p className="text-xs text-stone-600">
                          {getContentValue('boarding_live_phone_msg_1', 'Your buddy just finished his morning playtime! He made a new friend today 🐾')}
                        </p>
                        <p className="text-[10px] text-stone-400 mt-1 text-right">10:30 AM</p>
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-[85%]">
                        <p className="text-xs text-stone-600">
                          {getContentValue('boarding_live_phone_msg_2', 'Lunch time! He ate all his kibble + the special treat you packed 😋')}
                        </p>
                        <p className="text-[10px] text-stone-400 mt-1 text-right">1:15 PM</p>
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-[85%]">
                        <div className="w-full h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center text-2xl mb-2">
                          {getContentValue('boarding_live_phone_icon_3', '😴🐕')}
                        </div>
                        <p className="text-xs text-stone-600">
                          {getContentValue('boarding_live_phone_msg_3', 'Nap time in his cozy suite. Such a good boy! 💤')}
                        </p>
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
              <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">
                {getContentValue('boarding_services_badge', 'Boarding Packages')}
              </span>
              <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-stone-900">
                {getContentValue('boarding_services_title', 'Find the Perfect Stay')}
              </h2>
              <p className="mt-4 text-stone-500 max-w-2xl mx-auto">
                {getContentValue('boarding_services_subtitle', 'Choose from our flexible boarding packages — with or without meals to suit your pet\'s dietary needs.')}
              </p>
            </AnimatedSection>

            {/* With Food / Without Food Toggle Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <AnimatedSection>
                <div className="relative bg-white rounded-3xl border-2 border-teal-200 p-8 shadow-lg shadow-teal-50 overflow-hidden">
                  <div className="absolute top-0 right-0 bg-teal-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl">POPULAR</div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🍽️</span>
                    <div>
                      <h3 className="text-xl font-bold text-stone-900">
                        {getContentValue('boarding_pkg_1_title', 'With Food Package')}
                      </h3>
                      <p className="text-teal-600 text-sm font-semibold">
                        {getContentValue('boarding_pkg_1_subtitle', 'All-inclusive care')}
                      </p>
                    </div>
                  </div>
                  <p className="text-stone-500 text-sm mb-5">
                    {getContentValue('boarding_pkg_1_desc', 'Complete boarding with 3 nutritious meals per day, customized to your pet\'s dietary requirements. Includes premium kibble, fresh water station, and occasional healthy treats.')}
                  </p>
                  <ul className="space-y-2.5 mb-6">
                    {[
                      getContentValue('boarding_pkg_1_feat_1', '3 meals/day (customizable diet)'), 
                      getContentValue('boarding_pkg_1_feat_2', 'Premium quality pet food'), 
                      getContentValue('boarding_pkg_1_feat_3', 'Fresh water station 24/7'), 
                      getContentValue('boarding_pkg_1_feat_4', 'Healthy snacks & treats included'), 
                      getContentValue('boarding_pkg_1_feat_5', 'Special diet support available')
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-stone-600">
                        <span className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-teal-50 rounded-2xl p-4 text-center">
                    <p className="text-stone-500 text-xs">Starting from</p>
                    <p className="text-2xl font-bold text-teal-700">
                      {getContentValue('boarding_pkg_1_price', '₹999')}
                      <span className="text-sm font-normal text-stone-400">/night</span>
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div className="bg-white rounded-3xl border border-stone-200 p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🏠</span>
                    <div>
                      <h3 className="text-xl font-bold text-stone-900">
                        {getContentValue('boarding_pkg_2_title', 'Without Food Package')}
                      </h3>
                      <p className="text-amber-600 text-sm font-semibold">
                        {getContentValue('boarding_pkg_2_subtitle', 'Bring your own food')}
                      </p>
                    </div>
                  </div>
                  <p className="text-stone-500 text-sm mb-5">
                    {getContentValue('boarding_pkg_2_desc', 'Safe and comfortable boarding without meals — ideal if your pet has a special diet or prescription food. You provide the food, we handle everything else.')}
                  </p>
                  <ul className="space-y-2.5 mb-6">
                    {[
                      getContentValue('boarding_pkg_2_feat_1', 'Comfortable sleeping area'), 
                      getContentValue('boarding_pkg_2_feat_2', 'Playtime & exercise sessions'), 
                      getContentValue('boarding_pkg_2_feat_3', 'Fresh water station 24/7'), 
                      getContentValue('boarding_pkg_2_feat_4', 'WhatsApp photo/video updates'), 
                      getContentValue('boarding_pkg_2_feat_5', 'You bring your pet\'s food')
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-stone-600">
                        <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xs flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-amber-50 rounded-2xl p-4 text-center">
                    <p className="text-stone-500 text-xs">Starting from</p>
                    <p className="text-2xl font-bold text-amber-700">
                      {getContentValue('boarding_pkg_2_price', '₹699')}
                      <span className="text-sm font-normal text-stone-400">/night</span>
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Existing service cards from Supabase */}
            <AnimatedSection className="text-center mb-8">
              <h3 className="text-xl font-bold text-stone-900">
                {getContentValue('boarding_svc_detail_title', 'Detailed Service Packages')}
              </h3>
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
              <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">
                {getContentValue('boarding_faq_badge', 'Questions?')}
              </span>
              <h2 className="mt-3 text-3xl font-bold text-stone-900">
                {getContentValue('boarding_faq_title', 'Boarding FAQs')}
              </h2>
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

      <SectionGate id="boarding-franchise">
        <FranchiseSection />
      </SectionGate>
    </PageGate>
  );
}
