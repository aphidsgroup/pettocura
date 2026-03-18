'use client';

import { useVisibility, PageKey } from '@/hooks/useVisibility';
import AnimatedSection from '@/components/ui/AnimatedSection';

export function PageGate({ pageKey, children }: { pageKey: PageKey; children: React.ReactNode }) {
  const { isPageVisible, loaded } = useVisibility();

  if (!loaded) return null;

  if (!isPageVisible(pageKey)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-stone-50">
        <AnimatedSection className="text-center max-w-sm px-4">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🐾</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mb-3">Coming Soon</h1>
          <p className="text-stone-500 text-sm">This page is under development. Check back soon for exciting updates!</p>
        </AnimatedSection>
      </div>
    );
  }

  return <>{children}</>;
}
