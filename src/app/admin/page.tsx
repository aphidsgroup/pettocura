'use client';

import { FaStore, FaBlog, FaTools, FaPaw } from 'react-icons/fa';
import Link from 'next/link';

const dashboardCards = [
  { title: 'Store Locations', count: '3', desc: 'Manage center locations', icon: FaStore, href: '/admin/stores', color: 'from-teal-500 to-teal-600' },
  { title: 'Blog Posts', count: '4', desc: 'Manage pet care guides', icon: FaBlog, href: '/admin/blog', color: 'from-violet-500 to-purple-600' },
  { title: 'Services', count: '8', desc: 'Manage services & pricing', icon: FaTools, href: '/admin/services', color: 'from-amber-500 to-orange-500' },
  { title: 'Total Pets Served', count: '5,000+', desc: 'And counting!', icon: FaPaw, href: '#', color: 'from-rose-500 to-pink-500' },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
        <p className="text-stone-500 text-sm mt-1">Welcome to the Petto Cura Control Center</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {dashboardCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group bg-white rounded-2xl p-6 border border-stone-200 hover:shadow-lg hover:border-stone-300 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
              <card.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-stone-900">{card.count}</div>
            <div className="text-sm font-semibold text-stone-700 mt-1">{card.title}</div>
            <div className="text-xs text-stone-400 mt-0.5">{card.desc}</div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-2xl border border-stone-200 p-8">
        <h2 className="text-lg font-bold text-stone-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/admin/stores" className="px-4 py-3 rounded-xl bg-teal-50 text-teal-700 text-sm font-medium hover:bg-teal-100 transition-colors text-center">
            + Add Store Location
          </Link>
          <Link href="/admin/blog" className="px-4 py-3 rounded-xl bg-violet-50 text-violet-700 text-sm font-medium hover:bg-violet-100 transition-colors text-center">
            + Write Blog Post
          </Link>
          <Link href="/admin/services" className="px-4 py-3 rounded-xl bg-amber-50 text-amber-700 text-sm font-medium hover:bg-amber-100 transition-colors text-center">
            Update Service Prices
          </Link>
        </div>
      </div>
    </div>
  );
}
