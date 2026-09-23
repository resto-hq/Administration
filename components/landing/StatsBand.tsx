import { neighborhoods, totalFieldAgents, totalRestaurantsCollected } from "@/lib/mock-landing";

export default function StatsBand() {
  const stats = [
    { value: String(totalRestaurantsCollected), label: "restaurants déjà collectés à Lomé" },
    { value: String(neighborhoods.length), label: "quartiers de Lomé couverts" },
    { value: String(totalFieldAgents), label: "agents sur le terrain" },
    { value: "Mars 2027", label: "sortie de l'application" },
  ];

  return (
    <div className="border-b border-ink/5 bg-paper-alt px-6 py-10 md:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl font-bold text-primary-dark">{stat.value}</p>
            <p className="mt-1 text-sm text-ink/60">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
