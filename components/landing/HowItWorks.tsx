"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "1",
    title: "Inscris-toi",
    description:
      "Crée ton compte et complète ton dossier KYB (pièce d'identité, licence commerciale).",
  },
  {
    number: "2",
    title: "Configure ta fiche",
    description: "Ajoute tes photos, ton menu, tes horaires et tes spécialités.",
  },
  {
    number: "3",
    title: "Sois visible",
    description:
      "Une fois validée, ta fiche apparaît sur Resto auprès des utilisateurs autour de toi.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-canvas">
      <h2 className="text-3xl font-bold text-secondary text-center mb-12">
        Comment ça marche
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {STEPS.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-primary text-white font-bold flex items-center justify-center mx-auto text-lg">
              {step.number}
            </div>
            <h3 className="font-semibold text-secondary text-lg">{step.title}</h3>
            <p className="text-secondary/70 text-sm">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
