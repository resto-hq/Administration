"use client";

import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import { AVIS, RESERVATIONS, EVENEMENTS } from "@/lib/mockData";
import { useRestaurants } from "@/lib/restaurants-store";

export default function DashboardOverviewPage() {
  const { restaurants } = useRestaurants();
  const aVerifier = restaurants.filter((r) => r.statut !== "validé").length;

  return (
    <div>
      <PageHeader
        eyebrow="TON ESPACE"
        title="Vue d'ensemble"
        subtitle="Le pouls de tes restaurants sur Resto, en un coup d'œil."
      />

      {aVerifier > 0 && (
        <Link
          href="/dashboard/restaurants"
          className="cut-corners mb-8 flex flex-col justify-between gap-3 bg-mustard/25 p-5 shadow-[4px_4px_0_var(--color-ink)] sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-stamp text-ink">
              {aVerifier} restaurant{aVerifier > 1 ? "s" : ""} à finaliser côté vérification
            </p>
            <p className="mt-1 text-sm text-ink/70">
              Termine leur dossier KYB pour qu&apos;ils apparaissent publiquement sur Resto.
            </p>
          </div>
          <span className="cut-corners-sm shrink-0 bg-ink px-4 py-2 text-sm font-semibold text-paper">
            Voir mes restaurants →
          </span>
        </Link>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Visites de tes fiches" value="0" hint="depuis l'inscription" />
        <StatCard label="Avis reçus" value={String(AVIS.length)} />
        <StatCard label="Réservations" value={String(RESERVATIONS.length)} />
        <StatCard label="Événements publiés" value={String(EVENEMENTS.length)} />
      </div>
    </div>
  );
}
