import PageHeader from "@/components/dashboard/PageHeader";
import StampButton from "@/components/StampButton";

const EVENEMENTS = [
  { titre: "Soirée dégustation vins locaux", date: "Jeu. 13 août" },
];

export default function EvenementsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="ANIMATION"
        title="Événements"
        subtitle="Annonce tes soirées et dégustations auprès des gourmets déjà là pour manger."
      />

      <div className="max-w-2xl space-y-4">
        {EVENEMENTS.map((e) => (
          <div key={e.titre} className="cut-corners-sm bg-paper p-5 shadow-[4px_4px_0_var(--color-ink)]">
            <p className="font-semibold text-ink">{e.titre}</p>
            <p className="mt-1 text-sm text-ink/70">{e.date}</p>
          </div>
        ))}

        <StampButton type="button">+ Publier un événement</StampButton>
      </div>
    </div>
  );
}
