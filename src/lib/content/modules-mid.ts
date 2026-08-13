import type { ModuleQuest } from "@/lib/types";

/** Brick Exchange portals 10–18 (kept from prior syllabus core). */
export const MODULES_MID: ModuleQuest[] = [
  {
    id: "m10",
    number: 10,
    title: "Portfolio Construction",
    mapLabel: "Portfolio Plaza",
    x: 58,
    y: 28,
    summary:
      "Understand business models, revenue drivers, customers, competitors, market share and competitive advantage before deeper analysis.",
    concepts: [
      "company as an economic system",
      "revenue = price × quantity",
      "revenue growth",
      "market share",
      "competitive advantage",
      "company comparison scorecard",
    ],
    outcome:
      "Compare companies on the Blue City scorecard and select one for deeper analysis before deploying the $14,800 book.",
    lesson:
      "Blue City Portal 10 starts with the business, not the stock price. A company is an economic system: it sells something, incurs costs, invests capital, competes for customers and tries to keep enough value for owners. Identify what is sold, who pays, how often, what drives volume and price, and the main costs — financial statements are outputs of that system. Then quantify the engine. Revenue = Price × Quantity (same unit for price and quantity). A company selling 240,000 units at an $18 average selling price generates $4,320,000 of sales — scale, not profit. Revenue growth = (Revenue₁ − Revenue₀) / Revenue₀ × 100%; $48m to $54m is 12.5%, and growth still must be read against margins, cash flow and the price paid. Market share = Company sales / Total market sales × 100%; $900m in a $6bn market is 15%. A firm can grow while losing share if the market grows faster. Share is position, not profitability. Competitive advantage is evidence that customers, margins or returns can be defended (cost, switching costs, network effects, brand/pricing power, IP, distribution/data) — not merely a popular brand. Use the comparison scorecard (growth, gross margin, customer concentration, share trend, advantage evidence, capital needs, key risk) before picking a name for deeper work.",
    scenario:
      "Two Brick Exchange names are on the watchlist for your $14,800 Portfolio Lab. Before statements and valuation, map each economic system, compute revenue, growth and share from the notes examples, and ask whether any advantage looks durable. Which company deserves deeper analysis — and why is a calculated number not yet a buy?",
    questions: [
      {
        id: "m10-q1",
        prompt:
          "Before ratios and valuation, Blue City treats a company first as an economic system. What should you identify?",
        choices: [
          "What is sold, who pays, how often, what drives volume and price, and the main costs",
          "Only the last closing price and ticker symbol",
          "Only the number of shares outstanding",
          "Only whether the brand is popular",
        ],
        correctIndex: 0,
        explanation:
          "Financial statements are outputs of the operating system. Start with the business model — product or service, customer, frequency, volume and price drivers, and costs — not the stock quote.",
      },
      {
        id: "m10-q2",
        prompt:
          "A company sells 240,000 units at an average selling price of $18. Revenue = Price × Quantity. What is revenue, and what does that number prove?",
        choices: [
          "$4,320,000 of sales — the scale of sales, not profitability",
          "$18,000 of sales — and that the company is cheap",
          "$4,320,000 of net income — so owners are already rewarded",
          "$240,000 of sales — because quantity is the only driver",
        ],
        correctIndex: 0,
        explanation:
          "Revenue = $18 × 240,000 = $4,320,000. Price and quantity must use the same unit. The notes interpret this as sales scale; it does not show profit, cash or a purchase price.",
      },
      {
        id: "m10-q3",
        prompt:
          "Revenue rises from $48 million to $54 million. Growth = (Revenue₁ − Revenue₀) / Revenue₀ × 100%. What is the growth rate, and why is old revenue the denominator?",
        choices: [
          "12.5% — growth is measured relative to the starting base, in comparable periods",
          "12.5% — because $6m divided by new revenue $54m is the standard",
          "6% — the dollar change without dividing by the base",
          "11.1% — ($54m − $48m) / $54m",
        ],
        correctIndex: 0,
        explanation:
          "Change = $6m; $6m / $48m × 100% = 12.5%. The earlier-period revenue is the base. Growth still must be compared with margins, cash flow and the price paid for the stock.",
      },
      {
        id: "m10-q4",
        prompt:
          "A firm has $900 million of sales in a $6 billion market. Which reading matches the notes?",
        choices: [
          "15% market share — position in the defined market, not profitability; the firm can grow sales and still lose share if the market grows faster",
          "15% net margin — so the economics are already proven durable",
          "6.7% share — $6bn / $900m, and share equals a buy signal",
          "90% share — $900m is almost the whole market",
        ],
        correctIndex: 0,
        explanation:
          "Market share = $0.9bn / $6.0bn × 100% = 15%. Numerator and denominator must match units, geography, product and period. Share describes position; competitive advantage asks whether that position can persist.",
      },
      {
        id: "m10-q5",
        prompt:
          "Your $14,800 Portfolio Lab application for Portal 10 is to compare companies before selecting one for deeper analysis. What is the disciplined next step?",
        choices: [
          "Score both names on growth, share trend, advantage evidence, capital needs and key risk — then choose one for deeper work; a calculated number is not yet an investment decision",
          "Buy the cheaper ticker immediately with the full $14,800",
          "Skip the business model and jump to a price target",
          "Treat a popular brand as proof of durable advantage and deploy now",
        ],
        correctIndex: 0,
        explanation:
          "The notes’ scorecard compares growth, margins, concentration, share trend, advantage evidence, reinvestment need and key risk. Blue City’s rule: interpret every answer economically — a calculated number is not yet an investment decision.",
      },
    ],
  },
  {
    id: "m11",
    number: 11,
    title: "Macroeconomics for Investors",
    mapLabel: "Macro Desk",
    x: 44,
    y: 22,
    summary: "Inflation, rates, and growth reshape holdings.",
    concepts: ["GDP", "inflation", "rates", "yield curve", "FX"],
    outcome: "Link macro shocks to assets you already hold.",
    lesson:
      "Growth, inflation, and policy set the weather for assets. Rising rates pressure long-duration valuations; inflation hurts cash and some bonds; FX moves hit foreign earnings and forex trades.",
    scenario: "Inflation rises, rates jump, growth slows. Re-underwrite your book.",
    questions: [
      {
        id: "m11-q1",
        prompt: "All else equal, higher discount rates tend to hurt most:",
        choices: [
          "Short-duration cash-like assets the most",
          "Long-duration growth equities the most",
          "Only gold forever",
          "Nothing",
        ],
        correctIndex: 1,
        explanation: "Distant cash flows are more sensitive to rate changes.",
        chartHint: "stock",
      },
      {
        id: "m11-q2",
        prompt: "A strengthening domestic currency can:",
        choices: [
          "Boost translated foreign earnings for domestic multinationals",
          "Pressure translated foreign earnings for domestic multinationals",
          "Delete FX risk entirely",
          "Set stock splits",
        ],
        correctIndex: 1,
        explanation: "Stronger home currency reduces foreign earnings when translated home.",
        chartHint: "forex",
      },
      {
        id: "m11-q3",
        prompt: "Stagflation-like conditions (high inflation, weak growth) often challenge:",
        choices: [
          "Only crypto",
          "Both traditional bonds and cyclical equities in different ways",
          "Only cash",
          "Nothing ever",
        ],
        correctIndex: 1,
        explanation: "Inflation hurts bonds; weak growth hurts cyclicals — a hard mix.",
        newsHint: true,
      },
    ],
  },
  {
    id: "m12",
    number: 12,
    title: "Earnings & Market News",
    mapLabel: "News Wire",
    x: 30,
    y: 30,
    summary: "Price moves vs expectations — not headlines alone.",
    concepts: ["earnings", "guidance", "surprises", "material news"],
    outcome: "Explain why good growth can still reprice a stock lower.",
    lesson:
      "Markets price expectations. Beating weak expectations can rally a name; beating lofty expectations by less than hoped can drop it. Guidance and quality of growth matter.",
    scenario:
      "A company grows strongly yet the shares fall. Investigate expectations before changing thesis.",
    questions: [
      {
        id: "m12-q1",
        prompt: "An earnings beat with a falling stock often means:",
        choices: [
          "Accounting is illegal always",
          "Results failed a higher bar priced into the shares (or guidance disappointed)",
          "Markets never look forward",
          "Volume was zero",
        ],
        correctIndex: 1,
        explanation: "Expectation gaps dominate short-term earnings reactions.",
        newsHint: true,
        chartHint: "stock",
      },
      {
        id: "m12-q2",
        prompt: "Material news is information that:",
        choices: [
          "Is only gossip",
          "Could reasonably influence an investor's decisions",
          "Never affects price",
          "Only appears on weekends",
        ],
        correctIndex: 1,
        explanation: "Materiality is about decision-relevance.",
      },
      {
        id: "m12-q3",
        prompt: "Before rewriting a thesis on one print, check:",
        choices: [
          "Only the emoji reactions",
          "Whether the long-term drivers actually changed",
          "Only the opening second",
          "Nothing",
        ],
        correctIndex: 1,
        explanation: "Separate noise from thesis-breaking facts.",
      },
    ],
  },
  {
    id: "m13",
    number: 13,
    title: "Market Crashes",
    mapLabel: "Crash Corridor",
    x: 20,
    y: 40,
    summary: "Liquidity, contagion, and disciplined responses.",
    concepts: ["drawdowns", "liquidity", "panic", "defensive assets"],
    outcome: "Log decisions that separate risk management from panic.",
    lesson:
      "Crashes compress liquidity and correlations. Panic selling crystallizes losses; disciplined rebalancing or thesis checks can be appropriate — if sizing and horizon allow.",
    scenario: "Weekly losses escalate. Manage exposure without abandoning process.",
    questions: [
      {
        id: "m13-q1",
        prompt: "In crashes, correlations across risk assets often:",
        choices: [
          "Fall to zero",
          "Rise as many assets sell off together",
          "Become exactly −1 always",
          "Stop existing",
        ],
        correctIndex: 1,
        explanation: "Diversification can fail temporarily when everyone needs cash.",
        chartHint: "stock",
      },
      {
        id: "m13-q2",
        prompt: "Liquidity risk is the danger that:",
        choices: [
          "You cannot exit without large price impact when you need to",
          "Dividends are too high",
          "ETFs never trade",
          "Cash earns interest",
        ],
        correctIndex: 0,
        explanation: "Stressed markets widen spreads and deepen impact costs.",
      },
      {
        id: "m13-q3",
        prompt: "A pre-committed risk rule helps because:",
        choices: [
          "It removes all uncertainty",
          "It reduces improvisation under fear",
          "It guarantees market timing",
          "It bans all equities",
        ],
        correctIndex: 1,
        explanation: "Rules beat adrenaline when drawdowns hit.",
      },
    ],
  },
  {
    id: "m14",
    number: 14,
    title: "Historical Crisis Simulator",
    mapLabel: "Crisis Archive",
    x: 12,
    y: 24,
    summary: "Act first — learn the analogue after.",
    concepts: ["1987", "dot-com", "2008", "COVID shock", "2022 rates"],
    outcome: "Compare your live decisions to historical analogues.",
    lesson:
      "Regimes rhyme: leverage unwind, valuation resets, policy shocks, and liquidity freezes. Studying analogues builds pattern recognition without assuming perfect repetition.",
    scenario: "Enter a hidden historical-style tape; decide; then reveal the analogue.",
    questions: [
      {
        id: "m14-q1",
        prompt: "The 2008 crisis centered heavily on:",
        choices: [
          "Only a single tech IPO",
          "Leverage and fragile funding against housing/credit assets",
          "A gold standard return",
          "FX pip spreads alone",
        ],
        correctIndex: 1,
        explanation: "Funding and credit fragility amplified the housing shock.",
      },
      {
        id: "m14-q2",
        prompt: "2022 challenged long-duration assets mainly via:",
        choices: [
          "Rate and inflation shocks repricing distant cash flows",
          "The end of all stocks forever",
          "Zero volatility",
          "Mandatory gold ownership",
        ],
        correctIndex: 0,
        explanation: "Higher rates compressed valuations for long-duration claims.",
        newsHint: true,
      },
      {
        id: "m14-q3",
        prompt: "Using history well means:",
        choices: [
          "Copy-pasting the last war blindly",
          "Extracting mechanisms while respecting differences today",
          "Ignoring primary sources",
          "Only trading memes",
        ],
        correctIndex: 1,
        explanation: "Mechanisms transfer better than exact path copies.",
      },
    ],
  },
  {
    id: "m15",
    number: 15,
    title: "Advanced Risk Management",
    mapLabel: "Risk Bastion",
    x: 26,
    y: 14,
    summary: "Returns are not enough — control downside.",
    concepts: ["beta", "Sharpe", "drawdown", "VaR", "stress tests"],
    outcome: "Manage the book inside explicit risk limits.",
    lesson:
      "Risk metrics quantify path pain and efficiency. Max drawdown, volatility, beta, and stress scenarios constrain how you pursue return. Alpha is excess return after risk/factor exposure.",
    scenario: "Hit risk limits even if recent returns look fine.",
    questions: [
      {
        id: "m15-q1",
        prompt: "Maximum drawdown measures:",
        choices: [
          "Average dividend",
          "Peak-to-trough decline over a period",
          "Only one-day moves",
          "Bid-ask spread",
        ],
        correctIndex: 1,
        explanation: "It captures the worst peak-to-trough loss path.",
      },
      {
        id: "m15-q2",
        prompt: "A high Sharpe ratio suggests:",
        choices: [
          "Return per unit of volatility looked attractive historically",
          "No future risk exists",
          "Leverage is infinite",
          "Beta is zero always",
        ],
        correctIndex: 0,
        explanation: "Sharpe is a historical efficiency snapshot, not a guarantee.",
      },
      {
        id: "m15-q3",
        prompt: "Stress testing is valuable because:",
        choices: [
          "It predicts exact future prices",
          "It reveals how the portfolio might behave in adverse scenarios",
          "It replaces diversification",
          "It is only for banks",
        ],
        correctIndex: 1,
        explanation: "Scenarios expose hidden concentrations before reality does.",
      },
    ],
  },
  {
    id: "m16",
    number: 16,
    title: "Building an Investment Thesis",
    mapLabel: "Thesis Forge",
    x: 42,
    y: 10,
    summary: "Write what you own, why, risks, and kill criteria.",
    concepts: ["mispricing", "catalysts", "sell discipline", "falsification"],
    outcome: "Defend formal theses for selected holdings.",
    lesson:
      "A thesis states the bet, the market's potential miss, catalysts, risks, and what would prove you wrong. Without falsifiers, you cannot sell with discipline.",
    scenario: "Draft theses for your top holdings with explicit kill switches.",
    questions: [
      {
        id: "m16-q1",
        prompt: "A falsification criterion is:",
        choices: [
          "A reason to never sell",
          "A pre-defined signal that the thesis is broken",
          "A tax form",
          "A candlestick color",
        ],
        correctIndex: 1,
        explanation: "It is your pre-committed 'wrong' detector.",
      },
      {
        id: "m16-q2",
        prompt: "Catalysts matter because:",
        choices: [
          "They may close the gap between price and value",
          "They guarantee timing",
          "They replace valuation",
          "They eliminate risk",
        ],
        correctIndex: 0,
        explanation: "Value can stay unrecognized without a path to recognition.",
      },
      {
        id: "m16-q3",
        prompt: "Sell discipline fails most often when:",
        choices: [
          "Rules were never defined and hope takes over",
          "You rebalance on schedule",
          "You size positions modestly",
          "You keep a journal",
        ],
        correctIndex: 0,
        explanation: "Hope is not a risk process.",
      },
    ],
  },
  {
    id: "m17",
    number: 17,
    title: "Journal & Bias Detection",
    mapLabel: "Bias Mirror",
    x: 58,
    y: 12,
    summary: "Your history becomes the curriculum.",
    concepts: ["confirmation bias", "disposition effect", "overconfidence"],
    outcome: "Correct recurring behavioural patterns with targeted scenarios.",
    lesson:
      "Journals expose patterns: selling winners too early, clinging to losers, seeking confirming news, overtrading after wins. Adaptation means changing behaviour, not just reading about biases.",
    scenario: "Review your Portfolio Lab history; face a personalised corrective scenario.",
    questions: [
      {
        id: "m17-q1",
        prompt: "The disposition effect is the tendency to:",
        choices: [
          "Sell winners too early and hold losers too long",
          "Only buy bonds",
          "Never trade",
          "Ignore taxes only",
        ],
        correctIndex: 0,
        explanation: "It is a classic behavioural leak around realizing gains/losses.",
      },
      {
        id: "m17-q2",
        prompt: "Confirmation bias shows up when you:",
        choices: [
          "Seek only evidence that supports your existing view",
          "Actively seek disconfirming data",
          "Use checklists",
          "Size small",
        ],
        correctIndex: 0,
        explanation: "You filter the world to protect the thesis.",
      },
      {
        id: "m17-q3",
        prompt: "A useful journal entry includes:",
        choices: [
          "Only the P&L number",
          "Thesis, evidence, emotions, and what would change your mind",
          "Only screenshots of green candles",
          "Nothing dated",
        ],
        correctIndex: 1,
        explanation: "Process detail enables later bias detection.",
      },
    ],
  },
  {
    id: "m18",
    number: 18,
    title: "Capstone: The Fund Mandate",
    mapLabel: "Fund Mandate",
    x: 78,
    y: 16,
    summary: "Graduate from $14,800 to a $10M professional mandate.",
    concepts: ["IPS", "constraints", "committee", "multi-year simulation"],
    outcome: "Integrate judgement, risk, and behaviour under mandate pressure.",
    lesson:
      "Module 18 expands the Portfolio Lab into a professional mandate: $10M AUM, 5-year horizon, 7–10% target return, 20% max drawdown, liquidity and concentration constraints. Write an IPS, face client pressure, survive a crisis exam, and defend process before committee.",
    scenario:
      "Present your $14,800 history, accept the mandate, build the fund, and endure multi-year shocks without abandoning process.",
    questions: [
      {
        id: "m18-q1",
        prompt: "An Investment Policy Statement (IPS) should define:",
        choices: [
          "Only a lucky ticker",
          "Objectives, constraints, risk limits, and governance rules before deploying capital",
          "Intraday scalps only",
          "A promise of no drawdowns",
        ],
        correctIndex: 1,
        explanation: "IPS is the constitution of the mandate.",
      },
      {
        id: "m18-q2",
        prompt: "A client demanding you chase a fashionable asset is a test of:",
        choices: [
          "Whether you abandon process for politics",
          "Your ability to ignore fiduciary duty",
          "Candlestick colors",
          "Tax lot software only",
        ],
        correctIndex: 0,
        explanation: "Stakeholder pressure is part of professional investing.",
      },
      {
        id: "m18-q3",
        prompt: "In the assessment framework, raw return weight is relatively:",
        choices: [
          "Dominant over all process scores",
          "Small versus reasoning, risk, research, and behaviour",
          "The only score that matters",
          "Ignored entirely",
        ],
        correctIndex: 1,
        explanation: "Syllabus weights return at 5% — process dominates mastery.",
      },
    ],
  }
];
