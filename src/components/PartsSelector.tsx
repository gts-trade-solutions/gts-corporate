"use client";

import { useMemo, useState } from "react";
import { Button, ButtonLink } from "./Button";
import { Icon } from "./Icon";
import { enquiryHref, modelName, type VehicleModel } from "@/data/vehicle-models";

/**
 * Component picker on a vehicle model page.
 *
 * Ticking parts here builds the enquiry link, so the buyer lands on the RFQ
 * form with the model and the exact component selection already carried across
 * — see the `parts` handling in RFQForm. Nothing is submitted from this
 * component; it only assembles the link.
 *
 * Every part name is rendered server-side inside the label text, so the list is
 * in the HTML for crawlers and readable with JavaScript disabled. Without JS the
 * checkboxes simply do nothing and the "enquire about this model" link still
 * works.
 */
export function PartsSelector({ model }: { model: VehicleModel }) {
  const [selected, setSelected] = useState<string[]>([]);

  // Kept in schedule order rather than click order, so the enquiry reads the
  // same way as the page.
  const ordered = useMemo(
    () => model.parts.filter((part) => selected.includes(part)),
    [model.parts, selected],
  );

  const count = ordered.length;
  const allSelected = count === model.parts.length;

  const toggle = (part: string) =>
    setSelected((prev) =>
      prev.includes(part) ? prev.filter((item) => item !== part) : [...prev, part],
    );

  return (
    <div className="corner-ticks rounded-sm border border-steel-200 bg-white p-6 shadow-card sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-700">
            Step 1 — Select components
          </span>
          <h2 className="mt-2.5 text-[22px] font-bold leading-tight text-ink">
            Most-requested parts for the {model.model}
          </h2>
          <p className="mt-2 max-w-[58ch] text-[14.5px] leading-relaxed text-ink-soft">
            Tick everything you need. Your selection is carried into the enquiry form, so you do
            not have to type the list out again.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setSelected(allSelected ? [] : [...model.parts])}
          >
            {allSelected ? "Clear all" : "Select all"}
          </Button>
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="sr-only">Components required for the {modelName(model)}</legend>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {model.parts.map((part) => {
            const isOn = selected.includes(part);
            return (
              <li key={part}>
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 text-[14.5px] font-medium transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOn
                      ? "border-navy-700 bg-navy-50 text-navy-800"
                      : "border-steel-200 bg-white text-ink hover:-translate-y-px hover:border-navy-700/50 hover:shadow-card"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isOn}
                    onChange={() => toggle(part)}
                    className="h-4.5 w-4.5 shrink-0 rounded-xs border-steel-300 accent-[color:var(--color-navy-800)]"
                  />
                  <span>{part}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      {/* Step 2 — the selection turns into an enquiry. */}
      <div className="mt-7 border-t border-steel-200 pt-6">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-700">
          Step 2 — Send the enquiry
        </span>

        <p aria-live="polite" className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">
          {count === 0 ? (
            <>Nothing selected yet. Tick at least one component to carry it into the form.</>
          ) : (
            <>
              <strong className="font-semibold text-ink">
                {count} component{count === 1 ? "" : "s"} selected
              </strong>{" "}
              — {ordered.join(", ")}.
            </>
          )}
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          {count > 0 ? (
            <ButtonLink href={enquiryHref(model, ordered)} size="lg" withArrow>
              Continue to enquiry ({count})
            </ButtonLink>
          ) : (
            <Button type="button" size="lg" disabled>
              Select at least one component
            </Button>
          )}

          <a
            href={enquiryHref(model, [])}
            className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors duration-200 hover:text-accent-700"
          >
            <Icon name="draft" className="h-4 w-4" />
            <span className="relative">
              Or describe a different part for this model
              <span
                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent-600 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:scale-x-100"
                aria-hidden="true"
              />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
