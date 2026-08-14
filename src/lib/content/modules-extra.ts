import type { ModuleQuest } from "@/lib/types";

/** Modules 19–36 — Signal Quay + Mandate Highlands. */
export const MODULES_EXTRA: ModuleQuest[] = [
  {
    id: "m19",
    number: 19,
    title: "Bonds & Fixed Income",
    mapLabel: "Asset Mix Lab",
    x: 50,
    y: 50,
    summary:
      "Understand government and corporate bonds, yields, duration, credit risk and interest-rate sensitivity.",
    concepts: [
      "bond cash flows",
      "coupon and current yield",
      "holding-period return",
      "duration / rate sensitivity",
      "credit spread",
      "fixed-income portfolio role",
    ],
    outcome:
      "Decide whether fixed income improves the $14,800 portfolio after measuring coupon income, yield, duration risk and credit spread.",
    lesson:
      "A bond is a debt security: the investor is mainly a creditor, not an owner. Face (par) value is principal due at maturity; coupon rate sets contractual interest on face value; market price is what investors pay today for the promised cash flows; yield is the return implied by price and cash flows; duration measures interest-rate sensitivity; credit risk is the chance promised payments are missed. Annual coupon = Face value × Coupon rate (e.g. $1,000 × 6% = $60). Current yield = Annual coupon / Market price × 100% (e.g. $60 / $950 ≈ 6.32%) — it is not the same as yield to maturity. Holding-period return = (Coupon + Ending price − Beginning price) / Beginning price × 100% (e.g. buy $980, coupon $50, sell $1,005 → ≈ 7.65%). Bond prices move inversely to market yields: when rates rise, older lower-coupon bonds become less attractive and prices fall. Approximate % price change ≈ −Modified duration × Change in yield (e.g. duration 5.2 and +0.75 pp → ≈ −3.9%). Credit spread ≈ Corporate yield − Comparable government yield (e.g. 6.4% − 4.1% = 2.3% or 230 bp). Fixed income can add income, capital preservation, diversification, liability matching and recession ballast — but long duration, inflation and credit stress can still create losses.",
    scenario:
      "In Portfolio Lab you are sizing a fixed-income sleeve beside equities and cash on the $14,800 book. Before you buy, you must know what a bond is, how coupon and current yield differ, how total return includes price change, how duration estimates rate risk, and whether a corporate spread compensates for credit risk — then decide if bonds improve the portfolio.",
    questions: [
      {
        id: "m19-q1",
        prompt:
          "In Green City Portal 19, buying a conventional bond is economically different from buying a share mainly because:",
        choices: [
          "A bondholder is primarily a creditor with contractual cash-flow claims; a shareholder has a residual ownership claim",
          "Bonds never change price after purchase",
          "Bondholders always own voting control of the company",
          "Shares repay a fixed face value at a stated maturity date",
        ],
        correctIndex: 0,
        explanation:
          "Notes §19.1: a shareholder participates in residual success; a bondholder has a contractual claim focused on coupons, principal, rates and ability to pay.",
      },
      {
        id: "m19-q2",
        prompt:
          "A bond has face value $1,000 and a 6% annual coupon rate. What is the annual coupon payment?",
        choices: [
          "$60",
          "$6",
          "$1,060",
          "$600",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 19.1: Annual coupon = Face value × Coupon rate = $1,000 × 0.06 = $60.",
      },
      {
        id: "m19-q3",
        prompt:
          "A $1,000 face-value bond pays a $60 annual coupon and trades at $950. Approximate current yield is:",
        choices: [
          "About 6.32% (coupon ÷ market price × 100%)",
          "Exactly 6.00% because the coupon rate is 6%",
          "About 15.8% ($950 ÷ $60)",
          "Zero until maturity",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 19.2: Current yield = $60 / $950 × 100% ≈ 6.32%. Coupon rate ≠ current yield; current yield is not YTM.",
      },
      {
        id: "m19-q4",
        prompt:
          "A bond has modified duration 5.2 and market yield rises by 0.75 percentage points. Using the notes’ duration approximation, estimated price change is about:",
        choices: [
          "A 3.9% price decline (−5.2 × 0.0075)",
          "A 3.9% price increase",
          "No price change if coupons are still paid",
          "A 5.2% price decline equal to duration in years",
        ],
        correctIndex: 0,
        explanation:
          "Notes Example 19.4: %ΔPrice ≈ −Duration × ΔYield = −5.2 × 0.0075 = −0.039 → about −3.9%. Higher duration means more rate sensitivity.",
      },
      {
        id: "m19-q5",
        prompt:
          "For the $14,800 Portfolio Lab book, which decision best applies Portal 19 fixed-income thinking?",
        choices: [
          "Add/size a bond sleeve only after checking income role, duration (rate) risk and credit spread — not because a high yield looks free",
          "Treat every high-yield corporate bond as risk-free income",
          "Ignore duration because coupon payments guarantee no mark-to-market loss",
          "Replace all cash with the longest-duration bond available for maximum stability",
        ],
        correctIndex: 0,
        explanation:
          "Notes §§19.7–19.8: fixed income can diversify and stabilize, but duration, inflation and credit risk can still create losses; a wide spread may warn of stress, not free return.",
      },
    ],
  },
  {
    id: "m20",
    number: 20,
    title: "Risk Budgeting Basics",
    mapLabel: "Risk Budget",
    x: 50,
    y: 50,
    summary: "Translate mandate language into numeric risk budgets.",
    concepts: [
      "risk budget",
      "volatility",
      "position limits"
    ],
    outcome: "Propose risk limits for a moderate investor.",
    lesson:
      "A risk budget caps how much pain is allowed: max drawdown, sector caps, single-name caps, and liquidity rules. Numbers beat vibes.",
    scenario:
      "Apply Module 20 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m20-q1",
        prompt: "In Module 20 (Risk Budgeting Basics), the best first step is to:",
        choices: [
          "Skip the numbers and follow tips",
          "Define the decision, risks, and what would change your mind",
          "Maximise leverage",
          "Ignore liquidity"
        ],
        correctIndex: 1,
        explanation: "Process first: decision, risks, falsifiers.",
      },
      {
        id: "m20-q2",
        prompt: "Which formula pair is most relevant when checking short-term survival?",
        choices: [
          "P/E and PEG only",
          "Current ratio and acid-test (quick) ratio",
          "CAGR only",
          "Dividend yield only"
        ],
        correctIndex: 1,
        explanation: "Liquidity ratios stress near-term obligations.",
      },
      {
        id: "m20-q3",
        prompt: "A healthy learner response after being wrong is to:",
        choices: [
          "Delete the journal",
          "Update the thesis and falsifiers",
          "Double the size immediately",
          "Blame the market exclusively"
        ],
        correctIndex: 1,
        explanation: "Learning compounds through revised process.",
      }
    ],
  },
  {
    id: "m21",
    number: 21,
    title: "Factor Awareness",
    mapLabel: "Factor Desk",
    x: 50,
    y: 50,
    summary: "Recognize common return factors without overclaiming.",
    concepts: [
      "value factor",
      "momentum",
      "quality"
    ],
    outcome: "Explain one factor exposure in your book.",
    lesson:
      "Factors are systematic return drivers (value, momentum, quality, size). Know what you own — accidental factor bets are still bets.",
    scenario:
      "Apply Module 21 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m21-q1",
        prompt: "In Module 21 (Factor Awareness), the best first step is to:",
        choices: [
          "Skip the numbers and follow tips",
          "Define the decision, risks, and what would change your mind",
          "Maximise leverage",
          "Ignore liquidity"
        ],
        correctIndex: 1,
        explanation: "Process first: decision, risks, falsifiers.",
      },
      {
        id: "m21-q2",
        prompt: "Which formula pair is most relevant when checking short-term survival?",
        choices: [
          "P/E and PEG only",
          "Current ratio and acid-test (quick) ratio",
          "CAGR only",
          "Dividend yield only"
        ],
        correctIndex: 1,
        explanation: "Liquidity ratios stress near-term obligations.",
      },
      {
        id: "m21-q3",
        prompt: "A healthy learner response after being wrong is to:",
        choices: [
          "Delete the journal",
          "Update the thesis and falsifiers",
          "Double the size immediately",
          "Blame the market exclusively"
        ],
        correctIndex: 1,
        explanation: "Learning compounds through revised process.",
      }
    ],
  },
  {
    id: "m22",
    number: 22,
    title: "Earnings Quality Screen",
    mapLabel: "Quality Screen",
    x: 50,
    y: 50,
    summary: "Spot earnings that may not convert to cash.",
    concepts: [
      "accruals",
      "cash conversion",
      "one-offs"
    ],
    outcome: "Flag one red flag in a sample statement.",
    lesson:
      "Rising accruals, widening gap between NI and FCF, and recurring 'one-offs' weaken earnings quality.",
    scenario:
      "Apply Module 22 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m22-q1",
        prompt: "In Module 22 (Earnings Quality Screen), the best first step is to:",
        choices: [
          "Skip the numbers and follow tips",
          "Define the decision, risks, and what would change your mind",
          "Maximise leverage",
          "Ignore liquidity"
        ],
        correctIndex: 1,
        explanation: "Process first: decision, risks, falsifiers.",
      },
      {
        id: "m22-q2",
        prompt: "Which formula pair is most relevant when checking short-term survival?",
        choices: [
          "P/E and PEG only",
          "Current ratio and acid-test (quick) ratio",
          "CAGR only",
          "Dividend yield only"
        ],
        correctIndex: 1,
        explanation: "Liquidity ratios stress near-term obligations.",
      },
      {
        id: "m22-q3",
        prompt: "A healthy learner response after being wrong is to:",
        choices: [
          "Delete the journal",
          "Update the thesis and falsifiers",
          "Double the size immediately",
          "Blame the market exclusively"
        ],
        correctIndex: 1,
        explanation: "Learning compounds through revised process.",
      }
    ],
  },
  {
    id: "m23",
    number: 23,
    title: "Working Capital Watch",
    mapLabel: "WC Watch",
    x: 50,
    y: 50,
    summary: "Read inventory and receivables for stress.",
    concepts: [
      "inventory days",
      "receivables",
      "cash cycle"
    ],
    outcome: "Interpret rising inventory with flat sales.",
    lesson:
      "Working capital can hide demand weakness. Inventory builds and slower collections often precede earnings misses.",
    scenario:
      "Apply Module 23 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m23-q1",
        prompt: "In Module 23 (Working Capital Watch), the best first step is to:",
        choices: [
          "Skip the numbers and follow tips",
          "Define the decision, risks, and what would change your mind",
          "Maximise leverage",
          "Ignore liquidity"
        ],
        correctIndex: 1,
        explanation: "Process first: decision, risks, falsifiers.",
      },
      {
        id: "m23-q2",
        prompt: "Which formula pair is most relevant when checking short-term survival?",
        choices: [
          "P/E and PEG only",
          "Current ratio and acid-test (quick) ratio",
          "CAGR only",
          "Dividend yield only"
        ],
        correctIndex: 1,
        explanation: "Liquidity ratios stress near-term obligations.",
      },
      {
        id: "m23-q3",
        prompt: "A healthy learner response after being wrong is to:",
        choices: [
          "Delete the journal",
          "Update the thesis and falsifiers",
          "Double the size immediately",
          "Blame the market exclusively"
        ],
        correctIndex: 1,
        explanation: "Learning compounds through revised process.",
      }
    ],
  },
  {
    id: "m24",
    number: 24,
    title: "Rates & Duration",
    mapLabel: "Duration Desk",
    x: 50,
    y: 50,
    summary: "Link interest rates to bond and equity durations.",
    concepts: [
      "duration",
      "discount rates",
      "bond prices"
    ],
    outcome: "Predict bond price move if yields jump.",
    lesson:
      "When yields rise, longer-duration assets fall more. Equities with distant cash flows behave like long duration.",
    scenario:
      "Apply Module 24 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m24-q1",
        prompt: "In Module 24 (Rates & Duration), the best first step is to:",
        choices: [
          "Skip the numbers and follow tips",
          "Define the decision, risks, and what would change your mind",
          "Maximise leverage",
          "Ignore liquidity"
        ],
        correctIndex: 1,
        explanation: "Process first: decision, risks, falsifiers.",
      },
      {
        id: "m24-q2",
        prompt: "Which formula pair is most relevant when checking short-term survival?",
        choices: [
          "P/E and PEG only",
          "Current ratio and acid-test (quick) ratio",
          "CAGR only",
          "Dividend yield only"
        ],
        correctIndex: 1,
        explanation: "Liquidity ratios stress near-term obligations.",
      },
      {
        id: "m24-q3",
        prompt: "A healthy learner response after being wrong is to:",
        choices: [
          "Delete the journal",
          "Update the thesis and falsifiers",
          "Double the size immediately",
          "Blame the market exclusively"
        ],
        correctIndex: 1,
        explanation: "Learning compounds through revised process.",
      }
    ],
  },
  {
    id: "m25",
    number: 25,
    title: "FX for Portfolios",
    mapLabel: "FX Desk",
    x: 50,
    y: 50,
    summary: "Treat currency as an explicit risk, not an afterthought.",
    concepts: [
      "FX exposure",
      "hedging",
      "base currency"
    ],
    outcome: "Decide whether to hedge a foreign equity sleeve.",
    lesson:
      "FX can dominate short-horizon returns. Hedge when currency risk is unwanted; leave open when it is a deliberate view.",
    scenario:
      "Apply Module 25 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m25-q1",
        prompt: "In Module 25 (FX for Portfolios), the best first step is to:",
        choices: [
          "Skip the numbers and follow tips",
          "Define the decision, risks, and what would change your mind",
          "Maximise leverage",
          "Ignore liquidity"
        ],
        correctIndex: 1,
        explanation: "Process first: decision, risks, falsifiers.",
      },
      {
        id: "m25-q2",
        prompt: "Which formula pair is most relevant when checking short-term survival?",
        choices: [
          "P/E and PEG only",
          "Current ratio and acid-test (quick) ratio",
          "CAGR only",
          "Dividend yield only"
        ],
        correctIndex: 1,
        explanation: "Liquidity ratios stress near-term obligations.",
      },
      {
        id: "m25-q3",
        prompt: "A healthy learner response after being wrong is to:",
        choices: [
          "Delete the journal",
          "Update the thesis and falsifiers",
          "Double the size immediately",
          "Blame the market exclusively"
        ],
        correctIndex: 1,
        explanation: "Learning compounds through revised process.",
      }
    ],
  },
  {
    id: "m26",
    number: 26,
    title: "Credit Spreads 101",
    mapLabel: "Credit Spread",
    x: 50,
    y: 50,
    summary: "Understand credit risk pricing in yields.",
    concepts: [
      "credit spread",
      "default risk",
      "yield"
    ],
    outcome: "Explain why a BBB bond yields more than a Treasury.",
    lesson:
      "Credit spread compensates for default and liquidity risk over the risk-free curve.",
    scenario:
      "Apply Module 26 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m26-q1",
        prompt: "In Module 26 (Credit Spreads 101), the best first step is to:",
        choices: [
          "Skip the numbers and follow tips",
          "Define the decision, risks, and what would change your mind",
          "Maximise leverage",
          "Ignore liquidity"
        ],
        correctIndex: 1,
        explanation: "Process first: decision, risks, falsifiers.",
      },
      {
        id: "m26-q2",
        prompt: "Which formula pair is most relevant when checking short-term survival?",
        choices: [
          "P/E and PEG only",
          "Current ratio and acid-test (quick) ratio",
          "CAGR only",
          "Dividend yield only"
        ],
        correctIndex: 1,
        explanation: "Liquidity ratios stress near-term obligations.",
      },
      {
        id: "m26-q3",
        prompt: "A healthy learner response after being wrong is to:",
        choices: [
          "Delete the journal",
          "Update the thesis and falsifiers",
          "Double the size immediately",
          "Blame the market exclusively"
        ],
        correctIndex: 1,
        explanation: "Learning compounds through revised process.",
      }
    ],
  },
  {
    id: "m27",
    number: 27,
    title: "Liquidity Playbook",
    mapLabel: "Liquidity Desk",
    x: 50,
    y: 50,
    summary: "Plan exits before you need them.",
    concepts: [
      "bid-ask",
      "capacity",
      "stress liquidity"
    ],
    outcome: "Size a position given thin average volume.",
    lesson:
      "Liquidity is the ability to exit near fair value. Stress can erase it — size positions to the worst plausible exit.",
    scenario:
      "Apply Module 27 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m27-q1",
        prompt: "In Module 27 (Liquidity Playbook), the best first step is to:",
        choices: [
          "Skip the numbers and follow tips",
          "Define the decision, risks, and what would change your mind",
          "Maximise leverage",
          "Ignore liquidity"
        ],
        correctIndex: 1,
        explanation: "Process first: decision, risks, falsifiers.",
      },
      {
        id: "m27-q2",
        prompt: "Which formula pair is most relevant when checking short-term survival?",
        choices: [
          "P/E and PEG only",
          "Current ratio and acid-test (quick) ratio",
          "CAGR only",
          "Dividend yield only"
        ],
        correctIndex: 1,
        explanation: "Liquidity ratios stress near-term obligations.",
      },
      {
        id: "m27-q3",
        prompt: "A healthy learner response after being wrong is to:",
        choices: [
          "Delete the journal",
          "Update the thesis and falsifiers",
          "Double the size immediately",
          "Blame the market exclusively"
        ],
        correctIndex: 1,
        explanation: "Learning compounds through revised process.",
      }
    ],
  },
  {
    id: "m28",
    number: 28,
    title: "Scenario Trees",
    mapLabel: "Scenario Tree",
    x: 50,
    y: 50,
    summary: "Build bull/base/bear paths with probabilities.",
    concepts: [
      "scenarios",
      "expected value",
      "tails"
    ],
    outcome: "Write three scenarios for one holding.",
    lesson:
      "E[R] = Σ p_i R_i. Force yourself to price the ugly path, not only the base case.",
    scenario:
      "Apply Module 28 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m28-q1",
        prompt: "In Module 28 (Scenario Trees), the best first step is to:",
        choices: [
          "Skip the numbers and follow tips",
          "Define the decision, risks, and what would change your mind",
          "Maximise leverage",
          "Ignore liquidity"
        ],
        correctIndex: 1,
        explanation: "Process first: decision, risks, falsifiers.",
      },
      {
        id: "m28-q2",
        prompt: "Which formula pair is most relevant when checking short-term survival?",
        choices: [
          "P/E and PEG only",
          "Current ratio and acid-test (quick) ratio",
          "CAGR only",
          "Dividend yield only"
        ],
        correctIndex: 1,
        explanation: "Liquidity ratios stress near-term obligations.",
      },
      {
        id: "m28-q3",
        prompt: "A healthy learner response after being wrong is to:",
        choices: [
          "Delete the journal",
          "Update the thesis and falsifiers",
          "Double the size immediately",
          "Blame the market exclusively"
        ],
        correctIndex: 1,
        explanation: "Learning compounds through revised process.",
      }
    ],
  },
  {
    id: "m29",
    number: 29,
    title: "Hedging Instincts",
    mapLabel: "Hedge Booth",
    x: 50,
    y: 50,
    summary: "Use hedges to reshape risk, not to gamble twice.",
    concepts: [
      "hedge",
      "basis risk",
      "cost of hedge"
    ],
    outcome: "Choose when a hedge is insurance vs speculation.",
    lesson:
      "A hedge reduces an existing exposure. If it adds new directional risk, it is another bet.",
    scenario:
      "Apply Module 29 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m29-q1",
        prompt: "In Module 29 (Hedging Instincts), the best first step is to:",
        choices: [
          "Skip the numbers and follow tips",
          "Define the decision, risks, and what would change your mind",
          "Maximise leverage",
          "Ignore liquidity"
        ],
        correctIndex: 1,
        explanation: "Process first: decision, risks, falsifiers.",
      },
      {
        id: "m29-q2",
        prompt: "Which formula pair is most relevant when checking short-term survival?",
        choices: [
          "P/E and PEG only",
          "Current ratio and acid-test (quick) ratio",
          "CAGR only",
          "Dividend yield only"
        ],
        correctIndex: 1,
        explanation: "Liquidity ratios stress near-term obligations.",
      },
      {
        id: "m29-q3",
        prompt: "A healthy learner response after being wrong is to:",
        choices: [
          "Delete the journal",
          "Update the thesis and falsifiers",
          "Double the size immediately",
          "Blame the market exclusively"
        ],
        correctIndex: 1,
        explanation: "Learning compounds through revised process.",
      }
    ],
  },
  {
    id: "m30",
    number: 30,
    title: "Behavioural Fire Drill",
    mapLabel: "Bias Drill",
    x: 50,
    y: 50,
    summary: "Catch common biases under time pressure.",
    concepts: [
      "loss aversion",
      "anchoring",
      "FOMO"
    ],
    outcome: "Name the bias in a chase-the-rally vignette.",
    lesson:
      "Anchoring on entry price, FOMO after headlines, and loss aversion delaying cuts destroy process.",
    scenario:
      "Apply Module 30 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m30-q1",
        prompt: "In Module 30 (Behavioural Fire Drill), the best first step is to:",
        choices: [
          "Skip the numbers and follow tips",
          "Define the decision, risks, and what would change your mind",
          "Maximise leverage",
          "Ignore liquidity"
        ],
        correctIndex: 1,
        explanation: "Process first: decision, risks, falsifiers.",
      },
      {
        id: "m30-q2",
        prompt: "Which formula pair is most relevant when checking short-term survival?",
        choices: [
          "P/E and PEG only",
          "Current ratio and acid-test (quick) ratio",
          "CAGR only",
          "Dividend yield only"
        ],
        correctIndex: 1,
        explanation: "Liquidity ratios stress near-term obligations.",
      },
      {
        id: "m30-q3",
        prompt: "A healthy learner response after being wrong is to:",
        choices: [
          "Delete the journal",
          "Update the thesis and falsifiers",
          "Double the size immediately",
          "Blame the market exclusively"
        ],
        correctIndex: 1,
        explanation: "Learning compounds through revised process.",
      }
    ],
  },
  {
    id: "m31",
    number: 31,
    title: "Journal Sprint",
    mapLabel: "Journal Sprint",
    x: 50,
    y: 50,
    summary: "Log decisions with falsifiers in under five minutes.",
    concepts: [
      "decision journal",
      "falsifier",
      "review cadence"
    ],
    outcome: "Write a mini journal entry for a trade.",
    lesson:
      "Date, thesis, size, risks, falsifier, review date. Future-you needs the receipt.",
    scenario:
      "Apply Module 31 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m31-q1",
        prompt: "In Module 31 (Journal Sprint), the best first step is to:",
        choices: [
          "Skip the numbers and follow tips",
          "Define the decision, risks, and what would change your mind",
          "Maximise leverage",
          "Ignore liquidity"
        ],
        correctIndex: 1,
        explanation: "Process first: decision, risks, falsifiers.",
      },
      {
        id: "m31-q2",
        prompt: "Which formula pair is most relevant when checking short-term survival?",
        choices: [
          "P/E and PEG only",
          "Current ratio and acid-test (quick) ratio",
          "CAGR only",
          "Dividend yield only"
        ],
        correctIndex: 1,
        explanation: "Liquidity ratios stress near-term obligations.",
      },
      {
        id: "m31-q3",
        prompt: "A healthy learner response after being wrong is to:",
        choices: [
          "Delete the journal",
          "Update the thesis and falsifiers",
          "Double the size immediately",
          "Blame the market exclusively"
        ],
        correctIndex: 1,
        explanation: "Learning compounds through revised process.",
      }
    ],
  },
  {
    id: "m32",
    number: 32,
    title: "Committee Simulation",
    mapLabel: "Committee Hall",
    x: 50,
    y: 50,
    summary: "Defend a recommendation under hostile questions.",
    concepts: [
      "process defence",
      "uncertainty",
      "alternatives"
    ],
    outcome: "Answer a sceptical IC question without bluffing.",
    lesson:
      "Committees reward clarity about what you know, what you don't, and what would change your mind.",
    scenario:
      "Apply Module 32 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m32-q1",
        prompt: "In Module 32 (Committee Simulation), the best first step is to:",
        choices: [
          "Skip the numbers and follow tips",
          "Define the decision, risks, and what would change your mind",
          "Maximise leverage",
          "Ignore liquidity"
        ],
        correctIndex: 1,
        explanation: "Process first: decision, risks, falsifiers.",
      },
      {
        id: "m32-q2",
        prompt: "Which formula pair is most relevant when checking short-term survival?",
        choices: [
          "P/E and PEG only",
          "Current ratio and acid-test (quick) ratio",
          "CAGR only",
          "Dividend yield only"
        ],
        correctIndex: 1,
        explanation: "Liquidity ratios stress near-term obligations.",
      },
      {
        id: "m32-q3",
        prompt: "A healthy learner response after being wrong is to:",
        choices: [
          "Delete the journal",
          "Update the thesis and falsifiers",
          "Double the size immediately",
          "Blame the market exclusively"
        ],
        correctIndex: 1,
        explanation: "Learning compounds through revised process.",
      }
    ],
  },
  {
    id: "m33",
    number: 33,
    title: "Client Letter Craft",
    mapLabel: "Client Letter",
    x: 50,
    y: 50,
    summary: "Explain performance and process in plain language.",
    concepts: [
      "communication",
      "attribution",
      "expectations"
    ],
    outcome: "Draft three sentences on a down month.",
    lesson:
      "Clients need honesty on drivers and adherence to IPS — not jargon theatre.",
    scenario:
      "Apply Module 33 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m33-q1",
        prompt: "In Module 33 (Client Letter Craft), the best first step is to:",
        choices: [
          "Skip the numbers and follow tips",
          "Define the decision, risks, and what would change your mind",
          "Maximise leverage",
          "Ignore liquidity"
        ],
        correctIndex: 1,
        explanation: "Process first: decision, risks, falsifiers.",
      },
      {
        id: "m33-q2",
        prompt: "Which formula pair is most relevant when checking short-term survival?",
        choices: [
          "P/E and PEG only",
          "Current ratio and acid-test (quick) ratio",
          "CAGR only",
          "Dividend yield only"
        ],
        correctIndex: 1,
        explanation: "Liquidity ratios stress near-term obligations.",
      },
      {
        id: "m33-q3",
        prompt: "A healthy learner response after being wrong is to:",
        choices: [
          "Delete the journal",
          "Update the thesis and falsifiers",
          "Double the size immediately",
          "Blame the market exclusively"
        ],
        correctIndex: 1,
        explanation: "Learning compounds through revised process.",
      }
    ],
  },
  {
    id: "m34",
    number: 34,
    title: "Ethics Under Pressure",
    mapLabel: "Ethics Gate",
    x: 50,
    y: 50,
    summary: "Refuse mandate breaches cleanly.",
    concepts: [
      "fiduciary duty",
      "IPS",
      "conflicts"
    ],
    outcome: "Respond to a breach request.",
    lesson:
      "Document, refuse non-compliant orders, offer compliant alternatives. Career > one trade.",
    scenario:
      "Apply Module 34 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m34-q1",
        prompt: "In Module 34 (Ethics Under Pressure), the best first step is to:",
        choices: [
          "Skip the numbers and follow tips",
          "Define the decision, risks, and what would change your mind",
          "Maximise leverage",
          "Ignore liquidity"
        ],
        correctIndex: 1,
        explanation: "Process first: decision, risks, falsifiers.",
      },
      {
        id: "m34-q2",
        prompt: "Which formula pair is most relevant when checking short-term survival?",
        choices: [
          "P/E and PEG only",
          "Current ratio and acid-test (quick) ratio",
          "CAGR only",
          "Dividend yield only"
        ],
        correctIndex: 1,
        explanation: "Liquidity ratios stress near-term obligations.",
      },
      {
        id: "m34-q3",
        prompt: "A healthy learner response after being wrong is to:",
        choices: [
          "Delete the journal",
          "Update the thesis and falsifiers",
          "Double the size immediately",
          "Blame the market exclusively"
        ],
        correctIndex: 1,
        explanation: "Learning compounds through revised process.",
      }
    ],
  },
  {
    id: "m35",
    number: 35,
    title: "Integrated Case Week",
    mapLabel: "Case Week",
    x: 50,
    y: 50,
    summary: "Pull research, valuation, and risk into one case.",
    concepts: [
      "integration",
      "checklist",
      "decision"
    ],
    outcome: "Produce a one-page buy/hold/sell with risks.",
    lesson:
      "Integration is the skill: statements → ratios → valuation → portfolio fit → falsifiers.",
    scenario:
      "Apply Module 35 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m35-q1",
        prompt: "In Module 35 (Integrated Case Week), the best first step is to:",
        choices: [
          "Skip the numbers and follow tips",
          "Define the decision, risks, and what would change your mind",
          "Maximise leverage",
          "Ignore liquidity"
        ],
        correctIndex: 1,
        explanation: "Process first: decision, risks, falsifiers.",
      },
      {
        id: "m35-q2",
        prompt: "Which formula pair is most relevant when checking short-term survival?",
        choices: [
          "P/E and PEG only",
          "Current ratio and acid-test (quick) ratio",
          "CAGR only",
          "Dividend yield only"
        ],
        correctIndex: 1,
        explanation: "Liquidity ratios stress near-term obligations.",
      },
      {
        id: "m35-q3",
        prompt: "A healthy learner response after being wrong is to:",
        choices: [
          "Delete the journal",
          "Update the thesis and falsifiers",
          "Double the size immediately",
          "Blame the market exclusively"
        ],
        correctIndex: 1,
        explanation: "Learning compounds through revised process.",
      }
    ],
  },
  {
    id: "m36",
    number: 36,
    title: "Capstone Defence Prep",
    mapLabel: "Defence Prep",
    x: 50,
    y: 50,
    summary: "Prepare the final mandate defence packet.",
    concepts: [
      "IPS",
      "risk limits",
      "crisis plan"
    ],
    outcome: "List the artefacts required for mandate defence.",
    lesson:
      "IPS, holdings with weights, risk dashboard, crisis playbook, and decision journal excerpts.",
    scenario:
      "Apply Module 36 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m36-q1",
        prompt: "In Module 36 (Capstone Defence Prep), the best first step is to:",
        choices: [
          "Skip the numbers and follow tips",
          "Define the decision, risks, and what would change your mind",
          "Maximise leverage",
          "Ignore liquidity"
        ],
        correctIndex: 1,
        explanation: "Process first: decision, risks, falsifiers.",
      },
      {
        id: "m36-q2",
        prompt: "Which formula pair is most relevant when checking short-term survival?",
        choices: [
          "P/E and PEG only",
          "Current ratio and acid-test (quick) ratio",
          "CAGR only",
          "Dividend yield only"
        ],
        correctIndex: 1,
        explanation: "Liquidity ratios stress near-term obligations.",
      },
      {
        id: "m36-q3",
        prompt: "A healthy learner response after being wrong is to:",
        choices: [
          "Delete the journal",
          "Update the thesis and falsifiers",
          "Double the size immediately",
          "Blame the market exclusively"
        ],
        correctIndex: 1,
        explanation: "Learning compounds through revised process.",
      }
    ],
  }
];
