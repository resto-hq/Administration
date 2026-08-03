"use client";

import { useState, type FormEvent } from "react";

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
    <section id="waitlist" className="py-24 px-6 bg-secondary text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Prêt à faire connaître ton resto ?</h2>
      <p className="text-white/70 max-w-md mx-auto mb-8">
        Laisse ton email, on te contacte dès l'ouverture des inscriptions
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
            className="flex-1 rounded-full px-5 py-3 text-secondary bg-white outline-none"
          />
          <button
            type="submit"
            className="bg-primary text-white font-semibold rounded-full px-6 py-3 hover:opacity-90 transition-opacity"
          >
            Rejoindre la liste d'attente
          </button>
        </form>
      )}
    </section>
  );
}
