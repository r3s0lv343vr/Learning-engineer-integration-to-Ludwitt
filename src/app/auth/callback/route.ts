import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  exchangeCode,
  fetchUserInfo,
  getHostedDoc,
  putHostedDoc,
  appOrigin,
} from "@/lib/ludwitt";
import { setSessionCookie, saveState } from "@/lib/session";
import { saveTokenSet } from "@/lib/tokens";
import { createInitialState, pushEvent } from "@/lib/game-state";
import type { GameState } from "@/lib/types";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const jar = await cookies();
  const expected = jar.get("ludwitt_oauth_state")?.value;
  jar.delete("ludwitt_oauth_state");

  if (!code || !state || !expected || state !== expected) {
    return NextResponse.redirect(new URL("/?error=oauth_state", appOrigin()));
  }

  try {
    const tokens = await exchangeCode(code);
    await saveTokenSet(tokens);

    const user = await fetchUserInfo(tokens.access_token);
    await setSessionCookie({
      userId: user.sub,
      email: user.email,
      name: user.name,
      ludwittSub: user.sub,
    });

    let stateDoc = createInitialState({
      userId: user.sub,
      email: user.email,
      displayName: user.name,
    });

    // Resume hosted progress when present.
    const existing = await getHostedDoc(tokens.access_token, "progress", "latest");
    if (existing?.data && typeof existing.data === "object") {
      const data = existing.data as Partial<GameState>;
      stateDoc = {
        ...stateDoc,
        ...data,
        userId: user.sub,
        email: user.email,
        displayName: user.name,
        version: 1,
        sessionId: crypto.randomUUID(),
      };
    }

    stateDoc = pushEvent(stateDoc, "session_started", { source: "ludwitt_oauth" });
    await saveState(stateDoc);

    await putHostedDoc(tokens.access_token, "sessions", stateDoc.sessionId, {
      startedAt: new Date().toISOString(),
      userId: user.sub,
      updatedAt: stateDoc.updatedAt,
    });
    await putHostedDoc(tokens.access_token, "event_log", `${Date.now()}`, {
      type: "session_started",
      sessionId: stateDoc.sessionId,
      createdAt: new Date().toISOString(),
      userId: user.sub,
    });

    return NextResponse.redirect(new URL("/map", appOrigin()));
  } catch (err) {
    console.error("oauth_callback_failed", err);
    return NextResponse.redirect(new URL("/?error=oauth_exchange", appOrigin()));
  }
}
