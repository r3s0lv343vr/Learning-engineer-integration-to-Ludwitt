"use client";

import { useState, useTransition } from "react";

export function AiMentor({
  moduleId,
  context,
}: {
  moduleId?: string;
  context?: string;
}) {
  const [question, setQuestion] = useState(
    "How should I think about risk before this decision?",
  );
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [topUp, setTopUp] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function ask() {
    startTransition(async () => {
      setError(null);
      setTopUp(null);
      setAnswer(null);
      const res = await fetch("/api/ai/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, moduleId, context }),
      });
      const data = await res.json();
      if (res.status === 402) {
        setError(data.message || "Insufficient Ludwitt paid credits.");
        setTopUp(data.topUpUrl || "https://pitchrise.ludwitt.com/account/credits");
        return;
      }
      if (!res.ok) {
        setError(data.message || data.error || "AI mentor unavailable.");
        return;
      }
      setAnswer(data.text || "No feedback returned.");
    });
  }

  return (
    <div className="mt-6 rounded-xl border border-[var(--path)]/30 bg-black/25 p-4">
      <h3 className="display text-xl text-[var(--gold)]">AI Mentor</h3>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Adaptive feedback via Ludwitt AI proxy (uses paid credits /{" "}
        <code>spendableCents</code>).
      </p>
      <textarea
        className="mt-3 w-full rounded-lg border border-white/15 bg-black/30 p-3 text-sm"
        rows={3}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        type="button"
        className="btn btn-gold mt-3"
        disabled={pending || !question.trim()}
        onClick={ask}
      >
        {pending ? "Asking…" : "Ask mentor"}
      </button>
      {error ? (
        <p className="mt-3 rounded-lg bg-[var(--danger)]/15 p-3 text-sm">
          {error}{" "}
          {topUp ? (
            <a className="underline text-[var(--gold)]" href={topUp} target="_blank" rel="noreferrer">
              Top up credits
            </a>
          ) : null}
        </p>
      ) : null}
      {answer ? (
        <p className="mt-3 whitespace-pre-wrap rounded-lg bg-black/30 p-3 text-sm leading-relaxed">
          {answer}
        </p>
      ) : null}
    </div>
  );
}
