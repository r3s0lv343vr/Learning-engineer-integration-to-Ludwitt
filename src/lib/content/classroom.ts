import { MAP_AREAS, type AreaId } from "@/lib/content/areas";
import { getLibrary } from "@/lib/content/libraries";

export type ClassroomSlide = {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  bullets: string[];
  footer?: string;
  accent: string;
  /** Short label for thumbnail strip */
  thumbLabel: string;
};

export type ClassroomLesson = {
  id: string;
  areaId: AreaId;
  /** City accent — the only visual difference between rooms */
  themeColor: string;
  themeColorDeep: string;
  subject: string;
  topic: string;
  title: string;
  classId: string;
  moduleStart: number;
  moduleEnd: number;
  outline: { id: string; label: string; slideIndex: number }[];
  slides: ClassroomSlide[];
  notesHref: string;
  notesDownloadName: string;
  deckHref: string;
  deckDownloadName: string;
  linkedSites: { id: string; title: string; url: string; platform: string }[];
  quote: { text: string; author: string };
};

const THEME: Record<AreaId, { color: string; deep: string }> = {
  "coral-ledger-bay": { color: "#7c4dff", deep: "#5b35c7" },
  "brick-exchange": { color: "#2196f3", deep: "#1565c0" },
  "signal-quay": { color: "#43a047", deep: "#2e7d32" },
  "mandate-highlands": { color: "#c6922e", deep: "#8a6a1a" },
};

/** Purple City Investment Foundations teaching deck — Coral Ledger Bay classroom. */
export const PURPLE_CITY_CLASSROOM: ClassroomLesson = {
  id: "purple-city-foundations",
  areaId: "coral-ledger-bay",
  themeColor: THEME["coral-ledger-bay"].color,
  themeColorDeep: THEME["coral-ledger-bay"].deep,
  subject: "Investing",
  topic: "Purple City Foundations",
  title: "Lesson: Purple City Investment Foundations",
  classId: "bay-class-3",
  moduleStart: 1,
  moduleEnd: 9,
  outline: [],
  slides: [
    {
      id: "s1",
      number: 1,
      title: "Purple City Investment Foundations",
      subtitle: "A visual teaching deck for Portals 1–9",
      bullets: [
        "AI Investment Simulator teaching deck for Coral Ledger Bay.",
        "Starting capital in the simulator: $14,800 virtual cash.",
        "Learning mode: teach on the board, then prove it in the portals.",
      ],
      footer: "Coral Ledger Bay · Purple City Investment Foundations Teaching Deck",
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Title",
    },
    {
      id: "s2",
      number: 2,
      title: "Your Purple City journey",
      subtitle: "Nine portals. One evolving portfolio.",
      bullets: [
        "Nine portals. One evolving portfolio. Each portal adds a skill.",
        "Complete each portal challenge to unlock the next stage.",
        "Your coin advances as Purple City foundations get stronger.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Journey",
    },
    {
      id: "s3",
      number: 3,
      title: "Portal 1 · Enter the Market",
      subtitle: "Saving, investing, trading, risk, return, compounding & real returns",
      bullets: [
        "Understand saving, investing, trading, risk, return, compounding, inflation and real returns.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "P1 Intro",
    },
    {
      id: "s4",
      number: 4,
      title: "Saving, investing and trading",
      subtitle: "They all use money differently — and solve different problems.",
      bullets: [
        "Saving, investing, and trading all use money differently.",
        "Saving: preserve capital and keep it accessible (short horizon).",
        "Investing: grow money over years while accepting ups and downs.",
        "Trading: try to profit from shorter-term price moves.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Saving",
    },
    {
      id: "s5",
      number: 5,
      title: "Risk and return: the central trade-off",
      subtitle: "Higher expected return normally requires accepting more uncertainty.",
      bullets: [
        "Higher expected return normally requires accepting more uncertainty.",
        "Cash sits lower on the risk/return spectrum.",
        "Stocks sit higher — more uncertainty, more growth potential.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Risk/Return",
    },
    {
      id: "s6",
      number: 6,
      title: "Present value and future value",
      subtitle: "Money has a time dimension: today's dollars can earn returns.",
      bullets: [
        "Future value: FV = PV(1 + r)ⁿ",
        "Present value: PV = FV / (1 + r)ⁿ",
        "Today's dollars can earn returns — money has a time dimension.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "PV / FV",
    },
    {
      id: "s7",
      number: 7,
      title: "Compounding: returns begin earning returns",
      subtitle: "Example: $2,000 invested at 8% annually for three years.",
      bullets: [
        "Example: $2,000 invested at 8% annually for three years.",
        "Year 1 → $2,160. Year 2 compounds on that new balance.",
        "Returns begin earning returns — that is compounding.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Compound",
    },
    {
      id: "s8",
      number: 8,
      title: "Worked PV/FV examples",
      subtitle: "Use the same formulas in different directions.",
      bullets: [
        "One year: $1,000 at 5% → FV = $1,050.",
        "Use the same formulas forward (FV) or backward (PV).",
        "Practice both directions until the relationship feels natural.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "PV examples",
    },
    {
      id: "s9",
      number: 9,
      title: "Nominal return vs real return",
      subtitle: "A bigger account balance does not always mean greater purchasing power.",
      bullets: [
        "Nominal return is the gain measured in current money — before inflation.",
        "Real return adjusts for inflation — the change in purchasing power.",
        "A bigger account balance does not always mean greater purchasing power.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Real return",
    },
    {
      id: "s10",
      number: 10,
      title: "Five real-return examples",
      subtitle: "Inflation can change the meaning of an investment gain.",
      bullets: [
        "Nominal 8% with 3% inflation ≈ 4.85% real.",
        "Nominal 4% with 6% inflation ≈ −1.89% real.",
        "Inflation can change the meaning of an investment gain.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "5 examples",
    },
    {
      id: "s11",
      number: 11,
      title: "Portal 2 · Know Your Investor",
      subtitle: "Risk tolerance, risk capacity, horizon, liquidity and return objectives",
      bullets: [
        "Learning objective: understand risk tolerance, risk capacity, investment horizon, liquidity needs and return objectives.",
        "Portfolio Lab mission: create a personal investment mandate for the $14,800.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "P2 Intro",
    },
    {
      id: "s12",
      number: 12,
      title: "Risk tolerance is not risk capacity",
      subtitle: "One is psychological. The other is financial.",
      bullets: [
        "Risk tolerance: how much uncertainty and loss can you emotionally accept?",
        "Risk capacity: how much loss can you afford without jeopardizing essential goals?",
        "You can have high tolerance but low capacity — or the reverse.",
        "Example: could you watch a 10–20% decline without abandoning the plan?",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Tolerance",
    },
    {
      id: "s13",
      number: 13,
      title: "Time horizon and liquidity",
      subtitle: "When you need the money changes how aggressively you can invest.",
      bullets: [
        "A longer horizon can give more time to recover from temporary declines.",
        "A short horizon usually increases the need for stability and liquidity.",
        "Liquidity is converting an asset to usable cash quickly without a large discount.",
        "Ask: what portion of the $14,800 may be needed soon?",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Horizon",
    },
    {
      id: "s14",
      number: 14,
      title: "Return objectives need constraints",
      subtitle: "“I want 20%” is not a complete objective.",
      bullets: [
        "Connect return targets to a purpose, horizon and acceptable risk.",
        "A better mandate states the goal, time horizon, risk limits and liquidity needs.",
        "Which matters more: avoiding large losses or maximizing growth?",
        "Unrealistic targets push investors into risks they cannot hold.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Objectives",
    },
    {
      id: "s15",
      number: 15,
      title: "Investment mandate template",
      subtitle: "Turn preferences into rules before you allocate the $14,800.",
      bullets: [
        "Fill in: Objective · Horizon · Risk tolerance · Risk capacity.",
        "Set a minimum cash reserve and permitted asset classes.",
        "Cap maximum single-position weight and choose a review frequency.",
        "The mandate keeps later portfolio choices consistent.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Mandate",
    },
    {
      id: "s16",
      number: 16,
      title: "Mandate checkpoint questions",
      subtitle: "Pressure-test the rules before capital moves.",
      bullets: [
        "Would a 10% decline cause you to sell immediately — and why?",
        "What portion of the $14,800 may be needed soon?",
        "What is the maximum amount you would allow in one investment?",
        "Write the answers into the mandate before Portal 3.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Checkpoints",
    },
    {
      id: "s17",
      number: 17,
      title: "Portfolio Lab · Portal 2",
      subtitle: "Create a personal investment mandate",
      bullets: [
        "Draft a one-page mandate for Coral Ledger Bay’s $14,800.",
        "State acceptable risks, cash needs and a realistic return target.",
        "Open map portal M2 to prove the ideas with five challenges.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "P2 Lab",
    },
    {
      id: "s18",
      number: 18,
      title: "Portal 3 · Understanding Asset Classes",
      subtitle: "Stocks, bonds, ETFs, real estate, businesses, forex, commodities and cash",
      bullets: [
        "Learning objective: recognize major asset classes and what moves them.",
        "Portfolio Lab mission: build an initial asset-class watchlist aligned to your mandate.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "P3 Intro",
    },
    {
      id: "s19",
      number: 19,
      title: "What an asset class is",
      subtitle: "Investments that share important economic characteristics.",
      bullets: [
        "Different assets respond differently to growth, inflation, rates and sentiment.",
        "Understanding those differences is the foundation of diversification.",
        "Your watchlist should span risks — not one all-in bet.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Asset class",
    },
    {
      id: "s20",
      number: 20,
      title: "Stocks: ownership in companies",
      subtitle: "Prices respond to expected profits, growth, rates and expectations.",
      bullets: [
        "A share is an ownership claim on residual business value.",
        "Potential return: earnings growth, dividends and valuation change.",
        "Key risks: business risk, market risk and paying too high a price.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Stocks",
    },
    {
      id: "s21",
      number: 21,
      title: "Bonds: loans that pay interest",
      subtitle: "When market rates rise, existing fixed-rate bond prices generally fall.",
      bullets: [
        "Bonds are debt claims on governments or companies.",
        "Return source: interest and principal repayment.",
        "Watch interest rates, inflation expectations, credit quality and maturity.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Bonds",
    },
    {
      id: "s22",
      number: 22,
      title: "ETFs: one trade, many holdings",
      subtitle: "A pooled vehicle whose shares trade on an exchange.",
      bullets: [
        "An ETF may hold stocks, bonds, commodities or other assets — often tracking an index.",
        "Examine holdings, objective, fees/expense ratio, liquidity and concentration.",
        "Useful building block — risk remains inside the basket.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "ETFs",
    },
    {
      id: "s23",
      number: 23,
      title: "Real estate and private businesses",
      subtitle: "Income and appreciation — with liquidity trade-offs.",
      bullets: [
        "Real estate can generate rent and price appreciation; direct property is relatively illiquid.",
        "REITs provide exchange-traded property exposure.",
        "Private businesses may be hard to value or sell — concentrate risk carefully.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Property",
    },
    {
      id: "s24",
      number: 24,
      title: "Cash, commodities and forex",
      subtitle: "Liquidity, real goods and currency pairs each play a role.",
      bullets: [
        "Cash: liquidity and stability, with inflation and opportunity cost.",
        "Commodities: oil, gold, agriculture — driven by supply, demand and geopolitics.",
        "Forex: currencies trade in pairs; rates, inflation and policy all matter.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Other assets",
    },
    {
      id: "s25",
      number: 25,
      title: "Watchlist exercise",
      subtitle: "Choose examples from several asset classes — observe before you buy.",
      bullets: [
        "Pick at least one idea from six asset classes that fit your mandate.",
        "For each: what it is, why it might belong, main risk, and what would move its value.",
        "Mark each as invest / observe only — then open map portal M3.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Watchlist",
    },
    {
      id: "s26",
      number: 26,
      title: "Portal 4 · How Markets Work",
      subtitle: "Exchanges, brokers, bid/ask, liquidity, orders and costs",
      bullets: [
        "Learning objective: understand market infrastructure, liquidity, order types and transaction costs.",
        "Portfolio Lab mission: execute the first simulated transaction with cost awareness.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "P4 Intro",
    },
    {
      id: "s27",
      number: 27,
      title: "From decision to executed trade",
      subtitle: "Investor → broker → venue → match",
      bullets: [
        "An exchange is a venue where eligible securities are bought and sold.",
        "A broker provides access and routes the order.",
        "Markets match buying interest with selling interest.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Trade path",
    },
    {
      id: "s28",
      number: 28,
      title: "Bid, ask and the spread",
      subtitle: "The spread is one form of trading friction.",
      bullets: [
        "Bid: highest price a buyer is currently willing to pay.",
        "Ask: lowest price a seller will currently accept.",
        "If bid is $49.95 and ask is $50.05, the spread is $0.10.",
        "You typically buy near the ask and sell near the bid.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Bid/Ask",
    },
    {
      id: "s29",
      number: 29,
      title: "What creates liquidity?",
      subtitle: "Trade quickly without a large price concession.",
      bullets: [
        "Supported by many willing buyers/sellers, frequent trading and depth near the price.",
        "Signs: narrow spreads, meaningful volume, limited price impact.",
        "Liquidity can disappear when uncertainty rises or trading becomes one-sided.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Liquidity",
    },
    {
      id: "s30",
      number: 30,
      title: "Market order vs limit order",
      subtitle: "Execution certainty and price control pull in different directions.",
      bullets: [
        "Market order: prioritizes execution at available prices — fill risk is low, price risk is higher.",
        "Limit order: sets your worst acceptable price — price control with possible no-fill.",
        "Example: ask $50.10 — a market buy may fill near $50.10; a $49.50 buy limit waits.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Orders",
    },
    {
      id: "s31",
      number: 31,
      title: "Transaction costs add up",
      subtitle: "Explicit fees plus spreads, slippage and market impact.",
      bullets: [
        "Spread example: buy 100 at $20.10 ask, sell at $20.00 bid → $10 friction.",
        "Commissions (e.g. $5 buy + $5 sell) are explicit costs.",
        "Slippage: actual fill differs from the price you expected.",
        "Frequent activity can erode returns even when each trade looks small.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Costs",
    },
    {
      id: "s32",
      number: 32,
      title: "First trade checklist",
      subtitle: "Answer these before you click in the simulator.",
      bullets: [
        "What am I buying? Why now? How much of the $14,800?",
        "What order type is appropriate? What is the estimated cost?",
        "What would make me exit? What portfolio weight will this become?",
        "Then open map portal M4 and execute the first simulated transaction.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Checklist",
    },
    {
      id: "s33",
      number: 33,
      title: "Portal 5 · Reading the Market",
      subtitle: "Charts, market cap, indices, volume, volatility and sentiment",
      bullets: [
        "Learning objective: interpret market information without confusing price with value.",
        "Portfolio Lab mission: interpret basic market information before deciding.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "P5 Intro",
    },
    {
      id: "s34",
      number: 34,
      title: "Read the chart before explaining the chart",
      subtitle: "First describe what happened. Then investigate why.",
      bullets: [
        "1. Direction: up, down, or sideways?",
        "2. Range: high and low?",
        "3. Pullbacks: where did price retreat?",
        "4. Variability: smooth or unstable?",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Charts",
    },
    {
      id: "s35",
      number: 35,
      title: "Charts summarize history — not fundamental value",
      subtitle: "Patterns are evidence about behavior, not guarantees.",
      bullets: [
        "Line charts often connect closing prices.",
        "Bar/OHLC and candlestick charts can show open, high, low and close.",
        "Historical patterns do not prove what an asset is worth.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Chart types",
    },
    {
      id: "s36",
      number: 36,
      title: "Market capitalization calculations",
      subtitle: "Share price alone does not tell you how large a company is.",
      bullets: [
        "Market cap ≈ current share price × shares outstanding.",
        "Example: 10 million × $25 = $250 million; 500 million × $80 = $40 billion.",
        "A $200 stock with 1M shares can be smaller than a $20 stock with 50M shares.",
        "Market cap is equity value — not the full enterprise including debt.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Market cap",
    },
    {
      id: "s37",
      number: 37,
      title: "Indices: the market’s measuring sticks",
      subtitle: "Use a benchmark that matches the risk you are taking.",
      bullets: [
        "S&P 500 — common large U.S. equity benchmark.",
        "Dow Jones Industrial Average — 30 prominent U.S. companies (price-weighted).",
        "Nasdaq Composite — broad Nasdaq list with substantial technology exposure.",
        "Compare your portfolio to a relevant barometer, not a random one.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Indices",
    },
    {
      id: "s38",
      number: 38,
      title: "Volume, volatility and sentiment",
      subtitle: "Three different lenses on market behavior.",
      bullets: [
        "Volume: how much changes hands — strong participation vs thin moves.",
        "Volatility: magnitude of fluctuations — a risk indicator, not the whole of risk.",
        "Sentiment: optimism/pessimism that can move price without changing fundamentals.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Sentiment",
    },
    {
      id: "s39",
      number: 39,
      title: "Market reaction ≠ fundamental information",
      subtitle: "Prices respond to information relative to expectations.",
      bullets: [
        "Strong earnings can still disappoint if the market expected more.",
        "Separate the fundamental facts from the crowd’s reaction.",
        "Write one fundamental explanation and one sentiment-driven explanation.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Reaction",
    },
    {
      id: "s40",
      number: 40,
      title: "Market-reading worksheet",
      subtitle: "Complete this before you act on a move.",
      bullets: [
        "Current price and recent range · market cap or asset size.",
        "Relevant benchmark · recent volume vs normal · observed volatility.",
        "One fundamental explanation · one sentiment-driven explanation.",
        "Then open map portal M5 to prove the skill with five challenges.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Worksheet",
    },
    {
      id: "s41",
      number: 41,
      title: "Portal 6 · Research Fundamentals",
      subtitle: "Separate evidence from commentary; challenge your own beliefs",
      bullets: [
        "Learn to separate evidence from commentary and build a research process that can challenge",
        "your own beliefs.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "P6 Intro",
    },
    {
      id: "s42",
      number: 42,
      title: "Build an evidence hierarchy",
      subtitle: "Start close to the underlying facts, then add interpretation.",
      bullets: [
        "Primary: filings, audited reports, official releases, regulatory disclosures.",
        "Interpretation: analyst research, journalism, expert commentary.",
        "Leads/sentiment: useful clues — verify before you bet the portfolio.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Evidence",
    },
    {
      id: "s43",
      number: 43,
      title: "Six questions for source credibility",
      subtitle: "A source can be useful without being equally reliable for every claim.",
      bullets: [
        "1 Authority — who produced it?",
        "2 Evidence — is the claim supported?",
        "3 Timeliness — is it still current?",
        "A source can be useful without being equally reliable for every claim.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Credibility",
    },
    {
      id: "s44",
      number: 44,
      title: "Portal 7 · Build Your First Portfolio",
      subtitle: "Position sizes, weights, diversification and cash allocation",
      bullets: [
        "Turn research into position sizes, portfolio weights, diversification and a deliberate cash",
        "allocation.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "P7 Intro",
    },
    {
      id: "s45",
      number: 45,
      title: "Position size is a risk decision",
      subtitle: "Even a good idea can damage a portfolio if the exposure is too large.",
      bullets: [
        "Portfolio weight = position value / total portfolio value × 100%.",
        "Even a good idea can damage a portfolio if the exposure is too large.",
        "Size the position to the risk — not only to conviction.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Position size",
    },
    {
      id: "s46",
      number: 46,
      title: "Diversification is about different risks",
      subtitle: "Ten investments can still be one concentrated bet.",
      bullets: [
        "Ten investments can still be one concentrated bet.",
        "Check concentration by asset class, sector/industry, and geography.",
        "Diversify across different risks — not just more tickers.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Diversify",
    },
    {
      id: "s47",
      number: 47,
      title: "Portal 8 · Investment Decisions",
      subtitle: "BUY, ADD, HOLD, TRIM and EXIT — and document why",
      bullets: [
        "Practice BUY , ADD, HOLD, TRIM and EXIT — and document why capital should stay or move.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "P8 Intro",
    },
    {
      id: "s48",
      number: 48,
      title: "Five active portfolio decisions",
      subtitle: "“Do nothing” can still be a deliberate investment decision.",
      bullets: [
        "BUY — open a new position when reward justifies risk.",
        "ADD / HOLD / TRIM / EXIT — each needs a reason.",
        "“Do nothing” can still be a deliberate investment decision.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "5 decisions",
    },
    {
      id: "s49",
      number: 49,
      title: "The decision journal turns action into learning",
      subtitle: "A good rationale can be reviewed later — even when the outcome is bad.",
      bullets: [
        "Record ACTION: BUY / ADD / HOLD / TRIM / EXIT.",
        "Record EVIDENCE: what changed? What supports the action?",
        "A good rationale can be reviewed later — even when the outcome is bad.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Journal",
    },
    {
      id: "s50",
      number: 50,
      title: "Portal 9 · Purple City Challenge",
      subtitle: "Defend the process, fix weaknesses, rebalance before Blue City",
      bullets: [
        "Defend the process behind the portfolio, identify weaknesses, and rebalance before Blue City.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "P9 Intro",
    },
    {
      id: "s51",
      number: 51,
      title: "How to defend your first portfolio",
      subtitle: "The challenge rewards disciplined reasoning — not lucky short-term returns.",
      bullets: [
        "Defend mandate: objective, horizon, risk, liquidity.",
        "Defend allocation: asset weights and cash reserve.",
        "The challenge rewards disciplined reasoning — not lucky short-term returns.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Defend",
    },
    {
      id: "s52",
      number: 52,
      title: "Purple City scoring rubric",
      subtitle: "What strong work should demonstrate.",
      bullets: [
        "Research quality · Portfolio construction · Decision rationale.",
        "Strong work shows process, evidence, and clear trade-offs.",
        "Use the rubric to find weak spots before Blue City.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Rubric",
    },
    {
      id: "s53",
      number: 53,
      title: "Purple City Complete",
      subtitle: "Before you unlock Blue City…",
      bullets: [
        "Explain saving vs investing vs trading.",
        "Calculate PV, FV, nominal and real returns.",
        "Describe major asset classes and what moves them.",
        "Explain bid/ask, liquidity, market and limit orders — then unlock Blue City.",
      ],
      footer: "Coral Ledger Bay · Purple City Investment Foundations Teaching Deck",
      accent: "#c6a15b",
      thumbLabel: "Complete",
    },
  ],

  notesHref: "/library/coral-ledger-bay/purple-city-foundation-notes.pdf",
  notesDownloadName: "purple-city-foundation-study-notes.pdf",
  deckHref: "/library/coral-ledger-bay/purple-city-investment-foundations-teaching-deck.pdf",
  deckDownloadName: "purple-city-investment-foundations-teaching-deck.pdf",
  linkedSites: [
    {
      id: "link-investor-gov",
      title: "Investor.gov — Getting Started",
      url: "https://www.investor.gov/introduction-investing",
      platform: "web",
    },
    {
      id: "link-sec-edgar",
      title: "SEC EDGAR company filings",
      url: "https://www.sec.gov/edgar/searchedgar/companysearch",
      platform: "web",
    },
    {
      id: "link-khan",
      title: "Khan Academy — Stocks and bonds",
      url: "https://www.khanacademy.org/economics-finance-domain/core-finance",
      platform: "web",
    },
  ],
  quote: {
    text: "An investment in knowledge pays the best interest.",
    author: "Benjamin Franklin",
  },
};

/**
 * Standard classroom shell for cities whose lesson deck is not authored yet.
 * Same room, Slides panel (full-height vertical scroll), tools, and options as Coral Bay —
 * city colour differs; curriculum content is placeholder-only (never copied from Purple City).
 */
function stubClassroom(areaId: AreaId): ClassroomLesson {
  const area = MAP_AREAS.find((a) => a.id === areaId)!;
  const lib = getLibrary(areaId)!;
  const theme = THEME[areaId];
  const notes =
    lib.resources.find((r) => r.kind === "notes" || r.kind === "paper" || r.kind === "ebook") ??
    lib.resources[0];
  const deck =
    lib.resources.find((r) => r.kind === "powerpoint") ?? lib.resources[0];

  const moduleCount = area.moduleEnd - area.moduleStart + 1;
  const slides: ClassroomSlide[] = [
    {
      id: `${areaId}-s1`,
      number: 1,
      title: `${area.name} Library Classroom`,
      subtitle: "Standard teaching board — city materials load here",
      bullets: [
        "This room uses the same classroom layout as every library on the island.",
        "Use the vertical scrollbar in Slides to move through titles without shifting the teaching board.",
        `Portals for this district: M${area.moduleStart}–M${area.moduleEnd}.`,
      ],
      footer: `${area.name} · Library Classroom`,
      accent: theme.color,
      thumbLabel: "Welcome",
    },
    {
      id: `${areaId}-s2`,
      number: 2,
      title: `Your ${area.shortName} journey`,
      subtitle: `${moduleCount} portals. One evolving portfolio.`,
      bullets: [
        `Work through portals M${area.moduleStart}–M${area.moduleEnd} in order.`,
        "Teach from this board, then prove it in the matching map portal.",
        "City-specific slides and notes will replace these placeholders as they are authored.",
      ],
      accent: theme.color,
      thumbLabel: "Journey",
    },
  ];

  for (let m = area.moduleStart; m <= area.moduleEnd; m++) {
    const n = slides.length + 1;
    slides.push({
      id: `${areaId}-s${n}`,
      number: n,
      title: `Portal M${m} · Materials coming soon`,
      subtitle: `${area.name} teaching slide for portal M${m}`,
      bullets: [
        `Placeholder slide for portal M${m}.`,
        "Same Slides panel controls as every other library room.",
        "Open the matching portal on the map when you are ready to practice.",
      ],
      accent: theme.color,
      thumbLabel: `M${m}`,
    });
  }

  slides.push({
    id: `${areaId}-s${slides.length + 1}`,
    number: slides.length + 1,
    title: `${area.name} classroom ready`,
    subtitle: "Same room standard across the island",
    bullets: [
      "Scroll the Slides panel to jump titles; the teaching board stays fixed.",
      "Download Notes and Download PowerPoint use this city’s shelf files.",
      "Return to Map when you are ready for the next portal.",
    ],
    footer: `${area.name} · Library Classroom`,
    accent: "#c6a15b",
    thumbLabel: "Ready",
  });

  return {
    id: `${areaId}-classroom`,
    areaId,
    themeColor: theme.color,
    themeColorDeep: theme.deep,
    subject: area.shortName,
    topic: `${area.name} Classroom`,
    title: `Lesson: ${area.name}`,
    classId: lib.classes[0]?.id ?? `${areaId}-class`,
    moduleStart: area.moduleStart,
    moduleEnd: area.moduleEnd,
    outline: [],
    slides,
    notesHref: `/library/${areaId}/${notes.file}`,
    notesDownloadName: notes.downloadName,
    deckHref: `/library/${areaId}/${deck.file}`,
    deckDownloadName: deck.downloadName,
    linkedSites: [],
    quote: {
      text: "An investment in knowledge pays the best interest.",
      author: "Benjamin Franklin",
    },
  };
}

export const CLASSROOM_LESSONS: Record<AreaId, ClassroomLesson> = {
  "coral-ledger-bay": PURPLE_CITY_CLASSROOM,
  "brick-exchange": stubClassroom("brick-exchange"),
  "signal-quay": stubClassroom("signal-quay"),
  "mandate-highlands": stubClassroom("mandate-highlands"),
};

export function getClassroomLesson(areaId: string): ClassroomLesson | undefined {
  return CLASSROOM_LESSONS[areaId as AreaId];
}
