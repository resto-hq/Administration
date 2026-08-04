import PageHeader from "@/components/dashboard/PageHeader";

const RESERVATIONS = [
  { nom: "Sena K.", personnes: 4, date: "Ven. 7 août, 20h00", statut: "En attente" },
  { nom: "Elom T.", personnes: 2, date: "Sam. 8 août, 13h00", statut: "Confirmée" },
];

export default function ReservationsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="TABLES"
        title="Réservations"
        subtitle="Les demandes de réservation reçues via ta fiche Resto."
      />

      <div className="max-w-2xl space-y-4">
        {RESERVATIONS.map((r) => (
          <div
            key={r.nom + r.date}
            className="cut-corners-sm flex items-center justify-between gap-4 bg-paper p-5 shadow-[4px_4px_0_var(--color-ink)]"
          >
            <div>
              <p className="font-semibold text-ink">{r.nom}</p>
              <p className="text-sm text-ink/70">
                {r.personnes} pers. · {r.date}
              </p>
            </div>
            <span
              className={`cut-corners-sm shrink-0 px-3 py-1 text-xs font-semibold ${
                r.statut === "Confirmée" ? "bg-ink text-paper" : "bg-mustard/40 text-ink"
              }`}
            >
              {r.statut}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
