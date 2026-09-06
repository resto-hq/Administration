"use client";

import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import {
  usePendingKyc,
  usePendingEvents,
  useAdminRestaurantRequests,
  usePlatformStats,
} from "@/hooks/useAdmin";

function QueueCard({ href, label, count }: { href: string; label: string; count: number }) {
  return (
    <Link
      href={href}
      className="cut-corners-sm flex items-center justify-between bg-mustard/25 p-4 shadow-[3px_3px_0_var(--color-ink)] hover:shadow-[5px_5px_0_var(--color-ink)]"
    >
      <span className="text-sm font-semibold text-ink">{label}</span>
      <span className="text-stamp text-xl text-ink">{count}</span>
    </Link>
  );
}

export default function AdminOverviewPage() {
  const { data: pendingKyc } = usePendingKyc();
  const { data: pendingEvents } = usePendingEvents();
  const { data: pendingRequests } = useAdminRestaurantRequests({ status: "pending" });
  const { data: stats, isPending: statsPending, isError: statsError } = usePlatformStats();

  const kycCount = pendingKyc?.length ?? 0;
  const eventsCount = pendingEvents?.length ?? 0;
  const requestsCount = pendingRequests?.length ?? 0;
  const hasQueue = kycCount + eventsCount + requestsCount > 0;

  return (
    <div>
      <PageHeader
        eyebrow="ADMIN RESTO"
        title="Vue d'ensemble"
        subtitle="La file d'action d'abord — les tendances sont dans Statistiques."
      />

      {hasQueue && (
        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {kycCount > 0 && (
            <QueueCard href="/admin/verifications" label="Vérifications KYC" count={kycCount} />
          )}
          {eventsCount > 0 && (
            <QueueCard href="/admin/evenements" label="Événements à modérer" count={eventsCount} />
          )}
          {requestsCount > 0 && (
            <QueueCard
              href="/admin/restaurants"
              label="Demandes de référencement"
              count={requestsCount}
            />
          )}
        </div>
      )}

      {statsError && (
        <p className="mb-4 text-sm font-semibold text-primary-dark">
          Impossible de charger les statistiques.
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Restaurants publiés"
          value={statsPending ? "…" : String(stats?.total_restaurants ?? 0)}
        />
        <StatCard label="Utilisateurs" value={statsPending ? "…" : String(stats?.total_users ?? 0)} />
        <StatCard label="Événements" value={statsPending ? "…" : String(stats?.total_events ?? 0)} />
        <StatCard label="Avis" value={statsPending ? "…" : String(stats?.total_reviews ?? 0)} />
      </div>
    </div>
  );
}
