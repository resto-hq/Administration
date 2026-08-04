"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Inscris-toi",
    description:
      "Crée ton compte et complète ton dossier KYB (pièce d'identité, licence commerciale).",
    rotate: -6,
  },
  {
    number: "02",
    title: "Configure ta fiche",
    description: "Ajoute tes photos, ton menu, tes horaires et tes spécialités.",
    rotate: 4,
  },
  {
    number: "03",
    title: "Sois visible",
    description:
      "Une fois validée, ta fiche apparaît sur Resto auprès des utilisateurs autour de toi.",
    rotate: -3,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-canvas bg-grain py-24 px-6">
      <p className="text-center text-xs font-semibold tracking-[0.3em] text-primary-dark">
        COMMENT ÇA MARCHE
      </p>
      <h2 className="text-stamp mt-3 text-center text-3xl text-ink md:text-4xl">
        Trois étapes, et te voilà référencé
      </h2>

      <div className="relative mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-14 md:grid-cols-3 md:gap-8">
        <div
          aria-hidden
          className="absolute left-0 right-0 top-8 hidden border-t-2 border-dashed border-ink/20 md:block"
        />
        {STEPS.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            className="relative text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: step.rotate * 2 }}
              whileInView={{ scale: 1, rotate: step.rotate }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: index * 0.15 + 0.1, ease: "backOut" }}
              className="cut-corners-sm relative z-10 mx-auto mb-5 flex h-16 w-16 items-center justify-center bg-primary text-lg font-bold text-paper shadow-[4px_4px_0_var(--color-ink)]"
            >
              {step.number}
            </motion.div>
            <h3 className="text-stamp text-lg text-ink">{step.title}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm text-ink/70">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
