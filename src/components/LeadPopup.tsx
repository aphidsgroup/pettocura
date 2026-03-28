'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaWhatsapp } from 'react-icons/fa';

const POPUP_SHOWN_KEY = 'pettocura_popup_shown';
const POPUP_DELAY = 8000; // 8 seconds

const serviceOptions = [
  'Pet Grooming',
  'Pet Boarding',
  'Pet Walking',
  'Pet Sitting',
  'Pet Taxi',
  'Pet Accessories',
  'Pet Cake & Treats',
];

export default function LeadPopup() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', service: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(POPUP_SHOWN_KEY);
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem(POPUP_SHOWN_KEY, 'true');
    }, POPUP_DELAY);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setShow(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service) return;

    // Build WhatsApp message
    const message = `Hi! I'm interested in ${form.service}.\n\nName: ${form.name}\nPhone: ${form.phone}`;
    const waUrl = `https://wa.me/919566242236?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setSubmitted(true);
    setTimeout(() => setShow(false), 2000);
  };

  const handleFranchise = () => {
    const message = `Hi! I'm interested in a Petto Cura Franchise opportunity.\n\nName: ${form.name || 'Not provided'}\nPhone: ${form.phone || 'Not provided'}`;
    const waUrl = `https://wa.me/919566242236?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-6 text-white relative">
            <button onClick={handleClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <FaTimes className="w-3.5 h-3.5" />
            </button>
            <p className="text-teal-100 text-xs font-medium uppercase tracking-wider mb-1">🐾 Special Offer</p>
            <h2 className="text-xl font-bold">Book Your Pet&apos;s First Session!</h2>
            <p className="text-teal-100 text-sm mt-1">Get 20% off on your first grooming or boarding</p>
          </div>

          {submitted ? (
            <div className="p-8 text-center">
              <span className="text-4xl mb-3 block">✅</span>
              <h3 className="text-lg font-bold text-stone-900">Thank You!</h3>
              <p className="text-stone-500 text-sm mt-1">We&apos;ll connect with you shortly on WhatsApp.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Your Name *</label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
                />
              </div>
              <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Phone *</label>
                  <input
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    type="tel"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
                  />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Interested In *</label>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, service: s })}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        form.service === s
                          ? 'bg-teal-50 border-teal-300 text-teal-700 shadow-sm'
                          : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!form.name || !form.phone || !form.service}
                className="w-full py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm shadow-lg shadow-teal-600/20"
              >
                Book Now on WhatsApp 🐾
              </button>

              {/* Franchise Enquiry */}
              <div className="border-t border-stone-100 pt-4">
                <p className="text-center text-stone-400 text-xs mb-2">Interested in owning a Petto Cura franchise?</p>
                <button
                  type="button"
                  onClick={handleFranchise}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold rounded-xl hover:bg-emerald-100 transition-colors text-sm"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  Franchise Enquiry
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
