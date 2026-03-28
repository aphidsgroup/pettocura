'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

interface Reel {
  id: string;
  title: string;
  video_url: string;
  platform: string;
  is_active: boolean;
}

function getEmbedUrl(url: string, muted: boolean): string {
  // YouTube Shorts / regular YouTube
  const ytMatch = url.match(/(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${ytMatch[1]}&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0`;
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=${muted ? 1 : 0}&loop=1&background=1`;
  }

  // Instagram Reel
  if (url.includes('instagram.com')) {
    return `${url}embed/`;
  }

  return url;
}

export default function ReelsPlayer() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchReels = async () => {
      if (!supabase) return;
      const { data } = await supabase
        .from('reels')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      if (data && data.length > 0) {
        setReels(data);
        // Show after 3 seconds
        setTimeout(() => setVisible(true), 3000);
      }
    };
    fetchReels();
  }, []);

  // Auto-rotate reels every 30 seconds
  useEffect(() => {
    if (reels.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reels.length);
    }, 30000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [reels.length]);

  const handleClose = () => {
    setDismissed(true);
    setVisible(false);
  };

  if (dismissed || reels.length === 0 || !visible) return null;

  const currentReel = reels[currentIndex];
  const embedUrl = getEmbedUrl(currentReel.video_url, muted);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -100, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="fixed bottom-20 left-4 z-50 group"
        style={{ width: '180px' }}
      >
        {/* Reel Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border-2 border-white/20 bg-black" style={{ aspectRatio: '9/16' }}>
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 z-20 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <FaTimes className="w-3 h-3" />
          </button>

          {/* Mute/Unmute Button - Center */}
          <button
            onClick={() => setMuted(!muted)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
          >
            {muted ? <FaVolumeMute className="w-4 h-4" /> : <FaVolumeUp className="w-4 h-4" />}
          </button>

          {/* Video Iframe */}
          <iframe
            key={`${currentReel.id}-${muted}`}
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{ border: 0 }}
            title={currentReel.title || 'Petto Cura Reel'}
          />

          {/* Title overlay at bottom */}
          {currentReel.title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 z-10">
              <p className="text-white text-[10px] font-medium leading-tight truncate">{currentReel.title}</p>
            </div>
          )}

          {/* Reel counter dots */}
          {reels.length > 1 && (
            <div className="absolute top-2 left-2 z-20 flex gap-1">
              {reels.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-white w-4' : 'bg-white/40'}`}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
