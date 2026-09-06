"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import StampButton from "@/components/StampButton";
import DataTable from "@/components/dashboard/DataTable";
import { usePendingEvents, useApproveEvent, useRejectEvent } from "@/hooks/useAdmin";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { getApiErrorMessage } from "@/lib/api-error";

export default function AdminEvenementsPage() {
  const { data: events, isPending, isError } = usePendingEvents();
  const approveEvent = useApproveEvent();
  const rejectEvent = useRejectEvent();
  const { confirm, dialog } = useConfirmDialog();

  return (
    <div>
      <PageHeader
        eyebrow="MODÉRATION"
        title="Événements"
        subtitle="Événements en attente de publication sur la plateforme."
      />

      {isError && (
        <p className="text-sm font-semibold text-primary-dark">
          Impossible de charger la file d&apos;événements.
        </p>
      )}

      {isPending ? (
        <p className="text-sm text-ink/60">Chargement…</p>
      ) : (
        <DataTable
          rows={events ?? []}
          getRowKey={(event) => event.id}
          getRowHref={(event) => `/admin/evenements/${event.id}`}
          emptyMessage="Aucun événement en attente pour le moment."
          columns={[
            {
              key: "title",
              label: "Titre",
              render: (event) => <span className="font-semibold">{event.title}</span>,
            },
            {
              key: "restaurant",
              label: "Restaurant",
              render: (event) => event.restaurant?.name ?? event.creator?.username ?? "—",
            },
            {
              key: "start_date",
              label: "Date",
              sortValue: (event) => event.start_date,
              render: (event) => new Date(event.start_date).toLocaleDateString("fr-FR"),
            },
          ]}
          actions={(event) => (
            <div className="flex justify-end gap-2">
              <StampButton
                type="button"
                className="!px-3 !py-1.5 text-xs"
                disabled={approveEvent.isPending}
                onClick={() => approveEvent.mutate(event.id)}
              >
                ✓ Approuver
              </StampButton>
              <StampButton
                type="button"
                variant="ink"
                className="!px-3 !py-1.5 text-xs"
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
                ✗ Rejeter
              </StampButton>
            </div>
          )}
        />
      )}

      {(approveEvent.isError || rejectEvent.isError) && (
        <p className="mt-4 text-sm font-semibold text-primary-dark">
          {getApiErrorMessage(approveEvent.error ?? rejectEvent.error, "Action impossible.")}
        </p>
      )}
      {dialog}
    </div>
  );
}
