'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function FranchiseSection() {
  const handleEnquiry = () => {
    const message = 'Hi! I\'m interested in a Petto Cura franchise opportunity. Please share more details.';
    const url = `https://wa.me/919566242236?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] opacity-[0.03] select-none">🐾</div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left — Text */}
          <div className="flex-1 text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Franchise Opportunity
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl lg:text-4xl font-bold text-white leading-tight"
            >
              Own a <span className="text-teal-400">Petto Cura</span> Franchise
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-stone-400 text-base leading-relaxed max-w-lg"
            >
              Join India&apos;s fastest-growing pet care brand. Low investment, high returns, and complete training & support. Start your pet care business in your city today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              {['Training & Support', 'Low Investment', 'Proven Model', 'Growing Market'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-medium">
                  ✓ {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center lg:min-w-[280px]"
          >
            <div className="text-5xl mb-4">🏪</div>
            <h3 className="text-xl font-bold text-white mb-2">Start Your Journey</h3>
            <p className="text-stone-400 text-sm mb-6">Connect with us to learn more about the franchise opportunity.</p>

            <button
              onClick={handleEnquiry}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-500 text-white font-semibold rounded-2xl hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/25 text-sm"
            >
              <FaWhatsapp className="w-5 h-5" />
              Enquire on WhatsApp
            </button>

            <Link
              href="/franchise"
              className="block mt-3 text-stone-400 text-sm hover:text-white transition-colors"
            >
              View Franchise Details →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
