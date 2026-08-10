import { NextRequest, NextResponse } from "next/server";
import {
  clearAdminKeyCookie,
  libraryAdminKey,
  setAdminKeyCookie,
} from "@/lib/admin";

/** Unlock or clear the library administrator cookie via LIBRARY_ADMIN_KEY. */
export async function POST(req: NextRequest) {
  let body: { action?: string; key?: string } = {};
  try {
    body = (await req.json()) as { action?: string; key?: string };
  } catch {
    /* empty body ok for logout */
  }

  if (body.action === "logout") {
    await clearAdminKeyCookie();
    return NextResponse.json({ ok: true });
  }

  const configured = libraryAdminKey();
  if (!configured) {
    return NextResponse.json(
      { error: "admin_key_not_configured" },
      { status: 503 },
    );
  }

  const key = String(body.key ?? "").trim();
  const ok = await setAdminKeyCookie(key);
  if (!ok) {
    return NextResponse.json({ error: "invalid_key" }, { status: 403 });
  }
  return NextResponse.json({ ok: true });
}
