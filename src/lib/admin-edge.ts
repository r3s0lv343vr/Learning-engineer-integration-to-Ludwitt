import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";

/** Keep in sync with ADMIN_COOKIE in src/lib/admin.ts */
const ADMIN_COOKIE = "questfolio_library_admin";

function sessionSecret() {
  const secret =
    process.env.SESSION_SECRET || "dev-only-questfolio-session-secret";
  return new TextEncoder().encode(secret);
}

function parseList(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(/[,;\s]+/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/** Edge-safe admin check for middleware (cookie key or allow-listed session). */
export async function isAdminRequest(req: NextRequest): Promise<boolean> {
  const expectedKey = (process.env.LIBRARY_ADMIN_KEY || "").trim();
  const adminCookie = req.cookies.get(ADMIN_COOKIE)?.value;
  if (expectedKey && adminCookie === expectedKey) return true;

  const token = req.cookies.get("questfolio_session")?.value;
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, sessionSecret());
    const email = String(payload.email ?? "")
      .trim()
      .toLowerCase();
    const userId = String(payload.userId ?? "")
      .trim()
      .toLowerCase();
    const emails = parseList(process.env.ADMIN_EMAILS);
    const ids = parseList(process.env.ADMIN_USER_IDS);
    if (email && emails.includes(email)) return true;
    if (userId && ids.includes(userId)) return true;
  } catch {
    return false;
  }
  return false;
}
