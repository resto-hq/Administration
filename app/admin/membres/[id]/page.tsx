import { notFound } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import BackLink from "@/components/dashboard/BackLink";
import { MEMBRES } from "@/lib/mockData";

export default async function AdminMembreDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurateur = MEMBRES.restaurateurs.find((m) => m.id === id);
  const gourmet = MEMBRES.gourmets.find((m) => m.id === id);
  const membre = restaurateur ?? gourmet;
  if (!membre) notFound();

  return (
    <div>
      <BackLink href="/admin/membres" label="Retour aux membres" />
      <PageHeader
        eyebrow={restaurateur ? "RESTAURATEUR" : "GOURMET"}
        title={membre.nom}
      />

      <div className="cut-corners-sm max-w-xl space-y-3 bg-paper p-6 shadow-[4px_4px_0_var(--color-ink)]">
        <div>
          <p className="text-xs font-semibold tracking-wide text-ink/50">Email</p>
          <p className="text-ink/80">{membre.email}</p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-ink/50">Téléphone</p>
          <p className="text-ink/80">{membre.telephone}</p>
        </div>
        {restaurateur && (
          <div>
            <p className="text-xs font-semibold tracking-wide text-ink/50">Restaurant</p>
            <p className="text-ink/80">{restaurateur.resto}</p>
          </div>
        )}
        {gourmet && (
          <div>
            <p className="text-xs font-semibold tracking-wide text-ink/50">Ville</p>
            <p className="text-ink/80">{gourmet.ville}</p>
          </div>
        )}
      </div>
    </div>
  );
}
