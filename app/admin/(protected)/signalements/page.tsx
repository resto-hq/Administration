"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import RequestStatusBadge from "@/components/dashboard/RequestStatusBadge";
import { useReports } from "@/hooks/useReports";
import type { ReportRead, ReportStatus } from "@/services/reports";

const STATUS_TABS = [
  { key: "pending", label: "En attente" },
  { key: "resolved", label: "Résolus" },
  { key: "dismissed", label: "Rejetés" },
] as const;

const CONTENT_TYPE_LABELS: Record<string, string> = {
  review: "Avis",
  event: "Événement",
  photo: "Photo",
  review_reply: "Réponse à un avis",
};

export default function AdminSignalementsPage() {
  const [status, setStatus] = useState<ReportStatus>("pending");
  const { data: reports, isPending, isError } = useReports({ status, per_page: 50 });

  return (
    <div>
      <PageHeader
        eyebrow="MODÉRATION"
        title="Signalements"
        subtitle="Avis, réponses, photos et événements signalés par la communauté."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {STATUS_TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setStatus(key)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              status === key ? "bg-primary text-white" : "border border-border bg-panel text-ink/60 hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {isError && (
        <p className="text-sm font-semibold text-danger-ui">
          Impossible de charger les signalements.
        </p>
      )}

      {isPending ? (
        <p className="text-sm text-ink/60">Chargement…</p>
      ) : (
        <DataTable<ReportRead>
          rows={reports ?? []}
          getRowKey={(report) => report.id}
          getRowHref={(report) => `/admin/signalements/${report.id}`}
          emptyMessage="Aucun signalement dans cette file."
          columns={[
            {
              key: "content_type",
              label: "Contenu",
              render: (report) => (
                <span className="font-semibold">
                  {CONTENT_TYPE_LABELS[report.content_type] ?? report.content_type}
                </span>
              ),
            },
            { key: "reason", label: "Motif", render: (report) => report.reason },
            {
              key: "created_at",
              label: "Signalé le",
              sortValue: (report) => report.created_at,
              render: (report) => new Date(report.created_at).toLocaleDateString("fr-FR"),
            },
            {
              key: "status",
              label: "Statut",
              render: (report) => <RequestStatusBadge status={report.status} />,
            },
          ]}
        />
      )}
    </div>
  );
}
