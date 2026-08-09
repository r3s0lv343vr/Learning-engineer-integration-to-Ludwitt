import { NextRequest, NextResponse } from "next/server";
import { loadState, saveState } from "@/lib/session";
import { pushEvent } from "@/lib/game-state";
import { postPlatformEvent } from "@/lib/ludwitt";
import type { LearningEvent } from "@/lib/types";

export async function GET() {
  const state = await loadState();
  if (!state) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({
    sessionId: state.sessionId,
    events: state.events,
  });
}

export async function POST(req: NextRequest) {
  const state = await loadState();
  if (!state) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json()) as {
    type: LearningEvent["type"];
    metadata?: Record<string, unknown>;
  };
  if (!body?.type) {
    return NextResponse.json({ error: "type_required" }, { status: 400 });
  }
  const next = pushEvent(state, body.type, body.metadata);
  await saveState(next);

  const appId = process.env.LUDWITT_APP_ID || "local-dev";
  const bridge = await postPlatformEvent({
    appId,
    event: body.type,
    userId: state.userId,
    sessionId: state.sessionId,
    metadata: body.metadata,
  });

  return NextResponse.json({
    ok: true,
    event: next.events[next.events.length - 1],
    platform: bridge,
  });
}
