"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import BackLink from "@/components/dashboard/BackLink";
import StampButton from "@/components/StampButton";
import RequestStatusBadge from "@/components/dashboard/RequestStatusBadge";
import {
  useAdminUser,
  useUpdateUserStatus,
  useUserActivity,
  usePromoteToAdmin,
  useDemoteAdmin,
  useDeleteAdmin,
} from "@/hooks/useAdmin";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { getApiErrorMessage } from "@/lib/api-error";

const ROLE_LABELS: Record<string, string> = {
  user: "Utilisateur",
  creator: "Créateur",
  restaurateur: "Restaurateur",
  moderator: "Modérateur",
  support: "Support",
  finance: "Finance",
  admin: "Administrateur",
  superadmin: "Super administrateur",
};

export default function AdminMembreDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { data: membre, isPending, isError } = useAdminUser(params.id);
  const { data: activity } = useUserActivity(params.id, { per_page: 10 });

  const updateUserStatus = useUpdateUserStatus();
  const promoteToAdmin = usePromoteToAdmin();
  const demoteAdmin = useDemoteAdmin();
  const deleteAdmin = useDeleteAdmin();
  const { confirm, dialog } = useConfirmDialog();
  const [suspendReason, setSuspendReason] = useState("");
  const [showSuspendForm, setShowSuspendForm] = useState(false);

  if (isPending) {
    return <p className="text-sm text-ink/60">Chargement…</p>;
  }

  if (isError || !membre) {
    return (
      <div>
        <BackLink href="/admin/membres" label="Retour aux membres" />
        <PageHeader eyebrow="COMMUNAUTÉ" title="Membre introuvable" />
      </div>
    );
  }

  const isAdminRole = membre.role === "admin" || membre.role === "superadmin";

  function handleReactivate() {
    if (!membre) return;
    updateUserStatus.mutate({ userId: membre.id, body: { is_active: true } });
  }

  function handleSuspend() {
    if (!membre || !suspendReason.trim()) return;
    updateUserStatus.mutate(
      { userId: membre.id, body: { is_active: false, reason: suspendReason.trim() } },
      {
        onSuccess: () => {
          setShowSuspendForm(false);
          setSuspendReason("");
        },
      }
    );
  }

  return (
    <div>
      <BackLink href="/admin/membres" label="Retour aux membres" />
      <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
        <PageHeader
          eyebrow={ROLE_LABELS[membre.role] ?? membre.role}
          title={`${membre.first_name} ${membre.last_name}`}
        />
        <RequestStatusBadge status={membre.is_active ? "active" : "suspended"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <div className="max-w-xl space-y-4 rounded-xl border border-border bg-panel p-6">
          <div>
            <p className="text-xs font-semibold tracking-wide text-ink/50">Nom d&apos;utilisateur</p>
            <p className="text-ink/80">@{membre.username}</p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-ink/50">Email</p>
            <p className="text-ink/80">{membre.email}</p>
          </div>
          {membre.phone && (
            <div>
              <p className="text-xs font-semibold tracking-wide text-ink/50">Téléphone</p>
              <p className="text-ink/80">{membre.phone}</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-ink/50">Score</p>
              <p className="text-ink/80">{membre.score}</p>
            </div>
            {membre.referral_code && (
              <div>
                <p className="text-xs font-semibold tracking-wide text-ink/50">Code de parrainage</p>
                <p className="text-ink/80">{membre.referral_code}</p>
              </div>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-ink/50">Inscrit le</p>
            <p className="text-ink/80">{new Date(membre.created_at).toLocaleDateString("fr-FR")}</p>
          </div>
          {membre.last_login_at && (
            <div>
              <p className="text-xs font-semibold tracking-wide text-ink/50">Dernière connexion</p>
              <p className="text-ink/80">
                {new Date(membre.last_login_at).toLocaleDateString("fr-FR")}
              </p>
            </div>
          )}

          {!membre.is_active && membre.suspension_reason && (
            <p className="rounded-lg bg-danger-ui-soft p-4 text-sm text-danger-ui">
              Suspendu {membre.suspended_at && `le ${new Date(membre.suspended_at).toLocaleDateString("fr-FR")}`}
              {" — "}
              {membre.suspension_reason}
            </p>
          )}

          {(promoteToAdmin.isError ||
            demoteAdmin.isError ||
            deleteAdmin.isError ||
            updateUserStatus.isError) && (
            <p className="text-sm font-semibold text-danger-ui">
              {getApiErrorMessage(
                promoteToAdmin.error ?? demoteAdmin.error ?? deleteAdmin.error ?? updateUserStatus.error,
                "Action impossible."
              )}
            </p>
          )}

          <div className="flex flex-wrap items-start gap-3 border-t border-ink/10 pt-4">
            {membre.is_active ? (
              showSuspendForm ? (
                <div className="flex flex-1 flex-wrap gap-2">
                  <input
                    type="text"
                    value={suspendReason}
                    onChange={(event) => setSuspendReason(event.target.value)}
                    placeholder="Motif de la suspension"
                    className="min-w-0 flex-1 rounded-lg border border-border bg-app-bg px-3 py-2 text-sm text-ink outline-none focus:border-primary"
                  />
                  <StampButton
                    type="button"
                    className="!bg-danger-ui !px-3 !py-2 text-xs hover:!bg-danger-ui/90"
                    disabled={!suspendReason.trim() || updateUserStatus.isPending}
                    onClick={handleSuspend}
                  >
                    Confirmer la suspension
                  </StampButton>
                  <StampButton
                    type="button"
                    variant="ink"
                    className="!px-3 !py-2 text-xs"
                    onClick={() => setShowSuspendForm(false)}
                  >
                    Annuler
                  </StampButton>
                </div>
              ) : (
                <StampButton
                  type="button"
                  className="!bg-danger-ui hover:!bg-danger-ui/90"
                  onClick={() => setShowSuspendForm(true)}
                >
                  Suspendre
                </StampButton>
              )
            ) : (
              <StampButton
                type="button"
                disabled={updateUserStatus.isPending}
                onClick={handleReactivate}
              >
                Réactiver
              </StampButton>
            )}

            {!isAdminRole && (
              <StampButton
                type="button"
                variant="ink"
                disabled={promoteToAdmin.isPending}
                onClick={() => promoteToAdmin.mutate({ user_id: membre.id })}
              >
                Promouvoir en admin
              </StampButton>
            )}
            {membre.role === "admin" && (
              <>
                <StampButton
                  type="button"
                  variant="ink"
                  disabled={demoteAdmin.isPending}
                  onClick={() =>
                    confirm({
                      title: "Rétrograder cet administrateur ?",
                      message: `${membre.first_name} ${membre.last_name} perdra son accès admin et redevient un utilisateur normal.`,
                      confirmLabel: "Rétrograder",
                      danger: true,
                      onConfirm: () =>
                        demoteAdmin.mutate(membre.id, {
                          onSuccess: () => router.push("/admin/membres"),
                        }),
                    })
                  }
                >
                  Rétrograder
                </StampButton>
                <StampButton
                  type="button"
                  variant="ink"
                  disabled={deleteAdmin.isPending}
                  onClick={() =>
                    confirm({
                      title: "Supprimer cet accès admin ?",
                      message: `Le compte de ${membre.first_name} ${membre.last_name} sera définitivement supprimé.`,
                      confirmLabel: "Supprimer",
                      danger: true,
                      onConfirm: () =>
                        deleteAdmin.mutate(membre.id, {
                          onSuccess: () => router.push("/admin/membres"),
                        }),
                    })
                  }
                >
                  Supprimer l&apos;accès admin
                </StampButton>
              </>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-panel">
          <div className="border-b border-border px-5 py-4">
            <h2 className="text-sm font-bold text-ink">Activité récente</h2>
          </div>
          {activity && activity.length > 0 ? (
            <div>
              {activity.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`px-5 py-3 text-sm ${index < activity.length - 1 ? "border-b border-border-soft" : ""}`}
                >
                  <p className="font-medium text-ink">{entry.action}</p>
                  <p className="mt-0.5 text-xs text-ink/45">
                    {new Date(entry.created_at).toLocaleString("fr-FR")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="px-5 py-4 text-sm text-ink/50">Aucune activité tracée pour ce compte.</p>
          )}
        </div>
      </div>
      {dialog}
    </div>
  );
}
