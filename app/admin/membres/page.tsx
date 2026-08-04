"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import { MEMBRES } from "@/lib/mockData";

export default function AdminMembresPage() {
  const [tab, setTab] = useState<"restaurateurs" | "gourmets">("restaurateurs");

  return (
    <div>
      <PageHeader
        eyebrow="COMMUNAUTÉ"
        title="Membres"
        subtitle="Les restaurateurs et les gourmets inscrits sur Resto."
      />

      <div className="mb-6 flex gap-2">
        {(["restaurateurs", "gourmets"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`cut-corners-sm px-4 py-2 text-sm font-semibold capitalize transition-colors ${
              tab === key ? "bg-primary text-paper" : "bg-paper-alt text-ink/60 hover:text-ink"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="max-w-2xl space-y-3">
        {tab === "restaurateurs"
          ? MEMBRES.restaurateurs.map((m) => (
              <div key={m.email} className="cut-corners-sm bg-paper p-5 shadow-[4px_4px_0_var(--color-ink)]">
                <p className="font-semibold text-ink">{m.nom}</p>
                <p className="text-sm text-ink/70">{m.email} · {m.resto}</p>
              </div>
            ))
          : MEMBRES.gourmets.map((m) => (
              <div key={m.email} className="cut-corners-sm bg-paper p-5 shadow-[4px_4px_0_var(--color-ink)]">
                <p className="font-semibold text-ink">{m.nom}</p>
                <p className="text-sm text-ink/70">{m.email} · {m.ville}</p>
              </div>
            ))}
      </div>
    </div>
  );
}
