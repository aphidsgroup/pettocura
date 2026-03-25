'use client';

import { useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaStar } from 'react-icons/fa';

interface Testimonial {
  id: string;
  name: string;
  pet: string;
  text: string;
  rating: number;
}

const STORAGE_KEY = 'pettocura_testimonials';

const defaultTestimonials: Testimonial[] = [
  { id: '1', name: 'Priya S.', pet: 'Bruno (Golden Retriever)', text: 'Amazing grooming service! Bruno came back looking like a show dog. The team is so gentle and caring. Best pet grooming in Nolambur!', rating: 5 },
  { id: '2', name: 'Karthik R.', pet: 'Milo (Labrador)', text: 'The boarding facility is spotless and Milo loves it there. Live CCTV updates gave me complete peace of mind during my trip.', rating: 5 },
  { id: '3', name: 'Swetha M.', pet: 'Cookie (Shih Tzu)', text: 'Doorstep pickup is a game changer! They picked up Cookie, groomed her beautifully, and brought her back. So convenient!', rating: 5 },
  { id: '4', name: 'Arjun K.', pet: 'Rocky (German Shepherd)', text: 'Professional, punctual, and passionate about pets. Rocky actually gets excited when he sees the Petto Cura van arrive!', rating: 5 },
];

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', pet: '', text: '', rating: 5 });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setTestimonials(JSON.parse(saved)); } catch { setTestimonials(defaultTestimonials); }
    } else {
      setTestimonials(defaultTestimonials);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTestimonials));
    }
  }, []);

  const save = (items: Testimonial[]) => {
    setTestimonials(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const add = () => {
    if (!form.name || !form.text) return;
    const newItem: Testimonial = { id: Date.now().toString(), ...form };
    save([...testimonials, newItem]);
    setForm({ name: '', pet: '', text: '', rating: 5 });
    setShowForm(false);
  };

  const remove = (id: string) => save(testimonials.filter(t => t.id !== id));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Testimonials</h1>
          <p className="text-stone-500 text-sm mt-1">Manage customer reviews shown on the homepage</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors">
          <FaPlus className="w-3 h-3" /> Add Review
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-6">
          <h3 className="font-bold text-stone-900 mb-4">New Testimonial</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Customer Name *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Priya S." className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Pet Info</label>
              <input value={form.pet} onChange={e => setForm({ ...form, pet: e.target.value })} placeholder="e.g. Bruno (Golden Retriever)" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-stone-700 mb-1">Review *</label>
            <textarea value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} rows={3} placeholder="Customer review text..." className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 resize-none" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-stone-700">Rating:</span>
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => setForm({ ...form, rating: n })} className={`${n <= form.rating ? 'text-amber-400' : 'text-stone-300'}`}>
                  <FaStar />
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-stone-600 hover:text-stone-900">Cancel</button>
              <button onClick={add} disabled={!form.name || !form.text} className="px-5 py-2 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700 disabled:opacity-40">Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {testimonials.map(t => (
          <div key={t.id} className="bg-white rounded-2xl border border-stone-200 p-5 flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-stone-900 text-sm">{t.name}</span>
                <span className="text-stone-400 text-xs">· {t.pet}</span>
              </div>
              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(t.rating)].map((_, j) => (
                  <FaStar key={j} className="w-3 h-3 text-amber-400" />
                ))}
              </div>
              <p className="text-stone-600 text-sm">{t.text}</p>
            </div>
            <button onClick={() => remove(t.id)} className="p-2 text-stone-400 hover:text-red-500 transition-colors">
              <FaTrash className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
