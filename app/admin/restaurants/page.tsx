"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import { RESTAURANTS } from "@/lib/mockData";

export default function AdminRestaurantsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="ANNUAIRE"
        title="Restaurants"
        subtitle="Tous les établissements inscrits sur Resto, quel que soit leur statut."
      />

      <DataTable
        rows={RESTAURANTS}
        getRowKey={(resto) => resto.id}
        getRowHref={(resto) => `/admin/restaurants/${resto.id}`}
        emptyMessage="Aucun restaurant inscrit pour le moment."
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
    </div>
  );
}
