'use client';

import { motion } from 'framer-motion';
import HeroSection from '@/components/ui/HeroSection';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { PageGate } from '@/components/PageGate';
import { SectionGate } from '@/components/SectionGate';
import FranchiseSection from '@/components/FranchiseSection';

const milestones = [
  { year: '2020', title: 'The Vision', desc: 'Petto Cura was born from a passion for providing holistic, stress-free care for urban pets.' },
  { year: '2022', title: 'Growth', desc: 'Opened our flagship studio in Nolambur, Chennai, with state-of-the-art grooming equipment.' },
  { year: '2024', title: 'Innovation', desc: 'Introduced cage-free boarding and live CCTV updates for complete pet parent peace of mind.' },
  { year: 'Present', title: 'Excellence', desc: 'Serving thousands of pets with a 4.9/5 Google rating and expanding our services.' },
];

export default function AboutContent() {
  return (
    <PageGate pageKey="about">
      <SectionGate id="about-hero">
        <HeroSection
          badge="OUR STORY"
          title="Passion for Pets,"
          highlight="Experts in Care"
          subtitle="At Petto Cura, we believe every pet deserves to look and feel their best. Our mission is to provide premium, safe, and stress-free grooming and boarding services in Chennai."
          ctaText="View Services"
          ctaHref="/grooming"
        />
      </SectionGate>

      <SectionGate id="about-mission">
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection>
                <div className="relative">
                  <div className="aspect-[4/5] bg-stone-100 rounded-3xl overflow-hidden relative border border-stone-200">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/90 backdrop-blur p-6 rounded-2xl border border-white/20">
                        <p className="text-teal-700 font-bold text-xl ring-amber-50">"Our mission is to treat every pet as if they were our own."</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <div className="space-y-8">
                <AnimatedSection>
                  <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Our Mission</span>
                  <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-stone-900 leading-tight">Setting New Standards in Pet Care</h2>
                  <p className="mt-4 text-stone-500 text-lg leading-relaxed">
                    Petto Cura started with a simple goal: to eliminate the stress of pet grooming and boarding. We saw too many "caged" boarding facilities and "rushed" grooming sessions. We decided to build a studio that prioritizes empathy, patience, and professional expertise.
                  </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <AnimatedSection delay={0.1}>
                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                      <h3 className="font-bold text-stone-900 mb-2">Certified Groomers</h3>
                      <p className="text-stone-500 text-sm">Every one of our stylists is professionally certified and trained in stress-free handling.</p>
                    </div>
                  </AnimatedSection>
                  <AnimatedSection delay={0.2}>
                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                      <h3 className="font-bold text-stone-900 mb-2">Vet-Approved</h3>
                      <p className="text-stone-500 text-sm">Our processes and products are vetted by veterinarians for maximum safety and health.</p>
                    </div>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionGate>

      <SectionGate id="about-milestones">
        <section className="py-20 lg:py-28 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Our Journey</span>
              <h2 className="mt-3 text-3xl font-bold text-stone-900">Petto Cura Milestones</h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-stone-200 z-0" />
              {milestones.map((m, i) => (
                <AnimatedSection key={m.year} delay={i * 0.1}>
                  <div className="relative z-10 bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold mb-6 shadow-lg shadow-teal-600/20">
                      {m.year}
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 mb-3">{m.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </SectionGate>

      <SectionGate id="about-franchise">
        <FranchiseSection />
      </SectionGate>
    </PageGate>
  );
}
