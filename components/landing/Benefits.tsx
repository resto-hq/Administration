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
    <section className="bg-canvas-alt py-24 px-6">
      <h2 className="text-3xl font-bold text-secondary text-center mb-12">
        Pourquoi Resto
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {BENEFITS.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 space-y-3"
          >
            <h3 className="font-semibold text-secondary text-lg">{benefit.title}</h3>
            <p className="text-secondary/70 text-sm">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
