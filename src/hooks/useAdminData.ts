'use client';

import { useState, useEffect } from 'react';

/**
 * Generic hook that reads admin-managed data from localStorage.
 * Falls back to provided defaults if no saved data exists.
 * This ensures that dashboard changes (stores, services, blogs, testimonials)
 * are reflected on the public website.
 */
export function useAdminData<T>(storageKey: string, defaults: T): { data: T; loaded: boolean } {
  const [data, setData] = useState<T>(defaults);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setData(parsed);
      }
    } catch {
      // Use defaults on parse error
    }
    setLoaded(true);
  }, [storageKey]);

  return { data, loaded };
}
