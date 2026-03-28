'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * Generic hook that reads/writes data from a Supabase table.
 * Falls back to provided defaults if Supabase is unavailable.
 */
export function useAdminData<T>(
  table: string,
  defaults: T[],
  orderBy?: string
): {
  data: T[];
  loaded: boolean;
  refetch: () => Promise<void>;
  upsert: (item: T) => Promise<void>;
  remove: (id: string) => Promise<void>;
} {
  const [data, setData] = useState<T[]>(defaults);
  const [loaded, setLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    if (!supabase) {
      setLoaded(true);
      return;
    }
    try {
      let query = supabase.from(table).select('*');
      if (orderBy) {
        query = query.order(orderBy, { ascending: true });
      }
      const { data: rows, error } = await query;
      if (!error && rows && rows.length > 0) {
        setData(rows as T[]);
      }
    } catch {
      // Use defaults on error
    }
    setLoaded(true);
  }, [table, orderBy]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const upsert = useCallback(async (item: T) => {
    if (!supabase) return;
    await supabase.from(table).upsert(item as Record<string, unknown>);
    await fetchData();
  }, [table, fetchData]);

  const remove = useCallback(async (id: string) => {
    if (!supabase) return;
    await supabase.from(table).delete().eq('id', id);
    await fetchData();
  }, [table, fetchData]);

  return { data, loaded, refetch: fetchData, upsert, remove };
}
