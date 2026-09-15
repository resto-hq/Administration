"use client";

import Link from "next/link";
import { useQueries } from "@tanstack/react-query";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import { useMyRestaurants } from "@/hooks/useRestaurants";
import { useMyReviews } from "@/hooks/useReviews";
import * as eventsService from "@/services/events";
import { queryKeys } from "@/hooks/query-keys";

export default function DashboardOverviewPage() {
  const { data: restaurants } = useMyRestaurants();
  const { data: reviews } = useMyReviews();

  const publishedRestaurantIds = (restaurants ?? [])
    .filter((restaurant) => restaurant.status === "published")
    .map((restaurant) => restaurant.id);

  const aVerifier = (restaurants ?? []).filter(
    (restaurant) => restaurant.status !== "published"
  ).length;

  const eventsQueries = useQueries({
    queries: publishedRestaurantIds.map((restaurantId) => ({
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
          className="mb-8 flex flex-col justify-between gap-3 rounded-xl border border-border bg-mustard/15 p-5 sm:flex-row sm:items-center"
        >
          <div>
            <p className="font-bold text-ink">
              {aVerifier} restaurant{aVerifier > 1 ? "s" : ""} à finaliser côté vérification
            </p>
            <p className="mt-1 text-sm text-ink/70">
              Termine leur dossier pour qu&apos;ils apparaissent publiquement sur Resto.
            </p>
          </div>
          <span className="shrink-0 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-paper">
            Voir mes restaurants →
          </span>
        </Link>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Visites de tes fiches" value="0" hint="depuis l'inscription" />
        <StatCard label="Avis reçus" value={String(reviews.length)} />
        <StatCard label="Restaurants publiés" value={String(publishedRestaurantIds.length)} />
        <StatCard label="Événements publiés" value={String(eventsCount)} />
      </div>
    </div>
  );
}
