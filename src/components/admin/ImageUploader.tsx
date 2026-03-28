'use client';

import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { convertToWebP, resizeImage, generateFilePath } from '@/lib/imageUtils';
import { FaCloudUploadAlt, FaTimes, FaSpinner } from 'react-icons/fa';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  maxWidth?: number;
  maxHeight?: number;
}

export default function ImageUploader({
  value,
  onChange,
  folder = 'general',
  label = 'Image',
  maxWidth = 1920,
  maxHeight = 1920,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !supabase) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    setUploading(true);
    setError('');
    setProgress(20);

    try {
      // Step 1: Resize if needed
      setProgress(30);
      const resized = await resizeImage(file, maxWidth, maxHeight);

      // Step 2: Convert to WebP
      setProgress(50);
      const webpFile = await convertToWebP(resized);

      // Step 3: Upload to Supabase Storage
      setProgress(70);
      const filePath = generateFilePath(folder, webpFile.name);
      const { error: uploadError } = await supabase.storage
        .from('site-media')
        .upload(filePath, webpFile, { contentType: 'image/webp', upsert: true });

      if (uploadError) throw uploadError;

      // Step 4: Get public URL
      setProgress(90);
      const { data: publicData } = supabase.storage.from('site-media').getPublicUrl(filePath);
      const publicUrl = publicData.publicUrl;

      // Step 5: Save to media library
      await supabase.from('media_library').insert({
        file_name: webpFile.name,
        file_url: publicUrl,
        file_size: webpFile.size,
        mime_type: 'image/webp',
        folder,
      });

      setProgress(100);
      onChange(publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-stone-700 mb-2">{label}</label>

      {value ? (
        <div className="relative group inline-block">
          <img
            src={value}
            alt=""
            className="w-32 h-32 object-cover rounded-xl border border-stone-200"
          />
          <button
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FaTimes className="w-3 h-3" />
          </button>
          <button
            onClick={() => inputRef.current?.click()}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center text-white text-xs font-medium"
          >
            Replace
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-32 h-32 border-2 border-dashed border-stone-300 rounded-xl flex flex-col items-center justify-center gap-2 text-stone-400 hover:border-teal-400 hover:text-teal-500 transition-colors cursor-pointer"
        >
          {uploading ? (
            <>
              <FaSpinner className="w-5 h-5 animate-spin" />
              <span className="text-xs">{progress}%</span>
            </>
          ) : (
            <>
              <FaCloudUploadAlt className="w-6 h-6" />
              <span className="text-xs">Upload</span>
            </>
          )}
        </button>
      )}

      {/* Progress bar */}
      {uploading && (
        <div className="mt-2 w-32 h-1.5 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
      <p className="text-xs text-stone-400 mt-1">Auto-converts to WebP for SEO</p>
    </div>
  );
}
