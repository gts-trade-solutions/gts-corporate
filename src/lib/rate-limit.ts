/**
 * Minimal in-memory rate limiter for the RFQ endpoint.
 *
 * Good enough for a single-instance MVP deployment. If the site is scaled to
 * multiple instances, swap this for a shared store (Redis/Upstash) or the
 * rate limiting provided by the hosting platform.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

export type RateLimitOptions = {
  /** Requests allowed inside the window. Defaults to the RFQ limit of 5. */
  max?: number;
  /** Window length in milliseconds. Defaults to 10 minutes. */
  windowMs?: number;
  /**
   * Separates one endpoint's buckets from another's, so a visitor who has used
   * up the assistant's allowance can still submit an enquiry.
   */
  scope?: string;
};

export function rateLimit(key: string, options: RateLimitOptions = {}) {
  const { max = MAX_REQUESTS, windowMs = WINDOW_MS, scope = "rfq" } = options;
  const now = Date.now();
  const bucketKey = `${scope}:${key}`;

  // Opportunistic cleanup so the map cannot grow without bound.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
  }

  const bucket = buckets.get(bucketKey);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(bucketKey, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  bucket.count += 1;
  if (bucket.count > max) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

/** Best-effort client IP from proxy headers, used only as a rate-limit key. */
export function clientKey(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? headers.get("cf-connecting-ip") ?? "unknown";
}
