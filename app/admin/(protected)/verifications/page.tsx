"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import StampButton from "@/components/StampButton";
import DataTable from "@/components/dashboard/DataTable";
import RequestStatusBadge from "@/components/dashboard/RequestStatusBadge";
import { usePendingKyc, useApproveKyc } from "@/hooks/useAdmin";
import { getApiErrorMessage } from "@/lib/api-error";
import type { KycAdminRecord } from "@/services/admin";

const TABS = [
  { key: "person", label: "Personne" },
  { key: "creator", label: "Créateur" },
  { key: "restaurant", label: "Business (resto)" },
] as const;

export default function VerificationsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("person");
  const { data: pending, isPending, isError } = usePendingKyc();
  const approveKyc = useApproveKyc();

  const rows = (pending ?? []).filter((kyc) => kyc.kyc_type === tab);

  return (
    <div>
      <PageHeader
        eyebrow="MODÉRATION"
        title="Vérifications KYC"
        subtitle="Examine les dossiers d'identité, de créateur et d'établissement."
      />

      <div className="mb-6 flex gap-2">
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
            {pending && (
              <span className="ml-1.5 text-xs opacity-70">
                ({pending.filter((k) => k.kyc_type === key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {isError && (
        <p className="text-sm font-semibold text-primary-dark">
          Impossible de charger la file de vérification.
        </p>
      )}

      {isPending ? (
        <p className="text-sm text-ink/60">Chargement…</p>
      ) : (
        <DataTable<KycAdminRecord>
          rows={rows}
          getRowKey={(kyc) => kyc.id}
          getRowHref={(kyc) => `/admin/verifications/${kyc.id}`}
          emptyMessage="Aucun dossier en attente pour le moment."
          columns={[
            {
              key: "name",
              label: "Dossier",
              sortValue: (kyc) => `${kyc.first_name} ${kyc.last_name}`,
              render: (kyc) => (
                <span className="font-semibold">
                  {kyc.first_name} {kyc.last_name}
                </span>
              ),
            },
            {
              key: "restaurant_name",
              label: "Établissement",
              render: (kyc) => kyc.restaurant_name ?? "—",
            },
            {
              key: "phone",
              label: "Téléphone",
              render: (kyc) => kyc.phone,
            },
            {
              key: "submitted_at",
              label: "Envoyé le",
              sortValue: (kyc) => kyc.submitted_at ?? "",
              render: (kyc) =>
                kyc.submitted_at ? new Date(kyc.submitted_at).toLocaleDateString("fr-FR") : "—",
            },
            {
              key: "status",
              label: "Statut",
              render: (kyc) => <RequestStatusBadge status={kyc.status} />,
            },
          ]}
          actions={(kyc) => (
            <div className="flex justify-end gap-2">
              <StampButton
                type="button"
                className="!px-3 !py-1.5 text-xs"
                disabled={approveKyc.isPending}
                onClick={() => approveKyc.mutate(kyc.id)}
              >
                ✓ Approuver
              </StampButton>
              <Link href={`/admin/verifications/${kyc.id}`}>
                <StampButton type="button" variant="ink" className="!px-3 !py-1.5 text-xs">
                  Examiner
                </StampButton>
              </Link>
            </div>
          )}
        />
      )}

      {approveKyc.isError && (
        <p className="mt-4 text-sm font-semibold text-primary-dark">
          {getApiErrorMessage(approveKyc.error, "Action impossible.")}
        </p>
      )}
    </div>
  );
}
