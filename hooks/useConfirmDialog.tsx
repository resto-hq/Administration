"use client";

import { useState } from "react";
import ConfirmDialog, { type ConfirmDialogState } from "@/components/ConfirmDialog";

/**
 * Shared confirmation prompt for destructive actions (delete, demote, reject,
 * logout...) — replaces the browser's native confirm() with one matching the
 * app's design. Usage:
 *
 *   const { confirm, dialog } = useConfirmDialog();
 *   <StampButton onClick={() => confirm({
 *     title: "Supprimer ce restaurant ?",
 *     message: "Cette action est irréversible.",
 *     onConfirm: () => deleteRestaurant.mutate(id),
 *   })}>Supprimer</StampButton>
 *   {dialog}
 */
export function useConfirmDialog() {
  const [state, setState] = useState<ConfirmDialogState | null>(null);

  function confirm(next: ConfirmDialogState) {
    setState(next);
  }

  function close() {
    setState(null);
  }

  const dialog = state ? <ConfirmDialog state={state} onClose={close} /> : null;

  return { confirm, dialog };
}
