export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold tracking-wide text-ink/45 uppercase">{eyebrow}</p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-[28px]">{title}</h1>
      {subtitle && <p className="mt-2 max-w-xl text-sm text-ink/60">{subtitle}</p>}
    </div>
  );
}
