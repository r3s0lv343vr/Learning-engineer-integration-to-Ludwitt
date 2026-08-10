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
      subtitle: "Risk tolerance, risk capacity, time horizon and liquidity",
      bullets: [
        "Build an investment mandate around risk tolerance, risk capacity, time horizon and liquidity.",
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
        "Risk tolerance: how much uncertainty can you emotionally handle?",
        "Risk capacity: what can your finances afford to lose?",
        "Example: Could you watch a portfolio fall 20% without abandoning the plan?",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Tolerance",
    },
    {
      id: "s13",
      number: 13,
      title: "Build your investment mandate",
      subtitle: "The mandate turns preferences into rules for the $14,800.",
      bullets: [
        "Objective: what is the money trying to achieve?",
        "Horizon: when might the money be needed?",
        "Liquidity: how quickly might you need cash?",
        "The mandate turns preferences into rules for the $14,800.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Mandate",
    },
    {
      id: "s14",
      number: 14,
      title: "Portal 3 · Understanding Asset Classes",
      subtitle: "What you own, what can make it earn, and what can make it lose",
      bullets: [
        "Learn what you actually own, what can make it earn, and what can make it lose.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "P3 Intro",
    },
    {
      id: "s15",
      number: 15,
      title: "Asset classes behave differently",
      subtitle: "Diversification starts by understanding different economic exposures.",
      bullets: [
        "Stocks: company ownership — moves with profits, growth, expectations.",
        "Bonds: lending relationships — move with rates, inflation, credit risk.",
        "Diversification starts by understanding different economic exposures.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Asset classes",
    },
    {
      id: "s16",
      number: 16,
      title: "What tends to move bonds?",
      subtitle: "Bond prices and yields react to interest rates, inflation and credit risk.",
      bullets: [
        "When market rates rise, existing bond prices tend to fall.",
        "New bonds may offer higher yields, making older lower-coupon bonds less attractive.",
        "Watch interest rates, inflation, and credit risk together.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Bonds",
    },
    {
      id: "s17",
      number: 17,
      title: "ETFs: one trade, many holdings",
      subtitle: "A pooled investment whose shares trade on an exchange.",
      bullets: [
        "An ETF is a pooled investment whose shares trade on an exchange.",
        "One trade can hold hundreds of stocks, bonds, a sector, or other exposures.",
        "Useful building block for diversified beginner portfolios.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "ETFs",
    },
    {
      id: "s18",
      number: 18,
      title: "How real estate investing works",
      subtitle: "Returns can come from income, price appreciation — or both.",
      bullets: [
        "Income engine: rent − vacancy − operating expenses.",
        "Returns can also come from price appreciation.",
        "Income and appreciation can work together — or separately.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Real estate",
    },
    {
      id: "s19",
      number: 19,
      title: "Portal 4 · How Markets Work",
      subtitle: "Investor → broker → market; bid/ask, liquidity and order types",
      bullets: [
        "Understand the route from investor → broker → market, then learn bid/ask, liquidity and order",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "P4 Intro",
    },
    {
      id: "s20",
      number: 20,
      title: "From your decision to an executed trade",
      subtitle: "Markets are systems for matching buyers and sellers.",
      bullets: [
        "You decide to trade → broker receives the order → venue matches it.",
        "Markets are systems for matching buyers and sellers.",
        "Understanding the path helps you understand costs and delays.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Trade path",
    },
    {
      id: "s21",
      number: 21,
      title: "What creates liquidity?",
      subtitle: "Trade quickly without a large price concession.",
      bullets: [
        "More liquid markets: narrower spreads, deeper books, less price impact.",
        "Liquidity is the ability to trade quickly without a large price concession.",
        "Illiquid names can be expensive to exit in a hurry.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Liquidity",
    },
    {
      id: "s22",
      number: 22,
      title: "Market order vs limit order",
      subtitle: "Execution certainty and price control pull in different directions.",
      bullets: [
        "Market order: trade now at the best available prices (priority = execution).",
        "Limit order: only at your price (priority = control).",
        "Execution certainty and price control pull in different directions.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Orders",
    },
    {
      id: "s23",
      number: 23,
      title: "Trading has visible and invisible costs",
      subtitle: "Small frictions matter when repeated.",
      bullets: [
        "Spread example: buy at $20.10, sell at $20.00 → $0.10 per share friction.",
        "Commissions and slippage also reduce net results.",
        "Small frictions matter when repeated.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Trade costs",
    },
    {
      id: "s24",
      number: 24,
      title: "Portal 5 · Reading the Market",
      subtitle: "Charts, market cap, indices, volume, volatility and sentiment",
      bullets: [
        "Interpret charts, market capitalization, indices, volume, volatility and sentiment — without",
        "confusing price with value.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "P5 Intro",
    },
    {
      id: "s25",
      number: 25,
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
      id: "s26",
      number: 26,
      title: "Market capitalization: how large is the equity value?",
      subtitle: "A share price alone does not tell you how large a company is.",
      bullets: [
        "Market capitalization = share price × shares outstanding.",
        "Example: 10 million shares × $25 = $250 million.",
        "A share price alone does not tell you how large a company is.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Market cap",
    },
    {
      id: "s27",
      number: 27,
      title: "Indices: the market's measuring sticks",
      subtitle: "An index represents a defined group of securities and can serve as a benchmark.",
      bullets: [
        "S&P 500: large U.S. companies benchmark.",
        "DJIA: 30 prominent U.S. companies.",
        "An index represents a defined group and can serve as a benchmark.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Indices",
    },
    {
      id: "s28",
      number: 28,
      title: "Volume, volatility and sentiment",
      subtitle: "Three different lenses on market behavior.",
      bullets: [
        "Volume: how much changes hands — strong participation vs thin moves.",
        "Volatility: how violently price swings.",
        "Sentiment: mood of the crowd — useful, but not a thesis by itself.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Sentiment",
    },
    {
      id: "s29",
      number: 29,
      title: "Market reaction ≠ fundamental information",
      subtitle: "Prices respond to information relative to expectations.",
      bullets: [
        "Prices respond to information relative to expectations.",
        "Strong earnings can still disappoint if the market expected more.",
        "Separate fundamentals from the market's reaction to them.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "Reaction",
    },
    {
      id: "s30",
      number: 30,
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
      id: "s31",
      number: 31,
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
      id: "s32",
      number: 32,
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
      id: "s33",
      number: 33,
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
      id: "s34",
      number: 34,
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
      id: "s35",
      number: 35,
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
      id: "s36",
      number: 36,
      title: "Portal 8 · Investment Decisions",
      subtitle: "BUY, ADD, HOLD, TRIM and EXIT — and document why",
      bullets: [
        "Practice BUY , ADD, HOLD, TRIM and EXIT — and document why capital should stay or move.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "P8 Intro",
    },
    {
      id: "s37",
      number: 37,
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
      id: "s38",
      number: 38,
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
      id: "s39",
      number: 39,
      title: "Portal 9 · Purple City Challenge",
      subtitle: "Defend the process, fix weaknesses, rebalance before Blue City",
      bullets: [
        "Defend the process behind the portfolio, identify weaknesses, and rebalance before Blue City.",
      ],
      accent: THEME["coral-ledger-bay"].color,
      thumbLabel: "P9 Intro",
    },
    {
      id: "s40",
      number: 40,
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
      id: "s41",
      number: 41,
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
      id: "s42",
      number: 42,
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
 * Standard empty classroom shell for cities whose lesson content is not authored yet.
 * Same room / tools / options — different colour only. Content is intentionally blank-ready.
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
    slides: [
      {
        id: `${areaId}-s1`,
        number: 1,
        title: `${area.name} Library Classroom`,
        subtitle: "Standard teaching board — city materials load here",
        bullets: [
          "This room uses the same classroom layout as every library on the island.",
          "Slides, notes, and linked readings for this city will be added separately.",
          `Portals for this district: M${area.moduleStart}–M${area.moduleEnd}.`,
        ],
        footer: `${area.name} · Library Classroom`,
        accent: theme.color,
        thumbLabel: "Welcome",
      },
    ],
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
