import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import type { GameState } from "@/lib/types";
import { createInitialState } from "@/lib/game-state";

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
}

const STATE_COOKIE = "questfolio_state";

export async function loadState(): Promise<GameState | null> {
  const session = await readSession();
  if (!session) return null;
  const jar = await cookies();
  const raw = jar.get(STATE_COOKIE)?.value;
  if (raw) {
    try {
      const parsed = JSON.parse(decodeURIComponent(raw)) as GameState;
      if (parsed.userId === session.userId) return parsed;
    } catch {
      /* fall through */
    }
  }
  return createInitialState({
    userId: session.userId,
    email: session.email,
    displayName: session.name,
  });
}

export async function saveState(state: GameState) {
  const jar = await cookies();
  // Cookie budget: keep a compact snapshot (drop bulky event history for cookie).
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
}

export { COOKIE as SESSION_COOKIE, STATE_COOKIE };
