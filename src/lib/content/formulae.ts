/** Reference card of core financial formulae for learners. */

export type FormulaCategory =
  | "Valuation"
  | "Profitability"
  | "Liquidity"
  | "Leverage"
  | "Per-share"
  | "Portfolio";

export interface FormulaEntry {
  id: string;
  name: string;
  category: FormulaCategory;
  formula: string;
  meaning: string;
  tip: string;
}

export const FORMULAE: FormulaEntry[] = [
  {
    id: "pe",
    name: "Price / Earnings (P/E)",
    category: "Valuation",
    formula: "P/E = Market Price per Share ÷ Earnings per Share (EPS)",
    meaning: "How many years of earnings the market is paying for at the current price.",
    tip: "Compare to peers and history; a low P/E can mean cheap or impaired earnings.",
  },
  {
    id: "forward-pe",
    name: "Forward P/E",
    category: "Valuation",
    formula: "Forward P/E = Price ÷ Expected Next-12-Month EPS",
    meaning: "Values the stock on forecast earnings rather than trailing results.",
    tip: "Sensitive to optimistic forecasts — check who is estimating and why.",
  },
  {
    id: "peg",
    name: "PEG Ratio",
    category: "Valuation",
    formula: "PEG = (P/E) ÷ Expected Earnings Growth Rate (%)",
    meaning: "Adjusts P/E for growth; ~1 often cited as ‘fair’ for steady growers.",
    tip: "Garbage-in if growth rate is fantasy. Prefer multi-year sustainable growth.",
  },
  {
    id: "pb",
    name: "Price / Book (P/B)",
    category: "Valuation",
    formula: "P/B = Market Price per Share ÷ Book Value per Share",
    meaning: "Market value relative to accounting net assets.",
    tip: "More useful for banks/asset-heavy firms than for asset-light software.",
  },
  {
    id: "ev-ebitda",
    name: "EV / EBITDA",
    category: "Valuation",
    formula: "EV/EBITDA = Enterprise Value ÷ EBITDA",
    meaning: "Capital-structure-neutral multiple of operating cash earnings proxy.",
    tip: "Watch one-offs in EBITDA and net debt inside EV.",
  },
  {
    id: "eps",
    name: "Earnings per Share (EPS)",
    category: "Per-share",
    formula: "EPS = Net Income ÷ Weighted Average Shares Outstanding",
    meaning: "Accounting profit attributable to each share.",
    tip: "Prefer diluted EPS when convertibles/options matter.",
  },
  {
    id: "div-yield",
    name: "Dividend Yield",
    category: "Per-share",
    formula: "Dividend Yield = Annual Dividend per Share ÷ Price",
    meaning: "Cash income return from dividends at today’s price.",
    tip: "Very high yields can signal dividend cut risk.",
  },
  {
    id: "roe",
    name: "Return on Equity (ROE)",
    category: "Profitability",
    formula: "ROE = Net Income ÷ Average Shareholders’ Equity",
    meaning: "How efficiently equity capital generates profit.",
    tip: "Leverage can inflate ROE — pair with debt ratios.",
  },
  {
    id: "roa",
    name: "Return on Assets (ROA)",
    category: "Profitability",
    formula: "ROA = Net Income ÷ Average Total Assets",
    meaning: "Profit generated per unit of assets.",
    tip: "Useful across capital-intensity differences within a sector.",
  },
  {
    id: "gross-margin",
    name: "Gross Margin",
    category: "Profitability",
    formula: "Gross Margin = (Revenue − COGS) ÷ Revenue",
    meaning: "Profitability after direct product/service costs.",
    tip: "Track trend and peer gap — pricing power often shows here.",
  },
  {
    id: "op-margin",
    name: "Operating Margin",
    category: "Profitability",
    formula: "Operating Margin = Operating Income ÷ Revenue",
    meaning: "Core business profitability after operating expenses.",
    tip: "Watch classification games between COGS and OpEx.",
  },
  {
    id: "current-ratio",
    name: "Current Ratio",
    category: "Liquidity",
    formula: "Current Ratio = Current Assets ÷ Current Liabilities",
    meaning: "Ability to cover short-term obligations with short-term assets.",
    tip: ">1 is common, but inventory-heavy firms can look safer than they are.",
  },
  {
    id: "acid-test",
    name: "Acid Test (Quick Ratio)",
    category: "Liquidity",
    formula: "Quick Ratio = (Cash + Marketable Securities + Receivables) ÷ Current Liabilities",
    meaning: "Strict liquidity — excludes inventory and prepaid items.",
    tip: "Better stress test than current ratio for inventory risk.",
  },
  {
    id: "interest-cover",
    name: "Interest Coverage",
    category: "Leverage",
    formula: "Interest Coverage = EBIT ÷ Interest Expense",
    meaning: "How many times operating profit covers interest.",
    tip: "Falling coverage is an early distress signal.",
  },
  {
    id: "de",
    name: "Debt / Equity",
    category: "Leverage",
    formula: "D/E = Total Interest-Bearing Debt ÷ Shareholders’ Equity",
    meaning: "Financial leverage of the capital structure.",
    tip: "Compare within industry; some sectors run naturally higher leverage.",
  },
  {
    id: "fcf",
    name: "Free Cash Flow (FCF)",
    category: "Portfolio",
    formula: "FCF ≈ Operating Cash Flow − Capital Expenditures",
    meaning: "Cash left after maintaining/growing the asset base.",
    tip: "Bridge from net income: add back non-cash, subtract WC and CapEx.",
  },
  {
    id: "mos",
    name: "Margin of Safety",
    category: "Portfolio",
    formula: "Margin of Safety = (Intrinsic Value − Price) ÷ Intrinsic Value",
    meaning: "Cushion between estimated worth and market price.",
    tip: "Wider MoS when uncertainty or model error is high.",
  },
  {
    id: "expected-return",
    name: "Simple Expected Return",
    category: "Portfolio",
    formula: "E[R] = Σ (Probabilityᵢ × Returnᵢ)",
    meaning: "Probability-weighted average of scenario returns.",
    tip: "Always pair with downside / path risk, not just the mean.",
  },
  {
    id: "portfolio-weight",
    name: "Position Weight",
    category: "Portfolio",
    formula: "Weight = Position Market Value ÷ Total Portfolio Value",
    meaning: "Share of risk capital in one holding.",
    tip: "Mandate limits usually cap single-name and sector weights.",
  },
  {
    id: "cagr",
    name: "CAGR",
    category: "Portfolio",
    formula: "CAGR = (Ending Value ÷ Beginning Value)^(1/n) − 1",
    meaning: "Smoothed annualized growth over n years.",
    tip: "Hides path and drawdowns — still review max drawdown.",
  },
];

export function formulaeByCategory(): Record<FormulaCategory, FormulaEntry[]> {
  return FORMULAE.reduce(
    (acc, f) => {
      (acc[f.category] ||= []).push(f);
      return acc;
    },
    {} as Record<FormulaCategory, FormulaEntry[]>,
  );
}
