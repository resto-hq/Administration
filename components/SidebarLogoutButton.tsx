"use client";

import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/useAuth";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";

export default function SidebarLogoutButton({ redirectTo = "/connexion" }: { redirectTo?: string }) {
  const router = useRouter();
  const logout = useLogout();
  const { confirm, dialog } = useConfirmDialog();

  return (
    <>
      <button
        type="button"
        disabled={logout.isPending}
        onClick={() =>
          confirm({
            title: "Te déconnecter ?",
            message: "Tu devras te reconnecter pour accéder à ton dashboard.",
            confirmLabel: "Se déconnecter",
            danger: true,
            onConfirm: () => {
              logout.mutate(undefined, {
                onSettled: () => router.push(redirectTo),
              });
            },
          })
        }
        className="flex w-full shrink-0 items-center gap-3 px-4 py-2.5 text-sm font-semibold text-paper/60 transition-colors hover:text-paper disabled:opacity-50"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          className="h-5 w-5 shrink-0"
        >
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
        </svg>
        <span className="whitespace-nowrap">Se déconnecter</span>
      </button>
      {dialog}
    </>
  );
}
