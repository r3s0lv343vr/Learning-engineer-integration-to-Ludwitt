import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { loadState } from "@/lib/session";
import { StatusBar } from "@/components/StatusBar";
import { areaById } from "@/lib/content/areas";
import { getTrade, tradesForArea } from "@/lib/content/trades";
import { TradeClient } from "./TradeClient";

export default async function TradePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const state = await loadState();
  if (!state) redirect("/api/demo-launch");
  if (state.inDetention) redirect("/detention");

  const trade = getTrade(id);
  if (!trade) notFound();

  const area = areaById(trade.areaId);
  const done = (state.completedTrades ?? []).includes(trade.id);
  const siblings = tradesForArea(trade.areaId);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6">
      <StatusBar state={state} />
      <section className="panel rounded-2xl p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/trade-sword-icon.png"
              alt=""
              width={72}
              height={72}
              className="trade-hero-icon"
            />
            <div>
              <p
                className="text-sm uppercase tracking-[0.2em]"
                style={{ color: area.color }}
              >
                Trade area · {area.name} · {trade.risk} risk
              </p>
              <h1 className="display mt-1 text-3xl text-[var(--gold)]">
                {trade.title}
              </h1>
              <p className="mt-2 max-w-2xl text-[var(--muted)]">{trade.summary}</p>
            </div>
          </div>
          <Link href="/map" className="btn btn-ghost text-sm">
            Back to map
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <article className="rounded-xl border border-[var(--path)]/25 bg-black/20 p-4">
            <h2 className="display text-xl text-[var(--gold)]">Decision</h2>
            <p className="mt-2">{trade.prompt}</p>
            <p className="mt-2 text-xs text-[var(--muted)]">
              Completing this trade can raise or lower portfolio book value.
              Scenario scaffolding is ready for deeper trade narratives.
            </p>
            <TradeClient trade={trade} alreadyDone={done} />
          </article>
          <article className="rounded-xl border border-[var(--path)]/25 bg-black/20 p-4">
            <h2 className="display text-xl text-[var(--accent)]">
              Scenario bay (ready)
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              This desk is flagged <code>scenarioReady</code> for future layers:
              multi-step negotiations, counterparty risk, and capital ladders
              that unlock more book growth.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
              <li>Gain path: +${trade.capitalDeltaGain.toLocaleString()}</li>
              <li>Loss path: ${trade.capitalDeltaLoss.toLocaleString()}</li>
              {trade.goldReward ? (
                <li>Gold on gain: {trade.goldReward}</li>
              ) : null}
            </ul>
            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
                Other {area.name} trades
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {siblings.map((s) => (
                  <Link
                    key={s.id}
                    href={`/trade/${s.id}`}
                    className={`rounded-full border px-3 py-1 text-xs ${
                      s.id === trade.id
                        ? "border-[var(--gold)] text-[var(--gold)]"
                        : "border-[var(--path)]/40 text-[var(--muted)]"
                    }`}
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
