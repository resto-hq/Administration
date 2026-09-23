import PlaceholderImage from "./PlaceholderImage";

const FEATURES = [
  {
    icon: "🖼️",
    title: "Le menu en photos",
    description: "Les plats de la maison photographiés, pas une carte illisible scannée.",
  },
  {
    icon: "💵",
    title: "La fourchette de prix",
    description: "Le minimum et le maximum pratiqués, annoncés avant que tu ne t'assoies.",
  },
  {
    icon: "🕐",
    title: "Les horaires réels",
    description: "Ouverture et fermeture, vérifiées par notre équipe terrain.",
  },
  {
    icon: "➕",
    title: "Les services",
    description: "Livraison, parking, wifi, salle privée, accès mobilité réduite.",
  },
  {
    icon: "💳",
    title: "Les moyens de paiement",
    description: "Espèces, carte, mobile money. Tu sais quoi prévoir.",
  },
];

export default function DetailShowcase() {
  return (
    <section className="bg-surface px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">Tout ce que tu veux savoir avant de sortir</h2>
        <p className="mt-2 text-ink/60">
          Le menu en photos, les prix, les horaires, les services. Plus de mauvaise surprise sur place.
        </p>

        <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-xs overflow-hidden rounded-[2.5rem] border-8 border-ink bg-white shadow-xl">
            <PlaceholderImage seed={0} label="" className="h-56 w-full" />
            <div className="space-y-3 p-5">
              <p className="text-lg font-bold text-ink">Le Palmier Bleu</p>
              <div className="flex gap-1.5">
                <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-ink/70">Togolaise</span>
                <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-ink/70">Maquis</span>
                <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-ink/70">4,6</span>
              </div>
              <div className="h-2.5 w-4/5 rounded-full bg-ink/10" />
              <div className="h-2.5 w-3/5 rounded-full bg-ink/10" />
              <div className="flex gap-1.5 pt-1">
                <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-ink/70">Terrasse</span>
                <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-ink/70">Wi-Fi</span>
                <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-ink/70">Mobile money</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-ink/10" />
              <button
                type="button"
                className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-white"
              >
                Itinéraire
              </button>
            </div>
          </div>

          <ul className="space-y-6">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper-alt text-lg">
                  {feature.icon}
                </span>
                <div>
                  <p className="font-bold text-ink">{feature.title}</p>
                  <p className="mt-1 text-sm text-ink/60">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
