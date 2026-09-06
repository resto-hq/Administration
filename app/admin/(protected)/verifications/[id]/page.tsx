"use client";

import { useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import BackLink from "@/components/dashboard/BackLink";
import StampButton from "@/components/StampButton";
import RequestStatusBadge from "@/components/dashboard/RequestStatusBadge";
import { useKycDetails, useApproveKyc, useRejectKyc } from "@/hooks/useAdmin";
import { getApiErrorMessage } from "@/lib/api-error";

const TYPE_LABELS: Record<string, string> = {
  person: "Identité personnelle",
  creator: "Créateur",
  restaurant: "Établissement (business)",
};

export default function AdminVerificationDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: kyc, isPending, isError } = useKycDetails(params.id);
  const approveKyc = useApproveKyc();
  const rejectKyc = useRejectKyc();
  const [reason, setReason] = useState("");

  if (isPending) {
    return <p className="text-sm text-ink/60">Chargement…</p>;
  }

  if (isError || !kyc) {
    return (
      <div>
        <BackLink href="/admin/verifications" label="Retour aux vérifications" />
        <PageHeader eyebrow="MODÉRATION" title="Dossier introuvable" />
      </div>
    );
  }

  function handleReject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!kyc) return;
    rejectKyc.mutate(
      { kycId: kyc.id, query: { reason } },
      { onSuccess: () => router.push("/admin/verifications") }
    );
  }

  return (
    <div>
      <BackLink href="/admin/verifications" label="Retour aux vérifications" />
      <div className="mb-8 flex flex-wrap items-start justify-between gap-3">
        <PageHeader
          eyebrow={TYPE_LABELS[kyc.kyc_type] ?? kyc.kyc_type}
          title={`${kyc.first_name} ${kyc.last_name}`}
        />
        <RequestStatusBadge status={kyc.status} />
      </div>

      <div className="cut-corners-sm max-w-xl space-y-4 bg-paper p-6 shadow-[4px_4px_0_var(--color-ink)]">
        {kyc.submitted_at && (
          <p className="text-xs text-ink/50">
            Envoyé le {new Date(kyc.submitted_at).toLocaleDateString("fr-FR")}
          </p>
        )}

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold tracking-wide text-ink/50">Adresse</dt>
            <dd className="text-ink/80">{kyc.full_address}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-wide text-ink/50">Téléphone</dt>
            <dd className="text-ink/80">{kyc.phone}</dd>
          </div>
          {kyc.restaurant_name && (
            <div>
              <dt className="text-xs font-semibold tracking-wide text-ink/50">Établissement</dt>
              <dd className="text-ink/80">{kyc.restaurant_name}</dd>
            </div>
          )}
          {kyc.restaurant_address && (
            <div>
              <dt className="text-xs font-semibold tracking-wide text-ink/50">
                Adresse de l&apos;établissement
              </dt>
              <dd className="text-ink/80">{kyc.restaurant_address}</dd>
            </div>
          )}
          {kyc.owner_name && (
            <div>
              <dt className="text-xs font-semibold tracking-wide text-ink/50">Propriétaire</dt>
              <dd className="text-ink/80">{kyc.owner_name}</dd>
            </div>
          )}
          {kyc.owner_phone && (
            <div>
              <dt className="text-xs font-semibold tracking-wide text-ink/50">
                Téléphone propriétaire
              </dt>
              <dd className="text-ink/80">{kyc.owner_phone}</dd>
            </div>
          )}
          {kyc.restaurant_id && (
            <div>
              <dt className="text-xs font-semibold tracking-wide text-ink/50">Fiche resto</dt>
              <dd>
                <a
                  href={`/admin/restaurants/${kyc.restaurant_id}`}
                  className="text-primary-dark hover:underline"
                >
                  Voir la fiche →
                </a>
              </dd>
            </div>
          )}
        </dl>

        {kyc.files.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold tracking-wide text-ink/50">Documents</p>
            <div className="flex flex-wrap gap-2">
              {kyc.files.map((file) =>
                file.url ? (
                  <a
                    key={file.field}
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="cut-corners-sm bg-paper-alt px-3 py-1.5 text-xs font-semibold text-ink hover:text-primary-dark"
                  >
                    {file.field} →
                  </a>
                ) : (
                  <span
                    key={file.field}
                    className="cut-corners-sm bg-ink/5 px-3 py-1.5 text-xs text-ink/40"
                  >
                    {file.field} (absent)
                  </span>
                )
              )}
            </div>
          </div>
        )}

        {kyc.rejection_reason && (
          <p className="cut-corners-sm bg-primary/10 p-4 text-sm text-primary-dark">
            Motif du dernier rejet : {kyc.rejection_reason}
          </p>
        )}

        {kyc.status === "pending" && (
          <div className="space-y-4 border-t border-ink/10 pt-4">
            {approveKyc.isError && (
              <p className="text-sm font-semibold text-primary-dark">
                {getApiErrorMessage(approveKyc.error, "Impossible d'approuver.")}
              </p>
            )}
            <StampButton
              type="button"
              disabled={approveKyc.isPending}
              onClick={() =>
                approveKyc.mutate(kyc.id, {
                  onSuccess: () => router.push("/admin/verifications"),
                })
              }
            >
              {approveKyc.isPending ? "…" : "Approuver"}
            </StampButton>

            <form onSubmit={handleReject} className="space-y-3">
              <label htmlFor="reason" className="block text-sm font-semibold text-ink">
                Motif de rejet
              </label>
              <textarea
                id="reason"
                rows={2}
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                required
                className="cut-corners-sm w-full border border-ink/15 bg-paper-alt px-4 py-3 text-ink outline-none placeholder:text-ink/35 focus:border-primary focus:ring-2 focus:ring-primary/40"
              />
              {rejectKyc.isError && (
                <p className="text-sm font-semibold text-primary-dark">
                  {getApiErrorMessage(rejectKyc.error, "Impossible de rejeter.")}
                </p>
              )}
              <StampButton type="submit" variant="ink" disabled={rejectKyc.isPending}>
                {rejectKyc.isPending ? "…" : "Rejeter"}
              </StampButton>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
