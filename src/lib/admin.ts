import { cookies } from "next/headers";
import type { SessionPayload } from "@/lib/session";

export const ADMIN_COOKIE = "questfolio_library_admin";

function parseList(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(/[,;\s]+/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function libraryAdminKey(): string {
  return (process.env.LIBRARY_ADMIN_KEY || "").trim();
}

export function adminEmails(): string[] {
  return parseList(process.env.ADMIN_EMAILS);
}

export function adminUserIds(): string[] {
  return parseList(process.env.ADMIN_USER_IDS);
}

/** True when the signed-in user matches ADMIN_EMAILS / ADMIN_USER_IDS. */
export function isListedAdmin(session: SessionPayload | null | undefined): boolean {
  if (!session) return false;
  const emails = adminEmails();
  const ids = adminUserIds();
  if (emails.length === 0 && ids.length === 0) return false;
  const email = (session.email || "").trim().toLowerCase();
  const userId = (session.userId || "").trim().toLowerCase();
  if (email && emails.includes(email)) return true;
  if (userId && ids.includes(userId)) return true;
  return false;
}

/** True when the admin unlock cookie matches LIBRARY_ADMIN_KEY. */
export async function hasAdminKeyCookie(): Promise<boolean> {
  const key = libraryAdminKey();
  if (!key) return false;
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === key;
}

/**
 * Administrator access for library backend only.
 * Demo learner sessions never count as admin unless they also hold the admin key cookie
 * or match an allow-listed email/user id.
 */
export async function isLibraryAdmin(
  session: SessionPayload | null | undefined,
): Promise<boolean> {
  if (await hasAdminKeyCookie()) return true;
  return isListedAdmin(session);
}

export async function setAdminKeyCookie(key: string) {
  const expected = libraryAdminKey();
  if (!expected || key !== expected) return false;
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, expected, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return true;
}

export async function clearAdminKeyCookie() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
}
