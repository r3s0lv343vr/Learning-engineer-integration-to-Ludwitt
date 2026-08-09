import Link from "next/link";
import type { GameState } from "@/lib/types";
import { portfolioValue } from "@/lib/game-state";
import { CreditsBadge } from "@/components/CreditsBadge";

export function StatusBar({ state }: { state: GameState }) {
  return (
    <header className="panel mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3">
      <div className="flex items-center gap-3">
        <Link href="/map" className="display text-lg text-[var(--gold)]">
          AI Investment Learning Simulator
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <CreditsBadge />
        <div className="flex items-center gap-1" aria-label={`${state.hearts} hearts`}>
          {Array.from({ length: state.maxHearts }).map((_, i) => (
            <span key={i} className={i < state.hearts ? "heart" : "opacity-25"}>
              ♥
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="gold-bar" />
          <strong>{state.goldBars}</strong>
          <span className="text-[var(--muted)]">gold</span>
        </div>
        <div>
          <span className="text-[var(--muted)]">Book </span>
          <strong>${portfolioValue(state).toLocaleString()}</strong>
        </div>
        <nav className="flex gap-2">
          <Link className="btn btn-ghost px-3 py-1 text-xs" href="/markets">
            Markets
          </Link>
          <Link className="btn btn-ghost px-3 py-1 text-xs" href="/portfolio">
            Portfolio
          </Link>
          <Link className="btn btn-ghost px-3 py-1 text-xs" href="/auth/logout">
            Exit
          </Link>
        </nav>
      </div>
    </header>
  );
}
