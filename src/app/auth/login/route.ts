import { NextResponse } from "next/server";
import { authorizeUrl, ludwittConfigured, appOrigin } from "@/lib/ludwitt";
import { cookies } from "next/headers";

export async function GET() {
  if (!ludwittConfigured()) {
    return NextResponse.redirect(
      new URL("/?error=ludwitt_not_configured", appOrigin()),
    );
  }
  const state = crypto.randomUUID();
  const jar = await cookies();
  jar.set("ludwitt_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 600,
  });
  return NextResponse.redirect(authorizeUrl(state));
}
