"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import StampButton from "@/components/StampButton";
import DataTable from "@/components/dashboard/DataTable";
import { useEventsAdmin } from "@/lib/events-admin-store";

export default function AdminEvenementsPage() {
  const { evenements, remove } = useEventsAdmin();

  return (
    <div>
      <PageHeader
        eyebrow="MODÉRATION"
        title="Événements"
        subtitle="Tous les événements publiés par les restaurateurs sur la plateforme."
      />

      <DataTable
        rows={evenements}
        getRowKey={(e) => e.id}
        getRowHref={(e) => `/admin/evenements/${e.id}`}
        emptyMessage="Aucun événement publié pour le moment."
        columns={[
          {
            key: "titre",
            label: "Titre",
            render: (e) => <span className="font-semibold">{e.titre}</span>,
          },
          {
            key: "resto",
            label: "Restaurant",
            sortValue: (e) => e.resto,
            render: (e) => e.resto,
          },
          {
            key: "date",
            label: "Date",
            sortValue: (e) => e.date,
            render: (e) => e.date,
          },
        ]}
        actions={(e) => (
          <StampButton
            type="button"
            variant="ink"
            className="!px-4 !py-2 text-xs"
            onClick={() => remove(e.id)}
          >
            Retirer
          </StampButton>
        )}
      />
    </div>
  );
}
