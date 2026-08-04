"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import FormField from "@/components/auth/FormField";
import StampButton from "@/components/StampButton";

const QUARTIERS_LOME = [
  "Bè",
  "Tokoin",
  "Adidogomé",
  "Agoè",
  "Kodjoviakopé",
  "Nyékonakpoè",
  "Hanoukopé",
  "Djidjolé",
];

export default function InscriptionPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => router.push("/dashboard"), 700);
  }

  return (
    <AuthLayout
      eyebrow="RESTAURATEUR"
      title="Crée ton compte"
      footer={
        <>
          Déjà un compte ?{" "}
          <Link href="/connexion" className="font-semibold text-ink hover:text-primary">
            Connecte-toi
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField label="Nom du restaurant" id="nom" type="text" placeholder="Chez Ama" required />
        <FormField
          label="Numéro de téléphone"
          id="numero"
          type="tel"
          placeholder="90 00 00 00"
          required
        />
        <FormField label="Email" id="email" type="email" placeholder="toi@resto.com" required />
        <FormField label="Mot de passe" id="password" type="password" placeholder="••••••••" required minLength={8} />
        <div>
          <FormField
            label="Quartier à Lomé"
            id="lieu"
            type="text"
            list="quartiers-lome"
            placeholder="Tokoin"
            required
          />
          <datalist id="quartiers-lome">
            {QUARTIERS_LOME.map((quartier) => (
              <option key={quartier} value={quartier} />
            ))}
          </datalist>
        </div>

        <StampButton type="submit" disabled={submitting} className="w-full">
          {submitting ? "Création en cours…" : "Créer mon compte restaurateur"}
        </StampButton>
      </form>
    </AuthLayout>
  );
}
