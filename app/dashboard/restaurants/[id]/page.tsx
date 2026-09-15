"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import RequestStatusBadge from "@/components/dashboard/RequestStatusBadge";
import { useRestaurant } from "@/hooks/useRestaurants";
import FicheTab from "@/components/dashboard/FicheTab";
import VerificationTab from "@/components/dashboard/VerificationTab";

const TABS = ["fiche", "verification"] as const;
type Tab = (typeof TABS)[number];

const TAB_LABELS: Record<Tab, string> = {
  fiche: "Fiche",
  verification: "Vérification",
};

export default function RestaurantDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: restaurant, isPending, isError } = useRestaurant(params.id);
  const [tab, setTab] = useState<Tab>("fiche");

  if (isPending) {
    return <p className="text-sm text-ink/60">Chargement…</p>;
  }

  if (isError || !restaurant) {
    return (
      <div>
        <PageHeader eyebrow="MES RESTAURANTS" title="Restaurant introuvable" />
        <p className="text-sm text-ink/70">
          Ce restaurant n&apos;existe pas ou ne t&apos;appartient pas.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-3">
        <PageHeader
          eyebrow={restaurant.address.toUpperCase()}
          title={restaurant.name}
          subtitle="Gère la fiche publique et le dossier de vérification de ce restaurant."
        />
        <RequestStatusBadge status={restaurant.status} />
      </div>

      <div className="mb-6 flex gap-2">
        {TABS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              tab === key ? "bg-primary text-white" : "border border-border bg-panel text-ink/60 hover:text-ink"
            }`}
          >
            {TAB_LABELS[key]}
          </button>
        ))}
      </div>

      {tab === "fiche" ? (
        <FicheTab restaurant={restaurant} />
      ) : (
        <VerificationTab restaurant={restaurant} />
      )}
    </div>
  );
}
