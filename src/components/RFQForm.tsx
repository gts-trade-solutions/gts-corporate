"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";
import {
  enquiryTypes,
  marketContextTypes,
  upload,
  uploadAccept,
  vehicleContextTypes,
} from "@/data/enquiry";
import type { RfqFieldErrors, RfqResponse } from "@/lib/rfq";

const fieldBase =
  "w-full rounded-sm border bg-white px-3.5 py-3 text-[15px] text-ink transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-ink-muted/70 focus:outline-none focus:ring-4";

const fieldTone = {
  idle: "border-steel-300 hover:border-navy-700/40 focus:border-navy-700 focus:ring-navy-700/10",
  valid: "border-navy-200 focus:border-navy-700 focus:ring-navy-700/10",
  error: "border-accent-700 focus:border-accent-700 focus:ring-accent-700/10",
};

/** Required controls, in the order they appear — drives the completion meter. */
const REQUIRED = [
  "name",
  "company",
  "country",
  "email",
  "phone",
  "enquiryType",
  "product",
  "message",
  "consent",
] as const;

type Control = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/**
 * Maps the browser's own constraint validation to our wording, so the client
 * gets instant feedback without shipping a validation library. The server
 * re-validates everything with Zod regardless — that remains the source of truth.
 */
function messageFor(el: Control): string | null {
  if (el.validity.valid) return null;
  if (el.validity.valueMissing) {
    return el instanceof HTMLSelectElement
      ? "Please select an enquiry type."
      : "This field is required.";
  }
  if (el.validity.typeMismatch) return "Please enter a valid business email address.";
  if (el.validity.tooShort && !(el instanceof HTMLSelectElement)) {
    return `Please enter at least ${el.minLength} characters.`;
  }
  if (el.validity.patternMismatch) return "Please enter a valid phone number.";
  return "Please check this field.";
}

function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  valid,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  valid?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    /* Column layout with the control pushed to the bottom, so inputs stay on a
       shared baseline even when a neighbouring field has a two-line hint. */
    <div className={`flex flex-col ${className}`}>
      <label className="flex items-center gap-2 text-[13.5px] font-semibold text-ink" htmlFor={htmlFor}>
        <span>
          {label}
          {required ? (
            <span className="text-accent-700" aria-hidden="true">
              {" "}
              *
            </span>
          ) : (
            <span className="ml-1.5 text-[12px] font-normal text-ink-muted">(optional)</span>
          )}
        </span>
        {/* Quiet confirmation once a field passes — no colour-only signalling. */}
        <span
          className={`inline-flex items-center gap-1 text-[11.5px] font-semibold text-navy-700 transition-opacity duration-200 ${
            valid ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={!valid}
        >
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8.5 6.5 12 13 4.5" />
          </svg>
          OK
        </span>
      </label>
      {hint ? <p className="mt-1 text-[12.5px] text-ink-muted">{hint}</p> : null}
      <div className="mt-auto pt-2">{children}</div>
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-1.5 text-[13px] font-medium text-accent-700"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function RFQForm() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [enquiryType, setEnquiryType] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<RfqFieldErrors>({});
  const [valid, setValid] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [confirmation, setConfirmation] = useState("");

  // Deep links such as /contact?enquiry=india-dealership pre-select the type.
  // Seeded during render rather than in an effect, and only when the query
  // value itself changes — a manual selection is never overwritten.
  const requested = searchParams.get("enquiry") ?? "";
  const seed = enquiryTypes.some((type) => type.value === requested) ? requested : "";
  const [seededFrom, setSeededFrom] = useState("");
  if (seed && seed !== seededFrom) {
    setSeededFrom(seed);
    setEnquiryType(seed);
  }

  // The parts-page search sends its query through, so an unmatched component
  // arrives in the form already filled in.
  const productSeed = (searchParams.get("product") ?? "").slice(0, 200);

  // Captured on mount so the server can measure real form-fill time.
  const mountedAt = useRef(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const showApplication = !enquiryType || vehicleContextTypes.has(enquiryType);
  const showTargetMarket = !enquiryType || marketContextTypes.has(enquiryType);

  const totalSize = useMemo(() => files.reduce((sum, file) => sum + file.size, 0), [files]);

  /** Recomputes the completion meter from the live form state. */
  const recomputeProgress = () => {
    const form = formRef.current;
    if (!form) return;
    let done = 0;
    for (const name of REQUIRED) {
      const el = form.elements.namedItem(name) as Control | null;
      if (!el) continue;
      const filled =
        el instanceof HTMLInputElement && el.type === "checkbox" ? el.checked : el.value.trim() !== "";
      if (filled && el.checkValidity()) done += 1;
    }
    setCompleted(done);
  };

  useEffect(() => {
    recomputeProgress();
    // enquiryType changes swap conditional fields in and out.
  }, [enquiryType]);

  const handleBlur = (event: React.FocusEvent<Control>) => {
    const el = event.target;
    if (!el.name) return;
    const message = el.value.trim() === "" && !el.required ? null : messageFor(el);
    setErrors((prev) => ({ ...prev, [el.name]: message ?? undefined }));
    setValid((prev) => ({ ...prev, [el.name]: !message && el.value.trim() !== "" }));
  };

  /**
   * Fields are validated on blur, but once one is showing an error it clears
   * as soon as the correction is typed — leaving it up while someone fixes it
   * reads as though the fix did not register.
   */
  const handleFormInput = (event: React.FormEvent<HTMLFormElement>) => {
    recomputeProgress();
    const el = event.target as Control;
    if (!el?.name || !errors[el.name as keyof RfqFieldErrors]) return;
    if (!messageFor(el)) {
      setErrors((prev) => ({ ...prev, [el.name]: undefined }));
      setValid((prev) => ({ ...prev, [el.name]: el.value.trim() !== "" }));
    }
  };

  /** Keeps React state and the real <input type="file"> list in sync. */
  const applyFiles = (next: File[]) => {
    const transfer = new DataTransfer();
    next.slice(0, upload.maxFiles).forEach((file) => transfer.items.add(file));
    if (fileInputRef.current) fileInputRef.current.files = transfer.files;
    setFiles(Array.from(transfer.files));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("renderedAt", String(mountedAt.current));

    setErrors({});
    setStatus("sending");

    try {
      const response = await fetch("/api/rfq", { method: "POST", body: data });
      const result = (await response.json()) as RfqResponse;

      if (result.ok) {
        setConfirmation(result.message);
        setStatus("sent");
        form.reset();
        setFiles([]);
        setValid({});
        setCompleted(0);
        return;
      }

      setErrors(result.errors);
      setStatus("idle");
      const firstKey = Object.keys(result.errors)[0];
      if (firstKey && firstKey !== "form") {
        form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      } else {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch {
      setErrors({
        form: "We could not reach the server. Please check your connection and try again.",
      });
      setStatus("idle");
    }
  }

  const tone = (name: string) =>
    errors[name as keyof RfqFieldErrors] ? fieldTone.error : valid[name] ? fieldTone.valid : fieldTone.idle;

  const input = (name: string) => ({
    name,
    id: name,
    onBlur: handleBlur,
    className: `${fieldBase} ${tone(name)}`,
    "aria-invalid": errors[name as keyof RfqFieldErrors] ? true : undefined,
    "aria-describedby": errors[name as keyof RfqFieldErrors] ? `${name}-error` : undefined,
  });

  if (status === "sent") {
    return (
      <div className="corner-ticks rounded-sm border border-steel-200 bg-white p-8 shadow-card">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-50 text-accent-700">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path
              d="m5 12.5 4.5 4.5L19 7.5"
              style={{
                strokeDasharray: 30,
                strokeDashoffset: 30,
                animation: "tick 500ms cubic-bezier(0.22,1,0.36,1) 120ms forwards",
              }}
            />
          </svg>
        </span>
        <style>{"@keyframes tick { to { stroke-dashoffset: 0 } }"}</style>
        <h2 className="mt-5 text-2xl font-bold text-ink">Enquiry received</h2>
        <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">{confirmation}</p>
        <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
          An acknowledgement has been sent to the email address you provided.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => {
            setStatus("idle");
            setConfirmation("");
            mountedAt.current = Date.now();
          }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  const percent = Math.round((completed / REQUIRED.length) * 100);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onInput={handleFormInput}
      onChange={recomputeProgress}
      noValidate
      encType="multipart/form-data"
      className="relative rounded-sm border border-steel-200 bg-white p-6 shadow-card transition-shadow duration-300 focus-within:shadow-lift sm:p-8"
    >
      {/* Honeypot — hidden from users and from assistive technology. */}
      <div className="absolute h-px w-px overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Completion meter */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
            Enquiry completeness
          </span>
          <span className="index-mark text-[13px] font-bold tabular-nums text-ink">
            {completed}/{REQUIRED.length}
          </span>
        </div>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-steel-200"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Required fields completed"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-700 to-accent-500 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {errors.form ? (
        <p
          role="alert"
          className="mb-6 rounded-sm border-l-[3px] border-accent-700 bg-accent-50 px-4 py-3 text-[14px] font-medium text-accent-700"
        >
          {errors.form}
        </p>
      ) : null}

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-accent-700">
          <span className="h-px w-6 bg-accent-600" aria-hidden="true" />
          Your details
        </legend>

        <Field label="Name" htmlFor="name" required error={errors.name} valid={valid.name}>
          <input {...input("name")} type="text" autoComplete="name" required minLength={2} />
        </Field>

        <Field label="Company" htmlFor="company" required error={errors.company} valid={valid.company}>
          <input {...input("company")} type="text" autoComplete="organization" required minLength={2} />
        </Field>

        <Field label="Country" htmlFor="country" required error={errors.country} valid={valid.country}>
          <input {...input("country")} type="text" autoComplete="country-name" required minLength={2} />
        </Field>

        <Field label="Business email" htmlFor="email" required error={errors.email} valid={valid.email}>
          <input {...input("email")} type="email" autoComplete="email" required />
        </Field>

        <Field label="Phone" htmlFor="phone" required error={errors.phone} valid={valid.phone}>
          <input
            {...input("phone")}
            type="tel"
            autoComplete="tel"
            required
            minLength={6}
            pattern="[\d\s()+.\-]+"
            placeholder="+91 00000 00000"
          />
        </Field>

        <Field label="WhatsApp" htmlFor="whatsapp" error={errors.whatsapp} valid={valid.whatsapp}>
          <input {...input("whatsapp")} type="tel" />
        </Field>
      </fieldset>

      <fieldset className="mt-10 grid gap-5 sm:grid-cols-2">
        <legend className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-accent-700">
          <span className="h-px w-6 bg-accent-600" aria-hidden="true" />
          Your requirement
        </legend>

        <Field
          label="Enquiry type"
          htmlFor="enquiryType"
          required
          error={errors.enquiryType}
          valid={valid.enquiryType}
        >
          <select
            {...input("enquiryType")}
            required
            value={enquiryType}
            onChange={(event) => setEnquiryType(event.target.value)}
          >
            <option value="">Select an enquiry type</option>
            {enquiryTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Product / service"
          htmlFor="product"
          required
          error={errors.product}
          valid={valid.product}
          hint="e.g. trailer axles, EV traction motor, refrigerated body, steel coils"
        >
          <input {...input("product")} type="text" required minLength={2} defaultValue={productSeed} />
        </Field>

        <Field
          label="Quantity / annual volume"
          htmlFor="quantity"
          error={errors.quantity}
          valid={valid.quantity}
          hint="Helps us quote accurately."
        >
          <input {...input("quantity")} type="text" />
        </Field>

        {showApplication ? (
          <Field
            label="Application / vehicle type"
            htmlFor="application"
            error={errors.application}
            valid={valid.application}
            hint="e.g. 40T tipper, city bus, electric 3-wheeler, tractor"
          >
            <input {...input("application")} type="text" />
          </Field>
        ) : null}

        {showTargetMarket ? (
          <Field
            label="Target market / destination country"
            htmlFor="targetMarket"
            error={errors.targetMarket}
            valid={valid.targetMarket}
          >
            <input {...input("targetMarket")} type="text" />
          </Field>
        ) : null}

        <Field
          label="Specification / message"
          htmlFor="message"
          required
          error={errors.message}
          valid={valid.message}
          className="sm:col-span-2"
          hint="Specifications, drawings available, timelines, target price or any commercial context."
        >
          <textarea {...input("message")} rows={6} required minLength={20} />
        </Field>

        <Field
          label="Attachment"
          htmlFor="attachments"
          error={errors.attachments}
          className="sm:col-span-2"
          hint={`Drawings, RFQs or specifications. PDF, DOC, DOCX, XLS, XLSX, JPG or PNG — up to ${
            upload.maxFiles
          } files, ${Math.round(upload.maxBytes / (1024 * 1024))} MB total.`}
        >
          {/* Drag-and-drop surface wrapping the real file input. */}
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              applyFiles([...files, ...Array.from(event.dataTransfer.files)]);
            }}
            className={`rounded-sm border-2 border-dashed p-5 text-center transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              dragging
                ? "scale-[1.01] border-accent-600 bg-accent-50"
                : "border-steel-300 bg-steel-50/60 hover:border-navy-700 hover:bg-steel-50"
            }`}
          >
            <Icon name="draft" className="mx-auto h-6 w-6 text-navy-600" />
            <p className="mt-2.5 text-[14px] text-ink-soft">
              Drag files here, or{" "}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="font-semibold text-navy-700 underline underline-offset-2 transition-colors hover:text-accent-700"
              >
                browse from your device
              </button>
            </p>
            <input
              ref={fileInputRef}
              id="attachments"
              name="attachments"
              type="file"
              multiple
              accept={uploadAccept}
              onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
              className="sr-only"
            />
          </div>

          {files.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center gap-2.5 rounded-sm border border-steel-200 bg-white px-3 py-2 text-[13px] text-ink-soft"
                >
                  <Icon name="draft" className="h-4 w-4 shrink-0 text-navy-600" />
                  <span className="truncate">{file.name}</span>
                  <span className="ml-auto shrink-0 text-ink-muted">
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                  <button
                    type="button"
                    onClick={() => applyFiles(files.filter((_, i) => i !== index))}
                    className="shrink-0 rounded-sm p-1 text-ink-muted transition-colors hover:bg-accent-50 hover:text-accent-700"
                  >
                    <span className="sr-only">Remove {file.name}</span>
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                      <path d="M4 4l8 8M12 4l-8 8" />
                    </svg>
                  </button>
                </li>
              ))}
              {totalSize > upload.maxBytes ? (
                <li className="text-[13px] font-medium text-accent-700">
                  Total attachment size exceeds {Math.round(upload.maxBytes / (1024 * 1024))} MB —
                  please remove a file.
                </li>
              ) : null}
            </ul>
          ) : null}
        </Field>
      </fieldset>

      <div className="mt-8 border-t border-steel-200 pt-6">
        <label
          htmlFor="consent"
          className="flex items-start gap-3 text-[14px] leading-relaxed text-ink-soft"
        >
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            className="mt-0.5 h-4.5 w-4.5 shrink-0 rounded-xs border-steel-300 accent-[color:var(--color-navy-800)]"
          />
          <span>
            I agree that GTS Trade Solutions may use the details above to respond to this enquiry, as
            described in the{" "}
            <Link
              href="/privacy"
              className="font-semibold text-navy-700 underline underline-offset-2 transition-colors hover:text-accent-700"
            >
              privacy notice
            </Link>
            .
            <span className="text-accent-700" aria-hidden="true">
              {" "}
              *
            </span>
          </span>
        </label>
        {errors.consent ? (
          <p role="alert" className="mt-2 text-[13px] font-medium text-accent-700">
            {errors.consent}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button type="submit" size="lg" disabled={status === "sending"}>
            {status === "sending" ? (
              <>
                <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.3" />
                  <path
                    d="M21 12a9 9 0 0 0-9-9"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                Sending…
              </>
            ) : (
              <>
                Send Enquiry
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </>
            )}
          </Button>
          <p className="text-[13px] text-ink-muted">
            Uploaded files are emailed to our team only and are never published on this site.
          </p>
        </div>
      </div>
    </form>
  );
}
