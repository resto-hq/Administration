"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { EVENEMENTS_PLATEFORME, type EvenementPlateforme } from "@/lib/mockData";

type EventsAdminContextValue = {
  evenements: EvenementPlateforme[];
  getEvenement: (id: string) => EvenementPlateforme | undefined;
  remove: (id: string) => void;
};

const EventsAdminContext = createContext<EventsAdminContextValue | null>(null);

export function EventsAdminProvider({ children }: { children: ReactNode }) {
  const [evenements, setEvenements] = useState<EvenementPlateforme[]>(EVENEMENTS_PLATEFORME);

  const value = useMemo<EventsAdminContextValue>(
    () => ({
      evenements,
      getEvenement: (id) => evenements.find((e) => e.id === id),
      remove: (id) => setEvenements((current) => current.filter((e) => e.id !== id)),
    }),
    [evenements]
  );

  return <EventsAdminContext.Provider value={value}>{children}</EventsAdminContext.Provider>;
}

export function useEventsAdmin() {
  const context = useContext(EventsAdminContext);
  if (!context) {
    throw new Error("useEventsAdmin must be used within an EventsAdminProvider");
  }
  return context;
}
