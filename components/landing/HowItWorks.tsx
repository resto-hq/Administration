const STEPS = [
  {
    title: "Laisse ton numéro",
    description: "On te prévient le jour de la sortie, et tu fais partie des premiers à l'utiliser.",
  },
  {
    title: "Dis ce que tu cherches",
    description: "Un budget, une envie, une ambiance, un quartier. La recherche fait le reste.",
  },
  {
    title: "Pars manger",
    description: "Tu as vu le menu, les prix et les avis. Tu suis l'itinéraire et tu y vas.",
  },
];

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="bg-white px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">Trois étapes, et tu sais où tu manges</h2>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={step.title}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                {index + 1}
              </span>
              <p className="mt-4 font-bold text-ink">{step.title}</p>
              <p className="mt-1 text-sm text-ink/60">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
