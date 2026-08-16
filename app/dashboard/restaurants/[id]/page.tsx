"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import { useRestaurants } from "@/lib/restaurants-store";
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
  const { getRestaurant } = useRestaurants();
  const [tab, setTab] = useState<Tab>("fiche");

  const restaurant = getRestaurant(params.id);

  if (!restaurant) {
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
      <PageHeader
        eyebrow={restaurant.quartier.toUpperCase()}
        title={restaurant.nom}
        subtitle="Gère la fiche publique et le dossier KYB de ce restaurant."
      />

      <div className="mb-6 flex gap-2">
        {TABS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`cut-corners-sm px-4 py-2 text-sm font-semibold transition-colors ${
              tab === key ? "bg-primary text-paper" : "bg-paper-alt text-ink/60 hover:text-ink"
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
