"use client";

import type { FormEvent } from "react";
import FormField from "@/components/auth/FormField";
import FileDrop from "@/components/dashboard/FileDrop";
import StampButton from "@/components/StampButton";
import { useSubmitKybRestaurant } from "@/hooks/useKyc";
import { getApiErrorMessage } from "@/lib/api-error";
import type { components } from "@/services/api-types";

type Restaurant = components["schemas"]["RestaurantRead"];

export default function VerificationTab({ restaurant }: { restaurant: Restaurant }) {
  const submitKyb = useSubmitKybRestaurant();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const file = (name: string) => {
      const f = form.get(name) as File | null;
      return f && f.size > 0 ? f : null;
    };

    submitKyb.mutate({
      restaurant_id: restaurant.id,
      first_name: String(form.get("first_name") ?? ""),
      last_name: String(form.get("last_name") ?? ""),
      full_address: String(form.get("full_address") ?? ""),
      phone: String(form.get("phone") ?? ""),
      owner_name: String(form.get("owner_name") ?? ""),
      owner_phone: String(form.get("owner_phone") ?? ""),
      passport: file("passport"),
      id_card: file("id_card"),
      proof_of_ownership: file("proof_of_ownership"),
      cfe_document: file("cfe_document"),
      proof_of_employment: file("proof_of_employment"),
      owner_photo: file("owner_photo"),
    });
  }

  if (restaurant.status === "published") {
    return (
      <div className="max-w-lg rounded-xl border border-border bg-panel p-6">
        <p className="font-bold text-ink">Restaurant vérifié</p>
        <p className="mt-2 text-sm text-ink/70">
          Ce restaurant est validé et visible publiquement sur Resto.
        </p>
      </div>
    );
  }

  if (restaurant.status === "pending") {
    return (
      <div className="max-w-lg rounded-xl border border-border bg-panel p-6">
        <p className="font-bold text-ink">En cours de vérification</p>
        <p className="mt-2 text-sm text-ink/70">
          On revient vers toi sous 48h. La fiche reste privée jusqu&apos;à validation.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg space-y-5">
      {restaurant.status === "rejected" && restaurant.rejection_reason && (
        <p className="rounded-lg bg-danger-ui-soft p-4 text-sm text-danger-ui">
          Dossier rejeté : {restaurant.rejection_reason}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Prénom" id="first_name" required />
          <FormField label="Nom" id="last_name" required />
        </div>
        <FormField label="Adresse complète" id="full_address" required />
        <FormField label="Téléphone" id="phone" type="tel" required />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Nom du propriétaire" id="owner_name" required />
          <FormField label="Téléphone du propriétaire" id="owner_phone" type="tel" required />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FileDrop id="passport" label="Passeport (optionnel)" />
          <FileDrop id="id_card" label="Carte d'identité (optionnel)" />
          <FileDrop id="proof_of_ownership" label="Preuve de propriété" />
          <FileDrop id="cfe_document" label="Carte CFE" />
          <FileDrop id="proof_of_employment" label="Preuve d'emploi (optionnel)" />
          <FileDrop id="owner_photo" label="Photo du propriétaire sur place" />
        </div>
        <p className="text-xs text-ink/50">
          Au moins un document business (preuve de propriété, CFE ou preuve d&apos;emploi) est
          requis.
        </p>

        {submitKyb.isError && (
          <p className="text-sm font-semibold text-primary-dark">
            {getApiErrorMessage(submitKyb.error, "Impossible d'envoyer le dossier.")}
          </p>
        )}

        <StampButton type="submit" disabled={submitKyb.isPending}>
          {submitKyb.isPending ? "Envoi en cours…" : "Envoyer ce dossier"}
        </StampButton>
      </form>
    </div>
  );
}
