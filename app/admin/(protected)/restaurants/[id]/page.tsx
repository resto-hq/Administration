"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import BackLink from "@/components/dashboard/BackLink";
import StampButton from "@/components/StampButton";
import RequestStatusBadge from "@/components/dashboard/RequestStatusBadge";
import FicheTab from "@/components/dashboard/FicheTab";
import { useRestaurant } from "@/hooks/useRestaurants";
import { useUpdateAdminRestaurantStatus } from "@/hooks/useAdmin";
import { getApiErrorMessage } from "@/lib/api-error";

export default function AdminRestaurantDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: restaurant, isPending, isError } = useRestaurant(params.id);
  const updateRestaurantStatus = useUpdateAdminRestaurantStatus();
  const [showSuspendForm, setShowSuspendForm] = useState(false);
  const [suspendReason, setSuspendReason] = useState("");

  if (isPending) {
    return <p className="text-sm text-ink/60">Chargement…</p>;
  }

  if (isError || !restaurant) {
    return (
      <div>
        <BackLink href="/admin/restaurants" label="Retour aux restaurants" />
        <PageHeader eyebrow="ANNUAIRE" title="Restaurant introuvable" />
      </div>
    );
  }

  return (
    <div>
      <BackLink href="/admin/restaurants" label="Retour aux restaurants" />
      <div className="mb-8 flex flex-wrap items-start justify-between gap-3">
        <PageHeader eyebrow={restaurant.address.toUpperCase()} title={restaurant.name} />
        <div className="flex items-center gap-3">
          <RequestStatusBadge status={restaurant.status} />
          {updateRestaurantStatus.isError && (
            <p className="text-sm font-semibold text-danger-ui">
              {getApiErrorMessage(updateRestaurantStatus.error, "Suspension impossible.")}
            </p>
          )}
          {showSuspendForm ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={suspendReason}
                onChange={(event) => setSuspendReason(event.target.value)}
                placeholder="Motif de la suspension"
                className="rounded-lg border border-border bg-app-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary"
              />
              <StampButton
                type="button"
                className="!bg-danger-ui hover:!bg-danger-ui/90"
                disabled={!suspendReason.trim() || updateRestaurantStatus.isPending}
                onClick={() =>
                  updateRestaurantStatus.mutate(
                    { restaurantId: restaurant.id, body: { is_active: false, reason: suspendReason.trim() } },
                    { onSuccess: () => router.push("/admin/restaurants") }
                  )
                }
              >
                Confirmer
              </StampButton>
              <StampButton type="button" variant="ink" onClick={() => setShowSuspendForm(false)}>
                Annuler
              </StampButton>
            </div>
          ) : (
            <StampButton
              type="button"
              variant="ink"
              onClick={() => setShowSuspendForm(true)}
            >
              Suspendre
            </StampButton>
          )}
        </div>
      </div>

      <FicheTab restaurant={restaurant} />
    </div>
  );
}
