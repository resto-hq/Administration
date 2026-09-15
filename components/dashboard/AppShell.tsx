import type { ReactNode } from "react";

export default function AppShell({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-app-bg md:flex-row">
      {sidebar}
      <main className="min-w-0 flex-1">
        <div className="flex h-14 items-center border-b border-border bg-panel px-4 md:hidden">
          <span className="ml-12 text-sm font-semibold text-ink">Resto</span>
        </div>
        <div className="px-6 py-8 md:px-10 md:py-10">{children}</div>
      </main>
    </div>
  );
}
