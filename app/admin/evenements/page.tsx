"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import StampButton from "@/components/StampButton";
import { EVENEMENTS_PLATEFORME } from "@/lib/mockData";

export default function AdminEvenementsPage() {
  const [evenements, setEvenements] = useState(EVENEMENTS_PLATEFORME);

  return (
    <div>
      <PageHeader
        eyebrow="MODÉRATION"
        title="Événements"
        subtitle="Tous les événements publiés par les restaurateurs sur la plateforme."
      />

      <div className="max-w-2xl space-y-3">
        {evenements.length === 0 && (
          <p className="text-sm text-ink/60">Aucun événement publié pour le moment.</p>
        )}

        {evenements.map((e) => (
          <div
            key={e.titre}
            className="cut-corners-sm flex items-center justify-between gap-4 bg-paper p-5 shadow-[4px_4px_0_var(--color-ink)]"
          >
            <div>
              <p className="font-semibold text-ink">{e.titre}</p>
              <p className="text-sm text-ink/70">{e.resto} · {e.date}</p>
            </div>
            <StampButton
              type="button"
              variant="ink"
              className="shrink-0 !px-4 !py-2 text-xs"
              onClick={() => setEvenements((current) => current.filter((item) => item.titre !== e.titre))}
            >
              Retirer
            </StampButton>
          </div>
        ))}
      </div>
    </div>
  );
}
