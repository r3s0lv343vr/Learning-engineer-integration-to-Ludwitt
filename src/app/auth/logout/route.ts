import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clearSessionCookie, STATE_COOKIE } from "@/lib/session";
import { appOrigin } from "@/lib/ludwitt";

export async function GET() {
  await clearSessionCookie();
  const jar = await cookies();
  jar.delete(STATE_COOKIE);
  return NextResponse.redirect(new URL("/", appOrigin()));
}
