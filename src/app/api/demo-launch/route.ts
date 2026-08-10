import { NextRequest, NextResponse } from "next/server";
import { setSessionCookie, saveState } from "@/lib/session";
import { createInitialState, pushEvent } from "@/lib/game-state";
import { appOrigin } from "@/lib/ludwitt";

function safeNextPath(raw: string | null): string {
  if (!raw) return "/map";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/map";
  return raw;
}

export async function GET(req: NextRequest) {
  const userId = `demo-${crypto.randomUUID().slice(0, 8)}`;
  await setSessionCookie({
    userId,
    email: `${userId}@demo.local`,
    name: "Demo Adventurer",
    demo: true,
  });
  let state = createInitialState({
    userId,
    email: `${userId}@demo.local`,
    displayName: "Demo Adventurer",
  });
  state = pushEvent(state, "session_started", { source: "demo-launch" });
  state = pushEvent(state, "lesson_started", { moduleId: "m1" });
  await saveState(state);
  const next = safeNextPath(req.nextUrl.searchParams.get("next"));
  return NextResponse.redirect(new URL(next, appOrigin()));
}
