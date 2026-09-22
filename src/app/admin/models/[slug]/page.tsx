import Link from "next/link";
import { notFound } from "next/navigation";
import { ModelForm } from "@/components/admin/ModelForm";
import { vehicleImage } from "@/data/vehicle-models";
import { requireAdmin } from "@/lib/admin-auth";
import { componentOptions, groupOptions } from "@/lib/admin-options";
import { findVehicleModelBySlug } from "@/lib/vehicle-models-store";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string }>;
};

export default async function EditModelPage({ params, searchParams }: Props) {
  await requireAdmin();

  const { slug } = await params;
  const { saved } = await searchParams;
  const model = await findVehicleModelBySlug(slug);
  if (!model) notFound();

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
          {model.oem} {model.model}
        </h1>
        <p className="mt-1.5 font-mono text-[13px] text-ink-muted">/vehicle-models/{model.slug}</p>
      </div>

      <ModelForm
        model={model}
        isNew={false}
        groupOptions={groupOptions}
        componentOptions={componentOptions}
        photoUrl={vehicleImage(model)}
        hasUploadedPhoto={Boolean(model.photoUpdatedAt)}
        savedNotice={saved === "1"}
      />
    </>
  );
}
