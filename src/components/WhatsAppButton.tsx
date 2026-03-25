'use client';

import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const PHONE = '919566242236';
const DEFAULT_MESSAGE = 'Hi! I want to book a grooming session for my pet.';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Show tooltip after 3 seconds, hide after 8
    const showTimer = setTimeout(() => setShowTooltip(true), 3000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 8000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!mounted) return null;

  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <div className="fixed bottom-24 lg:bottom-8 right-5 z-50">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg border border-stone-200 px-4 py-2.5 whitespace-nowrap"
          >
            <p className="text-sm font-medium text-stone-700">Chat with us on WhatsApp!</p>
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-b border-stone-200 rotate-[-45deg]" />
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 hover:scale-110 transition-all duration-300"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <FaWhatsapp className="w-7 h-7 lg:w-8 lg:h-8 text-white relative z-10" />
      </a>
    </div>
  );
}
