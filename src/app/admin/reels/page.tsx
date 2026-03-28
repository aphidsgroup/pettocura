'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { FaPlus, FaTrash, FaVideo, FaToggleOn, FaToggleOff, FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface Reel {
  id: string;
  title: string;
  video_url: string;
  platform: string;
  is_active: boolean;
  sort_order: number;
}

export default function ReelsManagerPage() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', video_url: '', platform: 'youtube' });
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tableExists, setTableExists] = useState(true);

  const fetchReels = async () => {
    if (!supabase) return;
    const { data, error } = await supabase.from('reels').select('*').order('sort_order', { ascending: true });
    if (error) {
      if (error.code === '42P01') setTableExists(false);
      setLoading(false);
      return;
    }
    setReels(data || []);
    setLoading(false);
  };

  const createTable = async () => {
    if (!supabase) return;
    // Use the setup API route
    try {
      const res = await fetch('/api/setup-reels', { method: 'POST' });
      if (res.ok) {
        setTableExists(true);
        fetchReels();
      }
    } catch {
      alert('Failed to create reels table. Please create it manually in Supabase.');
    }
  };

  useEffect(() => { fetchReels(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !form.video_url) return;
    setSaving(true);
    const maxOrder = reels.length > 0 ? Math.max(...reels.map(r => r.sort_order)) + 1 : 0;
    await supabase.from('reels').insert({
      title: form.title,
      video_url: form.video_url,
      platform: form.platform,
      sort_order: maxOrder,
    });
    setForm({ title: '', video_url: '', platform: 'youtube' });
    setShowForm(false);
    setSaving(false);
    fetchReels();
  };

  const handleDelete = async (id: string) => {
    if (!supabase || !confirm('Delete this reel?')) return;
    await supabase.from('reels').delete().eq('id', id);
    fetchReels();
  };

  const handleToggle = async (id: string, currentActive: boolean) => {
    if (!supabase) return;
    await supabase.from('reels').update({ is_active: !currentActive }).eq('id', id);
    fetchReels();
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (!supabase) return;
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= reels.length) return;
    const a = reels[index], b = reels[swapIndex];
    await supabase.from('reels').update({ sort_order: b.sort_order }).eq('id', a.id);
    await supabase.from('reels').update({ sort_order: a.sort_order }).eq('id', b.id);
    fetchReels();
  };

  const getPlatformLabel = (url: string) => {
    if (url.includes('youtube') || url.includes('youtu.be')) return '🔴 YouTube';
    if (url.includes('vimeo')) return '🔵 Vimeo';
    if (url.includes('instagram')) return '🟣 Instagram';
    return '🎬 Video';
  };

  if (!tableExists) {
    return (
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-stone-900 mb-6">Reels Manager</h1>
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-8 text-center">
          <FaVideo className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-stone-900 mb-2">Reels Table Not Found</h2>
          <p className="text-stone-600 text-sm mb-6">The reels table needs to be created in your Supabase database. Click below to set it up automatically.</p>
          <button onClick={createTable} className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-500 transition-colors">
            Create Reels Table
          </button>
          <div className="mt-6 text-left bg-white rounded-xl p-4 border border-stone-200">
            <p className="text-xs font-mono text-stone-500 mb-2">Or run this SQL in Supabase SQL Editor:</p>
            <pre className="text-xs text-stone-700 overflow-x-auto whitespace-pre-wrap">{`CREATE TABLE public.reels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  video_url TEXT NOT NULL,
  platform TEXT DEFAULT 'youtube',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.reels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON public.reels FOR SELECT USING (true);
CREATE POLICY "Allow all ops" ON public.reels FOR ALL USING (true) WITH CHECK (true);`}</pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Reels Manager</h1>
          <p className="text-stone-500 text-sm mt-1">Manage mini reels that appear on the website. Supports YouTube Shorts, Vimeo, and Instagram Reels.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-500 transition-colors text-sm"
        >
          <FaPlus className="w-3 h-3" />
          Add Reel
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-2xl border border-stone-200 p-6 mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Title</label>
              <input
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="e.g., Grooming Session"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Platform</label>
              <select
                value={form.platform}
                onChange={e => setForm({ ...form, platform: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
              >
                <option value="youtube">YouTube / YouTube Shorts</option>
                <option value="vimeo">Vimeo</option>
                <option value="instagram">Instagram Reels</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">Video URL *</label>
            <input
              value={form.video_url}
              onChange={e => setForm({ ...form, video_url: e.target.value })}
              placeholder="https://www.youtube.com/shorts/abc123..."
              required
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
            />
            <p className="text-xs text-stone-400 mt-1">Paste the full URL of the YouTube Short, Vimeo video, or Instagram Reel</p>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-500 transition-colors text-sm disabled:opacity-50"
            >
              {saving ? 'Adding...' : 'Add Reel'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-2.5 bg-stone-100 text-stone-600 font-semibold rounded-xl hover:bg-stone-200 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reels List */}
      {loading ? (
        <div className="text-center py-16 text-stone-400">Loading reels...</div>
      ) : reels.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
          <FaVideo className="w-12 h-12 text-stone-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-stone-900 mb-1">No Reels Yet</h3>
          <p className="text-stone-500 text-sm">Add your first YouTube Short or Vimeo reel to display on the website.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reels.map((reel, i) => (
            <div key={reel.id} className={`bg-white rounded-2xl border ${reel.is_active ? 'border-stone-200' : 'border-stone-100 opacity-60'} p-5 flex items-center gap-4`}>
              {/* Thumbnail Preview */}
              <div className="w-16 h-24 rounded-xl bg-stone-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {reel.video_url.includes('youtube') || reel.video_url.includes('youtu.be') ? (
                  <img
                    src={`https://img.youtube.com/vi/${reel.video_url.match(/(?:shorts\/|watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1]}/mqdefault.jpg`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaVideo className="w-6 h-6 text-stone-300" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-stone-900 text-sm truncate">{reel.title || 'Untitled Reel'}</h4>
                <p className="text-xs text-stone-400 truncate mt-0.5">{reel.video_url}</p>
                <span className="inline-block mt-1.5 text-xs font-medium">{getPlatformLabel(reel.video_url)}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleMove(i, 'up')}
                  disabled={i === 0}
                  className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-600 hover:bg-stone-200 disabled:opacity-30 transition-colors"
                >
                  <FaArrowUp className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleMove(i, 'down')}
                  disabled={i === reels.length - 1}
                  className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-600 hover:bg-stone-200 disabled:opacity-30 transition-colors"
                >
                  <FaArrowDown className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleToggle(reel.id, reel.is_active)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${reel.is_active ? 'bg-teal-100 text-teal-600 hover:bg-teal-200' : 'bg-stone-100 text-stone-400 hover:bg-stone-200'}`}
                  title={reel.is_active ? 'Deactivate' : 'Activate'}
                >
                  {reel.is_active ? <FaToggleOn className="w-4 h-4" /> : <FaToggleOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDelete(reel.id)}
                  className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-100 transition-colors"
                >
                  <FaTrash className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
