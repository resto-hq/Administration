"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import FormField from "@/components/auth/FormField";
import FileDrop from "@/components/dashboard/FileDrop";
import StampButton from "@/components/StampButton";

const STEPS = ["Informations légales", "Pièce d'identité", "Licence commerciale", "Récapitulatif"];

export default function VerificationPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div>
        <PageHeader eyebrow="VÉRIFICATION" title="Dossier envoyé" />
        <div className="cut-corners max-w-lg bg-paper p-6 shadow-[5px_5px_0_var(--color-ink)]">
          <p className="text-stamp text-ink">En cours de vérification</p>
          <p className="mt-2 text-sm text-ink/70">
            On revient vers toi sous 48h. Ta fiche restera privée jusqu&apos;à validation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="VÉRIFICATION"
        title="Valide ton restaurant (KYB)"
        subtitle="Quatre étapes pour confirmer que ton établissement est bien réel."
      />

      <div className="mb-10 flex items-center gap-2 overflow-x-auto pb-2">
        {STEPS.map((label, index) => (
          <div key={label} className="flex shrink-0 items-center gap-2">
            <div
              className={`cut-corners-sm flex h-9 w-9 items-center justify-center text-sm font-bold shrink-0 ${
                index < step
                  ? "bg-ink text-paper"
                  : index === step
                    ? "bg-primary text-paper"
                    : "bg-paper-alt text-ink/40"
              }`}
            >
              {index + 1}
            </div>
            <span className={`text-xs font-semibold ${index === step ? "text-ink" : "text-ink/40"}`}>
              {label}
            </span>
            {index < STEPS.length - 1 && <div className="h-px w-8 bg-ink/15" />}
          </div>
        ))}
      </div>

      <div className="max-w-lg space-y-5">
        {step === 0 && (
          <>
            <FormField label="Raison sociale" id="raison-sociale" placeholder="Chez Ama SARL" />
            <FormField label="Numéro RCCM" id="rccm" placeholder="TG-LOM-2024-B-0000" />
          </>
        )}
        {step === 1 && <FileDrop id="piece-identite" label="Pièce d'identité (CNI ou passeport)" />}
        {step === 2 && <FileDrop id="licence-commerciale" label="Licence commerciale" />}
        {step === 3 && (
          <p className="text-sm text-ink/70">
            Vérifie que tes documents sont lisibles, puis envoie ton dossier. Tu pourras suivre
            son statut ici.
          </p>
        )}

        <div className="flex gap-3 pt-2">
          {step > 0 && (
            <StampButton type="button" variant="ink" onClick={() => setStep((s) => s - 1)}>
              Retour
            </StampButton>
          )}
          {step < STEPS.length - 1 ? (
            <StampButton type="button" onClick={() => setStep((s) => s + 1)}>
              Continuer
            </StampButton>
          ) : (
            <StampButton type="button" onClick={() => setSubmitted(true)}>
              Envoyer mon dossier
            </StampButton>
          )}
        </div>
      </div>
    </div>
  );
}
