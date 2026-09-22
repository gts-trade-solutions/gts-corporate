import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { signOut } from "@/app/admin/actions";
import { adminSession } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: { absolute: "Admin — GTS Trade Solutions" },
  // Belt and braces with robots.ts: the admin must never be indexed.
  robots: { index: false, follow: false, nocache: true },
};

/**
 * The admin renders outside the `(site)` route group, so it gets none of the
 * marketing header, footer or analytics — just this bar.
 *
 * Cookies are read on every request, so nothing here is ever cached.
 */
export const dynamic = "force-dynamic";

const navLink =
  "rounded-sm px-3 py-2 text-[13.5px] font-semibold text-navy-100 transition-colors hover:bg-white/10 hover:text-white";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await adminSession();

  return (
    <>
      <header className="border-b border-white/10 bg-navy-800">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-2 gap-y-2 px-5 py-3">
          <div className="mr-3 flex items-center gap-3">
            <Logo inverted href="/admin" />
            <span className="text-[15px] font-bold tracking-tight text-white">Admin</span>
          </div>

          {session ? (
            <>
              <Link href="/admin" className={navLink}>
                Model schedule
              </Link>
              <Link href="/admin/import" className={navLink}>
                Import spec sheet
              </Link>
              <Link href="/vehicle-models" className={navLink} target="_blank">
                View site
              </Link>
              <div className="ml-auto flex items-center gap-3">
                <span className="text-[12.5px] font-medium text-navy-200">
                  Signed in as {session.email}
                </span>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="rounded-sm border border-white/25 px-3 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </>
          ) : (
            <span className="ml-auto text-[12.5px] font-medium text-navy-200">
              Vehicle model schedule
            </span>
          )}
        </div>
      </header>

      <main id="main" className="flex-1 bg-steel-50">
        <div className="mx-auto max-w-6xl px-5 py-10">{children}</div>
      </main>
    </>
  );
}
