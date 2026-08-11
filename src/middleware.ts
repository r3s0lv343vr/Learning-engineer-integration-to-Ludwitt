import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/admin-edge";

function safeAdminNext(pathname: string, search: string): string {
  const next = `${pathname}${search}`;
  if (!next.startsWith("/admin") || next.startsWith("/admin/login")) {
    return "/admin";
  }
  return next;
}

/**
 * /admin/* requires a session. Console routes also require administrator unlock;
 * otherwise send visitors to /admin/login so console pages never render.
 */
export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isLogin = pathname === "/admin/login";
  const hasSession = Boolean(request.cookies.get("questfolio_session")?.value);

  if (!hasSession) {
    const launch = new URL("/api/demo-launch", request.url);
    launch.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(launch);
  }

  const admin = await isAdminRequest(request);

  if (!admin && !isLogin) {
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("next", safeAdminNext(pathname, search));
    return NextResponse.redirect(login);
  }

  if (admin && isLogin) {
    const nextRaw = request.nextUrl.searchParams.get("next");
    const next =
      nextRaw && nextRaw.startsWith("/") && !nextRaw.startsWith("//")
        ? nextRaw
        : "/admin";
    return NextResponse.redirect(new URL(next, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
