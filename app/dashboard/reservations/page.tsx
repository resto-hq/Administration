"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import { RESERVATIONS } from "@/lib/mockData";

export default function ReservationsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="TABLES"
        title="Réservations"
        subtitle="Les demandes de réservation reçues via la fiche de tes restaurants."
      />

      <DataTable
        rows={RESERVATIONS}
        getRowKey={(r) => r.id}
        getRowHref={(r) => `/dashboard/reservations/${r.id}`}
        emptyMessage="Aucune réservation pour le moment."
        columns={[
          {
            key: "nom",
            label: "Client",
            render: (r) => <span className="font-semibold">{r.nom}</span>,
          },
          {
            key: "date",
            label: "Date",
            sortValue: (r) => r.date,
            render: (r) => r.date,
          },
          {
            key: "personnes",
            label: "Personnes",
            sortValue: (r) => r.personnes,
            render: (r) => r.personnes,
          },
          {
            key: "resto",
            label: "Restaurant",
            sortValue: (r) => r.restoNom,
            render: (r) => r.restoNom,
          },
          {
            key: "statut",
            label: "Statut",
            sortValue: (r) => r.statut,
            render: (r) => (
              <span
                className={`cut-corners-sm px-3 py-1 text-xs font-semibold ${
                  r.statut === "Confirmée" ? "bg-ink text-paper" : "bg-mustard/40 text-ink"
                }`}
              >
                {r.statut}
              </span>
            ),
          },
        ]}
      />
    </div>
  );
}
