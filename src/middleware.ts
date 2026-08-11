import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Unauthenticated /admin/* visits start a demo session and return to the same path. */
export function middleware(request: NextRequest) {
  if (request.cookies.get("questfolio_session")?.value) {
    return NextResponse.next();
  }
  const next = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  const launch = new URL("/api/demo-launch", request.url);
  launch.searchParams.set("next", next);
  return NextResponse.redirect(launch);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
