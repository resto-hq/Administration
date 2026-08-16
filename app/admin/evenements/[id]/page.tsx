"use client";

import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import BackLink from "@/components/dashboard/BackLink";
import StampButton from "@/components/StampButton";
import { useEventsAdmin } from "@/lib/events-admin-store";

export default function AdminEvenementDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getEvenement, remove } = useEventsAdmin();

  const evenement = getEvenement(params.id);

  if (!evenement) {
    return (
      <div>
        <BackLink href="/admin/evenements" label="Retour aux événements" />
        <PageHeader eyebrow="MODÉRATION" title="Événement introuvable" />
        <p className="text-sm text-ink/70">
          Cet événement n&apos;existe plus ou a déjà été retiré.
        </p>
      </div>
    );
  }

  return (
    <div>
      <BackLink href="/admin/evenements" label="Retour aux événements" />
      <PageHeader eyebrow={evenement.resto.toUpperCase()} title={evenement.titre} subtitle={evenement.date} />

      <div className="cut-corners-sm max-w-xl space-y-4 bg-paper p-6 shadow-[4px_4px_0_var(--color-ink)]">
        {evenement.description && <p className="text-ink/80">{evenement.description}</p>}

        <StampButton
          type="button"
          variant="ink"
          onClick={() => {
            remove(evenement.id);
            router.push("/admin/evenements");
          }}
        >
          Retirer cet événement
        </StampButton>
      </div>
    </div>
  );
}
