"use client";

import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import BackLink from "@/components/dashboard/BackLink";
import StampButton from "@/components/StampButton";
import { useAdminUsers, usePromoteToAdmin, useDemoteAdmin, useDeleteAdmin } from "@/hooks/useAdmin";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { getApiErrorMessage } from "@/lib/api-error";

const ROLE_LABELS: Record<string, string> = {
  user: "Utilisateur",
  creator: "Créateur",
  restaurateur: "Restaurateur",
  admin: "Administrateur",
  superadmin: "Super administrateur",
};

export default function AdminMembreDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  // No single-member endpoint exists — list_users has no id filter — so this
  // fetches the same unfiltered list the membres page uses and finds the row.
  const { data: members, isPending, isError } = useAdminUsers();
  const membre = members?.find((m) => m.id === params.id);

  const promoteToAdmin = usePromoteToAdmin();
  const demoteAdmin = useDemoteAdmin();
  const deleteAdmin = useDeleteAdmin();
  const { confirm, dialog } = useConfirmDialog();

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

  return (
    <div>
      <BackLink href="/admin/membres" label="Retour aux membres" />
      <PageHeader
        eyebrow={ROLE_LABELS[membre.role] ?? membre.role}
        title={`${membre.first_name} ${membre.last_name}`}
      />

      <div className="cut-corners-sm max-w-xl space-y-4 bg-paper p-6 shadow-[4px_4px_0_var(--color-ink)]">
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
        <div>
          <p className="text-xs font-semibold tracking-wide text-ink/50">Statut du compte</p>
          <p className="text-ink/80">{membre.is_active ? "Actif" : "Inactif"}</p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-ink/50">Inscrit le</p>
          <p className="text-ink/80">
            {new Date(membre.created_at).toLocaleDateString("fr-FR")}
          </p>
        </div>

        {(promoteToAdmin.isError || demoteAdmin.isError || deleteAdmin.isError) && (
          <p className="text-sm font-semibold text-primary-dark">
            {getApiErrorMessage(
              promoteToAdmin.error ?? demoteAdmin.error ?? deleteAdmin.error,
              "Action impossible."
            )}
          </p>
        )}

        <div className="flex flex-wrap gap-3 border-t border-ink/10 pt-4">
          {!isAdminRole && (
            <StampButton
              type="button"
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
      {dialog}
    </div>
  );
}
