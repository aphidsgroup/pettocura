'use client';

import { useState, useEffect, useCallback } from 'react';

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
    // Home
    'home-hero': boolean;
    'home-services': boolean;
    'home-trust': boolean;
    'home-whyus': boolean;
    'home-cta': boolean;
    'home-testimonials': boolean;
    'home-franchise': boolean;
    // Grooming
    'grooming-hero': boolean;
    'grooming-quick-answers': boolean;
    'grooming-key-facts': boolean;
    'grooming-services': boolean;
    'grooming-faq': boolean;
    // Boarding
    'boarding-hero': boolean;
    'boarding-safety': boolean;
    'boarding-live-update': boolean;
    'boarding-services': boolean;
    'boarding-quick-answers': boolean;
    'boarding-key-facts': boolean;
    'boarding-faq': boolean;
    'boarding-franchise': boolean;
    // Find a Center
    'center-header': boolean;
    'center-map': boolean;
    'center-cards': boolean;
    'center-franchise': boolean;
    // Blog
    'blog-header': boolean;
    'blog-filters': boolean;
    'blog-grid': boolean;
    // Contact
    'contact-header': boolean;
    'contact-form': boolean;
    'contact-info': boolean;
    'contact-map': boolean;
    'contact-franchise': boolean;
    // Grooming franchise
    'grooming-franchise': boolean;
  };
}

const STORAGE_KEY = 'pettocura_visibility';

const defaultSettings: VisibilitySettings = {
  pages: {
    home: true,
    grooming: true,
    boarding: true,
    'find-a-center': true,
    blog: true,
    contact: true,
  },
  sections: {
    'home-hero': true,
    'home-services': true,
    'home-trust': true,
    'home-whyus': true,
    'home-cta': true,
    'home-testimonials': true,
    'home-franchise': true,
    'grooming-hero': true,
    'grooming-quick-answers': true,
    'grooming-key-facts': true,
    'grooming-services': true,
    'grooming-faq': true,
    'boarding-hero': true,
    'boarding-safety': true,
    'boarding-live-update': true,
    'boarding-services': true,
    'boarding-quick-answers': true,
    'boarding-key-facts': true,
    'boarding-faq': true,
    'boarding-franchise': true,
    'center-header': true,
    'center-map': true,
    'center-cards': true,
    'center-franchise': true,
    'blog-header': true,
    'blog-filters': true,
    'blog-grid': true,
    'contact-header': true,
    'contact-form': true,
    'contact-info': true,
    'contact-map': true,
    'contact-franchise': true,
    'grooming-franchise': true,
  },
};

export function useVisibility() {
  const [settings, setSettings] = useState<VisibilitySettings>(defaultSettings);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings({ ...defaultSettings, ...parsed, pages: { ...defaultSettings.pages, ...parsed.pages }, sections: { ...defaultSettings.sections, ...parsed.sections } });
      } catch { /* use defaults */ }
    }
    setLoaded(true);
  }, []);

  const update = useCallback((newSettings: VisibilitySettings) => {
    setSettings(newSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
  }, []);

  const togglePage = useCallback((page: keyof VisibilitySettings['pages']) => {
    setSettings(prev => {
      const next = { ...prev, pages: { ...prev.pages, [page]: !prev.pages[page] } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleSection = useCallback((section: keyof VisibilitySettings['sections']) => {
    setSettings(prev => {
      const next = { ...prev, sections: { ...prev.sections, [section]: !prev.sections[section] } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isPageVisible = useCallback((page: keyof VisibilitySettings['pages']) => {
    return settings.pages[page];
  }, [settings]);

  const isSectionVisible = useCallback((section: keyof VisibilitySettings['sections']) => {
    return settings.sections[section];
  }, [settings]);

  return { settings, loaded, update, togglePage, toggleSection, isPageVisible, isSectionVisible };
}

export type SectionKey = keyof VisibilitySettings['sections'];
export type PageKey = keyof VisibilitySettings['pages'];
