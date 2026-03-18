'use client';

import { FaStore, FaBlog, FaTools, FaPaw, FaWrench } from 'react-icons/fa';
import Link from 'next/link';
import { useMaintenanceMode } from '@/hooks/useMaintenanceMode';

const dashboardCards = [
  { title: 'Store Locations', count: '3', desc: 'Manage center locations', icon: FaStore, href: '/admin/stores', color: 'from-teal-500 to-teal-600' },
  { title: 'Blog Posts', count: '4', desc: 'Manage pet care guides', icon: FaBlog, href: '/admin/blog', color: 'from-violet-500 to-purple-600' },
  { title: 'Services', count: '8', desc: 'Manage services & pricing', icon: FaTools, href: '/admin/services', color: 'from-amber-500 to-orange-500' },
  { title: 'Total Pets Served', count: '5,000+', desc: 'And counting!', icon: FaPaw, href: '#', color: 'from-rose-500 to-pink-500' },
];

export default function AdminDashboard() {
  const { isMaintenanceMode, loading, toggle } = useMaintenanceMode();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
        <p className="text-stone-500 text-sm mt-1">Welcome to the Petto Cura Control Center</p>
      </div>

      {/* Maintenance Mode Toggle */}
      <div className={`mb-8 rounded-2xl border-2 p-6 transition-all duration-300 ${
        isMaintenanceMode
          ? 'bg-amber-50 border-amber-300 shadow-lg shadow-amber-100'
          : 'bg-white border-stone-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              isMaintenanceMode
                ? 'bg-amber-500 shadow-lg shadow-amber-500/30'
                : 'bg-stone-200'
            }`}>
              <FaWrench className={`w-5 h-5 ${isMaintenanceMode ? 'text-white' : 'text-stone-500'}`} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">Maintenance Mode</h2>
              <p className="text-sm text-stone-500">
                {isMaintenanceMode
                  ? '⚠️ Website is showing maintenance page to all visitors'
                  : 'Website is live and accessible to visitors'
                }
              </p>
            </div>
          </div>
          <button
            onClick={toggle}
            disabled={loading}
            className="relative"
            aria-label="Toggle maintenance mode"
          >
            <div className={`w-16 h-8 rounded-full transition-colors duration-300 ${
              isMaintenanceMode ? 'bg-amber-500' : 'bg-stone-300'
            }`}>
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                isMaintenanceMode ? 'translate-x-9' : 'translate-x-1'
              }`} />
            </div>
          </button>
        </div>
        {isMaintenanceMode && (
          <div className="mt-4 p-3 bg-amber-100 rounded-xl text-amber-800 text-sm">
            🔒 All public pages are currently showing a &quot;Under Maintenance&quot; screen. Admin panel remains accessible. Toggle off to restore the live site.
          </div>
        )}
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

