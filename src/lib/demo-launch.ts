import { NextResponse } from "next/server";
import { setSessionCookie, saveState } from "@/lib/session";
import { createInitialState, pushEvent } from "@/lib/game-state";
import { appOrigin } from "@/lib/ludwitt";

export function safeNextPath(raw: string | null | undefined): string {
  if (!raw) return "/map";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/map";
  return raw;
}

/** Start a demo session and redirect into the app (default /map). */
export async function launchDemoSession(nextPath?: string | null) {
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
  const next = safeNextPath(nextPath);
  return NextResponse.redirect(new URL(next, appOrigin()));
}
