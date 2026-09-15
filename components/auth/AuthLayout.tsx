import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  eyebrow,
  title,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-app-bg px-6 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex justify-center">
          <Image src="/logo-mark.png" alt="Resto" width={160} height={54} className="h-9 w-auto" />
        </Link>

        <div className="rounded-2xl border border-border bg-panel p-8 sm:p-10">
          <p className="text-center text-xs font-semibold tracking-wide text-ink/45 uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-center text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {title}
          </h1>

          <div className="mt-8">{children}</div>
        </div>

        <p className="mt-6 text-center text-sm text-ink/70">{footer}</p>
      </div>
    </main>
  );
}
