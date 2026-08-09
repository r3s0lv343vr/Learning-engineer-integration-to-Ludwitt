const DEFAULT_BASE = "https://pitchrise.ludwitt.com";

export function ludwittConfigured() {
  return Boolean(process.env.LUDWITT_CLIENT_ID && process.env.LUDWITT_CLIENT_SECRET);
}

export function ludwittBaseUrl() {
  return process.env.LUDWITT_BASE_URL || DEFAULT_BASE;
}

export function appOrigin() {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export function authorizeUrl(state: string) {
  const clientId = process.env.LUDWITT_CLIENT_ID!;
  const redirectUri = `${appOrigin()}/auth/callback`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "profile credits:read data:read data:write",
    state,
  });
  return `${ludwittBaseUrl()}/oauth/authorize?${params.toString()}`;
}

export async function exchangeCode(code: string) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: `${appOrigin()}/auth/callback`,
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
  return res.json() as Promise<{
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
    token_type?: string;
  }>;
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

export async function putHostedDoc(
  accessToken: string,
  collection: string,
  docId: string,
  data: unknown,
) {
  const res = await fetch(
    `${ludwittBaseUrl()}/api/v1/data/${collection}/${docId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
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
