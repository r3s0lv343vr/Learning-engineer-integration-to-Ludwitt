import type { AreaId } from "@/lib/content/areas";
import { CORAL_TRADES } from "@/lib/content/trades-coral";

export type {
  TradeRisk,
  TradeOutcome,
  TradeChoice,
  TradeDataBlock,
  TradeStep,
  TradeArea,
} from "@/lib/content/trades-coral";

export { CORAL_TRADES } from "@/lib/content/trades-coral";

import type {
  TradeArea,
  TradeChoice,
  TradeOutcome,
  TradeStep,
} from "@/lib/content/trades-coral";

function trade(partial: Omit<TradeArea, "scenarioReady">): TradeArea {
  return { ...partial, scenarioReady: true };
}

/** Brick Exchange — analysis trades (6) — single-step stubs */
const BRICK: TradeArea[] = [
  trade({
    id: "tr-ex-ledger",
    areaId: "brick-exchange",
    title: "Ledger Pair Trade",
    summary: "Long quality / short weak peer on statements.",
    risk: "medium",
    capitalDeltaGain: 320,
    capitalDeltaLoss: -180,
    goldReward: 1,
    x: 68,
    y: 74,
    prompt: "Put on the statements pair?",
    choices: [
      {
        label: "Long quality, short weak peer",
        outcome: "gain",
        feedback: "Spread widens your way.",
      },
      {
        label: "Double long both names",
        outcome: "loss",
        feedback: "Sector drawdown cuts the book.",
      },
    ],
  }),
  trade({
    id: "tr-ex-acid",
    areaId: "brick-exchange",
    title: "Acid-Test Screen",
    summary: "Liquidity screen before buying a dockside issuer.",
    risk: "low",
    capitalDeltaGain: 190,
    capitalDeltaLoss: -100,
    x: 76,
    y: 78,
    prompt: "Pass names that fail the acid test?",
    choices: [
      {
        label: "Filter and buy the survivors",
        outcome: "gain",
        feedback: "Avoided a cash crunch name.",
      },
      {
        label: "Ignore liquidity, chase yield",
        outcome: "loss",
        feedback: "Working-capital scare. Loss.",
      },
    ],
  }),
  trade({
    id: "tr-ex-crane",
    areaId: "brick-exchange",
    title: "Crane Capex Bid",
    summary: "Capex-heavy industrial — growth or trap.",
    risk: "high",
    capitalDeltaGain: 450,
    capitalDeltaLoss: -320,
    x: 64,
    y: 68,
    prompt: "Fund the crane expansion story?",
    choices: [
      {
        label: "Size small with a stop",
        outcome: "gain",
        feedback: "Guided raise lands. Book up.",
      },
      {
        label: "Max leverage on the story",
        outcome: "loss",
        feedback: "Cost overrun. Portfolio drops.",
      },
    ],
  }),
  trade({
    id: "tr-ex-wharf",
    areaId: "brick-exchange",
    title: "Wharf Inventory Flip",
    summary: "Short-cycle inventory arbitrage at the docks.",
    risk: "medium",
    capitalDeltaGain: 280,
    capitalDeltaLoss: -200,
    x: 80,
    y: 70,
    prompt: "Flip the seasonal inventory?",
    choices: [
      {
        label: "Flip with confirmed offtake",
        outcome: "gain",
        feedback: "Turn completes. Book rises.",
      },
      {
        label: "Spec without offtake",
        outcome: "loss",
        feedback: "Stock sits. Write-down hits.",
      },
    ],
  }),
  trade({
    id: "tr-ex-ratio",
    areaId: "brick-exchange",
    title: "Ratio Reliquary Deal",
    summary: "Buy only when EV/EBITDA clears your band.",
    risk: "low",
    capitalDeltaGain: 210,
    capitalDeltaLoss: -110,
    x: 72,
    y: 66,
    prompt: "Wait for the multiple to enter band?",
    choices: [
      {
        label: "Wait for the band",
        outcome: "gain",
        feedback: "Entry improves. Book gains.",
      },
      {
        label: "Chase at peak multiple",
        outcome: "loss",
        feedback: "Multiple compresses. Loss.",
      },
    ],
  }),
  trade({
    id: "tr-ex-smokestack",
    areaId: "brick-exchange",
    title: "Smokestack Bond Lot",
    summary: "Industrial bond — carry vs credit scare.",
    risk: "medium",
    capitalDeltaGain: 240,
    capitalDeltaLoss: -170,
    x: 84,
    y: 74,
    prompt: "Take the industrial bond lot?",
    choices: [
      {
        label: "Buy senior secured tranche",
        outcome: "gain",
        feedback: "Carry + stability. Book up.",
      },
      {
        label: "Stretch into subordinated paper",
        outcome: "loss",
        feedback: "Spread blowout. Book down.",
      },
    ],
  }),
];

/** Signal Quay — markets trades (5) */
const QUAY: TradeArea[] = [
  trade({
    id: "tr-quay-wire",
    areaId: "signal-quay",
    title: "Macro Wire Desk",
    summary: "Rates reaction trade around a policy print.",
    risk: "high",
    capitalDeltaGain: 480,
    capitalDeltaLoss: -360,
    goldReward: 1,
    x: 66,
    y: 24,
    prompt: "Position for the policy print?",
    choices: [
      {
        label: "Barbell duration with hedges",
        outcome: "gain",
        feedback: "Print lands in the channel. Gain.",
      },
      {
        label: "All-in directional rates bet",
        outcome: "loss",
        feedback: "Surprise path. Portfolio drops.",
      },
    ],
  }),
  trade({
    id: "tr-quay-glass",
    areaId: "signal-quay",
    title: "Glass Tower REIT Slice",
    summary: "Office REIT — yield versus vacancy risk.",
    risk: "medium",
    capitalDeltaGain: 300,
    capitalDeltaLoss: -210,
    x: 84,
    y: 18,
    prompt: "Add the glass tower REIT slice?",
    choices: [
      {
        label: "Size to yield with vacancy check",
        outcome: "gain",
        feedback: "Occupancy holds. Book up.",
      },
      {
        label: "Ignore vacancy, max yield",
        outcome: "loss",
        feedback: "Tenant exit. Book down.",
      },
    ],
  }),
  trade({
    id: "tr-quay-crane",
    areaId: "signal-quay",
    title: "Harbor Crane Freight",
    summary: "Freight futures sleeve into a supply shock.",
    risk: "high",
    capitalDeltaGain: 520,
    capitalDeltaLoss: -400,
    x: 70,
    y: 42,
    prompt: "Ride the freight spike?",
    choices: [
      {
        label: "Scale in with defined risk",
        outcome: "gain",
        feedback: "Contango pays. Book rises.",
      },
      {
        label: "Yolo the full sleeve",
        outcome: "loss",
        feedback: "Spike fades overnight. Loss.",
      },
    ],
  }),
  trade({
    id: "tr-quay-signal",
    areaId: "signal-quay",
    title: "Signal Overlay Swap",
    summary: "Swap overlay to rebalance factor exposure.",
    risk: "medium",
    capitalDeltaGain: 270,
    capitalDeltaLoss: -150,
    x: 88,
    y: 38,
    prompt: "Run the factor overlay swap?",
    choices: [
      {
        label: "Rebalance to target weights",
        outcome: "gain",
        feedback: "Tracking error shrinks. Gain.",
      },
      {
        label: "Skip rebalance this quarter",
        outcome: "loss",
        feedback: "Drift hurts. Book slips.",
      },
    ],
  }),
  trade({
    id: "tr-quay-pier",
    areaId: "signal-quay",
    title: "Pier Correlation Hedge",
    summary: "Crisis hedge when correlations spike.",
    risk: "medium",
    capitalDeltaGain: 340,
    capitalDeltaLoss: -190,
    x: 76,
    y: 48,
    prompt: "Buy the correlation hedge sleeve?",
    choices: [
      {
        label: "Hedge into the stress window",
        outcome: "gain",
        feedback: "Hedge pays. Portfolio protected and up.",
      },
      {
        label: "Stay naked through the spike",
        outcome: "loss",
        feedback: "Everything sells together. Loss.",
      },
    ],
  }),
];

/** Mandate Highlands — mastery trades (5) */
const HIGHLANDS: TradeArea[] = [
  trade({
    id: "tr-high-mandate",
    areaId: "mandate-highlands",
    title: "Mandate Defence Lot",
    summary: "Trade only inside IPS language — or breach.",
    risk: "low",
    capitalDeltaGain: 230,
    capitalDeltaLoss: -260,
    goldReward: 1,
    x: 18,
    y: 24,
    prompt: "Approve the lot under the IPS?",
    choices: [
      {
        label: "Approve within mandate bands",
        outcome: "gain",
        feedback: "Compliant gain. Book rises.",
      },
      {
        label: "Stretch outside the IPS",
        outcome: "loss",
        feedback: "Breach costs and mark-down.",
      },
    ],
  }),
  trade({
    id: "tr-high-thesis",
    areaId: "mandate-highlands",
    title: "Thesis Forge Ticket",
    summary: "Size a recommendation with falsifiers set.",
    risk: "medium",
    capitalDeltaGain: 360,
    capitalDeltaLoss: -240,
    x: 38,
    y: 22,
    prompt: "Ticket the thesis with falsifiers?",
    choices: [
      {
        label: "Ticket with stops at falsifiers",
        outcome: "gain",
        feedback: "Process edge. Book up.",
      },
      {
        label: "Ticket with no exit plan",
        outcome: "loss",
        feedback: "Thesis breaks; no exit. Loss.",
      },
    ],
  }),
  trade({
    id: "tr-high-ethics",
    areaId: "mandate-highlands",
    title: "Ethics Gate Swap",
    summary: "Refuse a conflicted flow — reputation capital.",
    risk: "low",
    capitalDeltaGain: 200,
    capitalDeltaLoss: -300,
    x: 24,
    y: 42,
    prompt: "Take the conflicted principal swap?",
    choices: [
      {
        label: "Refuse and document",
        outcome: "gain",
        feedback: "Trust premium. Book and gold steady up.",
      },
      {
        label: "Take the conflicted flow",
        outcome: "loss",
        feedback: "Clawback. Portfolio damaged.",
      },
    ],
  }),
  trade({
    id: "tr-high-bias",
    areaId: "mandate-highlands",
    title: "Bias Drill Auction",
    summary: "Auction lot designed to bait anchoring.",
    risk: "medium",
    capitalDeltaGain: 250,
    capitalDeltaLoss: -180,
    x: 40,
    y: 34,
    prompt: "Bid with a pre-committed ceiling?",
    choices: [
      {
        label: "Ceiling bid only",
        outcome: "gain",
        feedback: "Avoided anchor trap. Gain.",
      },
      {
        label: "Chase the room higher",
        outcome: "loss",
        feedback: "Overpaid. Book down.",
      },
    ],
  }),
  trade({
    id: "tr-high-summit",
    areaId: "mandate-highlands",
    title: "Summit IC Lot",
    summary: "Investment committee defence — size or pass.",
    risk: "high",
    capitalDeltaGain: 500,
    capitalDeltaLoss: -350,
    x: 32,
    y: 46,
    prompt: "Defend the lot to the mock IC?",
    choices: [
      {
        label: "Defend with full packet",
        outcome: "gain",
        feedback: "IC clears. Book jumps.",
      },
      {
        label: "Wing it without data",
        outcome: "loss",
        feedback: "Rejected and marked down.",
      },
    ],
  }),
];

export const TRADE_AREAS: TradeArea[] = [
  ...CORAL_TRADES,
  ...BRICK,
  ...QUAY,
  ...HIGHLANDS,
];

export function getTrade(id: string) {
  return TRADE_AREAS.find((t) => t.id === id);
}

export function tradesForArea(areaId: AreaId) {
  return TRADE_AREAS.filter((t) => t.areaId === areaId);
}

export function tradeHasSteps(trade: TradeArea): trade is TradeArea & {
  steps: TradeStep[];
} {
  return Array.isArray(trade.steps) && trade.steps.length > 0;
}

export function tradeCapitalDelta(trade: TradeArea, outcome: TradeOutcome) {
  return outcome === "gain" ? trade.capitalDeltaGain : trade.capitalDeltaLoss;
}

export type TradePathResult = {
  ok: true;
  outcome: TradeOutcome;
  capitalDelta: number;
  goldReward?: number;
  feedback: string[];
  stepCount: number;
  pctTotal: number;
};

export type TradePathError = {
  ok: false;
  error: string;
};

/**
 * Resolve a multi-step sword path server-side.
 * Capital compounds by each choice's capitalPct against startingCapital.
 */
export function resolveTradePath(
  trade: TradeArea,
  choiceIds: string[],
  startingCapital: number,
): TradePathResult | TradePathError {
  if (!tradeHasSteps(trade)) {
    return { ok: false, error: "not_multi_step" };
  }
  const steps = trade.steps;
  if (choiceIds.length !== steps.length) {
    return { ok: false, error: "incomplete_path" };
  }

  let capital = Math.max(0, startingCapital);
  const start = capital;
  const feedback: string[] = [];
  let gainSteps = 0;
  let lossSteps = 0;

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]!;
    const choiceId = choiceIds[i]!;
    const chosen = step.choices.find((c) => (c.id ?? c.label) === choiceId);
    if (!chosen) return { ok: false, error: "invalid_choice" };
    const pct = Number(chosen.capitalPct ?? 0);
    if (!Number.isFinite(pct) || Math.abs(pct) > 0.08) {
      return { ok: false, error: "invalid_pct" };
    }
    capital = Math.max(0, capital * (1 + pct));
    feedback.push(chosen.feedback);
    if (chosen.outcome === "gain") gainSteps += 1;
    else lossSteps += 1;
  }

  let capitalDelta = Math.round(capital - start);
  // Clamp extreme swings (±18% of start) as a safety rail.
  const maxAbs = Math.round(start * 0.18);
  if (capitalDelta > maxAbs) capitalDelta = maxAbs;
  if (capitalDelta < -maxAbs) capitalDelta = -maxAbs;

  const outcome: TradeOutcome = capitalDelta >= 0 ? "gain" : "loss";
  const goldReward =
    outcome === "gain" && gainSteps >= lossSteps ? trade.goldReward : undefined;

  return {
    ok: true,
    outcome,
    capitalDelta,
    goldReward,
    feedback,
    stepCount: steps.length,
    pctTotal: start > 0 ? capitalDelta / start : 0,
  };
}

export function resolveLegacyTradeChoice(
  trade: TradeArea,
  choice: TradeChoice,
): TradePathResult {
  const outcome = choice.outcome;
  const capitalDelta = tradeCapitalDelta(trade, outcome);
  return {
    ok: true,
    outcome,
    capitalDelta,
    goldReward: outcome === "gain" ? trade.goldReward : undefined,
    feedback: [choice.feedback],
    stepCount: 1,
    pctTotal: 0,
  };
}
