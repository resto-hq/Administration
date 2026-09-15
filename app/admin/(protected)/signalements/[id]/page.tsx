"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import BackLink from "@/components/dashboard/BackLink";
import StampButton from "@/components/StampButton";
import RequestStatusBadge from "@/components/dashboard/RequestStatusBadge";
import { useReport, useResolveReport, useDismissReport, useModerateReport } from "@/hooks/useReports";
import { getApiErrorMessage } from "@/lib/api-error";

const CONTENT_TYPE_LABELS: Record<string, string> = {
  review: "Avis",
  event: "Événement",
  photo: "Photo",
  review_reply: "Réponse à un avis",
};

export default function AdminSignalementDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: report, isPending, isError } = useReport(params.id);
  const resolveReport = useResolveReport();
  const dismissReport = useDismissReport();
  const moderateReport = useModerateReport();
  const [note, setNote] = useState("");

  if (isPending) {
    return <p className="text-sm text-ink/60">Chargement…</p>;
  }

  if (isError || !report) {
    return (
      <div>
        <BackLink href="/admin/signalements" label="Retour aux signalements" />
        <PageHeader eyebrow="MODÉRATION" title="Signalement introuvable" />
      </div>
    );
  }

  const isPendingDecision = report.status === "pending";
  const isHidden = report.moderation_action === "hide";
  const isDeleted = report.moderation_action === "delete";
  const anyMutationPending =
    resolveReport.isPending || dismissReport.isPending || moderateReport.isPending;

  return (
    <div>
      <BackLink href="/admin/signalements" label="Retour aux signalements" />
      <div className="mb-8 flex flex-wrap items-start justify-between gap-3">
        <PageHeader
          eyebrow={CONTENT_TYPE_LABELS[report.content_type] ?? report.content_type}
          title={report.reason}
        />
        <RequestStatusBadge status={report.status} />
      </div>

      <div className="max-w-xl space-y-4 rounded-xl border border-border bg-panel p-6">
        <div>
          <p className="text-xs font-semibold tracking-wide text-ink/50">Signalé le</p>
          <p className="text-ink/80">{new Date(report.created_at).toLocaleString("fr-FR")}</p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-ink/50">Signalé par</p>
          <p className="text-ink/80">{report.reporter_id}</p>
        </div>
        {report.details && (
          <div>
            <p className="text-xs font-semibold tracking-wide text-ink/50">Détails</p>
            <p className="text-ink/80">{report.details}</p>
          </div>
        )}
        <div>
          <p className="text-xs font-semibold tracking-wide text-ink/50">Contenu visé</p>
          {report.content_type === "event" ? (
            <Link
              href={`/admin/evenements/${report.content_id}`}
              className="text-primary-dark hover:underline"
            >
              Voir la fiche événement →
            </Link>
          ) : (
            <p className="font-mono text-xs text-ink/70">{report.content_id}</p>
          )}
          {report.photo_key && (
            <p className="mt-1 font-mono text-xs text-ink/50">{report.photo_key}</p>
          )}
        </div>

        {isHidden && (
          <p className="rounded-lg bg-mustard/20 p-4 text-sm text-[#8A6A00]">
            Ce contenu est actuellement masqué.
          </p>
        )}
        {isDeleted && (
          <p className="rounded-lg bg-danger-ui-soft p-4 text-sm text-danger-ui">
            Ce contenu a été supprimé.
          </p>
        )}

        {!isPendingDecision && (
          <div className="rounded-lg bg-app-bg p-4 text-sm">
            <p className="text-xs font-semibold tracking-wide text-ink/50">Décision</p>
            <p className="mt-1 text-ink/80">
              {report.status === "resolved" ? "Résolu" : "Rejeté"}
              {report.decided_at && ` le ${new Date(report.decided_at).toLocaleDateString("fr-FR")}`}
            </p>
            {report.decision_note && <p className="mt-1 text-ink/70">{report.decision_note}</p>}
          </div>
        )}

        {(resolveReport.isError || dismissReport.isError || moderateReport.isError) && (
          <p className="text-sm font-semibold text-danger-ui">
            {getApiErrorMessage(
              resolveReport.error ?? dismissReport.error ?? moderateReport.error,
              "Action impossible."
            )}
          </p>
        )}

        <div className="space-y-3 border-t border-ink/10 pt-4">
          <label htmlFor="note" className="block text-sm font-semibold text-ink">
            Note (optionnelle)
          </label>
          <input
            id="note"
            type="text"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Contexte de la décision"
            className="w-full rounded-lg border border-border bg-app-bg px-4 py-3 text-ink outline-none placeholder:text-ink/35 focus:border-primary focus:ring-2 focus:ring-primary/30"
          />

          <div className="flex flex-wrap gap-3">
            {isPendingDecision && (
              <>
                <StampButton
                  type="button"
                  disabled={anyMutationPending}
                  onClick={() =>
                    resolveReport.mutate({
                      reportId: report.id,
                      body: { decision_note: note.trim() || undefined },
                    })
                  }
                >
                  Résoudre
                </StampButton>
                <StampButton
                  type="button"
                  variant="ink"
                  disabled={anyMutationPending}
                  onClick={() =>
                    dismissReport.mutate({
                      reportId: report.id,
                      body: { decision_note: note.trim() || undefined },
                    })
                  }
                >
                  Rejeter le signalement
                </StampButton>
              </>
            )}

            {!isDeleted && !isHidden && (
              <StampButton
                type="button"
                className="!bg-mustard !text-ink hover:!bg-mustard/80"
                disabled={anyMutationPending}
                onClick={() =>
                  moderateReport.mutate({
                    reportId: report.id,
                    body: { action: "hide", moderation_note: note.trim() || undefined },
                  })
                }
              >
                Masquer le contenu
              </StampButton>
            )}
            {isHidden && (
              <StampButton
                type="button"
                disabled={anyMutationPending}
                onClick={() =>
                  moderateReport.mutate({
                    reportId: report.id,
                    body: { action: "unhide", moderation_note: note.trim() || undefined },
                  })
                }
              >
                Rétablir le contenu
              </StampButton>
            )}
            {!isDeleted && (
              <StampButton
                type="button"
                className="!bg-danger-ui hover:!bg-danger-ui/90"
                disabled={anyMutationPending}
                onClick={() =>
                  moderateReport.mutate({
                    reportId: report.id,
                    body: { action: "delete", moderation_note: note.trim() || undefined },
                  })
                }
              >
                Supprimer le contenu
              </StampButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
