const STYLES: Record<string, string> = {
  draft: "bg-ink/10 text-ink/60",
  pending: "bg-mustard/40 text-ink",
  approved: "bg-ink text-paper",
  published: "bg-ink text-paper",
  rejected: "bg-primary/15 text-primary-dark",
  ended: "bg-ink/10 text-ink/60",
};

const LABELS: Record<string, string> = {
  draft: "brouillon",
  pending: "en attente",
  approved: "validé",
  published: "publié",
  rejected: "rejeté",
  ended: "terminé",
};

export default function RequestStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`cut-corners-sm shrink-0 px-3 py-1 text-xs font-semibold ${
        STYLES[status] ?? "bg-ink/10 text-ink/60"
      }`}
    >
      {LABELS[status] ?? status}
    </span>
  );
}
