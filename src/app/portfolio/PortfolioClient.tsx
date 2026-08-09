"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { Holding } from "@/lib/types";

const CATALOG: Holding[] = [
  {
    id: "etf-vwrl",
    symbol: "VWRL",
    name: "World Equity ETF",
    assetClass: "etf",
    shares: 5,
    avgCost: 110,
    lastPrice: 112,
  },
  {
    id: "stock-valueco",
    symbol: "VALUECO",
    name: "ValueCo Industries",
    assetClass: "stock",
    shares: 10,
    avgCost: 40,
    lastPrice: 42,
  },
  {
    id: "reit-coast",
    symbol: "CREIT",
    name: "Coastal REIT",
    assetClass: "reit",
    shares: 8,
    avgCost: 27,
    lastPrice: 28,
  },
  {
    id: "bond-short",
    symbol: "SHY",
    name: "Short Treasury ETF",
    assetClass: "bond",
    shares: 12,
    avgCost: 81,
    lastPrice: 80.5,
  },
  {
    id: "fx-eur",
    symbol: "EURUSD",
    name: "Euro spot sleeve",
    assetClass: "forex",
    shares: 1000,
    avgCost: 1.08,
    lastPrice: 1.085,
  },
];

export function PortfolioClient({ holdings }: { holdings: Holding[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function trade(holding: Holding, mode: "add" | "remove") {
    startTransition(async () => {
      await fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "trade", holding, mode }),
      });
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "portfolio_trade_executed",
          metadata: { symbol: holding.symbol, mode },
        }),
      });
      router.refresh();
    });
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <div>
        <h2 className="display text-xl text-[var(--gold)]">Your holdings</h2>
        <div className="mt-3 space-y-2">
          {holdings.length === 0 ? (
            <p className="text-[var(--muted)]">No assets yet — add from the catalog.</p>
          ) : (
            holdings.map((h) => (
              <div
                key={h.id}
                className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3"
              >
                <div>
                  <div className="font-bold">
                    {h.symbol} · {h.name}
                  </div>
                  <div className="text-sm text-[var(--muted)]">
                    {h.shares} @ ${h.avgCost} → ${h.lastPrice}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost px-3 py-1 text-xs"
                  disabled={pending}
                  onClick={() => trade(h, "remove")}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <h2 className="display text-xl text-[var(--gold)]">Add assets</h2>
        <div className="mt-3 space-y-2">
          {CATALOG.map((h) => (
            <div
              key={h.id}
              className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3"
            >
              <div>
                <div className="font-bold">
                  {h.symbol} · {h.name}
                </div>
                <div className="text-sm text-[var(--muted)]">
                  Buy {h.shares} · {h.assetClass} · ${h.avgCost}
                </div>
              </div>
              <button
                type="button"
                className="btn btn-forest px-3 py-1 text-xs"
                disabled={pending}
                onClick={() => trade({ ...h, id: `${h.id}-${Date.now()}` }, "add")}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
