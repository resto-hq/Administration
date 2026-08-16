"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import { MEMBRES } from "@/lib/mockData";

export default function AdminMembresPage() {
  const [tab, setTab] = useState<"restaurateurs" | "gourmets">("restaurateurs");

  return (
    <div>
      <PageHeader
        eyebrow="COMMUNAUTÉ"
        title="Membres"
        subtitle="Les restaurateurs et les gourmets inscrits sur Resto."
      />

      <div className="mb-6 flex gap-2">
        {(["restaurateurs", "gourmets"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`cut-corners-sm px-4 py-2 text-sm font-semibold capitalize transition-colors ${
              tab === key ? "bg-primary text-paper" : "bg-paper-alt text-ink/60 hover:text-ink"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {tab === "restaurateurs" ? (
        <DataTable
          rows={MEMBRES.restaurateurs}
          getRowKey={(m) => m.id}
          getRowHref={(m) => `/admin/membres/${m.id}`}
          emptyMessage="Aucun restaurateur pour le moment."
          columns={[
            {
              key: "nom",
              label: "Nom",
              sortValue: (m) => m.nom,
              render: (m) => <span className="font-semibold">{m.nom}</span>,
            },
            { key: "email", label: "Email", render: (m) => m.email },
            { key: "resto", label: "Restaurant", render: (m) => m.resto },
          ]}
        />
      ) : (
        <DataTable
          rows={MEMBRES.gourmets}
          getRowKey={(m) => m.id}
          getRowHref={(m) => `/admin/membres/${m.id}`}
          emptyMessage="Aucun gourmet pour le moment."
          columns={[
            {
              key: "nom",
              label: "Nom",
              sortValue: (m) => m.nom,
              render: (m) => <span className="font-semibold">{m.nom}</span>,
            },
            { key: "email", label: "Email", render: (m) => m.email },
            { key: "ville", label: "Ville", sortValue: (m) => m.ville ?? "", render: (m) => m.ville },
          ]}
        />
      )}
    </div>
  );
}
