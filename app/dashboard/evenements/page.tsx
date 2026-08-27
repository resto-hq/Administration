"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import StampButton from "@/components/StampButton";
import DataTable from "@/components/dashboard/DataTable";
import RequestStatusBadge from "@/components/dashboard/RequestStatusBadge";
import { useMyRequests } from "@/hooks/useRestaurantRequests";
import { useEventsList } from "@/hooks/useEvents";

export default function EvenementsPage() {
  const { data: requests } = useMyRequests();
  const approvedRestaurants = (requests ?? [])
    .filter((request) => request.status === "approved" && request.created_restaurant_id)
    .map((request) => ({ id: request.created_restaurant_id as string, name: request.name }));

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const activeRestaurantId = selectedId ?? approvedRestaurants[0]?.id ?? null;

  const { data: events, isPending } = useEventsList(
    activeRestaurantId ? { restaurant_id: activeRestaurantId } : undefined,
    { enabled: Boolean(activeRestaurantId) }
  );

  return (
    <div>
      <PageHeader
        eyebrow="ANIMATION"
        title="Événements"
        subtitle="Annonce tes soirées et dégustations auprès des gourmets déjà là pour manger."
      />

      {approvedRestaurants.length === 0 ? (
        <p className="text-sm text-ink/60">
          Publie un événement une fois qu&apos;un de tes restaurants est validé.
        </p>
      ) : (
        <div className="space-y-4">
          {approvedRestaurants.length > 1 && (
            <select
              value={activeRestaurantId ?? ""}
              onChange={(event) => setSelectedId(event.target.value)}
              className="cut-corners-sm border border-ink/15 bg-paper-alt px-4 py-2 text-sm text-ink outline-none focus:border-primary"
            >
              {approvedRestaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          )}

          {isPending ? (
            <p className="text-sm text-ink/60">Chargement…</p>
          ) : (
            <DataTable
              rows={events ?? []}
              getRowKey={(event) => event.id}
              getRowHref={(event) => `/dashboard/evenements/${event.id}`}
              emptyMessage="Aucun événement publié pour le moment."
              columns={[
                {
                  key: "title",
                  label: "Titre",
                  render: (event) => <span className="font-semibold">{event.title}</span>,
                },
                {
                  key: "start_date",
                  label: "Date",
                  sortValue: (event) => event.start_date,
                  render: (event) => new Date(event.start_date).toLocaleDateString("fr-FR"),
                },
                {
                  key: "status",
                  label: "Statut",
                  sortValue: (event) => event.status,
                  render: (event) => <RequestStatusBadge status={event.status} />,
                },
              ]}
            />
          )}

          <Link href={`/dashboard/evenements/nouveau?restaurant=${activeRestaurantId}`}>
            <StampButton type="button">+ Publier un événement</StampButton>
          </Link>
        </div>
      )}
    </div>
  );
}
