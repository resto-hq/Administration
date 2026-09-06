"use client";

import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import RestaurantForm from "@/components/dashboard/RestaurantForm";
import { useKycStatus } from "@/hooks/useKyc";

export default function NouveauRestaurantPage() {
  const { data: kycStatus, isPending } = useKycStatus();
  const isApproved = kycStatus?.person_kyc.status === "approved";

  if (isPending) {
    return <p className="text-sm text-ink/60">Chargement…</p>;
  }

  if (!isApproved) {
    return (
      <div>
        <PageHeader eyebrow="TES ÉTABLISSEMENTS" title="Ajouter un restaurant" />
        <p className="text-sm text-ink/70">
          Vérifie d&apos;abord ton identité pour pouvoir créer un restaurant.{" "}
          <Link href="/dashboard/verification" className="font-semibold text-primary-dark hover:underline">
            Faire ma vérification →
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="TES ÉTABLISSEMENTS"
        title="Ajouter un restaurant"
        subtitle="La fiche part en brouillon — tu la soumettras au dossier de vérification une fois complète."
      />

      <div>
        <RestaurantForm submitLabel="Créer ce restaurant (brouillon)" />
      </div>
    </div>
  );
}
