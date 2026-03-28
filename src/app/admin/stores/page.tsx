'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import { defaultStores, StoreLocation } from '@/data/defaults';
import { supabase } from '@/lib/supabase';

const TABLE = 'stores';

export default function StoreManager() {
  const [stores, setStores] = useState<StoreLocation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<StoreLocation | null>(null);
  const [form, setForm] = useState({ title: '', address: '', lat: '', lng: '', phone: '', status: 'open' as 'open' | 'closed', hours: '' });

  const fetchStores = async () => {
    if (!supabase) { setStores(defaultStores); return; }
    const { data, error } = await supabase.from(TABLE).select('*').order('created_at');
    if (!error && data && data.length > 0) {
      setStores(data as StoreLocation[]);
    } else {
      setStores(defaultStores);
    }
  };

  useEffect(() => { fetchStores(); }, []);

  const openAddModal = () => {
    setEditingStore(null);
    setForm({ title: '', address: '', lat: '', lng: '', phone: '', status: 'open', hours: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (store: StoreLocation) => {
    setEditingStore(store);
    setForm({ title: store.title, address: store.address, lat: String(store.lat), lng: String(store.lng), phone: store.phone, status: store.status, hours: store.hours });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    const storeData = {
      title: form.title,
      address: form.address,
      lat: parseFloat(form.lat),
      lng: parseFloat(form.lng),
      phone: form.phone,
      status: form.status,
      hours: form.hours,
    };

    if (editingStore) {
      await supabase.from(TABLE).update(storeData).eq('id', editingStore.id);
    } else {
      await supabase.from(TABLE).insert({ id: `store-${Date.now()}`, ...storeData });
    }
    setIsModalOpen(false);
    await fetchStores();
  };

  const handleDelete = async (id: string) => {
    if (!supabase) return;
    if (confirm('Are you sure you want to delete this store?')) {
      await supabase.from(TABLE).delete().eq('id', id);
      await fetchStores();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Store Manager</h1>
          <p className="text-stone-500 text-sm mt-1">Manage your pet care center locations</p>
        </div>
        <button onClick={openAddModal} className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-500 transition-colors shadow-md">
          <FaPlus className="w-3 h-3" /> Add Store
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-stone-500 uppercase tracking-wider">Store</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-stone-500 uppercase tracking-wider">Address</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-stone-500 uppercase tracking-wider">Phone</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-stone-500 uppercase tracking-wider">Coordinates</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-stone-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-3.5 text-xs font-semibold text-stone-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center">
                        <FaMapMarkerAlt className="w-4 h-4 text-teal-600" />
                      </div>
                      <span className="font-semibold text-stone-900 text-sm">{store.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-600 max-w-xs truncate">{store.address}</td>
                  <td className="px-6 py-4 text-sm text-stone-600">{store.phone}</td>
                  <td className="px-6 py-4 text-xs text-stone-400 font-mono">{store.lat}, {store.lng}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      store.status === 'open' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${store.status === 'open' ? 'bg-emerald-500' : 'bg-red-400'}`} />
                      {store.status === 'open' ? 'Open' : 'Closed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEditModal(store)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-teal-600 transition-colors">
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(store.id)} className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors ml-1">
                      <FaTrash className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-stone-900">{editingStore ? 'Edit Store' : 'Add New Store'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Title *</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" placeholder="Petto Cura — Nolambur" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Address *</label>
                <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" placeholder="12/5, 2nd Main Road..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Latitude *</label>
                  <input required type="number" step="any" value={form.lat} onChange={(e) => setForm({ ...form, lat: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" placeholder="13.0694" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Longitude *</label>
                  <input required type="number" step="any" value={form.lng} onChange={(e) => setForm({ ...form, lng: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" placeholder="80.1686" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Phone *</label>
                  <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" placeholder="+91 95662 42236" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as 'open' | 'closed' })} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400">
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Operating Hours</label>
                <input value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" placeholder="8:00 AM – 8:00 PM" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-semibold hover:bg-teal-500 transition-colors">
                  {editingStore ? 'Update' : 'Add Store'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
