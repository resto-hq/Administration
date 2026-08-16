import type { ReactNode } from "react";
import Sidebar from "@/components/admin/Sidebar";
import AppShell from "@/components/dashboard/AppShell";
import { KybProvider } from "@/lib/kyb-store";
import { EventsAdminProvider } from "@/lib/events-admin-store";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <KybProvider>
      <EventsAdminProvider>
        <AppShell sidebar={<Sidebar />}>{children}</AppShell>
      </EventsAdminProvider>
    </KybProvider>
  );
}
