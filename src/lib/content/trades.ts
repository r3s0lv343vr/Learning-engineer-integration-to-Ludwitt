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
