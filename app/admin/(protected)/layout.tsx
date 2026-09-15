"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import AppShell from "@/components/dashboard/AppShell";
import { useMe } from "@/hooks/useAuth";

const ADMIN_ROLES = ["admin", "superadmin"];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: me, isPending, isError } = useMe();
  const isAdmin = me ? ADMIN_ROLES.includes(me.role) : false;

  useEffect(() => {
    if (isError) router.replace("/admin/connexion");
    else if (me && !isAdmin) router.replace("/dashboard");
  }, [isError, me, isAdmin, router]);

  if (isPending || isError || !me || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-app-bg">
        <p className="text-sm text-ink/60">Chargement…</p>
      </div>
    );
  }

  return <AppShell sidebar={<Sidebar />}>{children}</AppShell>;
}
