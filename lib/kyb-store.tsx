"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { KYB_QUEUE, type KybDossier } from "@/lib/mockData";

export type KybDecision = "approuvé" | "rejeté";
export type DecidedDossier = { id: string; nom: string; decision: KybDecision };

type KybContextValue = {
  dossiers: KybDossier[];
  decided: DecidedDossier[];
  getDossier: (id: string) => KybDossier | undefined;
  decide: (id: string, decision: KybDecision) => void;
};

const KybContext = createContext<KybContextValue | null>(null);

export function KybProvider({ children }: { children: ReactNode }) {
  const [dossiers, setDossiers] = useState<KybDossier[]>(KYB_QUEUE);
  const [decided, setDecided] = useState<DecidedDossier[]>([]);

  const value = useMemo<KybContextValue>(
    () => ({
      dossiers,
      decided,
      getDossier: (id) => dossiers.find((d) => d.id === id),
      decide: (id, decision) => {
        const dossier = dossiers.find((d) => d.id === id);
        if (!dossier) return;
        setDossiers((current) => current.filter((d) => d.id !== id));
        setDecided((current) => [{ id: dossier.id, nom: dossier.nom, decision }, ...current]);
      },
    }),
    [dossiers, decided]
  );

  return <KybContext.Provider value={value}>{children}</KybContext.Provider>;
}

export function useKyb() {
  const context = useContext(KybContext);
  if (!context) {
    throw new Error("useKyb must be used within a KybProvider");
  }
  return context;
}
