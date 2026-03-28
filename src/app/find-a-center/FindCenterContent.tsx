'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { PageGate } from '@/components/PageGate';
import { SectionGate } from '@/components/SectionGate';
import FranchiseSection from '@/components/FranchiseSection';
import { defaultStores, StoreLocation } from '@/data/defaults';
import { FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false, loading: () => <div className="w-full h-[500px] bg-stone-100 rounded-3xl animate-pulse flex items-center justify-center text-stone-400">Loading map...</div> });

export default function FindCenterContent() {
  const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(null);
  const stores = defaultStores;

  return (
    <PageGate pageKey="find-a-center">
      <SectionGate id="center-header">
        <section className="pt-32 pb-8 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Our Locations</span>
            <h1 className="mt-3 text-4xl lg:text-5xl font-bold text-stone-900">Find a Center Near You</h1>
            <p className="mt-4 text-stone-500 max-w-2xl mx-auto">Visit our premium pet care center in Nolambur, Chennai. Walk-ins welcome!</p>
          </AnimatedSection>
        </div>
        </section>
      </SectionGate>

      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <SectionGate id="center-map">
              <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="rounded-3xl overflow-hidden shadow-lg border border-stone-200">
                  <MapComponent stores={stores} selectedStore={selectedStore} onSelectStore={setSelectedStore} />
                </div>
              </AnimatedSection>
              </div>
            </SectionGate>

            <SectionGate id="center-cards">
              <div className="space-y-4">
              {stores.map((store, i) => (
                <AnimatedSection key={store.id} delay={i * 0.1}>
                  <button
                    onClick={() => setSelectedStore(store)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                      selectedStore?.id === store.id
                        ? 'border-teal-500 bg-teal-50/50 shadow-md'
                        : 'border-stone-200 bg-white hover:border-teal-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-stone-900 text-sm">{store.title}</h3>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        store.status === 'open' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${store.status === 'open' ? 'bg-emerald-500 animate-pulse' : 'bg-red-400'}`} />
                        {store.status === 'open' ? 'Open' : 'Closed'}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-stone-500 text-xs">
                        <FaMapMarkerAlt className="w-3.5 h-3.5 mt-0.5 text-teal-600 flex-shrink-0" />
                        {store.address}
                      </div>
                      <div className="flex items-center gap-2 text-stone-500 text-xs">
                        <FaPhone className="w-3 h-3 text-teal-600 flex-shrink-0" />
                        {store.phone}
                      </div>
                      <div className="flex items-center gap-2 text-stone-500 text-xs">
                        <FaClock className="w-3 h-3 text-teal-600 flex-shrink-0" />
                        {store.hours}
                      </div>
                    </div>
                  </button>
                </AnimatedSection>
              ))}
              </div>
            </SectionGate>
          </div>
        </div>
      </section>

      <SectionGate id="center-franchise">
        <FranchiseSection />
      </SectionGate>
    </PageGate>
  );
}
