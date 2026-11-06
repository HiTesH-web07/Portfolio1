// Small in-memory limiter: per visitor and a global ceiling. Good enough for one process.
type Bucket = { count: number; reset: number };
const buckets = new Map<string, Bucket>();

export function limit(key: string, max: number, windowMs: number): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  if (buckets.size > 5000) for (const [k, b] of buckets) if (b.reset < now) buckets.delete(k);
  const b = buckets.get(key);
  if (!b || b.reset < now) { buckets.set(key, { count: 1, reset: now + windowMs }); return { ok: true, retryAfter: 0 }; }
  if (b.count >= max) return { ok: false, retryAfter: Math.ceil((b.reset - now) / 1000) };
  b.count++;
  return { ok: true, retryAfter: 0 };
}
