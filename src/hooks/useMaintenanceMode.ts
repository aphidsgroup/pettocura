'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

const TABLE = 'site_settings';
const KEY = 'maintenance_mode';

export function useMaintenanceMode() {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    // If supabase is not configured, fall back to localStorage
    if (!supabase) {
      if (typeof window !== 'undefined') {
        const local = localStorage.getItem('pettocura_maintenance_mode');
        setIsMaintenanceMode(local === 'true');
      }
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from(TABLE)
        .select('value')
        .eq('key', KEY)
        .single();

      if (error) {
        // Table might not exist yet — fall back to localStorage
        if (typeof window !== 'undefined') {
          const local = localStorage.getItem('pettocura_maintenance_mode');
          setIsMaintenanceMode(local === 'true');
        }
      } else {
        setIsMaintenanceMode(data.value === 'true');
      }
    } catch {
      if (typeof window !== 'undefined') {
        const local = localStorage.getItem('pettocura_maintenance_mode');
        setIsMaintenanceMode(local === 'true');
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStatus();

    // Subscribe to realtime changes so all devices update instantly
    if (!supabase) return;

    const channel = supabase
      .channel('site_settings_changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: TABLE, filter: `key=eq.${KEY}` },
        (payload) => {
          setIsMaintenanceMode(payload.new.value === 'true');
        }
      )
      .subscribe();

    return () => {
      supabase?.removeChannel(channel);
    };
  }, [fetchStatus]);

  const toggle = async () => {
    const newValue = !isMaintenanceMode;
    setIsMaintenanceMode(newValue);

    // Update localStorage as fallback
    if (typeof window !== 'undefined') {
      localStorage.setItem('pettocura_maintenance_mode', String(newValue));
    }

    if (!supabase) return;

    try {
      await supabase
        .from(TABLE)
        .upsert({ key: KEY, value: String(newValue), updated_at: new Date().toISOString() });
    } catch {
      console.warn('Supabase unavailable, using localStorage fallback');
    }
  };

  return { isMaintenanceMode, loading, toggle };
}
