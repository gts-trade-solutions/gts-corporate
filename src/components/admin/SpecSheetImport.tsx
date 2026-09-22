"use client";

import { useActionState } from "react";
import { importSpecSheet } from "@/app/admin/actions";
import { Notice, SubmitButton } from "@/components/admin/Fields";
import { idleState } from "@/lib/admin-state";

/**
 * Paste the specification sheet, preview what it would change, then apply it.
 *
 * Preview first is the point: the sheet is matched against the schedule by OEM
 * and model, and a typo in either shows up as an unmatched row rather than as
 * a silent no-op.
 */
export function SpecSheetImport() {
  const [state, action] = useActionState(importSpecSheet, idleState);

  return (
    <form action={action} className="space-y-5">
      <div className="rounded-sm border border-steel-200 bg-white p-6 shadow-card">
        <label
          htmlFor="sheet"
          className="block text-[12.5px] font-bold uppercase tracking-[0.08em] text-ink-muted"
        >
          Specification sheet
        </label>
        <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">
          Select the rows in Excel or Google Sheets — header row included — and paste them here.
          Comma-separated text from a saved CSV works too.
        </p>
        <textarea
          id="sheet"
          name="sheet"
          rows={14}
          required
          spellCheck={false}
          placeholder={PLACEHOLDER}
          className="mt-3 w-full rounded-sm border border-steel-300 bg-white px-3 py-2.5 font-mono text-[13px] leading-relaxed text-ink placeholder:text-ink-muted focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-600/20"
        />

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <SubmitButton name="apply" value="0" variant="outline">
            Preview changes
          </SubmitButton>
          <SubmitButton name="apply" value="1">
            Apply to the schedule
          </SubmitButton>
        </div>
      </div>

      <Notice state={state} />

      {state.report?.length ? (
        <div className="rounded-sm border border-steel-200 bg-white p-6 shadow-card">
          <h2 className="text-[15px] font-bold text-ink">Row by row</h2>
          <ul className="mt-3 space-y-1.5">
            {state.report.map((line, index) => (
              <li
                key={`${index}-${line}`}
                className="border-b border-steel-100 pb-1.5 font-mono text-[12.5px] leading-relaxed text-ink-soft last:border-0"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </form>
  );
}

const PLACEHOLDER = [
  "Vehicle Type\tOEM\tModel\tEngine / Displacement\tMax Power\tMax Torque\tTransmission\tGVW / Payload",
  "Mini Truck\tTata Motors\tSuper Ace\t475 IDI TCIC diesel, 1,405 cc\t70 hp @ 4,500 rpm\t135 Nm @ 3,200 rpm\tGBS65, 5-speed MT\tGVW 2,260 kg; payload 1,000 kg",
].join("\n");
