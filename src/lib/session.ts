import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import type { GameState } from "@/lib/types";
import { createInitialState, normalizeState } from "@/lib/game-state";
import { loadProgressFromHosted, syncStateToHosted } from "@/lib/hosted-sync";
import { clearTokenSet } from "@/lib/tokens";

const COOKIE = "questfolio_session";

export type SessionPayload = {
  userId: string;
  email?: string;
  name?: string;
  ludwittSub?: string;
  demo?: boolean;
};

function secretKey() {
  const secret = process.env.SESSION_SECRET || "dev-only-questfolio-session-secret";
  return new TextEncoder().encode(secret);
}

export async function sealSession(payload: SessionPayload) {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());
}

export async function readSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(payload: SessionPayload) {
  const token = await sealSession(payload);
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
  await clearTokenSet();
}

const STATE_COOKIE = "questfolio_state";

export async function loadState(): Promise<GameState | null> {
  const session = await readSession();
  if (!session) return null;
  const jar = await cookies();
  const raw = jar.get(STATE_COOKIE)?.value;
  let local: GameState | null = null;
  if (raw) {
    try {
      const parsed = JSON.parse(decodeURIComponent(raw)) as GameState;
      if (parsed.userId === session.userId) local = parsed;
    } catch {
      /* fall through */
    }
  }
  const base =
    local ??
    createInitialState({
      userId: session.userId,
      email: session.email,
      displayName: session.name,
    });

  // Ludwitt users: prefer hosted progress when available.
  if (!session.demo && session.ludwittSub) {
    try {
      return normalizeState(await loadProgressFromHosted(base));
    } catch {
      return normalizeState(base);
    }
  }
  return normalizeState(base);
}

export async function saveState(state: GameState) {
  const jar = await cookies();
  const slim: GameState = {
    ...state,
    events: state.events.slice(-20),
  };
  jar.set(STATE_COOKIE, encodeURIComponent(JSON.stringify(slim)), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  // Best-effort hosted sync for Ludwitt-authenticated users.
  try {
    await syncStateToHosted(slim);
  } catch (err) {
    console.error("hosted_sync_failed", err);
  }
}

export { COOKIE as SESSION_COOKIE, STATE_COOKIE };
