import { notFound } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import BackLink from "@/components/dashboard/BackLink";
import { EVENEMENTS } from "@/lib/mockData";

export default async function EvenementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const evenement = EVENEMENTS.find((e) => e.id === id);
  if (!evenement) notFound();

  return (
    <div>
      <BackLink href="/dashboard/evenements" label="Retour aux événements" />
      <PageHeader eyebrow="ÉVÉNEMENT" title={evenement.titre} subtitle={evenement.date} />

      {evenement.description && (
        <div className="cut-corners-sm max-w-xl bg-paper p-6 shadow-[4px_4px_0_var(--color-ink)]">
          <p className="text-ink/80">{evenement.description}</p>
        </div>
      )}
    </div>
  );
}
