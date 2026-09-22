import Link from "next/link";
import { ModelTable, type ModelRow } from "@/components/admin/ModelTable";
import { vehicleSpecFields } from "@/data/vehicle-models";
import { requireAdmin } from "@/lib/admin-auth";
import { mysqlConfigured } from "@/lib/db";
import { listVehicleModels } from "@/lib/vehicle-models-store";

type Props = { searchParams: Promise<{ deleted?: string }> };

export default async function AdminHome({ searchParams }: Props) {
  await requireAdmin();

  const { deleted } = await searchParams;
  const models = await listVehicleModels();
  const editable = mysqlConfigured();

  const rows: ModelRow[] = models.map((item) => ({
    slug: item.slug,
    oem: item.oem,
    model: item.model,
    segment: item.segment,
    group: item.group,
    markets: item.markets.length,
    parts: item.parts.length,
    specs: vehicleSpecFields.filter((field) => item.specs?.[field.key]).length,
    hasPhoto: Boolean(item.photoUpdatedAt),
  }));

  const withSpecs = rows.filter((row) => row.specs > 0).length;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[27px] font-bold leading-tight text-ink">Vehicle model schedule</h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            {rows.length} models · {withSpecs} with a technical specification
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/import"
            className="rounded-sm border border-steel-300 bg-white px-5 py-2.5 text-[14px] font-bold text-ink transition-colors hover:bg-steel-50"
          >
            Import spec sheet
          </Link>
          <Link
            href="/admin/models/new"
            className="rounded-sm bg-navy-800 px-5 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-navy-700"
          >
            Add a model
          </Link>
        </div>
      </div>

      {!editable ? (
        <p className="mt-6 rounded-sm border-l-[3px] border-accent-600 bg-accent-50 px-4 py-3.5 text-[14px] leading-relaxed text-accent-700">
          <strong className="font-bold">Read-only.</strong> No database is configured, so the list
          below is the static catalogue that ships with the site and nothing can be saved. Set the
          MYSQL_* variables and restart — the schedule copies itself into the database on first use.
        </p>
      ) : null}

      {deleted ? (
        <p
          role="status"
          className="mt-6 rounded-sm border-l-[3px] border-navy-600 bg-navy-50 px-4 py-3.5 text-[14px] font-semibold text-navy-700"
        >
          The model was deleted and the public pages have been refreshed.
        </p>
      ) : null}

      <div className="mt-7">
        <ModelTable rows={rows} specFieldCount={vehicleSpecFields.length} />
      </div>
    </>
  );
}
