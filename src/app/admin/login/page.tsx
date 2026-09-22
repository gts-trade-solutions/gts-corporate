import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { adminConfigured, adminSession, devAccount, usingDevAccount } from "@/lib/admin-auth";

export default async function AdminLoginPage() {
  if (await adminSession()) redirect("/admin");

  const configured = adminConfigured();

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-sm border border-steel-200 bg-white p-7 shadow-card">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-700">
          Restricted
        </span>
        <h1 className="mt-2.5 text-[24px] font-bold leading-tight text-ink">
          Sign in to edit the model schedule
        </h1>
        <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">
          This area edits what the public vehicle model pages show — specifications, markets, parts
          and photographs.
        </p>

        <div className="mt-6">
          {configured ? (
            <LoginForm
              hint={
                usingDevAccount()
                  ? `No credentials are configured, so development is using the fallback: ${devAccount.email} / ${devAccount.password}. Set ADMIN_EMAIL and ADMIN_PASSWORD before deploying.`
                  : undefined
              }
            />
          ) : (
            <p className="rounded-sm border-l-[3px] border-accent-600 bg-accent-50 px-4 py-3 text-[14px] leading-relaxed text-accent-700">
              No admin credentials are set. Add <code className="font-mono">ADMIN_EMAIL</code> and{" "}
              <code className="font-mono">ADMIN_PASSWORD</code> (or{" "}
              <code className="font-mono">ADMIN_USERS</code>) to the environment and restart the
              server.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
