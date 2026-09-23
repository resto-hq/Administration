import { mockEvents } from "@/lib/mock-landing";
import DemoBadge from "./DemoBadge";
import PlaceholderImage from "./PlaceholderImage";

export default function EventsShowcase() {
  return (
    <section id="evenements" className="bg-surface px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-3xl font-bold text-ink sm:text-4xl">Les rendez-vous gourmands de la ville</h2>
            <p className="mt-2 max-w-xl text-ink/60">
              Soirées, dégustations, ateliers, lives. Tout ce qui se passe dans les restaurants de Lomé, classé
              par date.
            </p>
          </div>
          <DemoBadge />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockEvents.map((event, index) => (
            <div key={event.title} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="relative">
                <PlaceholderImage seed={index + 2} label="" className="h-40 w-full" />
                <div className="absolute top-3 left-3 rounded-lg bg-white px-3 py-1.5 text-center leading-tight shadow">
                  <p className="text-lg font-bold text-ink">{event.day}</p>
                  <p className="text-[10px] font-semibold text-ink/50">{event.month}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="font-bold text-ink">{event.title}</p>
                <p className="mt-1 text-sm text-ink/60">
                  {event.venue} · {event.neighborhood}
                </p>
                <p className="mt-3 text-xs text-ink/45">Billetterie assurée par l&apos;organisateur</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
