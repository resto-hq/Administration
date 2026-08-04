"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import FormField from "@/components/auth/FormField";
import StampButton from "@/components/StampButton";

export default function ConnexionPage() {
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
      title="Content de te revoir"
      footer={
        <>
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-semibold text-ink hover:text-primary">
            Crée-en un
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField label="Email" id="email" type="email" placeholder="toi@resto.com" required />
        <FormField label="Mot de passe" id="password" type="password" placeholder="••••••••" required />

        <StampButton type="submit" disabled={submitting} className="w-full">
          {submitting ? "Connexion…" : "Se connecter"}
        </StampButton>
      </form>
    </AuthLayout>
  );
}
