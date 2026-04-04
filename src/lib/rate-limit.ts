/**
 * In-memory rate limiter for server actions.
 *
 * MVP implementation using a Map with TTL cleanup.
 * Upgrade path: swap internals for Upstash/Redis when scaling beyond a single process.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number; // epoch ms
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: Date;
}

interface RateLimitOptions {
  /** Time window in seconds (default: 60) */
  windowSeconds?: number;
  /** Max requests allowed in the window (default: 5) */
  maxRequests?: number;
}

const store = new Map<string, RateLimitEntry>();

// Periodic cleanup of expired entries (every 60s)
let cleanupScheduled = false;

function scheduleCleanup() {
  if (cleanupScheduled) return;
  cleanupScheduled = true;

  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (entry.resetAt <= now) {
        store.delete(key);
      }
    }
  }, 60_000).unref();
}

/**
 * Check and consume a rate limit token for the given identifier.
 *
 * @param identifier - Unique key (e.g. client IP, user ID)
 * @param options    - Window size and max requests
 * @returns Whether the request is allowed, remaining tokens, and window reset time
 */
export function rateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const { windowSeconds = 60, maxRequests = 5 } = options;
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  scheduleCleanup();

  const existing = store.get(identifier);

  // Window expired or first request — start fresh
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    store.set(identifier, { count: 1, resetAt });
    return { success: true, remaining: maxRequests - 1, resetAt: new Date(resetAt) };
  }

  // Within window — check capacity
  if (existing.count < maxRequests) {
    existing.count += 1;
    return {
      success: true,
      remaining: maxRequests - existing.count,
      resetAt: new Date(existing.resetAt),
    };
  }

  // Over limit
  return {
    success: false,
    remaining: 0,
    resetAt: new Date(existing.resetAt),
  };
}
