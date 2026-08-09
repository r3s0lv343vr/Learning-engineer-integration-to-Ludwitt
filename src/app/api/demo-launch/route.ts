import { NextResponse } from "next/server";
import { setSessionCookie, saveState } from "@/lib/session";
import { createInitialState, pushEvent } from "@/lib/game-state";
import { appOrigin } from "@/lib/ludwitt";

export async function GET() {
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
  return NextResponse.redirect(new URL("/map", appOrigin()));
}
