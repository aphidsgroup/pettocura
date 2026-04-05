'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useVisibility, PageKey } from '@/hooks/useVisibility';

export function PageGate({ pageKey, children }: { pageKey: PageKey; children: React.ReactNode }) {
  const { isPageVisible, loaded } = useVisibility();
  const router = useRouter();

  useEffect(() => {
    // Once visibility settings are loaded, redirect if page is hidden
    if (loaded && !isPageVisible(pageKey)) {
      router.replace('/');
    }
  }, [loaded, pageKey, isPageVisible, router]);

  // While loading, render nothing to avoid flash
  if (!loaded) return null;

  // If hidden, render nothing — the redirect effect will handle navigation
  if (!isPageVisible(pageKey)) return null;

  return <>{children}</>;
}
