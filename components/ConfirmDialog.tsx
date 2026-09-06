"use client";

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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6">
      <div className="cut-corners w-full max-w-md bg-paper p-6 shadow-[6px_6px_0_var(--color-ink)] sm:p-8">
        <h2 className="text-stamp text-xl text-ink">{state.title}</h2>
        <p className="mt-2 text-sm text-ink/70">{state.message}</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <StampButton
            type="button"
            className="flex-1"
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
    </div>
  );
}
