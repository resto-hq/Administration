"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import { useAdminUsers } from "@/hooks/useAdmin";
import type { AdminUserRecord } from "@/services/admin";

const TABS = [
  { key: "user", label: "Utilisateurs" },
  { key: "creator", label: "Créateurs" },
  { key: "restaurateur", label: "Restaurateurs" },
  { key: "admin", label: "Administrateurs" },
] as const;

const COLUMNS = [
  {
    key: "name",
    label: "Nom",
    sortValue: (m: AdminUserRecord) => `${m.first_name} ${m.last_name}`,
    render: (m: AdminUserRecord) => (
      <span className="font-semibold">
        {m.first_name} {m.last_name}
      </span>
    ),
  },
  { key: "email", label: "Email", render: (m: AdminUserRecord) => m.email },
  { key: "role", label: "Rôle", render: (m: AdminUserRecord) => m.role },
  {
    key: "is_active",
    label: "Actif",
    render: (m: AdminUserRecord) => (m.is_active ? "Oui" : "Non"),
  },
];

export default function AdminMembresPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("user");
  // Fetched once, unfiltered — list_users has no multi-role filter, so tabs
  // split the single result client-side instead of firing one request per tab.
  const { data: members, isPending, isError } = useAdminUsers();

  const rows = (members ?? []).filter((m) =>
    tab === "admin" ? m.role === "admin" || m.role === "superadmin" : m.role === tab
  );

  return (
    <div>
      <PageHeader
        eyebrow="COMMUNAUTÉ"
        title="Membres"
        subtitle="Utilisateurs, créateurs, restaurateurs et administrateurs de la plateforme."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`cut-corners-sm px-4 py-2 text-sm font-semibold transition-colors ${
              tab === key ? "bg-primary text-paper" : "bg-paper-alt text-ink/60 hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {isError && (
        <p className="text-sm font-semibold text-primary-dark">
          Impossible de charger les membres.
        </p>
      )}

      {isPending ? (
        <p className="text-sm text-ink/60">Chargement…</p>
      ) : (
        <DataTable<AdminUserRecord>
          rows={rows}
          getRowKey={(m) => m.id}
          getRowHref={(m) => `/admin/membres/${m.id}`}
          emptyMessage="Aucun membre pour le moment."
          columns={COLUMNS}
        />
      )}
    </div>
  );
}
