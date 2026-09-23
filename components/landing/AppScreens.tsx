import PlaceholderImage from "./PlaceholderImage";

const SCREENS = [
  {
    title: "Ce qui bouge aujourd'hui",
    description: "Les restaurants les plus visités et les événements du jour, dès l'ouverture.",
  },
  {
    title: "Ta recherche, tes critères",
    description: "Budget, cuisine, ambiance, distance. Les résultats se réduisent à mesure que tu précises.",
  },
  {
    title: "La fiche complète",
    description: "Menu, prix, horaires, services, avis. Puis l'itinéraire.",
  },
];

export default function AppScreens() {
  return (
    <section className="bg-ink px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">L&apos;application, de l&apos;envie à la table</h2>
        <p className="mt-2 text-white/60">Trois écrans, et tu sais où tu vas manger.</p>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {SCREENS.map((screen, index) => (
            <div key={screen.title} className="text-center">
              <div className="mx-auto w-full max-w-[220px] overflow-hidden rounded-[2rem] border-8 border-white/10 shadow-xl">
                <PlaceholderImage seed={index} label="" className="h-80 w-full" />
                <div className="bg-white p-3">
                  <button type="button" className="w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-white">
                    Voir
                  </button>
                </div>
              </div>
              <p className="mt-5 font-bold text-white">{screen.title}</p>
              <p className="mt-1 text-sm text-white/60">{screen.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
