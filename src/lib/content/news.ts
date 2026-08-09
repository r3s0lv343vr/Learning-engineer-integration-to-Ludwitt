export type NewsItem = {
  id: string;
  source: string;
  title: string;
  summary: string;
  sector: "stock" | "forex" | "real-estate" | "industry" | "macro";
  publishedAt: string;
  url?: string;
};

/** Curated near-real headlines for decision practice when no news API key is set. */
export const CURATED_NEWS: NewsItem[] = [
  {
    id: "n1",
    source: "Questfolio Wire",
    title: "Treasury yields firm as markets brace for inflation data",
    summary:
      "Front-end yields bid higher overnight. Rate-sensitive growth stocks and long bonds are in focus for the session.",
    sector: "macro",
    publishedAt: "2026-08-09T12:00:00.000Z",
  },
  {
    id: "n2",
    source: "Questfolio Wire",
    title: "EUR slips versus USD after divergent policy signals",
    summary:
      "FX desks cite rate differentials and growth surprises. Watch EURUSD candles for continuation versus mean reversion.",
    sector: "forex",
    publishedAt: "2026-08-09T13:15:00.000Z",
  },
  {
    id: "n3",
    source: "Questfolio Wire",
    title: "Retail REIT softens as shopper traffic misses estimates",
    summary:
      "Listed property vehicles price in slower occupancy growth. Dividend coverage and refinancing walls remain key.",
    sector: "real-estate",
    publishedAt: "2026-08-09T14:05:00.000Z",
  },
  {
    id: "n4",
    source: "Questfolio Wire",
    title: "Chip equipment names mixed after fresh export-rule chatter",
    summary:
      "Industry supply chains reassess lead times. Domestic fab beneficiaries see relative bids.",
    sector: "industry",
    publishedAt: "2026-08-09T15:20:00.000Z",
  },
  {
    id: "n5",
    source: "Questfolio Wire",
    title: "Mega-cap earnings: beat on EPS, cautious margin guide",
    summary:
      "Shares can fall on 'good' prints when guidance undershoots what was priced in. Separate noise from thesis breaks.",
    sector: "stock",
    publishedAt: "2026-08-09T16:10:00.000Z",
  },
  {
    id: "n6",
    source: "Questfolio Wire",
    title: "Crude inventories build; energy complex trades mixed",
    summary:
      "Commodity tape reflects growth worries versus supply discipline. Position sizing matters more than the headline.",
    sector: "industry",
    publishedAt: "2026-08-09T17:00:00.000Z",
  },
];

export async function fetchNews(): Promise<NewsItem[]> {
  const key = process.env.FINNHUB_API_KEY;
  if (!key) return CURATED_NEWS;

  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/news?category=general&token=${key}`,
      { next: { revalidate: 600 } },
    );
    if (!res.ok) return CURATED_NEWS;
    const data = (await res.json()) as Array<{
      id: number;
      headline: string;
      summary: string;
      source: string;
      datetime: number;
      url: string;
    }>;
    return data.slice(0, 8).map((n) => ({
      id: `fh-${n.id}`,
      source: n.source || "Finnhub",
      title: n.headline,
      summary: n.summary || n.headline,
      sector: "macro" as const,
      publishedAt: new Date(n.datetime * 1000).toISOString(),
      url: n.url,
    }));
  } catch {
    return CURATED_NEWS;
  }
}
