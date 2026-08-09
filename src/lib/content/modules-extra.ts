import type { ModuleQuest } from "@/lib/types";

/** Modules 19–36 — Signal Quay + Mandate Highlands. */
export const MODULES_EXTRA: ModuleQuest[] = [
  {
    id: "m19",
    number: 19,
    title: "Multi-Asset Mix Lab",
    mapLabel: "Asset Mix Lab",
    x: 50,
    y: 50,
    summary: "Build a simple multi-asset mix with explicit roles for each sleeve.",
    concepts: [
      "asset roles",
      "correlation",
      "rebalancing bands"
    ],
    outcome: "Assign a role to each asset class in a starter mix.",
    lesson:
      "Cash is dry powder, bonds dampen equity shocks, equities drive growth, alternatives may diversify — only if understood. Write role + risk budget per sleeve.",
    scenario:
      "Apply Module 19 concepts inside Portfolio Lab with explicit size, risk, and a falsifier.",
    questions: [
      {
        id: "m19-q1",
        prompt: "In Module 19 (Multi-Asset Mix Lab), the best first step is to:",
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
        id: "m19-q2",
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
        id: "m19-q3",
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
