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

/** Purple City layman PowerPoint — teaching-board content for Coral Ledger Bay. */
export const PURPLE_CITY_CLASSROOM: ClassroomLesson = {
  id: "purple-city-foundations",
  areaId: "coral-ledger-bay",
  themeColor: THEME["coral-ledger-bay"].color,
  themeColorDeep: THEME["coral-ledger-bay"].deep,
  subject: "Investing",
  topic: "Purple City Foundations",
  title: "Lesson: Purple City Notes Walkthrough",
  classId: "bay-class-3",
  moduleStart: 1,
  moduleEnd: 9,
  outline: [],
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
      accent: THEME["coral-ledger-bay"].color,
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
      accent: THEME["coral-ledger-bay"].color,
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
      accent: THEME["coral-ledger-bay"].color,
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
      accent: THEME["coral-ledger-bay"].color,
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
      accent: THEME["coral-ledger-bay"].color,
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
      accent: THEME["coral-ledger-bay"].color,
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
      accent: THEME["coral-ledger-bay"].color,
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
      accent: THEME["coral-ledger-bay"].color,
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
      accent: THEME["coral-ledger-bay"].color,
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
      accent: THEME["coral-ledger-bay"].color,
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
