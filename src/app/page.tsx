'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import HeroSection from '@/components/ui/HeroSection';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { PageGate } from '@/components/PageGate';
import { SectionGate } from '@/components/SectionGate';

const services = [
  { icon: '✂️', title: 'Pet Grooming', desc: 'Full body grooming, spa treatments, and puppy-first grooms by certified professionals.', href: '/grooming', color: 'from-teal-400 to-teal-500' },
  { icon: '🏠', title: 'Pet Boarding', desc: 'Safe, CCTV-monitored boarding with climate control and 24/7 vet access.', href: '/boarding', color: 'from-amber-400 to-orange-400' },
  { icon: '📍', title: 'Find a Center', desc: 'Locate our pet care centers in Nolambur & Mogappair, Chennai.', href: '/find-a-center', color: 'from-violet-400 to-purple-500' },
];

const trustSignals = [
  { number: '5,000+', label: 'Happy Pets Served', icon: '🐾' },
  { number: '15+', label: 'Certified Groomers', icon: '⭐' },
  { number: '4.9/5', label: 'Google Rating', icon: '💛' },
  { number: '24/7', label: 'CCTV Monitoring', icon: '📷' },
];

const whyUs = [
  { icon: '🏆', title: 'Certified Experts', desc: 'Our groomers are professionally trained and certified with 5+ years average experience.' },
  { icon: '💚', title: 'Natural Products', desc: 'We only use pH-balanced, vet-approved, and cruelty-free grooming products.' },
  { icon: '🔒', title: 'Safety First', desc: 'Climate-controlled facilities with live CCTV, fire safety, and on-call veterinarians.' },
  { icon: '📱', title: 'Live Pet Updates', desc: 'Get real-time photo and video updates of your pet during their stay with us.' },
  { icon: '🗓️', title: 'Flexible Scheduling', desc: 'Early morning to late evening slots. Walk-ins welcome, but appointments preferred.' },
  { icon: '❤️', title: 'Personalized Care', desc: 'Every pet gets a custom care plan based on their breed, temperament, and needs.' },
];

export default function HomePage() {
  return (
    <PageGate pageKey="home">
      <SectionGate id="home-hero">
        <HeroSection
          badge="Now Open in Nolambur & Mogappair"
          title="Where Every Tail Wags With"
          highlight="Joy"
          subtitle="Premium pet grooming, boarding, and daycare that your furry family members deserve. Certified care in the heart of Chennai."
          ctaText="Book Appointment"
          ctaHref="/contact"
          secondaryCtaText="Explore Services"
          secondaryCtaHref="/grooming"
        />
      </SectionGate>

      <SectionGate id="home-services">
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Our Services</span>
              <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-stone-900">Everything Your Pet Needs</h2>
              <p className="mt-4 text-stone-500 max-w-2xl mx-auto">From head-to-paw grooming to safe overnight boarding, we provide comprehensive pet care with love.</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <Link
                    href={service.href}
                    className="group block bg-white rounded-3xl p-8 border border-stone-100 hover:border-teal-200/60 hover:shadow-xl hover:shadow-teal-100/40 transition-all duration-500 hover:-translate-y-1 h-full"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-teal-700 transition-colors">{service.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed mb-4">{service.desc}</p>
                    <span className="inline-flex items-center text-teal-600 text-sm font-semibold group-hover:gap-2 transition-all">
                      Learn More
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionGate>

      <SectionGate id="home-trust">
        <section className="py-16 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {trustSignals.map((signal, i) => (
                <motion.div
                  key={signal.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <span className="text-3xl mb-2 block">{signal.icon}</span>
                  <div className="text-3xl lg:text-4xl font-bold text-white">{signal.number}</div>
                  <p className="text-teal-100 text-sm mt-1">{signal.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionGate>

      <SectionGate id="home-whyus">
        <section className="py-20 lg:py-28 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Why Choose Us</span>
              <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-stone-900">The Petto Cura Difference</h2>
              <p className="mt-4 text-stone-500 max-w-2xl mx-auto">We don&apos;t just care for pets — we treat them like family.</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyUs.map((item, i) => (
                <AnimatedSection key={item.title} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl p-6 border border-stone-100 hover:shadow-lg transition-shadow duration-300 h-full">
                    <span className="text-3xl mb-4 block">{item.icon}</span>
                    <h3 className="text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </SectionGate>

      <SectionGate id="home-cta">
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl p-10 lg:p-16 relative overflow-hidden">
                <div className="absolute inset-0">
                  <div className="absolute -top-16 -right-16 w-64 h-64 bg-teal-500/30 rounded-full blur-2xl" />
                  <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-teal-400/20 rounded-full blur-2xl" />
                </div>
                <div className="relative">
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Give Your Pet the Best Care?</h2>
                  <p className="text-teal-100 text-lg mb-8 max-w-xl mx-auto">Book a grooming session or boarding stay today. Your pet will thank you with extra tail wags! 🐾</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/contact"
                      className="px-8 py-4 bg-white text-teal-700 font-semibold rounded-2xl hover:bg-teal-50 transition-colors shadow-lg"
                    >
                      Book Now
                    </Link>
                    <Link
                      href="/find-a-center"
                      className="px-8 py-4 bg-teal-500/30 text-white font-semibold rounded-2xl border border-teal-400/30 hover:bg-teal-500/40 transition-colors"
                    >
                      Find Nearest Center
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </SectionGate>
    </PageGate>
  );
}
