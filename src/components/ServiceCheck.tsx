'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Nolambur-area pincodes
const SERVICED_PINCODES = ['600037', '600077', '600095', '600101', '600116', '600118'];

type CheckResult = 'idle' | 'available' | 'unavailable';

export default function ServiceCheck() {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<CheckResult>('idle');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleCheck = () => {
    const trimmed = pincode.trim();
    if (trimmed.length !== 6) return;
    if (SERVICED_PINCODES.includes(trimmed)) {
      setResult('available');
    } else {
      setResult('unavailable');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCheck();
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      {/* Pincode Input */}
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-2xl p-1.5 shadow-lg shadow-stone-200/50 border border-stone-200/60">
        <div className="flex-1 flex items-center gap-2 px-3">
          <span className="text-stone-400 text-sm">📍</span>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter your pincode"
            value={pincode}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              setPincode(val);
              if (val.length < 6) setResult('idle');
            }}
            onKeyDown={handleKeyDown}
            className="w-full py-2.5 text-sm text-stone-800 placeholder-stone-400 bg-transparent outline-none"
          />
        </div>
        <button
          onClick={handleCheck}
          disabled={pincode.length !== 6}
          className="px-5 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Check
        </button>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {result === 'available' && (
          <motion.div
            key="available"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4"
          >
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
              <span className="text-2xl">🚗</span>
              <div>
                <p className="text-emerald-800 font-semibold text-sm">Doorstep Pickup Available!</p>
                <p className="text-emerald-600 text-xs mt-0.5">We serve your area. Free doorstep pickup & drop for grooming.</p>
                <Link
                  href="/contact"
                  className="inline-block mt-2 px-4 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Book Now →
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {result === 'unavailable' && (
          <motion.div
            key="unavailable"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4"
          >
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔜</span>
                <div>
                  <p className="text-amber-800 font-semibold text-sm">Coming Soon in Your Area!</p>
                  <p className="text-amber-600 text-xs mt-0.5">We&apos;re expanding. Get notified when we launch in your area.</p>
                </div>
              </div>
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex gap-2 mt-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-amber-200 bg-white outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-amber-500 text-white text-xs font-semibold rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Notify Me
                  </button>
                </form>
              ) : (
                <p className="text-emerald-600 text-xs font-medium mt-3">✅ We&apos;ll notify you when we launch in your area!</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
