import Link from "next/link";

export default function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-ink/60 hover:text-ink"
    >
      <span aria-hidden>←</span>
      {label}
    </Link>
  );
}
