const DEFAULT_BASE = "https://pitchrise.ludwitt.com";

export const LUDWITT_SCOPES =
  "profile credits:read credits:spend data:read data:write";

export type LudwittTokenSet = {
  access_token: string;
  refresh_token?: string;
  expires_at: number; // epoch ms
  scope?: string;
  token_type?: string;
};

export function ludwittConfigured() {
  return Boolean(process.env.LUDWITT_CLIENT_ID && process.env.LUDWITT_CLIENT_SECRET);
}

export function ludwittBaseUrl() {
  return process.env.LUDWITT_BASE_URL || DEFAULT_BASE;
}

export function appOrigin() {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export function redirectUri() {
  return `${appOrigin()}/auth/callback`;
}

export function authorizeUrl(state: string) {
  const clientId = process.env.LUDWITT_CLIENT_ID!;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri(),
    response_type: "code",
    scope: LUDWITT_SCOPES,
    state,
  });
  return `${ludwittBaseUrl()}/oauth/authorize?${params.toString()}`;
}

export async function exchangeCode(code: string): Promise<LudwittTokenSet> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri(),
    client_id: process.env.LUDWITT_CLIENT_ID!,
    client_secret: process.env.LUDWITT_CLIENT_SECRET!,
  });
  const res = await fetch(`${ludwittBaseUrl()}/api/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`token_exchange_failed:${res.status}:${text}`);
  }
  const json = (await res.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
    token_type?: string;
    scope?: string;
  };
  return {
    access_token: json.access_token,
    refresh_token: json.refresh_token,
    expires_at: Date.now() + (json.expires_in ?? 3600) * 1000,
    token_type: json.token_type,
    scope: json.scope,
  };
}

export async function refreshTokens(refreshToken: string): Promise<LudwittTokenSet> {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: process.env.LUDWITT_CLIENT_ID!,
    client_secret: process.env.LUDWITT_CLIENT_SECRET!,
  });
  const res = await fetch(`${ludwittBaseUrl()}/api/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`token_refresh_failed:${res.status}:${text}`);
  }
  const json = (await res.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
    token_type?: string;
    scope?: string;
  };
  return {
    access_token: json.access_token,
    // Old refresh is single-use — always store the new one when returned.
    refresh_token: json.refresh_token ?? refreshToken,
    expires_at: Date.now() + (json.expires_in ?? 3600) * 1000,
    token_type: json.token_type,
    scope: json.scope,
  };
}

export async function fetchUserInfo(accessToken: string) {
  const res = await fetch(`${ludwittBaseUrl()}/api/oauth/userinfo`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`userinfo_failed:${res.status}:${text}`);
  }
  return res.json() as Promise<{
    sub: string;
    email?: string;
    name?: string;
    picture?: string;
  }>;
}

export async function fetchCreditBalance(accessToken: string) {
  const res = await fetch(`${ludwittBaseUrl()}/api/v1/credits/balance`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const text = await res.text();
  let json: Record<string, unknown> = {};
  try {
    json = JSON.parse(text) as Record<string, unknown>;
  } catch {
    /* ignore */
  }
  return {
    ok: res.ok,
    status: res.status,
    spendableCents: Number(json.spendableCents ?? 0),
    balanceCents: Number(json.balanceCents ?? 0),
    spendableFormatted: String(json.spendableFormatted ?? ""),
    raw: json,
  };
}

export async function callAiProxy(
  accessToken: string,
  messages: { role: "user" | "assistant"; content: string }[],
  opts?: { model?: string; max_tokens?: number },
) {
  const res = await fetch(`${ludwittBaseUrl()}/api/v1/ai/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: opts?.model ?? "claude-sonnet-4-6",
      max_tokens: opts?.max_tokens ?? 1024,
      messages,
    }),
  });
  const text = await res.text();
  let json: Record<string, unknown> = {};
  try {
    json = JSON.parse(text) as Record<string, unknown>;
  } catch {
    json = { error_description: text };
  }
  return { ok: res.ok, status: res.status, json };
}

export async function putHostedDoc(
  accessToken: string,
  collection: string,
  docId: string,
  data: unknown,
  etag?: string,
) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  if (etag) headers["If-Match"] = `"${etag}"`;
  const res = await fetch(
    `${ludwittBaseUrl()}/api/v1/data/${collection}/${docId}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify({ data }),
    },
  );
  return { ok: res.ok, status: res.status, body: await res.text() };
}

export async function getHostedDoc(
  accessToken: string,
  collection: string,
  docId: string,
) {
  const res = await fetch(
    `${ludwittBaseUrl()}/api/v1/data/${collection}/${docId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  if (!res.ok) return null;
  return res.json() as Promise<{ data: unknown; etag?: string }>;
}

export async function listHostedDocs(
  accessToken: string,
  collection: string,
  query?: Record<string, string>,
) {
  const params = new URLSearchParams(query);
  const res = await fetch(
    `${ludwittBaseUrl()}/api/v1/data/${collection}${
      params.toString() ? `?${params}` : ""
    }`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  if (!res.ok) return null;
  return res.json() as Promise<{
    docs: Array<{ docId: string; data: unknown; etag?: string }>;
    nextCursor?: string | null;
  }>;
}

export async function fetchStorageUsage(accessToken: string) {
  const res = await fetch(`${ludwittBaseUrl()}/api/v1/data/_meta/usage`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) return null;
  return res.json();
}

/** Optional cohort-style events bridge (reference API). */
export async function postPlatformEvent(input: {
  appId: string;
  event: string;
  userId: string;
  sessionId: string;
  metadata?: Record<string, unknown>;
}) {
  const apiUrl = process.env.LUDWITT_API_URL;
  const apiKey = process.env.LUDWITT_API_KEY;
  if (!apiUrl || !apiKey) {
    return { ok: false, skipped: true as const };
  }
  const res = await fetch(`${apiUrl}/v1/apps/${input.appId}/events`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event: input.event,
      user_id: input.userId,
      session_id: input.sessionId,
      metadata: input.metadata ?? {},
    }),
  });
  return { ok: res.ok, status: res.status, skipped: false as const };
}
