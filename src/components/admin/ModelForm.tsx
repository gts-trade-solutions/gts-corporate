"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { saveModel } from "@/app/admin/actions";
import { Field, Notice, Select, SubmitButton, TextArea, TextInput } from "@/components/admin/Fields";
import { vehicleSpecFields, type VehicleModel } from "@/data/vehicle-models";
import { listToLines } from "@/lib/admin-models";
import { idleState } from "@/lib/admin-state";

/**
 * The one screen that edits a model.
 *
 * Everything the model page prints is here, in the order the page prints it.
 * List fields are textareas, one entry per line — the client's schedule is
 * maintained as lists of short phrases, and a line per phrase is quicker to
 * edit than any row-adding widget.
 */

type Option = { value: string; label: string };

export function ModelForm({
  model,
  isNew,
  groupOptions,
  componentOptions,
  photoUrl,
  hasUploadedPhoto,
  savedNotice,
}: {
  model: VehicleModel;
  isNew: boolean;
  groupOptions: Option[];
  componentOptions: Option[];
  photoUrl: string;
  hasUploadedPhoto: boolean;
  savedNotice: boolean;
}) {
  const [state, action] = useActionState(saveModel, idleState);
  const error = (field: string) => state.errors?.[field];

  /* The form sets no encType: React uses multipart/form-data of its own accord
     for a function action, so the photograph below still submits its bytes. */
  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="originalSlug" value={isNew ? "" : model.slug} />

      {savedNotice && state.status === "idle" ? (
        <p
          role="status"
          className="rounded-sm border-l-[3px] border-navy-600 bg-navy-50 px-4 py-3 text-[14px] font-semibold text-navy-700"
        >
          Saved. The public pages have been refreshed.
        </p>
      ) : null}
      <Notice state={state} />

      <Card title="Identity" lead="What the model is called and where its page lives.">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="OEM" name="oem" error={error("oem")}>
            <TextInput name="oem" defaultValue={model.oem} placeholder="Tata Motors" required />
          </Field>
          <Field label="Model" name="model" error={error("model")}>
            <TextInput name="model" defaultValue={model.model} placeholder="Super Ace" required />
          </Field>
          <Field
            label="Vehicle type"
            name="segment"
            hint="As the catalogue words it — Mini Truck, Pickup, Light Truck."
            error={error("segment")}
          >
            <TextInput name="segment" defaultValue={model.segment} placeholder="Mini Truck" required />
          </Field>
          <Field
            label="Category"
            name="group"
            hint="Drives the filters and the icon on the model card."
          >
            <Select name="group" options={groupOptions} defaultValue={model.group} />
          </Field>
          <Field label="Exported from" name="exportedFrom" error={error("exportedFrom")}>
            <TextInput name="exportedFrom" defaultValue={model.exportedFrom} placeholder="India" />
          </Field>
          <Field
            label="Web address"
            name="slug"
            hint={
              isNew
                ? "Leave blank to build it from the OEM and model."
                : "Changing this changes the public URL and breaks existing links."
            }
            error={error("slug")}
          >
            <TextInput
              name="slug"
              defaultValue={model.slug}
              placeholder="tata-motors-super-ace"
              className="font-mono text-[13.5px]"
            />
          </Field>
        </div>
      </Card>

      <Card
        title="Technical specification"
        lead="The columns of the client's spec sheet. Type the value exactly as it should print, units and all. Leave a field blank and its row is left off the page."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {vehicleSpecFields.map((field) => (
            <Field key={field.key} label={field.label} name={field.key} error={error(field.key)}>
              <TextInput
                name={field.key}
                defaultValue={model.specs?.[field.key] ?? ""}
                placeholder={SPEC_PLACEHOLDERS[field.key]}
              />
            </Field>
          ))}
        </div>
      </Card>

      <Card title="Markets and parts" lead="One entry per line.">
        <div className="grid gap-5">
          <Field
            label="Destination markets"
            name="markets"
            hint="Printed on the model page and used in its page title keywords."
            error={error("markets")}
          >
            <TextArea
              name="markets"
              defaultValue={listToLines(model.markets)}
              rows={4}
              placeholder={"Dominican Republic\nKenya"}
            />
          </Field>
          <Field
            label="Priority spare parts"
            name="parts"
            hint="Each line becomes a tick box a buyer can select and carry into the enquiry form."
            error={error("parts")}
          >
            <TextArea
              name="parts"
              defaultValue={listToLines(model.parts)}
              rows={12}
              placeholder={"Filter kit\nBrake pads / linings\nClutch kit"}
            />
          </Field>
          <Field
            label="Parts note"
            name="partsNote"
            hint="Optional qualifier printed below the parts list."
            error={error("partsNote")}
          >
            <TextArea name="partsNote" defaultValue={model.partsNote ?? ""} rows={3} />
          </Field>
          <Field
            label="Component photo grid"
            name="components"
            hint="Which of the four representative component photo sets this model page prints."
          >
            <Select name="components" options={componentOptions} defaultValue={model.components} />
          </Field>
        </div>
      </Card>

      <Card
        title="Photograph"
        lead="Replaces the catalogue photograph on the model page, the model card and the search results. A cut-out shot on a plain background works best."
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden rounded-sm border border-steel-200 bg-white sm:w-64">
            {isNew ? (
              <p className="flex h-full items-center justify-center px-4 text-center text-[13px] text-ink-muted">
                No photograph yet
              </p>
            ) : (
              <Image
                src={photoUrl}
                alt=""
                fill
                sizes="256px"
                className="object-contain p-3"
                unoptimized
              />
            )}
          </div>

          <div className="flex-1 space-y-4">
            <Field
              label="Upload a replacement"
              name="photo"
              hint="WebP, JPEG, PNG or AVIF, up to 3 MB. Stored in the database, so it survives a redeploy."
              error={error("photo")}
            >
              <input
                id="photo"
                type="file"
                name="photo"
                accept="image/webp,image/jpeg,image/png,image/avif"
                className="block w-full text-[13.5px] text-ink file:mr-3 file:rounded-sm file:border-0 file:bg-navy-800 file:px-4 file:py-2 file:text-[13px] file:font-bold file:text-white hover:file:bg-navy-700"
              />
            </Field>

            {hasUploadedPhoto ? (
              <label className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                <input type="checkbox" name="removePhoto" className="mt-1" />
                <span>
                  Remove the uploaded photograph and go back to the catalogue image shipped with the
                  site.
                </span>
              </label>
            ) : null}
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton>{isNew ? "Create model" : "Save changes"}</SubmitButton>
        <Link
          href="/admin"
          className="rounded-sm border border-steel-300 bg-white px-5 py-2.5 text-[14px] font-bold text-ink transition-colors hover:bg-steel-50"
        >
          Back to the schedule
        </Link>
        {!isNew ? (
          <Link
            href={`/vehicle-models/${model.slug}`}
            target="_blank"
            className="text-[14px] font-semibold text-navy-700 underline-offset-4 hover:underline"
          >
            View the public page
          </Link>
        ) : null}
      </div>
    </form>
  );
}

const SPEC_PLACEHOLDERS: Record<string, string> = {
  engine: "475 IDI TCIC diesel, 1,405 cc",
  maxPower: "70 hp @ 4,500 rpm",
  maxTorque: "135 Nm @ 3,200 rpm",
  transmission: "GBS65, 5-speed MT",
  weights: "GVW 2,260 kg; payload 1,000 kg",
};

function Card({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-sm border border-steel-200 bg-white p-6 shadow-card">
      <h2 className="text-[17px] font-bold text-ink">{title}</h2>
      {lead ? <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-ink-soft">{lead}</p> : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}
