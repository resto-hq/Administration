import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";

export default function DashboardOverviewPage() {
  return (
    <div>
      <PageHeader
        eyebrow="TON ESPACE"
        title="Vue d'ensemble"
        subtitle="Le pouls de ton resto sur Resto, en un coup d'œil."
      />

      <Link
        href="/dashboard/verification"
        className="cut-corners mb-8 flex flex-col justify-between gap-3 bg-mustard/25 p-5 shadow-[4px_4px_0_var(--color-ink)] sm:flex-row sm:items-center"
      >
        <div>
          <p className="text-stamp text-ink">Vérification en attente</p>
          <p className="mt-1 text-sm text-ink/70">
            Termine ton dossier KYB pour apparaître publiquement sur Resto.
          </p>
        </div>
        <span className="cut-corners-sm shrink-0 bg-ink px-4 py-2 text-sm font-semibold text-paper">
          Continuer →
        </span>
      </Link>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Visites de ta fiche" value="0" hint="depuis l'inscription" />
        <StatCard label="Avis reçus" value="0" />
        <StatCard label="Réservations" value="0" />
        <StatCard label="Événements publiés" value="0" />
      </div>
    </div>
  );
}
