"use client";

import type { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import EmptyRestaurantState from "@/components/dashboard/EmptyRestaurantState";
import AppShell from "@/components/dashboard/AppShell";
import { useMyRequests } from "@/hooks/useRestaurantRequests";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const { data: requests, isPending } = useMyRequests();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas bg-grain">
        <p className="text-sm text-ink/60">Chargement…</p>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas bg-grain px-6">
        <EmptyRestaurantState />
      </div>
    );
  }

  return <AppShell sidebar={<Sidebar />}>{children}</AppShell>;
}
