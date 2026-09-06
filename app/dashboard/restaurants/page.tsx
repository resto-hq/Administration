"use client";

import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import RequestStatusBadge from "@/components/dashboard/RequestStatusBadge";
import { useMyRestaurants } from "@/hooks/useRestaurants";
import { useKycStatus } from "@/hooks/useKyc";

export default function MesRestaurantsPage() {
  const { data: restaurants, isPending } = useMyRestaurants();
  const { data: kycStatus } = useKycStatus();
  const isApproved = kycStatus?.person_kyc.status === "approved";

  return (
    <div>
      <PageHeader
        eyebrow="TES ÉTABLISSEMENTS"
        title="Mes restaurants"
        subtitle="Gère la fiche et le dossier de vérification de chacun de tes restaurants."
      />

      <div className="space-y-4">
        {isPending ? (
          <p className="text-sm text-ink/60">Chargement…</p>
        ) : (
          <DataTable
            rows={restaurants ?? []}
            getRowKey={(restaurant) => restaurant.id}
            getRowHref={(restaurant) => `/dashboard/restaurants/${restaurant.id}`}
            emptyMessage="Aucun restaurant pour le moment."
            columns={[
              {
                key: "name",
                label: "Nom",
                sortValue: (restaurant) => restaurant.name,
                render: (restaurant) => <span className="font-semibold">{restaurant.name}</span>,
              },
              {
                key: "address",
                label: "Adresse",
                sortValue: (restaurant) => restaurant.address,
                render: (restaurant) => restaurant.address,
              },
              {
                key: "status",
                label: "Statut",
                sortValue: (restaurant) => restaurant.status,
                render: (restaurant) => <RequestStatusBadge status={restaurant.status} />,
              },
              {
                key: "completion",
                label: "Complétion",
                sortValue: (restaurant) => restaurant.completion.percentage,
                render: (restaurant) => `${restaurant.completion.percentage}%`,
              },
            ]}
          />
        )}

        {isApproved ? (
          <Link
            href="/dashboard/restaurants/nouveau"
            className="cut-corners-sm flex items-center justify-center gap-2 border border-dashed border-ink/30 p-5 text-sm font-semibold text-ink/60 hover:border-primary hover:text-ink"
          >
            + Ajouter un restaurant
          </Link>
        ) : (
          <div className="cut-corners-sm border border-dashed border-ink/15 p-5 text-center text-sm text-ink/40">
            <p className="font-semibold">+ Ajouter un restaurant</p>
            <p className="mt-1 text-xs">
              Vérifie d&apos;abord ton identité (
              <Link href="/dashboard/verification" className="underline hover:text-ink">
                voir
              </Link>
              ) pour débloquer la création.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
