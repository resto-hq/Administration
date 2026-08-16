"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import StampButton from "@/components/StampButton";
import DataTable from "@/components/dashboard/DataTable";
import { EVENEMENTS } from "@/lib/mockData";

export default function EvenementsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="ANIMATION"
        title="Événements"
        subtitle="Annonce tes soirées et dégustations auprès des gourmets déjà là pour manger."
      />

      <div className="space-y-4">
        <DataTable
          rows={EVENEMENTS}
          getRowKey={(e) => e.id}
          getRowHref={(e) => `/dashboard/evenements/${e.id}`}
          emptyMessage="Aucun événement publié pour le moment."
          columns={[
            {
              key: "titre",
              label: "Titre",
              render: (e) => <span className="font-semibold">{e.titre}</span>,
            },
            {
              key: "date",
              label: "Date",
              sortValue: (e) => e.date,
              render: (e) => e.date,
            },
          ]}
        />

        <StampButton type="button">+ Publier un événement</StampButton>
      </div>
    </div>
  );
}
