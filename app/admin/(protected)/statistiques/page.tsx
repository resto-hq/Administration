"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import { usePlatformStats } from "@/hooks/useAdmin";

export default function AdminStatistiquesPage() {
  const { data: stats, isPending, isError } = usePlatformStats();

  return (
    <div>
      <PageHeader
        eyebrow="ADMIN RESTO"
        title="Statistiques"
        subtitle="Indicateurs de croissance de la plateforme, à consulter séparément de la file d'action."
      />

      {isError && (
        <p className="mb-4 text-sm font-semibold text-danger-ui">
          Impossible de charger les statistiques.
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Restaurants publiés"
          value={isPending ? "…" : String(stats?.total_restaurants ?? 0)}
        />
        <StatCard label="Utilisateurs" value={isPending ? "…" : String(stats?.total_users ?? 0)} />
        <StatCard
          label="Utilisateurs actifs (30j)"
          value={isPending ? "…" : String(stats?.monthly_active_users ?? 0)}
        />
        <StatCard label="Événements" value={isPending ? "…" : String(stats?.total_events ?? 0)} />
        <StatCard label="Avis" value={isPending ? "…" : String(stats?.total_reviews ?? 0)} />
        <StatCard
          label="Clics billetterie"
          value={isPending ? "…" : String(stats?.ticket_link_clicks ?? 0)}
        />
      </div>
    </div>
  );
}
