type RateLimitEntry = {
  count: number;
  firstAttemptAt: number;
  blockedUntil: number | null;
};

type RateLimitState = {
  byIp: Map<string, RateLimitEntry>;
  byUsername: Map<string, RateLimitEntry>;
};

const WINDOW_MS = 15 * 60 * 1000;
const BLOCK_MS = 30 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function getStore() {
  const globalStore = globalThis as typeof globalThis & {
    __louisAdminRateLimit?: RateLimitState;
  };

  if (!globalStore.__louisAdminRateLimit) {
    globalStore.__louisAdminRateLimit = {
      byIp: new Map(),
      byUsername: new Map()
    };
  }

  return globalStore.__louisAdminRateLimit;
}

function pruneEntry(entry: RateLimitEntry, now: number) {
  if (entry.blockedUntil && entry.blockedUntil > now) {
    return entry;
  }

  if (now - entry.firstAttemptAt > WINDOW_MS) {
    return null;
  }

  return {
    ...entry,
    blockedUntil: null
  };
}

function getEntry(map: Map<string, RateLimitEntry>, key: string, now: number) {
  const current = map.get(key);

  if (!current) {
    return null;
  }

  const pruned = pruneEntry(current, now);

  if (!pruned) {
    map.delete(key);
    return null;
  }

  map.set(key, pruned);
  return pruned;
}

function getRetryAfterSeconds(entry: RateLimitEntry, now: number) {
  if (!entry.blockedUntil || entry.blockedUntil <= now) {
    return 0;
  }

  return Math.max(1, Math.ceil((entry.blockedUntil - now) / 1000));
}

function registerFailure(map: Map<string, RateLimitEntry>, key: string, now: number) {
  const existing = getEntry(map, key, now);

  if (!existing) {
    map.set(key, {
      count: 1,
      firstAttemptAt: now,
      blockedUntil: null
    });
    return;
  }

  const nextCount = existing.count + 1;
  map.set(key, {
    count: nextCount,
    firstAttemptAt: existing.firstAttemptAt,
    blockedUntil: nextCount >= MAX_ATTEMPTS ? now + BLOCK_MS : null
  });
}

function clearKey(map: Map<string, RateLimitEntry>, key: string) {
  map.delete(key);
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function checkAdminLoginRateLimit(ip: string, username: string) {
  const now = Date.now();
  const store = getStore();
  const ipEntry = getEntry(store.byIp, ip, now);
  const usernameEntry = getEntry(store.byUsername, username, now);
  const retryAfterSeconds = Math.max(
    getRetryAfterSeconds(ipEntry ?? { count: 0, firstAttemptAt: now, blockedUntil: null }, now),
    getRetryAfterSeconds(
      usernameEntry ?? { count: 0, firstAttemptAt: now, blockedUntil: null },
      now
    )
  );

  return {
    blocked: retryAfterSeconds > 0,
    retryAfterSeconds
  };
}

export function registerAdminLoginFailure(ip: string, username: string) {
  const now = Date.now();
  const store = getStore();

  registerFailure(store.byIp, ip, now);
  registerFailure(store.byUsername, username, now);
}

export function clearAdminLoginFailures(ip: string, username: string) {
  const store = getStore();

  clearKey(store.byIp, ip);
  clearKey(store.byUsername, username);
}
