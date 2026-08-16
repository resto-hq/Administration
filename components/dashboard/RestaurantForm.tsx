"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/auth/FormField";
import StampButton from "@/components/StampButton";
import { useRestaurants } from "@/lib/restaurants-store";

export default function RestaurantForm({ submitLabel }: { submitLabel: string }) {
  const router = useRouter();
  const { createRestaurant } = useRestaurants();
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nom = String(form.get("nom") ?? "").trim();
    const quartier = String(form.get("quartier") ?? "").trim();
    if (!nom || !quartier) return;

    setSubmitting(true);
    const restaurant = createRestaurant({ nom, quartier });
    router.push(`/dashboard/restaurants/${restaurant.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField label="Nom du restaurant" id="nom" placeholder="Chez Ama" required />
      <FormField label="Quartier à Lomé" id="quartier" placeholder="Tokoin" required />
      <StampButton type="submit" disabled={submitting} className="w-full">
        {submitting ? "Création en cours…" : submitLabel}
      </StampButton>
    </form>
  );
}
