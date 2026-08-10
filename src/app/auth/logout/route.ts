import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clearSessionCookie, STATE_COOKIE } from "@/lib/session";
import { appOrigin } from "@/lib/ludwitt";

async function logoutAndRedirect() {
  await clearSessionCookie();
  const jar = await cookies();
  jar.delete(STATE_COOKIE);
  return NextResponse.redirect(new URL("/", appOrigin()));
}

export async function GET(req: NextRequest) {
  // Ignore Next.js RSC / Link prefetches so StatusBar never wipes the session.
  const isRsc = req.nextUrl.searchParams.has("_rsc");
  const purpose = req.headers.get("purpose") || req.headers.get("sec-purpose");
  const isPrefetch =
    purpose === "prefetch" ||
    req.headers.get("next-router-prefetch") === "1" ||
    req.headers.get("x-middleware-prefetch") === "1";
  if (isRsc || isPrefetch) {
    return new NextResponse(null, { status: 204 });
  }
  return logoutAndRedirect();
}
