"use client";

import { useState } from "react";
import FormField from "@/components/auth/FormField";
import FileDrop from "@/components/dashboard/FileDrop";
import StampButton from "@/components/StampButton";
import { useRestaurants } from "@/lib/restaurants-store";
import type { Restaurant } from "@/lib/mockData";

const STEPS = ["Informations légales", "Pièce d'identité", "Licence commerciale", "Récapitulatif"];

export default function VerificationTab({ restaurant }: { restaurant: Restaurant }) {
  const { submitKyb, resetKyb } = useRestaurants();
  const [step, setStep] = useState(0);
  const [wizardOpen, setWizardOpen] = useState(restaurant.statut === "non soumis");
  const [raisonSociale, setRaisonSociale] = useState(restaurant.raisonSociale ?? "");
  const [rccm, setRccm] = useState(restaurant.rccm ?? "");

  if (restaurant.statut === "validé") {
    return (
      <div className="cut-corners max-w-lg bg-paper p-6 shadow-[5px_5px_0_var(--color-ink)]">
        <p className="text-stamp text-ink">Restaurant vérifié</p>
        <p className="mt-2 text-sm text-ink/70">
          Ce restaurant est validé et visible publiquement sur Resto.
        </p>
      </div>
    );
  }

  if (!wizardOpen && restaurant.statut === "en attente") {
    return (
      <div className="cut-corners max-w-lg bg-paper p-6 shadow-[5px_5px_0_var(--color-ink)]">
        <p className="text-stamp text-ink">En cours de vérification</p>
        <p className="mt-2 text-sm text-ink/70">
          On revient vers toi sous 48h. La fiche de ce restaurant reste privée jusqu&apos;à
          validation.
        </p>
      </div>
    );
  }

  if (!wizardOpen && restaurant.statut === "rejeté") {
    return (
      <div className="cut-corners max-w-lg bg-paper p-6 shadow-[5px_5px_0_var(--color-ink)]">
        <p className="text-stamp text-ink">Dossier rejeté</p>
        <p className="mt-2 text-sm text-ink/70">
          Le dossier KYB de ce restaurant a été rejeté. Vérifie tes documents et resoumets-le.
        </p>
        <StampButton
          type="button"
          className="mt-4"
          onClick={() => {
            resetKyb(restaurant.id);
            setStep(0);
            setWizardOpen(true);
          }}
        >
          Resoumettre le dossier
        </StampButton>
      </div>
    );
  }

  return (
    <div>
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
            <FormField
              label="Raison sociale"
              id="raison-sociale"
              placeholder="Chez Ama SARL"
              value={raisonSociale}
              onChange={(event) => setRaisonSociale(event.target.value)}
            />
            <FormField
              label="Numéro RCCM"
              id="rccm"
              placeholder="TG-LOM-2024-B-0000"
              value={rccm}
              onChange={(event) => setRccm(event.target.value)}
            />
          </>
        )}
        {step === 1 && <FileDrop id="piece-identite" label="Pièce d'identité (CNI ou passeport)" />}
        {step === 2 && <FileDrop id="licence-commerciale" label="Licence commerciale" />}
        {step === 3 && (
          <p className="text-sm text-ink/70">
            Vérifie que tes documents sont lisibles, puis envoie ce dossier. Tu pourras suivre
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
            <StampButton
              type="button"
              onClick={() => {
                submitKyb(restaurant.id, { raisonSociale, rccm });
                setWizardOpen(false);
              }}
            >
              Envoyer ce dossier
            </StampButton>
          )}
        </div>
      </div>
    </div>
  );
}
