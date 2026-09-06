"use client";

import { useRouter } from "next/navigation";
import StampButton from "@/components/StampButton";
import { markKycIntroSeen } from "@/lib/kyc-onboarding";

export default function PersonKycIntroScreen({ onSkip }: { onSkip: () => void }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas bg-grain px-6">
      <div className="w-full max-w-lg">
        <p className="text-xs font-semibold tracking-[0.3em] text-primary-dark">BIENVENUE</p>
        <h1 className="text-stamp mt-1 text-2xl text-ink sm:text-3xl">Vérifie ton identité</h1>
        <p className="mt-2 text-sm text-ink/70">
          Avant de créer un restaurant, on doit vérifier qui tu es — c&apos;est rapide (nom,
          adresse, une pièce d&apos;identité). Tu peux le faire maintenant, ou plus tard depuis
          ton dashboard : sans ça, tu ne pourras juste rien créer en attendant.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <StampButton
            type="button"
            className="flex-1"
            onClick={() => {
              markKycIntroSeen();
              router.push("/dashboard/verification");
            }}
          >
            Vérifier maintenant
          </StampButton>
          <StampButton
            type="button"
            variant="ink"
            className="flex-1"
            onClick={() => {
              markKycIntroSeen();
              onSkip();
            }}
          >
            Plus tard
          </StampButton>
        </div>
      </div>
    </div>
  );
}
