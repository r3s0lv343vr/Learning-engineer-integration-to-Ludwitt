import { NextRequest, NextResponse } from "next/server";
import { loadState, saveState } from "@/lib/session";
import {
  applyAnswer,
  applySidequestResult,
  applyTradeAreaResult,
  completeExam,
  completeModule,
  leaveDetention,
  upsertHolding,
} from "@/lib/game-state";
import type { Holding } from "@/lib/types";
import {
  getTrade,
  resolveLegacyTradeChoice,
  resolveTradePath,
  tradeHasSteps,
} from "@/lib/content/trades";

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
  let tradeResult:
    | {
        outcome: "gain" | "loss";
        capitalDelta: number;
        goldReward?: number;
        feedback: string[];
      }
    | undefined;

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
    case "complete_exam":
      next = completeExam(state, body.examId);
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
    case "trade_area": {
      const trade = getTrade(String(body.tradeId ?? ""));
      if (!trade) {
        return NextResponse.json({ error: "unknown_trade" }, { status: 404 });
      }
      if (tradeHasSteps(trade)) {
        const resolved = resolveTradePath(
          trade,
          Array.isArray(body.choiceIds) ? body.choiceIds.map(String) : [],
          Number(body.startingCapital ?? state.capital) || state.capital,
        );
        if (!resolved.ok) {
          return NextResponse.json({ error: resolved.error }, { status: 400 });
        }
        tradeResult = {
          outcome: resolved.outcome,
          capitalDelta: resolved.capitalDelta,
          goldReward: resolved.goldReward,
          feedback: resolved.feedback,
        };
      } else {
        const label = String(body.choiceLabel ?? "");
        const choice = trade.choices.find((c) => c.label === label);
        if (!choice) {
          if (body.outcome && body.capitalDelta != null) {
            tradeResult = {
              outcome: body.outcome === "loss" ? "loss" : "gain",
              capitalDelta: Number(body.capitalDelta) || 0,
              goldReward: body.goldReward,
              feedback: [],
            };
          } else {
            return NextResponse.json({ error: "invalid_choice" }, { status: 400 });
          }
        } else {
          const resolved = resolveLegacyTradeChoice(trade, choice);
          tradeResult = {
            outcome: resolved.outcome,
            capitalDelta: resolved.capitalDelta,
            goldReward: resolved.goldReward,
            feedback: resolved.feedback,
          };
        }
      }
      next = applyTradeAreaResult(state, {
        tradeId: trade.id,
        outcome: tradeResult.outcome,
        capitalDelta: tradeResult.capitalDelta,
        goldReward: tradeResult.goldReward,
      });
      break;
    }
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
  return NextResponse.json(tradeResult ? { ...next, tradeResult } : next);
}
