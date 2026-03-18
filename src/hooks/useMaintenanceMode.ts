'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'pettocura_maintenance_mode';

export function useMaintenanceMode() {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'true') setIsMaintenanceMode(true);
    setLoading(false);
  }, []);

  const toggle = () => {
    const newValue = !isMaintenanceMode;
    setIsMaintenanceMode(newValue);
    localStorage.setItem(STORAGE_KEY, String(newValue));
  };

  return { isMaintenanceMode, loading, toggle };
}
