"use client";

import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import RequestStatusBadge from "@/components/dashboard/RequestStatusBadge";
import { useMyRequests } from "@/hooks/useRestaurantRequests";

export default function MesRestaurantsPage() {
  const { data: requests, isPending } = useMyRequests();

  return (
    <div>
      <PageHeader
        eyebrow="TES ÉTABLISSEMENTS"
        title="Mes restaurants"
        subtitle="Suis le statut de tes demandes et gère la fiche de tes restaurants validés."
      />

      <div className="space-y-4">
        {isPending ? (
          <p className="text-sm text-ink/60">Chargement…</p>
        ) : (
          <DataTable
            rows={requests ?? []}
            getRowKey={(request) => request.id}
            getRowHref={(request) =>
              request.status === "approved" && request.created_restaurant_id
                ? `/dashboard/restaurants/${request.created_restaurant_id}`
                : `/dashboard/restaurants/requests/${request.id}`
            }
            emptyMessage="Aucun restaurant pour le moment."
            columns={[
              {
                key: "name",
                label: "Nom",
                sortValue: (request) => request.name,
                render: (request) => <span className="font-semibold">{request.name}</span>,
              },
              {
                key: "address",
                label: "Adresse",
                sortValue: (request) => request.address,
                render: (request) => request.address,
              },
              {
                key: "status",
                label: "Statut",
                sortValue: (request) => request.status,
                render: (request) => <RequestStatusBadge status={request.status} />,
              },
            ]}
          />
        )}

        <Link
          href="/dashboard/restaurants/nouveau"
          className="cut-corners-sm flex items-center justify-center gap-2 border border-dashed border-ink/30 p-5 text-sm font-semibold text-ink/60 hover:border-primary hover:text-ink"
        >
          + Ajouter un restaurant
        </Link>
      </div>
    </div>
  );
}
