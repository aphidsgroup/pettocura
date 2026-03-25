'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Pet {
  id: string;
  name: string;
  type: 'Dog' | 'Cat';
  breed: string;
  age: string;
  lastVaccination: string;
  avatar: string;
}

interface GroomingRecord {
  date: string;
  service: string;
  groomer: string;
  notes: string;
}

const mockGroomingHistory: Record<string, GroomingRecord[]> = {
  default: [
    { date: '2025-03-15', service: 'Full Body Grooming', groomer: 'Ramesh K.', notes: 'De-shedding + nail trim. Coat in excellent condition.' },
    { date: '2025-02-20', service: 'Spa Treatment', groomer: 'Priya S.', notes: 'Aromatherapy bath + moisturizing treatment.' },
    { date: '2025-01-10', service: 'Puppy First Groom', groomer: 'Ramesh K.', notes: 'First grooming session. Very well-behaved!' },
  ],
};

const petAvatars: Record<string, string> = {
  Dog: '🐕',
  Cat: '🐱',
};

const STORAGE_KEY = 'pettocura_pets';

export default function PetProfilePage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'Dog' as 'Dog' | 'Cat', breed: '', age: '', lastVaccination: '' });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPets(parsed);
        if (parsed.length > 0) setSelectedPet(parsed[0].id);
      } catch { /* ignore */ }
    }
  }, []);

  const savePets = (newPets: Pet[]) => {
    setPets(newPets);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPets));
  };

  const addPet = () => {
    if (!form.name || !form.breed || !form.age) return;
    const newPet: Pet = {
      id: Date.now().toString(),
      ...form,
      avatar: petAvatars[form.type],
    };
    const newPets = [...pets, newPet];
    savePets(newPets);
    setSelectedPet(newPet.id);
    setShowForm(false);
    setForm({ name: '', type: 'Dog', breed: '', age: '', lastVaccination: '' });
  };

  const removePet = (id: string) => {
    const newPets = pets.filter(p => p.id !== id);
    savePets(newPets);
    if (selectedPet === id) setSelectedPet(newPets[0]?.id || null);
  };

  const currentPet = pets.find(p => p.id === selectedPet);
  const history = mockGroomingHistory.default;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-teal-50/20 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-900">My Pets</h1>
            <p className="text-stone-500 mt-1">Manage your pet profiles and grooming history</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-5 py-2.5 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors text-sm shadow-lg shadow-teal-600/20"
          >
            + Add Pet
          </button>
        </div>

        {/* Pet Cards Row */}
        {pets.length > 0 && (
          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            {pets.map(pet => (
              <button
                key={pet.id}
                onClick={() => { setSelectedPet(pet.id); setActiveTab('profile'); }}
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-300 min-w-fit ${
                  selectedPet === pet.id
                    ? 'bg-white/80 backdrop-blur-xl border-teal-200 shadow-lg shadow-teal-100/50'
                    : 'bg-white/40 backdrop-blur-sm border-stone-200/60 hover:bg-white/60'
                }`}
              >
                <span className="text-2xl">{pet.avatar}</span>
                <div className="text-left">
                  <p className="font-semibold text-stone-900 text-sm">{pet.name}</p>
                  <p className="text-stone-400 text-xs">{pet.breed}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Add Pet Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
              onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md border border-white/50 shadow-2xl"
              >
                <h2 className="text-xl font-bold text-stone-900 mb-6">Add New Pet</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Pet Name *</label>
                    <input
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Bruno"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Type *</label>
                    <div className="flex gap-3">
                      {(['Dog', 'Cat'] as const).map(t => (
                        <button
                          key={t}
                          onClick={() => setForm({ ...form, type: t })}
                          className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                            form.type === t
                              ? 'bg-teal-50 border-teal-300 text-teal-700'
                              : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          {petAvatars[t]} {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Breed *</label>
                    <input
                      value={form.breed}
                      onChange={e => setForm({ ...form, breed: e.target.value })}
                      placeholder="e.g. Golden Retriever"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Age *</label>
                      <input
                        value={form.age}
                        onChange={e => setForm({ ...form, age: e.target.value })}
                        placeholder="e.g. 2 years"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Last Vaccination</label>
                      <input
                        type="date"
                        value={form.lastVaccination}
                        onChange={e => setForm({ ...form, lastVaccination: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-medium text-sm hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addPet}
                    disabled={!form.name || !form.breed || !form.age}
                    className="flex-1 py-2.5 rounded-xl bg-teal-600 text-white font-medium text-sm hover:bg-teal-700 transition-colors disabled:opacity-40"
                  >
                    Add Pet
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pet Detail View */}
        {currentPet ? (
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl overflow-hidden">
            {/* Pet Header */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
                {currentPet.avatar}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">{currentPet.name}</h2>
                <p className="text-teal-100 text-sm">{currentPet.breed} · {currentPet.type} · {currentPet.age}</p>
              </div>
              <button
                onClick={() => removePet(currentPet.id)}
                className="px-4 py-2 bg-red-500/20 text-white rounded-xl text-sm font-medium hover:bg-red-500/30 transition-colors border border-red-300/30"
              >
                Remove
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-stone-200/60">
              {(['profile', 'history'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
                    activeTab === tab
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  {tab === 'profile' ? '📋 Profile' : '✂️ Grooming History'}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'profile' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Name', value: currentPet.name, icon: '🏷️' },
                    { label: 'Type', value: currentPet.type, icon: currentPet.type === 'Dog' ? '🐕' : '🐱' },
                    { label: 'Breed', value: currentPet.breed, icon: '🧬' },
                    { label: 'Age', value: currentPet.age, icon: '🎂' },
                    { label: 'Last Vaccination', value: currentPet.lastVaccination || 'Not recorded', icon: '💉' },
                  ].map(field => (
                    <div key={field.label} className="bg-stone-50/80 backdrop-blur-sm rounded-xl p-4 border border-stone-100">
                      <p className="text-stone-400 text-xs font-medium uppercase tracking-wider">{field.icon} {field.label}</p>
                      <p className="text-stone-900 font-semibold mt-1">{field.value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((record, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-stone-50/80 backdrop-blur-sm rounded-xl p-4 border border-stone-100 flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-lg flex-shrink-0">✂️</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-stone-900 text-sm">{record.service}</p>
                          <span className="text-stone-400 text-xs">{record.date}</span>
                        </div>
                        <p className="text-stone-500 text-xs mt-0.5">Groomer: {record.groomer}</p>
                        <p className="text-stone-600 text-sm mt-2">{record.notes}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl p-16 text-center">
            <span className="text-6xl mb-4 block">🐾</span>
            <h2 className="text-xl font-bold text-stone-900 mb-2">No Pets Added Yet</h2>
            <p className="text-stone-500 mb-6">Add your furry friend to track their profile and grooming history.</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors"
            >
              + Add Your First Pet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
