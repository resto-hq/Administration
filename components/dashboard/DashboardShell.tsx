"use client";

import type { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import EmptyRestaurantState from "@/components/dashboard/EmptyRestaurantState";
import AppShell from "@/components/dashboard/AppShell";
import { useRestaurants } from "@/lib/restaurants-store";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const { restaurants } = useRestaurants();

  if (restaurants.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas bg-grain px-6">
        <EmptyRestaurantState />
      </div>
    );
  }

  return <AppShell sidebar={<Sidebar />}>{children}</AppShell>;
}
