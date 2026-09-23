import { neighborhoods, restaurantFilterChips } from "@/lib/mock-landing";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-20 md:px-10 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 900px 500px at 15% 100%, rgba(255,92,1,0.35), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary">
          {neighborhoods.join(" · ").toUpperCase()}
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
          On mange où ce soir ?
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/70">
          Le menu, les prix, l&apos;ambiance et l&apos;adresse des restaurants de Lomé. Tu choisis
          avant de sortir, plus une fois sur place.
        </p>

        <div className="mt-8 flex flex-col gap-2 rounded-full bg-white p-1.5 shadow-xl sm:flex-row">
          <input
            type="text"
            placeholder="Rechercher un plat, un restaurant ou un quartier"
            className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-3 text-sm text-ink outline-none placeholder:text-ink/40"
          />
          <button
            type="button"
            className="shrink-0 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Rechercher
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {restaurantFilterChips.slice(0, 4).map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80"
            >
              {chip}
            </span>
          ))}
        </div>

        <p className="mt-8 text-sm text-white/60">
          L&apos;application arrive en <span className="font-semibold text-white">mars 2027</span>.{" "}
          <a href="#prevenir" className="font-semibold text-primary underline underline-offset-2">
            Laisse ton numéro
          </a>
          , on te prévient le jour du lancement.
        </p>
      </div>
    </section>
  );
}
