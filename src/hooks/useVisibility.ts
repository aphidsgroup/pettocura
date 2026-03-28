'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface VisibilitySettings {
  pages: {
    home: boolean;
    grooming: boolean;
    boarding: boolean;
    'find-a-center': boolean;
    blog: boolean;
    contact: boolean;
  };
  sections: {
    'home-hero': boolean;
    'home-services': boolean;
    'home-trust': boolean;
    'home-whyus': boolean;
    'home-cta': boolean;
    'home-testimonials': boolean;
    'home-franchise': boolean;
    'grooming-hero': boolean;
    'grooming-quick-answers': boolean;
    'grooming-key-facts': boolean;
    'grooming-services': boolean;
    'grooming-faq': boolean;
    'grooming-franchise': boolean;
    'boarding-hero': boolean;
    'boarding-safety': boolean;
    'boarding-live-update': boolean;
    'boarding-services': boolean;
    'boarding-quick-answers': boolean;
    'boarding-key-facts': boolean;
    'boarding-faq': boolean;
    'boarding-franchise': boolean;
    'center-header': boolean;
    'center-map': boolean;
    'center-cards': boolean;
    'center-franchise': boolean;
    'blog-header': boolean;
    'blog-filters': boolean;
    'blog-grid': boolean;
    'contact-header': boolean;
    'contact-form': boolean;
    'contact-info': boolean;
    'contact-map': boolean;
    'contact-franchise': boolean;
  };
}

const TABLE = 'visibility_settings';

const allKeys: string[] = [
  'home', 'grooming', 'boarding', 'find-a-center', 'blog', 'contact',
  'home-hero', 'home-services', 'home-trust', 'home-whyus', 'home-cta', 'home-testimonials', 'home-franchise',
  'grooming-hero', 'grooming-quick-answers', 'grooming-key-facts', 'grooming-services', 'grooming-faq', 'grooming-franchise',
  'boarding-hero', 'boarding-safety', 'boarding-live-update', 'boarding-services', 'boarding-quick-answers', 'boarding-key-facts', 'boarding-faq', 'boarding-franchise',
  'center-header', 'center-map', 'center-cards', 'center-franchise',
  'blog-header', 'blog-filters', 'blog-grid',
  'contact-header', 'contact-form', 'contact-info', 'contact-map', 'contact-franchise',
];

const pageKeys = ['home', 'grooming', 'boarding', 'find-a-center', 'blog', 'contact'];

const defaultSettings: VisibilitySettings = {
  pages: {
    home: true, grooming: true, boarding: true, 'find-a-center': true, blog: true, contact: true,
  },
  sections: {
    'home-hero': true, 'home-services': true, 'home-trust': true, 'home-whyus': true, 'home-cta': true, 'home-testimonials': true, 'home-franchise': true,
    'grooming-hero': true, 'grooming-quick-answers': true, 'grooming-key-facts': true, 'grooming-services': true, 'grooming-faq': true, 'grooming-franchise': true,
    'boarding-hero': true, 'boarding-safety': true, 'boarding-live-update': true, 'boarding-services': true, 'boarding-quick-answers': true, 'boarding-key-facts': true, 'boarding-faq': true, 'boarding-franchise': true,
    'center-header': true, 'center-map': true, 'center-cards': true, 'center-franchise': true,
    'blog-header': true, 'blog-filters': true, 'blog-grid': true,
    'contact-header': true, 'contact-form': true, 'contact-info': true, 'contact-map': true, 'contact-franchise': true,
  },
};

function rowsToSettings(rows: { key: string; visible: boolean }[]): VisibilitySettings {
  const settings = JSON.parse(JSON.stringify(defaultSettings)) as VisibilitySettings;
  for (const row of rows) {
    if (pageKeys.includes(row.key)) {
      (settings.pages as Record<string, boolean>)[row.key] = row.visible;
    } else if (row.key in settings.sections) {
      (settings.sections as Record<string, boolean>)[row.key] = row.visible;
    }
  }
  return settings;
}

export function useVisibility() {
  const [settings, setSettings] = useState<VisibilitySettings>(defaultSettings);
  const [loaded, setLoaded] = useState(false);

  const fetchSettings = useCallback(async () => {
    if (!supabase) {
      setLoaded(true);
      return;
    }
    try {
      const { data: rows, error } = await supabase.from(TABLE).select('*');
      if (!error && rows && rows.length > 0) {
        setSettings(rowsToSettings(rows));
      }
    } catch { /* use defaults */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const togglePage = useCallback(async (page: keyof VisibilitySettings['pages']) => {
    const newVal = !settings.pages[page];
    setSettings(prev => ({
      ...prev,
      pages: { ...prev.pages, [page]: newVal },
    }));
    if (supabase) {
      await supabase.from(TABLE).upsert({ key: page, visible: newVal, updated_at: new Date().toISOString() });
    }
  }, [settings]);

  const toggleSection = useCallback(async (section: keyof VisibilitySettings['sections']) => {
    const newVal = !settings.sections[section];
    setSettings(prev => ({
      ...prev,
      sections: { ...prev.sections, [section]: newVal },
    }));
    if (supabase) {
      await supabase.from(TABLE).upsert({ key: section, visible: newVal, updated_at: new Date().toISOString() });
    }
  }, [settings]);

  const isPageVisible = useCallback((page: keyof VisibilitySettings['pages']) => {
    return settings.pages[page];
  }, [settings]);

  const isSectionVisible = useCallback((section: keyof VisibilitySettings['sections']) => {
    return settings.sections[section];
  }, [settings]);

  const update = useCallback(async (newSettings: VisibilitySettings) => {
    setSettings(newSettings);
    // This is kept for compatibility but individual toggles handle Supabase sync
  }, []);

  return { settings, loaded, update, togglePage, toggleSection, isPageVisible, isSectionVisible };
}

export type SectionKey = keyof VisibilitySettings['sections'];
export type PageKey = keyof VisibilitySettings['pages'];
