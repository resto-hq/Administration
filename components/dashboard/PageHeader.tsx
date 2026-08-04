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
      <p className="text-xs font-semibold tracking-[0.3em] text-primary-dark">{eyebrow}</p>
      <h1 className="text-stamp mt-1 text-2xl text-ink sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-xl text-sm text-ink/70">{subtitle}</p>}
    </div>
  );
}
