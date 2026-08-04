"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import StampButton from "@/components/StampButton";
import { KYB_QUEUE } from "@/lib/mockData";

type Decision = "approuvé" | "rejeté";

export default function VerificationsPage() {
  const [pending, setPending] = useState(KYB_QUEUE);
  const [decided, setDecided] = useState<{ nom: string; decision: Decision }[]>([]);

  function decide(nom: string, decision: Decision) {
    setPending((current) => current.filter((dossier) => dossier.nom !== nom));
    setDecided((current) => [{ nom, decision }, ...current]);
  }

  return (
    <div>
      <PageHeader
        eyebrow="MODÉRATION"
        title="Vérifications KYB"
        subtitle="Examine les dossiers envoyés par les restaurateurs et valide leur établissement."
      />

      <div className="max-w-2xl space-y-4">
        {pending.length === 0 && (
          <p className="text-sm text-ink/60">Aucun dossier en attente pour le moment.</p>
        )}

        {pending.map((dossier) => (
          <div key={dossier.nom} className="cut-corners-sm bg-paper p-5 shadow-[4px_4px_0_var(--color-ink)]">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-stamp text-ink">{dossier.nom}</p>
              <p className="text-xs text-ink/50">Envoyé le {dossier.soumis}</p>
            </div>
            <p className="mt-1 text-sm text-ink/70">
              {dossier.quartier} · RCCM {dossier.rccm}
            </p>
            <div className="mt-4 flex gap-3">
              <StampButton type="button" onClick={() => decide(dossier.nom, "approuvé")}>
                Approuver
              </StampButton>
              <StampButton type="button" variant="ink" onClick={() => decide(dossier.nom, "rejeté")}>
                Rejeter
              </StampButton>
            </div>
          </div>
        ))}

        {decided.length > 0 && (
          <div className="pt-4">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-ink/50">TRAITÉS</p>
            <div className="space-y-2">
              {decided.map((d) => (
                <div key={d.nom} className="flex items-center justify-between text-sm text-ink/70">
                  <span>{d.nom}</span>
                  <span className={d.decision === "approuvé" ? "text-ink font-semibold" : "text-primary-dark font-semibold"}>
                    {d.decision}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
