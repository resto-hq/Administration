"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

export type NavItem = { href: string; label: string; icon: ReactNode; count?: number };

export default function SidebarNav({
  items,
  badge,
  footer,
}: {
  items: NavItem[];
  badge?: string;
  footer?: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Ouvrir le menu"
        className="fixed top-2.5 left-3 z-50 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-panel text-ink md:hidden"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink/50 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 flex h-screen w-64 shrink-0 flex-col gap-1 bg-sidebar px-3 py-6 transition-transform duration-200 md:sticky md:translate-x-0 md:py-8 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link href="/" className="mb-6 flex items-center justify-center gap-2 px-2">
          <Image src="/logo-mark.png" alt="Resto" width={140} height={48} className="h-8 w-auto" />
          {badge && (
            <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
              {badge}
            </span>
          )}
        </Link>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-primary text-white" : "text-sidebar-soft hover:bg-white/5 hover:text-paper"
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-[18px] w-[18px] shrink-0">
                  {item.icon}
                </svg>
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                {typeof item.count === "number" && (
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      active ? "bg-white/20 text-white" : "bg-white/10 text-sidebar-soft"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {footer && <div className="border-t border-sidebar-line pt-4">{footer}</div>}
      </aside>
    </>
  );
}
