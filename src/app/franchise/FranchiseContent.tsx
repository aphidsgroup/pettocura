'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import HeroSection from '@/components/ui/HeroSection';
import { FaWhatsapp, FaCheckCircle, FaRupeeSign, FaGraduationCap, FaChartLine, FaHandshake, FaMapMarkerAlt, FaStore } from 'react-icons/fa';

const franchiseServices = [
  'Pet Grooming',
  'Pet Boarding',
  'Pet Walking',
  'Pet Sitting',
  'Pet Taxi',
  'Pet Accessories',
  'Pet Cake & Treats',
];

const whyFranchise = [
  { icon: FaRupeeSign, title: 'Low Investment', desc: 'Start with a manageable investment and see returns within months. Our lean model maximizes profitability.', color: 'bg-emerald-100 text-emerald-600' },
  { icon: FaGraduationCap, title: 'Complete Training', desc: 'Comprehensive training program covering pet care, grooming techniques, business operations, and customer service.', color: 'bg-blue-100 text-blue-600' },
  { icon: FaChartLine, title: 'Proven Business Model', desc: 'Replicate our successful Nolambur center model. We\'ve optimized operations, pricing, and marketing for you.', color: 'bg-purple-100 text-purple-600' },
  { icon: FaHandshake, title: 'Ongoing Support', desc: 'Dedicated franchise support team for marketing, operations, vendor management, and troubleshooting.', color: 'bg-amber-100 text-amber-600' },
  { icon: FaMapMarkerAlt, title: 'Territory Protection', desc: 'Exclusive territory rights in your area. No other Petto Cura franchise within your protected zone.', color: 'bg-rose-100 text-rose-600' },
  { icon: FaStore, title: 'Brand Recognition', desc: 'Leverage the Petto Cura brand — trusted by 5,000+ pet parents in Chennai with a 4.9 Google rating.', color: 'bg-teal-100 text-teal-600' },
];

const steps = [
  { step: '01', title: 'Enquire', desc: 'Fill the enquiry form or reach out via WhatsApp to express your interest.' },
  { step: '02', title: 'Discussion', desc: 'Our franchise team connects with you to discuss the opportunity, investment, and your goals.' },
  { step: '03', title: 'Site Visit & Agreement', desc: 'Visit our Nolambur center, finalize location, and sign the franchise agreement.' },
  { step: '04', title: 'Training & Setup', desc: 'Complete our training program while we help you set up your center with branding and equipment.' },
  { step: '05', title: 'Grand Opening', desc: 'Launch your Petto Cura center with our marketing support and start serving pet parents!' },
];

const faqs = [
  { q: 'What is the total investment required?', a: 'The total investment ranges depending on the city and center size. Contact us for a detailed breakdown tailored to your location.' },
  { q: 'Do I need pet care experience?', a: 'No prior experience is required. We provide comprehensive training on all aspects of pet care, grooming, and business operations.' },
  { q: 'How long does it take to set up a center?', a: 'Typically 4-8 weeks from agreement signing to grand opening, depending on the location and interior work required.' },
  { q: 'What services can I offer at my franchise?', a: 'You can offer all our services: Pet Grooming, Boarding, Walking, Sitting, Taxi, Accessories, and Pet Cakes & Treats.' },
  { q: 'What kind of ongoing support do I receive?', a: 'Marketing support, operational guidance, vendor connections, technology platform, and a dedicated franchise manager.' },
  { q: 'Which cities are available for franchise?', a: 'We are currently expanding across Tamil Nadu and major Indian cities. Contact us to check availability in your area.' },
];

export default function FranchiseContent() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', investment: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi! I'm interested in a Petto Cura Franchise.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nCity: ${form.city}\nInvestment Budget: ${form.investment}\nMessage: ${form.message || 'N/A'}`;
    const waUrl = `https://wa.me/919566242236?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div>
      <HeroSection
        badge="Franchise Opportunity"
        title="Own a Petto Cura"
        highlight="Franchise"
        subtitle="Join India's fastest-growing pet care brand. Low investment, complete training, and a proven business model. Start your pet care empire today."
        ctaText="Enquire Now"
        ctaHref="#franchise-form"
        secondaryCtaText="Call Us"
        secondaryCtaHref="tel:+919566242236"
      />

      {/* Why Franchise Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Why Choose Petto Cura</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-stone-900">Built for Your Success</h2>
            <p className="mt-4 text-stone-500 max-w-2xl mx-auto">Everything you need to run a successful pet care business, backed by a brand that pet parents already trust.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyFranchise.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-stone-100 hover:shadow-lg hover:border-teal-200/50 transition-all duration-300 h-full">
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services You Can Offer */}
      <section className="py-16 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">Services You Can Offer</h2>
            <p className="mt-2 text-teal-100">Every franchise gets access to our full service portfolio</p>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3">
            {franchiseServices.map((service, i) => (
              <motion.span
                key={service}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="px-5 py-2.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium"
              >
                {service}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Process</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-stone-900">How It Works</h2>
            <p className="mt-4 text-stone-500">From enquiry to grand opening in 5 simple steps</p>
          </AnimatedSection>

          <div className="space-y-6">
            {steps.map((s, i) => (
              <AnimatedSection key={s.step} delay={i * 0.1}>
                <div className="flex items-start gap-6 bg-white rounded-2xl p-6 border border-stone-100 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg font-bold">{s.step}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 mb-1">{s.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="franchise-form" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Get Started</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-stone-900">Franchise Enquiry Form</h2>
            <p className="mt-4 text-stone-500 max-w-xl mx-auto">Interested in owning a Petto Cura franchise? Fill in your details and our franchise team will reach out within 24 hours.</p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <FaCheckCircle className="w-16 h-16 text-teal-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-stone-900 mb-2">Enquiry Submitted!</h3>
                  <p className="text-stone-500">Our franchise team will connect with you on WhatsApp shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all bg-stone-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-2">Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all bg-stone-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all bg-stone-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-2">City / Location *</label>
                      <input
                        type="text"
                        required
                        placeholder="Your city"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all bg-stone-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">Investment Budget</label>
                    <select
                      value={form.investment}
                      onChange={(e) => setForm({ ...form, investment: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all bg-stone-50/50"
                    >
                      <option value="">Select your budget range</option>
                      <option value="Below ₹5 Lakhs">Below ₹5 Lakhs</option>
                      <option value="₹5 - ₹10 Lakhs">₹5 - ₹10 Lakhs</option>
                      <option value="₹10 - ₹20 Lakhs">₹10 - ₹20 Lakhs</option>
                      <option value="₹20 - ₹50 Lakhs">₹20 - ₹50 Lakhs</option>
                      <option value="Above ₹50 Lakhs">Above ₹50 Lakhs</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">Additional Message</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your background and why you're interested..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all bg-stone-50/50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    Submit Enquiry via WhatsApp
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Questions?</span>
            <h2 className="mt-3 text-3xl font-bold text-stone-900">Franchise FAQs</h2>
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <details className="group bg-white rounded-2xl border border-stone-200 overflow-hidden">
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer hover:bg-stone-50 transition-colors">
                    <span className="font-semibold text-stone-900 text-sm pr-4">{faq.q}</span>
                    <svg className="w-5 h-5 text-stone-400 flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-5 text-sm text-stone-600 leading-relaxed">{faq.a}</div>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 rounded-3xl p-10 lg:p-16 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
              </div>
              <div className="relative">
                <span className="text-5xl mb-4 block">🏪</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Start Your Pet Care Empire?</h2>
                <p className="text-stone-400 text-lg mb-8 max-w-xl mx-auto">Join Petto Cura today and be part of India&apos;s booming pet care industry. Let&apos;s grow together! 🐾</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://wa.me/919566242236?text=Hi!%20I%27m%20interested%20in%20a%20Petto%20Cura%20franchise%20opportunity."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 bg-teal-500 text-white font-semibold rounded-2xl hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/25"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    WhatsApp Us
                  </a>
                  <a
                    href="tel:+919566242236"
                    className="px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/15 transition-colors"
                  >
                    📞 Call +91 95662 42236
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
