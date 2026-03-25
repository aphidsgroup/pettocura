'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-teal-50/30 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Image
            src="/logo.png"
            alt="Petto Cura"
            width={220}
            height={70}
            className="h-16 w-auto object-contain mx-auto"
            priority
          />
        </motion.div>

        {/* Animated paw icon */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="text-6xl mb-6"
        >
          🐾
        </motion.div>

        {/* Heading */}
        <h1 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-4">
          We&apos;re Grooming Our Website!
        </h1>

        {/* Description */}
        <p className="text-stone-500 text-lg leading-relaxed mb-8">
          Our website is currently undergoing maintenance to serve you better. We&apos;ll be back soon with a fresh look!
        </p>

        {/* Progress bar animation */}
        <div className="w-64 mx-auto mb-8">
          <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: ['0%', '70%', '40%', '90%', '60%', '80%'] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            />
          </div>
        </div>

        {/* Contact info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-200 p-6 shadow-sm">
          <p className="text-stone-600 text-sm mb-3">
            Need immediate assistance? Contact us:
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+919566242236"
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-xl text-sm font-medium hover:bg-teal-100 transition-colors"
            >
              📞 +91 95662 42236
            </a>
            <a
              href="https://wa.me/919566242236"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>

        {/* Footer text */}
        <p className="mt-8 text-stone-400 text-xs">
          © {new Date().getFullYear()} Petto Cura. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
