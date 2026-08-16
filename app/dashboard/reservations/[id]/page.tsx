import { notFound } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import BackLink from "@/components/dashboard/BackLink";
import { RESERVATIONS } from "@/lib/mockData";

export default async function ReservationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reservation = RESERVATIONS.find((r) => r.id === id);
  if (!reservation) notFound();

  return (
    <div>
      <BackLink href="/dashboard/reservations" label="Retour aux réservations" />
      <PageHeader eyebrow={reservation.restoNom.toUpperCase()} title={reservation.nom} />

      <div className="cut-corners-sm max-w-xl space-y-3 bg-paper p-6 shadow-[4px_4px_0_var(--color-ink)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-ink/70">
            {reservation.personnes} pers. · {reservation.date}
          </p>
          <span
            className={`cut-corners-sm px-3 py-1 text-xs font-semibold ${
              reservation.statut === "Confirmée" ? "bg-ink text-paper" : "bg-mustard/40 text-ink"
            }`}
          >
            {reservation.statut}
          </span>
        </div>
        <p className="text-sm text-ink/70">Téléphone : {reservation.telephone}</p>
        <p className="text-xs font-semibold tracking-wide text-ink/50">{reservation.restoNom}</p>
        {reservation.note && (
          <p className="mt-2 border-t border-ink/10 pt-3 text-sm text-ink/80">
            « {reservation.note} »
          </p>
        )}
      </div>
    </div>
  );
}
