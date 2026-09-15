"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StampButton from "@/components/StampButton";
import { hasSeenApprovedModal, markApprovedModalSeen } from "@/lib/kyc-onboarding";

export default function KycApprovedModal() {
  const router = useRouter();
  // Only ever mounts client-side once kycStatus/restaurants have resolved (the
  // server-rendered pass always shows the loading spinner instead), so this
  // initializer is safe — no hydration mismatch.
  const [open, setOpen] = useState(() => !hasSeenApprovedModal());

  if (!open) return null;

  function close() {
    markApprovedModalSeen();
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-panel p-6 sm:p-8">
        <p className="text-xs font-semibold tracking-wide text-ink/45 uppercase">
          Vérification d&apos;identité
        </p>
        <h2 className="mt-1 text-xl font-bold text-ink">Identité vérifiée ✓</h2>
        <p className="mt-2 text-sm text-ink/70">
          Tu peux maintenant créer ton restaurant. Le formulaire est un peu long — tu peux
          t&apos;arrêter à tout moment et reprendre plus tard, ton brouillon reste enregistré.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <StampButton
            type="button"
            className="flex-1"
            onClick={() => {
              close();
              router.push("/dashboard/restaurants/nouveau");
            }}
          >
            Continuer
          </StampButton>
          <StampButton type="button" variant="ink" className="flex-1" onClick={close}>
            Plus tard
          </StampButton>
        </div>
      </div>
    </div>
  );
}
