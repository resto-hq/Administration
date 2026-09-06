"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import { useMyReviews } from "@/hooks/useReviews";

export default function AvisPage() {
  const { data: reviews, isPending, isError } = useMyReviews();

  return (
    <div>
      <PageHeader
        eyebrow="RÉPUTATION"
        title="Avis"
        subtitle="Les retours des gourmets qui sont passés dans tes restaurants."
      />

      {isError && (
        <p className="mb-4 text-sm font-semibold text-primary-dark">
          Impossible de charger les avis.
        </p>
      )}

      {isPending ? (
        <p className="text-sm text-ink/60">Chargement…</p>
      ) : (
        <DataTable
          rows={reviews}
          getRowKey={(avis) => avis.id}
          getRowHref={(avis) => `/dashboard/avis/${avis.id}`}
          emptyMessage="Aucun avis pour le moment."
          columns={[
            {
              key: "restaurant_name",
              label: "Restaurant",
              sortValue: (avis) => avis.restaurant_name,
              render: (avis) => <span className="font-semibold">{avis.restaurant_name}</span>,
            },
            {
              key: "rating",
              label: "Note",
              sortValue: (avis) => avis.rating,
              render: (avis) => (
                <span className="text-primary-dark">
                  {"★".repeat(Math.round(avis.rating))}
                  {"☆".repeat(5 - Math.round(avis.rating))}
                </span>
              ),
            },
            {
              key: "text",
              label: "Avis",
              render: (avis) => (
                <span className="text-ink/70">
                  {avis.text.length > 60 ? `${avis.text.slice(0, 60)}…` : avis.text}
                </span>
              ),
            },
            {
              key: "restaurant_response",
              label: "Réponse",
              render: (avis) => (avis.restaurant_response ? "Oui" : "—"),
            },
          ]}
        />
      )}
    </div>
  );
}
