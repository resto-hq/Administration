"use client";

import { type FormEvent } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/auth/FormField";
import StampButton from "@/components/StampButton";
import { useRequestReferencing } from "@/hooks/useRestaurantRequests";
import { getApiErrorMessage } from "@/lib/api-error";

export default function RestaurantForm({ submitLabel }: { submitLabel: string }) {
  const router = useRouter();
  const requestReferencing = useRequestReferencing();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("nom") ?? "").trim();
    const address = String(form.get("quartier") ?? "").trim();
    if (!name || !address) return;

    requestReferencing.mutate(
      { name, address },
      {
        onSuccess: (request) => {
          router.push(`/dashboard/restaurants/requests/${request.id}`);
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField label="Nom du restaurant" id="nom" placeholder="Chez Ama" required />
      <FormField label="Adresse (quartier)" id="quartier" placeholder="Tokoin, Lomé" required />

      {requestReferencing.isError && (
        <p className="text-sm font-semibold text-primary-dark">
          {getApiErrorMessage(requestReferencing.error, "Impossible d'envoyer la demande.")}
        </p>
      )}

      <StampButton type="submit" disabled={requestReferencing.isPending} className="w-full">
        {requestReferencing.isPending ? "Envoi en cours…" : submitLabel}
      </StampButton>
    </form>
  );
}
