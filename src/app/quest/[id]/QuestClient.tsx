"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { QuizQuestion } from "@/lib/types";

export function QuestClient({
  moduleId,
  questions,
  nextModuleId,
}: {
  moduleId: string;
  questions: QuizQuestion[];
  nextModuleId?: string | null;
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [pending, startTransition] = useTransition();
  const q = questions[index];

  async function submit() {
    if (selected === null || !q) return;
    const correct = selected === q.correctIndex;
    setFeedback(q.explanation);
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: index === 0 ? "module_started" : "quiz_submitted",
        metadata: { moduleId, questionId: q.id },
      }),
    });
    const res = await fetch("/api/state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "answer",
        questionId: q.id,
        correct,
        moduleId,
      }),
    });
    const state = await res.json();
    if (state.inDetention) {
      router.push("/detention");
      return;
    }
    if (correct) setCorrectCount((c) => c + 1);
  }

  async function next() {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
      setSelected(null);
      setFeedback(null);
      return;
    }
    startTransition(async () => {
      const res = await fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "complete_module", moduleId }),
      });
      const state = await res.json();
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "module_completed",
          metadata: { moduleId, correctCount },
        }),
      });
      const destination =
        (typeof state.activeQuestId === "string" && state.activeQuestId.startsWith("m")
          ? `/quest/${state.activeQuestId}`
          : null) ??
        (nextModuleId ? `/quest/${nextModuleId}` : "/map");
      router.push(destination);
      router.refresh();
    });
  }

  if (!q) return null;

  return (
    <div className="mt-8 rounded-xl border border-[var(--path)]/30 bg-black/25 p-4 sm:p-6">
      <div className="mb-3 text-sm text-[var(--muted)]">
        Challenge {index + 1} / {questions.length}
      </div>
      <h2 className="display text-2xl text-[var(--gold)]">{q.prompt}</h2>
      <div className="mt-4 grid gap-2">
        {q.choices.map((choice, i) => (
          <button
            key={choice}
            type="button"
            className={`rounded-xl border px-4 py-3 text-left transition ${
              selected === i
                ? "border-[var(--gold)] bg-[var(--gold)]/15"
                : "border-white/10 hover:border-[var(--path)]/50"
            }`}
            onClick={() => setSelected(i)}
            disabled={Boolean(feedback)}
          >
            {choice}
          </button>
        ))}
      </div>
      {feedback && (
        <p className="mt-4 rounded-lg bg-black/30 p-3 text-[var(--muted)]">
          {feedback}
        </p>
      )}
      <div className="mt-5 flex flex-wrap gap-3">
        {!feedback ? (
          <button
            type="button"
            className="btn btn-gold"
            onClick={submit}
            disabled={selected === null}
          >
            Submit decision
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-forest"
            onClick={next}
            disabled={pending}
          >
            {index + 1 < questions.length
              ? "Next challenge"
              : nextModuleId
                ? "Complete portal → next"
                : "Claim quest reward"}
          </button>
        )}
      </div>
    </div>
  );
}
