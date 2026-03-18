'use client';

import { useVisibility, SectionKey } from '@/hooks/useVisibility';

export function SectionGate({ id, children }: { id: SectionKey; children: React.ReactNode }) {
  const { isSectionVisible, loaded } = useVisibility();
  if (!loaded) return null;
  if (!isSectionVisible(id)) return null;
  return <>{children}</>;
}
