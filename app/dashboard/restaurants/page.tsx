"use client";

import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import { useRestaurants } from "@/lib/restaurants-store";

export default function MesRestaurantsPage() {
  const { restaurants } = useRestaurants();

  return (
    <div>
      <PageHeader
        eyebrow="TES ÉTABLISSEMENTS"
        title="Mes restaurants"
        subtitle="Gère la fiche et le dossier KYB de chacun de tes restaurants."
      />

      <div className="space-y-4">
        <DataTable
          rows={restaurants}
          getRowKey={(resto) => resto.id}
          getRowHref={(resto) => `/dashboard/restaurants/${resto.id}`}
          emptyMessage="Aucun restaurant pour le moment."
          columns={[
            {
              key: "nom",
              label: "Nom",
              sortValue: (resto) => resto.nom,
              render: (resto) => <span className="font-semibold">{resto.nom}</span>,
            },
            {
              key: "quartier",
              label: "Quartier",
              sortValue: (resto) => resto.quartier,
              render: (resto) => resto.quartier,
            },
            {
              key: "statut",
              label: "Statut",
              sortValue: (resto) => resto.statut,
              render: (resto) => <StatusBadge status={resto.statut} />,
            },
          ]}
        />

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
