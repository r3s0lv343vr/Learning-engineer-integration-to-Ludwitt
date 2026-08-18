"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { QuizQuestion } from "@/lib/types";

export function ExamClient({
  examId,
  questions,
}: {
  examId: string;
  questions: QuizQuestion[];
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
    const res = await fetch("/api/state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "answer",
        questionId: q.id,
        correct,
        moduleId: examId,
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
    // Require ~2/3 correct (correctCount already includes the last graded answer)
    const passed = correctCount >= Math.ceil(questions.length * 0.67);
    if (!passed) {
      setFeedback(
        `Exam not passed (${correctCount}/${questions.length}). Review Formulae Desk and retry — need at least ${Math.ceil(questions.length * 0.67)} correct.`,
      );
      setIndex(0);
      setSelected(null);
      setCorrectCount(0);
      return;
    }
    startTransition(async () => {
      await fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "complete_exam", examId }),
      });
      router.push("/map");
      router.refresh();
    });
  }

  if (!q) return null;

  return (
    <div className="mt-8 rounded-xl border border-[var(--path)]/30 bg-black/25 p-4 sm:p-6">
      <div className="mb-3 text-sm text-[var(--muted)]">
        Compulsory exam · Question {index + 1} / {questions.length}
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
      {feedback ? (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-[var(--muted)]">{feedback}</p>
          <button
            type="button"
            className="btn btn-gold"
            disabled={pending}
            onClick={() => void next()}
          >
            {index + 1 < questions.length ? "Next question" : "Submit exam"}
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="btn btn-forest mt-4"
          disabled={selected === null}
          onClick={() => void submit()}
        >
          Lock answer
        </button>
      )}
    </div>
  );
}
