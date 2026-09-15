"use client";

import { useState } from "react";
import Link from "next/link";
import StampButton from "@/components/StampButton";
import { hasSeenStatusModal, markStatusModalSeen } from "@/lib/kyc-onboarding";

export default function PersonKycStatusModal({
  status,
  rejectionReason,
}: {
  status: "pending" | "rejected";
  rejectionReason?: string | null;
}) {
  // This component only ever mounts client-side, after kycStatus has already
  // resolved (the server-rendered pass always shows the loading spinner
  // instead), so reading sessionStorage in the initializer is safe — no
  // hydration mismatch, and no extra render from doing it in an effect.
  const [open, setOpen] = useState(() => !hasSeenStatusModal(status));

  if (!open) return null;

  function close() {
    markStatusModalSeen(status);
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-panel p-6 sm:p-8">
        <p className="text-xs font-semibold tracking-wide text-ink/45 uppercase">
          Vérification d&apos;identité
        </p>
        <h2 className="mt-1 text-xl font-bold text-ink">
          {status === "pending" ? "Dossier en cours de revue" : "Dossier rejeté"}
        </h2>
        <p className="mt-2 text-sm text-ink/70">
          {status === "pending"
            ? "On revient vers toi dès qu'un admin a traité ton dossier. En attendant, tu peux consulter ton dashboard, mais la création de restaurant reste bloquée."
            : "Ton dossier a été rejeté — tu peux le corriger et le soumettre à nouveau. En attendant, la création de restaurant reste bloquée."}
        </p>
        {status === "rejected" && rejectionReason && (
          <p className="mt-3 rounded-lg bg-danger-ui-soft p-3 text-sm text-danger-ui">
            Motif : {rejectionReason}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {status === "rejected" && (
            <Link href="/dashboard/verification" className="flex-1" onClick={close}>
              <StampButton type="button" className="w-full">
                Voir mon dossier
              </StampButton>
            </Link>
          )}
          <StampButton type="button" variant="ink" className="flex-1" onClick={close}>
            Compris
          </StampButton>
        </div>
      </div>
    </div>
  );
}
