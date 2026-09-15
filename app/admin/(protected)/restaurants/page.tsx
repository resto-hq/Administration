"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import StampButton from "@/components/StampButton";
import DataTable from "@/components/dashboard/DataTable";
import RequestStatusBadge from "@/components/dashboard/RequestStatusBadge";
import {
  useAdminRestaurants,
  useUpdateAdminRestaurantStatus,
  useAdminRestaurantRequests,
  useApproveRestaurantRequest,
  useRejectRestaurantRequest,
} from "@/hooks/useAdmin";
import { getApiErrorMessage } from "@/lib/api-error";
import type { AdminRestaurantRead } from "@/services/admin";

const STATUS_TABS = [
  { key: "published", label: "Publiés" },
  { key: "pending", label: "En attente" },
  { key: "draft", label: "Brouillons" },
  { key: "rejected", label: "Rejetés" },
] as const;

type StatusTab = (typeof STATUS_TABS)[number]["key"];
type Tab = StatusTab | "requests";

export default function AdminRestaurantsPage() {
  const [tab, setTab] = useState<Tab>("published");
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [suspendingId, setSuspendingId] = useState<string | null>(null);
  const [suspendReason, setSuspendReason] = useState("");

  const restaurantsQuery = useAdminRestaurants({
    status: tab === "requests" ? undefined : tab,
    per_page: 100,
  });
  const requestsQuery = useAdminRestaurantRequests({ status: "pending" });
  const approveRequest = useApproveRestaurantRequest();
  const rejectRequest = useRejectRestaurantRequest();
  const updateRestaurantStatus = useUpdateAdminRestaurantStatus();

  return (
    <div>
      <PageHeader
        eyebrow="ANNUAIRE"
        title="Restaurants"
        subtitle="Tous les établissements, quel que soit leur statut, et les suggestions de la communauté en attente."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {STATUS_TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              tab === key ? "bg-primary text-white" : "border border-border bg-panel text-ink/60 hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setTab("requests")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            tab === "requests" ? "bg-primary text-white" : "border border-border bg-panel text-ink/60 hover:text-ink"
          }`}
        >
          Suggestions ({requestsQuery.data?.length ?? 0})
        </button>
      </div>

      {tab !== "requests" ? (
        restaurantsQuery.isError ? (
          <p className="text-sm font-semibold text-danger-ui">
            Impossible de charger les restaurants.
          </p>
        ) : restaurantsQuery.isPending ? (
          <p className="text-sm text-ink/60">Chargement…</p>
        ) : (
          <div className="space-y-4">
            <DataTable<AdminRestaurantRead>
              rows={restaurantsQuery.data ?? []}
              getRowKey={(resto) => resto.id}
              // A suspended fiche 404s on GET /restaurants/{id} even for staff
              // (is_active is checked before the staff bypass) — until that's
              // fixed backend-side, don't link to a detail page that can't load.
              getRowHref={(resto) => (resto.is_active ? `/admin/restaurants/${resto.id}` : "#")}
              emptyMessage="Aucun restaurant dans ce statut."
              columns={[
                {
                  key: "name",
                  label: "Nom",
                  sortValue: (resto) => resto.name,
                  render: (resto) => <span className="font-semibold">{resto.name}</span>,
                },
                {
                  key: "address",
                  label: "Adresse",
                  sortValue: (resto) => resto.address,
                  render: (resto) => resto.address,
                },
                {
                  key: "status",
                  label: "Statut",
                  render: (resto) => <RequestStatusBadge status={resto.status} />,
                },
                {
                  key: "is_active",
                  label: "Compte",
                  render: (resto) => (
                    <RequestStatusBadge status={resto.is_active ? "active" : "suspended"} />
                  ),
                },
              ]}
              actions={(resto) => (
                <div className="flex flex-col items-end gap-2">
                  {resto.is_active ? (
                    suspendingId === resto.id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={suspendReason}
                          onChange={(event) => setSuspendReason(event.target.value)}
                          placeholder="Motif de la suspension"
                          className="rounded-lg border border-border bg-app-bg px-3 py-1.5 text-xs text-ink outline-none focus:border-primary"
                        />
                        <StampButton
                          type="button"
                          className="!bg-danger-ui !px-3 !py-1.5 text-xs hover:!bg-danger-ui/90"
                          disabled={!suspendReason.trim() || updateRestaurantStatus.isPending}
                          onClick={() =>
                            updateRestaurantStatus.mutate(
                              {
                                restaurantId: resto.id,
                                body: { is_active: false, reason: suspendReason.trim() },
                              },
                              {
                                onSuccess: () => {
                                  setSuspendingId(null);
                                  setSuspendReason("");
                                },
                              }
                            )
                          }
                        >
                          Confirmer
                        </StampButton>
                        <StampButton
                          type="button"
                          variant="ink"
                          className="!px-3 !py-1.5 text-xs"
                          onClick={() => setSuspendingId(null)}
                        >
                          Annuler
                        </StampButton>
                      </div>
                    ) : (
                      <StampButton
                        type="button"
                        className="!bg-danger-ui !px-3 !py-1.5 text-xs hover:!bg-danger-ui/90"
                        onClick={() => setSuspendingId(resto.id)}
                      >
                        Suspendre
                      </StampButton>
                    )
                  ) : (
                    <StampButton
                      type="button"
                      className="!px-3 !py-1.5 text-xs"
                      disabled={updateRestaurantStatus.isPending}
                      onClick={() =>
                        updateRestaurantStatus.mutate({
                          restaurantId: resto.id,
                          body: { is_active: true },
                        })
                      }
                    >
                      Réactiver
                    </StampButton>
                  )}
                </div>
              )}
            />
            {updateRestaurantStatus.isError && (
              <p className="text-sm font-semibold text-danger-ui">
                {getApiErrorMessage(updateRestaurantStatus.error, "Action impossible.")}
              </p>
            )}
          </div>
        )
      ) : requestsQuery.isError ? (
        <p className="text-sm font-semibold text-primary-dark">
          Impossible de charger les suggestions.
        </p>
      ) : requestsQuery.isPending ? (
        <p className="text-sm text-ink/60">Chargement…</p>
      ) : (
        <div className="space-y-4">
          <DataTable
            rows={requestsQuery.data ?? []}
            getRowKey={(request) => request.id}
            getRowHref={() => "#"}
            emptyMessage="Aucune suggestion en attente."
            columns={[
              {
                key: "name",
                label: "Nom suggéré",
                render: (request) => <span className="font-semibold">{request.name}</span>,
              },
              { key: "address", label: "Adresse", render: (request) => request.address },
              { key: "note", label: "Note", render: (request) => request.note ?? "—" },
            ]}
            actions={(request) => (
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                  <StampButton
                    type="button"
                    className="!px-3 !py-1.5 text-xs"
                    disabled={approveRequest.isPending}
                    onClick={() => approveRequest.mutate(request.id)}
                  >
                    ✓ Approuver
                  </StampButton>
                  <StampButton
                    type="button"
                    variant="ink"
                    className="!px-3 !py-1.5 text-xs"
                    onClick={() =>
                      setRejectingId(rejectingId === request.id ? null : request.id)
                    }
                  >
                    ✗ Rejeter
                  </StampButton>
                </div>
                {rejectingId === request.id && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      placeholder="Raison du rejet"
                      className="rounded-lg border border-border bg-app-bg px-3 py-1.5 text-xs text-ink outline-none focus:border-primary"
                    />
                    <StampButton
                      type="button"
                      className="!px-3 !py-1.5 text-xs"
                      disabled={!reason.trim() || rejectRequest.isPending}
                      onClick={() => {
                        rejectRequest.mutate(
                          { requestId: request.id, body: { reason } },
                          { onSuccess: () => setRejectingId(null) }
                        );
                      }}
                    >
                      Confirmer
                    </StampButton>
                  </div>
                )}
              </div>
            )}
          />
          {(approveRequest.isError || rejectRequest.isError) && (
            <p className="text-sm font-semibold text-primary-dark">
              {getApiErrorMessage(approveRequest.error ?? rejectRequest.error, "Action impossible.")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
