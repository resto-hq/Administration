import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import { RESTAURANTS } from "@/lib/mockData";

export default function AdminRestaurantsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="ANNUAIRE"
        title="Restaurants"
        subtitle="Tous les établissements inscrits sur Resto, quel que soit leur statut."
      />

      <div className="max-w-2xl space-y-3">
        {RESTAURANTS.map((resto) => (
          <div
            key={resto.nom}
            className="cut-corners-sm flex items-center justify-between gap-4 bg-paper p-5 shadow-[4px_4px_0_var(--color-ink)]"
          >
            <div>
              <p className="font-semibold text-ink">{resto.nom}</p>
              <p className="text-sm text-ink/70">{resto.quartier}</p>
            </div>
            <StatusBadge status={resto.statut} />
          </div>
        ))}
      </div>
    </div>
  );
}
