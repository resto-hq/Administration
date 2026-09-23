const PINS = [
  { top: "62%", left: "22%" },
  { top: "38%", left: "55%" },
  { top: "70%", left: "80%" },
];

const POINTS = [
  "Les restaurants les plus proches de ta position",
  "Les événements du jour, filtrés par date",
  "L'itinéraire direct vers l'adresse",
];

export default function MapShowcase() {
  return (
    <section className="bg-white px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">Tu es déjà dehors ? Regarde autour de toi</h2>
        <p className="mt-2 text-ink/60">
          Tous les restaurants référencés, posés sur la carte de Lomé, avec l&apos;itinéraire en un clic.
        </p>

        <div
          className="relative mt-8 h-96 overflow-hidden rounded-2xl bg-surface"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(26,22,19,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,22,19,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        >
          {PINS.map((pin, index) => (
            <span
              key={index}
              className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-full items-center justify-center rounded-full rounded-bl-none bg-primary text-white shadow-lg"
              style={{ top: pin.top, left: pin.left, transform: "translate(-50%, -100%) rotate(45deg)" }}
            >
              <span className="h-2 w-2 rounded-full bg-white" style={{ transform: "rotate(-45deg)" }} />
            </span>
          ))}
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {POINTS.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm text-ink/70">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
