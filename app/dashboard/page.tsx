"use client";

import Link from "next/link";
import { useQueries } from "@tanstack/react-query";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import { AVIS, RESERVATIONS } from "@/lib/mockData";
import { useMyRequests } from "@/hooks/useRestaurantRequests";
import * as eventsService from "@/services/events";
import { queryKeys } from "@/hooks/query-keys";

export default function DashboardOverviewPage() {
  const { data: requests } = useMyRequests();

  const approvedRestaurantIds = (requests ?? [])
    .filter((request) => request.status === "approved" && request.created_restaurant_id)
    .map((request) => request.created_restaurant_id as string);

  const aVerifier = (requests ?? []).filter((request) => request.status !== "approved").length;

  const eventsQueries = useQueries({
    queries: approvedRestaurantIds.map((restaurantId) => ({
      queryKey: queryKeys.events.list({ restaurant_id: restaurantId }),
      queryFn: () => eventsService.listEvents({ restaurant_id: restaurantId }),
    })),
  });
  const eventsCount = eventsQueries.reduce((sum, query) => sum + (query.data?.length ?? 0), 0);

  return (
    <div>
      <PageHeader
        eyebrow="TON ESPACE"
        title="Vue d'ensemble"
        subtitle="Le pouls de tes restaurants sur Resto, en un coup d'œil."
      />

      {aVerifier > 0 && (
        <Link
          href="/dashboard/restaurants"
          className="cut-corners mb-8 flex flex-col justify-between gap-3 bg-mustard/25 p-5 shadow-[4px_4px_0_var(--color-ink)] sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-stamp text-ink">
              {aVerifier} demande{aVerifier > 1 ? "s" : ""} en attente de validation
            </p>
            <p className="mt-1 text-sm text-ink/70">
              Suis le statut de tes demandes de référencement pour qu&apos;elles apparaissent
              publiquement sur Resto.
            </p>
          </div>
          <span className="cut-corners-sm shrink-0 bg-ink px-4 py-2 text-sm font-semibold text-paper">
            Voir mes restaurants →
          </span>
        </Link>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Visites de tes fiches" value="0" hint="depuis l'inscription" />
        <StatCard label="Avis reçus" value={String(AVIS.length)} />
        <StatCard label="Réservations" value={String(RESERVATIONS.length)} />
        <StatCard label="Événements publiés" value={String(eventsCount)} />
      </div>
    </div>
  );
}
