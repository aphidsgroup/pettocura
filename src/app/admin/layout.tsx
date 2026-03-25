'use client';

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaStore, FaBlog, FaTools, FaSignOutAlt, FaTachometerAlt, FaBars, FaTimes, FaEye, FaStar } from 'react-icons/fa';

const ADMIN_PASSWORD = 'pettocura2024';

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: FaTachometerAlt },
  { href: '/admin/visibility', label: 'Visibility', icon: FaEye },
  { href: '/admin/stores', label: 'Store Manager', icon: FaStore },
  { href: '/admin/blog', label: 'Blog Manager', icon: FaBlog },
  { href: '/admin/services', label: 'Services', icon: FaTools },
  { href: '/admin/testimonials', label: 'Testimonials', icon: FaStar },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('pettocura_admin_token');
    if (token === 'authenticated') setIsAuth(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('pettocura_admin_token', 'authenticated');
      setIsAuth(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('pettocura_admin_token');
    setIsAuth(false);
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 p-2">
              <Image
                src="/logo.png"
                alt="Petto Cura Logo"
                width={56}
                height={56}
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
            <h1 className="text-2xl font-bold text-white">Petto Cura Admin</h1>
            <p className="text-stone-400 text-sm mt-1">CMS Control Center</p>
          </div>
          <form onSubmit={handleLogin} className="bg-stone-800 rounded-2xl p-6 border border-stone-700">
            <label htmlFor="admin-password" className="block text-sm font-medium text-stone-300 mb-2">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-xl bg-stone-700 border border-stone-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder:text-stone-500"
            />
            {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
            <button
              type="submit"
              className="w-full mt-4 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-500 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-stone-900 transform transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-stone-800">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center p-1">
              <Image
                src="/logo.png"
                alt="Petto Cura"
                width={28}
                height={28}
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
            <span className="text-white font-bold">Admin Panel</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-stone-400 hover:text-white">
            <FaTimes />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-stone-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-stone-400 hover:text-red-400 hover:bg-stone-800 w-full transition-colors"
          >
            <FaSignOutAlt className="w-4 h-4" />
            Logout
          </button>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-stone-500 hover:text-stone-300 hover:bg-stone-800 mt-1 transition-colors"
          >
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between lg:justify-end">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-stone-600 hover:text-stone-900">
            <FaBars className="w-5 h-5" />
          </button>
          <div className="text-sm text-stone-500">
            Petto Cura CMS
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
