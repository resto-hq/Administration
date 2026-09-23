"use client";

import { useState } from "react";
import { mockRestaurants, restaurantFilterChips, totalRestaurantsCollected } from "@/lib/mock-landing";
import DemoBadge from "./DemoBadge";
import PlaceholderImage from "./PlaceholderImage";
import { LandingButton } from "./LandingButton";

export default function RestaurantsShowcase() {
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const rows = activeChip
    ? mockRestaurants.filter(
        (r) =>
          r.tags.includes(activeChip) ||
          (activeChip === "Moins de 3 000 FCFA" && r.priceRange.startsWith("1")) ||
          (activeChip === "Ouvert maintenant" && true)
      )
    : mockRestaurants;

  return (
    <section id="restaurants" className="bg-surface px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-3xl font-bold text-ink sm:text-4xl">Déjà référencés à Lomé</h2>
            <p className="mt-2 text-ink/60">
              {totalRestaurantsCollected} restaurants collectés par notre équipe terrain, vérifiés un par un.
            </p>
          </div>
          <DemoBadge />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveChip(null)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              activeChip === null ? "border-primary text-primary" : "border-ink/15 text-ink/70 hover:border-ink/30"
            }`}
          >
            Tout
          </button>
          {restaurantFilterChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setActiveChip(chip)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                activeChip === chip ? "border-primary text-primary" : "border-ink/15 text-ink/70 hover:border-ink/30"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-ink/50">{rows.length} restaurants référencés</p>

        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((restaurant, index) => (
            <div key={restaurant.name} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <PlaceholderImage seed={index} className="h-40 w-full" />
              <div className="p-4">
                <p className="font-bold text-ink">{restaurant.name}</p>
                <p className="mt-1 text-sm text-ink/60">
                  ★ {restaurant.rating.toFixed(1)} ({restaurant.reviewCount} avis)
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {restaurant.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-ink/70">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm text-ink/60">
                  {restaurant.priceRange} · {restaurant.neighborhood}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <LandingButton variant="outline">Voir plus de restaurants</LandingButton>
        </div>
      </div>
    </section>
  );
}
