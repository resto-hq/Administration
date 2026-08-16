"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import { AVIS } from "@/lib/mockData";

export default function AvisPage() {
  return (
    <div>
      <PageHeader
        eyebrow="RÉPUTATION"
        title="Avis"
        subtitle="Les retours des gourmets qui sont passés dans tes restaurants."
      />

      <DataTable
        rows={AVIS}
        getRowKey={(avis) => avis.id}
        getRowHref={(avis) => `/dashboard/avis/${avis.id}`}
        emptyMessage="Aucun avis pour le moment."
        columns={[
          {
            key: "auteur",
            label: "Auteur",
            render: (avis) => <span className="font-semibold">{avis.auteur}</span>,
          },
          {
            key: "note",
            label: "Note",
            sortValue: (avis) => avis.note,
            render: (avis) => (
              <span className="text-primary-dark">
                {"★".repeat(avis.note)}
                {"☆".repeat(5 - avis.note)}
              </span>
            ),
          },
          {
            key: "texte",
            label: "Avis",
            render: (avis) => (
              <span className="text-ink/70">
                {avis.texte.length > 60 ? `${avis.texte.slice(0, 60)}…` : avis.texte}
              </span>
            ),
          },
          {
            key: "resto",
            label: "Restaurant",
            sortValue: (avis) => avis.restoNom,
            render: (avis) => avis.restoNom,
          },
        ]}
      />
    </div>
  );
}
