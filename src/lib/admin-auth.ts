import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { siteUrl } from "@/data/site";

/**
 * Static-credential authentication for /admin.
 *
 * There is no user table and no password reset: the credentials live in the
 * environment, exactly as the brief asked for. Configure them one of two ways.
 *
 *   ADMIN_EMAIL=admin@example.com
 *   ADMIN_PASSWORD=the-password
 *
 *   ADMIN_USERS=first@example.com:their-password,second@example.com:another
 *
 * `ADMIN_USERS` is the better of the two once more than one person signs in:
 * each address carries its own password, so one can be revoked without
 * changing anyone else's, and the address is what the admin header shows.
 *
 * Passwords are compared in constant time, and sign-in is rate limited by the
 * caller. The session is a cookie holding the address and an expiry, signed
 * with HMAC — no database, no JWT dependency, and no way to edit the cookie
 * into a valid one without the secret.
 */

export type AdminAccount = { email: string; password: string };
export type AdminSession = { email: string; expiresAt: number };

const COOKIE = "gts_admin";
const SESSION_HOURS = 8;

/** Development-only fallback so a fresh checkout can open /admin immediately. */
const DEV_ACCOUNT: AdminAccount = { email: "admin@gts.local", password: "gts-admin" };

export function adminAccounts(): AdminAccount[] {
  const accounts: AdminAccount[] = [];

  for (const entry of (process.env.ADMIN_USERS ?? "").split(",")) {
    const value = entry.trim();
    if (!value) continue;
    // Split on the first colon only — an address never contains one, but a
    // password might.
    const separator = value.indexOf(":");
    if (separator === -1) continue;
    const email = value.slice(0, separator).trim();
    const password = value.slice(separator + 1);
    if (email && password) accounts.push({ email, password });
  }

  const password = process.env.ADMIN_PASSWORD?.trim();
  if (password) {
    accounts.push({ email: process.env.ADMIN_EMAIL?.trim() || "admin", password });
  }

  if (!accounts.length && process.env.NODE_ENV !== "production") {
    accounts.push(DEV_ACCOUNT);
  }

  return accounts;
}

/** False in production until credentials are set — sign-in then always fails. */
export const adminConfigured = () => adminAccounts().length > 0;

/** True when the only account is the development fallback, so the UI can say so. */
export const usingDevAccount = () =>
  !process.env.ADMIN_USERS?.trim() &&
  !process.env.ADMIN_PASSWORD?.trim() &&
  process.env.NODE_ENV !== "production";

export const devAccount = DEV_ACCOUNT;

/**
 * Signing key. An explicit ADMIN_SESSION_SECRET survives password changes and
 * is required to keep sessions alive across a multi-instance deployment.
 * Without one the key is derived from the credentials themselves, which works
 * fine on a single server and has the useful property that changing a password
 * signs everybody out.
 */
function sessionKey(): string {
  const explicit = process.env.ADMIN_SESSION_SECRET?.trim();
  if (explicit) return explicit;
  const material = adminAccounts()
    .map((account) => `${account.email}:${account.password}`)
    .join("|");
  return createHash("sha256").update(`gts-admin-session:${material}`).digest("hex");
}

const sign = (payload: string) =>
  createHmac("sha256", sessionKey()).update(payload).digest("base64url");

function equal(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  // timingSafeEqual throws on a length mismatch, so compare lengths first —
  // password length is not the secret.
  return left.length === right.length && timingSafeEqual(left, right);
}

/** Addresses are matched case-insensitively; passwords are not. */
const sameEmail = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

/**
 * The account these credentials belong to, or null.
 *
 * Every account is checked even after a match, so the time taken does not
 * reveal which address exists.
 */
export function authenticate(email: string, password: string): AdminAccount | null {
  let matched: AdminAccount | null = null;
  for (const account of adminAccounts()) {
    if (equal(account.password, password) && sameEmail(account.email, email)) matched ??= account;
  }
  return matched;
}

export async function createAdminSession(email: string) {
  const expiresAt = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ email, expiresAt })).toString("base64url");
  const store = await cookies();

  store.set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    // Only mark the cookie Secure when the site is actually served over TLS,
    // otherwise a plain-http deployment could never sign in.
    secure: siteUrl.startsWith("https://"),
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function destroyAdminSession() {
  const store = await cookies();
  store.delete(COOKIE);
}

/** The signed-in account, or null. Never throws. */
export async function adminSession(): Promise<AdminSession | null> {
  if (!adminConfigured()) return null;

  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return null;

  const separator = raw.lastIndexOf(".");
  if (separator === -1) return null;

  const payload = raw.slice(0, separator);
  if (!equal(raw.slice(separator + 1), sign(payload))) return null;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AdminSession;
    if (!parsed?.email || typeof parsed.expiresAt !== "number") return null;
    if (parsed.expiresAt <= Date.now()) return null;
    // A session survives only while its account still exists in the environment.
    if (!adminAccounts().some((account) => sameEmail(account.email, parsed.email))) return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Guard for admin pages and server actions. Redirects to the sign-in page
 * rather than returning, so a caller cannot forget to check the result.
 */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await adminSession();
  if (!session) redirect("/admin/login");
  return session;
}
