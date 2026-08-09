import { redirect } from "next/navigation";
import { loadState } from "@/lib/session";
import { portfolioValue } from "@/lib/game-state";
import { StatusBar } from "@/components/StatusBar";
import { PortfolioClient } from "./PortfolioClient";

export default async function PortfolioPage() {
  const state = await loadState();
  if (!state) redirect("/api/demo-launch");

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6">
      <StatusBar state={state} />
      <section className="panel rounded-2xl p-5 sm:p-7">
        <h1 className="display text-3xl text-[var(--gold)]">Portfolio Lab</h1>
        <p className="mt-2 text-[var(--muted)]">
          Starting capital $14,800. Add or remove assets. Profile:{" "}
          <strong>{state.investorProfile}</strong>
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Stat label="Cash" value={`$${state.cash.toLocaleString()}`} />
          <Stat
            label="Holdings"
            value={`$${(portfolioValue(state) - state.cash).toLocaleString()}`}
          />
          <Stat label="Total book" value={`$${portfolioValue(state).toLocaleString()}`} />
        </div>
        <PortfolioClient holdings={state.holdings} />
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--path)]/25 bg-black/20 p-4">
      <div className="text-xs uppercase tracking-wider text-[var(--muted)]">
        {label}
      </div>
      <div className="display mt-1 text-2xl text-[var(--gold)]">{value}</div>
    </div>
  );
}
