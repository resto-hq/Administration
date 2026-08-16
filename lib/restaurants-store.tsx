"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { CURRENT_USER_ID, RESTAURANTS, type Restaurant } from "@/lib/mockData";

type FicheUpdate = Partial<
  Pick<Restaurant, "nom" | "quartier" | "description" | "horaires" | "specialites">
>;

type KybSubmission = { raisonSociale: string; rccm: string };

type RestaurantsContextValue = {
  restaurants: Restaurant[];
  getRestaurant: (id: string) => Restaurant | undefined;
  createRestaurant: (input: { nom: string; quartier: string }) => Restaurant;
  updateFiche: (id: string, update: FicheUpdate) => void;
  submitKyb: (id: string, submission: KybSubmission) => void;
  resetKyb: (id: string) => void;
};

const RestaurantsContext = createContext<RestaurantsContextValue | null>(null);

export function RestaurantsProvider({ children }: { children: ReactNode }) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(() =>
    RESTAURANTS.filter((r) => r.ownerId === CURRENT_USER_ID)
  );

  const value = useMemo<RestaurantsContextValue>(
    () => ({
      restaurants,
      getRestaurant: (id) => restaurants.find((r) => r.id === id),
      createRestaurant: (input) => {
        const restaurant: Restaurant = {
          id: `r-${Math.random().toString(36).slice(2, 9)}`,
          ownerId: CURRENT_USER_ID,
          nom: input.nom,
          quartier: input.quartier,
          statut: "non soumis",
        };
        setRestaurants((current) => [...current, restaurant]);
        return restaurant;
      },
      updateFiche: (id, update) => {
        setRestaurants((current) =>
          current.map((r) => (r.id === id ? { ...r, ...update } : r))
        );
      },
      submitKyb: (id, submission) => {
        setRestaurants((current) =>
          current.map((r) =>
            r.id === id
              ? {
                  ...r,
                  ...submission,
                  statut: "en attente",
                  soumisLe: new Date().toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }),
                }
              : r
          )
        );
      },
      resetKyb: (id) => {
        setRestaurants((current) =>
          current.map((r) => (r.id === id ? { ...r, statut: "non soumis" } : r))
        );
      },
    }),
    [restaurants]
  );

  return <RestaurantsContext.Provider value={value}>{children}</RestaurantsContext.Provider>;
}

export function useRestaurants() {
  const context = useContext(RestaurantsContext);
  if (!context) {
    throw new Error("useRestaurants must be used within a RestaurantsProvider");
  }
  return context;
}
