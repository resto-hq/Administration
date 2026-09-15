export default function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <p className="text-xs font-semibold tracking-wide text-ink/50">{label}</p>
      <p className="mt-3 text-3xl font-bold tracking-tight text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink/45">{hint}</p>}
    </div>
  );
}
