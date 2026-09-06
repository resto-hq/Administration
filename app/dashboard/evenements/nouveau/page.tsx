"use client";

import { type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import BackLink from "@/components/dashboard/BackLink";
import FormField from "@/components/auth/FormField";
import StampButton from "@/components/StampButton";
import { useMyRestaurants } from "@/hooks/useRestaurants";
import { useCreateEvent } from "@/hooks/useEvents";
import { getApiErrorMessage } from "@/lib/api-error";

export default function NouvelEvenementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: restaurants } = useMyRestaurants();
  const createEvent = useCreateEvent();

  const myRestaurants = (restaurants ?? []).map((restaurant) => ({
    id: restaurant.id,
    name: restaurant.name,
  }));

  const defaultRestaurantId = searchParams.get("restaurant") ?? myRestaurants[0]?.id ?? "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const startDate = String(form.get("start_date") ?? "");
    const endDate = String(form.get("end_date") ?? "");

    createEvent.mutate(
      {
        title: String(form.get("title") ?? ""),
        description: String(form.get("description") ?? ""),
        event_type: form.get("event_type") === "workshop" ? "workshop" : "event",
        restaurant_id: String(form.get("restaurant_id") ?? "") || null,
        start_date: startDate ? new Date(startDate).toISOString() : new Date().toISOString(),
        end_date: endDate ? new Date(endDate).toISOString() : null,
        duration: String(form.get("duration") ?? "").trim() || null,
        ticket_link: String(form.get("ticket_link") ?? "").trim() || null,
        contact_info: String(form.get("contact_info") ?? "").trim() || null,
        public_profile_enabled: form.get("public_profile_enabled") === "on",
      },
      {
        onSuccess: (created) => router.push(`/dashboard/evenements/${created.id}`),
      }
    );
  }

  return (
    <div>
      <BackLink href="/dashboard/evenements" label="Retour aux événements" />
      <PageHeader
        eyebrow="ANIMATION"
        title="Publier un événement"
        subtitle="Ton événement passe par une revue avant d'être visible publiquement."
      />

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {myRestaurants.length > 1 ? (
            <div>
              <label
                htmlFor="restaurant_id"
                className="mb-1.5 block text-sm font-semibold text-ink"
              >
                Restaurant
              </label>
              <select
                id="restaurant_id"
                name="restaurant_id"
                defaultValue={defaultRestaurantId}
                className="cut-corners-sm w-full border border-ink/15 bg-paper-alt px-4 py-3 text-ink outline-none focus:border-primary"
              >
                {myRestaurants.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <input type="hidden" name="restaurant_id" value={defaultRestaurantId} />
          )}

          <div>
            <label htmlFor="event_type" className="mb-1.5 block text-sm font-semibold text-ink">
              Type
            </label>
            <select
              id="event_type"
              name="event_type"
              defaultValue="event"
              className="cut-corners-sm w-full border border-ink/15 bg-paper-alt px-4 py-3 text-ink outline-none focus:border-primary"
            >
              <option value="event">Événement / animation</option>
              <option value="workshop">Atelier culinaire</option>
            </select>
          </div>
        </div>

        <FormField label="Titre" id="title" placeholder="Soirée dégustation" required />

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-ink">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            required
            className="cut-corners-sm w-full border border-ink/15 bg-paper-alt px-4 py-3 text-ink outline-none placeholder:text-ink/35 focus:border-primary focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Début" id="start_date" type="datetime-local" required />
          <FormField label="Fin (optionnel)" id="end_date" type="datetime-local" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Durée (optionnel)" id="duration" placeholder="2h, toute la soirée…" />
          <FormField
            label="Lien billetterie (optionnel)"
            id="ticket_link"
            type="url"
            placeholder="https://..."
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:items-end">
          <FormField
            label="Contact (optionnel)"
            id="contact_info"
            placeholder="Téléphone ou email pour les questions"
          />
          <label className="flex items-center gap-2 pb-3 text-sm text-ink">
            <input
              type="checkbox"
              name="public_profile_enabled"
              defaultChecked
              className="h-4 w-4 accent-primary"
            />
            Rendre visible sur mon profil public
          </label>
        </div>

        {createEvent.isError && (
          <p className="text-sm font-semibold text-primary-dark">
            {getApiErrorMessage(createEvent.error, "Impossible de publier l'événement.")}
          </p>
        )}

        <StampButton type="submit" disabled={createEvent.isPending}>
          {createEvent.isPending ? "Publication…" : "Publier l'événement"}
        </StampButton>
      </form>
    </div>
  );
}
