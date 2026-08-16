import { notFound } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import BackLink from "@/components/dashboard/BackLink";
import { AVIS } from "@/lib/mockData";

export default async function AvisDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const avis = AVIS.find((a) => a.id === id);
  if (!avis) notFound();

  return (
    <div>
      <BackLink href="/dashboard/avis" label="Retour aux avis" />
      <PageHeader eyebrow={avis.restoNom.toUpperCase()} title={avis.auteur} />

      <div className="cut-corners-sm max-w-xl bg-paper p-6 shadow-[4px_4px_0_var(--color-ink)]">
        <p className="text-lg text-primary-dark">
          {"★".repeat(avis.note)}
          {"☆".repeat(5 - avis.note)}
        </p>
        <p className="mt-4 text-ink/80">{avis.texte}</p>
        <p className="mt-4 text-xs font-semibold tracking-wide text-ink/50">{avis.restoNom}</p>
      </div>
    </div>
  );
}
