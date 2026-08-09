import { redirect, notFound } from "next/navigation";
import { loadState } from "@/lib/session";
import { getSidequest } from "@/lib/content/sidequests";
import { StatusBar } from "@/components/StatusBar";
import { CandleChart } from "@/components/CandleChart";
import { FOREX_CANDLES, STOCK_CANDLES } from "@/lib/content/markets";
import { SidequestClient } from "./SidequestClient";

export default async function SidequestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const state = await loadState();
  if (!state) redirect("/api/demo-launch");
  if (state.inDetention) redirect("/detention");
  const quest = getSidequest(id);
  if (!quest) notFound();

  const showForex = quest.kind === "forex-trade";
  const showStock =
    quest.kind === "stock-trade" ||
    quest.kind === "buy-company" ||
    quest.kind === "super-chest";

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6">
      <StatusBar state={state} />
      <section className="panel rounded-2xl p-5 sm:p-7">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
          {quest.kind === "super-chest" ? "Super side quest" : "Side quest"} ·{" "}
          {quest.risk} risk
        </p>
        <h1 className="display mt-2 text-3xl text-[var(--gold)]">{quest.title}</h1>
        <p className="mt-3 text-[var(--muted)]">{quest.summary}</p>
        {quest.chestGold ? (
          <p className="mt-2 text-[var(--gold)]">
            Wealth chest: {quest.chestGold} gold bars on success
          </p>
        ) : null}
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <article className="rounded-xl border border-[var(--path)]/25 bg-black/20 p-4">
            <h2 className="display text-xl text-[var(--gold)]">Decision</h2>
            <p className="mt-2">{quest.prompt}</p>
            <SidequestClient quest={quest} />
          </article>
          <div className="space-y-4">
            {showStock ? (
              <CandleChart title="Stock reference" candles={STOCK_CANDLES.VALUECO} />
            ) : null}
            {showForex ? (
              <CandleChart title="Forex reference" candles={FOREX_CANDLES.EURUSD} />
            ) : (
              <CandleChart title="Market weather" candles={STOCK_CANDLES.AAPL_SIM} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
