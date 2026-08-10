import type { AreaId } from "@/lib/content/areas";

/**
 * City trade areas — handshake/globe markers on the Investment Map.
 * Completing a trade can raise or lower portfolio cash/book value.
 * Scenario bodies are stubs ready for richer trade narratives later.
 */

export type TradeRisk = "low" | "medium" | "high";
export type TradeOutcome = "gain" | "loss";

export interface TradeChoice {
  label: string;
  outcome: TradeOutcome;
  feedback: string;
}

export interface TradeArea {
  id: string;
  areaId: AreaId;
  title: string;
  summary: string;
  risk: TradeRisk;
  /** Applied when the player picks a gain outcome — may be + or rare − for trap deals */
  capitalDeltaGain: number;
  /** Applied when the player picks a loss / walk-away-badly outcome */
  capitalDeltaLoss: number;
  goldReward?: number;
  /** Map % coords — keep clear of frozen chests & libraries */
  x: number;
  y: number;
  /** Reserved for future multi-step trade scenarios */
  scenarioReady: true;
  prompt: string;
  choices: TradeChoice[];
}

function trade(
  partial: Omit<TradeArea, "scenarioReady">,
): TradeArea {
  return { ...partial, scenarioReady: true };
}

/** Coral Ledger Bay — foundations trades (6) */
const CORAL: TradeArea[] = [
  trade({
    id: "tr-bay-seed",
    areaId: "coral-ledger-bay",
    title: "Seed Parcel Desk",
    summary: "First micro-allocation into a starter equity sleeve.",
    risk: "low",
    capitalDeltaGain: 180,
    capitalDeltaLoss: -90,
    goldReward: 1,
    x: 8,
    y: 80,
    prompt: "Take a small long into the bay starter sleeve?",
    choices: [
      {
        label: "Allocate the micro sleeve",
        outcome: "gain",
        feedback: "Discipline paid — book value ticks up.",
      },
      {
        label: "Chase a hot tip instead",
        outcome: "loss",
        feedback: "Tip fades. Portfolio slips.",
      },
    ],
  }),
  trade({
    id: "tr-bay-ferry",
    areaId: "coral-ledger-bay",
    title: "Ferry Ticket Swap",
    summary: "Liquidity trade between cash and a short-term note.",
    risk: "low",
    capitalDeltaGain: 120,
    capitalDeltaLoss: -60,
    x: 12,
    y: 92,
    prompt: "Park idle cash in the ferry note for a week?",
    choices: [
      {
        label: "Park the cash",
        outcome: "gain",
        feedback: "Carry collected. Book rises.",
      },
      {
        label: "Leave it in a zero-yield wallet",
        outcome: "loss",
        feedback: "Opportunity cost hits the book.",
      },
    ],
  }),
  trade({
    id: "tr-bay-palm",
    areaId: "coral-ledger-bay",
    title: "Palm Stand Option",
    summary: "Covered call practice on a tourist-name stock.",
    risk: "medium",
    capitalDeltaGain: 260,
    capitalDeltaLoss: -140,
    x: 20,
    y: 92,
    prompt: "Write the covered call into earnings?",
    choices: [
      {
        label: "Write the call with a collar",
        outcome: "gain",
        feedback: "Premium sticks. Portfolio gains.",
      },
      {
        label: "Naked short the name",
        outcome: "loss",
        feedback: "Squeeze. Book value drops.",
      },
    ],
  }),
  trade({
    id: "tr-bay-reef",
    areaId: "coral-ledger-bay",
    title: "Reef Credit Line",
    summary: "Small revolving facility — cheap if you repay.",
    risk: "medium",
    capitalDeltaGain: 200,
    capitalDeltaLoss: -220,
    x: 8,
    y: 68,
    prompt: "Draw the reef line for a tactical buy?",
    choices: [
      {
        label: "Draw, buy, repay on schedule",
        outcome: "gain",
        feedback: "Spread captured. Book climbs.",
      },
      {
        label: "Roll the debt twice",
        outcome: "loss",
        feedback: "Interest compounds against you.",
      },
    ],
  }),
  trade({
    id: "tr-bay-tide",
    areaId: "coral-ledger-bay",
    title: "Tide Basket ETF",
    summary: "Diversified bay basket vs single-name gamble.",
    risk: "low",
    capitalDeltaGain: 150,
    capitalDeltaLoss: -80,
    x: 16,
    y: 64,
    prompt: "Buy the tide basket or one volatile name?",
    choices: [
      {
        label: "Buy the basket",
        outcome: "gain",
        feedback: "Smooth ride. Book up.",
      },
      {
        label: "All-in on one name",
        outcome: "loss",
        feedback: "Gap down. Portfolio shrinks.",
      },
    ],
  }),
  trade({
    id: "tr-bay-lagoon",
    areaId: "coral-ledger-bay",
    title: "Lagoon FX Remit",
    summary: "Small FX conversion for an inbound remit.",
    risk: "medium",
    capitalDeltaGain: 220,
    capitalDeltaLoss: -160,
    x: 8,
    y: 90,
    prompt: "Hedge the remit or ride the spot?",
    choices: [
      {
        label: "Forward-hedge half",
        outcome: "gain",
        feedback: "FX noise muted. Book rises.",
      },
      {
        label: "Go 100% unhedged for upside",
        outcome: "loss",
        feedback: "Spot whipsaws against you.",
      },
    ],
  }),
];

/** Brick Exchange — analysis trades (6) */
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
    x: 92,
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
    x: 92,
    y: 92,
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
    x: 92,
    y: 84,
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
    x: 88,
    y: 92,
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
    x: 92,
    y: 64,
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
    x: 90,
    y: 68,
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

/** Signal Quay — markets trades (5, keep NE uncrowded) */
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
    x: 92,
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
    x: 92,
    y: 8,
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
    x: 92,
    y: 34,
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
    x: 84,
    y: 8,
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
    x: 92,
    y: 42,
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
    x: 8,
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
    x: 8,
    y: 8,
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
    x: 16,
    y: 10,
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
    x: 8,
    y: 36,
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
    x: 18,
    y: 28,
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
  ...CORAL,
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

export function tradeCapitalDelta(trade: TradeArea, outcome: TradeOutcome) {
  return outcome === "gain" ? trade.capitalDeltaGain : trade.capitalDeltaLoss;
}
