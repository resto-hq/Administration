"use client";

import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import BackLink from "@/components/dashboard/BackLink";
import StampButton from "@/components/StampButton";
import RequestStatusBadge from "@/components/dashboard/RequestStatusBadge";
import { useEvent, useDeleteEvent } from "@/hooks/useEvents";
import { useApproveEvent, useRejectEvent } from "@/hooks/useAdmin";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { getApiErrorMessage } from "@/lib/api-error";

export default function AdminEvenementDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: event, isPending, isError } = useEvent(params.id);
  const approveEvent = useApproveEvent();
  const rejectEvent = useRejectEvent();
  const deleteEvent = useDeleteEvent();
  const { confirm, dialog } = useConfirmDialog();

  if (isPending) {
    return <p className="text-sm text-ink/60">Chargement…</p>;
  }

  if (isError || !event) {
    return (
      <div>
        <BackLink href="/admin/evenements" label="Retour aux événements" />
        <PageHeader eyebrow="MODÉRATION" title="Événement introuvable" />
      </div>
    );
  }

  return (
    <div>
      <BackLink href="/admin/evenements" label="Retour aux événements" />
      <div className="mb-8 flex flex-wrap items-start justify-between gap-3">
        <PageHeader
          eyebrow={event.restaurant?.name ?? event.creator?.username ?? "ÉVÉNEMENT"}
          title={event.title}
          subtitle={new Date(event.start_date).toLocaleString("fr-FR")}
        />
        <RequestStatusBadge status={event.status} />
      </div>

      <div className="cut-corners-sm max-w-xl space-y-4 bg-paper p-6 shadow-[4px_4px_0_var(--color-ink)]">
        <p className="text-ink/80">{event.description}</p>
        {event.ticket_link && (
          <a
            href={event.ticket_link}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-sm font-semibold text-primary-dark hover:underline"
          >
            Lien billetterie →
          </a>
        )}

        {(approveEvent.isError || rejectEvent.isError || deleteEvent.isError) && (
          <p className="text-sm font-semibold text-primary-dark">
            {getApiErrorMessage(
              approveEvent.error ?? rejectEvent.error ?? deleteEvent.error,
              "Action impossible."
            )}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          {event.status === "pending" && (
            <>
              <StampButton
                type="button"
                disabled={approveEvent.isPending}
                onClick={() => approveEvent.mutate(event.id)}
              >
                Approuver
              </StampButton>
              <StampButton
                type="button"
                variant="ink"
                disabled={rejectEvent.isPending}
                onClick={() =>
                  confirm({
                    title: "Rejeter cet événement ?",
                    message: `"${event.title}" ne sera pas publié sur la plateforme.`,
                    confirmLabel: "Rejeter",
                    danger: true,
                    onConfirm: () => rejectEvent.mutate(event.id),
                  })
                }
              >
                Rejeter
              </StampButton>
            </>
          )}
          <StampButton
            type="button"
            variant="ink"
            disabled={deleteEvent.isPending}
            onClick={() =>
              confirm({
                title: "Supprimer cet événement ?",
                message: "Cette action est irréversible.",
                confirmLabel: "Supprimer",
                danger: true,
                onConfirm: () => {
                  deleteEvent.mutate(event.id, {
                    onSuccess: () => router.push("/admin/evenements"),
                  });
                },
              })
            }
          >
            Supprimer
          </StampButton>
        </div>
      </div>
      {dialog}
    </div>
  );
}
