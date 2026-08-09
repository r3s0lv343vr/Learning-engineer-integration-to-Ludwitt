import { NextRequest, NextResponse } from "next/server";
import { loadState, saveState } from "@/lib/session";
import {
  applyAnswer,
  applySidequestResult,
  completeModule,
  leaveDetention,
  upsertHolding,
} from "@/lib/game-state";
import type { Holding } from "@/lib/types";

export async function GET() {
  const state = await loadState();
  if (!state) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json(state);
}

export async function POST(req: NextRequest) {
  const state = await loadState();
  if (!state) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json();

  let next = state;
  switch (body.action) {
    case "answer":
      next = applyAnswer(state, {
        questionId: body.questionId,
        correct: Boolean(body.correct),
        moduleId: body.moduleId,
      });
      break;
    case "complete_module":
      next = completeModule(state, body.moduleId);
      break;
    case "sidequest":
      next = applySidequestResult(state, {
        sidequestId: body.sidequestId,
        success: Boolean(body.success),
        capitalDelta: Number(body.capitalDelta) || 0,
        goldReward: body.goldReward,
        chestGold: body.chestGold,
      });
      break;
    case "trade":
      next = upsertHolding(state, body.holding as Holding, body.mode);
      break;
    case "leave_detention":
      next = leaveDetention(state);
      break;
    case "move":
      next = {
        ...state,
        mapPosition: { x: Number(body.x), y: Number(body.y) },
        updatedAt: new Date().toISOString(),
      };
      break;
    default:
      return NextResponse.json({ error: "unknown_action" }, { status: 400 });
  }

  await saveState(next);
  return NextResponse.json(next);
}
