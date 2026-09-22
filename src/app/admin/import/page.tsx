import Link from "next/link";
import { SpecSheetImport } from "@/components/admin/SpecSheetImport";
import { requireAdmin } from "@/lib/admin-auth";

const COLUMNS = [
  ["Vehicle Type", "Matched, not written — the vehicle type is edited on the model itself."],
  ["OEM", "Used to find the model. Must match the schedule."],
  ["Model", "Used to find the model. Must match the schedule."],
  ["Engine / Displacement", "Written to the model."],
  ["Max Power", "Written to the model."],
  ["Max Torque", "Written to the model."],
  ["Transmission", "Written to the model."],
  ["GVW / Payload / Key Weight", "Written to the model."],
];

export default async function ImportPage() {
  await requireAdmin();

  return (
    <>
      <div className="mb-7">
        <Link
          href="/admin"
          className="text-[13.5px] font-semibold text-navy-700 underline-offset-4 hover:underline"
        >
          ← Model schedule
        </Link>
        <h1 className="mt-2.5 text-[27px] font-bold leading-tight text-ink">
          Import the specification sheet
        </h1>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
          Fills the technical specification of models that are already in the schedule. Rows are
          matched on OEM and model, ignoring case and punctuation. Nothing else on a model —
          markets, parts, photograph — is touched, and a row that matches nothing is reported rather
          than creating a half-built model page.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start">
        <SpecSheetImport />

        <aside className="rounded-sm border border-steel-200 bg-white p-6 shadow-card">
          <h2 className="text-[15px] font-bold text-ink">Columns</h2>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">
            Any order — the header row is matched by name. Without a header row the columns are read
            in the order below.
          </p>
          <dl className="mt-4 space-y-3">
            {COLUMNS.map(([name, note]) => (
              <div key={name}>
                <dt className="text-[13px] font-bold text-ink">{name}</dt>
                <dd className="text-[13px] leading-relaxed text-ink-muted">{note}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </>
  );
}
