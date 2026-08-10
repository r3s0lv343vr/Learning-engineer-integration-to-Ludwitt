"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { TradeArea, TradeChoice } from "@/lib/content/trades";
import { tradeCapitalDelta } from "@/lib/content/trades";

/**
 * Stub client for city trade areas.
 * Choices apply gain/loss to portfolio cash; richer scenarios can plug in later
 * via TradeArea.scenarioReady + expanded prompts/choices in trades.ts.
 */
export function TradeClient({
  trade,
  alreadyDone,
}: {
  trade: TradeArea;
  alreadyDone: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<string | null>(null);

  function choose(choice: TradeChoice) {
    if (alreadyDone) return;
    startTransition(async () => {
      const capitalDelta = tradeCapitalDelta(trade, choice.outcome);
      await fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "trade_area",
          tradeId: trade.id,
          outcome: choice.outcome,
          capitalDelta,
          goldReward: trade.goldReward,
        }),
      });
      const sign = capitalDelta >= 0 ? "+" : "";
      setResult(
        `${choice.feedback} Portfolio ${sign}$${capitalDelta.toLocaleString()}.`,
      );
      setTimeout(() => {
        router.push("/map");
        router.refresh();
      }, 1500);
    });
  }

  if (alreadyDone) {
    return (
      <p className="mt-4 rounded-lg border border-[var(--path)]/30 bg-black/30 p-3 text-sm text-[var(--muted)]">
        Trade settled. Further scenario layers can be added here later without
        moving the map pin.
      </p>
    );
  }

  return (
    <div className="mt-4 space-y-2">
      {trade.choices.map((c) => (
        <button
          key={c.label}
          type="button"
          className="btn btn-ghost w-full justify-start text-left"
          disabled={pending || Boolean(result)}
          onClick={() => choose(c)}
        >
          <span>{c.label}</span>
          <span
            className={`ml-2 text-xs ${
              c.outcome === "gain" ? "text-[var(--accent)]" : "text-red-300"
            }`}
          >
            {c.outcome === "gain" ? "may raise book" : "may lower book"}
          </span>
        </button>
      ))}
      {result ? (
        <p className="rounded-lg bg-black/30 p-3 text-[var(--muted)]">{result}</p>
      ) : null}
    </div>
  );
}
