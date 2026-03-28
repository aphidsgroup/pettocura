'use client';

import { useState, useEffect } from 'react';
import { FaEdit, FaTimes, FaSave } from 'react-icons/fa';
import { defaultServices, ServiceItem } from '@/data/defaults';
import { supabase } from '@/lib/supabase';
import ImageUploader from '@/components/admin/ImageUploader';

export default function ServiceDashboard() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', features: '', image_url: '' });

  const fetchServices = async () => {
    if (!supabase) { setServices(defaultServices); return; }
    const { data, error } = await supabase.from('services').select('*').order('sort_order');
    if (!error && data && data.length > 0) {
      setServices(data as ServiceItem[]);
    } else {
      setServices(defaultServices);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const startEdit = (svc: ServiceItem) => {
    setEditingId(svc.id);
    setForm({ name: svc.name, description: svc.description, price: svc.price, features: svc.features.join('\n'), image_url: svc.image_url || '' });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleSave = async (id: string) => {
    if (!supabase) return;
    await supabase.from('services').update({
      name: form.name,
      description: form.description,
      price: form.price,
      features: form.features.split('\n').filter(Boolean),
      image_url: form.image_url,
    }).eq('id', id);
    setEditingId(null);
    await fetchServices();
  };

  const groomingServices = services.filter((s) => s.category === 'grooming');
  const boardingServices = services.filter((s) => s.category === 'boarding');

  const renderServiceGroup = (title: string, items: ServiceItem[], color: string) => (
    <div className="mb-10">
      <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${color}`} />
        {title}
      </h2>
      <div className="space-y-4">
        {items.map((svc) => (
          <div key={svc.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            {editingId === svc.id ? (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-stone-500 mb-1">Service Name</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1">Price</label>
                    <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Description</label>
                  <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Features (one per line)</label>
                  <textarea rows={4} value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 resize-none" />
                </div>
                <div>
                  <ImageUploader
                    value={form.image_url}
                    onChange={(url) => setForm({ ...form, image_url: url })}
                    folder="services"
                    label="Service Image"
                    maxWidth={800}
                    maxHeight={600}
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleSave(svc.id)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-500 transition-colors">
                    <FaSave className="w-3 h-3" /> Save Changes
                  </button>
                  <button onClick={cancelEdit} className="inline-flex items-center gap-1.5 px-4 py-2 border border-stone-200 text-stone-600 text-sm font-medium rounded-lg hover:bg-stone-50 transition-colors">
                    <FaTimes className="w-3 h-3" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5 flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-3xl mt-1">{svc.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-stone-900">{svc.name}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold">{svc.price}</span>
                    </div>
                    <p className="text-sm text-stone-500 mb-3">{svc.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {svc.features.map((f, i) => (
                        <span key={i} className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-lg">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <button onClick={() => startEdit(svc)} className="p-2.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-teal-600 transition-colors flex-shrink-0 ml-4">
                  <FaEdit className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Service Dashboard</h1>
        <p className="text-stone-500 text-sm mt-1">Update service prices and descriptions across all pages</p>
      </div>

      {renderServiceGroup('Grooming Services', groomingServices, 'bg-teal-500')}
      {renderServiceGroup('Boarding Services', boardingServices, 'bg-amber-500')}
    </div>
  );
}
