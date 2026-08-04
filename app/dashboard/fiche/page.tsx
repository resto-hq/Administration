"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import FormField from "@/components/auth/FormField";
import FileDrop from "@/components/dashboard/FileDrop";
import StampButton from "@/components/StampButton";

export default function FichePage() {
  return (
    <div>
      <PageHeader
        eyebrow="TON RESTO"
        title="Ma fiche"
        subtitle="Ce que voient les gourmets de Lomé quand ils te découvrent."
      />

      <form
        onSubmit={(event) => event.preventDefault()}
        className="max-w-2xl space-y-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Nom du restaurant" id="fiche-nom" defaultValue="Chez Ama" />
          <FormField label="Quartier" id="fiche-quartier" defaultValue="Tokoin" />
        </div>

        <div>
          <label htmlFor="fiche-description" className="mb-1.5 block text-sm font-semibold text-ink">
            Description
          </label>
          <textarea
            id="fiche-description"
            rows={3}
            defaultValue="Cuisine togolaise maison, grillades et jus locaux, à deux pas du marché de Tokoin."
            className="cut-corners-sm w-full border border-ink/15 bg-paper-alt px-4 py-3 text-ink outline-none placeholder:text-ink/35 focus:border-primary focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Horaires" id="fiche-horaires" defaultValue="Lun–Dim, 11h–22h" />
          <FormField label="Spécialités" id="fiche-specialites" defaultValue="Akpan, riz sauce arachide" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FileDrop id="photo-1" label="Photo principale" />
          <FileDrop id="photo-2" label="Photo secondaire" />
        </div>

        <StampButton type="submit">Enregistrer ma fiche</StampButton>
      </form>
    </div>
  );
}
