export type Candle = {
  t: string;
  o: number;
  h: number;
  l: number;
  c: number;
};

function series(
  seed: number,
  start: number,
  points: number,
  drift: number,
  vol: number,
): Candle[] {
  let price = start;
  const out: Candle[] = [];
  for (let i = 0; i < points; i++) {
    const shock =
      Math.sin((seed + i) * 1.7) * vol +
      Math.cos((seed + i) * 0.6) * vol * 0.5 +
      drift;
    const o = price;
    const c = Math.max(0.5, o + shock);
    const h = Math.max(o, c) + Math.abs(Math.sin(seed + i)) * vol;
    const l = Math.min(o, c) - Math.abs(Math.cos(seed + i)) * vol;
    out.push({
      t: `T${i + 1}`,
      o: round(o),
      h: round(h),
      l: round(Math.max(0.1, l)),
      c: round(c),
    });
    price = c;
  }
  return out;
}

function round(n: number) {
  return Math.round(n * 100) / 100;
}

/** Simulated but decision-useful tapes (stock + forex). */
export const STOCK_CANDLES: Record<string, Candle[]> = {
  AAPL_SIM: series(3, 188, 28, 0.15, 1.8),
  VALUECO: series(11, 42, 28, -0.05, 1.1),
  GROWTHX: series(7, 96, 28, 0.35, 2.6),
  RETAIL_REIT: series(19, 28, 28, -0.12, 0.9),
};

export const FOREX_CANDLES: Record<string, Candle[]> = {
  EURUSD: series(5, 1.085, 28, -0.0012, 0.004),
  GBPUSD: series(9, 1.265, 28, 0.0004, 0.005),
  USDJPY: series(13, 148.2, 28, 0.08, 0.35),
};

export const MARKET_EVENTS = [
  {
    id: "evt-rates",
    sector: "macro",
    headline: "Policy desk prices another hike as core inflation re-accelerates",
    impact: "Long-duration equities and bonds face higher discount rates.",
  },
  {
    id: "evt-semis",
    sector: "industry",
    headline: "Export controls tighten on advanced chip equipment",
    impact: "Supply chains and geopolitically exposed semis reprice.",
  },
  {
    id: "evt-housing",
    sector: "real-estate",
    headline: "Mortgage rates climb; housing transaction volumes cool",
    impact: "REITs and homebuilders sensitive to financing costs.",
  },
  {
    id: "evt-fx",
    sector: "forex",
    headline: "Dollar strengthens on rate differentials",
    impact: "EURUSD softens; multinational earnings translation shifts.",
  },
  {
    id: "evt-earnings",
    sector: "stock",
    headline: "Mega-cap beats on EPS but guides margins lower",
    impact: "Classic expectations gap — growth without multiple expansion.",
  },
];
