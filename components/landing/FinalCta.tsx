"use client";

import { useState } from "react";

export default function FinalCta() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="prevenir" className="bg-primary px-6 py-20 md:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-4xl font-bold text-white">Sois là le jour du lancement</h2>
          <p className="mt-3 text-white/85">
            Laisse ton numéro. On te prévient dès que l&apos;application est disponible, et rien d&apos;autre.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-xl">
          {submitted ? (
            <p className="py-6 text-center font-semibold text-ink">
              Merci ! On te préviendra dès l&apos;ouverture.
            </p>
          ) : (
            <form
              className="space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-3">
                <span className="text-sm font-semibold text-ink/50">+228</span>
                <input
                  type="tel"
                  required
                  placeholder="90 00 00 00"
                  className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink/35"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-dark"
              >
                Me prévenir
              </button>
              <p className="text-xs text-ink/50">
                Un seul message, au lancement. Pas de publicité, pas de revente de ton numéro.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
