import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { loadState } from "@/lib/session";
import { StatusBar } from "@/components/StatusBar";
import { areaById } from "@/lib/content/areas";
import { getTrade, tradeHasSteps, tradesForArea } from "@/lib/content/trades";
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
  const multi = tradeHasSteps(trade);

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
                Sword · {area.name} · {trade.risk} risk
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

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <article className="rounded-xl border border-[var(--path)]/25 bg-black/20 p-4">
            <h2 className="display text-xl text-[var(--gold)]">
              {multi ? "Investment scenario" : "Decision"}
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {multi
                ? `${trade.steps!.length} linked parts. Each decision can raise or lower book value by a percentage of your capital. Use the research data — financials, news, and calculations — before you choose.`
                : "Completing this trade can raise or lower portfolio book value."}
            </p>
            <TradeClient
              trade={trade}
              alreadyDone={done}
              startingCapital={state.capital}
            />
          </article>
          <article className="rounded-xl border border-[var(--path)]/25 bg-black/20 p-4">
            <h2 className="display text-xl text-[var(--accent)]">Sword brief</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
              <li>
                Current book capital: ${state.capital.toLocaleString()}
              </li>
              {multi ? (
                <>
                  <li>
                    Parts in this sword: {trade.steps!.length} (linked decisions)
                  </li>
                  <li>
                    Outcomes compound as % moves on capital — strong process
                    tends to lift the book; weak process tends to cut it.
                  </li>
                </>
              ) : (
                <>
                  <li>Gain path: +${trade.capitalDeltaGain.toLocaleString()}</li>
                  <li>Loss path: ${trade.capitalDeltaLoss.toLocaleString()}</li>
                </>
              )}
              {trade.goldReward ? (
                <li>Gold possible on a net gain: {trade.goldReward}</li>
              ) : null}
            </ul>
            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
                Other {area.name} swords
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
