"use client";

import { motion } from "framer-motion";

const BENEFITS = [
  {
    title: "Visibilité locale",
    description:
      "Ta fiche resto visible par les gourmets de Lomé, avec photos, menu et horaires à jour.",
  },
  {
    title: "Avis & réservations",
    description:
      "Récolte des avis vérifiés et reçois des demandes de réservation directement.",
  },
  {
    title: "Événements gastronomiques",
    description:
      "Annonce tes soirées, dégustations et événements auprès d'une audience déjà là pour manger.",
  },
  {
    title: "Tableau de bord simple",
    description:
      "Gère ta fiche, tes photos et tes stats depuis un seul endroit, sans prise de tête.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-paper-alt py-24 px-6">
      <p className="text-center text-xs font-semibold tracking-[0.3em] text-primary-dark">
        POURQUOI RESTO
      </p>
      <h2 className="text-stamp mt-3 text-center text-3xl text-ink md:text-4xl">
        Ce que tu gagnes en rejoignant Resto
      </h2>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -4 : 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
            whileHover={{ rotate: 0, y: -4 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: "backOut" }}
            className="relative cut-corners-sm bg-paper p-6 pt-8 shadow-[5px_5px_0_var(--color-ink)]"
          >
            <span
              aria-hidden
              className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-paper-alt"
            />
            <span
              aria-hidden
              className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-paper-alt"
            />
            <h3 className="text-stamp text-lg text-ink">{benefit.title}</h3>
            <p className="mt-2 text-sm text-ink/70">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
