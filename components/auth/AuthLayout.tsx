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
    <main className="relative flex min-h-screen items-center justify-center bg-canvas bg-grain px-6 py-16">
      <div
        aria-hidden
        className="absolute -top-24 -right-24 h-72 w-72 rotate-12 bg-mustard/25 cut-corners"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-24 h-72 w-72 -rotate-6 bg-primary/10 cut-corners"
      />

      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-8 flex justify-center">
          <Image src="/logo-mark.png" alt="Resto" width={160} height={54} className="h-9 w-auto" />
        </Link>

        <div className="cut-corners bg-paper p-8 shadow-[8px_8px_0_var(--color-ink)] sm:p-10">
          <p className="text-center text-xs font-semibold tracking-[0.3em] text-primary-dark">
            {eyebrow}
          </p>
          <h1 className="text-stamp mt-2 text-center text-2xl text-ink sm:text-3xl">
            {title}
          </h1>

          <div className="mt-8">{children}</div>
        </div>

        <p className="mt-6 text-center text-sm text-ink/70">{footer}</p>
      </div>
    </main>
  );
}
