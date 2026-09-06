"use client";

import type { FormEvent } from "react";
import FormField from "@/components/auth/FormField";
import FileDrop from "@/components/dashboard/FileDrop";
import StampButton from "@/components/StampButton";
import { useSubmitPersonKyc } from "@/hooks/useKyc";
import { getApiErrorMessage } from "@/lib/api-error";

export default function PersonKycForm({ onSuccess }: { onSuccess?: () => void }) {
  const submitPersonKyc = useSubmitPersonKyc();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const passport = form.get("passport") as File | null;
    const idCard = form.get("id_card") as File | null;

    submitPersonKyc.mutate(
      {
        first_name: String(form.get("first_name") ?? ""),
        last_name: String(form.get("last_name") ?? ""),
        full_address: String(form.get("full_address") ?? ""),
        phone: String(form.get("phone") ?? ""),
        passport: passport && passport.size > 0 ? passport : null,
        id_card: idCard && idCard.size > 0 ? idCard : null,
      },
      { onSuccess }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Prénom" id="first_name" placeholder="Ama" required />
        <FormField label="Nom" id="last_name" placeholder="Kokou" required />
      </div>
      <FormField
        label="Adresse complète"
        id="full_address"
        placeholder="12 rue du Marché, Tokoin, Lomé"
        required
      />
      <FormField label="Téléphone" id="phone" type="tel" placeholder="90 00 00 00" required />

      <div className="grid gap-4 sm:grid-cols-2">
        <FileDrop id="passport" label="Passeport" />
        <FileDrop id="id_card" label="Carte d'identité (CNI)" />
      </div>
      <p className="text-xs text-ink/50">Au moins un des deux documents est requis.</p>

      {submitPersonKyc.isError && (
        <p className="text-sm font-semibold text-primary-dark">
          {getApiErrorMessage(submitPersonKyc.error, "Impossible d'envoyer le dossier.")}
        </p>
      )}

      <StampButton type="submit" disabled={submitPersonKyc.isPending} className="w-full">
        {submitPersonKyc.isPending ? "Envoi en cours…" : "Vérifier mon identité"}
      </StampButton>
    </form>
  );
}
