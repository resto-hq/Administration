"use client";

import { useState } from "react";

export default function FileDrop({ id, label }: { id: string; label: string }) {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-ink" htmlFor={id}>
        {label}
      </label>
      <label
        htmlFor={id}
        className="cut-corners-sm flex cursor-pointer items-center justify-between border border-dashed border-ink/30 bg-paper-alt px-4 py-3 text-sm text-ink/60 hover:border-primary hover:text-ink"
      >
        <span className="truncate">{fileName ?? "Choisir un fichier (PDF, JPG, PNG)"}</span>
        <span className="cut-corners-sm ml-3 shrink-0 bg-ink px-3 py-1.5 text-xs font-semibold text-paper">
          Parcourir
        </span>
      </label>
      <input
        id={id}
        name={id}
        type="file"
        accept="image/*,.pdf"
        className="sr-only"
        onChange={(event) => setFileName(event.target.files?.[0]?.name ?? null)}
      />
    </div>
  );
}
