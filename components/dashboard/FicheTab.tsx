"use client";

import type { FormEvent } from "react";
import FormField from "@/components/auth/FormField";
import FileDrop from "@/components/dashboard/FileDrop";
import StampButton from "@/components/StampButton";
import { useUpdateRestaurant } from "@/hooks/useRestaurants";
import { getApiErrorMessage } from "@/lib/api-error";
import type { components } from "@/services/api-types";

type Restaurant = components["schemas"]["RestaurantRead"];

export default function FicheTab({ restaurant }: { restaurant: Restaurant }) {
  const updateRestaurant = useUpdateRestaurant();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    updateRestaurant.mutate({
      restaurantId: restaurant.id,
      body: {
        name: String(form.get("fiche-nom") ?? restaurant.name),
        address: String(form.get("fiche-quartier") ?? restaurant.address),
        description: String(form.get("fiche-description") ?? ""),
        concept: String(form.get("fiche-specialites") ?? ""),
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Nom du restaurant" id="fiche-nom" defaultValue={restaurant.name} />
        <FormField label="Adresse" id="fiche-quartier" defaultValue={restaurant.address} />
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

      <FormField
        label="Spécialités / concept"
        id="fiche-specialites"
        defaultValue={restaurant.concept ?? ""}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <FileDrop id="photo-1" label="Photo principale" />
        <FileDrop id="photo-2" label="Photo secondaire" />
      </div>

      {updateRestaurant.isError && (
        <p className="text-sm font-semibold text-primary-dark">
          {getApiErrorMessage(updateRestaurant.error, "Impossible d'enregistrer la fiche.")}
        </p>
      )}
      {updateRestaurant.isSuccess && (
        <p className="text-sm font-semibold text-ink/70">Fiche enregistrée.</p>
      )}

      <StampButton type="submit" disabled={updateRestaurant.isPending}>
        {updateRestaurant.isPending ? "Enregistrement…" : "Enregistrer la fiche"}
      </StampButton>
    </form>
  );
}
