"use client";

import { type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import FormField from "@/components/auth/FormField";
import StampButton from "@/components/StampButton";
import { useLogin } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/api-error";

export default function AdminConnexionPage() {
  const router = useRouter();
  const login = useLogin();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    login.mutate(
      {
        email: String(form.get("email") ?? ""),
        password: String(form.get("password") ?? ""),
      },
      { onSuccess: () => router.push("/admin") }
    );
  }

  return (
    <AuthLayout
      eyebrow="ADMINISTRATION"
      title="Espace administrateur"
      footer={
        <>
          Tu es restaurateur ?{" "}
          <Link href="/connexion" className="font-semibold text-ink hover:text-primary">
            Connecte-toi ici
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField label="Email" id="email" type="email" placeholder="admin@resto.com" required />
        <FormField
          label="Mot de passe"
          id="password"
          type="password"
          placeholder="••••••••"
          required
        />

        {login.isError && (
          <p className="text-sm font-semibold text-primary-dark">
            {getApiErrorMessage(login.error, "Email ou mot de passe incorrect.")}
          </p>
        )}

        <StampButton type="submit" disabled={login.isPending} className="w-full">
          {login.isPending ? "Connexion…" : "Se connecter"}
        </StampButton>
      </form>
    </AuthLayout>
  );
}
