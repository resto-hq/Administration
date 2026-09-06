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
      <div className="cut-corners w-full max-w-md bg-paper p-6 shadow-[6px_6px_0_var(--color-ink)] sm:p-8">
        <p className="text-xs font-semibold tracking-[0.3em] text-primary-dark">
          VÉRIFICATION D&apos;IDENTITÉ
        </p>
        <h2 className="text-stamp mt-1 text-xl text-ink">
          {status === "pending" ? "Dossier en cours de revue" : "Dossier rejeté"}
        </h2>
        <p className="mt-2 text-sm text-ink/70">
          {status === "pending"
            ? "On revient vers toi dès qu'un admin a traité ton dossier. En attendant, tu peux consulter ton dashboard, mais la création de restaurant reste bloquée."
            : "Ton dossier a été rejeté — tu peux le corriger et le soumettre à nouveau. En attendant, la création de restaurant reste bloquée."}
        </p>
        {status === "rejected" && rejectionReason && (
          <p className="mt-3 cut-corners-sm bg-primary/10 p-3 text-sm text-primary-dark">
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
