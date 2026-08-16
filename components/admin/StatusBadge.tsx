import type { RestaurantStatus } from "@/lib/mockData";

const STYLES: Record<RestaurantStatus, string> = {
  "non soumis": "bg-ink/10 text-ink/60",
  "validé": "bg-ink text-paper",
  "en attente": "bg-mustard/40 text-ink",
  "rejeté": "bg-primary/15 text-primary-dark",
};

export default function StatusBadge({ status }: { status: RestaurantStatus }) {
  return (
    <span className={`cut-corners-sm shrink-0 px-3 py-1 text-xs font-semibold ${STYLES[status]}`}>
      {status}
    </span>
  );
}
