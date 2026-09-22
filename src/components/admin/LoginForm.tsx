"use client";

import { useActionState } from "react";
import { signIn } from "@/app/admin/actions";
import { Field, Notice, SubmitButton, TextInput } from "@/components/admin/Fields";
import { idleState } from "@/lib/admin-state";

export function LoginForm({ hint }: { hint?: string }) {
  const [state, action] = useActionState(signIn, idleState);

  return (
    <form action={action} className="space-y-5">
      <Notice state={state} />

      <Field label="Email address" name="email">
        <TextInput
          name="email"
          type="email"
          autoComplete="username"
          autoFocus
          required
          placeholder="admin@example.com"
        />
      </Field>

      <Field label="Password" name="password" hint={hint}>
        <TextInput name="password" type="password" autoComplete="current-password" required />
      </Field>

      <SubmitButton>Sign in</SubmitButton>
    </form>
  );
}
