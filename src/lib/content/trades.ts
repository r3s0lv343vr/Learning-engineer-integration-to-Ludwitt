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
    summary:
      "Run current vs quick (acid-test) ratios, then pass names that fail liquidity — do not chase yield through a cash crunch.",
    risk: "low",
    capitalDeltaGain: 190,
    capitalDeltaLoss: -100,
    goldReward: 1,
    x: 76,
    y: 78,
    prompt: "Complete the Acid-Test liquidity chain.",
    choices: [],
    steps: [
      {
        id: "acid-1",
        title: "Part 1 · Current ratio is not the acid test",
        narrative:
          "A dockside issuer screens cheap on yield. Blue City Portal 12: profitability and liquidity are different questions. A profitable company can still miss near-term payments.",
        data: [
          {
            kind: "table",
            title: "Two liquidity lenses (notes 12.2)",
            headers: ["Ratio", "Formula", "What it asks"],
            rows: [
              [
                "Current",
                "Current assets / Current liabilities",
                "Pool of short-term accounting resources vs obligations due soon",
              ],
              [
                "Quick (acid test)",
                "(Cash + marketable securities + receivables) / Current liabilities",
                "More liquid operating assets only — inventory is removed",
              ],
            ],
          },
          {
            kind: "metrics",
            title: "Notes interpretation",
            items: [
              { label: "1.50× current", value: "$1.50 of current assets per $1 of current liabilities" },
              { label: "Not a pass/fail", value: "Normal levels vary by industry and business model" },
              { label: "Receivable quality", value: "Still matters even on the quick ratio" },
            ],
          },
        ],
        choices: [
          choice(
            "acid-1a",
            "Treat the acid test as the quick ratio — drop inventory; current ratio alone is not a universal pass",
            "gain",
            0.012,
            "Right lens: liquidity is coverage of near-term claims, and inventory is the slower asset.",
          ),
          choice(
            "acid-1b",
            "Call any current ratio above 1.0× an automatic buy",
            "loss",
            -0.018,
            "The notes: 1.50× is not a universal pass/fail. Asset quality still matters.",
          ),
          choice(
            "acid-1c",
            "Skip liquidity because last year’s net income was positive",
            "loss",
            -0.012,
            "Portal 12: a profitable company can still experience financial stress if cash and liquid assets are insufficient.",
          ),
        ],
      },
      {
        id: "acid-2",
        title: "Part 2 · Work current vs quick",
        narrative:
          "PierChem’s filing matches the notes’ liquidity examples. Compute both ratios before you keep it on the screen.",
        data: [
          {
            kind: "calc",
            title: "Current ratio (example 12.2)",
            lines: [
              "Current assets $6.0m; current liabilities $4.0m",
              "Current ratio = $6.0m / $4.0m = 1.50×",
              "Interpretation: $1.50 of current assets per $1 of CL; quality still matters.",
            ],
          },
          {
            kind: "calc",
            title: "Quick / acid-test ratio (example 12.3)",
            lines: [
              "Cash $1.0m + securities $0.4m + receivables $1.8m = $3.2m quick assets",
              "Current liabilities $4.0m",
              "Quick ratio = $3.2m / $4.0m = 0.80×",
              "Interpretation: removing inventory reveals a tighter short-term position.",
            ],
          },
          {
            kind: "metrics",
            title: "Working-capital reminder (example 11.3)",
            items: [
              { label: "NWC", value: "$5.4m − $3.9m = $1.5m" },
              { label: "Cash", value: "Immediately usable" },
              { label: "Inventory / receivables", value: "May take time to convert" },
            ],
          },
        ],
        choices: [
          choice(
            "acid-2a",
            "Read 1.50× current against 0.80× quick — inventory was carrying the current ratio",
            "gain",
            0.016,
            "The acid test tightened the picture. 0.80× is not automatically fatal, but it is not the same as 1.50×.",
          ),
          choice(
            "acid-2b",
            "Report both ratios as 1.50× because inventory ‘always counts as cash’",
            "loss",
            -0.022,
            "Quick assets exclude inventory on purpose. That is the acid test.",
          ),
          choice(
            "acid-2c",
            "Invert the formula and call current 0.67× ($4.0m / $6.0m), then buy the ‘cheap’ name",
            "loss",
            -0.015,
            "Numerator is current assets. Flipping the ratio invents distress that is not in the notes — and still skips the quick test.",
          ),
        ],
      },
      {
        id: "acid-3",
        title: "Part 3 · Fail names that fail the screen",
        narrative:
          "BrickGlass prints a similar current ratio but receivables are not racing sales. PierChem’s 1.50× sits on swelling inventory and receivables. Portal 12 red-flag list applies.",
        data: [
          {
            kind: "table",
            title: "Screen tape",
            headers: ["Check", "BrickGlass", "PierChem"],
            rows: [
              ["Current ratio", "1.45×", "1.50×"],
              ["Quick / acid", "1.20×", "0.80×"],
              ["Receivables vs revenue", "In line", "Receivables growing much faster than sales"],
              ["Inventory vs sales", "Stable", "Inventory growing much faster than sales"],
              ["Street pitch", "Quiet", "‘Highest dockside yield — ignore the balance sheet’"],
            ],
          },
          {
            kind: "news",
            title: "Red-flag checklist (notes 12.6)",
            items: [
              {
                headline: "Revenue grows but receivables grow much faster",
                source: "Blue City notes",
              },
              {
                headline: "Inventory grows much faster than sales",
                source: "Blue City notes",
              },
              {
                headline: "Profit rises while operating cash flow repeatedly falls",
                source: "Blue City notes",
                note: "Watch if PierChem’s NI keeps outrunning cash",
              },
            ],
          },
        ],
        choices: [
          choice(
            "acid-3a",
            "Pass / fail PierChem — keep BrickGlass; 1.50× current does not clear an 0.80× acid test plus WC red flags",
            "gain",
            0.018,
            "Filter first. A cheap yield on a cash-crunch name is the trap the stub warned about.",
          ),
          choice(
            "acid-3b",
            "Buy PierChem for the yield and ignore the acid test",
            "loss",
            -0.025,
            "Working-capital scare. Liquidity is not optional because the coupon looks large.",
          ),
          choice(
            "acid-3c",
            "Buy both because both current ratios beat 1.0×",
            "loss",
            -0.016,
            "The screen is the quick ratio plus red flags, not a 1.0× current-ratio rubber stamp.",
          ),
        ],
      },
      {
        id: "acid-4",
        title: "Part 4 · Size the survivor on $14,800",
        narrative:
          "BrickGlass cleared the acid test. Conviction is still not a 100% book. Use the Blue City 8% sizing rule unless the mandate says otherwise.",
        data: [
          {
            kind: "calc",
            title: "Sleeve worksheet",
            lines: [
              "Book = $14,800",
              "8% weight = $14,800 × 0.08 = $1,184",
              "Chasing PierChem yield with the full book = 100% in a name that failed the screen",
            ],
          },
          {
            kind: "table",
            title: "Choices",
            headers: ["Action", "Weight", "Process"],
            rows: [
              ["BrickGlass $1,184", "8%", "Survivor, controlled size"],
              ["PierChem full $14,800", "100%", "Failed acid test + concentration"],
              ["Skip size after the screen", "0%", "Analysis without a ticket"],
            ],
          },
        ],
        choices: [
          choice(
            "acid-4a",
            "Buy BrickGlass at $1,184 (8%) — screened in, sized to the book",
            "gain",
            0.014,
            "Filter then size. Gold prints if the path stayed on the acid-test process.",
          ),
          choice(
            "acid-4b",
            "Rotate the full $14,800 into PierChem yield now that you ‘understand’ 1.50×",
            "loss",
            -0.022,
            "You reversed the screen. Current 1.50× was the costume; 0.80× quick was the test.",
          ),
          choice(
            "acid-4c",
            "Leave the sleeve at zero and call the screen complete",
            "loss",
            -0.01,
            "The lab still needs a controlled ticket in the name that passed.",
          ),
        ],
      },
    ],
  }),
  trade({
    id: "tr-ex-crane",
    areaId: "brick-exchange",
    title: "Crane Capex Bid",
    summary:
      "Compute FCF after crane capex, ask capacity vs maintenance, then compare ROIC and conversion before sizing — do not max-leverage a growth story.",
    risk: "high",
    capitalDeltaGain: 450,
    capitalDeltaLoss: -320,
    goldReward: 1,
    x: 64,
    y: 68,
    prompt: "Complete the Crane Capex FCF chain.",
    choices: [],
    steps: [
      {
        id: "crane-1",
        title: "Part 1 · FCF is not net income",
        narrative:
          "CraneForge wants a bid on a yard expansion. The tape cites last year’s profit. Blue City Portal 11: companies pay suppliers, debt and the new crane with cash, not accounting earnings.",
        data: [
          {
            kind: "calc",
            title: "Simplified FCF (notes example 11.4)",
            lines: [
              "Cash flow from operations $3.6m; capital expenditure $1.4m",
              "FCF = CFO − Capex",
              "FCF = $3.6m − $1.4m = $2.2m",
              "Interpretation: cash remaining after operations and capital investment under this definition.",
            ],
          },
          {
            kind: "calc",
            title: "Profit is not the same cash (notes 11.1 vs 11.5)",
            lines: [
              "Income-statement NI on the teaching stack = $1.68m — profitable on paper",
              "If NI were $2.0m with receivables +$0.9m and inventory +$0.4m → ~$0.7m cash",
              "State the FCF definition before comparing names.",
            ],
          },
          {
            kind: "news",
            title: "Yard wires",
            items: [
              {
                headline: "Street note: ‘$1.68m profit — the crane pays for itself’",
                source: "Sell-side blast",
                note: "No CFO, capex or FCF line",
              },
            ],
          },
        ],
        choices: [
          choice(
            "crane-1a",
            "Compute FCF = $3.6m − $1.4m = $2.2m — do not treat net income as deployable cash",
            "gain",
            0.014,
            "Right first step. Simplified FCF starts with operating cash and subtracts capex.",
          ),
          choice(
            "crane-1b",
            "Fund the crane from $1.68m net income and skip the cash-flow statement",
            "loss",
            -0.02,
            "Accrual profit is not cash. The notes: companies pay obligations with cash, not earnings.",
          ),
          choice(
            "crane-1c",
            "Report FCF as $1.4m − $3.6m = −$2.2m and call the firm insolvent",
            "loss",
            -0.012,
            "The formula is CFO minus capex, not the reverse. Sign errors invent distress the notes do not show.",
          ),
        ],
      },
      {
        id: "crane-2",
        title: "Part 2 · Capacity vs maintenance",
        narrative:
          "Capex just jumped. Portal 11’s statement-linking habit: when capital expenditure rises, ask whether future capacity or maintenance needs explain it. Two crane bids hit the tape.",
        data: [
          {
            kind: "table",
            title: "Capex quality tape",
            headers: ["Check", "CraneForge", "RustBoom"],
            rows: [
              ["CFO", "$3.6m", "$3.6m"],
              ["Capex", "$1.4m (new yard crane + capacity)", "$3.1m (replace worn kit; backlog)"],
              ["FCF (CFO − capex)", "$3.6m − $1.4m = $2.2m", "$3.6m − $3.1m = $0.5m"],
              ["What the spend buys", "Contracted extra lifts / capacity", "Maintenance to keep old cranes running"],
              ["Street pitch", "Quiet offtake memo", "‘Growth capex — load the boat’"],
            ],
          },
          {
            kind: "news",
            title: "Statement-linking (notes 11)",
            items: [
              {
                headline: "When capex rises, ask: future capacity or maintenance?",
                source: "Blue City notes",
              },
              {
                headline: "When debt rises, ask where the financing cash went",
                source: "Blue City notes",
              },
            ],
          },
          {
            kind: "metrics",
            title: "Practice FCF (appendix)",
            items: [
              { label: "CFO $8.5m; capex $3.1m", value: "FCF = $5.4m" },
              { label: "Definition", value: "Always state FCF = CFO − capex before comparing" },
            ],
          },
        ],
        choices: [
          choice(
            "crane-2a",
            "Keep CraneForge — $1.4m looks like capacity with offtake; RustBoom’s jump reads as maintenance sold as growth",
            "gain",
            0.016,
            "Ask what the spend buys. Rising capex is not automatically a growth story.",
          ),
          choice(
            "crane-2b",
            "Fund RustBoom because any capex increase means the firm is investing for the future",
            "loss",
            -0.022,
            "Maintenance capex can keep the lights on without adding economic capacity. The notes tell you to ask which it is.",
          ),
          choice(
            "crane-2c",
            "Fail both names because all capex destroys FCF, so never fund a crane",
            "loss",
            -0.014,
            "The formula subtracts capex to see residual cash — it does not say every investment is a trap. Capacity with offtake is the question.",
          ),
        ],
      },
      {
        id: "crane-3",
        title: "Part 3 · ROIC, conversion, then leverage",
        narrative:
          "CraneForge still wants the expansion debt-funded. Portal 12: ROIC vs cost of capital, FCF conversion, and the red flag that debt rises while coverage weakens.",
        data: [
          {
            kind: "calc",
            title: "ROIC (notes example 12.7)",
            lines: [
              "EBIT $5m; tax 25%; average invested capital $20m",
              "NOPAT = $5m × (1 − 0.25) = $3.75m",
              "ROIC = $3.75m / $20m × 100% = 18.75%",
              "Compare with the company’s cost of capital: sustained ROIC above it suggests value creation — it is not the return on your $14,800.",
            ],
          },
          {
            kind: "calc",
            title: "FCF conversion (example 12.8) and coverage (12.5)",
            lines: [
              "FCF $1.5m / NI $2.0m = 75% conversion — $0.75 FCF per $1.00 of profit",
              "One weak year can be investment timing; repeated weakness needs investigation",
              "EBIT $4.5m / interest $1.0m = 4.5× coverage; D/E $12m / $8m = 1.50×",
            ],
          },
          {
            kind: "news",
            title: "Red-flag checklist (notes 12.6)",
            items: [
              {
                headline: "Debt rises while interest coverage weakens",
                source: "Blue City notes",
                note: "Max-leverage crane bid would add this flag on purpose",
              },
              {
                headline: "Profit rises while operating cash flow repeatedly falls",
                source: "Blue City notes",
              },
            ],
          },
        ],
        choices: [
          choice(
            "crane-3a",
            "Keep CraneForge if 18.75% ROIC clears cost of capital and 75% conversion is not a multi-year collapse — do not lever because 20% ROE looks larger",
            "gain",
            0.018,
            "ROIC is the operating-capital test; high ROE can be leverage. Coverage 4.5× is a cushion, not a license to max the bid.",
          ),
          choice(
            "crane-3b",
            "Max-leverage the crane because 20% ROE and 18.75% ROIC are the return you will earn on the book",
            "loss",
            -0.025,
            "Those ratios describe the company, not your $14,800. Debt up as coverage falls is a listed red flag.",
          ),
          choice(
            "crane-3c",
            "Treat 75% conversion as a fail and dump CraneForge with no other work",
            "loss",
            -0.015,
            "The notes: one weak conversion year may reflect investment timing. Repeated weakness is the investigation trigger — not a single 75% print.",
          ),
        ],
      },
      {
        id: "crane-4",
        title: "Part 4 · Size small with a stop",
        narrative:
          "CraneForge cleared FCF, capex quality and ROIC. This sword is still a high-risk capex bid. Use the Blue City 8% sizing rule with a stop — not the full book on leverage.",
        data: [
          {
            kind: "calc",
            title: "Sleeve worksheet",
            lines: [
              "Book = $14,800",
              "8% weight = $14,800 × 0.08 = $1,184",
              "Max leverage on the crane story = 100% of the book in one capex name",
            ],
          },
          {
            kind: "table",
            title: "Choices",
            headers: ["Action", "Weight", "Process"],
            rows: [
              ["CraneForge $1,184 + stop", "8%", "Cleared chain, controlled size"],
              ["Max leverage full $14,800", "100%", "Concentration + coverage red flag"],
              ["Skip size after the chain", "0%", "Analysis without a ticket"],
            ],
          },
        ],
        choices: [
          choice(
            "crane-4a",
            "Buy CraneForge at $1,184 (8%) with a stop — sized, not levered",
            "gain",
            0.015,
            "Filter then size. Gold prints if the path stayed on FCF, capex quality and ROIC.",
          ),
          choice(
            "crane-4b",
            "Max leverage the crane expansion with the full $14,800",
            "loss",
            -0.022,
            "Cost-overrun path. High-risk capex plus concentration is the stub’s trap.",
          ),
          choice(
            "crane-4c",
            "Leave the sleeve at zero and call the capex chain complete",
            "loss",
            -0.01,
            "The lab still needs a controlled ticket in the name that passed.",
          ),
        ],
      },
    ],
  }),
  trade({
    id: "tr-ex-wharf",
    areaId: "brick-exchange",
    title: "Wharf Inventory Flip",
    summary:
      "Read inventory as a working-capital use, fail names where stock races sales, then flip only with confirmed offtake — sized, not speculated.",
    risk: "medium",
    capitalDeltaGain: 280,
    capitalDeltaLoss: -200,
    goldReward: 1,
    x: 80,
    y: 70,
    prompt: "Complete the Wharf Inventory working-capital chain.",
    choices: [],
    steps: [
      {
        id: "wharf-1",
        title: "Part 1 · Inventory is not cash",
        narrative:
          "A dockside lot is pitched as a short-cycle flip because net working capital looks fat. Blue City Portal 11: NWC is a starting point for liquidity — cash is usable now; inventory may take time to sell.",
        data: [
          {
            kind: "calc",
            title: "Net working capital (notes example 11.3)",
            lines: [
              "Current assets $5.4m; current liabilities $3.9m",
              "NWC = Current assets − Current liabilities",
              "NWC = $5.4m − $3.9m = $1.5m",
              "Interpretation: positive NWC can support operations; too much inventory or slow receivables can tie up cash.",
            ],
          },
          {
            kind: "metrics",
            title: "Composition (notes 11.4 / 12.2)",
            items: [
              { label: "Cash", value: "Immediately usable" },
              { label: "Inventory", value: "May take time to sell — not a cash equivalent" },
              { label: "Receivables", value: "May take time to collect" },
              { label: "Quick ratio", value: "Drops inventory on purpose; 1.50× current is not the same test" },
            ],
          },
        ],
        choices: [
          choice(
            "wharf-1a",
            "Read $1.5m NWC as a starting point — inventory is not spendable cash for the flip",
            "gain",
            0.013,
            "Composition first. Positive NWC is not a verdict that the dock lot is liquid.",
          ),
          choice(
            "wharf-1b",
            "Treat $1.5m NWC as $1.5m of cash sitting on the wharf, then bid the full lot",
            "loss",
            -0.02,
            "The notes: cash is usable now; inventory and receivables may not be. NWC is not a cash pile.",
          ),
          choice(
            "wharf-1c",
            "Invert NWC to $3.9m − $5.4m = −$1.5m and call the firm insolvent",
            "loss",
            -0.012,
            "NWC is current assets minus current liabilities. Flipping the formula invents distress the notes do not show.",
          ),
        ],
      },
      {
        id: "wharf-2",
        title: "Part 2 · Inventory rise uses cash",
        narrative:
          "TideCrate prints a profit while stock builds for the ‘seasonal flip.’ Portal 11 example 11.5: rising inventory is a use of cash even when net income looks strong.",
        data: [
          {
            kind: "calc",
            title: "Profit without equal cash (example 11.5)",
            lines: [
              "Net income $2.0m",
              "Receivables rise $0.9m; inventory rises $0.4m",
              "Approx. cash = $2.0m − $0.9m − $0.4m = $0.7m",
              "Strong accounting profit can coexist with weak cash conversion.",
            ],
          },
          {
            kind: "news",
            title: "Statement-linking habit (notes 11)",
            items: [
              {
                headline: "When revenue grows, ask what happens to receivables and inventory",
                source: "Blue City notes",
              },
              {
                headline: "Street: ‘$2.0m profit funds the dock flip — ignore the stock build’",
                source: "Message board",
                note: "The $0.4m inventory rise already absorbed cash",
              },
            ],
          },
        ],
        choices: [
          choice(
            "wharf-2a",
            "Bridge to ~$0.7m cash — the $0.4m inventory build is a use of cash, not extra dry powder",
            "gain",
            0.016,
            "Right bridge. A calculated profit is not yet cash available to fund a speculative pile.",
          ),
          choice(
            "wharf-2b",
            "Add the inventory rise to profit ($2.0m + $0.4m) and call it $2.4m of flip capital",
            "loss",
            -0.022,
            "Inventory increases use cash in the simplified bridge. Adding them invents capital the notes subtract.",
          ),
          choice(
            "wharf-2c",
            "Skip the bridge because net income is positive, so the flip is self-funding",
            "loss",
            -0.014,
            "Accrual profit can coexist with weak cash. The notes make you subtract WC uses before treating earnings as deployable.",
          ),
        ],
      },
      {
        id: "wharf-3",
        title: "Part 3 · Offtake vs a stock pile",
        narrative:
          "Two lots hit the tape. Portal 12 red flag: inventory growing much faster than sales. The stub rule is the same decision: flip only with confirmed offtake.",
        data: [
          {
            kind: "table",
            title: "Dock tape",
            headers: ["Check", "TideCrate", "SpecPile"],
            rows: [
              ["Sales vs inventory", "Inventory in line with sales", "Inventory growing much faster than sales"],
              ["Receivables vs revenue", "In line", "Receivables also racing sales"],
              ["Current vs quick", "Current 1.45× / quick 1.20×", "Current 1.50× / quick 0.80× — inventory carrying current"],
              ["Offtake", "Confirmed buyer for the seasonal lot", "No offtake — ‘it always moves in Q4’"],
              ["Street pitch", "Quiet contract memo", "‘Highest dock yield — spec the pile’"],
            ],
          },
          {
            kind: "news",
            title: "Red-flag checklist (notes 12.6)",
            items: [
              {
                headline: "Inventory grows much faster than sales",
                source: "Blue City notes",
              },
              {
                headline: "Revenue grows but receivables grow much faster",
                source: "Blue City notes",
              },
            ],
          },
        ],
        choices: [
          choice(
            "wharf-3a",
            "Flip TideCrate with confirmed offtake — fail SpecPile; 1.50× current does not clear a stock pile racing sales",
            "gain",
            0.018,
            "Filter first. Confirmed offtake plus in-line inventory is the disciplined lot; spec without offtake is the write-down.",
          ),
          choice(
            "wharf-3b",
            "Spec SpecPile with no offtake because 1.50× current ‘proves’ the stock is liquid",
            "loss",
            -0.025,
            "Quick 0.80× drops inventory on purpose. Stock that races sales and has no buyer is the notes’ red flag.",
          ),
          choice(
            "wharf-3c",
            "Buy both lots because both current ratios beat 1.0×",
            "loss",
            -0.016,
            "The screen is offtake plus inventory vs sales, not a 1.0× current-ratio rubber stamp.",
          ),
        ],
      },
      {
        id: "wharf-4",
        title: "Part 4 · Size the offtake lot on $14,800",
        narrative:
          "TideCrate cleared composition, the cash bridge and the offtake screen. Conviction is still not a 100% book. Use the Blue City 8% sizing rule.",
        data: [
          {
            kind: "calc",
            title: "Sleeve worksheet",
            lines: [
              "Book = $14,800",
              "8% weight = $14,800 × 0.08 = $1,184",
              "SpecPile with the full book = 100% in a name that failed the inventory screen",
            ],
          },
          {
            kind: "table",
            title: "Choices",
            headers: ["Action", "Weight", "Process"],
            rows: [
              ["TideCrate $1,184", "8%", "Confirmed offtake, controlled size"],
              ["SpecPile full $14,800", "100%", "No offtake + inventory red flag"],
              ["Skip size after the screen", "0%", "Analysis without a ticket"],
            ],
          },
        ],
        choices: [
          choice(
            "wharf-4a",
            "Buy TideCrate at $1,184 (8%) — offtake confirmed, sized to the book",
            "gain",
            0.014,
            "Filter then size. Gold prints if the path stayed on working capital and offtake.",
          ),
          choice(
            "wharf-4b",
            "Rotate the full $14,800 into SpecPile now that you ‘understand’ 1.50× current",
            "loss",
            -0.022,
            "You reversed the screen. Stock sits; the write-down is the stub’s trap.",
          ),
          choice(
            "wharf-4c",
            "Leave the sleeve at zero and call the inventory chain complete",
            "loss",
            -0.01,
            "The lab still needs a controlled ticket in the lot that passed.",
          ),
        ],
      },
    ],
  }),
  trade({
    id: "tr-ex-ratio",
    areaId: "brick-exchange",
    title: "Ratio Reliquary Deal",
    summary:
      "Separate price from value, compute EV/EBITDA and FCF yield, then wait for the industrial band — do not chase a peak multiple across unrelated names.",
    risk: "low",
    capitalDeltaGain: 210,
    capitalDeltaLoss: -110,
    goldReward: 1,
    x: 72,
    y: 66,
    prompt: "Complete the Ratio Reliquary valuation chain.",
    choices: [],
    steps: [
      {
        id: "ratio-1",
        title: "Part 1 · Price is not value",
        narrative:
          "A tape note calls RelicKiln ‘cheap at 15×’ and PeakFad ‘a steal at PEG 2.’ Blue City Portal 13: price is what the market asks; value is an estimate from expected economics. A multiple is not a cash return.",
        data: [
          {
            kind: "calc",
            title: "P/E (notes example 13.1)",
            lines: [
              "Share price $48; EPS $3.20",
              "P/E = Price / EPS = $48 / $3.20 = 15.0×",
              "Interpretation: investors pay $15 per $1 of current annual EPS — not that they automatically earn 1/15.",
            ],
          },
          {
            kind: "calc",
            title: "PEG (example 13.3)",
            lines: [
              "P/E 24×; expected EPS growth 12% (enter 12, not 0.12)",
              "PEG = 24 / 12 = 2.0",
              "PEG is a shortcut, not a valuation model; growth forecasts can be wrong.",
            ],
          },
          {
            kind: "news",
            title: "Reliquary wires",
            items: [
              {
                headline: "Blast: ‘15× P/E means a 6.7% locked-in return — load RelicKiln’",
                source: "Sell-side blast",
                note: "The notes reject treating 1/P/E as a guaranteed cash yield",
              },
            ],
          },
        ],
        choices: [
          choice(
            "ratio-1a",
            "Treat 15.0× as dollars of price per dollar of EPS — not a locked-in return — and PEG 2.0 as a screen only",
            "gain",
            0.012,
            "Right first step. Valuation frames assumptions in the price; it does not produce certainty.",
          ),
          choice(
            "ratio-1b",
            "Chase RelicKiln because 15× means you automatically earn 1/15 in cash",
            "loss",
            -0.018,
            "P/E is a price-to-earnings multiple, not a coupon. The notes: you do not automatically earn 1/15.",
          ),
          choice(
            "ratio-1c",
            "Compute PEG as 24 / 0.12 = 200 and call PeakFad infinitely cheap",
            "loss",
            -0.012,
            "Enter growth as a whole percent (12), not 0.12. That convention is in the notes on purpose.",
          ),
        ],
      },
      {
        id: "ratio-2",
        title: "Part 2 · Work EV/EBITDA and FCF yield",
        narrative:
          "The stub’s band is an enterprise multiple, not headline P/E. Compute RelicKiln on the notes’ EV stack, then remember EBITDA is not cash.",
        data: [
          {
            kind: "calc",
            title: "EV/EBITDA (example 13.5)",
            lines: [
              "Market cap $900m; debt $300m; cash $100m; EBITDA $125m",
              "EV = $900m + $300m − $100m = $1.10bn",
              "EV/EBITDA = $1.10bn / $125m = 8.8×",
              "EBITDA is not cash flow and can understate the economic burden of capex.",
            ],
          },
          {
            kind: "calc",
            title: "FCF yield (example 13.6)",
            lines: [
              "FCF $72m; market cap $900m",
              "FCF yield = $72m / $900m × 100% = 8.0%",
              "Yield still needs sustainability — it is not a guaranteed carry.",
            ],
          },
          {
            kind: "metrics",
            title: "P/B reminder (example 13.4)",
            items: [
              { label: "BVPS", value: "$500m / 100m shares = $5.00" },
              { label: "P/B", value: "$7.50 / $5.00 = 1.50×" },
              { label: "Use", value: "More informative for asset-heavy names; a premium is not automatic mispricing" },
            ],
          },
        ],
        choices: [
          choice(
            "ratio-2a",
            "Print EV $1.10bn and 8.8× EBITDA, with 8.0% FCF yield — do not treat EBITDA as cash",
            "gain",
            0.016,
            "Numerator-denominator consistency: enterprise value over EBITDA. The band starts here, not at headline P/E.",
          ),
          choice(
            "ratio-2b",
            "Call EV $900m because ‘cash and debt cancel,’ then buy 8.8× as if it were FCF",
            "loss",
            -0.022,
            "EV adds debt and subtracts cash. EBITDA is not cash and can understate capex.",
          ),
          choice(
            "ratio-2c",
            "Report FCF yield as 72% ($72m as a percent of nothing) and chase the ‘yield’",
            "loss",
            -0.015,
            "Denominator is market cap: $72m / $900m = 8.0%. Inflating yield is how you chase a peak story.",
          ),
        ],
      },
      {
        id: "ratio-3",
        title: "Part 3 · Wait for the band",
        narrative:
          "PeakFad prints a 24× P/E and PEG 2.0 while RelicKiln sits at 8.8× EV/EBITDA with a 25% MOS on the teaching stack. Portal 13: never compare P/E, EV/EBITDA or P/B mechanically across unrelated companies.",
        data: [
          {
            kind: "table",
            title: "Reliquary tape",
            headers: ["Check", "RelicKiln (industrial)", "PeakFad (unrelated consumer)"],
            rows: [
              ["P/E", "15.0× ($48 / $3.20)", "24× (growth story)"],
              ["PEG", "Not the pitch", "2.0 (24 / 12) — screen, not a model"],
              ["EV/EBITDA", "8.8× — inside the industrial teaching print", "Not comparable 1-for-1"],
              ["FCF yield", "8.0%", "Street ignores cash"],
              ["MOS vs $60 value", "Price $45 → 25% MOS", "Chasing the print; no MOS rule"],
            ],
          },
          {
            kind: "news",
            title: "Valuation discipline (notes 13)",
            items: [
              {
                headline: "Never compare P/E, EV/EBITDA or P/B mechanically across unrelated companies",
                source: "Blue City notes",
                note: "Growth, margins, cyclicality, leverage and capital intensity can justify different multiples",
              },
              {
                headline: "Street: ‘PEG 2 is the same as 8.8× — chase PeakFad now’",
                source: "Message board",
              },
            ],
          },
        ],
        choices: [
          choice(
            "ratio-3a",
            "Wait for / keep RelicKiln in the 8.8× industrial band with MOS — do not chase PeakFad’s peak P/E because PEG looks ‘equal’",
            "gain",
            0.018,
            "Band first. Unrelated multiples are not interchangeable. Entry improves when you refuse the chase.",
          ),
          choice(
            "ratio-3b",
            "Chase PeakFad at 24× because PEG 2.0 proves it is cheaper than RelicKiln’s 8.8×",
            "loss",
            -0.025,
            "Multiple compresses. PEG is a shortcut and the names are unrelated — the notes forbid mechanical comparison.",
          ),
          choice(
            "ratio-3c",
            "Buy both because any multiple below 25× is ‘in band’",
            "loss",
            -0.016,
            "A band needs a defended multiple and a comparable business. 25× is not in the notes.",
          ),
        ],
      },
      {
        id: "ratio-4",
        title: "Part 4 · Max price, then size on $14,800",
        narrative:
          "RelicKiln cleared the band. Convert MOS into a purchase cap, then size — conviction is still not a 100% book.",
        data: [
          {
            kind: "calc",
            title: "Margin of safety → max price (examples 13.10–13.11)",
            lines: [
              "($60 − $45) / $60 = 25% MOS on the teaching print",
              "Required 20% MOS on $80 value → max price = $80 × (1 − 0.20) = $64",
              "A target price converts valuation into a rule; a large MOS is fake if the value estimate is unrealistic",
            ],
          },
          {
            kind: "calc",
            title: "Sleeve worksheet",
            lines: [
              "Book = $14,800",
              "8% weight = $14,800 × 0.08 = $1,184",
              "Chase PeakFad with the full book = 100% at a peak multiple",
            ],
          },
          {
            kind: "table",
            title: "Choices",
            headers: ["Action", "Weight", "Process"],
            rows: [
              ["RelicKiln $1,184, cap $64", "8%", "In band, MOS rule, sized"],
              ["PeakFad full $14,800", "100%", "Peak multiple + concentration"],
              ["Skip size after the band", "0%", "Analysis without a ticket"],
            ],
          },
        ],
        choices: [
          choice(
            "ratio-4a",
            "Buy RelicKiln at $1,184 (8%) only at or below the $64 MOS cap",
            "gain",
            0.014,
            "Wait for the band, then size. Gold prints if the path stayed on multiples and MOS.",
          ),
          choice(
            "ratio-4b",
            "Chase PeakFad with the full $14,800 because PEG 2 ‘already is’ a margin of safety",
            "loss",
            -0.022,
            "PEG is not MOS. Peak multiple plus a 100% book is the stub’s compression trap.",
          ),
          choice(
            "ratio-4c",
            "Leave the sleeve at zero and call the reliquary complete",
            "loss",
            -0.01,
            "The lab still needs a controlled ticket in the name that entered the band.",
          ),
        ],
      },
    ],
  }),
  trade({
    id: "tr-ex-smokestack",
    areaId: "brick-exchange",
    title: "Smokestack Bond Lot",
    summary:
      "Do not chase a smokestack coupon — test coverage, net debt and DSCR, then buy only the senior tranche sized to the book.",
    risk: "medium",
    capitalDeltaGain: 240,
    capitalDeltaLoss: -170,
    goldReward: 1,
    x: 84,
    y: 74,
    prompt: "Complete the Smokestack coverage chain.",
    choices: [],
    steps: [
      {
        id: "smoke-1",
        title: "Part 1 · Yield is not guaranteed",
        narrative:
          "A mill lot is pitched as ‘highest dock carry.’ Blue City Portal 14: a falling price can mechanically raise yield. High yield needs a sustainability check — coverage and balance-sheet capacity — not an automatic bargain.",
        data: [
          {
            kind: "calc",
            title: "Yield lesson (notes example 14.1)",
            lines: [
              "Annual cash $1.80; price $45",
              "Yield = $1.80 / $45 × 100% = 4.0%",
              "Interpretation: yield is not guaranteed; assess coverage and balance-sheet capacity.",
            ],
          },
          {
            kind: "calc",
            title: "Payout / retention (example 14.2)",
            lines: [
              "Distributions $24m / net income $60m = 40% payout",
              "60% of accounting profit is retained before other capital uses",
              "For cash-intensive names, compare distributions with free cash flow as well.",
            ],
          },
          {
            kind: "news",
            title: "Stack wires",
            items: [
              {
                headline: "Street: ‘SubSmoke yield just jumped — load the junior paper’",
                source: "Message board",
                note: "Price in the denominator: a credit scare can raise headline yield",
              },
            ],
          },
        ],
        choices: [
          choice(
            "smoke-1a",
            "Treat 4.0% as a starting yield — not a guaranteed carry — and demand coverage before buying the lot",
            "gain",
            0.013,
            "Right first step. A high print can be a falling-price artifact. Coverage comes next.",
          ),
          choice(
            "smoke-1b",
            "Chase SubSmoke because the jumped yield is automatically a bargain",
            "loss",
            -0.02,
            "The notes: a falling price can mechanically raise yield. That is a credit scare, not a gift.",
          ),
          choice(
            "smoke-1c",
            "Invert yield to $45 / $1.80 = 25× and call the coupon ‘too expensive to own’",
            "loss",
            -0.012,
            "Yield is cash over price, not the reverse. Inventing a 25× screen skips the coverage test.",
          ),
        ],
      },
      {
        id: "smoke-2",
        title: "Part 2 · Leverage vs interest coverage",
        narrative:
          "Portal 12: leverage shows how much debt is used; coverage tests whether operating profit can service it. A falling coverage ratio is often more informative than one isolated print.",
        data: [
          {
            kind: "calc",
            title: "D/E and coverage (examples 12.4–12.5)",
            lines: [
              "Debt $12m / equity $8m = 1.50× — debt equals 150% of book equity",
              "EBIT $4.5m / interest $1.0m = 4.5× coverage",
              "4.5× means EBIT is 4.5 times interest; trend and cyclicality still matter.",
            ],
          },
          {
            kind: "calc",
            title: "Net debt (example 11.6)",
            lines: [
              "Debt $9.0m − cash $2.5m = $6.5m net debt",
              "Cash can offset some gross borrowing; not all cash is necessarily available to repay debt.",
            ],
          },
          {
            kind: "metrics",
            title: "What the ratios ask",
            items: [
              { label: "D/E", value: "Creditor financing vs book equity — leverage can amplify losses" },
              { label: "Coverage", value: "Operating-profit cushion for the interest burden" },
              { label: "Net debt", value: "Gross debt minus cash; context still required" },
            ],
          },
        ],
        choices: [
          choice(
            "smoke-2a",
            "Read 1.50× D/E against 4.5× coverage and $6.5m net debt — do not skip coverage because the coupon looks large",
            "gain",
            0.016,
            "Structure plus cushion. The bond lot lives or dies on whether EBIT can service the interest.",
          ),
          choice(
            "smoke-2b",
            "Ignore coverage because 1.50× D/E ‘is normal’ and the yield already compensates",
            "loss",
            -0.022,
            "Coverage is the service test. Yield does not replace a 4.5× (or falling) interest cushion.",
          ),
          choice(
            "smoke-2c",
            "Report coverage as $1.0m / $4.5m = 0.22× and dump every mill name",
            "loss",
            -0.014,
            "Coverage is EBIT / interest = 4.5×. Flipping the ratio invents distress the notes do not show.",
          ),
        ],
      },
      {
        id: "smoke-3",
        title: "Part 3 · Senior tranche vs junior stretch",
        narrative:
          "Two lots hit the tape. Portal 15: DSCR asks whether cash covers required principal and interest. Portal 12 red flag: debt rises while interest coverage weakens. The stub rule is buy senior secured — do not stretch into subordinated paper.",
        data: [
          {
            kind: "calc",
            title: "DSCR (example 15.5)",
            lines: [
              "Cash available $600,000; annual principal + interest $400,000",
              "DSCR = $600,000 / $400,000 = 1.50×",
              "Above 1.0× means modeled cash exceeds modeled debt service; the distance is the cushion.",
            ],
          },
          {
            kind: "table",
            title: "Smokestack tape",
            headers: ["Check", "StackForge senior", "SubSmoke junior"],
            rows: [
              ["Coupon / pitch", "Quiet 4%-style carry", "Headline yield jumped after the scare"],
              ["Interest coverage", "4.5× and stable", "Coverage weakening as debt rises"],
              ["DSCR", "1.50× on the teaching stack", "Cushion shrinking; extra leverage"],
              ["Net debt", "$6.5m with $2.5m cash", "Gross debt, little cash offset"],
              ["Tranche", "Senior secured", "Subordinated — last in a blowout"],
            ],
          },
          {
            kind: "news",
            title: "Red-flag checklist (notes 12.6)",
            items: [
              {
                headline: "Debt rises while interest coverage weakens",
                source: "Blue City notes",
              },
              {
                headline: "When debt rises, ask where the financing cash went",
                source: "Blue City notes",
              },
            ],
          },
        ],
        choices: [
          choice(
            "smoke-3a",
            "Buy StackForge senior — 4.5× coverage and 1.50× DSCR; fail SubSmoke’s junior stretch",
            "gain",
            0.018,
            "Senior first. Extra carry on weakening coverage is the credit-scare trap.",
          ),
          choice(
            "smoke-3b",
            "Stretch into SubSmoke subordinated paper for the jumped yield",
            "loss",
            -0.025,
            "Spread blowout. Debt up as coverage falls is a listed red flag — junior is last in line.",
          ),
          choice(
            "smoke-3c",
            "Buy both because both DSCR prints are ‘above zero’",
            "loss",
            -0.016,
            "The test is a cushion above 1.0× plus the coverage trend — not any positive ratio.",
          ),
        ],
      },
      {
        id: "smoke-4",
        title: "Part 4 · Size the senior lot on $14,800",
        narrative:
          "StackForge senior cleared yield, coverage and DSCR. Conviction is still not a 100% book. Use the Blue City 8% sizing rule.",
        data: [
          {
            kind: "calc",
            title: "Sleeve worksheet",
            lines: [
              "Book = $14,800",
              "8% weight = $14,800 × 0.08 = $1,184",
              "Full-book SubSmoke = 100% in junior paper after a credit scare",
            ],
          },
          {
            kind: "table",
            title: "Choices",
            headers: ["Action", "Weight", "Process"],
            rows: [
              ["StackForge senior $1,184", "8%", "Covered tranche, controlled size"],
              ["SubSmoke full $14,800", "100%", "Junior stretch + concentration"],
              ["Skip size after the screen", "0%", "Analysis without a ticket"],
            ],
          },
        ],
        choices: [
          choice(
            "smoke-4a",
            "Buy StackForge senior at $1,184 (8%) — covered, sized to the book",
            "gain",
            0.014,
            "Filter then size. Gold prints if the path stayed on coverage and the senior tranche.",
          ),
          choice(
            "smoke-4b",
            "Rotate the full $14,800 into SubSmoke now that you ‘understand’ 4.5×",
            "loss",
            -0.022,
            "You reversed the screen. 4.5× was StackForge; the junior lot was the scare.",
          ),
          choice(
            "smoke-4c",
            "Leave the sleeve at zero and call the smokestack complete",
            "loss",
            -0.01,
            "The lab still needs a controlled ticket in the senior lot that passed.",
          ),
        ],
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
    summary:
      "Read a policy/rates wire through Green City macro channels, size the duration hit on the bond sleeve, then respond with discipline — not an all-in rates bet.",
    risk: "high",
    capitalDeltaGain: 480,
    capitalDeltaLoss: -360,
    goldReward: 1,
    x: 66,
    y: 24,
    prompt: "Complete the Macro Wire rates-and-duration chain.",
    choices: [],
    steps: [
      {
        id: "wire-1",
        title: "Part 1 · Macro transmission, not fortune-telling",
        narrative:
          "A Quay wire flags tighter policy. Green City Portal 24: macro works through channels (borrowing costs, bond prices, property, FX). Ask what happens to cash flows and required returns — do not pretend you can forecast every print.",
        data: [
          {
            kind: "news",
            title: "Macro Wire Desk",
            items: [
              {
                headline: "Policy path: markets price a firmer nominal rate near 5.5%",
                source: "Central bank / rates desk",
              },
              {
                headline: "Inflation print still sticky near 3.2%",
                source: "CPI release",
                note: "Real rate ≈ nominal − inflation (Portal 24.2)",
              },
            ],
          },
          {
            kind: "calc",
            title: "Real rate check (notes Examples 24.1–24.2)",
            lines: [
              "Approximate real ≈ 5.5% − 3.2% = 2.3%",
              "Exact real = (1.055 / 1.032) − 1 ≈ 2.23%",
              "Higher real rates can tighten conditions and pressure long-duration assets.",
            ],
          },
          {
            kind: "table",
            title: "Transmission channels (Portal 24.1)",
            headers: ["Channel", "Portfolio question"],
            rows: [
              ["Discount rates", "Do required returns rise?"],
              ["Borrowing costs", "Mortgage / corporate refinance pressure?"],
              ["Bond prices", "Inverse yield–price hit on duration?"],
              ["Risk appetite", "Do equities and credit reprice together?"],
            ],
          },
        ],
        choices: [
          choice(
            "wire-1a",
            "Map sensitivities: ~2.3% real rate → tighter conditions; stress bond duration, property finance, and equity risk appetite before trading",
            "gain",
            0.015,
            "Process first. Macro is an environment lens, not a crystal ball.",
          ),
          choice(
            "wire-1b",
            "Ignore channels — “rates always mean buy stocks”",
            "loss",
            -0.02,
            "Same print hits assets differently. Notes: do not replace asset analysis with fortune-telling.",
          ),
          choice(
            "wire-1c",
            "Skip the real-rate math and max leverage into the next headline",
            "loss",
            -0.015,
            "No units, no formula — Green City insists you convert numbers into decisions.",
          ),
        ],
      },
      {
        id: "wire-2",
        title: "Part 2 · Yield curve as evidence",
        narrative:
          "The curve is inverted on the 2s10s. Portal 24.4: treat inversion as evidence about policy and growth expectations — not a guaranteed recession timer — and use it to inform duration choices.",
        data: [
          {
            kind: "metrics",
            title: "Government curve snapshot",
            items: [
              { label: "10-year yield", value: "4.0%" },
              { label: "2-year yield", value: "4.7%" },
              { label: "Book reference", value: "$14,800" },
            ],
          },
          {
            kind: "calc",
            title: "Term spread (notes Example 24.3)",
            lines: [
              "Term spread = 10Y − 2Y = 4.0% − 4.7% = −0.70 pp (−70 bps)",
              "Interpretation: this slice of the curve is inverted.",
              "Implication: investigate policy/growth expectations; do not auto-time a recession trade.",
            ],
          },
        ],
        choices: [
          choice(
            "wire-2a",
            "Treat −70 bps as a signal to review duration and refinance risk — not a surefire crisis bet",
            "gain",
            0.018,
            "Inversion is evidence. Duration and liquidity still need explicit checks.",
          ),
          choice(
            "wire-2b",
            "All-in short the economy because the curve inverted",
            "loss",
            -0.025,
            "Notes: inversion is not a guaranteed recession timer. Reckless directional bet.",
          ),
          choice(
            "wire-2c",
            "Assume the curve is irrelevant to bond sleeves",
            "loss",
            -0.012,
            "Portal 24: the curve informs duration choices and relative short- vs long-maturity attractiveness.",
          ),
        ],
      },
      {
        id: "wire-3",
        title: "Part 3 · Duration hit on the bond sleeve",
        narrative:
          "Portal 19.6: approximate %ΔPrice ≈ −Modified duration × ΔYield. Quantify the rate-shock P/L on the fixed-income sleeve before choosing a response.",
        data: [
          {
            kind: "metrics",
            title: "Bond sleeve on the $14,800 book",
            items: [
              { label: "Bond allocation", value: "$3,700" },
              { label: "Modified duration", value: "5.2" },
              { label: "Assumed ΔYield", value: "+0.75 pp (= 0.0075)" },
            ],
          },
          {
            kind: "calc",
            title: "Duration shock (notes Example 19.4)",
            lines: [
              "%ΔPrice ≈ −5.2 × 0.0075 = −0.039 → −3.9%",
              "Est. dollar P/L ≈ $3,700 × (−0.039) ≈ −$144",
              "Interest-rate risk ≠ credit risk — coupons can still be paid while price falls.",
            ],
          },
          {
            kind: "table",
            title: "Credit context (notes Example 19.6)",
            headers: ["Bond", "Yield", "Spread vs gov 4.1%"],
            rows: [
              ["5Y government", "4.1%", "—"],
              ["5Y corporate", "6.4%", "2.3 pp / 230 bps"],
            ],
          },
        ],
        choices: [
          choice(
            "wire-3a",
            "Accept ~−3.9% / ≈−$144 as the rate lens on the $3,700 sleeve; keep credit spread as a separate question",
            "gain",
            0.02,
            "Duration gives the first risk estimate. Separate rate risk from credit risk before acting.",
          ),
          choice(
            "wire-3b",
            "Ignore duration — “bonds only pay coupons, price can’t fall”",
            "loss",
            -0.03,
            "Portal 19: fixed-rate bonds compete with new yields; price can fall even when every coupon is paid.",
          ),
          choice(
            "wire-3c",
            "Enter Δy as 0.75 instead of 0.0075 and panic-exit the whole book",
            "loss",
            -0.022,
            "Common error: percentage points vs decimals. Notes lab: convert deliberately before calculating.",
          ),
        ],
      },
      {
        id: "wire-4",
        title: "Part 4 · Position the wire — discipline over YOLO",
        narrative:
          "Decide how the $14,800 book responds: barbell duration with hedges and a written review trigger, or an all-in directional rates bet. Fixed income’s role (income, stability, diversification) still matters (Portal 19.8).",
        data: [
          {
            kind: "table",
            title: "Response grid",
            headers: ["Action", "Rationale"],
            rows: [
              [
                "Barbell + hedge",
                "Keep some short quality for liquidity; trim long duration; hedge residual rate risk",
              ],
              [
                "Hold core gov sleeve",
                "If mandate needs ballast and loss ≈−$144 is tolerable vs equity shock",
              ],
              [
                "All-in directional",
                "Max long or short duration on the print — no size, no falsifier",
              ],
            ],
          },
          {
            kind: "metrics",
            title: "Portfolio Lab checks",
            items: [
              { label: "Scenario bond hit", value: "≈ −$144 on $3,700 sleeve" },
              { label: "Real rate (approx)", value: "+2.3%" },
              { label: "2s10s spread", value: "−70 bps" },
              { label: "Falsifier", value: "If real rates fall back <1% with curve steepening, revisit" },
            ],
          },
        ],
        choices: [
          choice(
            "wire-4a",
            "Barbell duration with hedges — size to the −3.9% estimate and keep a review trigger",
            "gain",
            0.022,
            "Disciplined path: quantified sensitivity, role of bonds preserved, no fortune-telling bet.",
          ),
          choice(
            "wire-4b",
            "All-in directional rates bet sized past mandate",
            "loss",
            -0.035,
            "Surprise path. Macro wires punish oversized directional bets.",
          ),
          choice(
            "wire-4c",
            "Dump every bond because price might fall, ignoring income/diversification role",
            "loss",
            -0.018,
            "Portal 19.8: fixed income can still contribute income, ballast, and diversification when sized deliberately.",
          ),
        ],
      },
    ],
  }),
  trade({
    id: "tr-quay-glass",
    areaId: "signal-quay",
    title: "Glass Tower REIT Slice",
    summary:
      "Fit an office REIT into the strategic real-estate weight, audit liquidity and concentration, then size with a vacancy check — not max yield.",
    risk: "medium",
    capitalDeltaGain: 300,
    capitalDeltaLoss: -210,
    goldReward: 1,
    x: 84,
    y: 18,
    prompt: "Complete the Glass Tower REIT allocation chain.",
    choices: [],
    steps: [
      {
        id: "glass-1",
        title: "Part 1 · Architecture before the ticker",
        narrative:
          "Glass Tower REIT looks attractive on yield, but Green City Portal 21 asks a harder question: how much of the $14,800 book should sit in real estate at all? Strategic allocation is architecture, not a month-ahead prediction.",
        data: [
          {
            kind: "table",
            title: "Target allocation on $14,800 (notes §21.2)",
            headers: ["Asset class", "Target weight", "Dollar target"],
            rows: [
              ["Stocks", "30%", "$4,440"],
              ["Bonds", "25%", "$3,700"],
              ["Real estate", "15%", "$2,220"],
              ["Broad ETF / other", "10%", "$1,480"],
              ["Commodities / alts", "5%", "$740"],
              ["Forex / hedge", "5%", "$740"],
              ["Cash", "10%", "$1,480"],
            ],
          },
          {
            kind: "calc",
            title: "Target dollars (notes Example 21.2)",
            lines: [
              "Target RE value = Portfolio × Weight = $14,800 × 0.15 = $2,220",
              "An excellent property idea can still create a poor portfolio if its weight is excessive.",
            ],
          },
          {
            kind: "news",
            title: "Quay chatter",
            items: [
              {
                headline: "Glass Tower REIT: ‘7% distribution — fill the book’",
                source: "Broker chat",
                note: "No weight or liquidity check",
              },
            ],
          },
        ],
        choices: [
          choice(
            "glass-1a",
            "Cap the sleeve to the 15% / $2,220 RE policy before shopping Glass Tower",
            "gain",
            0.015,
            "Weights create discipline. Constraints and architecture come before ticker excitement.",
          ),
          choice(
            "glass-1b",
            "Ignore the SAA table and put 40% of the book into Glass Tower for yield",
            "loss",
            -0.025,
            "Portal 21: even an attractive asset creates a poor portfolio at excessive weight.",
          ),
          choice(
            "glass-1c",
            "Treat strategic allocation as a prediction of next month’s winning asset",
            "loss",
            -0.012,
            "Notes: SAA is long-term target structure driven by objectives — not a forecast of which asset wins next month.",
          ),
        ],
      },
      {
        id: "glass-2",
        title: "Part 2 · Liquidity: REIT vs direct property",
        narrative:
          "Portal 20 contrasts direct property (transaction/management costs) with a REIT ETF’s liquid diversified exposure. Portal 22.6: a portfolio can be diversified by class yet still face a liquidity problem — ask how long a sale might take.",
        data: [
          {
            kind: "table",
            title: "Exposure vs liquidity question (notes §22.6)",
            headers: ["Exposure", "Typical liquidity question"],
            rows: [
              ["Cash / T-bills", "Can funds be accessed immediately?"],
              ["Large listed stocks / ETFs", "Normal-sized trades with limited slippage?"],
              ["Direct property", "How long might a sale take?"],
              ["REIT / listed property fund", "Can the sleeve exit near fair value in stress?"],
            ],
          },
          {
            kind: "metrics",
            title: "Glass Tower desk facts",
            items: [
              { label: "Proposed ticket", value: "$2,220 (at RE target)" },
              { label: "Stated distribution yield", value: "7%" },
              { label: "Office vacancy (building)", value: "18% and rising" },
              { label: "Vehicle", value: "Listed REIT (more liquid than direct tower)" },
            ],
          },
          {
            kind: "news",
            title: "Property wire",
            items: [
              {
                headline: "Glass Tower: two tenants non-renew; vacancy to 18%",
                source: "Property manager update",
              },
              {
                headline: "Direct pier warehouse for sale — 6–12 month close typical",
                source: "Broker listing",
                note: "Illiquid alternative to listed REIT",
              },
            ],
          },
        ],
        choices: [
          choice(
            "glass-2a",
            "Prefer the listed REIT path for liquidity vs direct property, but treat rising vacancy as a cash-flow risk — not free yield",
            "gain",
            0.018,
            "Liquidity diversification + asset analysis: REIT helps exitability; vacancy still hits distributions and price.",
          ),
          choice(
            "glass-2b",
            "Chase 7% yield and ignore vacancy because ‘property always diversifies’",
            "loss",
            -0.02,
            "Diversification is not counting labels. Vacancy is a real cash-flow and risk driver.",
          ),
          choice(
            "glass-2c",
            "Buy the illiquid direct tower instead to ‘lock in’ the same yield",
            "loss",
            -0.015,
            "Portal 22.6: direct property can leave you unable to sell when liquidity matters most.",
          ),
        ],
      },
      {
        id: "glass-3",
        title: "Part 3 · Current weight vs target — rebalance math",
        narrative:
          "The book already holds some property. Convert current dollars to weight (Portal 21.1) and compute the rebalancing trade to the $2,220 target (Portal 21.4) before adding Glass Tower.",
        data: [
          {
            kind: "metrics",
            title: "Current property sleeve",
            items: [
              { label: "Portfolio", value: "$14,800" },
              { label: "Current RE holdings", value: "$1,480" },
              { label: "Current RE weight", value: "$1,480 / $14,800 = 10%" },
              { label: "Target RE", value: "15% = $2,220" },
            ],
          },
          {
            kind: "calc",
            title: "Rebalancing trade (notes Example 21.4)",
            lines: [
              "Trade = Target − Current = $2,220 − $1,480 = +$740",
              "Room to ADD ≈ $740 of Glass Tower without exceeding the 15% policy.",
              "Overshooting to $3,000 would put RE at ≈20% — a deliberate overweight, not ‘fill the yield’.",
            ],
          },
          {
            kind: "calc",
            title: "Concentration check (Portal 22.2)",
            lines: [
              "If Glass Tower alone were $2,220 / $14,800 → 15% in one office-REIT issuer",
              "Ask: is that concentration deliberate and compensated — or hidden single-building risk?",
            ],
          },
        ],
        choices: [
          choice(
            "glass-3a",
            "ADD about $740 to reach the $2,220 / 15% target — do not jump straight to a 20%+ office bet",
            "gain",
            0.02,
            "Rebalancing reconnects actual holdings with strategic policy and keeps concentration intentional.",
          ),
          choice(
            "glass-3b",
            "Double the whole RE sleeve to $4,440 because vacancy ‘creates a bargain’",
            "loss",
            -0.028,
            "A price decline is not automatically a bargain if cash flows deteriorated. Size still follows policy.",
          ),
          choice(
            "glass-3c",
            "Skip the weight math and average in whatever the chat desk recommends",
            "loss",
            -0.014,
            "Portal 21: weights are the language of construction — calculate before comparing to desired allocation.",
          ),
        ],
      },
      {
        id: "glass-4",
        title: "Part 4 · Size with vacancy check",
        narrative:
          "Stress the property sleeve before clicking buy. Portal 26-style shock: real estate −15% on a larger property book hurts; pair that with vacancy risk and keep cash for optionality.",
        data: [
          {
            kind: "calc",
            title: "Property stress sketch (notes Example 26.9 style)",
            lines: [
              "If RE sleeve at target $2,220 and shock −15% → P/L ≈ $2,220 × (−0.15) ≈ −$333",
              "Compare with risk tolerance and whether bonds/cash still protect the $14,800 book.",
            ],
          },
          {
            kind: "table",
            title: "Decision options",
            headers: ["Choice", "Size", "Vacancy handling"],
            rows: [
              [
                "Disciplined ADD",
                "~$740 to 15% target",
                "Require occupancy/lease update; set exit if vacancy >22%",
              ],
              [
                "Max yield",
                "$3,000+ (overweight)",
                "Ignore vacancy and financing risk",
              ],
              [
                "Skip forever",
                "$0 add",
                "Leaves intentional 10% vs 15% without a recorded reason",
              ],
            ],
          },
          {
            kind: "metrics",
            title: "Falsifier",
            items: [
              { label: "ADD ticket", value: "~$740 Glass Tower REIT" },
              { label: "Review trigger", value: "Vacancy >22% or distribution cut" },
              { label: "Liquidity preference", value: "Listed REIT over direct tower" },
            ],
          },
        ],
        choices: [
          choice(
            "glass-4a",
            "Size to yield with vacancy check — ADD ~$740 to the 15% target and write the occupancy falsifier",
            "gain",
            0.022,
            "Occupancy discipline holds the process. Policy weight + liquidity + stress before yield chasing.",
          ),
          choice(
            "glass-4b",
            "Ignore vacancy, max yield — overweight Glass Tower past the SAA band",
            "loss",
            -0.03,
            "Tenant exit / vacancy path. Yield without cash-flow and weight checks damages the book.",
          ),
          choice(
            "glass-4c",
            "Pledge cash and lever into a direct office floor for ‘more diversification’",
            "loss",
            -0.02,
            "Leverage plus illiquidity is the opposite of Portal 22.6 liquidity diversification.",
          ),
        ],
      },
    ],
  }),
  trade({
    id: "tr-quay-crane",
    areaId: "signal-quay",
    title: "Harbor Crane Freight",
    summary:
      "Compare a freight/commodity pooled sleeve with direct ownership, check fees and futures structure, then scale to the alternatives budget — not a YOLO spike chase.",
    risk: "high",
    capitalDeltaGain: 520,
    capitalDeltaLoss: -400,
    goldReward: 1,
    x: 70,
    y: 42,
    prompt: "Complete the Harbor Crane freight-and-alts chain.",
    choices: [],
    steps: [
      {
        id: "harbor-1",
        title: "Part 1 · What exposure does the wrapper hold?",
        narrative:
          "Harbor Crane Freight ETF is buzzing after a supply shock. Portal 20.1: an ETF is a wrapper — it does not remove underlying risk. Ask what economic exposure you are actually buying before riding the spike.",
        data: [
          {
            kind: "table",
            title: "ETF due-diligence checklist (notes §20.1)",
            headers: ["Feature", "Harbor Crane Freight ETF"],
            rows: [
              ["Underlying holdings", "Freight / energy futures basket (not operating carriers)"],
              ["Index / mandate", "Rolls nearby commodity futures; no equity cash flows"],
              ["Expense ratio", "0.45%"],
              ["Bid-ask spread", "Wider than broad equity ETF in stress"],
              ["Concentration", "Top contracts heavily energy + dry bulk proxies"],
              ["Currency", "USD-priced commodities; unhedged for home book"],
            ],
          },
          {
            kind: "news",
            title: "Quay wires",
            items: [
              {
                headline: "Shipping disruption: ‘freight to the moon — YOLO the Crane ETF’",
                source: "Social feed",
                note: "No holdings or roll-structure check",
              },
              {
                headline: "Fund fact sheet: exposure via futures, not physical cargo",
                source: "Prospectus / fact sheet",
              },
            ],
          },
          {
            kind: "metrics",
            title: "Book context",
            items: [
              { label: "Portfolio", value: "$14,800" },
              { label: "SAA alts / commodities target", value: "5% = $740 (Portal 21 table)" },
              { label: "Proposed chat-desk ticket", value: "$4,440 (30% of book)" },
            ],
          },
        ],
        choices: [
          choice(
            "harbor-1a",
            "Treat Crane as futures commodity exposure — read holdings, mandate, and roll risk before sizing",
            "gain",
            0.015,
            "The important question is not ‘Is this an ETF?’ but what exposure it contains.",
          ),
          choice(
            "harbor-1b",
            "Buy because the name says diversified freight and the spike looks huge",
            "loss",
            -0.022,
            "Two ETFs can both be called diversified while holding very different concentration. Name ≠ due diligence.",
          ),
          choice(
            "harbor-1c",
            "Assume the ETF removes commodity risk because it trades like a stock",
            "loss",
            -0.014,
            "Portal 20: the wrapper makes trading convenient; it does not remove underlying risks.",
          ),
        ],
      },
      {
        id: "harbor-2",
        title: "Part 2 · Fees and tracking difference",
        narrative:
          "Before scaling in, quantify cost drag (Portal 20.2–20.3). Fees and imperfect replication matter when comparing similar exposures.",
        data: [
          {
            kind: "calc",
            title: "Expense ratio (notes Example 20.1 style)",
            lines: [
              "Proposed within-policy ticket $740; expense ratio 0.45% = 0.0045",
              "Annual fee ≈ $740 × 0.0045 ≈ $3.33",
              "If the chat desk forced $8,000 into a 0.25% fund → fee ≈ $20/year (Example 20.1).",
              "Small in one year; compounds over long holds — compare similar exposures on cost.",
            ],
          },
          {
            kind: "calc",
            title: "Tracking difference (notes Example 20.2)",
            lines: [
              "Freight index +9.2%; Crane ETF +8.9%",
              "Tracking difference = 8.9% − 9.2% = −0.30 pp",
              "Fees, rolls, cash drag and imperfect replication can explain the gap.",
            ],
          },
        ],
        choices: [
          choice(
            "harbor-2a",
            "Prefer the cheaper, tighter-tracking vehicle when exposure is similar; keep Crane only if its futures mandate is the deliberate bet",
            "gain",
            0.018,
            "Costs and tracking difference influence long-run net return when exposures overlap.",
          ),
          choice(
            "harbor-2b",
            "Ignore fees and tracking — ‘the spike will cover everything’",
            "loss",
            -0.02,
            "Portal 20: when two funds provide similar exposure, costs matter. Spikes fade; fee drag does not.",
          ),
          choice(
            "harbor-2c",
            "Switch to any higher-fee thematic ETF with a louder marketing name",
            "loss",
            -0.012,
            "Due diligence is holdings and methodology — not marketing volume.",
          ),
        ],
      },
      {
        id: "harbor-3",
        title: "Part 3 · Spot return vs futures structure",
        narrative:
          "Portal 20.4–20.5: commodities generally lack operating cash flow; investor return depends on price and the vehicle. Spot can be quiet while contango/backwardation on futures rolls helps or hurts the fund.",
        data: [
          {
            kind: "calc",
            title: "Gold-style price return (notes Example 20.3)",
            lines: [
              "Illustrative metal: $2,000 → $2,140",
              "Price return = ($2,140 − $2,000) / $2,000 = 7.0%",
              "Interpretation: price return only — ignores costs and the specific vehicle.",
            ],
          },
          {
            kind: "table",
            title: "Commodity drivers (notes §20.4)",
            headers: ["Driver", "Harbor Crane relevance"],
            rows: [
              ["Supply", "Port/shipping disruption, production cuts"],
              ["Demand", "Trade volumes, industrial activity"],
              ["Inventories", "Low stocks amplify shocks"],
              ["Geopolitics", "Sanctions / shipping lanes"],
              ["Futures structure", "Contango can bleed roll yield even if spot is flat"],
            ],
          },
          {
            kind: "news",
            title: "Curve desk",
            items: [
              {
                headline: "Nearby freight futures in contango; roll cost estimated −1.2% this quarter",
                source: "Futures curve note",
              },
              {
                headline: "Spot freight index barely changed this week",
                source: "Harbor index",
                note: "Spot ≠ investor return in a futures ETF",
              },
            ],
          },
        ],
        choices: [
          choice(
            "harbor-3a",
            "Separate spot narrative from futures roll — include contango bleed in the thesis before adding",
            "gain",
            0.02,
            "Spot price is not always investor return. Curve structure can help or hurt fund returns.",
          ),
          choice(
            "harbor-3b",
            "Assume ETF return equals the spot freight headline forever",
            "loss",
            -0.025,
            "Notes: commodity ETFs may hold futures that must be rolled — contango/backwardation matters.",
          ),
          choice(
            "harbor-3c",
            "Buy physical cargo containers to ‘avoid ETF complexity’",
            "loss",
            -0.015,
            "Portal 20.6: physical commodity ownership is often impractical; pooled vehicles exist for a reason — still require purpose.",
          ),
        ],
      },
      {
        id: "harbor-4",
        title: "Part 4 · Scale in with defined risk",
        narrative:
          "Justify commodities by portfolio purpose (inflation/supply shock diversifier), not recent performance alone. Size to the 5% / $740 alternatives band on the $14,800 book — defined risk, not YOLO.",
        data: [
          {
            kind: "table",
            title: "Direct vs pooled (notes §20.6)",
            headers: ["Exposure", "Direct", "Pooled / ETF"],
            rows: [
              ["Commodities", "Physical often impractical", "Futures or related instruments"],
              ["Gold", "Storage/security burden", "Gold-linked fund easier to trade"],
              ["Role check", "Operating cash flow? Usually no", "Purpose: inflation / shock diversifier?"],
            ],
          },
          {
            kind: "metrics",
            title: "Sizing options",
            items: [
              { label: "Policy alts target", value: "$740 (5%)" },
              { label: "Scale-in plan", value: "$370 now + $370 if thesis holds" },
              { label: "YOLO ticket", value: "$4,440 (30%) — breach" },
              {
                label: "Falsifier",
                value: "Contango bleed >2%/quarter with flat spot → trim/exit",
              },
            ],
          },
        ],
        choices: [
          choice(
            "harbor-4a",
            "Scale in with defined risk — fund the Crane sleeve up to ~$740 / 5% with a roll-cost falsifier",
            "gain",
            0.022,
            "Inclusion justified by portfolio purpose and sized to policy. Spike chase avoided.",
          ),
          choice(
            "harbor-4b",
            "YOLO the full sleeve — 30% of the book into Crane on the disruption headline",
            "loss",
            -0.035,
            "Spike fades; concentration and futures structure punish oversized bets.",
          ),
          choice(
            "harbor-4c",
            "Skip purpose entirely and chase whatever commodity rose most last week",
            "loss",
            -0.018,
            "Notes: inclusion should be justified by portfolio purpose, not recent price performance alone.",
          ),
        ],
      },
    ],
  }),
  trade({
    id: "tr-quay-signal",
    areaId: "signal-quay",
    title: "Signal Overlay Swap",
    summary:
      "Detect factor/weight drift outside rebalancing bands, quantify the trim, then rebalance with ADD/HOLD/TRIM/EXIT discipline — do not skip the quarter.",
    risk: "medium",
    capitalDeltaGain: 270,
    capitalDeltaLoss: -150,
    goldReward: 1,
    x: 88,
    y: 38,
    prompt: "Complete the Signal Overlay rebalance chain.",
    choices: [],
    steps: [
      {
        id: "signal-1",
        title: "Part 1 · Drift vs the band",
        narrative:
          "A growth-factor sleeve has run hot. Portal 23.2: rebalancing bands tolerate normal noise but trigger review when exposures move too far. Crossing a band is analysis — not an automatic command.",
        data: [
          {
            kind: "metrics",
            title: "Equity sleeve on the Quay book",
            items: [
              { label: "Portfolio (mark)", value: "$16,000 (post-rally book)" },
              { label: "Stock / growth-factor sleeve", value: "$6,000" },
              { label: "Current weight", value: "$6,000 / $16,000 = 37.5%" },
              { label: "Strategic target", value: "30%" },
              { label: "Band (±5 pp)", value: "25% – 35% (notes Example 23.1)" },
            ],
          },
          {
            kind: "calc",
            title: "Band check (notes Example 23.1)",
            lines: [
              "Upper band = 30% + 5% = 35%",
              "Lower band = 30% − 5% = 25%",
              "37.5% > 35% → band breach → review required",
            ],
          },
          {
            kind: "news",
            title: "Desk chatter",
            items: [
              {
                headline: "Skip rebalance this quarter — winners keep winning",
                source: "Message board",
              },
              {
                headline: "Policy note: bands exist so emotion does not set size",
                source: "Portfolio Lab mandate",
              },
            ],
          },
        ],
        choices: [
          choice(
            "signal-1a",
            "Flag a band breach at 37.5% vs 25–35% — open a rebalance review before adding more growth",
            "gain",
            0.015,
            "Bands create a decision rule before emotion enters. Breach triggers analysis.",
          ),
          choice(
            "signal-1b",
            "Skip rebalance this quarter because the sleeve is ‘working’",
            "loss",
            -0.02,
            "Holding without review is not the same as an active HOLD. Drift past the band needs a process.",
          ),
          choice(
            "signal-1c",
            "Trade every 0.1% wiggle back to exactly 30% all day",
            "loss",
            -0.012,
            "Notes: bands avoid unnecessary trading for tiny deviations — costs and attention matter.",
          ),
        ],
      },
      {
        id: "signal-2",
        title: "Part 2 · Hidden concentration & correlation",
        narrative:
          "Portal 22: diversification is not counting names. The overlay may be many tickers but one growth/tech factor. Rising correlation reduces the diversification benefit of ‘leaving winners alone.’",
        data: [
          {
            kind: "calc",
            title: "Sector concentration (notes Example 22.1 style)",
            lines: [
              "Tech-related names inside the sleeve ≈ $6,216 equivalent risk on a $14,800 reference book → 42%",
              "Several securities can still be one broad sector bet.",
            ],
          },
          {
            kind: "table",
            title: "Two-asset stress on correlation (notes Examples 22.2–22.3)",
            headers: ["Case", "ρ", "Approx σp"],
            rows: [
              ["Calm sample", "0.20", "~10.56%"],
              ["Stress sample", "0.90", "~12.72%"],
            ],
          },
          {
            kind: "news",
            title: "Factor wire",
            items: [
              {
                headline: "Growth names moving together; pairwise ρ drifting toward 0.9",
                source: "Risk desk",
                note: "Diversification weakens when risky assets co-move",
              },
            ],
          },
        ],
        choices: [
          choice(
            "signal-2a",
            "Treat the sleeve as concentrated factor risk — rebalance urgency rises as correlation spikes",
            "gain",
            0.018,
            "Correlation is not permanent. Crisis-like co-movement is a reason to restore target weights.",
          ),
          choice(
            "signal-2b",
            "Assume many tickers automatically mean diversified — ignore ρ",
            "loss",
            -0.022,
            "Portal 22: diversification examines overlapping exposures, not ticker count.",
          ),
          choice(
            "signal-2c",
            "Add more of the same factor because correlation ‘proves the theme’",
            "loss",
            -0.015,
            "Higher co-movement raises portfolio volatility for the same weights — opposite of a free lunch.",
          ),
        ],
      },
      {
        id: "signal-3",
        title: "Part 3 · Trim math to target",
        narrative:
          "Portal 23.3: compute how much to trim. Separate thesis from size — you can still like the companies and reduce concentration.",
        data: [
          {
            kind: "calc",
            title: "Trim to target (notes Example 23.2)",
            lines: [
              "Portfolio = $16,000; position = $6,000; target weight = 30%",
              "Target value = $16,000 × 0.30 = $4,800",
              "Trim = $6,000 − $4,800 = $1,200",
              "Selling $1,200 returns the sleeve to ~30% (ignoring costs).",
            ],
          },
          {
            kind: "calc",
            title: "Valuation upside check (notes Example 23.3)",
            lines: [
              "Estimated value $72; market $66",
              "Upside = ($72 − $66) / $66 ≈ 9.09%",
              "Thesis may remain intact while remaining reward-to-risk no longer supports max size.",
            ],
          },
          {
            kind: "table",
            title: "Decision vocabulary (notes §23.1)",
            headers: ["Action", "Meaning here"],
            rows: [
              ["TRIM", "Cut $1,200 — thesis OK, size too large"],
              ["HOLD", "Only if size still appropriate inside band"],
              ["ADD", "Would worsen the breach"],
              ["REPLACE", "Fund a better risk-adjusted sleeve if advantage is real"],
            ],
          },
        ],
        choices: [
          choice(
            "signal-3a",
            "TRIM $1,200 back toward the 30% target — thesis can stay; size cannot",
            "gain",
            0.02,
            "A trim reduces concentration without rejecting the investment thesis.",
          ),
          choice(
            "signal-3b",
            "ADD more because $66 still sits under a $72 estimate",
            "loss",
            -0.025,
            "Upside alone does not justify breaching the band when concentration and correlation have risen.",
          ),
          choice(
            "signal-3c",
            "EXIT the entire sleeve solely because price rose",
            "loss",
            -0.014,
            "Portal 23: falling or rising price is not automatic EXIT — use thesis, size, and rules.",
          ),
        ],
      },
      {
        id: "signal-4",
        title: "Part 4 · Overlay swap / capital rotation",
        narrative:
          "Execute the rebalance: TRIM the overweight growth overlay and, if justified, REPLACE a slice into a higher expected-return opportunity with similar risk (Portal 23.5). Record the reason.",
        data: [
          {
            kind: "calc",
            title: "Relative advantage (notes Example 23.4)",
            lines: [
              "Current trimmed sleeve expected return assumption: 5%",
              "Candidate quality/bond barbell sleeve: 9% with similar risk/liquidity assumptions",
              "Relative advantage = 9% − 5% = 4 percentage points",
              "Still account for costs, uncertainty, and thesis quality — not one forecast alone.",
            ],
          },
          {
            kind: "metrics",
            title: "Proposed overlay swap",
            items: [
              { label: "TRIM from growth sleeve", value: "$1,200" },
              { label: "ADD to target mix / candidate", value: "$1,200 (or hold in cash if liquidity needed)" },
              { label: "Reference starting book", value: "$14,800 policy capital" },
              { label: "Falsifier", value: "If candidate thesis breaks or liquidity worsens → reverse REPLACE" },
            ],
          },
        ],
        choices: [
          choice(
            "signal-4a",
            "Rebalance to target weights — TRIM $1,200 and rotate with a written relative-advantage check",
            "gain",
            0.022,
            "Tracking error and concentration shrink. Process beats ‘skip this quarter.’",
          ),
          choice(
            "signal-4b",
            "Skip the swap and leave the 37.5% breach untouched",
            "loss",
            -0.03,
            "Drift hurts. Bands without follow-through are decoration.",
          ),
          choice(
            "signal-4c",
            "REPLACE the whole book into the 9% forecast with max leverage",
            "loss",
            -0.02,
            "Notes: replacement still needs costs, uncertainty, and thesis quality — not a single expected-return number.",
          ),
        ],
      },
    ],
  }),
  trade({
    id: "tr-quay-pier",
    areaId: "signal-quay",
    title: "Pier Correlation Hedge",
    summary:
      "Run crisis triage and multi-asset stress on the $14,800 book, refresh weights as correlations spike, then HEDGE/TRIM with a recorded reason — not panic sell-all or stay naked.",
    risk: "medium",
    capitalDeltaGain: 340,
    capitalDeltaLoss: -190,
    goldReward: 1,
    x: 76,
    y: 48,
    prompt: "Complete the Pier Correlation crisis-hedge chain.",
    choices: [],
    steps: [
      {
        id: "pier-1",
        title: "Part 1 · Crisis triage before the hedge ticket",
        narrative:
          "Correlations are spiking on the pier. Portal 27: a crisis is a decision test. Do not react to every falling price — separate liquidity needs, forced risks, thesis breaks, and portfolio-level risk. Cash has option value.",
        data: [
          {
            kind: "table",
            title: "Crisis triage order (notes §27.2)",
            headers: ["Order", "Check"],
            rows: [
              ["1", "Liquidity — near-term obligations / cash need?"],
              ["2", "Forced risks — margin, refinancing, covenants?"],
              ["3", "Thesis breaks — which assumptions failed?"],
              ["4", "Concentration — what now dominates risk?"],
              ["5", "Scenario losses & recovery capacity"],
              ["6–8", "Valuation vs updated fundamentals → ADD/HOLD/TRIM/EXIT/REPLACE/HEDGE → record reason"],
            ],
          },
          {
            kind: "news",
            title: "Pier wires",
            items: [
              {
                headline: "Everything selling together — ‘dump the book’",
                source: "Social feed",
              },
              {
                headline: "Risk desk: pairwise equity ρ rising toward 0.9; liquidity still available in short gov / cash",
                source: "Quay risk",
              },
            ],
          },
          {
            kind: "metrics",
            title: "Book status",
            items: [
              { label: "Starting reference", value: "$14,800" },
              { label: "Cash sleeve", value: "$1,800 (strategic optionality)" },
              { label: "Leverage", value: "1.0× (no margin call)" },
              { label: "Near-term cash need", value: "None this week" },
            ],
          },
        ],
        choices: [
          choice(
            "pier-1a",
            "Triage first: confirm liquidity and no forced selling, then plan hedges — do not sell every decline on headline fear",
            "gain",
            0.015,
            "Process under pressure. Falling price ≠ automatic rising risk or EXIT.",
          ),
          choice(
            "pier-1b",
            "Stay naked and skip triage — ‘hedges are for cowards’",
            "loss",
            -0.02,
            "Portal 26–27: stress without a response plan leaves the book exposed when correlations spike.",
          ),
          choice(
            "pier-1c",
            "Liquidate the entire portfolio immediately because prices fell",
            "loss",
            -0.018,
            "Notes: identify thesis breaks vs intact fundamentals before acting; cash optionality is strategic, not panic.",
          ),
        ],
      },
      {
        id: "pier-2",
        title: "Part 2 · Scenario stress — reveal the vulnerability",
        narrative:
          "Portal 26.10: stress testing asks what happens if a specified event occurs. Link shocks logically. If the loss exceeds tolerance, change size, liquidity, hedges, or allocation — do not only record the number.",
        data: [
          {
            kind: "calc",
            title: "Multi-asset recession stress (notes Example 26.9)",
            lines: [
              "Stocks $6,000 × (−20%) = −$1,200",
              "Bonds $4,000 × (+5%) = +$200",
              "Real estate $3,000 × (−15%) = −$450",
              "Cash $1,800 × 0 = $0",
              "Scenario P/L = −$1,450",
            ],
          },
          {
            kind: "calc",
            title: "Scenario return (notes Example 26.10)",
            lines: [
              "Starting value $14,800",
              "Scenario return = −$1,450 / $14,800 ≈ −9.80%",
              "Compare with risk tolerance — bonds/cash helped but did not fully offset equity + property.",
            ],
          },
          {
            kind: "table",
            title: "Why correlation hedge matters now",
            headers: ["Lens", "Point"],
            rows: [
              ["Multi-dimensional risk", "Same vol can hide leverage/liquidity gaps (Portal 26.1)"],
              ["Co-movement", "Risky assets often move together in stress (Portal 22/26)"],
              ["Decision use", "If −9.8% is too large, hedge or cut size before the next leg"],
            ],
          },
        ],
        choices: [
          choice(
            "pier-2a",
            "Accept −$1,450 / ≈−9.8% as the vulnerability map — use it to size a hedge, not as trivia",
            "gain",
            0.018,
            "Scenario analysis reveals which sleeves drive loss and whether protection is enough.",
          ),
          choice(
            "pier-2b",
            "Ignore the stress because ‘VaR / average return looked fine last year’",
            "loss",
            -0.022,
            "Historical stats do not guarantee the future. Stress deliberately steps outside normal behavior.",
          ),
          choice(
            "pier-2c",
            "Increase leverage to 1.5× to ‘earn back’ the −$1,450 faster",
            "loss",
            -0.025,
            "Notes Example 26.8: leverage magnifies losses and can force selling when financing tightens.",
          ),
        ],
      },
      {
        id: "pier-3",
        title: "Part 3 · Weights after the move",
        narrative:
          "Portal 27.7: a defensive holding can become a larger portfolio weight even if its dollar value did not rise. Crisis rebalancing and hedge sizing must use updated weights.",
        data: [
          {
            kind: "calc",
            title: "Concentration after the shock (notes Example 27.3)",
            lines: [
              "Defensive / short-gov sleeve still $2,500",
              "Book falls $14,800 → $12,500",
              "New weight = $2,500 / $12,500 = 20%",
              "Old target percentages are stale — resize hedges off the new book.",
            ],
          },
          {
            kind: "table",
            title: "Integrated shock (notes §27.3)",
            headers: ["Shock", "Portfolio question"],
            rows: [
              ["Rates +1.0 pp", "Duration loss on long bonds?"],
              ["Equities −15%", "Thesis break or valuation opportunity?"],
              ["Property −10%", "Can financing be serviced?"],
              ["Home FX +6%", "Unhedged foreign sleeve hit?"],
              ["Guidance cut", "EXIT/TRIM the broken name?"],
            ],
          },
        ],
        choices: [
          choice(
            "pier-3a",
            "Recompute weights on the $12,500 mark — size any correlation hedge to the new book, not the old $14,800 targets",
            "gain",
            0.02,
            "Updated weights prevent under-/over-hedging after the first leg of the crisis.",
          ),
          choice(
            "pier-3b",
            "Keep using pre-crisis target percentages and ignore the 20% defensive weight",
            "loss",
            -0.018,
            "Notes: crisis rebalancing should use updated weights rather than old targets.",
          ),
          choice(
            "pier-3c",
            "Average down the guidance-cut name solely because it fell 30%",
            "loss",
            -0.022,
            "Thesis breaks before bargains — a 30% decline is not automatically a buy.",
          ),
        ],
      },
      {
        id: "pier-4",
        title: "Part 4 · Hedge into the stress window",
        narrative:
          "Decide with a recorded reason: HEDGE residual equity/property co-movement, TRIM broken theses, HOLD quality short bonds/cash for liquidity. Do not stay naked through the correlation spike.",
        data: [
          {
            kind: "table",
            title: "Response grid (notes §27.4)",
            headers: ["Holding", "Action bias"],
            rows: [
              ["Long-duration bond", "TRIM/HOLD — quantify duration loss"],
              ["High-quality short bond / cash", "HOLD/ADD — liquidity & ballast"],
              ["Growth equity cluster", "HEDGE/TRIM while ρ is elevated"],
              ["Weak company (guidance cut)", "TRIM/EXIT if thesis broken"],
              ["Direct property", "HOLD/Protect — check leverage & sale time"],
            ],
          },
          {
            kind: "metrics",
            title: "Pier hedge ticket",
            items: [
              { label: "Hedge notional", value: "~8–10% of marked book (sized to −9.8% stress)" },
              { label: "Instrument role", value: "Offset equity/property co-move; not a directional YOLO" },
              { label: "Review trigger", value: "ρ back <0.4 or stress P/L within tolerance → scale down hedge" },
              { label: "Record", value: "Evidence / valuation / risk / liquidity / trigger (Portal 27.8)" },
            ],
          },
        ],
        choices: [
          choice(
            "pier-4a",
            "Hedge into the stress window — size to the −9.8% map, TRIM broken names, keep cash optionality, write the review trigger",
            "gain",
            0.022,
            "Hedge pays as process: vulnerability reduced without abandoning the investment process.",
          ),
          choice(
            "pier-4b",
            "Stay naked through the correlation spike",
            "loss",
            -0.03,
            "Everything sells together. Stress without hedge or size change leaves the book unprotected.",
          ),
          choice(
            "pier-4c",
            "Pledge cash and lever a bigger directional short ‘hedge’ past mandate",
            "loss",
            -0.02,
            "Leverage can force action (Portal 26.9). A hedge that creates new forced-risk is not triage.",
          ),
        ],
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
    summary:
      "Graduate the Highlands book to a simulated $10m fund: treat the IPS as constitution, scale weights to dollars, enforce max position and liquidity reserve, and refuse preference-driven breaches.",
    risk: "low",
    capitalDeltaGain: 230,
    capitalDeltaLoss: -260,
    goldReward: 1,
    x: 18,
    y: 24,
    prompt: "Complete the Fund Mandate IPS chain.",
    choices: [],
    steps: [
      {
        id: "mandate-1",
        title: "Part 1 · IPS is the constitution",
        narrative:
          "You leave the $14,800 starter book for a simulated $10m Highlands fund. Portal 34.1: scale alone is not the change — obligations are. The IPS defines objective, risk, liquidity, benchmark, ranges and concentration so decisions follow the mandate, not personal preference after a rough week.",
        data: [
          {
            kind: "table",
            title: "IPS elements (notes §34.1)",
            headers: ["Element", "Example question"],
            rows: [
              ["Objective", "What is the fund trying to achieve?"],
              ["Return target", "Absolute, real or benchmark-relative?"],
              ["Risk limit", "Max volatility, drawdown or VaR?"],
              ["Liquidity", "How quickly must assets convert to cash?"],
              ["Benchmark", "What is the comparison portfolio/index?"],
              ["Concentration", "Max single-name / sector / country weight?"],
            ],
          },
          {
            kind: "news",
            title: "Highlands desk chatter",
            items: [
              {
                headline: "Ignore the IPS this quarter — the opportunity set changed",
                source: "Message board",
                note: "Changing rules after discomfort is exactly what the mandate prevents",
              },
              {
                headline: "Policy note: preference ≠ permitted risk",
                source: "Portfolio Lab mandate",
              },
            ],
          },
        ],
        choices: [
          choice(
            "mandate-1a",
            "Lock the IPS as constitution — trades must fit objective, risk, liquidity and concentration before preference",
            "gain",
            0.015,
            "Notes §34.1: the IPS prevents rewriting the rules when performance becomes uncomfortable.",
          ),
          choice(
            "mandate-1b",
            "Manage the $10m book by personal preference until returns feel right, then write the IPS",
            "loss",
            -0.02,
            "A professional fund cannot be managed simply by preference. Mandate first.",
          ),
          choice(
            "mandate-1c",
            "Treat the IPS as optional marketing text that never constrains tickets",
            "loss",
            -0.015,
            "Without enforceable limits, unconstrained global choices become mandate drift.",
          ),
        ],
      },
      {
        id: "mandate-2",
        title: "Part 2 · Scale weights to dollars",
        narrative:
          "Portal 34.2: Dollar allocation = Fund × Weight. The arithmetic from $14,800 still applies, but at $10m implementation, liquidity and market impact matter. A 35% equity target is $3.5m — not a reason to ignore execution risk.",
        data: [
          {
            kind: "calc",
            title: "Professional allocation (notes Example 34.1)",
            lines: [
              "Fund value = $10,000,000",
              "Strategic equity target = 35% = 0.35",
              "Equity allocation = $10,000,000 × 0.35",
              "= $3,500,000",
            ],
          },
          {
            kind: "metrics",
            title: "Scale reminder",
            items: [
              { label: "Starter book", value: "$14,800" },
              { label: "Simulated fund", value: "$10,000,000" },
              { label: "Same 35% equity at $14,800", value: "≈ $5,180" },
              { label: "Same 35% equity at $10m", value: "$3,500,000" },
            ],
          },
        ],
        choices: [
          choice(
            "mandate-2a",
            "Set $3.5m equity target and flag implementation/liquidity risk — weights scale; market impact does too",
            "gain",
            0.02,
            "Example 34.1: $10m × 0.35 = $3.5m. Distinguish allocation arithmetic from implementation risk.",
          ),
          choice(
            "mandate-2b",
            "Treat $3.5m like a $5k ticket — fill instantly with no impact or unwind plan",
            "loss",
            -0.018,
            "At institutional size, easy small-account trades can move prices and be hard to unwind.",
          ),
          choice(
            "mandate-2c",
            "Book $35m equity because ‘35% of $10m looks bigger with an extra zero’",
            "loss",
            -0.025,
            "Arithmetic error. $10m × 0.35 = $3.5m, not $35m.",
          ),
        ],
      },
      {
        id: "mandate-3",
        title: "Part 3 · Active return and max position",
        narrative:
          "Portal 34.3–34.4: Active return = Rp − Rb (8.4% − 7.1% = +1.3 pp). Absolute gain can still be weak relatively. Max dollar position = Fund × Limit (6% of $10m = $600k) — monitor after price moves so winners do not silently breach.",
        data: [
          {
            kind: "calc",
            title: "Active return (notes Example 34.2)",
            lines: [
              "Fund return Rp = 8.4%",
              "Benchmark Rb = 7.1%",
              "Active return = 8.4% − 7.1% = +1.3 percentage points",
            ],
          },
          {
            kind: "calc",
            title: "Position limit (notes Example 34.3)",
            lines: [
              "Fund value = $10,000,000",
              "Max single-stock weight = 6% = 0.06",
              "Max position = $10,000,000 × 0.06 = $600,000",
            ],
          },
          {
            kind: "news",
            title: "Ticket proposal",
            items: [
              {
                headline: "Add $900k to RidgeForge — thesis is working; let it run past 6%",
                source: "PM chat",
              },
              {
                headline: "‘We beat cash’ — skip the benchmark this quarter",
                source: "Desk rumor",
              },
            ],
          },
        ],
        choices: [
          choice(
            "mandate-3a",
            "Score +1.3 pp active return vs benchmark and refuse any add that would push a name above the $600k / 6% cap",
            "gain",
            0.022,
            "Examples 34.2–34.3: relative performance and enforceable position limits are mandate rules, not vibes.",
          ),
          choice(
            "mandate-3b",
            "Approve the $900k add — winners deserve more than 6%",
            "loss",
            -0.028,
            "Position limits exist so one wrong thesis cannot dominate. Monitor after rallies too.",
          ),
          choice(
            "mandate-3c",
            "Ignore the benchmark because absolute 8.4% ‘feels fine’",
            "loss",
            -0.016,
            "A positive absolute return can still be poor relative performance vs the mandate’s comparison standard.",
          ),
        ],
      },
      {
        id: "mandate-4",
        title: "Part 4 · Liquidity reserve — approve or breach",
        narrative:
          "Portal 34.5: Minimum liquid reserve = Fund × Required % (12% of $10m = $1.2m). Too little liquidity forces bad sales; too much cash can drag return. Approve only lots that keep the reserve and concentration limits intact on the $10m Highlands fund.",
        data: [
          {
            kind: "calc",
            title: "Liquidity requirement (notes Example 34.4)",
            lines: [
              "Required liquidity = 12% = 0.12",
              "Reserve = $10,000,000 × 0.12 = $1,200,000",
              "At least $1.2m in cash / highly liquid instruments",
            ],
          },
          {
            kind: "metrics",
            title: "Proposed illiquid opportunity lot",
            items: [
              { label: "Proposed deployment", value: "$1.8m into hard-to-sell private-style sleeve" },
              { label: "Cash after fill (if approved)", value: "~$0.4m (< $1.2m reserve)" },
              { label: "Single-name after add", value: "Would also press past 6% on one name" },
              { label: "Mandate check", value: "Liquidity + concentration breach" },
            ],
          },
        ],
        choices: [
          choice(
            "mandate-4a",
            "Refuse the lot — keep ≥ $1.2m liquid and stay inside the 6% cap; hunt opportunity without breaching the IPS",
            "gain",
            0.025,
            "Example 34.4: liquidity balances readiness with capital efficiency. Attractive ≠ permitted.",
          ),
          choice(
            "mandate-4b",
            "Deploy the $1.8m — cash is a drag and the IPS can be ‘amended later’",
            "loss",
            -0.03,
            "Rewriting rules after the opportunity appears is preference management, not a mandate.",
          ),
          choice(
            "mandate-4c",
            "Approve half now and ignore the reserve until redemptions hit",
            "loss",
            -0.02,
            "Reserves exist before stress. Forced sales after the fact are the cost of skipping liquidity.",
          ),
        ],
      },
    ],
  }),
  trade({
    id: "tr-high-thesis",
    areaId: "mandate-highlands",
    title: "Thesis Forge Ticket",
    summary:
      "Forge a Highlands thesis from expected return, upside/downside, variant perception, catalysts and falsifiers — then ticket only with sell criteria set before capital is exposed.",
    risk: "medium",
    capitalDeltaGain: 360,
    capitalDeltaLoss: -240,
    goldReward: 1,
    x: 38,
    y: 22,
    prompt: "Complete the Investment Thesis forge chain.",
    choices: [],
    steps: [
      {
        id: "thesis-1",
        title: "Part 1 · A thesis must be able to be wrong",
        narrative:
          "Portal 28.1: an idea is not a thesis. Research → valuation → thesis → then size. A useful thesis is specific enough to become wrong — connect economics, valuation, catalysts, risks and falsification. ‘Strong company’ is too vague for the Highlands book.",
        data: [
          {
            kind: "table",
            title: "Thesis elements (notes §28.1)",
            headers: ["Element", "Question"],
            rows: [
              ["Asset/business", "What exactly do we own?"],
              ["Price/value", "What is the market implying?"],
              ["Expected return", "What return under stated assumptions?"],
              ["Catalyst", "What could cause recognition?"],
              ["Variant perception", "Where do we disagree with consensus?"],
              ["Falsification", "What evidence would prove us wrong?"],
              ["Sell criteria", "When do we exit or trim?"],
            ],
          },
          {
            kind: "news",
            title: "Forge chatter",
            items: [
              {
                headline: "RidgeForge is a strong company — buy the story",
                source: "Message board",
                note: "No horizon, catalysts, or falsifiers",
              },
            ],
          },
        ],
        choices: [
          choice(
            "thesis-1a",
            "Draft a testable thesis — economics, valuation gap, catalyst, risks and what would force a rethink — before sizing",
            "gain",
            0.012,
            "Notes §28.1: a thesis is a structured argument, not a pile of positive facts.",
          ),
          choice(
            "thesis-1b",
            "Ticket on ‘strong company’ vibes and write the thesis after the position works",
            "loss",
            -0.018,
            "Sizing before reasoning inverts the sequence. Vague praise cannot be falsified.",
          ),
          choice(
            "thesis-1c",
            "Skip falsification — only list bullish facts so the ticket looks confident",
            "loss",
            -0.014,
            "A one-sided argument is not a professional thesis.",
          ),
        ],
      },
      {
        id: "thesis-2",
        title: "Part 2 · Scenario-weighted expected return",
        narrative:
          "Portal 28.2: Expected return = Σ(pᵢ × Rᵢ). Probabilities sum to 100%. The number makes assumptions visible — it is not a promise. Compare 8.5% to alternatives and to downside risk before committing the $14,800 sleeve.",
        data: [
          {
            kind: "calc",
            title: "Scenario-weighted E(R) (notes Example 28.1)",
            lines: [
              "30% × (+25%) = +7.5%",
              "50% × (+10%) = +5.0%",
              "20% × (−20%) = −4.0%",
              "E(R) = 7.5% + 5.0% − 4.0% = 8.5%",
            ],
          },
          {
            kind: "metrics",
            title: "Screening check",
            items: [
              { label: "Thesis E(R)", value: "8.5%" },
              { label: "Lower-risk alternative", value: "~8.5% available" },
              { label: "Peer opportunity set", value: "Many names ~4–5%" },
              { label: "Fragility test", value: "If one p shifts slightly, does E(R) collapse?" },
            ],
          },
        ],
        choices: [
          choice(
            "thesis-2a",
            "Record E(R) = 8.5% as a screen — compare to risk and competing uses of capital, not as a guaranteed print",
            "gain",
            0.014,
            "Example 28.1: 8.5% summarizes the weighted path; it is only as good as the scenarios.",
          ),
          choice(
            "thesis-2b",
            "Treat 8.5% as locked next-year income and max the sleeve",
            "loss",
            -0.02,
            "Expected return is forward-looking and assumption-dependent — not a coupon.",
          ),
          choice(
            "thesis-2c",
            "Ignore probabilities and average +25%, +10%, −20% as +5% ‘because three cases’",
            "loss",
            -0.015,
            "Unweighted averaging drops the scenario design. Use Σ pᵢRᵢ.",
          ),
        ],
      },
      {
        id: "thesis-3",
        title: "Part 3 · Upside to fair value",
        narrative:
          "Portal 28.3: Upside = (Fair value − Price) / Price. At $42 vs $55 fair value, upside ≈ 30.95%. That gap is potential recognition — not a guaranteed return — and must sit beside downside and confidence.",
        data: [
          {
            kind: "calc",
            title: "Upside (notes Example 28.2)",
            lines: [
              "Current price = $42",
              "Estimated fair value = $55",
              "Difference = $13",
              "Upside = $13 / $42 × 100% ≈ 30.95%",
            ],
          },
        ],
        choices: [
          choice(
            "thesis-3a",
            "Mark ~31% valuation upside from $42 → $55 and pair it with bear-case risk before sizing",
            "gain",
            0.014,
            "Example 28.2: ~30.95% is the gap from today’s price if the $55 estimate is right and recognized.",
          ),
          choice(
            "thesis-3b",
            "Read 31% upside as locked profit and skip the bear case",
            "loss",
            -0.018,
            "Notes: ask whether reward compensates for being wrong — upside alone is incomplete.",
          ),
          choice(
            "thesis-3c",
            "Use dollar gap only ($13) and ignore percentage vs the $42 paid",
            "loss",
            -0.012,
            "Always distinguish dollar difference from percentage upside from the price paid.",
          ),
        ],
      },
      {
        id: "thesis-4",
        title: "Part 4 · Downside and margin of safety",
        narrative:
          "Portal 28.3: Downside = (Bear value − Price) / Price. Equal % upside and downside is not automatically attractive — probabilities and consequences differ. Greater valuation uncertainty demands more margin of safety before the ticket.",
        data: [
          {
            kind: "calc",
            title: "Downside from today’s price (notes §28.3 formula)",
            lines: [
              "Current price = $42",
              "Defensible bear value (thesis packet) = $32",
              "Downside = ($32 − $42) / $42 × 100% ≈ −23.8%",
              "Compare ≈31% upside vs ≈24% downside + confidence in $55",
            ],
          },
          {
            kind: "table",
            title: "Margin-of-safety lens",
            headers: ["Lens", "Read"],
            rows: [
              ["Reward vs being wrong", "31% upside must compensate for ~24% bear path"],
              ["Uncertainty", "More uncertain valuation → demand more MoS / smaller size"],
              ["Symmetry myth", "30% up / 30% down is not auto-attractive"],
            ],
          },
        ],
        choices: [
          choice(
            "thesis-4a",
            "Require margin of safety — size only if upside vs bear path and confidence clear the screen",
            "gain",
            0.015,
            "Notes §28.3: avoid paying a price that assumes everything goes right when uncertainty is high.",
          ),
          choice(
            "thesis-4b",
            "Ignore bear value — 31% upside ‘covers’ any downside",
            "loss",
            -0.022,
            "Upside and downside are not symmetrical concepts; probabilities and consequences differ.",
          ),
          choice(
            "thesis-4c",
            "Treat 30/30 up/down as a free coin-flip and overload the sleeve",
            "loss",
            -0.016,
            "Equal percentages do not imply an attractive risk-adjusted ticket.",
          ),
        ],
      },
      {
        id: "thesis-5",
        title: "Part 5 · Variant perception",
        narrative:
          "Portal 28.4: why does the opportunity exist? If the market already agrees, the gap may already be in price. State consensus vs your view, evidence, and what would close the disagreement — being different for its own sake is not an edge.",
        data: [
          {
            kind: "table",
            title: "Variant quality (notes §28.4)",
            headers: ["Weak", "Stronger"],
            rows: [
              [
                "‘The company is good.’",
                "Consensus 3% growth; evidence suggests 7% as a new channel scales",
              ],
              [
                "‘The stock is cheap.’",
                "Multiple assumes depressed margins; cost data suggests normalization",
              ],
              [
                "‘Rates will fall.’",
                "Forwards imply one cut; data suggests more easing is plausible",
              ],
            ],
          },
          {
            kind: "news",
            title: "Consensus tape",
            items: [
              {
                headline: "Street embeds ~3% growth; channel KPIs tracking above plan",
                source: "Research / ops data",
              },
            ],
          },
        ],
        choices: [
          choice(
            "thesis-5a",
            "Write the variant: consensus ~3% growth vs evidence for ~7% channel scale — plus what would revise the street",
            "gain",
            0.015,
            "Stronger variant perception is evidence-based disagreement embedded in price.",
          ),
          choice(
            "thesis-5b",
            "Buy because ‘everyone knows it’s a good company’ with no disagreement stated",
            "loss",
            -0.018,
            "Identifying a good company is not enough if the market already priced that view.",
          ),
          choice(
            "thesis-5c",
            "Contrarian on purpose with no evidence — ‘fade the crowd’",
            "loss",
            -0.014,
            "Different for its own sake is not an advantage.",
          ),
        ],
      },
      {
        id: "thesis-6",
        title: "Part 6 · Catalysts that connect to economics",
        narrative:
          "Portal 28.5: a variant view can stay unrewarded. A catalyst is a plausible mechanism for reassessment — earnings/margins, launch, refinancing, spin-off, regulation, macro — not a hope. Do not confuse catalyst with the thesis itself.",
        data: [
          {
            kind: "table",
            title: "Catalyst menu (notes §28.5)",
            headers: ["Type", "Example"],
            rows: [
              ["Operational", "Earnings acceleration / margin recovery"],
              ["Strategic", "Product launch, capacity, spin-off"],
              ["Financial", "Debt reduction / refinancing"],
              ["External", "Regulatory decision; rates / FX move"],
            ],
          },
          {
            kind: "news",
            title: "Hope vs mechanism",
            items: [
              {
                headline: "‘Something will happen’ — no date, no linked economics",
                source: "Chat rumor",
              },
              {
                headline: "Channel scale print next two quarters could revise 3%→higher growth",
                source: "Thesis packet",
              },
            ],
          },
        ],
        choices: [
          choice(
            "thesis-6a",
            "Tie the catalyst to channel-scale evidence that could revise growth expectations — not a vague hope",
            "gain",
            0.014,
            "Strongest analysis connects the catalyst to underlying asset economics.",
          ),
          choice(
            "thesis-6b",
            "Depend on an unnamed ‘something will re-rate us’ catalyst",
            "loss",
            -0.02,
            "The thesis should not depend on a catalyst that is merely hoped for.",
          ),
          choice(
            "thesis-6c",
            "Treat any headline event as proof the thesis is already complete",
            "loss",
            -0.012,
            "A catalyst can occur without creating lasting value; it is not the thesis itself.",
          ),
        ],
      },
      {
        id: "thesis-7",
        title: "Part 7 · Falsifiers, sell rules, then size",
        narrative:
          "Portal 28.6: define falsification and sell criteria before emotion. Price down ≠ automatic sell if value is intact; price up ≠ automatic hold if valuation is excessive. Ticket the Highlands idea on the $14,800 book only with exits pre-committed.",
        data: [
          {
            kind: "table",
            title: "Falsification → action (notes §28.6)",
            headers: ["Evidence", "Possible action"],
            rows: [
              ["Revenue driver fails", "Trim or exit"],
              ["Balance-sheet risk past mandate", "Exit or hedge"],
              ["Catalyst delayed; economics intact", "Reassess horizon; possibly hold"],
              ["Price exceeds defensible value", "Trim or exit"],
              ["Better opportunity, similar risk", "Rotate capital"],
              ["Thesis succeeds; value realized", "Harvest / trim / exit"],
            ],
          },
          {
            kind: "metrics",
            title: "Ticket worksheet ($14,800 starter book)",
            items: [
              { label: "E(R) screen", value: "8.5%" },
              { label: "Upside / bear path", value: "~31% vs ~−24%" },
              { label: "Variant", value: "3% consensus vs ~7% evidence" },
              { label: "Pre-commit", value: "Falsifiers + sell criteria before fill" },
            ],
          },
        ],
        choices: [
          choice(
            "thesis-7a",
            "Ticket with pre-written falsifiers and sell criteria — modest size on $14,800 until evidence confirms",
            "gain",
            0.018,
            "Define failure conditions before loss or gain pressure. Process edge over story.",
          ),
          choice(
            "thesis-7b",
            "Ticket with no exit plan — ‘we’ll know when we see it’",
            "loss",
            -0.028,
            "Without falsifiers, failing positions invite new excuses after the fact.",
          ),
          choice(
            "thesis-7c",
            "Sell only if price drops 5% regardless of value — ignore thesis-based exits",
            "loss",
            -0.016,
            "A price decline alone is not necessarily a sell if value is unchanged; rules should be thesis-aware.",
          ),
        ],
      },
    ],
  }),
  trade({
    id: "tr-high-ethics",
    areaId: "mandate-highlands",
    title: "Ethics Gate Swap",
    summary:
      "Defend process integrity under behavioural pressure — spot bias, compute recovery and disposition metrics, calibrate forecast error, then refuse FOMO/conflicted tickets that break the Highlands rules.",
    risk: "low",
    capitalDeltaGain: 200,
    capitalDeltaLoss: -300,
    goldReward: 1,
    x: 24,
    y: 42,
    prompt: "Complete the Behavioural Finance integrity chain.",
    choices: [],
    steps: [
      {
        id: "ethics-1",
        title: "Part 1 · Bias can override good math",
        narrative:
          "Portal 29.1: Portal 28’s thesis can still fail if emotion silently reallocates capital. Biases systematically distort gains, losses, social cues and prior beliefs. The Highlands ethic is rules and review — not pretending emotion disappears.",
        data: [
          {
            kind: "table",
            title: "Bias map (notes §29.1)",
            headers: ["Bias", "Looks like", "Portfolio danger"],
            rows: [
              ["Loss aversion", "Losses hurt more than gains please", "Hold losers / avoid needed risk"],
              ["FOMO", "Buy because others are winning", "Enter after the move"],
              ["Anchoring", "Fixate on purchase price / old target", "Ignore new information"],
              ["Overconfidence", "Overstate forecasting skill", "Oversized, under-diversified"],
              ["Herding", "Follow consensus without analysis", "Crowded positioning"],
              ["Confirmation", "Seek only supportive evidence", "Miss thesis decay"],
              ["Disposition", "Sell winners; hold losers", "Poor capital allocation"],
            ],
          },
          {
            kind: "news",
            title: "Gate chatter",
            items: [
              {
                headline: "Principal swap: ‘everyone is in — skip the checklist’",
                source: "Desk whisper",
                note: "Herding + FOMO pressure",
              },
            ],
          },
        ],
        choices: [
          choice(
            "ethics-1a",
            "Keep the checklist — identify which bias is pressing before any capital moves",
            "gain",
            0.015,
            "Notes §29.1: create rules so emotion does not silently control allocation.",
          ),
          choice(
            "ethics-1b",
            "Skip process — take the herd flow because the tape is hot",
            "loss",
            -0.022,
            "Herding/FOMO is exactly when process integrity is tested.",
          ),
          choice(
            "ethics-1c",
            "Assume knowing the math means bias cannot touch you",
            "loss",
            -0.014,
            "Technically knowledgeable investors still make poor decisions under systematic distortion.",
          ),
        ],
      },
      {
        id: "ethics-2",
        title: "Part 2 · Recovery after a 30% loss",
        narrative:
          "Portal 29.2: Required gain after a loss = 1/(1−L) − 1. A 30% drawdown needs ≈42.86% to get back — the base shrank. Use the math to respect risk controls; still separate broken thesis from temporary volatility.",
        data: [
          {
            kind: "calc",
            title: "Recovery math (notes Example 29.1)",
            lines: [
              "Loss rate L = 30% = 0.30",
              "Required gain = 1/(1 − 0.30) − 1",
              "= 1/0.70 − 1",
              "≈ 0.4286 = 42.86%",
              "$100 → $70; need +$30 on $70 = 42.86%",
            ],
          },
          {
            kind: "news",
            title: "Position under water",
            items: [
              {
                headline: "‘It only fell 30% — a 30% bounce gets us flat’",
                source: "PM chat",
              },
              {
                headline: "Re-underwrite from today’s price; ask if thesis broke",
                source: "Behavioural checklist",
              },
            ],
          },
        ],
        choices: [
          choice(
            "ethics-2a",
            "Correct the math — need ≈42.86% to recover — then decide hold/sell from thesis and forward E(R), not break-even hope",
            "gain",
            0.018,
            "Example 29.1: asymmetry explains why catastrophic losses matter; it does not justify panic-selling every dip.",
          ),
          choice(
            "ethics-2b",
            "Wait for a 30% bounce to ‘get flat’ and refuse to re-underwrite",
            "loss",
            -0.025,
            "Break-even anchoring ignores the smaller capital base and the thesis test.",
          ),
          choice(
            "ethics-2c",
            "Treat every 30% print decline as permanent impairment and dump without reading why",
            "loss",
            -0.016,
            "Notes: panic ≠ broken economics. Combine recovery math with the reason for the loss.",
          ),
        ],
      },
      {
        id: "ethics-3",
        title: "Part 3 · Measure the disposition effect",
        narrative:
          "Portal 29.3: PGR = RG/(RG+PG), PLR = RL/(RL+PL), indicator = PGR − PLR. A positive gap flags realizing gains faster than losses — investigate whether winners/losers use different standards.",
        data: [
          {
            kind: "calc",
            title: "Disposition indicator (notes Example 29.2)",
            lines: [
              "Realized gains = 12; paper gains = 8",
              "Realized losses = 3; paper losses = 9",
              "PGR = 12/(12+8) = 0.60",
              "PLR = 3/(3+9) = 0.25",
              "Indicator = 0.60 − 0.25 = 0.35",
            ],
          },
          {
            kind: "metrics",
            title: "Review prompts",
            items: [
              { label: "Sold winners", value: "Valuation/thesis — or just felt good to lock?" },
              { label: "Held losers", value: "E(R) improved — or waiting for break-even?" },
              { label: "Process fix", value: "Re-underwrite from today’s price, not purchase price" },
            ],
          },
        ],
        choices: [
          choice(
            "ethics-3a",
            "Flag disposition indicator 0.35 — audit winners sold vs losers held with one today’s-price standard",
            "gain",
            0.02,
            "Example 29.2: 0.35 is a pattern signal, not proof every trade was wrong.",
          ),
          choice(
            "ethics-3b",
            "Ignore the 0.35 gap — ‘realized gains prove skill’",
            "loss",
            -0.02,
            "Locking gains while avoiding losses can be comfort, not process.",
          ),
          choice(
            "ethics-3c",
            "Force-sell every loser tomorrow solely to drive PLR up",
            "loss",
            -0.015,
            "The fix is consistent thesis/valuation standards — not cosmetic metric gaming.",
          ),
        ],
      },
      {
        id: "ethics-4",
        title: "Part 4 · Calibrate overconfidence",
        narrative:
          "Portal 29.4: Absolute percentage error = |Actual − Forecast| / |Forecast|. Revenue forecast $120m vs actual $102m → 15% APE. Large repeated misses mean lower confidence, wider scenarios, smaller size.",
        data: [
          {
            kind: "calc",
            title: "Forecast error (notes Example 29.3)",
            lines: [
              "Forecast revenue = $120m",
              "Actual revenue = $102m",
              "Absolute error = $18m",
              "APE = $18m / $120m × 100% = 15%",
            ],
          },
          {
            kind: "news",
            title: "Sizing pressure",
            items: [
              {
                headline: "Double the sleeve — ‘my models never miss’",
                source: "Overconfident ticket",
              },
            ],
          },
        ],
        choices: [
          choice(
            "ethics-4a",
            "Log 15% APE — widen scenarios and cut size until forecasts recalibrate",
            "gain",
            0.018,
            "Example 29.3: measure miss size; do not judge confidence by feeling.",
          ),
          choice(
            "ethics-4b",
            "Raise size anyway — one miss does not count",
            "loss",
            -0.028,
            "Repeated large misses should reduce confidence or shrink positions.",
          ),
          choice(
            "ethics-4c",
            "Only track signed error and ignore absolute percentage misses",
            "loss",
            -0.012,
            "APE answers how large the miss was; still review optimism/pessimism separately.",
          ),
        ],
      },
      {
        id: "ethics-5",
        title: "Part 5 · Journal, then refuse the conflicted swap",
        narrative:
          "Portal 29.5: run the behavioural journal before capital moves — feeling vs evidence, disagreeing facts, size vs confidence, purchase-price anchor, ‘would I buy today?’. Refuse the FOMO/herd principal swap that fails the checklist; keep process integrity on the $14,800 book.",
        data: [
          {
            kind: "table",
            title: "Behavioural decision journal (notes §29.5)",
            headers: ["Question", "Gate response"],
            rows: [
              ["Feeling before the trade?", "Urgency from others’ gains"],
              ["Price move or evidence?", "Price + herd — thin evidence"],
              ["Disagreeing evidence?", "Not reviewed"],
              ["Size from confidence or analysis?", "Confidence / FOMO"],
              ["Purchase price anchoring?", "N/A — new ticket"],
              ["Buy today with fresh eyes?", "No — fails checklist"],
              ["Rule next time?", "No herd fill without thesis + falsifiers"],
            ],
          },
          {
            kind: "metrics",
            title: "Proposed conflicted flow",
            items: [
              { label: "Offer", value: "Principal swap ‘everyone is in’" },
              { label: "Checklist", value: "Fails thesis, variant, falsifiers" },
              { label: "Book", value: "$14,800 Highlands starter" },
            ],
          },
        ],
        choices: [
          choice(
            "ethics-5a",
            "Refuse and document — journal shows FOMO/herding; no ticket without evidence and rules",
            "gain",
            0.022,
            "Process integrity is the ethics gate: rules prevent emotion from allocating capital.",
          ),
          choice(
            "ethics-5b",
            "Take the conflicted herd swap — reputation with the desk beats the journal",
            "loss",
            -0.03,
            "Skipping the journal is how bias silently controls the book.",
          ),
          choice(
            "ethics-5c",
            "Half-fill ‘to stay in the conversation’ without falsifiers",
            "loss",
            -0.018,
            "Partial FOMO is still process breach — size without evidence is overconfidence.",
          ),
        ],
      },
    ],
  }),
  trade({
    id: "tr-high-bias",
    areaId: "mandate-highlands",
    title: "Bias Drill Auction",
    summary:
      "Beat anchoring at the auction, then optimize the Highlands book as a system — expected portfolio return, correlation-aware risk, and risk budgets under real constraints.",
    risk: "medium",
    capitalDeltaGain: 250,
    capitalDeltaLoss: -180,
    goldReward: 1,
    x: 40,
    y: 34,
    prompt: "Complete the Bias + Optimization drill chain.",
    choices: [],
    steps: [
      {
        id: "bias-1",
        title: "Part 1 · Anchoring vs a pre-committed ceiling",
        narrative:
          "Portal 29 → 30 bridge: the auction is built to bait anchoring on the last print or an old target. Bias distorts single-ticket decisions; optimization later asks how holdings work together. Bid only with a pre-committed ceiling tied to thesis/value — not the room’s heat.",
        data: [
          {
            kind: "table",
            title: "Anchor traps (notes §29.1)",
            headers: ["Cue", "Distortion"],
            rows: [
              ["Purchase / last print", "Fixate on old price; ignore new info"],
              ["Room bid heat", "FOMO / herding lifts the ceiling mid-auction"],
              ["Old street target", "Treat outdated number as fair value"],
            ],
          },
          {
            kind: "metrics",
            title: "Pre-commit worksheet ($14,800 book)",
            items: [
              { label: "Thesis max bid", value: "$48 (MoS vs fair value)" },
              { label: "Last print / chatter", value: "$52 and rising" },
              { label: "Room ask", value: "‘Chase — everyone is marking higher’" },
            ],
          },
          {
            kind: "news",
            title: "Auction floor",
            items: [
              {
                headline: "Lift the ceiling — don’t look stupid vs the desk",
                source: "Floor chatter",
              },
            ],
          },
        ],
        choices: [
          choice(
            "bias-1a",
            "Hold the $48 ceiling — refuse to re-anchor on the room’s rising print",
            "gain",
            0.018,
            "Anchoring ignores new information. Pre-committed ceilings protect process before optimization.",
          ),
          choice(
            "bias-1b",
            "Chase the room above $48 because the last print ‘proves’ value",
            "loss",
            -0.025,
            "Last print is not a thesis. FOMO/anchoring overpays.",
          ),
          choice(
            "bias-1c",
            "Scrap the ceiling mid-bid and size up on confidence alone",
            "loss",
            -0.016,
            "Overconfidence plus anchoring is how single tickets poison the portfolio system.",
          ),
        ],
      },
      {
        id: "bias-2",
        title: "Part 2 · Expected portfolio return",
        narrative:
          "Portal 30.1–30.2: optimization improves the return/risk trade-off under constraints — it is not max return at any cost. E(Rp) = Σ wᵢE(Rᵢ). Weights as decimals must sum to 1.00 before you trust the total.",
        data: [
          {
            kind: "calc",
            title: "E(Rp) (notes Example 30.1)",
            lines: [
              "Equities 40% × 9% = 3.60%",
              "Bonds 25% × 4% = 1.00%",
              "Real estate 20% × 6% = 1.20%",
              "Cash 15% × 2% = 0.30%",
              "E(Rp) = 6.10%",
            ],
          },
          {
            kind: "metrics",
            title: "Weight check",
            items: [
              { label: "Sum of weights", value: "40+25+20+15 = 100%" },
              { label: "Largest driver", value: "Equities contribute 3.60 pp of 6.10%" },
              { label: "Caution", value: "Inputs are estimates — not permanent facts" },
            ],
          },
        ],
        choices: [
          choice(
            "bias-2a",
            "Record E(Rp) = 6.10% and refuse to ‘optimize’ by chasing only the highest single-asset forecast",
            "gain",
            0.02,
            "Example 30.1: weighted contributions show what drives the book. Max forecast return ≠ efficient portfolio.",
          ),
          choice(
            "bias-2b",
            "Dump bonds/cash and go 100% equities because 9% > 6.10%",
            "loss",
            -0.022,
            "Highest forecast return can bring unacceptable volatility, concentration or liquidity risk.",
          ),
          choice(
            "bias-2c",
            "Average 9%, 4%, 6%, 2% without weights and call it 5.25%",
            "loss",
            -0.014,
            "Each asset influences E(Rp) in proportion to capital allocated — use Σ wᵢE(Rᵢ).",
          ),
        ],
      },
      {
        id: "bias-3",
        title: "Part 3 · Correlation cuts portfolio volatility",
        narrative:
          "Portal 30.3: risk is not a weighted average of vols — correlation matters. σp² = w₁²σ₁² + w₂²σ₂² + 2w₁w₂σ₁σ₂ρ. With ρ = 0.25, 60/40 A/B yields ≈11.29% vol — below Asset A’s 16%.",
        data: [
          {
            kind: "calc",
            title: "Two-asset volatility (notes Example 30.2)",
            lines: [
              "wA=0.60, σA=16%; wB=0.40, σB=10%; ρ=0.25",
              "Term1 = 0.36 × 0.0256 = 0.009216",
              "Term2 = 0.16 × 0.0100 = 0.001600",
              "Cross = 2×0.60×0.40×0.16×0.10×0.25 = 0.001920",
              "Variance = 0.012736 → σp ≈ 11.29%",
            ],
          },
          {
            kind: "table",
            title: "Diversification read",
            headers: ["If correlation…", "Then…"],
            rows: [
              ["→ +1", "Diversification benefit shrinks"],
              ["Lower / negative", "Offsetting moves can cut σp more"],
              ["Ignored", "‘Safe’ add-ons that move together still concentrate risk"],
            ],
          },
        ],
        choices: [
          choice(
            "bias-3a",
            "Keep the diversifier — ≈11.29% portfolio vol shows ρ=0.25 offsets; judge the system, not each name alone",
            "gain",
            0.022,
            "Example 30.2: portfolio risk depends on how risks interact, not only standalone vols.",
          ),
          choice(
            "bias-3b",
            "Cut Asset B because 10% vol ‘does nothing’ next to A’s 16%",
            "loss",
            -0.02,
            "Low-vol alone does not diversify if behavior matches existing exposures.",
          ),
          choice(
            "bias-3c",
            "Average 16% and 10% to 13% and ignore the cross term",
            "loss",
            -0.015,
            "Weighted-average volatility skips correlation — the engine of diversification.",
          ),
        ],
      },
      {
        id: "bias-4",
        title: "Part 4 · Risk budgets, Sharpe, constraints",
        narrative:
          "Portal 30.4–30.6: Sharpe = (E(Rp)−Rf)/σp (8%−3%)/10% = 0.50. Risk share ≈ wσ/Σ(wσ) — Asset B can match A’s ~45% risk share at only 30% capital. Constraints (max name, liquidity, sectors) stop unconstrained math from concentrating the $14,800 book.",
        data: [
          {
            kind: "calc",
            title: "Sharpe (notes Example 30.3)",
            lines: [
              "E(Rp)=8%, Rf=3%, σp=10%",
              "Excess = 5% → Sharpe = 0.05/0.10 = 0.50",
            ],
          },
          {
            kind: "calc",
            title: "Stand-alone risk shares (notes Example 30.4)",
            lines: [
              "A: 0.50×0.12 = 0.060 → 45.45%",
              "B: 0.30×0.20 = 0.060 → 45.45%",
              "C: 0.20×0.06 = 0.012 → 9.09%",
              "B matches A’s risk share despite lower capital weight",
            ],
          },
          {
            kind: "news",
            title: "Optimizer pitch",
            items: [
              {
                headline: "Remove all constraints — model loves three names at 90%+",
                source: "Unconstrained solver",
              },
            ],
          },
        ],
        choices: [
          choice(
            "bias-4a",
            "Trim/re-budget where risk share (not just weight) dominates; keep max-position and liquidity constraints — accept Sharpe as one lens only",
            "gain",
            0.025,
            "Examples 30.3–30.4 + §30.6: efficient and deliberate under real limits — not mechanical max-return output.",
          ),
          choice(
            "bias-4b",
            "Accept the unconstrained 90% concentration because the solver’s Sharpe looks best",
            "loss",
            -0.03,
            "Unreliable forecasts + no constraints → hidden concentration, liquidity and mandate risk.",
          ),
          choice(
            "bias-4c",
            "Judge risk only by capital weights — ignore that B’s 30% weight can equal A’s risk share",
            "loss",
            -0.018,
            "Largest capital weight is not always the largest risk contributor.",
          ),
        ],
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
