'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt, FaCalendarAlt } from 'react-icons/fa';

export default function StickyBookBar() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
        >
          <div className="bg-white/90 backdrop-blur-xl border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-3 px-4 py-3 max-w-lg mx-auto">
              <a
                href="tel:+919566242236"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-100 text-stone-700 font-semibold text-sm hover:bg-stone-200 transition-colors"
              >
                <FaPhoneAlt className="w-3.5 h-3.5" />
                Call Now
              </a>
              <Link
                href="/contact"
                className="flex-[2] flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-600 text-white font-semibold text-sm hover:bg-teal-700 transition-colors shadow-md shadow-teal-600/25"
              >
                <FaCalendarAlt className="w-3.5 h-3.5" />
                Book Appointment
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
