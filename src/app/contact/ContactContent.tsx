'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { PageGate } from '@/components/PageGate';
import { SectionGate } from '@/components/SectionGate';
import FranchiseSection from '@/components/FranchiseSection';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const ContactMap = dynamic(() => import('./ContactMap'), { ssr: false, loading: () => <div className="w-full h-[400px] bg-stone-100 rounded-3xl animate-pulse" /> });

const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];
const serviceTypes = ['Pet Grooming', 'Pet Boarding', 'Pet Walking', 'Pet Sitting', 'Pet Taxi', 'Pet Accessories', 'Pet Cake & Treats'];

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', petName: '', petType: '', service: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would POST to an API route
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', petName: '', petType: '', service: '', message: '' });
  };

  return (
    <PageGate pageKey="contact">
      <SectionGate id="contact-header">
        <section className="pt-32 pb-8 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Get In Touch</span>
            <h1 className="mt-3 text-4xl lg:text-5xl font-bold text-stone-900">Book an Appointment</h1>
            <p className="mt-4 text-stone-500 max-w-2xl mx-auto">Fill out the form below and we&apos;ll get back to you within 30 minutes during business hours.</p>
          </AnimatedSection>
        </div>
        </section>
      </SectionGate>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <SectionGate id="contact-form">
              <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16"
                    >
                      <div className="text-5xl mb-4">✅</div>
                      <h3 className="text-2xl font-bold text-stone-900 mb-2">Thank You!</h3>
                      <p className="text-stone-500">We&apos;ve received your inquiry. Our team will contact you within 30 minutes.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="contact-name" className="block text-sm font-semibold text-stone-700 mb-2">Full Name *</label>
                          <input
                            id="contact-name"
                            type="text"
                            required
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all bg-stone-50/50"
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-email" className="block text-sm font-semibold text-stone-700 mb-2">Email *</label>
                          <input
                            id="contact-email"
                            type="email"
                            required
                            placeholder="you@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all bg-stone-50/50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="contact-phone" className="block text-sm font-semibold text-stone-700 mb-2">Phone *</label>
                          <input
                            id="contact-phone"
                            type="tel"
                            required
                            placeholder="+91 95662 42236"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all bg-stone-50/50"
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-pet-name" className="block text-sm font-semibold text-stone-700 mb-2">Pet Name</label>
                          <input
                            id="contact-pet-name"
                            type="text"
                            placeholder="Your pet's name"
                            value={formData.petName}
                            onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all bg-stone-50/50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="contact-pet-type" className="block text-sm font-semibold text-stone-700 mb-2">Pet Type</label>
                          <select
                            id="contact-pet-type"
                            value={formData.petType}
                            onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all bg-stone-50/50"
                          >
                            <option value="">Select pet type</option>
                            {petTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="contact-service" className="block text-sm font-semibold text-stone-700 mb-2">Service Needed</label>
                          <select
                            id="contact-service"
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all bg-stone-50/50"
                          >
                            <option value="">Select service</option>
                            {serviceTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="contact-message" className="block text-sm font-semibold text-stone-700 mb-2">Message</label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          placeholder="Tell us about your pet and any special requirements..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all bg-stone-50/50 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Send Inquiry
                      </button>
                    </form>
                  )}
                </div>
              </AnimatedSection>
              </div>
            </SectionGate>

            <SectionGate id="contact-info">
              <div className="lg:col-span-2 space-y-6">
              <AnimatedSection delay={0.1}>
                <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/30 flex items-center justify-center flex-shrink-0">
                        <FaMapMarkerAlt className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Main Center</p>
                        <p className="text-teal-100 text-sm">Plot.No.6, Door.No.4, M.C.K Layout, Nolambur, Chennai - 600095</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/30 flex items-center justify-center flex-shrink-0">
                        <FaPhone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Phone</p>
                        <a href="tel:+919566242236" className="text-teal-100 text-sm hover:text-white transition-colors">+91 95662 42236</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/30 flex items-center justify-center flex-shrink-0">
                        <FaEnvelope className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Email</p>
                        <a href="mailto:hello@pettocura.com" className="text-teal-100 text-sm hover:text-white transition-colors">hello@pettocura.com</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/30 flex items-center justify-center flex-shrink-0">
                        <FaClock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Hours</p>
                        <p className="text-teal-100 text-sm">8:00 AM – 8:00 PM, 7 days/week</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/30 flex items-center justify-center flex-shrink-0">
                        <FaWhatsapp className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">WhatsApp</p>
                        <a href="https://wa.me/919566242236" target="_blank" rel="noopener noreferrer" className="text-teal-100 text-sm hover:text-white transition-colors">Chat with us</a>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
              </div>
            </SectionGate>
          </div>
        </div>
      </section>

      <SectionGate id="contact-map">
        <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <h2 className="text-2xl font-bold text-stone-900">Find Us on the Map</h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="rounded-3xl overflow-hidden shadow-lg border border-stone-200">
              <ContactMap />
            </div>
          </AnimatedSection>
        </div>
        </section>
      </SectionGate>

      <SectionGate id="contact-franchise">
        <FranchiseSection />
      </SectionGate>
    </PageGate>
  );
}
