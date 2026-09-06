"use client";

import { useRouter } from "next/navigation";
import RestaurantFieldsForm from "@/components/dashboard/RestaurantFieldsForm";
import { useCreateRestaurant } from "@/hooks/useRestaurants";
import { getApiErrorMessage } from "@/lib/api-error";
import { clearRestaurantDraft } from "@/lib/restaurant-draft";

export default function RestaurantForm({ submitLabel }: { submitLabel: string }) {
  const router = useRouter();
  const createRestaurant = useCreateRestaurant();

  return (
    <RestaurantFieldsForm
      submitLabel={submitLabel}
      pending={createRestaurant.isPending}
      errorMessage={
        createRestaurant.isError
          ? getApiErrorMessage(createRestaurant.error, "Impossible de créer le restaurant.")
          : null
      }
      onSubmit={(data) => {
        createRestaurant.mutate(data, {
          onSuccess: (restaurant) => {
            clearRestaurantDraft();
            router.push(`/dashboard/restaurants/${restaurant.id}`);
          },
        });
      }}
    />
  );
}
