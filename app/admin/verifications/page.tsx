"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import StampButton from "@/components/StampButton";
import DataTable from "@/components/dashboard/DataTable";
import { useKyb } from "@/lib/kyb-store";

export default function VerificationsPage() {
  const { dossiers, decided, decide } = useKyb();

  return (
    <div>
      <PageHeader
        eyebrow="MODÉRATION"
        title="Vérifications KYB"
        subtitle="Examine les dossiers envoyés par les restaurateurs et valide leur établissement."
      />

      <DataTable
        rows={dossiers}
        getRowKey={(d) => d.id}
        getRowHref={(d) => `/admin/verifications/${d.id}`}
        emptyMessage="Aucun dossier en attente pour le moment."
        columns={[
          {
            key: "nom",
            label: "Dossier",
            sortValue: (d) => d.nom,
            render: (d) => <span className="font-semibold">{d.nom}</span>,
          },
          {
            key: "quartier",
            label: "Quartier",
            sortValue: (d) => d.quartier,
            render: (d) => d.quartier,
          },
          { key: "rccm", label: "RCCM", render: (d) => d.rccm },
          {
            key: "soumis",
            label: "Envoyé le",
            sortValue: (d) => d.soumis,
            render: (d) => d.soumis,
          },
        ]}
        actions={(d) => (
          <div className="flex justify-end gap-2">
            <StampButton
              type="button"
              className="!px-3 !py-1.5 text-xs"
              onClick={() => decide(d.id, "approuvé")}
            >
              ✓
            </StampButton>
            <StampButton
              type="button"
              variant="ink"
              className="!px-3 !py-1.5 text-xs"
              onClick={() => decide(d.id, "rejeté")}
            >
              ✗
            </StampButton>
          </div>
        )}
      />

      {decided.length > 0 && (
        <div className="mt-8">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-ink/50">TRAITÉS</p>
          <div className="space-y-2">
            {decided.map((d) => (
              <div key={d.id} className="flex items-center justify-between text-sm text-ink/70">
                <span>{d.nom}</span>
                <span
                  className={
                    d.decision === "approuvé"
                      ? "font-semibold text-ink"
                      : "font-semibold text-primary-dark"
                  }
                >
                  {d.decision}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
