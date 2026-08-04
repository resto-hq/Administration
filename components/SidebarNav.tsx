"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export type NavItem = { href: string; label: string; icon: ReactNode };

export default function SidebarNav({ items, badge }: { items: NavItem[]; badge?: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-col gap-1 bg-ink px-3 py-4 md:w-64 md:min-h-screen md:py-8">
      <Link href="/" className="mb-6 hidden items-center justify-center gap-2 px-2 md:flex">
        <Image src="/logo-mark.png" alt="Resto" width={140} height={48} className="h-8 w-auto" />
        {badge && (
          <span className="cut-corners-sm bg-mustard px-2 py-0.5 text-[10px] font-bold tracking-wide text-ink">
            {badge}
          </span>
        )}
      </Link>

      <nav className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-colors md:shrink ${
                active ? "cut-corners-sm bg-primary text-paper" : "text-paper/60 hover:text-paper"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
                {item.icon}
              </svg>
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
