"use client";

import { useRouter } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import PersonKycForm from "@/components/dashboard/PersonKycForm";
import { useKycStatus } from "@/hooks/useKyc";

export default function VerificationIdentitePage() {
  const router = useRouter();
  const { data: kycStatus, isPending } = useKycStatus();

  if (isPending) {
    return <p className="text-sm text-ink/60">Chargement…</p>;
  }

  const status = kycStatus?.person_kyc.status ?? "not_submitted";

  return (
    <div>
      <PageHeader
        eyebrow="COMPTE"
        title="Vérification d'identité"
        subtitle="Nécessaire pour créer un restaurant sur Resto."
      />

      {status === "approved" && (
        <div className="cut-corners max-w-lg bg-paper p-6 shadow-[5px_5px_0_var(--color-ink)]">
          <p className="text-stamp text-ink">Identité vérifiée ✓</p>
          <p className="mt-2 text-sm text-ink/70">
            Tu peux créer et gérer tes restaurants librement.
          </p>
        </div>
      )}

      {status === "pending" && (
        <div className="cut-corners max-w-lg bg-paper p-6 shadow-[5px_5px_0_var(--color-ink)]">
          <p className="text-stamp text-ink">Dossier en cours de revue</p>
          <p className="mt-2 text-sm text-ink/70">
            On revient vers toi dès qu&apos;un admin a traité ton dossier.
          </p>
        </div>
      )}

      {(status === "not_submitted" || status === "rejected") && (
        <div className="max-w-lg space-y-4">
          {status === "rejected" && kycStatus?.person_kyc.rejection_reason && (
            <p className="cut-corners-sm bg-primary/10 p-4 text-sm text-primary-dark">
              Dossier rejeté : {kycStatus.person_kyc.rejection_reason}
            </p>
          )}
          <div className="cut-corners bg-paper p-6 shadow-[5px_5px_0_var(--color-ink)]">
            <PersonKycForm onSuccess={() => router.push("/dashboard")} />
          </div>
        </div>
      )}
    </div>
  );
}
