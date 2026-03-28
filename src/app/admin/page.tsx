'use client';

import { useState } from 'react';
import { FaStore, FaBlog, FaTools, FaWrench, FaStar, FaLock } from 'react-icons/fa';
import Link from 'next/link';
import { useMaintenanceMode } from '@/hooks/useMaintenanceMode';

const PASSWORD_KEY = 'pettocura_admin_password';
const DEFAULT_PASSWORD = 'pettocura2024';

const dashboardCards = [
  { title: 'Store Locations', count: '3', desc: 'Manage center locations', icon: FaStore, href: '/admin/stores', color: 'from-teal-500 to-teal-600' },
  { title: 'Blog Posts', count: '4', desc: 'Manage pet care guides', icon: FaBlog, href: '/admin/blog', color: 'from-violet-500 to-purple-600' },
  { title: 'Services', count: '8', desc: 'Manage services & pricing', icon: FaTools, href: '/admin/services', color: 'from-amber-500 to-orange-500' },
  { title: 'Testimonials', count: '4', desc: 'Customer reviews', icon: FaStar, href: '/admin/testimonials', color: 'from-yellow-500 to-amber-500' },
];

export default function AdminDashboard() {
  const { isMaintenanceMode, loading, toggle } = useMaintenanceMode();
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [pwMsg, setPwMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg(null);

    const storedPw = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;

    if (pwForm.current !== storedPw) {
      setPwMsg({ type: 'error', text: 'Current password is incorrect.' });
      return;
    }
    if (pwForm.newPw.length < 6) {
      setPwMsg({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }
    if (pwForm.newPw !== pwForm.confirm) {
      setPwMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    localStorage.setItem(PASSWORD_KEY, pwForm.newPw);
    setPwMsg({ type: 'success', text: 'Password changed successfully!' });
    setPwForm({ current: '', newPw: '', confirm: '' });
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Link href="/admin/stores" className="px-4 py-3 rounded-xl bg-teal-50 text-teal-700 text-sm font-medium hover:bg-teal-100 transition-colors text-center">
            + Add Store Location
          </Link>
          <Link href="/admin/blog" className="px-4 py-3 rounded-xl bg-violet-50 text-violet-700 text-sm font-medium hover:bg-violet-100 transition-colors text-center">
            + Write Blog Post
          </Link>
          <Link href="/admin/services" className="px-4 py-3 rounded-xl bg-amber-50 text-amber-700 text-sm font-medium hover:bg-amber-100 transition-colors text-center">
            Update Service Prices
          </Link>
          <Link href="/admin/testimonials" className="px-4 py-3 rounded-xl bg-yellow-50 text-yellow-700 text-sm font-medium hover:bg-yellow-100 transition-colors text-center">
            Manage Testimonials
          </Link>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="mt-8 bg-white rounded-2xl border border-stone-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
            <FaLock className="w-4 h-4 text-stone-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900">Change Password</h2>
            <p className="text-sm text-stone-500">Update your admin panel password</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Current Password</label>
            <input
              type="password"
              value={pwForm.current}
              onChange={e => setPwForm({ ...pwForm, current: e.target.value })}
              required
              placeholder="Enter current password"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">New Password</label>
            <input
              type="password"
              value={pwForm.newPw}
              onChange={e => setPwForm({ ...pwForm, newPw: e.target.value })}
              required
              placeholder="Enter new password (min 6 chars)"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={pwForm.confirm}
              onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })}
              required
              placeholder="Confirm new password"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
            />
          </div>

          {pwMsg && (
            <div className={`p-3 rounded-xl text-sm ${pwMsg.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {pwMsg.text}
            </div>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 bg-stone-900 text-white font-semibold rounded-xl hover:bg-stone-800 transition-colors text-sm"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
