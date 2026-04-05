'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { useSiteContent } from '@/hooks/useSiteContent';

export default function WhatsAppButton() {
  const { getContentValue, loading } = useSiteContent('global');
  const waNumber = getContentValue('global_whatsapp_number', '919566242236');

  if (loading) return null;

  return (
    <a
      href={`https://wa.me/${waNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-40 bg-emerald-500 text-white p-4 rounded-2xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 hover:-translate-y-1 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        <FaWhatsapp className="w-6 h-6" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-emerald-500 rounded-full animate-ping" />
      </div>
      
      {/* Tooltip */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-stone-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with Expert 🐾
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-stone-900" />
      </div>
    </a>
  );
}
