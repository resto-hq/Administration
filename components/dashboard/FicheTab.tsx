"use client";

import RestaurantFieldsForm from "@/components/dashboard/RestaurantFieldsForm";
import { useUpdateRestaurant } from "@/hooks/useRestaurants";
import { getApiErrorMessage } from "@/lib/api-error";
import type { components } from "@/services/api-types";

type Restaurant = components["schemas"]["RestaurantRead"];

export default function FicheTab({ restaurant }: { restaurant: Restaurant }) {
  const updateRestaurant = useUpdateRestaurant();

  return (
    <div>
      <RestaurantFieldsForm
        restaurant={restaurant}
        submitLabel="Enregistrer la fiche"
        pending={updateRestaurant.isPending}
        errorMessage={
          updateRestaurant.isError
            ? getApiErrorMessage(updateRestaurant.error, "Impossible d'enregistrer la fiche.")
            : null
        }
        onSubmit={(data) => {
          updateRestaurant.mutate({ restaurantId: restaurant.id, body: data });
        }}
      />
      {updateRestaurant.isSuccess && (
        <p className="mt-4 text-sm font-semibold text-ink/70">Fiche enregistrée.</p>
      )}
    </div>
  );
}
