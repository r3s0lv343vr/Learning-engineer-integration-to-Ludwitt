import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { setSessionCookie, saveState } from "@/lib/session";
import { createInitialState, pushEvent } from "@/lib/game-state";
import { appOrigin } from "@/lib/ludwitt";

/** Cohort JWT launch bridge: /launch?token=... */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const secret = process.env.LUDWITT_JWT_SECRET;
  if (!token || !secret) {
    return NextResponse.redirect(
      new URL("/?error=launch_from_ludwitt", appOrigin()),
    );
  }
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
    );
    const userId = String(payload.sub || "");
    const email = typeof payload.email === "string" ? payload.email : undefined;
    if (!userId) throw new Error("missing_sub");
    await setSessionCookie({ userId, email, name: email, ludwittSub: userId });
    let state = createInitialState({ userId, email, displayName: email });
    state = pushEvent(state, "session_started", { source: "jwt_launch" });
    state = pushEvent(state, "lesson_started", { moduleId: "m1" });
    await saveState(state);
    return NextResponse.redirect(new URL("/map", appOrigin()));
  } catch {
    return NextResponse.redirect(
      new URL("/?error=invalid_launch_token", appOrigin()),
    );
  }
}
