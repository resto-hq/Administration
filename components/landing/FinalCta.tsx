"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";

export default function FinalCta() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) {
      return;
    }
    setSubmitted(true);
  }

  return (
    <section id="waitlist" className="py-24 px-6 bg-ink text-paper text-center">
      <Image
        src="/logo-mark.png"
        alt="Resto"
        width={160}
        height={54}
        className="mx-auto mb-8 h-10 w-auto"
      />
      <h2 className="text-stamp text-3xl md:text-4xl mb-4">
        Prêt à faire connaître ton resto ?
      </h2>
      <p className="text-paper/70 max-w-md mx-auto mb-8">
        Laisse ton email, on te contacte dès l&apos;ouverture des inscriptions
        restaurateurs.
      </p>
      {submitted ? (
        <p className="text-primary font-semibold">
          Merci ! On te recontacte très vite.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="ton@email.com"
            className="cut-corners-sm flex-1 px-5 py-3 text-ink bg-paper outline-none placeholder:text-ink/40"
          />
          <button
            type="submit"
            className="cut-corners-sm bg-primary text-paper font-semibold px-6 py-3 shadow-[5px_5px_0_var(--color-mustard)] transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--color-mustard)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_var(--color-mustard)]"
          >
            Rejoindre la liste d&apos;attente
          </button>
        </form>
      )}
    </section>
  );
}
