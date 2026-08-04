import PageHeader from "@/components/dashboard/PageHeader";

const AVIS = [
  { auteur: "Kossi A.", note: 5, texte: "Le riz sauce arachide est excellent, service rapide." },
  { auteur: "Afi D.", note: 4, texte: "Bonne ambiance, un peu bruyant le week-end." },
  { auteur: "Yao M.", note: 5, texte: "Mon maquis préféré à Tokoin, j'y retourne chaque semaine." },
];

export default function AvisPage() {
  return (
    <div>
      <PageHeader
        eyebrow="RÉPUTATION"
        title="Avis"
        subtitle="Les retours des gourmets qui sont passés chez toi."
      />

      <div className="max-w-2xl space-y-4">
        {AVIS.map((avis) => (
          <div key={avis.auteur} className="cut-corners-sm bg-paper p-5 shadow-[4px_4px_0_var(--color-ink)]">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-ink">{avis.auteur}</p>
              <p className="text-primary-dark">{"★".repeat(avis.note)}{"☆".repeat(5 - avis.note)}</p>
            </div>
            <p className="mt-2 text-sm text-ink/70">{avis.texte}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
