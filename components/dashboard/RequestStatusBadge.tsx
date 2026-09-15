const STYLES: Record<string, string> = {
  draft: "bg-ink/8 text-ink/55",
  pending: "bg-mustard/20 text-[#8A6A00]",
  approved: "bg-success-soft text-success",
  published: "bg-success-soft text-success",
  rejected: "bg-danger-ui-soft text-danger-ui",
  ended: "bg-ink/8 text-ink/55",
  active: "bg-success-soft text-success",
  suspended: "bg-danger-ui-soft text-danger-ui",
  resolved: "bg-success-soft text-success",
  dismissed: "bg-ink/8 text-ink/55",
};

const LABELS: Record<string, string> = {
  draft: "brouillon",
  pending: "en attente",
  approved: "validé",
  published: "publié",
  rejected: "rejeté",
  ended: "terminé",
  active: "actif",
  suspended: "suspendu",
  resolved: "résolu",
  dismissed: "rejeté",
};

export default function RequestStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold before:h-1.5 before:w-1.5 before:rounded-full before:bg-current before:content-[''] ${
        STYLES[status] ?? "bg-ink/8 text-ink/55"
      }`}
    >
      {LABELS[status] ?? status}
    </span>
  );
}
