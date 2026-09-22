"use client";

import { useFormStatus } from "react-dom";
import type { ActionState } from "@/lib/admin-state";

/**
 * Form furniture shared by the admin screens. Plain inputs on a white card —
 * the marketing components are tuned for the public site and would fight the
 * density an editing screen wants.
 */

const control =
  "w-full rounded-sm border border-steel-300 bg-white px-3 py-2.5 text-[14.5px] text-ink " +
  "placeholder:text-ink-muted focus:border-navy-600 focus:outline-none focus:ring-2 " +
  "focus:ring-navy-600/20 disabled:bg-steel-50";

export function Field({
  label,
  name,
  hint,
  error,
  children,
}: {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[12.5px] font-bold uppercase tracking-[0.08em] text-ink-muted"
      >
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint ? <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">{hint}</p> : null}
      {error ? <p className="mt-1.5 text-[13px] font-semibold text-accent-700">{error}</p> : null}
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { name: string };

export function TextInput({ className = "", ...props }: InputProps) {
  return <input id={props.name} className={`${control} ${className}`} {...props} />;
}

type AreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { name: string };

export function TextArea({ className = "", rows = 4, ...props }: AreaProps) {
  return (
    <textarea
      id={props.name}
      rows={rows}
      className={`${control} font-mono text-[13.5px] leading-relaxed ${className}`}
      {...props}
    />
  );
}

export function Select({
  name,
  options,
  defaultValue,
}: {
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  return (
    <select id={name} name={name} defaultValue={defaultValue} className={control}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function SubmitButton({
  children,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" }) {
  const { pending } = useFormStatus();

  const styles =
    variant === "primary"
      ? "bg-navy-800 text-white hover:bg-navy-700"
      : "border border-steel-300 bg-white text-ink hover:bg-steel-50";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-sm px-5 py-2.5 text-[14px] font-bold transition-colors disabled:opacity-60 ${styles}`}
      {...props}
    >
      {pending ? "Working…" : children}
    </button>
  );
}

/** Success or failure banner for an action result. */
export function Notice({ state }: { state: ActionState }) {
  if (state.status === "idle" || !state.message) return null;

  const failed = state.status === "error";
  return (
    <p
      role="status"
      className={`rounded-sm border-l-[3px] px-4 py-3 text-[14px] font-semibold ${
        failed
          ? "border-accent-600 bg-accent-50 text-accent-700"
          : "border-navy-600 bg-navy-50 text-navy-700"
      }`}
    >
      {state.message}
    </p>
  );
}
