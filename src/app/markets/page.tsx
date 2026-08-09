import Link from "next/link";
import { CandleChart } from "@/components/CandleChart";
import { NewsTicker } from "@/components/NewsTicker";
import {
  FOREX_CANDLES,
  MARKET_EVENTS,
  STOCK_CANDLES,
} from "@/lib/content/markets";
import { fetchNews } from "@/lib/content/news";

export default async function MarketsPage() {
  const news = await fetchNews();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="display text-3xl text-[var(--gold)]">Markets & News</h1>
          <p className="text-[var(--muted)]">
            Reference tapes and headlines for quest decisions.
          </p>
        </div>
        <Link href="/" className="btn btn-ghost">
          Home
        </Link>
      </div>
      <NewsTicker items={news} />
      <div className="grid gap-4 lg:grid-cols-2">
        <CandleChart title="GROWTHX (stock)" candles={STOCK_CANDLES.GROWTHX} />
        <CandleChart title="VALUECO (stock)" candles={STOCK_CANDLES.VALUECO} />
        <CandleChart title="EURUSD (forex)" candles={FOREX_CANDLES.EURUSD} />
        <CandleChart title="USDJPY (forex)" candles={FOREX_CANDLES.USDJPY} />
      </div>
      <section className="panel rounded-2xl p-5">
        <h2 className="display text-xl text-[var(--gold)]">Simulated world events</h2>
        <ul className="mt-4 space-y-3">
          {MARKET_EVENTS.map((e) => (
            <li
              key={e.id}
              className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"
            >
              <div className="text-xs uppercase tracking-wider text-[var(--accent)]">
                {e.sector}
              </div>
              <div className="font-bold">{e.headline}</div>
              <div className="text-sm text-[var(--muted)]">{e.impact}</div>
            </li>
          ))}
        </ul>
        <h2 className="display mt-8 text-xl text-[var(--gold)]">Headlines</h2>
        <ul className="mt-4 space-y-3">
          {news.map((n) => (
            <li
              key={n.id}
              className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"
            >
              <div className="text-xs text-[var(--muted)]">
                {n.source} · {new Date(n.publishedAt).toLocaleString()}
              </div>
              <div className="font-bold">{n.title}</div>
              <div className="text-sm text-[var(--muted)]">{n.summary}</div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
