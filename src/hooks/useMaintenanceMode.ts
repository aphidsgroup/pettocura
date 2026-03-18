'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

const TABLE = 'site_settings';
const KEY = 'maintenance_mode';

async function ensureTable() {
  // Check if table exists by trying to read from it
  const { error } = await supabase.from(TABLE).select('key').limit(1);
  if (error?.code === '42P01') {
    // Table doesn't exist — create it via RPC or raw query
    // We'll use the REST API to create it
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/`,
      { method: 'HEAD' }
    );
    // If table doesn't exist, we need the admin to create it.
    // For now let's try inserting and handle gracefully
    console.warn('site_settings table does not exist. Please create it in Supabase.');
    return false;
  }
  return true;
}

export function useMaintenanceMode() {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from(TABLE)
        .select('value')
        .eq('key', KEY)
        .single();

      if (error) {
        // Table might not exist yet — fall back to localStorage
        const local = localStorage.getItem('pettocura_maintenance_mode');
        setIsMaintenanceMode(local === 'true');
      } else {
        setIsMaintenanceMode(data.value === 'true');
      }
    } catch {
      const local = localStorage.getItem('pettocura_maintenance_mode');
      setIsMaintenanceMode(local === 'true');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStatus();

    // Subscribe to realtime changes so all devices update instantly
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
      supabase.removeChannel(channel);
    };
  }, [fetchStatus]);

  const toggle = async () => {
    const newValue = !isMaintenanceMode;
    setIsMaintenanceMode(newValue);

    // Update localStorage as fallback
    localStorage.setItem('pettocura_maintenance_mode', String(newValue));

    try {
      const { error } = await supabase
        .from(TABLE)
        .upsert({ key: KEY, value: String(newValue), updated_at: new Date().toISOString() });

      if (error) {
        console.warn('Failed to save to Supabase, using localStorage fallback:', error.message);
      }
    } catch {
      console.warn('Supabase unavailable, using localStorage fallback');
    }
  };

  return { isMaintenanceMode, loading, toggle };
}
