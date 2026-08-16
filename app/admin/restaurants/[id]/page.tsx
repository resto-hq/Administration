import { notFound } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import BackLink from "@/components/dashboard/BackLink";
import StatusBadge from "@/components/admin/StatusBadge";
import { RESTAURANTS } from "@/lib/mockData";

export default async function AdminRestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = RESTAURANTS.find((r) => r.id === id);
  if (!restaurant) notFound();

  return (
    <div>
      <BackLink href="/admin/restaurants" label="Retour aux restaurants" />
      <PageHeader eyebrow={restaurant.quartier.toUpperCase()} title={restaurant.nom} />

      <div className="cut-corners-sm max-w-xl space-y-4 bg-paper p-6 shadow-[4px_4px_0_var(--color-ink)]">
        <StatusBadge status={restaurant.statut} />

        {restaurant.description && <p className="text-ink/80">{restaurant.description}</p>}

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          {restaurant.horaires && (
            <div>
              <dt className="text-xs font-semibold tracking-wide text-ink/50">Horaires</dt>
              <dd className="text-ink/80">{restaurant.horaires}</dd>
            </div>
          )}
          {restaurant.specialites && (
            <div>
              <dt className="text-xs font-semibold tracking-wide text-ink/50">Spécialités</dt>
              <dd className="text-ink/80">{restaurant.specialites}</dd>
            </div>
          )}
          {restaurant.raisonSociale && (
            <div>
              <dt className="text-xs font-semibold tracking-wide text-ink/50">Raison sociale</dt>
              <dd className="text-ink/80">{restaurant.raisonSociale}</dd>
            </div>
          )}
          {restaurant.rccm && (
            <div>
              <dt className="text-xs font-semibold tracking-wide text-ink/50">RCCM</dt>
              <dd className="text-ink/80">{restaurant.rccm}</dd>
            </div>
          )}
          {restaurant.soumisLe && (
            <div>
              <dt className="text-xs font-semibold tracking-wide text-ink/50">Dossier soumis le</dt>
              <dd className="text-ink/80">{restaurant.soumisLe}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
