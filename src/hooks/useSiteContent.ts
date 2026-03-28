'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface ContentItem {
  id: string;
  section: string;
  page: string;
  field_type: string;
  label: string;
  value: string;
  sort_order: number;
}

export function useSiteContent(page?: string) {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    if (!supabase) { setLoading(false); return; }
    let query = supabase.from('site_content').select('*').order('sort_order', { ascending: true });
    if (page) query = query.eq('page', page);
    const { data } = await query;
    setContent(data || []);
    setLoading(false);
  }, [page]);

  useEffect(() => { fetchContent(); }, [fetchContent]);

  const updateContent = async (id: string, value: string) => {
    if (!supabase) return;
    await supabase.from('site_content').update({ value, updated_at: new Date().toISOString() }).eq('id', id);
    setContent(prev => prev.map(c => c.id === id ? { ...c, value } : c));
  };

  const getContentValue = (id: string, fallback = '') => {
    return content.find(c => c.id === id)?.value || fallback;
  };

  const getContentBySection = (section: string) => {
    return content.filter(c => c.section === section);
  };

  return { content, loading, updateContent, getContentValue, getContentBySection, refetch: fetchContent };
}
