"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { useMe } from "@/hooks/useAuth";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: me, isPending, isError } = useMe();

  useEffect(() => {
    if (isError) router.replace("/connexion");
  }, [isError, router]);

  if (isPending || isError || !me) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-app-bg">
        <p className="text-sm text-ink/60">Chargement…</p>
      </div>
    );
  }

  return <DashboardShell>{children}</DashboardShell>;
}
