import { redirect, notFound } from "next/navigation";
import { loadState } from "@/lib/session";
import { getModule } from "@/lib/content/modules";
import { StatusBar } from "@/components/StatusBar";
import { CandleChart } from "@/components/CandleChart";
import { FOREX_CANDLES, STOCK_CANDLES } from "@/lib/content/markets";
import { QuestClient } from "./QuestClient";

export default async function QuestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const state = await loadState();
  if (!state) redirect("/api/demo-launch");
  if (state.inDetention) redirect("/detention");
  const mod = getModule(id);
  if (!mod) notFound();
  const unlocked =
    state.unlockedModules.includes(mod.id) ||
    state.completedModules.includes(mod.id);
  if (!unlocked) redirect("/map");

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6">
      <StatusBar state={state} />
      <section className="panel rounded-2xl p-5 sm:p-7">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
          Module {mod.number} · {mod.mapLabel}
        </p>
        <h1 className="display mt-2 text-3xl text-[var(--gold)] sm:text-4xl">
          {mod.title}
        </h1>
        <p className="mt-3 max-w-3xl text-[var(--muted)]">{mod.summary}</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <article className="rounded-xl border border-[var(--path)]/25 bg-black/20 p-4">
            <h2 className="display text-xl text-[var(--gold)]">Learn</h2>
            <p className="mt-2 leading-relaxed">{mod.lesson}</p>
            <h3 className="mt-4 font-bold">Scenario</h3>
            <p className="mt-1 text-[var(--muted)]">{mod.scenario}</p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
              {mod.concepts.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </article>
          <div className="space-y-4">
            <CandleChart title="Equity tape" candles={STOCK_CANDLES.GROWTHX} />
            <CandleChart title="EURUSD tape" candles={FOREX_CANDLES.EURUSD} />
          </div>
        </div>
        <QuestClient moduleId={mod.id} questions={mod.questions} />
      </section>
    </main>
  );
}
