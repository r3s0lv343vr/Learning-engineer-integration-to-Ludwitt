import type { QuizQuestion } from "@/lib/types";
import type { AreaId, StrengthHue } from "@/lib/content/areas";

/** Nine compulsory exams gating progress across the four areas. */
export interface CompulsoryExam {
  id: string;
  roman: string;
  number: number;
  title: string;
  /** Completed before this exam unlocks */
  afterModuleId: string;
  /** Unlocked when exam is passed */
  unlocksModuleId: string;
  areaId: AreaId;
  strength: StrengthHue;
  color: string;
  summary: string;
  questions: QuizQuestion[];
  x: number;
  y: number;
}

function q(
  id: string,
  prompt: string,
  choices: string[],
  correctIndex: number,
  explanation: string,
): QuizQuestion {
  return { id, prompt, choices, correctIndex, explanation };
}

export const EXAMS: CompulsoryExam[] = [
  {
    id: "exam-1",
    roman: "I",
    number: 1,
    title: "Foundations Gate",
    afterModuleId: "m4",
    unlocksModuleId: "m5",
    areaId: "coral-ledger-bay",
    strength: "purple",
    color: "#7c4dff",
    summary: "Compulsory check on investing basics, markets, behaviour, and research hygiene.",
    x: 36,
    y: 74,
    questions: [
      q("e1-q1", "P/E is best described as:", ["Price ÷ Book", "Price ÷ EPS", "EPS ÷ Price", "EV ÷ Sales"], 1, "P/E = price per share ÷ earnings per share."),
      q("e1-q2", "Acid-test (quick) ratio excludes:", ["Cash", "Receivables", "Inventory", "Marketable securities"], 2, "Quick assets exclude inventory."),
      q("e1-q3", "Confirmation bias means you:", ["Seek disconfirming evidence", "Only notice data that supports your view", "Always diversify", "Ignore price"], 1, "You overweight agreeing evidence."),
    ],
  },
  {
    id: "exam-2",
    roman: "II",
    number: 2,
    title: "Bay Behaviour Oral",
    afterModuleId: "m8",
    unlocksModuleId: "m9",
    areaId: "coral-ledger-bay",
    strength: "purple",
    color: "#7c4dff",
    summary: "Styles, multi-asset basics, and process discipline before leaving Coral Ledger Bay.",
    x: 42,
    y: 62,
    questions: [
      q("e2-q1", "Current ratio =", ["CA ÷ CL", "Cash ÷ Debt", "EBIT ÷ Interest", "NI ÷ Equity"], 0, "Current assets ÷ current liabilities."),
      q("e2-q2", "A growth style typically emphasizes:", ["High dividend yield only", "Expected earnings growth / reinvestment", "Book value alone", "Commodity beta"], 1, "Growth focuses on future earnings expansion."),
      q("e2-q3", "ETFs are useful mainly because they:", ["Eliminate all risk", "Provide diversified baskets with liquidity", "Guarantee alpha", "Avoid markets"], 1, "Basket exposure + exchange liquidity."),
    ],
  },
  {
    id: "exam-3",
    roman: "III",
    number: 3,
    title: "Statements Seal",
    afterModuleId: "m12",
    unlocksModuleId: "m13",
    areaId: "brick-exchange",
    strength: "blue",
    color: "#2196f3",
    summary: "Brick Exchange checkpoint: financial statements, ratios, and valuation hygiene.",
    x: 64,
    y: 78,
    questions: [
      q("e3-q1", "ROE =", ["NI ÷ Assets", "NI ÷ Equity", "EBIT ÷ Sales", "FCF ÷ Price"], 1, "Return on equity uses net income over equity."),
      q("e3-q2", "Gross margin focuses on:", ["Interest expense", "Revenue minus COGS", "CapEx only", "Share count"], 1, "Gross profit / revenue."),
      q("e3-q3", "EV/EBITDA is often preferred to P/E when:", ["Comparing firms with different capital structures", "You want dividend yield", "EPS is negative only", "Book value is zero"], 0, "EV is capital-structure neutral."),
    ],
  },
  {
    id: "exam-4",
    roman: "IV",
    number: 4,
    title: "Valuation Tribunal",
    afterModuleId: "m16",
    unlocksModuleId: "m17",
    areaId: "brick-exchange",
    strength: "blue",
    color: "#2196f3",
    summary: "Compulsory valuation and style exam before exiting Brick Exchange.",
    x: 76,
    y: 64,
    questions: [
      q("e4-q1", "Margin of safety widens when:", ["Price falls below intrinsic value estimate", "P/E rises", "You use more leverage", "You ignore risks"], 0, "MoS is the gap between value and price."),
      q("e4-q2", "Interest coverage =", ["EBIT ÷ Interest", "Debt ÷ Equity", "CA ÷ CL", "FCF ÷ CapEx"], 0, "EBIT covering interest expense."),
      q("e4-q3", "PEG adjusts P/E for:", ["Book value", "Expected growth", "Debt only", "Currency"], 1, "PEG = P/E ÷ growth rate."),
    ],
  },
  {
    id: "exam-5",
    roman: "V",
    number: 5,
    title: "Portfolio Crosswind",
    afterModuleId: "m20",
    unlocksModuleId: "m21",
    areaId: "signal-quay",
    strength: "green",
    color: "#43a047",
    summary: "Signal Quay gate on construction, diversification, and risk budgets.",
    x: 70,
    y: 44,
    questions: [
      q("e5-q1", "Position weight =", ["Shares ÷ Price", "Position value ÷ Portfolio value", "Beta ÷ Alpha", "Cash ÷ Debt"], 1, "Market value share of the book."),
      q("e5-q2", "Correlations in crises often:", ["Fall to zero", "Rise, reducing diversification benefit", "Become irrelevant", "Equal 1 always in calm markets only"], 1, "Diversification can fail when correlations spike."),
      q("e5-q3", "A risk budget primarily limits:", ["Marketing spend", "How much loss/volatility a mandate can take", "Share count", "Office rent"], 1, "Risk budgets constrain drawdown/vol/factor exposures."),
    ],
  },
  {
    id: "exam-6",
    roman: "VI",
    number: 6,
    title: "Macro Wire Trial",
    afterModuleId: "m24",
    unlocksModuleId: "m25",
    areaId: "signal-quay",
    strength: "green",
    color: "#43a047",
    summary: "Macro, news reaction, and crash literacy for Signal Quay.",
    x: 82,
    y: 34,
    questions: [
      q("e6-q1", "Hawkish policy typically pressures:", ["Long-duration assets via higher discount rates", "Only gold", "Only FX forever", "Inventory only"], 0, "Higher rates hit long-duration valuations."),
      q("e6-q2", "Beat-and-lower-guide often means:", ["Ignore guidance", "Markets care about the forward path", "Always buy", "EPS is fake"], 1, "Forward outlook moves prices."),
      q("e6-q3", "Max drawdown measures:", ["Peak-to-trough decline", "Average return", "P/E only", "Dividend cut size only"], 0, "Path risk from peak to trough."),
    ],
  },
  {
    id: "exam-7",
    roman: "VII",
    number: 7,
    title: "Crisis Archive Defence",
    afterModuleId: "m28",
    unlocksModuleId: "m29",
    areaId: "mandate-highlands",
    strength: "gold",
    color: "#c6922e",
    summary: "Highlands entry exam: historical crises and advanced risk controls.",
    x: 56,
    y: 30,
    questions: [
      q("e7-q1", "Free cash flow approximates:", ["OCF − CapEx", "NI + Debt", "Sales − Tax", "Price − Book"], 0, "Cash from ops after reinvestment CapEx."),
      q("e7-q2", "A stop-loss is mainly a:", ["Valuation model", "Risk-control tool with behavioural trade-offs", "Guarantee of profits", "Tax shield"], 1, "It caps loss but can whipsaw."),
      q("e7-q3", "Liquidity risk rises when:", ["You can exit instantly at fair price", "Exit costs/time jump in stress", "Cash is 100%", "Beta is 1"], 1, "Stressed markets impair exits."),
    ],
  },
  {
    id: "exam-8",
    roman: "VIII",
    number: 8,
    title: "Thesis Forge Hearing",
    afterModuleId: "m32",
    unlocksModuleId: "m33",
    areaId: "mandate-highlands",
    strength: "gold",
    color: "#c6922e",
    summary: "Thesis quality, falsifiers, and journal discipline.",
    x: 38,
    y: 26,
    questions: [
      q("e8-q1", "A good investment thesis includes:", ["Only a ticker", "Drivers, valuation, risks, and falsifiers", "Tips from social media alone", "Charts with no process"], 1, "Thesis = claim + evidence + kill criteria."),
      q("e8-q2", "Pre-mortem asks:", ["What already went right?", "How this decision could fail", "Only tax lots", "Who to copy"], 1, "Imagine failure to surface risks."),
      q("e8-q3", "Debt/Equity rising with flat ROE may imply:", ["Hidden leverage risk", "Always better returns", "Zero risk", "Perfect efficiency"], 0, "Leverage can mask weakening economics."),
    ],
  },
  {
    id: "exam-9",
    roman: "IX",
    number: 9,
    title: "Fund Mandate Capstone",
    afterModuleId: "m36",
    unlocksModuleId: "m36",
    areaId: "mandate-highlands",
    strength: "gold",
    color: "#c6922e",
    summary: "Final compulsory exam — IPS, ethics, and process under pressure.",
    x: 48,
    y: 42,
    questions: [
      q("e9-q1", "An IPS should define:", ["Only a lucky ticker", "Objectives, constraints, and risk limits", "Office snacks", "Broker logos"], 1, "IPS is the mandate contract."),
      q("e9-q2", "Client asks to breach mandate for a viral asset. Correct action:", ["Hide it", "Document, refuse breach, offer compliant options", "Delete the IPS", "Max leverage"], 1, "Process and fiduciary duty first."),
      q("e9-q3", "CAGR hides:", ["Annualized growth", "Path and drawdowns", "Starting value", "Ending value"], 1, "Smooth growth can mask deep interim losses."),
    ],
  },
];

export function getExam(id: string) {
  return EXAMS.find((e) => e.id === id);
}

export function examAfterModule(moduleId: string) {
  return EXAMS.find((e) => e.afterModuleId === moduleId);
}
