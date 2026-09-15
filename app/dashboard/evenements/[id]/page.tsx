"use client";

import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import BackLink from "@/components/dashboard/BackLink";
import StampButton from "@/components/StampButton";
import RequestStatusBadge from "@/components/dashboard/RequestStatusBadge";
import { useEvent, useDeleteEvent } from "@/hooks/useEvents";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { getApiErrorMessage } from "@/lib/api-error";

export default function EvenementDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: evenement, isPending, isError } = useEvent(params.id);
  const deleteEvent = useDeleteEvent();
  const { confirm, dialog } = useConfirmDialog();

  if (isPending) {
    return <p className="text-sm text-ink/60">Chargement…</p>;
  }

  if (isError || !evenement) {
    return (
      <div>
        <BackLink href="/dashboard/evenements" label="Retour aux événements" />
        <PageHeader eyebrow="ÉVÉNEMENT" title="Événement introuvable" />
      </div>
    );
  }

  return (
    <div>
      <BackLink href="/dashboard/evenements" label="Retour aux événements" />
      <div className="mb-8 flex flex-wrap items-start justify-between gap-3">
        <PageHeader
          eyebrow="ÉVÉNEMENT"
          title={evenement.title}
          subtitle={new Date(evenement.start_date).toLocaleString("fr-FR")}
        />
        <RequestStatusBadge status={evenement.status} />
      </div>

      <div className="max-w-xl rounded-xl border border-border bg-panel p-6">
        <p className="text-ink/80">{evenement.description}</p>
        {evenement.ticket_link && (
          <a
            href={evenement.ticket_link}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-sm font-semibold text-primary-dark hover:underline"
          >
            Lien billetterie →
          </a>
        )}
      </div>

      {deleteEvent.isError && (
        <p className="mt-4 text-sm font-semibold text-primary-dark">
          {getApiErrorMessage(deleteEvent.error, "Impossible de supprimer l'événement.")}
        </p>
      )}

      <StampButton
        type="button"
        variant="ink"
        className="mt-6"
        disabled={deleteEvent.isPending}
        onClick={() =>
          confirm({
            title: "Supprimer cet événement ?",
            message: "Cette action est irréversible.",
            confirmLabel: "Supprimer",
            danger: true,
            onConfirm: () => {
              deleteEvent.mutate(evenement.id, {
                onSuccess: () => router.push("/dashboard/evenements"),
              });
            },
          })
        }
      >
        {deleteEvent.isPending ? "Suppression…" : "Supprimer cet événement"}
      </StampButton>
      {dialog}
    </div>
  );
}
