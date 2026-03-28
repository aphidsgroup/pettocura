'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import StickyBookBar from '@/components/StickyBookBar';
import LeadPopup from '@/components/LeadPopup';
import ReelsPlayer from '@/components/ReelsPlayer';
import MaintenancePage from '@/components/MaintenancePage';
import { useMaintenanceMode } from '@/hooks/useMaintenanceMode';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const { isMaintenanceMode, loading } = useMaintenanceMode();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isAdmin) {
    return <>{children}</>;
  }

  // Show maintenance page for public visitors when maintenance mode is on
  if (!loading && isMaintenanceMode) {
    return <MaintenancePage />;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppButton />
      <StickyBookBar />
      <LeadPopup />
      <ReelsPlayer />
    </>
  );
}

