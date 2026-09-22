import type { FieldErrors } from "@/lib/admin-models";

/**
 * The shape every admin form action returns, and its starting value.
 *
 * It lives in its own module because `admin/actions.ts` is a `"use server"`
 * file — those may only export async functions, so the shared constant cannot
 * sit beside the actions that return it.
 */
export type ActionState = {
  status: "idle" | "error" | "success";
  message?: string;
  /** Keyed by form field name, so each input can print its own message. */
  errors?: FieldErrors;
  /** Row-by-row output from the spec-sheet import. */
  report?: string[];
};

export const idleState: ActionState = { status: "idle" };
