"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import type { QuizQuestion } from "@/lib/types";

export function DetentionClient({ questions }: { questions: QuizQuestion[] }) {
  const router = useRouter();
  const queue = useMemo(
    () => (questions.length ? questions : []),
    [questions],
  );
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const q = queue[index];

  if (!queue.length) {
    return (
      <button
        type="button"
        className="btn btn-gold mt-6"
        onClick={() =>
          startTransition(async () => {
            await fetch("/api/state", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: "leave_detention" }),
            });
            router.push("/map");
            router.refresh();
          })
        }
      >
        Leave detention
      </button>
    );
  }

  async function submit() {
    if (!q || selected === null) return;
    const correct = selected === q.correctIndex;
    await fetch("/api/state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "answer",
        questionId: q.id,
        correct,
      }),
    });
    if (!correct) {
      setMsg("Still incorrect — study the explanation and retry.");
      setSelected(null);
      return;
    }
    setMsg(q.explanation);
    if (index + 1 < queue.length) {
      setIndex((i) => i + 1);
      setSelected(null);
      setMsg(null);
      return;
    }
    startTransition(async () => {
      await fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "leave_detention" }),
      });
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "remediation_completed" }),
      });
      router.push("/map");
      router.refresh();
    });
  }

  return (
    <div className="mt-6">
      <p className="text-sm text-[var(--muted)]">
        Resit {index + 1} / {queue.length}
      </p>
      <h2 className="display mt-2 text-2xl text-[var(--gold)]">{q.prompt}</h2>
      <div className="mt-4 grid gap-2">
        {q.choices.map((choice, i) => (
          <button
            key={choice}
            type="button"
            className={`rounded-xl border px-4 py-3 text-left ${
              selected === i
                ? "border-[var(--gold)] bg-[var(--gold)]/15"
                : "border-white/10"
            }`}
            onClick={() => setSelected(i)}
          >
            {choice}
          </button>
        ))}
      </div>
      {msg ? <p className="mt-3 text-[var(--muted)]">{msg}</p> : null}
      <button
        type="button"
        className="btn btn-forest mt-5"
        disabled={selected === null || pending}
        onClick={submit}
      >
        Submit resit
      </button>
    </div>
  );
}
