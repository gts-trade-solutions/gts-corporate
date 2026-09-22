"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { deleteModel } from "@/app/admin/actions";

/** One row of the admin schedule list — only what the table prints. */
export type ModelRow = {
  slug: string;
  oem: string;
  model: string;
  segment: string;
  group: string;
  markets: number;
  parts: number;
  /** How many of the five spec fields are filled in. */
  specs: number;
  hasPhoto: boolean;
};

export function ModelTable({ rows, specFieldCount }: { rows: ModelRow[]; specFieldCount: number }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((row) =>
      `${row.oem} ${row.model} ${row.segment} ${row.slug}`.toLowerCase().includes(needle),
    );
  }, [query, rows]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter by OEM, model or vehicle type"
          aria-label="Filter the schedule"
          className="w-full max-w-sm rounded-sm border border-steel-300 bg-white px-3 py-2.5 text-[14.5px] text-ink placeholder:text-ink-muted focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-600/20"
        />
        <p className="text-[13.5px] font-medium text-ink-muted">
          {filtered.length} of {rows.length} models
        </p>
      </div>

      <div className="mt-5 overflow-x-auto rounded-sm border border-steel-200 bg-white shadow-card">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="border-b border-steel-200 bg-steel-50">
              <Th>Model</Th>
              <Th>Vehicle type</Th>
              <Th className="text-center">Specs</Th>
              <Th className="text-center">Parts</Th>
              <Th className="text-center">Markets</Th>
              <Th className="text-center">Photo</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.slug} className="border-b border-steel-100 last:border-0 hover:bg-steel-50">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/models/${row.slug}`}
                    className="text-[14.5px] font-semibold text-ink hover:text-navy-700"
                  >
                    {row.oem} {row.model}
                  </Link>
                  <p className="mt-0.5 font-mono text-[12px] text-ink-muted">/{row.slug}</p>
                </td>
                <td className="px-4 py-3 text-[14px] text-ink-soft">{row.segment}</td>
                <td className="px-4 py-3 text-center">
                  <Count value={row.specs} of={specFieldCount} />
                </td>
                <td className="px-4 py-3 text-center text-[14px] tabular-nums text-ink-soft">
                  {row.parts}
                </td>
                <td className="px-4 py-3 text-center text-[14px] tabular-nums text-ink-soft">
                  {row.markets}
                </td>
                <td className="px-4 py-3 text-center text-[13px] text-ink-muted">
                  {row.hasPhoto ? "Uploaded" : "Catalogue"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/models/${row.slug}`}
                      className="text-[13.5px] font-semibold text-navy-700 underline-offset-4 hover:underline"
                    >
                      Edit
                    </Link>
                    <form
                      action={deleteModel}
                      onSubmit={(event) => {
                        if (
                          !confirm(
                            `Delete ${row.oem} ${row.model}? Its page, its photograph and its place in the sitemap all go with it.`,
                          )
                        ) {
                          event.preventDefault();
                        }
                      }}
                    >
                      <input type="hidden" name="slug" value={row.slug} />
                      <button
                        type="submit"
                        className="text-[13.5px] font-semibold text-accent-700 underline-offset-4 hover:underline"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}

            {!filtered.length ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[14px] text-ink-muted">
                  Nothing matches “{query}”.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      scope="col"
      className={`px-4 py-3 text-[11.5px] font-bold uppercase tracking-[0.08em] text-ink-muted ${className}`}
    >
      {children}
    </th>
  );
}

/** Spec completeness at a glance — the import fills these in bulk. */
function Count({ value, of }: { value: number; of: number }) {
  const done = value === of;
  return (
    <span
      className={`inline-block rounded-sm px-2 py-0.5 text-[12.5px] font-bold tabular-nums ${
        value === 0
          ? "bg-steel-100 text-ink-muted"
          : done
            ? "bg-navy-50 text-navy-700"
            : "bg-accent-50 text-accent-700"
      }`}
    >
      {value}/{of}
    </span>
  );
}
