"use client";

import { createPortal } from "react-dom";
import StampButton from "@/components/StampButton";

export type ConfirmDialogState = {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
};

export default function ConfirmDialog({
  state,
  onClose,
}: {
  state: ConfirmDialogState;
  onClose: () => void;
}) {
  // Portaled to <body> because callers like the sidebar's logout button render
  // this from inside the sidebar's slide-in drawer, which animates with a CSS
  // transform — a transformed ancestor becomes the containing block for any
  // `fixed` descendant, so without the portal this dialog gets trapped inside
  // the sidebar's box instead of centering on the viewport.
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6">
      <div className="w-full max-w-md rounded-xl border border-border bg-panel p-6 sm:p-8">
        <h2 className="text-xl font-bold text-ink">{state.title}</h2>
        <p className="mt-2 text-sm text-ink/70">{state.message}</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <StampButton
            type="button"
            className={`flex-1 ${state.danger ? "!bg-danger-ui hover:!bg-danger-ui/90" : ""}`}
            onClick={() => {
              state.onConfirm();
              onClose();
            }}
          >
            {state.confirmLabel ?? "Confirmer"}
          </StampButton>
          <StampButton type="button" variant="ink" className="flex-1" onClick={onClose}>
            {state.cancelLabel ?? "Annuler"}
          </StampButton>
        </div>
      </div>
    </div>,
    document.body
  );
}
