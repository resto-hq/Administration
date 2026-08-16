import type { ReactNode } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { RestaurantsProvider } from "@/lib/restaurants-store";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <RestaurantsProvider>
      <DashboardShell>{children}</DashboardShell>
    </RestaurantsProvider>
  );
}
