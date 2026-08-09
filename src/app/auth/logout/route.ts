import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/session";
import { appOrigin } from "@/lib/ludwitt";
import { cookies } from "next/headers";
import { STATE_COOKIE } from "@/lib/session";

export async function GET() {
  await clearSessionCookie();
  const jar = await cookies();
  jar.delete(STATE_COOKIE);
  return NextResponse.redirect(new URL("/", appOrigin()));
}
