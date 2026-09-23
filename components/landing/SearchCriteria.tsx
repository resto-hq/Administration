const CRITERIA = [
  { title: "Type de cuisine", description: "Togolaise, africaine, européenne, asiatique", icon: "🍴" },
  { title: "Type de restaurant", description: "Maquis, gastronomique, fast food", icon: "🏠" },
  { title: "Ambiance", description: "En famille, en amoureux, entre amis, affaires", icon: "❤️" },
  { title: "Budget", description: "La fourchette de prix affichée sur chaque fiche", icon: "💰" },
  { title: "Distance", description: "Le rayon en kilomètres autour de ta position", icon: "📍" },
  { title: "Spécialités", description: "Les trois plats emblématiques de chaque maison", icon: "⭐" },
];

export default function SearchCriteria() {
  return (
    <section className="bg-white px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">Cherche comme tu décides réellement</h2>
        <p className="mt-2 text-ink/60">Pas par nom de restaurant, mais par budget, par envie et par ambiance.</p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CRITERIA.map((item) => (
            <div key={item.title} className="rounded-2xl bg-surface p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-paper-alt text-xl">
                {item.icon}
              </div>
              <p className="mt-4 font-bold text-ink">{item.title}</p>
              <p className="mt-1 text-sm text-ink/60">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
