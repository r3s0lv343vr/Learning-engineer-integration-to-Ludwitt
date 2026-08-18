import { redirect } from "next/navigation";
import Link from "next/link";
import { loadState } from "@/lib/session";
import { StatusBar } from "@/components/StatusBar";
import { FORMULAE, formulaeByCategory } from "@/lib/content/formulae";

export default async function FormulaePage() {
  const state = await loadState();
  if (!state) redirect("/api/demo-launch");

  const grouped = formulaeByCategory();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6">
      <StatusBar state={state} />
      <section className="panel rounded-2xl p-5 sm:p-7">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="display text-3xl text-[var(--gold)]">Formulae Desk</h1>
            <p className="mt-1 max-w-2xl text-[var(--muted)]">
              Quick reference for valuation, liquidity, leverage, and portfolio
              maths — including P/E and the acid-test (quick) ratio.
            </p>
          </div>
          <Link href="/map" className="btn btn-ghost text-sm">
            Back to map
          </Link>
        </div>

        <p className="mb-6 text-xs text-[var(--muted)]">
          {FORMULAE.length} formulae · use beside modules and compulsory exams
        </p>

        <div className="space-y-8">
          {(Object.keys(grouped) as Array<keyof typeof grouped>).map((cat) => (
            <div key={cat}>
              <h2 className="display text-xl text-[var(--accent)]">{cat}</h2>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {grouped[cat].map((f) => (
                  <article
                    key={f.id}
                    className="rounded-xl border border-[var(--path)]/30 bg-black/25 p-4"
                  >
                    <h3 className="font-bold text-[var(--gold)]">{f.name}</h3>
                    <p className="mt-2 font-mono text-sm text-[var(--ink)]">
                      {f.formula}
                    </p>
                    <p className="mt-2 text-sm text-[var(--muted)]">{f.meaning}</p>
                    <p className="mt-2 text-xs text-[var(--accent)]">Tip: {f.tip}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
