"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import StampButton from "@/components/StampButton";
import DataTable from "@/components/dashboard/DataTable";
import RequestStatusBadge from "@/components/dashboard/RequestStatusBadge";
import { useRestaurantsList } from "@/hooks/useRestaurants";
import {
  useAdminRestaurantRequests,
  useApproveRestaurantRequest,
  useRejectRestaurantRequest,
} from "@/hooks/useAdmin";
import { getApiErrorMessage } from "@/lib/api-error";

type Tab = "published" | "requests";

export default function AdminRestaurantsPage() {
  const [tab, setTab] = useState<Tab>("published");
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  const restaurantsQuery = useRestaurantsList({ per_page: 100 });
  const requestsQuery = useAdminRestaurantRequests({ status: "pending" });
  const approveRequest = useApproveRestaurantRequest();
  const rejectRequest = useRejectRestaurantRequest();

  return (
    <div>
      <PageHeader
        eyebrow="ANNUAIRE"
        title="Restaurants"
        subtitle="Les établissements publiés, et les suggestions de la communauté en attente."
      />

      <div className="mb-6 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("published")}
          className={`cut-corners-sm px-4 py-2 text-sm font-semibold transition-colors ${
            tab === "published" ? "bg-primary text-paper" : "bg-paper-alt text-ink/60 hover:text-ink"
          }`}
        >
          Publiés
        </button>
        <button
          type="button"
          onClick={() => setTab("requests")}
          className={`cut-corners-sm px-4 py-2 text-sm font-semibold transition-colors ${
            tab === "requests" ? "bg-primary text-paper" : "bg-paper-alt text-ink/60 hover:text-ink"
          }`}
        >
          Suggestions ({requestsQuery.data?.length ?? 0})
        </button>
      </div>

      {tab === "published" ? (
        restaurantsQuery.isError ? (
          <p className="text-sm font-semibold text-primary-dark">
            Impossible de charger les restaurants.
          </p>
        ) : restaurantsQuery.isPending ? (
          <p className="text-sm text-ink/60">Chargement…</p>
        ) : (
          <DataTable
            rows={restaurantsQuery.data ?? []}
            getRowKey={(resto) => resto.id}
            getRowHref={(resto) => `/admin/restaurants/${resto.id}`}
            emptyMessage="Aucun restaurant publié pour le moment."
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
                key: "is_verified",
                label: "Statut",
                render: () => <RequestStatusBadge status="published" />,
              },
            ]}
          />
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
                      className="cut-corners-sm border border-ink/15 bg-paper-alt px-3 py-1.5 text-xs text-ink outline-none focus:border-primary"
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
