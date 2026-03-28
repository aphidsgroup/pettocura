'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ImageUploader from '@/components/admin/ImageUploader';
import { FaSave, FaCheck, FaSearch } from 'react-icons/fa';

interface PageSeo {
  page: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_title: string;
  og_description: string;
  og_image: string;
  canonical_url: string;
}

const pageLabels: Record<string, string> = {
  home: 'Home',
  grooming: 'Grooming',
  boarding: 'Boarding',
  contact: 'Contact / Book',
  blog: 'Blog',
  franchise: 'Franchise',
  'find-a-center': 'Find a Center',
};

export default function SeoManagerPage() {
  const [pages, setPages] = useState<PageSeo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState('home');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (!supabase) { setLoading(false); return; }
      const { data } = await supabase.from('page_seo').select('*');
      setPages(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const current = pages.find(p => p.page === activePage);

  const handleUpdate = (field: keyof PageSeo, value: string) => {
    setPages(prev => prev.map(p => p.page === activePage ? { ...p, [field]: value } : p));
    setSaved(false);
  };

  const handleSave = async () => {
    if (!supabase || !current) return;
    setSaving(true);
    await supabase.from('page_seo').update({
      meta_title: current.meta_title,
      meta_description: current.meta_description,
      meta_keywords: current.meta_keywords,
      og_title: current.og_title,
      og_description: current.og_description,
      og_image: current.og_image,
      canonical_url: current.canonical_url,
      updated_at: new Date().toISOString(),
    }).eq('page', activePage);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">SEO Manager</h1>
          <p className="text-stone-500 text-sm mt-1">Edit meta titles, descriptions, keywords, and OG data per page</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !current}
          className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-500 transition-colors text-sm disabled:opacity-50"
        >
          {saved ? <><FaCheck className="w-3 h-3" /> Saved!</> : <><FaSave className="w-3 h-3" /> {saving ? 'Saving...' : 'Save SEO'}</>}
        </button>
      </div>

      {/* Page Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {Object.entries(pageLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => { setActivePage(key); setSaved(false); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              activePage === key
                ? 'bg-teal-600 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16 text-stone-400">Loading SEO data...</div>
      ) : !current ? (
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-8 text-center">
          <FaSearch className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-stone-900 mb-2">SEO Data Not Found</h3>
          <p className="text-stone-600 text-sm">Run the SQL script in Supabase to create the page_seo table.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Meta Title & Description */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
            <h3 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
              <FaSearch className="w-3.5 h-3.5 text-teal-600" />
              Search Engine Preview
            </h3>
            {/* Google preview */}
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
              <p className="text-blue-700 text-lg font-medium truncate">{current.meta_title || 'Page Title'}</p>
              <p className="text-green-700 text-sm">{current.canonical_url || 'https://pettocura.com'}</p>
              <p className="text-stone-600 text-sm mt-1 line-clamp-2">{current.meta_description || 'Add a meta description...'}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Meta Title</label>
              <input
                value={current.meta_title}
                onChange={e => handleUpdate('meta_title', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
              />
              <p className="text-xs text-stone-400 mt-1">{current.meta_title.length}/60 characters</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Meta Description</label>
              <textarea
                value={current.meta_description}
                onChange={e => handleUpdate('meta_description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 resize-none"
              />
              <p className="text-xs text-stone-400 mt-1">{current.meta_description.length}/160 characters</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Keywords (comma separated)</label>
              <input
                value={current.meta_keywords}
                onChange={e => handleUpdate('meta_keywords', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Canonical URL</label>
              <input
                value={current.canonical_url}
                onChange={e => handleUpdate('canonical_url', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
              />
            </div>
          </div>

          {/* Open Graph */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
            <h3 className="font-semibold text-stone-900 text-sm">Open Graph (Social Media)</h3>

            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">OG Title</label>
              <input
                value={current.og_title}
                onChange={e => handleUpdate('og_title', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">OG Description</label>
              <textarea
                value={current.og_description}
                onChange={e => handleUpdate('og_description', e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 resize-none"
              />
            </div>

            <ImageUploader
              value={current.og_image}
              onChange={url => handleUpdate('og_image', url)}
              folder="seo"
              label="OG Image (1200×630 recommended)"
              maxWidth={1200}
              maxHeight={630}
            />
          </div>
        </div>
      )}
    </div>
  );
}
