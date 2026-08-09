import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import {
  refreshTokens,
  type LudwittTokenSet,
} from "@/lib/ludwitt";

const TOKEN_COOKIE = "questfolio_ludwitt_tokens";

function secretKey() {
  const secret = process.env.SESSION_SECRET || "dev-only-questfolio-session-secret";
  return new TextEncoder().encode(secret);
}

export async function saveTokenSet(tokens: LudwittTokenSet) {
  const sealed = await new SignJWT(tokens as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secretKey());
  const jar = await cookies();
  jar.set(TOKEN_COOKIE, sealed, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearTokenSet() {
  const jar = await cookies();
  jar.delete(TOKEN_COOKIE);
}

export async function readTokenSet(): Promise<LudwittTokenSet | null> {
  const jar = await cookies();
  const raw = jar.get(TOKEN_COOKIE)?.value;
  if (!raw) return null;
  try {
    const { payload } = await jwtVerify(raw, secretKey());
    return payload as unknown as LudwittTokenSet;
  } catch {
    return null;
  }
}

/** Returns a valid access token, refreshing when within 60s of expiry. */
export async function getValidAccessToken(): Promise<string | null> {
  let tokens = await readTokenSet();
  if (!tokens?.access_token) return null;

  const needsRefresh = tokens.expires_at <= Date.now() + 60_000;
  if (!needsRefresh) return tokens.access_token;

  if (!tokens.refresh_token) return tokens.access_token;

  try {
    tokens = await refreshTokens(tokens.refresh_token);
    await saveTokenSet(tokens);
    return tokens.access_token;
  } catch (err) {
    console.error("ludwitt_refresh_failed", err);
    return null;
  }
}

export { TOKEN_COOKIE };
