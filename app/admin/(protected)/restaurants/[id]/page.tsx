"use client";

import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import BackLink from "@/components/dashboard/BackLink";
import StampButton from "@/components/StampButton";
import RequestStatusBadge from "@/components/dashboard/RequestStatusBadge";
import FicheTab from "@/components/dashboard/FicheTab";
import { useRestaurant, useDeleteRestaurant } from "@/hooks/useRestaurants";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { getApiErrorMessage } from "@/lib/api-error";

export default function AdminRestaurantDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: restaurant, isPending, isError } = useRestaurant(params.id);
  const deleteRestaurant = useDeleteRestaurant();
  const { confirm, dialog } = useConfirmDialog();

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
          {deleteRestaurant.isError && (
            <p className="text-sm font-semibold text-primary-dark">
              {getApiErrorMessage(deleteRestaurant.error, "Suppression impossible.")}
            </p>
          )}
          <StampButton
            type="button"
            variant="ink"
            disabled={deleteRestaurant.isPending}
            onClick={() =>
              confirm({
                title: "Suspendre ce restaurant ?",
                message:
                  "Il disparaît immédiatement des recherches et de sa fiche publique. Il n'existe pas encore de moyen de le réactiver depuis l'admin.",
                confirmLabel: "Suspendre",
                danger: true,
                onConfirm: () => {
                  deleteRestaurant.mutate(restaurant.id, {
                    onSuccess: () => router.push("/admin/restaurants"),
                  });
                },
              })
            }
          >
            Suspendre
          </StampButton>
        </div>
      </div>

      <FicheTab restaurant={restaurant} />
      {dialog}
    </div>
  );
}
