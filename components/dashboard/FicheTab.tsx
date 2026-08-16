"use client";

import type { FormEvent } from "react";
import FormField from "@/components/auth/FormField";
import FileDrop from "@/components/dashboard/FileDrop";
import StampButton from "@/components/StampButton";
import { useRestaurants } from "@/lib/restaurants-store";
import type { Restaurant } from "@/lib/mockData";

export default function FicheTab({ restaurant }: { restaurant: Restaurant }) {
  const { updateFiche } = useRestaurants();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    updateFiche(restaurant.id, {
      nom: String(form.get("fiche-nom") ?? restaurant.nom),
      quartier: String(form.get("fiche-quartier") ?? restaurant.quartier),
      description: String(form.get("fiche-description") ?? ""),
      horaires: String(form.get("fiche-horaires") ?? ""),
      specialites: String(form.get("fiche-specialites") ?? ""),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Nom du restaurant" id="fiche-nom" defaultValue={restaurant.nom} />
        <FormField label="Quartier" id="fiche-quartier" defaultValue={restaurant.quartier} />
      </div>

      <div>
        <label htmlFor="fiche-description" className="mb-1.5 block text-sm font-semibold text-ink">
          Description
        </label>
        <textarea
          id="fiche-description"
          name="fiche-description"
          rows={3}
          defaultValue={restaurant.description ?? ""}
          className="cut-corners-sm w-full border border-ink/15 bg-paper-alt px-4 py-3 text-ink outline-none placeholder:text-ink/35 focus:border-primary focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Horaires" id="fiche-horaires" defaultValue={restaurant.horaires ?? ""} />
        <FormField
          label="Spécialités"
          id="fiche-specialites"
          defaultValue={restaurant.specialites ?? ""}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FileDrop id="photo-1" label="Photo principale" />
        <FileDrop id="photo-2" label="Photo secondaire" />
      </div>

      <StampButton type="submit">Enregistrer la fiche</StampButton>
    </form>
  );
}
