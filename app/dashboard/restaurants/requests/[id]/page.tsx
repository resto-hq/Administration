"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import BackLink from "@/components/dashboard/BackLink";
import StampButton from "@/components/StampButton";
import { useRequest } from "@/hooks/useRestaurantRequests";

export default function RestaurantRequestPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: request, isPending, isError } = useRequest(params.id);

  useEffect(() => {
    if (request?.status === "approved" && request.created_restaurant_id) {
      router.replace(`/dashboard/restaurants/${request.created_restaurant_id}`);
    }
  }, [request, router]);

  if (isPending) {
    return <p className="text-sm text-ink/60">Chargement…</p>;
  }

  if (isError || !request) {
    return (
      <div>
        <PageHeader eyebrow="MES RESTAURANTS" title="Demande introuvable" />
        <p className="text-sm text-ink/70">
          Cette demande n&apos;existe pas ou ne t&apos;appartient pas.
        </p>
      </div>
    );
  }

  return (
    <div>
      <BackLink href="/dashboard/restaurants" label="Retour à mes restaurants" />
      <PageHeader eyebrow="DEMANDE DE RÉFÉRENCEMENT" title={request.name} subtitle={request.address} />

      {request.status === "pending" && (
        <div className="cut-corners max-w-lg bg-paper p-6 shadow-[5px_5px_0_var(--color-ink)]">
          <p className="text-stamp text-ink">En cours de revue</p>
          <p className="mt-2 text-sm text-ink/70">
            On revient vers toi dès qu&apos;un admin a traité ta demande. Ce restaurant
            apparaîtra ici une fois validé.
          </p>
        </div>
      )}

      {request.status === "rejected" && (
        <div className="cut-corners max-w-lg bg-paper p-6 shadow-[5px_5px_0_var(--color-ink)]">
          <p className="text-stamp text-ink">Demande rejetée</p>
          <p className="mt-2 text-sm text-ink/70">
            {request.rejection_reason || "Aucune raison n'a été précisée."}
          </p>
          <Link href="/dashboard/restaurants/nouveau">
            <StampButton type="button" className="mt-4">
              Envoyer une nouvelle demande
            </StampButton>
          </Link>
        </div>
      )}
    </div>
  );
}
