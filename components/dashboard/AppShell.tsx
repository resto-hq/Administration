import type { ReactNode } from "react";

export default function AppShell({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-canvas bg-grain md:flex-row">
      {sidebar}
      <main className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-10">{children}</main>
    </div>
  );
}
