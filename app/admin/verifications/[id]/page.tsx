"use client";

import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import BackLink from "@/components/dashboard/BackLink";
import StampButton from "@/components/StampButton";
import { useKyb } from "@/lib/kyb-store";

export default function AdminVerificationDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getDossier, decide } = useKyb();

  const dossier = getDossier(params.id);

  if (!dossier) {
    return (
      <div>
        <BackLink href="/admin/verifications" label="Retour aux vérifications" />
        <PageHeader eyebrow="MODÉRATION" title="Dossier introuvable" />
        <p className="text-sm text-ink/70">
          Ce dossier n&apos;est plus en attente — il a déjà été traité.
        </p>
      </div>
    );
  }

  function handleDecide(decision: "approuvé" | "rejeté") {
    decide(dossier!.id, decision);
    router.push("/admin/verifications");
  }

  return (
    <div>
      <BackLink href="/admin/verifications" label="Retour aux vérifications" />
      <PageHeader eyebrow={dossier.quartier.toUpperCase()} title={dossier.nom} />

      <div className="cut-corners-sm max-w-xl space-y-3 bg-paper p-6 shadow-[4px_4px_0_var(--color-ink)]">
        <p className="text-xs text-ink/50">Envoyé le {dossier.soumis}</p>
        <div>
          <p className="text-xs font-semibold tracking-wide text-ink/50">RCCM</p>
          <p className="text-ink/80">{dossier.rccm}</p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-ink/50">Téléphone</p>
          <p className="text-ink/80">{dossier.telephone}</p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-ink/50">Email</p>
          <p className="text-ink/80">{dossier.email}</p>
        </div>

        <div className="flex gap-3 pt-2">
          <StampButton type="button" onClick={() => handleDecide("approuvé")}>
            Approuver
          </StampButton>
          <StampButton type="button" variant="ink" onClick={() => handleDecide("rejeté")}>
            Rejeter
          </StampButton>
        </div>
      </div>
    </div>
  );
}
