'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { convertToWebP, resizeImage, generateFilePath } from '@/lib/imageUtils';
import { FaCloudUploadAlt, FaTrash, FaCopy, FaCheck, FaImages, FaSpinner } from 'react-icons/fa';

interface MediaItem {
  id: string;
  file_name: string;
  file_url: string;
  file_size: number;
  mime_type: string;
  folder: string;
  uploaded_at: string;
}

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    if (!supabase) { setLoading(false); return; }
    const { data } = await supabase.from('media_library').select('*').order('uploaded_at', { ascending: false });
    setMedia(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchMedia(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !supabase) return;

    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const resized = await resizeImage(file, 1920, 1920);
        const webp = await convertToWebP(resized);
        const path = generateFilePath('uploads', webp.name);

        const { error } = await supabase.storage.from('site-media').upload(path, webp, { contentType: 'image/webp', upsert: true });
        if (error) continue;

        const { data } = supabase.storage.from('site-media').getPublicUrl(path);
        await supabase.from('media_library').insert({
          file_name: webp.name,
          file_url: data.publicUrl,
          file_size: webp.size,
          mime_type: 'image/webp',
          folder: 'uploads',
        });
      } catch { /* skip failed uploads */ }
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = '';
    fetchMedia();
  };

  const handleDelete = async (item: MediaItem) => {
    if (!supabase || !confirm(`Delete ${item.file_name}?`)) return;
    // Extract storage path from URL
    const urlParts = item.file_url.split('/site-media/');
    if (urlParts[1]) {
      await supabase.storage.from('site-media').remove([urlParts[1]]);
    }
    await supabase.from('media_library').delete().eq('id', item.id);
    fetchMedia();
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const folders = [...new Set(media.map(m => m.folder))];
  const filtered = filter === 'all' ? media : media.filter(m => m.folder === filter);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Media Library</h1>
          <p className="text-stone-500 text-sm mt-1">{media.length} images • All auto-converted to WebP</p>
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-500 transition-colors text-sm disabled:opacity-50"
        >
          {uploading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaCloudUploadAlt className="w-3 h-3" />}
          {uploading ? 'Uploading...' : 'Upload Images'}
        </button>
      </div>

      <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === 'all' ? 'bg-teal-600 text-white' : 'bg-white text-stone-600 border border-stone-200'}`}
        >
          All ({media.length})
        </button>
        {folders.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${filter === f ? 'bg-teal-600 text-white' : 'bg-white text-stone-600 border border-stone-200'}`}
          >
            {f} ({media.filter(m => m.folder === f).length})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16 text-stone-400">Loading media...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
          <FaImages className="w-12 h-12 text-stone-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-stone-900 mb-1">No Images</h3>
          <p className="text-stone-500 text-sm">Upload your first image. It will be auto-converted to WebP for SEO.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(item => (
            <div key={item.id} className="group relative bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-square bg-stone-100">
                <img src={item.file_url} alt={item.file_name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleCopy(item.file_url, item.id)}
                  className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  title="Copy URL"
                >
                  {copiedId === item.id ? <FaCheck className="w-3.5 h-3.5" /> : <FaCopy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="w-9 h-9 rounded-lg bg-red-500/60 flex items-center justify-center text-white hover:bg-red-500/80 transition-colors"
                  title="Delete"
                >
                  <FaTrash className="w-3.5 h-3.5" />
                </button>
              </div>
              {/* Info */}
              <div className="p-2">
                <p className="text-xs text-stone-700 font-medium truncate">{item.file_name}</p>
                <p className="text-[10px] text-stone-400">{formatSize(item.file_size)} • {item.folder}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
