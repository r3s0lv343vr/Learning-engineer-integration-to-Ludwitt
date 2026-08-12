import type { AreaId } from "@/lib/content/areas";

/**
 * City trade areas (swords on the Investment Map).
 * Completing a trade raises or lowers portfolio cash/book value.
 * Coral Ledger Bay uses multi-step scenario chains; other cities remain
 * single-decision stubs until authored.
 */

export type TradeRisk = "low" | "medium" | "high";
export type TradeOutcome = "gain" | "loss";

export interface TradeChoice {
  id?: string;
  label: string;
  outcome: TradeOutcome;
  feedback: string;
  /** Fractional capital change for this choice, e.g. 0.02 = +2%. */
  capitalPct?: number;
}

export type TradeDataBlock =
  | {
      kind: "table";
      title: string;
      headers: string[];
      rows: string[][];
    }
  | {
      kind: "news";
      title: string;
      items: { headline: string; source: string; note?: string }[];
    }
  | {
      kind: "calc";
      title: string;
      lines: string[];
    }
  | {
      kind: "metrics";
      title: string;
      items: { label: string; value: string }[];
    };

export interface TradeStep {
  id: string;
  title: string;
  narrative: string;
  /** Intelligence the player must use before choosing. */
  data: TradeDataBlock[];
  choices: TradeChoice[];
}

export interface TradeArea {
  id: string;
  areaId: AreaId;
  title: string;
  summary: string;
  risk: TradeRisk;
  /** Fallback absolute deltas for legacy single-step trades */
  capitalDeltaGain: number;
  capitalDeltaLoss: number;
  goldReward?: number;
  /** Map % coords — do not move (keep clear of chests & libraries) */
  x: number;
  y: number;
  scenarioReady: true;
  /** Legacy single prompt (used when `steps` is absent) */
  prompt: string;
  choices: TradeChoice[];
  /**
   * Multi-part sword game: 3–5 linked decisions.
   * Each choice leads to the next step; capital compounds by capitalPct.
   */
  steps?: TradeStep[];
}

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

/** Coral Ledger Bay — six foundation swords (multi-step investment games). */
export const CORAL_TRADES: TradeArea[] = [
  trade({
    id: "tr-bay-seed",
    areaId: "coral-ledger-bay",
    title: "Seed Parcel Desk",
    summary:
      "Research a starter equity idea, size it to your mandate, then decide whether the evidence still supports holding.",
    risk: "low",
    capitalDeltaGain: 180,
    capitalDeltaLoss: -90,
    goldReward: 1,
    x: 20,
    y: 76,
    prompt: "Complete the Seed Parcel research-to-size chain.",
    choices: [],
    steps: [
      {
        id: "seed-1",
        title: "Part 1 · Rank the evidence",
        narrative:
          "Two starter names compete for a small equity sleeve. Use the evidence hierarchy — primary filings beat tips.",
        data: [
          {
            kind: "news",
            title: "Desk wires",
            items: [
              {
                headline: "Anonymous bay tip: ‘BUY CORALCO — guaranteed 40%’",
                source: "Social feed",
                note: "No filing cited",
              },
              {
                headline: "BayCo files audited annual report; recurring revenue 68%",
                source: "Company 10-K / annual report",
              },
            ],
          },
          {
            kind: "metrics",
            title: "Quick facts",
            items: [
              { label: "BayCo market cap", value: "$480m (price $24 × 20m shares)" },
              { label: "CoralCo ‘tip’ support", value: "None primary" },
              { label: "Your book", value: "$14,800 starting reference" },
            ],
          },
        ],
        choices: [
          choice(
            "seed-1a",
            "Rank BayCo higher — primary filing present",
            "gain",
            0.012,
            "Evidence ranking protects capital: BayCo stays on the shortlist.",
          ),
          choice(
            "seed-1b",
            "Chase the CoralCo tip because the upside sounds larger",
            "loss",
            -0.02,
            "Unverified tip becomes a weak thesis — book takes an early nick.",
          ),
          choice(
            "seed-1c",
            "Ignore both and wait for a meme chart pattern",
            "loss",
            -0.01,
            "No process. Idle opportunity cost and a small mark against discipline.",
          ),
        ],
      },
      {
        id: "seed-2",
        title: "Part 2 · Size the position",
        narrative:
          "Mandate max single-name weight is 12%. Calculate what a $2,220 ticket would mean on a $14,800 book before you click buy.",
        data: [
          {
            kind: "calc",
            title: "Position-weight worksheet",
            lines: [
              "Weight = position value ÷ portfolio value × 100%",
              "Proposed ticket = $2,220",
              "Book = $14,800",
              "Weight = 2,220 / 14,800 × 100% = 15.0%",
              "Mandate cap = 12% → max dollars = 0.12 × 14,800 = $1,776",
            ],
          },
          {
            kind: "table",
            title: "Sizing options",
            headers: ["Ticket", "Weight", "vs 12% cap"],
            rows: [
              ["$2,220", "15.0%", "Over — breach"],
              ["$1,776", "12.0%", "At cap"],
              ["$1,184", "8.0%", "Inside band"],
            ],
          },
        ],
        choices: [
          choice(
            "seed-2a",
            "Buy $1,776 (12%) — respect the mandate cap",
            "gain",
            0.018,
            "Sized to the rule. Small sleeve earns without concentration breach.",
          ),
          choice(
            "seed-2b",
            "Buy the full $2,220 anyway — conviction overrides the cap",
            "loss",
            -0.025,
            "15% in one starter name. A soft miss hits harder than it should.",
          ),
          choice(
            "seed-2c",
            "Buy $1,184 (8%) and keep dry powder",
            "gain",
            0.01,
            "Conservative size. Modest gain with optionality left in cash.",
          ),
        ],
      },
      {
        id: "seed-3",
        title: "Part 3 · Decide after a soft print",
        narrative:
          "BayCo reports revenue +6% but misses street EPS by $0.04. Price dips 4%. Fundamentals are intact; sentiment is noisy.",
        data: [
          {
            kind: "table",
            title: "Print vs expectations",
            headers: ["Item", "Actual", "Street"],
            rows: [
              ["Revenue growth", "+6%", "+5%"],
              ["EPS", "$0.41", "$0.45"],
              ["Recurring revenue", "69%", "—"],
              ["Price reaction", "−4%", "Sentiment"],
            ],
          },
          {
            kind: "news",
            title: "Tape chatter",
            items: [
              {
                headline: "BayCo dips on EPS miss despite revenue beat",
                source: "Market desk",
              },
              {
                headline: "Recurring revenue mix ticks up one point",
                source: "Earnings release",
              },
            ],
          },
        ],
        choices: [
          choice(
            "seed-3a",
            "HOLD — thesis intact; reaction ≠ broken fundamentals",
            "gain",
            0.015,
            "You separate reaction from information. Price stabilises; book up.",
          ),
          choice(
            "seed-3b",
            "Panic EXIT the entire sleeve on the red candle",
            "loss",
            -0.022,
            "Sold the dip without a falsifier. Slippage locks in a loss.",
          ),
          choice(
            "seed-3c",
            "ADD aggressively with leftover cash on pure momentum",
            "loss",
            -0.012,
            "Averaging without a re-checked weight breaches process — choppy trade.",
          ),
        ],
      },
      {
        id: "seed-4",
        title: "Part 4 · Log the decision",
        narrative:
          "Close the sword by writing the decision language. Opportunity cost matters: capital here cannot also sit in the tide basket.",
        data: [
          {
            kind: "calc",
            title: "Opportunity-cost sketch",
            lines: [
              "Sleeve capital ≈ $1,776 at 12% (if you sized to cap)",
              "Alternative: Tide Basket ETF expected +1.0% this window",
              "Your job: keep a falsifier — e.g. recurring revenue < 60%",
            ],
          },
        ],
        choices: [
          choice(
            "seed-4a",
            "Journal HOLD with falsifier + review date",
            "gain",
            0.01,
            "Process premium. Seed Parcel desk closes with a defended gain.",
          ),
          choice(
            "seed-4b",
            "Skip the journal — ‘price will tell me later’",
            "loss",
            -0.015,
            "No falsifier. Next scare forces a messy exit; book slips.",
          ),
        ],
      },
    ],
  }),

  trade({
    id: "tr-bay-ferry",
    areaId: "coral-ledger-bay",
    title: "Ferry Ticket Swap",
    summary:
      "Move idle cash into a short bond-like ferry note — or keep liquidity — while watching inflation and real return.",
    risk: "low",
    capitalDeltaGain: 120,
    capitalDeltaLoss: -60,
    x: 28,
    y: 80,
    prompt: "Manage the ferry cash-vs-note decision chain.",
    choices: [],
    steps: [
      {
        id: "ferry-1",
        title: "Part 1 · Cash has a cost",
        narrative:
          "You hold $2,220 cash (15% of $14,800). Inflation print is 3%. Sitting in zero-yield cash loses purchasing power.",
        data: [
          {
            kind: "calc",
            title: "Real-return sketch on idle cash",
            lines: [
              "Nominal cash yield ≈ 0%",
              "Inflation ≈ 3%",
              "Approx real return ≈ 0% − 3% = −3%",
              "On $2,220: purchasing-power drag ≈ 0.03 × 2,220 = $66.60 / year",
            ],
          },
          {
            kind: "metrics",
            title: "Ferry note offer",
            items: [
              { label: "Tenor", value: "90 days" },
              { label: "Quoted yield", value: "4.0% annualised" },
              { label: "Liquidity", value: "Sellable with ~0.2% spread" },
            ],
          },
        ],
        choices: [
          choice(
            "ferry-1a",
            "Recognise cash drag — evaluate the ferry note next",
            "gain",
            0.008,
            "You price opportunity cost correctly before acting.",
          ),
          choice(
            "ferry-1b",
            "Ignore inflation — ‘cash is always safest’",
            "loss",
            -0.012,
            "Real purchasing power quietly erodes while you wait.",
          ),
        ],
      },
      {
        id: "ferry-2",
        title: "Part 2 · Compare nominal vs real",
        narrative:
          "If the ferry note yields 4% and inflation is 3%, estimate the real carry before you park the whole cash sleeve.",
        data: [
          {
            kind: "calc",
            title: "Worked comparison",
            lines: [
              "Approx real yield ≈ 4% − 3% = +1%",
              "90-day share of 4%: 4% × (90/365) ≈ 0.99% nominal",
              "On $2,000 parked: ≈ $19.7 interest before costs",
              "Spread cost if exit early ≈ 0.2% × notional",
            ],
          },
          {
            kind: "news",
            title: "Bay bulletin",
            items: [
              {
                headline: "Short-term bay notes seeing steady retail demand",
                source: "Ferry desk research",
              },
            ],
          },
        ],
        choices: [
          choice(
            "ferry-2a",
            "Park $2,000 in the note; keep $220 as true liquidity",
            "gain",
            0.014,
            "Carry collected with a cash buffer. Book ticks up.",
          ),
          choice(
            "ferry-2b",
            "Park 100% of cash including emergency reserve",
            "loss",
            -0.01,
            "Forced early exit pays the spread — liquidity lesson learned the hard way.",
          ),
          choice(
            "ferry-2c",
            "Buy a volatile single stock with the cash instead",
            "loss",
            -0.02,
            "Wrong tool for a liquidity sleeve. Volatility cuts the book.",
          ),
        ],
      },
      {
        id: "ferry-3",
        title: "Part 3 · Rates tick up",
        narrative:
          "Market rates rise 0.5%. Existing fixed ferry-note price softens. Do you understand the bond-price relationship?",
        data: [
          {
            kind: "metrics",
            title: "Mark-to-market hint",
            items: [
              { label: "Rate move", value: "+50 bp" },
              { label: "Note price change (illustrative)", value: "≈ −0.4%" },
              { label: "Remaining tenor", value: "60 days" },
            ],
          },
          {
            kind: "calc",
            title: "Teaching reminder",
            lines: [
              "When market rates rise, existing fixed-rate note prices generally fall.",
              "Short tenor limits the damage versus a long bond.",
            ],
          },
        ],
        choices: [
          choice(
            "ferry-3a",
            "HOLD to maturity — short tenor; thesis was carry not trading",
            "gain",
            0.01,
            "You ride through a small mark. Carry still wins versus cash.",
          ),
          choice(
            "ferry-3b",
            "Dump immediately in a panic at a wide spread",
            "loss",
            -0.018,
            "Sold the rate tick. Spread + mark lock a loss.",
          ),
        ],
      },
    ],
  }),

  trade({
    id: "tr-bay-palm",
    areaId: "coral-ledger-bay",
    title: "Palm Stand Option",
    summary:
      "Read an earnings tape, separate fundamentals from sentiment, then choose BUY / HOLD / TRIM with numbers.",
    risk: "medium",
    capitalDeltaGain: 260,
    capitalDeltaLoss: -140,
    x: 16,
    y: 70,
    prompt: "Work the Palm Stand earnings-decision chain.",
    choices: [],
    steps: [
      {
        id: "palm-1",
        title: "Part 1 · Describe the chart before explaining it",
        narrative:
          "PalmCo monthly closes: 18 → 19 → 21 → 20 → 22 → 24. First describe behaviour, then decide what research to open.",
        data: [
          {
            kind: "table",
            title: "PalmCo monthly closes (teaching series)",
            headers: ["Month", "Close"],
            rows: [
              ["M1", "18"],
              ["M2", "19"],
              ["M3", "21"],
              ["M4", "20"],
              ["M5", "22"],
              ["M6", "24"],
            ],
          },
          {
            kind: "calc",
            title: "Range & change",
            lines: [
              "Range high–low = 24 − 18 = 6",
              "Period return = (24 − 18) / 18 = 33.3%",
              "Pullback month: M4 (21 → 20)",
            ],
          },
        ],
        choices: [
          choice(
            "palm-1a",
            "Uptrend with one pullback — open filings next",
            "gain",
            0.01,
            "Clean read of history. Research starts on solid footing.",
          ),
          choice(
            "palm-1b",
            "‘Guaranteed breakout’ — skip research and max buy",
            "loss",
            -0.02,
            "Charts are history, not value. Over-commitment hurts.",
          ),
        ],
      },
      {
        id: "palm-2",
        title: "Part 2 · Earnings vs expectations",
        narrative:
          "PalmCo beats revenue but guides margins lower. Price jumps 3% on the headline then fades. Market reaction ≠ full information.",
        data: [
          {
            kind: "table",
            title: "Print card",
            headers: ["Metric", "Actual", "Expected"],
            rows: [
              ["Revenue", "$120m", "$115m"],
              ["Operating margin guide", "11%", "13%"],
              ["EPS", "$0.55", "$0.52"],
            ],
          },
          {
            kind: "news",
            title: "Headlines",
            items: [
              {
                headline: "PalmCo revenue beat lifts shares +3% at the open",
                source: "Wire",
              },
              {
                headline: "Margin guide cut — analysts debate quality of beat",
                source: "Desk note",
              },
            ],
          },
        ],
        choices: [
          choice(
            "palm-2a",
            "Treat as mixed: revenue strong, margin risk up — dig before adding",
            "gain",
            0.012,
            "You split fundamental facts from the crowd’s first reaction.",
          ),
          choice(
            "palm-2b",
            "MOMO buy only because the headline was green",
            "loss",
            -0.018,
            "Bought the reaction. Fade follows; book slips.",
          ),
          choice(
            "palm-2c",
            "Short immediately with no thesis — ‘guide cut = collapse’",
            "loss",
            -0.015,
            "Over-reacted. Revenue beat still matters; squeeze costs you.",
          ),
        ],
      },
      {
        id: "palm-3",
        title: "Part 3 · Market-cap check",
        narrative:
          "PalmCo trades at $24 with 25 million shares outstanding. A peer prints $80 with 8 million shares. Which is the larger company?",
        data: [
          {
            kind: "calc",
            title: "Market capitalisation",
            lines: [
              "PalmCo cap = 24 × 25m = $600m",
              "Peer cap = 80 × 8m = $640m",
              "Share price alone does not rank size.",
            ],
          },
        ],
        choices: [
          choice(
            "palm-3a",
            "Peer is slightly larger ($640m vs $600m) — size with that in mind",
            "gain",
            0.01,
            "Correct market-cap math. Position sized to company scale.",
          ),
          choice(
            "palm-3b",
            "PalmCo must be bigger because… no, $24 < $80 so it is smaller always",
            "loss",
            -0.012,
            "Price ≠ size. Mis-read leads to an awkward hedge.",
          ),
        ],
      },
      {
        id: "palm-4",
        title: "Part 4 · Active decision",
        narrative:
          "You already hold a 9% PalmCo weight. Mandate cap 12%. After the mixed print, choose the decision language.",
        data: [
          {
            kind: "metrics",
            title: "Book snapshot",
            items: [
              { label: "Current weight", value: "9%" },
              { label: "Mandate max", value: "12%" },
              { label: "Room to ADD", value: "3% ≈ $444 on $14,800" },
            ],
          },
        ],
        choices: [
          choice(
            "palm-4a",
            "HOLD — thesis intact; no ADD until margins stabilise",
            "gain",
            0.014,
            "Patient HOLD. Palm Stand closes with disciplined upside.",
          ),
          choice(
            "palm-4b",
            "TRIM half because one red hour felt scary",
            "loss",
            -0.016,
            "Trimmed without a falsifier. Whipsaw costs the book.",
          ),
          choice(
            "palm-4c",
            "ADD 8% more and ignore the cap",
            "loss",
            -0.024,
            "Weight blows through 12%. Concentration bite follows.",
          ),
        ],
      },
    ],
  }),

  trade({
    id: "tr-bay-reef",
    areaId: "coral-ledger-bay",
    title: "Reef Credit Line",
    summary:
      "A cheap revolving facility can boost returns — or sink you if risk capacity and repayment math are ignored.",
    risk: "medium",
    capitalDeltaGain: 200,
    capitalDeltaLoss: -220,
    x: 32,
    y: 74,
    prompt: "Navigate the Reef credit-line decision chain.",
    choices: [],
    steps: [
      {
        id: "reef-1",
        title: "Part 1 · Tolerance vs capacity",
        narrative:
          "The reef desk offers a $3,000 revolving line at 9% annual interest. You feel bold (high tolerance) but need $2,000 cash within 4 months for a known bill (low capacity).",
        data: [
          {
            kind: "metrics",
            title: "Facility card",
            items: [
              { label: "Line size", value: "$3,000" },
              { label: "Interest", value: "9% annual" },
              { label: "Known cash need", value: "$2,000 in ~4 months" },
              { label: "Book equity", value: "$14,800" },
            ],
          },
        ],
        choices: [
          choice(
            "reef-1a",
            "Capacity constrains — only consider a small draw you can repay",
            "gain",
            0.01,
            "You put capacity above ego. Safer path opens.",
          ),
          choice(
            "reef-1b",
            "Draw the full $3,000 because tolerance feels high",
            "loss",
            -0.02,
            "Capacity ignored. Stress rises before any investment return.",
          ),
        ],
      },
      {
        id: "reef-2",
        title: "Part 2 · Interest math",
        narrative:
          "If you draw $1,500 for 4 months at 9% annual, estimate interest cost before you invest the proceeds.",
        data: [
          {
            kind: "calc",
            title: "Interest estimate",
            lines: [
              "Interest ≈ principal × rate × time",
              "≈ 1,500 × 0.09 × (4/12)",
              "≈ 1,500 × 0.09 × 0.333 ≈ $45",
              "Breakeven on the invested proceeds needs > ~3% in 4 months before costs",
            ],
          },
          {
            kind: "table",
            title: "Draw scenarios",
            headers: ["Draw", "4-mo interest ≈", "Notes"],
            rows: [
              ["$1,500", "$45", "Matches a modest sleeve"],
              ["$3,000", "$90", "Larger fixed cost"],
              ["$0", "$0", "No leverage"],
            ],
          },
        ],
        choices: [
          choice(
            "reef-2a",
            "Draw $1,500 only — cost is clear and repayable",
            "gain",
            0.012,
            "Sized credit. Interest is a known input, not a surprise.",
          ),
          choice(
            "reef-2b",
            "Draw $3,000 and ‘figure repayment later’",
            "loss",
            -0.022,
            "Interest + repayment clash with the known bill. Book damaged.",
          ),
          choice(
            "reef-2c",
            "Skip the line — use existing cash only",
            "gain",
            0.006,
            "No leverage. Smaller upside, clean risk capacity.",
          ),
        ],
      },
      {
        id: "reef-3",
        title: "Part 3 · Use of proceeds",
        narrative:
          "A speculative tip wants the drawn cash for a single volatile name. A researched Bay ETF sleeve needs only part of it.",
        data: [
          {
            kind: "news",
            title: "Uses on the blotter",
            items: [
              {
                headline: "Tip desk: triple your money in ‘REEFMEME’ this week",
                source: "Unverified chat",
              },
              {
                headline: "Bay Income ETF — diversified notes/equities, expense 0.25%",
                source: "Fund factsheet",
              },
            ],
          },
        ],
        choices: [
          choice(
            "reef-3a",
            "Deploy into the researched ETF sleeve; schedule repayment",
            "gain",
            0.016,
            "Borrowed capital put to a diversified use and repaid. Book up.",
          ),
          choice(
            "reef-3b",
            "All-in REEFMEME with the drawn cash",
            "loss",
            -0.03,
            "Leverage + tip. Gap down wipes the trade and then some.",
          ),
        ],
      },
      {
        id: "reef-4",
        title: "Part 4 · Repay or roll?",
        narrative:
          "Four months later the investment is flat-to-up, but the known $2,000 bill is due. The desk offers to roll the debt another quarter at 11%.",
        data: [
          {
            kind: "calc",
            title: "Roll cost",
            lines: [
              "New roll rate 11% on remaining $1,500 for 3 months",
              "≈ 1,500 × 0.11 × 0.25 ≈ $41 more interest",
              "Bill due still needs cash — capacity has not changed",
            ],
          },
        ],
        choices: [
          choice(
            "reef-4a",
            "Repay on schedule from cash/sleeve — protect capacity",
            "gain",
            0.012,
            "Credit closed cleanly. Reef line ends as a controlled gain.",
          ),
          choice(
            "reef-4b",
            "Roll twice and hope markets bail you out",
            "loss",
            -0.028,
            "Interest compounds against you. Classic credit trap.",
          ),
        ],
      },
    ],
  }),

  trade({
    id: "tr-bay-tide",
    areaId: "coral-ledger-bay",
    title: "Tide Basket ETF",
    summary:
      "Choose diversified ETF exposure versus lookalike concentration — with weights, fees, and correlation checks.",
    risk: "low",
    capitalDeltaGain: 150,
    capitalDeltaLoss: -80,
    x: 24,
    y: 66,
    prompt: "Run the Tide Basket diversification chain.",
    choices: [],
    steps: [
      {
        id: "tide-1",
        title: "Part 1 · What is in the basket?",
        narrative:
          "Tide Basket ETF holds 40 bay names. Expense ratio 0.20%. A ‘diversified’ alternative is 8 stocks — all tourism operators.",
        data: [
          {
            kind: "table",
            title: "Exposure check",
            headers: ["Vehicle", "Holdings", "Sector mix", "Fee"],
            rows: [
              ["Tide Basket ETF", "40", "Multi-industry", "0.20%"],
              ["DIY 8-pack", "8", "All tourism", "0% explicit"],
              ["Single name", "1", "One bet", "0%"],
            ],
          },
          {
            kind: "news",
            title: "Research snippet",
            items: [
              {
                headline: "Tourism arrivals soften — operators move together",
                source: "Bay economics brief",
              },
            ],
          },
        ],
        choices: [
          choice(
            "tide-1a",
            "ETF looks more diversified across industries",
            "gain",
            0.01,
            "You spotted false diversification in the 8-pack.",
          ),
          choice(
            "tide-1b",
            "Eight names always means safe diversification",
            "loss",
            -0.015,
            "Shared tourism factor bites — name count was not enough.",
          ),
        ],
      },
      {
        id: "tide-2",
        title: "Part 2 · Fee vs concentration trade-off",
        narrative:
          "On a $3,000 sleeve, the ETF fee is small versus a possible concentration loss. Run the numbers.",
        data: [
          {
            kind: "calc",
            title: "Fee drag vs crash sketch",
            lines: [
              "ETF fee on $3,000 ≈ 0.0020 × 3,000 = $6 / year",
              "If tourism 8-pack drops 12% together: 0.12 × 3,000 = $360 hit",
              "Fee is tiny next to correlated risk",
            ],
          },
        ],
        choices: [
          choice(
            "tide-2a",
            "Prefer Tide Basket — pay the fee, buy diversification",
            "gain",
            0.015,
            "Basket holds up better when tourism wobbles. Book gains.",
          ),
          choice(
            "tide-2b",
            "Avoid fees — buy the tourism 8-pack",
            "loss",
            -0.02,
            "Saved $6, lost far more when the sector sold off.",
          ),
          choice(
            "tide-2c",
            "All-in one tourism ‘winner’",
            "loss",
            -0.028,
            "Maximum concentration. Gap down is brutal.",
          ),
        ],
      },
      {
        id: "tide-3",
        title: "Part 3 · Set the weight",
        narrative:
          "Target ETF weight 15% of $14,800. Confirm dollars and leave room under a 20% asset-class equity band.",
        data: [
          {
            kind: "calc",
            title: "Weight to dollars",
            lines: [
              "15% × 14,800 = $2,220",
              "If equities already 25% elsewhere, check total equity band",
              "Cash after purchase should still meet mandate reserve",
            ],
          },
          {
            kind: "metrics",
            title: "Illustrative book",
            items: [
              { label: "Target Tide weight", value: "15% ($2,220)" },
              { label: "Cash reserve floor", value: "10%" },
              { label: "Current cash", value: "18%" },
            ],
          },
        ],
        choices: [
          choice(
            "tide-3a",
            "Buy $2,220 (15%) and keep cash above the floor",
            "gain",
            0.012,
            "Weights intentional. Tide sleeve works inside the plan.",
          ),
          choice(
            "tide-3b",
            "Buy 35% in one click to ‘be decisive’",
            "loss",
            -0.022,
            "Asset-class breach. Rebalance pain follows.",
          ),
        ],
      },
      {
        id: "tide-4",
        title: "Part 4 · Rebalance signal",
        narrative:
          "After a run, Tide weight is 19% vs 15% target. Overweight dollars ≈ 4% × 14,800 = $592.",
        data: [
          {
            kind: "calc",
            title: "Rebalance math",
            lines: [
              "Current 19% − target 15% = 4% overweight",
              "4% × 14,800 = $592 to TRIM toward target",
              "TRIM is not panic — it restores intentional risk",
            ],
          },
        ],
        choices: [
          choice(
            "tide-4a",
            "TRIM ~$592 back to 15% target",
            "gain",
            0.01,
            "Rebalance complete. Tide Basket sword closes with process gain.",
          ),
          choice(
            "tide-4b",
            "Let winners ride with no review",
            "loss",
            -0.014,
            "Drift becomes concentration. Next pullback hurts more.",
          ),
        ],
      },
    ],
  }),

  trade({
    id: "tr-bay-lagoon",
    areaId: "coral-ledger-bay",
    title: "Lagoon FX Remit",
    summary:
      "An inbound foreign remittance needs FX decisions — spot, hedge, and sizing — with explicit P&L math.",
    risk: "medium",
    capitalDeltaGain: 220,
    capitalDeltaLoss: -160,
    x: 36,
    y: 72,
    prompt: "Work the Lagoon FX remit chain.",
    choices: [],
    steps: [
      {
        id: "lagoon-1",
        title: "Part 1 · Know the exposure",
        narrative:
          "A client remits 10,000 lagoon units (LGU). Spot is 1.20 USD per LGU. Gross USD ≈ 12,000 before costs — but your book base is USD.",
        data: [
          {
            kind: "calc",
            title: "Spot conversion",
            lines: [
              "USD = LGU × spot",
              "10,000 × 1.20 = $12,000 gross",
              "Bid/ask spread 0.4% → cost ≈ 0.004 × 12,000 = $48 if crossing now",
            ],
          },
          {
            kind: "metrics",
            title: "Market card",
            items: [
              { label: "Spot", value: "1.20 USD/LGU" },
              { label: "1-month forward", value: "1.195" },
              { label: "Implied move", value: "Slight USD strength" },
            ],
          },
        ],
        choices: [
          choice(
            "lagoon-1a",
            "Map exposure first — $12,000 FX risk until converted/hedged",
            "gain",
            0.008,
            "Clear risk map. You know what can move the book.",
          ),
          choice(
            "lagoon-1b",
            "Ignore FX — ‘it will probably go up’",
            "loss",
            -0.015,
            "Unmeasured risk. Spot slips overnight against you.",
          ),
        ],
      },
      {
        id: "lagoon-2",
        title: "Part 2 · Hedge fraction",
        narrative:
          "You may convert now, forward-hedge half, or stay 100% open. News: lagoon central bank may ease — LGU could soften.",
        data: [
          {
            kind: "news",
            title: "Lagoon wires",
            items: [
              {
                headline: "Lagoon policymakers signal possible easing bias",
                source: "Regional wire",
              },
              {
                headline: "Remittance corridors seeing heavier USD demand",
                source: "Bank desk note",
              },
            ],
          },
          {
            kind: "calc",
            title: "Hedge sketch on $12,000",
            lines: [
              "50% forward at 1.195: lock ≈ 5,000 × 1.195 = $5,975 on half",
              "Unhedged half still floats with spot",
              "100% unhedged: full ± move on $12,000",
            ],
          },
        ],
        choices: [
          choice(
            "lagoon-2a",
            "Forward-hedge 50%; convert operational needs now",
            "gain",
            0.016,
            "Partial hedge mutes noise. Remit lands with a controlled gain.",
          ),
          choice(
            "lagoon-2b",
            "Stay 100% unhedged for maximum upside",
            "loss",
            -0.025,
            "Easing hit lands. Spot whipsaws the open exposure.",
          ),
          choice(
            "lagoon-2c",
            "Convert 100% at spot immediately despite wide timing need",
            "gain",
            0.006,
            "Certainty over optionality. Small gain after spread — acceptable.",
          ),
        ],
      },
      {
        id: "lagoon-3",
        title: "Part 3 · After a 2% LGU drop",
        narrative:
          "Spot falls from 1.20 to 1.176 (−2%). Quantify P&L on an unhedged $12,000 gross versus a 50% hedge.",
        data: [
          {
            kind: "calc",
            title: "P&L comparison",
            lines: [
              "Unhedged: 10,000 × 1.176 = $11,760 → −$240 vs 1.20",
              "50% hedged (illustrative): half locked, half −2%",
              "  Locked half ≈ flat to forward; open half ≈ −$120",
              "Hedge reduced the damage",
            ],
          },
        ],
        choices: [
          choice(
            "lagoon-3a",
            "Keep the hedge discipline — damage contained",
            "gain",
            0.012,
            "Math confirms the hedge helped. Book recovers.",
          ),
          choice(
            "lagoon-3b",
            "Double the unhedged bet to ‘win it back’",
            "loss",
            -0.03,
            "Revenge FX. Another leg down compounds the loss.",
          ),
        ],
      },
      {
        id: "lagoon-4",
        title: "Part 4 · Allocate the USD proceeds",
        narrative:
          "Converted dollars hit the book. Mandate still wants diversification — not one souvenir stock.",
        data: [
          {
            kind: "metrics",
            title: "Proceeds plan",
            items: [
              { label: "Net USD (approx)", value: "~$11.8k–$12.0k path-dependent" },
              { label: "Mandate", value: "Multi-asset; max single name 12%" },
              { label: "Cash floor", value: "10%" },
            ],
          },
        ],
        choices: [
          choice(
            "lagoon-4a",
            "Split into cash reserve + Tide Basket + small bond note",
            "gain",
            0.014,
            "Remit integrated into the plan. Lagoon sword closes with a gain.",
          ),
          choice(
            "lagoon-4b",
            "100% into one lagoon souvenir equity",
            "loss",
            -0.022,
            "Replaced FX risk with concentrated equity risk. Book drops.",
          ),
        ],
      },
      {
        id: "lagoon-5",
        title: "Part 5 · Journal the FX lesson",
        narrative:
          "Write the takeaway: exposure → measure → hedge fraction → size deployment. Opportunity cost of staying open was the hedge you skipped.",
        data: [
          {
            kind: "calc",
            title: "Lesson line",
            lines: [
              "FX risk is a position even before you ‘invest’.",
              "Partial hedges trade some upside for smaller left-tail damage.",
              "Log falsifier: e.g. reopen hedge if spot volatility > X",
            ],
          },
        ],
        choices: [
          choice(
            "lagoon-5a",
            "Journal the process and set a volatility review trigger",
            "gain",
            0.008,
            "Process locked in. Full Lagoon chain complete.",
          ),
          choice(
            "lagoon-5b",
            "Skip the journal — move on to the next tip",
            "loss",
            -0.01,
            "Without a log, the same FX mistake repeats next remit.",
          ),
        ],
      },
    ],
  }),
];
