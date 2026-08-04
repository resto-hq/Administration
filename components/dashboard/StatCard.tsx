export default function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="cut-corners-sm bg-paper p-5 shadow-[4px_4px_0_var(--color-ink)]">
      <p className="text-xs font-semibold tracking-wide text-ink/60">{label}</p>
      <p className="text-stamp mt-2 text-3xl text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-primary-dark">{hint}</p>}
    </div>
  );
}
