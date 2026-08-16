"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";

export type DataTableColumn<T> = {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
  align?: "left" | "right";
};

export default function DataTable<T>({
  columns,
  rows,
  getRowHref,
  getRowKey,
  emptyMessage = "Aucun élément à afficher.",
  actions,
}: {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowHref: (row: T) => string;
  getRowKey: (row: T) => string;
  emptyMessage?: string;
  actions?: (row: T) => ReactNode;
}) {
  const router = useRouter();
  const [sort, setSort] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  const sortedRows = useMemo(() => {
    if (!sort) return rows;
    const column = columns.find((c) => c.key === sort.key);
    if (!column?.sortValue) return rows;
    const sortValue = column.sortValue;
    const sorted = [...rows].sort((a, b) => {
      const va = sortValue(a);
      const vb = sortValue(b);
      if (va < vb) return -1;
      if (va > vb) return 1;
      return 0;
    });
    return sort.direction === "asc" ? sorted : sorted.reverse();
  }, [rows, sort, columns]);

  function toggleSort(key: string) {
    setSort((current) => {
      if (!current || current.key !== key) return { key, direction: "asc" };
      if (current.direction === "asc") return { key, direction: "desc" };
      return null;
    });
  }

  if (rows.length === 0) {
    return <p className="text-sm text-ink/60">{emptyMessage}</p>;
  }

  return (
    <div className="cut-corners-sm overflow-x-auto bg-paper shadow-[4px_4px_0_var(--color-ink)]">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-ink/10 text-left text-xs font-semibold tracking-wide text-ink/50">
            {columns.map((column) => (
              <th key={column.key} className={`px-5 py-3 ${column.align === "right" ? "text-right" : ""}`}>
                {column.sortValue ? (
                  <button
                    type="button"
                    onClick={() => toggleSort(column.key)}
                    className="inline-flex items-center gap-1 hover:text-ink"
                  >
                    {column.label}
                    {sort?.key === column.key && (
                      <span aria-hidden>{sort.direction === "asc" ? "▲" : "▼"}</span>
                    )}
                  </button>
                ) : (
                  column.label
                )}
              </th>
            ))}
            {actions && <th className="px-5 py-3 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row) => {
            const href = getRowHref(row);
            function go() {
              router.push(href);
            }
            return (
              <tr
                key={getRowKey(row)}
                onClick={go}
                role="link"
                tabIndex={0}
                onKeyDown={(event: KeyboardEvent) => {
                  if (event.key === "Enter") go();
                }}
                className="cursor-pointer border-b border-ink/5 transition-colors last:border-0 hover:bg-mustard/10"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-5 py-4 text-ink ${column.align === "right" ? "text-right" : ""}`}
                  >
                    {column.render(row)}
                  </td>
                ))}
                {actions && (
                  <td className="px-5 py-4 text-right" onClick={(event: MouseEvent) => event.stopPropagation()}>
                    {actions(row)}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
