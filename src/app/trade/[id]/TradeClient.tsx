"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import type {
  TradeArea,
  TradeChoice,
  TradeDataBlock,
  TradeStep,
} from "@/lib/content/trades";
import { tradeHasSteps } from "@/lib/content/trades";

function DataPanel({ block }: { block: TradeDataBlock }) {
  if (block.kind === "table") {
    return (
      <div className="rounded-lg border border-[var(--path)]/25 bg-black/25 p-3">
        <p className="text-xs uppercase tracking-wide text-[var(--accent)]">
          {block.title}
        </p>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[16rem] text-left text-sm">
            <thead>
              <tr>
                {block.headers.map((h) => (
                  <th key={h} className="border-b border-white/10 pb-1 pr-3 text-[var(--gold)]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={`${row[0]}-${i}`}>
                  {row.map((cell, j) => (
                    <td key={`${i}-${j}`} className="py-1 pr-3 text-[var(--muted)]">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  if (block.kind === "news") {
    return (
      <div className="rounded-lg border border-[var(--path)]/25 bg-black/25 p-3">
        <p className="text-xs uppercase tracking-wide text-[var(--accent)]">
          {block.title}
        </p>
        <ul className="mt-2 space-y-2">
          {block.items.map((item) => (
            <li key={item.headline} className="text-sm">
              <p className="font-semibold text-[var(--ink)]">{item.headline}</p>
              <p className="text-xs text-[var(--muted)]">
                {item.source}
                {item.note ? ` · ${item.note}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (block.kind === "calc") {
    return (
      <div className="rounded-lg border border-[var(--path)]/25 bg-black/25 p-3">
        <p className="text-xs uppercase tracking-wide text-[var(--accent)]">
          {block.title}
        </p>
        <pre className="mt-2 whitespace-pre-wrap font-mono text-xs leading-relaxed text-[var(--ink)]">
          {block.lines.join("\n")}
        </pre>
      </div>
    );
  }
  return (
    <div className="rounded-lg border border-[var(--path)]/25 bg-black/25 p-3">
      <p className="text-xs uppercase tracking-wide text-[var(--accent)]">
        {block.title}
      </p>
      <dl className="mt-2 grid gap-1 text-sm">
        {block.items.map((item) => (
          <div key={item.label} className="flex flex-wrap justify-between gap-2">
            <dt className="text-[var(--muted)]">{item.label}</dt>
            <dd className="font-semibold text-[var(--ink)]">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function StepView({
  step,
  part,
  total,
  pending,
  onChoose,
}: {
  step: TradeStep;
  part: number;
  total: number;
  pending: boolean;
  onChoose: (choice: TradeChoice) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
          Sword part {part} / {total}
        </p>
        <h3 className="display mt-1 text-xl text-[var(--gold)]">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]">
          {step.narrative}
        </p>
      </div>
      <div className="space-y-3">
        {step.data.map((block) => (
          <DataPanel key={`${block.kind}-${block.title}`} block={block} />
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
          Your decision
        </p>
        {step.choices.map((c) => (
          <button
            key={c.id ?? c.label}
            type="button"
            className="btn btn-ghost w-full justify-start text-left"
            disabled={pending}
            onClick={() => onChoose(c)}
          >
            <span>{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * City sword / trade client.
 * Multi-step Coral Bay games chain 3–5 decisions; legacy cities stay single-choice.
 * Final capital impact is resolved server-side from the choice path.
 */
export function TradeClient({
  trade,
  alreadyDone,
  startingCapital,
}: {
  trade: TradeArea;
  alreadyDone: boolean;
  startingCapital: number;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [stepIndex, setStepIndex] = useState(0);
  const [choiceIds, setChoiceIds] = useState<string[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const multi = tradeHasSteps(trade);
  const steps = trade.steps ?? [];
  const step = steps[stepIndex];

  const progressLabel = useMemo(() => {
    if (!multi) return null;
    return `Decision trail: ${choiceIds.length} / ${steps.length}`;
  }, [multi, choiceIds.length, steps.length]);

  function finishPath(ids: string[]) {
    startTransition(async () => {
      const res = await fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "trade_area",
          tradeId: trade.id,
          choiceIds: ids,
          startingCapital,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult(data.error ?? "Trade could not be settled.");
        return;
      }
      const delta = Number(data.tradeResult?.capitalDelta ?? 0);
      const sign = delta >= 0 ? "+" : "";
      const pct =
        startingCapital > 0
          ? ` (${sign}${((delta / startingCapital) * 100).toFixed(1)}%)`
          : "";
      setResult(
        `Sword settled. Portfolio ${sign}$${delta.toLocaleString()}${pct}. Returning to map…`,
      );
      setTimeout(() => {
        router.push("/map");
        router.refresh();
      }, 1800);
    });
  }

  function onStepChoose(choice: TradeChoice) {
    if (alreadyDone || !step) return;
    const id = choice.id ?? choice.label;
    const nextIds = [...choiceIds, id];
    setChoiceIds(nextIds);
    setLog((prev) => [...prev, choice.feedback]);
    if (stepIndex >= steps.length - 1) {
      finishPath(nextIds);
      return;
    }
    setStepIndex((i) => i + 1);
  }

  function onLegacyChoose(choice: TradeChoice) {
    if (alreadyDone) return;
    startTransition(async () => {
      const res = await fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "trade_area",
          tradeId: trade.id,
          choiceLabel: choice.label,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult(data.error ?? "Trade could not be settled.");
        return;
      }
      const delta = Number(data.tradeResult?.capitalDelta ?? 0);
      const sign = delta >= 0 ? "+" : "";
      setResult(
        `${choice.feedback} Portfolio ${sign}$${delta.toLocaleString()}.`,
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
        Sword settled. This trade already moved portfolio capital — replay is
        locked so the book stays consistent.
      </p>
    );
  }

  if (result) {
    return (
      <div className="mt-4 space-y-3">
        {log.length > 0 ? (
          <ul className="space-y-1 text-sm text-[var(--muted)]">
            {log.map((line) => (
              <li key={line}>• {line}</li>
            ))}
          </ul>
        ) : null}
        <p className="rounded-lg bg-black/30 p-3 text-[var(--ink)]">{result}</p>
      </div>
    );
  }

  if (multi && step) {
    return (
      <div className="mt-4 space-y-4">
        {progressLabel ? (
          <p className="text-xs text-[var(--muted)]">{progressLabel}</p>
        ) : null}
        {log.length > 0 ? (
          <div className="rounded-lg border border-[var(--path)]/20 bg-black/20 p-3">
            <p className="text-xs uppercase tracking-wide text-[var(--gold)]">
              Earlier decisions
            </p>
            <ul className="mt-1 space-y-1 text-xs text-[var(--muted)]">
              {log.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <StepView
          step={step}
          part={stepIndex + 1}
          total={steps.length}
          pending={pending}
          onChoose={onStepChoose}
        />
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-2">
      <p className="text-sm">{trade.prompt}</p>
      {trade.choices.map((c) => (
        <button
          key={c.label}
          type="button"
          className="btn btn-ghost w-full justify-start text-left"
          disabled={pending}
          onClick={() => onLegacyChoose(c)}
        >
          <span>{c.label}</span>
        </button>
      ))}
    </div>
  );
}
