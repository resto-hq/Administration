"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import StampButton from "@/components/StampButton";
import { useAuditLogs } from "@/hooks/useAdmin";
import type { AuditLogRead } from "@/services/admin";

const TARGET_TYPES = [
  { key: "", label: "Tout" },
  { key: "kyc", label: "KYC" },
  { key: "user", label: "Utilisateurs" },
  { key: "restaurant", label: "Restaurants" },
  { key: "restaurant_request", label: "Référencements" },
  { key: "event", label: "Événements" },
  { key: "review", label: "Avis" },
] as const;

function diffFields(before: Record<string, unknown>, after: Record<string, unknown>) {
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  return [...keys]
    .filter((key) => JSON.stringify(before[key]) !== JSON.stringify(after[key]))
    .map((key) => ({ key, before: before[key], after: after[key] }));
}

function formatValue(value: unknown) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "oui" : "non";
  return String(value);
}

function AuditDetailPanel({ log, onClose }: { log: AuditLogRead; onClose: () => void }) {
  const changes = diffFields(log.before, log.after);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6">
      <div className="w-full max-w-lg rounded-xl border border-border bg-panel p-6 sm:p-8">
        <p className="text-xs font-semibold tracking-wide text-ink/45 uppercase">{log.action}</p>
        <h2 className="mt-1 text-lg font-bold text-ink">
          {log.target_type} · {log.target_id}
        </h2>
        <p className="mt-1 text-xs text-ink/45">
          {new Date(log.created_at).toLocaleString("fr-FR")} — acteur {log.actor_id}
        </p>

        <div className="mt-5 space-y-3">
          {changes.length > 0 ? (
            changes.map((change) => (
              <div key={change.key} className="rounded-lg border border-border-soft p-3 text-sm">
                <p className="text-xs font-semibold tracking-wide text-ink/50">{change.key}</p>
                <p className="mt-1 text-ink/70 line-through">{formatValue(change.before)}</p>
                <p className="text-ink">{formatValue(change.after)}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-ink/50">Aucun changement de champ enregistré.</p>
          )}

          {Object.keys(log.metadata).length > 0 && (
            <div className="rounded-lg bg-app-bg p-3 text-sm">
              <p className="mb-1 text-xs font-semibold tracking-wide text-ink/50">Contexte</p>
              {Object.entries(log.metadata).map(([key, value]) => (
                <p key={key} className="text-ink/70">
                  {key} : {formatValue(value)}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6">
          <StampButton type="button" variant="ink" className="w-full" onClick={onClose}>
            Fermer
          </StampButton>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function AdminAuditPage() {
  const [targetType, setTargetType] = useState<string>("");
  const [selectedLog, setSelectedLog] = useState<AuditLogRead | null>(null);
  const { data: logs, isPending, isError } = useAuditLogs({
    target_type: targetType || undefined,
    per_page: 50,
  });

  return (
    <div>
      <PageHeader
        eyebrow="ADMIN RESTO"
        title="Journal d'audit"
        subtitle="Chaque action de modération est tracée : qui, quoi, quand, avant et après."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {TARGET_TYPES.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTargetType(key)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              targetType === key ? "bg-primary text-white" : "border border-border bg-panel text-ink/60 hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {isError && (
        <p className="text-sm font-semibold text-danger-ui">
          Impossible de charger le journal d&apos;audit.
        </p>
      )}

      {isPending ? (
        <p className="text-sm text-ink/60">Chargement…</p>
      ) : (
        <DataTable<AuditLogRead>
          rows={logs ?? []}
          getRowKey={(log) => log.id}
          getRowHref={() => "#"}
          emptyMessage="Aucune action tracée pour le moment."
          columns={[
            { key: "action", label: "Action", render: (log) => <span className="font-semibold">{log.action}</span> },
            {
              key: "target",
              label: "Cible",
              render: (log) => `${log.target_type} · ${log.target_id}`,
            },
            { key: "actor", label: "Acteur", render: (log) => log.actor_id },
            {
              key: "created_at",
              label: "Date",
              sortValue: (log) => log.created_at,
              render: (log) => new Date(log.created_at).toLocaleString("fr-FR"),
            },
          ]}
          actions={(log) => (
            <StampButton
              type="button"
              variant="ink"
              className="!px-3 !py-1.5 text-xs"
              onClick={() => setSelectedLog(log)}
            >
              Détails
            </StampButton>
          )}
        />
      )}

      {selectedLog && (
        <AuditDetailPanel log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}
    </div>
  );
}
