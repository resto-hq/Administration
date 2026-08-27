"use client";

import { type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import BackLink from "@/components/dashboard/BackLink";
import FormField from "@/components/auth/FormField";
import StampButton from "@/components/StampButton";
import { useMyRequests } from "@/hooks/useRestaurantRequests";
import { useCreateEvent } from "@/hooks/useEvents";
import { getApiErrorMessage } from "@/lib/api-error";

export default function NouvelEvenementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: requests } = useMyRequests();
  const createEvent = useCreateEvent();

  const approvedRestaurants = (requests ?? [])
    .filter((request) => request.status === "approved" && request.created_restaurant_id)
    .map((request) => ({ id: request.created_restaurant_id as string, name: request.name }));

  const defaultRestaurantId = searchParams.get("restaurant") ?? approvedRestaurants[0]?.id ?? "";

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
        ticket_link: String(form.get("ticket_link") ?? "") || null,
        public_profile_enabled: true,
      },
      {
        onSuccess: (created) => router.push(`/dashboard/evenements/${created.id}`),
      }
    );
  }

  if (approvedRestaurants.length === 0) {
    return (
      <div>
        <PageHeader eyebrow="ANIMATION" title="Publier un événement" />
        <p className="text-sm text-ink/70">
          Il te faut d&apos;abord un restaurant validé pour publier un événement.
        </p>
      </div>
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

      <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
        {approvedRestaurants.length > 1 && (
          <div>
            <label htmlFor="restaurant_id" className="mb-1.5 block text-sm font-semibold text-ink">
              Restaurant
            </label>
            <select
              id="restaurant_id"
              name="restaurant_id"
              defaultValue={defaultRestaurantId}
              className="cut-corners-sm w-full border border-ink/15 bg-paper-alt px-4 py-3 text-ink outline-none focus:border-primary"
            >
              {approvedRestaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {approvedRestaurants.length === 1 && (
          <input type="hidden" name="restaurant_id" value={defaultRestaurantId} />
        )}

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

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Début" id="start_date" type="datetime-local" required />
          <FormField label="Fin (optionnel)" id="end_date" type="datetime-local" />
        </div>

        <FormField
          label="Lien billetterie (optionnel)"
          id="ticket_link"
          type="url"
          placeholder="https://..."
        />

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
