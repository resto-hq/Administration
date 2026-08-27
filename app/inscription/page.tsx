"use client";

import { type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import FormField from "@/components/auth/FormField";
import StampButton from "@/components/StampButton";
import { useRegister } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/api-error";

export default function InscriptionPage() {
  const router = useRouter();
  const register = useRegister();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    register.mutate(
      {
        username: String(form.get("username") ?? ""),
        first_name: String(form.get("first_name") ?? ""),
        last_name: String(form.get("last_name") ?? ""),
        phone: String(form.get("phone") ?? ""),
        email: String(form.get("email") ?? ""),
        password: String(form.get("password") ?? ""),
      },
      { onSuccess: () => router.push("/dashboard") }
    );
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
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Prénom" id="first_name" placeholder="Ama" required />
          <FormField label="Nom" id="last_name" placeholder="Kokou" required />
        </div>
        <FormField
          label="Nom d'utilisateur"
          id="username"
          placeholder="ama.kokou"
          required
          minLength={3}
        />
        <FormField
          label="Numéro de téléphone"
          id="phone"
          type="tel"
          placeholder="90 00 00 00"
          required
        />
        <FormField label="Email" id="email" type="email" placeholder="toi@resto.com" required />
        <FormField
          label="Mot de passe"
          id="password"
          type="password"
          placeholder="••••••••"
          required
          minLength={8}
        />

        {register.isError && (
          <p className="text-sm font-semibold text-primary-dark">
            {getApiErrorMessage(register.error, "Impossible de créer le compte.")}
          </p>
        )}

        <StampButton type="submit" disabled={register.isPending} className="w-full">
          {register.isPending ? "Création en cours…" : "Créer mon compte restaurateur"}
        </StampButton>
      </form>
    </AuthLayout>
  );
}
