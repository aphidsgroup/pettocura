'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MaintenancePage from '@/components/MaintenancePage';
import { useMaintenanceMode } from '@/hooks/useMaintenanceMode';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const { isMaintenanceMode, loading } = useMaintenanceMode();

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
    </>
  );
}
