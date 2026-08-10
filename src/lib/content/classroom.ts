import type { AreaId } from "@/lib/content/areas";

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
  subject: string;
  topic: string;
  title: string;
  /** Matches online class / walkthrough */
  classId: string;
  outline: { id: string; label: string; slideIndex: number }[];
  slides: ClassroomSlide[];
  notesHref: string;
  notesDownloadName: string;
  deckHref: string;
  deckDownloadName: string;
  linkedSites: { id: string; title: string; url: string; platform: string }[];
  quote: { text: string; author: string };
};

/** Purple City layman PowerPoint — teaching-board content for Coral Ledger Bay. */
export const PURPLE_CITY_CLASSROOM: ClassroomLesson = {
  id: "purple-city-foundations",
  areaId: "coral-ledger-bay",
  subject: "Investing",
  topic: "Purple City Foundations",
  title: "Lesson: Purple City Notes Walkthrough",
  classId: "bay-class-3",
  outline: [
    { id: "o1", label: "1. Welcome & cash", slideIndex: 0 },
    { id: "o2", label: "2. Enter the Market", slideIndex: 1 },
    { id: "o3", label: "3. Know Your Investor", slideIndex: 2 },
    { id: "o4", label: "4. Asset Classes", slideIndex: 3 },
    { id: "o5", label: "5. How Markets Work", slideIndex: 4 },
    { id: "o6", label: "6. Reading the Market", slideIndex: 5 },
    { id: "o7", label: "7. Research Fundamentals", slideIndex: 6 },
    { id: "o8", label: "8. First Portfolio", slideIndex: 7 },
    { id: "o9", label: "9. Investment Decisions", slideIndex: 8 },
    { id: "o10", label: "10. Purple City Challenge", slideIndex: 9 },
    { id: "o11", label: "11. How to use this deck", slideIndex: 10 },
  ],
  slides: [
    {
      id: "s1",
      number: 1,
      title: "Purple City Foundation — Plain English",
      subtitle: "A simple tour of Portals 1–9",
      bullets: [
        "Starting cash in the simulator: $14,800.",
        "Goal: learn markets by making real portfolio decisions.",
        "This board mirrors the layman PowerPoint in the library shelf.",
      ],
      footer: "Coral Ledger Bay · Library Classroom",
      accent: "#7c4dff",
      thumbLabel: "Welcome",
    },
    {
      id: "s2",
      number: 2,
      title: "Portal 1 — Enter the Market",
      bullets: [
        "Saving = keep money safe for near-term needs.",
        "Investing = grow money over years (accepts ups and downs).",
        "Trading = try to profit from short-term price moves.",
        "Compounding means returns can earn more returns over time.",
      ],
      accent: "#7c4dff",
      thumbLabel: "Enter Market",
    },
    {
      id: "s3",
      number: 3,
      title: "Portal 2 — Know Your Investor",
      subtitle: "Before investing, write your rules",
      bullets: [
        "Risk tolerance — how much stress can you handle?",
        "Risk capacity — what can you afford to lose?",
        "Time horizon — when do you need the money?",
        "Liquidity needs — how quickly might you need cash?",
      ],
      accent: "#8e6cff",
      thumbLabel: "Investor",
    },
    {
      id: "s4",
      number: 4,
      title: "Portal 3 — Asset Classes",
      subtitle: "Different tools for different jobs",
      bullets: [
        "Stocks = own a slice of a company.",
        "Bonds = lend money and get paid interest.",
        "ETFs = a basket of many investments in one share.",
        "Cash, real estate, and other assets each play a role.",
      ],
      accent: "#6a5acd",
      thumbLabel: "Assets",
    },
    {
      id: "s5",
      number: 5,
      title: "Portal 4 — How Markets Work",
      bullets: [
        "Markets match buyers and sellers.",
        "Bid = what buyers offer; Ask = what sellers want.",
        "Market order = buy/sell now (speed).",
        "Limit order = only at your price (control).",
        "Costs matter: spread, commissions, and slippage.",
      ],
      accent: "#7c4dff",
      thumbLabel: "Markets",
    },
    {
      id: "s6",
      number: 6,
      title: "Portal 5 — Reading the Market",
      bullets: [
        "Charts show what price did — not why an asset is valuable.",
        "Market cap ≈ share price × shares outstanding.",
        "Indices (like the S&P 500) are scoreboards for groups of stocks.",
        "Watch volume, volatility, and news — then check your thesis.",
      ],
      accent: "#9b7cff",
      thumbLabel: "Reading",
    },
    {
      id: "s7",
      number: 7,
      title: "Portal 6 — Research Fundamentals",
      bullets: [
        "Start with: “What do I need to know?”",
        "Prefer primary evidence (filings, official data) over hype.",
        "Credibility check: authority, evidence, timeliness, incentives.",
        "Keep a research log so decisions stay explainable.",
      ],
      accent: "#7c4dff",
      thumbLabel: "Research",
    },
    {
      id: "s8",
      number: 8,
      title: "Portal 7 — Build Your First Portfolio",
      bullets: [
        "Position size = dollars in one idea.",
        "Weight = that idea as a % of the whole portfolio.",
        "Diversify across different risks — not just many tickers.",
        "Cash is a real choice: safety and optionality.",
      ],
      accent: "#8e6cff",
      thumbLabel: "Portfolio",
    },
    {
      id: "s9",
      number: 9,
      title: "Portal 8 — Investment Decisions",
      bullets: [
        "Every holding needs action language: BUY · ADD · HOLD · TRIM · EXIT.",
        "Write why before you click.",
        "Opportunity cost = what else that money could do.",
        "Good process beats lucky outcomes.",
      ],
      accent: "#6a5acd",
      thumbLabel: "Decisions",
    },
    {
      id: "s10",
      number: 10,
      title: "Portal 9 — Purple City Challenge",
      bullets: [
        "Review objectives, watchlist, first trades, and research quality.",
        "Check starting allocation and your decision journal.",
        "Defend what you own. Fix weak spots. Rebalance if needed.",
        "Then you’re ready for Blue City analysis.",
      ],
      accent: "#7c4dff",
      thumbLabel: "Challenge",
    },
    {
      id: "s11",
      number: 11,
      title: "How to use this deck",
      bullets: [
        "Read one portal slide, then open the matching map portal.",
        "Answer the five multiple-choice challenges.",
        "Download the full Purple City Foundation Notes PDF from the shelf.",
        "Download this PowerPoint to enhance or teach the lesson offline.",
      ],
      footer: "Library Classroom · teaching board powered by the layman deck",
      accent: "#c6a15b",
      thumbLabel: "How to use",
    },
  ],
  notesHref: "/library/coral-ledger-bay/purple-city-foundation-notes.pdf",
  notesDownloadName: "purple-city-foundation-study-notes.pdf",
  deckHref: "/library/coral-ledger-bay/purple-city-notes-layman.pptx",
  deckDownloadName: "purple-city-notes-layman.pptx",
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

export function getClassroomLesson(areaId: string): ClassroomLesson | undefined {
  if (areaId === PURPLE_CITY_CLASSROOM.areaId) return PURPLE_CITY_CLASSROOM;
  return undefined;
}
