const FAQ = [
  {
    question: "L'application est-elle gratuite ?",
    answer: "Oui, la recherche et la consultation des fiches restaurant sont gratuites pour tout le monde.",
  },
  {
    question: "Quand sort-elle ?",
    answer: "Le lancement est prévu en mars 2027. Laisse ton numéro pour être prévenu le jour J.",
  },
  {
    question: "Les informations sont-elles fiables ?",
    answer: "Chaque fiche est collectée et vérifiée sur place par notre équipe terrain avant sa mise en ligne.",
  },
  {
    question: "Puis-je réserver ou payer depuis l'application ?",
    answer: "Non — Resto App t'aide à choisir et à t'y rendre. Réservation et paiement restent sur place.",
  },
  {
    question: "Ça ne marche qu'à Lomé ?",
    answer: "Au lancement, oui : Lomé et ses quartiers. D'autres villes du Togo suivront selon la demande.",
  },
];

export default function Faq() {
  return (
    <section className="bg-paper-alt px-6 pb-20 md:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="divide-y divide-ink/10 border-t border-ink/10">
          {FAQ.map((item) => (
            <details key={item.question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                {item.question}
                <span className="shrink-0 text-ink/40 transition-transform group-open:rotate-90">▶</span>
              </summary>
              <p className="mt-2 text-sm text-ink/60">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
