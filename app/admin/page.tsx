"use client";

import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import { RESTAURANTS, MEMBRES } from "@/lib/mockData";
import { useKyb } from "@/lib/kyb-store";
import { useEventsAdmin } from "@/lib/events-admin-store";

export default function AdminOverviewPage() {
  const { dossiers } = useKyb();
  const { evenements } = useEventsAdmin();
  const valides = RESTAURANTS.filter((r) => r.statut === "validé").length;
  const totalMembres = MEMBRES.restaurateurs.length + MEMBRES.gourmets.length;

  return (
    <div>
      <PageHeader
        eyebrow="ADMIN RESTO"
        title="Vue d'ensemble"
        subtitle="L'état de la plateforme, tous restaurants et membres confondus."
      />

      {dossiers.length > 0 && (
        <Link
          href="/admin/verifications"
          className="cut-corners mb-8 flex flex-col justify-between gap-3 bg-mustard/25 p-5 shadow-[4px_4px_0_var(--color-ink)] sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-stamp text-ink">
              {dossiers.length} dossier{dossiers.length > 1 ? "s" : ""} en attente de vérification
            </p>
            <p className="mt-1 text-sm text-ink/70">
              Des restaurateurs attendent la validation de leur dossier KYB.
            </p>
          </div>
          <span className="cut-corners-sm shrink-0 bg-ink px-4 py-2 text-sm font-semibold text-paper">
            Traiter la file →
          </span>
        </Link>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Restaurants validés" value={String(valides)} hint={`sur ${RESTAURANTS.length} inscrits`} />
        <StatCard label="Vérifications en attente" value={String(dossiers.length)} />
        <StatCard label="Membres" value={String(totalMembres)} hint="restaurateurs + gourmets" />
        <StatCard label="Événements publiés" value={String(evenements.length)} />
      </div>
    </div>
  );
}
