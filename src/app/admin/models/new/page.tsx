import Link from "next/link";
import { ModelForm } from "@/components/admin/ModelForm";
import { requireAdmin } from "@/lib/admin-auth";
import { emptyModel } from "@/lib/admin-models";
import { componentOptions, groupOptions } from "@/lib/admin-options";

export default async function NewModelPage() {
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
        <h1 className="mt-2.5 text-[27px] font-bold leading-tight text-ink">Add a model</h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
          A new model gets its own page, a place in the filters and a row in the sitemap as soon as
          it is saved. Give it at least one market and one part — those are what the page and the
          enquiry flow are built from.
        </p>
      </div>

      <ModelForm
        model={emptyModel()}
        isNew
        groupOptions={groupOptions}
        componentOptions={componentOptions}
        photoUrl=""
        hasUploadedPhoto={false}
        savedNotice={false}
      />
    </>
  );
}
