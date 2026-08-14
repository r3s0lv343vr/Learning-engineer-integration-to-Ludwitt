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

function choice(
  id: string,
  label: string,
  outcome: TradeOutcome,
  capitalPct: number,
  feedback: string,
): TradeChoice {
  return { id, label, outcome, capitalPct, feedback };
}

/** Brick Exchange — analysis trades (6) */
const BRICK: TradeArea[] = [
  trade({
    id: "tr-ex-ledger",
    areaId: "brick-exchange",
    title: "Ledger Pair Trade",
    summary:
      "Compare two Brick Exchange issuers as economic systems, then long the name whose statements convert to cash — and size the pair.",
    risk: "medium",
    capitalDeltaGain: 320,
    capitalDeltaLoss: -180,
    goldReward: 1,
    x: 68,
    y: 74,
    prompt: "Complete the Ledger Pair statements chain.",
    choices: [],
    steps: [
      {
        id: "ledger-1",
        title: "Part 1 · Economic system, not the ticker",
        narrative:
          "Two dockside names compete for a pair sleeve. Blue City Portal 10: start with the business — what is sold, who pays, share and whether any advantage looks durable — before ratios.",
        data: [
          {
            kind: "table",
            title: "Company comparison scorecard",
            headers: ["Factor", "KilnCo", "FlashWharf"],
            rows: [
              ["What is sold?", "Industrial kiln parts on contracts", "Fad consumer SKU, one-time"],
              ["Who pays?", "Repeat B2B plants", "Promoters + three big buyers"],
              ["Revenue", "$18 × 240,000 units = $4.32m", "$48m → $54m sales (12.5% growth)"],
              ["Market share", "$900m / $6bn market = 15%", "Growing sales, losing share"],
              ["Advantage evidence", "Lower unit cost, durable margins", "Popular brand only"],
            ],
          },
          {
            kind: "news",
            title: "Exchange wires",
            items: [
              {
                headline: "FlashWharf social thread: ‘12.5% growth — load the boat’",
                source: "Message board",
                note: "No share or customer-concentration check",
              },
              {
                headline: "KilnCo plants re-up annual parts contracts",
                source: "Customer filings / trade press",
              },
            ],
          },
        ],
        choices: [
          choice(
            "ledger-1a",
            "Shortlist KilnCo — business model, 15% share and cost evidence beat headline growth",
            "gain",
            0.015,
            "Scorecard first: a firm can grow while losing share. KilnCo stays on the pair list.",
          ),
          choice(
            "ledger-1b",
            "Chase FlashWharf because 12.5% revenue growth is the whole story",
            "loss",
            -0.02,
            "Growth without share or advantage is not a buy. The notes: a calculated number is not yet a decision.",
          ),
          choice(
            "ledger-1c",
            "Skip the scorecard and double-long both tickers",
            "loss",
            -0.012,
            "No process. Portal 10’s lab task is compare before selecting one for deeper work.",
          ),
        ],
      },
      {
        id: "ledger-2",
        title: "Part 2 · Profit layers vs cash",
        narrative:
          "Portal 11: the three statements answer different questions. Build KilnCo’s income-statement layers, then test whether FlashWharf’s higher net income became cash.",
        data: [
          {
            kind: "calc",
            title: "KilnCo income statement (notes example 11.1)",
            lines: [
              "Revenue $12.0m − COGS $7.2m = Gross $4.8m",
              "Gross $4.8m − opex $2.4m = Operating $2.4m",
              "Operating $2.4m − interest $0.3m = Pre-tax $2.1m",
              "Pre-tax $2.1m − tax $0.42m = Net income $1.68m",
              "Interpretation: profitable on paper — cash still unproven.",
            ],
          },
          {
            kind: "calc",
            title: "FlashWharf profit without equal cash (notes example 11.5)",
            lines: [
              "Net income $2.0m",
              "Receivables rise $0.9m; inventory rises $0.4m",
              "Approx. cash after those uses = $2.0m − $0.9m − $0.4m = $0.7m",
              "Strong accounting profit can coexist with weak cash conversion.",
            ],
          },
          {
            kind: "metrics",
            title: "Simplified FCF (KilnCo)",
            items: [
              { label: "CFO", value: "$3.6m" },
              { label: "Capex", value: "$1.4m" },
              { label: "FCF = CFO − capex", value: "$2.2m" },
            ],
          },
        ],
        choices: [
          choice(
            "ledger-2a",
            "Treat FlashWharf’s $2.0m NI as weaker — $0.7m cash after working-capital uses; KilnCo’s $1.68m still needs FCF ($2.2m)",
            "gain",
            0.018,
            "Net income is not cash. KilnCo’s statements tell one story; FlashWharf’s profit did not convert.",
          ),
          choice(
            "ledger-2b",
            "Long FlashWharf because $2.0m net income beats $1.68m",
            "loss",
            -0.025,
            "Higher NI with receivables and inventory racing ahead is a Portal 11 red flag, not a pair long.",
          ),
          choice(
            "ledger-2c",
            "Ignore the cash-flow statement once both names show a profit",
            "loss",
            -0.015,
            "Companies pay obligations with cash. Accrual profit is not deployable capital.",
          ),
        ],
      },
      {
        id: "ledger-3",
        title: "Part 3 · Build the statements pair",
        narrative:
          "The desk wants a pair: long quality / short the weak peer. Use share, advantage evidence and cash conversion — not the larger earnings print.",
        data: [
          {
            kind: "table",
            title: "Pair snapshot",
            headers: ["Check", "KilnCo", "FlashWharf"],
            rows: [
              ["Share / advantage", "15% share; cost evidence", "Losing share; brand only"],
              ["NI", "$1.68m", "$2.0m"],
              ["Cash conversion", "FCF $2.2m", "~$0.7m after WC uses"],
              ["NWC note", "Composition still matters", "Receivables + inventory soak cash"],
            ],
          },
          {
            kind: "news",
            title: "Tape",
            items: [
              {
                headline: "Street note: ‘FlashWharf cheapest on NI’",
                source: "Sell-side blast",
                note: "Pairs NI without the cash bridge",
              },
            ],
          },
        ],
        choices: [
          choice(
            "ledger-3a",
            "Long KilnCo / short FlashWharf — quality statements vs weak cash conversion",
            "gain",
            0.02,
            "Spread is the process: economic system + cash conversion, not the bigger earnings line.",
          ),
          choice(
            "ledger-3b",
            "Double-long both names so the sector cannot hurt you",
            "loss",
            -0.03,
            "That is not a pair. A sector drawdown hits both; FlashWharf still fails the cash test.",
          ),
          choice(
            "ledger-3c",
            "Short KilnCo because $1.68m NI looks ‘expensive’ vs FlashWharf",
            "loss",
            -0.018,
            "You inverted the scorecard. Lower NI with real FCF is not the weak peer.",
          ),
        ],
      },
      {
        id: "ledger-4",
        title: "Part 4 · Size the pair on $14,800",
        narrative:
          "Conviction is not a position size. Blue City notes: Position value = Portfolio × target weight (8% as 0.08). Recalculate actual weight if you cannot buy fractions.",
        data: [
          {
            kind: "calc",
            title: "Position-size worksheet (notes example 14.3)",
            lines: [
              "Book = $14,800",
              "Target weight = 8% = 0.08",
              "Position value = $14,800 × 0.08 = $1,184",
              "Full-book pair = $14,800 — no remaining cash, no mandate room",
            ],
          },
          {
            kind: "table",
            title: "Sizing options",
            headers: ["Ticket", "Weight", "vs process"],
            rows: [
              ["$1,184", "8.0%", "Inside a controlled sleeve"],
              ["$14,800", "100%", "Concentrates the book in one pair"],
              ["$0 skip size", "0%", "Analysis without a sized decision"],
            ],
          },
        ],
        choices: [
          choice(
            "ledger-4a",
            "Size the KilnCo / FlashWharf pair at $1,184 (8%) — process, not max conviction",
            "gain",
            0.016,
            "Sized to the rule. A calculated pair is not a 100% book. Gold prints if the path stayed disciplined.",
          ),
          choice(
            "ledger-4b",
            "Put the full $14,800 into the pair because the statements ‘proved it’",
            "loss",
            -0.022,
            "Portal 14: sizing links conviction to risk. The whole book in one pair is a concentration trap.",
          ),
          choice(
            "ledger-4c",
            "Leave size at zero and call the worksheet complete",
            "loss",
            -0.014,
            "The lab still needs a controlled ticket. Analysis without a size is not a finished pair.",
          ),
        ],
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
